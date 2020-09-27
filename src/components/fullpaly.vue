<template>
  <div>
    <div class="mask"></div>
    <div class="full">
      <div class="head">
        <i class="iconfont" @click="fadeBack">&#xe669;</i>
        <div class="title ell">
          <span>{{ player.list[player.index].name }}</span> -
          <span
            class="art"
            v-for="item in player.list[player.index].ar"
            :key="item.id"
          >{{item.name}}</span>
        </div>
      </div>
      <!-- cd -->
      <div class="inner-box">
        <div class="great" :style="{transform: ispause ? '':'rotate(-15deg)'}"></div>
        <div class="circle-bg" :style="obj">
          <div class="img-box">
            <img :src="player.list[player.index].al.picUrl" alt />
          </div>
        </div>
      </div>
      <!-- 歌词位置 -->
      <!-- 歌词位置 -->
      <div class="lrc" ref="lrcwrapper">
        <div>
          <div class="line">
            <p
              ref="lines"
              :style="{color:currentLineNum === index ? 'white' : ''}"
              v-for="(item, index) in currentLyric.lines"
              :key="index"
            >{{item.txt}}</p>
          </div>
        </div>
      </div>
      <!-- icon -->
      <div class="icon">
        <i class="iconfont icon-zan1"></i>
        <i class="iconfont icon-xiazai"></i>
        <i class="iconfont icon-caidan"></i>
      </div>
      <!-- 进度条 -->
      <div class="line-box">
        <span class="start">{{curTime}}</span>
        <div class="bar-bg">
          <div class="bar-line" :style="{width:audionint.progerss}"></div>
          <!-- 已经播放的长度 -->
          <div class="bar-point" :style="{left:audionint.progerss}"></div>
          <!-- 播放的圆点 -->
        </div>
        <span class="end">{{endTime}}</span>
      </div>
      <!-- 控制播放暂停 -->
      <div class="cont-icon">
        <div class="icons">
          <i class="iconfont icon-weimingmingwenjianjia_xunhuan"></i>
        </div>
        <div class="icons">
          <i class="iconfont icon-zuojiantou"></i>
        </div>
        <div class="icons">
          <i
            class="iconfont"
            :class="{'icon-pause' : ispause, 'icon-bofang' : !ispause}"
            @click="pause"
          ></i>
        </div>
        <div class="icons">
          <i class="iconfont icon-youjiantou"></i>
        </div>
        <div class="icons">
          <i class="iconfont icon-gedan" @click="showlist"></i>
        </div>
      </div>
      <!-- 点击歌单后，显示的歌单列表 -->
      <el-drawer
        :visible.sync="drawer"
        :direction="direction"
        :modal-append-to-body="false"
        :show-close="false"
        :withHeader="false"
        :size="'50%'"
      >
        <div class="d-wrap">
          <header class="heander">歌曲列表</header>
          <div class="inner" ref="inner">
            <ul class="drawer-list">
              <li class="list-item ell" v-for="(item,index) in player.list" :key="index">
                <span class="name">{{item.name}}</span>
                -
                <span class="art" v-for="val in item.ar" :key="val.id">{{val.name}}</span>
              </li>
            </ul>
          </div>
        </div>
      </el-drawer>
    </div>
  </div>
</template>
<script>
import BScroll from 'better-scroll'
import Lyric from 'lyric-parser'
import bus from '@/bus.js'
import { mapState } from 'vuex'
export default {
  name: 'fullPlay',
  data () {
    return {
      drawer: false,
      direction: 'btt', // 从下侧出现
      obj: {
        animationPlayState: 'running'
      },
      ispause: true,
      lrc: null, // 歌词数据
      currentLyric: {
        lines: null
      }, // 设置一个歌词维护属性
      currentLineNum: 0, // 当前播放第几行
      playingLyric: null // 正在播放行的歌词
    }
  },
  methods: {
    showlist () {
      // 显示隐藏歌单的
      this.drawer = true
      this.scroll = new BScroll(this.$refs.inner, {})
    },
    fadeBack () {
      // 点击左箭头后，让全屏播放器消失，让mini播放器出现
      this.$store.commit('changeIsShow')
    },
    /* startTime () {
      this.t++
      this.startS = parseInt(this.t % 60)
      if (this.startS < 10) {
        this.startS = '0' + parseInt(this.startS % 60)
      }
      this.startM = '0' + parseInt(this.t / 60)
      const p = this.t / parseInt(this.player.list[this.player.index].dt / 1000)
      this.progerss = p * 100 + '%'
      if (this.t === parseInt(this.player.list[this.player.index].dt / 1000)) {
        clearInterval(this.timer)
      }
      console.log(this.t)
    }, */
    pause () {
      this.ispause = !this.ispause
      this.currentLyric.togglePlay() // 切换歌词的播放状态
      // eslint-disable-next-line no-unused-expressions
      this.obj.animationPlayState === 'running'
        ? (this.obj.animationPlayState = 'paused')
        : (this.obj.animationPlayState = 'running')
      bus.$emit('pause', this.ispause)
    },
    getlyc () {
      const that = this
      this.axios
        .get('/api/lyric?id=' + this.player.list[this.player.index].id)
        .then(res => {
          if (res.data.code === 200) {
            this.lrc = res.data.lrc.lyric
            this.currentLyric = new Lyric(that.lrc, that.handleLyric) // this.handleLyric回调函数
            this.scroll = new BScroll(this.$refs.lrcwrapper, {})
            this.currentLyric.play() // 设置玩歌词信息后，播放歌词
          }
        })
    },
    handleLyric ({ lineNum, txt }) {
      this.currentLineNum = lineNum
      if (lineNum > 1) {
        const lineEl = this.$refs.lines[lineNum - 1]
        this.scroll.scrollToElement(lineEl, 300) // 滚动到元素
      } else {
        this.scroll.scrollTo(0, 0, 1000) // 滚动到顶部
      }
      this.playingLyric = txt
    }
  },
  mounted () {
    // this.timer = setInterval(this.startTime, 1000)
    this.getlyc()
  },
  computed: {
    ...mapState({
      player: 'player',
      audionint: 'audionint'
    }),
    endTime () {
      const time = parseInt(this.audionint.duration) // 221s
      let m = parseInt(time / 60) // 得到min
      if (m < 10) {
        m = '0' + m
      }
      let s = time % 60 // 得到秒数
      if (s < 10) {
        s = '0' + s
      }
      return `${m}:${s}` // 03:41
    },
    curTime () {
      const time = parseInt(this.audionint.currenttime) // 221s
      let m = parseInt(time / 60) // 得到min
      if (m < 10) {
        m = '0' + m
      }
      let s = time % 60 // 得到秒数
      if (s < 10) {
        s = '0' + s
      }
      return `${m}:${s}`
    }
  }
}
</script>
<style lang="stylus" scoped>
.d-wrap
  padding 0 .3rem
.heander
  line-height: 0.6rem
.drawer-list
  line-height: 0.5rem

.lrc {
  height: 1.2rem;
  position: absolute;
  left: 5%;
  right: 5%;
  overflow: hidden;
  text-align: center;
  margin-top: -1rem;

  p {
    line-height: 0.4rem;
  }
}

.ell {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.art:after {
  content: '/';
  margin: 0 0.1rem;
}

.art:last-child:after {
  content: '';
}

.cont-icon {
  display: flex;
  margin-top: 0.6rem;

  .icons {
    flex: 1;
    text-align: center;

    .iconfont {
      font-size: 0.5rem;
      color: #bdc3c7;
    }
  }
}

.line-box {
  margin: 0.2rem 0;
  display: flex;
  justify-content: space-between;

  .bar-bg {
    flex: 1;
    background: #95a5a6;
    height: 2px;
    margin-top: 0.1rem;
    position: relative;

    .bar-line {
      width: 20%;
      background: #ecf0f1;
      height: 2px;
    }

    .bar-point {
      left: 20%;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #ecf0f1;
      margin-top: -3px;
    }

    .bar-line, .bar-point {
      position: absolute;
    }
  }

  span {
    text-align: center;
    width: 1rem;
    color: #fff;
  }
}

.inner-box {
  height: 7.6rem;
  margin: 0.6rem 0;
  position: relative;
  overflow: hidden;
}

.rotate {
  transform: translate(-50%) rotate(-16deg);
}

.great {
  position: absolute;
  z-index: 1;
  left: 50%;
  transform-origin: top left;
  transition: transform 0.2s;
  width: 2rem;
  height: 0;
  padding-bottom: 2.5rem;
  background-image: url('https://icon.qiantucdn.com/20200509/cad9247361c2677cb1287c6fd8f866c92'); // icon.qiantucdn.com/20200509/cad9247361c2677cb1287c6fd8f866c92)
  background-size: 100% 100%;
  background-repeat: no-repeat;
}

.circle-bg {
  display: flex;
  justify-content: center;
  margin: 1.2rem auto;
  width: 6rem;
  height: 0;
  padding-bottom: 6rem;
  background-image: url('https://icon.qiantucdn.com/20200509/55828113a162610d404cf3a52c1344492'); // icon.qiantucdn.com/20200509/55828113a162610d404cf3a52c1344492)
  background-size: 100% 100%;
  background-repeat: no-repeat;
  animation: rotating 24s linear infinite;
  transform-origin: center;
}

.img-box {
  border: 1px solid #000;
  width: 4rem;
  height: 4rem;
  border-radius: 50%;
  margin-top: 1rem;
  overflow: hidden;

  img {
    width: 100%;
    height: 100%;
  }
}

.icon {
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding-top: 0.5rem;
}

.icon i {
  font-size: 0.5rem;
  color: #bdc3c7;
}

.head {
  display: flex;
  line-height: 1rem;
  color: #fff;

  .iconfont {
    font-size: 0.4rem;
    margin-right: 0.2rem;
  }
}

.full {
  padding: 0 0.3rem;
  position: fixed;
  z-index: 100;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: #7f8c8d;
}

.mask {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
}
</style>
