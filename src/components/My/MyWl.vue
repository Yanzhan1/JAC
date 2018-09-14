<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">我的物流</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <ul style="padding:.3rem">
            <!-- <li class="list">
                <div class="flex row between" style="padding:.2rem">
                    <span style="font-size:.31rem;color:#222;">订单已发货</span>
                    <span style="font-size:.21rem;color:#888;">今天12:40</span>
                </div>
                <div class="wul flex row cocenter">
                    <img src="../../../static/images/test/my/pic_touxiang@2x.png" alt="" style="margin-left:.2rem;width:1.2rem;height:1.14rem">
                    <div style="margin-left:.4rem">
                        <p style="font-size:.31rem;color:#222;">马克华杯</p>
                        <p style="font-size:.22rem;color:#888;">订单编号：5435435</p>
                    </div>
                </div>
            </li>
            <li class="list">
                <div class="flex row between" style="padding:.2rem">
                    <span style="font-size:.31rem;color:#222;">订单已签收</span>
                    <span style="font-size:.21rem;color:#888;">今天12:40</span>
                </div>
                <div class="wul flex row cocenter">
                    <img src="../../../static/images/test/my/pic_touxiang@2x.png" alt="" style="margin-left:.2rem;width:1.2rem;height:1.14rem">
                    <div style="margin-left:.4rem">
                        <p style="font-size:.31rem;color:#222;">马克华杯</p>
                        <p style="font-size:.22rem;color:#888;">订单编号：5435435</p>
                    </div>
                </div>
            </li> -->
            <div style="margin:.4rem">暂无物流信息</div>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>
<style scoped>
.list {
  width: 6.9rem;
  height: 2.7rem;
  background-color: #f5f5f5;
  margin-top: 0.4rem;
}
.wul {
  width: 6.29rem;
  height: 1.5rem;
  background-color: #fff;
  margin: 0 auto;
}
</style>
