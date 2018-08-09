<template>
	<div>
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">忘记PIN码</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="revise-success">
			<img :src="'./static/images/Lovecar/finish@2x.png'" />
			<p>操作成功</p>
			<router-link class="btn" tag="button" to="/lovecar">
				返回首页
			</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {

			}
		}
	}
</script>

<style scoped>
	/*主体布局*/
	.revise-success {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		position: absolute;
		width: 50%;
		height: 40%;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		margin: auto;
	}
	
	.revise-success>img {
		margin-bottom: 0.3rem;
	}
	
	.revise-success>p {
		margin-bottom: 1rem;
		font-size: 0.3rem;
		color: #49BBFF;
	}
	.revise-success>.btn {
		width: 5rem;
		height: 1.18rem;
		line-height: 0.58rem;
		color: #fff;
		background-color: #49BBFF;
		border: none;
		border-radius: 0.08rem;
		outline: none;
	}
</style>