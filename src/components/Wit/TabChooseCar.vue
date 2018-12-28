<template>
  <div class="main">
    <header v-if="this.flag" class="nav MobileHeight header ">
      <div  class="navBack" @click="goBack"><img style="width:.4rem;height:.4rem;" :src="'./static/images/back@2x.png'"></div>
      <div class="navTitle">选购瑞风S4</div>
      <div ></div>
    </header>
    <header v-else class="specilheader nav MobileHeight">
      <div >选购瑞风S4</div>
    </header>

    <div class="headerHeight"></div>
    <div v-if="this.flag">
      <div v-if="this.$store.state.currentTitle != '自由型'" class="tab">
        <router-link tag="div" class="tabContent" :to="{path:'/CarChoose'}" >
          车型
        </router-link>
        <router-link tag="div" class="tabContent" :to="{path:'/ColorChoose',query:{currentTitle:this.$store.state.currentTitle,powerTitle:this.$store.state.powerTitle,priceTitle:this.$store.state.priceTitle}}" >
        颜色
        </router-link>
        <router-link tag="div" class="tabContent" :to="{path:'/RimChoose',query:{currentTitle:this.$store.state.currentTitle,powerTitle:this.$store.state.powerTitle,priceTitle:this.$store.state.priceTitle,colorTitle:this.$store.state.colorTitle}}" >
          轮辋
        </router-link>
        <router-link tag="div" class="tabContent" :to="{path:'/VehicleChoose',query:{currentTitle:this.$store.state.currentTitle,powerTitle:this.$store.state.powerTitle,priceTitle:this.$store.state.priceTitle,colorTitle:this.$store.state.colorTitle,rimTitle:this.$store.state.rimTitle}}" >
        选装
        </router-link>
      </div>
      <div v-else-if="this.$store.state.currentTitle == '自由型'"  class="tab">
        <router-link tag="div" class="tabContent" :to="{path:'/CarChoose'}" >
          车型
        </router-link>
        <router-link tag="div" class="tabContent" :to="{path:'/ColorChoose',query:{currentTitle:this.$store.state.currentTitle,powerTitle:this.$store.state.powerTitle,priceTitle:this.$store.state.priceTitle}}" >
          颜色
        </router-link>
      </div>
    </div>
    <div v-else>
      <div v-if="this.$store.state.currentTitle != '自由型'" class="tab">
        <router-link tag="div" class="tabContent" :to="{path:'/CarChoose',query:{lovecar:'notsplovecar'}}" >
          车型
        </router-link>
        <router-link tag="div" class="tabContent" :to="{path:'/ColorChoose',query:{currentTitle:this.$store.state.currentTitle,powerTitle:this.$store.state.powerTitle,priceTitle:this.$store.state.priceTitle,lovecar:'notsplovecar'}}" >
        颜色
        </router-link>
        <router-link tag="div" class="tabContent" :to="{path:'/RimChoose',query:{currentTitle:this.$store.state.currentTitle,powerTitle:this.$store.state.powerTitle,priceTitle:this.$store.state.priceTitle,colorTitle:this.$store.state.colorTitle,lovecar:'notsplovecar'}}" >
          轮辋
        </router-link>
        <router-link tag="div" class="tabContent" :to="{path:'/VehicleChoose',query:{currentTitle:this.$store.state.currentTitle,powerTitle:this.$store.state.powerTitle,priceTitle:this.$store.state.priceTitle,colorTitle:this.$store.state.colorTitle,rimTitle:this.$store.state.rimTitle,lovecar:'notsplovecar'}}" >
        选装
        </router-link>
      </div>
      <div v-else-if="this.$store.state.currentTitle == '自由型'"  class="tab">
        <router-link tag="div" class="tabContent" :to="{path:'/CarChoose'}" >
          车型
        </router-link>
        <router-link tag="div" class="tabContent" :to="{path:'/ColorChoose',query:{currentTitle:this.$store.state.currentTitle,powerTitle:this.$store.state.powerTitle,priceTitle:this.$store.state.priceTitle,lovecar:'notsplovecar'}}" >
          颜色
        </router-link>
      </div>
    </div>
    
    <router-view/>
  </div>
</template>
<script>
  export default{
    data(){
      return {
        currentIndex: 0,
        currentTitle: '超越型',
        flag:true,//判断返回按钮
        carData: [
          {
            id: 1,
            label: '超越型',
            value: '车型:超越型'
          },
          {
            id: 2,
            label: '梦想型',
            value: '车型:梦想型'
          },
          {
            id: 3,
            label: '探索型',
            value: '车型:探索型'
          },
          {
            id: 4,
            label: '自由型',
            value: '车型:自由型'
          }
        ]
      }

    },
    created(){
            this.flag=this.$store.state.noback;
            window.showHeader = this.showHeader;
    },
    mounted(){
      $(".MobileHeight").css({
        "borderTopWidth": this.$store.state.mobileStatusBar,
        "borderTopColor": "#fff",
      })
      //如果从爱车页面进入默认s4系列的车型
      this.$store.state.levelCode= 'CY001'
      this.$store.state.srouceNo='CYRF016'
      this.$store.state.srouceNo='AU112018110106375078380'
      this.$store.state.seriesName='瑞风S4'
      // console.log("this.$store.state.currentTitle",this.$store.state.currentTitle);
    },
    methods:{
      goBack(){
        this.$router.push('/wit/Characteristic');
      },
      showHeader(flag){
        this.flag=flag
        this.$store.state.noback=false;
      },
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
    height:1rem;
    line-height: 1rem;
    position: fixed;
    background-color: #fff;
  }
  .nav div{
    flex: 1;
  }

  .nav .navTitle{
    /*text-align: center;*/
    padding-left: 0.15rem;
    font-size: 0.36rem;
  }
  .headerHeight{
    height: 1.5rem;
  }
  .tab{
    width: 100%;
    position: fixed;
    height: 1rem;
    line-height:1rem;
    /*background-color: red;*/
  }
  .tab .tabContent{
    display: inline-block;
    width: 1.3rem;
    height:1rem;
    line-height:1rem;
    text-align: center;
    color:#6f6f6f;
    font-size: 0.32rem !important;
    /*background-color: #26a2ff;*/
  }
  .tab .router-link-active{
    display: inline-block;
    width: 1.2rem;
    height:1rem;
    line-height:1rem;
    text-align: center;
    color: #222222 !important;
    font-size: 0.38rem !important;
    /*background-color: #26a2ff;*/
  }
  .specilheader{
    text-align: center;
    
  }
  .specilheader>div{
    font-size: .36rem;
  }
</style>
