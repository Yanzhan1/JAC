<template>
    <div>
        <mhead  currentTitle="创建司机"></mhead>
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
        <div class="sub" @click="created">
           创建
        </div>
    </div>
</template>

<script>
import {Toast} from 'mint-ui'
import PublicHead from "./../../publicmodel/PublicHead";
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
  components: {
    mhead: PublicHead
  },
  methods:{
    created(){
      let params={
        brandId:this.$store.state.brandId,
        driverName:this.drivername,
        phone:this.drivercall,
        identityNum:this.driveridcard,
        address:this.driveradress,
        urgentPersonName:this.contact,
        urgentPersonNum:this.contactcall
      }
      this.$http.post(Lightcar.createdriver,params).then((res)=>{
        if(res.data.code==0){
          Toast({
                  message: "创建司机成功",
                  position: "middle",
                  duration: 2000
                });
        }
      })
    }
  },
  created(){
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
