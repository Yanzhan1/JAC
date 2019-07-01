<template>
  	<div>
        <mhead currentTitle="添加车辆"></mhead>
        <div class="flex cocenter between listlist" v-for="(item,index) in this.list" :key="index">
          <div class="left">
            <div class="plate">{{item.model}}</div>
            <div class="vin">VIN:{{item.vin}}</div>
          </div>
          <div class="middle">{{item.plate}}</div>
           <label class="chooseimages" :class="labeldata.indexOf(item.id)!=-1?'active':''" @click="choose(item.id)"></label>
        </div>
        <div class="sure" @click="sure">确定</div>
    </div>
</template>
<script>
import {Toast} from 'mint-ui'
import PublicHead from "./../../publicmodel/PublicHead";
export default {
  data() {
    return {
      labeldata:[],
      again:[],
      list:[],
    };
  },
  components: {
    mhead: PublicHead
  },
  methods: {
    init(){
      let params={
        brandId:this.$store.state.brandId
      }
      this.$http.post(Lightcar.findunbindingteamlist,params).then(res=>{
        if(res.data.code==0){
          this.list=res.data.data
        }
      })
    },
    choose(id){
      this.labeldata.push(id)
      let newarr=this.labeldata.sort()
      this.again=[]
      for(let i=0;i<newarr.length;i++){
          if(newarr[i]==newarr[i+1]){
              this.again.push(newarr[i])
          }
      }
      for(let val of this.again){
          for(let i=0;i<this.labeldata.length;i++){
              if(this.labeldata[i]==val){
                  this.labeldata.splice(i,1)
                  i--
              }
          }
      }
    },
    sure(){
      let params={
        teamId:this.$store.state.FleetInformation.teamId,
        brandId:this.$store.state.brandId,
        vehicles:this.labeldata
      }
      this.$http.post(Lightcar.updatebindingteamlist,params).then(res=>{
        if(res.data.code==0){
            Toast({
							message: '添加成功',
							position: 'middle',
							duration: 1000
            });
            this.$router.push('/felltManagement/Editteam')
        }else{
          Toast({
							message: res.data.msg,
							position: 'middle',
							duration: 1000
						});
        }
      })
    }
  },
  mounted(){
    this.init()
  }
};
</script>

<style scoped>
.listlist{
  height: 1.1rem;
  border-bottom: .01rem solid #eeeeee;
  background:#ffffff;
}
.listlist .left{
  margin-left: .3rem;
}
.listlist .left .plate{
  font-size:.28rem;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(73,187,255,1);
}
.listlist .left .vin{
  font-size:.22rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.listlist .middle{
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(85,85,85,1);
  margin-left: 1.5rem;
  margin-top: -.2rem;
}
.listlist .chooseimages {
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
.listlist .active {
  background-image: url("/static/images/Lovecar/window2@2x.png");
  width: 0.44rem;
  height: 0.44rem;
  background-size: 100%;
  background-repeat: no-repeat;
}
.listlist div{
  border: none;
}
.sure{
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: .98rem;
  text-align: center;
  background: #49BBFF;
  color: #ffffff;
}
</style>
