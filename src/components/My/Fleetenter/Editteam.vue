<template>
    <div>
      <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">编辑车队</span>
          <span >
            <div style="color:#FF3030" @click="deteleteam">删除车队</div>
          </span>
        </header>
        <div style="height:0.88rem;" class="MobileHeight"></div>
        <div class="title">输入车队名称和车队长信息来创建车队</div>
        <div class="flex cocenter box">
          <div class="name">车队名:</div>
          <input type="text" placeholder="请输入车队名" v-model="teamname">
        </div>
        <div class="flex cocenter box">
          <div class="name">车队长:</div>
          <input type="text" placeholder="请输入车队长姓名" v-model="teamleader">
          <!-- <img src="/static/images/next@2x.png" alt=""  @click="tochooseleader"> -->
        </div>
        <div class="flex cocenter box">
          <div class="name">电话:</div>
          <input type="text" placeholder="请输入手机号" v-model="leaderphone">
          <!-- <img src="/static/images/next@2x.png" alt=""  @click="tochooseleader"> -->
        </div>
        <div class="bindeddriver">
            <div class="titled">已绑定车辆</div>
            <div class="flex between drivers cocenter" v-for="(item,index) in this.list" :key="index">
               <div>{{item.vin}}</div>
               <div class="plate">{{item.plate}}</div>
               <img src="/static/images/carteam/deletecar@2x.png" alt="">
            </div>
        </div>
        <div class="adddriverbtn flex contentcenter " @click="addcar">
            <img src="/static/images/carteam/adddriver@2x.png" alt="">
            <div>添加车辆</div>
        </div>
        <div class="created" @click="create">确认修改</div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  data() {
    return {
      teamname:"",
      teamleader:'',
      leaderphone:'',
      list:[],
    };
  },
  methods: {
    init(){
      let params={
        teamId:this.$store.state.FleetInformation.teamId,
        brandId:this.$store.state.brandId
      }
      this.$http.post(Lightcar.findbindingteamlist,params).then(res=>{
          if(res.data.code==0){
            this.list=res.data.data
          }
      })
    },
    create(){
      // this.$router.push({
      //   path:"/felltManagement/createteamleader",
      //   query:{
      //     teamname:this.teamname,
      //     teamleader:this.teamleader
      //   }
      // })
    },
    // tochooseleader(){
    //       this.$router.push({
    //         path:"/felltManagement/teamleader"
    //       })
    // },
    deteleteam(){
      let params={
        brandId:this.$store.state.brandId,
        teamId:this.$store.state.FleetInformation.teamId
      }
      this.$http.post(Lightcar.deleteteam,params).then(res=>{
        if(res.data.code==0){
          Toast({
                message: '删除成功',
                position: "middle",
                duration: 2000
              });
        }else{
          Toast({
                message: res.data.msg,
                position: "middle",
                duration: 2000
              });
        }
      })
    },
    addcar(){
      this.$router.push({
        path:'/felltManagement/addcar'
      })
    }
  },
  created(){
    if(this.$store.state.FleetInformation){
      this.teamname=this.$store.state.FleetInformation.teamName
      this.teamleader=this.$store.state.FleetInformation.contact
      this.leaderphone=this.$store.state.FleetInformation.contactPhone
      this.init()
    }
  },
  mounted(){
    $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
  }
};
</script>

<style scoped>
input{
  border:none;
  outline: none;
}
.title{
  width:90%;
  margin: 0 auto;
  line-height: .95rem;
  border-bottom: .01rem solid #eeeeee;
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.box{
  width: 90%;
  margin: 0 auto;
  height: .98rem;
  border-bottom: .01rem solid #eeeeee;
  font-size:.28rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(68,68,68,1);
}
.box .name{

}
.box>input{
  margin-left: .41rem;
}
.box>img{
  width: .14rem;
  height: .28rem;
  margin-left: 1.7rem;
}
.created{
  width: 100%;
  line-height: .98rem;
  text-align: center;
  background: #49BBFF;
  color: #fff;
  position: fixed;
  bottom: 0;
}
.bindeddriver{
  border-top: .01rem solid #eeeeee;
}
.bindeddriver .titled{
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
   height: 1rem;
}
.bindeddriver .drivers .plate{
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
  margin-right: 2rem;
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
