<template>
  <div>
    <header class="header MobileHeight">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">评价晒单</span>
      <span class="comit">提交</span>
    </header>
    <div style="height:.88rem" class="MobileHeight"></div>
    <ul>
      <li class="buycity flex row cocenter between" style="border-bottom:1px solid #f1f1f1;padding:0 .2rem">
        <div class="flex row">
          <img class="pictu" src="../../../static/images/test/my/car_ruifeng_s5.png" alt="" style="height:1.2rem;width:1.14rem;margin-left:.4rem">
          <div class="flex column cocenter maincenter" style="margin-left:.4rem">
            <p style="font-size:.31rem;color:#222;">马克华杯</p>
            <p style="font-size:.22rem;color:#888;">白色 400ml</p>
          </div>
        </div>
        <div class="flex row cocenter">
          <span style="font-size:.2rem;color:#222;">X 1</span>
          <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
        </div>
      </li>
    </ul>
    <div style="padding:.2rem">
        <textarea name="" placeholder="填写高质量的评论，可以获取积分哦"   style="width:100%;height:4.43rem;outline:none;border:0"></textarea>
    </div>
      
    <ul class="flex row between stars" style="padding:.2rem">
      <div style="font-size:.27rem;color:#555"> 物流评价</div>
      <div class="flex row star">
        <li>☆</li>
        <li>☆</li>
        <li>☆</li>
        <li>☆</li>
        <li>☆</li>
      </div>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  mounted(){
  	$(".MobileHeight").css({"marginTop": this.$store.state.mobileStatusBar})
     $(".star>li").click(function() {
    $(this).text("★").prevAll("li").text("★").end().nextAll("li").text("☆");
    })
    .mouseout(function() {
      $(".star").find("li").text("☆");
      $(".star>li[index=1]").text("★").prevAll("li").text("★");
    })
    .click(function() {
      $(this).attr("index", "1").siblings("li").removeAttr("index");
    });
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
  padding: 0 0.2rem;
}
.stars{
  line-height: .88rem;
}
.star li{
  font-size:.5rem;
  padding:0 .1rem;
  color:#FF5600;
}
input::-webkit-input-placeholder, textarea::-webkit-input-placeholder {
    color: #ccc;
}
input:-moz-placeholder, textarea:-moz-placeholder {
    color:#ccc;
}
input::-moz-placeholder, textarea::-moz-placeholder {
    color:#ccc;
}
input:-ms-input-placeholder, textarea:-ms-input-placeholder {
    color:#ccc;
}
</style>
