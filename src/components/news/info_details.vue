<template>
    <div>
        <header class="header">
            <img @click="$router.go(-1)" class="header-left" :src="'./static/images/back@2x.png'" style="margin-left:.4rem">
            <span class='header-title'>详情</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <div style="height:.4rem;background-color:#f8f8f8"></div>
        <div class="detailinfo" v-if="serviceType == 1 && (type==1||type==3)">
          <p>欢迎使用{{detailcontent.CPO_name}}</p>
          <p>订单：{{detailcontent.orderId}}</p>
          <p>状态：{{statusshow(orderStatus)}}</p>
          <p v-if="type==3">停止原因：{{detailcontent.orderStatusMsg}}</p>
        </div>
        <div class="detailinfo" v-if="serviceType == 1 && type==4 && orderStatus == 700">
        <p>订单：{{detailcontent.orderId}}</p>
        <!--<p>运营商名称：{{detailcontent.CPO_name}}</p>-->
        <p>开始时间：{{detailcontent.StartTime}}</p>
        <p>结束时间：{{detailcontent.EndTime}}</p>
        <p>累计充电量：{{detailcontent.TotalPower}}度</p>
        <p>总电费：{{detailcontent.TotalElecMoney}}元</p>
        <p>总服务费：{{detailcontent.TotalServiceMoney}}元</p>
        <p>累积总金额：{{detailcontent.TotalAmount}}元</p>
        <p>订单状态：{{statusshow(orderStatus)}}</p>
        <p>停止充电原因：{{detailcontent.orderStatusMsg}}</p>
      </div>
      <div class="detailinfo" v-if="serviceType == 1 && type==4 && orderStatus == 900">
        <p>订单：{{detailcontent.orderId}}</p>
        <!--<p>运营商名称：{{detailcontent.CPO_name}}</p>-->
        <!--<p>开始时间：{{detailcontent.StartTime}}</p>-->
        <!--<p>结束时间：{{detailcontent.EndTime}}</p>-->
        <!--<p>累计充电量：{{detailcontent.TotalPower}}度</p>-->
        <!--<p>总电费：{{detailcontent.TotalElecMoney}}元</p>-->
        <!--<p>总服务费：{{detailcontent.TotalServiceMoney}}元</p>-->
        <!--<p>累积总金额：{{detailcontent.TotalAmount}}元</p>-->
        <p>订单状态：{{statusshow(orderStatus)}}</p>
        <p>停止充电原因：{{detailcontent.orderStatusMsg}}</p>
      </div>
        <div class="detailinfo" v-if="serviceType == 2 && type==1">
        <p>尊敬的车主</p>
        <p>您的爱车驶入：{{detailcontent.parkName}}</p>
        <p>车牌号：{{detailcontent.plateNo}}</p>
        <p>入场时间：{{detailcontent.entranceTime}}</p>
        <!--<p>预计出场时间：{{detailcontent.planLeaveTime}}</p>-->
      </div>
        <div class="detailinfo" v-if="serviceType == 2 && type==2">
        <p>尊敬的车主</p>
        <p>您的爱车驶出：{{detailcontent.parkName}}</p>
        <p>车牌号：{{detailcontent.plateNo}}</p>
        <p>入场时间：{{detailcontent.entranceTime}}</p>
        <p>出场时间：{{detailcontent.pushTime}}</p>
        <p>出场缴费金额：{{detailcontent.exitPayment}}元</p>
      </div>
        <div class="detailinfo" v-if="serviceType == 2 && type==3">
        <p>尊敬的车主</p>
        <p>您的爱车驶出：{{detailcontent.parkName}}</p>
        <p>车牌号：{{detailcontent.plateNo}}</p>
        <p>入场时间：{{detailcontent.entranceTime}}</p>
        <p>出场时间：{{detailcontent.pushTime}}</p>
        <p>缴费状态：{{statusshow(detailcontent.status)}}</p>
      </div>
      <div class="detailinfo" v-if="serviceType == 3 && (type==1||type==2)">
        <p>订单：{{detailcontent.orderId}}</p>
        <p>订单状态: 支付{{type==1?'成功':'失败'}}</p>
        <p>订单类型: {{detailcontent.fee>=0?'停车':'充电'}}</p>
        <p v-if="type==1">支付金额: {{detailcontent.fee>=0?detailcontent.fee:detailcontent.amount}}元</p>
      </div>
        <div class="detailinfo" v-if="serviceType == 3 && (type==4||type==5)">
        <p>尊敬的车主</p>
        <p>您的支付账号：{{detailcontent.telephone}}</p>
        <p>{{type==4?'登录':'登出'}}时间：{{type==4?detailcontent.loginTime:detailcontent.logoutTime}}</p>
        <p>车牌号：{{detailcontent.plate}}</p>
      </div>
        <div class="detailinfo" v-if="serviceType == 3 && (type==6||type==7)">
        <p>尊敬的车主</p>
        <p>您的支付账号被车主：{{detailcontent.telephone}}</p>
        <p>于{{type==6?'登录':'登出'}}时间：{{type==6?detailcontent.loginTime:detailcontent.logoutTime}}</p>
        <p>车牌号：{{detailcontent.plate}}</p>
      </div>
        <div class="detailinfo" v-if="serviceType == 4 && type==1">
        <p>尊敬的车主</p>
        <p>您的车车辆：{{detailcontent.plateNo}}</p>
        <p>即将到达总里程维修保养标准，请尽快进行维修保养</p>
      </div>
        <div class="detailinfo" v-if="serviceType == 4 && type==2">
        <p>尊敬的车主</p>
        <p>您的车牌号：{{detailcontent.plate || '无'}} 指令下发{{statusshow(detailcontent.executeResult)}}</p>
        <p>指令类型：{{detailcontent.name}}</p>
      </div>
      <div class="detailinfo" v-if="serviceType == 5 && type==1">
        <p>尊敬的车主</p>
        <p>您的车牌号：{{detailcontent.plateNo}} 存在未支付的订单</p>
        <p>请到智能泊车->历史订单中支付</p>
      </div>
      <div class="detailinfo" v-if="serviceType == 5 && type==2">
        <p>尊敬的车主</p>
        <p>您的车牌号：{{detailcontent.plateNo}}</p>
        <p>订单：{{detailcontent.orderId}}</p>
        <p>已付款成功</p>
      </div>
    </div>
</template>
<script>
export default {
  data(){
    return{
      detailcontent:{},
      serviceType:null,
      type:null,
      orderStatus:null
    }
  },
  methods:{
    init(){
      this.$http.get(IMFORMATION.notificationPushDetail+'?id='+this.$route.params.id).then((res)=>{
        if(!res.data.code){
            this.detailcontent = res.data.data.dataMap.content
            this.serviceType = res.data.data.serviceType
            this.type = res.data.data.type
            this.orderStatus = res.data.data.dataMap.content.orderStatus
          console.log(this.serviceType,this.type,this.orderStatus)
        }else{
          let instance = Toast({
            message: res.data.msg,
            position: 'middle',
            duration: 1000
          });
        }
      }).catch((err)=>{

      })
    },
    //显示状态
    statusshow(status){
      switch (status){
        case 500:return "启动中";
        case 700:return "退款中";
        case 800:return "已停止";
        case 900:return "已完成";
        case 10:return "成功";
        case 20:return "失败";
        case 0:return "成功";
        case 1:return "失败";
      }
    },
    orderstatus(status){
      switch (status){
        case 1:return "远程热管理";
        case 2:return "远程关闭空调";
        case 3:return "远程设置空调温度";
        case 4:return "远程停止充电";
        case 5:return "远程充电";
        case 6:return "远程延时充电";
        case 7:return "远程上报最新数据";
        case 8:return "远程定时上报数据";
        case 9:return "停止远程热管理";
      }
    }
  },
  mounted(){
    this.init()
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.content_p {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem;
}
.content_t {
  font-size: 0.35rem;
  color: rgba(10, 4, 4, 0.8);
  font-weight: 700;
}
.content_x {
  font-size: 0.22rem;
  color: rgba(10, 4, 4, 0.86);
}
.wen {
  padding: 0.2rem 0.4rem;
  font-size: 0.23rem;
  color: rgba(10, 4, 4, 0.5);
  line-height: 0.5rem;
}
  .detailinfo>p{
    font-size: 0.28rem;
    color: #555;
    padding: 0.1rem 0.2rem;
  }
</style>


