<template>
    <ul style="background-color: white;">
      <li v-for="(item, index) in navlist" :key="item.id" @click="heander(index)">
        <div class="bg">
          <i class="iconfont" :class="item.iconClass"></i>
          <span :class="{date: index === 0}" v-if="index == 0">{{day}}</span>
        </div>
        <p class="title">{{item.title}}</p>
      </li>
    </ul>
</template>
<script>
export default {
  name: 'navmenu',
  data () {
    return {
      navlist: [{
        title: '每日推荐',
        iconClass: 'icon-rili'
      }, {
        title: '歌单',
        iconClass: 'icon-gedan'
      }, {
        title: '排行榜',
        iconClass: 'icon-paixingbang'
      }, {
        title: '电台',
        iconClass: 'icon-yinle'
      }, {
        title: '私人FM',
        iconClass: 'icon-diantai'
      }]
    }
  },
  computed: {
    // eslint-disable-next-line vue/return-in-computed-property
    day () {
      return new Date().getDate()
    }
  },
  methods: {
    heander (index) {
      if (index === 1) {
        this.$router.push({
          name: 'gedan'
        })
      }
      if (index === 2) {
        this.$router.push({
          name: 'top'
        })
      }
    }
  }
}
</script>
<style lang="stylus" scoped>
ul
 display flex
 padding .3rem 0
li
 flex 1
 text-align center
 height 1.7rem
 display flex
 flex-direction column
 justify-content space-around
 .bg
  align-self center
  width .8rem
  height .8rem
  line-height .8rem
  border-radius 50%
  color #fff
  position relative
  background linear-gradient(to right ,#ff5a4c,#ff1d11)
  .iconfont
   font-size .54rem
  .date
   position absolute
   left 50%
   width .4rem
   line-height .4rem
   margin-left -(@width/2)
   top 0.3rem
</style>
