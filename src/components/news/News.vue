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
            <!--<router-link to="/info/information" tag="li" class="flex row cocenter between" style="height:.97rem;border-bottom:.01rem solid #f1f1f1">-->
                <div class="flex row cocenter rela">
                    <img src="../../../static/images/my/icon_message_system.png" alt="" style="width:.36rem;height:.36rem">
                    <span style="font-size:.27rem;color:#555;margin-left:.2rem" class="active">消息</span><span class="infos" v-if="allstatus.inform"></span>
                </div>
                <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
            </router-link>

            <!--<router-link to="/discuss" tag="li" class="flex row cocenter between" style="height:.97rem;border-bottom:.01rem solid #f1f1f1">-->
            <router-link to="/info/comments" tag="li" class="flex row cocenter between" style="height:.97rem;border-bottom:.01rem solid #f1f1f1">
                <div class="flex row cocenter rela">
                    <img src="../../../static/images/my/icon_message_commernt.png" alt="" style="width:.32rem;height:.36rem">
                    <span style="font-size:.27rem;color:#555;margin-left:.2rem" class="active">评论</span><span class="infos" v-if="!allstatus.commentReadFlag"></span>
                </div>
                <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
            </router-link>
            <!--<router-link to="/activenew" tag="li" class="flex row cocenter between" style="height:.97rem;border-bottom:.01rem solid #f1f1f1">-->
            <router-link to="/info/activitys" tag="li" class="flex row cocenter between" style="height:.97rem;border-bottom:.01rem solid #f1f1f1">
                <div class="flex row cocenter rela">
                    <img src="../../../static/images/my/icon_message_activity.png" alt="" style="width:.32rem;height:.36rem">
                    <span style="font-size:.27rem;color:#555;margin-left:.2rem">活动</span><span class="infos" v-if="!allstatus.activityReadFlag"></span>
                </div>
                <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
            </router-link>
            <router-link to="/mywl" tag="li" class="flex row cocenter between" style="height:.97rem;border-bottom:.01rem solid #f1f1f1">
                <div class="flex row cocenter rela">
                    <img src="../../../static/images/my/icon_message_logistics.png" alt="" style="width:.32rem;height:.36rem">
                    <span style="font-size:.27rem;color:#555;margin-left:.2rem">物流</span><span class="infos" v-if="allstatus.logistics"></span>
                </div>
                <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
            </router-link>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {
      allstatus:{

      }
    };
  },
  methods: {
    init(){
      this.$http.post(IMFORMATION.unRead,{uid:this.$store.state.userId}).then((res)=>{
          this.allstatus = res.data.data
      })
    },
    setMsgState(res){
      this.allstatus = res;
    },
    checkLogin(){
      if (!this.$store.state.userId){
        return false;
      }else{
        return true;
      }
    }
  },
  mounted(){
    /*var falg = this.checkLogin();
    if (!falg){
      if (isMobile.iOS()) {
        window.webkit.messageHandlers.login.postMessage({});
      } else if(isMobile.Android()) {
        js2android.login();
      }
    }*/
    window.setMsgState = this.setMsgState;
    this.init()
  }
};
</script>

<style scoped>
/*.active:before {
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
}*/
.infos {
  position: absolute;
  width: 0.12rem;
  height: 0.12rem;
  border-radius: 50%;
  background-color: #ea5665;
  display: block;
  top: 0.05rem;
  right: -.3rem;
}
  .rela{
    position: relative;
  }
</style>
