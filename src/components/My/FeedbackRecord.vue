<template>
	<div class="freedback-record">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">反馈记录</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div v-for="item in 2" class="freeback-wrap flex-center">
			<router-link tag="div" class="question-content flex-column-align" to="/myindex/feedbackDetail">
				<div class="question">
					<span>【问题】非车主不能使用吗</span>
					<span>2018-07-22 10:23</span>
				</div>
				<div class="line"></div>
				<div class="answer">
					<span>官方回复：您好！目前非车主仅能使用部分体验功能哦！</span>
					<span>2018-07-22 10:23</span>
				</div>
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
	/*水平垂直居中*/
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/*竖直方向水平居中*/
	.flex-column-align {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/*反馈内容*/
	
	.freedback-record {
		height: 100vh;
		background: #F5F5F5;
	}
	
	.question-content {
		width: 92%;
		height: 3.54rem;
		margin-top: 0.3rem;
		background: #fff;
		border-radius: 0.08rem;
		padding: 0.4rem;
	}
	/*问题*/
	
	.question {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: flex-start;
		height: 1.2rem;
		width: 100%;
	}
	.question>span:nth-of-type(1) {
		font-size: 0.32rem;
		color: #222222;
	}
	.question>span:nth-of-type(2) {
		font-size: 0.22rem;
		color: #888888;
	}
	/*线*/	
	.line {
		width: 100%;
		height: 1px;
	    margin: 0.3rem 0 0.26rem;
		background-color: #F1F1F1;
	}
	/*回答*/	
	.answer {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	    height: 1.6rem;
	}
	.answer>span:nth-of-type(1) {
		font-size: 0.28rem;
		color: #555555;
	}
	.answer>span:nth-of-type(2) {
		font-size: 0.22rem;
		color: #888888;
	}
</style>