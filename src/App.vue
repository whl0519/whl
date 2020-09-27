<template>
  <div id="app">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
    <fullpaly v-if="isshowfull"></fullpaly> <!-- 全屏播放器组件 ！-->
    <minpalsy v-show="isshowmini"></minpalsy> <!-- min版组件 ！-->
    <addplay></addplay>
  </div>
</template>
<script>
import { mapState } from 'vuex'
import fullpaly from '@/components/fullpaly.vue'
import minpalsy from '@/components/minpalsy.vue'
import addplay from '@/components/addplay.vue'
export default {
  name: 'app',
  components: {
    fullpaly,
    minpalsy,
    addplay
  },
  computed: {
    ...mapState({
      isshowfull: 'isshowfullplay',
      isshowmini: 'isshowminplay'
    })
  }
}
</script>
<style lang="stylus">

</style>
