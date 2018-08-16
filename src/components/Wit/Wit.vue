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
      <li class="li_list_1"  @click="search()">
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
      <li class="bus_li" @click="specil" v-for="(item,index) in this.mainbus" :key="index">
        <img src="../../../static/images/Wit/bg-mine.png" alt="">
        <div class="bus_1">
          <span class="bus_2">{{item.modelName}}</span>
          <span class="bus_3">官方指导价：{{item.guidancePrice}}万起</span>
        </div>
      </li>
    </ul>

    <mt-popup v-model="popupVisible" position="center">
      <div class="bgc">
        <div style="font-size:.25rem;color:#fff;text-align:center;margin-top:.2rem">车辆VIP码：84092184032840932</div>
      </div>
      <div class="flex row maincenter" style="margin-top:.54rem">
        <div class="mt_l flex column" >
           <span style="font-size:.46rem;color:#fff;">5000 <span style="font-size:.22rem;color:#fff;">km</span> </span>
           <span style="font-size:.22rem;color:#fff;margin-top:.34rem">距离下次保养</span>
        </div>
        <div class="mt_m" style="font-size:.9rem;color:#f5f5f5;padding:0 .7rem">/</div>
        <div class="mt_r flex column ">
          <span>
                <span style="font-size:.46rem;color:#fff;">06/26</span>
                <span class="tim">2018</span>
          </span>
          <span style="font-size:.22rem;color:#fff;margin-top:.34rem">预计下次保养时间</span>
        </div>
      </div>
      <div class="know" @click="know()">我知道了</div>
      <div style="width:100%;">
        <img @click="know()"  src="../../../static/images/Wit/mycar_check.png" alt="" style="width:.58rem;height:.58rem;margin:.75rem auto">
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      popupVisible: false,
      mainbus:{},//主推车型
    };
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
    search_net() {
      this.$router.push("/wit/search_net");
    },
    pre_weib() {
      this.$router.push("/wit/pre_weib");
    },
    specil() {
      this.$router.push("/wit/Characteristic");
    },
    search(){
      this.popupVisible=true
    },
    know(){
      this.popupVisible=false
    }
  },
  created(){
        console.log(Wit)
    //获取主推车型，传{}表示全部车型
     var param={
        
     }
     this.$http.post(Wit.MainBus,param,this.$store.state.mytoken).then(res=>{
        if(res.data.code==0){
         var arr=res.data.data
          arr.splice(3)
          this.mainbus=arr
       }
     })
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}
.know{
  line-height: .82rem;
  width:5.64rem;
  background-color: #fff;
  font-size:.32rem;
  color:#4189FF;
  text-align: center;
  margin:.6rem auto;
  border-radius: .2rem;
}
.tim{
  font-size:.14rem;
  background-color: #fff;
  color:#3B67FF;
  line-height: .24rem;
  padding:0 .1rem
}
.mint-popup {
  width: 90%;
  height: 4.12rem;
  background-image: url("../../../static/images/Wit/windows_maintain_search_bg.png");
  background-size: 100%;
  top: 42%;
  border-radius: .2rem;
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

