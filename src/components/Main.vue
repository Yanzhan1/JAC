<template>
	<div>
		<div class="backgroundimage"></div>
		<router-view/>
		<!--轮询请求loading-->
		<loading-page ref="loadingPage" v-show="$store.state.loadingflag"></loading-page>
		<!--全局loading-->
		<loading-page ref="loadingPageGlobal" v-show="loadingflag"></loading-page>
	</div>
</template>

<script>
	import LoadingPage from './publicmodel/LoadingPage.vue'
	export default {
		name: "Main",
		data() {
			return {
				loadingflag: false,
				loadingnum: 0
			}
		},
		components: {
			LoadingPage
		},
		created() {
			this.$http.interceptors.request.use((config) => {
				// 在发送请求之前做些什么
				if(config.url == 'http://test.jac.timanetwork.net/api/jac-car-control/vehicle/vehicle-async-results') {
					this.$store.dispatch('LOADINGFLAG', true)
				}
				if(this.loadingnum == 0) {
					this.loadingflag = true;
				}
				this.loadingnum++;
				ModalHelper.afterOpen(); //解决遮罩层穿透
				return config;
			}, (error) => {
				this.loadingnum--;
				if(this.loadingnum == 0) {
					this.loadingflag = false;
				}
				this.$store.dispatch('LOADINGFLAG', false)
				return Promise.reject(error);
			});

			// 添加响应拦截器
			let _this = this;
			this.$http.interceptors.response.use((response) => {
				const data = response.data;
				var system = this.isIOSOrAndroid();
				/*switch (data.code) { //判断接口状态,403  token失效,重新登录
				 	case 403: 
				 		if (system == 'Android') {
				 			window.js2android.logout() //安卓退出App
				 		} else if (system == "IOS") {
				 			window.webkit.messageHandlers.logout.postMessage({}); //IOS退出app
				 		}
				 		break;
				}*/
				if (response.config.url != 'http://test.jac.timanetwork.net/api/jac-car-control/vehicle/vehicle-async-results') {	
					this.loadingnum--;  
                    if(this.loadingnum == 0){
                        this.loadingflag = false;
                        this.$forceUpdate();                                  
                    }
				} else {
					 this.loadingflag = false;
				}
				ModalHelper.beforeClose() //解决遮罩层穿透
				return response;
			}, (error) => {
				this.loadingnum--;
				if(this.loadingnum == 0) {
					this.loadingflag = false;
				}
				this.$store.dispatch('LOADINGFLAG', false)
				return Promise.reject(error);
			});
		},
		methods: {
			isIOSOrAndroid () {  //判断ios和安卓机型的方法
				var u = navigator.userAgent,
					app = navigator.appVersion;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid) {
					return "Android"
				} else if(isIOS) {
					return "IOS"
				}
			}
		}
	}
</script>

<style scoped>

</style>