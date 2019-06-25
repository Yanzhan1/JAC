<template>
  <div>
    <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">车队驾驶行为分析</span>
          <span >
            <img @click="chooseDate" style="width:.34rem;height:.34rem;" src="/static/images/carteam/search@2x.png" alt="">
          </span>
      </header>
      <div style="height:0.88rem" class="MobileHeight"></div>
      <mt-datetime-picker id="timer"
          v-model="pickerValuestart"
          ref="pickerstart"
          type="date"
          cancelText='取消'
          confirmText='下一步'
          year-format="{value} 年"
          month-format="{value} 月"
          :startDate="startDate"
          @confirm="start"
          >
        </mt-datetime-picker>
        <mt-datetime-picker
          v-model="pickerValueend"
          ref="pickerend"
          type="date"
          cancelText='取消'
          confirmText='确认'
          year-format="{value} 年"
          month-format="{value} 月"
          :startDate='startnext'
          @confirm="end"
          >
        </mt-datetime-picker>
  </div>
</template>

<script>
import { DatetimePicker ,Toast} from 'mint-ui';
export default {
  data(){
    return{
      pickerValuestart:'',
      pickerValueend:'',
      starttime:'',//传给后台的开始时间戳
      endtime:'',//传给后台的结束时间戳
      beginTime:'',//传给后台的开始时间
      lastTime:'',//传给后台的结束时间
      startDate:new Date(),
      startnext:new Date(),
    }
  },
  methods:{
    chooseDate(){
        this.openPickerstart()
    },
     openPickerstart() {
        this.$refs.pickerstart.open();
        let a=document.getElementsByClassName('picker-slot')
        a[2].style.display='none';
        a[5].style.display='none'
    },
    openPickerend() {
        this.$refs.pickerend.open();
    },
    start(){
      this.starttime=this.pickerValuestart.getTime()
      this.startnext=new Date(operationTime.getTime(this.starttime,2))
      this.beginTime=operationTime.getTime(this.starttime,6)
      this.openPickerend()
    },
    end(){
      this.endtime=this.pickerValueend
      this.lastTime=operationTime.getTime(this.endtime,6)
      console.log(this.beginTime,this.lastTime)
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
  },
  mounted(){
    $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
    setTimeout(()=>{
      this.addstyle()
    },500)
  }
}
</script>

<style scoped>

</style>
