<template>
	<div class="intelligent-car">
		<div class="bagMask" v-show="bagMask" @click="close"></div>
		<header class="header MobileHeight">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<router-link tag='span' class="seatAeration" to="/wit/hotSell">热销车型<span></span></router-link>
			<router-link tag='span' class="seatHeating active" style="margin-right: 1.3rem;" to="/wit/intelligentCar">智能选车<span></span></router-link>
		</header>
		<div style="height:.88rem" class="MobileHeight"></div>
		<!--页面titleStart-->
		<div class="brain-power-title">
			<div class="vehicle-type" @click="executiveCarSelection(1)">
				<span>车型</span>
				<img class="typeImg icon" ref="typeImg" src="../../../static/images/Lovecar/zhankai@2x.png" alt="" />
			</div>
			<div class="industry" @click="executiveCarSelection(2)">
				<span>行业</span>
				<img class="industryImg icon" ref="industryImg" src="../../../static/images/Lovecar/zhankai@2x.png" alt="" />
			</div>
			<div class="drive" @click="executiveCarSelection(3)">
				<span>驱动</span>
				<img class="driveImg icon" ref="driveImg" src="../../../static/images/Lovecar/zhankai@2x.png" alt="" />
			</div>
			<div class="load" @click="executiveCarSelection(4)">
				<span>载重</span>
				<img class="loadImg icon" ref="loadImg" src="../../../static/images/Lovecar/zhankai@2x.png" alt="" />
			</div>
			<div class="Traffic" @click="executiveCarSelection(5)">
				<span>路况</span>
				<img class="trafficImg icon" ref="trafficImg" src="../../../static/images/Lovecar/zhankai@2x.png" alt="" />
			</div>
		</div>
		<div style="height: 1rem;"></div>
		<!--页面title End-->

		<!--筛选列表Start-->
		<vertical-toggle>
			<div class="filter-list" v-show="showTitleFilter">
				<transition-group @before-enter="beforeEnter" tag="div" class="animate-box">
					<p class="filte-item" v-for="(item, key, index) in filterList" @click="closeFilterList(key)" v-show="item" :key="index" :ref="key">
						<span>{{item}}</span>
						<span>X</span>
					</p>
				</transition-group>
			</div>
		</vertical-toggle>
		<!--筛选列表End-->
		<div style="height: 1.2rem" v-show="showTitleFilter"></div>
		<!--筛选条模块Start-->
    <!-- 车型选择 -->
		<vertical-toggle>
			<div class="filter-wrapper" v-show="contentTypeCar">
				<div class="flter-content">
					<p class="condition" v-for="(item, index) in chooseList" @click="chooseTypeCar(item)" :key="index">{{item.valueName}}</p>
				</div>
			</div>
		</vertical-toggle>
    <!-- 行业选择 -->
		<vertical-toggle>
			<div class="filter-wrapper" v-show="contentIndustry">
				<div class="flter-content">
					<p class="condition" v-for="(item, index) in chooseListTwo" @click="chooseIndustry(item)" :key="index">{{item.valueName}}</p>
				</div>
			</div>
		</vertical-toggle>
    <!-- 驱动选择 -->
		<vertical-toggle>
			<div class="filter-wrapper" v-show="contentDrive">
				<div class="flter-content">
					<p class="condition" v-for="(item, index) in chooseListThree" @click="chooseDrive(item)" :key="index">{{item.valueName}}</p>
				</div>
			</div>
		</vertical-toggle>
    <!-- 载重选择 -->
		<vertical-toggle>
			<div class="filter-wrapper" v-show="contentLoad">
				<div class="flter-content">
					<p class="condition" v-for="(item, index) in chooseListFour" @click="chooseLoad(item)" :key="index">{{item.valueName}}</p>
				</div>
			</div>
		</vertical-toggle>
    <!-- 路况选择 -->
		<vertical-toggle>
			<div class="filter-wrapper" v-show="contentTraffic">
				<div class="flter-content">
					<p class="condition" v-for="(item, index) in chooseListFive" @click="chooseTraffic(item)" :key="index">{{item.valueName}}</p>
				</div>
			</div>
		</vertical-toggle>
		<!--筛选模块End-->

		<!--车型列表Start-->
		<div class="car-wrapper" ref="carWrapper">
			<ul>
				<!--<transition-group name="staggered-fade" tag="ul" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">-->
				<li class="car-content" v-for="(item, index) in carList" v-bind:key="item.id" v-bind:data-index="index">
					<div class="car-img">
						<img :src="item.src" />
					</div>
					<div class="car-body">
						<h3 style="color: #222222;font-size: .33rem;">{{item.modelName}}</h3>
						<div class="car-special">
							<div>{{item.seriesName}}</div>
							<div>{{item.road}}</div>
						</div>
						<div class="car-info">
							<span>目标行业:</span>
							<span style="color: #666666;">{{item.targetIndustry}}</span>
						</div>
					</div>
					<img class="car-return" src="../../../static/images/my/next@2x.png" alt="" />
				</li>
			</ul>
			<!--</transition-group>-->
		</div>
		<!--车型列表End-->
	</div>
</template>

<script>
import BScroll from "better-scroll";
import VerticalToggle from "../../../src/assets/vertical-toggle.js";
import { MessageBox } from "mint-ui";
export default {
  name: "intelligentCar",
  components: {
    VerticalToggle
  },
  data() {
    return {
      bagMask: false, //背景遮罩
      vehicleTypeFlag: true, //车型标识符
      industryFlag: true, //行业标识符
      driveFlag: true, //驱动标识符
      loadFlag: true, //载重标识符
      trafficFlag: true, //路况标识符
      contentTypeCar: false, //车型筛选列表状态, false消失,true展现
      contentIndustry: false, //行业筛选列表状态, false消失,true展现
      contentDrive: false, //驱动筛选列表状态, false消失,true展现
      contentLoad: false, //载重筛选列表状态, false消失,true展现
      contentTraffic: false, //路况筛选列表状态, false消失,true展现
      typeCarSelect: false, //车型选择标识符
      driveSelect: false, //驱动选择标识符
      filterList: {
        //点击筛选列表,存入到该对象
        carType: ""
      }, //筛选记录对象
      chooseList: [],
      //选择列表
      chooseListTwo: [], //选择列表
      chooseListThree: [], //选择列表
      chooseListFour: [], //选择列表
      chooseListFive: [], //选择列表
      carList: [
      ], //车型列表
      modelNameCode:null,//传给后台的车型code
      targetIndustryCode:null,//传给后台的目标行业code
      roadCode:null,//传给后台的路况code
      loadCode:null,//传给后台的载重code
      diveCode:null,//传给后台的驱动code
    };
  },
  created() {
    this.init();
  },
  mounted() {
    $(".MobileHeight").css({
      marginTop: this.$store.state.mobileStatusBar
    }); //头部挤出一定高度,配合原生做沉浸式开发
    this.$nextTick(() => {
      this.scroll = new BScroll(this.$refs.carWrapper, {
        click: true
      });
    });
  },
  computed: {
    showTitleFilter() {
      return this.filterList.carType;
    }
  },
  watch: {
    showTitleFilter(newVal, oldVal) {
      if (newVal !== "") {
        Velocity(
          $(".car-wrapper"),
          {
            top: "3.08rem"
          },
          {
            duration: 250
          }
        );
      } else {
        this.filterList.industry = "";
        this.filterList.drive = "";
        this.filterList.load = "";
        this.filterList.traffic = "";
        this.typeCarSelect = false; //车型不选,不让进入过滤模块
        Velocity(
          $(".car-wrapper"),
          {
            top: "1.88rem"
          },
          {
            duration: 250
          }
        );
      }
    }
  },
  methods: {
    executiveCarSelection(value) {
      //智能选车
      var that = this;
      var typeImg = $(".typeImg");
      var industryImg = $(".industryImg");
      var driveImg = $(".driveImg");
      var loadImg = $(".loadImg");
      var trafficImg = $(".trafficImg");

      if (value === 1) {
        //车型
        if (that.vehicleTypeFlag) {
          //进入关闭已经打开的其它筛选模块
          that.contentIndustry = false;
          that.contentDrive = false;
          that.contentLoad = false;
          that.contentTraffic = false;

          that.contentTypeCar = true; //车型筛选列表打开
          that.bagMask = true;
          typeImg
            .addClass("iconTrans")
            .parent()
            .siblings()
            .find(".icon")
            .removeClass("iconTrans"); //当前箭头up,其它箭头down
        } else {
          if (that.contentTypeCar) {
            //还点击在该筛选title上的时候,关闭该筛选模块,背景和箭头
            that.contentTypeCar = false; //车型筛选模块关闭

            that.contentLoad = false;
            that.contentIndustry = false;
            that.contentDrive = false;
            that.contentTraffic = false;

            that.bagMask = false;
            typeImg.removeClass("iconTrans"); //当前箭头down
          } else {
            //反向没有点击在该title上走一遍该title打开流程
            that.contentTypeCar = true; //车型筛选模块打开

            that.contentLoad = false;
            that.contentIndustry = false;
            that.contentDrive = false;
            that.contentTraffic = false;

            that.bagMask = true;
            typeImg
              .addClass("iconTrans")
              .parent()
              .siblings()
              .find(".icon")
              .removeClass("iconTrans"); //当前箭头down
          }
        }
        that.vehicleTypeFlag = !that.vehicleTypeFlag;
      } else if (value === 2) {
        //行业
        if (that.industryFlag) {
          if (that.typeCarSelect == false) {
            MessageBox.alert("请首先选择车型，才可进行条件筛选");
            return;
          } else {
            that.contentIndustry = true; //行业筛选模块打开
            that.bagMask = true;
            industryImg
              .addClass("iconTrans")
              .parent()
              .siblings()
              .find(".icon")
              .removeClass("iconTrans"); //当前箭头up,其它箭头down
            //进入关闭已经打开的其它筛选模块
            that.contentTypeCar = false;
            that.contentDrive = false;
            that.contentLoad = false;
            that.contentTraffic = false;
          }
        } else {
          if (that.typeCarSelect == false) {
            //								alert('请首先选择车型，才可进行条件筛选')
            MessageBox.alert("请首先选择车型，才可进行条件筛选");
            return;
          }
          if (that.contentIndustry) {
            //正向第一次进入
            that.contentIndustry = false; //行业筛选模块关闭

            that.contentTypeCar = false;
            that.contentLoad = false;
            that.contentDrive = false;
            that.contentTraffic = false;

            that.bagMask = false;
            industryImg.removeClass("iconTrans"); //当前箭头down
          } else {
            //反向再次进入, 在另一个title进入的时候直接把其它筛选模块状态改为了false,再次进入需要走一次打开流程
            that.contentIndustry = true; //行业筛选模块关闭

            that.contentTypeCar = false;
            that.contentLoad = false;
            that.contentDrive = false;
            that.contentTraffic = false;

            that.bagMask = true;
            industryImg
              .addClass("iconTrans")
              .parent()
              .siblings()
              .find(".icon")
              .removeClass("iconTrans"); //当前箭头down
          }
        }
        that.industryFlag = !that.industryFlag; //区分打开关闭
      } else if (value === 3) {
        //驱动
        if (that.driveFlag) {
          if (that.typeCarSelect == false) {
            MessageBox.alert("请首先选择车型，才可进行条件筛选");
            return;
          } else {
            that.contentDrive = true; //驱动筛选模块打开
            that.bagMask = true;
            driveImg
              .addClass("iconTrans")
              .parent()
              .siblings()
              .find(".icon")
              .removeClass("iconTrans"); //当前箭头up,其它箭头down
            //进入关闭已经打开的其它筛选模块
            that.contentTypeCar = false;
            that.contentIndustry = false;
            that.contentLoad = false;
            that.contentTraffic = false;
          }
        } else {
          if (that.typeCarSelect == false) {
            //								alert('请首先选择车型，才可进行条件筛选')
            MessageBox.alert("请首先选择车型，才可进行条件筛选");
            return;
          }
          if (that.contentDrive) {
            that.contentDrive = false; //驱动筛选模块关闭

            that.contentTypeCar = false;
            that.contentIndustry = false;
            that.contentLoad = false;
            that.contentTraffic = false;

            that.bagMask = false;
            driveImg.removeClass("iconTrans"); //当前箭头down
          } else {
            that.contentDrive = true; //驱动筛选模块关闭

            that.contentTypeCar = false;
            that.contentIndustry = false;
            that.contentLoad = false;
            that.contentTraffic = false;

            that.bagMask = true;
            driveImg
              .addClass("iconTrans")
              .parent()
              .siblings()
              .find(".icon")
              .removeClass("iconTrans"); //当前箭头down
          }
        }
        that.driveFlag = !that.driveFlag;
      } else if (value === 4) {
        //载重
        if (that.loadFlag) {
          if (that.typeCarSelect == false) {
            MessageBox.alert("请首先选择车型，才可进行条件筛选");
            return;
          } else if (that.driveSelect == false) {
            MessageBox.alert("需选择驱动来区分货物载重");
            return;
          } else {
            that.contentLoad = true; //载重筛选模块打开
            that.bagMask = true;
            loadImg
              .addClass("iconTrans")
              .parent()
              .siblings()
              .find(".icon")
              .removeClass("iconTrans"); //当前箭头up,其它箭头down
            //进入关闭已经打开的其它筛选模块
            that.contentTypeCar = false;
            that.contentIndustry = false;
            that.contentDrive = false;
            that.contentTraffic = false;
          }
        } else {
          if (that.typeCarSelect == false) {
            //								alert('请首先选择车型，才可进行条件筛选')
            MessageBox.alert("请首先选择车型，才可进行条件筛选");
            return;
          }
          if (that.driveSelect == false) {
            //清除驱动的时候没有选择驱动,禁止进入
            MessageBox.alert("需选择驱动来区分货物载重");
            return;
          }
          if (that.contentLoad) {
            that.contentLoad = false; //载重筛选模块关闭

            that.contentTypeCar = false;
            that.contentIndustry = false;
            that.contentDrive = false;
            that.contentTraffic = false;

            that.bagMask = false;
            loadImg.removeClass("iconTrans"); //当前箭头down
          } else {
            that.contentLoad = true; //载重筛选模块关闭

            that.contentTypeCar = false;
            that.contentIndustry = false;
            that.contentDrive = false;
            that.contentTraffic = false;

            that.bagMask = true;
            loadImg
              .addClass("iconTrans")
              .parent()
              .siblings()
              .find(".icon")
              .removeClass("iconTrans"); //当前箭头down
          }
        }
        that.loadFlag = !that.loadFlag;
      } else {
        //路况
        if (that.trafficFlag) {
          if (that.typeCarSelect == false) {
            MessageBox.alert("请首先选择车型，才可进行条件筛选");
            return;
          } else {
            that.contentTraffic = true; //路况筛选模块打开
            that.bagMask = true;
            trafficImg
              .addClass("iconTrans")
              .parent()
              .siblings()
              .find(".icon")
              .removeClass("iconTrans"); //当前箭头up,其它箭头down
            //进入关闭已经打开的其它筛选模块
            that.contentTypeCar = false;
            that.contentIndustry = false;
            that.contentDrive = false;
            that.contentLoad = false;
          }
        } else {
          if (that.typeCarSelect == false) {
            //								alert('请首先选择车型，才可进行条件筛选')
            MessageBox.alert("请首先选择车型，才可进行条件筛选");
            return;
          }
          if (that.contentTraffic) {
            that.contentTraffic = false; //路况筛选模块关闭

            that.contentTypeCar = false;
            that.contentIndustry = false;
            that.contentDrive = false;
            that.contentLoad = false;

            that.bagMask = false;
            trafficImg.removeClass("iconTrans"); //当前箭头down
          } else {
            that.contentTraffic = true; //路况筛选模块打开

            that.contentTypeCar = false;
            that.contentIndustry = false;
            that.contentDrive = false;
            that.contentLoad = false;

            that.bagMask = true;
            trafficImg
              .addClass("iconTrans")
              .parent()
              .siblings()
              .find(".icon")
              .removeClass("iconTrans"); //当前箭头down
          }
        }
        that.trafficFlag = !that.trafficFlag;
      }
      //				this.bagMask = !this.bagMask
    },
    init() {
      let data = {
        configurationTypeId: 1,
        parentId: null
      };
      this.$http.post(Wit.selectValueByType, data).then(res => {
        if (res.data.code == 0) {
          this.chooseList = res.data.data;
        }
	  });
	  this.getcarlist()
    },
    //获取列表
    getcarlist() {
      let data = {
        modelName: this.modelNameCode,
        drive: this.diveCode,
        targetIndustry:this.targetIndustryCode,
        road:this.roadCode,
        load:this.loadCode,
        size: 10,
        current: 1
      };
      this.$http.post(Wit.searchHeavyCarModelListPage,data).then(res => {
        this.carList=res.data.data.records
      });
    },
    close() {
      var that = this;
      var imgs = $(".brain-power-title img");
      Velocity(
        imgs,
        {
          rotateZ: "0deg"
        },
        {
          duration: 250,
          complete: () => {
            that.contentTypeCar = false;
            that.contentIndustry = false;
            that.contentDrive = false;
            that.contentLoad = false;
            that.contentTraffic = false;
          }
        }
      );
      this.bagMask = false;
    },
    closeFilterList(key) {
      // traffic  路况
      // load 载重
      // drive 驱动
      // industry 行业
      // carType 车型
      switch(key){
        case 'traffic':
          this.roadCode=null;
        break;
        case 'load':
          this.loadCode=null;
        break;
        case 'drive':
          this.diveCode=null;
          this.loadCode=null;
        break;
        case 'industry':
          this.targetIndustryCode=null;
        break;
        case 'carType':
          this.targetIndustryCode=null;
          this.diveCode=null;
          this.loadCode=null;
          this.roadCode=null;
          this.modelNameCode=null;
        break;
        default:
        break;
      }
      this.getcarlist()
      //关闭筛选列表
      var that = this;
      Velocity(
        that.$refs[key][0],
        {
          scale: [0.3, 1]
        },
        {
          duration: 200,
          complete: function() {
            (that.filterList[key] = ""), that.$forceUpdate();
            if (key == "drive" && that.filterList["drive"] == "") {
              //驱动筛选条件清除, 载重筛选条件也要消失
              that.driveSelect = false;
              that.filterList["load"] = "";
              that.$forceUpdate();
            }
          }
        }
      );
    },
    beforeEnter(el) {
      el.style.transform = "scale(1)";
    },
    chooseTypeCar(val) {
      //选择车型
      this.typeCarSelect = true; //标识符激活,后面筛选可选
      this.contentTypeCar = false;
      this.bagMask = false;
      $(".typeImg").removeClass("iconTrans");
      //				Vue.$set(this.filterList, 'carType', val.con)
      this.filterList.carType = val.valueName;
      let dataone = {
        configurationTypeId: 2,
        parentId: val.id
      };
      this.$http.post(Wit.selectValueByType, dataone).then(res => {
        if (res.data.code == 0) {
          this.chooseListTwo = res.data.data;
        }
      });
      let datatwo = {
        configurationTypeId: 3,
        parentId: val.id
      };
      this.$http.post(Wit.selectValueByType, datatwo).then(res => {
        if (res.data.code == 0) {
          this.chooseListThree = res.data.data;
        }
      });
      let dataThree = {
        configurationTypeId: 5,
        parentId: val.id
      };
      this.$http.post(Wit.selectValueByType, dataThree).then(res => {
        if (res.data.code == 0) {
          this.chooseListFive = res.data.data;
        }
      });
      this.modelNameCode=val.code
      this.getcarlist()     
    },
    chooseIndustry(val) {
      //选择行业
      this.contentIndustry = false;
      this.bagMask = false;
      $(".industryImg").removeClass("iconTrans");
      //				Vue.$set(this.filterList, 'industry', val.con)
      this.filterList.industry = val.valueName;
      this.targetIndustryCode=val.code
      this.getcarlist()
    },
    chooseDrive(val) {
      //选择驱动
      this.driveSelect = true; //标识符激活,载重筛选可选
      this.contentDrive = false;
      this.bagMask = false;
      $(".driveImg").removeClass("iconTrans");
      //				Vue.$set(this.filterList, 'drive', val.con)
      this.filterList.drive = val.valueName;
      let data = {
        configurationTypeId: 4,
        parentId: val.id
      };
      this.$http.post(Wit.selectValueByType, data).then(res => {
        if (res.data.code == 0) {
          this.chooseListFour = res.data.data;
        }
      });
      this.diveCode=val.code
      this.getcarlist()
    },
    chooseLoad(val) {
      //选择载重
      this.contentLoad = false;
      this.bagMask = false;
      $(".loadImg").removeClass("iconTrans");
      //				Vue.$set(this.filterList, 'load', val.con)
      this.filterList.load = val.valueName;
      this.loadCode=val.code
      this.getcarlist()
    },
    chooseTraffic(val) {
      //选择路况
      this.contentTraffic = false;
      this.bagMask = false;
      $(".trafficImg").removeClass("iconTrans");
      //				Vue.$set(this.filterList, 'traffic', val.con)
      this.filterList.traffic = val.valueName;
      this.roadCode=val.code;
      this.getcarlist()
    }
  }
};
</script>

<style scoped>
/*修改mint-ui自带的样式*/

.intelligent-car >>> .mint-msgbox .mint-msgbox-message {
  text-align: center !important;
}
/*箭头动画*/

.brain-power-title > div > .icon {
  transition: transform 0.25s linear;
}

.brain-power-title > div > .iconTrans {
  transform: rotate(180deg);
  -webkit-transition: transform 0.25s linear;
  -moz-transition: transform 0.25s linear;
  -o-transition: transform 0.25s linear;
  transition: transform 0.25s linear;
}
/*页面标题*/

.header {
  line-height: 0.88rem;
  background: #fff;
  z-index: 11;
}

.header > span {
  position: relative;
  font-size: 0.3rem;
  color: #999999;
}

.header > span.active {
  color: #49bbff;
}

.header > span.active > span {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 0.46rem;
  height: 0.88rem;
  border-bottom: 0.06rem solid #49bbff;
}
/*页面title*/

.brain-power-title {
  position: fixed;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 1rem;
  padding: 0 0.3rem;
  z-index: 110;
  background: #fff;
}

.brain-power-title > div {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
}

.brain-power-title > div > img {
  width: 0.22rem;
  height: 0.12rem;
  margin-left: 0.1rem;
}
/*背景遮罩*/

.bagMask {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  margin: auto;
  background: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
/*过滤列表*/

.filter-list {
  display: flex;
  align-items: center;
  position: fixed;
  top: 1.88rem;
  left: 0;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 1.2rem;
  overflow-y: scroll;
  overflow-scrolling: touch;
}

.animate-box {
  display: flex;
  align-items: center;
  height: 100%;
  white-space: nowrap;
}

.filte-item {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0.6rem;
  line-height: 0.6rem;
  padding: 0 0.2rem;
  margin: 0.1rem;
  background: #f5f5f5;
  border-radius: 0.3rem;
}

.filte-item > span:nth-of-type(1) {
  color: #b4b4b4;
}

.filte-item > span:nth-of-type(2) {
  color: #cccccc;
  padding-left: 0.1rem;
}
/*筛选模块*/

.filter-wrapper {
  position: absolute;
  top: 1.88rem;
  left: 0;
  width: 100%;
  padding: 0.7rem 0.35rem;
  background: #ffffff;
  z-index: 11;
}

.flter-content {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
}

.condition {
  margin-right: 0.4rem;
  margin-bottom: 0.54rem;
  padding: 0.2rem 0.4rem;
  font-size: 0.28rem;
  color: #222222;
  border-radius: 0.08rem;
  background: #f5f5f5;
}
/*车型列表*/

.car-wrapper {
  /*display: none;
		opacity: 0;*/
  position: absolute;
  top: 1.88rem;
  left: 0;
  width: 100%;
  height: 100%;
  padding: 0.3rem;
  overflow: hidden;
}

.car-wrapper > ul {
  /*height: 100vh;*/
}

.car-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.5rem 0rem;
  border-bottom: 1px solid #f1f1f1;
}
/*左*/

.car-img > img {
  width: 2.56rem;
  height: 1.4rem;
}
/*中*/

.car-body {
  margin-left: 0.5rem;
}

.car-special {
  margin: 0.3rem 0rem;
  font-size: 0.26rem;
  color: #49bbff;
}

.car-special div {
  display: inline-block;
  height: 0.4rem;
  line-height: 0.4rem;
  background: #ecf8ff;
  border-radius: 0.08rem;
  text-align: center;
}

.car-info {
  color: #999999;
  font-size: 0.24rem;
}
/*右*/

.car-return {
  width: 0.16rem;
  height: 0.3rem;
}
</style>