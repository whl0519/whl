import Vue from 'vue'
import './plugins/axios'
import App from './App.vue'
import router from './router'
import store from './store'
import rem from '@/assets/js/rem.js'
import '@/assets/css/reset.css'
import '@/assets/font/iconfont.css'
import ElementUI from 'element-ui' // 引入ElementUI插件
import 'element-ui/lib/theme-chalk/index.css' // Element
import VueAwesomeSwiper from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'
Vue.config.productionTip = false
Vue.use(rem)
Vue.use(ElementUI) // 调用use方法，使用ElementUI
Vue.use(VueAwesomeSwiper)
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
