<template>
  <div :style="{height: `${height}px`}" id="tabs-container" class="swiper-container">
    <div class="swiper-wrapper">
      <div class="swiper-slide swiperSlide" v-for="(item, index) in list" :key="index">
        <component :is="item.component"></component>
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
    props: ['height'],
    data() {
      return {
        list: [{
            path: '/recommend',
            component: Recommend
          },
          {
            path: '/information',
            component: Information
          },
          {
            path: '/activity',
            component: Activity
          },
          {
            path: '/now',
            component: Now
          }
        ]
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
          ((swiperSlide) => {
            var timer = null

            swiperSlide.addEventListener('scroll', () => {
              clearTimeout(timer)
              timer = null
              timer = setTimeout(() => {
                this.$route.meta.savedScrollTop = swiperSlide.scrollTop
              }, 180)
            })
          })(swiperSlide)
        }
      }
    },
    mounted() {
      this.initSwiper()
      this.saveScrollTop()
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
