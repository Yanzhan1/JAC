<template>
	<div class="wifi-link">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">WiFi直连</span>
			<span class="header-right"><router-link tag="img" :to="{name:'wifi设置',params:{userCategory:this.wifiValue,names:this.names,pwd:this.pwd}}" style="width: 0.36rem;height: 0.36rem;" :src="'./static/images/Lovecar/Set@2x.png'"></router-link></span>
		</header>
		<div style="height:0.88rem"></div>
		<mt-cell :title="title">
			<mt-switch  v-model="wifiValue" @change="turn"><span></span></mt-switch>
		</mt-cell>
		<div class="line"></div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					wifi名称:
				</span>
				<input disabled type="text" v-model="names" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					账户:
				</span>
				<input style="margin-left: 1rem;" disabled type="text" v-model="pwd" />
			</div>
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
						<input v-model="ownKeyBoard.first" type="text" maxlength="1" />
						<input v-model="ownKeyBoard.second" type="text" maxlength="1" />
						<input v-model="ownKeyBoard.third" type="text" maxlength="1" />
						<input v-model="ownKeyBoard.fourth" type="text" maxlength="1" />
						<input v-model="ownKeyBoard.fifth" type="text" maxlength="1" />
						<input v-model="ownKeyBoard.sixth" type="text" maxlength="1" />
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
	</div>
	<!--自定义软键盘End-->
	</div>
</template>

<script>
	export default {
		name: 'wifiLink',
		data () {
			return {
				//开关按钮状态
				wifiValue: false,
				//开关按钮title
				title: 'wifi开关',
				//名字输入框内容
				names: '',
				//密码输入框内容
				pwd: '',
				//移动端键盘值
				ownKeyBoard: {
					first: "",
					second: "",
					third: "",
					fourth: "",
					fifth: "",
					sixth: ""
				},
				//pin码弹出框控制变量
				popupVisible: false,
				//pin码值
				pinNumber: "",
				//自定义软键盘状态 0 消失 2 键盘开启
				showTyper: 0,
				//软键盘内容12位随机数组
				keyNums: [],
			}
		},
		methods: {
			turn () {
				if (this.wifiValue) {
					this.wifiValue = false
				} else {
					this.wifiValue = true
				}
				this.popupVisible = !this.popupVisible;
			},
			//点击遮罩或者'x'移除popup
			removeMask() {
				this.popupVisible = !this.popupVisible;
				this.showTyper = 0;
			},
			//产生随机数
			randomnum(min, max) {
				var num = Math.floor(Math.random() * (max - min) + min);
				return num;
			},
			//键盘点击事件，传入键盘本身的值
			input(item) {
				if(item == "关闭") {
					//判断是否点击了关闭按钮
					this.showTyper = 0;
					return;
				}
				if(item == "Del") {
					//判断是否点击了删除按钮
					this.pinNumber = this.pinNumber.slice(0, -1);
					return;
				}
				if(this.pinNumber.length < 6) {
					//判断位数，还未超出6位则可继续输入
					this.pinNumber = this.pinNumber + item;
				} else {}
			},
			//点击pin码验证框时，弹出自定义键盘
			onTypewriting() {
				this.showTyper = 2;
				this.produceArray();
			},
			//产生软键盘12位随机数组
			produceArray() {
				var that = this;
				var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
				var arr2 = [];
				for(var i = 0; i < 12; i++) {
					var randomnumber = that.randomnum(0, arr.length);
					if(i == 9) {
						arr2.push("关闭");
					} else if(i == 11) {
						arr2.push("Del");
					} else {
						arr2.push(arr[randomnumber]);
						arr.splice(randomnumber, 1);
					}
				}
				that.keyNums = arr2;
			},
			//执行判定
			inputs() {
				var _this = this;
				$(".pin input").on("input propertychange", function() {
					_this.inputFun($(this));
				});
				$(".pin input").on("keyup", function(e) {
					var ev = e;
					_this.keyupFun($(this), ev);
				});
			},
			//判断输入的密码还是否为数字
			inputFun(value) {
				var reg = new RegExp("^[0-9]*$");
				var val = value.val();
				if(!reg.test(val)) {
					value.val("");
				} else {
					value.next().focus();
				}
			},
			//监听backspace事件
			keyupFun(value, e) {
				var k = e.keyCode;
				var val = e.key; //"Backspace"
				if(k == 8) {
					//8是backspace的keyCode
					value.prev().focus();
				} else {
					return false;
				}
			},
		},
		mounted(){
			this.inputs();
			console.log(this.$route.params.userCategory)
			this.names=this.$route.params.wifiname
			this.pwd=this.$route.params.wifipwd
			if(this.$route.params.userCategory==1){
				this.value=true
			}else{
				this.value=false
			}
		},
		computed: {
			fullValue: {
				//拼接input输入框值,激活修改
				get() {
					return(
						this.ownKeyBoard.first +
						this.ownKeyBoard.second +
						this.ownKeyBoard.third +
						this.ownKeyBoard.fourth +
						this.ownKeyBoard.fifth +
						this.ownKeyBoard.sixth
					);
				},
				set(newVal) {
					this.ownKeyBoard.first = newVal;
					this.ownKeyBoard.second = newVal;
					this.ownKeyBoard.third = newVal;
					this.ownKeyBoard.fourth = newVal;
					this.ownKeyBoard.fifth = newVal;
					this.ownKeyBoard.sixth = newVal;
				}
			}
		},
		watch: {
			pinNumber(newVal, oldVal) {
				//				console.log(this.pinNumber.length)
				if(this.pinNumber.length == 6) {
					setTimeout(() => {
						var PIN = this.pinNumber;
						this.$http
							.post(
								Lovecar.Checkphonepin, {
									pin: PIN
								},
								this.$store.state.getpin
							)
							.then(res => {
								console.log(res.data.returnSuccess);
								res.data.returnSuccess ? (this.num = 1) : (this.num = 2);
							});
						this.wifiValue = !this.wifiValue;
						//消失遮罩
						(this.popupVisible = !this.popupVisible);
						//消失软键盘
						(this.showTyper = 0),
						//清空pin码
						(this.pinNumber = "");
//						this.httpair();
					}, 1000);
				}
			},
			fullValue(newVal, oldVal) {
				if(this.fullValue.length == 6) {
					setTimeout(() => {
						this.wifiValue = !this.wifiValue;
						//消失遮罩
						(this.popupVisible = !this.popupVisible);
						//消失软键盘
						(this.showTyper = 0);
						//清空pin码
						(this.fullValue = "");
					}, 1000);
				}
			}
		}
	}
</script>

<style scoped>
	/*flex*/
	.flex-center-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.flex-align-center{/*垂直居中*/
	  display: flex;
	  align-items: center;
	}
	/*公共样式*/
	.revisePinCommon {
		height: 1rem;
		border-bottom: 1px solid #EFEFEF;
	}
	
	input {
		outline: none;
		border: none;
	    background: none;
	    /*margin-left: 0.6rem;*/
	}
	/*灰色间隔*/
	.line {
		height: 0.1rem;
		background: #F1F1F1;
	}
	/*每个item*/
	.origin-pin>div {
		width: 90%;
		margin: 0 auto;
	}
	/*pin码提示框*/
	.mint-popup {
		border-radius: 0.1rem;
	}
	.pin-remain {
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
		height: 0.7rem;
		margin: 0.1rem 0.05rem 0;
		color: #333;
		text-align: center;
		font-size: 0.32rem;
		line-height: 0.7rem;
		background-color: #ccc;
		-webkit-border-radius: 0.1rem;
		-moz-border-radius: 0.1rem;
		border-radius: 0.1rem;
	}
	
	.typer li.typer-pro {
		width: 31%;
		padding: 0 0.15rem;
	}
	
	.typer li.typer-pro.is-closeType {
		width: 1.2rem;
		float: right;
	}
	
	.typer li.typer-num {
		width: 31%;
		/*padding: 0.8rem .1rem;*/
		background-image: -webkit-linear-gradient( 125deg, #147b96, #e6d205 25%, #147b96 50%, #e6d205 75%, #147b96);
		-webkit-text-fill-color: transparent;
		-webkit-background-clip: text;
		-webkit-background-size: 200% 100%;
		-webkit-animation: masked-animation 4s infinite linear;
	}
	
	.typer li.typer-num.is-A {
		margin-left: 0.31rem;
	}
	
	.typer li.typer-num.is-OK {
		width: 0.8rem;
		margin-left: 0.1rem;
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
		position: fixed;
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