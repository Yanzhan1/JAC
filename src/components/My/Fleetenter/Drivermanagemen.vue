<template>
   <div>
        <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">司机管理</span>
          <span >
            <router-link tag="div" style="color:#49BBFF" to="/felltManagement/addDriver">添加司机</router-link>
          </span>
        </header>
        <div style="height:0.88rem" class="MobileHeight"></div>
        <!-- <div class="mui-table-view-cell">
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
        </div> -->
        <div class="box">
              <div class="left flex cocenter between">
                  <div class="name">洛小鱼</div>
                  <div class="phone">15968838382</div>
                  <div class="detail" @click="todetail">详情 ></div>
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
  methods:{
    todetail(val){
        this.$router.push({
          path:'/felltManagement/driverdetail',
          // query:{
          //   item:val
          // }
        })
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
   border-bottom: .01rem solid #eee;
}
.box .left{
  width: 90%;
  margin: 0 auto;
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
    margin-left: -2.3rem;
}
.box .left .detail{
    font-size:.24rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(73,187,255,1);
}
</style>
