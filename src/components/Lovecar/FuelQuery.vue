<template>
	<div class="fuel-query">
		<!--<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.push('/lovecar')">
			<span class="header-title">燃油查询</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>-->
		<mhead currentTitle="燃油查询"></mhead>
		<div class="fuel-title">
			<span>统计周期</span>
			<div>
				<div @click="date_choose">{{this.years}}{{this.months}}{{this.date}}{{this.showweek}}</div>
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
	import PublicHead from '../publicmodel/PublicHead';
	export default {
		name: 'fuelQuery',
		components: {
			mhead:PublicHead
		},
		data() {
			return {
				//流量
				num: '100KM',
				//展示作用，不能输入
				disabled: true,
				years:'',
				months:'',
				showweek:'',
				date:'',
				times:'',
				remaketime:'',
				count: [{
					monthMileage: "",
					oilConsumer: "",
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
			this.years=new Date().getFullYear()+'年';
			this.months=new Date().getMonth()+1+'月';
			var newstimes=new Date().getTime();
			this.remaketime=this.years+'-'+this.months+'-'+'01'
			//获取默认页面的请求从当月的1号到当月的当日
			var params={
				vin:this.$store.state.vins,
				//UBS2018072410503423882
				beginTime:this.turntimes(),
				endTime:newstimes,
				type:'1'
			}
			this.$http.post(Lovecar.Fuel,params,this.$store.state.tsppin).then((res)=>{
				this.count[0].monthMileage=res.data.data.totalMileage
				this.count[0].oilConsumer=res.data.data.totalWear
			})
			console.log(this.$route.params)
			if(this.$route.params.begintime){
				var accpect=this.$route.params		
				if(accpect.times=='月'){
					this.times='3'
					this.years=accpect.showtop.years+'年';
					this.months=accpect.showtop.months+'月';
				}
				if(accpect.times=='周'){
					this.times='2'
					this.years=accpect.showtop.years+'年';
					this.months=accpect.showtop.months+'月';
					this.showweek='第'+accpect.showweek+'周'
				}
				if(accpect.times=='日'){
					this.times='1'
					if(accpect.showtopdate==''){
						this.years=accpect.showtop.years+'年';
						this.months=accpect.showtop.months+'月';
						this.date=new Date().getDate()+'日'
					}else{
						this.years=accpect.showtop.years+'年';
						this.months=accpect.showtop.months+'月';
						this.date=accpect.showtopdate+'日';
					}
				}
				if(accpect.times=='年'){
					if(accpect.showyear==''){
						this.years=new Date().getFullYear()+'年'
						this.months=''
					}else{
						this.years=accpect.showyear+'年';
						this.months=''
					}
				}
				//路由传过来所选择的日期渲染页面
				this.$http.post(Lovecar.Fuel,{vin: this.$store.state.vin,beginTime:accpect.begintime,endTime:accpect.endtime,type:this.times},this.$store.state.tsppin).then((res)=>{
					// console.log(res)
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