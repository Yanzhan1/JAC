<template>
	<div class="tophead">
		<div class="nav">
			<img @click="navtip" src="../../../static/images/Wit/3x.png" alt="" style="width:.4rem;display:block">
			<span class="txt_m">&nbsp;&nbsp;&nbsp;&nbsp;瑞丰 R3</span>
			<span class="txt_r" @click="islogin()">已登录</span>
		</div>
		<div class="navs navs_h">
			<div class="navs_t">
				<span class="num">50</span>
				<span class="txt">剩余油量（%）</span>
			</div>
			<div class="navs_t">
				<span class="num">1333</span>
				<span class="txt">行驶里程（KM）</span>
			</div>
			<div class="navs_t">
				<span class="num">133</span>
				<span class="txt">续航里程（KM）</span>
			</div>
		</div>
		<div style="height:4.75rem;" class="content">
			<div class="content">
				<div class="left_bus1">
					<div class="left_bus" @click="fn(1)">
						<img v-if="activeshow==1" class="pic1" src="../../../static/images/Wit/taiya.png" alt="">
						<img v-else class="pic1" src="../../../static/images/Wit/taiya1.png" alt="">
						<span :class="activeshow==1?'active':'actives'" class="txt1">胎压</span>
					</div>
					<div class="left_bus" @click="fn(2)">
						<img v-if="activeshow==2" class="pic1" src="../../../static/images/Wit/chemen.png" alt="">
						<img v-else class="pic1" src="../../../static/images/Wit/chemen1.png" alt="">
						<span :class="activeshow==2?'active':'actives'" class="txt1">车门</span>
					</div>
					<div class="left_bus" @click="fn(3)">
						<img v-if="activeshow==3" class="pic1" src="../../../static/images/Wit/chechuang.png" alt="">
						<img v-else class="pic1" src="../../../static/images/Wit/chechuang1.png" alt="">
						<span :class="activeshow==3?'active':'actives'" class="txt1">车窗</span>
					</div>

				</div>
				<img v-if="activeshow==1" class="line_x" src="../../../static/images/Wit/line3@3x.png" alt="">
				<img v-else-if="activeshow==2" class="line_x" src="../../../static/images/Wit/line1@2x.png" alt="">
				<img v-else-if="activeshow==3" class="line_x" src="../../../static/images/Wit/line2@3x.png" alt="">
			</div>
			<div class="bus_l">
				<img src="../../../static/images/Wit/bus.png" alt="" class="bus_righgt">
				<span class='busl_r left_1'>2.6bar</span>
				<span class='busl_r  left_2'>2.6bar</span>
				<span class='busl_r right_1'>2.6bar</span>
				<span class='busl_r right_2'>2.6bar</span>
				<span class='busl_r top_1'>未关</span>
				<span class='busl_r bottom_1'>未关</span>
				<span class='busl_r middle_1'>已关</span>
			</div>
		</div>
		<div class="content lines">
			<div class="content_1" @click="enter">
				<img class="content_pic" src="../../../static/images/Wit/suoding.png" alt="">
				<span class="content_txt">锁定</span>
			</div>
			<div class="content_1">
				<img class="content_pic" src="../../../static/images/Wit/weimen.png" alt="">
				<span class="content_txt">尾门</span>
			</div>
			<div class="content_1">
				<img class="content_pic" src="../../../static/images/Wit/xihuo.png" alt="">
				<span class="content_txt">熄火</span>
			</div>
			<div class="content_1">
				<img class="content_pic" src="../../../static/images/Wit/xunche.png" alt="">
				<span class="content_txt">停车</span>
			</div>
		</div>
		<ul style="padding:0 .2rem">
			<router-link to="/lovecar/airConditionControl" tag="li" class="navs air">
				<div class="navs">
					<img class="picc" src="../../../static/images/Wit/ari.png" alt="">
					<span class="pic_txt">空调温度</span>
				</div>
				<img class="pic_r" src="../../../static/images/Wit/next.png" alt="">
			</router-link>
			<router-link to="/lovecar/adjustSeatTemper" tag="li" class="navs air">
				<div class="navs">
					<img class="picc" src="../../../static/images/Wit/zuoyi.png" alt="">
					<span class="pic_txt">座椅调节</span>
				</div>
				<img class="pic_r" src="../../../static/images/Wit/next.png" alt="">
			</router-link>
			<router-link to="/lovecar/windowControl" tag="li" class="navs air">
				<div class="navs">
					<img class="picc" src="../../../static/images/Wit/chechuang.png" alt="">
					<span class="pic_txt">车窗控制</span>
				</div>
				<img class="pic_r" src="../../../static/images/Wit/next.png" alt="">
			</router-link>
			<router-link to="/lovecar/skylightControl" tag="li" class="navs air">
				<div class="navs">
					<img class="picc" src="../../../static/images/Wit/tianchuang.png" alt="">
					<span class="pic_txt">天窗控制</span>
				</div>
				<img class="pic_r" src="../../../static/images/Wit/next.png" alt="">
			</router-link>
			<router-link to="/lovecar/airEvoluor" tag="li" class="navs air">
				<div class="navs">
					<img class="picc" src="../../../static/images/Wit/icon5@3x.png" alt="">
					<span class="pic_txt">空气净化器</span>
				</div>
				<img class="pic_r" src="../../../static/images/Wit/next.png" alt="">
			</router-link>
		</ul>
		<!-- 输入框 -->
		<div id="bg" class="bg" />
		<mt-popup v-model="popupVisible" position="middle">
			<div class="con">
				<div class="del">
					<img @click="cancel" src="../.././../static/images/Wit/delete@3x.png" alt="" style="width:.28rem">
					<div style="font-size:.36rem;color:#222">请输入PIN码</div>
					<span></span>
				</div>
				<div class="pin-code flex maincenter cocenter">
					<div id="pinCon">
						<input @click="onTypewriting" v-model="pinNumber" class="pin-input" maxlength="6" type="text" readonly/>
					</div>
				</div>
			</div>
		</mt-popup>
		<div class="typer" v-if="IsShow">
			<ul class="flex yy">
				<li class="typer-num" v-for="(item,index) in keyNums" :key="index" :class="{'is-A': item=='A','is-OK':item=='OK','is-Del':item=='Del'}" @click="input(item)">{{item}}</li>
			</ul>
		</div>
		<!-- 弹出层 左上 -->
		<div class="mask" v-if="MaskIsshow"></div>
		<img class="cancel" v-if="MaskIsshow" @click="delde" src="../.././../static/images/Lovecar/button9@2x.png" alt="" style="width:.28rem">
		<div v-if="MaskIsshow" class="mask_content">
			<ul class="tipcontent">
				<li @click="turnDing">
					<img src="../../../static/images/Lovecar/ding.png" alt="">
					<span>盯盯拍</span>
				</li>
				<router-link tag='li' to="/lovecar/revisePinCode">
					<img src="../../../static/images/Lovecar/xiupin.png" alt="">
					<span>修改PIN</span>
				</router-link>
				<router-link tag="li" to="/Bus_test">
					<img src="../../../static/images/Lovecar/chejian.png" alt="">
					<span>车辆体检</span>
				</router-link>
				<router-link tag='li' to="/Authorize">
					<img src="../../../static/images/Lovecar/yuancheng.png" alt="">
					<span>远程授权</span>
				</router-link>

				<li @click="turnPosition">
					<img src="../../../static/images/Lovecar/dingwei.png" alt="">
					<span>定位</span>
				</li>
				<router-link tag='li' to="/lovecar/flowQuery">
					<img src="../../../static/images/Lovecar/liuliang.png" alt="">
					<span>流量查询</span>
				</router-link>
				<router-link tag='li' to="/lovecar/fuelQuery">
					<img src="../../../static/images/Lovecar/ranyou.png" alt="">
					<span>燃油统计</span>
				</router-link>
				<li @click="turnPage">
					<img src="../../../static/images/Lovecar/dianzi.png" alt="">
					<span>电子围栏</span>
				</li>

				<router-link tag='li' to="/lovecar/wifiLink">
					<img src="../../../static/images/Lovecar/wifi.png" alt="">
					<span>wifi直连</span>
				</router-link>
				<router-link tag="li" to='/lovecar/intelligenceParking'>
					<img src="../../../static/images/Lovecar/zhiting.png" alt="">
					<span>智能停车</span>
				</router-link>
			</ul>
		</div>
	</div>
</template>

<script>
	export default {
		name: "lovecar",
		data() {
			return {
				activeshow: 1, //默认第一个高亮
				popupVisible: false,
				MaskIsshow: false, //黑色遮罩层
				num: 3,
				IsShow: false,
				keyNums: [],
				pinNumber: ""
			};
		},
		methods: {
			//点击高亮
			fn(type) {
				this.activeshow = type;
			},
			// 锁 尾 熄 停 事件
			enter() {
				this.popupVisible = true;
				// this.$http.post(Lovecar,{}).then((res)=>{
				// 		console.log(res)
				// })
			},
			//关闭PIN码弹框
			cancel() {
				this.IsShow = false;
				this.popupVisible = false;
			},
			//关闭顶部主菜单
			delde() {
				this.MaskIsshow = false;
			},
			navtip() {
				this.MaskIsshow = true;
			},
			islogin() {
				this.$router.push("/islogin");
			},
			//随机数
			randomnum(min, max) {
				var num = Math.floor(Math.random() * (max - min) + min);
				return num;
			},
			onTypewriting() {
				this.IsShow = true;
				this.produceArray();
			},
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
			//输入框事件
			input(item) {
				if(item == "关闭") {
					this.IsShow = false;
					return;
				}
				if(item == "Del") {
					this.pinNumber = this.pinNumber.slice(0, -1);
					return;
				}
				if(this.pinNumber.length < 6) {
					this.pinNumber = this.pinNumber + item;
				} else {}
			},
			//跳转电子围栏
			turnPage() {
				var u = navigator.userAgent,
					app = navigator.appVersion;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid) {
					window.js2android.goEfence()
				} else if(isIOS) {　

				}
			},
			//跳转盯盯拍
			turnDing() {
				var u = navigator.userAgent,
					app = navigator.appVersion;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid) {
					window.js2android.goDDPai()()
				} else if(isIOS) {　

				}
			},
			//跳转定位
			turnPosition () {
				var u = navigator.userAgent,
					app = navigator.appVersion;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid) {
					window.js2android.goCarLocation()()
				} else if(isIOS) {　

				}
			}
		},
		//检测输入框
		watch: {
			pinNumber(newVal, oldVal) {
				if(this.pinNumber.length == 6) {
					setTimeout(() => {
						var PIN = this.pinNumber;
						this.popupVisible = !this.popupVisible;
						(this.IsShow = false), (this.pinNumber = "");
						this.$http.post(Lovecar.Checkphonepin,{pin:PIN},getpin).then((res)=>{
							console.log(res)
						})
					}, 2000);
				}
			}
		},
		mounted() {
				
				this.$http.post(Lovecar.Carquery,{vins: ["LS5A3CJC9JF810003"]},getpin).then((res)=>{
					this.$http.post(Lovecar.OperationId,{operationId:res.data.operationId},getpin).then((res)=>{
						
					})
				
			})
		}
	};
</script>

<style scoped>
	.pin-code {
		height: 2rem;
		width: 100%;
	}
	
	.pin-code>div>input {
		display: block;
		width: 5.6rem;
		height: 0.94rem;
		text-indent: 0.4rem;
		letter-spacing: 0.77rem;
		border: none;
		outline: none;
		background: url(../../../static/images/Lovecar/border@2x.png) no-repeat center;
		background-size: 100%;
	}
	
	.typer {
		position: fixed;
		bottom: 0;
		background-color: #fff;
		height: 4.5rem;
		width: 100%;
		padding-top: 0.1rem;
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
	
	.typer li.typer-num {
		width: 31%;
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
	
	.yy {
		flex-wrap: wrap;
		justify-content: center;
		height: 100%;
	}
	/* 左上角弹框 */
	
	.mask {
		width: 100%;
		height: 100%;
		opacity: 0.5;
		background: #000;
		position: fixed;
		top: 0;
		left: 0;
		z-index: 999;
	}
	
	.mask_content {
		position: fixed;
		top: 25%;
		left: 50%;
		right: 50%;
		transform: translate3d(-50%, -50%, 0);
		background-color: #fff;
		height: 4.1rem;
		width: 90%;
		z-index: 10000;
		border-radius: 3px;
	}
	
	.cancel {
		position: fixed;
		z-index: 10000;
		top: 0.4rem;
		left: 0.3rem;
	}
	
	.tipcontent {
		display: flex;
		flex-direction: row;
		align-items: center;
		flex-wrap: wrap;
		box-sizing: border-box;
	}
	
	.tipcontent li {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		margin-top: 0.3rem;
	}
	
	.tipcontent li img {
		width: 0.4rem;
		display: block;
	}
	
	.tipcontent li span {
		color: #444;
		font-size: 0.22rem;
		margin-top: 0.23rem;
	}
	/*  */
	
	#wrap {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0.4rem 0;
	}
	
	#wrap input[type="text"] {
		width: 20%;
		height: 0.7rem;
		float: left;
		text-align: center;
	}
	
	.one {
		display: flex;
		flex-direction: row;
		align-items: center;
		padding: 0.4rem 0;
	}
	
	.one input {
		width: 20%;
		height: 0.7rem;
	}
	
	input:focus {
		outline: none;
	}
	
	.con {
		width: 6rem;
		height: 3rem;
		padding: 0.2rem 0.4rem;
	}
	
	.del {
		display: flex;
		flex-direction: row;
		align-items: center;
		background-color: #fff;
		justify-content: space-between;
		border-bottom: 1px solid #f1f1f1;
		height: 0.88rem;
	}
	
	.sure {
		margin-bottom: 0.16rem;
		color: #555;
	}
	
	.active {
		color: #49bbff;
	}
	
	.actives {
		color: #ccc !important;
	}
	
	.bus_l {
		position: relative;
	}
	
	.busl_r {
		position: absolute;
		font-size: 0.25rem;
		color: #49bbff;
	}
	
	.left_1 {
		left: -0.6rem;
		top: 1.5rem;
	}
	
	.left_2 {
		left: -0.6rem;
		top: 3rem;
	}
	
	.right_1 {
		right: 1.3rem;
		top: 1.5rem;
	}
	
	.right_2 {
		right: 1.3rem;
		top: 3rem;
	}
	
	.top_1 {
		top: 0.8rem;
		left: 0.6rem;
		color: #fc3b46;
		font-size: 0.24rem;
	}
	
	.bottom_1 {
		bottom: 1.1rem;
		left: 0.6rem;
		color: #fc3b46;
		font-size: 0.24rem;
	}
	
	.middle_1 {
		bottom: 2.5rem;
		left: 0.6rem;
		color: #49bbff;
		font-size: 0.24rem;
	}
	
	.tophead {
		height: 2.9rem;
		width: 100%;
		background-image: url("../../../static/images/Lovecar/bg.png");
		display: block;
		background-size: content;
	}
	
	.nav {
		display: flex;
		flex-direction: row;
		align-items: center;
		height: 0.88rem;
		justify-content: space-between;
		padding: 0.5rem 0.28rem;
	}
	
	.left_bus {
		display: flex;
		flex-direction: column;
	}
	
	.content_pic {
		width: 0.28rem;
		height: 0.34rem;
	}
	
	.lines {
		border-bottom: 1px solid #f1f1f1;
	}
	
	.left_bus1 {
		display: flex;
		flex-direction: column;
		height: 4.75rem;
		justify-content: space-around;
		align-items: center;
		padding-right: 0.6rem;
		padding-left: 0.2rem;
	}
	
	.txt_m {
		font-size: 0.34rem;
		color: #fff;
	}
	
	.content_txt {
		color: #444;
		font-size: 0.22rem;
		margin-top: 0.12rem;
	}
	
	.txt_r {
		font-size: 0.25rem;
		color: #fff;
	}
	
	.bus_righgt {
		width: 1.99rem;
		height: 4.24rem;
		margin-right: 1.83rem;
	}
	
	.left_bus .pic1 {
		width: 0.4rem;
		height: 0.4rem;
	}
	
	.left_bus .txt1 {
		font-size: 0.26rem;
		margin-top: 0.17rem;
	}
	
	.navs {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
		align-items: center;
	}
	
	.content {
		display: flex;
		flex-direction: row;
		justify-content: space-around;
	}
	
	.content_1 {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0.31rem 0;
	}
	
	.navs_h {
		height: 2rem;
	}
	
	.navs_t {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	
	.num {
		color: #fff;
		font-size: 0.28rem;
	}
	
	.txt {
		color: #fff;
		font-size: 0.23rem;
		margin-top: 0.18rem;
	}
	
	.air {
		height: 1.2rem;
		border-bottom: 1px solid #f1f1f1;
		justify-content: space-between;
	}
	
	.picc {
		width: 0.38rem;
		display: block;
		margin-left: 0.65rem;
		margin-right: 0.51rem;
	}
	
	.pic_r {
		width: 0.3rem;
		display: block;
		margin-right: 0.4rem;
	}
	
	.pic_txt {
		font-size: 0.28rem;
		color: #444;
	}
	
	.line_x {
		width: 0.17rem;
		padding-top: 0.4rem;
	}
	
	#can {
		position: fixed;
		left: 50%;
		top: 50%;
		transform: translate(-50%, -50%);
		z-index: 9999999;
	}
</style>