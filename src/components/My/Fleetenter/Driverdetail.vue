<template>
    <div>
      <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.push('/felltManagement/drivermanagemen')">
          <span class="header-title" style="margin-left:.6rem">司机详情</span>
          <span >
            <router-link tag="div" style="color:#49BBFF" to="/felltManagement/editdriver">编辑</router-link>
          </span>
      </header>
      <div style="height:0.88rem" class="MobileHeight"></div>
      <div class="name">{{this.detail.driverName}}</div>
      <div class="box flex">
        <div class="title">
            <div>手机号码</div>
            <div>身份证号</div>
            <div>紧急联系人</div>
            <div>地址</div>
        </div>
        <div class="content">
            <div>{{this.detail.phone||'暂无数据'}}</div>
            <div>{{this.detail.identityNum||'暂无数据'}}</div>
            <div>{{this.detail.urgentPersonName||'暂无数据'}}  {{this.detail.urgentPersonNum||'暂无数据'}}</div>
            <div>{{this.detail.address||'暂无数据'}}</div>
        </div>
      </div>
      <div class="bindeddriver">
            <div class="title">已绑定车辆</div>
            <div class="flex between drivers cocenter" v-for="(item,index) in this.bindList" :key="index">
              <div>
                <div>{{item.plate}}</div>
                <div class="timer">{{item.startTime|changTime}}至{{item.overTime|changTime}}</div>
              </div>
               <img src="./../../../../static/images/carteam/deletecar@2x.png" alt="" @click="detelecar(item)">
            </div>
        </div>
        <div class="adddriverbtn flex contentcenter ">
            <img src="./../../../../static/images/carteam/adddriver@2x.png" alt="">
            <div @click="bindcar">绑定车辆</div>
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  data(){
    return{
      detail:{},
      bindList:[],
    }
  },
  filters:{
      changTime(val){
        return operationTime.getTime(new Date(val).getTime(),2)
      }
  },
  methods:{
    init(){
      let params={
        driverId:this.$store.state.driverInformation.id,
        brandId:this.$store.state.brandId
      }
      this.$http.post(Lightcar.finddriverallotVehicles,params).then(res=>{
        if(res.data.code==0){
          this.bindList=res.data.data
        }
      })
    },
    detelecar(id){
          let param={
            id:id.id,
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
    bindcar(){
      this.$router.push({
        path:'/felltManagement/bindcar'
      })
    }
  },
  created(){
    this.detail=this.$store.state.driverInformation
    this.init()
  },
  mounted(){
     $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
  }
}
</script>

<style scoped>
  .header{
    background: #fff;
    border-bottom:.01rem solid #eeeeee;
  }
  .name{
    font-size:.3rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(73,187,255,1);
    margin: .3rem 0 0 .3rem;
  }
  .box{
    height: 2.8rem;
    width: 100%;
    border-bottom:.02rem solid #eeeeee
  }
  .box .title{
    margin-left: .28rem
  }
  .box .title>div{
    margin: .2rem 0;
  }
  .box .content{
    margin-left: .28rem
  }
   .box .content>div{
    margin: .2rem 0;
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
.bindeddriver .drivers .timer{
  font-size:.22rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.bindeddriver .drivers>div{
  padding: .2rem;
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
