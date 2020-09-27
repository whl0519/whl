import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '@/views/home/index.vue'
import gedan from '@/views/center/index.vue'
import tuijian from '@/views/center/compontes/tuijian.vue'
import jingpin from '@/views/center/compontes/jingpin.vue'
import oumei from '@/views/center/compontes/oumei.vue'
import dianzi from '@/views/center/compontes/dianzi.vue'
import minyao from '@/views/center/compontes/minyao.vue'
import qingyinyue from '@/views/center/compontes/qingyinyue.vue'
import hanyu from '@/views/center/compontes/hanyu.vue'
import top from '@/views/paihang/top.vue'
import songsheet from '@/views/songsheet/index.vue'
Vue.use(VueRouter)

const routes = [{
  path: '/',
  name: 'index',
  component: index
}, {
  path: '/gedan',
  name: 'gedan',
  component: gedan,
  redirect: {
    name: 'tuijian'
  }, // 路由重定向
  children: [{
    path: 'tuijian',
    name: 'tuijian',
    component: tuijian
  }, {
    path: 'jingpin',
    name: 'jingpin',
    component: jingpin
  }, {
    path: 'oumei',
    name: 'oumei',
    component: oumei
  }, {
    path: 'dianzi',
    name: 'dianzi',
    component: dianzi
  }, {
    path: 'minyao',
    name: 'minyao',
    component: minyao
  }, {
    path: 'qingyinyue',
    name: 'qingyinyue',
    component: qingyinyue
  }, {
    path: 'hanyu',
    name: 'hanyu',
    component: hanyu
  }]
}, {
  path: '/top',
  name: 'top',
  component: top
}, {
  path: '/songsheet',
  name: 'songsheet',
  component: songsheet
}]

const router = new VueRouter({
  routes
})

export default router
