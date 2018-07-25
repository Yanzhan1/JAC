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
		<!--主副驾驶位温度展示Start-->
		<div class="seat-remind">
			<span :class="activeShow?'fontActive':'loseActives'">{{fuWindNum[fuWinIndex]}}</span>
			<span :class="activeShow?'fontActive':'loseActives'">{{windNum[winIndex]}}</span>
		</div>
		<!--主副驾驶位温度展示End-->

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
			<div class="input-count flex-center-between">
				<!--主驾计数-->
				<div class="seat-change flex-center-between">
					<span style="font-size: 0.22rem;color: #222222;">主驾驶</span>
					<div class="wind-count">
						<span @click="reduce" class="addWind"><</span>
						<input class="wind-input" type="text" v-model="fuWindNum[fuWinIndex]" />
						<span @click="add" class="reduceWind">></span>
					</div>
				</div>
				<!--副驾计数-->
				<div class="seat-change flex-center-between">
					<span style="font-size: 0.22rem;color: #222222;">副驾驶</span>
					<div class="wind-count">
						<span @click=" windReduce" class="addWind"><</span>
						<input class="wind-input" type="text" v-model="windNum[winIndex]" />
						<span @click="windAdd" class="reduceWind">></span>
					</div>
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
				//副驾展示
				windNum: ['高', '中', '低'],
				//主驾展示
				fuWindNum: ['高', '中', '低'],
				winMin: 0,
				//副驾控制变量
				winIndex: 0,
				//主驾控制变量
				fuWinIndex: 0
			}
		},
		methods: {
			//座椅控制开关方法
			turn() {
				this.activeShow = !this.activeShow
			},
			//激活图标方法
			change(val) {
				this.activeShow ? this.activeShow = val : this.activeShow = 0
			},
			//副驾座椅温度增加
			add() {
				if(this.activeShow) {
					if(this.fuWinIndex >= this.fuWindNum.length - 1) {
						this.fuWinIndex = 0
					} else {
						this.fuWinIndex++
					}
				} else {
					return
				}
			},
			//副驾座椅温度减少
			reduce() {
				if(this.activeShow) {
					if(this.fuWinIndex <= this.winMin) {
						this.fuWinIndex = this.fuWindNum.length - 1
					} else {
						this.fuWinIndex--
					}
				} else {
					return
				}
			},
			//主驾温度增加
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
			//主驾温度减少
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
	
	.flex-center-around {
		/*水平垂直居中-平均对齐*/
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	
	.flex-center-between {
		/*水平垂直居中-两边对齐*/
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex-center {
		/*水平垂直居中*/
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.flex-column {
		/*竖直方向*/
		display: flex;
		flex-direction: column;
	}
	/*座椅头部*/
	
	.seat-header {
		padding: 0.4rem 0.64rem 0 0.68rem
	}
	/*座椅开关按钮*/
	
	.seat-btn {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
		margin-bottom: 0.47rem;
	}
	/*座椅标志*/
	
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
	/*主副驾温度*/
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
	/*座椅主体*/
	
	.seat-wrap {
		height: 7.2rem;
		padding-top: 2.7rem;
	}
	
	.wind-blows img {
		width: 1.34rem;
		height: 1.57rem;
	}
	/*计数器*/
	
	.seat-change {
		width: 3.7rem;
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
	.input-count {
		width: 90%;
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
	/*座椅温度展示未激活字体*/
	.loseActives {
		color: #666666;
		font-size: 0.68rem;
	}
</style>