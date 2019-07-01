<template>
  <div>
    <header class="header MobileHeight">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">车队驾驶行为分析</span>
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
        <div class="mycarteam">{{this.$store.state.FleetInformation.teamName}}</div>
        <div class="flex cocenter" @click="todetail()">
          <div class='detail'>车辆详情</div>
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
          <div class="right">{{this.choosedData.averageMileageDay}}Km</div>
        </li>
        <li @click="choosetotalmileage" :class="this.totalmileage?'active':''">
          <div class="flex cocenter">
            <img v-if="this.totalmileage" src="./../../../../static/images/carteam/distanceblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/distancedark@2x.png" alt="">
            <div  class="lilist">当月总里程</div>
          </div>
          <div class="right">{{this.choosedData.totalMileage}}Km</div>
        </li>
        <li @click="chooseaverageFuelConsumption" :class="this.averageFuelConsumption?'active':''">
          <div class="flex cocenter">
            <img v-if="this.averageFuelConsumption" src="./../../../../static/images/carteam/oilblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/oildark@2x.png" alt="">
            <div class="lilist">日平均油耗</div>
          </div>
          <div class="right">{{this.choosedData.averageMileageDay}}L</div>
        </li>
        <li @click="choosetotalFuelConsumption" :class="this.totalFuelConsumption?'active':''">
          <div class="flex cocenter">
            <img v-if="this.totalFuelConsumption" src="./../../../../static/images/carteam/oilblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/oildark@2x.png" alt="">
            <div class="lilist">当月总油耗</div>
          </div>
          <div class="right">{{this.choosedData.totalWear}}L</div>
        </li>
        <li @click="chooseaverageTime" :class="this.averageTime?'active':''">
          <div class="flex cocenter">
            <img v-if="this.averageTime" src="./../../../../static/images/carteam/timeblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/timedark@2x.png" alt="">
            <div class="lilist">日平均工作时长</div>
          </div>
          <div class="right">{{this.choosedData.averagTimeDay|tohour}}h</div>
        </li>
        <li @click="choosetotalTime" :class="this.totalTime?'active':''">
          <div class="flex cocenter">
            <img v-if="this.totalTime" src="./../../../../static/images/carteam/timeblue@2x.png" alt="">
            <img v-else src="./../../../../static/images/carteam/timedark@2x.png" alt="">
            <div class="lilist">当月总工作时长</div>
          </div>
          <div class="right">{{this.choosedData.totalTime|tohour}}h</div>
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
      :endDate="endDate"
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
      :endDate="endnext"
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
      startDate: new Date(operationTime.getTime((new Date().getTime()-1000*60*60*24*31*6), 2)),
      startnext: new Date(),
      endDate:new Date(),
      endnext:new Date(),
      myChart: "",
      queryTimeList:[],//查询的时间x轴
      company:'{a0}:{c0}Km',//单位
      title:'日平均里程',
      showList:[],
      averagemileage:true,//平均里程
      totalmileage:false,//总里程
      averageFuelConsumption:false,//平均油耗
      totalFuelConsumption:false,//总油耗
      averageTime:false,//平均时长
      totalTime:false,//总时长
      chart_x:'',
      choosedData:[],//被选择的数据
      allDate:[],//eacharts展示数据
      allaveragemileage:[],//eachars展示平均里程数据
      alltotalmileage:[],//eachars展示总里程数据
      allaverageFuelConsumption:[],//eachars展示平均油耗数据
      alltotalFuelConsumption:[],//eachars展示总油耗数据
      allaverageTime:[],//eachars展示平均工作时长数据
      alltotalTime:[],//eachars展示总工作时长数据
      allDate_x:[],//x轴时间
    };
  },
   filters:{
    tohour(val){
      return (val/60/60).toFixed(1)
    }
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
      this.showList=this.allaveragemileage
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
      this.showList=this.alltotalmileage
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
      this.showList=this.allaverageFuelConsumption
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
      this.showList=this.alltotalFuelConsumption
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
      this.showList=this.allaverageTime
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
      this.showList=this.alltotalTime
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
          left: "0%",
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
      let zr=this.myChart.getZr();
      zr.on('click',(params)=>{
          var pointInPixel = [params.offsetX, params.offsetY];
          var pointInGrid = this.myChart.convertFromPixel('grid', pointInPixel);

          if (this.myChart.containPixel('grid', pointInPixel)) {
              this.chart_x=this.myChart.getOption().xAxis[0].data[pointInGrid[0]]
              let index=this.queryTimeList.findIndex(item=>item===this.chart_x)
              this.choosedData=this.allDate[index]
          }

      })
    },
    todetail(){
      this.$router.push({
        path:'/felltManagement/vehicleBehaviorAnalysis'
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
      this.chooseTimer(this.beginTime,this.lastTime)
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
    },
    changetime(val){
        let year=val.getFullYear();
        let month=val.getMonth()+1;
        month = month < 10 ? "0" + month : "" + month;
        return year + month;
    },
    //选择时间拿数据
    chooseTimer(start,end){
      let params={
        teamId:this.$store.state.FleetInformation.teamId,
        beginDate:start,
        endDate:end,
        brandId:this.$store.state.brandId
      }
      this.$http.post(Lightcar.teamAnalysisofdriving,params).then(res=>{
        if(res.data.returnSuccess){
          this.$http.post(Lightcar.truckvehicleasyncresults,{operationId:res.data.operationId,brandId:this.$store.state.brandId}).then(res=>{
              if(res.data.returnSuccess){
                this.allDate=res.data.data;
                this.choosedData=res.data.data[res.data.data.length-1]
                this.alltotalmileage=[]
                this.alltotalFuelConsumption=[]
                this.alltotalTime=[]
                this.allaveragemileage=[]
                this.allaverageFuelConsumption=[]
                this.allaverageTime=[]
                this.allDate_x=[]
                for(let val of this.allDate){
                  for(let item of Object.keys(val)){
                    if(item=="totalMileage"){
                      this.alltotalmileage.push(val.totalMileage)
                    }else if(item=="totalWear"){
                      this.alltotalFuelConsumption.push(val.totalWear)
                    }else if(item=="totalTime"){
                      let value=(val.totalTime/60/60).toFixed(1)
                      this.alltotalTime.push(value)
                    }else if(item=="averageMileageDay"){
                      this.allaveragemileage.push(val.averageMileageDay)
                    }else if(item=="averageWearDay"){
                      this.allaverageFuelConsumption.push(val.averageWearDay)
                    }else if(item=="averagTimeDay"){
                      let value=(val.averagTimeDay/60/60).toFixed(1)
                      this.allaverageTime.push(value)
                    }else if(item=="queryDate"){
                      let arr=val.queryDate.split('')
                      arr.splice(4,1,'.')
                      let value=arr.join('')
                      this.allDate_x.push(value)
                    }
                  }
                }
                this.queryTimeList=this.allDate_x
                this.showList=this.allaveragemileage
                this.drawLine();
              }
          })
        }
      })
    },
    init(){
      let startTime=this.changetime(new Date(new Date()-1000*60*60*24*31*6))
      let endTime=this.changetime(new Date())
      this.chooseTimer(startTime,endTime)
    }
  },
  mounted() {
    $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
    this.init()
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
