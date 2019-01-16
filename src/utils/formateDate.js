import Vue from 'vue'
import moment from 'moment'

Vue.filter('formatDate', function (value, a) {
  if (!value) return ''
  return moment(value).format(a)
})
