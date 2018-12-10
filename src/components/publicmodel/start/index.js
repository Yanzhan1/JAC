import Start from './start'

let MyStart = {};

MyStart.install = (Vue) => {
  Vue.component('MyStart', Start)
}

export default MyStart;