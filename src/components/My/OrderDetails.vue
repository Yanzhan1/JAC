<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">订单详情</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <ul style="padding:0 .32rem;border-bottom:.2rem solid #F9F9F9">
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
                <span>预定车型</span>
                <span>{{userinfo.seriesName}}</span>
            </li>
             <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
                <span>省</span>
                <span>{{userinfo.address}}</span>
            </li>
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
                <span>市</span>
                <span>{{userinfo.address}}</span>
            </li>
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
                <span>经销商</span>
                <span>{{userinfo.dealerName}}</span>
            </li>
            <!-- <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
                <span>推荐码</span>
                <span>{{userinfo.model}}</span>
            </li> -->
        </ul>
        <ul style="padding:0 .32rem;border-bottom:.2rem solid #F9F9F9">
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
                <span>姓名</span>
                <span>{{userinfo.customerName}}</span>
            </li>
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
                <span>称谓</span>
                <span>{{userinfo.gender}}</span>
            </li>
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
                <span>手机号</span>
                <span>{{userinfo.mobile}}</span>
            </li>
        </ul>
        <ul style="padding:0 .32rem;border-bottom:.2rem solid #F9F9F9">
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
                <span>电子邮箱</span>
                <span>{{userinfo.email}}</span>
            </li>
           
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
                <span>地址</span>
                <span>徐汇田林</span>
            </li>
        </ul>
        <div style="padding:0 .3rem">
            <p style="font-size:.27rem;color:#222;padding:.3rem 0">备注说明</p>
             <div class="content">
                中午12点取，记得把车洗好！
            </div>
        </div>

    </div>
</template>

<script>
export default {
  data() {
    return {
        userinfo:{}//存放用户信息
    };
  },
  created(){
    this.userinfo=this.$route.query
 alert(JSON.stringify(this.userinfo))
   }
};
</script>

<style scoped>
ul li:last-child {
  border-bottom: none !important;
}
ul li span:first-child {
  color: #555;
  font-size: 0.26rem;
}
ul li span:last-child {
  color: #222;
  font-size: 0.26rem;
}
.content{
    height:1.14rem;
    background-color: #f8f8f8;
    padding:.3rem;
    color:#222;
    font-size:.36rem

}
</style>
