<template>
  <div>
    <header class="header MobileHeight">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">司机驾驶行为分析</span>
      <span>
        <img
          @click="chooseDate"
          style="width:.34rem;height:.34rem;"
          src="./../../../../static/images/carteam/search@2x.png"
          alt
        >
      </span>
    </header>
    <div style="height:0.88rem" class="MobileHeight"></div>
    <div class="showTime">当前查询时间:{{this.titleTimer}}</div>
    <div style="height:.8rem"></div>
    <mt-datetime-picker
      id="timer"
      v-model="pickerValuestart"
      ref="pickerstart"
      type="date"
      cancelText="取消"
      confirmText="下一步"
      year-format="{value} 年"
      month-format="{value} 月"
      :startDate="startDate"
      :endDate="endDate"
      @confirm="start"
    ></mt-datetime-picker>
    <div class="listed" v-for="(item,index) in this.list" :key="index">
        <div class="title">
            <div class="myFleet">{{item.driverName}}</div>
        </div>
        <div class="flex cocenter content">
          <div class="first">
            <div class="title_top">总里程</div>
            <div class="title_bottom">{{item.behaviorInfoDtos[0].totalMileage}}Km</div>
            <div class="title_top">日平均里程</div>
            <div class="title_bottom">{{item.behaviorInfoDtos[0].averageMileageDay}}Km</div>
          </div>
          <div class="second">
            <div class="title_top">总油耗</div>
            <div class="title_bottom">{{item.behaviorInfoDtos[0].totalWear}}L</div>
            <div class="title_top">日平均油耗</div>
            <div class="title_bottom">{{item.behaviorInfoDtos[0].totalWear}}L</div>
          </div>
          <div class="third">
            <div class="title_top">总工作时长</div>
            <div class="title_bottom">{{item.behaviorInfoDtos[0].totalTime|tohour}}h</div>
            <div class="title_top">日平均工作时长</div>
            <div class="title_bottom">{{item.behaviorInfoDtos[0].averagTimeDay|tohour}}h</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import PublicHead from "./../../publicmodel/PublicHead";
import { DatetimePicker, Toast } from "mint-ui";
export default {
  data(){
    return{
      pickerValuestart:'',
      startDate: new Date(operationTime.getTime((new Date().getTime()-1000*60*60*24*31*6), 4)),
      endDate:new Date(),
      starttime:'',
      startnext:'',
      beginTime:'',
      list:[],
      titleTimer:'',
    }
  },
  components: {
    mhead: PublicHead
  },
  filters:{
    tohour(val){
      if(val){
        return (val/60/60).toFixed(1)
      }else{
        return ''
      }
    }
  },
  methods:{
    chooseDate() {
      this.openPickerstart();
    },
    openPickerstart() {
      this.$refs.pickerstart.open();
      let a = document.getElementsByClassName("picker-slot");
      a[2].style.display = "none";
    },
    start() {
      this.starttime = this.pickerValuestart.getTime();
      this.startnext = new Date(operationTime.getTime(this.starttime, 4));
      this.titleTimer=this.showtitleTimer(new Date(this.starttime))
      this.beginTime = operationTime.getTime(this.starttime, 6);
      this.chooseTimer(this.beginTime)
    },
    changetime(val){
        let year=val.getFullYear();
        let month=val.getMonth()+1;
        month = month < 10 ? "0" + month : "" + month;
        return year + month;
    },
    addstyle() {
      let newNode = document.createElement("span");
      newNode.innerHTML = "选择查询时间";
      console.log($(".mint-datetime-cancel"))
      $(".mint-datetime-cancel")[0].parentNode.insertBefore(
        newNode,
        $(".mint-datetime-cancel")[0].nextSibling
      );
      $(".picker-toolbar")[0].style.cssText =
        "display:flex;justify-content:space-between;align-items: center";
      $(".mint-datetime-cancel")[0].nextSibling.style.cssText =
        "width:2.5rem;text-align:center;font-size:.28rem;";
    },
    chooseTimer(time){
        let params={
        vin:this.$route.query.vin,
        beginDate:time,
        endDate:time
      }
      this.$http.post(Lightcar.driverAnalysisofdriving,params).then(res=>{
        if(res.data.returnSuccess){
          this.$http.post(Lightcar.truckvehicleasyncresults,{operationId:res.data.operationId}).then(res=>{
              if(res.data.returnSuccess){
                this.list=res.data.data
              }
          })
        }
      })
    },
    showtitleTimer(val){
        let year=val.getFullYear();
        let month=val.getMonth()+1;
        return year+'年'+month+'月'
    },
    init(){
      let Timer=this.changetime(new Date())
      this.titleTimer=this.showtitleTimer(new Date())
      this.chooseTimer(Timer)
    }
  },
  mounted(){
    $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
    this.init()
    setTimeout(() => {
      this.addstyle();
    }, 100);
  }
}
</script>

<style scoped>
  .listed{
    height: 2.8rem;
    border-top: .01rem solid #eeeeee;
    border-bottom:.01rem solid #eeeeee;
  }
  .listed .title{
    padding-top: .29rem;
  }
  .listed .title>div{
    margin: 0 .36rem;
  }
  .listed .detail img{
    width: .1rem;
    height: .2rem;
    margin-left: .1rem;
  }
  .listed .title .myFleet{
    font-size:.28rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(73,187,255,1);
  }
  .listed .title .detail>span{
    font-size:.24rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(136,136,136,1);
  }
  .content .first{
    margin-left: .4rem
  }
  .content .second{
    margin-left: 1rem
  }
  .content .third{
    margin-left: 1rem
  }
  .content .title_top{
    font-size:.2rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(136,136,136,1);
  }
  .content .title_bottom{
    font-size:.3rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(34,34,34,1);
  }
  .content>div>div{
    margin: .11rem 0;
  }
  .showTime{
    width: 100%;
    position: fixed;
    text-align: center;
    width: 100%;
    line-height: .8rem;
    background:rgba(248,248,248,1);
    z-index: 2;
    font-size:.24rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(85,85,85,1);
  }
</style>
