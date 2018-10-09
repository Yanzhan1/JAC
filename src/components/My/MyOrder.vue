<template>
	<div>
		<header class="header MobileHeight">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title" style="margin-right: 0.65rem;">我的订单</span>
			<span class="header-right"></span>
		</header>
		<div style="height:.88rem" class="MobileHeight"></div>
		<!--<mhead currentTitle="我的订单"></mhead>-->
		<mt-navbar v-model="selected">
			<mt-tab-item id="one">线索</mt-tab-item>
			<mt-tab-item id="two">商城</mt-tab-item>
			<!-- <mt-tab-item id="three">维保</mt-tab-item>
            <mt-tab-item id="four">停车</mt-tab-item> -->
			<mt-tab-item id="five">流量</mt-tab-item>
		</mt-navbar>
		<mt-tab-container v-model="selected">
			<mt-tab-container-item id="one">
				<ul v-if="flag">
					<li class="flex column" v-for="(item,index)  in Xorder" :key="index">
						<p class="flex row tim">
							<span class="times">{{item.time}}</span>
							<span></span>
						</p>
						<div class="flex row con" @click="toDetauls(item)">
							<div class="flex column bus_left">
								<img style="height:1.2rem;width:2.46rem" :src="item.img" alt="">
								<!-- <span class="busname">{{item.model}}</span> -->
							</div>
							<div class="flex column tp">
								<span class="bus_right">品牌: {{item.seriesName}}</span>
								<span class="bus_right">经销商：{{item.dealerName}}</span>
								<span class="bus_right">地址：{{item.address}}</span>
								<span class="bus_right">订单编号：{{item.fkDealerId}}</span>
								<span class="bus_right">备注：{{item.comments}}</span>

							</div>
						</div>
						<div class="flex row between bt">
							<span></span>
							<!-- <span class="cancel" @click="confirmRevise()">取消订单</span> -->
						</div>
					</li>
				</ul>
				<ul v-else>
					<div style="text-align:center;margin-top:.2rem">暂无线索订单</div>
				</ul>
			</mt-tab-container-item>
			<mt-tab-container-item id="two">
				<ul>
					<li class="flex column">
						<p class="flex row tim between">
							<span class="times">2018 09-21 18:34</span>
							<span class="times">待付款</span>
						</p>
						<div class="buycity flex row cocenter between">
							<div class="flex row">
								<img class="pictu" src="../../../static/images/test/my/car_ruifeng_s5.png" alt="" style="height:1.2rem;width:1.14rem;">
								<div class="flex column cocenter maincenter">
									<p style="font-size:.31rem;color:#222;">马克华杯</p>
									<p style="font-size:.22rem;color:#888;">白色 400ml</p>
								</div>
							</div>
							<div class="flex row cocenter" style="margin-right:.3rem">
								<span style="font-size:.2rem;color:#222;">X 1</span>
								<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
							</div>
						</div>
						<div class="flex row between bts">
							<span class="cancels" v-if="3>4">退款申请</span>
							<span class="cancels" v-if="3>4">查看物流</span>
							<span class="cancels" @click="confirmRevise()">取消订单</span>
							<span class="cancel" v-if="3>4">评价晒单</span>
							<span class="cancel">待付款</span>
						</div>
					</li>
				</ul>
			</mt-tab-container-item>
			<!-- <mt-tab-container-item id="three">
                <ul>
                    <li class="flex column">
                        <p class="flex row tim between">
                            <span class="times">2018 09-21 18:34</span>
                            <span class="times">已预约</span>
                        </p>
                        <div class="flex row cont">
                            <div class="flex column bus_left">
                                <img style="height:1.68rem;width:2.56rem" src="../../../static/images/test/my/car_ruifeng_s5.png" alt="">
                                <span class="busname"></span>
                            </div>
                            <div class="flex column tp">
                                <span class="bus_right">预约网点：上海天马汽车销售有限</span>
                                <span class="bus_right">地址：上海市徐汇区田林路200号</span>
                                <span class="bus_right">预约时间：08509859043589</span>
                                <span class="bus_right">预约项目</span>
                            </div>
                        </div>
                        <div class="flex row between bt">
                            <span></span>
                            <span class="cancel">取消订单</span>
                        </div>
                    </li>
                    <li class="flex column">
                        <p class="flex row tim between">
                            <span class="times">2018 09-21 18:34</span>
                            <span class="times">已完成</span>
                        </p>
                        <div class="flex row cont">
                            <div class="flex column bus_left">
                                <img style="height:1.68rem;width:2.56rem" src="../../../static/images/test/my/car_ruifeng_s5.png" alt="">
                                <span class="busname"></span>
                            </div>
                            <div class="flex column tp">
                                <span class="bus_right">预约网点：上海天马汽车销售有限</span>
                                <span class="bus_right">地址：上海市徐汇区田林路200号</span>
                                <span class="bus_right">预约时间：08509859043589</span>
                                <span class="bus_right">预约项目:维修</span>
                            </div>
                        </div>
                        <div class="flex row between bt">
                            <span></span>
                            <span class="cancel" v-if="3>4">取消订单</span>
                            <span class="cancel">评价晒单</span>
                        </div>
                    </li>
                </ul>
            </mt-tab-container-item> -->
		</mt-tab-container>
	</div>
</template>
<script>
	import { MessageBox } from "mint-ui";
	import PublicHead from '../publicmodel/PublicHead';
	export default {
		name: 'myOrder',
		components: {
			mhead: PublicHead
		},
		data() {
			return {
				selected: "one",
				Xorder: {}, //线索订单
				flag: true
			};
		},
		methods: {
			toDetauls(item) {
				this.$router.push({
					path: "/orderdetails",
					query: item
				});
			},
			// confirmRevise() {
			//   MessageBox.confirm("", {
			//     title: "提示",
			//     message: "您确定要取消吗？",
			//     showConfirmButton: true,
			//     showCancelButton: true,
			//     cancelButtonClass: "cancelButton",
			//     confirmButtonClass: "confirmButton",
			//     confirmButtonText: "确定",
			//     cancelButtonText: "取消",
			//     confirmButtonHighlight: true,
			//     cancelButtonHighlight: true
			//   })
			//     .then(action => {
			//       if (action == "confirm") {
			//       }
			//     })
			//     .catch(err => {
			//       if (err == "cancel") {
			//       }
			//     });
			// },
			wul() {
				this.$router.push("/mywl");
			},
			compontent() {
				this.$router.push("/compontent");
			},
			//线索订单
			GetXorder() {
				// alert()
				var no = this.$store.state.userId;
				var dealerType = "01"
				this.$http
					.post(My.ClueOrder, {
						userNo: no,
						dealerType: dealerType
					})
					.then(res => {
						if(res.data.code == 0) {
							if(res.data.data.records.length == 0) {
								this.flag = false
							}
							this.Xorder = res.data.data.records;
							for(let i = 0; i < this.Xorder.length; i++) {
								this.Xorder[i].time = operationTime.getTime(this.Xorder[i].createdDate, 1);
								if(this.Xorder[i].imageRelationVO.length > 0) {
									for(let j = 0; j < this.Xorder[i].imageRelationVO.length; j++) {
										if(this.Xorder[i].imageRelationVO[j].imageType == "6") {

											this.Xorder[i].img = this.Xorder[i].imageRelationVO[j].imageUrl
										}
									}
								} else {
									this.Xorder[i].img = ""
								}

							}
						}

					});
			},
			Getoederlist(){
				let params={
					vin:this.$store.state.vins
				}
				this.$http.post(Lovecar.Getoederlist,params).then((res)=>{
					console.log(res)
				})
			}
		},
		created() {
			this.GetXorder();
		},
		mounted() {
			$(".MobileHeight").css({
				"borderTopWidth": this.$store.state.mobileStatusBar,
				"borderTopColor": "#fff",
			})
		}
	};
</script>
<style scoped>
	.MobileHeight {  
		border-top-style: solid;
		box-sizing: content-box;
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
	
	.tim {
		border-bottom: 0.01rem solid #f1f1f1;
		padding: 0 0.4rem;
	}
	
	.bus_left {
		margin-top: 0.4rem;
		margin-left: 0.4rem;
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
		margin-top: 0.15rem;
		margin-left: 0.4rem;
	}
	
	.bt {
		border-top: 1px solid #f1f1f1;
		border-bottom: 0.2rem solid #f5f5f5;
	}
	
	.bts {
		border-top: 1px solid #f1f1f1;
		border-bottom: 0.2rem solid #f5f5f5;
		justify-content: flex-end;
	}
	
	.cancel {
		text-align: center;
		line-height: 0.5rem;
		width: 1.4rem;
		color: #49bbff;
		border: 1px solid #49bbff;
		border-radius: 0.3rem;
		font-size: 0.24rem;
		margin-top: 0.2rem;
		margin-right: 0.4rem;
		margin-bottom: 0.2rem;
	}
	
	.cancels {
		text-align: center;
		line-height: 0.5rem;
		width: 1.4rem;
		color: #555;
		border: 1px solid #555;
		border-radius: 0.3rem;
		font-size: 0.24rem;
		margin-top: 0.2rem;
		margin-right: 0.4rem;
		margin-bottom: 0.2rem;
	}
	
	.con {
		padding-bottom: 0.3rem;
	}
	
	.cont {
		padding: 0.3rem 0;
	}
	
	.buycity {
		height: 2rem;
	}
	
	.pictu {
		margin: 0 0.5rem;
	}
</style>