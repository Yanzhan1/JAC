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
				<mt-switch v-model="value" @change="turn"><span></span></mt-switch>
				<span>OFF/NO</span>
			</div>
			<div class="air-sign flex-column">
				<span class="air-ch">空调</span>
				<span class="air-en">conditioners</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>
		<!--曲线Start-->
		<div class="curve"> 
				<div class="cureve-text">
					<span style="left: 3.1rem;top: 2.6rem;">15</span>
					<span style="left: 2.6rem;top: 0.9rem;">24</span>
					<span style="left: 1.6rem;top: -0.1rem;">28</span>
					<span style="left: 0rem;top: -0.3rem;">32</span>
				</div>
				<div class="curveActive" v-show="curveState">
					<canvas id="rightColorful"></canvas>
				</div>
				<div class="curveLoseActive" v-show="!curveState">
					<canvas id="rightGray"></canvas>
				</div>
			
		</div>
		<!--曲线End-->
		
		<!--空调主体Start-->
		<div class="air-wrap flex-column-align">
			<div class="air-content flex-center-between">
				<!--温度计数器Start-->
				<div class="temperature">
					<span style="display:block;margin-bottom: 0.4rem;">温度</span>
					<div class="temper-inputcoun flex-center">
						<div class="counter">
							<span @click="add" style="transform: rotateZ(-90deg);">></span>
							<span @click="reduce" style="transform: rotateZ(-90deg);"><</span>
						</div>
					</div>
				</div>
				<!--温度计数器End-->
				
				<!--空调图Start-->
				<div class="wind-blows">
					<img v-if="activeShowImg" :src="'./static/images/Lovecar/air@2x.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/air1@2x.png'" alt="" />
				</div>
				<!--空调End-->
				
				<!--温度数值Start-->
				<div class="num">
					<span :class="activeShowImg?'fontActive':'loseActives'">{{number}}℃</span>
				</div>
				<!--温度数值End-->
			</div>
			<!--风量计数器Start-->
			<div class="air-change flex-center">
				<img :src="'./static/images/Lovecar/left@2x.png'" alt="" />
				<div class="wind-count">
					<span @click=" windReduce" class="addWind"><</span>
					<input class="wind-input" type="text" v-model="windNum[winIndex]" readonly />
					<span @click="windAdd" class="reduceWind">></span>
				</div>
				<img :src="'./static/images/Lovecar/right@2x.png'" alt="" />
			</div>
			<!--风量计数器End-->
		</div>
		<!--空调主体End-->
		<div class="sing-line"></div>
		<!--底部导航Start-->
		<div class="air-footer flex-center-between">
			<div class="tabar flex-column-align" @click="change(1)">
				<img v-if="activeShowImg == 1" :src="'./static/images/Lovecar/zhileng1@2x_6.png'" />
				<img v-else :src="'./static/images/Lovecar/zhileng@2x.png'" />
				<span :class="activeShowImg==1?'active':'actives'">制冷</span>
			</div>
			<div class="tabar flex-column-align" @click="change(2)">
				<img v-if="activeShowImg == 2" :src="'./static/images/Lovecar/chushuang1@2x_8.png'" />
				<img v-else :src="'./static/images/Lovecar/chushuang@2x.png'" />
				<span :class="activeShowImg==2?'active':'actives'">除霜</span>
			</div>
			<div class="tabar flex-column-align" @click="change(3)">
				<img v-if="activeShowImg == 3" :src="'./static/images/Lovecar/zhire1@2x_2.png'" />
				<img v-else :src="'./static/images/Lovecar/zhire@2x.png'" />
				<span :class="activeShowImg==3?'active':'actives'">制热</span>
			</div>
			<div class="tabar flex-column-align" @click="change(4)">
				<img v-if="activeShowImg == 4" :src="'./static/images/Lovecar/chushi1@2x_85.png'" />
				<img v-else :src="'./static/images/Lovecar/chushi@2x.png'" />
				<span :class="activeShowImg==4?'active':'actives'">除湿</span>
			</div>
			<div class="tabar flex-column-align" @click="change(5)">
				<img v-if="activeShowImg == 5" :src="'./static/images/Lovecar/shuimian1@2x_25.png'" />
				<img v-else :src="'./static/images/Lovecar/shuimian@2x.png'" />
				<span :class="activeShowImg==5?'active':'actives'">睡眠</span>
			</div>
			<!--底部导航End-->
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
		name: 'airconditionControl',
		data() {
			return {
				value: false,
				//图片激活变量
				activeShowImg: 0,
				//温度调节最大值
				max: 32,
				//温度调节最小值
				min: 15,
				//温度展示值
				number: 15,
				temperNum: [15,24,28,32],
				//风量展示
				windNum: [1, 2, 3, 4],
				winMin: 0,
				//风量控制变量
				winIndex: 0,
				//pin码弹出框控制变量
				popupVisible: false,
				//pin码值
				pinNumber: '',
				//自定义软键盘状态 0 消失 2 键盘开启
				showTyper: 0,
				//软键盘内容-12位随机数组
				keyNums: [],
				//曲线状态
				curveState: false,
				//空调默认点
				airSpace: 0,
				
			}
		},
		methods: {
			//空调控制开关方法
			turn() {
				if (this.activeShowImg) {
					this.value = true;
				} else {
					this.value = false;
				}
				this.popupVisible = !this.popupVisible
			},
			//激活底部图标方法
			change(val) {
				this.activeShowImg ? this.activeShowImg = val : this.activeShowImg = 0
			},
			//温度增加
			add() {
				if(this.activeShowImg && this.number < this.max) {
					this.number++;
				} else if(this.number >= this.max) {
					this.number = this.max;
					return
				}
			},
			//温度减少
			reduce() {
				if(this.activeShowImg && this.number > this.min) {
					this.number--;
				} else if(this.number <= this.min) {
					this.number = this.min
					return
				}
			},
			//风量增加
			windAdd() {
				if(this.activeShowImg) {
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
				if(this.activeShowImg) {
					if(this.winIndex <= this.winMin) {
						this.winIndex = this.windNum.length - 1
					} else {
						this.winIndex--
					}
				} else {
					return
				}

			},
			//点击遮罩或者'x'移除popup
			removeMask () {
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
			//产生曲线
			produCurve () {
				//温度激活弧线
				new Createarc({
					el: 'rightColorful', //canvas id
					vuethis: this, //使用位置的this指向
					num: 'airSpace', //data数值
					type: 'right', //圆弧方向  left right
					tempdel: 4, //总差值
					ratio: 0.4, //宽度比例
					iscontrol: true, //控制是否能滑动，可以滑动
					color: {
						start: '#e22e10', //圆弧下边颜色
						center: '#f39310',
						end: '#04e8db', //圆弧上边颜色
						num: 3
					}
				})
				//温度未激活弧线
				new Createarc({
					el: 'rightGray', //canvas id
					vuethis: this, //使用位置的this指向
					num: 'airSpace', //data数值
					type: 'right', //圆弧方向  left right
					tempdel: 4, //总差值
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
		mounted () {
			this.produCurve()
		},
		watch: {
			pinNumber(newVal, oldVal) {
//				console.log(this.pinNumber.length)
				if (this.pinNumber.length == 6) {
					setTimeout( () => {
						this.value = !this.value
						this.curveState = !this.curveState
						this.activeShowImg = !this.activeShowImg,
						//消失遮罩
						this.popupVisible = !this.popupVisible
						//消失软键盘
						this.showTyper = 0,
						//清空pin码
						this.pinNumber = ''
					},1000)
					
				}
			},
			airSpace (newVal, oldVal) {
				this.number = this.temperNum[newVal]
			},
			number (newVal, oldVal) {
				if (newVal == 24) {
					this.airSpace = 1;
					
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
	/*曲线*/
	
	.curve {
		position: relative;
	}
	.curve>.cureve-text> span {
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
	
	.air-change>img {
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
		background: rgba(153, 153, 153, .3)
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
		height: 4.5rem;
		width: 100%;
		padding-top: .1rem;
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
         0%{ background-position: 0 0;}
         100% { background-position: -100% 0;}
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