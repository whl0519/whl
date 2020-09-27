<template>
  <div>
    <audio ref="abc" :src="audionint.url" controls autoplay></audio>
  </div>
</template>
<script>
import bus from '@/bus.js'
import { mapState } from 'vuex'
export default {
  name: 'addplay',
  computed: {
    ...mapState({
      audionint: 'audionint'
    })
  },
  methods: {
    addevea () {
      const that = this
      this.$refs.abc.addEventListener('canplay', function () {
        console.log(this.duration)
        that.$store.commit('sendt', this.duration) // 在仓库中存储总时长
      })
      this.$refs.abc.addEventListener('timeupdate', function () {
        that.$store.commit('sendCurT', this.currentTime) // 在仓库中存储歌曲播放时间，会一直触发timeupdate事件
      })
    }
  },
  mounted () {
    this.addevea()
    bus.$on('pause', (p) => {
      if (p) {
        this.$refs.abc.play()
      } else {
        this.$refs.abc.pause()
      }
    })
  },
  components: {
  }
}
</script>
<style lang="stylus" scoped>
audio
 visibility hidden
 height 0px
</style>
