<template>
  <div>
    <header :id="id" :class="title ? 'header2' : 'header1'">
      <div class="top" :style="$statusBarHeightObj"></div>
      <div class="bottom">

        <div class="btn-wrapper left">
          <span class="btn" @click="goBack">
            <slot name="backblue"></slot>
            <slot name="backfff"></slot>
            <!--<img v-if="title" src="../../../../static/images/discover/backblue.png" />
            <img v-else src="../../../../static/images/discover/backfff.png" />-->
          </span>
        </div>

        <p class="title">{{title}}</p>

        <div class="btn-wrapper right">
          <span class="btn">
            <slot name="share"></slot>
          </span>
          <span class="text">
            <slot name="submit"></slot>
          </span>
        </div>

      </div>
    </header>
    <div v-if="title" class="box" style="box-sizing: content-box;" :style="$statusBarHeightObj"></div>
  </div>
</template>

<script>
  export default {
    props: {
      title: { //页面头部标题
        type: String,
        default: ''
      },
      id: {
        type: String,
        default: 'asd'
      }
    },
    methods: {
      //返回上一级
      goBack: function () {
        this.$router.go(-1);
        this.$store.dispatch("showFoot")
      }
    }
  }

</script>

<style scoped>
  #qwe {
    background-color: #fff;
  }

  header {
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    padding: 0 0.3rem;
    text-align: center;
  }

  header.header1 {
    background-color: rgba(255, 255, 255, 0);
  }

  header.header2 {
    border-bottom: 1px solid #F1F1F1;
  }

  .bottom {
    position: relative;
  }

  .btn-wrapper {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
  }

  .btn-wrapper.left {
    left: 0;
  }

  .btn-wrapper.right {
    right: 0;
  }

  .title {
    height: 0.88rem;
    font-size: 0.36rem;
    line-height: 0.88rem;
  }

  .btn {
    width: 0.4rem;
    height: 0.4rem;
  }

  .btn img {
    display: block;
    width: 100%;
    height: 100%;
  }

  .box {
    height: 0.88rem;
  }

  .text {
    font-size: 0.28rem;
    color: #49BBFF;
  }

  .header-title-fff{
    color: #222222;
    font-size: 0.36rem;
  }
</style>
