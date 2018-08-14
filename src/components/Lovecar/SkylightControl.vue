<template>
	<div class="skylight-control">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">天窗控制</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="skylight-header">
			<!--<div class="skylight-btn">
				<mt-switch v-model="value" @change="turn"></mt-switch>
				<span>OFF/NO</span>
			</div>-->
			<div class="skylight-sign flex-column">
				<span class="skylight-ch">天窗</span>
				<span class="skylight-en">SKYLIGHT</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>
		
		<!--曲线Start-->
		<div class="curve">
			<div class="cureve-text">
				<span style="left: 3.1rem;top: 2.6rem;">0%</span>
				<!--<span style="left: 2.2rem;top: 0.3rem;">50%</span>-->
				<span style="left: 0rem;top: -0.3rem;">100%</span>
			</div>
			<div class="curveActive" v-show="curveState" @touchend="end">
				<canvas id="rightColorful"></canvas>
			</div>
			<div class="curveLoseActive" v-show="!curveState">
				<canvas id="rightGray"></canvas>
			</div>
		</div>
		<!--曲线End-->
		
		<!--天窗主体Start-->
		<div class="skylight-wrap flex-column-align">
			<div class="skylight-content flex-center-between">
				<div class="temperature">
					<span style="font-size: 0.68rem;color: #222222;">{{windNum[this.skylightSpace]}}</span>
				</div>
				<div class="wind-blows">
					<img v-if="activeShowImg" :src="'./static/images/Lovecar/skylight@2x.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/skylight1@2x.png'" alt="" />
				</div>
				<div class="num">
					<!--<span :class="activeShowImg?'fontActive':'loseActives'">{{number}}</span>-->
				</div>
			</div>
			<!--天窗宽度计数器Start-->
			<div class="skylight-change">
				<div style="margin-bottom: 0.36rem;" class="flex-center">
					<img :src="'./static/images/Lovecar/left@2x.png'" alt="" />
					<div class="wind-count">
						<span @click=" windReduce" class="addWind"><</span>
						<input class="wind-input" type="text" v-model="windNum[skylightSpace]" readonly/>
						<span @click="windAdd" class="reduceWind">></span>
					</div>
					<img :src="'./static/images/Lovecar/right@2x.png'" alt="" />
				</div>
				<span style="color: #222222;font-size: 0.24rem;">天窗宽度</span>
			</div>
			<!--天窗宽度计数器End-->
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
					<div v-if="$store.state.softkeyboard" id="pinCon" @click="onTypewriting">
						<input class="pin-input" maxlength="6" type="text" v-model="pinNumber" readonly/>
					</div>
					<div v-else class="pin">
						<input v-model="ownKeyBoard.first"  type="text" maxlength="1" />
						<input v-model="ownKeyBoard.second"  type="text" maxlength="1" />
						<input v-model="ownKeyBoard.third"  type="text" maxlength="1" />
						<input v-model="ownKeyBoard.fourth"  type="text" maxlength="1" />
						<input v-model="ownKeyBoard.fifth"  type="text" maxlength="1" />
						<input v-model="ownKeyBoard.sixth"  type="text" maxlength="1" />
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
		data () {
			return {
				//天窗控制按钮开关
//				value: false,
				//移动端键盘值
				ownKeyBoard: {
					first: '',
					second: '',
					third: '',
					fourth: '',
					fifth: '',
					sixth: ''
				},
				//图片激活变量
				activeShowImg: 0,
				//天窗宽度展示
				windNum: ['0%', '100%'],
				winMin: 0,
				//pin码弹出框控制变量
				popupVisible: false,
				//pin码值
				pinNumber: '',
				//自定义软键盘状态 0 消失 2 键盘开启
				showTyper: 0,
				//软键盘内容-12位随机数组
				keyNums: [],
				//曲线状态 true彩色 false灰色
				curveState: false,
				//曲线滑动默认点
				skylightSpace: 0,
			}
		},
		methods: {
			//天窗控制开关方法
			turn() {

//				this.activeShowImg = !this.activeShowImg
			},
			end(){
				this.httpsky()
			},
			//天窗宽度增加
			windAdd() {
				if(this.activeShowImg) {
					this.popupVisible = false
					if(this.skylightSpace >= this.windNum.length - 1) {
						this.skylightSpace = this.windNum.length - 1
					} else {
						this.skylightSpace++
						//计数器控制曲线
						new Createarc({
							el: 'rightColorful', //canvas id
							vuethis: this, //使用位置的this指向
							num: 'skylightSpace', //data数值
							type: 'right', //圆弧方向  left right
							tempdel: 2, //总差值
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
				this.httpsky()
			},
			//天窗宽度减少
			windReduce() {
				if(this.activeShowImg) {
					this.popupVisible = false
					if(this.skylightSpace <= this.winMin) {
						this.skylightSpace = this.winMin
					} else {
						this.skylightSpace--
						//计数器控制曲线
						new Createarc({
							el: 'rightColorful', //canvas id
							vuethis: this, //使用位置的this指向
							num: 'skylightSpace', //data数值
							type: 'right', //圆弧方向  left right
							tempdel: 2, //总差值
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
				this.httpsky()
			},
			//产生曲线
			produCurve() {
				//天窗激活弧线
				new Createarc({
					el: 'rightColorful', //canvas id
					vuethis: this, //使用位置的this指向
					num: 'skylightSpace', //data数值
					type: 'right', //圆弧方向  left right
					tempdel: 2, //总差值
					ratio: 0.4, //宽度比例
					iscontrol: true, //控制是否能滑动，可以滑动
					color: {
						start: '#49bbff', //圆弧下边颜色
						end: '#04e8db', //圆弧上边颜色
						num: 2
					}
				})
				//天窗未激活弧线
				new Createarc({
					el: 'rightGray', //canvas id
					vuethis: this, //使用位置的this指向
					num: 'skylightSpace', //data数值
					type: 'right', //圆弧方向  left right
					tempdel: 2, //总差值
					ratio: 0.4, //宽度比例
					iscontrol: false, //控制是否能滑动，禁止滑动
					color: {
						start: '#EEEEEE', //圆弧下边颜色
						end: '#EEEEEE', //圆弧上边颜色
						num: 2
					}
				})
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
			//执行判定
			inputs () {	
				var _this=this
				$('.pin input').on("input propertychange",function(){
					_this.inputFun($(this));
				});
				$('.pin input').on("keyup",function(e){
					var ev = e;
					_this.keyupFun($(this),ev);
				});

			},
			//判断输入的密码还是否为数字
			inputFun (value) {
				var reg = new RegExp("^[0-9]*$");
				var val = value.val();
				if(!reg.test(val)){
					value.val('')
				}else{
					value.next().focus();
				}
			},
			//监听backspace事件
			keyupFun (value,e) {
				var k = e.keyCode;
				var val = e.key; //"Backspace"
				if(k == 8){		//8是backspace的keyCode
					value.prev().focus();
				}else{
					return false;
				}
			},
			httpsky(){
			var param = {						
						vin:this.$store.state.vin,
						operationType: "SUNROOF",
						extParams: {
						fluctuationType:2,//档位百分比
						percent:this.windNum[this.skylightSpace].replace(/%/g,''),//0-100
						// gear:'',//车窗1,2,3,4,5档可选
					}
				};
				this.$http.post(Lovecar.Control, param, this.$store.state.getpin).then(res => {
					console.log(res);
					// this.operationIds=res.data.operationId
					// setTimeout(()=>{
					// 	this.$http.post(Lovecar.OperationId,{operationId:this.operationIds},this.$store.state.getpin).then((res)=>{
					// 		console.log(res)
					// 	},1000)
					// })
			});
			}
		},
		mounted () {
			this.produCurve();
			this.inputs ()
			console.log(this.windNum[this.skylightSpace].replace(/%/g,''))
		},
		computed: {
			fullValue:{ //拼接input输入框值,激活修改
				get () {
					return this.ownKeyBoard.first + this.ownKeyBoard.second + this.ownKeyBoard.third + this.ownKeyBoard.fourth + this.ownKeyBoard.fifth + this.ownKeyBoard.sixth
				},
				set (newVal) {
					this.ownKeyBoard.first=newVal
					this.ownKeyBoard.second=newVal
					this.ownKeyBoard.third=newVal
					this.ownKeyBoard.fourth=newVal
					this.ownKeyBoard.fifth=newVal
					this.ownKeyBoard.sixth=newVal
				}	
			}
		},
		watch: {
			pinNumber(newVal, oldVal) {
				//console.log(this.pinNumber.length)
				if(this.pinNumber.length == 6) {
						setTimeout(() => {
							var nums=this.pinNumber
							//输入正确pin码激活曲线
							this.curveState = !this.curveState
							//输入正确pin码激活天窗图
							this.activeShowImg = !this.activeShowImg,
							//消失遮罩
							this.popupVisible = !this.popupVisible
							//消失软键盘
							this.showTyper = 0,
							//清空pin码
							this.pinNumber = ''
							this.$http.post(Lovecar.Checkphonepin,{pin:nums},this.$store.state.getpin).then((res)=>{
							console.log(res)
							this.httpsky()
					})							
						}, 1000)
				}
			},
			fullValue (newVal, oldVal) {
				if(this.fullValue.length == 6) {
					setTimeout(() => {
						this.value = !this.value
						//pin码正确激活弧线
						this.curveState = !this.curveState
						//pin码正确激活空调图
						this.activeShowImg = !this.activeShowImg,
						//消失遮罩
						this.popupVisible = !this.popupVisible
						//消失软键盘
						this.showTyper = 0,
						//清空pin码
						this.fullValue = ''
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
	.mint-popup {
		border-radius: 0.1rem;
	}
	    
	/*天窗头部*/
	
	.skylight-header {
		padding: 1.6rem 0.64rem 0 0.68rem
	}
	/*天窗开关按钮*/
	
	.skylight-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/*天窗标志*/
	
	.skylight-ch {
		height: 0.31rem;
		margin-bottom: 0.17rem;
		line-height: 0.31rem;
		color: rgb(34, 34, 34);
		font-size: 0.32rem;
	}
	
	.skylight-en {
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
	/*天窗主体*/
	
	.skylight-wrap {
		height: 8.6rem;
		padding: 0.45rem 0.68rem;
	}
	
	.skylight-content {
		height: 4.6rem;
		width: 100%;
	}
	/*天窗宽度*/
	
	.temperature {
		align-self: flex-start;
		width: 0.8rem;
	}
	/*天窗图片*/
	
	.wind-blows {
		margin-right: 0.5rem;
		align-self: flex-end;
	}
	.wind-blows>img {
		width: 1.95rem;
		height: 2.16rem;
	}
	
	.window-change>div>img {
		width: 2.66rem;
		height: 1.89rem;
	}
	/*天窗宽度计数器*/
	
	.skylight-change {
	    display: flex;
	    justify-content: center;
	    flex-direction: column;
	    align-items: center;
	}
	
	.skylight-change>div>img {
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
	
	.skylight-change .wind-input {
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
	
	.pin-code>div>.pin-input {
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
	.pin-code>.pin {
	    display: flex;
    	align-items: center;
    	border: 1px solid #ccc;
	}
	.pin-code>.pin>input:not(:last-child) {
    	border-right: 1px solid #ccc;
	}
	.pin-code>.pin>input {
		width: 0.93rem;
    	height: 0.94rem;
    	text-align: center;
	    border: none;
    	outline: none;
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