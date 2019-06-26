<template>
  <div>
    <header class="header MobileHeight">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title" style="margin-left:.6rem">车辆驾驶行为分析</span>
      <span>
        <img
          @click="chooseDate"
          style="width:.34rem;height:.34rem;"
          src="./../../../../static/images/carteam/search@2x.png"
          alt
        >
      </span>
    </header>
    <div style="height:0.88rem" class="MobileHeight"></div>
    <div id="myChart"></div>
    <div>
      <div class="flex cocenter top_title">
        <div class="mycarteam">宝马XX</div>
        <div class="flex cocenter" @click="todetail()">
          <div class='detail'>司机详情</div>
          <img style="width:.12rem;height:.24rem;margin:0 .3rem 0 .1rem;" src="./../../../../static/images/next@2x.png" alt="">
        </div>
      </div>
      <ul class="ullsit">
        <li @click="chooseaveragemileage" :class="this.averagemileage?'active':''">
          <div class="flex cocenter">
            <img v-if="this.averagemileage" src="./../../../../static/images/carteam/distanceblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/distancedark@2x.png" alt="">
            <div class="lilist">日平均里程</div>
          </div>
          <div class="right">88Km</div>
        </li>
        <li @click="choosetotalmileage" :class="this.totalmileage?'active':''">
          <div class="flex cocenter">
            <img v-if="this.totalmileage" src="./../../../../static/images/carteam/distanceblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/distancedark@2x.png" alt="">
            <div  class="lilist">当月总里程</div>
          </div>
          <div class="right">888Km</div>
        </li>
        <li @click="chooseaverageFuelConsumption" :class="this.averageFuelConsumption?'active':''">
          <div class="flex cocenter">
            <img v-if="this.averageFuelConsumption" src="./../../../../static/images/carteam/oilblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/oildark@2x.png" alt="">
            <div class="lilist">日平均油耗</div>
          </div>
          <div class="right">88L</div>
        </li>
        <li @click="choosetotalFuelConsumption" :class="this.totalFuelConsumption?'active':''">
          <div class="flex cocenter">
            <img v-if="this.totalFuelConsumption" src="./../../../../static/images/carteam/oilblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/oildark@2x.png" alt="">
            <div class="lilist">当月总油耗</div>
          </div>
          <div class="right">888L</div>
        </li>
        <li @click="chooseaverageTime" :class="this.averageTime?'active':''">
          <div class="flex cocenter">
            <img v-if="this.averageTime" src="./../../../../static/images/carteam/timeblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/timedark@2x.png" alt="">
            <div class="lilist">日平均工作时长</div>
          </div>
          <div class="right">8h</div>
        </li>
        <li @click="choosetotalTime" :class="this.totalTime?'active':''">
          <div class="flex cocenter">
            <img v-if="this.totalTime" src="./../../../../static/images/carteam/timeblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/timedark@2x.png" alt="">
            <div class="lilist">当月总工作时长</div>
          </div>
          <div class="right">88h</div>
        </li>
      </ul>
    </div>
    <mt-datetime-picker
      id="timer"
      v-model="pickerValuestart"
      ref="pickerstart"
      type="date"
      cancelText="取消"
      confirmText="下一步"
      year-format="{value} 年"
      month-format="{value} 月"
      :startDate="startDate"
      @confirm="start"
    ></mt-datetime-picker>
    <mt-datetime-picker
      v-model="pickerValueend"
      ref="pickerend"
      type="date"
      cancelText="取消"
      confirmText="确认"
      year-format="{value} 年"
      month-format="{value} 月"
      :startDate="startnext"
      @confirm="end"
    ></mt-datetime-picker>
  </div>
</template>

<script>
import { DatetimePicker, Toast } from "mint-ui";
export default {
  data() {
    return {
      pickerValuestart: "",
      pickerValueend: "",
      starttime: "", //传给后台的开始时间戳
      endtime: "", //传给后台的结束时间戳
      beginTime: "", //传给后台的开始时间
      lastTime: "", //传给后台的结束时间
      startDate: new Date(),
      startnext: new Date(),
      myChart: "",
      queryTimeList:["2019.1", "2019.2", "2019.3", "2019.4", "2019.5", "2019.6", "2019.7"],//查询的时间x轴
      company:'{a0}:{c0}Km',//单位
      title:'日平均里程',
      showList:[120, 132, 101, 134, 90, 230, 210],
      averagemileage:true,//平均里程
      totalmileage:false,//总里程
      averageFuelConsumption:false,//平均油耗
      totalFuelConsumption:false,//总油耗
      averageTime:false,//平均时长
      totalTime:false,//总时长
    };
  },
  methods: {
    chooseaveragemileage(){
      this.averagemileage=true
      this.totalmileage=false
      this.averageFuelConsumption=false
      this.totalFuelConsumption=false
      this.averageTime=false
      this.totalTime=false
      this.title='日平均里程'
      this.company='{a0}:{c0}Km'
      this.drawLine()
    },
    choosetotalmileage(){
      this.averagemileage=false
      this.totalmileage=true
      this.averageFuelConsumption=false
      this.totalFuelConsumption=false
      this.averageTime=false
      this.totalTime=false
      this.title='当月总里程'
      this.company='{a0}:{c0}Km'
      this.drawLine()
    },
    chooseaverageFuelConsumption(){
      this.averagemileage=false
      this.totalmileage=false
      this.averageFuelConsumption=true
      this.totalFuelConsumption=false
      this.averageTime=false
      this.totalTime=false
      this.title='日平均油耗'
      this.company='{a0}:{c0}L'
      this.drawLine()
    },
    choosetotalFuelConsumption(){
      this.averagemileage=false
      this.totalmileage=false
      this.averageFuelConsumption=false
      this.totalFuelConsumption=true
      this.averageTime=false
      this.totalTime=false
      this.title='当月总油耗'
      this.company='{a0}:{c0}L'
      this.drawLine()
    },
    chooseaverageTime(){
      this.averagemileage=false
      this.totalmileage=false
      this.averageFuelConsumption=false
      this.totalFuelConsumption=false
      this.averageTime=true
      this.totalTime=false
      this.title='日平均工作时长'
      this.company='{a0}:{c0}h'
      this.drawLine()
    },
    choosetotalTime(){
      this.averagemileage=false
      this.totalmileage=false
      this.averageFuelConsumption=false
      this.totalFuelConsumption=false
      this.averageTime=false
      this.totalTime=true
      this.title='当月总工作时长'
      this.company='{a0}:{c0}h'
      this.drawLine()
    },
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.myChart.setOption({
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "none",
            label: {
              backgroundColor: "#6a7985"
            }
          },
          formatter: this.company
        },
        grid: {
          left: "-3%",
          right: "6%",
          bottom: "0%",
          containLabel: true
        },
        xAxis:
          {
            type: "category",
            axisTick:{
              show:false
            },
            axisLine:{
                   show:false
            } ,
            boundaryGap: false,
            data: this.queryTimeList,

          },
        yAxis: [
          {
            type: "value",
            splitNumber: 2,
            scale: true,
            show:false,
            splitLine:{
        　　　　show:false
        　　 },
          }
        ],
        series: [
          {
            name: this.title,
            type: "line",
            stack: "总量",
            label:{
              normal:{
                show:true,
                position:'top'
              }
            },
            areaStyle: {
              normal: {
                color: "#E6F6FF" //改变区域颜色
              }
            },
            itemStyle: {
              normal: {
                color: "#49BBFF", //改变折线点的颜色
                lineStyle: {
                  color: "#E6F6FF" //改变折线颜色
                }
              }
            },
            data: this.showList,
            symbol:'circle'
          }
        ]
      });
    },
    todetail(){
      this.$router.push({
        path:'/felltManagement/DriverBehaviorAnalysis'
      })
    },
    chooseDate() {
      this.openPickerstart();
    },
    openPickerstart() {
      this.$refs.pickerstart.open();
      let a = document.getElementsByClassName("picker-slot");
      a[2].style.display = "none";
      a[5].style.display = "none";
    },
    openPickerend() {
      this.$refs.pickerend.open();
    },
    start() {
      this.starttime = this.pickerValuestart.getTime();
      this.startnext = new Date(operationTime.getTime(this.starttime, 2));
      this.beginTime = operationTime.getTime(this.starttime, 6);
      this.openPickerend();
    },
    end() {
      this.endtime = this.pickerValueend;
      this.lastTime = operationTime.getTime(this.endtime, 6);
      console.log(this.beginTime, this.lastTime);
    },
    addstyle() {
      let newNode = document.createElement("span");
      newNode.innerHTML = "设置开始时间";
      $(".mint-datetime-cancel")[0].parentNode.insertBefore(
        newNode,
        $(".mint-datetime-cancel")[0].nextSibling
      );
      $(".picker-toolbar")[0].style.cssText =
        "display:flex;justify-content:space-between;align-items: center";
      $(".mint-datetime-cancel")[0].nextSibling.style.cssText =
        "width:2.5rem;text-align:center;font-size:.28rem;";
      let newNodenext = document.createElement("span");
      newNodenext.innerHTML = "设置结束时间";
      $(".mint-datetime-cancel")[1].parentNode.insertBefore(
        newNodenext,
        $(".mint-datetime-cancel")[1].nextSibling
      );
      $(".picker-toolbar")[1].style.cssText =
        "display:flex;justify-content:space-between;align-items: center";
      $(".mint-datetime-cancel")[1].nextSibling.style.cssText =
        "width:2.5rem;text-align:center;font-size:.28rem;";
    }
  },
  mounted() {
    $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
    this.drawLine();
    setTimeout(() => {
      this.addstyle();
    }, 500);
  }
};
</script>

<style scoped>
#myChart {
  width: 100%;
  height: 5rem;
}
.ullsit>li{
  display: flex;
  align-items: center;
  line-height: 1rem;
  width: 90%;
  margin: 0 auto;
  justify-content: space-between;
}
.ullsit>li img{
  width: .32rem;
  height: .32rem;
}
.ullsit li .lilist{
  margin-left: .3rem;
}
.ullsit li .right{
  font-size:.36rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
}
.top_title{
  width: 100%;
  line-height: .94rem;
  border-bottom: .01rem solid #eeeeee;
  justify-content: space-between;
}
.top_title .mycarteam{
  margin-left: .36rem;
  font-size:.36rem;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(34,34,34,1);
}
.top_title .detail{
  font-size:.3rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.active{
  color:#49BBFF
}
</style>

