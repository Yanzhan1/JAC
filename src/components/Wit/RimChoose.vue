<template>
  <div class="main">
    <header class="MobileHeight header nav">
			<div  @click="goBack"><img style="width:.4rem;height:.4rem;" :src="'./static/images/back@2x.png'"></div>
		</header>
    <div v-if="this.$route.query.currentTitle == '超越型' || this.$route.query.currentTitle == '梦想型' || this.$route.query.currentTitle == '探索型'">
      <div class="headerHeight"></div>
      <div class="content">
        <div class="contentTitle">轮辋选择</div>
        <div class="contentSmallTitle">
          <span class="smallTitle">车型</span>
          <span class="smallTitle">颜色</span>
          <span class="smallTitle">轮辋</span>
          <span class="smallTitle one">选配</span>
        </div>
      </div>
      <div class="headerHeight2"></div>
      <div class="contentImg">
        <div class="carImg" v-for="(item,index) in carRimData" v-show="index === currentIndex">
          <img :src="'./static/images/Wit/whiteBody.png'"/>
          <img v-if="$route.query.colorTitle=='典雅白'" :src="'./static/images/Wit/whiteBody.png'"/>
          <img v-else-if="$route.query.colorTitle=='极光紫'" :src="'./static/images/Wit/purpleBody.png'"/>
          <img v-else-if="$route.query.colorTitle=='琥珀金'" :src="'./static/images/Wit/goldBody.png'"/>
          <img v-else-if="$route.query.colorTitle=='拉菲红'" :src="'./static/images/Wit/redBody.png'"/>
          <img :src="item.img"/>
        </div>
      </div>
      <div class="contentCar">
        <div class="contentCarBtn"  :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" v-for="(item,index) in carData" :key="item.id" @click="carBtn(index,item.label)">
          <img :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" :src="'./static/images/Wit/R17common.png'"/>
          <img  :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" :src="'./static/images/Wit/R18common.png'"/>
          <img :src="item.img">
          <div class="contentCarTitle">{{item.label}}</div>
        </div>
      </div>
      <div class="contentBtn">
        <div class="contentColorBtn" @click="rimChooseBtn">
          车型选装 >>
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
        rimTitle:'R17',
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
    },
    methods:{
      carBtn(index,labelTitle){
        this.currentIndex = index;
        this.rimTitle = labelTitle;
        console.log('this.rimTitle',this.rimTitle)

      },
      rimChooseBtn(){
//        console.log('this.currentTitle',this.currentTitle)
        this.$router.push({
          path: '/wit/VehicleChoose',
          query: {
            currentTitle:this.$route.query.currentTitle,
            colorTitle:this.$route.query.colorTitle,
            rimTitle:this.rimTitle,
            carName:this.$route.query.carName,
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
    /*background-color: pink;*/
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
    height: 3.5rem;
    /*background-color: green;*/
  }
  .contentBtn .contentColorBtn{
    padding-top: 1.2rem;
    height: 0.88rem;
    line-height:0.88rem;
    font-size: 0.36rem;
    color: rgb(111,111,111);
    text-align: center;
  }
</style>


