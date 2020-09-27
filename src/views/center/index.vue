<template>
  <div class="container">
    <div class="head">
      <i class="iconfont" @click="shangyibu">&#xe620;</i>
      <span class="title">歌单广场</span>
    </div>
    <ul class="item">
      <router-link tag="li" active-class="nav-list" :to="{name :'tuijian'}">推荐</router-link>
      <router-link tag="li" active-class="nav-list" :to="{name :'jingpin'}" >精品</router-link>
      <router-link tag="li" active-class="nav-list" :to="{name :'oumei'}" >欧美</router-link>
      <router-link tag="li" active-class="nav-list" :to="{name :'dianzi'}" >电子</router-link>
      <router-link tag="li" active-class="nav-list" :to="{name :'minyao'}" >民谣</router-link>
      <router-link tag="li" active-class="nav-list" :to="{name :'qingyinyue'}" >轻音乐</router-link>
      <router-link tag="li" active-class="nav-list" :to="{name :'hanyu'}">韩语</router-link>
    </ul>
    <!-- 二级路由展示内容的容器 -->
    <keep-alive>
    <router-view></router-view>
    </keep-alive>
  </div>
</template>
<script>
export default {
  name: 'gedan',
  methods: {
    shangyibu () {
      this.$router.push('/')
    }
  }
}
</script>
<style lang="stylus" scoped>
.container
 padding 0 .3rem
 background-color #fff
.head
 height: 1rem;
 line-height: 1rem;
 box-sizing: border-box;
 padding: 0 0.23rem;
 .title
  font-size: 0.4rem;
  vertical-align: 0.1rem;
  line-height: 1rem;
 i
  font-size: 0.5rem;
  margin-right: 0.1rem;
.item
 display flex
 position: relative;
 flex-wrap: nowrap;
 margin-top: 0.16rem;
 overflow scroll
 border-bottom: 1px solid #ddd;
 margin-right: 0.6rem;
 li
   flex 1
   min-width 1.4rem
   text-align center
   line-height 1rem
.nav-list
  color: #dd001b;
  border-bottom 1px solid red
</style>
