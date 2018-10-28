<template>
	<div class="login-vehicleState">
		<mhead currentTitle="车机登录状态"></mhead>
		<div class="vehicle-show">
			<img class="state-car" src="../../../static/images/my/car@2x.png" alt="" />
			<div>
				<h5 class="car-title">您已登录账号到车机</h5>
				<div class="car-info">
					<span style="font-size: .26rem;color: #999999;margin-right: .3rem;">车辆VIN:</span><span style="font-size: .32rem;color: #49BBFF;">{{vin}}</span>
				</div>			
			</div>
		</div>
		<h3 class="out" @click="out">机车登出</h3>
	</div>
</template>

<script>
	import { Toast } from "mint-ui";
	import PublicHead from '../publicmodel/PublicHead'
	export default {
		name: 'loginVehicleState',
		components: {
	  	mhead:PublicHead
	  },
		data () {
			return {
				vin: this.$route.query.vin
			}
		},
		methods:{
			out(){
				let data={
					vin:this.$route.query.vin
				}
				this.$http.post(Lovecar.loginOut,data,this.$store.state.tsppin).then((res)=>{
					console.log(res)
					//  Toast({
					// 		message: res.data.returnErrMsg,
					// 		position: "middle",
					// 		duration: 2000
					// 	});
				})
			}
		}
	}
</script>

<style scope>
	.out{
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		height: 1rem;
		background: #49bbff;
		line-height: 1rem;
		text-align: center;
		color: #fff;
	}
	.vehicle-show {
		display: flex;
    position: absolute;
		flex-direction: column;
		justify-content: center;
		align-items: center;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
	}
	.state-car {
		width: 2.2rem;
		height: 1.73rem;
		margin-bottom: 1.14rem;
	}
	.car-title {
		margin-bottom: .39rem;
		color: #444444;
		font-size: .36rem;
		text-align: center
	}
	.car-info {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 5rem;
		text-align: center;
	}
</style>