<template>
<div class="main">
    <header class="nav MobileHeight header ">
			<div  @click="goBack"><img style="width:.4rem;height:.4rem;" :src="'./static/images/back@2x.png'"></div>
		</header>
  <!-- <div class="nav">
    <div class="navBack" @click="goBack">
      <img style="width: 0.4rem;height: 0.65rem;padding-top: 0.2rem" src="../../../static/images/back@2x.png">
    </div>
  </div> -->
  <div class="headerHeight"></div>
  <div class="content">
    <div class="contentTitle">车型选择</div>
    <div class="contentSmallTitle">
      <span class="smallTitle">车型</span>
      <span class="smallTitle">外观</span>
      <span class="smallTitle">轮辋</span>
      <span class="smallTitle one">选配</span>
    </div>
  </div>
  <div class="headerHeight2"></div>
  <div class="contentImg">
    <div class="carImg">
      <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;left: 0.25rem" :src="'./static/images/Wit/whiteBody.png'"/>
    </div>
  </div>
  <div class="contentCar">
    <div class="contentCarBtn"  :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" v-for="(item,index) in carData" :key="item.id" @click="carBtn(index,item.label)">
      {{item.label}}
    </div>
  </div>
  <div class="contentBtn">
      <div class="contentColorBtn" @click="colorChooseBtn">
        颜色选择 >>
      </div>
  </div>
</div>
</template>
<script>
export default{
  data(){
    return{
        currentIndex:0,
        currentTitle:'豪华型',
        carData:[
          {
            id:1,
            label:'豪华型' ,
            value:'车型:豪华型'
          },
          {
            id:2,
            label:'舒适型' ,
            value:'车型:舒适型'
          }
        ]
    }

  },
  mounted(){
    this.getData();
            $(".MobileHeight").css({
					"borderTopWidth": this.$store.state.mobileStatusBar,
					"borderTopColor": "#fff",
				})
  },
  methods:{
    getData(){//该右边marginLeft的值
      var _this = this;
      _this.$nextTick(()=>{
        var info = document.getElementsByClassName("contentCarBtn");
        console.log("----",info)
        var len = info.length;
//          alert(len)
        for(let i = 0 ;i < len; i++){
          if(i%2){
            info[i].style.marginLeft = "0.2rem";
          }
        }
      })
    },
    carBtn(index,labelTitle){
      this.currentIndex = index;
      this.currentTitle = labelTitle;
      console.log('this.currentTitle',this.currentTitle)

    },
    colorChooseBtn(){
      console.log('this.currentTitle',this.currentTitle)
      this.$router.push({
        path: '/wit/ColorChoose',
        query: {
          currentTitle:this.currentTitle
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
  /*background-color: #ccc;*/
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
}
.headerHeight{
  height: 1.5rem;
}
.headerHeight2{
  height: .5rem;
}
.content{
  height: 1.5rem;
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
  width: 7.2rem;
  height: 4rem;
  position: relative;
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
  background-color: rgba(232,232,232,0.3);
  text-align: center;
  font-size: 0.32rem;
  font-weight: 700;
}
.contentCar .contentCarBtn2{
  flex: 1;
  height: 2rem;
  line-height: 2rem;
  background-color: rgb(232,232,232);
  text-align: center;
  font-size: 0.32rem;
  font-weight: 700;
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
