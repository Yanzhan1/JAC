<template>
    <div>
        <mhead currentTitle="车辆信息"></mhead>
        <div class="information">
            <div class="flex between cocenter top">
                <div class="carname">{{this.list.model}}</div>
                <div class="dvin">VIN:{{this.list.vin}}</div>
            </div>
            <div class="flex cocenter between middle">
                <div>车牌</div>
                <div>里程</div>
                <div>油耗</div>
            </div>
            <div class="flex cocenter between bottom">
                <div>{{this.list.plate}}</div>
                <div>{{this.list.mileage}}KM</div>
                <div>{{this.list.averageFuelConsumption}}L/H</div>
            </div>
        </div>
        <div class="bindeddriver">
            <div class="title">已绑定司机</div>
            <div class="flex between drivers cocenter" v-for="(item,index) in this.driverList" :key="index">
              <div>
                <div>{{item.driverName}}</div>
                <div class="timer">{{item.startTime|changTime}}至{{item.overTime|changTime}}</div>
              </div>
               <img src="./../../../../static/images/carteam/deletecar@2x.png" alt="" @click="deteledrive(item.id)">
            </div>
        </div>
        <div class="adddriverbtn flex contentcenter " @click="bindingDriver">
            <img src="./../../../../static/images/carteam/adddriver@2x.png" alt="">
            <div >绑定司机</div>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import PublicHead from "./../../publicmodel/PublicHead";
export default {
    data(){
      return{
        list:{},
        driverList:[],
      }
    },
    components: {
      mhead: PublicHead
    },
    filters:{
      changTime(val){
        return operationTime.getTime(new Date(val).getTime(),2)
      }
    },
    methods:{
        init(){
          let param={
            vin:this.list.vin
          }

          this.$http.post(Lightcar.findisBindingvehicledriverlist,param).then(res=>{
              if(res.data.code==0){
                this.driverList=res.data.data
              }else{
                Toast({
                  message: res.data.msg,
                  duration: 2000,
                  position: "middle"
                });
              }
          })
        },
        deteledrive(id){
          let param={
            id:id,
            brandId:this.$store.state.brandId
          }

          this.$http.post(Lightcar.deletevehicledriverrelationship,param).then(res=>{
              if(res.data.code==0){
                Toast({
                  message: '解绑成功',
                  duration: 2000,
                  position: "middle"
                });
                this.init()
              }else{
                Toast({
                  message: res.data.msg,
                  duration: 2000,
                  position: "middle"
                });
              }
          })
        },
        bindingDriver(){
          this.$router.push({
            path:"/felltManagement/binddriver",
          })
        }
    },
    created(){
         $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
         this.list=this.$store.state.VehicleInformation
    },
    mounted(){
      this.init()
    }
}
</script>

<style scoped>
.header{
  border-bottom: .01rem solid #eeeeee;
}
.information{
  width: 92%;
  margin: 0 auto;
  height: 1.6rem;
}
.information .top{
  margin: .2rem 0;
}
.information .carname{
  font-size:.28rem;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(73,187,255,1);
}
.information .dvin{
  font-size:.22rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.information .middle>div{
  font-size:.2rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.information .bottom>div{
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.bindeddriver{
  border-top: .01rem solid #eeeeee;
}
.bindeddriver .title{
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(34,34,34,1);
  margin: .4rem .29rem;
}
.bindeddriver .drivers{
   width: 80%;
   border: .01rem solid #eeeeee;
   margin: 0 auto;
}
.bindeddriver .drivers>div{
  padding: .2rem;
}
.bindeddriver .drivers .timer{
  font-size:.22rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.bindeddriver .drivers img{
  width: .36rem;
  height: .36rem;
  margin: .2rem;
}
.adddriverbtn{
  border: .01rem dashed #49BBFF;
  width: 90%;
  margin:0 auto;
  margin-top: .4rem;
  height: 1rem;
  color: #49BBFF;
}
.adddriverbtn img{
  width: .24rem;
  height: .24rem;
  margin-right: .2rem;
}
</style>
