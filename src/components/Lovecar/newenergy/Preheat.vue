<template>
    <div>
        <mhead currentTitle="远程预热"></mhead>
        <div style="width:100%;height:.01rem;background:#f1f1f1"></div>
        <div class="flex cocenter between nextbox" @click="openPicker">
            <span>预热开始时间</span>
            <div >
                <div>{{this.hottimes}}</div>
                <img :src="'./../../../../static/images/next@2x.png'" alt="">
            </div>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="datetime"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            hourFormat="{value} 时"
            minuteFormat="{value} 分"
            @confirm="handleConfirm"
            :startDate="startday"
            :endDate="endtime"
            >
        </mt-datetime-picker>

    </div>
</template>

<script>
import PublicHead from "../../publicmodel/PublicHead";
export default {
  data() {
    return {
      hottimes:'',//选择得到的预热时间
      startday:new Date(),//限定开始时间的选择
      endtime:'',//限定结束时间的选择
      totime:'',//传给后台的时间戳
    };
  },
  methods: {
    openPicker() {
        this.$refs.picker.open();
    },
    //时间戳转化
    tochangeTime(inputTime) {
            var date = new Date(inputTime);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            return y + '年' + m + '月' + d + '日' + '' + h + ':' + minute;
    },
    handleConfirm(data){
      //totime为得到的时间戳
      this.totime=new Date(data).getTime()
      this.hottimes=this.tochangeTime(new Date(data).getTime())
    },
    Conversiontime(timestamp) {
                        var date = new Date(timestamp);
                        let Y,M,D,h,m,s
                        Y = date.getFullYear() + '-';
                        M =  (date.getMonth()+1)+ '-';
                        D = date.getDate();
                        return Y+M+D;
           }
  },
  components: {
    mhead: PublicHead
  },
  created(){
    // this.endtime=this.toDate()
    let time= new Date().getTime()+1000*60*60*24*7
    this.endtime=new Date(this.Conversiontime(time)+'') 
  },
  mounted(){
    this.hottimes=this.tochangeTime(new Date().getTime())
  }
};
</script>

<style scoped>
.box {
  width: 6.9rem;
  height: 1.2rem;
  box-shadow: 0px 4px 24px 0px rgba(79, 79, 79, 0.12);
  border-radius: 0.08rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  justify-content: space-between;
}
.nextbox {
  width: 6.9rem;
  height: 1rem;
  margin: 0.4rem auto;
  border-bottom: 0.01rem solid #f1f1f1;
}
.nextbox > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.nextbox > div > img {
  width: 0.22rem;
  height: 0.32rem;
}
.nextbox > div > div {
  padding: 0 0.1rem;
}
.mint-popup{
    bottom: 4rem;
    width: 82%;
    height: 40%;
    border-radius: 5%
}
</style>
