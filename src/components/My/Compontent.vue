<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">评价晒单</span>
            <span class="comit">提交</span>
        </header>
        <div style="height:.88rem"></div>
        
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.comit {
  font-size: 0.26rem;
  color: #49bbff;
}
.buycity {
  height: 2rem;
  padding:0 .2rem
}
</style>
