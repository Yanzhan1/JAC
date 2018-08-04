<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">我的经销商</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <ul v-for="(item,index) in 3" :key="index" class="flex column " style="padding:.3rem;border-bottom:.1rem solid #f5f5f5" >
            <div class="titles">瑞风 S 7</div>
            <li class="flex column" >
                <p class="mydelar">购车经销商</p>
                <div class="flex row between" style="border-bottom:1px solid #f1f1f1;padding:.2rem 0">
                    <div style="width:2.56rem;height:1.68rem;border-radius:6px;overflow:hidden">
                        <img style="width:100%;height:1.68rem" src="../../../static/images/Wit/bg-mine.png" alt="">
                    </div>
                    <div class="flex column around">
                        <span style="font-size:.29rem;color:#222;">上海市永达汽车销售</span>
                        <span style="font-size:.23rem;color:#888;">电话：021-342423424</span>
                        <span class="flex row cocenter">
                            <img style="width:.19rem;height:.22rem;margin-right:.1rem;" src="../../../static/images/Wit/list_position_icon.png" alt="">
                            <span style="font-size:.23rem;color:#888;">上海市闵行区464弄</span>
                        </span>
                    </div>
                    <div class="flex column between cocenter" style="padding:.1rem 0">
                        <span style="font-size:.19rem;color:#888;">0.3km</span>
                        <img @click="search()" style="width:.42rem;" src="../../../static/images/Wit/nav_btn.png" alt="">
                    </div>
                </div>
            </li>
        </ul>
        

        <mt-popup v-model="popupVisible" position="bottom">
            <div style="height:2.5rem;width:100%;">
                <ul class="search">
                    <li>高德导航</li>
                    <li>百度地图</li>
                    <li class="cancel" @click="cancel()">取消</li>
                </ul>
            </div>
        </mt-popup>
    </div>
</template>
<script>
import { Popup } from "mint-ui";
export default {
  data() {
    return {
      popupVisible: false,
     
    };
  },
  methods: {
    search() {
      this.popupVisible = true;
    },
    cancel() {
      this.popupVisible = false;
    }
  }
};
</script>
<style scoped>
.mint-popup {
  width: 100%;
}
.search {
  text-align: center;
}
.search li {
  font-size: 0.3rem;
  color: #222;
  text-align: center;
  height: 0.8rem;
  line-height: 0.8rem;
  border-bottom: 1px solid #f1f1f1;
}
.search .cancel {
  font-size: 0.3rem;
  color: #888;
  border: 0;
}
.titles {
  font-size: 0.29rem;
  color: #555;
}
.mydelar {
  width: 6.9rem;
  color: #fff;
  line-height: 0.5rem;
  padding-left: 0.3rem;
  background-color: #49bbff;
  margin-top: 0.33rem;
}
</style>

