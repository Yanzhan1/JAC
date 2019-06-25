<template>
  <div>
    <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">车辆驾驶行为分析</span>
          <span>
            图片
          </span>
      </header>
      <div style="height:0.88rem" class="MobileHeight"></div>
  </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  mounted(){
    $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
  }
}
</script>

<style scoped>

</style>
