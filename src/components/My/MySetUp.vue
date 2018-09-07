<template>
	<div class="my-setup">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">设置</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
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
		<router-link tag="div" class="setup-loginout" to="">
			<mt-cell @click.native="signOut" title="退出登录" is-link></mt-cell>
		</router-link>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name: '',
		data() {
			return {
				title: '软键盘',
				value: true
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
							console.log(111)
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
			}
		}
	}
</script>

<style scoped>
	.mint-msgbox {
		height: 23% !important;
	}
</style>