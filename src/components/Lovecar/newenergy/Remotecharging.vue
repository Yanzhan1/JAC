<template>
    <div>
        <mhead currentTitle="远程充电"></mhead>
        <div style="width:100%;height:.01rem;background:#f1f1f1;"></div>
        <div class="box">
            <div class="box_top">
                <div class="batterystatus">当前电池状态</div>
                <div class="flex cocenter batterystatusrightgray" v-show="this.type==1?true:false" >
                    <div :class="'colorgray'"></div>
                    待充电
                </div>
                <div class="flex cocenter batterystatusright" v-show="this.type==2?true:false">
                    <div :class="'coloryellow'"></div>
                    已预约充电
                </div>
                <div class="flex cocenter batterystatusrightblue" v-show="this.type==3?true:false">
                    <div :class="'colorblue'"></div>
                    充电中
                    <div :class="'colorblue'"></div>
                    直流快充
                </div>
            </div>
            <div class="flex around box_bottom">
                <div class="flex column bottom_div">
                    <div style="font-size:.48rem;color:rgba(102,102,102,1);">183</div>
                    <div style="font-size:.24rem;color:rgba(102,102,102,1)">续航里程(km)</div>
                </div>
                <div class="flex column bottom_div">
                    <div class="quantity" style="font-size:.48rem;color:rgba(102,102,102,1)">20%</div>
                    <div style="font-size:.24rem;color:rgba(102,102,102,1)">电量</div>
                </div>
                <div class="flex column bottom_div">
                    <div style="font-size:.48rem;color:rgba(102,102,102,1)">32</div>
                    <div style="font-size:.24rem;color:rgba(102,102,102,1)">蓄电池电压(v)</div>
                </div>
            </div>
        </div>
        <div class="charginggun">充电枪状态</div>
        <div class="flex cocenter charginggunstatus" v-show="this.type==1?true:false" >
          <div :class="'coloryellow'"></div>
          未连接
        </div>
        <div class="flex cocenter charginggunstatusblue" v-show="this.type==2?true:false">
          <div :class="'colorblue'"></div>
          已连接
        </div>
        <div class="flex cocenter charginggunstatusblue" v-show="this.type==3?true:false">
          <div :class="'colorblue'"></div>
          已连接
        </div>
        <div class="charginggun">充电时间</div>
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
        <div class="bottombut" @click="subbt">
            预约充电
        </div>
    </div>
</template>

<script>
import PublicHead from "../../publicmodel/PublicHead";
export default {
  data() {
    return {
      type: 1, //充电的状态1为无状态2为已预约充电3为充电中
      startday: new Date(),
      toendtime: "", //结束充电传给后台的时间戳
      endtimes: "",
      tostarttime: "",
      starttimes: "" //开始充电传给后台的时间戳
    };
  },
  methods: {
    //提交
    subbt() {},
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
    //控制电量的颜色在数据渲染后调用
    changequantitycolor() {
      parseInt(
        $(".quantity")
          .text()
          .replace("%", "")
      ) > 20
        ? $(".quantity").css("color", "#49BBFF")
        : $(".quantity").css("color", "#FF5926");
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
    this.changequantitycolor();
    this.starttimes=this.tochangeTime(new Date().getTime())
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
.batterystatus {
  font-size: 0.3rem;
  color: rgba(34, 34, 34, 1);
}
.batterystatusright {
  color: #ffcc00;
}
.batterystatusrightblue {
  color: #49bbff;
}
.batterystatusrightgray {
  color: #666666;
}
.popo {
  width: 100%;
  height: 5rem;
}
.box_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;
}
.box_bottom {
}
.box_bottom > .bottom_div {
  padding: 0.25rem;
}
.box_bottom > .bottom_div > div {
  padding: 0.1rem;
  text-align: center;
}
.coloryellow {
  width: 0.12rem;
  height: 0.12rem;
  border-radius: 50%;
  background: rgba(255, 204, 0, 1);
  margin: 0 0.2rem;
}
.colorgray {
  width: 0.12rem;
  height: 0.12rem;
  border-radius: 50%;
  background: #666666;
  margin: 0 0.2rem;
}
.colorblue {
  width: 0.12rem;
  height: 0.12rem;
  border-radius: 50%;
  background: #49bbff;
  margin: 0 0.2rem;
}
.charginggunstatus {
  color: #ffcc00;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
}
.charginggunstatusblue {
  color: #49bbff;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
}
.charginggun {
  font-size: 0.32rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  margin-top: 0.69rem;
  margin-left: 0.49rem;
}
.begintime {
  border-bottom: 0.01rem solid #f1f1f1;
}
.begintime > div {
  padding: 0.4rem;
}
.bottombut {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.98rem;
  background: rgba(73, 187, 255, 1);
  box-shadow: 0px 0px 15px 0px rgba(68, 68, 68, 0.2);
  text-align: center;
  line-height: 0.98rem;
  font-size: 0.34rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.suretime {
  display: block;
  text-align: right;
  margin-right: 0.3rem;
  color: #49bbff;
}
</style>
