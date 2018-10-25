<template>
	<div class="my-setup">
		<!--<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">设置</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>-->
		<mhead currentTitle="设置"></mhead>
		<!--<mt-cell :title="title">
			<mt-switch @change="turn" v-model="value"><span></span></mt-switch>
		</mt-cell>-->
		<router-link tag="div" class="setup-ctcperson" to="/myindex/contactPerson">
			<mt-cell title="紧急联系人" is-link></mt-cell>
		</router-link>
		<router-link tag="div" class="setup-feedback" to="/myindex/myFeedback">
			<mt-cell title="我的反馈" is-link></mt-cell>
		</router-link>
		<router-link tag="div" class="setup-modifypwd" to="/myindex/modifyPassword">
			<mt-cell title="修改密码" is-link></mt-cell>
		</router-link>
		<router-link v-if="vehicleState" tag="div" class="setup-vehiclestate" to="/myindex/loginVehicleState">
			<mt-cell title="车机登录状态" is-link></mt-cell>
		</router-link>
		<router-link v-else tag="div" class="setup-vehiclestate" to="/myindex/logoutVehicleState">
			<mt-cell title="车机登录状态" is-link></mt-cell>
		</router-link>
		<router-link tag="div" class="setup-loginout" to="">
			<mt-cell @click.native="signOut" title="退出登录" is-link></mt-cell>
		</router-link>
	</div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead';
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'mySetup',
		components: {
		  mhead:PublicHead
	    },
		data() {
			return {
				title: '软键盘',
				value: true,
				vehicleState: null, //车机登录状态,true代表登录, false代表未登录
				firstTips: true //车机状态第一次提示,true不提示,改变为false的时候,Toast进行提示
			}
		},
		methods: {
			signOut() {
				MessageBox.confirm('', {
					title: '提示',
					message: '您确定要退出登录吗？',
					showConfirmButton: true,
					showCancelButton: true,
					cancelButtonClass: 'cancelButton',
					confirmButtonClass: 'confirmButton',
					confirmButtonText: '退出',
					cancelButtonText: '取消',
					confirmButtonHighlight: true,
					cancelButtonHighlight: true
				}).then(action => {
					if(action == 'confirm') {

						localStorage.removeItem('Tip')
						var system = this.isIOSOrAndroid();
						if(system == "Android") {
							window.js2android.logout() //安卓退出App
						} else if(system == "IOS") {
							window.webkit.messageHandlers.logout.postMessage({});
						}
					}
				}).catch(err => {
					if(err == 'cancel') {
						console.log('123');
					}
				});
			},
			turn() { //switch开关方法
				this.value ? this.$store.dispatch('SOFTKEYBOARD', true) : this.$store.dispatch('SOFTKEYBOARD', false)
			},
			isIOSOrAndroid () {  //判断ios和安卓机型的方法
				var u = navigator.userAgent,
					app = navigator.appVersion;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid) {
					return "Android"
				} else if(isIOS) {
					return "IOS"
				}
			},
			    //授权转台查询
			vehiclestatus(){
				this.$http.post(Lovecar.vehiclestatus,{},this.$store.state.getpin).then((res)=>{
					if(res.data.returnSuccess){
						this.vehicleState=res.data.data.vin
					}
				})
			},
			getCarLoginState() { //获取机车 登录登出状态
				this.$http.get(Lovecar.LogStatus, this.$store.state.tsppin).then(res => {
						const data = res.data
						if(data.returnSuccess) {		
								//字段缺乏,等待接口完成之后添加判断
								this.vehicleState = data.data[0].logStatus //true 代表机车已经登录	
								this.vehicleState = false
						} else {
								Toast({
									message: data.returnErrMsg,
									position: "middle",
									duration: 2001
								});						
						}
					})
					.catch(err => {
						Toast({
							message: '系统异常',
							position: "middle",
							duration: 2001
						});
					});
			}
		},
		mounted () {
			this.vehiclestatus()
			this.getCarLoginState()		
		}
	}
</script>

<style scoped>
	.mint-msgbox {
		height: 23% !important;
	}
</style>