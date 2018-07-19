<template>
	<div>
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title"></span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="revise-success">
			<img :src="'./static/images/Lovecar/完成@2x.png'" />
			<p>操作成功</p>
			<button>返回首页</button>
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
	.revise-success>button {
		width: 5rem;
		height: 0.98rem;
		line-height: 0.98rem;
		color: #fff;
		background-color: #49BBFF;
		border: none;
		border-radius: 0.08rem;
	}
</style>