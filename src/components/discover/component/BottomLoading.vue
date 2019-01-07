<template>
  <div class="bottom-loading" v-show="isShow">
    <template v-if="loading">
      <span class="img">
        <img src="./5-121204193R5-50.gif" alt="">
      </span>
      <span>loading</span>
    </template>
    <span v-else-if="isLastPage">the end</span>
  </div>
</template>

<script>
  export default {
    props: ['loading', 'isLastPage'],
    computed: {
      isShow() {
        return this.loading || this.isLastPage
      }
    }
  }

</script>

<style scoped>
  .bottom-loading {
    display: flex;
    justify-content: center;
    font-size: 0.3rem;
    text-align: center;
    line-height: 0.64rem;
  }

  .img {
    display: block;
    width: 0.64rem;
    height: 0.64rem;
    margin-right: 0.1rem;
  }

  .img img {
    display: block;
    width: 100%;
    height: 100%;
  }

</style>
