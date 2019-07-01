<template>
  	<div>
        <mhead currentTitle="选择车辆"></mhead>
        <div class="flex cocenter between list" v-for="(item,index) in this.list" :key="index" @click="choose(item)">
          <div class="left">
            <div class="plate">{{item.model}}</div>
            <div class="vin">VIN:{{item.vin}}</div>
          </div>
          <div class="middle">{{item.plate}}</div>
           <img class="right" src="./../../../../static/images/nextblue@2x.png" alt="" >
           <!-- <label class="chooseimages" :class="labeldata.indexOf(item.id)!=-1?'active':''" @click="choose(item.id)"></label> -->
        </div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import PublicHead from "./../../publicmodel/PublicHead";
export default {
  data() {
    return {
      list:[],
    };
  },
  components: {
    mhead: PublicHead
  },
  methods: {
    init(){
      let params={
        brandId:this.$store.state.brandId,
        teamId:this.$store.state.FleetInformation.teamId
      }
      this.$http.post(Lightcar.findbindingteamlist,params).then(res=>{
        if(res.data.code==0){
          this.list=res.data.data
        }
      })
    },
    choose(id){
      this.$store.state.vins=id.vin
      if(this.$store.state.identifier=='flowQuery'){
          this.$router.push({
            path:"/lovecar/flowQuery"
          })
      }else if(this.$store.state.identifier=='busTest'){
          this.$router.push({
            path:"/Bus_test"
          })
      }else if(this.$store.state.identifier=='historicalTrack'){
          if (isMobile.iOS()) {
            var params = {
              vin:id.vin
            };
            window.webkit.messageHandlers.carteamHistory.postMessage(params);
          } else if (isMobile.Android()) {
            js2android.carteamHistory(id.vin);
          }
      }
    }
  },
  mounted(){
    this.init()
  }
};
</script>

<style scoped>
.list{
  height: 1.1rem;
  border-bottom: .01rem solid #eeeeee;
}
.list .left{
  margin-left: .3rem;
}
.list .left .plate{
  font-size:.28rem;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(73,187,255,1);
}
.list .left .vin{
  font-size:.22rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.list .middle{
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(85,85,85,1);
  margin-left: 1.5rem;
  margin-top: -.2rem;
}
.list .chooseimages {
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background-image: url("/static/images/Lovecar/loseWindow.png");
  border-radius: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 0.2rem;
  margin-right: .3rem;
}
.list .active {
  background-image: url("/static/images/Lovecar/window2@2x.png");
  width: 0.44rem;
  height: 0.44rem;
  background-size: 100%;
  background-repeat: no-repeat;
}
.list .right{
  width: .1rem;
  height: .2rem;
  margin-right: .3rem;
}
</style>
