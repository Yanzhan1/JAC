<template>
	<div>
		<mhead currentTitle="车机登录状态"></mhead>
		<div class="content">
			<div class="vehicle-show">
				<img class="state-car" :src="'./static/images/my/qrcode@2x.png'" alt="" />
				<div>
					<h5 class="car-title">账号还未在车机登录</h5>
					<div class="car-info">
						<p><nobr>点击扫码登录，登录账号到车机></nobr></p>
					</div>		
				</div>
			</div>
		</div>
			<div class="bottom-btn" @click="login">
				<img :src="'./static/images/my/code@2x.png'" alt="" />
				<span>扫码登录</span>
			</div>
</div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead'
	import { Toast } from "mint-ui";
	export default {
		name: 'logoutVehicleState',
		components: {
	  	mhead:PublicHead
	  },
		data () {
			return {
				
			}
		},
		methods: {
			login () {// 机车未登录 点击 扫一扫
				if(isMobile.iOS()) {
					var params = {};
					window.webkit.messageHandlers.scan.postMessage(params);
				} else if(isMobile.Android()) {
					js2android.scan();
				}
			},
			getStatus(status) {//暴露方法给原生,登入判断		
				this.$store.dispatch('QRCODEPIN', JSON.parse(status))
			}
		},
		created () {
  			window.getStatus = this.getStatus;
		},
		mounted () {
			console.log(this.$store.state.qrCodeDate)

		},
		computed: {
			qrCode() {
				return this.$store.state.qrCodeDate
			}
		},
		watch: {
				qrCode (newVal, oldVal) { //解决扫一扫无法及时获取二维码信息的异步问题
				if(this.qrCode) {
					// let nowtime=(new Date()).getTime()
					// console.log(nowtime-this.qrCode.createTime)
					// if((nowtime-this.qrCode.createTime)<500000){

						let data = {
							vin: this.qrCode.vin,
							userName: this.$store.state.mobile
						}
						this.$http.post(Lovecar.RemoteVehicleLogin, data, this.$store.state.tsppin).then(res => {
								const data = res.data
								//							console.log('扫一扫登入接口状态: '+data.returnSuccess)
								if(data.returnSuccess) {
										Toast({
											message: '登录成功',
												position: "middle",
												duration: 2000
										})
										setTimeout(() => {
											this.$router.replace({path: '/myindex/loginVehicleState', query:{vin: this.qrCode.vin}})
										}, 2000)
								}
							})
							.catch(err => {
	
							})
					// }else{
					// 	Toast({
					// 			message: '二维码超时',
					// 				position: "middle",
					// 				duration: 2000
					// 		})
					// }
				}
			}
		}
	}
</script>

<style scoped>
	.content{
		width: 100%;
		height:10rem;
		 position: relative;
	}
	.vehicle-show {
		display: flex;
    position: absolute;
	
		flex-direction: column;
		justify-content: center;
		align-items: center;
		left: 50%;
		top: 50%;
		margin-top: 1rem;
		transform: translate(-50%, -50%);
	}
.vehicle-show .state-car {
		width: 2.2rem;
		height: 1.73rem;
		margin-bottom: 1.14rem;
	}
	.vehicle-show .car-title {
		margin-bottom: .39rem;
		color: #444444;
		font-size: .36rem;
		text-align: center;
	}
	 .vehicle-show .car-info {
		text-align: center;
	}
	.bottom-btn {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.bottom-btn>img {
		width: .28rem;
		height: .28rem;
		margin-bottom: 0;
		margin-right: .2rem;
	}
</style>