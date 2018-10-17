<template>
  <div class="my-bus">
    <header class="header MobileHeight">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">我的车辆</span>
      <span class="header-right">
        <router-link tag="img" to="/myindex/addBus" style="width: 0.36rem;height: 0.36rem;" :src="'./static/images/my/mycar_add.png'"></router-link>
      </span>
    </header>
    <div style="height:0.88rem" class="MobileHeight"></div>
   <ul class="bus-list">
      <li class="bus-content flex-center-between" v-for="(item,index) in BusDetails" :key="index">
        <div class="bus-left">
          <div class="bus-name flex-align-center">
            <label for="foot-check" class="input-label deft_0" :class="{active:item.def==1}" @click="setOneDefault(item.vin,item.def)"> </label>
            <span style="color: #49BBFF;">{{item.vehicleName}}{{item.def==1?'（默认）':''}}</span>
          </div>
          <img :src="item.imageUrl" alt="" />
        </div>
        <div class="bus-right">
          <p class="bus-untie" @click="unite(item.vin)">解绑</p>
          <!-- 若有车牌 解绑车牌 -->
          <div class="flex-align-center" v-if="item.plateLicenseNo?'false':''"   @click="plate(item.vin,item.plateLicenseNo)">
            <span style="color:#49BBFF;"> {{item.plateLicenseNo}}</span>
            <img :src="'./static/images/my/mycar_input@2x.png'" alt="" class="modify-num">
          </div>
          <!-- 若无车牌 添加车牌 -->
          <div class="flex-align-center" v-else>
            <span style="color:#49BBFF;">添加车牌</span>
            <router-link tag="img" class="modify-num" :src="'./static/images/my/mycar_input@2x.png'" :to="{path:'/myindex/plateBind',query:{vin:item.vin}}"></router-link>
          </div>
          <div class="flex row cocenter">
            <span class="commonFontSize">车架号：{{item.vin}}</span>
</div>
          <div>
            <span class="commonFontSize">发动机号：{{item.engineNo}}</span>
          </div>
        </div>
      </li>
    </ul>
    
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  name: "myBus",
  data() {
    return {
      carState: true, //汽车默认状态
      BusDetails: [] ,//我的车辆信息
      tspid:'',
    };
  },
  methods: {
    //我的车辆
    MyBus() {
      this.tspid=this.$store.state.tspId
      if(this.$store.state.tspId==undefined){
        this.tspid=0
      }
  this.$http.post(My.My_Bus, {
     userId:this.$store.state.trueuserId,
     phone:this.$store.state.mobile,
     tspUserId:this.tspid

  }, this.$store.state.getpin).then(res => {
        if (res.data.returnSuccess) {
          this.BusDetails = res.data.data;
          for(let i=0;i< res.data.data.length;i++){
            if(res.data.data[i].def==1){
              this.$store.state.vins=res.data.data[i].vin
            }
          }
        }
      });
    },
    //设为默认
    setOneDefault(vin, def) {
      var vin = vin;
      var def = def;
      if (def == 1) {
        return;
      }
      var param = {
        vin: vin
      };
     this.$http
        .post(My.SetOneDefault, param, this.$store.state.getpin)
        .then(res => {
          if (res.data.returnSuccess) {
              this.$store.state.vins=vin
              this.MyBus();
          }
        });
    },
    //解绑车辆
     unite(no) {
      MessageBox.confirm("", {
        title: "提示",
        message: "您确定要解绑该车辆吗？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      }).then(action => {
        var vin = no;
        if (action == "confirm") {
          var param = {
            vin: vin,
            extParams: {},
            operationType: "CAR_BINDING",
            operation: 0
          };
          
          this.$http.post(My.JFmybus, param, this.$store.state.getpin).then(res => {
            if (res.data.returnSuccess) {
                 this.BusDetails=[]
              this.MyBus();
              this.$forceUpdate()
            } else {
              Toast({
                message: "解绑失败，请稍后重试！",
                duration: 1000,
                position: "middle"
              });
            }
          });
        }
      });
    },
    //解绑车牌
    plate(vin,plateLicenseNo) {
      MessageBox.confirm("", {
        title: "提示",
        message: "您确定要解绑该车牌吗？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      }).then(action => {
        
        if (action == "confirm") {
          var param = {
               vin:vin,
            	extParams:{  plateLicenseNo:plateLicenseNo,},
				      operationType:"PLATE_NO", 	 
				    	operation:0, //解绑
          };
          
          this.$http.post(My.planbus,param,this.$store.state.getpin).then(res => {
            if (res.data.returnSuccess) {
              this.MyBus();
            } else {
              Toast({
                message: "解绑失败，请稍后重试！",
                duration: 1000,
                position: "middle"
              });
            }
          });
        }
      });
    },
  },
  mounted(){
    // alert(this.$store.state.tspId)
  	$(".MobileHeight").css({"marginTop": this.$store.state.mobileStatusBar})
    this.MyBus();
  },
  created() {
    
  },
  //  computed:{
  //     userId(){
  //       return  JSON.parse(this.$store.state.getpin.headers.identityParam).userId
  //     }
  // },
  // watch:{
  //     userId(newVal,oldVal){
  //       alert(1)
  //     }
  // }
};
</script>

<style scoped>
.input-label {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  background-image: url("../../../static/images/Lovecar/loseWindow.png");
  border-radius: 50%;
  background-size: 100%;
}
.input-label.active {
  background-image: url("../../../static/images/Lovecar/window2@2x.png");
}
/*flex*/
li {
  margin-top: 0.3rem;
}
.flex-center {
  /*水平垂直居中*/
  display: flex;
  justify-content: center;
  align-items: center;
}
.flex-align-center {
  /*垂直居中*/
  display: flex;
  align-items: center;
}
.flex-center-between {
  /*水平垂直居中-两边对齐*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}
/*公共样式-字体*/
.commonFontSize {
  font-size: 0.22rem;
  color: #555555;
}

/*bus主体*/
/*.bus-wrap {
		padding: 0.3rem;
	}*/
.bus-list {
  margin: 0.4rem 0.3rem 0;
}
.bus-content {
  padding: 0.2rem 0.3rem 0.5rem;
  background: #f5f5f5;
  border-radius: 0.08rem;
  align-items: flex-start;
}
/*left部分*/
.bus-left {
  height: 2.22rem;
}
.bus-left > img {
  width: 2.5rem;
  height: 1.42rem;
  margin-top: 0.45rem;
}
.bus-name {
  margin-left: 0.1rem;
}
.bus-name > img {
  width: 0.28rem;
  height: 0.28rem;
}
/*right部分*/
.bus-right {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
.bus-untie {
  width: 1rem;
  height: 0.4rem;
  margin-bottom: 0.46rem;
  line-height: 0.4rem;
  background: #49bbff;
  text-align: center;
  font-size: 0.22rem;
  color: #fff;
  border-radius: 0.2rem;
  align-self: flex-end;
}
.modify-num {
  width: 0.24rem;
  height: 0.24rem;
  margin-left: 0.2rem;
}
</style>