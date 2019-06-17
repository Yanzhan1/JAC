<template>
    <div>
      <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">编辑司机</span>
          <span @click="deletedriver">
            <router-link tag="div" style="color:#FF3030" to="/myindex/addBus">删除司机</router-link>
          </span>
        </header>
        <div style="height:0.88rem;" class="MobileHeight"></div>
        <input class="inpt" type="text" placeholder="输入司机的基本信息来创建司机" disabled>
        <div class="listdetail">
          <div class="title">司机姓名:</div>
          <input type="text" placeholder="请输入司机姓名" v-model="this.drivername">
        </div>
        <div class="listdetail">
          <div class="title">司机电话:</div>
          <input type="text" placeholder="请输入司机电话" v-model="this.drivercall">
        </div>
        <div class="listdetail">
          <div class="title">身份证号:</div>
          <input type="text" placeholder="请输入司机身份证号" v-model="this.driveridcard">
        </div>
        <div class="listdetail">
          <div class="title">司机地址:</div>
          <input type="text" placeholder="请输入司机地址" v-model="this.driveradress">
        </div>
        <div class="listdetail">
          <div class="title">紧急联系人:</div>
          <input type="text" placeholder="请输入紧急联系人姓名" v-model="this.contact">
        </div>
        <div class="listdetail">
          <div class="title">电话:</div>
          <input type="text" placeholder="请输入紧急联系人电话" v-model="this.contactcall">
        </div>
        <div class="sub" @click="editsure">
           创建
        </div>
    </div>
</template>

<script>
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
      alert('删除司机')
    },
    editsure(){
      alert('确认修改')
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
