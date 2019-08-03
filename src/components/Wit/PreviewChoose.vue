<template>
  <div class="main">
    <header class="nav MobileHeight header ">
      <div v-show="this.$store.state.noback" class="navBack" @click="goBack"><img style="width:.4rem;height:.4rem;" :src="'./static/images/back@2x.png'"></div>
      <div class="navTitle"></div>
      <div></div>
    </header>

    <div v-if="this.$route.query.currentTitle == '自由型'">
      <div class="headerHeight"></div>
      <!--<transition name="slide">-->
      <div class="content">
        <div class="contentTitle">瑞风S4</div>
        <div class="contentSmallTitle">
          <div class="small">
            <span class="smallTitle">车型</span>
            <span class="smallTitleContent">{{this.$store.state.currentTitle}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="smallTitleContent">{{this.$store.state.powerTitle}}</span>
          </div>
          <div class="small">
            <span class="smallTitle">颜色</span>
            <span class="smallTitleContent">{{this.$store.state.colorTitle}}</span>
          </div>
        </div>
      </div>
      <!--</transition>-->
      <div class="headerHeight2"></div>
      <!--<transition name="slide1">-->
      <div class="contentImg">
        <div class="carImg">
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-if="this.$store.state.colorTitle=='典雅白'" :src="'./static/images/Wit/whiteBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="this.$store.state.colorTitle=='极光紫'" :src="'./static/images/Wit/purpleBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="this.$store.state.colorTitle=='琥珀金'" :src="'./static/images/Wit/goldBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="this.$store.state.colorTitle=='拉菲红'" :src="'./static/images/Wit/redBody.png'"/>
        </div>
      </div>
      <!--</transition>-->
      <div class="contentBtn">
        <div class="contentText">
          <div class="priceLabel">{{this.$store.state.priceTitle}}元</div>
          <div class="contentColorBtn2" @click="resetChooseBtn">
            << 重新选择
          </div>
          <div class="contentColorBtn" @click="confirmChooseBtn">
            确定选择 >>
          </div>
        </div>
      </div>
    </div>
    <div v-if="this.$store.state.currentTitle == '超越型' || this.$store.state.currentTitle == '梦想型' || this.$store.state.currentTitle == '探索型'||this.$store.state.currentTitle == '梦想II型' ">
      <div class="headerHeight3"></div>
      <!--<transition name="slide">-->
      <div class="content">
        <div class="contentTitle">瑞风S4</div>
        <div class="contentSmallTitle">
          <div class="small">
            <span class="smallTitle">车型</span>
            <span class="smallTitleContent">{{this.$store.state.currentTitle}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
            <span class="smallTitleContent">{{this.$store.state.powerTitle}}</span>
          </div>
          <div class="small">
            <span class="smallTitle">颜色</span>
            <span class="smallTitleContent">{{this.$store.state.colorTitle}}</span>
          </div>
        </div>
      </div>
      <!--</transition>-->
      <div class="contentImg">
        <!--<transition name="slide1">-->
        <div class="carImg">
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-if="this.$store.state.colorTitle=='典雅白'" :src="'./static/images/Wit/whiteBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="this.$store.state.colorTitle=='极光紫'" :src="'./static/images/Wit/purpleBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="this.$store.state.colorTitle=='琥珀金'" :src="'./static/images/Wit/goldBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="this.$store.state.colorTitle=='拉菲红'" :src="'./static/images/Wit/redBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="this.$store.state.colorTitle=='梦想蓝'" :src="'./static/images/Wit/BLUEBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-show="this.$store.state.colorTitle=='典雅白' && this.$store.state.outType == '双色车身'"  :src="whiteDouble"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-show="this.$store.state.colorTitle=='拉菲红' && this.$store.state.outType == '双色车身'"  :src="redDouble"/>
          <img v-if="this.$store.state.rimTitle=='R18'" :src="'./static/images/Wit/R18.png'">
          <img v-else-if="this.$store.state.rimTitle=='R17'" :src="'./static/images/Wit/R17.png'">
        </div>
        <!--</transition>-->
      </div>
      <!-- <div class="contentCar">

        <div class="contentCarBtn" >
          <div>
            <img class="leftImg2" v-if="this.$store.state.rimTitle =='R17'" :src="carWheelCommonR17">
            <img class="leftImg2" v-else-if="this.$store.state.rimTitle =='R18'" :src="carWheelCommonR18">
          </div>
          <div class="middleTitle">{{this.$store.state.rimTitle}}</div>
        </div>

        <div class="contentCarBtn" v-if="this.$store.state.LEDType != ''">
          <div class="contentPic">
            <img class="leftImg" :src="imgLED">
          </div>
          <div class="middleTitle">LED前大灯&nbsp;&nbsp;¥1000</div>
        </div>
        <div class="contentCarBtn" v-if="this.$store.state.outType == '双色车身'">
          <div>
            <img class="leftImg3" v-if="this.$store.state.colorTitle=='典雅白'" :src="imgBody2">
            <img class="leftImg3" v-if="this.$store.state.colorTitle=='极光紫'" :src="imgBody3">
            <img class="leftImg3" v-if="this.$store.state.colorTitle=='琥珀金'" :src="imgBody4">
            <img class="leftImg3" v-if="this.$store.state.colorTitle=='拉菲红'" :src="imgBody5">
          </div>
          <div class="middleTitle">双色车身&nbsp;&nbsp;¥2000</div>
        </div>
      </div> -->
      <div class="contentBtn">
        <div class="contentText">
          <div class="priceLabel">{{this.$store.state.priceTitle}}元</div>
          <div class="contentColorBtn2" @click="resetChooseBtn">
            << 重新选择
          </div>
          <div class="contentColorBtn" @click="confirmChooseBtn">
            确定选择 >>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currentIndex: 0,
      vehicleData: [],
      flag: false,
      show: true,
      show1: true,
      show2: true,
      url: "./static/images/Wit/unChecked@2x.png",
      url1: "./static/images/Wit/checked@2x_89.png",
      imgLED: "./static/images/Wit/LED@2x.png",
      imgLED1: "./static/images/Wit/LED@2x.png",
      imgBody1: "./static/images/Wit/white@2x.png",
      imgBody2: "./static/images/Wit/whiteBodyDouble2.png",
      //        imgBody2:'./static/images/Wit/whiteBodyDouble@2x.png',
      imgBody3: "./static/images/Wit/purpleBodyDouble@2x_22.png",
      imgBody4: "./static/images/Wit/goldBodyDouble@2x_7.png",
      imgBody5: "./static/images/Wit/redBodyDouble2.png",
      //        imgBody5:'./static/images/Wit/redBodyDouble@2x_28.png',
      whiteDouble: "./static/images/Wit/whiteDouble.png",
      purpleDouble: "./static/images/Wit/purpleDouble.png",
      goldDouble: "./static/images/Wit/goldDouble.png",
      redDouble: "./static/images/Wit/redDouble.png",
      whiteNormal: "./static/images/Wit/whiteBody.png",
      purpleNormal: "./static/images/Wit/purpleBody.png",
      goldNormal: "./static/images/Wit/goldBody.png",
      redNormal: "./static/images/Wit/redBody.png",
      carWheelCommonR17: "./static/images/Wit/R17common.png",
      carWheelCommonR18: "./static/images/Wit/R18common.png",
      carWheelR17: "./static/images/Wit/R17Text.png",
      carWheelR18: "./static/images/Wit/R18Text.png",
      carWheelR17Text: "./static/images/Wit/R17-TESS@2x.png",
      carWheelR18Text: "./static/images/Wit/R18-TESS@2x.png",
      carBody: "",
      wheels: "",
      carData: [
        {
          id: 1,
          label: "LED大灯",
          value: "LED大灯",
          img: "./static/images/Wit/LED@2x.png"
        },
        {
          id: 2,
          label: "双色车身",
          value: "双色车身",
          img: "双色车身"
        },
        {
          id: 3,
          label: "防爆胎装置",
          value: "防爆胎装置",
          img: "防爆胎装置"
        }
      ],

      imgsrc: "",
      carRimData: [
        {
          id: 1,
          color: "LED大灯", //LED大灯
          img: "LED大灯"
        },
        {
          id: 2,
          color: "双色车身", //R18普通
          img: "./static/images/Wit/white@2x.png"
        },
        {
          id: 3,
          color: "防爆胎装置", //R18普通
          img: "./static/images/Wit/R17-TESS@2x.png"
        }
      ]
    };
  },
  mounted() {
    $(".MobileHeight").css({
      borderTopWidth: this.$store.state.mobileStatusBar,
      borderTopColor: "#fff"
    });

    this.flag = true;
  },
  methods: {
    confirmChooseBtn() {
      this.vehicleData = [];
      var carType = "车型：" + this.$store.state.currentTitle;
      var carPowerType = "动力:" + this.$store.state.powerTitle;
      var outType =
        "外观：" + this.$store.state.outType + this.$store.state.colorTitle;
      var wheelType = "轮辋：" + this.$store.state.rimTitle;
      var LEDLampType = this.$store.state.LEDType;
      var LEDType = "LED大灯:" + LEDLampType;
      var priceType = "价格:" + this.$store.state.priceTitle;
      if (LEDLampType != "") {
        this.vehicleData.push(LEDType);
      }
      this.vehicleData.push(
        carType,
        outType,
        carPowerType,
        wheelType,
        priceType
      );
      this.$router.push({
        path: "/wit/Reserve",
        query: {
          vehicleData: this.vehicleData
        }
      });
    },
    resetChooseBtn() {
      this.$store.state.currentTitle = "梦想型";
      this.$store.state.powerTitle = "1.5T CVT 自动";
      this.$store.state.priceTitle = 88800;
      this.$store.state.colorTitle = "典雅白";
      this.$store.state.rimTitle = "R17";
      this.$store.state.show = false;
      this.$store.state.show1 = false;
      if (this.$store.state.noback) {
        this.$router.push({
          path: "/CarChoose"
        });
      } else {
        this.$router.push({
          path: "/CarChoose",
          query: { lovecar: "notsplovecar" }
        });
      }
    },
    goBack() {
      //        this.$store.state.priceTitle = this.$route.query.priceTitle;
      if (this.$store.state.currentTitle == "自由型") {
        this.$router.push({
          path: "/ColorChoose"
        });
      } else if (this.$store.state.currentTitle != "自由型") {
        this.$router.push({
          path: "/VehicleChoose"
        });
      }
    }
  }
};
</script>
<style scoped>
.MobileHeight {
  border-top-style: solid;
  box-sizing: content-box;
}
.main {
  /*background-color: #ccc;*/
  height: 100%;
  background-color: #fff;
}
.nav {
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  position: fixed;
  background-color: #fff;
}
.nav div {
  flex: 1;
}

.nav .navTitle {
  /*text-align: center;*/
  padding-left: 0.15rem;
  font-size: 0.36rem;
}
.headerHeight {
  height: 1.5rem;
}
.headerHeight2 {
  height: 1rem;
}
.headerHeight3 {
  height: 1.5rem;
}
.content {
  height: 1.5rem;
  margin: 0 0.2rem;
}
.content .contentTitle {
  margin-left: 0.2rem;
  font-size: 0.36rem;
  color: #222;
  height: 0.9rem;
  line-height: 0.9rem;
}
.content .contentSmallTitle {
  font-size: 0.28rem;
}
.content .contentSmallTitle .small {
  /*border-right: 0.01rem solid rgba(111,111,111,0.6);*/
  /*display: inline-block;*/
  padding: 0.1rem 0.2rem;
}
.content .contentSmallTitle .small .smallTitle {
  font-size: 0.26rem;
  color: #606060;
}
.content .contentSmallTitle .small .smallTitleContent {
  font-size: 0.3rem;
  color: #454545;
}
.content .contentSmallTitle .one {
  border-right: none;
}
.contentImg {
  width: 100%;
  height: 4rem;
}
.carImg {
  width: 7.2rem;
  height: 4rem;
  position: relative;
}
.contentImg .carImg img {
  width: 7.2rem;
  height: 4rem;
  background-size: 100% 100%;
  position: absolute;
  top: 0;
  left: 0.25rem;
}
.contentCar {
  margin: 0 0.2rem;
  height: 5.5rem;
}
.contentCar .contentCarBtn {
  display: flex;
  margin: 0 0.2rem;
  height: 1.8rem;
  line-height: 1.8rem;
  background-color: #fff;
  /*border-bottom: 1px solid rgb(232, 232, 232);*/
  /*box-shadow: rgb(182, 181, 181) 0.1rem 0.1rem 0.3rem 0.05rem;*/
}
.contentCar .contentCarBtn .contentPic {
  flex: 1;
}
.contentCar .contentCarBtn .leftImg {
  /*margin: 0.2rem 0.2rem 0.2rem 0;*/
  width: 2rem;
  height: 1.4rem;
  line-height: 1.4rem;
  background-size: 100% 100%;
  /*border:1px solid #ccc;*/
}
.contentCar .contentCarBtn .leftImg3 {
  margin: 0.2rem 0.2rem 0.2rem 0;
  width: 2rem;
  height: 1rem;
  line-height: 1rem;
  background-size: 100% 100%;
  /*border:1px solid #ccc;*/
}
.contentCar .contentCarBtn .leftImg2 {
  margin-left: -0.2rem;
  width: 2.4rem;
  height: 1.4rem;
  line-height: 1.4rem;
  background-size: 100% 100%;
  /*border:1px solid #ccc;*/
}
.contentCar .contentCarBtn .middleTitle {
  /*margin: 0.2rem 0;*/
  flex: 2;
  font-size: 0.32rem;
  text-align: left;
  font-weight: 400;
  height: 1.4rem;
  line-height: 1.4rem;
  padding-left: 0.08rem;
}
.contentCar .contentCarBtn .rightBtn {
  position: relative;
  height: 2rem;
  line-height: 2rem;
}
.contentCar .contentCarBtn .rightBtn .rightBtnContent {
  position: relative;
  width: 0.8rem;
  height: 0.8rem;
  left: 0.9rem;
  top: 0.6rem;
}

.contentBtn {
  position: fixed;
  width: 100%;
  height: 1rem;
  line-height: 1rem;
  bottom: 0;
  box-shadow: rgb(182, 181, 181) 0.1rem 0.1rem 0.3rem 0.05rem;
  background-color: #fff;
}
.contentBtn .contentText {
  width: 100%;
  display: flex;
}
.contentBtn .contentText div {
  flex: 1;
}
.contentBtn .priceLabel {
  padding-left: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.36rem;
  color: #49bbff;
}
.contentBtn .contentColorBtn {
  padding-right: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.36rem;
  text-align: right;
  color: #49bbff;
}
.contentBtn .contentColorBtn2 {
  padding-right: 0.3rem;
  height: 1rem;
  line-height: 1rem;
  font-size: 0.36rem;
  text-align: left;
  color: #49bbff;
}
.slide-enter-active {
  transition: all 2s ease;
}
.slide-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide-enter, .slide-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(-100px);
  opacity: 0;
}
.slide2-enter-active {
  transition: all 2s ease;
}
.slide2-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide2-enter, .slide-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(150px);
  opacity: 0;
}
.slide1-enter-active {
  transition: all 2s ease;
}
.slide1-leave-active {
  transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
}
.slide1-enter, .slide-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(100px);
  opacity: 0;
}
</style>



