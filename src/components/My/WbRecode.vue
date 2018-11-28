<template>
    <div>
        <!--<header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">维保记录</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>-->
        <mhead currentTitle="维保预约记录"></mhead>
        <ul>
            <li v-for="(item,index) in 5" :key="index">
                <div class="times">
                    <span class="tim">2017.04.03</span>
                    <!-- <span class="timr">预约成功</span>
                    <span class="timr">已过期</span> -->
                    <span class="timrs">已取消</span>
                </div>
                <div class="flex row between maincenter" style="padding:.4rem">
                    <!-- <div class="flex column maincenter cocenter" style="margin-left:.2rem">
                        <span><img src="../../../static/images/Wit/bg-mine.png" alt="" style="width:2.46rem;height:1.2rem"></span>
                        <span class="busname">瑞风 S5</span>
                    </div> -->
                    <div class="flex column maincenter" style="margin-right:.5rem">
                        <span class="titlecar">瑞风M5</span>
                        <span class="leftname">维保网点：上海市闵行区</span>
                        <span class="leftname">维保类型：</span>
                    </div>
                </div>
            </li>

        </ul>
    </div>
</template>
<script>
import { Popup } from "mint-ui";
import PublicHead from "../publicmodel/PublicHead";
export default {
  components: {
    mhead: PublicHead
  },
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>
<style scoped>
.times {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  border-top: 0.1rem solid #f1f1f1;
  border-bottom: 0.01rem solid #f1f1f1;
}
.tim {
  line-height: 0.85rem;
  font-size: 0.22rem;
  color: #222;
  padding-left: 0.4rem;
  display: block;
}
.timr {
  width: 1.5rem;
  height: 0.27rem;
  font-size: 0.28;
  font-family: "PingFang-SC-Regular";
  font-weight: 400;
  color: rgba(73, 187, 255, 1);
}
.timrs {
  width: 1.5rem;
  height: 0.27rem;
  font-size: 0.28;
  font-family: "PingFang-SC-Regular";
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}

.titlecar {
  width: 12rem;
  height: 0.32rem;
  font-size: 0.34rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
}
.busname {
  font-size: 0.24rem;
  color: #49bbff;
  margin-top: 0.14rem;
}
.leftname {
  font-size: 0.24rem;
  color: #555;
  margin-top: 0.5rem;
}
</style>

