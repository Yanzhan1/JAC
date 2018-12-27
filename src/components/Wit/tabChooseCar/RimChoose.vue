<template>
  <div class="main">
    <div v-if="this.$route.query.currentTitle == '超越型' || this.$route.query.currentTitle == '梦想型' || this.$route.query.currentTitle == '探索型'">
      <div class="headerHeight"></div>
      <transition name="slide1">
        <div class="contentImg" v-if="flag">
          <div class="carImg" v-for="(item,index) in carRimData" v-show="index === currentIndex">
            <img :src="'./static/images/Wit/whiteBody.png'"/>
            <img v-if="$route.query.colorTitle=='典雅白'" :src="'./static/images/Wit/whiteBody.png'"/>
            <img v-else-if="$route.query.colorTitle=='极光紫'" :src="'./static/images/Wit/purpleBody.png'"/>
            <img v-else-if="$route.query.colorTitle=='琥珀金'" :src="'./static/images/Wit/goldBody.png'"/>
            <img v-else-if="$route.query.colorTitle=='拉菲红'" :src="'./static/images/Wit/redBody.png'"/>
            <img :src="item.img"/>
          </div>
        </div>
      </transition>
      <transition name="slide2">
        <div class="contentCar" v-if="flag">
          <div class="contentCarBtn"  :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" v-for="(item,index) in carData" :key="item.id" @click="carBtn(index,item.label)">
            <img :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" :src="'./static/images/Wit/R17common.png'"/>
            <img  :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" :src="'./static/images/Wit/R18common.png'"/>
            <img :src="item.img">
            <div class="contentCarTitle">{{item.label}}</div>
          </div>
        </div>
      </transition>
      <div class="contentBtn">
        <div class="contentText">
          <div class="priceLabel">{{this.$store.state.priceTitle+this.rimTitlePriceTotal}}万元</div>
          <div class="contentColorBtn2" @click="backChooseBtn">
            << 颜色选择
          </div>
          <div class="contentColorBtn" @click="rimChooseBtn">
            配件选配 >>
          </div>
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
        rimTitlePrice:500,
        rimTitlePriceTotal:0,
        flag:false,
        carData:[
          {
            id:1,
            label:'R17' ,
            value:'轮辋:R17',
            img:'./static/images/Wit/R17common.png',
          },
          {
            id:2,
            label:'R18' ,
            value:'轮辋:R18',
            img:'./static/images/Wit/R18common.png'
          }
        ],
        carRimData:[
          {
            id:1,
            color:'R17' ,//R17普通
            img:'./static/images/Wit/R17.png'
          },
          {
            id:2,
            color:'R18' ,//R18普通
            img:'./static/images/Wit/R18.png'
          }
        ]
      }

    },
    mounted(){
  $(".MobileHeight").css({
					"borderTopWidth": this.$store.state.mobileStatusBar,
					"borderTopColor": "#fff",
				})
      if(this.$store.state.rimTitle == "R17"){
        this.currentIndex = 0
      }else if(this.$store.state.rimTitle == "R18"){
        this.currentIndex = 1
      }
      this.flag = true;
      console.log(" this.$store.state.rimTitle",this.$store.state.rimTitle)
    },
    methods:{
      carBtn(index,labelTitle){
        this.currentIndex = index;
        this.$store.state.rimTitle = labelTitle;
        console.log('this.rimTitle',this.$store.state.rimTitle)
        if(this.$store.state.rimTitle == 'R18'){
          this.$store.state.priceTitle = this.$store.state.priceTitle + this.rimTitlePrice;
          return;
        }else {
          this.$store.state.priceTitle = this.$store.state.priceTitle - this.rimTitlePrice;
        }
      },
      rimChooseBtn(){
//        console.log('this.currentTitle',this.currentTitle)
        this.$router.push({
          path: '/VehicleChoose',
          query: {
            currentTitle:this.$route.query.currentTitle,
            colorTitle:this.$route.query.colorTitle,
            rimTitle:this.$store.state.rimTitle,
            powerTitle:this.$store.state.powerTitle,
            priceTitle:this.$store.state.priceTitle,
            carName:this.$route.query.carName,
          }
        })
      },
      backChooseBtn(){
        this.$router.push({
          path: '/ColorChoose',
          query: {
            currentTitle:this.$store.state.currentTitle,
            powerTitle:this.$store.state.powerTitle,
            priceTitle:this.$store.state.priceTitle,
            colorTitle:this.$store.state.colorTitle,
            carName:this.$route.query.carName
          }
        })
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
    height: 100%;
    background-color: #fff;
  }
  .nav{
    width: 100%;
    height:.88rem;
    line-height: .88rem;
    position: fixed;
    background-color: #fff;
  }
  .nav .navBack{
    padding-left: 0.15rem;
    height:.88rem;
    line-height: .88rem;
  }
  .headerHeight{
    height: 1.5rem;
  }
  .headerHeight2{
    height: 1.5rem;
  }
  .content{
    height: 1.5rem;
    color: #fff;
    margin: 0 0.2rem;
  }
  .content .contentTitle{
    margin-left: 0.2rem;
    font-size: 0.36rem;
    height: 0.9rem;
    line-height: 0.9rem;
    color: rgb(32,32,32);
  }
  .content .contentSmallTitle{
    font-size: 0.28rem;
    color: rgb(111,111,111);
  }
  .content .contentSmallTitle .smallTitle{
    display: inline-block;
    width: 1rem;
    text-align: center;
    border-right: 0.01rem solid rgba(111,111,111,0.6);
  }
  .content .contentSmallTitle .one{
    border-right: none;
  }
  .contentImg{
    width: 100%;
    height: 4rem;
  }
  .carImg{
    position: relative;
    width: 7.2rem;
    height: 4rem;
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
    display: flex;
    height: 3rem;
  }
  .contentCar .contentCarBtn{
    flex: 1;
    height: 3rem;
    line-height: 3rem;
    color:#6f6f6f;
    position: relative;

  }
  .contentCar .contentCarBtn img{
    width: 3.4rem;
    height: 1.9rem;
    position: absolute;
    top:0;
    -webkit-transition: -webkit-transform 0.3s;
    -moz-transition: -moz-transform 0.3s;
    -o-transition: -o-transform 0.3s;
    transition: transform 0.3s;
  }
  .contentCar .contentCarBtn .contentCarTitle{
    height: 1rem;
    line-height: 1rem;
    font-size: 0.32rem !important;
    /*background: green;*/
    text-align: center;
    position: absolute;
    bottom: 0;
    left: 40%;
  }
  .contentCar .contentCarBtn2{
    flex: 1;
    height: 3rem;
    line-height: 3rem;
    color: #222222;
    position: relative;
  }
  .contentCar .contentCarBtn2 img{
    width: 3.8rem;
    height: 2.1rem;
    position: absolute;
    top:0;
    -webkit-transform: scale(1.1);
    -moz-transform: scale(1.1);
    -ms-transform: scale(1.1);
    -o-transform: scale(1.1);
    transform: scale(1.1);
  }
  .contentCar .contentCarBtn2 .contentCarTitle{
    height: 1rem;
    line-height: 1rem;
    font-size: 0.38rem !important;
    text-align: center;
    bottom: 0;
    left: 45%;
  }
  .contentBtn{
    position: fixed;
    width: 100%;
    height: 1rem;
    line-height: 1rem;
    bottom: 0;
    background-color: #fff;
    box-shadow: rgb(182, 181, 181) 0.1rem 0.1rem 0.3rem 0.05rem;
  }
  .contentBtn .contentText{
    width: 100%;
    display: flex;
  }
  .contentBtn .contentText div{
    flex: 1;
  }
  .contentBtn .priceLabel{
    padding-left: 0.3rem;
    height: 1rem;
    line-height:1rem;
    font-size: 0.36rem;
    color: #49BBFF;
  }
  .contentBtn .contentColorBtn{
    padding-right: 0.3rem;
    height: 1rem;
    line-height:1rem;
    font-size: 0.36rem;
    text-align: right;
    color: #49BBFF;
  }
  .contentBtn .contentColorBtn2{
    padding-right: 0.3rem;
    height: 1rem;
    line-height:1rem;
    font-size: 0.36rem;
    text-align: left;
    color: #49BBFF;
  }
  .slide2-enter-active {
    transition: all 2s ease;
  }
  .slide2-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
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
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide1-enter, .slide-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(100px);
    opacity: 0;
  }
</style>


