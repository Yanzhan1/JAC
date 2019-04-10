<template>
    <div class="box">
        <mhead  currentTitle="更换手机号"></mhead>
        <div class="top"></div>
        <div class="tips">
            <span>您当前的手机号码是<span>{{phone|encryption()}}</span>,需输入您要修改的手机号并验证</span>
        </div>
        <div class="tips_bottom"></div>
        <div class="flex cocenter choosecountry ">
            <span class="left">国家/地区:</span>
            <div class="flex cocenter countryright">
                <span >86中国</span>
                <input type="text" disabled style="background-color: #fff">
                <img src="../../../static/images/next@2x.png" alt="">
            </div>
        </div>
        <div class="line"></div>
        <div class="flex cocenter  choosecountry">
            <span class="left">新手机号:</span>
            <input type="text" placeholder="请输入手机号" v-model="newphone">
        </div>
        <div class="line"></div>
        <div class="flex cocenter between choosecountry ">
            <div>
                <span class="left">验证码:</span>
                <input style="width:1.7rem" type="text" placeholder="请输入验证码" v-model="pin">
            </div>
            <div class="flex check" v-if="this.flag" @click="getpin">
                <span>|</span>&nbsp&nbsp
                <div>
                    <span>获取验证码</span>
                </div>
            </div>
            <div class="flex check" v-else>
                <span>|</span>&nbsp&nbsp
                <div>
                    <span>{{checktime}}</span>
                    秒后重发
                </div>
            </div>
        </div>
        <div class="line"></div>
        <div class="bottom" @click="changephonesure">确认修改</div>
    </div>
</template>

<script>
import {Toast} from "mint-ui"
import PublicHead from "../publicmodel/PublicHead";
export default {
    data(){
        return{
            flag:true,//控制验证码状态
            timer:'',
            gettime:'',
            phone:this.$store.state.mobile,
            newphone:'',//新号码
            pin:'',//验证码
        }
    },
    components: {
        mhead: PublicHead
  },
  computed:{
      checktime(){
          return  this.timer
      }
  },
  methods:{
      //手机号的验证
      check(){
          var reg= /^1\d{10}$/;
				if(this.newphone == '') {
					Toast({
						message: '手机号输入不能为空',
						position: 'middle',
						duration: 2000
					});
					return false;
				}
				if (!reg.test(this.newphone)) {
					Toast({
						message: '请输入正确的手机号码',
						position: 'middle',
						duration: 2000
					});
					return false;
				}
      },
      //点击获取验证码改变状态
      getpin(){
          this.check
          this.flag=false
          this.timer=localStorage.getItem("time")
          this.gettime=setInterval(()=>{
              this.timer--
          },1000)

          let data={
                    phone:this.newphone,
                    sendSmsType:1
                }
          this.$http.post(My.sendSMS,data).then((res)=>{
              if(res.data==true){
                  Toast({
						message: '验证码已发送',
						position: 'middle',
						duration: 2000
					});
              }
          })
      },
      //确认提交
      changephonesure(){
          this.check()
          if(this.pin == '') {
					Toast({
						message: '请输入验证码',
						position: 'middle',
						duration: 2000
					});
					return false;
            }            
          let data={
                    userCode:this.newphone,
                    code:this.pin
                }
          this.$http.post(My.updateUserCode,data).then((res)=>{
              if(res.data.code==0){
                  Toast({
						message: '修改成功请重新登入app',
						position: 'middle',
						duration: 2000
					});
              }else{
                  Toast({
						message: res.data.msg,
						position: 'middle',
						duration: 2000
					});
              }
              
          })
      }
  },
  filters:{
      encryption(val){
          let headPhone = val.slice(0, 3)
				let str1 = `${headPhone}********`
				return str1
      }
  },
  watch:{
      checktime(oldValue,newValue){
              if(oldValue<1){
                  clearInterval(this.gettime)
                  this.flag=true
                  localStorage.setItem(
                  "time",
                  '60'
                );
              }
      }
  }
}
</script>

<style scoped>
.box{
    font-family: 'PingFang-SC-Regular';
    font-weight: 'Regular';
}
.top{
    position: fixed;
    width: 100%;
    height: .01rem;
    background: #EEEEEE;
}
.tips{
    width: 90%;
    margin: 0 auto;
    margin-top: .2rem;
    font-size: .12rem;
    line-height: .4rem;
}
.left{
    margin-left: .7rem;
}
.tips>span{
    padding: .2rem 0;
    line-height: .33rem;
    height: .33rem;
    color: #888888;
}
.tips_bottom{
    width: 90%;
    margin: 0 auto;
    margin-top: .16rem;
    height: .01rem;
    background: #EEEEEE;
}
.choosecountry{
    width: 100%;
    height: 1rem;
}
.choosecountry>span{
    font-size: .14rem;
    line-height: .5rem;
}
.choosecountry div>img{
    width: .3rem;
    height: .3rem;
}
.countryright{
    margin-left: .2rem;
    font-size: .16rem;
    color: #222222;
    line-height: .5rem;
}
.line{
    width: 90%;
    height: .02rem;
    background: #EEEEEE;
    margin: 0 auto;
}
input{
    outline: none;
    border: 0;   
    margin-left: .5rem;
}
.phone{
    margin-top: .2rem;
}
.check{
    margin-right: .2rem;
}
.bottom{
    position: fixed;
    bottom: 0;
    width: 100%;
    height: .96rem;
    background: #49BBFF;
    color: #fff;
    text-align: center;
    line-height: .96rem;
    font-size: .15rem;
}
</style>
