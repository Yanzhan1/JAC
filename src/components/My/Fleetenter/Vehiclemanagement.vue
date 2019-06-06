<template>
      <div>
        <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">车辆管理</span>
          <span >
            <router-link tag="div" style="color:#49BBFF" to="/myindex/addBus">添加车辆</router-link>
          </span>
        </header>
        <div style="height:0.88rem" class="MobileHeight"></div>
        <div class="mui-table-view-cell">
            <div class="mui-slider-right mui-disabled">
              <a class="mui-btn mui-btn-primary" style="background-color:#F4F4F4;">删除车辆</a>
              <a class="mui-btn mui-btn-red">解除司机</a>
            </div>
            <div class="mui-slider-handle">
              <div class="mui-table-cell">
                <div class="box">
                    <div class="top">
                        <div class="seriesName">帅铃Q3</div>
                        <div class="plated">沪A 12345</div>
                        <div class="idvin">VIN:1jsakdjflkdsaf</div>
                    </div>
                    <div class="middle">
                        <div style="margin-left:.29rem;">里程</div>
                        <div>油耗</div>
                        <div>司机</div>
                    </div>
                    <div class="bottom">
                        <div style="margin-left:.29rem">123KM</div>
                        <div>11L/h</div>
                        <div style="color:#49BBFF">洛小鱼</div>
                    </div>
                </div>
              </div>
            </div>
        </div>
      </div>
</template>

<script>
export default {
    mounted(){
        $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
    }
}
</script>

<style scoped>
.header{
  border-bottom: .01rem solid #eee;
}
.box{
  width: 100%;
  height: 1.6rem;
}
.box .top{
  display: flex;
  align-items: center;
  font-weight:bold;
  color:rgba(136,136,136,1)
}
.box .top .seriesName{
  color:rgba(34,34,34,1);
  font-size: .28rem;
  margin: 0.1rem .2rem;
}
.box .top>div{
  font-size: .22rem;
  height: .3rem;
  line-height: .3rem;
}
.box .middle{
  display: flex;
  align-items: center;
}
.box .middle>div{
  font-weight:500;
  color:rgba(85,85,85,1);
  font-size: .22rem;
  margin-left: 2rem;
}
.box .bottom{
  display: flex;
  margin-top: .1rem;
}
.box .bottom>div{
  margin-left: 1.45rem;
  font-size: .3rem;
  color:rgba(34,34,34,1);
  font-weight:bold;
}
.box .top .plated{
  margin-left: .4rem;
}
.box .top .idvin{
  margin-left: 1.6rem;
}
.mui-table-view-cell{
  border-bottom: .01rem solid #eee;
}
</style>
