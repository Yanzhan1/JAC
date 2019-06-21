<template>
  	<div>
        <mhead currentTitle="创建车队"></mhead>
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
      let param={
          brandId:'1',
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
</style>
