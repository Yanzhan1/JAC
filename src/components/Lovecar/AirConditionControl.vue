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
				<span class="air-ch">空调</span>
				<span class="air-en">conditioners</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>
		<!--空调主体Start-->
		<div class="air-wrap flex-column-align">
			<div class="air-content flex-center-between">
				<div class="temperature">
					<span style="display:block;margin-bottom: 0.4rem;">温度</span>
					<!--温度计数器Start-->
					<div class="temper-inputcoun flex-center">
						<div class="counter">
							<span @click="add" style="transform: rotateZ(-90deg);">></span>
							<span @click="reduce" style="transform: rotateZ(-90deg);"><</span>
						</div>
					</div>
					<!--温度计数器End-->
				</div>
				<div class="wind-blows">
					<img v-if="activeShow" :src="'./static/images/Lovecar/air@2x.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/air1@2x.png'" alt="" />
				</div>
				<div class="num">
					<span :class="activeShow?'fontActive':'loseActives'">{{number}}</span>
				</div>
			</div>
			<!--风量计数器Start-->
			<div class="air-change">
				<div class="wind-count">
					<span @click=" windReduce" class="addWind"><</span>
					<input class="wind-input" type="text" v-model="windNum[winIndex]" />
					<span @click="windAdd" class="reduceWind">></span>
				</div>			
			</div>
			<!--风量计数器End-->
		</div>
		<!--空调主体End-->
		<div class="sing-line"></div>

		<!--底部导航Start-->
		<div class="air-footer flex-center-between">
			<div class="tabar flex-column-align" @click="change(1)">
				<img v-if="activeShow == 1"  :src="'./static/images/Lovecar/zhileng1@2x_6.png'"/>
				<img v-else :src="'./static/images/Lovecar/zhileng@2x.png'"/>				
				<span :class="activeShow==1?'active':'actives'">制冷</span>
			</div>
			<div class="tabar flex-column-align" @click="change(2)">
				<img v-if="activeShow == 2"  :src="'./static/images/Lovecar/chushuang1@2x_8.png'"/>
				<img v-else :src="'./static/images/Lovecar/chushuang@2x.png'"/>				
				<span :class="activeShow==2?'active':'actives'">除霜</span>
			</div>
			<div class="tabar flex-column-align" @click="change(3)">
				<img v-if="activeShow == 3"  :src="'./static/images/Lovecar/zhire1@2x_2.png'"/>
				<img v-else :src="'./static/images/Lovecar/zhire@2x.png'"/>				
				<span :class="activeShow==3?'active':'actives'">制热</span>
			</div>
			<div class="tabar flex-column-align" @click="change(4)">
				<img v-if="activeShow == 4"  :src="'./static/images/Lovecar/chushi1@2x_85.png'"/>
				<img v-else :src="'./static/images/Lovecar/chushi@2x.png'"/>				
				<span :class="activeShow==4?'active':'actives'">除湿</span>
			</div>
			<div class="tabar flex-column-align" @click="change(5)">
				<img v-if="activeShow == 5"  :src="'./static/images/Lovecar/shuimian1@2x_25.png'"/>
				<img v-else :src="'./static/images/Lovecar/shuimian@2x.png'"/>				
				<span :class="activeShow==5?'active':'actives'">睡眠</span>
			</div>
			<!--底部导航End-->
		</div>
	</div>
</template>

<script>
	import InputCount from '../publicmodel/InputCount'
	export default {
		name: 'airconditionControl',
		data() {
			return {
				value: false,
				//图片激活变量
				activeShow: 0,
				//温度调节最大值
				max: 32,
				//温度调节最小值
				min: 15,
				//温度展示值
				number: 15,
				//风量展示
				windNum: [1,2,3,4],
				winMin: 0,
				//风量控制变量
				winIndex: 0
			}
		},
		methods: {
			//空调控制开关方法
			turn() {
				this.activeShow = !this.activeShow
			},
			//激活底部图标方法
			change (val) {
				this.activeShow ? this.activeShow = val : this.activeShow = 0	
			},
			//温度增加
			add () {
				if (this.activeShow && this.number < this.max) {
					this.number++;
				} else if (this.number >= this.max){
					this.number = this.max;
					return 
				}
			},
			//温度减少
			reduce () {
				if(this.activeShow && this.number > this.min) {
					this.number--;
				} else if (this.number <= this.min) {
					this.number = this.min
					return 
				}
			},
			//风量增加
			windAdd () {
				if (this.activeShow) {
					if (this.winIndex >= this.windNum.length-1) {
						this.winIndex = 0
					} else {
						this.winIndex++
					}
				} else {
					return 
				}
				
			},
			//风量减少
			windReduce () {
				if (this.activeShow) {
					if (this.winIndex <= this.winMin) {
						this.winIndex = this.windNum.length-1
					} else {
						this.winIndex--
					}
				} else {
					return 
				}
				
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
	/*空调头部*/
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
	
	.air-ch {
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
	/*温度计数器*/
	
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
	    margin-left: 1rem;
		align-self: flex-end;
	}
	.wind-blows>img {
		width: 2.66rem;
    	height: 1.89rem;
	}
	/*温度部分*/
	.num {
		align-self: flex-start;
	}
	/*温度激活字体*/
	.fontActive {
		font-size: 0.68rem;
		color: #222222;
	}
	/*温度未激活字体*/
	.loseActives {
		font-size: 0.68rem;
		color: #999999;
	}
	/*风量计数器*/
	.air-change {
		width: 3.7rem;
		/*background: url('../../../static/images/Lovecar/line4@2x.png') no-repeat center;*/
		background-size: contain;
	}
	.wind-count {
	    display: flex;
	    justify-content: center;
	    align-items: center;
	    width: 2.1rem;
	    margin: 0 auto;
	    border: 1px solid #999999;
    	border-radius: 0.3rem;
	}
	.air-change .wind-input {
    	width: 0.9rem;
    	height: 0.6rem;
	    outline: none;
    	border: none;
    	text-align: center;
	}
	.addWind {
	    display: block;
    	width: 0.6rem;
    	height: 0.6rem;
    	line-height: 0.6rem;
		text-align: center;
    	border-right: 1px solid #999999;
	}
	.reduceWind {
	    display: block;
	    width: 0.6rem;
	    height: 0.6rem;
	    line-height: 0.6rem;
	    text-align: center;
	    border-left: 1px solid #999999;
	}
	
	/*分割线*/
	.sing-line {
		width: 6.18rem;
		height: 1px;
	    margin: 1.3rem auto 0.4rem auto;
		background:rgba(153,153,153,.3)
	}
	/*空调底部*/
	.air-footer {
		width: 71%;
		margin: 0.36rem auto 0 auto;
	}
	.tabar>img {
		width: 0.44rem;
		height: 0.44rem;
		margin-bottom: 0.22rem;
	}
	.tabar>span {
		font-size: 0.22rem;
	}
	/*底部激活字体*/
	.active {
		color: #49BBFF;
	}
	/*底部未激活字体*/
	.actives {
		color: #999999;
	}
</style>