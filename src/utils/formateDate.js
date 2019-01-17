import Vue from 'vue'
import moment from 'moment'
moment.locale('zh-cn'); 

Vue.filter('formatDate', function (value, a) {
  if (!value) return ''
  return moment(value).format(a)
})
