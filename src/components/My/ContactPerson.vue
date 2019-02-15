<template>
	<div class="contact-person">
		<mhead currentTitle="紧急联系人"></mhead>
		<router-link tag="div" class="comment conpson-name" to="">
			<div class="name boxline flex-align-center">
				<span style="padding-left: 0.1rem;color: #444444;font-size: 0.28rem;">姓名:</span>
				<span style="color: #888888;font-size: 0.24rem;margin-left: 1.16rem;">{{userInfor.emergencyContactName ? userInfor.emergencyContactName : '您还没有设置紧急联系人'}}</span>
			</div>
		</router-link>
		<router-link tag="div" class="comment conpson-mobile flex-align-center" to="">
			<div class="telphone boxline flex-align-center">
				<span style="padding-left: 0.1rem;color: #444444;font-size: 0.28rem;">电话号码:</span>
				<span style="color: #888888;font-size: 0.24rem;margin-left: 0.6rem;">{{userInfor.emergencyContactPhone ? userInfor.emergencyContactPhone  : '您还没有设置紧急联系人号码'|jiami()}}</span>
			</div>
		</router-link>
		<router-link class="bottom-btn" tag='div' :to="{name: '修改联系人', params:{modify:userInfor}}">
			修改
		</router-link>
	</div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead';
	import { Toast } from 'mint-ui';
	export default {
		name: 'contactPerson',
		components: {
	  		mhead:PublicHead
	    },
		data() {
			return {
				condition: {
					no: this.$store.state.userId
				},
				userInfor: {
				}
			}
		},
		methods: {
			init() {
				//获取用户基本信息
				this.$http.post(Wit.searchUserBaseInformationOne, this.condition).then(res => {
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
				})
			}
		},
		filters:{
			jiami(val){
				let mobile1=val.slice(0,3);
				let mobile2=val.slice(7,11);
				let newtell=`${mobile1}****${mobile2}`
				return newtell
			}
		},
		mounted () {
			this.init()
		}
	}
</script>

<style scoped>
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