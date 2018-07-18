<template>
    <div>
      <div class="myheader">
        <div>
          <img src="../../static/images/discover/shaixuan.png" @click="publish" style="width: 0.4rem;"/>
        </div>
        <div style="" class="head-tab"  :class="{ recommand: isRecommand }" @click.stop.prevent="goIsRecommand">
          <span class="size_36">推荐</span>
        </div>
        <div style="" class="head-tab" :class="{ allActivity: isAllActivity }"  @click.stop.prevent="goAllActivity">
          <span class="size_36">活动</span>
        </div>
        <div style="" class="head-tab" :class="{ now: isNow }" @click.stop.prevent="goIsNow">
          <span class="size_36">社区</span>
        </div>
        <div style="" class="head-tab" :class="{ information: isInformation }" @click.stop.prevent="goInformation">
          <span class="size_36">资讯</span>
        </div>
        <div>
          <img src="../../static/images/discover/camera.png" @click="publish" style="width: 0.4rem;" id='id_publish'/>
        </div>
      </div>
    </div>
</template>

<script>
  /*import Mine from "./publicmodule/Mine.vue";*/
  export default {
    data() {
      return {
        isRecommand: true,
        isInformation: true,
        isAllActivity: true,
        isNow: true,
        isQuestion: true
      }
    },
    components: {
      /*Mine*/
    },
    methods: {
      popupVisibleChange:function () {
        this.$refs.mine.popupVisibleChange()
      },
      goIsRecommand: function() {
        this.$router.push('/recommend')
        this.isRecommand = true
        this.isInformation = false
        this.isAllActivity = false
        this.isNow = false
        this.isQuestion = false
      },
      goInformation: function() {
        this.$router.push('/information')
        this.isInformation = true
        this.isRecommand = false
        this.isAllActivity = false
        this.isNow = false
        this.isQuestion = false
      },
      goAllActivity: function() {
        this.$router.push("/activity")
        this.isAllActivity = true
        this.isRecommand = false
        this.isInformation = false
        this.isNow = false
        this.isQuestion = false
      },
      goIsNow: function() {
        this.$router.push("/now")
        this.isNow = true
        this.isRecommand = false
        this.isInformation = false
        this.isAllActivity = false
        this.isQuestion = false
      },
      goQuestion: function() {
        this.isNow = false
        this.isRecommand = false
        this.isInformation = false
        this.isAllActivity = false
        this.isQuestion = true
      },
      //发布心情
      publish:function () {
         this.$router.push({path:"/now/addPic"})
        /*if (isMobile.iOS()) {
          window.webkit.messageHandlers.send.postMessage("");
        } else if(isMobile.Android()) {
          NativeJavaScriptInterface.send("圈子");
        }*/
      },
    },
    mounted:function() {
        this.isInformation = false
        this.isAllActivity = false
        this.isNow = false
        this.isQuestion = false
        var temp =window.location.href ;
        var flag = temp.substring(temp.length-3);
        var all = temp.substring(temp.length-8);
        if(all == 'question'){
          this.isNow = false
          this.isRecommand = false
          this.isInformation = false
          this.isAllActivity = false
          this.isQuestion = true
        }else{
            if(flag == 'ity'){
              this.isAllActivity = true
              this.isRecommand = false
              this.isInformation = false
              this.isNow = false
              this.isQuestion = false
            }else if(flag == 'now'){
              this.isAllActivity = false
              this.isRecommand = false
              this.isInformation = false
              this.isNow = true
              this.isQuestion = false
            }else if(flag == 'ion'){
              this.isAllActivity = false
              this.isRecommand = false
              this.isInformation = true
              this.isNow = false
              this.isQuestion = false
            }
        }
    }
  }
</script>

<style scoped>
  @import "./../../static/css/discover/all.css";
  .top-pic img{
    width: 0.48rem;height: 0.48rem;position: relative;top: 16%;
  }
  .recommand,.information,.allActivity,.now,.question {
    border-bottom: 0.04rem solid #49BBFF;
    color: #49BBFF;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .myheader {
    font-size: 0.4rem;
    position: fixed;
    width: 100%;
    background: #ffffff;
    height: .88rem;
    line-height: .88rem;
    padding: 0 .4rem 0;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    top: 0;
    z-index: 999;
  }
  .size_36{
    font-size: 0.36rem;
  }
</style>
