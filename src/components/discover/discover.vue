<template>
  <div id="box">
    <Header @refresh="refresh"></Header>
    <div id="placeholder" style="height: 0.88rem;box-sizing: content-box;" :style="$statusBarHeightObj"></div>
    <!-- <keep-alive v-if="flag"> -->
    <!-- <router-view v-if="flag" /> -->
    <!-- </keep-alive> -->
    <my-swiper :placeholderHeight="placeholderHeight" :height="height" v-if="$store.state.$flag && flag"></my-swiper>
  </div>
</template>

<script>
  import Header from '../Header'
  import MySwiper from '@/components/components/mySwiper/MySwiper'

  export default {
    name: "discover",
    data() {
      return {
        flag: true,
        height: 0,
        placeholderHeight: 0
      }
    },
    methods: {
      refresh() {
        this.flag = false
        setTimeout(() => {
          this.flag = true
        })
      }
    },
    mounted(){
      const box = document.querySelector('#box')
      const placeholder = document.querySelector('#placeholder')

      this.placeholderHeight = placeholder.getBoundingClientRect().height
      this.height = window.innerHeight - placeholder.getBoundingClientRect().height
      box.style.height = window.innerHeight + 'px'
    },
    components: {
      Header,
      MySwiper
    },
  }

</script>

<style scoped>
</style>
