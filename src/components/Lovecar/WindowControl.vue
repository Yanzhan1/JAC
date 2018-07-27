<template>
	<div class="window-control">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">车窗控制</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="window-header">
			<div class="window-btn">
				<mt-switch v-model="value" @change="turn"></mt-switch>
				<span>OFF/NO</span>
			</div>
			<div class="window-sign flex-column">
				<span class="window-ch">车窗</span>
				<span class="window-en">CONTROL</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>
		<!--车窗主体Start-->
		<div class="window-wrap flex-column-align">
			<div class="window-content flex-center-between">
				<div class="temperature">
					<span :class="activeShow?'fontActive':'loseActives'" style="font-size: 0.68rem;color: #222222;">{{windNum[winIndex]}}</span>
				</div>
				<div class="wind-blows">
					<img v-if="activeShow" :src="'./static/images/Lovecar/window@2x.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/window1@2x.png'" alt="" />
				</div>
				<div class="num">
					<!--<span :class="activeShow?'fontActive':'loseActives'">{{number}}</span>-->
				</div>
			</div>
			<!--车窗高度计数器Start-->
			<div class="window-change">
				<div style="margin-bottom: 0.36rem;" class="flex-center">
					<img :src="'./static/images/Lovecar/left@2x.png'" alt="" />
					<div class="wind-count">
						<span @click=" windReduce" class="addWind"><</span>
						<input class="wind-input" type="text" v-model="windNum[winIndex]" />
						<span @click="windAdd" class="reduceWind">></span>
					</div>
					<img :src="'./static/images/Lovecar/right@2x.png'" alt="" />
				</div>

				<span style="color: #222222;font-size: 0.24rem;">升降高度</span>
			</div>
			<!--车窗高度计数器End-->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'windowControl',
		data() {
			return {
				//车窗控制按钮开关
				value: false,
				value: false,
				//图片激活变量
				activeShow: 0,
				//车窗高度展示
				windNum: ['0%', '50%', '100%'],
				winMin: 0,
				//车窗控制变量
				winIndex: 0
			}
		},
		methods: {
			//车窗控制开关方法
			turn() {
				this.activeShow = !this.activeShow
			},
			//激活底部图标方法
			change(val) {
				this.activeShow ? this.activeShow = val : this.activeShow = 0
			},
			//车窗高度增加
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
			//车窗高度减少
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
	/*车窗头部*/
	
	.window-header {
		padding: 0.4rem 0.64rem 0 0.68rem
	}
	/*车窗开关按钮*/
	
	.window-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/*车窗标志*/
	
	.window-ch {
		height: 0.31rem;
		margin-bottom: 0.17rem;
		line-height: 0.31rem;
		color: rgb(34, 34, 34);
		font-size: 0.32rem;
	}
	
	.window-en {
		height: 0.18rem;
		margin-bottom: 0.36rem;
		line-height: 0.18rem;
		font-size: 0.22rem;
		font-family: PingFang-SC-Regular;
		color: rgba(34, 34, 34, 1);
	}
	/*车窗主体*/
	
	.window-wrap {
		height: 8.6rem;
		padding: 0.45rem 0.68rem;
	}
	
	.window-content {
		height: 4.6rem;
		width: 100%;
	}
	/*车窗高度*/
	
	.temperature {
		align-self: flex-start;
		width: 0.8rem;
	}
	/*车窗图*/
	
	.wind-blows {
		align-self: flex-end;
	}
	
	.wind-blows>img {
	    width: 3.06rem;
    	height: 1.46rem;
	}
	/*车窗高度计数器*/
	
	.window-change {
	    display: flex;
	    justify-content: center;
	    flex-direction: column;
	    align-items: center;
	}
	
	.window-change>div>img {
		width: 0.8rem;
		height: 1px;
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
	
	.window-change .wind-input {
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
	/*车窗展示激活*/
	.fontActive {
		font-size: 0.68rem;
		color: #222222;
	}
	.loseActives {
		font-size: 0.68rem;
		color: #999999;
	}
</style>