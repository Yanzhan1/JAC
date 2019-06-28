<template>
  <div>
    <mhead currentTitle="车辆驾驶行为分析"></mhead>
    <div class="list">
        <div class="flex between cocenter title">
            <div class="flex cocenter">
              <div class="myFleet">宝马XX</div>
              <div class="plate">浙A9999</div>
            </div>
            <div class="flex cocenter detail" @click="todetail()">
                <span>详情</span>
                <img src="/static/images/next@2x.png" alt="">
            </div>
        </div>
        <div class="flex cocenter content">
          <div class="first">
            <div class="title_top">总里程</div>
            <div class="title_bottom">10000Km</div>
            <div class="title_top">日平均里程</div>
            <div class="title_bottom">100Km</div>
          </div>
          <div class="second">
            <div class="title_top">总油耗</div>
            <div class="title_bottom">8888L</div>
            <div class="title_top">日平均油耗</div>
            <div class="title_bottom">88L</div>
          </div>
          <div class="third">
            <div class="title_top">总工作时长</div>
            <div class="title_bottom">200h</div>
            <div class="title_top">日平均工作时长</div>
            <div class="title_bottom">10h</div>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import PublicHead from "./../../publicmodel/PublicHead";
export default {
  data(){
    return{
      list:[],
    }
  },
  components: {
    mhead: PublicHead
  },
  methods:{
    todetail(){
      this.$router.push({
        path:'/felltManagement/VehicleBehaviorAnalysisSurface'
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
      let startTime=this.changetime(new Date(new Date()-1000*60*60*24*31*6))
      let endTime=this.changetime(new Date())
      let params={
        teamId:this.$store.state.FleetInformation.teamId,
        beginDate:startTime,
        endDate:endTime
      }
      this.$http.post(Lightcar.vehicleAnalysisofdriving,params).then(res=>{
        if(res.data.returnSuccess){
          this.$http.post(Lightcar.truckvehicleasyncresults,{operationId:res.data.operationId}).then(res=>{
              if(res.data.returnSuccess){
                this.list=res.data.data
              }
          })
        }
      })
    }
  },
  mounted(){
    this.init()
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
  .list .title .plate{
    margin-left: .42rem;
    font-size:.22rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(136,136,136,1);
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
