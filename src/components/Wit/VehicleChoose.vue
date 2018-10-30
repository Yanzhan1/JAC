<template>
  <div class="main">
    <header class="nav MobileHeight header">
			<div class="navBack"  @click="goBack"><img style="width:.4rem;height:.4rem;margin-left:-.15rem" :src="'./static/images/back@2x.png'"></div>
      <div class="navTitle">车辆选装</div>
      <div></div>
		</header>
    <!-- <div class="nav">
      <div class="navBack" @click="goBack"><img style="width:.4rem;height:.4rem;" src="../../../static/images/back@2x.png"></div>
      <div class="navTitle">车辆选装</div>
      <div></div>
    </div> -->
    <div v-if="this.$route.query.currentTitle == '豪华型'">
      <div class="headerHeight"></div>
      <div class="content">
        <div class="contentTitle">车辆选装</div>
        <div class="contentSmallTitle">
          <div class="small">
            <span class="smallTitle">车型</span>
            <span class="smallTitleContent">{{$route.query.currentTitle}}</span>
          </div>
          <div class="small">
            <span class="smallTitle">车身颜色</span>
            <span class="smallTitleContent">{{$route.query.colorTitle}}</span>
          </div>
          <div class="small one">
            <span class="smallTitle">轮辋</span>
            <span class="smallTitleContent">{{$route.query.rimTitle}}</span>
          </div>
        </div>
      </div>
      <div class="contentImg">
        <div class="carImg">
          <img style="" v-if="$route.query.colorTitle=='典雅白'" :src="'./static/images/Wit/whiteBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="$route.query.colorTitle=='激光紫'" :src="'./static/images/Wit/purpleBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="$route.query.colorTitle=='琥珀金'" :src="'./static/images/Wit/goldBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-else-if="$route.query.colorTitle=='拉菲红'" :src="'./static/images/Wit/redBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-show="!show1"  :src="carBody"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0" v-show="!show2"  :src="wheels"/>
        </div>

      </div>
      <div class="contentCar">
        <div class="contentCarBtn">
          <div>
            <img class="leftImg" :src="show?imgLED1:imgLED">
          </div>
          <div class="middleTitle">LED大灯</div>
          <div class="rightBtn" >
            <div  class="rightBtnContent" @click="carBtn(0)">
              <img style="width:.6rem;height:.7rem;padding-top: 0.1rem;padding-left: 0.02rem" :src="show?url:url1">
            </div>
          </div>
        </div>
        <div class="contentCarBtn">
          <div>
            <img class="leftImg" v-if="$route.query.colorTitle=='典雅白'" :src="imgBody2">
            <img class="leftImg" v-if="$route.query.colorTitle=='激光紫'" :src="imgBody3">
            <img class="leftImg" v-if="$route.query.colorTitle=='琥珀金'" :src="imgBody4">
            <img class="leftImg" v-if="$route.query.colorTitle=='拉菲红'" :src="imgBody5">
            <!--<img class="leftImg" :src="this.show1 ? imgBody1 :carSmallBody">-->
          </div>
          <div class="middleTitle">双色车身</div>
          <div class="rightBtn" >
            <div  class="rightBtnContent" @click="carBtn(1)">
              <img  style="width:.6rem;height:.7rem;padding-top: 0.1rem;padding-left: 0.02rem" :src="show1?url:url1">
            </div>
          </div>
        </div>
        <div class="contentCarBtn">
          <div>
            <img class="leftImg" v-if="$route.query.rimTitle=='R17'" :src="carWheelR17Text">
            <img class="leftImg" v-else-if="$route.query.rimTitle=='R18'" :src="carWheelR18Text">
          </div>
          <div class="middleTitle">防爆胎装置</div>
          <div class="rightBtn" >
            <div  class="rightBtnContent" @click="carBtn(2)">
              <img style="width:.6rem;height:.7rem;padding-top: 0.1rem;padding-left: 0.02rem" :src="show2?url:url1">
            </div>
          </div>
        </div>
      </div>
      <div class="contentBtn">
        <div class="contentColorBtn" @click="confirmChooseBtn">
          确定选择 >>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default{
    data(){
      return{
        currentIndex:0,
        vehicleData:[],
        show:true,
        show1:true,
        show2:true,
        url:'./static/images/Wit/unChecked@2x.png',
        url1:'./static/images/Wit/checked@2x_89.png',
        imgLED:'./static/images/Wit/LED@2x.png',
        imgLED1:'./static/images/Wit/LED@2x.png',
        imgBody1:'./static/images/Wit/white@2x.png',
        imgBody2:'./static/images/Wit/whiteBodyDouble@2x.png',
        imgBody3:'./static/images/Wit/purpleBodyDouble@2x_22.png',
        imgBody4:'./static/images/Wit/goldBodyDouble@2x_7.png',
        imgBody5:'./static/images/Wit/redBodyDouble@2x_28.png',
        whiteDouble:'./static/images/Wit/whiteDouble.png',
        purpleDouble:'./static/images/Wit/purpleDouble.png',
        goldDouble:'./static/images/Wit/goldDouble.png',
        redDouble:'./static/images/Wit/redDouble.png',
        whiteNormal:'./static/images/Wit/whiteBody.png',
        purpleNormal:'./static/images/Wit/purpleBody.png',
        goldNormal:'./static/images/Wit/goldBody.png',
        redNormal:'./static/images/Wit/redBody.png',
        carWheelR17:'./static/images/Wit/R17Text.png',
        carWheelR18:'./static/images/Wit/R18Text.png',
        carWheelR17Text:'./static/images/Wit/R17-TESS@2x.png',
        carWheelR18Text:'./static/images/Wit/R18-TESS@2x.png',
        carBody:'',
        wheels:'',
        carData:[
          {
            id:1,
            label:'LED大灯' ,
            value:'LED大灯',
            img:'./static/images/Wit/LED@2x.png',
          },
          {
            id:2,
            label:'双色车身' ,
            value:'双色车身',
            img:'双色车身',
          },
          {
            id:3,
            label:'防爆胎装置' ,
            value:'防爆胎装置',
            img:'防爆胎装置',
          }
        ],

        imgsrc:'',
        carRimData:[
          {
            id:1,
            color:'LED大灯' ,//LED大灯
            img:'LED大灯'
          },
          {
            id:2,
            color:'双色车身' ,//R18普通
            img:'./static/images/Wit/white@2x.png'
          },
          {
            id:3,
            color:'防爆胎装置' ,//R18普通
            img:'./static/images/Wit/R17-TESS@2x.png'
          }
        ]
      }

    },
    mounted(){
          $(".MobileHeight").css({
					"borderTopWidth": this.$store.state.mobileStatusBar,
					"borderTopColor": "#fff",
				})
    },
    methods:{
      carBtn(index){
        this.currentIndex = index;
        console.log(this.currentIndex )

        if(this.currentIndex == 0){
          this.show = !this.show
          this.imgsrc = this.show ? this.imgLED2:this.imgLED;
        }else if(this.currentIndex == 1){
          this.show1 = !this.show1
          var bodyColor = this.$route.query.colorTitle
          if(bodyColor == '典雅白'){
            this.carBody = this.show1?this.whiteNormal:this.whiteDouble;
          }else if(bodyColor == '激光紫'){
            this.carBody = this.show1?this.purpleNormal:this.purpleDouble;
          }else if(bodyColor == '琥珀金'){
            this.carBody = this.show1?this.goldNormal:this.goldDouble;
          }else if(bodyColor == '拉菲红'){
            this.carBody = this.show1?this.redNormal:this.redDouble;
          }
        }else if(this.currentIndex == 2){
          this.show2 = !this.show2
          var bodyColor = this.$route.query.rimTitle
          if(bodyColor == 'R17'){
            this.wheels = this.show2?this.carWheelR17:this.carWheelR17;
          }else if(bodyColor == 'R18'){
            this.wheels = this.show2?this.carWheelR18:this.carWheelR18;
          }
        }
      },
      confirmChooseBtn(){
        this.vehicleData = [];
        var carType = "车型："+this.$route.query.currentTitle;
        var outType= this.show1 ? "外观："+this.$route.query.colorTitle :"外观：双色车身"+this.$route.query.colorTitle;
        var wheelType = this.show2 ?"轮辋："+this.$route.query.rimTitle : "轮辋：防爆胎装置"+this.$route.query.rimTitle;
        var LEDType= this.show ? '' : "LED大灯：LED大灯";
        if(LEDType != ''){
          this.vehicleData.push(LEDType);
        }

        this.vehicleData.push(carType,outType,wheelType);
        console.log('vehicleData',this.vehicleData);

        this.$router.push({
          path: '/wit/Reserve',
          query: {
            vehicleData:this.vehicleData
          }
        })

      },
      goBack(){
        this.$router.go(-1);
      }
    }
  }
</script>
<style scoped>
	.MobileHeight {
		border-top-style: solid;
		box-sizing: content-box;
	}
  .main{
    background-color: #fff;
    height: 100%;
  }
  .nav{
    display: flex;
    position: fixed;
    width: 100%;
    height:.88rem;
    line-height: .88rem;
    background-color: #fff;
    z-index: 9999;
    top:0;
  }
  .nav div{
    flex: 1;
  }
  .nav .navBack{
    padding: 0.2rem 0 0.2rem 0.15rem;

  }
  .nav .navTitle{
    text-align: center;
    font-size: 0.36rem;
  }
  .headerHeight{
    height: 1.5rem;
  }
  .content{
    height: 1.5rem;
    margin: 0 0.2rem;
  }
  .content .contentTitle{
    margin-left: 0.2rem;
    font-size: 0.36rem;
    color:#222;
    height: 0.9rem;
    line-height: 0.9rem;

  }
  .content .contentSmallTitle{
    font-size: 0.28rem;
  }
  .content .contentSmallTitle .small{
    border-right: 0.01rem solid #222;
    display: inline-block;
    padding: 0 0.13rem;
  }
  .content .contentSmallTitle .small .smallTitle{
    font-size: 0.26rem;
    color:#606060;
  }
  .content .contentSmallTitle .small .smallTitleContent{
    font-size: 0.3rem;
    color:#454545;
  }
  .content .contentSmallTitle .one{
    border-right: none;
  }
  .contentImg{
    width: 100%;
    height: 4rem;
  }
  .carImg{
    width: 7.2rem;
    height: 4rem;
    position: relative;
  }
  .contentImg .carImg img{
    width:7.2rem;
    height: 4rem;
    background-size: 100% 100%;
    position: absolute;
    top: 0;
    left:0.25rem;
  }
  .contentCar{
    margin: 0 0.2rem;
    height: 8rem;
  }
  .contentCar .contentCarBtn{
    display: flex;
    margin: 0.5rem 0.15rem;
    height: 2rem;
    line-height: 2rem;
    background-color: #fff;
    box-shadow: darkgrey 0.1rem 0.1rem 0.3rem 0.05rem;

  }
  .contentCar .contentCarBtn div{
    flex: 1;
  }
  .contentCar .contentCarBtn .leftImg{
    margin: 0.3rem 0.2rem;
    width: 2rem;
    height: 1.4rem;
    line-height: 1.4rem;
    background-size: 100% 100%;
    border:1px solid #ccc;
  }
  .contentCar .contentCarBtn .middleTitle{
    font-size: 0.32rem;
    text-align: center;
    font-weight: 400;
  }
  .contentCar .contentCarBtn .rightBtn{
    position: relative;
    height: 2rem;
    line-height: 2rem;
  }
  .contentCar .contentCarBtn .rightBtn .rightBtnContent{
    position: relative;
    width: 0.8rem;
    height: 0.8rem;
    left: 0.9rem;
    top:0.6rem;
    /*background-color: #26a2ff;*/
  }

  .contentBtn{
    height: 0.88rem;
    line-height:0.88rem;
    background-color: rgb(80,188,252);
    bottom: 0;
  }
  .contentBtn .contentColorBtn{
    font-size: 0.36rem;
    color: #fff;
    text-align: center;
  }
</style>


