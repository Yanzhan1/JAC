<template>
	<div class="flow-query">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">流量查询</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="flow-title">
			<span>计费周期</span>
			<span>2018-06-01至2018-07-01</span>
		</div>
		<div class="line"></div>
		<div class="flow-wrap">

			<div v-for="(item,index) in 2" class="flow-apnone">
				<div class="apn-title">
					<span>APN1</span>
				</div>
				<div class="origin-pin">
					<div class="flex-center-between revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
					本月总流量:
				</span>
						<input :disabled="disabled" type="text" v-model="num" />
					</div>
				</div>
				<div class="origin-pin">
					<div class="flex-center-between revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
					已使用流量:
				</span>
						<input :disabled="disabled" type="text" v-model="num" />
					</div>
				</div>
			</div>
		</div>
		<button class="bottom-btn">流量购买</button>
	</div>
</template>

<script>
	export default {
		name: 'flowQuery',
		data() {
			return {
				//流量
				num: '100G',
				//展示作用，不能输入
				disabled: true
			}
		}
	}
</script>

<style scoped>
	/*flex*/
	
	.flex-center-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/*公共样式*/
	
	.revisePinCommon {
		height: 1rem;
		border-bottom: 1px solid #EFEFEF;
	}
	
	input {
		outline: none;
		border: none;
		padding-right: 1.7rem;
		background: none;
	}
	/*头部*/
	
	.flow-title {
		display: flex;
		flex-direction: column;
		justify-content: space-around;
		height: 1.9rem;
		padding: 0 0.3rem;
	}
	
	.flow-title>span:nth-of-type(1) {
		color: #49BBFF;
		font-size: 0.32rem;
	}
	
	.flow-title>span:nth-of-type(2) {
		color: #222222;
	}
	/*灰色间隔*/
	
	.line {
		height: 0.1rem;
		background: #F1F1F1;
	}
	/*apn*/
	
	.flow-wrap {
		padding: 0 0.3rem;
	}
	
	.apn-title {
		height: 0.86rem;
		line-height: 1.16rem;
		font-size: 0.32rem;
		color: #3A5CFF;
	}
	
	.origin-pin>div {
		margin: 0 auto;
	}
</style>