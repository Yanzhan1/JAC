<template>
  	<div>
        <mhead currentTitle="添加车辆"></mhead>
        <div class="flex cocenter between list" v-for="(item,index) in 5" :key="index">
          <div class="left">
            <div class="plate">宝马xx</div>
            <div class="vin">VIN:1253214321</div>
          </div>
          <div class="middle">浙AAA</div>
          <img class="right" src="/static/images/nextblue@2x.png" alt="" @click="choose(item)">
           <!-- <label class="chooseimages" :class="index==currentIndex?'active':''" @click="choose(index)"></label> -->
        </div>
        <mt-datetime-picker
          v-model="pickerValuestart"
          ref="pickerstart"
          type="datetime"
          cancelText='取消'
          confirmText='下一步'
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          hourFormat="{value}时"
          minuteFormat="{value}分"
          @confirm="start"
          >
          <div style="position:absolute;z-index:99999">jajdfkdsajflkdsajfjsjfkdsjflkjdsafdsajflkjads</div>
        </mt-datetime-picker>
        <mt-datetime-picker
          v-model="pickerValueend"
          ref="pickerend"
          type="datetime"
          cancelText='取消'
          confirmText='确认'
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          hourFormat="{value}时"
          minuteFormat="{value}分"
          @confirm="end"
          >
        </mt-datetime-picker>
    </div>
</template>
<script>
import PublicHead from "./../../publicmodel/PublicHead";
import { DatetimePicker } from 'mint-ui';
export default {
  data() {
    return {
      currentIndex:-1,
      pickerValuestart:'',
      pickerValueend:'',
      starttime:'',//传给后台的开始时间戳
      endtime:'',//传给后台的结束时间戳
    };
  },
  components: {
    mhead: PublicHead
  },
  methods: {
    choose(val){
      console.log(val)
      // this.currentIndex=val
      this.openPickerstart()
    },
    addstyle(){
      let newNode = document.createElement("span");
      newNode.innerHTML = "设置开始时间";
      $('.mint-datetime-cancel')[0].parentNode.insertBefore(newNode, $('.mint-datetime-cancel')[0].nextSibling)
      $('.picker-toolbar')[0].style.cssText="display:flex;justify-content:space-between;align-items: center"
      $('.mint-datetime-cancel')[0].nextSibling.style.cssText='width:2.5rem;text-align:center;font-size:.28rem;'
      let newNodenext = document.createElement("span");
      newNodenext.innerHTML = "设置结束时间";
       $('.mint-datetime-cancel')[1].parentNode.insertBefore(newNodenext, $('.mint-datetime-cancel')[1].nextSibling)
      $('.picker-toolbar')[1].style.cssText="display:flex;justify-content:space-between;align-items: center"
      $('.mint-datetime-cancel')[1].nextSibling.style.cssText='width:2.5rem;text-align:center;font-size:.28rem;'
    },
    openPickerstart() {
        this.$refs.pickerstart.open();
    },
    openPickerend() {
        this.$refs.pickerend.open();
    },
    start(){
      this.starttime=this.pickerValuestart.getTime()
      this.openPickerend()
    },
    end(){
      this.endtime=this.pickerValueend
    }
  },
  created(){

  },
  mounted(){
    setTimeout(()=>{
      this.addstyle()
    },500)
  }
};
</script>

<style scoped>
.list{
  height: 1.1rem;
  border-bottom: .01rem solid #eeeeee;
}
.list .left{
  margin-left: .3rem;
}
.list .left .plate{
  font-size:.28rem;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(73,187,255,1);
}
.list .left .vin{
  font-size:.22rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.list .middle{
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(85,85,85,1);
  margin-left: 1.5rem;
  margin-top: -.2rem;
}
.list .right{
  width: .1rem;
  height: .2rem;
  margin-right: .3rem;
}
.list .chooseimages {
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background-image: url("/static/images/Lovecar/loseWindow.png");
  border-radius: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 0.2rem;
  margin-right: .3rem;
}
.list .active {
  background-image: url("/static/images/Lovecar/window2@2x.png");
  width: 0.44rem;
  height: 0.44rem;
  background-size: 100%;
  background-repeat: no-repeat;
}
</style>
