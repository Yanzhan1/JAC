<template>
	<div class="revise-pin-code">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">修改pin码</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="revisePinCommon flex-center revise-pin-mes ">
			<div class="">
				<span>
					您的手机号码是177********，请输入原PIN码和新PIN码，并点击“获取验证码”:
				</span>
			</div>

		</div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					原pin码:
				</span>
				<input placeholder="请输入原PIN码" type="text" v-model="condition.oldPin" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					新pin码:
				</span>
				<input placeholder="请输入原PIN码" type="text" v-model="condition.newPin" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					短信验证码:
				</span>
				<input style="padding-right: 0;width: 2.8rem;" placeholder="请输入验证码" type="text" v-model="condition.verificationCode" />
				<button class="btn" v-if="showTime">59秒后重发</button>
				<button class="btn" v-if="!showTime" @click="submitCode">获取验证码</button>
			</div>
		</div>
		<router-link tag="p" class="forget-pinCode" to="/lovecar/forgetPinCode">忘记PIN码？</router-link>
		<button class="bottom-btn" @click="confirmRevise">确认修改</button>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name: '',
		data() {
			return {
				//倒计时按钮状态
				showTime: true,
				//修改pin码数据
				condition: {
					oldPin: '',
					newPin: '',
					verificationCode: ''
				}
			}
		},
		methods: {
			//获取验证码
			submitCode() {

			},
			//确认修改,messagebox弹出框
			confirmRevise() {
				MessageBox.confirm('',{
					title: '提示',
					message: '您确定要修改PIN吗？',
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
						//跳转修改成功页面
						console.log('abc');
					}
				}).catch(err => {
					if(err == 'cancel') {
						console.log('123');
					}
				});
			}
		}
	}
</script>

<style scoped>
	/*flex布局*/
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
	/*单页面公共样式*/
	
	.revisePinCommon {
		height: 1.35rem;
		border-bottom: 1px solid #EFEFEF;
	}
	
	input {
		outline: none;
		border: none;
		padding-right: 1.5rem;
	}
	/*message信息提示*/
	
	.revise-pin-mes {
		font-size: 0.24rem;
		line-height: 0.4rem;
		color: #888888;
		width: 90%;
		margin: 0 auto;
	}
	
	.revise-pin-mes>span {
		display: inline-block;
		width: 6.69rem;
		height: 0.65rem;
	}
	
	.origin-pin>div {
		width: 90%;
		margin: 0 auto;
	}
	/*验证码按钮*/
	
	.origin-pin .btn {
		padding-left: 0.5rem;
		border: none;
		-webkit-appearance: none;
		color: #444444;
		background: none;
		border-left: 1px solid #444444;
	}
	/*修改按钮*/
	
	.confirmChange {
		position: fixed;
		bottom: 0;
		width: 100%;
		line-height: 0.95rem;
		text-align: center;
		background: #49BBFF;
		font-size: 0.3rem;
		color: #ffffff;
		border: none;
		border-radius: 0.1rem;
	}
	/*取消按钮*/
	.cancelButton {
	    color: #26a2ff !important;
	}
	/*忘记pin码*/
	.forget-pinCode {
		margin-top: 0.3rem;
		margin-right: 0.52rem;
		color: #49BBFF;
		font-size: 0.24rem;
		text-align: right;
	}
</style>