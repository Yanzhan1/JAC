<template>
	<div class="my-setup">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">设置</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<router-link tag="div" class="setup-ctcperson" to="/contactPerson">
			<mt-cell title="紧急联系人" is-link></mt-cell>
		</router-link>
		<router-link tag="div" class="setup-feedback" to="/myFeedback">
			<mt-cell title="我的反馈" is-link></mt-cell>
		</router-link>
		<router-link tag="div" class="setup-modifypwd" to="/modifyPassword">
			<mt-cell title="修改密码" is-link></mt-cell>
		</router-link>
		<router-link tag="div" class="setup-loginout" to="">
			<mt-cell title="退出登录" is-link></mt-cell>
		</router-link>
		<button class="bottom-btn">退出</button>
	</div>
</template>

<script>
	export default {
		name: '',
		data () {
			return {
				
			}
		}
	}
</script>

<style scoped>

</style>