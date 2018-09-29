import BoxComponent from './Box'

let Box = {};

Box.install = (Vue) => {
  Vue.component('Box', BoxComponent)
}

export default Box;
