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
				<div @click="date_choose">{{this.years}}年{{this.months}}月</div>
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
					<div class="flex-align-center revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
							本月总里程:
						</span>
						<input :disabled="disabled" type="text" v-model="item.monthMileage" />
					</div>
				</div>
				<div class="origin-pin">
					<div class="flex-align-center revisePinCommon">
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
					<div class="flex-align-center revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
							周平均油耗:
						</span>
						<input :disabled="disabled" type="text" v-model="item.weekOilConsumer" />
					</div>
				</div>
				<div class="origin-pin">
					<div class="flex-align-center revisePinCommon">
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
				years:'',
				months:'',
				times:'',
				remaketime:'',
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
			},
			//转换时间戳
			turntimes(value){
				return operationTime.toTimeStamp(this.remaketime)
			}
		},
		mounted(){
			this.years=new Date().getFullYear();
			this.months=new Date().getMonth()+1;
			var newstimes=new Date().getTime();
			this.remaketime=this.years+'-'+this.months+'-'+'01'
			console.log(this.turntimes())
			//获取默认页面的请求从当月的1号到当月的当日
			this.$http.post(Lovecar.Fuel,{vin: "1G",beginTime:this.turntimes(),endTime:newstimes,type:'months'},getpin).then((res)=>{
				console.log(res)
			})
			if(this.$route.params.begintime){
				var accpect=this.$route.params
				console.log(accpect)
				
				this.years=accpect.showtop.years;
				this.months=accpect.showtop.months;
				if(accpect.times=='月'){
					this.times='months'
				}
				if(accpect.times=='周'){
					this.times='week'
				}
				if(accpect.times=='日'){
					this.times=='day'
				}
				//路由传过来所选择的日期渲染页面
				this.$http.post(Lovecar.Fuel,{vin: "1G",beginTime:accpect.begintime,endTime:accpect.endtime,type:this.times},this.$store.state.this.$store.state.getpin).then((res)=>{
					console.log(res)
				})
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
	.flex-align-center{/*垂直居中*/
	  display: flex;
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
		background: none;
		margin-left: 0.46rem;
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