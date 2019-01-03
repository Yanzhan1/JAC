<template>
  <div style="height: 100%;">
    <transition name="fade">
      <img class="img" :src="src" alt="" v-if="flag">
    </transition>
    <div style="height: 100%;" v-if="!flag"></div>
  </div>
</template>

<script>
  const defaultImg = require('./car_ruifeng_s5.png')

  export default {
    props: ['imgUrl'],
    data() {
      return {
        src: '',
        flag: false
      }
    },
    created() {
      this.lazyImg()
    },
    methods: {
      lazyImg() {
        const img = new Image()

        img.onload = () => {
          setTimeout(() => {
            this.src = this.imgUrl
            this.flag = true
          }, 500)
        }
        img.onerror = () => {
          setTimeout(() => {
            this.src = defaultImg
            this.flag = true
          }, 500)
        }
        img.src = this.imgUrl
      }
    }
  }

</script>

<style scoped>
  .img {
    display: block;
    width: 100%;
    height: 100%;
    border: none;
    object-fit: cover;
  }

  .fade-enter-active,
  .fade-leave-active {
    transition: opacity .5s
  }

  .fade-enter,
  .fade-leave-active {
    opacity: 0
  }

</style>
