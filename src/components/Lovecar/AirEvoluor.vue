<template>
	<div class="skylight-control">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">空气进化器</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="window-header">
			<div class="window-btn">
				<mt-switch v-model="value" @change="turn"><span></span></mt-switch>
				<span>OFF/NO</span>
			</div>
			<div class="window-sign flex-column">
				<span class="window-ch">天窗</span>
				<span class="window-en">AIRCLEAER</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>

		<!--曲线Start-->
		<div class="curve">
			<div class="cureve-text">
				<span style="left: 3.1rem;top: 2.6rem;">低</span>
				<span style="left: 2.2rem;top: 0.3rem;">中</span>
				<span style="left: 0rem;top: -0.3rem;">高</span>
			</div>
			<div class="curveActive" v-show="curveState">
				<canvas id="rightColorful"></canvas>
			</div>
			<div class="curveLoseActive" v-show="!curveState">
				<canvas id="rightGray"></canvas>
			</div>
		</div>
		<!--曲线End-->

		<!--进化器主体Start-->
		<div class="window-wrap flex-column-align">
			<div class="window-content flex-center-between">
				<!--净化器提示[高，中，低]Start-->
				<div class="temperature">
					<span style="font-size: 0.68rem;color: #222222;">{{windNum[winIndex]}}</span>
				</div>
				<!--净化器提示[高，中，低]End-->

				<!--进化器图Start-->
				<div class="wind-blows">
					<img v-if="activeShowImg" :src="'./static/images/Lovecar/Purify@2x.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/Purify1@2x.png'" alt="" />
					<!--PM2.5提示标语Start-->
					<div class="pm-data" v-if="value">
						<div v-if="pmState" style="color: #888888;" @click="getPmData">点击获取数据</div>
						<div v-else>
							<div class="pm-show">
								<span style="color: #49BBFF;">pm2.5:</span>&nbsp;&nbsp;
								<span style="font-size: 0.36rem;color: #49BBFF;">11μg/m³</span>
							</div>

							<div class="Refresh flex-center-between">
								<img :class="{rotateActive: rotateState}" :src="'./static/images/Lovecar/Refresh@2x.png'" alt="" />
								<span @click="refreshPmData">刷新数据</span>
							</div>
						</div>
					</div>
					<!--PM2.5提示标语End-->
				</div>
				<!--净化器图End-->

				<!--弧线Start-->
				<div class="num">
					<!--<span :class="activeShowImg?'fontActive':'loseActives'">{{number}}</span>-->
				</div>
				<!--弧线End-->
			</div>
			<!--进化器强度计数器Start-->
			<div class="window-change">
				<div style="margin-bottom: 0.36rem;" class="flex-center">
					<span style="width: 0.5rem;margin-right: 0.47rem;font-size: 0.24rem;color: #222222;">风速</span>
					<img :src="'./static/images/Lovecar/left@2x.png'" alt="" />
					<div class="wind-count">
						<span @click=" windReduce" class="addWind"><</span>
						<input class="wind-input" type="text" v-model="windNum[winIndex]" readonly />
						<span @click="windAdd" class="reduceWind">></span>
					</div>
					<img :src="'./static/images/Lovecar/right@2x.png'" alt="" />
				</div>
			</div>
			<!--进化器强度计数器End-->
		</div>
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
		name: 'skylightControl',
		data() {
			return {
				//进化器控制按钮开关
				value: false,
				//图片激活变量
				activeShowImg: 0,
				//进化器强度展示
				windNum: ['低', '中', '高'],
				winMin: 0,
				//进化器控制变量
				winIndex: 0,
				//PM提示状态
				pmState: true,
				//PM2.5数据loading状态
				rotateState: false,
				//pin码值
				pinNumber: '',
				//自定义软键盘状态 0 消失 2 键盘开启
				showTyper: 0,
				//pin码弹出框控制变量
				popupVisible: false,
				//软键盘内容-12位随机数组
				keyNums: [],
				//曲线状态
				curveState: false,
				//净化器默认点
				evoluorSpace: 0,
			}
		},
		methods: { //进化器控制开关方法
			turn() {
				if(this.activeShowImg) {
					this.value = true;
				} else {
					this.value = false;
				}
				this.popupVisible = !this.popupVisible
			},
			//进化器强度增加
			windAdd() {
				if(this.activeShowImg) {
					if(this.evoluorSpace >= this.windNum.length - 1) {
						this.evoluorSpace = this.windNum.length - 1
					} else {
						this.evoluorSpace++
							//计数器控制曲线
							new Createarc({
								el: 'rightColorful', //canvas id
								vuethis: this, //使用位置的this指向
								num: 'evoluorSpace', //data数值
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
					return
				}

			},
			//进化器强度减弱
			windReduce() {
				if(this.activeShowImg) {
					if(this.evoluorSpace <= this.winMin) {
						this.evoluorSpace = this.winMin
					} else {
						this.evoluorSpace--
							//计数器控制曲线
							new Createarc({
								el: 'rightColorful', //canvas id
								vuethis: this, //使用位置的this指向
								num: 'evoluorSpace', //data数值
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
					return
				}

			},
			//获取PM2.5数据
			getPmData() {
				this.pmState = false
			},
			//刷新PM2.5数据
			refreshPmData() {
				this.rotateState = true
				setTimeout(() => {
					this.rotateState = false
				}, 1000)
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
				if(this.pinNumber.length < 6) { //判断位数，还未超出6位则可继续输入
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
			//产生曲线
			produCurve() {
				//净化器激活弧线
				new Createarc({
					el: 'rightColorful', //canvas id
					vuethis: this, //使用位置的this指向
					num: 'evoluorSpace', //data数值
					type: 'right', //圆弧方向  left right
					tempdel: 3, //总差值
					ratio: 0.4, //宽度比例
					iscontrol: true, //控制是否能滑动，可以滑动
					color: {
						start: '#49bbff', //圆弧下边颜色
						end: '#04e8db', //圆弧上边颜色
					}
				})
				//进化器未激活弧线
				new Createarc({
					el: 'rightGray', //canvas id
					vuethis: this, //使用位置的this指向
					num: 'evoluorSpace', //data数值
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
			}
		},
		mounted() {
			this.produCurve()
		},
		watch: {
			pinNumber(newVal, oldVal) {
				//				console.log(this.pinNumber.length)
				if(this.pinNumber.length == 6) {
					setTimeout(() => {
						this.value = !this.value
						//pin码正确激活弧线
						this.curveState = !this.curveState
						//pin码正确激活进化器图
						this.activeShowImg = !this.activeShowImg,
						//消失遮罩
						this.popupVisible = !this.popupVisible
						//消失软键盘
						this.showTyper = 0,
						//清空pin码
						this.pinNumber = ''
					}, 1000)

				}
			},
			evoluorSpace(newVal, oldVal) {
				this.winIndex = newVal
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
	/*进化器头部*/
	
	.window-header {
		padding: 0.4rem 0.64rem 0 0.68rem
	}
	/*进化器开关按钮*/
	
	.window-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/*进化器标志*/
	
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
		top: 0.9rem;
		margin-left: -7%;
	}
	/*进化器主体*/
	
	.window-wrap {
		height: 8.6rem;
		padding: 0.45rem 0.68rem;
	}
	
	.window-content {
		height: 7.6rem;
		width: 100%;
	}
	/*进化器强度*/
	
	.temperature {
		align-self: flex-start;
		width: 0.8rem;
	}
	/*进化器图片*/
	
	.wind-blows {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
		align-self: flex-end;
		width: 3rem;
		height: 4.6rem;
		margin-right: 0.5rem;
	}
	
	.wind-blows>img {
		width: 1.4rem;
		height: 2.35rem;
		margin: 0 auto;
	}
	/*PM数据*/
	
	.pm-data {
		display: flex;
		flex-direction: column;
		width: 3rem;
		height: 1.6rem;
		line-height: 0.5rem;
		text-align: center;
	}
	
	.pm-show {
		display: flex;
	}
	
	.Refresh {
		justify-content: space-around;
	}
	
	.Refresh>img {
		width: 0.4rem;
		height: 0.32rem;
	}
	
	.Refresh>span {
		display: inline-block;
		margin-right: 0.9rem;
		color: #888888;
	}
	/*进化器强度计数器*/
	
	.window-change {
		display: flex;
		justify-content: center;
		flex-direction: column;
		align-items: center;
		margin-right: 0.6rem;
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
	
	.rotateActive {
		animation: rotate 1s linear infinite;
	}
	
	@-webkit-keyframes rotate {
		0% {
			transform: rotate(0deg);
		}
		100% {
			transform: rotate(360deg);
		}
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