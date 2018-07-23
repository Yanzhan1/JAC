<template>
	<div class="intelligent-parking">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">智能停车</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="intelligent-body flex-center">
			<img :src="'./static/images/Lovecar/car-right@2x.png'" alt="" />
			<div class="add flex-center">
				<img :src="'./static/images/Lovecar/add@2x.png'" alt="" />
			</div>
			<img :src="'./static/images/Lovecar/car-left@2x.png'" alt="" />
		</div>
		<p style="margin-top: 0.8rem;font-size: 0.24rem;color: #666666">您暂时没有绑定车牌呦~</p>
		<router-link tag="div" class="bottom-btn" to="">
			绑定车牌
		</router-link>
	</div>
</template>

<script>
	export default {
		name: 'intelligentParking',
		data () {
			return {
				
			}
		}
	}
</script>

<style scoped>
	/*flex*/
	.flex-center{/*水平垂直居中*/
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.intelligent-parking> p {
		display: flex;
		justify-content: center;
	}
	.intelligent-body {
	    margin-top: 0.24rem;
	}
	.intelligent-body>img {
		width: 2.07rem;
		height: 3.11rem;
	}
	.add {
		width: 2.26rem;
		height: 3.37rem;
		background: #CCCCCC;
		border-radius: 0.1rem;
	}
	.add>img {
		width: 0.66rem;
		height: 0.66rem;
	}
</style>