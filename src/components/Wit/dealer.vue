<template>
    <div>
         <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">查询经销商</span>
            <span class="header-right"><img src="../../../static/images/Wit/map_icon.png" alt="" style="width:.4rem"></span>
        </header>
         <div>
             <div>
                  <span>品牌</span>
                 <img src="" alt="">
             </div>
              <div>
                  <span>车型</span>
                 <img src="" alt="">
             </div>
             <div>
                  <span>省份</span>
                 <img src="" alt="">
             </div>
              <div>
                  <span>城市</span>
                 <img src="" alt="">
             </div>
         </div>
    </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>

</style>

