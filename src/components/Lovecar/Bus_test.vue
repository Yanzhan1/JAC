<template>
  <div>
    <header class="header MobileHeight">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="goback">
			<span class="header-title" style="margin-right: 0.65rem;">车辆体检</span>
			<span class="header-right"></span>
		</header>
		<div style="height:.88rem" class="MobileHeight"></div>
    <!-- <mhead currentTitle="车辆体检"></mhead> -->
    <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
        <ul class="ul_content">
          <li class="flex row between cocenter" v-for="(item,index) in this.allfalse" :key="index">
            <p class="li_quan">{{item.dtcCode|changename}}</p>
            <span :class="item.status?'right_pic':'right_pic actives'"></span>
          </li>
        </ul>
    </mt-loadmore>
  </div>
</template>
<script>
import {Toast} from 'mint-ui';
import {Button} from 'mint-ui';
import {Loadmore} from 'mint-ui';
import PublicHead from '../publicmodel/PublicHead';
export default {
	name: 'busTest',
	components: {
  	mhead:PublicHead
  },
  data() {
    return {
      topStatus: '',
      time: "",
      sjc: "",
      AutoBrakSystemStatus:true,//自动紧急刹车系统状态
      laneDepartureSysFailure:true,//车道偏离系统故障
      allfalse:[],//储存所有的车辆体检错误信息
    };
  },
  filters: {
    changename(value) {
      let name
      if(value=='batteryCharging'){
        name='蓄电池充电'
      }
      else if(value=='OilPressure'){
        name='机油压力'
      }
      else if(value=='ElectronicParking'){
        name='电子驻车工作'
      }
      else if(value=='stabilitySystemShutdown'){
        name='电子稳定系统关闭'
      }
      else if(value=='AutoBrakSystemStatus'){
        name='自动紧急刹车系统状态'
      }
      else if(value=='StartStopSystemNotWork'){
        name='起停系统未工作'
      }
      else if(value=='WindshieldSensorShield'){
        name='挡风玻璃传感器屏蔽'
      }
      else if(value=='TirePressureAnomaly'){
        name='轮胎气压异常'
      }
      else if(value=='airbagFault'){
        name='安全气囊故障'
      }
      else if(value=='electronicParkingFailure'){
        name='电子驻车故障'
      }
      else if(value=='powerSteeringSystemInit'){
        name='电子助力转向系统初始化'
      }
      else if(value=='powerSteeringSystemFailure'){
        name='电子助力转向系统故障'
      }
      else if(value=='AutoParkingFailure'){
        name='自动驻车故障'
      }
      else if(value=='slopeSlowDownFault'){
        name='陡坡缓降故障'
      }
      else if(value=='ElectronicStabilitySysIndication'){
        name='电子稳定系统指示'
      }
      else if(value=='TirePressureMonitoringSysFailure'){
        name='胎压监测系统故障'
      }
      else if(value=='laneDepartureSysFailure'){
        name='车道偏离系统故障'
      }
      else if(value=='AutoEmergencyBrakeSysFailure'){
        name='自动紧急刹车系统故障'
      }
      else if(value=='adaptiveCruiseFault'){
        name='自适应巡航故障'
      }
      else if(value=='transmissionFailure'){
        name='变速箱故障'
      }
      else if(value=='EngineTheftPreventionSysFailure'){
        name='发动机防盗系统故障'
      }
      else if(value=='startStopSystemFailure'){
        name='起停系统故障'
      }
      else if(value=='engineFailure'){
        name='发动机故障'
      }
      else if(value=='engineExhaustSystemFailure'){
        name='发动机排放系统故障'
      }
      else if(value=='blindSpotMonitoringSysFailure'){
        name='盲点监测系统故障'
      }
      return name;
    }
  },
  created() {
    //进入页面获取一次车辆体检
    if(this.$store.state.brandId==1){
      this.init()
    }else{
      this.starttest()
    }
  },
  mounted(){
    $(".MobileHeight").css({
      borderTopWidth: this.$store.state.mobileStatusBar,
      borderTopColor: "#fff"
    });
  },
  methods: {
    goback(){
      if(this.$route.query.id=='diagnosis'){
        if (isMobile.iOS()) {
          var params = {};
          window.webkit.messageHandlers.exit.postMessage(params);
      } else if (isMobile.Android()) {
        js2android.exit();
      }
      }else{
        this.$router.go(-1)
      }
    },
    handleTopChange(status) {
        this.topStatus = status;
      },
    loadTop() {
      if(this.$store.state.brandId==1){
        this.lightBustest()
      }else{
        this.bustest()
      }
        this.$refs.loadmore.onTopLoaded();
      },
    init(){
        var param = {
          vin:this.$store.state.vins,
          brandId:this.$store.state.brandId
          };
          this.$http
            .post(Lightcar.trucklatelycyccarexamination, param, this.$store.state.tsppin)
            .then(res => {
              if (res.data.returnSuccess) {
                  this.allfalse=res.data.data[0].dtcs
              } else {
                  Toast({
                    message: res.data.returnErrMsg,
                    position: "middle",
                    duration: 3000
                  });
              }
            })
    },
    //进入页面发起的车辆查询
    starttest(){
      if(this.$store.state.brandId==1){

          var param = {
          vin:this.$store.state.vins,
          operationType: "CYC_CAR_EXAMINATION",
          };
          this.$http
            .post(Lovecar.BusTest, param, this.$store.state.tsppin)
            .then(res => {
              if (res.data.returnSuccess) {
                this.getAsyReturn(res.data.operationId);
              } else {
                  Toast({
                    message: res.data.returnErrMsg,
                    position: "middle",
                    duration: 3000
                  });
              }
            })
      }else{
          var param = {
          vin:this.$store.state.vins,
          operationType: "CYC_CAR_EXAMINATION",
          };
          this.$http
            .post(Lovecar.Control, param, this.$store.state.tsppin)
            .then(res => {
              if (res.data.returnSuccess) {
                this.getAsyReturn(res.data.operationId);
              } else {
                  Toast({
                    message: res.data.returnErrMsg,
                    position: "middle",
                    duration: 3000
                  });
              }
            })
      }
    },
    lightBustest(){
         var param = {
            vin: this.$store.state.vins
          };
          this.$http
            .post(Lightcar.truckcyccarexamination, param, this.$store.state.tsppin)
            .then(res => {
              if (res.data.returnSuccess) {
                console.log(res)
                this.getAsyReturn(res.data.operationId);
              } else {
                  Toast({
                    message: res.data.returnErrMsg,
                    position: "middle",
                    duration: 3000
                  });
              }

            })
    },
    //点击刷新按钮查询车辆体检
    bustest(){
      var param = {
      vin: this.$store.state.vins
      };
      this.$http
        .post(Lovecar.BusTest, param, this.$store.state.tsppin)
        .then(res => {
          if (res.data.returnSuccess) {
            this.getAsyReturn(res.data.operationId);
          } else {
              Toast({
                message: res.data.returnErrMsg,
                position: "middle",
                duration: 3000
              });
          }

        })
    },
    //重复调用的接口
    getAsyReturn(operationId) {
      var flag = true;
      this.sjc = new Date().getTime();
      this.$http
        .post(
          Lovecar.OperationId,
          { operationId: operationId },
          this.$store.state.tsppin
        )
        .then(res => {
          var tS = new Date().getTime() - this.sjc; //时间戳 差
          var tSS = parseInt((tS / 1000) % 60); // 时间差
          if (res.data.returnSuccess == true) {
            if (res.data.status == "IN_PROGRESS") {
              //60s  后 清除定时器，不在发请求

              if (tSS >= 56) {
                Toast({
                  message: "请求超时",
                  position: "middle",
                  duration: 3000
                });
                localhide();
              } else {
                this.time = setInterval(() => {
                  this.$http
                    .post(
                      Lovecar.OperationId,
                      { operationId: operationId },
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      var tS = new Date().getTime() - this.sjc; //时间戳 差
                      var tSS = parseInt((tS / 1000) % 60); // 时间差
                      if (res.data.returnSuccess == true) {
                        if (res.data.status == "IN_PROGRESS") {
                          //60s  后 清除定时器，不在发请求

                          if (tSS >= 56) {
                            Toast({
                              message: "请求超时",
                              position: "middle",
                              duration: 3000
                            });
                            clearInterval(this.time);
                            localhide();
                          }
                        } else if (res.data.status == "SUCCEED") {
                          this.allfalse=res.data.data[0].dtcs
                          Toast({
                            message: "刷新成功",
                            position: "middle",
                            duration: 3000
                          });
                          clearInterval(this.time);
                          localhide();
                        } else if (res.data.status == "FAILED") {
                          Toast({
                            message: "指令下发成功，处理失败！",
                            position: "middle",
                            duration: 3000
                          });
                          clearInterval(this.time);
                          localhide();
                        }
                      } else {
                        Toast({
                          message: "指令下发失败！",
                          position: "middle",
                          duration: 3000
                        });
                        clearInterval(this.time);
                        localhide();
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              Toast({
                message: "刷新成功",
                position: "middle",
                duration: 3000
              });
              this.allfalse=res.data.data[0].dtcs
               clearInterval(this.time);
              localhide();
            } else if (res.data.status == "FAILED") {
              Toast({
                message: "指令下发成功，处理失败！",
                position: "middle",
                duration: 3000
              });
               clearInterval(this.time);
              localhide();
            }
          } else {
            Toast({
              message: "指令下发失败！",
              position: "middle",
              duration: 3000
            });
            flag = false;
            clearInterval(this.time);
            localhide();
          }
        });
    }
  },
  beforeDestroy() {
      clearInterval(this.time);
  },
};
</script>
<style scoped>
.MobileHeight {
  border-top-style: solid;
  box-sizing: content-box;
}
h2 {
  text-align: center;
  font-size: 0.26rem;
  color: #555;
  margin-top: 0.4rem;
}
.li_quan {
  position: relative;
  font-size: 0.28rem;
  color: #222;
}
.row {
  flex-direction: row;
}
.ul_content {
  margin: 0.5rem 0.3rem 0 0.8rem;
}
.ul_content li {
  height: 0.87rem;
  border-bottom: 1px solid #f1f1f1;
}
.li_quan:before {
  position: absolute;
  background-color: #2099ff;
  display: block;
  height: 0.12rem;
  width: 0.12rem;
  border-radius: 50%;
  top: 0.1rem;
  left: -0.3rem;
  content: "";
}
.right_pic {
  background-image: url("../../../static/images/Lovecar/complete@3x.png");
  width: 0.4rem;
  height: 0.4rem;
  display: block;
  background-size: 100%;
}
.right_pic.actives {
  background-image: url("../../../static/images/Lovecar/yichang.png");
  width: 0.4rem;
  height: 0.34rem;
  display: block;
}
.header{
  background: #ffffff;
}
</style>

