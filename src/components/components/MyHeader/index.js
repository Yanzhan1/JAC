import MyHeaderComponent from './MyHeader'

let MyHeader = {};

MyHeader.install = (Vue) => {
  Vue.component('MyHeader', MyHeaderComponent)
}

export default MyHeader;
