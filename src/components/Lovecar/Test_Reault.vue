<template>
 <div>
   <header class="header">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">车辆体检</span>
      <span class="header-right"></span>
    </header>
    <div style="height:.88rem"></div>
     <div class="flex contentcenter pic"> <img src="../../../static/images/Lovecar/shibai.png" alt="" style="height:1.16rem;width:1.16rem"></div>
      <div style="font-size:.29rem;color:#49BBFF;margin-top:.32rem;text-align:center">诊断失败</div>
      <div class="fresh">点击刷新</div>
 </div>
</template>

<script>
 export default {
   data () {
     return {

     }
   },
 }
</script>

<style scoped>
.pic{
    margin-top: 2.1rem;
}
 .fresh{
     width:5rem;
     text-align:center ;
     line-height:.98rem ;
     font-size:.31rem;
     color:#fff;
     background-color: #49BBFF;
     margin:0 auto;
     margin-top:1rem
 }
</style>
