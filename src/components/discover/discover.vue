<template>
  <div>
    <Header></Header>
    <div style="height: 0.88rem"></div>
    <router-view/>
  </div>
</template>

<script>
  import Header from '../Header'
  export default {
    name: "discover",
    components:{
     Header
     },
    mounted(){
        // alert(this.$store.state.userId)
      //获取taken
      if(isMobile.Android()) {
        var getToken = window.NativeJavaScriptInterface.getToken();
      }
    }
  }
</script>

<style scoped>

</style>
