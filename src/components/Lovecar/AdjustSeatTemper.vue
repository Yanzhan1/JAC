<template>
	<div class="adjust-seat-temper">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">座椅调温</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="seat-header">
			<div class="seat-btn">
				<div class="seat-warm flex-center-between" style="width: 2rem;">
					<span>加热</span>
					<mt-switch v-model="value" @change="turn"></mt-switch>
				</div>
				<div class="car-aeration flex-center-between" style="width: 2rem;">
					<span>通风</span>
					<mt-switch v-model="aeraValue"></mt-switch>
				</div>

			</div>
			<div class="seat-sign flex-column">
				<span class="seat-ch">座椅</span>
				<span class="seat-en">ATTEMPERATION</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>
		<div class="seat-remind">
			<span :class="activeShow?'fontActive':'loseActives'">{{windNum[winIndex]}}</span>
			<span :class="activeShow?'fontActive':'loseActives'">{{windNum[winIndex]}}</span>
		</div>
		<!--座椅主体Start-->
		<div class="seat-wrap flex-column-align">
			<div class="wind-blows">
				<div class="seat-active" v-if="activeShow">
					<div style="display: flex;margin-bottom: 0.23rem;">
						<img :src="'./static/images/Lovecar/Chair2@2x.png'" alt="" />
						<img :src="'./static/images/Lovecar/Chair2@2x.png'" alt="" />
					</div>
					<div style="display: flex;justify-content: space-around;">
						<span style="color: #666666;font-size:0.26rem;">主驾驶</span>
						<span style="color: #666666;font-size:0.26rem;">副驾驶</span>
					</div>
				</div>
				<div class="seat-loseactive" v-else>
					<div style="display: flex;margin-bottom: 0.23rem;">
						<img :src="'./static/images/Lovecar/Chair3@2x.png'" alt="" />
						<img :src="'./static/images/Lovecar/Chair3@2x.png'" alt="" />
					</div>
					<div style="display: flex;justify-content: space-around;">
						<span style="color: #666666;font-size:0.26rem;">主驾驶</span>
						<span style="color: #666666;font-size:0.26rem;">副驾驶</span>
					</div>
				</div>
			</div>
			<!--计数器Start-->
			<div class="seat-change">
				<div class="wind-count">
					<span @click=" windReduce" class="addWind"><</span>
					<input class="wind-input" type="text" v-model="windNum[winIndex]" />
					<span @click="windAdd" class="reduceWind">></span>
				</div>
			</div>
			<!--计数器End-->
		</div>
		<!--座椅主体End-->
	</div>
</template>

<script>
	export default {
		name: 'adjustSeatTemper',
		data() {
			return {
				//加热开关
				value: false,
				//通风开关
				aeraValue: false,
				//图片激活变量
				activeShow: 0,
				//温度调节最大值
				max: 32,
				//温度调节最小值
				min: 15,
				//温度展示值
				number: 15,
				//风量展示
				windNum: ['高', '中', '低'],
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
			change(val) {
				this.activeShow ? this.activeShow = val : this.activeShow = 0
			},
			//温度增加
			add() {
				if(this.activeShow && this.number < this.max) {
					this.number++;
				} else if(this.number >= this.max) {
					this.number = this.max;
					return
				}
			},
			//温度减少
			reduce() {
				if(this.activeShow && this.number > this.min) {
					this.number--;
				} else if(this.number <= this.min) {
					this.number = this.min
					return
				}
			},
			//风量增加
			windAdd() {
				if(this.activeShow) {
					if(this.winIndex >= this.windNum.length - 1) {
						this.winIndex = 0
					} else {
						this.winIndex++
					}
				} else {
					return
				}

			},
			//风量减少
			windReduce() {
				if(this.activeShow) {
					if(this.winIndex <= this.winMin) {
						this.winIndex = this.windNum.length - 1
					} else {
						this.winIndex--
					}
				} else {
					return
				}

			}
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
	
	.flex-column-align {
		/*竖直方向水平居中*/
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
	
	.seat-header {
		padding: 0.4rem 0.64rem 0 0.68rem
	}
	/*空调开关按钮*/
	
	.seat-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 0.47rem;
	}	
	/*空调标志*/	
	.seat-ch {
		height: 0.31rem;
		margin-bottom: 0.17rem;
		line-height: 0.31rem;
		color: rgb(34, 34, 34);
		font-size: 0.32rem;
	}
	
	.seat-en {
		height: 0.18rem;
		margin-bottom: 0.36rem;
		line-height: 0.18rem;
		font-size: 0.22rem;
		font-family: PingFang-SC-Regular;
		color: rgba(34, 34, 34, 1);
	}
	.seat-remind {
		display: flex;
    	justify-content: space-between;
   	 	align-items: center;
    	padding: 0 0.5rem;
	}
	.seat-remind>span {
		color: #222222;
    	font-size: 0.68rem;
	}
	/*空调主体*/
	
	.seat-wrap {
        height: 7.2rem;
    	padding-top: 2.7rem;
	}
	.wind-blows img {
	    width: 1.34rem;
    	height: 1.57rem;
	}
	
	.fontActive {
		font-size: 0.68rem;
		color: #222222;
	}
	/*风量计数器*/
	
	.seat-change {
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
	
	.seat-change .wind-input {
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
	.fontActive {
		color: #222222;
    	font-size: 0.68rem;
	}
	/*温度未激活字体*/
	.loseActives {
		color: #999999;
    	font-size: 0.68rem;
	}
</style>