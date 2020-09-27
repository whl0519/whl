<template>
<div class="conter" style="background-color: white;">
  <swiper ref="mySwiper" :options="swiperOptions">
    <swiper-slide v-for="item in bannerlist" :key="item.id">
      <img :src="item.pic" >
    </swiper-slide>
    <div class="swiper-pagination" slot="pagination"></div>
  </swiper>
</div>
</template>
<script>
export default {
  name: 'banner',
  data () {
    return {
      bannerlist: [],
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination'
        },
        loop: true,
        autoplay: true
        // Some Swiper option/callback...
      }
    }
  },
  methods: {
    getbanner () {
      // http://140.143.128.100:3000/hanner?type=1
      this.$axios.get('/api/banner?type=1').then(res => {
        console.log(res.data)
        if (res.data.code === 200) {
          this.bannerlist = res.data.banners
        }
        console.log(this.bannerlist)
      })
    }
  },
  mounted () {
    this.getbanner()
  }
}
</script>
<style lang="stylus" scoped>
img
 width 100%
.conter
 padding .2rem
</style>
