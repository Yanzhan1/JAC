<template>
  <div>
    <header class="header MobileHeight">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title" style="margin-left:.6rem">车辆驾驶行为分析</span>
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
    <div class="list" v-for="(item,index) in this.list" :key="index">
        <div class="flex between cocenter title">
            <div class="flex cocenter">
              <div class="myFleet">VIN:{{item.vin}}</div>
            </div>
            <div class="flex cocenter detail" @click="todetail(item.vin)">
                <span>司机详情分析</span>
                <img src="./../../../../static/images/next@2x.png" alt="">
            </div>
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
            <div class="title_bottom">{{item.behaviorInfoDtos[0].averageWearDay}}L</div>
          </div>
          <div class="third">
            <div class="title_top">总工作时长</div>
            <div class="title_bottom">{{item.behaviorInfoDtos[0].totalTime|tohour}}h</div>
            <div class="title_top">日平均工作时长</div>
            <div class="title_bottom">{{item.behaviorInfoDtos[0].averageTimeDay|tohour}}h</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import { DatetimePicker, Toast } from "mint-ui";
import PublicHead from "./../../publicmodel/PublicHead";
export default {
  data(){
    return{
      list:[],
      pickerValuestart:'',
      startDate: new Date(operationTime.getTime((new Date().getTime()-1000*60*60*24*31*6), 2)),
      endDate:new Date(),
      starttime:'',
      startnext:'',
      beginTime:'',
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
      this.startnext = new Date(operationTime.getTime(this.starttime, 2));
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
          teamId:this.$store.state.FleetInformation.teamId,
          beginDate:time,
          endDate:time,
          brandId:this.$store.state.brandId
        }
        this.$http.post(Lightcar.vehicleAnalysisofdriving,params).then(res=>{
          if(res.data.returnSuccess){
            this.$http.post(Lightcar.truckvehicleasyncresults,{operationId:res.data.operationId,brandId:this.$store.state.brandId}).then(res=>{
                if(res.data.returnSuccess){
                  this.list=res.data.data
                }
            })
          }
        })
    },
    todetail(vin){
      this.$router.push({
        path:'/felltManagement/driverBehaviorAnalysis',
        query:{
          vin
        }
      })
    // this.$store.dispatch('FleetBehaviorAnalysis',val)
    },
    changetime(val){
        let year=val.getFullYear();
        let month=val.getMonth()+1;
        month = month < 10 ? "0" + month : "" + month;
        return year + month;
    },
    init(){
      let Timer=this.changetime(new Date())
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
  .list{
    width: 6.9rem;
    height: 2.8rem;
    margin: .4rem auto;
    background:rgba(255,255,255,1);
    box-shadow:0px 0px 12px 0px rgba(0, 0, 0, 0.1);
    border-radius:.1rem;
  }
  .list .title{
    padding-top: .29rem;
  }
  .list .title>div{
    margin: 0 .36rem;
  }
  .list .detail img{
    width: .1rem;
    height: .2rem;
    margin-left: .1rem;
  }
  .list .title .myFleet{
    font-size:.28rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(73,187,255,1);
  }
  .list .title .detail>span{
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
</style>
