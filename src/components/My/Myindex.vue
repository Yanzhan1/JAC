<template>
  <div>
    <div class="mytop">
      <div class="flex between mytopicon cocenter">
        <img src="../../../static/images/my/mine_service@2x.png" alt="">
        <img src="../../../static/images/my/mine_message@2x.png"  alt="" @click="tonews()" >
      </div>
      <div class="mytophead flex between cocenter">
        <div @click="edict()" style="padding-left: 0.3rem;padding-right: 0.2rem" class="flex cocenter">
          <img src="../../../static/images/test/my/pic_touxiang@2x.png" alt="" style="width: 1.2rem;height: 1.2rem">
          <div class="flex column" style="margin-left: 0.2rem;">
            <div class="flex cocenter" style="overflow: hidden">
              <span style="color: #fff;font-size: 0.32rem;font-weight: bold">李逍遥</span>
              <img src="../../../static/images/my/gender_man@2x.png" alt="" style="width: 0.28rem;height: 0.28rem">
            </div>
            <span style="margin-top: 0.16rem;font-size: 0.22rem;color: #dcf5ff;">记录美好的时刻...</span>
          </div>
        </div>
        <img  @click="twoma()" src="../../../static/images/my/qr_code@2x.png" alt="" style="width: 0.4rem;height: 0.4rem">
      </div>
      <div class="mytopbottom flex around">
        <div>
          <span>176</span>
          <span>获赞</span>
        </div>
        <div>
          <span>3</span>
          <span>发布</span>
        </div>
        <div>
          <span>0</span>
          <span>关注</span>
        </div>
        <div>
          <span>107</span>
          <span>粉丝</span>
        </div>
      </div>
    </div>
    <div class="mybottom">
    	<router-link tag="div" class="mylist" to="/myindex/myBus">
    		<div class="flex cocenter">
          <img src="../../../static/images/my/mine_car@2x.png" alt="">
          <span>我的车辆</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
    	</router-link>
      <div class="mylist" @click="myorder()">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_list@2x.png" alt="">
          <span>我的订单</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div>
      <div class="mylist">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_record_maintanance@2x.png" alt="">
          <span>维保记录</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div>
      <div class="mylist">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_collection@2x.png" alt="">
          <span>我的收藏</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div>
      <div class="mylist">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_activity@2x.png" alt="">
          <span>我的活动</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div>
      <div class="mylist" @click="my_dealer()">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_agency@2x.png" alt="">
          <span>我的经销商</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div>
      <div class="mylist">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_recommend@2x.png" alt="">
          <span>推荐码</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div>
      <div class="mylist">
        <div class="flex cocenter">
          <img src="../../../static/images/my/mine_code@2x.png" alt="">
          <span>扫一扫</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </div>
      <!--<router-link tag="div" class="mylist" to=""></router-link>-->
      <router-link tag="div" class="mylist" to="/myindex/mySetUp">
      	<div class="flex cocenter">
          <img src="../../../static/images/my/mine_set@2x.png" alt="">
          <span>设置</span>
        </div>
        <img src="../../../static/images/my/next@2x.png" alt="">
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Myindex",
  data() {
    return {};
  },
  methods: {
    edict() {
      this.$router.push("/edictperson");
    },
    my_dealer() {
      this.$router.push("/my_dealer");
    },
    myorder() {
      this.$router.push("/myorder");
    },
    tonews(){
     this.$router.push('/news')
    },
    twoma(){
     this.$router.push('/twoma')
    }
  },
  mounted() {}
};
</script>
<style scoped>
.mytop {
  height: 4.28rem;
  padding: 0 0.3rem;
  background: url("../../../static/images/my/bg-mine@2x.png") no-repeat center
    center;
  background-size: 100% 100%;
  position: relative;
}
.mytopicon {
  height: 0.88rem;
}
.mytopicon > img {
  width: 0.4rem;
  height: 0.4rem; 
   
}
.mytophead {
  margin-top: 0.1rem;
}
.mytopbottom {
  position: absolute;
  bottom: 0;
  left: 0;
  padding: 0.3rem;
  width: 100%;
}
.mytopbottom > div {
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
}
.mytopbottom > div > span:nth-child(1) {
  font-size: 0.36rem;
}
.mytopbottom > div > span:nth-child(2) {
  font-size: 0.24rem;
  color: #dcf5ff;
}
.mybottom {
  padding-top: 0.2rem;
}
.mylist {
  height: 1rem;
  padding: 0 0.3rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f1f1f1;
}
.mylist img {
  width: 0.4rem;
  height: 0.4rem;
}
.mylist span {
  font-size: 0.28rem;
  color: #555555;
  margin-left: 0.2rem;
}
</style>
