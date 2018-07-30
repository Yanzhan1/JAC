<template>
	<div class="window-control">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">车窗控制</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="window-header">
			<!--<div class="window-btn">
				<mt-switch v-model="value" @change="turn"></mt-switch>
				<span>OFF/NO</span>
			</div>-->
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
					<span :class="activeShowImg?'fontActive':'loseActives'" style="font-size: 0.68rem;color: #222222;">{{windNum[windowSpace]}}</span>
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
						<input class="wind-input" type="text" v-model="windNum[windowSpace]" readonly/>
						<span @click="windAdd" class="reduceWind">></span>
					</div>
					<img :src="'./static/images/Lovecar/right@2x.png'" alt="" />
				</div>
				<span style="color: #222222;font-size: 0.24rem;">升降高度</span>
			</div>
			<!--车窗高度计数器End-->
		</div>
		<!--车窗信息提示Start-->
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
		<!--车窗信息提示End-->

		<!--pin码弹出框Start-->
		<div class="bgMask" v-if="popupVisible" @click="removeMask"></div>
		<mt-popup v-model="popupVisible" :modal="false">
			<div class="pin-remain">
				<div class="flex-center-between">
					<img @click="removeMask" :src="'./static/images/Wit/delete@3x.png'" alt="" style="width:.28rem">
					<div style="font-size:.36rem;color:#222">请输入PIN码</div>
					<span></span>
				</div>
				<div class="pin-code flex-center">
					<div id="pinCon" @click="onTypewriting">
						<input class="pin-input" maxlength="6" type="text" v-model="pinNumber" readonly/>
					</div>
				</div>
			</div>
		</mt-popup>
		<!--pin码弹出框结束-->
		<!--自定义软键盘Start-->
		<div class="typer" v-show="showTyper!=0">
			<ul v-show="showTyper==2">
				<li class="typer-num" v-for="item in keyNums" :class="{'is-A': item=='A','is-OK':item=='OK','is-Del':item=='Del'}" @click="input(item)">{{item}}</li>
			</ul>
		</div>
		<!--自定义软键盘End-->

	</div>
</template>

<script>
	import { Createarc } from '../../../static/js/drawarc.js'
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
				//曲线状态 true彩色 false灰色
				curveState: false,
				//曲线滑动默认点
				windowSpace: 0,
				//页面进入提示框状态 true弹出 false消失
				popupInfo: true,
				//页面进入提示框'不在提醒'状态 true不在提醒未激活  false激活
				remindState: false,
				//pin码弹出框控制变量
				popupVisible: false,
				//pin码值
				pinNumber: '',
				//自定义软键盘状态 0 消失 2 键盘开启
				showTyper: 0,
				//软键盘内容12位随机数组
				keyNums: [],
			}
		},
		methods: {
			//车窗高度增加
			windAdd() {
				if(this.activeShowImg) {
					this.popupVisible = false
					if(this.windowSpace >= this.windNum.length - 1) {
						this.windowSpace = this.windNum.length - 1
					} else {						
						this.windowSpace++
							//计数器控制曲线
							new Createarc({
								el: 'rightColorful', //canvas id
								vuethis: this, //使用位置的this指向
								num: 'windowSpace', //data数值
								type: 'right', //圆弧方向  left right
								tempdel: 3, //总差值
								ratio: 0.4, //宽度比例
								iscontrol: true, //控制是否能滑动，可以滑动
								color: {
									start: '#49bbff', //圆弧下边颜色
									end: '#04e8db', //圆弧上边颜色
								}
							})
					}
				} else {
					this.popupVisible = true
					return
				}

			},
			//车窗高度减少
			windReduce() {
				if(this.activeShowImg) {
					this.popupVisible = false
					if(this.windowSpace <= this.winMin) {
						this.windowSpace = 0
					} else {
						this.windowSpace--
							//计数器控制曲线
							new Createarc({
								el: 'rightColorful', //canvas id
								vuethis: this, //使用位置的this指向
								num: 'windowSpace', //data数值
								type: 'right', //圆弧方向  left right
								tempdel: 3, //总差值
								ratio: 0.4, //宽度比例
								iscontrol: true, //控制是否能滑动，可以滑动
								color: {
									start: '#49bbff', //圆弧下边颜色
									end: '#04e8db', //圆弧上边颜色
									num: 2
								}
							})
					}
				} else {
					this.popupVisible = true
					return
				}

			},
			//产生曲线
			produCurve() {
				//车窗激活弧线
				new Createarc({
					el: 'rightColorful', //canvas id
					vuethis: this, //使用位置的this指向
					num: 'windowSpace', //data数值
					type: 'right', //圆弧方向  left right
					tempdel: 3, //总差值
					ratio: 0.4, //宽度比例
					iscontrol: true, //控制是否能滑动，可以滑动
					color: {
						start: '#49bbff', //圆弧下边颜色
						end: '#04e8db', //圆弧上边颜色
						num: 2
					}
				})
				//车窗未激活弧线
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
						end: '#EEEEEE', //圆弧上边颜色
						num: 2
					}
				})
			},
			//页面进入提示框中'不在提醒'状态
			remind() {
				this.remindState = !this.remindState
			},
			//修改车窗高度弹出框-确定，调节接口需要发出请求，获取信息提示框状态
			winConfirm() {
				this.popupInfo = false
			},
			//修改车窗高度弹出框-取消
			reduceWindow() {
				this.popupInfo = false
			},
			//点击遮罩或者'x'移除popup
			removeMask() {
				this.popupVisible = !this.popupVisible
				this.showTyper = 0;
			},
			//产生随机数
			randomnum(min, max) {
				var num = Math.floor(Math.random() * (max - min) + min);
				return num;
			},
			//键盘点击事件，传入键盘本身的值
			input(item) {
				if(item == '关闭') { //判断是否点击了关闭按钮
					this.showTyper = 0;
					return;
				}
				if(item == 'Del') { //判断是否点击了删除按钮
					this.pinNumber = this.pinNumber.slice(0, -1);
					return;
				}
				if(this.pinNumber.length < 6) { //判断位数，还未超出5位则可继续输入
					this.pinNumber = this.pinNumber + item;
				} else {

				}
			},
			//点击pin码验证框时，弹出自定义键盘
			onTypewriting() {
				this.showTyper = 2;
				this.produceArray()
			},
			//产生软键盘12位随机数组
			produceArray() {
				var that = this
				var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				var arr2 = []
				for(var i = 0; i < 12; i++) {
					var randomnumber = that.randomnum(0, arr.length);
					if(i == 9) {
						arr2.push('关闭')
					} else if(i == 11) {
						arr2.push('Del')
					} else {
						arr2.push(arr[randomnumber]);
						arr.splice(randomnumber, 1);
					}
				}
				that.keyNums = arr2
			},
		},
		mounted() {
			this.produCurve()
		},
		watch: {
			pinNumber(newVal, oldVal) {
				//console.log(this.pinNumber.length)
				if(this.pinNumber.length == 6) {
						setTimeout(() => {
							//输入正确pin码激活曲线
							this.curveState = !this.curveState
							//输入正确pin码激活车窗图
							this.activeShowImg = !this.activeShowImg,
							//消失遮罩
							this.popupVisible = !this.popupVisible
							//消失软键盘
							this.showTyper = 0,
							//清空pin码
							this.pinNumber = ''
						}, 1000)
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
		padding: 1.6rem 0.64rem 0 0.68rem
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
	/*页面进入提示*/
	
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
	/*pin码提示框*/
	
	.pin-remain {
		width: 6.3rem;
		height: 3.3rem;
		padding: 0.2rem 0.4rem;
	}
	
	.pin-code {
		height: 2rem;
		width: 100%;
	}
	
	.pin-code>div {}
	
	.pin-code>div>input {
		display: block;
		width: 5.6rem;
		height: 0.94rem;
		text-indent: 0.4rem;
		letter-spacing: 0.77rem;
		/*text-align: center;*/
		border: none;
		outline: none;
		background: url(../../../static/images/Lovecar/border@2x.png) no-repeat center;
		background-size: 100%;
	}
	/*自定义软键盘*/
	
	ul {
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	
	ul>li {
		width: 33.3%;
	}
	
	.typer {
		position: fixed;
		bottom: 0;
		background-color: #fff;
		height: 4rem;
		width: 100%;
		z-index: 3000;
	}
	
	.typer li {
		float: left;
		height: .7rem;
		margin: .1rem .05rem 0;
		color: #333;
		text-align: center;
		font-size: .32rem;
		line-height: .7rem;
		background-color: #ccc;
		-webkit-border-radius: .1rem;
		-moz-border-radius: .1rem;
		border-radius: .1rem;
	}
	
	.typer li.typer-pro {
		width: 31%;
		padding: 0 .15rem;
	}
	
	.typer li.typer-pro.is-closeType {
		width: 1.2rem;
		float: right;
	}
	
	.typer li.typer-num {
		width: 31%;
		/*padding: 0.8rem .1rem;*/
		background-image: -webkit-linear-gradient(125deg, #147B96, #E6D205 25%, #147B96 50%, #E6D205 75%, #147B96);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		-webkit-background-size: 200% 100%;
		-webkit-animation: masked-animation 4s infinite linear;
	}
	
	.typer li.typer-num.is-A {
		margin-left: .31rem;
	}
	
	.typer li.typer-num.is-OK {
		width: .8rem;
		margin-left: .1rem;
	}
	
	@-webkit-keyframes masked-animation {
		0% {
			background-position: 0 0;
		}
		100% {
			background-position: -100% 0;
		}
	}
	/*自定遮罩层*/
	
	.bgMask {
		position: absolute;
		left: 0;
		top: 0;
		right: 0;
		bottom: 0;
		width: 100%;
		height: 100%;
		opacity: 0.5;
		background: #000;
	}
</style>