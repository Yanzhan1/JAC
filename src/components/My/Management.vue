<template>
    <div>
        <div id="myChart" ></div>
    </div>
</template>

<script>
export default {
  name: 'hello',
  data () {
    return {
        title:'驾驶行为分析表',
        vehicleType: ["瑞风S1","瑞风S2","瑞风S3","瑞风S4","瑞风S5"],
        rowshow:['日平均里程','日平均油耗','日平均工作时长','总里程','总油耗','总工作时长']
    }
  },
  mounted(){
    console.log('图标')
    this.drawLine();
  },
  methods: {
    drawLine(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
 title: {
        text: this.title
    },
    tooltip: {
        trigger: 'axis'
    },
    legend: {
        data:this.vehicleType
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    toolbox: {
        feature: {
            saveAsImage: {}
        }
    },
    xAxis: {
        type: 'category',
        boundaryGap: false,
        data: this.rowshow
    },
    yAxis: {
        type: 'value'
    },
    series: [
        {
            name:'瑞风S1',
            type:'line',
            stack: '总量',
            data:[120, 132, 101, 134, 90, 230]
        },
        {
            name:'瑞风S2',
            type:'line',
            stack: '总量',
            data:[220, 182, 191, 234, 290, 330]
        },
        {
            name:'瑞风S3',
            type:'line',
            stack: '总量',
            data:[150, 232, 201, 154, 190, 330]
        },
        {
            name:'瑞风S4',
            type:'line',
            stack: '总量',
            data:[320, 332, 301, 334, 390, 330]
        },
        {
            name:'瑞风S5',
            type:'line',
            stack: '总量',
            data:[820, 932, 901, 934, 1290, 1330]
        }
    ]
        });
    }
  }
}
</script>

<style scoped>
#myChart{
  width: 100%;
  height: calc(100vh);
}
</style>
