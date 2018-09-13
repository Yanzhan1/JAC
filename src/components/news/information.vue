<template>
    <div>
        <header class="header">
            <img @click="$router.go(-1)" class="header-left" :src="'./static/images/back@2x.png'" style="margin-left:.4rem">
            <span class='header-title'>通知</span>
            <span></span>
        </header>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomLoadingText="loadingText" ref="loadmore" :topDistance="20">
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="font-size: 0.3rem">下拉刷新</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
        <div
          v-infinite-scroll="getNextList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <!--<div v-if="List.length==0">
            <div style="height: 8rem;"></div>
          </div>-->
          <ul class="content">
            <li class="area" v-for="(item,index) in List" @click="todetail(item.id)" style="">
              <div v-if="item.serviceType == 1">
                <div class="flex cocenter listpadding between" style="font-size:0.36rem;color: #555;font-weight: bolder">
                    <div>
                      <span v-if="!item.readStatus" style="width: 0.16rem;height: 0.16rem;border-radius: 50%;background: red;display: inline-block">
                      </span>{{item.dataMap.title}}通知
                    </div>
                      <span style="font-size: 0.28rem;font-weight: normal">{{getTime(item.createdDate)}}</span>
                  </div>
                <p class="flex cocenter listpadding">欢迎使用{{item.dataMap.content.CPO_name}}</p>
                <p class="flex cocenter listpadding">状态:{{statusshow(item.dataMap.content.orderStatus)}}</p>
              </div>
              <div v-if="item.serviceType == 2">
                <div class="flex cocenter listpadding between" style="font-size:0.36rem;color: #555;font-weight: bolder">
                    <div>
                      <span v-if="!item.readStatus" style="width: 0.16rem;height: 0.16rem;border-radius: 50%;background: red;display: inline-block">
                      </span>{{item.dataMap.title}}
                    </div>
                    <span style="font-size: 0.28rem;font-weight: normal">{{getTime(item.createdDate)}}</span>
                  </div>
                <p class="flex cocenter listpadding">尊敬的车主您的爱车{{item.type==1?'驶入':'驶出'}}{{item.dataMap.content.parkName}}车牌号为{{item.dataMap.content.plateNo}}</p>
                <p class="flex cocenter listpadding" v-if="item.dataMap.content.status">订单缴费:{{item.dataMap.content.status == 10?'成功':'失败'}}</p>
              </div>
              <div v-if="item.serviceType == 3">
                <div class="flex cocenter listpadding between" style="font-size:0.36rem;color: #555;font-weight: bolder">
                    <div class="flex cocenter">
                      <span v-if="!item.readStatus" style="width: 0.16rem;height: 0.16rem;border-radius: 50%;background: red;display: inline-block">
                      </span>
                      <span v-if="item.type == 4||item.type == 6">您的支付账号已登录</span>
                      <span v-if="item.type == 5||item.type == 7">您的支付账号已登出</span>
                      <span v-if="item.type == 1">您的账号支付成功</span>
                      <span v-if="item.type == 2">您的账号支付失败</span>
                    </div>
                    <span style="font-size: 0.28rem;font-weight: normal">{{getTime(item.createdDate)}}</span>
                </div>
              </div>
              <div v-if="item.serviceType == 4">
                <div class="flex cocenter listpadding between" style="font-size:0.36rem;color: #555;font-weight: bolder">
                  <div>
                    <span v-if="!item.readStatus" style="width: 0.16rem;height: 0.16rem;border-radius: 50%;background: red;display: inline-block">
                    </span>{{item.dataMap.title}}
                  </div>
                  <span style="font-size: 0.28rem;font-weight: normal">{{getTime(item.createdDate)}}</span>
                </div>
                <p class="flex cocenter listpadding" v-if="item.type == 1">尊敬的用户你的车辆即将达到总里程维修保养标准，请尽快进行维修保养</p>
                <p class="flex cocenter listpadding" v-if="item.type == 2">尊敬的用户你的车辆指令已下发</p>
              </div>
              <div v-if="item.serviceType == 5">
                <div class="flex cocenter listpadding between" style="font-size:0.36rem;color: #555;font-weight: bolder">
                  <div>
                    <span v-if="!item.readStatus" style="width: 0.16rem;height: 0.16rem;border-radius: 50%;background: red;display: inline-block">
                    </span>{{item.dataMap.title}}
                  </div>
                  <span style="font-size: 0.28rem;font-weight: normal">{{getTime(item.createdDate)}}</span>
                </div>
                <p class="flex cocenter listpadding" v-if="item.type == 1">尊敬的用户你存在未支付的订单请到智能泊车->历史订单中支付</p>
                <p class="flex cocenter listpadding" v-if="item.type == 2">尊敬的用户你已付款成功</p>
              </div>
              <div class="teyu" >
                <span class="look">点击查看</span>
                <span><img src="../../../static/images/next@2x.png" alt=""></span>
              </div>
            </li>

          </ul>
          <!--<div v-for="(item,index) in List">

          </div>-->
        </div>
      </mt-loadmore>
      <div style="height: 2rem;"></div>
      <p id="showAll2">已加载全部</p>
    </div>
</template>
<script>
  import { Toast } from 'mint-ui';
export default {
  data(){
    return{
      loadingText: "",
      allLoaded: false,
      loadEnd:false,
      loading:false,
      topStatus:'',
      pageNum:1,
      length:4,
      List:[]
    }
  },
  methods: {
    getTime(time){
     return operationTime.getTime(time)
    },
    todetail(id){
      this.$http.get(IMFORMATION.changeReadStatus+'?id='+id).then((res)=>{
          if(!res.data.code){
            this.$router.push({name:'info_details',params:{id}})
          }else{
            let instance = Toast({
              message: res.data.msg,
              position: 'middle',
              duration: 1000
            });
          }
      }).catch((err)=>{

      })
        // this.$router.push({name:'info_details',params:{id}})
    },
    //显示状态
    statusshow(status){
        switch (status){
          case 500:return "启动中";
          case 700:return "退款中";
          case 800:return "已停止";
          case 900:return "已完成";
        }
    },
    fn() {
      this.$router.push("/info/info_details");
    },
    loadTop() {
      this.init();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {
    },
    //1，通知 2、评论 3、活动
    //readState 已读状态
    init(){
      //获取列表第一页
      let _this = this;
      this.loading=true;
      this.loadEnd=false;
      _this.pageNum=1;
      this.$http.post(IMFORMATION.notificationPushList, {"userId": this.$store.state.tspuserId,"pageNo":_this.pageNum, "length":_this.length}).then(function (res) {
        if (!res.data.code) {
          console.log()
          _this.loading=false;
          _this.List = res.data.data.list;
          if(res.data.data.recordsTotal <= _this.list){
            _this.loadEnd = true;
          }
        } else {
          console.log(res.data.errorMsg);
        }
      });
    },
    //通知list翻新
    getNextList: function () {
      let _this = this;
      if(this.loadEnd){
        this.loadBottom();
        return;
      }
      this.loadEnd=true;
      this.pageNum++;
      this.$http.post(IMFORMATION.notificationPushList, {"userId": this.$store.state.tspuserId,"pageNo":_this.pageNum, "length":_this.length}).then(function (res) {
        _this.loadEnd=false;
        if (!res.data.code) {
          _this.List = _this.List.concat(res.data.data.list);
          var allPages = Math.ceil(res.data.data.recordsTotal/_this.length);
          if(allPages <= _this.pageNum){
            _this.loading = true;
            _this.allLoaded = true;
            _this.loadEnd = true;
            $("#showAll2").show();
          }
        } else {
          _this.pageNum = _this.pageNum -1;
          console.log(res.data.errorMsg);
        }
      });
    },
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
li {
  list-style: none;
  margin-top: 0.2rem;
}
.content {
  background-color: #f8f8f8;
  width: 100%;
  padding: 0.5rem 0.4rem 0.4rem 0.4rem;
}
.area {
  border: 1px solid #ccc;
  background-color: #fff;
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
.teyu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem;
  border-top: 1px solid #ccc;
  height: 0.62rem;
}
.look {
  font-size: 0.24rem;
  color: rgba(252, 87, 31);
}
#showAll2{
  display: none; font-size: 0.3rem;margin: auto;text-align: center
}
  .listpadding{
    padding: 0.1rem 0.2rem;
    font-size: 0.28rem;
  }
</style>

