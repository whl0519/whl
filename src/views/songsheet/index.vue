/* eslint-disable quotes */
<template>
  <div class="wrapper">
    <!-- 头部 -->
    <div data-v-7189b9ba class="container-top" style="height: 6rem;">
      <!---->
      <router-link tag="nav" :to="{ name : 'top' }" data-v-8f3a6c60 data-v-7189b9ba class="phone-nav fixed pd23 height">
        <i class="iconfont phone">&#xe669;</i>
        <span data-v-7189b9ba data-v-8f3a6c60 class="text"></span>
      </router-link>
      <!---->
      <div data-v-7189b9ba class="album-info pd23">
        <div data-v-7189b9ba class="info-top">
          <div data-v-7189b9ba class="img-info">
            <img
              data-v-7189b9ba
              alt
              data-src="http://p1.music.126.net/DrRIg6CrgDfVLEph9SNh7w==/18696095720518497.jpg?param=200y200"
              :src="song.coverImgUrl"
              lazy="loaded"
            />
            <span data-v-7189b9ba class="play-count">
              <i data-v-7189b9ba class="date-song bofang iconfont">&#xe60a;</i>
              31.2亿
            </span>
          </div>
          <div data-v-7189b9ba class="info-con">
            <p data-v-7189b9ba class="album-title">{{song.name}}</p>
            <div data-v-7189b9ba class="creator">
              <div data-v-7189b9ba class="img-info">
                <img
                  data-v-7189b9ba
                  alt
                  data-src="http://p1.music.126.net/LzIA_BYxqJj9mrj1NfCWDQ==/109951164873881480.jpg?param=200y200"
                  :src="song.creator.avatarUrl"
                  lazy="loaded"
                />
              </div>
              <span data-v-7189b9ba>
                {{song.creator.nickname}}
                <i
                  data-v-7189b9ba
                  class="date-song iconfontjiantou5 iconfont"
                >&#xe646;</i>
              </span>
            </div>
            <div data-v-7189b9ba class="desc-wrapper">
              <span data-v-7189b9ba class="desc">{{song.description}}</span>
              <i data-v-7189b9ba class="date-song iconfontjiantou5 iconfont">&#xe646;</i>
            </div>
          </div>
        </div>
        <div data-v-7189b9ba class="icons">
          <div data-v-7189b9ba class="comments">
            <i data-v-7189b9ba class="date-song pinglun iconfont">&#xe625;</i>
            <span
              data-v-7189b9ba
            >{{song.commentCount > 9999 ? (song.commentCount/10000).toFixed(1) + '万' : song.commentCount}}</span>
          </div>
          <div data-v-7189b9ba class="comments">
            <i data-v-7189b9ba class="date-song fenxiang iconfont">&#xe77d;</i>
            <span data-v-7189b9ba>{{song.shareCount}}</span>
          </div>
          <div data-v-7189b9ba class="comments">
            <i data-v-7189b9ba class="date-song xiazai iconfont">&#xe631;</i>
            <span data-v-7189b9ba>下载</span>
          </div>
          <div data-v-7189b9ba class="comments">
            <i data-v-7189b9ba class="date-song duoxuankuang iconfont">&#xe62e;</i>
            <span data-v-7189b9ba>多选</span>
          </div>
        </div>
      </div>
    </div>
    <!-- 头部 -->
    <!-- 播放 -->
    <div data-v-7189b9ba class="title pd23">
      <span data-v-7189b9ba>
        <span data-v-7189b9ba>
          <i data-v-7189b9ba class="date-song cbofang"></i>
          播放全部
        </span>
        <span data-v-7189b9ba class="count">(共{{song.trackCount}}首)</span>
      </span>
      <!---->
      <div data-v-7189b9ba class="collection bg" style>
        <span data-v-7189b9ba>+ 收藏(297.8万)</span>
      </div>
    </div>
    <!-- 播放 -->
    <!-- 歌单 -->
    <div class="list-info" style="margin-top: 0.5rem;">
      <div data-v-56164c8a data-v-3815fbbc class="list-item" data-v-7189b9ba v-for="(val,index) in song.tracks" :key="index" @click="fullplay(index,song.tracks,val.id)">
        <!---->
        <div data-v-56164c8a class="index">
          <span data-v-56164c8a>{{index+1}}</span>
          <i data-v-56164c8a class="result yinliang iconfont" style="display: none;">&#xe60a;</i>
        </div>
        <div data-v-56164c8a class="song-info">
          <p data-v-56164c8a class="song-name">
            <span data-v-56164c8a>{{val.name}}</span>
            <span data-v-56164c8a class="alia" style="display: none;">()</span>
          </p>
          <p data-v-56164c8a class="song-art">
            <span data-v-56164c8a>
              <span data-v-56164c8a class="artist" v-for="item in  val.ar" :key="item.id">{{item.name}}-</span>
            </span>
            <span data-v-56164c8a class="album-name">{{val.al.name}}</span>
          </p>
          <!---->
        </div>
      </div>
    </div>
    <!-- 歌单 -->
  </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
  name: 'songsheet',
  data () {
    return {
      song: []
    }
  },
  methods: {
    getdetail () {
      console.log(this.$route.params.id)
      this.axios.get('/api/top/list?idx=' + this.idx).then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.song = res.data.playlist
        }
        console.log(this.song)
      })
    },
    fullplay (index, allist, id) {
      // 点击某一首时，需要点击的索引和全部歌曲，
      // 在全屏播放器中部分当前点击的这首歌
      this.$store.commit('fullpaly', { index, allist }) // 歌曲信息存到仓库
      const that = this
      this.$store.dispatch('geturl', { that, id })
    }
  },
  mounted () {
    this.getdetail()
  },
  computed: {
    ...mapState({
      idx: 'idx'
    })
  }
}
</script>
<style lang="stylus" scoped>
.wrapper .container-top {
  width: 100%;
  color: #fff;
  background-color: #ee5253;
}

.fixed {
  position: fixed;
  width: 100%;
  height: 1rem;
  background-color: #ee5253;
  z-index: 9;
  top: 0;
}

.phone-nav .phone {
  font-size: 0.7rem;
  margin-right: 5px;
  color: #ffffff;
  line-height: 1rem;
}

.wrapper .container-top .album-info {
  padding-top: 1.5rem;
}

.pd23 {
  box-sizing: border-box;
  padding: 0 0.23rem;
}

.wrapper .container-top .album-info .info-top {
  height: 3rem;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  overflow: hidden;
}

.wrapper .container-top .album-info .info-top .img-info {
  width: 2.6rem;
  height: 0;
  position: relative;
  padding-bottom: 2.6rem;
  border-radius: 0.11rem;
  overflow: hidden;
}

.wrapper .container-top .album-info .info-top .img-info img {
  width: 2.6rem;
  height: 2.6rem;
}

.wrapper .container-top .album-info .info-top .img-info .play-count {
  position: absolute;
  top: 0.1rem;
  right: 0.1rem;
  color: #ffffff;
}

.wrapper .container-top .album-info .info-top .info-con {
  width: 3.6rem;
  height: 2.6rem;
  display: -webkit-box;
  display: -ms-flexbox;
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  -ms-flex-direction: column;
  flex-direction: column;
  overflow: hidden;
}

.wrapper .container-top .album-info .info-top .info-con .album-title {
  font-size: 0.36rem;
  line-height: 1.5;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.wrapper .container-top .album-info .info-top .info-con .creator {
  height: 1rem;
  color: #ccc;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
}

.wrapper .container-top .album-info .info-top .info-con .creator .img-info {
  width: 0.6rem;
  height: 0;
  padding-bottom: 0.6rem;
  margin-right: 8px;
  border-radius: 50%;
  overflow: hidden;
}

.wrapper .container-top .album-info .info-top .info-con .creator .img-info img {
  width: 0.6rem;
  height: 0.6rem;
}

wrapper .container-top .album-info .info-top .info-con .creator {
  color: #ccc;
}

.wrapper .container-top .album-info .info-top .info-con .desc-wrapper {
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  color: #ccc;
}

.wrapper .container-top .album-info .info-top .info-con .desc-wrapper .desc {
  width: 3rem;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  overflow: hidden;
  -webkit-box-orient: vertical;
}

.wrapper .container-top .album-info .icons {
  margin-top: 8px;
  display: flex;
  justify-content: space-around;
  width: 100%;
}

.wrapper .container-top .album-info .icons .comments {
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
}

.wrapper .container-top .album-info .icons .comments .date-song {
  font-size: 0.4rem;
  margin-bottom: 5px;
}

.wrapper .title {
  font-size: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  display: flex;
  -webkit-box-pack: justify;
  justify-content: space-between;
  background-color: #fff;
}

.wrapper .title {
  font-size: 0.3rem;
  line-height: 1rem;
}

.wrapper .title .count {
  color: #999;
  font-size: small;
}

.wrapper .title .collection {
  box-sizing: border-box;
  padding: 0 0.23rem;
  font-size: smaller;
  margin-top: 3px;
  height: 0.7rem;
  line-height: 0.7rem;
  border-radius: 0.4rem;
}

.wrapper .title .collection.bg {
  background-color: #dd001b;
  color: #fff;
}

.wrapper .list-info {
  width: 100%;
  box-sizing: border-box;
  padding: 0.1rem 0.23rem;
  background-color: #fff;
  transform: translate3d(0, -0.5rem, 0);
}
.list-item {
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    height: 1.2rem;
}
.list-item .index{
    color: #999;
}
.list-item .yinliang {
    color: #dd001b;
}
.list-item .song-info {
    display: flex;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    flex-direction: column;
}
.list-item .song-info .song-name {
    width: 75vw;
    max-height: 0.4rem;
    line-height: 0.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.list-item .song-info .song-name .alia {
    color: #7c7b7d;
}
.list-item .song-info .song-art {
    height: 0.4rem;
    line-height: 0.4rem;
    font-size: 0.23rem;
    color: #dacdcd;
    width: 75vw;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}

</style>
