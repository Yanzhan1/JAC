<template>
  <div>
    <Header @goIsNow="goIsNow"></Header>
    <div style="height: 0.88rem"></div>
    <router-view v-if="flag" />
  </div>
</template>

<script>
  import Header from '../Header'
  export default {
    name: "discover",
    data(){
      return {
        flag: true
      }
    },
    methods: {
      goIsNow(){
        this.flag = false
        setTimeout(()=>{
          this.flag = true
        })
      }
    },
    components:{
     Header
     },
  }
</script>

<style scoped>

</style>
