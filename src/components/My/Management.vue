<template>
  <div>
    <div id="myChart" ></div>
  </div>
</template>

<script>
export default {
  name: "hello",
  data() {
    return {
      title: "驾驶行为分析表",
      clickItemIndex:'',
      vehicleType: ["瑞风S1", "瑞风S2", "瑞风S3", "瑞风S4", "瑞风S5"],
      rowshow: [
        "日平均里程",
        "日平均油耗",
        "日平均工作时长",
        "总里程",
        "总油耗",
        "总工作时长"
      ],
      myChart
    };
  },
  mounted() {
    this.drawLine();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      this.myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      this.myChart.setOption({
        title: {
          text: this.title,
          show: false
        },
        legend: {
          type: "scroll",
          data: this.vehicleType,
          tooltip: {
              show: true
          }
        },
        tooltip: {
          trigger: "axis",
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.rowshow,
          axisLine: {
            lineStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "red" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "blue" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          },
          axisTick: {},
          axisLabel: {
            interval: 0,
            fontSize: 9
          },
        },
        yAxis: {
          type: "value",
          scale: true,
          max: 1400,
          min: 0,
          splitNumber: 15
        },
        series: [
          {
            name: "瑞风S1",
            type: "line",
            smooth: true,
            data: [100, 333, 479, 579, 39, 900],
          },
          {
            name: "瑞风S2",
            type: "line",
            smooth: true,
            data: [220, 182, 191, 234, 290, 330]
          },
          {
            name: "瑞风S3",
            type: "line",
            smooth: true,
            data: [150, 232, 201, 154, 190, 330]
          },
          {
            name: "瑞风S4",
            type: "line",
            smooth: true,
            data: [320, 332, 301, 334, 390, 330]
          },
          {
            name: "瑞风S5",
            type: "line",
            smooth: true,
            data: [820, 932, 901, 934, 1290, 1330]
          }
        ]
      });
    },
  }
};
</script>

<style scoped>
#myChart {
  width: 100%;
  height: calc(100vh);
}
</style>
