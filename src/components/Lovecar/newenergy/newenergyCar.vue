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
					<span class="num">{{this.carcontrol.soc==-1?0:this.carcontrol.soc}}</span>
					<span class="txt">剩余电量（%）</span>
				</div>
				<div class="navs_t">
					<span class="num">{{this.carcontrol.acOnMile}}</span>
					<span class="txt">空调开启剩余里程</span>
				</div>
				<div class="navs_t">
					<span class="num">{{this.carcontrol.acOffMile}}</span>
					<span class="txt">空调关闭剩余里程</span>
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
            <div class="left_bus" @click="fn(4)">
							<img v-if="activeshow==4" class="pic1" src="../../../../static/images/Lovecar/batteryindex1@2x.png" alt="">
							<img v-else class="pic1" src="../../../../static/images/Lovecar/batteryindex@2x.png" alt="">&nbsp;&nbsp;
							<span :class="activeshow==4?'active':'actives'" class="txt1">电池</span>
							<div v-show="activeshow==4?true:false" style="width:.7rem;height:.03rem;position:absolute;background:#49bbff;top:.7rem;left: 50%;transform: translate(-50%, -50%);"></div>
						</div>
						<div class="left_bus" @click="fn(1)">
							<img v-if="activeshow==1" class="pic1" src="../../../../static/images/Wit/taiya.png" alt="">
							<img v-else class="pic1" src="../../../../static/images/Wit/taiya1.png" alt="">&nbsp;&nbsp;
							<span :class="activeshow==1?'active':'actives'" class="txt1">胎压</span>
							<div v-show="activeshow==1?true:false" style="width:.7rem;height:.03rem;position:absolute;background:#49bbff;top:.7rem;left: 50%;transform: translate(-50%, -50%);"></div>
						</div>
						<div class="left_bus" @click="fn(2)">
							<img v-if="activeshow==2" class="pic1" src="../../../../static/images/Wit/chemen.png" alt="">
							<img v-else class="pic1" src="../../../../static/images/Wit/chemen1.png" alt="">&nbsp;&nbsp;
							<span :class="activeshow==2?'active':'actives'" class="txt1">车门</span>
							<div v-show="activeshow==2?true:false" style="width:.7rem;height:.03rem;position:absolute;background:#49bbff;top:.7rem;left: 50%;transform: translate(-50%, -50%);"></div>
						</div>
						<div class="left_bus" @click="fn(3)">
							<img v-if="activeshow==3" class="pic1" src="../../../../static/images/Wit/chechuang.png" alt="">
							<img v-else class="pic1" src="../../../../static/images/Wit/chechuang1.png" alt="">&nbsp;&nbsp;
							<span :class="activeshow==3?'active':'actives'" class="txt1">车窗</span>
							<div v-show="activeshow==3?true:false" style="width:.7rem;height:.03rem;position:absolute;background:#49bbff;top:.7rem;left: 50%;transform: translate(-50%, -50%);"></div>
						</div>
					</div>
				</div>
				<!--车况tap End-->

				<!--车况主体 Start-->
        <!-- 电池部分主体 -->
        <div v-show="activeshow==4" class="bus_l" @touchmove.prevent>
          <img class="loadingcar "  src="../../../../static/images/Lovecar/loading@2x.png" alt="" @click="loading">
          <div class="bus_l_bettery flex">
              <div style="position:absolute;width:1.4rem;height:1.9rem;top:.2rem;left:.1rem;overflow:hidden;">
                <div class="bus_l_bettery_left">
                    {{this.carcontrol.soc==-1?0:this.carcontrol.soc}}%
                </div>
              </div>
              <img style="width:1.6rem;height:2.2rem;position:absolute"  src="../../../../static/images/Lovecar/bgbattery@2x.png" alt="">
              <div class="bus_l_bettery_right">
                  <div>
                      <div>剩余电量</div>
                      <span>{{this.carcontrol.soc==-1?0:this.carcontrol.soc}}%</span>
                  </div>
                  <div>
                      <div>总里程</div>
                      <span>{{this.carcontrol.totalMileage}}KM</span>
                  </div>
              </div>
          </div>
          <ul class="betteryStatus">
            <li>
                <div>
                  <div>充电状态</div>
                  <span>{{this.chgPlugStatus}}</span>
                </div>
                <div>
                  <div>当前充电状态</div>
                  <span>{{this.chgStatus}}</span>
                </div>
            </li>
            <li>
                <div>
                  <div>预计慢充时间</div>
                  <span>{{this.carcontrol.slowChgLeftTime}}分钟</span>
                </div>
                <div>
                  <div>预计快充时间</div>
                  <span>{{this.carcontrol.quickChgLeftTime}}分钟</span>
                </div>
            </li>
          </ul>
        </div>
        <!-- 非电池部分主体 -->
				<div v-show="activeshow!=4" class="bus_l" >
					<img style="position:absolute;left: 50%; top: .96rem;transform: translate(-50%, 0%);" src="../../../../static/images/Lovecar/newenergyLovecar.png" alt="" class="bus_righgt">
					<span ref='open1' class='busl_r left_1 '>{{this.Condition.lfWindowOpen}}</span>
					<span ref='open2' class='busl_r  left_2 '>{{this.Condition.lrWindowOpen}}</span>
					<span ref='open3' class='busl_r right_1 '>{{this.Condition.rfWindowOpen}}</span>
					<span ref='open4' class='busl_r right_2 '>{{this.Condition.rrWindowOpen}}</span> 

          <!-- 控制页面空调展示与否 -->
          <div v-show="this.carcontrol.acStatus==1?true:false" class="controlCondition">
            <img :src="'./../../../../static/images/Lovecar/airenergyopen@2x.png'" alt="">
            <div style="color:#49bbff">空调已打开</div>
          </div>
          <div v-show="this.carcontrol.acStatus==2?true:false" class="controlCondition">
            <img :src="'./../../../../static/images/Lovecar/airenergyclose@2x.png'" alt="">
            <div style="color:#222">空调已关闭</div>
          </div>
          <!-- 远光灯开启展示 -->
          <div v-show="this.carcontrol.highlightStatus==1" class="controlLight">
            <img :src="'./../../../../static/images/Lovecar/light_nearopenon@2x.png'" alt="">
            <div  style="color:#49bbff">远光灯已打开</div>
          </div>
          <div v-show="this.carcontrol.lightnearcontrol==1" class="controlLight">
            <img :src="'./../../../../static/images/Lovecar/light_nearopenon@2x.png'" alt="">
            <div  style="color:#49bbff">近光灯已打开</div>
          </div>


          <!-- 探照灯 -->
          <img v-show="this.carcontrol.highlightStatus==1" style="display:block;position:absolute;z-index:-1;width:3.52rem;height:2.9rem;top:-1.1rem;left:2.03rem;" :src="'./../../../../static/images/Lovecar/lightforword@2x.png'" alt="">  
          <img v-show="this.carcontrol.lightnearcontrol==1" style="display:block;position:absolute;z-index:-1;width:2.98rem;height:1.70rem;top:0rem;left:2.25rem;" :src="'./../../../../static/images/Lovecar/lightnear@2x.png'" alt="">  

          <!-- 车门展示 -->
          <!-- <img v-show="activeshow==2&&this.carcontrol.doorStsFrontLeft" style="position:absolute;display:block;width:.53rem;height:.88rem;top:2.95rem;left:2.5rem" :src="'./../../../../static/images/Lovecar/leftdoorindex@2x.png'" alt="">
          <img v-show="activeshow==2&&this.carcontrol.doorStsRearLeft" style="position:absolute;display:block;width:.53rem;height:.88rem;top:4.15rem;left:2.5rem" :src="'./../../../../static/images/Lovecar/leftdoorindex@2x.png'" alt="">
          <img v-show="activeshow==2&&this.carcontrol.doorStsFrontRight" style="transform:rotateY(180deg);position:absolute;display:block;width:.53rem;height:.88rem;top:2.95rem;left:4.45rem" :src="'./../../../../static/images/Lovecar/leftdoorindex@2x.png'" alt="">
          <img v-show="activeshow==2&&this.carcontrol.doorStsRearRight" style="transform:rotateY(180deg);position:absolute;display:block;width:.53rem;height:.88rem;top:4.15rem;left:4.45rem" :src="'./../../../../static/images/Lovecar/leftdoorindex@2x.png'" alt=""> -->

          <!-- 轮胎温度start -->
          <!-- <span v-show="activeshow==1"  class='busl_r tiretemperature_left1'>11℃</span>
					<span v-show="activeshow==1"  class='busl_r tiretemperature_left2'>22℃</span>
          <span v-show="activeshow==1"  class='busl_r tiretemperature_right1'>11℃</span>
					<span v-show="activeshow==1"  class='busl_r tiretemperature_right2'>22℃</span> -->
          <!-- 轮胎温度en -->

					<!--胎压图片Start-->
					<img class="" v-show="activeshow==1" :src="'./static/images/Lovecar/taiya.png'" style="position:absolute;display:block;width:.36rem;height:.36rem;top: 2.6rem;right:2.3rem;" alt="">
					<img class="" v-show="activeshow==1" :src="'./static/images/Lovecar/taiya.png'" style="position:absolute;display:block;width:.36rem;height:.36rem;top: 2.6rem;left:2.3rem;" alt="">
					<img class="" v-show="activeshow==1" :src="'./static/images/Lovecar/taiya.png'" style="position:absolute;display:block;width:.36rem;height:.36rem;top: 4.25rem;left:2.3rem;" alt="">
					<img class="" v-show="activeshow==1" :src="'./static/images/Lovecar/taiya.png'" style="position:absolute;display:block;width:.36rem;height:.36rem;top: 4.25rem;right:2.3rem;" alt="">
					<!--胎压图片End-->

					<!-- 控制天窗的线Start 分为激活和未激活 -->
					<img class="" :src="'./static/images/Lovecar/rightshan.gif'"  v-show="activeshow=='3'&&this.carcontrol.topWindowOpen==1" style="position:absolute;display:block;width:1.8rem;top:3.1rem;right:2.1rem;"></img>
					<img class="" :src="'./static/images/Lovecar/blueright.png'"  v-show="activeshow=='3'&&this.carcontrol.topWindowOpen!=1" style="position:absolute;display:block;width:1.14rem;top:3.55rem;right:2.5rem;"></img>
					<!--天窗线End-->

					<!-- 尾门线Start 分为激活和未激活  -->
					<img class="" :src="'./static/images/Lovecar/rightshan.gif'"  v-show="activeshow=='2'&&this.carcontrol.trunkLockStatus!=1" style="position:absolute;display:block;width:1.8rem;top:5.05rem;right:2.1rem;"></img>
					<img class="" :src="'./static/images/Lovecar/blueright.png'"  v-show="activeshow=='2'&&this.carcontrol.trunkLockStatus==1" style="position:absolute;display:block;width:1.14rem;top:5.5rem;right:2.5rem;"></img>
					<!--尾门线End-->

					<!-- 控制右前车门线 -->
					<img class="" :src="'./static/images/Lovecar/rightshan.gif'" v-show="Condition.rfWindowOpen=='已打开'?true:false" style="position:absolute;display:block;width:1rem;right:1.9rem;top: 2.5rem;"></img>
					<!-- 控制右后车门线 -->
					<img class="" :src="'./static/images/Lovecar/rightshan.gif'" v-show="Condition.rrWindowOpen=='已打开'?true:false" style="position:absolute;display:block;width:1rem;right:1.9rem;top: 4.2rem;"></img>
					<!-- 控制左前车门线 -->
					<img class="" :src="'./static/images/Lovecar/leftshan.gif'" v-show="Condition.lfWindowOpen=='已打开'?true:false" style="position:absolute;display:block;width:1rem;left: 1.9rem;top: 2.5rem;"></img>
					<!-- 控制左后车门线 -->
					<img class="" :src="'./static/images/Lovecar/leftshan.gif'" v-show="Condition.lrWindowOpen=='已打开'?true:false" style="position:absolute;display:block;width:1rem;left: 1.9rem;top: 4.2rem;"></img>

					<!-- <span class='busl_r top_1'>{{this.engineHoodStsFront}}</span> -->
					<!--天窗And尾门状态Start-->
					<span v-show="activeshow=='2'?true:false" class='busl_r bottom_1 '>{{this.carcontrol.topWindowOpen?'已打开':'已关闭'}}</span>
					<span v-show="activeshow=='3'?true:false" class='busl_r middle_1 '>{{this.carcontrol.trunkLockStatus?'已打开':'已关闭'}}</span>
					<!--天窗And尾门状态End-->
					<img class="loadingcar "  src="../../../../static/images/Lovecar/loading@2x.png" alt="" @click="loading">
				</div>        
				<!--车况主体End-->
			</div>
			<!--功能轮播Start-->
			<mt-swipe  :auto="0" class="icon-container">
				<!--轮播第一页Start-->
				<mt-swipe-item>
					<div class="content">
						<div  class="content_1" @click="doors">
							<img v-if="this.doorcontrol" class="content_carDoor" :src="'./static/images/Lovecar/lockon.png'" alt="">
							<img v-else class="content_carDoor" :src="'./static/images/Lovecar/lockoff.png'" alt="">
							<span :class="this.doorcontrol?'act':'activess'">闭锁</span>
						</div>
						<div  class="content_1" @click="doorsoppen">
							<img v-if="!this.doorcontrol" class="content_carDoor" :src="'./static/images/Lovecar/nolockon.png'" alt="">
							<img v-else class="content_carDoor" :src="'./static/images/Lovecar/nolockoff.png'" alt="">
							<span :class="!this.doorcontrol?'act':'activess'">开锁</span>
						</div>
						<div  class="content_1" @click="backboxopen">
							<img v-if="!this.trunkcontrol" class="tailgate" :src="'./static/images/Lovecar/tailgate_open_blue@2x.png'" alt="">
							<img v-else class="tailgate" :src="'./static/images/Lovecar/tailgate_open@2x.png'" alt="">
							<span :class="!this.trunkcontrol?'act':'activess'">尾门开</span>
						</div>
						<div  class="content_1" @click="backboxclose">
							<img v-if="this.trunkcontrol" class="tailgate" :src="'./static/images/Lovecar/tailgate_close_blue@2x.png'" alt="">
							<img v-else class="tailgate" :src="'./static/images/Lovecar/tailgate_close@2x.png'" alt="">
							<span :class="this.trunkcontrol?'act':'activess'">尾门关</span>
						</div>
						<div class="content_1" @click="enter()">
							<img v-if="!this.findcarcontrol" class="content_pic" :src="'./static/images/Wit/button7@3x_2.png'" alt="">
							<img v-else class="content_pic" :src="'./static/images/Wit/button7@3x.png'" alt="">
							<span :class="!this.findcarcontrol?'act':'activess'">寻车</span>
						</div>
					</div>
				</mt-swipe-item>
				<!--轮播第一页end-->
				<!--轮播第二页Start-->
				<mt-swipe-item>
					<div class="content">
						<div  class="content_1" @click="openNearLight">
							<img v-if="!this.lightnearcontrol" class="content_carDoor" :src="'./static/images/Lovecar/light_nearopenon@2x.png'" alt="">
							<img v-else class="content_carDoor" :src="'./static/images/Lovecar/light_nearopenoff.png'" alt="">
							<span :class="!this.lightnearcontrol?'act':'activess'">打开近光</span>
						</div>
						<div  class="content_1" @click="closeNearLight">
							<img v-if="this.lightnearcontrol" class="content_carDoor" :src="'./static/images/Lovecar/light_nearcloseon@2x.png'" alt="">
							<img v-else class="content_carDoor" :src="'./static/images/Lovecar/light_nearcloseoff@2x.png'" alt="">
							<span :class="this.lightnearcontrol?'act':'activess'">关闭近光</span>
						</div>
						<div  class="content_1" @click="openFarLight">
							<img v-if="!this.lightfarcontrol" class="tailgate" :src="'./static/images/Lovecar/light_faropenon@2x.png'" alt="">
							<img v-else class="tailgate" :src="'./static/images/Lovecar/light_faropenoff@2x.png'" alt="">
							<span :class="!this.lightfarcontrol?'act':'activess'">打开远光</span>
						</div>
						<div  class="content_1" @click="closeFarLight">
							<img v-if="this.lightfarcontrol" class="Flameout" :src="'./static/images/Lovecar/light_farcloseon@2x.png'" alt="">
							<img v-else class="Flameout" :src="'./static/images/Lovecar/light_farcloseoff@2x.png'" alt="">
							<span :class="this.lightfarcontrol?'act':'activess'">关闭远光</span>
						</div>
					</div>
				</mt-swipe-item>
				<!--轮播第二页End-->
				<!--轮播第三页Start-->
				<mt-swipe-item>
					<div class="action-content">
						<router-link  to="/newenergy/newaircondition" tag="div" class="navs air">
							<div class="navs">
								<img class="picc" src="../../../../static/images/Wit/ari.png" alt="">
								<span class="pic_txt">空调</span>
							</div>
						</router-link>
						<router-link  :to="{path:'/newenergy/newcarwindow',query:{carcontrol:this.carcontrol}}" tag="div" class="navs air">
							<div class="navs">
								<img class="picc" src="../../../../static/images/Wit/chechuang.png" alt="">
								<span class="pic_txt">车窗</span>
							</div>
						</router-link>
						<router-link  :to="{path:'/newenergy/airwindow',query:{carcontrol:this.carcontrol}}" tag="div" class="navs air">
							<div class="navs">
								<img class="picc skylight" src="../../../../static/images/Wit/tianchuang.png" alt="">
								<span class="pic_txt">天窗</span>
							</div>
						</router-link>
						<router-link  :to="{path:'/newenergy/preheat',query:{carcontrol:this.carcontrol}}" tag="div" class="navs air">
							<div class="navs">
								<img class="picc skylight" src="../../../../static/images/Lovecar/hotindex@2x.png" alt="">
								<span class="pic_txt">预热</span>
							</div>
						</router-link>
						<router-link  :to="{path:'/newenergy/remotecharging',query:{carcontrol:this.carcontrol}}" tag="div" class="navs air">
							<div class="navs">
								<img class="picc skylight" src="../../../../static/images/Lovecar/powerindex@2x.png" alt="">
								<span class="pic_txt">充电</span>
							</div>
						</router-link>
					</div>
				</mt-swipe-item>
				<!--轮播第三页End-->

			</mt-swipe>
		</div>
			<!--功能轮播End-->
		<!--爱车End-->
		<div class="bgMask" v-show="this.popupbg" @click="mainbgmask"></div>
		<!-- 输入框 -->
		<mt-popup v-model="popupVisible" position="middle" :modal="false">
			<div class="con" style="position:relative;">
				<div class="del">
					<img @click="cancel" src="../../../../static/images/Wit/delete@3x.png" alt="" style="width:.28rem">
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
		<img class="cancel" v-if="MaskIsshow" @click="delde" src="../../../../static/images/Lovecar/button9@2x.png" alt="" style="width:.28rem">
		<div v-if="MaskIsshow" class="mask_content">
			<ul class="tipcontent">
				<li  @click="turnDing">
					<img src="../../../../static/images/Lovecar/ding.png" alt="">
					<span>途记宝</span>
				</li>
				<router-link  tag='li' to="/lovecar/revisePinCode">
					<img src="../../../../static/images/Lovecar/xiupin.png" alt="">
					<span>修改PIN</span>
				</router-link>
				<li  @click="turnPosition">
					<img src="../../../../static/images/Lovecar/dingwei.png" alt="">
					<span>定位</span>
				</li>
				<router-link  tag='li' to="/lovecar/flowQuery">
					<img src="../../../../static/images/Lovecar/liuliang.png" alt="">
					<span>流量查询</span>
				</router-link>
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
      carcontrol: {
        // acStatus: 1,
        // doorStsTrunk: 0,
        // soc: 10
      }, //车控返回的东西
      beforetype: "",
      activeshow: 4, //默认第一个高亮
      tspid: "",
      popupbg: false,
      allwords: [], //贮存所有的提示语
      popupVisible: false,
      MaskIsshow: false, //黑色遮罩层
      Rajtigo: false, //被授权状态
      num: 3,
      IsShow: false,
      keyNums: [],
      firstEnter: false, //第一次调用车况
      vehicleState: "", //被授权车辆的vin
      doorcontrol: true, //控制车门锁状态
      trunkcontrol: true, //控制尾门状态  所有车控的true 都是关闭的状态
      findcarcontrol: true, //控制寻车状态
      lightfarcontrol: true, //远光灯状态
      lightnearcontrol: true, //近光灯状态
      pinNumber: "",
      type: "", //判断点击事件
      typebefore: "",
      Condition: {
        // lfWindowOpen: "已打开", //左前窗
        // lrWindowOpen: "已打开", //左后窗
        // rfWindowOpen: "已打开", //右前窗
        // rrWindowOpen: "已打开" //右后窗
      },
      time: "",
      sjc: "",
      vinn: "",
      open_lock: [], //开锁的所有提示语
      close_lock: [], //闭锁的所有提示语
      open_trunk: [], //后备箱的所有提示语
      vehicle_launch: [], //车辆启动的所有提示语
      vehicle_flameout: [], //车辆熄火的所有提示语
      find_vehicle: [], //寻车的所有提示语
      vehicle_condition: [], //车况的所有提示语
      distance_light:[],//远近光灯提示语
      allFunction: [], //存储所有的车控功能
      chgStatus: "", //当前充电状态
      chgPlugStatus: "", //充电状态
      tai: {
        // lfWindowOpen: "左前kpa", //左前窗
        // lrWindowOpen: "左后kpa", //左后窗
        // rfWindowOpen: "右前kpa", //右前窗
        // rrWindowOpen: "右后kpa" //右后窗
      }, //胎压赋值
      door: {
        // lfWindowOpen: "已打开", //左前窗
        // lrWindowOpen: "已打开", //左后窗
        // rfWindowOpen: "已打开", //右前窗
        // rrWindowOpen: "已打开" //右后窗
      }, //车门赋值
      window: {
        // lfWindowOpen: "已打开", //左前窗
        // lrWindowOpen: "已打开", //左后窗
        // rfWindowOpen: "已打开", //右前窗
        // rrWindowOpen: "已打开" //右后窗
      } //车窗赋值
    };
  },
  methods: {
    mainbgmask() {
      this.popupbg = false;
      this.popupVisible = false;
      this.IsShow = false;
    },
    //点击高亮
    fn(type) {
      this.activeshow = type;
      if (this.activeshow == 1) {
        this.Condition = this.tai;
      } else if (this.activeshow == 2) {
        this.Condition = this.door;
      } else if (this.activeshow == 3) {
        this.Condition = this.window;
      } else if (this.activeshow == 4) {
      }
    },
    moved() {
      this.MaskIsshow = false;
      this.IsShow = false;
      this.popupVisible = false;
    },
    //锁的弹出框
    doors() {
      this.beforetype = 1;
      this.popupVisible = true;
      this.popupbg = true;
    },
    doorsoppen() {
      this.beforetype = 2;
      this.popupVisible = true;
      this.popupbg = true;
    },
    //尾门开
    backboxopen() {
      this.beforetype = 3;
      this.popupVisible = true;
      this.popupbg = true;
    },
    //尾门关
    backboxclose() {
      this.beforetype = 4;
      this.popupVisible = true;
      this.popupbg = true;
    },
    // 寻车 事件
    enter() {
      this.beforetype = 5;
      this.popupVisible = true;
      this.popupbg = true;
    },
    //打开近光灯
    openNearLight() {
      this.beforetype = 6;
      this.popupVisible = true;
      this.popupbg = true;
    },
    //关闭近光灯
    closeNearLight() {
      this.beforetype = 7;
      this.popupVisible = true;
      this.popupbg = true;
    },
    //打开远光灯
    openFarLight() {
      this.beforetype = 8;
      this.popupVisible = true;
      this.popupbg = true;
    },
    //关闭远光灯
    closeFarLight() {
      this.beforetype = 9;
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
      if (this.beforetype == 1) {
        MessageBox("提示", this.open_lock[3].dictValue);
      }
      if (this.beforetype == 5) {
        MessageBox("提示", this.find_vehicle[3].dictValue);
      }
      if (this.beforetype == 2) {
        MessageBox("提示", this.close_lock[3].dictValue);
      }
      if (this.beforetype == 3) {
        MessageBox("提示", this.open_trunk[3].dictValue);
      }
      if (this.beforetype == 4) {
        MessageBox("提示", this.open_trunk[3].dictValue);
      }
    },
    //调用车况接口
    Carquerry() {
      this.$http
        .post(
          Newenergy.energyqueryvehiclecondition,
          {
            vins: [this.vinn]
          },
          this.$store.state.tsppin
        )
        .then(res => {
          if (res.data.returnSuccess) {
            this.getAsyReturn(res.data.operationId);
          } else {
            localhide()
            Toast({
              message: this.vehicle_condition[2].dictValue,
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
          Newenergy.energyvehicleasyncresults,
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
                //超时提示
                if (this.type == 1) {
                              // this.doorcontrol = true;
                  Toast({
                    message: this.close_lock[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 2) {
                  // this.doorcontrol = false;
                  Toast({
                    message: this.open_lock[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 3) {
                  // this.trunkcontrol = false;
                  Toast({
                    message: this.open_trunk[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 4) {
                  // this.trunkcontrol = true;
                  Toast({
                    message: this.open_trunk[3].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 5) {
                  Toast({
                    message: this.find_vehicle[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                  // this.findcarcontrol = false;
                  setTimeout(() => {
                    this.findcarcontrol = true;
                  }, 4000);
                } else if (this.type == 6) {
                  Toast({
                    message: this.distance_light[6].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                  // this.lightnearcontrol = false;
                  // this.lightfarcontrol = true;
                } else if (this.type == 7) {
                  Toast({
                    message: this.distance_light[8].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                  // this.lightnearcontrol = true;
                } else if (this.type == 8) {
                  Toast({
                    message: this.distance_light[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                  // this.lightfarcontrol = false;
                  // this.lightnearcontrol = true;
                } else if (this.type == 9) {
                  Toast({
                    message: this.distance_light[4].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                  // this.lightfarcontrol = true;
                }else {
                  Toast({
                    message: this.vehicle_condition[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                }
                clearInterval(this.time);
                localhide();

              } else {
                this.time = setInterval(() => {
                  this.$http
                    .post(
                      Newenergy.energyvehicleasyncresults,
                      {
                        operationId: operationId
                      },
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      var tS = new Date().getTime() - this.sjc; //时间戳 差
                      var tSS = parseInt((tS / 1000) % 60); // 时间差
                      if (res.data.returnSuccess == true) {
                         console.log(tSS)
                        if (res.data.status == "IN_PROGRESS") {
                          //60s  后 清除定时器，不在发请求
                          if (tSS >= 56) {
                            if (this.type == 1) {
                              // this.doorcontrol = true;
                              Toast({
                                message: this.close_lock[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 2) {
                              // this.doorcontrol = false;
                              Toast({
                                message: this.open_lock[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 3) {
                              // this.trunkcontrol = false;
                              Toast({
                                message: this.open_trunk[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 4) {
                              // this.trunkcontrol = true;
                              Toast({
                                message: this.open_trunk[3].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 5) {
                              Toast({
                                message: this.find_vehicle[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.findcarcontrol = false;
                              setTimeout(() => {
                                this.findcarcontrol = true;
                              }, 4000);
                            } else if (this.type == 6) {
                              Toast({
                                message: this.distance_light[6].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightnearcontrol = false;
                              // this.lightfarcontrol = true;
                            } else if (this.type == 7) {
                              Toast({
                                message: this.distance_light[8].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightnearcontrol = true;
                            } else if (this.type == 8) {
                              Toast({
                                message: this.distance_light[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightfarcontrol = false;
                              // this.lightnearcontrol = true;
                            } else if (this.type == 9) {
                              Toast({
                                message: this.distance_light[4].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightfarcontrol = true;
                            }else {
                              Toast({
                                message: this.vehicle_condition[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            }
                            clearInterval(this.time);
                            localhide();
                          }
                        } else if (res.data.status == "SUCCEED") {
                          // if (res.data.data) {
                          this.carcontrol = res.data.data;
                          this.batteryStatis();
                          if (this.carcontrol.chgPlugStatus == 1) {
                            this.chgPlugStatus = "未插入";
                          } else if (this.carcontrol.chgPlugStatus == 2) {
                            this.chgPlugStatus = "插入未充电";
                          } else if (this.carcontrol.chgPlugStatus == 3) {
                            this.chgPlugStatus = "插入充电";
                          }

                          if (this.carcontrol.chgStatus == 1) {
                            this.chgStatus = "慢充充电开始";
                          } else if (this.carcontrol.chgStatus == 2) {
                            this.chgStatus = "慢充充电结束";
                          } else if (this.carcontrol.chgStatus == 3) {
                            this.chgStatus = "快充充电开始";
                          } else if (this.carcontrol.chgStatus == 4) {
                            this.chgStatus = "快充充电结束";
                          }
                          this.window = {
                            lfWindowOpen: this.carcontrol.lfWindowOpen
                              ? "已打开"
                              : "已关闭", //左前窗
                            lrWindowOpen: this.carcontrol.lrWindowOpen
                              ? "已打开"
                              : "已关闭", //左后窗
                            rfWindowOpen: this.carcontrol.rfWindowOpen
                              ? "已打开"
                              : "已关闭", //右前窗
                            rrWindowOpen: this.carcontrol.rrWindowOpen
                              ? "已打开"
                              : "已关闭" //右后窗
                          };

                          this.tai = {
                            lfWindowOpen: this.carcontrol.lfTirePresure + "kpa", //左前 胎压
                            lrWindowOpen: this.carcontrol.lrTirePresure + "kpa", //左后 胎压
                            rfWindowOpen: this.carcontrol.rfTirePresure + "kpa", //右前 胎压
                            rrWindowOpen: this.carcontrol.rrTirePresure + "kpa" //右后 胎压
                          };
                          this.door = {
                            lfWindowOpen: this.carcontrol.doorStsFrontLeft
                              ? "已打开"
                              : "已关闭", //左前 门
                            lrWindowOpen: this.carcontrol.doorStsRearLeft
                              ? "已打开"
                              : "已关闭", //左后 门
                            rfWindowOpen: this.carcontrol.doorStsFrontRight
                              ? "已打开"
                              : "已关闭", //右前 门
                            rrWindowOpen: this.carcontrol.doorStsRearRight
                              ? "已打开"
                              : "已关闭" //右后 门
                          };
                          this.doorcontrol=this.carcontrol.mainLockStatus==1?false:true
                          // } else {

                          if (this.type == 1) {
                            this.doorcontrol = true;
                            Toast({
                              message: this.close_lock[1].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 2) {
                            this.doorcontrol = false;
                            Toast({
                              message: this.open_lock[1].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 3) {
                            this.trunkcontrol = false;
                            Toast({
                              message: this.open_trunk[1].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 4) {
                            this.trunkcontrol = true;
                            Toast({
                              message: this.open_trunk[3].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 5) {
                            Toast({
                              message: this.find_vehicle[1].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            this.findcarcontrol = false;
                            setTimeout(() => {
                              this.findcarcontrol = true;
                            }, 4000);
                          } else if (this.type == 6) {
                            Toast({
                                message: this.distance_light[5].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            this.lightnearcontrol = false;
                            this.lightfarcontrol = true;
                          } else if (this.type == 7) {
                            Toast({
                              message: this.distance_light[7].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            this.lightnearcontrol = true;
                          } else if (this.type == 8) {
                            Toast({
                              message: this.distance_light[1].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            this.lightfarcontrol = false;
                            this.lightnearcontrol = true;
                          } else if (this.type == 9) {
                            Toast({
                              message: this.distance_light[3].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            this.lightfarcontrol = true;
                          }
                          // }
                          clearInterval(this.time);
                          localhide();
                        } else if (res.data.status == "FAILED") {
                          if (this.type == 1) {
                              // this.doorcontrol = true;
                            Toast({
                              message: this.close_lock[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 2) {
                            // this.doorcontrol = false;
                            Toast({
                              message: this.open_lock[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 3) {
                            // this.trunkcontrol = false;
                            Toast({
                              message: this.open_trunk[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 4) {
                            // this.trunkcontrol = true;
                            Toast({
                              message: this.open_trunk[3].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          } else if (this.type == 5) {
                            Toast({
                              message: this.find_vehicle[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            // this.findcarcontrol = false;
                            setTimeout(() => {
                              this.findcarcontrol = true;
                            }, 4000);
                          } else if (this.type == 6) {
                            Toast({
                              message: this.distance_light[6].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            // this.lightnearcontrol = false;
                            // this.lightfarcontrol = true;
                          } else if (this.type == 7) {
                            Toast({
                              message: this.distance_light[8].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            // this.lightnearcontrol = true;
                          } else if (this.type == 8) {
                            Toast({
                              message: this.distance_light[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            // this.lightfarcontrol = false;
                            // this.lightnearcontrol = true;
                          } else if (this.type == 9) {
                            Toast({
                              message: this.distance_light[4].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            // this.lightfarcontrol = true;
                          }else {
                            Toast({
                              message: this.vehicle_condition[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          }
                          clearInterval(this.time);
                          localhide();
                        }
                          } else {
                           if (this.type == 1) {
                              // this.doorcontrol = true;
                              Toast({
                                message: this.close_lock[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 2) {
                              // this.doorcontrol = false;
                              Toast({
                                message: this.open_lock[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 3) {
                              // this.trunkcontrol = false;
                              Toast({
                                message: this.open_trunk[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 4) {
                              // this.trunkcontrol = true;
                              Toast({
                                message: this.open_trunk[3].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 5) {
                              Toast({
                                message: this.find_vehicle[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.findcarcontrol = false;
                              setTimeout(() => {
                                this.findcarcontrol = true;
                              }, 4000);
                            } else if (this.type == 6) {
                              Toast({
                                message: this.distance_light[6].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightnearcontrol = false;
                              // this.lightfarcontrol = true;
                            } else if (this.type == 7) {
                              Toast({
                                message: this.distance_light[8].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightnearcontrol = true;
                            } else if (this.type == 8) {
                              Toast({
                                message: this.distance_light[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightfarcontrol = false;
                              // this.lightnearcontrol = true;
                            } else if (this.type == 9) {
                              Toast({
                                message: this.distance_light[4].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightfarcontrol = true;
                            }else {
                              Toast({
                                message: this.distance_light[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            }
                            clearInterval(this.time);
                            localhide();
                          }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              // if (res.data.data) {
              this.carcontrol = res.data.data;
              this.batteryStatis();
              if (this.carcontrol.chgPlugStatus == 1) {
                this.chgPlugStatus = "未插入";
              } else if (this.carcontrol.chgPlugStatus == 2) {
                this.chgPlugStatus = "插入未充电";
              } else if (this.carcontrol.chgPlugStatus == 3) {
                this.chgPlugStatus = "插入充电";
              }

              if (this.carcontrol.chgStatus == 1) {
                this.chgStatus = "慢充充电开始";
              } else if (this.carcontrol.chgStatus == 2) {
                this.chgStatus = "慢充充电结束";
              } else if (this.carcontrol.chgStatus == 3) {
                this.chgStatus = "快充充电开始";
              } else if (this.carcontrol.chgStatus == 4) {
                this.chgStatus = "快充充电结束";
              }
              this.window = {
                lfWindowOpen: this.carcontrol.lfWindowOpen
                  ? "已打开"
                  : "已关闭", //左前窗
                lrWindowOpen: this.carcontrol.lrWindowOpen
                  ? "已打开"
                  : "已关闭", //左后窗
                rfWindowOpen: this.carcontrol.rfWindowOpen
                  ? "已打开"
                  : "已关闭", //右前窗
                rrWindowOpen: this.carcontrol.rrWindowOpen ? "已打开" : "已关闭" //右后窗
              };
              this.tai = {
                lfWindowOpen: this.carcontrol.lfTirePresure + "kpa", //左前 胎压
                lrWindowOpen: this.carcontrol.lrTirePresure + "kpa", //左后 胎压
                rfWindowOpen: this.carcontrol.rfTirePresure + "kpa", //右前 胎压
                rrWindowOpen: this.carcontrol.rrTirePresure + "kpa" //右前 胎压
              };
              this.door = {
                lfWindowOpen: this.carcontrol.doorStsFrontLeft
                  ? "已打开"
                  : "已关闭", //左前 门
                lrWindowOpen: this.carcontrol.doorStsRearLeft
                  ? "已打开"
                  : "已关闭", //左后 门
                rfWindowOpen: this.carcontrol.doorStsFrontRight
                  ? "已打开"
                  : "已关闭", //右前 门
                rrWindowOpen: this.carcontrol.doorStsRearRight
                  ? "已打开"
                  : "已关闭" //右后 门
              };
              // } else {
                this.doorcontrol=this.carcontrol.mainLockStatus==1?false:true
              if (this.type == 1) {
                this.doorcontrol = true;
                Toast({
                  message: this.close_lock[1].dictValue,
                  position: "middle",
                  duration: 2000
                });
              } else if (this.type == 2) {
                this.doorcontrol = false;
                Toast({
                  message: this.open_lock[1].dictValue,
                  position: "middle",
                  duration: 2000
                });
              } else if (this.type == 3) {
                this.trunkcontrol = false;
                Toast({
                  message: this.open_trunk[1].dictValue,
                  position: "middle",
                  duration: 2000
                });
              } else if (this.type == 4) {
                this.trunkcontrol = true;
                Toast({
                  message: this.open_trunk[3].dictValue,
                  position: "middle",
                  duration: 2000
                });
              } else if (this.type == 5) {
                Toast({
                  message: this.find_vehicle[1].dictValue,
                  position: "middle",
                  duration: 2000
                });
                this.findcarcontrol = false;
                setTimeout(() => {
                  this.findcarcontrol = true;
                }, 4000);
              } else if (this.type == 6) {
                Toast({
                  message: this.distance_light[5].dictValue,
                  position: "middle",
                  duration: 2000
                });
                this.lightnearcontrol = false;
                this.lightfarcontrol = true;
              } else if (this.type == 7) {
                Toast({
                  message: this.distance_light[7].dictValue,
                  position: "middle",
                  duration: 2000
                });
                this.lightnearcontrol = true;
              } else if (this.type == 8) {
                Toast({
                  message: this.distance_light[1].dictValue,
                  position: "middle",
                  duration: 2000
                });
                this.lightfarcontrol = false;
                this.lightnearcontrol = true;
              } else if (this.type == 9) {
                Toast({
                  message: this.distance_light[3].dictValue,
                  position: "middle",
                  duration: 2000
                });
                this.lightfarcontrol = true;
              }
              // }
              clearInterval(this.time);
              localhide();
            } else if (res.data.status == "FAILED") {

                if (this.type == 1) {
                  // this.doorcontrol = true;
                  Toast({
                    message: this.close_lock[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 2) {
                  // this.doorcontrol = false;
                  Toast({
                    message: this.open_lock[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 3) {
                  // this.trunkcontrol = false;
                  Toast({
                    message: this.open_trunk[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 4) {
                  // this.trunkcontrol = true;
                  Toast({
                    message: this.open_trunk[3].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                } else if (this.type == 5) {
                  Toast({
                    message: this.find_vehicle[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                  // this.findcarcontrol = false;
                  setTimeout(() => {
                    this.findcarcontrol = true;
                  }, 4000);
                } else if (this.type == 6) {
                  Toast({
                    message: this.distance_light[6].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                  // this.lightnearcontrol = false;
                  // this.lightfarcontrol = true;
                } else if (this.type == 7) {
                  Toast({
                    message: this.distance_light[8].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                  // this.lightnearcontrol = true;
                } else if (this.type == 8) {
                  Toast({
                    message: this.distance_light[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                  // this.lightfarcontrol = false;
                  // this.lightnearcontrol = true;
                } else if (this.type == 9) {
                  Toast({
                    message: this.distance_light[4].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                  // this.lightfarcontrol = true;
                }else {
                  Toast({
                    message: this.vehicle_condition[2].dictValue,
                    position: "middle",
                    duration: 2000
                  });
                }
                clearInterval(this.time);
                localhide();
              }
            
          } else {
             if (tSS >= 6) {
                            if (this.type == 1) {
                              // this.doorcontrol = true;
                              Toast({
                                message: this.close_lock[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 2) {
                              // this.doorcontrol = false;
                              Toast({
                                message: this.open_lock[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 3) {
                              // this.trunkcontrol = false;
                              Toast({
                                message: this.open_trunk[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 4) {
                              // this.trunkcontrol = true;
                              Toast({
                                message: this.open_trunk[3].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            } else if (this.type == 5) {
                              Toast({
                                message: this.find_vehicle[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.findcarcontrol = false;
                              setTimeout(() => {
                                this.findcarcontrol = true;
                              }, 4000);
                            } else if (this.type == 6) {
                              Toast({
                                message: this.distance_light[6].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightnearcontrol = false;
                              // this.lightfarcontrol = true;
                            } else if (this.type == 7) {
                              Toast({
                                message: this.distance_light[8].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightnearcontrol = true;
                            } else if (this.type == 8) {
                              Toast({
                                message: this.distance_light[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightfarcontrol = false;
                              // this.lightnearcontrol = true;
                            } else if (this.type == 9) {
                              Toast({
                                message: this.distance_light[4].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                              // this.lightfarcontrol = true;
                            }else {
                              Toast({
                                message: this.vehicle_condition[2].dictValue,
                                position: "middle",
                                duration: 2000
                              });
                            }
                            clearInterval(this.time);
                            localhide();
                          }
          }
        });
    },
    //同步车况不用拿operationId
    getcarvalue() {
      let params = {
        vins: [this.vinn]
      };
     
      this.$http
        .post(
          Newenergy.energyqueryvehiclenewcondition,
          params,
          this.$store.state.tsppin
        )
        .then(res => {
          if (res.data.returnSuccess) {
            this.carcontrol = res.data.data;
            this.doorcontrol= this.carcontrol.mainLockStatus==1?false:true
            //控制尾门的状态
            this.trunkcontrol = this.carcontrol.trunkLockStatus ? false : true;
            //控制远光灯的状态
            this.batteryStatis();
            if (this.carcontrol.chgPlugStatus == 1) {
              this.chgPlugStatus = "未插入";
            } else if (this.carcontrol.chgPlugStatus == 2) {
              this.chgPlugStatus = "插入未充电";
            } else if (this.carcontrol.chgPlugStatus == 3) {
              this.chgPlugStatus = "插入充电";
            }

            if (this.carcontrol.chgStatus == 1) {
              this.chgStatus = "慢充充电开始";
            } else if (this.carcontrol.chgStatus == 2) {
              this.chgStatus = "慢充充电结束";
            } else if (this.carcontrol.chgStatus == 3) {
              this.chgStatus = "快充充电开始";
            } else if (this.carcontrol.chgStatus == 4) {
              this.chgStatus = "快充充电结束";
            }
            this.window = {
              lfWindowOpen: this.carcontrol.lfWindowOpen ? "已打开" : "已关闭", //左前窗
              lrWindowOpen: this.carcontrol.lrWindowOpen ? "已打开" : "已关闭", //左后窗
              rfWindowOpen: this.carcontrol.rfWindowOpen ? "已打开" : "已关闭", //右前窗
              rrWindowOpen: this.carcontrol.rrWindowOpen ? "已打开" : "已关闭" //右后窗
            };

            this.tai = {
              lfWindowOpen: this.carcontrol.lfTirePresure + "kpa", //左前 胎压
              lrWindowOpen: this.carcontrol.lrTirePresure + "kpa", //左后 胎压
              rfWindowOpen: this.carcontrol.rfTirePresure + "kpa", //右前 胎压
              rrWindowOpen: this.carcontrol.rrTirePresure + "kpa" //右后 胎压
            };
            this.door = {
              lfWindowOpen: this.carcontrol.doorStsFrontLeft
                ? "已打开"
                : "已关闭", //左前 门
              lrWindowOpen: this.carcontrol.doorStsRearLeft
                ? "已打开"
                : "已关闭", //左后 门
              rfWindowOpen: this.carcontrol.doorStsFrontRight
                ? "已打开"
                : "已关闭", //右前 门
              rrWindowOpen: this.carcontrol.doorStsRearRight
                ? "已打开"
                : "已关闭" //右后 门
            };
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
            if (value.dictType == "distance_light") {
              this.distance_light = value.sysDictDataVOs;
            }
          }
          console.log(this.distance_light)
        }
      });
    },
    //手动刷新
    loading() {
      this.type = 10;
      this.Carquerry();
      this.activeshow = this.activeshow;
    },
    //获取电池状态
    batteryStatis() {
      this.carcontrol.soc =
        this.carcontrol.soc >= 100 ? 100 : this.carcontrol.soc;
        this.carcontrol.soc<0?0:this.carcontrol.soc
      let top = 1.9 * (100 - this.carcontrol.soc) / 100 + "rem";
      $(".bus_l_bettery_left").css("top", top);
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
      return JSON.parse(this.$store.state.energypin.headers.identityParam)
        .userId;
    }
  },
  //检测输入框
  watch: {
    pinNumber(newVal, oldVal) {
      if (this.pinNumber.length == 6) {
        switch (this.beforetype) {
          case 1:
            this.type = 1;
            break;
          case 2:
            this.type = 2;
            break;
          case 3:
            this.type = 3;
            break;
          case 4:
            this.type = 4;
            break;
          case 5:
            this.type = 5;
            break;
          case 6:
            this.type = 6;
            break;
          case 7:
            this.type = 7;
            break;
          case 8:
            this.type = 8;
            break;
          case 9:
            this.type = 9;
            break;
          default:
            this.type = 10;
        }
        var PIN = this.pinNumber;
        this.popupVisible = !this.popupVisible;
        this.popupbg = false;
        (this.IsShow = false), (this.pinNumber = "");
        this.$http
          .post(
            Newenergy.energyvehiclePINvalidation,
            {
              pin: PIN
            },
            this.$store.state.tsppin
          )
          .then(res => {
            if (res.data) {
              if (res.data.returnSuccess) {
                if (this.type == 1) {
                  var params = {
                    vin: this.vinn,
                    operationType: "LOCK",
                    operation: 1 //操作项关闭
                  };
                  this.$http
                    .post(
                      Newenergy.energyremotevehiclecontrol,
                      params,
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      if (res.data.returnSuccess) {
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        localhide();
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    });
                } else if (this.type == 2) {
                  var params = {
                    vin: this.vinn,
                    operationType: "LOCK",
                    operation: 2 //操作项 开启
                  };
                  this.$http
                    .post(
                      Newenergy.energyremotevehiclecontrol,
                      params,
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      if (res.data.returnSuccess) {
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        localhide();
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    });
                } else if (this.type == 3) {
                  var param = {
                    vin: this.vinn,
                    operationType: "TRUNK",
                    operation: 2
                  };
                  this.$http
                    .post(
                      Newenergy.energyremotevehiclecontrol,
                      param,
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      if (res.data.returnSuccess) {
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        localhide();
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    });
                } else if (this.type == 4) {
                  var param = {
                    vin: this.vinn,
                    operationType: "TRUNK",
                    operation: 1
                  };
                  this.$http
                    .post(
                      Newenergy.energyremotevehiclecontrol,
                      param,
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      if (res.data.returnSuccess) {
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        localhide();
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    });
                } else if (this.type == 5) {
                  var param = {
                    vin: this.vinn,
                    operationType: "FIND_VEHICLE",
                    operation: "1"
                  };
                  this.$http
                    .post(
                      Newenergy.energyremotevehiclecontrol,
                      param,
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      if (res.data.returnSuccess) {
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        localhide()                
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    });
                } else if (this.type == 6) {
                  var param = {
                    vin: this.vinn,
                    operationType: "DIPPED_HEADLIGHT",
                    operation: "2"
                  };
                  this.$http
                    .post(
                      Newenergy.energyremotevehiclecontrol,
                      param,
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      if (res.data.returnSuccess) {
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        localhide();
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    });
                } else if (this.type == 7) {
                  var param = {
                    vin:this.vinn,
                    operationType: "DIPPED_HEADLIGHT",
                    operation: "1"
                  };
                  this.$http
                    .post(
                      Newenergy.energyremotevehiclecontrol,
                      param,
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      if (res.data.returnSuccess) {
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        localhide();
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    });
                } else if (this.type == 8) {
                  var param = {
                    vin: this.vinn,
                    operationType: "HIGH_BEAM",
                    operation: "2"
                  };
                  this.$http
                    .post(
                      Newenergy.energyremotevehiclecontrol,
                      param,
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      if (res.data.returnSuccess) {
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        localhide();
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    });
                } else if (this.type == 9) {
                  var param = {
                    vin: this.vinn,
                    operationType: "HIGH_BEAM",
                    operation: "1"
                  };
                  this.$http
                    .post(
                      Newenergy.energyremotevehiclecontrol,
                      param,
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      if (res.data.returnSuccess) {
                        setTimeout(() => {
                          this.getAsyReturn(res.data.operationId);
                        }, 2000);
                      } else {
                        localhide();
                        Toast({
                          message: res.data.returnErrMsg,
                          position: "middle",
                          duration: 2000
                        });
                      }
                    });
                }
              }else{
                localhide();
                Toast({
                          message: 'PIN码验证失败',
                          position: "middle",
                          duration: 2000
                        });          
              }
            }
          });
      }
    }
  },
  beforeCreate() {
    clearInterval(this.time);
  },
  mounted() {
    $(".MobileHeight").css({
      marginTop: this.$store.state.mobileStatusBar
    });
    this.vinn = this.$store.state.defaultInformation.vin;
    // this.vinn = 'LJ1EEASPXJ5000403';
    this.Getmarkedwords();
    new Promise(()=>{
      this.getcarvalue();
    })
    
    // this.Carquerry();
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
  background: url(../../../../static/images/Lovecar/border@2x.png) no-repeat
    center;
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
.bus_l .bus_l_bettery {
  position: relative;
  width: 1.6rem;
  left: 1.2rem;
  top: 0.71rem;
  height: 3.5rem;
}
.betteryStatus {
  width: 100%;
  height: 2.4rem;
  position: relative;
}
.betteryStatus > li {
  width: 100%;
  height: 1.2rem;
  display: flex;
  align-items: center;
}
.betteryStatus > li > div {
  width: 2.2rem;
  margin: 0 0 0 0.7rem;
  font-family: "PingFang-SC-Medium";
}
.betteryStatus > li > div div {
  font-size: 0.24rem;
  color: #222;
  padding: 0.15rem;
}
.betteryStatus > li > div span {
  font-size: 0.28rem;
  color: #49bbff;
  padding: 0.15rem;
}
.bus_l .bus_l_bettery .bus_l_bettery_left {
  width: 1.4rem;
  height: 1.9rem;
  position: absolute;
  background: linear-gradient(
    135deg,
    rgba(74, 255, 245, 1),
    rgba(73, 187, 255, 1)
  );
  z-index: 2;
  text-align: center;
  border-radius: 0.06rem;
  font-size: 0.36rem;
  color: #49bbff;
}
.bus_l .bus_l_bettery .bus_l_bettery_right {
  position: absolute;
  left: 2.6rem;
}
.bus_l .bus_l_bettery .bus_l_bettery_right > div {
  width: 2rem;
  height: 1.2rem;
}
.bus_l .bus_l_bettery .bus_l_bettery_right div {
  font-size: 0.22rem;
}
.bus_l .bus_l_bettery .bus_l_bettery_right span {
  font-size: 0.4rem;
  color: #49bbff;
}
.busl_r {
  position: absolute;
  font-size: 0.25rem;
  color: #49bbff;
}
.left_1 {
  left: 1.1rem;
  top: 2.63rem;
}
.tiretemperature_left1 {
  left: 1.1rem;
  top: 3.13rem;
}
.left_2 {
  left: 1.1rem;
  top: 4.3rem;
}
.tiretemperature_left2 {
  left: 1.1rem;
  top: 4.8rem;
}
.right_1 {
  right: 1.1rem;
  top: 2.63rem;
}
.tiretemperature_right1 {
  right: 1.1rem;
  top: 3.13rem;
}
.right_2 {
  right: 1.1rem;
  top: 4.3rem;
}
.tiretemperature_right2 {
  right: 1.1rem;
  top: 4.8rem;
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
  background-image: url("../../../../static/images/Lovecar/bg.png");
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
  height: 0.23rem;
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
  width: 0.88rem;
  height: 0.88rem;
  top: 0.8rem;
  right: 0.45rem;
  z-index: 1000;
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
.controlCondition {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  line-height: 0.24rem;
  top: 1.15rem;
}
.controlCondition div {
  font-size: 0.24rem;
}
.controlCondition img {
  width: 0.3rem;
  height: 0.3rem;
  margin: 0 0.1rem 0 0.57rem;
}
.controlLight {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  line-height: 0.24rem;
  top: 0.53rem;
}
.controlLight div {
  font-size: 0.24rem;
}
.controlLight img {
  width: 0.3rem;
  height: 0.3rem;
  margin: 0 0.1rem 0 0.57rem;
}
.question {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
}
</style>
