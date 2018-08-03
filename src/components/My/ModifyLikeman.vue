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
				<input ref="content" style="color: #222222;font-size: 0.32rem;margin-left: 1.16rem;" type="text" v-model="emergencyContactName" />
			</div>
		</div>
		<div class="comment conpson-mobile">
			<div class="telphone boxline flex-align-center">
				<span style="padding-left: 0.1rem;color: #444444;font-size: 0.28rem;">手机号:</span>
				<input style="color: #222222;font-size: 0.32rem;margin-left: 0.8rem;" type="text" v-model="emergencyContactPhone" />
			</div>
		</div>
		<router-link class="bottom-btn" tag='div' @click.native="confirm" to="">
			确定
		</router-link>
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	import { Toast } from 'mint-ui';
	export default {
		name: 'modifyLikeman',
		data() {
			return {
				modifyinfo: this.$route.params.modify, //路由传参获取紧急联系人信息
				emergencyContactName: '', //紧急联系人姓名
				emergencyContactPhone: '' //紧急联系人电话号码
			}
		},
		methods: {
			confirm() { //更改用户信息→修改紧急联系人
				MessageBox.confirm('', {
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
						let data = {
							no: this.$store.state.no,
							emergencyContactName: this.emergencyContactName,
							emergencyContactPhone: this.emergencyContactPhone
						}
						this.$http.post(Wit.updateUserBaseInformation, data).then(res => {
							const data = res.data;
							if(data.code == 0) {
								this.userInfor = data.data,
								Toast({
									message: '修改成功',
									position: 'middle',
									duration: 2000
								});
								setTimeout(() => {
									this.$router.push('/myindex/contactPerson')
								}, 2000)
							} else {
								let instance = Toast({
									message: data.msg,
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
					}
				}).catch(err => {
					if(err == 'cancel') {
						console.log('123');
					}
				});

			},
			getFocus() { //进入页面自动获取输入框的焦点
				this.$refs.content.focus()
			}
		},
		mounted() {
			this.emergencyContactName = this.modifyinfo.emergencyContactName
			this.emergencyContactPhone = this.modifyinfo.emergencyContactPhone
			this.getFocus()
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