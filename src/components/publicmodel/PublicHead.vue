<template>
	<div>		
		<header class="header MobileHeight">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="goback">
			<span class="header-title">{{currentTitle}}</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem" class="MobileHeight"></div>
	</div>
	
</template>

<script>
	export default {
		name: 'publicHead',
		data () {
			return {
				
			}
		},
		props: {
			currentTitle: { //页面头部标题
				type: String
			}
		},
		mounted () {
			let system = this.isIOSOrAndroid()
			if (system == 'Android') {
				$(".MobileHeight").css({"marginTop": this.$store.state.mobileStatusBar})	
			} else if (system == "IOS") {
				$(".MobileHeight").css({"marginTop": 0})
			}
					
		},
		methods: {
			goback () {
				this.$router.go(-1);
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

<style>
</style>