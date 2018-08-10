<template>
	<div class="modify-password">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">修改密码</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					旧密码:
				</span>
				<input  v-model="condition.oldPassword" placeholder="请输入旧密码" type="text" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					新密码:
				</span>
				<input v-model="condition.newPassword" placeholder="请输入新密码" type="text" />
			</div>
		</div>
		<button class="bottom-btn" @click="modifyPwd">确认修改</button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name: '',
		data () {
			return {
				condition: {
					oldPassword: '',
					newPassword: '',
					no: this.$store.state.no
				}
			}
		},
		methods: {
			modifyPwd () { //修改密码
				this.$http.post(Wit.updateUserPassword, this.condition).then(res => {
					const data = res.data;
					console.log(data);
					if(data.code == 0) {
						this.$router.push('/myindex/reviousePwdSuccess')
					} else {
						let instance = Toast({
							message: data.msg,
							position: 'middle',
							duration: 2000
						});
					}
				}).catch((error) => {
					let instance = Toast({
						message: '系统异常',
						position: 'middle',
						duration: 2000
					});
				});
			}
		}
	}
</script>

<style scoped>
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
	.modify-password {
		
	}
	.origin-pin>div {
		width: 90%;
		margin: 0 auto;
	}
	.revisePinCommon {
		height: 1rem;
		border-bottom: 1px solid #EFEFEF;
	}
	.revisePinCommon>input {
	    border: none;
    	outline: none;
	}
</style>