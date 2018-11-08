<template>
  <p class="rich-text" v-html="richText"></p>
</template>

<script>
  export default {
    props: {
      richText: {
        type: String,
        default: '',
      }
    },
    updated() {
      const richText = document.querySelector('.rich-text')
      const imgs = richText.querySelectorAll('img')

      Array.from(imgs).forEach((img, index) => {
        img.style.display = 'block'
        img.style.width = '100%'
        img.style.height = 'auto'
      })
    }
  }

</script>

<style scoped>
  .rich-text {
    font-family: PingFangSC-Regular;
    font-size: 0.28rem;
    color: #666666;
    letter-spacing: -0.29px;
    text-align: justify;
    line-height: 0.4rem;
    width: 100%;
    overflow: hidden;
    margin-bottom: 0.2rem;
  }

</style>
