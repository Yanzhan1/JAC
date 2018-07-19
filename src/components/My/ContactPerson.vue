<template>
	<div class="contact-person">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">紧急联系人</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<router-link tag="div" class="conpson-name" to="" >
			<mt-cell title="姓名"  value="李逍遥" is-link></mt-cell>
		</router-link>
		<router-link tag="div" class="conpson-mobile" to="" >
			<mt-cell title="电话号码"  value="18709238745" is-link></mt-cell>
		</router-link>
		<div class="bottom-btn">修改</div>
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