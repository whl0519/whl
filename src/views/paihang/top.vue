<template>
  <div style="background:#fff">
    <div class="head">
      <i class="iconfont" @click="shangyibu">&#xe620;</i>
      <span class="title">排行榜</span>
    </div>
    <div data-v-34fca12c class="title2">官方榜</div>
    <!-- 1 -->
    <div data-v-6de3c308 data-v-34fca12c v-for="(item,index) in toplist.slice(0,4)" :key="item.id" @click="tosongsheet(index)">
      <div data-v-6de3c308 class="list">
        <div data-v-6de3c308 class="img-info">
          <img data-v-6de3c308 :src="item.coverImgUrl" alt />
          <span data-v-6de3c308 class="time">{{item.updateFrequency}}</span>
        </div>
        <div data-v-6de3c308 class="list-con">
          <div data-v-6de3c308 class="info" v-for="(val,index) in item.tracks" :key="val.id">
            {{index+1}}
            <span data-v-6de3c308>{{val.first}}</span> -
            <span data-v-6de3c308>{{val.second}}</span>
          </div>
          <div data-v-6de3c308 class="info"></div>
        </div>
      </div>
    </div>
    <!-- 1 -->
    <div data-v-34fca12c class="title2">推荐榜</div>
    <!-- 1 -->
    <div class="img-col">
      <div
        data-v-2bed5e0e
        data-v-34fca12c
        class="img-card"
        style="width: 2.1rem; margin-top: 0.3rem;"
        v-for="(item, index) in toplist.slice(4,10)"
        :key="item.id" @click="tosongsheet(index + 20)">
        <span data-v-2bed5e0e class="time-tag">{{item.updateFrequency}}</span>
        <div data-v-2bed5e0e class="img-con" style="width: 2.1rem; padding-bottom: 2.1rem;">
          <div data-v-2bed5e0e class="shadow"></div>
          <img
            data-v-2bed5e0e
            class="image"
            data-src="https://p1.music.126.net/y8zyTt4HwXbJqB31aQKz1A==/109951164353220919.jpg?param=200y200"
            :src="item.coverImgUrl"
            lazy="loaded"
          />
        </div>
        <div data-v-2bed5e0e class="dec twoLines">{{item.name}}</div>
        <!---->
      </div>
    </div>
    <!-- 1 -->
    <div data-v-34fca12c class="title2">更多榜单</div>
    <!-- 1 -->
    <div class="img-col">
      <div
        data-v-2bed5e0e
        data-v-34fca12c
        class="img-card"
        style="width: 2.1rem; margin-top: 0.3rem;"
        v-for="(item,index) in toplist.slice(10,100)"
        :key="item.id"
        @click="tosongsheet(index +28)"
      >
        <!---->
        <!---->
        <!---->
        <span data-v-2bed5e0e class="time-tag">{{item.updateFrequency}}</span>
        <div data-v-2bed5e0e class="img-con" style="width: 2.1rem; padding-bottom: 2.1rem;">
          <div data-v-2bed5e0e class="shadow"></div>
          <img
            data-v-2bed5e0e
            class="image"
            data-src="https://p1.music.126.net/y8zyTt4HwXbJqB31aQKz1A==/109951164353220919.jpg?param=200y200"
            :src="item.coverImgUrl"
            lazy="loaded"
          />
        </div>
        <div data-v-2bed5e0e class="dec twoLines">{{item.name}}</div>
        <!---->
      </div>
    </div>
    <!-- 1 -->
  </div>
</template>
<script>
export default {
  name: 'top',
  data () {
    return {
      toplist: [],
      track: []
    }
  },
  methods: {
    shangyibu () {
      this.$router.push('/')
    },
    shuju () {
      this.$axios.get('/api/toplist/detail').then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.toplist = res.data.list
          this.track = res.data.list[length].tracks
        }
      })
    },
    tosongsheet (index) {
      this.$router.push({ name: 'songsheet', params: { id: index } })
      this.$store.commit('idx', index)
    }
  },
  mounted () {
    this.shuju()
  }
}
</script>
<style lang="stylus" scoped>
.head {
  height: 1rem;
  line-height: 1rem;
  box-sizing: border-box;
  padding: 0 0.23rem;

  .title {
    font-size: 0.4rem;
    vertical-align: 5px;
  }

  i {
    font-size: 0.5rem;
    margin-right: 0.1rem;
  }
}

.item {
  display: flex;
  position: relative;
  flex-wrap: nowrap;
  margin-top: 0.16rem;
  overflow: scroll;
  border-bottom: 1px solid #ddd;
  margin-right: 0.6rem;

  li {
    flex: 1;
    min-width: 1.4rem;
    text-align: center;
    line-height: 1rem;
  }
}

.title2 {
  height: 1rem;
  line-height: 1rem;
  padding: 0 0.23rem;
  font-weight: 700;
}

.list {
  padding: 0 0.23rem;
  height: 2rem;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.list .img-info {
  position: relative;
  width: 1.7rem;
  height: 0;
  padding-bottom: 1.7rem;
  border-radius: 0.13rem;
  overflow: hidden;
}

.list .img-info img {
  width: 1.7rem;
  height: 1.7rem;
}

.list .img-info .time {
  position: absolute;
  bottom: 3px;
  left: 3px;
  font-size: 12px;
  color: #fff;
}

.list .list-con {
  margin-left: 0.2rem;
  color: #333;
}

.list .list-con .info {
  height: 0.5rem;
  line-height: 0.5rem;
  width: 4.5rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.img-col {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
}

.img-card {
  position: relative;
  background-color: #fff;
  padding: 0 0.2rem;
}

.img-card .time-tag {
  position: absolute;
  bottom: 0.54rem;
  left: 3px;
  font-size: 12px;
  color: #fff;
}

.img-card .img-con {
  position: relative;
  height: 0;
  background-color: #aaa;
  border-radius: 0.2rem;
  overflow: hidden;
}

.img-card .img-con .shadow {
  position: absolute;
  height: 2.1rem;
  width: 100%;
  box-shadow: 0 15px 21px -9px #777 inset;
}

.img-card .img-con img {
  width: 100%;
}

.img-card .dec.twoLines {
  height: 0.6rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
}
</style>
