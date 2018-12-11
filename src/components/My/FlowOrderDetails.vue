<template>
	<div>
		<mhead currentTitle="订单详情"></mhead>
		<div class="wrapper">
			<div class="detail-box">
				<span>订单编号</span>
				<span>{{flowDetail.orderId}}</span>
			</div>
			<div class="detail-box">
				<span>流量包名称</span>
				<span>{{flowDetail.packetName}}</span>
			</div>
			<div class="detail-box">
				<span>流量价格</span>
				<span>{{flowDetail.price}}(元)</span>
			</div>
			<div class="detail-box">
				<span>流量大小</span>
				<span>{{flowDetail.flowSize}}M</span>
			</div>
		</div>
		<div class="line"></div>
		<div class="wrapper">
			<div class="detail-box">
				<span>购买时间</span>
				<span>{{flowDetail.purchaseTime}}</span>
			</div>
			<div class="detail-box">
				<span>失效日期</span>
				<span>{{flowDetail.effectEnd}}</span>
			</div>
		</div>
	</div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead'
	export default {
		name: 'flowOrderDetail',
		components: {
			mhead: PublicHead
		},
		data() {
			return {
				flowDetail: this.$route.query.flowDetail,
				alldetail:{}
			}
		},
		methods:{
			detail(){
				let data={
					orderId:this.flowDetail.orderId
				}
				this.$http.post(Lovecar.Getoederlistapp,data,this.$store.state.tsppin).then((res)=>{
					if(res.data.returnSuccess){
						this.alldetail=res.data.data
					}
				})
			}
		},
		mounted() {
			console.log(this.flowDetail)
			// this.detail()
		}
	}
</script>

<style scoped>
	.wrapper {
		padding: 0 .27rem
	}
	
	.detail-box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 1rem;
		border-bottom: 1px solid #F1F1F1;
	}
</style>