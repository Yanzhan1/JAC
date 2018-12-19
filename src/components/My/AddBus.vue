<template>
  <div class="add-bus">
    <!--<header class="header">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">添加车辆</span>
      <span class="header-right"></span>
    </header>
    <div style="height:0.88rem"></div>-->
    <mhead currentTitle="添加车辆"></mhead>
    <div class="rame-number">
      <span style="color: #555555;">车架号(VIN)</span>
      <input type="text" placeholder="请输入VIN码"  v-model="rame" style="text-transform:uppercase" />
    </div>
    <div class="rame-number">
      <span style="color: #555555;">发动机号</span>
      <input type="text" placeholder="请输入发动机号" v-model="engine"  style="text-transform:uppercase" />
    </div>
    <img class="driver-licence" :src="'./static/images/my/drivingcard.png'" alt="" />
    <div class="bottom-btn " @click="AddMybus()">提交</div>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import PublicHead from '../publicmodel/PublicHead';
export default {
  name: "addBus",
  components: {
  	mhead:PublicHead
  },
  data() {
    return {
      //pin码
      rame: "",
      //发动机码
      engine: ""
    };
  },
  mounted(){
    // alert(this.$store.state.mobile)
    // alert(this.$store.state.userId)
    // alert(this.$store.state.trueuserId)
  },
  methods: {
    AddMybus() {
     var param = {
       no:this.$store.state.userId,
        vin: this.rame.toUpperCase().replace(/\s*/g,""),
        operationType: "CAR_BINDING",
        userId:this.$store.state.userId,
        phone:this.$store.state.mobile,
        aaaUserID: this.$store.state.aaaid,
        operation: 1,
        extParams: {
          engineNo: this.engine.toUpperCase().replace(/\s*/g,"")
        }
      };
      // alert(JSON.stringify(param))
      //  alert(JSON.stringify(this.$store.state.getpin))
      this.$http.post(My.JFmybus, param,this.$store.state.tsppin).then(res => {
        if (res.data.returnSuccess) {
          Toast({
            message: "添加成功！",
            duration: 1000,
            position: "middle"
          });
           if (isMobile.iOS()) {
          var params = {};
              window.webkit.messageHandlers.syncVehicleList.postMessage();
            } else if (isMobile.Android()) {
              js2android.syncVehicleList();
          }
          var self = this;
          setTimeout(function() {
            self.$router.go(-1);
          }, 2000);
        } else {
          Toast({
            message: res.data.returnErrMsg,
            duration: 1000,
            position: "middle"
          });
        }
      });
    }
  }
};
</script>

<style scoped>
.rame-number {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92%;
  height: 1rem;
  margin: 0 auto;
  border-bottom: 1px solid #f1f1f1;
}
input {
  width: 3rem;
  border: none;
  outline: none;
  margin-right:.4rem
}
.driver-licence {
  width: 84%;
  height: 3.6rem;
  margin: 0.56rem auto 0 auto;
}
</style>