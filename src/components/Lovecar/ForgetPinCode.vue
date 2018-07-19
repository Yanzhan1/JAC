<template>
	<div class="revise-pin-code">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">忘记pin码</span>
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
					已绑定手机号:
				</span>
				<input placeholder="已绑定手机号" type="text" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					新pin码:
				</span>
				<input placeholder="请输入原PIN码" type="text" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					短信验证码:
				</span>
				<input style="padding-right: 0;width: 2.8rem;" placeholder="请输入验证码" type="text" />
				<button class="btn" v-if="showTime">59秒后重发</button>
				<button class="btn" v-if="!showTime" @click="submitCode">获取验证码</button>
			</div>
		</div>
		<button class="bottom-btn">确认提交</button>
	</div>
</template>

<script>
	export default {
		name: 'forgetPinCode',
		data() {
			return {
				//倒计时按钮状态
				showTime: true
			}
		},
		methods: {
			//获取验证码
			submitCode() {

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
		color: #444444;
		border: none;
		-webkit-appearance: none;
		background: none;
		padding-left: 0.5rem;
		border-left: 1px solid #444444;
	}
	/*确认提交按钮*/
	
	.confirmSubmit {
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
</style>