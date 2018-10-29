<template>
  <div class="main">
    <header class="MobileHeight header nav">
			<div  @click="goBack"><img style="width:.4rem;height:.4rem;" :src="'./static/images/back@2x.png'"></div>
		</header>
    <!-- <div class="nav">
      <div class="navBack" @click="goBack">
        <img style="width: 0.4rem;height: 0.65rem;padding-top: 0.2rem" src="../../../static/images/back@2x.png">
      </div>
    </div> -->
    <div v-if="this.$route.query.currentTitle == '豪华型'">
      <div class="headerHeight"></div>
      <div class="content">
        <div class="contentTitle">颜色选择</div>
        <div class="contentSmallTitle">
          <span class="smallTitle">车型</span>
          <span class="smallTitle">外观</span>
          <span class="smallTitle">轮辋</span>
          <span class="smallTitle one">选配</span>
        </div>
      </div>
      <div class="headerHeight2"></div>
      <div class="contentImg">
        <div class="carImg" v-for="(item,index) in carColorData" v-show="index === currentIndex">
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="'./static/images/Wit/whiteBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="'./static/images/Wit/white.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="item.img"/>
        </div>
      </div>
      <div class="contentCar">
        <div class="contentCarBtn"  :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" v-for="(item,index) in carData" :key="item.id" @click="carBtn(index,item.label)">
          {{item.label}}
        </div>
      </div>
      <div class="contentBtn">
        <div class="contentColorBtn" @click="RimChooseBtn">
          轮辋选择 >>
        </div>
      </div>
    </div>
    <div v-if="this.$route.query.currentTitle == '舒适型'">
      <div class="headerHeight"></div>
      <div class="content">
        <div class="contentTitle">颜色选择</div>
        <div class="contentSmallTitle">
          <span class="smallTitle">车型</span>
          <span class="smallTitle">外观</span>
        </div>
      </div>
      <div class="headerHeight2"></div>
      <div class="contentImg">
        <div class="carImg" v-for="(item,index) in carColorData" v-show="index === currentIndex">
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="'./static/images/Wit/whiteBody.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="'./static/images/Wit/white.png'"/>
          <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;top: 0;left:0.25rem" :src="item.img"/>
        </div>
      </div>
      <div class="contentCar">
        <div class="contentCarBtn"  :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" v-for="(item,index) in carData" :key="item.id" @click="carBtn(index,item.label)">
          {{item.label}}
        </div>
      </div>
      <div class="contentBtn">
        <div class="contentColorBtn" @click="reserveBtn">
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
        colorTitle:'典雅白',
        carData:[
          {
            id:1,
            label:'典雅白' ,
            value:'外观:典雅白'
          },
          {
            id:2,
            label:'激光紫' ,
            value:'外观:激光紫'
          },
          {
            id:3,
            label:'琥珀金' ,
            value:'外观:琥珀金'
          },
          {
            id:4,
            label:'拉菲红' ,
            value:'外观:拉菲红'
          }
        ],
        carColorData:[
          {
            id:1,
            color:'white' ,//典雅白
            img:'../../../static/images/Wit/white.png'
          },
          {
            id:2,
            color:'purple' ,//激光紫
            img:'../../../static/images/Wit/purple.png'
          },
          {
            id:3,
            color:'gold' ,//琥珀金
            img:'../../../static/images/Wit/gold.png'
          },
          {
            id:4,
            color:'red' ,//拉菲红
            img:'../../../static/images/Wit/red.png'
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
        this.colorTitle = labelTitle;
        console.log('this.colorTitle',this.colorTitle)

      },
      RimChooseBtn(){
//        console.log('this.currentTitle',this.currentTitle)
        this.$router.push({
          path: '/wit/RimChoose',
          query: {
            currentTitle:this.$route.query.currentTitle,
            colorTitle:this.colorTitle,

          }
        })
      },
      reserveBtn(){//如果是舒适型直接跳转到在线订车页面
        this.$router.push({
          path: '/wit/Reserve',
          query: {
            currentTitle:this.$route.query.currentTitle,
            colorTitle:this.colorTitle,

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
    height:.88rem;
    line-height: .88rem;
    padding-left: 0.15rem;
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
    border-right: 0.01rem solid #fff;
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
    color:#6f6f6f;
    text-align: center;
    font-size: 0.32rem;
  }
  .contentCar .contentCarBtn2{
    flex: 1;
    height: 2rem;
    line-height: 2rem;
    color: #222222;
    text-align: center;
    font-size: 0.36rem;
    /*font-weight: 700;*/
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

