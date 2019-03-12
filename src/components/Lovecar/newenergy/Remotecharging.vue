<template>
    <div>
        <mhead currentTitle="远程充电"></mhead>
        <div style="width:100%;height:.01rem;background:#f1f1f1;"></div>
        <div class="flex between begintime" @click="begintime">
            <div>开始时间</div>
            <div class="flex contentcenter">
                <div>{{this.starttimes}}</div>
                <img :style="'display:block;width:.3rem;height:.3rem;margin-top:-.06rem'" src="./../../../../static/images/next@2x.png" alt="">
            </div>
        </div>
        <div class="flex between begintime" @click="endtimea">
            <div>结束时间</div>
            <div class="flex contentcenter">
                <div>{{this.endtimes}}</div>
                <img :style="'display:block;width:.3rem;height:.3rem;margin-top:-.06rem'" src="./../../../../static/images/next@2x.png" alt="">
            </div>
        </div>
         <mt-datetime-picker
            ref="pickerstart"
            type="datetime"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            hourFormat="{value} 时"
            minuteFormat="{value} 分"
            @confirm="handleConfirmstart"
            :startDate="startday"
            :endDate="endtime"
            >
        </mt-datetime-picker>
         <mt-datetime-picker
            ref="pickerend"
            type="datetime"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            hourFormat="{value} 时"
            minuteFormat="{value} 分"
            @confirm="handleConfirmend"
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
      startday: new Date(),
      toendtime: "", //结束充电传给后台的时间戳
      endtimes: "",
      tostarttime: "",
      starttimes: "" //开始充电传给后台的时间戳
    };
  },
  methods: {
    //选择充电开始时间
    begintime() {
      this.$refs.pickerstart.open();
    },
    handleConfirmstart(start) {
      this.tostarttime = new Date(start).getTime();
      this.starttimes = this.tochangeTime(new Date(start).getTime());
    },
    //选择充电结束时间
    endtimea() {
      this.$refs.pickerend.open();
    },
    handleConfirmend(end) {
      this.toendtime = new Date(end).getTime();
      this.endtimes = this.tochangeTime(new Date(end).getTime());
    },
    //时间戳转化
    tochangeTime(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      return y + "年" + m + "月" + d + "日" + "" + h + ":" + minute;
    },
    Conversiontime(timestamp) {
      var date = new Date(timestamp);
      let Y, M, D, h, m, s;
      Y = date.getFullYear() + "-";
      M = date.getMonth() + 1 + "-";
      D = date.getDate();
      return Y + M + D;
    }
  },
  created() {
    // this.endtime=this.toDate()
    let time = new Date().getTime() + 1000 * 60 * 60 * 24 * 7;
    this.endtime = new Date(this.Conversiontime(time) + "");
  },
  mounted() {
    // this.starttimes=this.tochangeTime(new Date().getTime())
  },
  components: {
    mhead: PublicHead
  }
};
</script>

<style scoped>
.box {
  width: 6.9rem;
  height: 3.6rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 24px 0px rgba(79, 79, 79, 0.12);
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 0.7rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
}

.begintime {
  border-bottom: 0.01rem solid #f1f1f1;
}
.begintime > div {
  padding: 0.4rem;
}
.mint-popup{
    bottom: 4rem;
    width: 82%;
    height: 40%;
    border-radius: 5%
}
</style>
