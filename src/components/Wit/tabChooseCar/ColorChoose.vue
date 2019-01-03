<template>
  <div class="main">
    <div v-if="this.$store.state.currentTitle == '超越型' || this.$store.state.currentTitle == '梦想型' || this.$store.state.currentTitle == '探索型'">
      <div class="headerHeight"></div>
      <!--<transition name="slide1">-->
      <div class="contentImg">
        <div class="carImg" v-for="(item,index) in carColorData" v-show="index === currentIndex">
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="'./static/images/Wit/whiteBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="'./static/images/Wit/white.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="item.img"/>
        </div>
      </div>
      <!--</transition>-->
      <div class="headerHeight2"></div>
      <!--<transition name="slide">-->
      <div class="contentCar">
        <div class="contentCarBtn"  v-for="(item,index) in carData" :key="item.id" @click="carBtn(index,item.label)">
          <div style="position: relative">
            <img  v-if="item.label == '拉菲红'" class="colorTitle" :class="currentIndex == 0?'colorTitle2':'colorTitle'" :src="'./static/images/Wit/redColor.png'">
            <img v-if="item.label == '典雅白'" class="colorTitle" :class="currentIndex == 1 ?'colorTitle2':'colorTitle'" :src="'./static/images/Wit/whiteColor.png'">
            <img v-if="item.label == '极光紫'" class="colorTitle" :class="currentIndex == 2 ?'colorTitle2':'colorTitle'" :src="'./static/images/Wit/purpleColor.png'">
            <img v-if="item.label == '琥珀金'" class="colorTitle" :class="currentIndex == 3 ?'colorTitle2':'colorTitle'" :src="'./static/images/Wit/goldColor.png'">
            <div class="contentCarBtnTitle" :class="index == currentIndex ?'contentCarBtnTitle2':'contentCarBtnTitle'">{{item.label}}</div>
          </div>
        </div>
      </div>
      <!--</transition>-->
      <div class="contentBtn">
        <div class="contentText">
          <div class="priceLabel">{{this.$store.state.priceTitle}}元</div>
          <div class="contentColorBtn2" @click="backChooseBtn">
            << 车型选择
          </div>
          <div class="contentColorBtn" @click="RimChooseBtn">
            轮辋选择 >>
          </div>
        </div>
      </div>
    </div>
    <div v-else-if="this.$store.state.currentTitle == '自由型'">
      <div class="headerHeight"></div>
      <!--<transition name="slide1">-->
      <div class="contentImg">
        <div class="carImg" v-for="(item,index) in carColorData" v-show="index === currentIndex">
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="'./static/images/Wit/whiteBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="'./static/images/Wit/white.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="item.img"/>
        </div>
      </div>
      <!--</transition>-->
      <div class="headerHeight2"></div>
      <!--<transition name="slide">-->
      <div class="contentCar">
        <div class="contentCarBtn"  v-for="(item,index) in carData" :key="item.id" @click="carBtn(index,item.label)">
          <div style="position: relative">
            <img  v-if="item.label == '拉菲红'" class="colorTitle" :class="currentIndex == 0?'colorTitle2':'colorTitle'" :src="'./static/images/Wit/redColor.png'">
            <img v-if="item.label == '典雅白'" class="colorTitle" :class="currentIndex == 1 ?'colorTitle2':'colorTitle'" :src="'./static/images/Wit/whiteColor.png'">
            <img v-if="item.label == '极光紫'" class="colorTitle" :class="currentIndex == 2 ?'colorTitle2':'colorTitle'" :src="'./static/images/Wit/purpleColor.png'">
            <img v-if="item.label == '琥珀金'" class="colorTitle" :class="currentIndex == 3 ?'colorTitle2':'colorTitle'" :src="'./static/images/Wit/goldColor.png'">
            <div class="contentCarBtnTitle" :class="index == currentIndex ?'contentCarBtnTitle2':'contentCarBtnTitle'">{{item.label}}</div>
          </div>
        </div>
      </div>
      <!--</transition>-->
      <div class="contentBtn">
        <div class="contentText">
          <div class="priceLabel">{{this.$store.state.priceTitle}}元</div>
          <div class="contentColorBtn2" @click="backChooseBtn">
            << 车型选择
          </div>
          <div class="contentColorBtn" @click="previewBtn">
            选配选择 >>
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
        flag:false,
//        colorTitle:'典雅白',
        carData:[
          {
            id:4,
            label:'拉菲红' ,
            value:'外观:拉菲红'
          },
          {
            id:1,
            label:'典雅白' ,
            value:'外观:典雅白'
          },
          {
            id:2,
            label:'极光紫' ,
            value:'外观:极光紫'
          },
          {
            id:3,
            label:'琥珀金' ,
            value:'外观:琥珀金'
          }
        ],
        carColorData:[
          {
            id:4,
            color:'red' ,//拉菲红
            img:'./static/images/Wit/red.png'
          },
          {
            id:1,
            color:'white' ,//典雅白
            img:'./static/images/Wit/white.png'
          },
          {
            id:2,
            color:'purple' ,//极光紫
            img:'./static/images/Wit/purple.png'
          },
          {
            id:3,
            color:'gold' ,//琥珀金
            img:'./static/images/Wit/gold.png'
          },

        ]
      }

    },
    mounted(){
      $(".MobileHeight").css({
        "borderTopWidth": this.$store.state.mobileStatusBar,
        "borderTopColor": "#fff",
      })
      if(this.$store.state.colorTitle == "拉菲红"){
        this.currentIndex = 0
      }else if(this.$store.state.colorTitle == "典雅白"){
        this.currentIndex = 1
      } else if(this.$store.state.colorTitle == "极光紫"){
        this.currentIndex = 2
      }else if(this.$store.state.colorTitle == "琥珀金"){
        this.currentIndex = 3
      }
      this.flag  = true;
    },
    methods:{
      carBtn(index,labelTitle){
        this.currentIndex = index;
        this.$store.state.colorTitle = labelTitle;
//        console.log('this.colorTitle',this.colorTitle)
        if(this.$store.state.colorTitle == '极光紫' || this.$store.state.colorTitle == '琥珀金'){
          if(this.$store.state.show1 == true){
            this.$store.state.priceTitle = this.$store.state.priceTitle - 2000;
            this.$store.state.show1 = false;
          }
        }

        this.flag = true;
      },
      RimChooseBtn(){
        if(this.$store.state.noback){
          
          this.$router.push({
            path: '/RimChoose'
          })
        }else{
          this.$router.push({
            path: '/RimChoose',
            query:{lovecar:'notsplovecar'}
          })
        }
      },
      previewBtn(){//如果是舒适型(自由型)直接跳转到在线订车页面
        this.$router.push({
          path: '/wit/PreviewChoose',
          query: {
            currentTitle:this.$store.state.currentTitle,
            colorTitle:this.$store.state.colorTitle,
            powerTitle:this.$store.state.powerTitle,
            priceTitle:this.$store.state.priceTitle
          }
        })
      },
      backChooseBtn(){
        if(this.$store.state.noback){
          this.$router.push({
            path: '/CarChoose'
          })
        }else{
          this.$router.push({
            path: '/CarChoose',
            query:{lovecar:'notsplovecar'}
          })
        }
//        if(this.$store.state.currentTitle == '自由型'){
//          this.$router.push({
//            path: '/CarChoose',
//            query: {
//              currentTitle:this.$store.state.currentTitle,
//              powerTitle:this.$store.state.powerTitle,
//              priceTitle:this.$store.state.priceTitle,
//              carName:this.$route.query.carName
//            }
//          })
//        }else if(this.$store.state.currentTitle == '超越型'){
//          this.$router.push({
//            path: '/CarChoose',
//            query: {
//              currentTitle:this.$store.state.currentTitle,
//              powerTitle:this.$store.state.powerTitle2,
//              priceTitle:this.$store.state.priceTitle,
//              carName:this.$route.query.carName
//            }
//          })
//        }else if(this.$store.state.currentTitle == '梦想型'){
//          this.$router.push({
//            path: '/CarChoose',
//            query: {
//              currentTitle:this.$store.state.currentTitle,
//              powerTitle:this.$store.state.powerTitle3,
//              priceTitle:this.$store.state.priceTitle,
//              carName:this.$route.query.carName
//            }
//          })
//        } else if(this.$store.state.currentTitle == '探索型'){
//          this.$router.push({
//            path: '/CarChoose',
//            query: {
//              currentTitle:this.$store.state.currentTitle,
//              powerTitle:this.$store.state.powerTitle1,
//              priceTitle:this.$store.state.priceTitle,
//              carName:this.$route.query.carName
//            }
//          })
//        }

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
  /*.nav .navBack{*/
  /*padding-left: 0.15rem;*/
  /*}*/
  .headerHeight{
    height: 2rem;
  }
  .headerHeight2{
    height: 0.5rem;
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
  .contentCar{
    margin: 0 0.2rem;
    display: flex;
    height: 2rem;
    /*background-color: pink;*/
  }
  .contentCar .contentCarBtn{
    flex: 1;
    height: 2rem;
    line-height: 2rem;

  }
  .contentCar .contentCarBtn div .contentCarBtnTitle{
    color:#6f6f6f;
    text-align: center;
    font-size: 0.32rem;
  }
  .contentCar .contentCarBtn div .contentCarBtnTitle2{
    color:#222222;
    text-align: center;
    font-size: 0.36rem;
  }
  .contentCar .contentCarBtn div .colorTitle{
    position: absolute;
    width:0.6rem;
    height:0.6rem;
    left:50%;
    margin-left:-0.30rem;
    -webkit-transform: scale(1.00);
    -moz-transform:scale(1.00);
    -o-transform: scale(1.00);
    transform: scale(1.00);
  }
  .contentCar .contentCarBtn div .colorTitle2{
    position: absolute;
    width:0.6rem;
    height:0.6rem;
    left:50%;
    margin-left:-0.30rem;
    -webkit-transform: scale(1.30);
    -moz-transform:scale(1.30);
    -o-transform: scale(1.30);
    transform: scale(1.30);
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
  .slide-enter-active {
    transition: all 2s ease;
  }
  .slide-leave-active {
    transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
  }
  .slide-enter, .slide-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateX(-100px);
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

