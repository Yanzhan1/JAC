<template>
	<div class="fuel-query">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">燃油查询</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="fuel-title">
			<span>统计周期</span>
			<div>
				<div @click="date_choose">2018年6月</div>
				<img :src="'./static/images/next@2x.png'" alt="" />
			</div>
		</div>
		<div class="line"></div>
		<div class="fuel-wrap">
			<div v-for="(item,index) in count" class="fuel-apnone">
				<div class="apn-title">
					<span>统计总量</span>
				</div>
				<div class="origin-pin">
					<div class="flex-center-between revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
							本月总里程:
						</span>
						<input :disabled="disabled" type="text" v-model="item.monthMileage" />
					</div>
				</div>
				<div class="origin-pin">
					<div class="flex-center-between revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
							已使用油耗:
						</span>
						<input :disabled="disabled" type="text" v-model="item.oilConsumer" />
					</div>
				</div>
				<div class="apn-title">
					<span>平均油耗</span>
				</div>
				<div class="origin-pin">
					<div class="flex-center-between revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
							周平均油耗:
						</span>
						<input :disabled="disabled" type="text" v-model="item.weekOilConsumer" />
					</div>
				</div>
				<div class="origin-pin">
					<div class="flex-center-between revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
							日平均油耗:
						</span>
						<input :disabled="disabled" type="text" v-model="item.dayOilConsumer" />
					</div>
				</div>
				
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: '',
		data() {
			return {
				//流量
				num: '100KM',
				//展示作用，不能输入
				disabled: true,
				count: [{
					monthMileage: "100KM",
					oilConsumer: "20L",
					weekOilConsumer: "7L",
					dayOilConsumer: "1L"
				}]
			}
		},
		methods:{
			date_choose(){
				this.$router.push('/Datechoose')
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
	
	.fuel-title {
		display: flex;
		flex-direction: row;
		align-items: center;
		justify-content: space-between;
		height: 1rem;
		padding: 0 0.3rem;
	}
	
	.fuel-title>span:nth-of-type(1) {
		color: #49BBFF;
		font-size: 0.32rem;
	}
	
	.fuel-title>div {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.fuel-title>div>img {
		width: 0.5rem;
	}
	/*灰色间隔*/
	
	.line {
		height: 0.1rem;
		background: #F1F1F1;
	}
	/*统计*/
	
	.fuel-wrap {
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