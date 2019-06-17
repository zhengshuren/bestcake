// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import MintUI from 'mint-ui'
// 引入淘宝镜像
import 'lib-flexible/flexible.js'
import "mint-ui/lib/style.css" 
// 引入core.config.js
import core from '@/core/core.config'
import '@/common/css/reset.css'
// 引入字体库
import 'font-awesome/css/font-awesome.css'
//引入vuex数据仓库
import store from "@/core/store/index"
// 懒加载
import VueLazyload from 'vue-lazyload'

Vue.use(require('vue-wechat-title'))
Vue.use(VueLazyload, {
  loading: require('@/common/images/laz.jpg')
})
Vue.use(core)
Vue.use(MintUI)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
