<template>
	<div class="intelligent-parking-uninfo">
		<!--<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">智能停车</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>-->
		<mhead currentTitle="智能停车"></mhead>
		<div class="intelligent-wrap">
			<img :src="'./static/images/Lovecar/park@2x.png'" alt="" />
			<p style="font-size: 0.24rem;color: #555555;margin-top: 0.44rem;text-align: center;">暂时没有停车信息呦~</p>
		</div>
		<router-link tag="div" class="bottom-btn" to="">
			返回首页
		</router-link>
	</div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead';
	export default {
		name: 'intelligentParkingUninfo',
		components: {
			mhead:PublicHead
		},
		data () {
			return {
				
			}
		}
	}
</script>

<style scoped>
	/*绝对居中*/
	.intelligent-wrap {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
	.intelligent-wrap>img {
		width: 1.5rem;
		height: 0.9rem;
		margin: 0 auto;
	}
</style>