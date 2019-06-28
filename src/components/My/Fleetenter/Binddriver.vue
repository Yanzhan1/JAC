<template>
  	<div>
        <mhead currentTitle="绑定司机"></mhead>
        <div class="flex cocenter between list" v-for="(item,index) in list" :key="index">
          <div class="left">{{item.driverName}}</div>
          <div class="middle">{{item.contactPhone}}</div>
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
          :startDate="startDate"
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
          :startDate='startnext'
          @confirm="end"
          >
        </mt-datetime-picker>
    </div>
</template>
<script>
import PublicHead from "./../../publicmodel/PublicHead";
import { DatetimePicker,Toast } from 'mint-ui';
export default {
  data() {
    return {
      currentIndex:-1,
      pickerValuestart:'',
      pickerValueend:'',
      starttime:'',
      endtime:'',
      beginTime:'',//传给后台的开始时间戳
      lastTime:'',//传给后台的结束时间戳
      startDate:new Date(),
      startnext:new Date(),
      list:[],
      item:{},//每个司机的信息
    };
  },
  components: {
    mhead: PublicHead
  },
  methods: {
    init(){
      let params={
        brandId:this.$store.state.brandId,
        userId:"1333298182",
        driverId:""
      }
      this.$http.post(Lightcar.finddriverlist,params).then(res=>{
        if(res.data.code=='0'){
          this.list=res.data.data
        }
      })
    },
    choose(val){
      this.item=val
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
      this.startnext=new Date(operationTime.getTime(this.starttime,2))
      this.beginTime=operationTime.getTime(this.starttime,1)
      this.openPickerend()
    },
    end(){
      this.endtime=this.pickerValueend
      this.lastTime=operationTime.getTime(this.endtime,1)
      let params={
              driverId:this.item.id,
              vin: this.$store.state.VehicleInformation.vin,
              beginTime:this.beginTime,
              endTime:this.lastTime,
              brandId:this.$store.state.brandId
            }
      this.$http.post(Lightcar.updateisBindingvehicledriverlist,params).then(res=>{
        if(res.data.code==0){
            Toast({
                  message: this.item.driverName+'司机绑定成功',
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
    this.init()
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
  font-size:.28rem;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(34,34,34,1);
}
.list .middle{
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(85,85,85,1);
  margin-right: 3rem;
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
