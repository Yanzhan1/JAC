<template>
  <div :style="{height: `${height}px`}" id="tabs-container" class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide swiperSlide" v-for="(item, index) in list" :key="index">
        <component :ref='item.path' :is="item.component"></component>
      </div>
    </div>
  </div>
</template>

<script>
  import Swiper from './swiper.min.js'
  import Recommend from '@/components/discover/recommend/recommend'
  import Activity from '@/components/discover/activity/activity'
  import Information from '@/components/discover/information/information'
  import Now from '@/components/discover/now/now'

  export default {
    components: {
      Recommend,
      Activity,
      Information,
      Now
    },
    props: ['height', 'placeholderHeight'],
    data() {
      return {
        list: [{
            path: '/recommend',
            component: Recommend
          },
          {
            path: '/now',
            component: Now
          },
          {
            path: '/information',
            component: Information
          },
          {
            path: '/activity',
            component: Activity
          }
        ]
      }
    },
    computed: {
      windowHeight() {
        return this.height + this.placeholderHeight
      }
    },
    methods: {
      initSwiper() {
        const self = this
        const mySwiper = new Swiper('#tabs-container', {
          initialSlide: this.$route.meta.index,
          speed: 500,
          on: {
            slideChange: function () {
              self.$root.eventHub.$emit('changeTab', this.activeIndex)
              self.closePlayer('/recommend', '/information')
            }
          }
        })

        this.$root.eventHub.$on('changeSlide', (index) => {
          mySwiper.slideTo(index)
        })
      },
      saveScrollTop() {
        const swiperSlides = document.querySelectorAll('.swiperSlide')

        for (var i = 0, swiperSlide; swiperSlide = swiperSlides[i++];) {
          ((swiperSlide, i) => {
            i--
            var timer1 = null // 防抖
            var timer2 = null // 节流
            var start = +new Date
            var startPos = 0

            swiperSlide.addEventListener('scroll', () => {
              var end = +new Date
              var endPos = swiperSlide.scrollTop

              clearTimeout(timer1)
              clearTimeout(timer2)
              timer1 = null
              timer2 = null
              timer1 = setTimeout(() => {
                this.$route.meta.savedScrollTop = swiperSlide.scrollTop
              }, 180)
              if (end - start >= 300) {
                this.closeOverflowPlayer(i, (endPos > startPos))
                start = end
                startPos = endPos
              } else {
                timer2 = setTimeout(() => {
                  this.closeOverflowPlayer(i, (endPos > startPos))
                  startPos = endPos
                }, 300)
              }
            })
          })(swiperSlide, i)
        }
      },
      closeOverflowPlayer(i, boo) {
        var {
          path
        } = this.list[i]

        if (this.$refs[path] && this.$refs[path][0] && this.$refs[path][0].$refs[
            'myVideo']) {
          this.$refs[path][0].$refs['myVideo'].forEach((myVideo, i) => {
            if (myVideo.player.hasStarted_) {
              var {
                bottom,
                top,
                height
              } = myVideo.$el.getBoundingClientRect()
              var player = myVideo.player

              if (bottom > this.placeholderHeight) {
                if (boo && bottom - this.placeholderHeight < (height / 2)) {
                  player.pause()
                }
                if (bottom - this.windowHeight >= (height / 2)) {
                  player.pause()
                }
              } else {
                player.pause()
              }
            }
          })
        }
      },
      closePlayer(...paths) {
        paths.forEach((path) => {
          if (this.$refs[path] && this.$refs[path][0] && this.$refs[path][0].$refs[
              'myVideo']) {
            this.$refs[path][0].$refs['myVideo'].forEach((myVideo, i) => {
              if (myVideo.player.hasStarted_) {
                myVideo.player.pause()
              }
            })
          }
        })
      },
      onClosePlayer() {
        this.$root.eventHub.$on('closePlayer', (path) => {
          this.closePlayer(path)
        })
      }
    },
    mounted() {
      this.initSwiper()
      this.saveScrollTop()
      this.onClosePlayer()
    }
  }

</script>

<style scoped>
  @import './swiper.min.css';

  .swiper-container {
    overflow: hidden;
  }

  .swiper-slide {
    overflow-x: scroll;
    -webkit-overflow-scrolling: touch;
  }

</style>
