<template>
	<div class="feedback-detail">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">反馈详情</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<ul class="feedback-wrap">
			<li>
				<div class="question">【意见】为什么APP上控制空调模式没有用？只能 使用制冷和除霜。座椅高度调控也只能控制主驾 驶？请帮我解决一下，谢谢！</div>
				<div class="question-time">2018-07-22 10:23</div>
				<div class="answer-content">官方回复：您好！针对您的问题我们会有工作人员跟您联系答复哦！</div>
				<div class="answer-time">2018-07-22 13:01</div>
			</li>
		</ul>
	</div>
</template>

<script>
	export default {
		name: 'feedbackDetail',
		data () {
			return {
				
			}
		}
	}
</script>

<style scoped>
	.feedback-wrap {
		padding: 0.42rem 0.3rem 0 0.3rem
	}
	.question {
		margin-bottom: 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
	}
	.question-time {
		padding-bottom: 0.3rem;
		margin-bottom: 0.3rem;
		font-size: 0.22rem;
		color: #888888;
		border-bottom: 1px solid #F1F1F1;
	}
	.answer-content {
		margin-bottom: 0.4rem;
		color: #555555;
	}
	.answer-time {
		color: #888888;
	}
</style>