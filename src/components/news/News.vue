<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">消息</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <ul style="padding:0 .32rem" class="ulList">
            <router-link to="/stynew" tag="li" class="flex row cocenter between" style="height:.97rem;border-bottom:.01rem solid #f1f1f1">
                <div class="flex row cocenter">
                    <img src="../../../static/images/my/icon_message_system.png" alt="" style="width:.36rem;height:.36rem">
                    <span style="font-size:.27rem;color:#555;margin-left:.2rem" class="active">消息</span>
                </div>
                <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
            </router-link>

            <router-link to="/discuss" tag="li" class="flex row cocenter between" style="height:.97rem;border-bottom:.01rem solid #f1f1f1">
                <div class="flex row cocenter">
                    <img src="../../../static/images/my/icon_message_commernt.png" alt="" style="width:.32rem;height:.36rem">
                    <span style="font-size:.27rem;color:#555;margin-left:.2rem" class="active">评论</span>
                </div>
                <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
            </router-link>
            <router-link to="/activenew" tag="li" class="flex row cocenter between" style="height:.97rem;border-bottom:.01rem solid #f1f1f1">
                <div class="flex row cocenter">
                    <img src="../../../static/images/my/icon_message_activity.png" alt="" style="width:.32rem;height:.36rem">
                    <span style="font-size:.27rem;color:#555;margin-left:.2rem">活动</span>
                </div>
                <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
            </router-link>
            <router-link to="/mywl" tag="li" class="flex row cocenter between" style="height:.97rem;border-bottom:.01rem solid #f1f1f1">
                <div class="flex row cocenter">
                    <img src="../../../static/images/my/icon_message_logistics.png" alt="" style="width:.32rem;height:.36rem">
                    <span style="font-size:.27rem;color:#555;margin-left:.2rem">物流</span>
                </div>
                <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {}
};
</script>

<style scoped>
.active:before {
  content: "";
  position: relative;
  display: block;
  top: 0.15rem;
  left: 0.6rem;
  color: #fc3b46;
  width: 0.12rem;
  height: 0.12rem;
  background-color: #fc3b46;
  border-radius: 50%;
}
</style>
