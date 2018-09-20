<template>
	<div>		
		<header class="header MobileHeight">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="goback">
			<span class="header-title">{{currentTitle}}</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem" class="MobileHeight"></div>
	</div>
	
</template>

<script>
	export default {
		name: 'publicHead',
		data () {
			return {
				
			}
		},
		props: {
			currentTitle: { //页面头部标题
				type: String
			}
		},
		mounted () {
			$(".MobileHeight").css({"marginTop": this.$store.state.mobileStatusBar})			
		},
		methods: {
			goback () {
				this.$router.go(-1);
			}
		}
	}
</script>

<style>
</style>