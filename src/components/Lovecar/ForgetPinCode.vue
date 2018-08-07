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
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					已绑定手机号:
				</span>
				<input class="pinInput" placeholder="请输入手机号" type="text" v-model="pin.phone" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					新pin码:
				</span>
				<input class="newpinInput" placeholder="请输入新PIN码" type="text" v-model="pin.newPin" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon">
				<div>
					<span style="font-size: 0.26rem;color: #444444;">短信验证码:</span>
					<input class="verification-code" placeholder="请输入验证码" type="text" v-model="pin.verificationCode" />
				</div>
				<button class="btn" v-if="showTime" @click="submitCode">获取验证码</button>
				<button class="btn" v-else>{{this.times}}秒后重发</button>
			</div>
		</div>
		<button class="bottom-btn" @click="confirmSub">确认提交</button>
	</div>
</template>

<script>
	import {Toast} from 'mint-ui'
	export default {
		name: 'forgetPinCode',
		data() {
			return {
				//倒计时按钮状态
				showTime: true,
				times:'60',//倒计时
				//忘记pin码数据
				Verification:'',//后端返回的验证码
				pin: {
					phone: '',
					newPin: '',
					verificationCode: ''
				}
			}
		},
		methods: {
			//获取验证码
			submitCode() {
				this.showTime=false;
				var backtime=setInterval(()=>{
					this.times--;
					if(this.times==0){
						this.times=60;
						this.showTime=true;
						window.clearInterval(backtime)
					}
				},1000)
				var phone=this.pin.phone
				console.log(phone)
				this.$http.post(Lovecar.Getphonepin,{phoneNum: phone},getpin).then((res)=>{
					this.Verification=res.data.data;
					console.log(this.Verification)
				})
			},
			//底部确认提交
			confirmSub () {
				if(this.pin.phone == '' || this.pin.newPin == '' || this.pin.verificationCode == '') {
					Toast({
						message: '输入不能为空',
						position: 'middle',
						duration: 2000
					});
					return false;
				} else {
					this.$router.push('/lovecar/reviseSuccess')
				}
				
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
	.flex-align-center{/*垂直居中*/
	  	display: flex;
	  	align-items: center;
	}
	/*单页面公共样式*/
	
	.revisePinCommon {
		height: 1.35rem;
		border-bottom: 1px solid #EFEFEF;
	}
	
	.pinInput {
		width: 2.1rem;
		margin-left: 0.34rem;
		outline: none;
		border: none;
	}
	.newpinInput {
	    border: none;
   	 	outline: none;
    	width: 2.1rem;
    	margin-left: 1rem;
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
	.verification-code {
		border: none;
		outline: none;	
		width: 1.7rem;
	    margin-left: 0.4rem;
	}
	.origin-pin .btn {
		color: #444444;
		border: none;
		-webkit-appearance: none;
		background: none;
		padding-left: 0.5rem;
		border-left: 1px solid #444444;
		outline: none;
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