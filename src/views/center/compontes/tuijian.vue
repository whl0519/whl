<template>
  <div>
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
            lazy="loaded"
            :src="item.coverImgUrl"
          />
        </div>
        <div data-v-2bed5e0e class="dec twoLines">{{item.name}}</div>
        <!---->
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'tujian',
  data () {
    return {
      shuju: []
    }
  },
  methods: {
    tujian () {
      this.$axios.get('/api//top/playlist?limit=30')
        .then(res => {
          console.log(res.data.playlists)
          if (res.data.code === 200) {
            this.shuju = res.data.playlists
          }
        })
    }
  },
  mounted () {
    this.tujian()
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    length () {
      const arr = this.shuju
      arr.map((val, index) => {
        if (val.playCount > 9999) {
          val.playCount = Math.floor(val.playCount / 10000) + '万'
          console.log(val.playCount)
        }
      })
      return arr
    }
  }
}
</script>
<style lang="stylus" scoped>
@import url(../../../assets/css/gonggong.styl);
</style>
