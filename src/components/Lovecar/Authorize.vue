<template>
    <div class="my-setup">
        <!--<div class="bgblack" v-show="this.bgblack" @click="bgblacks"></div>-->
        <!--<header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">远程授权</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>-->
        <mhead currentTitle="远程授权"></mhead>
        <div class="autime flex column around">
            <div class="aut" style="color:#49BBFF;font-size:.31rem;line-height:.32rem;">授权时间</div>
            <div class="">
                <div class="starttimes" @click="startlefts">
                    <div style="width:2rem;">起始时间</div>
                    <span style="margin-left:2rem;" ref="startt">{{start}}</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem" >
                </div>
                <div class="starttimes" @click="endrights">
                    <div style="width:2rem;" >结束时间</div>
                    <span style="margin-left:2rem;" ref="endd">{{end}}</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem" >
                </div>
            </div>
            <div class="aut auts">被授权者账号：</div>
            <div class="iptcont flex row cocenter">
                <span style="font-size:.24rem;color:#888;" >请输入账号</span>
                <input maxlength="" type="text" class="ipt" style="margin-left:.5rem;outline:none" v-model="Account">
            </div>
        </div>
        <div  class="starts">
            <!--<div style="text-align:center;line-height:1rem;font-size:.3rem;">选择起始时间</div>-->
            <!--<div style="float:right;margin-right:.3rem;color:#49BBFF;" @click="hided1">确定</div>-->
            <!--<mt-picker :slots="slotsone" @change="onValuesChange" style="height:4rem;margin-top:1rem;"></mt-picker>-->
            <mt-datetime-picker 
            	v-show="startleft"
            	type="datetime" 
            	ref="picker" 
            	year-format="{value} 年"
            	month-format="{value} 月"
            	date-format="{value} 日"
            	hour-format="{value}时"
				@confirm="handleStartConfirm" 
				:start-date = "startDate">
            </mt-datetime-picker>
        </div>
        <div  class="ends">
            <!--<div style="text-align:center;line-height:1rem;font-size:.3rem;">选择结束时间</div>
            <div style="float:right;margin-right:.3rem;color:#49BBFF;" @click="hided2">确定</div>-->
            <!--<mt-picker :slots="slotstwo" @change="onValuesChangend" style="height:4rem;margin-top:1rem;"></mt-picker>-->
            <mt-datetime-picker 
            	v-show="endright"
            	type="datetime" 
            	ref="pickerEnd"
            	year-format="{value} 年"
            	month-format="{value} 月"
            	date-format="{value} 日"
            	hour-format="{value}时"
				@confirm="handleEndConfirm" 
				:start-date = "startDate">
            </mt-datetime-picker>
        </div>
        <button class="bottom-btn" @click='next'>发送授权</button>
       </div>
</template>

<script>
import {Toast} from 'mint-ui'
import PublicHead from '../publicmodel/PublicHead';
export default {
  name: "authorize",
  components: {
  	mhead:PublicHead
  },
  data() {
    return {
        startleft:false,//控制起始时间选择
        endright:false,//控制结束时间选择
        shang:'',//起始时间
        xia:'',//结束时间
        start:null, //开始时间
        end:null,//结束时间
        Account:'',
        startDate: new Date(),
        thirdStartParty: '', //开始小时时间戳
        thirdEndParty: '', //结束小时时间戳
    };
  },
  methods:{
      next(){
          //获得时间戳
          this.shang = this.start.replace(/\-/g, '/').split(' ')[0]
          this.thirdStartParty = this.start.replace(/\-/g, '/').split(' ')[1]*60*60*1000
          this.xia = this.end.replace(/\-/g, '/').split(' ')[0]
          this.thirdEndParty = this.end.replace(/\-/g, '/').split(' ')[1]*60*60*1000
          this.shang = new Date(this.shang).getTime() + this.thirdStartParty //转换时间戳
          this.xia = new Date(this.xia).getTime() + this.thirdEndParty
          if(this.shang>this.xia){
              Toast({
                  message:'起始时间不能大于结束时间',
                  position:'middle',
                  duration:2000,
              })
          }else if(this.Account==''){
              Toast({
                  message:'请输入被授权账号',
                  position:'middle',
                  duration:2000,
              })
          } else{
              var param={
                    vin: this.$store.state.vins, 
                    phone:this.$store.state.mobile,
                    userId:this.$store.state.tspId,
                    operationType: "CONTROL_AUTH", 
                    operation: 1, 
                    extParams: {
                    childNum: this.Account, 
                    beginTime: this.shang, 
                    endTime: this.xia,
                }
            }
        this.$http.post(Lovecar.Longrange,param,this.$store.state.tsppin).then((res)=>{
            if(res.data.returnSuccess){
                this.$router.push({
                name:'Authorize_next',
                params:{
                        a:operationTime.getTime(this.shang),
                        b:operationTime.getTime(this.xia),
                        count: this.Account
            }
         })
            }else{
                Toast({
                    message:res.data.returnErrMsg,
                    position:'middle',
                    duration:2000,
                })
            }
        })
          }
        },
      startlefts(){
          this.startleft=true;
          $('.picker-slot.picker-slot-center')[4].style.display = 'none'
          this.$refs.picker.open()
      },
      endrights(){
          this.endright=true;
          $('.picker-slot.picker-slot-center')[9].style.display = 'none'
          this.$refs.pickerEnd.open()
      },
    handleStartConfirm (value) { //确认起始时间
    	this.start = operationTime.getTime(value, 5)
    },
    handleEndConfirm (value) { //确认结束时间
    	this.end = operationTime.getTime(value, 5)
    }
  },
  mounted(){
    let oDate=new Date()
    let year =oDate.getFullYear();
    let month =oDate.getMonth()+1;
    month = month<10?"0"+month:month
    let date=oDate.getDate()
    let time=oDate.getHours()
    let second=oDate.getMinutes()
    this.start=year+'-'+month+'-'+date+' '+time
    if(time>=23){
        this.end=year+'-'+month+'-'+date+1+' '+(time-20)
    }else{
        this.end=year+'-'+month+'-'+date+' '+(time+4)
    }
  }
};
</script>

<style scoped>
.autime {
  margin-left: 0.3rem;
  margin-right:.3rem
}
.aut {
  font-size: 0.3rem;
  color: #222;
  margin-top: 0.3rem;
  margin-bottom: 0.4rem;
}
.row {
  flex-direction: row;
}
.flex-start {
  justify-content: flex-start;
}
.btns {
  border: 1px solid #f1f1f1;
  border-radius: 0.1rem;
  width: 2rem;
  height: 0.5rem;
  justify-content: center;
}
.lines {
  display: block;
  color: #f1f1f1;
  padding: 0 0.3rem;
}
.auts {
  margin-top: 0.7rem;
}
.ipt{
    border:none
}
.iptcont{
    padding:.2rem 0;
    border-bottom:1px solid #f1f1f1
}
.starttimes{
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    font-family: PingFang-SC-Medium;
    font-size:.22rem;
    line-height: .28rem;
    font-weight: Medium;
    color: #222;
    width: 100%;
    height: 1rem;
    border-bottom: .01rem solid #f5f5f5;
}

.starts{
    /*position: absolute;
    bottom: 0rem;
    background: #fff;
    width: 100%;
    height: 6rem;
    z-index: 1001;*/
}
</style>