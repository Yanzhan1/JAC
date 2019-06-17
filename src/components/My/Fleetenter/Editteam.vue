<template>
    <div>
      <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">编辑车队</span>
          <span >
            <router-link tag="div" style="color:#FF3030" to="/myindex/addBus">删除车队</router-link>
          </span>
        </header>
        <div style="height:0.88rem;" class="MobileHeight"></div>
    </div>
</template>

<script>
export default {
  data(){
    return{

    }
  },
  created(){
         $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
    }
}
</script>

<style>

</style>
