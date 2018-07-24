<template>
	<div class="aircondition-control">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">空调控制</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="air-header">
			<div class="air-btn">
				<mt-switch v-model="value" @change="turn"></mt-switch>
				<span>OFF/NO</span>
			</div>
			<div class="air-sign flex-column">
				<span class="air">空调</span>
				<span class="air-en">conditioners</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>
		<div class="air-wrap flex-column-align">
			<div class="air-content flex-center-between">
				<div class="temperature">
					<span style="display:block;margin-bottom: 0.4rem;">温度</span>
					<div class="temper-inputcoun flex-center">
						<div class="counter">
							<span style="transform: rotateZ(-90deg);">></span>
							<span style="transform: rotateZ(-90deg);"><</span>
						</div>
					</div>
				</div>
				<div class="wind-blows">
					<img v-if="activeShow ==1" :src="'./static/images/Lovecar/air@2x.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/air1@2x.png'" alt="" />
				</div>
				<div class="num">
					<span>23℃</span>
				</div>
			</div>
			<div class="air-change">
				<div>
					<input-count></input-count>
				</div>			
			</div>
		</div>
		<div class="air-footer flex-center-between">
			<div class="flex-column-align">
				<img v-if="activeShow == 1"  :src="'./static/images/Lovecar/zhileng1@2x_6.png'"/>
				<img v-else :src="'./static/images/Lovecar/zhileng@2x.png'"/>				
				<span :class="activeshow==1?'active':'actives'">制冷</span>
			</div>
			<div class="flex-column-align">
				<img v-if="activeShow == 2"  :src="'./static/images/Lovecar/chushi1@2x_85.png'"/>
				<img v-else :src="'./static/images/Lovecar/shuimian@2x.png'"/>				
				<span :class="activeshow==2?'active':'actives'">除霜</span>
			</div>
			<div class="flex-column-align">
				<img v-if="activeShow == 3"  :src="'./static/images/Lovecar/zhire1@2x_2.png'"/>
				<img v-else :src="'./static/images/Lovecar/zhire@2x.png'"/>				
				<span :class="activeshow==3?'active':'actives'">制热</span>
			</div>
			<div class="flex-column-align">
				<img v-if="activeShow == 4"  :src="'./static/images/Lovecar/chushi1@2x_85.png'"/>
				<img v-else :src="'./static/images/Lovecar/chushi@2x.png'"/>				
				<span :class="activeshow==4?'active':'actives'">除湿</span>
			</div>
			<div class="flex-column-align">
				<img v-if="activeShow == 5"  :src="'./static/images/Lovecar/shuimian1@2x_25.png'"/>
				<img v-else :src="'./static/images/Lovecar/shuimian@2x.png'"/>				
				<span :class="activeshow==5?'active':'actives'">睡眠</span>
			</div>
			
		</div>
	</div>
</template>

<script>
	import InputCount from '../publicmodel/InputCount'
	export default {
		name: 'airconditionControl',
		data() {
			return {
				value: true,
				//旋转角度
				rotate: 90,
				//图片激活变量
				activeShow: 0
			}
		},
		methods: {
			turn() {
				console.log(1)
			}
		},
		components: {
			InputCount
		}
	}
</script>

<style scoped>
	/*flex*/
	
	.flex-column-align {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	.flex-column-align{/*竖直方向水平居中*/
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
	.flex-center-between {
		/*水平垂直居中-两边对齐*/
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex-column {
		/*竖直方向*/
		display: flex;
		flex-direction: column;
	}
	
	.flex-center {
		/*水平垂直居中*/
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.aircondition-control {}
	/*头*/
	
	.air-header {
		padding: 0.4rem 0.64rem 0 0.68rem
	}
	/*空调开关按钮*/
	
	.air-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/*空调标志*/
	
	.air {
		height: 0.31rem;
		margin-bottom: 0.17rem;
		line-height: 0.31rem;
		color: rgb(34, 34, 34);
		font-size: 0.32rem;
	}
	
	.air-en {
		height: 0.18rem;
		margin-bottom: 0.36rem;
		line-height: 0.18rem;
		font-size: 0.22rem;
		font-family: PingFang-SC-Regular;
		color: rgba(34, 34, 34, 1);
	}
	/*空调主体*/
	
	.air-wrap {
		height: 6.6rem;
		padding: 0 0.68rem;
	}
	
	.air-content {
		width: 100%;
	}
	
	.temperature {}
	
	.temper-inputcoun {
		height: 3.4rem;
		background: url('../../../static/images/Lovecar/line5@2x_21.png') no-repeat center;
		background-size: contain;
	}
	/*计数器*/
	
	.counter {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		width: 0.6rem;
		height: 1.8rem;
		border: 1px solid #999999;
		border-radius: 0.3rem;
		background: #fff;
	}
	/*风扇部分*/
	.wind-blows {
		align-self: flex-end;
	}
	.wind-blows>img {
		width: 2.86rem;
	}
	/*温度*/
	.num {
		align-self: flex-start;
	}
	.num >span {
		font-size: 0.68rem;
		color: #222222;
	}
	/*空调底部*/
	.air-footer {
		margin-top: 0.36rem;
	}
	.active {
		color: #49BBFF;
	}
	.actives {
		color: #999999;
	}
</style>