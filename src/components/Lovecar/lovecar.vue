<template>
	<div style="border-top:.01rem solid #49bbff" class="love-wrapper">
		<div class="lovecar tophead">
			<div class="nav MobileHeight">
				<div style="color:#fff;font: .3rem/.5rem 'PingFang-SC-Regular'" @click="navtip">更多车控</div>
				<span class="txt_m" style="margin-right: 1.8rem;">&nbsp;&nbsp;&nbsp;&nbsp;{{this.$store.state.nomarlseriseName}}</span>
				<span class="txt_r"></span>
			</div>
			<div class="navs navs_h">
				<div class="navs_t">
					<span class="num">{{carcontrol.fuelPercent==undefined?'':carcontrol.fuelPercent|changenum}}</span>
					<span class="txt">剩余油量（%）</span>
				</div>
				<div class="navs_t">
					<span class="num">{{carcontrol.totalDistance==undefined?0:carcontrol.totalDistance}}</span>
					<span class="txt">行驶里程（KM）</span>
				</div>
				<div class="navs_t">
					<span class="num">{{carcontrol.mileage==undefined?0:carcontrol.mileage}}</span>
					<span class="txt">续航里程（KM）</span>
				</div>
			</div>
		</div>
		<div class="lovecar-hei" style="height: 3rem;"></div>
		<!--爱车Start-->
		<div class="vehicle-condition">
			<div class="contents">
				<!--车况tap Start-->
				<div class="content-title">
					<div class="left_bus1">
						<div class="left_bus" @click="fn(1)">
							<img v-if="activeshow==1" class="pic1" src="../../../static/images/Wit/taiya.png" alt="">
							<img v-else class="pic1" src="../../../static/images/Wit/taiya1.png" alt="">&nbsp;&nbsp;
							<span :class="activeshow==1?'active':'actives'" class="txt1">胎压</span>
							<div v-show="activeshow==1?true:false" style="width:.7rem;height:.03rem;position:absolute;background:#49bbff;top:.7rem;left: 50%;transform: translate(-50%, -50%);"></div>
						</div>
						<div class="left_bus" @click="fn(2)">
							<img v-if="activeshow==2" class="pic1" src="../../../static/images/Wit/chemen.png" alt="">
							<img v-else class="pic1" src="../../../static/images/Wit/chemen1.png" alt="">&nbsp;&nbsp;
							<span :class="activeshow==2?'active':'actives'" class="txt1">车门</span>
							<div v-show="activeshow==2?true:false" style="width:.7rem;height:.03rem;position:absolute;background:#49bbff;top:.7rem;left: 50%;transform: translate(-50%, -50%);"></div>
						</div>
						<div class="left_bus" @click="fn(3)">
							<img v-if="activeshow==3" class="pic1" src="../../../static/images/Wit/chechuang.png" alt="">
							<img v-else class="pic1" src="../../../static/images/Wit/chechuang1.png" alt="">&nbsp;&nbsp;
							<span :class="activeshow==3?'active':'actives'" class="txt1">车窗</span>
							<div v-show="activeshow==3?true:false" style="width:.7rem;height:.03rem;position:absolute;background:#49bbff;top:.7rem;left: 50%;transform: translate(-50%, -50%);"></div>
						</div>
					</div>
				</div>
				<!--车况tap End-->

				<!--车况主体 Start-->
				<div class="bus_l" v-show="overall">
					<img style="position:absolute;left: 50%; top: 10%;transform: translate(-54%, -2%);margin-top:.5rem;" src="../../../static/images/Lovecar/lovecar.png" alt="" class="bus_righgt">
					<!--左边胎压状态Start-->
					<span ref='open1' class='busl_r left_1 '>{{Condition.left_top=='undefinedkPa'?'':Condition.left_top}}</span>
					<span ref='open2' class='busl_r  left_2 '>{{Condition.left_bottom=='undefinedkPa'?'':Condition.left_bottom}}</span>
					<!--左边胎压状态End-->

          <!--右边胎压状态Start-->
					<span ref='open3' class='busl_r right_1 '>{{Condition.right_top=='undefinedkPa'?'':Condition.right_top}}</span>
					<span ref='open4' class='busl_r right_2 '>{{Condition.right_bottom=='undefinedkPa'?'':Condition.right_bottom}}</span>
					<!--右边胎压状态End-->

          <!-- 轮胎温度start -->
          <!-- <span v-show="activeshow==1"  class='busl_r tiretemperature_left1'>{{Condition.tirePressureFrontLeft=='undefined℃'?'':Condition.tirePressureFrontLeft}}</span>
					<span v-show="activeshow==1"  class='busl_r tiretemperature_left2'>{{Condition.tirePressureRearLeft=='undefined℃'?'':Condition.tirePressureRearLeft}}</span>
          <span v-show="activeshow==1"  class='busl_r tiretemperature_right1'>{{Condition.tirePressureFrontRight=='undefined℃'?'':Condition.tirePressureFrontRight}}</span>
					<span v-show="activeshow==1"  class='busl_r tiretemperature_right2'>{{Condition.tirePressureRearRight=='undefined℃'?'':Condition.tirePressureRearRight}}</span> -->
          <!-- 轮胎温度en -->

					<!--胎压图片Start-->
					<img class="" v-show="activeshow==1" :src="'./static/images/Lovecar/taiya.png'" style="position:absolute;display:block;width:.36rem;height:.36rem;top: 2.6rem;right:2.4rem;" alt="">
					<img class="" v-show="activeshow==1" :src="'./static/images/Lovecar/taiya.png'" style="position:absolute;display:block;width:.36rem;height:.36rem;top: 2.6rem;left:2.2rem;" alt="">
					<img class="" v-show="activeshow==1" :src="'./static/images/Lovecar/taiya.png'" style="position:absolute;display:block;width:.36rem;height:.36rem;top: 4.25rem;left:2.2rem;" alt="">
					<img class="" v-show="activeshow==1" :src="'./static/images/Lovecar/taiya.png'" style="position:absolute;display:block;width:.36rem;height:.36rem;top: 4.25rem;right:2.4rem;" alt="">
					<!--胎压图片End-->

					<!-- 控制天窗的线Start 分为激活和未激活 -->
					<img class="" :src="'./static/images/Lovecar/rightshan.gif'" v-if="this.skylightStatus=='已打开'?true:false" v-show="activeshow=='3'?true:false" style="position:absolute;display:block;width:1.8rem;top:3.1rem;right:2.1rem;">
					<img class="" :src="'./static/images/Lovecar/blueright.png'" v-else v-show="activeshow=='3'?true:false" style="position:absolute;display:block;width:1.14rem;top:3.55rem;right:2.5rem;">
					<!--天窗线End-->

					<!-- 尾门线Start 分为激活和未激活  -->
					<img class="" :src="'./static/images/Lovecar/rightshan.gif'" v-if="this.doorStsTrunk=='已打开'?true:false" v-show="activeshow=='2'?true:false" style="position:absolute;display:block;width:1.8rem;top:5.05rem;right:2.1rem;">
					<img class="" :src="'./static/images/Lovecar/blueright.png'" v-else v-show="activeshow=='2'?true:false" style="position:absolute;display:block;width:1.14rem;top:5.5rem;right:2.5rem;">
					<!--尾门线End-->

					<!-- 控制右前车门线 -->
					<img class="" :src="'./static/images/Lovecar/rightshan.gif'" v-show="Condition.right_top=='已打开'?true:false" style="position:absolute;display:block;width:1rem;right:2.1rem;top: 2.5rem;">
					<!-- 控制右后车门线 -->
					<img class="" :src="'./static/images/Lovecar/rightshan.gif'" v-show="Condition.right_bottom=='已打开'?true:false" style="position:absolute;display:block;width:1rem;right:2.1rem;top: 4.2rem;">
					<!-- 控制左前车门线 -->
					<img class="" :src="'./static/images/Lovecar/leftshan.gif'" v-show="Condition.left_top=='已打开'?true:false" style="position:absolute;display:block;width:1rem;left: 1.9rem;top: 2.5rem;">
					<!-- 控制左后车门线 -->
					<img class="" :src="'./static/images/Lovecar/leftshan.gif'" v-show="Condition.left_bottom=='已打开'?true:false" style="position:absolute;display:block;width:1rem;left: 1.9rem;top: 4.2rem;">
					<!-- <span class='busl_r top_1'>{{this.engineHoodStsFront}}</span> -->
					<!--天窗And尾门状态Start-->
					<span v-show="activeshow=='2'?true:false" class='busl_r bottom_1 '>{{this.doorStsTrunk}}</span>
					<span v-show="activeshow=='3'?true:false" class='busl_r middle_1 '>{{this.skylightStatus}}</span>
					<!--天窗And尾门状态End-->
					<img class="loadingcar " style="width:.88rem;height:.88rem;margin-top:.2rem" src="../../../static/images/Lovecar/loading@2x.png" alt="" @click="loading">
				</div>
				<!--车况主体End-->
			</div>
			<!--功能轮播Start-->
			<mt-swipe v-show="overall" :auto="0" class="icon-container">
				<!--轮播第一页Start-->
				<mt-swipe-item>
					<div class="content">
						<div v-show="this.CAR_INFO" class="content_1" @click="doors">
							<!-- <div class="content_1" @click="doors"> -->
							<img v-if="activeshows==this.isTrue" class="content_carDoor" :src="'./static/images/Lovecar/lockon.png'" alt="">
							<img v-else class="content_carDoor" :src="'./static/images/Lovecar/lockoff.png'" alt="">
							<span :class="activeshows==this.isTrue?'act':'activess'">闭锁</span>
						</div>
						<div v-show="this.CAR_INFO" class="content_1" @click="doorsoppen">
							<!-- <div class="content_1" @click="doors"> -->
							<img v-if="activeshows==this.isTrueopen" class="content_carDoor" :src="'./static/images/Lovecar/nolockon.png'" alt="">
							<img v-else class="content_carDoor" :src="'./static/images/Lovecar/nolockoff.png'" alt="">
							<span :class="activeshows==this.isTrueopen?'act':'activess'">开锁</span>
						</div>
						<!-- <div class="content_1" @click="backbox"> -->
						<div v-show="this.TRUNK" class="content_1" @click="backbox">
							<img v-if="activeshows==this.isTrues" class="tailgate" :src="'./static/images/Wit/button5@3x_86.png'" alt="">
							<img v-else class="tailgate" :src="'./static/images/Wit/button5@3x.png'" alt="">
							<span :class="activeshows==this.isTrues?'act':'activess'">尾门</span>
						</div>
						<!-- <div class="content_1" @click="closefire"> -->
						<div v-show="this.ENGINE" class="content_1" @click="closefire">
							<img v-if="activeshows==this.isTruess" class="Flameout" :src="'./static/images/Lovecar/fireon.png'" alt="">
							<img v-else class="Flameout" :src="'./static/images/Lovecar/fireoff.png'" alt="">
							<span :class="activeshows==this.isTruess?'act':'activess'">启动</span>
						</div>
						<!-- <div class="content_1" @click="closefire"> -->
						<div v-show="this.ENGINE" class="content_1" @click="closefireoff">
							<img v-if="activeshows==this.isTruessoff" class="Flameout" :src="'./static/images/Lovecar/nofireon.png'" alt="">
							<img v-else class="Flameout" :src="'./static/images/Lovecar/nofireoff.png'" alt="">
							<span :class="activeshows==this.isTruessoff?'act':'activess'">熄火</span>
						</div>
						<!-- <div class="content_1" @click="enter()"> -->
						<div v-show="this.FIND_VEHICLE" class="content_1" @click="enter()">
							<img v-if="activeshows==this.isTruesss" class="content_pic" :src="'./static/images/Wit/button7@3x_2.png'" alt="">
							<img v-else class="content_pic" :src="'./static/images/Wit/button7@3x.png'" alt="">
							<span :class="activeshows==this.isTruesss?'act':'activess'">寻车</span>
						</div>
					</div>
				</mt-swipe-item>
				<!--轮播第一页end-->

				<!--轮播第二页Start-->
				<mt-swipe-item>
					<div class="action-content">
						<router-link v-show="this.Aircondtion_electricity" to="/lovecar/Electricairconditioning" tag="div" class="navs air">
							<div class="navs">
								<img class="picc" src="../../../static/images/Wit/ari.png" alt="">
								<span class="pic_txt">空调</span>
							</div>
						</router-link>
						<!-- 跳转到自动空调 -->
						<router-link v-show="this.Aircondtion" to="/lovecar/AirConditionControl" tag="div" class="navs air">
							<div class="navs">
								<img class="picc" src="../../../static/images/Wit/ari.png" alt="">
								<span class="pic_txt">空调</span>
							</div>
						</router-link>
						<router-link v-show="this.HOSTSEAT_HEAT" to="/lovecar/adjustSeatTemper" tag="div" class="navs air">
							<div class="navs">
								<img class="picc" src="../../../static/images/Wit/zuoyi.png" alt="">
								<span class="pic_txt">座椅</span>
							</div>
						</router-link>
						<router-link v-show="this.WINDOW" :to="{path:'/lovecar/windowControl',query:{carcontrol:this.carcontrol}}" tag="div" class="navs air">
							<div class="navs">
								<img class="picc" src="../../../static/images/Wit/chechuang.png" alt="">
								<span class="pic_txt">车窗</span>
							</div>
						</router-link>
						<!-- <router-link v-show="this.SUNROOF" :to="{path:'/lovecar/skylightControl',query:{carcontrol:this.carcontrol}}" tag="div" class="navs air">
              <div class="navs">
                <img class="picc skylight" src="../../../static/images/Wit/tianchuang.png" alt="">
                <span class="pic_txt">天窗</span>
              </div>
            </router-link> -->
						<router-link v-show="this.REMOTE_CLOSE_SUNROOF" :to="{path:'/lovecar/skylightClose',query:{carcontrol:this.carcontrol}}" tag="div" class="navs air">
							<div class="navs">
								<img class="picc skylight" src="../../../static/images/Wit/tianchuang.png" alt="">
								<span class="pic_txt">天窗</span>
							</div>
						</router-link>
						<router-link v-show="this.REMOTE_OPEN_OR_CLOSE_SUNROOF"  :to="{path:'/lovecar/skylightALL',query:{carcontrol:this.carcontrol}}" tag="div" class="navs air">
							<div class="navs">
								<img class="picc skylight" src="../../../static/images/Wit/tianchuang.png" alt="">
								<span class="pic_txt">天窗</span>
							</div>
						</router-link>
						<router-link v-show="this.PURIFICTION" to="/lovecar/airEvoluor" tag="div" class="navs air">
							<div class="navs">
								<img class="picc air_contr" src="../../../static/images/Wit/icon5@3x.png" alt="">
								<span class="pic_txt">净化器</span>
							</div>
						</router-link>
					</div>
				</mt-swipe-item>
				<!--轮播第二页End-->
			</mt-swipe>
		</div>
			<!--功能轮播End-->
		<!--爱车End-->
		<div class="bgMask" v-show="this.popupbg" @click="mainbgmask"></div>
		<!-- 输入框 -->
		<mt-popup v-model="popupVisible" position="middle" :modal="false">
			<div class="con" style="position:relative;">
				<div class="del">
					<img @click="cancel" src="../.././../static/images/Wit/delete@3x.png" alt="" style="width:.28rem">
					<div style="font-size:.36rem;color:#222">请输入PIN码</div>
					<span></span>
				</div>
				<img @click="Toasteach" class="question" style="width:.35rem;height:.35rem" :src="'./static/images/Lovecar/question.png'" alt="">
				<div class="pin-code flex maincenter cocenter">
					<div id="pinCon">
						<input @click="onTypewriting" v-model="pinNumber" class="pin-input" maxlength="6" type="password" readonly/>
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
				<li v-show="this.REAL_TIME_VIDEO_VIEW" @click="turnDing">
					<img src="../../../static/images/Lovecar/ding.png" alt="">
					<span>途记宝</span>
				</li>
				<router-link v-show="this.UPDATE_PIN" tag='li' to="/lovecar/revisePinCode">
					<img src="../../../static/images/Lovecar/xiupin.png" alt="">
					<span>修改PIN</span>
				</router-link>
				<router-link v-show="this.CAR_EXAMINATION" tag="li" to="/Bus_test">
				<!-- 暂时解除车辆体检权限调接口 -->
				<!-- <router-link  tag="li" to="/Bus_test"> -->
					<img src="../../../static/images/Lovecar/chejian.png" alt="">
					<span>车辆体检</span>
				</router-link>
				<router-link tag='li' to="/Authorize_next" v-if="Rajtigo">
					<img src="../../../static/images/Lovecar/yuancheng.png" alt="">
					<span>远程授权</span>
				</router-link>
				<router-link v-show="this.CONTROL_AUTH" tag='li' to="/Authorize" v-else-if="!Rajtigo">
					<img src="../../../static/images/Lovecar/yuancheng.png" alt="">
					<span>远程授权</span>
				</router-link>
				<li v-show="this.CAR_POINT_QUERY" @click="turnPosition">
					<img src="../../../static/images/Lovecar/dingwei.png" alt="">
					<span>定位</span>
				</li>
				<router-link v-show="this.FLOW_QUERY" tag='li' to="/lovecar/flowQuery">
					<img src="../../../static/images/Lovecar/liuliang.png" alt="">
					<span>流量查询</span>
				</router-link>
				<router-link v-show="this.FUEL_STATISTICS" tag='li' to="/lovecar/fuelQuery">
					<img src="../../../static/images/Lovecar/ranyou.png" alt="">
					<span>燃油统计</span>
				</router-link>
				<li v-show="this.ELECTRIC_FENCE" @click="turnPage">
					<img src="../../../static/images/Lovecar/dianzi.png" alt="">
					<span>电子围栏</span>
				</li>
				<router-link v-show="this.WIFI" tag='li' to="/lovecar/wifiLink">
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
import { MessageBox } from "mint-ui";
export default {
  name: "lovecar",
  data() {
    return {
      activeshow: 1, //默认第一个高亮
      activeshows: 1,
      tspid: "",
      popupbg: false,
      allwords: [], //贮存所有的提示语
      popupVisible: false,
      MaskIsshow: false, //黑色遮罩层
      Rajtigo: false, //被授权状态
      num: 3,
      overall:false,//接口加载完后显示车控
      isTrueopen: false, //控制开锁
      isTruessoff: false, //控制熄火
      isTrue: false, //控制闭锁
      isTruesss: false, //停车
      isTruess: false, //控制开启
      isTrues: false, //尾门
      IsShow: false,
      backnum: 2, //控制后备箱状态2为关闭默认
      keyNums: [],
      firstEnter: false, //第一次调用车况
      operationIds: "", //lock传给后台的
      operationIdss: "", //熄火传给后台的
      operationIdses: "", //寻车传给后台的
      operationIdcar: "", //查询车况的id
      msg: "车机已登录",
      vehicleState: "", //被授权车辆的vin
      pinNumber: "",
      type: "", //判断点击事件
      typebefore: "",
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
      defaultvin: "", //默认车辆的vin
      qrCodePin: "", //扫一扫二维码pin
      firstTips: true, //车机状态第一次提示,true不提示,改变为false的时候,Toast进行提示
      FIND_VEHICLE: false, //远程寻车
      CAR_INFO: false, //开闭锁,
      ENGINE: false, //引擎启动,
      UPDATE_PIN: false, //修改pin码
      CAR_EXAMINATION: false, //车辆体检
      WINDOW: false, //车窗控制
      Aircondtion_electricity: false, //电动空调
      Aircondtion: false, //自动空调
      TRUNK: false, //尾门控制
      HOSTSEAT_HEAT: false, //座椅控制
      REMOTE_OPEN_OR_CLOSE_SUNROOF: false, //可开关的天窗控制
      REMOTE_CLOSE_SUNROOF:false,//只能关闭的天窗控制
      PURIFICTION: false, //空气净化器控制
      WIFI: false, //wifi控制
      ELECTRIC_FENCE: false, //电子围栏
      CAR_EXAMINATION_QUERY: false, //车辆体检结果查询
      CAR_POINT_QUERY: false, //车辆位置查询
      SEND_TO_CAR: false, //发送倒车
      CAR_POONT_HISTORY_QUERY: false, //车辆历史轨迹
      REAL_TIME_VIDEO_VIEW: false, //行车记录仪
      FUEL_STATISTICS: false, //燃油统计
      CONTROL_AUTH: false, //远程授权
      FLOW_QUERY: false, //流量查询
      open_lock: [], //开锁的所有提示语
      close_lock: [], //闭锁的所有提示语
      open_trunk: [], //后备箱的所有提示语
      vehicle_launch: [], //车辆启动的所有提示语
      vehicle_flameout: [], //车辆熄火的所有提示语
      find_vehicle: [], //寻车的所有提示语
      vehicle_condition: [], //车况的所有提示语
      allFunction: [] //存储所有的车控功能
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
    mainbgmask() {
      this.popupbg = false;
      this.popupVisible = false;
      this.IsShow = false;
    },
    //点击高亮
    fn(type) {
      this.activeshow = type;
      var tai = {
                  left_top: this.carcontrol.tirePressureFrontLeft + "kPa",
                  right_top: this.carcontrol.tirePressureFrontRight + "kPa",
                  left_bottom: this.carcontrol.tirePressureRearLeft + "kPa",
                  right_bottom: this.carcontrol.tirePressureRearRight + "kPa",
                  // left_top_temperature:this.carcontrol.tirePressureFrontLeft+'℃',
                  // right_top_temperature: this.carcontrol.tirePressureFrontRight+'℃',
                  // left_bottom_temperature: this.carcontrol.tirePressureRearLeft+'℃',
                  // right_bottom_temperature: this.carcontrol. tirePressureRearRight+'℃'
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

      if (this.carcontrol.doorStsFrontLeft == 1) {
        this.doorStsFrontLeft = "已打开";
      } else if (this.carcontrol.doorStsFrontLeft == 0) {
        this.doorStsFrontLeft = "已关闭";
      }
      if (this.carcontrol.doorStsFrontRight == 1) {
        this.doorStsFrontRight = "已打开";
      } else if (this.carcontrol.doorStsFrontRight == 0) {
        this.doorStsFrontRight = "已关闭";
      }
      if (this.carcontrol.doorStsRearLeft == 1) {
        this.doorStsRearLeft = "已打开";
      } else if (this.carcontrol.doorStsRearLeft == 0) {
        this.doorStsRearLeft = "已关闭";
      }
      if (this.carcontrol.doorStsRearRight == 1) {
        this.doorStsRearRight = "已打开";
      } else if (this.carcontrol.doorStsRearRight == 0) {
        this.doorStsRearRight = "已关闭";
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
      if (this.carcontrol.windowStsFrontLeft == 1) {
        this.windowStsFrontLeft = "已打开";
      } else if (this.carcontrol.windowStsFrontLeft == 0) {
        this.windowStsFrontLeft = "已关闭";
      }
      if (this.carcontrol.windowStsFrontRight == 1) {
        this.windowStsFrontRight = "已打开";
      } else if (this.carcontrol.windowStsFrontRight == 0) {
        this.windowStsFrontRight = "已关闭";
      }
      if (this.carcontrol.windowStsRearLeft == 1) {
        this.windowStsRearLeft = "已打开";
      } else if (this.carcontrol.windowStsRearLeft == 0) {
        this.windowStsRearLeft = "已关闭";
      }
      if (this.carcontrol.windowStsRearRight == 1) {
        this.windowStsRearRight = "已打开";
      } else if (this.carcontrol.windowStsRearRight == 0) {
        this.windowStsRearRight = "已关闭";
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
        // if(this.Condition.left_top == "已关闭") {
        // 	$(".left_1").css("color", "#49BBFF");
        // } else if(this.Condition.left_top == "已打开") {
        // 	$(".left_1").css("color", "#FC3B46");
        // }
        // if(this.Condition.left_bottom == "已关闭") {
        // 	$(".left_2").css("color", "#49BBFF");
        // } else if(this.Condition.left_top == "已打开") {
        // 	$(".left_2").css("color", "#FC3B46");
        // }
        // if(this.Condition.right_top == "已关闭") {
        // 	$("right_1").css("color", "#49BBFF");
        // } else if(this.Condition.right_top == "已打开") {
        // 	$("right_1").css("color", "#FC3B46");
        // }
        // if(this.Condition.right_bottom == "已关闭") {
        // 	$("right_2").css("color", "#49BBFF");
        // } else if(this.Condition.right_bottom == "已打开") {
        // 	$("right_2").css("color", "#FC3B46");
        // }
      } else if (this.activeshow == 3) {
        this.Condition = window;
        // if(this.Condition.left_top == "已关闭") {
        // 	$(".left_1").css("color", "#49BBFF");
        // } else if(this.Condition.left_top == "已打开") {
        // 	$(".left_1").css("color", "#FC3B46");
        // }
        // if(this.Condition.left_bottom == "已关闭") {
        // 	$(".left_2").css("color", "#49BBFF");
        // } else if(this.Condition.left_top == "已打开") {
        // 	$(".left_2").css("color", "#FC3B46");
        // }
        // if(this.Condition.right_top == "已关闭") {
        // 	$("right_1").css("color", "#49BBFF");
        // } else if(this.Condition.right_top == "已打开") {
        // 	$("right_1").css("color", "#FC3B46");
        // }
        // if(this.Condition.right_bottom == "已关闭") {
        // 	$("right_2").css("color", "#49BBFF");
        // } else if(this.Condition.right_bottom == "已打开") {
        // 	$("right_2").css("color", "#FC3B46");
        // }
      }
	},
    //获取此车所具有的车况功能
    Support() {
      let param = {
        vin: this.vinn
      };
      this.$http
        .post(Lovecar.Support, param, this.$store.state.tsppin)
        .then(res => {
          if(res.data.returnSuccess){

            let allnum = res.data.data;
            this.allFunction = res.data.data;
            for (let value of allnum) {
              switch (value.code) {
                  case "WINDOW":
                     this.WINDOW = true;
                    break;
                  case "REMOTE_OPEN_OR_CLOSE_SUNROOF":
                    this.REMOTE_OPEN_OR_CLOSE_SUNROOF = true;
                    break;
                  case "REMOTE_CLOSE_SUNROOF":
                    this.REMOTE_CLOSE_SUNROOF = true;
                    break;
                  case "EAIRCONDITIONER":
                    this.Aircondtion_electricity = true;
                    break;
                  case "AIRCONDITIONER":
                    this.Aircondtion = true;
                    break;
                  case "PURIFICATION":
                    this.PURIFICTION = true;
                    break;
                  case "SEAT_HEAT":
                    this.HOSTSEAT_HEAT = true;
                    break;
                  case "CAR_INFO":
                    this.CAR_INFO = true;
                    break;
                  case "ENGINE":
                    this.ENGINE = true;
                    break;
                  case "CAR_EXAMINATION":
                    this.CAR_EXAMINATION = true;
                    break;
                  case "CAR_POINT_QUERY":
                    this.CAR_POINT_QUERY = true;
                    break;
                  case "UPDATE_PIN":
                    this.UPDATE_PIN = true;
                    break;
                  case "FLOW_QUERY":
                    this.FLOW_QUERY = true;
                    break;
                  case "FUEL_STATISTICS":
                    this.FUEL_STATISTICS = true;
                    break;
                  case "CONTROL_AUTH":
                    this.CONTROL_AUTH = true;
                    break;
                  case "WIFI":
                    this.WIFI = true;
                    break;
                  case "REAL_TIME_VIDEO_VIEW":
                    this.REAL_TIME_VIDEO_VIEW = true;
                    break;
                  case "ELECTRIC_FENCE":
                    this.ELECTRIC_FENCE = true;
                    break;
                  case "FIND_VEHICLE":
                    this.FIND_VEHICLE = true;
                    break;
                  case "TRUNK":
                    this.TRUNK = true;
                    break;
                  case "SEAT_VENTILATION":
                    this.HOSTSEAT_HEAT = true;
                    break;
                  case "TACHOGRAPH":
                    this.REAL_TIME_VIDEO_VIEW = true;
                    break;
                  default:
                }
              // if (value.code == "WINDOW") {
              //   this.WINDOW = true;
              // } else if (value.code == "SUNROOF") {
              //   this.SUNROOF = true;
              // } else if (value.code == "EAIRCONDITIONER") {
              //   this.Aircondtion_electricity = true;
              // } else if (value.code == "AIRCONDITIONER") {
              //   this.Aircondtion = true;
              // } else if (value.code == "PURIFICATION") {
              //   this.PURIFICTION = true;
              // } else if (value.code == "SEAT_HEAT") {
              //   this.HOSTSEAT_HEAT = true;
              // } else if (value.code == "CAR_INFO") {
              //   this.CAR_INFO = true;
              // } else if (value.code == "ENGINE") {
              //   this.ENGINE = true;
              // } else if (value.code == "CAR_EXAMINATION") {
              //   this.CAR_EXAMINATION = true;
              // } else if (value.code == "CAR_POINT_QUERY") {
              //   this.CAR_POINT_QUERY = true;
              // } else if (value.code == "UPDATE_PIN") {
              //   this.UPDATE_PIN = true;
              // } else if (value.code == "FLOW_QUERY") {
              //   this.FLOW_QUERY = true;
              // } else if (value.code == "FUEL_STATISTICS") {
              //   this.FUEL_STATISTICS = true;
              // } else if (value.code == "CONTROL_AUTH") {
              //   this.CONTROL_AUTH = true;
              // } else if (value.code == "WIFI") {
              //   this.WIFI = true;
              // } else if (value.code == "REAL_TIME_VIDEO_VIEW") {
              //   this.REAL_TIME_VIDEO_VIEW = true;
              // } else if (value.code == "ELECTRIC_FENCE") {
              //   this.ELECTRIC_FENCE = true;
              // } else if (value.code == "FIND_VEHICLE") {
              //   this.FIND_VEHICLE = true;
              // } else if (value.code == "TRUNK") {
              //   this.TRUNK = true;
              // } else if (value.code == "SEAT_VENTILATION") {
              //   this.HOSTSEAT_HEAT = true;
              // } else if (value.code == "TACHOGRAPH") {
              //   this.REAL_TIME_VIDEO_VIEW = true;
              // }
            }
          }
        });
    },
    moved() {
      this.MaskIsshow = false;
      this.IsShow = false;
      this.popupVisible = false;
    },
    //锁的弹出框
    doors() {
      this.typebefore = 1;
      this.popupVisible = true;
      this.popupbg = true;
    },
    doorsoppen() {
      this.typebefore = 5;
      this.popupVisible = true;
      this.popupbg = true;
    },
    //后备箱的请求
    backbox() {
      this.typebefore = 2;
      this.popupVisible = true;
      this.popupbg = true;
    },
    //熄火的请求
    closefire() {
      this.typebefore = 3;
      this.popupVisible = true;
      this.popupbg = true;
    },
    closefireoff() {
      this.typebefore = 6;
      this.popupVisible = true;
      this.popupbg = true;
    },
    // 寻车 事件
    enter() {
      this.typebefore = 4;
      this.popupVisible = true;
      this.popupbg = true;
    },
    //关闭PIN码弹框
    cancel() {
      this.IsShow = false;
      this.popupVisible = false;
      this.popupbg = false;
    },
    //关闭顶部主菜单
    delde() {
      this.MaskIsshow = false;
    },
    navtip() {
      this.MaskIsshow = true;
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
    //       for (let i = 0; i < res.data.data.length; i++) {
    //         if (res.data.data[i].def == 1) {
    //           this.vinn = res.data.data[i].vin;
    //         }
    //       }
    //     }
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
    //各种点击问好的提示
    Toasteach() {
      if (this.typebefore == 1) {
        MessageBox("提示", this.close_lock[3].dictValue);
      }
      if (this.typebefore == 5) {
        MessageBox("提示", this.open_lock[3].dictValue);
      }
      if (this.typebefore == 2) {
        MessageBox("提示", this.open_trunk[3].dictValue);
      }
      if (this.typebefore == 3) {
        if (this.isTruess) {
          MessageBox("提示", this.vehicle_launch[2].dictValue);
        } else {
          MessageBox("提示", this.vehicle_launch[5].dictValue);
        }
      }
      if (this.typebefore == 6) {
        MessageBox("提示", this.vehicle_flameout[3].dictValue);
      }
      if (this.typebefore == 4) {
        MessageBox("提示", this.find_vehicle[3].dictValue);
      }
    },
    //调用车况接口
    async Carquerry() {
      this.$http
        .post(
          Lovecar.Carquery,
          {
            vins: this.$store.state.vins
          },
          this.$store.state.tsppin
        )
        .then(res => {
          if (res.data.returnSuccess) {
            this.operationIdcar = res.data.operationId;
              this.getAsyReturn(res.data.operationId);
          } else {
            Toast({
              message: this.vehicle_condition[2].dictValue,
              position: "middle",
              duration: 2000
            });
          }
        });
    },
    //拿到所有的提示语
    Getmarkedwords() {
      this.$http.post(My.getwords, {}).then(res => {
        if (res.data.msg == "success") {
          this.allwords = res.data.data;
          this.$store.dispatch("getWords", this.allwords);
          for (let value of this.allwords) {
            if (value.dictType == "open_lock") {
              this.open_lock = value.sysDictDataVOs;
            }
            if (value.dictType == "close_lock") {
              this.close_lock = value.sysDictDataVOs;
            }
            if (value.dictType == "open_trunk") {
              this.open_trunk = value.sysDictDataVOs;
            }
            if (value.dictType == "vehicle_launch") {
              this.vehicle_launch = value.sysDictDataVOs;
            }
            if (value.dictType == "vehicle_flameout") {
              this.vehicle_flameout = value.sysDictDataVOs;
            }
            if (value.dictType == "find_vehicle") {
              this.find_vehicle = value.sysDictDataVOs;
            }
            if (value.dictType == "vehicle_condition") {
              this.vehicle_condition = value.sysDictDataVOs;
            }
          }
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
          {
            operationId: operationId
          },
          this.$store.state.tsppin
        )
        .then(res => {
          var tS = new Date().getTime() - this.sjc; //时间戳 差
          var tSS = parseInt((tS / 1000) % 60); // 时间差
          if (res.data.returnSuccess == true) {
            this.popupbg = false;
            if (res.data.status == "IN_PROGRESS") {
              //60s  后 清除定时器，不在发请求
              if (tSS >= 56) {
                if (this.type == 1) {
                  Toast({
                    message: this.close_lock[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 5) {
                  Toast({
                    message: this.open_lock[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 2) {
                  if (this.isTrues) {
                    Toast({
                      message: this.open_trunk[2].dictValue,
                      position: "middle",
                      duration: 2000
                    });
                  }
                } else if (this.type == 3) {
                  Toast({
                    message: this.vehicle_launch[3].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 6) {
                  Toast({
                    message: this.vehicle_flameout[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 4) {
                  Toast({
                    message: this.find_vehicle[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else {
                  Toast({
                    message: this.vehicle_condition[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                }
              } else {
                this.time = setInterval(() => {
                  this.$http
                    .post(
                      Lovecar.OperationId,
                      {
                        operationId: operationId
                      },
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      var tS = new Date().getTime() - this.sjc; //时间戳 差
                      var tSS = parseInt((tS / 1000) % 60); // 时间差
                      if (res.data.returnSuccess == true) {
                        if (res.data.status == "IN_PROGRESS") {
                          //60s  后 清除定时器，不在发请求
                          if (tSS >= 56) {
                            if (this.type == 1) {
                              Toast({
                                message: this.close_lock[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 5) {
                              Toast({
                                message: this.open_lock[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 2) {
                              if (this.isTrues) {
                                Toast({
                                  message: this.open_trunk[2].dictValue,
                                  position: "middle",
                                  duration: 2000
                                });
                              } else {
                                Toast({
                                  message: this.open_trunk[1].dictValue,
                                  position: "middle",
                                  duration: 2000
                                });
                              }
                            } else if (this.type == 3) {
                              Toast({
                                message: this.vehicle_launch[3].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 6) {
                              Toast({
                                message: this.vehicle_flameout[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 4) {
                              Toast({
                                message: this.find_vehicle[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else {
                              Toast({
                                message: this.vehicle_condition[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            }
                            clearInterval(this.time);
                            localhide()
                          }
                        } else if (res.data.status == "SUCCEED") {
                          clearInterval(this.time);
                          localhide()
                          this.overall=true
                          if (this.type == 1) {
                            this.isTrue = true;
                            this.isTrueopen = false;
                            Toast({
                              message: this.close_lock[1].dictValue,
                              position: "middle",
                              duration: 3000
                            });
                          }
                          if (this.type == 5) {
                            this.isTrue = false;
                            this.isTrueopen = true;
                            Toast({
                              message: this.open_lock[1].dictValue,
                              position: "middle",
                              duration: 3000
                            });
                          }
                          if (this.type == 2) {
                            this.isTrues = !this.isTrues;
                            if (this.isTrues) {
                              Toast({
                                message: this.open_trunk[2].dictValue,
                                position: "middle",
                                duration: 3000
                              });
                            } else {
                              Toast({
                                message: this.open_trunk[1].dictValue,
                                position: "middle",
                                duration: 3000
                              });
                            }
                          }
                          if (this.type == 3) {
                            this.isTruess = true;
                            this.isTruessoff = false;
                            Toast({
                              message: this.vehicle_launch[1].dictValue,
                              position: "middle",
                              duration: 3000
                            });
                          }
                          if (this.type == 6) {
                            this.isTruess = false;
                            this.isTruessoff = true;
                            Toast({
                              message: this.vehicle_flameout[1].dictValue,
                              position: "middle",
                              duration: 3000
                            });
                          }
                          if (this.type == 4) {
                            this.isTruesss = !this.isTruesss;
                            Toast({
                              message: this.find_vehicle[1].dictValue,
                              position: "middle",
                              duration: 1500
                            });
                            setTimeout(() => {
                              this.isTruesss = !this.isTruesss;
                            }, 5000);
                          }
                          if (res.data.data) {
                            this.carcontrol = res.data.data;
                            Toast(
                              {
                                message: this.vehicle_condition[1].dictValue,
                                position: "middle",
                                duration: 2000
                              },
                              2000
                            );
                            if (res.data.data.doorLockStsFrontLeft == 0) {
                              this.isTrue = false;
                              this.isTrueopen = true;
                            } else {
                              this.isTrue = true;
                              this.isTrueopen = false;
                            }
                            if (res.data.data.engineStatus == 1) {
                              this.isTruess = true;
                              this.isTruessoff = false;
                            } else {
                              this.isTruess = false;
                              this.isTruessoff = true;
                            }
                            if (res.data.data.doorStsTrunk == 1) {
                              this.isTrues = true;
                            } else {
                              this.isTrues = false;
                            }
                            this.engineHoodStsFront = this.carcontrol
                              .engineHoodStsFront
                              ? (this.engineHoodStsFront = "已打开")
                              : (this.engineHoodStsFront = "已关闭");
                            // this.carcontrol.engineHoodStsFront ?
                            // 	$(".top_1").css("color", "#FC3B46") :
                            // 	$(".top_1").css("color", "#49BBFF");
                            this.acStatus = this.carcontrol.acStatus; //空调初始状态
                            this.skylightStatus = this.carcontrol.skylightStatus
                              ? (this.skylightStatus = "已打开")
                              : (this.skylightStatus = "已关闭"); //天窗初始状态
                            // this.carcontrol.skylightStatus ?
                            // 	$(".middle_1").css("color", "#FC3B46") :
                            // 	$(".middle_1").css("color", "#49BBFF");
                            this.backnum = this.carcontrol.doorStsTrunk;
                            this.backnum
                              ? (this.doorStsTrunk = "已打开")
                              : (this.doorStsTrunk = "已关闭"); //后备箱的初始状态
                            // this.backnum ?
                            // 	$(".bottom_1").css("color", "#FC3B46") :
                            // 	$(".bottom_1").css("color", "#49BBFF");
                            this.engineStatus = this.carcontrol.engineStatus;
                            var tai = {
                                  left_top: this.carcontrol.tirePressureFrontLeft + "kPa",
                                  right_top: this.carcontrol.tirePressureFrontRight + "kPa",
                                  left_bottom: this.carcontrol.tirePressureRearLeft + "kPa",
                                  right_bottom: this.carcontrol.tirePressureRearRight + "kPa",
                                  // left_top_temperature:this.carcontrol.tirePressureFrontLeft+'℃',
                                  // right_top_temperature: this.carcontrol.tirePressureFrontRight+'℃',
                                  // left_bottom_temperature: this.carcontrol.tirePressureRearLeft+'℃',
                                  // right_bottom_temperature: this.carcontrol. tirePressureRearRight+'℃'
                            };
                            //车门状态
                            if (this.carcontrol.doorStsFrontLeft == 1) {
                              this.doorStsFrontLeft = "已打开";
                            } else if (this.carcontrol.doorStsFrontLeft == 0) {
                              this.doorStsFrontLeft = "已关闭";
                            }
                            if (this.carcontrol.doorStsFrontRight == 1) {
                              this.doorStsFrontRight = "已打开";
                            } else if (this.carcontrol.doorStsFrontRight == 0) {
                              this.doorStsFrontRight = "已关闭";
                            }
                            if (this.carcontrol.doorStsRearLeft == 1) {
                              this.doorStsRearLeft = "已打开";
                            } else if (this.carcontrol.doorStsRearLeft == 0) {
                              this.doorStsRearLeft = "已关闭";
                            }
                            if (this.carcontrol.doorStsRearRight == 1) {
                              this.doorStsRearRight = "已打开";
                            } else if (this.carcontrol.doorStsRearRight == 0) {
                              this.doorStsRearRight = "已关闭";
                            }
                            //车窗状态
                            if (this.carcontrol.windowStsFrontLeft == 1) {
                              this.windowStsFrontLeft = "已打开";
                            } else if (
                              this.carcontrol.windowStsFrontLeft == 0
                            ) {
                              this.windowStsFrontLeft = "已关闭";
                            }
                            if (this.carcontrol.windowStsFrontRight == 1) {
                              this.windowStsFrontRight = "已打开";
                            } else if (
                              this.carcontrol.windowStsFrontRight == 0
                            ) {
                              this.windowStsFrontRight = "已关闭";
                            }
                            if (this.carcontrol.windowStsRearLeft == 1) {
                              this.windowStsRearLeft = "已打开";
                            } else if (this.carcontrol.windowStsRearLeft == 0) {
                              this.windowStsRearLeft = "已关闭";
                            }
                            if (this.carcontrol.windowStsRearRight == 1) {
                              this.windowStsRearRight = "已打开";
                            } else if (
                              this.carcontrol.windowStsRearRight == 0
                            ) {
                              this.windowStsRearRight = "已关闭";
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
                              // if(this.Condition.left_top == "已关闭") {
                              // 	$(".left_1").css("color", "#49BBFF");
                              // } else if(this.Condition.left_top == "已打开") {
                              // 	$(".left_1").css("color", "#FC3B46");
                              // }
                              // if(this.Condition.left_bottom == "已关闭") {
                              // 	$(".left_2").css("color", "#49BBFF");
                              // } else if(this.Condition.left_top == "已打开") {
                              // 	$(".left_2").css("color", "#FC3B46");
                              // }
                              // if(this.Condition.right_top == "已关闭") {
                              // 	$("right_1").css("color", "#49BBFF");
                              // } else if(this.Condition.right_top == "已打开") {
                              // 	$("right_1").css("color", "#FC3B46");
                              // }
                              // if(this.Condition.right_bottom == "已关闭") {
                              // 	$("right_2").css("color", "#49BBFF");
                              // } else if(
                              // 	this.Condition.right_bottom == "已打开"
                              // ) {
                              // 	$("right_2").css("color", "#FC3B46");
                              // }
                            } else if (this.activeshow == 3) {
                              this.Condition = window;
                              // if(this.Condition.left_top == "已关闭") {
                              // 	$(".left_1").css("color", "#49BBFF");
                              // } else if(this.Condition.left_top == "已打开") {
                              // 	$(".left_1").css("color", "#FC3B46");
                              // }
                              // if(this.Condition.left_bottom == "已关闭") {
                              // 	$(".left_2").css("color", "#49BBFF");
                              // } else if(this.Condition.left_top == "已打开") {
                              // 	$(".left_2").css("color", "#FC3B46");
                              // }
                              // if(this.Condition.right_top == "已关闭") {
                              // 	$("right_1").css("color", "#49BBFF");
                              // } else if(this.Condition.right_top == "已打开") {
                              // 	$("right_1").css("color", "#FC3B46");
                              // }
                              // if(this.Condition.right_bottom == "已关闭") {
                              // 	$("right_2").css("color", "#49BBFF");
                              // } else if(
                              // 	this.Condition.right_bottom == "已打开"
                              // ) {
                              // 	$("right_2").css("color", "#FC3B46");
                              // }
                            }
                          }
                        } else if (res.data.status == "FAILED") {
                          if (this.type == 1) {
                            Toast({
                              message: this.close_lock[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 5) {
                            Toast({
                              message: this.open_lock[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 2) {
                            if (!this.isTrues) {
                              Toast({
                                message: this.open_trunk[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else {
                              Toast({
                                message: this.open_trunk[1].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            }
                          } else if (this.type == 3) {
                            Toast({
                              message: this.vehicle_launch[3].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 6) {
                            Toast({
                              message: this.vehicle_flameout[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 4) {
                            Toast({
                              message: this.find_vehicle[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else {
                            Toast({
                              message: this.vehicle_condition[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          }
                          clearInterval(this.time);
                          localhide()
                        }
                      } else {
                        Toast({
                          message: this.vehicle_condition[2].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                        clearInterval(this.time);
                        localhide()
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              clearInterval(this.time);
              localhide()
              this.overall=true
              if (this.type == 1) {
                this.isTrue = true;
                this.isTrueopen = false;
                Toast({
                  message: this.close_lock[1].dictValue,
                  position: "middle",
                  duration: 3000
                });
              }
              if (this.type == 5) {
                this.isTrue = false;
                this.isTrueopen = true;
                Toast({
                  message: this.open_lock[1].dictValue,
                  position: "middle",
                  duration: 3000
                });
              }
              if (this.type == 2) {
                this.isTrues = !this.isTrues;
                if (this.isTrues) {
                  Toast({
                    message: this.open_trunk[1].dictValue,
                    position: "middle",
                    duration: 3000
                  });
                } else {
                  Toast({
                    message: this.open_trunk[2].dictValue,
                    position: "middle",
                    duration: 3000
                  });
                }
              }
              if (this.type == 3) {
                this.isTruess = true;
                this.isTruessoff = false;
                Toast({
                  message: this.vehicle_launch[1].dictValue,
                  position: "middle",
                  duration: 3000
                });
              }
              if (this.type == 6) {
                this.isTruess = false;
                this.isTruessoff = true;
                Toast({
                  message: this.vehicle_flameout[1].dictValue,
                  position: "middle",
                  duration: 3000
                });
              }
              if (this.type == 4) {
                this.isTruesss = !this.isTruesss;
                Toast({
                  message: this.find_vehicle[1].dictValue,
                  position: "middle",
                  duration: 1500
                });
                setTimeout(() => {
                  this.isTruesss = !this.isTruesss;
                }, 5000);
              }
              if (res.data.data) {
                this.carcontrol = res.data.data;

                Toast({
                  message: this.vehicle_condition[1].dictValue,
                  position: "middle",
                  duration: 2000
                });
                if (res.data.data.doorLockStsFrontLeft == 0) {
                  this.isTrue = false;
                  this.isTrueopen = true;
                } else {
                  this.isTrue = true;
                  this.isTrueopen = false;
                }
                if (res.data.data.engineStatus == 1) {
                  this.isTruess = true;
                  this.isTruessoff = false;
                } else {
                  this.isTruess = false;
                  this.isTruessoff = true;
                }
                if (res.data.data.doorStsTrunk == 1) {
                  this.isTrues = true;
                } else {
                  this.isTrues = false;
                }
                this.carcontrol.engineHoodStsFront
                  ? (this.engineHoodStsFront = "已打开")
                  : (this.engineHoodStsFront = "已关闭");
                this.acStatus = this.carcontrol.acStatus; //空调初始状态
                // this.carcontrol.engineHoodStsFront ?
                // 	$(".top_1").css("color", "#FC3B46") :
                // 	$(".top_1").css("color", "#49BBFF");
                this.carcontrol.skylightStatus
                  ? (this.skylightStatus = "已打开")
                  : (this.skylightStatus = "已关闭"); //天窗初始状态
                // this.carcontrol.skylightStatus ?
                // 	$(".middle_1").css("color", "#FC3B46") :
                // 	$(".middle_1").css("color", "#49BBFF");
                this.backnum = this.carcontrol.doorStsTrunk;
                this.backnum
                  ? (this.doorStsTrunk = "已打开")
                  : (this.doorStsTrunk = "已关闭"); //后备箱的初始状态
                // this.backnum ?
                // 	$(".bottom_1").css("color", "#FC3B46") :
                // 	$(".bottom_1").css("color", "#49BBFF");
                this.engineStatus = this.carcontrol.engineStatus;
                // var tai = {
                //   left_top: this.carcontrol.tirePressureFrontLeft,
                //   right_top: this.carcontrol.tirePressureFrontRight,
                //   left_bottom: this.carcontrol.tirePressureRearLeft,
                //   right_bottom: this.carcontrol.tirePressureRearRight
                // };
                // this.Condition = tai;
                var tai = {
                  left_top: this.carcontrol.tirePressureFrontLeft + "kPa",
                  right_top: this.carcontrol.tirePressureFrontRight + "kPa",
                  left_bottom: this.carcontrol.tirePressureRearLeft + "kPa",
                  right_bottom: this.carcontrol.tirePressureRearRight + "kPa",
                  // left_top_temperature:this.carcontrol.tirePressureFrontLeft+'℃',
                  // right_top_temperature: this.carcontrol.tirePressureFrontRight+'℃',
                  // left_bottom_temperature: this.carcontrol.tirePressureRearLeft+'℃',
                  // right_bottom_temperature: this.carcontrol. tirePressureRearRight+'℃'
                };
                //车门状态t
                if (this.carcontrol.doorStsFrontLeft == 1) {
                  this.doorStsFrontLeft = "已打开";
                } else if (this.carcontrol.doorStsFrontLeft == 0) {
                  this.doorStsFrontLeft = "已关闭";
                }
                if (this.carcontrol.doorStsFrontRight == 1) {
                  this.doorStsFrontRight = "已打开";
                } else if (this.carcontrol.doorStsFrontRight == 0) {
                  this.doorStsFrontRight = "已关闭";
                }
                if (this.carcontrol.doorStsRearLeft == 1) {
                  this.doorStsRearLeft = "已打开";
                } else if (this.carcontrol.doorStsRearLeft == 0) {
                  this.doorStsRearLeft = "已关闭";
                }
                if (this.carcontrol.doorStsRearRight == 1) {
                  this.doorStsRearRight = "已打开";
                } else if (this.carcontrol.doorStsRearRight == 0) {
                  this.doorStsRearRight = "已关闭";
                }
                //车窗状态
                if (this.carcontrol.windowStsFrontLeft == 1) {
                  this.windowStsFrontLeft = "已打开";
                } else if (this.carcontrol.windowStsFrontLeft == 0) {
                  this.windowStsFrontLeft = "已关闭";
                }
                if (this.carcontrol.windowStsFrontRight == 1) {
                  this.windowStsFrontRight = "已打开";
                } else if (this.carcontrol.windowStsFrontRight == 0) {
                  this.windowStsFrontRight = "已关闭";
                }
                if (this.carcontrol.windowStsRearLeft == 1) {
                  this.windowStsRearLeft = "已打开";
                } else if (this.carcontrol.windowStsRearLeft == 0) {
                  this.windowStsRearLeft = "已关闭";
                }
                if (this.carcontrol.windowStsRearRight == 1) {
                  this.windowStsRearRight = "已打开";
                } else if (this.carcontrol.windowStsRearRight == 0) {
                  this.windowStsRearRight = "已关闭";
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
                  // if(this.Condition.left_top == "已关闭") {
                  // 	$(".left_1").css("color", "#49BBFF");
                  // } else if(this.Condition.left_top == "已打开") {
                  // 	$(".left_1").css("color", "#FC3B46");
                  // }
                  // if(this.Condition.left_bottom == "已关闭") {
                  // 	$(".left_2").css("color", "#49BBFF");
                  // } else if(this.Condition.left_top == "已打开") {
                  // 	$(".left_2").css("color", "#FC3B46");
                  // }
                  // if(this.Condition.right_top == "已关闭") {
                  // 	$("right_1").css("color", "#49BBFF");
                  // } else if(this.Condition.right_top == "已打开") {
                  // 	$("right_1").css("color", "#FC3B46");
                  // }
                  // if(this.Condition.right_bottom == "已关闭") {
                  // 	$("right_2").css("color", "#49BBFF");
                  // } else if(this.Condition.right_bottom == "已打开") {
                  // 	$("right_2").css("color", "#FC3B46");
                  // }
                } else if (this.activeshow == 3) {
                  this.Condition = window;
                  // if(this.Condition.left_top == "已关闭") {
                  // 	$(".left_1").css("color", "#49BBFF");
                  // } else if(this.Condition.left_top == "已打开") {
                  // 	$(".left_1").css("color", "#FC3B46");
                  // }
                  // if(this.Condition.left_bottom == "已关闭") {
                  // 	$(".left_2").css("color", "#49BBFF");
                  // } else if(this.Condition.left_top == "已打开") {
                  // 	$(".left_2").css("color", "#FC3B46");
                  // }
                  // if(this.Condition.right_top == "已关闭") {
                  // 	$("right_1").css("color", "#49BBFF");
                  // } else if(this.Condition.right_top == "已打开") {
                  // 	$("right_1").css("color", "#FC3B46");
                  // }
                  // if(this.Condition.right_bottom == "已关闭") {
                  // 	$("right_2").css("color", "#49BBFF");
                  // } else if(this.Condition.right_bottom == "已打开") {
                  // 	$("right_2").css("color", "#FC3B46");
                  // }
                }
              }
            } else if (res.data.status == "FAILED") {
              if (this.type == 1) {
                Toast({
                  message: this.close_lock[2].dictValue,
                  position: "middle",
                  duration: 2000
                });
              } else if (this.type == 5) {
                Toast({
                  message: this.open_lock[2].dictValue,
                  position: "middle",
                  duration: 2000
                });
              } else if (this.type == 2) {
                if (!this.isTrues) {
                  Toast({
                    message: this.open_trunk[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else {
                  Toast({
                    message: this.open_trunk[1].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                }
              } else if (this.type == 3) {
                Toast({
                  message: this.vehicle_launch[3].dictValue,
                  position: "middle",
                  duration: 2000
                });
              } else if (this.type == 6) {
                Toast({
                  message: this.vehicle_flameout[2].dictValue,
                  position: "middle",
                  duration: 2000
                });
              } else if (this.type == 4) {
                Toast({
                  message: this.find_vehicle[2].dictValue,
                  position: "middle",
                  duration: 2000
                });
              } else {
                Toast({
                  message: this.vehicle_condition[2].dictValue,
                  position: "middle",
                  duration: 2000
                });
              }

              clearInterval(this.time);
             localhide()
            }
          } else {
            // alert(4)
            Toast({
              message: this.vehicle_condition[2].dictValue,
              position: "middle",
              duration: 2000
            });
            clearInterval(this.time);
            this.popupbg = false;
            localhide()
          }
        });
    },
    //手动刷新
    loading() {
      this.type = 10;
      this.Carquerry();
      this.activeshow = this.activeshow;
    },
    //车辆授权状态
    vehiclestatus() {
      this.$http
        .post(Lovecar.vehiclestatus, {}, this.$store.state.tsppin)
        .then(res => {
          if (res.data.returnSuccess) {
            // let arr=res.data.data
            // arr.forEach(function(ii,index){
            //   if(ii.isLocking===true){
            //     this.Rajtigo=!this.Rajtigo
            //     this.vehicleState=ii.vin
            //   }
            // });
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].isLocking == true) {
                this.Rajtigo = !this.Rajtigo;
                this.vehicleState = res.data.data[i].vin;
              }
            }
            // this.Rajtigo=res.data.data[0].isLocking  //isLocking:true 代表已授权
            // this.vehicleState=res.data.data[0].vin
          }
        });
    }
  },
  filters: {
    changenum(value) {
      value = Math.round(value * 100);
      return value;
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
        if (this.typebefore == 1) {
          this.type = 1;
        } else if (this.typebefore == 2) {
          this.type = 2;
        } else if (this.typebefore == 3) {
          this.type = 3;
        } else if (this.typebefore == 4) {
          this.type = 4;
        } else if (this.typebefore == 5) {
          this.type = 5;
        } else if (this.typebefore == 6) {
          this.type = 6;
        }
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
            if(res.data){
              if (res.data.returnSuccess) {
                if (this.type == 1) {
                  //车辆锁定的接口
                  // alert(this.$store.state.vins)
                  // this.isTrue ? (this.locknum = 1) : (this.locknum = 2);
                  var params = {
                    vin: this.$store.state.vins,
                    operationType: "LOCK",
                    operation: 2 //操作项
                  };
                  this.$http
                    .post(Lovecar.Control, params, this.$store.state.tsppin)
                    .then(res => {
                      this.operationIds = res.data.operationId;
                      // alert(res.data.operationId)
                      // alert(this.operationIdcar)
                      if (res.data.returnSuccess) {
                        Toast({
                          message: this.open_lock[0].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                        // alert(this.isTrue)
                      } else {
                        Toast({
                          message: this.open_lock[2].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    })
                    .catch(err => {
                      Toast({
                        message: this.open_lock[2].dictValue,
                        position: "middle",
                        duration: 2000
                      });
                    });
                } else if (this.type == 5) {
                  //车辆锁定的接口
                  // alert(this.$store.state.vins)
                  // this.isTrue ? (this.locknum = 1) : (this.locknum = 2);
                  var params = {
                    vin: this.$store.state.vins,
                    operationType: "LOCK",
                    operation: 1 //操作项
                  };
                  this.$http
                    .post(Lovecar.Control, params, this.$store.state.tsppin)
                    .then(res => {
                      this.operationIds = res.data.operationId;
                      // alert(res.data.operationId)
                      // alert(this.operationIdcar)
                      if (res.data.returnSuccess) {
                        Toast({
                          message: this.close_lock[0].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                        // alert(this.isTrue)
                      } else {
                        Toast({
                          message: this.close_lock[2].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    })
                    .catch(err => {
                      Toast({
                        message: this.close_lock[2].dictValue,
                        position: "middle",
                        duration: 2000
                      });
                    });
                } else if (this.type == 2) {
                  // 后备箱接口
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
                        Toast({
                          message: this.open_trunk[0].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        Toast({
                          message: this.open_trunk[2].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    })
                    .catch(err => {
                      Toast({
                        message: this.open_trunk[2].dictValue,
                        position: "middle",
                        duration: 2000
                      });
                    });
                } else if (this.type == 3) {
                  //引擎接口，熄火
                  var param = {
                    vin: this.$store.state.vins,
                    operationType: "ENGINE",
                    operation: 1 //操作项
                  };
                  this.$http
                    .post(Lovecar.Control, param, this.$store.state.tsppin)
                    .then(res => {
                      this.operationIdss = res.data.operationId;
                      if (res.data.returnSuccess) {
                        Toast({
                          message: this.vehicle_launch[0].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        Toast({
                          message: this.vehicle_launch[3].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    })
                    .catch(err => {
                      Toast({
                        message: this.vehicle_launch[3].dictValue,
                        position: "middle",
                        duration: 2000
                      });
                    });
                } else if (this.type == 6) {
                  //引擎接口，熄火
                  var param = {
                    vin: this.$store.state.vins,
                    operationType: "ENGINE",
                    operation: 2 //操作项
                  };
                  this.$http
                    .post(Lovecar.Control, param, this.$store.state.tsppin)
                    .then(res => {
                      this.operationIdss = res.data.operationId;
                      if (res.data.returnSuccess) {
                        Toast({
                          message: this.vehicle_flameout[0].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        Toast({
                          message: this.vehicle_flameout[2].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    })
                    .catch(err => {
                      Toast({
                        message: this.vehicle_flameout[2].dictValue,
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
                        Toast({
                          message: this.find_vehicle[0].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        Toast({
                          message: this.find_vehicle[2].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    })
                    .catch(err => {
                      Toast({
                        message: this.find_vehicle[0].dictValue,
                        position: "middle",
                        duration: 2000
                      });
                    });
                }
              } else {
                this.popupbg = false;
                Toast({
                  message: res.data.returnErrMsg,
                  position: "middle",
                  duration: 2000
                });
              }
            }

          })
          .catch(req => {
            Toast({
              message: res.data.returnErrMsg,
              position: "middle",
              duration: 2000
            });
          });
      }
    },
    userId(newVal, oldVal) {
      this.vehiclestatus();
      this.tspid = this.$store.state.tspId;
      if (this.$store.state.tspId == undefined) {
        this.tspid = 0;
      }
      // this.$http
      //   .post(
      //     My.My_Bus,
      //     {
      //       userId: this.$store.state.userId,
      //       aaaUserID: this.$store.state.aaaid,
      //       phone: this.$store.state.mobile,
      //       tspUserId: this.tspid
      //     },
      //     this.$store.state.tsppin
      //   )
      //   .then(res => {
      //     if (res.data.returnSuccess) {
      //       this.BusDetails = res.data.data;
      //       for (let i = 0; i < res.data.data.length; i++) {
      //         if (
      //           res.data.data[i].def == 1 ||
      //           res.data.data[i].defToNathor == 1
      //         ) {
      //           this.carsysitem = res.data.data[i].seriesName;
      //           var payload = res.data.data[i].vin;
      //           this.$store.dispatch("CARVINS", payload);
      //           // this.$store.state.vins = res.data.data[i].vin;
      //         }
      //         // }
      //       }
            this.firstEnter = true;
            // this.vinn = this.$store.state.vins;
            this.vinn = this.$store.state.defaultInformation.vin;
            this.Support();
            this.Carquerry();
        //   }
        // });
    }
  },
  // beforeRouteEnter:(to,from,next)=>{
  //      if(to.fullPath=='/lovecar'){
  //        next(vm =>{
  //          localshow()
  //         //此时该组件被实例化了
  //       })
  //      }else{
  //        next()
  //      }
  //     },
  beforeCreate() {
    clearInterval(this.time);
  },
  mounted() {

    let params = {
      userNo: this.$store.state.userId
    };
    this.$http.post(Lovecar.TSP, params).then(res => {
      if (res.data.msg == "success") {
        var tsp = res.data.data;
        this.$store.dispatch("TSP", tsp);
        params = {
          aaaUserID: this.$store.state.aaaid,
          tspUserId: this.$store.state.tspId,
          userId: this.$store.state.trueuserId,
          phone: this.$store.state.mobile
        };
      }
    });
    $(".MobileHeight").css({
      marginTop: this.$store.state.mobileStatusBar
    });
      this.Getmarkedwords();
    if (this.userId) {
      this.vehiclestatus();
      // this.$http
      //   .post(
      //     My.My_Bus,
      //     {
      //       userId: this.$store.state.userId,
      //       phone: this.$store.state.mobile,
      //       tspUserId: this.$store.state.tspId,
      //       aaaUserID: this.$store.state.aaaid
      //     },
      //     this.$store.state.tsppin
      //   )
      //   .then(res => {
      //     if (res.data.returnSuccess) {
      //       this.BusDetails = res.data.data;
      //       for (let i = 0; i < res.data.data.length; i++) {
      //         if (
      //           res.data.data[i].def == 1 ||
      //           res.data.data[i].defToNathor == 1
      //         ) {
      //           this.carsysitem = res.data.data[i].seriesName || null;
      //           var payload = res.data.data[i].vin;
      //           this.defaultvin = res.data.data[i].vin;
      //           this.$store.state.brandName = res.data.data[i].brandName;
      //           this.$store.dispatch("CARVINS", payload);
      //           //获取机车 登录登出状态
      //           //  	       this.getCarLoginState()
      //         }
      //       }
            this.firstEnter = true;
            // this.vinn = this.$store.state.vins;
            this.vinn = this.$store.state.defaultInformation.vin;
            this.Support();
            this.Carquerry();
          // } else {
          //   Toast({
          //     message: res.data.returnErrMsg,
          //     position: "middle",
          //     duration: 2000
          //   });
          // }
        // });
    }
  },
  beforeDestroy() {
    clearInterval(this.time);
  }
};
</script>
<style scoped>
.love-wrapper >>> .mint-msgbox-message {
  color: #999;
  margin: 0;
  text-align: left;
  line-height: 0.56rem;
  text-indent: 2em;
}
.clearFix:after {
  clear: both;
  display: block;
  visibility: hidden;
  height: 0;
  line-height: 0;
  content: "";
}

.love-wrapper {
  height: 100vh;
}

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

.pin-code > div > input {
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
  background-image: -webkit-linear-gradient(
    125deg,
    #147b96,
    #e6d205 25%,
    #147b96 50%,
    #e6d205 75%,
    #147b96
  );
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

/*自定遮罩层*/
.bgMask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
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
.vehicle-condition {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}

.contents {
  display: flex;
  justify-content: space-around;
  align-items: center;
  flex-direction: column;
}

.actives {
  color: #ccc !important;
}

.bus_l {
  position: relative;
  width: 100%;
  height: 6.14rem;
}

.busl_r {
  position: absolute;
  font-size: 0.25rem;
  color: #49bbff;
}

.left_1 {
  left: 1.2rem;
  top: 2.63rem;
}
.tiretemperature_left1{
  left: 1.2rem;
  top: 3.13rem;
}
.left_2 {
  left: 1.2rem;
  top: 4.3rem;
}
.tiretemperature_left2{
  left: 1.2rem;
  top: 4.8rem;
}
.right_1 {
  right: 1.5rem;
  top: 2.63rem;
}
.tiretemperature_right1{
  right: 1.5rem;
  top: 3.13rem;
}
.right_2 {
  right: 1.5rem;
  top: 4.3rem;
}
.top_1 {
  top: 0.3rem;
  left: 0.8rem;
  font-size: 0.24rem;
}

.bottom_1 {
  top: 5.4rem;
  right: 1.7rem;
  font-size: 0.24rem;
}

.middle_1 {
  top: 3.45rem;
  right: 1.7rem;
  color: #49bbff;
  font-size: 0.24rem;
}

.tophead {
  /*position: absolute;*/
  height: 3rem;
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
  align-items: center;
  position: relative;
  margin-bottom: 0;
}

.content_carDoor {
  width: 0.35rem;
  height: 0.35rem;
}

.tailgate {
  width: 0.44rem;
  height: 0.35rem;
}

.Flameout {
  width: 0.31rem;
  height: 0.35rem;
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
  justify-content: space-around;
  align-items: center;
  height: 100%;
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
  width: 2.72rem;
  height: 4.86rem;
  margin-right: -0.5rem;
}

.left_bus .pic1 {
  width: 0.4rem;
  height: 0.4rem;
}

.left_bus .txt1 {
  font-size: 0.26rem;
  margin-top: 0.12rem;
}
/*功能轮播Start*/

.icon-container {
  height: 2rem;
  width: 100%;
}

.love-wrapper >>> .mint-swipe-indicator {
  opacity: 1;
  background: #cccccc;
}

.love-wrapper >>> .mint-swipe-indicator.is-active {
  background: #49bbff;
}
/*功能轮播End*/

.navs {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}

.navs > img {
  margin-bottom: 0;
}

.content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

/*车况tap title部分start*/

.content-title {
  width: 100%;
  height: 1rem;
}

.action-content {
  display: flex;
  justify-content: space-around;
  align-items: center;
}

.content_1 {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 1.2rem;
  color: #444444;
  font-size: 0.22rem;
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
  justify-content: space-between;
}

.picc {
  width: 0.34rem;
  height: 0.38rem;
  display: block;
}

.air_contr {
  width: 0.26rem;
  height: 0.4rem;
}

.loadingcar {
  position: absolute;
  top: 0rem;
  right: 0.45rem;
}

.skylight {
  width: 0.34rem;
  height: 0.38rem;
}

.pic_r {
  width: 0.3rem;
  display: block;
  margin-right: 0.4rem;
}

.pic_txt {
  margin-left: 0.11rem;
  font-size: 0.22rem;
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

.question {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
}
</style>
