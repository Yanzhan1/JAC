<template>
    <div class="box">
        <mhead currentTitle="定金支付"></mhead>
        <div class="box_img">
            即将更新,尽请期待
        </div>
    </div>
</template>

<script>
import PublicHead from "../publicmodel/PublicHead";
export default {
  components: {
    mhead: PublicHead
  }
};
</script>

<style scoped>
.box {
  width: 100%;
  height: 100%;
  position: relative;
}
.box_img {
  text-align: center;
  margin-top: 5.5rem;
  font-size: 0.5rem;
  font-family: "PingFang-SC-Regular";
  font-weight: 400;
  color: rgba(73, 187, 255, 1);
}
</style>
