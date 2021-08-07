import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import FastCilck from "fastclick"
import VueLazyLoad from 'vue-lazyload'
import toast from "components/common/toast"

// 安装toast插件
Vue.use(toast)
// 解决移动端300ms延迟
FastCilck.attach(document.body)
// 图片懒加载
Vue.use(VueLazyLoad)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
