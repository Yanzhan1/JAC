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

		<!--曲线Start-->
		<div class="curve">
			<div class="cureve-text">
				<span style="left: 3.1rem;top: 2.6rem;">0%</span>
				<span style="left: 2.2rem;top: 0.3rem;">50%</span>
				<span style="left: 0rem;top: -0.3rem;">100%</span>
			</div>
			<div class="curveActive" v-show="curveState">
				<canvas id="rightColorful"></canvas>
			</div>
			<div class="curveLoseActive" v-show="!curveState">
				<canvas id="rightGray"></canvas>
			</div>
		</div>
		<!--曲线End-->

		<!--车窗主体Start-->
		<div class="window-wrap flex-column-align">
			<div class="window-content flex-center-between">
				<div class="temperature">
					<span :class="activeShowImg?'fontActive':'loseActives'" style="font-size: 0.68rem;color: #222222;">{{windNum[winIndex]}}</span>
				</div>
				<div class="wind-blows">
					<img v-if="activeShowImg" :src="'./static/images/Lovecar/window@2x.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/window1@2x.png'" alt="" />
				</div>
				<div class="num">
					<!--<span :class="activeShowImg?'fontActive':'loseActives'">{{number}}</span>-->
				</div>
			</div>
			<!--车窗高度计数器Start-->
			<div class="window-change">
				<div style="margin-bottom: 0.36rem;" class="flex-center">
					<img :src="'./static/images/Lovecar/left@2x.png'" alt="" />
					<div class="wind-count">
						<span @click=" windReduce" class="addWind"><</span>
						<input class="wind-input" type="text" v-model="windNum[winIndex]" readonly/>
						<span @click="windAdd" class="reduceWind">></span>
					</div>
					<img :src="'./static/images/Lovecar/right@2x.png'" alt="" />
				</div>
				<span style="color: #222222;font-size: 0.24rem;">升降高度</span>
			</div>
			<!--车窗高度计数器End-->
		</div>
		<!--车窗信息提示-->
		<mt-popup v-model="popupInfo">
			<div class="wind-wrap">
				<div class="window-title">
					<h5>提示</h5>
				</div>
				<div class="info-content">
					<span>降下车窗可能存在风险，请确定车机已允许该操作。</span>
				</div>
				<div class="info-time">
					<img v-if="remindState" :src="'./static/images/Lovecar/loseWindow.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/window2@2x.png'" alt="" />
					<span @click="remind">不再提醒</span>
				</div>
				<div class="info-btn">
					<button @click="winConfirm">确定</button>
					<button @click="reduceWindow" style="width: 48%;">取消</button>
				</div>
			</div>

		</mt-popup>
	</div>
</template>

<script>
	import { Createarc } from '../../../static/js/drawarc.js'
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'windowControl',
		data() {
			return {
				//车窗控制按钮开关
				value: false,
				value: false,
				//图片激活变量
				activeShowImg: 0,
				//车窗高度展示
				windNum: ['0%', '50%', '100%'],
				winMin: 0,
				//车窗控制变量
				winIndex: 0,
				//曲线状态
				curveState: false,
				//净化器默认点
				windowSpace: 0,
				//车窗信息提示框
				popupInfo: false,
				//提醒状态
				remindState: true
			}
		},
		methods: {
			//车窗控制开关方法
			turn() {
				this.activeShowImg = !this.activeShowImg
			},
			//车窗高度增加
			windAdd() {
				if(this.activeShowImg) {
					if(this.winIndex >= this.windNum.length - 1) {
						this.winIndex = this.windNum.length - 1
					} else {
						this.winIndex++
					}
				} else {
					return
				}

			},
			//车窗高度减少
			windReduce() {
				if(this.activeShowImg) {
					if(this.winIndex <= this.winMin) {
						this.winIndex = 0
					} else {
						this.winIndex--
					}
				} else {
					return
				}

			},
			//产生曲线
			produCurve() {
				//净化器激活弧线
				new Createarc({
					el: 'rightColorful', //canvas id
					vuethis: this, //使用位置的this指向
					num: 'windowSpace', //data数值
					type: 'right', //圆弧方向  left right
					tempdel: 3, //总差值
					ratio: 0.4, //宽度比例
					iscontrol: true, //控制是否能滑动，可以滑动
					color: {
						start: '#e22e10', //圆弧下边颜色
						center: '#f39310',
						end: '#04e8db', //圆弧上边颜色
						num: 3
					}
				})
				//进化器未激活弧线
				new Createarc({
					el: 'rightGray', //canvas id
					vuethis: this, //使用位置的this指向
					num: 'windowSpace', //data数值
					type: 'right', //圆弧方向  left right
					tempdel: 3, //总差值
					ratio: 0.4, //宽度比例
					iscontrol: false, //控制是否能滑动，禁止滑动
					color: {
						start: '#EEEEEE', //圆弧下边颜色
						center: '#EEEEEE',
						end: '#EEEEEE', //圆弧上边颜色
						num: 3
					}
				})
			},
			//提醒状态
			remind () {
				this.remindState = false
			},
			//修改车窗高度弹出框-确定
			winConfirm () {
				this.popupInfo = false
			},
			reduceWindow () {
				
			}
		},
		mounted() {
			this.produCurve()
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
	/*曲线*/
	
	.curve {
		position: relative;
	}
	
	.curve>.cureve-text>span {
		position: absolute;
		color: #222222;
		font-size: 0.26rem;
	}
	
	.curve>div {
		position: absolute;
		left: 50%;
		top: 0.7rem;
		margin-left: -2%;
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
	/*车窗提示*/
	
	.wind-wrap {
		width: 6.3rem;
		padding: 0.44rem 0.58rem 0.33rem;
	}
	
	.window-title {
		margin-bottom: 0.54rem;
		text-align: center;
		color: #222222;
		font-size: 0.36rem;
	}
	
	.info-content {
		margin-bottom: 0.48rem;
		color: #444444;
		font-size: 0.26rem;
		text-align: center;
	}
	
	.info-time {
	    display: flex;
    	align-items: center;
		color: #888888;
		height: 0.24rem;
		line-height: 0.24rem;
		margin-bottom: 0.48rem;
	}
	
	.info-time>img {
		width: 0.4rem;
    	height: 0.4rem;
    	margin-right: 0.2rem;
	}
	.info-time>span {
		font-size: 0.24rem;
	}
	
	.info-btn {
		height: 0.98rem;
		border-top: 1px solid #f1f1f1;
		line-height: 0.98rem;
		text-align: center;
	}
	
	.info-btn>button {
		outline: none;
		border: none;
		color: #49BBFF;
		font-size: 0.32rem;
		background: no-repeat;
		width: 50%;
		padding: 0.1rem 0;
	}
	.info-btn>button:not(:last-child) {
		border-right: 1px solid #f1f1f1;
	}
</style>