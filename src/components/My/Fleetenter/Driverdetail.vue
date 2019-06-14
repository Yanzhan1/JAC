<template>
    <div>
      <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">司机详情</span>
          <span >
            <router-link tag="div" style="color:#49BBFF" to="/myindex/addBus">编辑</router-link>
          </span>
      </header>
      <div style="height:0.88rem" class="MobileHeight"></div>
      <div class="name">罗效益</div>
      <div class="box flex">
        <div class="title">
            <div>手机号码</div>
            <div>身份证号</div>
            <div>紧急联系人</div>
            <div>地址</div>
        </div>
        <div class="content">
            <div>1132432</div>
            <div>32832943241111342x</div>
            <div>洛小鱼  12321432543</div>
            <div>上海田林路啦啦啦啦</div>
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

  },
  created(){
    $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
  }
}
</script>

<style scoped>
  .header{
    background: #fff;
    border-bottom:.01rem solid #eeeeee;
  }
  .name{
    font-size:.3rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(73,187,255,1);
    margin: .3rem 0 0 .3rem;
  }
  .box{
    height: 2.8rem;
    width: 100%;
    border-bottom:.02rem solid #eeeeee
  }
  .box .title{
    margin-left: .28rem
  }
  .box .title>div{
    margin: .2rem 0;
  }
  .box .content{
    margin-left: .28rem
  }
   .box .content>div{
    margin: .2rem 0;
  }
</style>
