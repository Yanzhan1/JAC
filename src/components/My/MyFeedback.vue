<template>
	<div class="my-feedback">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">我的反馈</span>
			<span class="header-right">记录</span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="freedback-wrap">
			<div class="freedback-type">
				<span :class="{active:1==FreebackMode}" @click="change(1)">问题</span>
				<span :class="{active:2==FreebackMode}" @click="change(2)" style="margin-left: 0.25rem;">意见</span>
			</div>
			<textarea class="freedback-content" placeholder="请输入您的问题或意见" name="" rows="" cols="" v-model="TextContent"></textarea>
			<div class="flex-column person-info">
				<span>姓名</span>
				<input type="text" />
			</div>
			<div class="flex-column person-info">
				<span>联系方式</span>
				<input type="text" />
			</div>
			
		</div>
		<button class="bottom-btn">提交反馈</button>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				//反馈类型
				FreebackMode: 1,
				//文本框内容
				TextContent: ''
			}
		},
		methods: {
			//更改反馈类型
			change(val) {
				this.FreebackMode = val
			}
		}
	}
</script>

<style scoped>
	.flex-column{/*竖直方向*/
	  display: flex;
	  flex-direction: column;
	}
	.my-feedback {
		height: 100vh;
	}
	.header .header-right {
		width: 0.7rem;
    	height: .4rem;
    	line-height: .4rem;
    	text-align: center;
    	color: #49BBFF;
	}
	/*总体设置*/
	.freedback-wrap {
		padding: 0.4rem 0.3rem;
	}
	/*反馈类型*/
	
	.freedback-type {
		height: 0.96rem;
	}
	
	.freedback-type>span {
		display: inline-block;
		width: 1.2rem;
		height: 0.56rem;
		line-height: 0.56rem;
		text-align: center;
		font-size: 0.28rem;
		color: #555555;
		border: 1px solid #CCCCCC;
		border-radius: 0.08rem;
	}
	
	.freedback-type>span.active {
		color: #FFFFFF;
		border: none;
		background: #49BBFF;
	}
	/*反馈内容*/
	
	.freedback-content {
		display: block;
		width: 100%;
		height: 4.2rem;
		background: #F5F5F5;
		text-indent: 0.2rem;
		padding: 0.2rem;
		border: none;
		border-radius: 0.08rem;
	    outline: none;
	}
	/*反馈人信息*/
	.person-info {
		margin-top: 0.6rem;
	}
	.person-info>span {
		display: inline-block;
	    padding-bottom: 0.1rem;
	    color: #555555;
	}
	.person-info>input {
	    height: 1rem;
    	outline: none;
    	-webkit-appearance: none;
    	border: none;
	    font-size: 0.4rem;
    	text-indent: 0.1rem;
    	background: #f5f5f5;
    	border-radius: 0.08rem;
	}
</style>