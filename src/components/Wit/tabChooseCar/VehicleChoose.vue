<template>
  <div class="main">
    <div v-if="this.$store.state.currentTitle == '超越型' || this.$store.state.currentTitle == '梦想型' || this.$store.state.currentTitle == '探索型'">
      <div class="headerHeight"></div>
      <transition name="slide1">
        <div class="contentImg" v-if="flag">
          <div class="carImg">
            <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-if="this.$store.state.colorTitle=='典雅白'" :src="'./static/images/Wit/whiteBody.png'"/>
            <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="this.$store.state.colorTitle=='极光紫'" :src="'./static/images/Wit/purpleBody.png'"/>
            <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="this.$store.state.colorTitle=='琥珀金'" :src="'./static/images/Wit/goldBody.png'"/>
            <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="this.$store.state.colorTitle=='拉菲红'" :src="'./static/images/Wit/redBody.png'"/>
            <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-show="this.$store.state.show1 && (this.$store.state.colorTitle=='典雅白' || this.$store.state.colorTitle=='拉菲红')"  :src="carBody"/>
            <!--<img v-if="$route.query.rimTitle=='R18'" :src="'./static/images/Wit/R18.png'">-->
            <!--<img v-else-if="$route.query.rimTitle=='R17'" :src="'./static/images/Wit/R17.png'">-->
            <!--<img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-show="!show2"  :src="wheels"/>-->
          </div>
        </div>
      </transition>
      <transition name="slide2">
        <div class="contentCar" v-if="flag">
          <div class="contentCarBtn">
            <div>
              <img class="leftImg" :src="this.$store.state.show?imgLED1:imgLED">
            </div>
            <div class="middleTitle"><span>LED前大灯</span><span>+&nbsp;¥1000</span></div>
            <div class="rightBtn" >
              <div  class="rightBtnContent" @click="carBtn(0)">
                <img style="width:.6rem;height:.7rem;padding-top: 0.1rem;padding-left: 0.02rem" :src="this.$store.state.show?url1:url">
              </div>
            </div>
          </div>
          <div class="contentCarBtn" v-if="this.$store.state.colorTitle=='典雅白' || this.$store.state.colorTitle=='拉菲红' ">
            <div>
              <img class="leftImg" v-if="this.$store.state.colorTitle=='典雅白'" :src="imgBody2">
              <img class="leftImg" v-if="this.$store.state.colorTitle=='极光紫'" :src="imgBody3">
              <img class="leftImg" v-if="this.$store.state.colorTitle=='琥珀金'" :src="imgBody4">
              <img class="leftImg" v-if="this.$store.state.colorTitle=='拉菲红'" :src="imgBody5">
              <!--<img class="leftImg" :src="this.show1 ? imgBody1 :carSmallBody">-->
            </div>
            <div class="middleTitle"><span>新潮双色车身</span><span>+&nbsp;¥2000</span></div>
            <div class="rightBtn" >
              <div  class="rightBtnContent" @click="carBtn(1)">
                <img  style="width:.6rem;height:.7rem;padding-top: 0.1rem;padding-left: 0.02rem" v-if="this.$store.state.colorTitle=='典雅白' || this.$store.state.colorTitle=='拉菲红' " :src="this.$store.state.show1?url1:url">
              </div>
            </div>
          </div>
        </div>
      </transition>
      <div class="headerHeight"></div>

      <div class="contentBtn">
        <div class="contentText">
          <div class="priceLabel">{{this.$store.state.priceTitle}}元</div>
          <div class="contentColorBtn2" @click="backChooseBtn">
            << 轮辋选择
          </div>
          <div class="contentColorBtn" @click="previeChooseBtn">
            选配预览 >>
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
      //        show:true,
      //        show1:true,
      //        show2:true,
      show3: true,
      show4: true,
      flag: false,
      url: "./static/images/Wit/unCheck.png",
      url1: "./static/images/Wit/check.png",
      imgLED: "./static/images/Wit/LED@2x.png",
      imgLED1: "./static/images/Wit/LED@2x.png",
      imgBody1: "./static/images/Wit/white@2x.png",
      imgBody2: "./static/images/Wit/whiteBodyDouble@2x.png",
      imgBody3: "./static/images/Wit/purpleBodyDouble@2x_22.png",
      imgBody4: "./static/images/Wit/goldBodyDouble@2x_7.png",
      imgBody5: "./static/images/Wit/redBodyDouble@2x_28.png",
      whiteDouble: "./static/images/Wit/whiteDouble.png",
      purpleDouble: "./static/images/Wit/purpleDouble.png",
      goldDouble: "./static/images/Wit/goldDouble.png",
      redDouble: "./static/images/Wit/redDouble.png",
      whiteNormal: "./static/images/Wit/whiteBody.png",
      purpleNormal: "./static/images/Wit/purpleBody.png",
      goldNormal: "./static/images/Wit/goldBody.png",
      redNormal: "./static/images/Wit/redBody.png",
      carWheelR17: "./static/images/Wit/R17Text.png",
      carWheelR18: "./static/images/Wit/R18Text.png",
      carWheelR17Text: "./static/images/Wit/R17-TESS@2x.png",
      carWheelR18Text: "./static/images/Wit/R18-TESS@2x.png",
      carBody: "./static/images/Wit/whiteDouble.png",
      wheels: "",
      increasePrice: 1000,
      increasePrice2: -1000,
      increasePrice3: 2000,
      increasePrice4: -2000,
      totalPrice: 0,
      totalPrice2: 0,
      totalPrice3: 0,
      totalPrice4: 0,
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
        }
      ]
    };
  },
  mounted() {
    $(".MobileHeight").css({
      borderTopWidth: this.$store.state.mobileStatusBar,
      borderTopColor: "#fff"
    });
    if (this.$store.state.show == true) {
      this.currentIndex = 0;
      if(this.$store.state.colorTitle == '拉菲红'){
        this.carBody = this.redDouble;
      }else if(this.$store.state.colorTitle == '典雅白'){
        this.carBody = this.whiteDouble;
      }
    } else if (this.$store.state.show1 == true) {
      this.currentIndex = 1;
      if(this.$store.state.colorTitle == '拉菲红'){
        this.carBody = this.redDouble;
      }else if(this.$store.state.colorTitle == '典雅白'){
        this.carBody = this.whiteDouble;
      }
    }
    this.flag = true;
  },
  methods: {
    carBtn(index) {
      this.currentIndex = index;
      if (this.currentIndex == 0) {
        this.$store.state.show = !this.$store.state.show;

        this.imgsrc = this.$store.state.show ? this.imgLED2 : this.imgLED;
        this.totalPrice = !this.$store.state.show
          ? this.increasePrice2
          : this.increasePrice;
        this.$store.state.priceTitle =
          this.$store.state.priceTitle + this.totalPrice;
      } else if (this.currentIndex == 1) {
        var bodyColor = this.$store.state.colorTitle;
        if (bodyColor == "典雅白") {
          this.$store.state.show1 = !this.$store.state.show1;
          this.carBody = !this.$store.state.show1
            ? this.whiteNormal
            : this.whiteDouble;
          this.totalPrice2 = !this.$store.state.show1
            ? this.increasePrice4
            : this.increasePrice3;
          this.$store.state.priceTitle =
            this.$store.state.priceTitle + this.totalPrice2;
        } else if (bodyColor == "极光紫") {
          this.carBody = this.purpleNormal;
        } else if (bodyColor == "琥珀金") {
          this.carBody = this.goldNormal;
        } else if (bodyColor == "拉菲红") {
          this.$store.state.show1 = !this.$store.state.show1;
          this.carBody = !this.$store.state.show1
            ? this.redNormal
            : this.redDouble;
          this.totalPrice2 = !this.$store.state.show1
            ? this.increasePrice4
            : this.increasePrice3;
          this.$store.state.priceTitle =
            this.$store.state.priceTitle + this.totalPrice2;
        }
      }
    },
    previeChooseBtn() {
      this.$store.state.outType = !this.$store.state.show1
        ? "车身"
        : "双色车身";
      this.$store.state.LEDType = !this.$store.state.show ? "" : "LED前大灯";
      // alert(this.$store.state.priceTitle);
        this.$router.push({
          path: "/wit/PreviewChoose"
        });
    },
    backChooseBtn() {
      if (this.$store.state.noback) {
        this.$router.push({
          path: "/RimChoose"
        });
      } else {
        this.$router.push({
          path: "/RimChoose",
          query: { lovecar: "notsplovecar" }
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
  background-color: #fff;
  height: 100%;
}
.nav {
  display: flex;
  position: fixed;
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  background-color: #fff;
  z-index: 9999;
  top: 0;
}
.nav div {
  /* flex: 1; */
}
.nav .navBack {
  /* padding: 0.2rem 0 0.2rem 0.15rem; */
}
.nav .navTitle {
  text-align: center;
  font-size: 0.36rem;
}
.headerHeight {
  height: 2rem;
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
  border-right: 0.01rem solid rgba(111, 111, 111, 0.6);
  display: inline-block;
  padding: 0 0.13rem;
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
  margin: 0.5rem 0.15rem;
  height: 2rem;
  line-height: 2rem;
  background-color: #fff;
  box-shadow: rgb(182, 181, 181) 0.1rem 0.1rem 0.3rem 0.05rem;
}
.contentCar .contentCarBtn div {
  flex: 1;
}
.contentCar .contentCarBtn .leftImg {
  margin: 0.3rem 0.2rem;
  width: 2rem;
  height: 1.4rem;
  line-height: 1.4rem;
  background-size: 100% 100%;
  border: 1px solid #ccc;
}
.contentCar .contentCarBtn .middleTitle {
  margin-top: 0.3rem;
  font-size: 0.32rem;
  text-align: left;
  font-weight: 400;
  height: 0.6rem;
  line-height: 0.6rem;
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
  background-color: #fff;
  box-shadow: rgb(182, 181, 181) 0.1rem 0.1rem 0.3rem 0.05rem;
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


