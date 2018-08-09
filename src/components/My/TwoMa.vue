<template>
  <div>
    <header class="header">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">我的二维码</span>
      <span class="header-right"></span>
    </header>
    <mt-popup v-model="popupVisible" position="center">
      <div class="flex row cocenter">
        <img src="../../../static/images/test/my/pic_touxiang@2x.png" alt="" style="margin:.3rem;width:1.2rem;height:1.2rem">
        <div>
          <span class="flex row cocenter">
            <span style="font-size:.31rem;color:#222;">李逍遥</span>
            <img src="../../../static/images/my/gender_woman@2x.png" alt="" style="width:.2rem;height:.2rem">
          </span>
          <span style="font-size:.22rem;color:#555;">记忆得美好时刻</span>
        </div>
      </div>
      <div class="flex cocenter maincenter">
        <img src="../../../static/images/my/er.png" alt="" style="width:4.3rem;height:4.3rem">
      </div>

    </mt-popup>
  </div>
</template>

<script>
export default {
  data() {
    return {
      popupVisible: true
    };
  }
};
</script>

<style scoped>
.mint-popup {
  width: 80%;
  height: 7.4rem;
}
</style>
