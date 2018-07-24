<template>
  <div>
    <header class="header">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <div id="tip">
        <span class="header-title active" style="margin-right:.2rem">全部车型</span>
        <span class="header-title">主推车型</span>
      </div>
      <span @click="shai()" class="header-right"><img src="../../../static/images/Wit/shaixuan1@3x.png" alt="" style="width:.4rem"></span>
    </header>
    <div style="height:.88rem"></div>
    <ul>
      <li class="bus_li" v-for="(item,index) in 5" :key="index">
        <img src="../../../static/images/Wit/bg-mine.png" alt="">
        <div class="bus_1">
          <span class="bus_2">瑞丰S7</span>
          <span class="bus_3">
            <span style="color:#a5a5a5;font-size:.22rem"> 官方指导价</span> ：9.7万起</span>
        </div>
        <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
      </li>
    </ul>
    <mt-popup v-model="popupVisible" position="middle">
      <div style="width:100%;text-align:center;line-height:.88rem;font-size:.36rem;color:#555555;border-bottom:1px solid #f1f1f1">
        切换频道
      </div>
      <div class="flex row cocenter roe">
        <label class="input-label" :class="{active: selected_all}" @click="slect_all"></label>
        <span class="txt" style="margin-left:.1rem">全选</span>
      </div>
      <ul class="flex row wrap between">
        <li class="flex row cocenter list_li" v-for="(item,index) in good_list" :key="index">
          <label class="input-label" :class="{active: item.is_selected}" @click="select_one(index)"></label>
          <span class="txt" style="margin-left:.1rem">{{item.name}}</span>
        </li>

      </ul>
      <div class="fot">
        <p class="pp" style="" @click="fn">取消</p>
        <p class="sure" style="" @click="fn">确定</p>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { Popup } from "mint-ui";
import { Radio } from "mint-ui";
export default {
  data() {
    return {
      popupVisible: false,
      selected_all: false,
      good_list: [
        { name: "乘用车", is_selected: false },
        { name: "新能源", is_selected: false },
        { name: "商务车", is_selected: false },
        { name: "轻卡", is_selected: false },
        { name: "皮卡", is_selected: false },
        { name: "重卡", is_selected: false }
      ]
    };
  },
  methods: {
    shai() {
      this.popupVisible = true;
    },
    select_one(index) {
      if (this.good_list[index].is_selected == true) {
        this.good_list[index].is_selected = false;
      } else {
        this.good_list[index].is_selected = true;
      }
    },
    slect_all() {
      if (this.selected_all) {
        for (var i = 0; i < this.good_list.length; i++) {
          this.good_list[i].is_selected = false;
        }
        this.selected_all = false;
      } else {
        for (var i = 0; i < this.good_list.length; i++) {
          this.good_list[i].is_selected = true;
        }
        this.selected_all = true;
      }
    },
    fn() {
      this.popupVisible = false;
    }
  }
};
$(function() {
  $("#tip span").on("click", function() {
    $(this)
      .addClass("active")
      .siblings()
      .removeClass("active");
  });
});
</script>
 <style scoped>
.mint-popup {
  width: 80%;
}
.fot {
  position: relative;
  width: 100%;
  display: flex;
  text-align: center;
  padding: 0.3rem;
}
.pp {
  felx: 1;
  width: 100%;
  font-size: 0.32rem;
  color: #888888;
}
.sure {
  felx: 1;
  width: 100%;
  font-size: 0.32rem;
  color: #49bbff;
}
.pp:after {
  content: "";
  position: absolute;
  right: 3rem;
  top: 0.2rem;
  width: 0.01rem;
  height: 0.6rem;
  background-color: #f1f1f1;
}
.row {
  flex-direction: row;
}
.wrap {
  flex-wrap: wrap;
  border-bottom: 1px solid #f1f1f1;
}
.wrap li:nth-of-type(odd) {
  margin-left: 0.8rem;
}
.roe {
  margin-left: 0.8rem;
  line-height: 0.88rem;
}
.active {
  color: #ccc;
}
.list_li {
  width: 40%;
  line-height: 0.88rem;
  vertical-align: middle;
}

.bus_li {
  height: 2.3rem;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.bus_li img {
  width: 2.56rem;
  height: 1.4rem;
  margin-left: 0.3rem;
}
.bus_1 {
  display: flex;
  flex-direction: column;
  margin-left: 0.38rem;
  align-items: flex-start;
}
.bus_2 {
  font-size: 0.3rem;
  color: #222;
  padding: 0.1rem 0;
}
.bus_3 {
  font-size: 0.28rem;
  color: #3a5cff;
}
.input-label {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  background-image: url("../../../static/images/Wit/weixuanzhong@2x.png");
  border-radius: 50%;
  background-size: 100%;
  margin: 0 0 0 0.2rem;
}
.input-label.active {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  background-image: url("../../../static/images/Wit/xuanzhong@2x.png");
  border-radius: 50%;
  background-size: 100%;
}
</style>
