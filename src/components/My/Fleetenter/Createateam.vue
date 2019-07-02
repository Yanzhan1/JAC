<template>
  	<div>
        <mhead currentTitle="创建车队"></mhead>
        <div class="title">输入车队名称和车队长信息来创建车队</div>
        <div class="flex cocenter box">
          <span>*</span>
          <div class="name">车队名:</div>
          <input type="text" placeholder="请输入车队名" v-model="teamname">
        </div>
        <div class="flex cocenter box">
          <span>*</span>
          <div class="name">车队长:</div>
          <input type="text" placeholder="请输入车队长姓名" v-model="teamleader">
          <!-- <img src="/static/images/next@2x.png" alt=""  @click="tochooseleader"> -->
        </div>
        <div class="flex cocenter box">
          <span>*</span>
          <div class="name">电话:</div>
          <input type="number" placeholder="请输入手机号" v-model="leaderphone">
        </div>
        <div class="created" @click="create">创建</div>
    </div>
</template>
<script>
import { Toast } from 'mint-ui';
import PublicHead from "./../../publicmodel/PublicHead";
export default {
  data() {
    return {
      teamname:"",
      teamleader:'',
      leaderphone:'',
    };
  },
  components: {
    mhead: PublicHead
  },
  methods: {
    create(){
      let regg= /^1\d{10}$/;
      if(!this.teamleader){
        Toast({
              message: '车队长名字不能为空',
              position: 'middle',
              duration: 2000
            });
            return false;
      }
      if(!this.leaderphone){
        Toast({
              message: '手机号不能为空',
              position: 'middle',
              duration: 2000
            });
            return false;
      }
      if(this.leaderphone){
        if (!regg.test(this.leaderphone)) {
            Toast({
              message: '请输入正确的司机手机号码',
              position: 'middle',
              duration: 2000
            });
            return false;
          }
      }
      if(!this.teamname){
          Toast({
                message: '车队名不能为空',
                position: "middle",
                duration: 2000
              });
              return false
      }
      if(!this.teamname){
          Toast({
                message: '请输入长度少于7个字符的车队名',
                position: "middle",
                duration: 2000
              });
              return false
      }
      if(this.teamleader.length>5){
          Toast({
                message: '请输入长度少于5位数的姓名',
                position: "middle",
                duration: 2000
              });
              return false
      }
      let param={
          brandId:this.$store.state.brandId,
          teamName:this.teamname,
          contact:this.teamleader,
          contactPhone:this.leaderphone
      }
      this.$http.post(Lightcar.createteam,param).then(res=>{
          if(res.data.code==0){
            Toast({
							message: '创建车队成功',
							position: 'middle',
							duration: 1000
						});
            this.$router.push({
              path:"/felltManagement"
            })
          }else{
            Toast({
							message: res.data.msg,
							position: 'middle',
							duration: 1000
						});
          }
      })
    },
    // tochooseleader(){
    //       this.$router.push({
    //         path:"/felltManagement/teamleader"
    //       })
    // }
  },
  mounted(){

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
  position: relative;
}
.box span{
  position: absolute;
  color: red;
  left: -.1rem;
  top: .17rem;
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
</style>
