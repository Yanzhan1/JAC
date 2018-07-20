<template>
	<div class="wifi-link">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">wifil直连</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<mt-cell :title="title">
			<mt-switch @change="turn" v-model="value"></mt-switch>
		</mt-cell>
		<div class="line"></div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					wifi名称:
				</span>
				<input :disabled="disabled" type="text" v-model="name" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					密码:
				</span>
				<input :disabled="disabled" type="text" v-model="pwd" />
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'wifiLink',
		data () {
			return {
				//开关按钮状态
				value: true,
				//开关按钮title
				title: 'wifi开关',
				//输入框是否可输入
				disabled: true,
				//名字输入框内容
				name: 'QEwDdsdSasV',
				//密码输入框内容
				pwd: '12345678'
			}
		},
		methods: {
			//输入框是否可输入
			turn () {
				this.disabled = !this.disabled
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
		padding-right: 1.5rem;
	    background: none;
	}
	/*灰色间隔*/
	.line {
		height: 0.1rem;
		background: #F1F1F1;
	}
	/*每个item*/
	.origin-pin>div {
		width: 90%;
		margin: 0 auto;
	}
</style>