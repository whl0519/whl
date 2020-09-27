<template>
  <div style="background-color: white;">
    <el-row class="warp">
      <el-col :span="6">
        <h2 class="list">推荐歌单</h2>
      </el-col>
      <el-col :span="6" :offset="11">
        <router-link tag="p" :to="{name: 'gedan' }" class="center"> 歌单广场</router-link>
      </el-col>
    </el-row>
    <!-- 推荐歌单 -->
    <div data-v-97c1875c class="img-col" style>
      <div
        data-v-2bed5e0e
        data-v-97c1875c
        class="img-card"
        style="width: 2.1rem; margin-top: 0.3rem;"
        v-for="item in length" :key="item.id"
      >
        <span data-v-2bed5e0e class="tag">
          <i class="card cardbofang iconfont">&#xe60a;</i>
          {{item.playCount}}
        </span>
        <!---->
        <!---->
        <!---->
        <div data-v-2bed5e0e class="img-con" style="width: 2.1rem; padding-bottom: 2.1rem;">
          <div data-v-2bed5e0e class="shadow"></div>
          <img
            data-v-2bed5e0e
            class="image"
            :src="item.coverImgUrl"
            lazy="loaded"
          />
        </div>
        <div data-v-2bed5e0e class="dec twoLines">{{item.name}}</div>
        <!---->
      </div>
    </div>
    <!-- 推荐歌单 -->
    <!-- 新碟/新歌 -->
    <el-row class="warp">
      <el-col :span="6">
        <h2 class="list">
          <span :class="{select : number == 0}" @click="change1" >新碟</span>
          <i data-v-2179fb9b="" style="color: rgb(221, 221, 221);">|</i>
          <span :class="{select : number == 1}" @click="change">新歌</span>
        </h2>
      </el-col>
      <el-col :span="6" :offset="11">
        <p class="center" v-show="number == 1">更多新碟</p>
        <p class="center" v-show="number == 0">新歌推荐</p>
      </el-col>
    </el-row>
    <div data-v-97c1875c class="img-col" style v-show="number == 0">
      <div
        data-v-2bed5e0e
        data-v-97c1875c
        class="img-card"
        style="width: 2.1rem; margin-top: 0.3rem;"
        v-for="item in songxin" :key="item.id"
      >
        <span data-v-2bed5e0e class="tag">
        </span>
        <!---->
        <!---->
        <!---->
        <div data-v-2bed5e0e class="img-con" style="width: 2.1rem; padding-bottom: 2.1rem;">
          <div data-v-2bed5e0e class="shadow"></div>
          <img
            data-v-2bed5e0e
            class="image"
            lazy="loaded"
            :src="item.picUrl"
          />
        </div>
        <div data-v-2bed5e0e class="dec twoLines">{{item.name}}</div>
        <!---->
      </div>
    </div>
    <!-- 2 -->
    <div data-v-97c1875c class="img-col" style v-show="number == 1">
      <div
        data-v-2bed5e0e
        data-v-97c1875c
        class="img-card"
        style="width: 2.1rem; margin-top: 0.3rem;"
        v-for="item in songdie" :key="item.id"
      >
        <span data-v-2bed5e0e class="tag">
        </span>
        <!---->
        <!---->
        <!---->
        <div data-v-2bed5e0e class="img-con" style="width: 2.1rem; padding-bottom: 2.1rem;">
          <div data-v-2bed5e0e class="shadow"></div>
          <img
            data-v-2bed5e0e
            class="image"
            lazy="loaded"
            :src="item.album.picUrl"
          />
        </div>
        <div data-v-2bed5e0e class="dec twoLines">{{item.name}}</div>
        <!---->
      </div>
    </div>
    <!-- 2 -->
    <!-- 新碟/新歌 -->
  </div>
</template>
<script>
export default {
  name: 'songlist',
  data () {
    return {
      songlist: [],
      songxin: [],
      songdie: [],
      number: 1
    }
  },
  methods: {
    getlist () {
      // eslint-disable-next-line no-undef
      this.$axios
        .get('/api/top/playlist')
        .then(res => {
          console.log(res)
          if (res.data.code === 200) {
            for (let i = 0; i < 6; i++) {
              const index = res.data.playlists[Math.floor(Math.random() * 30)]
              if (this.songlist.indexOf() < 0) {
                this.songlist.push(index)
              } else {
                i--
              }
            }
          }
          console.log(this.songlist)
        })
        .catch(err => {
          console.error(err)
        })
    },
    getloglist () {
      this.$axios.get('/api/recommend/resource')
        .then(res => {
          console.log(res.data)
        })
    },
    getxinye () {
      this.$axios.get('/api/top/album?limit=3').then(res => {
        console.log(res.data.albums)
        if (res.data.code === 200) {
          this.songxin = res.data.albums
        }
      })
    },
    getdie () {
      this.$axios.get('/api/top/song')
        .then(res => {
          if (res.data.code === 200) {
            this.songdie = res.data.data.splice(0, 3)
          }
          console.log(this.songdie)
        })
    },
    change () {
      this.number = 0
    },
    change1 () {
      this.number = 1
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    length () {
      const arr = this.songlist
      arr.map((val, index) => {
        if (val.playCount > 9999) {
          val.playCount = Math.floor(val.playCount / 10000) + '万'
          console.log(val.playCount)
        }
      })
      return arr
    }
  },
  mounted () {
    if (localStorage.getItem('username')) {
      this.getloglist()
    } else {
      this.getlist()
    }
    this.getxinye()
    this.getdie()
  }
}
</script>
<style lang="stylus" scoped>
.warp {
  margin-top: 0.2rem;
  padding-left: 0.2rem;
}
.list
 font-size: 0.3rem;
 font-weight: 700;
.wrapper .img-col[data-v-97c1875c] {
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-pack: justify;
  -ms-flex-pack: justify;
  justify-content: space-between;
  -ms-flex-wrap: wrap;
  flex-wrap: wrap;
}

.img-card[data-v-2bed5e0e] {
  position: relative;
  background-color: #fff;
}

.img-card .tag[data-v-2bed5e0e] {
  position: absolute;
  z-index: 1;
  top: 0.11rem;
  right: 0.11rem;
  font-size: 0.2rem;
  color: #fff;
}

.img-card .img-con[data-v-2bed5e0e] {
  position: relative;
  height: 0;
  background-color: #aaa;
  border-radius: 0.2rem;
  overflow: hidden;
}

.img-card .img-con .shadow[data-v-2bed5e0e] {
  position: absolute;
  height: 2.1rem;
  width: 100%;
  -webkit-box-shadow: 0 15px 21px -9px #777 inset;
  box-shadow: 0 15px 21px -9px #777 inset;
}

.img-card .img-con img[data-v-2bed5e0e] {
  width: 100%;
}

.img-card .dec.twoLines[data-v-2bed5e0e] {
  height: 0.6rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
.img-col
 display: flex;
 flex-wrap: wrap;
 justify-content: space-around;
.img-card .dec[data-v-2bed5e0e] {
    margin-top: 0.2rem;
    font-size: 0.23rem;
    line-height: 0.3rem;
    letter-spacing: 1px;
}
.center
    box-sizing: border-box;
    padding: 0.1rem 0.1rem 0.1rem 0.13rem;
    -webkit-box-align: center;
    align-items: center;
    font-size: 0.2rem;
    border-radius: 1rem;
    letter-spacing: 0.05rem;
    text-align: center;
    border: 1px solid #ccc;
    margin-left: auto;
.img-card .tag .cardbofang[data-v-2bed5e0e] {
    font-size: 0.18rem;
}
.select
 font-size: 0.24rem;
 color: #333;
</style>
