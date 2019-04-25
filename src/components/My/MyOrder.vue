<template>
	<div>
		<header class="header MobileHeight header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title" style="margin-right: 0.65rem;">我的订单</span>
			<span class="header-right"></span>
		</header>
		<div style="height:.88rem" class="MobileHeight"></div>
		<!--<mhead currentTitle="我的订单"></mhead>-->
    <!-- <div >
      <mt-navbar v-model="selected">
			<mt-tab-item id="one">线索</mt-tab-item>
			<mt-tab-item id="five">流量</mt-tab-item>
		  </mt-navbar>
    </div> -->
    <div style="position:fixed;width:100%;background:#fff;">

      <div class="box">
        <div @click="showlist" >
          <div>线索</div>
          <div v-show="this.list" style="width:100%;height:.04rem;background:#49BBFF;margin-top:.1rem;"></div>
        </div>
        <div @click="showflow">
          <div>流量</div>
          <div v-show="this.flow" style="width:100%;height:.04rem;background:#49BBFF;margin-top:.1rem;"></div>
        </div>
        <div @click="showMaintenance" >
          <div>维保</div>
          <div v-show="this.Maintenance" style="width:100%;height:.04rem;background:#49BBFF;margin-top:.1rem;"></div>
        </div>
      </div>
    </div>
		
		<!-- <mt-tab-container v-model="selected"> -->
			<!-- <mt-tab-container-item id="one"> -->
				<ul v-if="flag" v-show="this.list" style="margin-top:.7rem;">
					<li class="flex column" v-for="(item,index)  in Xorder" :key="index">
						<p class="flex row tim">
							<span class="times">{{item.time}}</span>
							<span></span>
						</p>
						<div class="flex row con" @click="toDetauls(item)">
							<div class="flex column bus_left">
								<img style="height:1.2rem;width:2.46rem" :src="item.imageUrl" alt="">
								<!-- <span class="busname">{{item.model}}</span> -->
							</div>
							<div class="flex column tp">
								<span class="bus_right">品牌: {{item.seriesName}}</span>
								<span class="bus_right">经销商：{{item.dealerName}}</span>
								<span class="bus_right">地址：{{item.address}}</span>
								<span class="bus_right">订单编号：{{item.mediaLeadId}}</span>
								<!-- <span class="bus_right">备注：{{item.comments}}</span> -->

							</div>
						</div>
						<div class="flex row between bt">
							<span></span>
							<!-- <span class="cancel" @click="confirmRevise()">取消订单</span> -->
						</div>
					</li>
				</ul>
			<!-- </mt-tab-container-item> -->
			<!-- <mt-tab-container-item id="five"> -->
				<ul v-show="this.flow" style="margin-top:.7rem;">
					<router-link tag="li" class="flex column" v-for="(item,index) in allflowbuy" :key="index"  :to="{path:'/myindex/flowOrderDetails', query: {flowDetail: item}}">
						<p class="flex row tim between">
							<span class="times">{{item.purchaseTime}}</span>
							<span class="times" >{{trafficOrder[item.paymentStatus]}}</span>
						</p>
						<div class="cont">
							<div class="flex column tp">
								<!--<span class="bus_right">地址：上海市徐汇区田林路200号</span>-->
								<span class="flowPacket-title">{{item.packetName}}</span>
								<span class="bus_right">订单编号：{{item.orderId}}</span>
								<span class="bus_right">流量价格：{{item.price|toyuan}}元</span>
							</div>
							<div class="flex column bus_left">
								<img src="../../../static/images/next@2x.png" alt="">
							</div>
						</div>
						<div class="flex row between bt">
							<span></span>
							<div>
								<!-- <span class="cancel" :class=" item.paymentStatus == 0? 'active' : ''">付款</span> -->
								<!-- <span class="cancel">取消订单</span> -->
							</div>
						</div>
					</router-link >
				</ul>
        <ul v-show="this.Maintenance" style="margin-top:.7rem;">
          <li class="flex column sigleli" v-for="(item,index) in datalist" :key="index">
              <div @click="goMaintenancedetail(item)">
                  <p class="flex row tim between">
                    <span class="times">{{item.revervationDate}}&nbsp&nbsp{{item.revervationTime}}</span>
                    <span :class="item.revervationStatus=='已取消'?'makedtwo':'makedone'" >{{item.revervationStatus}}</span>
                  </p>
                  <div class="cont">
                    <div class="flex column tp">
                      <!--<span class="bus_right">地址：上海市徐汇区田林路200号</span>-->
                      <span class="flowPacket-title">{{item.dealerName}}</span>
                      <span class="bus_right">维保类型：{{item.revervationTypeName}}</span>
                      <span class="bus_right">车牌号:{{item.licenseNumber}}</span>
                      <span class="bus_right">车辆VIN:{{item.vin}}</span>
                    </div>
                    <div class="flex column bus_left">
                      <img src="../../../static/images/next@2x.png" alt="">
                    </div>
                  </div>
              </div>
              <div class="cancellation flex cocenter" v-if="item.revervationStatus!='已取消'" @click="cancelbable(item.no)">
                <div>取消订单</div>
              </div>
					</li >
        </ul>
			<!-- </mt-tab-container-item>
		</mt-tab-container> -->
	</div>
</template>
<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import PublicHead from "../publicmodel/PublicHead";
export default {
  name: "myOrder",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      selected: "one",
      Xorder: {}, //线索订单
      flag: true,
      list: false, //线索展示
      flow: false, //流量展示
      Maintenance: false, //维保展示
      datalist:[],//维保预约数据
      allflowbuy: [],
      allmaintenance: [],
      shoppingMall: [], //商城订单
      trafficOrder: {
        "0": "付款失败",
        "1": "已完成"
      },
      url: ""
    };
  },
  methods: {
    toDetauls(item) {
      this.$router.push({
        path: "/orderdetails",
        query: item
      });
    },
    showlist() {
      this.list = true;
      this.flow = false;
      this.Maintenance = false;
    },
    showflow() {
      this.flowbuy();
      this.list = false;
      this.flow = true;
      this.Maintenance = false;
    },
    showMaintenance() {
      this.Maintenance = true;
      this.flow = false;
      this.list = false;
      this.appointment();
    },
    //跳转维保详情
    goMaintenancedetail(item){
      this.$router.push({
        path:'/myindex/Maintenancedetail',
        query:item
      })
    },
    //跳转商城详情
    todetail() {
      location.href =
        "http://14.21.46.171:8707/authLogin?uid=1&mobile=13721658974&userName=测试&t测试&t测试&toOrderList=suc&token=96469f768921ff5811a22162fabe0bd0";
    },
    confirmRevise() {
      MessageBox.confirm("", {
        title: "提示",
        message: "您确定要取消吗？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      })
        .then(action => {
          if (action == "confirm") {
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    },
    wul() {
      this.$router.push("/mywl");
    },
    compontent() {
      this.$router.push("/compontent");
    },
    // getShoppingMall() {
    //   //商城订单
    //   let data = {
    //     no: "AD022018082803151446865"
    //   };
    //   this.$http
    //     .post(My.orderList, data)
    //     .then(res => {
    //       const data = res.data;
    //       if (data.code == 0) {
    //         this.shoppingMall = data.data;
    //       }else{
    //           Toast({
    //               message: data.msg,
    //               duration: 1000,
    //               position: "middle"
    //             });
    //       }
    //     })
    //     .catch(err => {});
    // },
    //取消订单
    cancelbable(val){
      let data={
        no:val,
        brandNo:this.$store.getters.defaultInformation.brandNo
      }
      this.$http.post(My.cancelMaintenanceAppointment,data).then((res)=>{
        if(res.data.code==0){
                Toast({
                  message: '已成功取消',
                  duration: 1000,
                  position: "middle"
                });
                this.appointment()
        }else{
          Toast({
                  message: res.data.msg,
                  duration: 1000,
                  position: "middle"
                });
        }
      })
    },
    //流量订单
    flowbuy() {
      var params = {
        userName: this.$store.state.mobile
      };
      this.$http
        .post(Lovecar.Getoederlist, params, this.$store.state.tsppin)
        .then(res => {
          this.allflowbuy = res.data.data;
        });
    },
    //维保预约订单
    appointment(){
      let param = {
        // vin: "LJ12EKR21J4931800",
        brandNo:this.$store.getters.defaultInformation.brandNo,
        revervationStatus: "",
        vin:this.$store.state.defaultInformation.vin,
      };
       this.$http
        .post(Wit.synchronousMaintenanceAppointmentByDms, param)
        .then(res => {
          if (res.data.code == 0) {
            let data = {
              size: 99,
              current: 1,
              // vin: "LJ12EKR21J4931800"
              vin:this.$store.state.defaultInformation.vin,
            };
            this.$http
              .post(Wit.searchMaintenanceAppointmentListPage, data)
              .then(res => {
                if (res.data.code == 0) {
                  this.datalist = res.data.data.records;
                }
              });
          }
        });
    
    },
    //线索订单
    GetXorder() {
      var no = this.$store.state.userId;
      var dealerType = "01";
      this.$http
        .post(My.ClueOrder, {
          userNo: no,
          dealerType: dealerType
        })
        .then(res => {
          if (res.data.code == 0) {
            if (res.data.data.records.length == 0) {
              this.flag = false;
            }
            this.Xorder = res.data.data.records;
            for (let i = 0; i < this.Xorder.length; i++) {
              this.Xorder[i].time = operationTime.getTime(
                this.Xorder[i].createdDate,
                1
              );
              if (this.Xorder[i].imageRelationVO.length > 0) {
                for (
                  let j = 0;
                  j < this.Xorder[i].imageRelationVO.length;
                  j++
                ) {
                  if (this.Xorder[i].imageRelationVO[j].imageType == "6") {
                    this.Xorder[i].img = this.Xorder[i].imageRelationVO[
                      j
                    ].imageUrl;
                  }
                }
              } else {
                this.Xorder[i].img = "";
              }
            }
          }
        });
    },
    Getoederlist() {
      let params = {
        vin: this.$store.state.defaultInformation.vin
      };
      this.$http.post(Lovecar.Getoederlist, params).then(res => {
      });
    }
  },
  filters:{
        toyuan(moy){
          return moy/100
        }
  },
  created() {
    this.GetXorder();
    // this.flowbuy();
    // this.appointment();
    // this.getShoppingMall();
  },
  mounted() {
    //			console.log('加密:' + this.$md5('uid=1jac.com'))
  
    $(".MobileHeight").css({
      borderTopWidth: this.$store.state.mobileStatusBar,
      borderTopColor: "#fff"
    });
    if (this.$route.params.show == 1) {
      this.showflow();
    }  else  if(this.$route.query.show == '2'){
        this.showMaintenance();
    }else{
      this.list=true
    }
  }
};
</script>
<style scoped>
.header {
  background: #fff;
}
.MobileHeight {
  border-top-style: solid;
  box-sizing: content-box;
}
.box {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.mint-navbar .mint-tab-item {
  padding: 0.3rem 0;
  font-size: 0.28rem;
  color: #555;
}

.mint-navbar {
  border-bottom: 0.01rem solid #f1f1f1;
  padding: 0 0.3rem;
}

.times {
  padding: 0.3rem 0;
  font-size: 0.24rem;
  color: #888;
}
.makedone{
  padding: 0.3rem 0;
  font-size: 0.3rem;
  color: #49bbff;
}
.makedtwo{
  padding: 0.3rem 0;
  font-size: 0.3rem;
  color: #888;
}
.order {
  color: #ff802f;
}

.tim {
  border-bottom: 0.01rem solid #f1f1f1;
  padding: 0 0.4rem;
}
.bus_left {
  justify-content: center;
}
.bus_left > img {
  width: 0.4rem;
  height: 0.4rem;
}

.busname {
  color: #49bbff;
  font-size: 0.28rem;
  text-align: center;
  margin-top: 0.2rem;
}

.bus_right {
  font-size: 0.24rem;
  color: #555;
  margin-top: 0.15rem;
  /* font-family:  */
}

.tp {
  /*margin-top: 0.15rem;
		margin-left: 0.4rem;*/
}
.tp > .flowPacket-title {
  font-weight: bold;
}
.bt {
  border-top: 1px solid #f1f1f1;
  border-bottom: 0.2rem solid #f5f5f5;
  line-height: 0.9rem;
  padding: 0 0.4rem;
}

.bts {
  border-top: 1px solid #f1f1f1;
  border-bottom: 0.2rem solid #f5f5f5;
  justify-content: flex-end;
  align-items: center;
  height: 0.9rem;
  line-height: 0.9rem;
}
.bts > .cancel {
  display: inline-block;
  padding: 0 0.2rem;
  height: 0.5rem;
  line-height: 0.5rem;
  min-width: 1.1rem;
  color: #888888;
  border: 1px solid #cccccc;
  font-size: 0.22rem;
  text-align: center;
  border-radius: 0.3rem;
}
.bt div > .cancel {
  display: inline-block;
  padding: 0 0.2rem;
  height: 0.5rem;
  line-height: 0.5rem;
  min-width: 1.1rem;
  color: #888888;
  border: 1px solid #cccccc;
  font-size: 0.22rem;
  text-align: center;
  border-radius: 0.3rem;
}

.con {
  padding-bottom: 0.3rem;
}

.cont {
  display: flex;
  justify-content: space-between;
  padding: 0.3rem 0.3rem 0.3rem 0.9rem;
}

.buycity {
  height: 2rem;
}

.pictu {
  margin: 0 0.5rem;
}
.bt div .active {
  color: #49bbff;
  border: 1px solid #49bbff;
}
.maincenter {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}
.cancellation{
  width: 100%;
  height: .5rem;
  flex-direction:row-reverse;
  padding: .4rem;
}
.cancellation>div{
  width: 1.5rem;
  height: .5rem;
  border: .02rem solid #eee;
  border-radius:.5rem;
  text-align: center;
  line-height: .5rem;
}
.sigleli{
  border-bottom: .1rem solid #eee;
}
</style>