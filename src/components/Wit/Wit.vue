<template>
  <div>
    <div class="tophead">
      <div class="search">
        <input class="ipt" type="text" placeholder="搜索服务">
        <img class="pic" src="../../../static/images/Wit/zhixiang_home_search_service_icon.png" alt="">
      </div>

      <ul class="ul_list">
        <li class="li_list" @click="fn()">
          <img src="../../../static/images/Wit/zhixiang_home_search_dealer_btn.png" alt="">
          <span>经销商</span>
        </li>
        <li class="li_list" @click="search_net()">
          <img src="../../../static/images/Wit/zhixiang_home_maintenance_outlets_btn.png" alt="">
          <span>维保网点</span>
        </li>
        <li class="li_list" @click="pre_weib()">
          <img src="../../../static/images/Wit/zhixiang_home_maintenance_appointment_btn.png" alt="">
          <span>维保预约</span>
        </li>
        <li class="li_list" @click="confirmRevise">
          <img src="../../../static/images/Wit/zhixiang_home_road_rescue_btn.png" alt="">
          <span>道路救援</span>
        </li>
      </ul>
    </div>
    <div class="bustype">
      <img src="../../../static/images/Wit/zhixiang_home_service_title_point.png" alt="">
      <span>智享服务</span>
    </div>
    <ul class="ul_list_1">
      <li class="li_list_1">
        <img src="../../../static/images/Wit/zhixiang_home_capacity_buy_car_btn.png" alt="">
        <span>智能选车</span>
      </li>
      <li class="li_list_1">
        <img src="../../../static/images/Wit/zhixiang_home_maintaim_search_btn.png" alt="">
        <span>保养查询</span>
      </li>
      <li class="li_list_1">
        <img src="../../../static/images/Wit/zhixiang_home_used_car_btn.png" alt="">
        <span>二手车服务</span>
      </li>
      <li class="li_list_1">
        <img src="../../../static/images/Wit/zhixiang_home_violation_search_btn.png" alt="">
        <span>违章查询</span>
      </li>
    </ul>
    <div style="height:.1rem;background-color:#f5f5f5"></div>
    <div class="bustypes" @click="tobus()">
      <div class="bustypes_1">
        <img src="../../../static/images/Wit/zhixiang_home_service_title_point.png" alt="">
        <span>主推车型</span>
      </div>
      <img src="../../../static/images/Wit/next.png" alt="">
    </div>
    <ul class="bus">
      <li class="bus_li">
        <img src="../../../static/images/Wit/bg-mine.png" alt="">
        <div class="bus_1">
          <span class="bus_2">瑞丰S7</span>
          <span class="bus_3">官方指导价：9.7万起</span>
        </div>
      </li>
      <li class="bus_li">
        <img src="../../../static/images/Wit/bg-mine.png" alt="">
        <div class="bus_1">
          <span class="bus_2">江淮IEVA50</span>
          <span class="bus_3">官方指导价：12.25万起</span>
        </div>
      </li>
    </ul>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {};
  },
  methods: {
    confirmRevise() {
      MessageBox.confirm("", {
        title: "是否允许",
        message: "发送当前定位至呼叫中心？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      })
        .then(action => {
          if (action == "confirm") {
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    },
    fn() {
      this.$router.push("/wit/dealer");
    },
    tobus() {
      this.$router.push("/wit/recoment_bus");
    },
    search_net(){
      this.$router.push('/wit/search_net')
    },
    pre_weib(){
      this.$router.push('/wit/pre_weib')
    }
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.tophead {
  height: 3.8rem;
  background-image: url("../../../static/images/Wit/bg-mine.png");
  width: 100%;
  display: block;
  background-size: content;
}
.ipt {
  height: 0.78rem;
  width: 6.5rem;
  border: 0;
  display: inline-block;
  position: relative;
  padding-left: 0.6rem;
}
.search {
  padding: 0.47rem;
  text-align: center;
}
input::-webkit-input-placeholder,
textarea::-webkit-input-placeholder {
  color: #a5a5a5;
  font-size: 0.28rem;
}
.pic {
  width: 0.42rem;
  display: block;
  position: absolute;
  top: 0.65rem;
  left: 0.6rem;
}
.ul_list {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.ul_list_1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
}
.li_list {
  display: flex;
  flex-direction: column;
  width: 1.02rem;
}
.li_list img {
  width: 1.02rem;
  display: block;
}
.li_list span {
  text-align: center;
  font-size: 0.22rem;
  color: #fff;
}
.bustype {
  height: 0.75rem;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  align-items: center;
}
.bustype img {
  width: 0.14rem;
  display: block;
  margin: 0 0.14rem;
}
.bustype span {
  font-size: 0.21rem;
  color: #222;
}
.li_list_1 {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0.26rem 0 0.5rem 0;
}
.ul_list_1 .li_list_1 span {
  color: #444;
  text-align: center;
}
.ul_list_1 .li_list_1 img {
  width: 0.72rem;
  display: block;
}
.bustypes {
  display: flex;
  flex-direction: row;
  align-items: center;
  height: 0.9rem;
  justify-content: space-between;
}
.bustypes img {
  width: 0.3rem;
  margin-right: 0.14rem;
}
.bustypes_1 {
  display: flex;
  flex-direction: row;
  align-items: center;
  /* justify-content: flex-start; */
}
.bustypes_1 img {
  width: 0.14rem;
  display: block;
  margin-left: 0.14rem;
}
.bustypes_1 span {
  font-size: 0.21rem;
  color: #222;
}
.bus {
  display: flex;
  flex-direction: column;
}
.bus_li {
  height: 2.3rem;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
</style>

