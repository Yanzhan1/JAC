<template>
	<div class="place-order">
		<mhead currentTitle="提交订单"></mhead>
		<div class="order-header">
			<h5>{{this.$store.state.brandName}}</h5>
			<p>汽车VIN：{{this.$store.state.vins}}</p>
		</div>
		<div class="lines"></div>
		<div class="order-detail">
			<div class="order-num">
				<span class="num">{{placeOrder.size}}</span>
				<span class="unit">MB</span>
			</div>
			<div class="order-info">
				<h5>{{placeOrder.packageName}}</h5>
				<span>￥
					<span style="font-size: .48rem;">{{placeOrder.prize}}</span>元</span>
			</div>
		</div>
		<div class="linetwo"></div>
		<!-- <div class="pay-method">
			<p>支付方式</p>
			<button class="money-way">微信支付</button>
		</div> -->
		<div class="bottomBtn">
			<div class="package-price">
				<span style="font-size: .26rem;color: #666666;">套餐价格:</span>
				<span style="font-size: .38rem;color: #49BBFF;">
					<span style="font-size: .48rem;color: #49BBFF;">{{placeOrder.prize}}</span>元</span>
			</div>
			<div class="submit" style="background: #49BBFF;color: #FFFFFF;" @click="submit">
				<span>去支付</span>
			</div>
		</div>

	</div>
</template>

<script>
import {Toast} from "mint-ui"
import PublicHead from "../publicmodel/PublicHead";
export default {
  name: "placeOrder",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      placeOrder: this.$route.query.flow
    };
  },
  methods: {
    //生成流量订单接口

    submit() {
      let param = {
        vin: this.$store.state.vins,
        phone:this.$store.state.mobile,
        userid:this.$store.state.userId,
        aaauserid:this.$store.state.aaaid,
        //vin: 'LJ12EKS10J00001S4',
        packetId: this.placeOrder.packageId
      };
      this.$http
        .post(Lovecar.Productionorder, param, this.$store.state.tsppin)
        .then(res => {
          if (res.data.returnErrCode == 200) {
			  var tranData=res.data.data.tranData
			  var merSignMsg=res.data.data.merSignMsg
			  var merCert=res.data.data.merCert
            //   alert(merCert)
            js2android.startIcbcPay(tranData, merSignMsg, merCert);
          }else{
             Toast({
                  message: res.data.returnErrMsg,
                  duration: 1000,
                  position: "middle"
                });
          }
        });
    },
    goflowlist(){
        this.$router.push({
                    name:'我的订单',
                    params:{
                           show:1
                }
             })
    }
  },
  mounted() {}
};
</script>

<style scoped>
/*订单title*/
.order-header {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 0.5rem;
}
.order-header > h5 {
  margin-bottom: 0.3rem;
}
.lines {
  width: 95%;
  background: #dcdcdc;
  height: 0.01rem;
  margin: 0 auto;
}
/*订单介绍*/
.order-detail {
  display: flex;
  padding: 0.5rem 0.7rem;
}
.order-num {
  height: 1rem;
  line-height: 1rem;
  padding-right: 0.4rem;
  border-right: 0.01rem solid #f1f1f1;
}
.num {
  font-size: 0.6rem;
  background: linear-gradient(180deg, #2099ff, #79bff9, #0f46f9);
  -webkit-background-clip: text;
  color: transparent;
}
.unit {
  background: linear-gradient(180deg, #2099ff, #79bff9, #0f46f9);
  -webkit-background-clip: text;
  color: transparent;
}
.order-info {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  padding-left: 0.4rem;
}
.order-info span {
  background: linear-gradient(180deg, #2099ff, #79bff9, #0f46f9);
  -webkit-background-clip: text;
  color: transparent;
}
.linetwo {
  width: 95%;
  background: #dcdcdc;
  height: 0.01rem;
  margin: 0 auto;
  margin-bottom: 0.42rem;
}
/*支付方式*/
.pay-method {
  padding: 0 0.3rem;
}
.pay-method > p {
  margin-bottom: 0.4rem;
}
.money-way {
  display: block;
  width: 1.97rem;
  height: 1.44rem;
  line-height: 1.44rem;
  color: #49bbff;
  border: 0.01rem solid #49bbff;
  border-radius: 0.08rem;
  outline: none;
  background: none;
  background: url("../../../static/images/Lovecar/background@2x.png") no-repeat
    center center;
  background-size: 99% 99%;
}
.bottomBtn {
  position: fixed;
  display: flex;
  bottom: 0;
  width: 100%;
  height: 0.98rem;
  box-shadow: 0px 0px 0.1rem 0px rgba(68, 68, 68, 0.2);
}
.package-price,
.submit {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50%;
  text-align: center;
}
</style>