<template>
	<div class="add-bus">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">添加车辆</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="rame-number">
			<span style="color: #555555;">车架号(VIN)</span>
			<input type="text" placeholder="请输入VIN码后8位" v-model="rame" />
		</div>
		<div class="rame-number">
			<span style="color: #555555;">发动机号</span>
			<input type="text" placeholder="请输入完整发动机号" v-model="engine" />
		</div>
		<img class="driver-licence" :src="'./static/images/my/drivingcard.png'" alt="" />
	</div>
</template>

<script>
	export default {
		name: 'addBus',
		data () {
			return {
				//pin码
				rame: '',
				//发动机码
				engine: ''
			}
		}
	}
</script>

<style scoped>
	.rame-number {
	    display: flex;
	    justify-content: space-between;
	    align-items: center;
	    width: 92%;
	    height: 1rem;
	    margin: 0 auto;
	    border-bottom: 1px solid #f1f1f1;
	}
	input {
	    width: 2.6rem;
		border: none;
		outline: none;
	}
	.driver-licence {
		width: 84%;
		height: 3.6rem;
		margin: 0.56rem auto 0 auto; 
	}
</style>