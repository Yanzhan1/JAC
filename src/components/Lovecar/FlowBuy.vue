<template>
	<div class="flow-buy" :style="$statusBarHeightObj">
		<header class="header MobileHeight" style="padding:0 .4rem">
			<div class="header-left" @click="$router.go(-1)">
				<img :src="'./static/images/back@2x.png'" style="width: 0.4rem;height: 0.4rem;">
			</div>
			<span class="header-title">流量购买</span>
			<router-link tag="div" class="header-right" to="/myorder">
				购买记录
			</router-link>
		</header>
		<div style="height:0.88rem" class="MobileHeight"></div>
		<div class="wrapper">
				<router-link tag="div" class="content" id="content" v-for="(item,index) in flowData" :key="index" :to="{path:'/lovecar/placeOrder',query:{flow: item}}">
					<div class="flow-info" ref="flow">
						<div class="flow-content">
							<h6>{{item.packageName}}</h6>
							<div>
								<span class="flow-num">{{item.size}}</span>
								<span class="flow-zhao">MB</span>
							</div>
							<p>￥{{item.prize}}元</p>
						</div>
					</div>
				</router-link>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'FlowBuy',
		data () {
			return {
				flowData:[], //流量类型
				lastIndex: ''
			}
		},
		mounted() {
			let system = this.isIOSOrAndroid()
			if (system == 'Android') {
				$(".MobileHeight").css({"marginTop": this.$store.state.mobileStatusBar})	
			} else if (system == "IOS") {
				$(".MobileHeight").css({"marginTop": 0})
			}
			this.$http.post(Lovecar.FlowBuy, {}, this.$store.state.tsppin).then((res) => { //获取所有流量类型
				const data = res.data
				if (data.returnSuccess) {
					var count = [];
					this.flowData = data.data;
					this.$nextTick(()=>{
						var info = $(".flow-info");
						var mess = $(".content");
//						alert(mess.length)
						var len = info.length;
						for(let i = 0 ;i <= len; i++){
							if(i%2){
								count.push(i)  //记录循环的奇数
								info.eq(i).css("borderRight","none");
							}
						}
						if(len%2){ //最后一行是奇数,即一个
//							mess.eq(len).css("borderBottom","none");
							mess.eq(len-1).css("borderBottom","none");
						}else{ //最后一行是偶数,两个
							
							mess.eq(len).css("borderBottom","none");
							mess.eq(len-1).css("borderBottom","none");
						}
//						this.lastIndex = count.pop()
////						alert(this.lastIndex)
//						mess.eq(this.lastIndex-1).css("borderBottom","none")
					})
					
				}
			})
		},
		methods: {
			goback() {
				this.$router.go(-1)
			},
			isIOSOrAndroid() { //判断ios和安卓机型的方法
		        var u = navigator.userAgent,
		          app = navigator.appVersion;
		        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
		        var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
		        if (isAndroid) {
		          return "Android"
		        } else if (isIOS) {
		          return "IOS"
		        }
	      }
		}
	}
</script>

<style scoped>
	/*头部*/
	.header{
    display: flex;
    width: 100%;
    height: 0.88rem;
  }
  .header-left{
    display: flex;
    align-items: center;
    flex: 1;
    height: 0.88rem;
    line-height: 0.88rem;
  }
  .header-title{
    display: inline-block;
    flex: 1;
    text-align: center;
  }
  .header-right{
    flex: 1;
    text-align: right;
    font-size: .28rem;
    height: .88rem !important;
    line-height: .88rem;
    color: #444444;
  }
  /*整体*/
  .wrapper {
  	display: flex;
  	flex-wrap: wrap;
  	padding: .2rem .4rem;
  }
  .wrapper>#content {
  	width: 50%;
  	border-bottom: .01rem solid #ccc;
  	border-right: .01rem solid #FFFFFF;
  	box-sizing: border-box;
  }
  .wrapper>#content:nth-of-type(2n) {
  		border-right: .05rem solid #FFFFFF !important;
  }
  .flow-info {
    height: 85%;
    border-right: .01rem solid #ccc;
    margin-top: .2rem;
    box-sizing: border-box;
  }
  .flow-info:nth-of-type(2n+1) {
  	/*border-right: none;*/
  }
  .flow-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 100%;
    padding-bottom: .2rem;
  }
  .flow-content>h6 {
  	margin-bottom: .8rem;
  	color: #666666;
  	font-size: .28rem;
  }
  .flow-content>div {
  	margin-bottom: .7rem;
  }
  /*渐变颜色数字*/
  .flow-content .flow-num {
  	font-size: .6rem;
  	background: linear-gradient(180deg, #2099FF, #79BFF9, #0F46F9);
  	-webkit-background-clip: text;
    color: transparent;
  }
  .flow-content .flow-zhao {
  	font-size: .34rem;
  	background: linear-gradient(180deg, #2099FF, #79BFF9, #0F46F9);
  	-webkit-background-clip: text;
    color: transparent;
  }
  /*价格*/
  .flow-content p {
  	font-size: .3rem;
  	color: #222222;
  }
</style>