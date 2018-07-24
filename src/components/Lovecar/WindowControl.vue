<template>
	<div class="window-control">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">车窗控制</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
	</div>
</template>

<script>
	export default {
		name: 'windowControl',
		data () {
			return {
				
			}
		}
	}
</script>

<style scoped>

</style>