import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    idx: null, // 歌单页面根据idx值获取对应排行榜歌单数据
    player: {}, // 存储点击歌曲的索引和全部歌曲列表
    isshowfullplay: false, // 控制全屏
    isshowminplay: false, // 控制mini
    audionint: {
      isplay: true,
      ended: null, // 是否结束
      duration: 0, // 总时长
      currenttime: 0, // 当前的播放时长
      url: '',
      progerss: '0%'
    }
  },
  mutations: {
    sendCurT (state, c) { // 设置播放时间/进度条
      state.audionint.currenttime = c
      state.audionint.progerss = (c / state.audionint.duration * 100).toFixed(2) + '%'
    },
    sendt (state, d) { // 总时间
      state.audionint.duration = d
    },
    idx (state, index) {
      state.idx = index
    },
    fullpaly (state, obj) {
      state.player.index = obj.index
      state.player.list = obj.allist
      state.isshowfullplay = true
    },
    changeisshow (state) {
      state.isshowfullplay = false
      state.isshowminplay = true
    },
    sendurl (state, url) {
      state.audionint.url = url
    },
    audioinfo (state, info) {
      state.audionint.time = info.duration
      state.audionint.currenttime = info.currentTime
      state.audionint.ended = info.ended
    }
  },
  actions: {
    geturl (ctx, obj) {
      obj.that.$axios.get('/api/song/url?id=' + obj.id).then((res) => {
        console.log(res.data)
        if (res.data.code === 200) {
          ctx.commit('sendurl', res.data.data[0].url)
        }
      })
    }
  },
  modules: {
  }
})
