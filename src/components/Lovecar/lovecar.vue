<template>
  <div style="border-top:.01rem solid #49bbff">
  	<div class="lovecar tophead">
	    <div class="nav MobileHeight">
	      <img @click="navtip" src="../../../static/images/Wit/3x.png" alt="" style="width:.4rem;display:block">
	      <span class="txt_m">&nbsp;&nbsp;&nbsp;&nbsp;{{this.carsysitem}}</span>
	      <!--<span class="txt_r" @click="islogin()" v-if="this.LoginStatus">车机已登录</span>
	      <span class="txt_r" v-else @click="login()">车机未登录</span>-->
	      <span class="txt_r"></span>
	    </div>
	    <div class="navs navs_h">
	      <div class="navs_t">
	        <span class="num">{{carcontrol.fuelPercent==undefined?'':carcontrol.fuelPercent*100}}</span>
	        <span class="txt">剩余油量（%）</span>
	      </div>
	      <div class="navs_t">
	        <span class="num">{{carcontrol.totalDistance}}</span>
	        <span class="txt">行驶里程（KM）</span>
	      </div>
	      <div class="navs_t">
	        <span class="num">{{carcontrol.mileage}}</span>
	        <span class="txt">续航里程（KM）</span>
	      </div>
	    </div>
  	</div>
		<div class="lovecar-hei" style="height: 3rem;"></div>
    <div style="height:4.75rem;" class="content">
      <div class="content">
        <div class="left_bus1">
          <div class="left_bus" @click="fn(1)">
            <img v-if="activeshow==1" class="pic1" src="../../../static/images/Wit/taiya.png" alt="">
            <img v-else class="pic1" src="../../../static/images/Wit/taiya1.png" alt="">
            <span :class="activeshow==1?'active':'actives'" class="txt1">胎压</span>
          </div>
          <div class="left_bus" @click="fn(2)">
            <img v-if="activeshow==2" class="pic1" src="../../../static/images/Wit/chemen.png" alt="">
            <img v-else class="pic1" src="../../../static/images/Wit/chemen1.png" alt="">
            <span :class="activeshow==2?'active':'actives'" class="txt1">车门</span>
          </div>
          <div class="left_bus" @click="fn(3)">
            <img v-if="activeshow==3" class="pic1" src="../../../static/images/Wit/chechuang.png" alt="">
            <img v-else class="pic1" src="../../../static/images/Wit/chechuang1.png" alt="">
            <span :class="activeshow==3?'active':'actives'" class="txt1">车窗</span>
          </div>
        </div>
        <img v-if="activeshow==1" class="line_x" src="../../../static/images/Wit/line3@3x.png" alt="">
        <img v-else-if="activeshow==2" class="line_x" src="../../../static/images/Wit/line1@2x.png" alt="">
        <img v-else-if="activeshow==3" class="line_x" src="../../../static/images/Wit/line2@3x.png" alt="">
      </div>
      <div class="bus_l">
        <img src="../../../static/images/Wit/bus.png" alt="" class="bus_righgt">
        <span ref='open' class='busl_r left_1'>{{Condition.left_top}}</span>
        <span ref='open' class='busl_r  left_2'>{{Condition.left_bottom}}</span>
        <span ref='open' class='busl_r right_1'>{{Condition.right_top}}</span>
        <span ref='open' class='busl_r right_2'>{{Condition.right_bottom}}</span>
        <span class='busl_r top_1'>{{this.engineHoodStsFront}}</span>
        <span class='busl_r bottom_1'>{{this.doorStsTrunk}}</span>
        <span class='busl_r middle_1'>{{this.skylightStatus}}</span>
      </div>
      <img style="width:.88rem;height:.88rem;margin-top:.2rem" src="../../../static/images/Lovecar/loading@2x.png" alt="" @click="loading">
    </div>
    <div class="content lines">
      <div class="content_1" @click="doors">
        <img v-if="activeshows==this.isTrue" class="content_carDoor" src="../../../static/images/Wit/button4@3x_32.png" alt="">
        <img v-else class="content_carDoor" src="../../../static/images/Wit/button4@3x.png" alt="">
        <span :class="activeshows==this.isTrue?'act':'activess'">车门</span>
      </div>
      <div class="content_1" @click="backbox">
        <img v-if="activeshows==this.isTrues" class="tailgate" src="../../../static/images/Wit/button5@3x_86.png" alt="">
        <img v-else class="tailgate" src="../../../static/images/Wit/button5@3x.png" alt="">
        <span :class="activeshows==this.isTrues?'act':'activess'">尾门</span>
      </div>
      <div class="content_1" @click="closefire">
        <img v-if="activeshows==this.isTruess" class="Flameout" src="../../../static/images/Wit/button6@3x_91.png" alt="">
        <img v-else class="Flameout" src="../../../static/images/Wit/button6@3x.png" alt="">
        <span :class="activeshows==this.isTruess?'act':'activess'">熄火</span>
      </div>
      <div class="content_1" @click="enter()">
        <img v-if="activeshows==this.isTruesss" class="content_pic" src="../../../static/images/Wit/button7@3x_2.png" alt="">
        <img v-else class="content_pic" src="../../../static/images/Wit/button7@3x.png" alt="">
        <span :class="activeshows==this.isTruesss?'act':'activess'">寻车</span>
      </div>
    </div>
    <ul style="padding:0 .2rem">
      <!-- 暂时跳转到电动空调 -->
      <router-link to="/lovecar/Electricairconditioning" tag="li" class="navs air">
        <div class="navs">
          <img class="picc" src="../../../static/images/Wit/ari.png" alt="">
          <span class="pic_txt">空调温度</span>
        </div>
        <img class="pic_r" src="../../../static/images/Wit/next.png" alt="">
      </router-link>
      <router-link to="/lovecar/adjustSeatTemper" tag="li" class="navs air">
        <div class="navs">
          <img class="picc" src="../../../static/images/Wit/zuoyi.png" alt="">
          <span class="pic_txt">座椅调节</span>
        </div>
        <img class="pic_r" src="../../../static/images/Wit/next.png" alt="">
      </router-link>
      <router-link to="/lovecar/windowControl" tag="li" class="navs air">
        <div class="navs">
          <img class="picc" src="../../../static/images/Wit/chechuang.png" alt="">
          <span class="pic_txt">车窗控制</span>
        </div>
        <img class="pic_r" src="../../../static/images/Wit/next.png" alt="">
      </router-link>
      <router-link to="/lovecar/skylightControl" tag="li" class="navs air">
        <div class="navs">
          <img class="picc skylight" src="../../../static/images/Wit/tianchuang.png" alt="">
          <span class="pic_txt">天窗控制</span>
        </div>
        <img class="pic_r" src="../../../static/images/Wit/next.png" alt="">
      </router-link>
      <router-link to="/lovecar/airEvoluor" tag="li" class="navs air">
        <div class="navs">
          <img class="picc air_contr" src="../../../static/images/Wit/icon5@3x.png" alt="">
          <span class="pic_txt">空气净化器</span>
        </div>
        <img class="pic_r" src="../../../static/images/Wit/next.png" alt="">
      </router-link>
    </ul>
    <!-- 输入框 -->
    <div id="bg" class="bg" />
    <mt-popup v-model="popupVisible" position="middle">
      <div class="con">
        <div class="del">
          <img @click="cancel" src="../.././../static/images/Wit/delete@3x.png" alt="" style="width:.28rem">
          <div style="font-size:.36rem;color:#222">请输入PIN码</div>
          <span></span>
        </div>
        <div class="pin-code flex maincenter cocenter">
          <div id="pinCon">
            <input @click="onTypewriting" v-model="pinNumber" class="pin-input" maxlength="6" type="text" readonly/>
          </div>
        </div>
      </div>
    </mt-popup>
    <div class="typer" v-if="IsShow">
      <ul class="flex yy">
        <li class="typer-num" v-for="(item,index) in keyNums" :key="index" :class="{'is-A': item=='A','is-OK':item=='OK','is-Del':item=='Del'}" @click="input(item)">{{item}}</li>
      </ul>
    </div>
    <!-- 弹出层 左上 -->
    <div class="mask" v-if="MaskIsshow" @click="moved"></div>
    <img class="cancel" v-if="MaskIsshow" @click="delde" src="../.././../static/images/Lovecar/button9@2x.png" alt="" style="width:.28rem">
    <div v-if="MaskIsshow" class="mask_content">
      <ul class="tipcontent">
        <li @click="turnDing">
          <img src="../../../static/images/Lovecar/ding.png" alt="">
          <span>途记宝</span>
        </li>
        <router-link tag='li' to="/lovecar/revisePinCode">
          <img src="../../../static/images/Lovecar/xiupin.png" alt="">
          <span>修改PIN</span>
        </router-link>
        <router-link tag="li" to="/Bus_test">
          <img src="../../../static/images/Lovecar/chejian.png" alt="">
          <span>车辆体检</span>
        </router-link>
        <router-link tag='li' to="/Authorize_next" v-if="Rajtigo">
          <img src="../../../static/images/Lovecar/yuancheng.png" alt="">
          <span>远程授权</span>
        </router-link>
        <router-link tag='li' to="/Authorize" v-else-if="!Rajtigo">
          <img src="../../../static/images/Lovecar/yuancheng.png" alt="">
          <span>远程授权</span>
        </router-link>
        <li @click="turnPosition">
          <img src="../../../static/images/Lovecar/dingwei.png" alt="">
          <span>定位</span>
        </li>
        <router-link tag='li' to="/lovecar/flowQuery">
          <img src="../../../static/images/Lovecar/liuliang.png" alt="">
          <span>流量查询</span>
        </router-link>
        <router-link tag='li' to="/lovecar/fuelQuery">
          <img src="../../../static/images/Lovecar/ranyou.png" alt="">
          <span>燃油统计</span>
        </router-link>
        <li @click="turnPage">
          <img src="../../../static/images/Lovecar/dianzi.png" alt="">
          <span>电子围栏</span>
        </li>
				<router-link tag='li' to="/lovecar/wifiLink">
					<img src="../../../static/images/Lovecar/wifi.png" alt="">
					<span>wifi直连</span>
				</router-link>
				<!-- <router-link tag="li" to='/lovecar/intelligenceParking'>
					<img src="../../../static/images/Lovecar/zhiting.png" alt="">
					<span>智能停车</span>
				</router-link> -->
			</ul>
		</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import { Button } from "mint-ui";
export default {
  name: "lovecar",
  data() {
    return {
      activeshow: 1, //默认第一个高亮
      activeshows: 1,
      tspid:'',
      popupVisible: false,
      MaskIsshow: false, //黑色遮罩层
      Rajtigo:false,//被授权状态
      num: 3,
      isTrue: false, //锁定
      isTruesss: false, //停车
      isTruess: false, //熄火
      isTrues: false, //尾门
      IsShow: false,
      locknum: 2, //控制锁状态2为锁定默认
      firenum: 2, //控制引擎状态2为熄火默认
      backnum: 2, //控制后备箱状态2为关闭默认
      keyNums: [],
      operationIds: "", //lock传给后台的
      operationIdss: "", //熄火传给后台的
      operationIdses: "", //寻车传给后台的
      operationIdcar:'',//查询车况的id
      msg: "车机已登录",
      vehicleState:'',//被授权车辆的vin
      pinNumber: "",
      type: "", //判断点击事件
      Condition: {},
      LoginStatus: "", //机车登录状态
      time: "",
      sjc: "",
      vinn: "",
      carsysitem: "", //返回的某人车系名
      carcontrol: {}, //车控返回的东西
      //车门的状态展示
      doorStsFrontLeft: "",
      doorStsFrontRight: "",
      doorStsRearLeft: "",
      doorStsRearRight: "",
      //车窗的状态展示
      windowStsFrontLeft: "",
      windowStsFrontRight: "",
      windowStsRearLeft: "",
      windowStsRearRight: "",
      //前车盖状态展示
      engineHoodStsFront: "",
      //空调初始状态
      acStatus: "",
      //天窗初始状态
      skylightStatus: "",
      //后备箱状态
      doorStsTrunk: "",
      //发动机状态
      engineStatus: "",
      defaultvin:'',//默认车辆的vin
			qrCodePin: '', //扫一扫二维码pin
      firstTips: true, //车机状态第一次提示,true不提示,改变为false的时候,Toast进行提示
      FIND_VEHICLE:false,//远程寻车
      LOCK:false,//开闭锁,
      ENGINE:false,//引擎启动,
      CAR_EXAMINATION:false,//车辆体检
      WINDOW:false,//车窗控制
      TRUNK:false,//尾门控制
      HOSTSEAT_HEAT:false,//座椅控制
      SUNROOF:false,//天窗控制
      PURIFICTION:false,//空气净化器控制
      WIFI:false,//wifi控制
      ELECTRIC_FENCE:false,//电子围栏
      CAR_EXAMINATION_QUERY:false,//车辆体检结果查询
      CAR_POINT_QUERY:false,//车辆位置查询
      SEND_TO_CAR:false,//发送倒车
      CAR_POONT_HISTORY_QUERY:false,//车辆历史轨迹
      TACHOGRAPH:false,//行车记录仪
      FUEL_STATISTICS:false,//燃油统计
      CONTROL_AUTH:false,//远程授权
      FLOW_QUERY:false,//流量查询
    };
  },
  //  beforeRouteEnter :(to, from, next)=> {
  //   next(vm=>{
  //     alert(vm.$store.state.tsppin.headers.identityParam)
  //   })
  // },
  methods: {
    // shows(){
    //   popupVisible: true
    // },
    //点击高亮
    fn(type) {
      this.activeshow = type;
      var tai = {
        left_top: this.carcontrol.tirePressureFrontLeft,
        right_top: this.carcontrol.tirePressureFrontRight,
        left_bottom: this.carcontrol.tirePressureRearLeft,
        right_bottom: this.carcontrol.tirePressureRearRight
      };
      //车门状态
      // this.doorStsFrontLeft = this.carcontrol.doorStsFrontLeft==1
      //   ? (this.doorStsFrontLeft = "未锁")
      //   : (this.doorStsFrontLeft = "已锁");
      // this.doorStsFrontRight = this.carcontrol.doorStsFrontRight==1
      //   ? (this.doorStsFrontRight = "未锁")
      //   : (this.doorStsFrontRight = "已锁");
      // this.doorStsRearLeft = this.carcontrol.doorStsRearLeft==1
      //   ? (this.doorStsRearLeft = "未锁")
      //   : (this.doorStsRearLeft = "已锁");
      // this.doorStsRearRight = this.carcontrol.doorStsRearRight==1
      //   ? (this.doorStsRearRight = "未锁")
      //   : (this.doorStsRearRight = "已锁");

        if(this.carcontrol.doorStsFrontLeft==1){
          this.doorStsFrontLeft = "打开"
        }else if(this.carcontrol.doorStsFrontLeft==0){
          this.doorStsFrontLeft = "关闭"
        }
        if(this.carcontrol.doorStsFrontRight==1){
          this.doorStsFrontRight = "打开"
        }else if(this.carcontrol.doorStsFrontRight==0){
          this.doorStsFrontRight = "关闭"
        }
        if(this.carcontrol.doorStsRearLeft==1){
          this.doorStsRearLeft = "打开"
        }else if(this.carcontrol.doorStsRearLeft==0){
          this.doorStsRearLeft = "关闭"
        }
        if(this.carcontrol.doorStsRearRight==1){
          this.doorStsRearRight = "打开"
        }else if(this.carcontrol.doorStsRearRight==0){
          this.doorStsRearRight = "关闭"
        }

      //车窗状态
      // this.windowStsFrontLeft = this.carcontrol.windowStsFrontLeft==1
      //   ? (this.windowStsFrontLeft = "已打开")
      //   : (this.windowStsFrontLeft = "已关闭");
      // this.windowStsFrontRight = this.carcontrol.windowStsFrontRight==1
      //   ? (this.windowStsFrontRight = "已打开")
      //   : (this.windowStsFrontRight = "已关闭");
      // this.windowStsRearLeft = this.carcontrol.windowStsRearLeft==1
      //   ? (this.windowStsRearLeft = "已打开")
      //   : (this.windowStsRearLeft = "已关闭");
      // this.windowStsRearRight = this.carcontrol.windowStsRearRight==1
      //   ? (this.windowStsRearRight = "已打开")
      //   : (this.windowStsRearRight = "已关闭");
      if(this.carcontrol.windowStsFrontLeft==1){
        this.windowStsFrontLeft = "已打开"
      }else if(this.carcontrol.windowStsFrontLeft==0){
        this.windowStsFrontLeft = "已关闭"
      }
      if(this.carcontrol.windowStsFrontRight==1){
        this.windowStsFrontRight = "已打开"
      }else if(this.carcontrol.windowStsFrontRight==0){
        this.windowStsFrontRight = "已关闭"
      }
      if(this.carcontrol.windowStsRearLeft==1){
        this.windowStsRearLeft = "已打开"
      }else if(this.carcontrol.windowStsRearLeft==0){
        this.windowStsRearLeft = "已关闭"
      }
      if(this.carcontrol.windowStsRearRight==1){
        this.windowStsRearRight = "已打开"
      }else if(this.carcontrol.windowStsRearRight==0){
        this.windowStsRearRight = "已关闭"
      }
      var door = {
        left_top: this.doorStsFrontLeft,
        right_top: this.doorStsFrontRight,
        left_bottom: this.doorStsRearLeft,
        right_bottom: this.doorStsRearRight
      };
      var window = {
        left_top: this.windowStsFrontLeft,
        right_top: this.windowStsFrontRight,
        left_bottom: this.windowStsRearLeft,
        right_bottom: this.windowStsRearRight
      };
      if (this.activeshow == 1) {
        this.Condition = tai;
      } else if (this.activeshow == 2) {
        this.Condition = door;
      } else if (this.activeshow == 3) {
        this.Condition = window;
      }
    },
    //获取此车所具有的车况功能
    Support(){
      let param={
        vin:this.vinn
      }
      this.$http.post(Lovecar.Support,param,this.$store.state.tsppin).then(res=>{
        console.log(res)
      })
    },
    moved() {
      this.MaskIsshow = false;
      this.IsShow = false;
      this.popupVisible = false;
    },
    //锁的弹出框
    doors() {
      this.type = 1;
      this.popupVisible = true;
    },
    //后备箱的请求
    backbox() {
      this.type = 2;
      this.popupVisible = true;
    },
    //熄火的请求
    closefire() {
      this.type = 3;
      this.popupVisible = true;
    },
    // 寻车 事件
    enter() {
      this.type = 4;
      this.popupVisible = true;
    },
    //关闭PIN码弹框
    cancel() {
      this.IsShow = false;
      this.popupVisible = false;
    },
    //关闭顶部主菜单
    delde() {
      this.MaskIsshow = false;
    },
    navtip() {
      this.MaskIsshow = true;
    },
    islogin() {
      this.$router.push("/islogin");
    },
    //随机数
    randomnum(min, max) {
      var num = Math.floor(Math.random() * (max - min) + min);
      return num;
    },
    onTypewriting() {
      this.IsShow = true;
      this.produceArray();
    },
    produceArray() {
      var that = this;
      var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var arr2 = [];
      for (var i = 0; i < 12; i++) {
        var randomnumber = that.randomnum(0, arr.length);
        if (i == 9) {
          arr2.push("关闭");
        } else if (i == 11) {
          arr2.push("Del");
        } else {
          arr2.push(arr[randomnumber]);
          arr.splice(randomnumber, 1);
        }
      }
      that.keyNums = arr2;
    },
    //输入框事件
    input(item) {
      if (item == "关闭") {
        this.IsShow = false;
        return;
      }
      if (item == "Del") {
        this.pinNumber = this.pinNumber.slice(0, -1);
        return;
      }
      if (this.pinNumber.length < 6) {
        this.pinNumber = this.pinNumber + item;
      } else {
      }
    },
    //获取默认车辆vin码
    // MyBus() {
    //   this.$http.post(My.My_Bus, {}, this.$store.state.tsppin).then(res => {
    //     if (res.data.returnSuccess) {
    //       this.BusDetails = res.data.data;
    //       console.log(res.data.data)
    //       for (let i = 0; i < res.data.data.length; i++) {
    //         if (res.data.data[i].def == 1) {
    //           this.vinn = res.data.data[i].vin;
    //         }
    //       }
    //     }
    //     console.log(this.$store.state.vins)
    //   });
    // },
    //跳转电子围栏
    turnPage() {
      //js判断手机操作系统(ios或者是Android)
      var system = IOSAndAndroid.isIOSOrAndroid();
      if (system == "Android") {
        window.js2android.goEfence(); //电子围栏
      } else if (system == "IOS") {
        window.webkit.messageHandlers.goEfenceiOS.postMessage({});
      }
    },
    //跳转盯盯拍
    turnDing() {
      //js判断手机操作系统(ios或者是Android)
      var system = IOSAndAndroid.isIOSOrAndroid();
      if (system == "Android") {
        window.js2android.goDDPai(); //盯盯拍
      } else if (system == "IOS") {
        window.webkit.messageHandlers.goDDPaiiOS.postMessage({});
      }
    },
    //调用车况接口
    async Carquerry() {
      this.$http
        .post(
          Lovecar.Carquery,
          { vins: this.$store.state.vins },
          this.$store.state.tsppin
        )
        .then(res => {
          if (res.data.returnSuccess) {
            this.operationIdcar=res.data.operationId
            this.getAsyReturn(res.data.operationId);
          } else {
            Toast({
              message: res.data.returnErrMsg,
              position: "middle",
              duration: 2000
            });
          }
        });
    },
    //跳转定位
    turnPosition() {
      //js判断手机操作系统(ios或者是Android)
      var system = IOSAndAndroid.isIOSOrAndroid();
      if (system == "Android") {
        window.js2android.goCarLocation(); //定位
      } else if (system == "IOS") {
        window.webkit.messageHandlers.goCarLocationiOS.postMessage({});
      }
    },
    //车况部分重复调用异步接口
    getAsyReturn(operationId) {
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
              // console.log(tSS);
              if (tSS >= 56) {
                Toast({
                  message: "请求超时",
                  position: "middle",
                  duration: 2000
                });
                this.$store.dispatch("LOADINGFLAG", false);
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
                          // console.log(tSS);
                          if (tSS >= 56) {
                            Toast({
                              message: "请求超时",
                              position: "middle",
                              duration: 2000
                            });
                            clearInterval(this.time);
                            this.$store.dispatch("LOADINGFLAG", false);
                          }
                        } else if (res.data.status == "SUCCEED") {
                         clearInterval(this.time);
                         if(this.type==1){
                            this.isTrue = !this.isTrue;
                            this.isTrue ? (this.locknum = 1) : (this.locknum = 2);
                         }
                         if(this.type==2){
                            this.isTrues = !this.isTrues;
                         }                          
                         if(this.type==3){
                            this.isTruess = !this.isTruess;
                            this.isTruess ? (this.firenum = 1) : (this.firenum = 2);
                         }                          
                         if(this.type==4){
                            this.isTruesss = !this.isTruesss;
                            setTimeout(() => {
                              this.isTruesss = !this.isTruesss;
                            }, 5000);
                         }                          
                          this.carcontrol = res.data.data;
                          // if(this.carcontrol.fuelPercent==undefined){
                          //       this.carcontrol.fuelPercent=''
                          //   }else{
                          //     this.carcontrol.fuelPercent=this.carcontrol.fuelPercent*100
                          //   }
                          console.log(res.data.data);
                          this.engineHoodStsFront=this.carcontrol.engineHoodStsFront
                            ? (this.engineHoodStsFront = "已开")
                            : (this.engineHoodStsFront = "未开");
                          this.acStatus = this.carcontrol.acStatus; //空调初始状态
                          this.skylightStatus=this.carcontrol.skylightStatus
                            ? (this.skylightStatus = "已开")
                            : (this.skylightStatus = "未开"); //天窗初始状态
                          this.backnum = this.carcontrol.doorStsTrunk;
                          this.backnum
                            ? (this.doorStsTrunk = "已开")
                            : (this.doorStsTrunk = "未开"); //后备箱的初始状态
                          this.engineStatus = this.carcontrol.engineStatus;
                           var tai = {
                              left_top: this.carcontrol.tirePressureFrontLeft,
                              right_top: this.carcontrol.tirePressureFrontRight,
                              left_bottom: this.carcontrol.tirePressureRearLeft,
                              right_bottom: this.carcontrol.tirePressureRearRight
                            };
                            //车门状态
                                if(this.carcontrol.doorStsFrontLeft==1){
                                  this.doorStsFrontLeft = "打开"
                                }else if(this.carcontrol.doorStsFrontLeft==0){
                                  this.doorStsFrontLeft = "关闭"
                                }
                                if(this.carcontrol.doorStsFrontRight==1){
                                  this.doorStsFrontRight = "打开"
                                }else if(this.carcontrol.doorStsFrontRight==0){
                                  this.doorStsFrontRight = "关闭"
                                }
                                if(this.carcontrol.doorStsRearLeft==1){
                                  this.doorStsRearLeft = "打开"
                                }else if(this.carcontrol.doorStsRearLeft==0){
                                  this.doorStsRearLeft = "关闭"
                                }
                                if(this.carcontrol.doorStsRearRight==1){
                                  this.doorStsRearRight = "打开"
                                }else if(this.carcontrol.doorStsRearRight==0){
                                  this.doorStsRearRight = "关闭"
                                }
                            //车窗状态
                              if(this.carcontrol.windowStsFrontLeft==1){
                                  this.windowStsFrontLeft = "已打开"
                                }else if(this.carcontrol.windowStsFrontLeft==0){
                                  this.windowStsFrontLeft = "已关闭"
                                }
                                if(this.carcontrol.windowStsFrontRight==1){
                                  this.windowStsFrontRight = "已打开"
                                }else if(this.carcontrol.windowStsFrontRight==0){
                                  this.windowStsFrontRight = "已关闭"
                                }
                                if(this.carcontrol.windowStsRearLeft==1){
                                  this.windowStsRearLeft = "已打开"
                                }else if(this.carcontrol.windowStsRearLeft==0){
                                  this.windowStsRearLeft = "已关闭"
                                }
                                if(this.carcontrol.windowStsRearRight==1){
                                  this.windowStsRearRight = "已打开"
                                }else if(this.carcontrol.windowStsRearRight==0){
                                  this.windowStsRearRight = "已关闭"
                                }
                            var door = {
                              left_top: this.doorStsFrontLeft,
                              right_top: this.doorStsFrontRight,
                              left_bottom: this.doorStsRearLeft,
                              right_bottom: this.doorStsRearRight
                            };
                            var window = {
                              left_top: this.windowStsFrontLeft,
                              right_top: this.windowStsFrontRight,
                              left_bottom: this.windowStsRearLeft,
                              right_bottom: this.windowStsRearRight
                            };
                            if (this.activeshow == 1) {
                              this.Condition = tai;
                            } else if (this.activeshow == 2) {
                              this.Condition = door;
                            } else if (this.activeshow == 3) {
                              this.Condition = window;
                            }
 
                          this.$store.dispatch("LOADINGFLAG", false);
                        } else if (res.data.status == "FAILED") {
                          Toast({
                            message: "指令下发成功，处理失败！",
                            position: "middle",
                            duration: 2000
                          });
                          clearInterval(this.time);
                          this.$store.dispatch("LOADINGFLAG", false);
                        }
                      } else {
                        Toast({
                          message: "指令下发失败！",
                          position: "middle",
                          duration: 2000
                        });
                        clearInterval(this.time);
                        this.$store.dispatch("LOADINGFLAG", false);
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              console.log(res.data.data);
              this.carcontrol = res.data.data;
              // if(this.carcontrol.fuelPercent==undefined){
              //     this.carcontrol.fuelPercent=''
              // }else{
              //   this.carcontrol.fuelPercent=this.carcontrol.fuelPercent*100
              // }
              this.carcontrol.engineHoodStsFront
                ? (this.engineHoodStsFront = "已开")
                : (this.engineHoodStsFront = "未开");
              this.acStatus = this.carcontrol.acStatus; //空调初始状态
              this.carcontrol.skylightStatus
                ? (this.skylightStatus = "已开")
                : (this.skylightStatus = "未开"); //天窗初始状态
              this.backnum = this.carcontrol.doorStsTrunk;
              this.backnum
                ? (this.doorStsTrunk = "已开")
                : (this.doorStsTrunk = "未开"); //后备箱的初始状态
              this.engineStatus = this.carcontrol.engineStatus;
              // var tai = {
              //   left_top: this.carcontrol.tirePressureFrontLeft,
              //   right_top: this.carcontrol.tirePressureFrontRight,
              //   left_bottom: this.carcontrol.tirePressureRearLeft,
              //   right_bottom: this.carcontrol.tirePressureRearRight
              // };
              // this.Condition = tai;
               var tai = {
                  left_top: this.carcontrol.tirePressureFrontLeft,
                  right_top: this.carcontrol.tirePressureFrontRight,
                  left_bottom: this.carcontrol.tirePressureRearLeft,
                  right_bottom: this.carcontrol.tirePressureRearRight
                };
                //车门状态t
                  if(this.carcontrol.doorStsFrontLeft==1){
                    this.doorStsFrontLeft = "打开"
                  }else if(this.carcontrol.doorStsFrontLeft==0){
                    this.doorStsFrontLeft = "关闭"
                  }
                  if(this.carcontrol.doorStsFrontRight==1){
                    this.doorStsFrontRight = "打开"
                  }else if(this.carcontrol.doorStsFrontRight==0){
                    this.doorStsFrontRight = "关闭"
                  }
                  if(this.carcontrol.doorStsRearLeft==1){
                    this.doorStsRearLeft = "打开"
                  }else if(this.carcontrol.doorStsRearLeft==0){
                    this.doorStsRearLeft = "关闭"
                  }
                  if(this.carcontrol.doorStsRearRight==1){
                    this.doorStsRearRight = "打开"
                  }else if(this.carcontrol.doorStsRearRight==0){
                    this.doorStsRearRight = "关闭"
                  }
                //车窗状态
                    if(this.carcontrol.windowStsFrontLeft==1){
                        this.windowStsFrontLeft = "已打开"
                      }else if(this.carcontrol.windowStsFrontLeft==0){
                        this.windowStsFrontLeft = "已关闭"
                      }
                      if(this.carcontrol.windowStsFrontRight==1){
                        this.windowStsFrontRight = "已打开"
                      }else if(this.carcontrol.windowStsFrontRight==0){
                        this.windowStsFrontRight = "已关闭"
                      }
                      if(this.carcontrol.windowStsRearLeft==1){
                        this.windowStsRearLeft = "已打开"
                      }else if(this.carcontrol.windowStsRearLeft==0){
                        this.windowStsRearLeft = "已关闭"
                      }
                      if(this.carcontrol.windowStsRearRight==1){
                        this.windowStsRearRight = "已打开"
                      }else if(this.carcontrol.windowStsRearRight==0){
                        this.windowStsRearRight = "已关闭"
                      }
                var door = {
                  left_top: this.doorStsFrontLeft,
                  right_top: this.doorStsFrontRight,
                  left_bottom: this.doorStsRearLeft,
                  right_bottom: this.doorStsRearRight
                };
                var window = {
                  left_top: this.windowStsFrontLeft,
                  right_top: this.windowStsFrontRight,
                  left_bottom: this.windowStsRearLeft,
                  right_bottom: this.windowStsRearRight
                };
                if (this.activeshow == 1) {
                  this.Condition = tai;
                } else if (this.activeshow == 2) {
                  this.Condition = door;
                } else if (this.activeshow == 3) {
                  this.Condition = window;
                }
                  if(this.type==1){
                              this.isTrue = !this.isTrue;
                              this.isTrue ? (this.locknum = 1) : (this.locknum = 2);
                          }
                          if(this.type==2){
                              this.isTrues = !this.isTrues;
                          }                          
                          if(this.type==3){
                              this.isTruess = !this.isTruess;
                              this.isTruess ? (this.firenum = 1) : (this.firenum = 2);
                          }                          
                          if(this.type==4){
                              this.isTruesss = !this.isTruesss;
                              setTimeout(() => {
                                this.isTruesss = !this.isTruesss;
                              }, 5000);
                      }
              clearInterval(this.time);
              this.$store.dispatch("LOADINGFLAG", false);
            } else if (res.data.status == "FAILED") {
              Toast({
                message: "指令下发成功，处理失败！",
                position: "middle",
                duration: 2000
              });
               clearInterval(this.time);
              this.$store.dispatch("LOADINGFLAG", false);
            }
          } else {
            // alert(4)
            Toast({
              message: "指令下发失败！",
              position: "middle",
              duration: 2000
            });
             clearInterval(this.time);
             this.$store.dispatch("LOADINGFLAG", false);
          }
        });
    },
    //手动刷新
    loading() {
      this.Carquerry();
      this.activeshow = 1;
    },
    //车辆授权状态
    vehiclestatus(){
				this.$http.post(Lovecar.vehiclestatus,{},this.$store.state.tsppin).then((res)=>{
          
					if(res.data.returnSuccess){
            // let arr=res.data.data
            // arr.forEach(function(ii,index){
            //   console.log(ii,index)
            //   if(ii.isLocking===true){    
            //     this.Rajtigo=!this.Rajtigo
            //     this.vehicleState=ii.vin
            //   }
            // });
            for(let i=0;i<res.data.data.length;i++){
              if(res.data.data[i].isLocking==true){
                this.Rajtigo=!this.Rajtigo
                this.vehicleState=res.data.data[i].vin
              }
            }
            // this.Rajtigo=res.data.data[0].isLocking  //isLocking:true 代表已授权
						// this.vehicleState=res.data.data[0].vin
					}
				})
			},
  },
  filters:{
      changenum(value){
        value=value*100
        return value
      }
  },
  computed: {
    userId() {
      return JSON.parse(this.$store.state.tsppin.headers.identityParam).userId;
    }
  },
  //检测输入框
  watch: {
    pinNumber(newVal, oldVal) {
      if (this.pinNumber.length == 6) {
        var PIN = this.pinNumber;
        this.popupVisible = !this.popupVisible;
        (this.IsShow = false), (this.pinNumber = "");
        this.$http
          .post(
            Lovecar.Checkphonepin,
            {
              pin: PIN
            },
            this.$store.state.tsppin
          )
          .then(res => {
            // alert(1)
            // alert(res.data.returnSuccess)
            if (res.data.returnSuccess) {
              if (this.type == 1) {
                //车辆锁定的接口
                // alert(this.$store.state.vins)
                // this.isTrue ? (this.locknum = 1) : (this.locknum = 2);
                var params = {
                  vin: this.$store.state.vins,
                  operationType: "LOCK",
                  operation: this.locknum //操作项
                };
                this.$http
                  .post(Lovecar.Control, params, this.$store.state.tsppin)
                  .then(res => {
                    this.operationIds = res.data.operationId;
                    // alert(res.data.operationId)
                    // alert(this.operationIdcar)
                    if (res.data.returnSuccess) {
                      this.getAsyReturn(this.operationIdcar);
                      // alert(this.isTrue)
                    } else {
                      if (res.data.returnErrCode == 400) {
                        Toast({
                          message: "token验证失败",
                          position: "middle",
                          duration: 2000
                        });
                      } else {
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    }
                  })
                  .catch(err => {
                    Toast({
                      message: "系统异常",
                      position: "middle",
                      duration: 2000
                    });
                  });
              } else if (this.type == 2) {
                // 后备箱接口
                // console.log(this.isTrues);
                this.isTrues ? (this.backnum = 1) : (this.backnum = 2);
                var param = {
                  vin: this.$store.state.vins,
                  operationType: "TRUNK",
                  operation: this.backnum
                };
                this.$http
                  .post(Lovecar.Control, param, this.$store.state.tsppin)
                  .then(res => {
                    if (res.data.returnSuccess) {
                      this.getAsyReturn(this.operationIdcar);
                    } else {
                      if (res.data.returnErrCode == 400) {
                        Toast({
                          message: "token验证失败",
                          position: "middle",
                          duration: 2000
                        });
                      } else {
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    }
                  })
                  .catch(err => {
                    Toast({
                      message: "系统异常",
                      position: "middle",
                      duration: 2000
                    });
                  });
              } else if (this.type == 3) {
                //引擎接口，熄火
                var param = {
                  vin: this.$store.state.vins,
                  operationType: "ENGINE",
                  operation: this.firenum //操作项
                };
                this.$http
                  .post(Lovecar.Control, param, this.$store.state.tsppin)
                  .then(res => {
                    this.operationIdss = res.data.operationId;
                    if (res.data.returnSuccess) {
                      this.getAsyReturn(this.operationIdcar);
                    } else {
                      if (res.data.returnErrCode == 400) {
                        Toast({
                          message: "token验证失败",
                          position: "middle",
                          duration: 2000
                        });
                      } else {
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    }
                  })
                  .catch(err => {
                    Toast({
                      message: "系统异常",
                      position: "middle",
                      duration: 2000
                    });
                  });
              } else if (this.type == 4) {
                var param = {
                  vin: this.$store.state.vins,
                  operationType: "FIND_VEHICLE"
                };
                this.$http
                  .post(Lovecar.Control, param, this.$store.state.tsppin)
                  .then(res => {
                    this.operationIdses = res.data.operationId;
                    if (res.data.returnSuccess) {
                      this.getAsyReturn(this.operationIdcar);
                    } else {
                      if (res.data.returnErrCode == 400) {
                        Toast({
                          message: "token验证失败",
                          position: "middle",
                          duration: 2000
                        });
                      } else {
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    }
                  })
                  .catch(err => {
                    Toast({
                      message: res.data.returnErrMsg,
                      position: "middle",
                      duration: 2000
                    });
                  });
              }
            } else {
              Toast({
                message: res.data.returnErrMsg,
                position: "middle",
                duration: 2000
              });
            }
          })
          .catch(req => {
            Toast({
              message: "系统异常",
              position: "middle",
              duration: 2000
            });
          });
      }
    },
    userId(newVal, oldVal) {
      this.vehiclestatus()
      this.tspid=this.$store.state.tspId
        if(this.$store.state.tspId==undefined){
        this.tspid=0
      }
      this.$http
        .post(
          My.My_Bus,
          {
            userId: this.$store.state.userId,
            aaaUserID:this.$store.state.aaaid,
            phone: this.$store.state.mobile,
            tspUserId:this.tspid
          },
          this.$store.state.tsppin
        )
        .then(res => {
          if (res.data.returnSuccess) {
            // if(res.data==[]){
            //   Toast({
            //     message:'请先绑定车辆',
            //     position:'middle',
            //     duration:2000
            //   })
            // }else{
            // alert(1)
            this.BusDetails = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].def == 1) {
                this.carsysitem = res.data.data[i].seriesName;
                // console.log(res.data.data[i].vin);
                var payload = res.data.data[i].vin;
                this.$store.dispatch("CARVINS", payload);
                // this.$store.state.vins = res.data.data[i].vin;
              }
              // }
            }
            this.vinn = this.$store.state.vins;
            this.Support()
            // console.log(this.vinn)
            this.Carquerry();
            // console.log(this.$store.state.mytoken.headers.timaToken);
          }
        });
    }
  },
  mounted() {
    $(".MobileHeight").css({"marginTop": this.$store.state.mobileStatusBar})
    if(this.userId){
      this.vehiclestatus()
      this.tspid=this.$store.state.tspId
       if(this.$store.state.tspId==undefined){
          this.tspid=0
        }
     this.$http
        .post(
          My.My_Bus,
          {
            userId: this.$store.state.userId,
            phone: this.$store.state.mobile,
            tspUserId:this.tspid,
            aaaUserID:this.$store.state.aaaid,
          },
          this.$store.state.tsppin
        )
        .then(res => {
          if (res.data.returnSuccess) {
            this.BusDetails = res.data.data;
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].def == 1) {            
                this.carsysitem = res.data.data[i].seriesName || null;
                var payload = res.data.data[i].vin;
                this.defaultvin=res.data.data[i].vin;
                this.$store.state.brandName=res.data.data[i].brandName
                console.log('获取默认车辆vin码:'+ this.defaultvin)
                this.$store.dispatch("CARVINS", payload);
                //获取机车 登录登出状态
  //  	       this.getCarLoginState()
               }
              }
            this.vinn = this.$store.state.vins;
            this.Support()
            this.Carquerry();
          }else{
              Toast({
                message: res.data.returnErrMsg,
                position: "middle",
                duration: 2000
              });
          }
        });
    }
      
  }
};

</script>
<style scoped>
	.mint-popup {
		border-radius: 0.1rem;
	}
	.lovecar {
		position: fixed;
		top: 0;
		width: 100%;
	}
	.pin-code {
		height: 2rem;
		width: 100%;
	}
	
	.pin-code>div>input {
		display: block;
		width: 5.6rem;
		height: 0.94rem;
		text-indent: 0.4rem;
		letter-spacing: 0.77rem;
		border: none;
		outline: none;
		background: url(../../../static/images/Lovecar/border@2x.png) no-repeat center;
		background-size: 100%;
	}
	
	.typer {
		position: fixed;
		bottom: 0;
		background-color: #fff;
		height: 4.5rem;
		width: 100%;
		padding-top: 0.1rem;
		z-index: 3001;
	}
	
	.typer li {
		float: left;
		height: 0.7rem;
		margin: 0.1rem 0.05rem 0;
		color: #333;
		text-align: center;
		font-size: 0.32rem;
		line-height: 0.7rem;
		background-color: #ccc;
		-webkit-border-radius: 0.1rem;
		-moz-border-radius: 0.1rem;
		border-radius: 0.1rem;
	}
	
	.typer li.typer-num {
		width: 31%;
		background-image: -webkit-linear-gradient( 125deg, #147b96, #e6d205 25%, #147b96 50%, #e6d205 75%, #147b96);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		-webkit-background-size: 200% 100%;
		-webkit-animation: masked-animation 4s infinite linear;
	}
	
	.typer li.typer-num.is-A {
		margin-left: 0.31rem;
	}
	
	.typer li.typer-num.is-OK {
		width: 0.8rem;
		margin-left: 0.1rem;
	}
	
	@-webkit-keyframes masked-animation {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: -100% 0;
		}
	}
	
	.yy {
		flex-wrap: wrap;
		justify-content: center;
		height: 100%;
	}
	/* 左上角弹框 */
	
	.mask {
		width: 100%;
		height: 100%;
		opacity: 0.5;
		background: #000;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	
	.mask_content {
		position: fixed;
		top: 28%;
		left: 50%;
		right: 50%;
		transform: translate3d(-50%, -50%, 0);
		background-color: #fff;
		height: 4.1rem;
		width: 90%;
		z-index: 10000;
		border-radius: 3px;
	}
	
	.cancel {
		position: fixed;
		z-index: 10000;
		top: 1rem;
		left: 0.3rem;
	}
	
	.tipcontent {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;
	}
	
	.tipcontent li {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		margin-top: 0.3rem;
	}
	
	.tipcontent li img {
		width: 0.4rem;
		display: block;
	}
	
	.tipcontent li span {
		color: #444;
		font-size: 0.22rem;
		margin-top: 0.23rem;
	}
	/*  */
	
	#wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0.4rem 0;
	}
	
	#wrap input[type="text"] {
		width: 20%;
		height: 0.7rem;
		float: left;
		text-align: center;
	}
	
	.one {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0.4rem 0;
	}
	
	.one input {
		width: 20%;
		height: 0.7rem;
	}
	
	input:focus {
		outline: none;
	}
	
	.con {
		width: 6rem;
		height: 3rem;
		padding: 0.2rem 0.4rem;
	}
	
	.del {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #fff;
		justify-content: space-between;
		border-bottom: 1px solid #f1f1f1;
		height: 0.88rem;
	}
	
	.sure {
		margin-bottom: 0.16rem;
		color: #555;
	}
	
	.active {
		color: #49bbff;
	}
	
	.act {
		color: #49bbff;
		font-size: 0.22rem;
		margin-top: 0.12rem;
	}
	
	.actives {
		color: #ccc !important;
	}
	
	.bus_l {
		position: relative;
	}
	
	.busl_r {
		position: absolute;
		font-size: 0.25rem;
		color: #49bbff;
	}
	
	.left_1 {
		left: -0.6rem;
		top: 1.5rem;
	}
	
	.left_2 {
		left: -0.6rem;
		top: 3rem;
	}
	
	.right_1 {
		right: -1rem;
		top: 1.5rem;
	}
	
	.right_2 {
		right: -1rem;
		top: 3rem;
	}
	
	.top_1 {
		top: 0.8rem;
		left: 0.8rem;
		font-size: 0.24rem;
	}
	
	.bottom_1 {
		bottom: 1.1rem;
		left: 0.8rem;
		font-size: 0.24rem;
	}
	
	.middle_1 {
		bottom: 2.5rem;
		left: 0.8rem;
		color: #49bbff;
		font-size: 0.24rem;
	}
	
	.tophead {
		/*position: absolute;*/
		height: 2.9rem;
		width: 100%;
		background-image: url("../../../static/images/Lovecar/bg.png");
		display: block;
		background-size: content;
		z-index: 1;
	}
	
	.nav {
		display: flex;
		/*position: fixed;
		top: 0;
		left: 0;*/
		flex-direction: row;
		align-items: center;
		height: 0.88rem;
		justify-content: space-between;
		padding: 0 0.5rem;
	}
	
	.left_bus {
		display: flex;
		flex-direction: column;
	}
	.content_carDoor {
		width: .35rem;
		height: .29rem;
	}
	.tailgate {
		width: .44rem;
	} 
	.Flameout {
		width: .31rem;
		height: .35rem;
	}
	
	.content_pic {
		width: 0.35rem;
		height: 0.35rem;
	}
	
	.lines {
		border-bottom: 1px solid #f1f1f1;
	}
	
	.left_bus1 {
		display: flex;
		flex-direction: column;
		height: 4.75rem;
		justify-content: space-around;
		align-items: center;
		padding-right: 0.6rem;
		padding-left: 0.2rem;
	}
	
	.txt_m {
		font-size: 0.34rem;
		color: #fff;
	}
	
	.activess {
		color: #444;
		font-size: 0.22rem;
		margin-top: 0.12rem;
	}
	
	.txt_r {
		font-size: 0.25rem;
		color: #fff;
	}
	
	.bus_righgt {
		/* width: 1.99rem; */
		height: 4.24rem;
		margin-right: -0.5rem;
	}
	
	.left_bus .pic1 {
		width: 0.4rem;
		height: 0.4rem;
	}
	
	.left_bus .txt1 {
		font-size: 0.26rem;
		margin-top: 0.17rem;
	}
	
	.navs {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	
	.content {
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.content_1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.31rem 0;
	}
	
	.navs_h {
		height: 2rem;
	}
	
	.navs_t {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	
	.num {
		color: #fff;
		font-size: 0.28rem;
	}
	
	.txt {
		color: #fff;
		font-size: 0.23rem;
		margin-top: 0.18rem;
	}
	
	.air {
		height: 1.2rem;
		border-bottom: 1px solid #f1f1f1;
		justify-content: space-between;
	}
	
	.picc {
		width: 0.34rem;
		height: .38rem;
		display: block;
		margin-left: 0.65rem;
		margin-right: 0.51rem;
	}
	.air_contr {
		width: .26rem;
    height: .4rem;
	}
	
	.skylight {
		width: .34rem;
		height: .38rem;
	}
	
	.pic_r {
		width: 0.3rem;
		display: block;
		margin-right: 0.4rem;
	}
	
	.pic_txt {
		font-size: 0.28rem;
		color: #444;
	}
	
	.line_x {
		width: 0.17rem;
		padding-top: 0.4rem;
	}
	
	#can {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999999;
	}
</style>