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
	</div>
</template>

<script>
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
		}
	}
</script>

<style scope>
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