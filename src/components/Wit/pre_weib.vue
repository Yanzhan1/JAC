<template>
	<div class="big_box">
		<!--<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">维保预约</span>
			<span class="header-right"></span>
		</header>
		<div style="height:.88rem"></div>-->
		<!-- <mhead currentTitle="维保预约"></mhead> -->
		<div class="carmessage">车主信息</div>
		<div style="padding:0.33rem">
			<div class="flex row li_st between cocenter">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>姓名</p>
				<div class="flex row cocenter">
					<input type="text" placeholder="请输入姓名"  style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222" v-model="hostname">
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
			</div>
			<div class="flex row li_st between cocenter">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>手机号</p>
				<div class="flex row cocenter">
					<input type="text" placeholder="请输入手机号" v-model="this.mobile"  style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
			</div>
			<div class="flex row li_st between cocenter">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>品牌</p>
				<div class="flex row cocenter">
					<span type="text"  style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">{{brandName}}</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
			</div>
			<div class="flex row li_st between cocenter">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>车型</p>
				<div class="flex row cocenter">
					<span>{{seriesName}}</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
			</div>
			<div class="flex row li_st between cocenter">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>车牌</p>
				<div class="flex row cocenter">
					<input type="text" v-model="plateLicenseNo">
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
			</div>
			<div class="flex row li_st between cocenter">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>行驶里程</p>
				<div class="flex row cocenter">
          <!-- <input type="numberbox" name="" id="" v-model="km"> -->
          <input type="number"
              placeholder="请输入数字" v-model="km">&nbsp 公里
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
			</div>
			<div class="flex row li_st between cocenter" @click="chooseprovinces">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>省份</p>
				<div class="flex row cocenter">
					<span>{{this.valuesprovince1}}</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
			</div>
			<div class="flex row li_st between cocenter" @click="choosecitys">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>城市</p>
				<div class="flex row cocenter">
					<span>{{this.valuescity1}}</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
			</div>
		</div>
    <mt-popup id="provinceLabel" class="region"  position="bottom">
                  <h3>选择省</h3>
                  <span @click="chooseprovinceone">确定</span>
                  <mt-picker :slots="provinceSlot" @change="provinceChange" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
    </mt-popup>
    <mt-popup id="cityLabel" class="region"  position="bottom">
                  <h3>选择市</h3>
                  <span @click="choosecityone">确定</span>
                  <mt-picker :slots="citySlot" @change="cityChange" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
    </mt-popup>
    <mt-popup v-show="this.typeChoose" id="tpyeLabel" class="region"  position="bottom">
                  <h3>类型选择</h3>
                  <span @click="choosetypeone">确定</span>
                  <mt-picker :slots="typeSlot" @change="typeChange" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
    </mt-popup>
		<div class="carmessage" style="margin-top:.3rem">预约信息</div>
		<div style="padding:0 .33rem">
			<div class="flex row li_st between cocenter" @click="servicestatus">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>服务站</p>
				<div class="flex row cocenter">
					<span style="font-size:.26rem;color:#222">{{currentTitle}}</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
			</div>
			<div class="flex row li_st between cocenter" @click="orderTimeStatus" v-show="this.currentTitle">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>预约时间</p>
				<div class="flex row cocenter">
					<span ref="Gettimes" style="font-size:.26rem;color:#222">{{currentTime}}</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
			</div>
			<div class="flex row li_st between cocenter" @click="Maintenance">
				<p style="color:#555"><span style="display:inline-block;font-size:.31rem;color:red">*</span>维保类型</p>
				<div class="flex row cocenter" >
					<span ref="main" style="font-size:.26rem;color:#222">{{this.chooseType}}</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.16rem;height:.3rem">
				</div>
        <!-- <div class="choosexing" v-show="choosexing">
            <div ref="one" @click="chooseone">维修</div>
            <div ref="two" @click="choosetwo">保养</div>
        </div> -->
			</div>
		</div>
    <div style="width:100%;height:1rem;">

    </div>
		<!-- 服务站弹出框 -->
		<div class="service " v-if="servicezhan">
			<h2 style="padding:.2rem; text-align: center;font:.4rem/.6rem 'PingFang-SC-Regular'">服务站</h2>
      <span class="surebuttom" @click="subsub">确定</span>
      <div v-if="this.nodealer">
        <ul style="padding:.1rem .2rem" >
            <li class="ul_list flex row around " v-for="(item,index) in addressArray">
              <label class="chooseimages" :class="index == currentIndex ? 'active' : ''" @click="chooseimage(index,item.dealerName)"></label>
              <div class="flex column around  mid">
                <span class="txt_top dian">{{item.dealerName}}</span>
                <span class="flex row cocenter">
                              <img style="width:.25rem;margin-right:.1rem;" src="../../../static/images/Wit/list_position_icon.png" alt="">
                              <span class="txt_m dian" style="margin-top:.1rem">{{item.dealerAddress}}</span>
                </span>
              </div>
              <div class="cocenter flex-center">
                <div class="flex-column-align">
                  <span class="txt_m" style="display:inline-block;margin-top:.2rem;height:0.3rem;line-height:0.3rem;">距离</span><span class="txt_m" style="display:inline-block;margin-top:.2rem;height:0.3rem;line-height:0.3rem;">{{item.juli}}</span>
                </div>
              </div>
            </li>
        </ul>
      </div>
      <div class="nodelerclass" v-else>此地暂无经销商</div>
		</div>
    <!-- 预约时间出框 -->
    <div class="service " v-if="orderTime">
      <div style="height: 0.28rem"></div>
      <span style="display: inline-block;width: 1rem;height: 0.28rem;text-align: center" @click="cancalBtn">取消</span>
      <span class="surebuttom" @click="confirmBtn">确定</span>
      <div class="every_times">
        <mt-swipe class="time-swiper" ref="swiperWrap" 
        	:auto="0" 
        	:showIndicators="false" 
        	:continuous="false"
      	>
				  <mt-swipe-item v-for="(item, index) in dataList" :key="index">
				  	<p class="timeget">{{item}}</p>
				  </mt-swipe-item>
				</mt-swipe>
				<div class="button-wrapper">
          <button class="next-button" @click="rightBtn">></button>
          <button class="prev-button" @click="leftBtn"><</button>
       	</div>
      </div>
      <mt-picker :slots="slotstime" @change="timeChange" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
    </div>
		<span class="bottom-btn" @click="appointment">立即预约</span>

		<div v-show="allback" class="black" @click='backgroundshow' @touchmove.prevent></div>
		<!-- 遮罩层  -->
	</div>
</template>
<script>
import { Picker } from "mint-ui";
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
import { MessageBox } from "mint-ui";
import PublicHead from "../publicmodel/PublicHead";
export default {
  name: "preWeib",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      chooseType:'',
      hostname: "", //车主姓名
      mobile: "", //手机号
      servicezhan: false, //控制服务站
      typeChoose:false,//控制维保类型选择
      orderTime: false, //控制时间
      allback: false, //遮罩层
      km: "", //维保预约的里程数
      yearmonthday: "", //选择的时间年月日
      choosexing: false, //控制保养类型的选择
      chooseserveimg: false, //控制选择服务站图片默认不选择
      chooseprovinceq: false, //控制省份弹框
      valuesprovince: "", //被选中的省份
      valuesprovince1: "", //被选中的省份
      valuestime: "", //被选中的时间
      valuescity: "", //被选中的城市
      valuescity1: "", //被选中的城市
      choosecity: false, //控制城市弹框
      defaultvin: "", //默认的vin
      chooseno: "", //被选择的服务站的no的存贮
      seriesNo: "", //默认车辆拿到的数据用来请求品牌车型
      modelNo: "", //默认车辆拿到的数据用来请求品牌车型
      tspFlag: "", //默认车辆拿到的数据用来请求品牌车型
      brandNo: "", //品牌的no
      seriesNo: "", //车系的no
      brandName: "", //品牌
      plateLicenseNo: "", //车牌号
      brandId: "", //'0'+品牌的id
      seriesName: "", //车系
      time_ID: "", //时间的id
      dataindex: 0, //默认日期选择当天
      nodealer: false, //判断经销商是否为空
      num: false, //控制picker第一次进入获取不到数据
      flag: false,
      flag1: false,
      flag2: false,
      currentIndex: -1,
      currentTitle: "",
      currentTime: "", //被选中的时间
      pickerVisible: false,
      locationMes: "", //存贮原生给的东西
      provinceName: "", //定位省份
      longitude: "", //定位纬度
      cityName: "", //定位城市
      latitude: "", //定位经度
      searchCountryAreaCodeListPage: "", //请求省份拿到的对象
      proid: "", //省份的id请求城市用到
      provinceCode: "", //省份的code
      city_id: "", //城市的code
      allcityList:[],//储存被选择省份的所有城市
      alldata: [], //所有的时间信息
      addressArray: [],
      everytime: [
        "0:00-1:00",
        "1:00-2:00",
        "2:00-3:00",
        "3:00-4:00",
        "4:00-5:00",
        "5:00-6:00",
        "6:00-7:00",
        "7:00-8:00",
        "8:00-9:00",
        "9:00-10:00",
        "10:00-11:00",
        "11:00-12:00",
        "12:00-13:00",
        "13:00-14:00",
        "14:00-15:00",
        "15:00-16:00",
        "16:00-17:00",
        "17:00-18:00",
        "18:00-19:00",
        "19:00-20:00",
        "20:00-21:00",
        "21:00-22:00",
        "22:00-23:00",
        "23:00-00:00"
      ],
      provinceSlot: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      slotstime: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      citySlot: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
      ],
      typeSlot: [
        {
          flex: 1,
          values: ['维修','保养'],
          className: "slot1",
          textAlign: "center"
        }
      ],
      dataList: [] //日期数组
    };
  },
  mounted() {
    setTimeout(() => {   
      this.getdefaultmessage();
      this.init();
    }, 500);
    this.defaultvins(); 
    this.mobile = this.$store.state.mobile;
    this.locationMes = this.$store.state.locationMes;
    this.num = true;
    
   
  },
  methods: {
    init() {
      //请求省份列表   原生拿到的省份name  去对比省份列表 找到对应的省份code
      var data = {
        parentId: null,
        level: 1,
        size: 50
      };
      this.$http.post(Wit.searchCountryAreaCodeListPage, data).then(res => {
        const data = res.data;
        if (data.code == 0) {
          this.searchCountryAreaCodeListPage = data.data.records;
          for (let i = 0; i < this.searchCountryAreaCodeListPage.length; i++) {
            this.provinceSlot[0].values.push(
              this.searchCountryAreaCodeListPage[i].name
            );
            if (
              this.searchCountryAreaCodeListPage[i].name == this.provinceName
            ) {
              this.provinceCode = this.searchCountryAreaCodeListPage[i].code;
              this.proid = this.searchCountryAreaCodeListPage[i].id;
              if (this.provinceCode) {
                let datas = {
                  parentId: this.proid, //传参省份的id,请求该省份的城市列表
                  level: 2,
                  size: 100
                };
                this.$http
                  .post(Wit.searchCountryAreaCodeListPage, datas)
                  .then(res => {
                    //请求城市列表
                    const data = res.data;
                    if (data.code == 0) {
                      this.citySlot[0].values = []; //清除上一次城市的选择
                      data.data.records.forEach((item, index) => {
                        this.citySlot[0].values.push(item.name);
                        this.city_id = item.code;
                      });
                      this.brandName();
                    } else {
                      Toast({
                        message: "初始化城市列表报错",
                        position: "middle",
                        duration: 2000
                      });
                    }
                  });
              }
            }
          }
        } else {
          Toast({
            message: "初始化省份列表报错",
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    //选择维保类型
    choosetypeone(){
        if(this.chooseType==undefined){
          this.chooseType='保养'
        }
        this.allback=false;
        this.typeChoose=false;
    },
    //选择单个维保类型
    typeChange(picker, values){
      this.chooseType=values[0]
    },
    getbrand() {
      let param = {
        lmscode: this.modelNo,
        levelCode: this.seriesNo,
        tspFlag: this.tspFlag,
        seriesName:this.$store.getters.defaultInformation.seriesName
      };
      this.$http.post(Wit.SearchVehicleSeriesByVehicle, param).then(res => {
        if (res.data.data.brandId == 4 || 5 || 6) {
          this.brandName = res.data.data.brandName;
          this.seriesName = res.data.data.seriesName;
          this.brandNo = res.data.data.brandNo;
          this.brandId = "0" + res.data.data.brandId;
          this.seriesNo = res.data.data.no;
          this.mydeler();
        } else {
          Toast({
            message: "此系列站不支持维保预约",
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    //通过日期获取具体的时间段
    getdayreal() {
      let param = {
        revervationDate: this.dataList[this.dataindex],
        dealerNo: this.chooseno
      };
      this.$http.post(Wit.selectDealerAndTime, param).then(res => {
        if (res.data.code == 0) {
          this.alldata = res.data.data;
          let alldata = res.data.data;
          this.slotstime[0].values = [];
          for (let val of alldata) {
            if (val.completeAMOUNT >= val.max_NUM) {
              val.revervation_TIME = val.revervation_TIME + " 爆满";
              this.slotstime[0].values.push(val.revervation_TIME);
            } else {
              this.slotstime[0].values.push(val.revervation_TIME);
            }
          }
        } else if (res.data.code == 500) {
          this.slotstime[0].values = ["暂无预约时间"];
        }
      });
    },
    //获取定位的省份,城市,经纬度
    getdefaultmessage() {
      this.provinceName = JSON.parse(this.$store.state.locationMes)
        .province.replace("自治区", "")
        .replace("省", "")
        .replace("市", "")
        .replace("壮族", "")
        .replace("回族", "");
      this.cityName = JSON.parse(this.$store.state.locationMes).city.replace(
        "市",
        ""
      );
      // this.valuescity1 = this.cityName;
      // this.valuesprovince1 = this.provinceName;
      this.latitude = JSON.parse(this.$store.state.locationMes).latitude; //精
      this.longitude = JSON.parse(this.$store.state.locationMes).longitude; //韦
    },
    //获取服务站内容
    mydeler() {
      var param = {
        brandNo: this.brandNo, //品牌no
        vehicleSeridesNo: this.seriesNo, //车系no
        dealerProvinceCode: this.provinceCode, //省编码
        dealerCityCode: this.city_id, //城市id
        longitude: this.longitude, //经度
        latitude: this.latitude, //维度
        dealerDmsType: this.brandId,
        dealerType: "02",
        size: 10,
        current: 1
      };
      this.$http.post(Wit.Dealer, param).then(res => {
        const data = res.data;
        if (data.code == 0) {
          this.addressArray = data.data.records;
          console.log(this.addressArray)
          if (this.addressArray.length == 0) {
            this.nodealer = false;
          } else {
            this.nodealer = true;
          }
        }
      });
    },
    servicestatus() {
      this.servicezhan = true;
      this.allback = true;
    },
    orderTimeStatus() {
      this.pickerVisible = true;
      this.orderTime = true;
      this.allback = true;
      this.currentIndex = -1;
      $("#timeLabel").show();
      this.getdayreal();
    },
    //选择确定服务站
    subsub() {
      this.allback = false;
      this.servicezhan = false;
    },
    //选择确定预约时间
    confirmBtn() {
      this.allback = false;
      this.orderTime = false;
      this.yearmonthday = $(".timeget").html();
      this.currentTime = $(".timeget").html() + " " + this.valuestime;
    },
    //点击遮罩层消失
    backgroundshow() {
      this.allback = false;
      this.servicezhan = false;
      $("#provinceLabel").hide();
      $("#cityLabel").hide();
      this.orderTime = false;
      this.typeChoose=false;
    },
    //选择省份
    chooseprovinces() {
      $("#provinceLabel").show();
      this.allback = true;
    },
    Maintenance() {
      this.typeChoose=true;
      this.allback=true;
      this.choosexing = !this.choosexing;
    },
    //确认省份
    chooseprovinceone() {
      if (this.valuesprovince == undefined) {
        this.valuesprovince = this.provinceSlot[0].values[0];
      }
      for (let value of this.searchCountryAreaCodeListPage) {
        if (value.name == this.valuesprovince) {
          this.proid = value.id;
          this.provinceCode = value.code;
        }
      }
      let datas = {
        parentId: this.proid, //传参省份的id,请求该省份的城市列表
        level: 2,
        size: 100
      };
      this.$http.post(Wit.searchCountryAreaCodeListPage, datas).then(res => {
        //请求城市列表
        this.allcityList=res.data.data.records
        console.log(this.allcityList)
        if (res.data.code == 0) {
          this.citySlot[0].values = []; //清除上一次城市的选择
           this.allcityList.forEach((item, index) => {
            this.citySlot[0].values.push(item.name);
            
          });
          this.city_id = this.allcityList[0].code;
          this.valuescity1 = this.citySlot[0].values[0];
          this.mydeler();
          
        } else {
          Toast({
            message: "初始化城市列表报错",
            position: "middle",
            duration: 2000
          });
        }
      });
      $("#provinceLabel").hide();
      this.currentTitle = "";
      this.currentIndex = -1;
      this.allback = false;
      this.valuesprovince1 = this.valuesprovince;
    },
    //确认城市
    choosecityone() {
        this.allcityList.forEach((item, index) => {
            if(this.valuescity==item.name){
                this.city_id = item.code;
                this.mydeler();

            }
          });
      $("#cityLabel").hide();
      this.allback = false;
      this.valuescity1 = this.valuescity;
    },
    //选择城市
    choosecitys() {
      this.allback = true;
      $("#cityLabel").show();
    },
    //省份的滑动选择
    provinceChange(picker, values) {
      if (this.num) {
        this.valuesprovince1 = this.provinceName;
        this.valuescity1 = this.cityName;
        this.num = false;
      } else {
        this.valuesprovince = values[0];
      }
      picker.setSlotValue(1, values[0]);
    },
    timeChange(picker, values) {
      this.valuestime = values[0];
      // console.log(this.alldata, 1);
      for (let val of this.alldata) {
        if (this.valuestime == val.revervation_TIME) {
          this.time_ID = val.time_ID;
        }
      }
      picker.setSlotValue(1, values[0]);
    },
    //城市的滑动选择
    cityChange(picker, values) {
      this.valuescity = values[0];
      picker.setSlotValue(1, values[0]);
    },
    chooseimage(index, title) {
      this.currentIndex = index;
      this.currentTitle = title;
      this.chooseno = this.addressArray[index].no;
      console.log(this.chooseno)
    },
    imageselect() {
      this.chooseserveimg = false;
    },
    imageoff() {
      this.chooseserveimg = true;
    },
    cancalBtn() {
      //取消
      this.orderTime = false;
      this.allback = false;
    },
    getDateList(counts) {
      //生成当前日期开始后的日期数组
      for (let i = 0; i < counts; i++) {
        let time = new Date().getTime() + 1000 * 60 * 60 * 24 * i;
        this.dataList.push(operationTime.getTime(time, 4));
        /*this.dataList = new Date(this.dataList.replace((/\//g, '-')))*/
      }
      this.dataList.forEach((item, index) => {
        this.dataList[index] = item.replace(/\//g, "-");
      });
    },
    leftBtn() {
      //左时间按钮
      this.$refs.swiperWrap.prev();
      this.dataindex--;
      if (this.dataindex < 0) {
        this.dataindex = 0;
      }
      this.getdayreal();
    },
    rightBtn() {
      //右时间按钮
      this.dataindex++;
      if (this.dataindex > 7) {
        this.dataindex = 7;
      }
      this.$refs.swiperWrap.next();
      this.getdayreal();
    },
    chooseone() {
      this.choosexing = !this.choosexing;
      this.$refs.main.innerText = this.$refs.one.innerText;
    },
    choosetwo() {
      this.choosexing = !this.choosexing;
      this.$refs.main.innerText = this.$refs.two.innerText;
    },
    //获取默认车辆的vin
    defaultvins() {
      // this.$http
      //   .post(
      //     My.My_Bus,
      //     {
      //       userId: this.$store.state.userId,
      //       phone: this.$store.state.mobile,
      //       tspUserId: this.tspid,
      //       aaaUserID: this.$store.state.aaaid
      //     },
      //     this.$store.state.tsppin
      //   )
      //   .then(res => {
      //     if (res.data.returnSuccess) {
      //       for (let i = 0; i < res.data.data.length; i++) {
      //         if (
      //           res.data.data[i].def == 1 ||
      //           res.data.data[i].defToNathor == 1
      //         ) {
      //           // this.carsysitem = res.data.data[i].seriesName || null;
              setTimeout(()=>{
                this.defaultvin = this.$store.getters.defaultInformation.vin;
                this.modelNo =this.$store.getters.defaultInformation.modelNo;
                this.seriesNo = this.$store.getters.defaultInformation.seriesNo;
                this.tspFlag = this.$store.getters.defaultInformation.tspFlag;
                this.plateLicenseNo = this.$store.getters.defaultInformation.plateLicenseNo;
                this.getbrand();
              },500)
        //       }
        //     }
        //   }
        // });
    },
    appointment() {
      if (this.hostname == "") {
        Toast({
          message: "请输入姓名",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      if (this.mobile == "") {
        Toast({
          message: "请输入手机号",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      if (this.km == "") {
        Toast({
          message: "请填写里程数",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      if (this.currentTitle == "") {
        Toast({
          message: "请选择服务站",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      if (this.currentTime == "" || this.valuestime == "暂无预约时间") {
        Toast({
          message: "请选择预约时间",
          position: "middle",
          duration: 2000
        });
        return false;
      }
      let param = {
        ownerName: this.hostname,
        ownerMobile: this.mobile,
        vin: this.defaultvin,
        licenseNumber: this.plateLicenseNo,
        mileage: this.km,
        dealerNo: this.chooseno,
        revervationTypeName: this.$refs.main.innerText,
        revervationDate: this.yearmonthday,
        revervationTime: this.time_ID
      };
      this.$http.post(Wit.addMaintenanceAppointment, param).then(res => {
        // console.log(res.data);
        if (res.data.code == 0) {
          //  Toast({
          //     message: res.data.data,
          //     position: "middle",
          //     duration: 2000
          //   });
          MessageBox.confirm("", {
            title: "提示",
            message: "预约成功!",
            showConfirmButton: true,
            showCancelButton: true,
            cancelButtonClass: "cancelButton",
            confirmButtonClass: "confirmButton",
            confirmButtonText: "确认",
            cancelButtonText: "查看详情",
            confirmButtonHighlight: true,
            cancelButtonHighlight: true
          })
            .then(action => {
              if (action == "confirm") {
              }
            })
            .catch(() => {
              this.$router.push({
                path:"/myorder",
                query:{
                  show:'2'
                }
                });
            });
        }
      });
    }
  },
  // computed:{
  //     locationMes(){
  //       return this.$store.state.locationMes
  //     }
  // },
  // watch:{
  //     locationMes(newVal, oldVal){

  //     }
  // },
  created() {
    this.getDateList(7);
  }
};
</script>
<style scoped>
/* 插件样式 */
.carmessage {
  width: 1.5rem;
  height: 0.31rem;
  color: #49bbff;
  margin-top: 0.5rem;
  margin-left: 0.29rem;
  font: 0.32rem/0.38rem "PingFang-SC-Medium";
}
/* .one {
  position: fixed;
  height: 1.7rem;
  width: 100%;
  background-color: #fff;
  top: 0.7rem;
  z-index: 1002;
  opacity: 0.7;
} */

.li_st {
  position: relative;
  height: 0.99rem;
  border-bottom: 0.01rem solid #f1f1f1;
}
.li_st input {
  border: none;
  text-align: end;
  outline: none;
}
.li_st span{
  font-size: .26rem;
}
.surebuttom {
  width: 1rem;
  height: 0.28rem;
  font-size: 0.3rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(73, 187, 255, 1);
  float: right;
}
.chooseimages {
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background-image: url("../../../static/images/Lovecar/loseWindow.png");
  border-radius: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  margin-top: 0.45rem;
  padding: 0.2rem;
  margin-right: 0.2rem;
  margin-left: 0.3rem;
}
.active {
  background-image: url("../../../static/images/Lovecar/window2@2x.png");
  width: 0.44rem;
  height: 0.44rem;
  background-size: 100%;
  background-repeat: no-repeat;
}
.every_times {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0.93rem;
  background: #fff;
  font: 0.28rem/0.3rem "PingFang-SC-Medium";
  font-weight: Medium;
}
.every_times > img {
  width: 0.16rem;
  height: 0.26rem;
  position: absolute;
}
.every_times .img_l {
  left: 0.45rem;
  top: 0.39rem;
}
.every_times .img_r {
  right: 0.52rem;
  top: 0.39rem;
}
.every_times >>> .mint-swipe {
  width: 100% !important;
}

.every_times >>> .mint-swipe-item > p {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  text-align: center;
  font-size: 0.36rem;
}
.every_times > .button-wrapper > .prev-button {
  position: absolute;
  top: 6%;
  left: 0.6rem;
  width: 0.16rem;
  height: 0.26rem;
  border: none;
  outline: none;
  padding: 0.3rem;
  background: none;
}
.every_times > .button-wrapper > .next-button {
  position: absolute;
  top: 0%;
  right: 0.6rem;
  width: 0.16rem;
  height: 0.26rem;
  border: none;
  outline: none;
  padding: 0.3rem;
  background: none;
}

.center {
  position: absolute;
}
.mid {
  padding: 0.2rem 0;
}
.choosexing {
  position: absolute;
  bottom: -1rem;
  right: 0rem;
  background: #fff;
  border:.02rem solid #000;
  border-radius: 20%;
}
.choosexing > div {
  padding: 0.1rem;
}
.txt_top {
  font-size: 0.3rem;
  color: #222;
}
.around {
  width: 100%;
}
.dian {
  /*overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;*/
  width: 5rem;
}

.txt_m {
  font-size: 0.24rem;
  color: #999;
}
.ul_list {
  height: 2.3rem;
  border-bottom: 1px solid #f7f7f7;
}
.flex-column-align {
  width: 1.14rem;
  margin-right: 0.4rem;
  height: 0.3rem;
  line-height: 0.3rem;
}
.service {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 1001;
}
.pp {
  line-height: 0.88rem;
}

.texta {
  height: 1.44rem;
  width: 100%;
  background-color: #f8f8f8;
  font-size: 0.28rem;
  color: #888888;
  margin: 0.4rem 0;
  border: none;
  border-radius: 0.16rem;
  padding: 0.2rem;
}
.flex-center {
  /*水平垂直居中*/
  display: flex;
  justify-content: center;
  align-items: center;
}

.mint-popup {
  width: 100%;
}
.nodelerclass {
  text-align: center;
  padding: 1rem;
}
.submit {
  position: absolute;
  top: 3.31rem;
  left: 0.65rem;
  width: 6.2rem;
  height: 4.12rem;
  background: #fff;
  z-index: 1001;
  border-radius: 0.2rem;
  font-family: PingFang SC;
  font-weight: Medium;
  color: #222;
}

.submit > h3 {
  text-align: center;
  font-size: 0.36rem;
  margin-top: 0.31rem;
}

.success_bt {
  width: 5.02rem;
  text-align: center;
  margin-left: 0.59rem;
  margin-top: 0.36rem;
}
.region {
  /* position: absolute; */
  /* bottom: -1.5rem; */
  width: 100%;
  height: 5rem;
  color: #222;
  background: #fff;
  font-weight: Regular;
  font-family: "PingFangSC-Regular";
  z-index: 1001;
}
.region > h3 {
  text-align: center;
  margin-top: 0.42rem;
  font-size: 0.36rem;
  color: #222;
  line-height: 0.36rem;
}
.region > span {
  /* position: absolute; */
  float: right;
  margin-right: 0.5rem;
  color: #49bbff;
  font-size: 0.28rem;
}
.gou {
  margin-left: 2.7rem;
  margin-top: 0.21rem;
}

.look {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #1e99ff;
}

.look .look_l {
  margin-left: 0.49rem;
  font-size: 0.34rem;
}

.look .look_r {
  margin-right: 0.49rem;
  font-size: 0.34rem;
}

.black {
  position: fixed;
  width: 100%;
  height: 100vh;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.big_box {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>
