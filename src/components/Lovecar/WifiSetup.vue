<template>
	<div class="wifi-setup">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">wifi设置</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					wifi名称:
				</span>
				<input type="text" v-model="wifiData.name" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					密码:
				</span>
				<input style="margin-left: 0.9rem;" type="text" v-model="wifiData.pwd" />
			</div>
		</div>
		<button class="bottom-btn" @click="confirm">确认</button>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'wifiSetup',
		data () {
			return {
				//wifi数据
				wifiData: {
					name: 'QEwDdsdSasV',
					//wifi密码
					pwd: '123456'
				}
				
			}
		},
		methods: {
			confirm () {
				MessageBox.confirm('',{
					title: '提示',
					message: '您确定保存当前WiFi信息吗？？',
					showConfirmButton: true,
					showCancelButton: true,
					cancelButtonClass: 'cancelButton',
					confirmButtonClass: 'confirmButton',
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					confirmButtonHighlight: true,
					cancelButtonHighlight: true
				}).then(action => {
					if(action == 'confirm') {
						console.log('wifiset');
					}
				}).catch(err => {
					if(err == 'cancel') {
						console.log('cancel');
					}
				});
			}
		}
	}
</script>

<style scoped>
/*flex*/
	
	.flex-center-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.flex-align-center{/*垂直居中*/
	  display: flex;
	  align-items: center;
	}
	/*公共样式*/
	
	.revisePinCommon {
		height: 1rem;
		border-bottom: 1px solid #EFEFEF;
	}
	
	input {
		outline: none;
		border: none;
		background: none;
		margin-left: 0.4rem;
	}
	
	.origin-pin>div {
		width: 90%;
		margin: 0 auto;
	}
</style>