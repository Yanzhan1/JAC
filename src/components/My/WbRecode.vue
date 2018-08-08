<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">维保记录</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <ul>
            <li v-for="(item,index) in 2" :key="index">
                <span class="tim">2017.04.03</span>
                <div class="flex row between maincenter" style="padding:.4rem">
                    <div class="flex column maincenter cocenter" style="margin-left:.2rem">
                        <span><img src="../../../static/images/Wit/bg-mine.png" alt="" style="width:2.46rem;height:1.2rem"></span>
                        <span class="busname">瑞风 S5</span>
                    </div>
                    <div class="flex column maincenter" style="margin-right:.5rem">
                        <span class="leftname">维保网点：上海市闵行区</span>
                        <span class="leftname">地点：</span>
                        <span class="leftname">维保项目：</span>
                    </div>
                </div>
            </li>

        </ul>
    </div>
</template>
<script>
import { Popup } from "mint-ui";
export default {
  data() {
    return {};
  },
  methods: {},
  created() {}
};
</script>
<style scoped>
.tim {
  line-height: 0.6rem;
  font-size: 0.22rem;
  color: #222;
  background-color: #f1f1f1;
  padding-left: 0.4rem;
  display: block;
}
.busname{
    font-size:.24rem;
    color:#49bbff;
    margin-top: .14rem;
}
.leftname{
      font-size:.24rem;
    color:#555;
    margin-top: .2rem;
}
</style>

