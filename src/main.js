// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//css 导入
import './../static/style/public.css'

//导入axios
import axios from 'axios'
Vue.prototype.$http = axios;
//导入mint-ui
import mintui from 'mint-ui'
import 'mint-ui/lib/style.css'
Vue.use(mintui)
//状态管理
import store from './store'

//导入jquery
import $ from 'jquery'

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
