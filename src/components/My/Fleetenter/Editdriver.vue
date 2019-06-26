<template>
    <div>
      <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">编辑司机</span>
          <span @click="deletedriver">
            <div style="color:#FF3030">删除司机</div>
          </span>
        </header>
        <div style="height:0.88rem;" class="MobileHeight"></div>
        <input class="inpt" type="text" placeholder="输入司机的基本信息来创建司机" disabled>
        <div class="listdetail">
          <div class="title">司机姓名:</div>
          <input type="text" placeholder="请输入司机姓名" v-model="drivername">
        </div>
        <div class="listdetail">
          <div class="title">司机电话:</div>
          <input type="text" placeholder="请输入司机电话" v-model="drivercall">
        </div>
        <div class="listdetail">
          <div class="title">身份证号:</div>
          <input type="text" placeholder="请输入司机身份证号" v-model="driveridcard">
        </div>
        <div class="listdetail">
          <div class="title">司机地址:</div>
          <input type="text" placeholder="请输入司机地址" v-model="driveradress">
        </div>
        <div class="listdetail">
          <div class="title">紧急联系人:</div>
          <input type="text" placeholder="请输入紧急联系人姓名" v-model="contact">
        </div>
        <div class="listdetail">
          <div class="title">电话:</div>
          <input type="text" placeholder="请输入紧急联系人电话" v-model="contactcall">
        </div>
        <div class="sub" @click="editsure">
           确认修改
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
  data(){
    return{
      drivername:'',//司机名字
      drivercall:'',//司机电话
      driveridcard:'',//司机身份证
      driveradress:'',//司机地址
      contact:'',//紧急联系人
      contactcall:'',//紧急联系人电话
    }
  },
  methods:{
    deletedriver(){
      let params={
          driverId:this.$store.state.driverInformation.id,
          brandId:this.$store.state.brandId
      }
      this.$http.post(Lightcar.deletedriver,params).then(res=>{
        if(res.data.code==0){
          Toast({
                message: '删除成功',
                duration: 2000,
                position: "middle"
              });
        }else{
          Toast({
                message: res.data.msg,
                duration: 2000,
                position: "middle"
              });
        }
      })
    },
    editsure(){
      let params={
        driverId:this.$store.state.driverInformation.id,
        driverName:this.drivername,
        phone:this.drivercall,
        identityNum:this.driveridcard,
        address:this.driveradress,
        urgentPersonName:this.contact,
        urgentPersonNum:this.contactcall
      }
        this.$http.post(Lightcar.updatedriverinfo,params).then(res=>{
            if(res.data.code==0){
               Toast({
                message: '修改成功',
                duration: 2000,
                position: "middle"
              });
            }else{
               Toast({
                message: res.data.msg,
                duration: 2000,
                position: "middle"
              });
            }
        })
    }
  },
  created(){
      if(this.$store.state.driverInformation){
        this.drivername=this.$store.state.driverInformation.driverName||''
        this.drivercall=this.$store.state.driverInformation.contactPhone||''
        this.driveridcard=this.$store.state.driverInformation.identityNum||''
        this.driveradress=this.$store.state.driverInformation.address||''
        this.contact=this.$store.state.driverInformation.urgentPersonName||''
        this.contactcall=this.$store.state.driverInformation.urgentPersonNum||''
      }
  },
  mounted(){
     $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
  }
}
</script>

<style scoped>
.header{
  border-bottom: .01rem solid #eee;
  background: #ffffff;
}
input{
  outline:none;
  border: none;
}
.inpt{
  display: block;
  width: 90%;
  margin: 0 auto;
  line-height: .95rem;
  border-bottom: .01rem solid #eeeeee;
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
  background-color:#ffffff;
}
.listdetail{
  display: flex;
  align-items: center;
  height: .98rem;
  font-size:.28rem;
  font-family:PingFang-SC-Medium;
  font-weight:600;
  color:#444444;
  border-bottom: .01rem solid #eeeeee;
  width: 90%;
  margin: 0 auto;
}
.listdetail .title{

}
.listdetail>input{
  margin-left: .26rem;
  color: #222;
}
.sub{
  position: fixed;
  bottom: 0;
  width: 100%;
  height: .98rem;
  background: #49BBFF;
  line-height: .98rem;
  text-align: center;
  font-size:.3rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(255,255,255,1);
}
</style>
