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
  }
</script>

<style scoped>

</style>
