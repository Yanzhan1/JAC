<template>
	<div>
		<div class="tophead" :style="$statusBarHeightObj">
			<!-- <div class="search">
        <input class="ipt" type="text" placeholder="搜索服务">
        <img class="pic" src="../../../static/images/Wit/zhixiang_home_search_service_icon.png" alt=""> 
      </div> -->

			<ul class="ul_list">
				<li class="li_list" @click="fn()">
					<!-- <img style="width:.56rem;height:.48rem" src="../../../static/images/Wit/withouse.png" alt=""> -->
					<span>经销商</span>
				</li>
				<li class="li_list" @click="search_net()">
					<!-- <img style="width:.52rem;height:.56rem" src="../../../static/images/Wit/witrepair.png" alt=""> -->
					<span>维保网点</span>
				</li>
			<!-- <li class="li_list" @click="pre_weib()">
					<img src="../../../static/images/Wit/zhixiang_home_maintenance_appointment_btn.png" alt="">
					<span>维保预约</span>
				</li> -->
				<li class="li_list" @click="confirmRevise">
					<!-- <img style="width:.56rem;height:.52rem" src="../../../static/images/Wit/witrescue.png" alt=""> -->
					<span>道路救援</span>
				</li>
			</ul>
			<div style="width:80%;height:.02rem;background:#f1f1f1;margin:0 auto;margin-top:.2rem;"></div>
		</div>
		<!-- <div class="bustype">
      <img src="../../../static/images/Wit/zhixiang_home_service_title_point.png" alt="">
      <span>智享服务</span>
    </div> -->
		<!-- <ul class="ul_list_1">
      <li class="li_list_1">
        <img src="../../../static/images/Wit/zhixiang_home_capacity_buy_car_btn.png" alt="">
        <span>智能选车</span>
      </li>
      <li class="li_list_1" @click="search()">
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
    </ul> -->
		<div class="wrapper" ref="wrapper" id="wrapper"  @touchend="move">
			<div id="content">
				<div class="bustypes" @click="tobus">
					<div class="bustypes_1">
						<img src="../../../static/images/Wit/zhixiang_home_service_title_point.png" alt="">
						<span>主推车型</span>
					</div>
					<img src="../../../static/images/Wit/next.png" alt="">
				</div>
				<ul class="bus">
					<li class="bus_li" @click="specil(item)" v-for="(item,index) in this.mainbus" :key="index">
						<div>
							<img :src="item.imgUrl" alt="">
						</div>
						<div class="bus_1">
							<div>
								<img :src="Dingzi" alt="">
								<span class="bus_2">{{item.seriesName}}</span>
							</div>
							<div>
								<span class="bus_3" v-if="item.guidancePriceStart>0">
									<div>官方指导价:</div>
									{{item.guidancePriceStart}}万起</span>
							</div>
						</div>
						<!-- <div class="bus_n" v-else>
							<div>
								<img :src="'./../../../static/images/Wit/dingzi.png'" alt="">
								<span class="bus_2">{{item.seriesName}}</span>
							</div>
						</div> -->
					</li>
				</ul>
			</div>
		</div>

		<mt-popup v-model="popupVisible" position="center">
			<div class="bgc">
				<div style="font-size:.25rem;color:#fff;text-align:center;margin-top:.2rem">车辆VIP码：84092184032840932</div>
			</div>
			<div class="flex row maincenter" style="margin-top:.54rem">
				<div class="mt_l flex column">
					<span style="font-size:.46rem;color:#fff;">5000
            <span style="font-size:.22rem;color:#fff;">km</span>
					</span>
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
				<img @click="know()" :src="'../../../static/images/Wit/mycar_check.png'" alt="" style="width:.58rem;height:.58rem;margin:.75rem auto">
			</div>
		</mt-popup>
		<div class="mask" v-if="flag"></div>
		<ul class="ulList" v-if="flag" @click="cancel()">
			<li class="cont flex column contentcenter" @click="call(1)">
				<span style="font-size:.32rem;color:#222">4008-889933</span>
				<span style="font-size:.22rem;color:#888">(瑞风，和悦)</span>
			</li>
			<li class="cont flex column contentcenter" @click="call(2)">
				<span style="font-size:.32rem;color:#222">4008-009933</span>
				<span style="font-size:.22rem;color:#888">(帅铃，骏铃，康铃)</span>
			</li>
			<li class="cont flex column contentcenter" @click="call(3)">
				<span style="font-size:.32rem;color:#222">4008-003366</span>
				<span style="font-size:.22rem;color:#888">(星锐)</span>
			</li>
			<li class="cont flex column contentcenter" @click="call(4)">
				<span style="font-size:.32rem;color:#222">4008-006633</span>
				<span style="font-size:.22rem;color:#888">(格尔发)</span>
			</li>
			<li class="cont flex column contentcenter" style="border-bottom:none">
				<span style="font-size:.32rem;color:#666">取消</span>
			</li>
		</ul>
	</div>
</template>
<script>
import { MessageBox } from "mint-ui";
import Dingzi from "../../../static/images/Wit/dingzi.png"
import Bscroll from "better-scroll";
export default {
  data() {
    return {
      popupVisible: false,
      mainbus: {}, //主推车型
      sheetVisible: true,
      flag: false,
      Dingzi,
      latitude: "", //精度
      longitude: "", //维度
      tt: {},
      allno: [], //储存所有接受到的no
      positions: "" //储存滚动的位置
    };
  },
  beforeRouteLeave(to, from, next) {
    //			alert(this.positions)
    if (this.positions == null) this.positions = 0;
    this.$store.commit("changeScrollY", this.positions);
    //			alert(this.$store.state.changeScrollY)
    next();
  },
  methods: {
    //道路救援
    confirmRevise() {
      MessageBox.confirm("", {
        title: "是否允许",
        message: "发送当前手机定位到呼叫中心？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "允许",
        cancelButtonText: "不允许",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      })
        .then(action => {
          if (action == "confirm") {
            this.flag = true;

            if (isMobile.iOS()) {
              window.webkit.messageHandlers.iOSLocationNotice.postMessage({}); //调用ios方法发送通知ios调用H5方法传
              var param = {
                latitude: this.latitude,
                longitude: this.longitude,
                positionTypeNo: this.$store.state.userId
              };
              this.$http.post(Wit.Help, param).then(res => {});
            } else if (isMobile.Android()) {
              var position = js2android.getLocationInfo();
              var positions = JSON.parse(position);

              this.latitude = positions.latitude;
              this.longitude = positions.longitude;
              var param = {
                latitude: this.latitude,
                longitude: this.longitude,
                positionTypeNo: this.$store.state.userId
              };
              this.$http.post(Wit.Help, param).then(res => {});
            }
          }
        })
        .catch(err => {
          if (err == "cancel") {
            this.flag = true;
          }
        });
    },
    //取消
    cancel() {
      this.flag = false;
    },
    call(num) {
      var tell = "";
      if (num == 1) {
        tell = "4008-889933";
      } else if (num == 2) {
        tell = "4008-009933";
      } else if (num == 3) {
        tell = "4008-003366";
      } else if (num == 4) {
        tell = "4008-006633";
      }
      if (isMobile.iOS()) {
        window.webkit.messageHandlers.call.postMessage(tell);
      } else if (isMobile.Android()) {
        js2android.call(tell);
      }
    },
    //经销商
    fn() {
      this.$router.push("/wit/dealer");
    },
    //全部车型，主推车型
    tobus() {
      this.$router.push("/wit/recoment_bus");
    },
    //维保网点
    search_net() {
      this.$router.push("/wit/search_net");
    },
    //维保预约
    pre_weib() {
      this.$router.push("/wit/pre_weib");
    },
    //车系特色， 配置表
    specil(item) {
      this.$store.dispatch("NONAME", item);
      this.$store.state.shownum = 1;
      this.$router.push({
        name: "车系特色",
        params: {
          // num:1
          // everyno:item.no,
          // seriesName:item.seriesName,
        }
      });
    },
    //保养查询
    search() {
      this.popupVisible = true;
    },
    //关闭保养查询
    know() {
      this.popupVisible = false;
    },
    getIosLocation(locationMes) {
      //IOS调用,H5获取ios定位信息
      this.latitude = JSON.parse(locationMes).latitude; //精
      this.longitude = JSON.parse(locationMes).longitude; //韦
    },
    getMainPushModel() {
      //获取主推车型，传{}表示全部车型
      var param = {
        highlyRecommend: "1",
        no: this.$store.state.busNo
      };
      this.$http.post(Wit.MainBus, param).then(res => {
        if (res.data.code == 0) {
          var arr = res.data.data;
          for (var i = 0; i < arr.length; i++) {
            if (arr[i].imageRelationVO.length > 0) {
              for (let j = 0; j < arr[i].imageRelationVO.length; j++) {
                if (arr[i].imageRelationVO[j].isDefault == 1) {
                  arr[i].imgUrl = arr[i].imageRelationVO[j].imageUrl;
                }
              }
              this.allno.push(arr[i].no);
            } else {
              arr[i].imgUrl = "";
            }
          }
          this.mainbus = arr;
          this.$nextTick(() => {
            this.scroll = new Bscroll(this.$refs.wrapper, {
              click: true
            });
            this.scroll.scrollTo(0, this.$store.state.changeScrollY);
          });
        }
      });
    },
    move() {
      this.scroll.on("scrollEnd", pos => {
        this.positions = pos.y;
        //alert(this.positions)
      });
    }
  },
  created() {
    window.getIosLocation = this.getIosLocation; //ios获取定位信息,放到window对象供ios调用
    this.getMainPushModel();
  },
  mounted() {
    this.scroll.scrollTo(0, 0);
  },
  activated() {
    window.getIosLocation = this.getIosLocation; //ios获取定位信息,放到window对象供ios调用
    //获取主推车型，传{}表示全部车型
    this.getMainPushModel();
  }
};
</script>
<style scoped>
* {
  padding: 0;
  margin: 0;
}

.cancelButton {
  color: #ccc !important;
}

.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
}

.ulList {
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.1rem;
}

.cont {
  height: 1rem;
  border-bottom: 0.01rem solid #f8f8f8;
}

.know {
  line-height: 0.82rem;
  width: 5.64rem;
  background-color: #fff;
  font-size: 0.32rem;
  color: #4189ff;
  text-align: center;
  margin: 0.6rem auto;
  border-radius: 0.2rem;
}

.tim {
  font-size: 0.14rem;
  background-color: #fff;
  color: #3b67ff;
  line-height: 0.24rem;
  padding: 0 0.1rem;
}

.mint-popup {
  width: 90%;
  height: 4.12rem;
  /* background-image: url("../../../static/images/Wit/windows_maintain_search_bg.png"); */
  background-size: 100%;
  top: 42%;
  border-radius: 0.2rem;
}

.tophead {
  height: 2.58rem;
  /* background-image: url("../../../static/images/Wit/baclgroundwit.png"); */
  width: 100%;
  display: block;
  background-size: content;
  position: fixed;
  top: 0;
  left: 0;
  overflow: hidden;
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
  height: .88rem;
  line-height: .78rem;
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
  align-items: center;
}

.li_list img {
  display: block;
  box-shadow: rgba(0, 0, 0, 0.36);
  opacity: 0.5;
}

.li_list span {
  text-align: center;
  font-size: 0.28rem;
  padding-top: .2rem;
  color: #49bbff;
}

.wrapper {
  position: absolute;
  /* top: 2.58rem; */
  top: 1.6rem;
  left: 0;
  right: 0;
  bottom: 0;
  overflow: hidden;
}
/*.bustype {
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
}*/

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
  width: 0.18rem;
  display: block;
  margin-left: 0.14rem;
}

.bustypes_1 span {
  font-size: 0.28rem;
  color: #222;
}
.bus_n {
  width: 100%;
  height: 1.2rem;
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.bus_n > div {
  display: flex;
  align-items: center;
  padding: 0.3rem;
}
.bus_n > div > img {
  width: 0.28rem;
  height: 0.28rem;
}
.bus {
  display: flex;
  flex-direction: column;
}

.bus_li {
  height: 3.57rem;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.bus_li img {
  width: 100%;
  height: 2.37rem;
}

.bus_1 {
  width: 100%;
  height: 1.2rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.bus_1 > div {
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0.3rem;
}
.bus_1 > div > img {
  width: 0.28rem;
  height: 0.28rem;
}
.bus_2 {
  color: #222;
  padding: 0.2rem;
  font-size: 0.32rem;
  font-family: "PingFang-SC-Bold";
  font-weight: bold;
  color: rgba(34, 34, 34, 1);
}

.bus_3 {
  display: flex;
  align-items: center;
  font-size: 0.28rem;
  font-family: "PingFang-SC-Bold";
  font-weight: bold;
  color: rgba(73, 187, 255, 1);
}
.bus_3 > div {
  font-size: 0.24rem;
  font-family: "PingFangSC-Regular";
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
  margin-right: 0.2rem;
}
</style>