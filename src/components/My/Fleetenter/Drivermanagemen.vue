<template>
   <div>
        <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">司机管理</span>
          <span >
            <router-link tag="div" style="color:#49BBFF" to="/myindex/addBus">添加司机</router-link>
          </span>
        </header>
        <div style="height:0.88rem" class="MobileHeight"></div>
        <div class="mui-table-view-cell">
            <div class="mui-slider-right mui-disabled">
              <a class="mui-btn mui-btn-primary" style="background-color:#F4F4F4;">删除司机</a>
              <a class="mui-btn mui-btn-red">授权车辆</a>
            </div>
            <div class="mui-slider-handle">
              <div class="mui-table-cell">
                  <div class="box">
                        <div class="left">
                            <div class="name">洛小鱼</div>
                            <div class="phone">15968838382</div>
                        </div>
                        <div class="right">
                            <div class="title">授权车辆</div>
                            <div class="content">
                                <div class="name">宝马XX</div>
                                <div class="plate">浙A88888</div>
                            </div>
                        </div>
                  </div>
              </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  data(){
      return{

      }
  },
  mounted(){
      $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
  }
}
</script>

<style scoped>
.header{
  border-bottom: .01rem solid #eee;
}
.mui-table-view-cell{
  border-bottom:.01rem solid #eee;
}
.box{
   width:100%;
   height: 1.2rem;
   display:flex;
   align-items: center;
   justify-content: space-between;
}
.box .left .name{
    font-size:.28rem;
    font-family:'PingFang-SC-Bold';
    font-weight:bold;
    color:rgba(34,34,34,1);
}
.box .left .phone{
    font-size:.24rem;
    font-family:'PingFang-SC-Medium';
    font-weight:500;
    color:rgba(85,85,85,1);
    margin-top: .15rem;
}
.box .right{
  margin-left: 2rem;
}
.box .right .title{
  font-size:.22rem;
  font-family:'PingFang-SC-Medium';
  font-weight:500;
  color:rgba(85,85,85,1);
}
.box .right .content{
  display: flex;
  align-items: center;
}
.box .right .content .name{
  font-size:.3rem;
  font-family:'PingFang-SC-Bold';
  font-weight:bold;
  color:rgba(73,187,255,1);
}
.box .right .content .plate{
  font-size:.22rem;
  font-family:'PingFang-SC-Bold';
  font-weight:bold;
  color:rgba(136,136,136,1);
  margin-left: .4rem;
}
</style>
