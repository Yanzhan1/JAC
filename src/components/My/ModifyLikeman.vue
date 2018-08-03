<template>
	<div class="modify-likeman">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">修改联系人</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="comment conpson-name">
			<div class="name boxline flex-align-center">
				<span style="padding-left: 0.1rem;color: #444444;font-size: 0.28rem;">姓名:</span>
				<input ref="content" style="color: #222222;font-size: 0.32rem;margin-left: 1.16rem;" type="text" v-model="modifyinfo.emergencyContactName" />
			</div>
		</div>
		<div class="comment conpson-mobile">
			<div class="telphone boxline flex-align-center">
				<span style="padding-left: 0.1rem;color: #444444;font-size: 0.28rem;">手机号:</span>
				<input style="color: #222222;font-size: 0.32rem;margin-left: 0.8rem;" type="text" v-model="modifyinfo.emergencyContactPhone" />
			</div>
		</div>
		<router-link class="bottom-btn" tag='div' @click="confirm" to="">
			确定
		</router-link>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'modifyLikeman',
		data() {
			return {
				modifyinfo: this.$route.params.modify, //路由传参获取紧急联系人信息
				condition: {
					no: this.modifyinfo ? this.modifyinfo.no: ''
				}
			}
		},
		methods: {
			confirm() {
				//更改用户信息→修改紧急联系人
				this.$http.post(Wit.updateUserBaseInformation, this.condition).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.userInfor = data.data
					} else {
						let instance = Toast({
							message: res.data.data.respMsg,
							position: 'middle',
							duration: 1000
						});
					}
				}).catch((error) => {
						let instance = Toast({
							message: '系统异常',
							position: 'middle',
							duration: 1000
						});
				});
			},
			getFocus () { //进入页面自动获取输入框的焦点
				this.$refs.content.focus()
			}
		},
		mounted () {
			this.getFocus() //
		}
	}
</script>

<style scoped>
	input {
		outline: none;
		border: none
	}
	
	.comment {
		height: 1rem;
		padding: 0rem 0.16rem;
	}
	
	.boxline {
		width: 100%;
		height: 100%;
		border-bottom: 1px solid #F1F1F1;
	}
	
	.flex-align-center {
		/*垂直居中*/
		display: flex;
		align-items: center;
	}
</style>