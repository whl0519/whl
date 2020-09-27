<template>
  <div>
    <!-- 头部内容 -->
    <div class="wrap" style="background-color: white;">
      <el-row>
      <el-col :span="4">
        <i class="iconfont">&#xeaf1;</i>
      </el-col>
      <el-col :span="16">音乐🎵</el-col>
      <el-col :span="4">
        <i class="iconfont">&#xe819;</i>
      </el-col>
      </el-row>
    </div>
    <!-- 头部内容 -->
    <!-- 轮播 -->
    <banner></banner>
    <!-- 轮播 -->
    <!-- 导航菜单 -->
    <navmenu></navmenu>
    <!-- 导航菜单 -->
    <!-- 推荐歌单 -->
    <songlist></songlist>
    <!-- 推荐歌单 -->
  </div>
</template>
<script>
import banner from './compontes/banner'
import navmenu from './compontes/navmenu'
import songlist from './compontes/songlist'
export default {
  name: 'index',
  methods: {
  },
  mounted () {
  },
  components: {
    // eslint-disable-next-line vue/no-unused-components
    banner,
    // eslint-disable-next-line vue/no-unused-components
    navmenu,
    // eslint-disable-next-line vue/no-unused-components
    songlist
  }
}
</script>
<style lang="stylus" scoped>
.wrap
 width 100%
 line-height: .8rem;
 .el-col-16,.el-col-4
  text-align center
</style>
