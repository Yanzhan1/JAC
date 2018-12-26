<template>
<div class="main">
  <div class="headerHeight"></div>

  <transition name="slide1">
    <div class="contentImg" v-if="flag">
      <div class="carImg">
        <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;left: 0.25rem" :src="'./static/images/Wit/whiteBody.png'"/>
      </div>
    </div>
  </transition>
  <transition name="slide2" >
    <div class="contentCarIntroduceTitle" v-if="flag">
        <span>{{$store.state.carIntroduceTitle}}</span>
        <span v-if="$store.state.carIntroduceTitle2 != ''">{{$store.state.carIntroduceTitle2}}</span>
    </div>
  </transition>
  <transition name="slide" >
    <div class="contentCar" v-if="flag">
      <div class="contentCarBtn" :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" v-for="(item,index) in carData" :key="item.id" @click="carBtn(index,item.label,item.carTitle,item.carTitle2)">
        {{item.label}}
      </div>
    </div>
  </transition>

    <div style="position: relative;">
      <transition name="slide2">
        <div v-if="flag">
          <img style="width:7rem;height: 3rem;background-size: 100% 100%;position: absolute;left: 0.25rem" v-if="$store.state.currentTitle == '自由型'" :src="'./static/images/Wit/bg1.png'"/>
          <img style="width:7rem;height: 3rem;background-size: 100% 100%;position: absolute;left: 0.25rem" v-if="$store.state.currentTitle == '超越型'" :src="'./static/images/Wit/bg2.png'"/>
          <img style="width:7rem;height: 3rem;background-size: 100% 100%;position: absolute;left: 0.25rem" v-if="$store.state.currentTitle == '梦想型'" :src="'./static/images/Wit/bg3.png'"/>
          <img style="width:7rem;height: 3rem;background-size: 100% 100%;position: absolute;left: 0.25rem" v-if="$store.state.currentTitle == '探索型'" :src="'./static/images/Wit/bg4.png'"/>
        </div>
      </transition>
      <div class="contentCarpowerBg">
      <transition name="slide2">
        <div class="contentCarpower" v-if="flag">
          <div class="contentCarpowerBtn" v-if="$store.state.currentTitle == '自由型'" :class="index == currentIndex2 ?'contentCarpowerBtn2':'contentCarpowerBtn'"  v-for="(item,index) in carPowerData" :key="item.id" @click="carPowerBtn(index,item.label,item.text)">
            {{item.label}}
          </div>
          <div class="contentCarpowerBtn" v-if="$store.state.currentTitle == '超越型'" :class="index == currentIndex4 ?'contentCarpowerBtn2':'contentCarpowerBtn'"  v-for="(item,index) in carPowerData" :key="item.id" @click="carPowerBtn3(index,item.label,item.text)">
            {{item.label}}
          </div>
          <div class="contentCarpowerBtn" v-if="$store.state.currentTitle == '梦想型'" :class="index == currentIndex5 ?'contentCarpowerBtn2':'contentCarpowerBtn'"  v-for="(item,index) in carPowerData" :key="item.id" @click="carPowerBtn4(index,item.label,item.text)">
            {{item.label}}
          </div>
          <div v-if="$store.state.currentTitle == '探索型'" :class="index == currentIndex3 ?'contentCarpowerBtn2':'contentCarpowerBtn'"  v-for="(item,index) in carPowerData2" :key="item.id" @click="carPowerBtn2(index,item.label,item.text)">
            {{item.label}}
          </div>
        </div>
      </transition>
      </div>
    </div>

  <div class="contentBtn">
    <div class="contentText">
      <div v-if="this.$store.state.priceTitle != ''" class="priceLabel">
        {{this.$store.state.priceTitle}}万元
      </div>
      <div class="contentColorBtn" @click="colorChooseBtn">
        颜色选择 >>
      </div>
    </div>
  </div>
</div>
</template>
<script>
export default{
  data(){
    return{
      flag:false,
      currentIndex:0,
      currentIndex2: 0,
      currentIndex3: 0,
      currentIndex4: 0,
      currentIndex5: 0,
      powerFlag: false,
      carData:[
        {
          id:1,
          label:'自由型' ,
          value:'车型:自由型',
          carTitle:'215/50 R17铝轮 TPMS胎压监测',
          carTitle2:'皮质多功能方向盘 ESP车身稳定系统'
        },
        {
          id:2,
          label:'超越型' ,
          value:'车型:超越型',
          carTitle:'10.25寸大屏 天窗',
          carTitle2:'PEPS无钥匙进入及一键启动 智聆车联网3.0系统'
        },
        {
          id:3,
          label:'梦想型' ,
          value:'车型:梦想型',
          carTitle:'主驾驶电动座椅 360全景影像',
          carTitle2:'TESS爆胎应急安全系统'
        },
        {
          id:4,
          label:'探索型' ,
          value:'车型:探索型',
          carTitle:'全景天窗 电动尾门',
          carTitle2:'',
        }
      ],
      carPowerData:[
        {
          id:1,
          label:'1.5T CVT 自动' ,
          value:'1.5T CVT 自动',
          text:80800
        },
        {
          id:2,
          label:'1.6L CVT 自动' ,
          value:'1.6L CVT 自动',
          text:76800
        },
        {
          id:3,
          label:'1.5T 6MT 手动' ,
          value:'1.5T 6MT 手动',
          text:71800
        },
        {
          id:4,
          label:'1.6L 6MT 手动' ,
          value:'1.6L 6MT 手动',
          text:67800,
        }
      ],
      carPowerData2:[
        {
          id:1,
          label:'1.5T CVT 自动' ,
          value:'1.5T CVT 自动',
          text:80800
        },
        {
          id:2,
          label:'1.6L CVT 自动' ,
          value:'1.6L CVT 自动',
          text:76800
        },
        {
          id:3,
          label:'1.5T 6MT 手动' ,
          value:'1.5T 6MT 手动',
          text:71800
        }
      ],
      priceData:[
        {
          id:1,
          label:'8.08' ,
          value:'8.08'
        },
        {
          id:2,
          label:'7.68' ,
          value:'7.68'
        },
        {
          id:3,
          label:'7.18' ,
          value:'7.18'
        },
        {
          id:4,
          label:'6.78' ,
          value:'6.78'
        }
      ]
    }

  },
  mounted(){
//    this. getData();
    $(".MobileHeight").css({
      "borderTopWidth": this.$store.state.mobileStatusBar,
      "borderTopColor": "#fff",
    })
//    alert(this.$store.state.currentTitle);
    if(this.$store.state.currentTitle == "自由型"){
      this.currentIndex = 0;
      this.$store.state.carIntroduceTitle = '215/50 R17铝轮 TPMS胎压监测';
      this.$store.state.carIntroduceTitle2 = '皮质多功能方向盘 ESP车身稳定系统';
      if(this.$store.state.powerTitle == "1.5T CVT 自动"){
        this.currentIndex2 = 0
      }else if(this.$store.state.powerTitle == "1.6L CVT 自动"){
        this.currentIndex2 = 1
      } else if(this.$store.state.powerTitle == "1.5T 6MT 手动"){
        this.currentIndex2 = 2
      }else if(this.$store.state.powerTitle == "1.6L 6MT 手动"){
        this.currentIndex2 = 3
      }
    }else if(this.$store.state.currentTitle == "超越型"){
      this.currentIndex = 1;
      this.$store.state.carIntroduceTitle = '10.25寸大屏 天窗';
      this.$store.state.carIntroduceTitle2 = 'PEPS无钥匙进入及一键启动 智聆车联网3.0系统';
      if(this.$store.state.powerTitle == "1.5T CVT 自动"){
        this.currentIndex4 = 0
      }else if(this.$store.state.powerTitle == "1.6L CVT 自动"){
        this.currentIndex4 = 1
      } else if(this.$store.state.powerTitle == "1.5T 6MT 手动"){
        this.currentIndex4 = 2
      }else if(this.$store.state.powerTitle == "1.6L 6MT 手动"){
        this.currentIndex4 = 3
      }
    } else if(this.$store.state.currentTitle == "梦想型"){
      this.currentIndex = 2;
      this.$store.state.carIntroduceTitle = '主驾驶电动座椅 360全景影像';
      this.$store.state.carIntroduceTitle2 = 'TESS爆胎应急安全系统';
      if(this.$store.state.powerTitle == "1.5T CVT 自动"){
        this.currentIndex5 = 0
      }else if(this.$store.state.powerTitle == "1.6L CVT 自动"){
        this.currentIndex5 = 1
      } else if(this.$store.state.powerTitle == "1.5T 6MT 手动"){
        this.currentIndex5 = 2
      }else if(this.$store.state.powerTitle == "1.6L 6MT 手动"){
        this.currentIndex5 = 3
      }
    }else if(this.$store.state.currentTitle == "探索型"){
      this.currentIndex = 3;
      this.$store.state.carIntroduceTitle = '全景天窗 电动尾门';
      this.$store.state.carIntroduceTitle2 = '';
      if(this.$store.state.powerTitle1 == "1.5T CVT 自动"){
        this.currentIndex3 = 0
      }else if(this.$store.state.powerTitle1 == "1.6L CVT 自动"){
        this.currentIndex3 = 1
      } else if(this.$store.state.powerTitle1 == "1.5T 6MT 手动"){
        this.currentIndex3 = 2
      }
    }

    this.flag  = true;
    console.log(" this.$store.state.currentTitle",this.$store.state.currentTitle)
  },
  methods:{
    getData(){//该右边marginLeft的值
      var _this = this;
      _this.$nextTick(()=>{
        var info = document.getElementsByClassName("contentCarBtn");
        // console.log("----",info)
        var len = info.length;
        if(!(len%2)){
          // console.log(info[len-1])
          info[len-1].style.left = "0.2rem";
          info[len-2].style.right = "0.2rem";
        }else {
          info[len-1].style.marginTop = "0.2rem";
        }

      })
    },
    carBtn(index,labelTitle,carIntroduceTitle,carIntroduceTitle2){
      this.currentIndex = index;
      this.$store.state.currentTitle = labelTitle;
//      alert(carIntroduceTitle,carIntroduceTitle2);
      this.$store.state.carIntroduceTitle = carIntroduceTitle;
      this.$store.state.carIntroduceTitle2 = carIntroduceTitle2;
      this.powerFlag = !this.powerFlag;
      this.flag  = true;
    },
    carPowerBtn(index,labelTitle,text){
//        alert(labelTitle)
      this.currentIndex2 = index;
      this.$store.state.powerTitle = labelTitle;
      this.$store.state.priceTitle = text;

      this.flag  = true;
    },
    carPowerBtn3(index,labelTitle,text){
//        alert(labelTitle)

      this.currentIndex4 = index;
      this.$store.state.powerTitle2 = labelTitle;
      this.$store.state.priceTitle = text;

      this.flag  = true;
    },
    carPowerBtn4(index,labelTitle,text){
//        alert(labelTitle)
      this.currentIndex5 = index;
      this.$store.state.powerTitle3 = labelTitle;
      this.$store.state.priceTitle = text;

      this.flag  = true;
    },
    carPowerBtn2(index,labelTitle,text){
//        alert(labelTitle)
      this.currentIndex3 = index;
      this.$store.state.powerTitle1 = labelTitle;
      this.$store.state.priceTitle = text;

      this.flag  = true;
    },
    priceBtn(labelTitle){
//      alert(labelTitle)
      this.$store.state.priceTitle = labelTitle;
    },
    colorChooseBtn(){
      // console.log('111111',this.$store.state.currentTitle)
      // console.log('22222',this.$store.state.powerTitle)
      // console.log('333333',this.$store.state.priceTitle)
      if(this.$store.state.currentTitle == '自由型'){
        this.$router.push({
          path: '/ColorChoose',
          query: {
            currentTitle:this.$store.state.currentTitle,
            powerTitle:this.$store.state.powerTitle,
            priceTitle:this.$store.state.priceTitle
          }
        })
      }else if(this.$store.state.currentTitle == '超越型'){
        this.$router.push({
          path: '/ColorChoose',
          query: {
            currentTitle:this.$store.state.currentTitle,
            powerTitle:this.$store.state.powerTitle2,
            priceTitle:this.$store.state.priceTitle
          }
        })
      }else if(this.$store.state.currentTitle == '梦想型'){
        this.$router.push({
          path: '/ColorChoose',
          query: {
            currentTitle:this.$store.state.currentTitle,
            powerTitle:this.$store.state.powerTitle3,
            priceTitle:this.$store.state.priceTitle
          }
        })
      } else if(this.$store.state.currentTitle == '探索型'){
        this.$router.push({
          path: '/ColorChoose',
          query: {
            currentTitle:this.$store.state.currentTitle,
            powerTitle:this.$store.state.powerTitle1,
            priceTitle:this.$store.state.priceTitle
          }
        })
      }

    },
    goBack(){

      this.$router.push({
        path: '/wit/TabChooseCar',
        query: {
          currentTitle:this.$store.state.currentTitle
        }
      });
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
.nav div{
  flex: 1;
}
/*.nav .navBack{*/
  /*padding-left: 0.15rem;*/
/*}*/

.nav .navTitle{
  /*text-align: center;*/
  padding-left: 0.15rem;
  font-size: 0.36rem;
}
.headerHeight{
  height: 1.5rem;
}
.headerHeight2{
  height:1.5rem;
}
.headerHeight3{
  height: .9rem;
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
.contentCarIntroduceTitle span{
  display: inline-block;
  width: 100%;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  font-size: 0.24rem;
  color: rgb(182, 181, 181);
}
.contentCar{
  display: flex;
  height: 0.8rem;
}
.contentCar .contentCarBtn{
  flex:1;
  height: 0.8rem;
  line-height: 0.8rem;
  color:#6f6f6f;
  text-align: center;
  font-size: 0.32rem;
}
.contentCar .contentCarBtn2{
  flex:1;
  height: 0.8rem;
  line-height: 0.8rem;
  color: #222222;
  text-align: center;
  font-size: 0.36rem;
}
.contentCarpowerBg {
  position: absolute;
  top:0.6rem;
  left: 0.6rem;
  right: 0.6rem;
}
.contentCarpowerBg .contentCarpower {

  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
  font-size: 0.28rem;
}
.contentCarpowerBg .contentCarpower div{
  width: 2.5rem;
  height: 0.72rem;
  line-height: 0.72rem;
  text-align: center;
  margin: 0.13rem 0.32rem;
}
.contentCarpowerBg .contentCarpower .contentCarpowerBtn{
  color: rgb(182, 181, 181);
  /*background-color: #fff;*/
}
.contentCarpowerBg .contentCarpower  .contentCarpowerBtn2{
  color: #49BBFF;
  background: url("../../../../static/images/Wit/chooseCheck.png") no-repeat;
  background-size: 100% 100%;
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
