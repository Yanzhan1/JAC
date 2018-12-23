<template>
  <div>
    <div class="backgroundimage"></div>
    <router-view />
    <!--轮询请求loading-->
    <loading-page ref="loadingPage" v-show="false"></loading-page>
    <!--全局loading-->
    <loading-page ref="loadingPageGlobal" v-show="false"></loading-page>
  </div>
</template>

<script>
  import LoadingPage from './publicmodel/LoadingPage.vue'
  export default {
    name: "Main",
    data() {
      return {
        loadingflag: false,
        loadingnum: 0,
        reg: /\/api\/(.*?)\//
      }
    },
    components: {
      LoadingPage
    },
    created() {
      this.$http.interceptors.request.use((config) => {
        const params = config.method == 'post' ? config.data : config.params
        const arr = config.url.match(this.reg)
        // 在发送请求之前做些什么
        if (config.url == Lovecar.OperationId) {
          if(this.loadingnum == 0){
            localshow()
          }
        }
        if (this.loadingnum == 0) {
          if (arr) {
            switch (arr[1]) {
              case 'dk-dm-portal-api': // 发现
                if (!(params.pageNo && params.pageNo > 1)) {
                  localshow()
                }
                break
              default:
                localshow()
            }
          } else {
            localshow()
          }
        }
        this.loadingnum++;
        if (config.url.indexOf('dk-dm-portal-api') == -1) {
          ModalHelper.afterOpen(); //解决遮罩层穿透
        }
        return config;
      }, (error) => {
        this.loadingnum=0;
        if (this.loadingnum == 0) {
          localhide()
        }
        localhide()
        return Promise.reject(error);
      });
      // 添加响应拦截器
      let _this = this;
      this.$http.interceptors.response.use((response) => {
        const data = response.data;
        var system = this.isIOSOrAndroid();
        switch (data.code) { //判断接口状态,403  token失效,重新登录,本地调试可注释掉,发布提交时必须解开
          case 403:
            if (system == 'Android' && window.js2android) {
              window.js2android.login() //安卓退出App
            } else if (system == "IOS" && window.webkit) {
              window.webkit.messageHandlers.logout403.postMessage({}); //IOS退出app
            }
            break;
        } 
                  this.loadingnum=0
        if (response.config.url != Lovecar.OperationId) {
          // this.loadingnum--;
          if (this.loadingnum == 0) {
            localhide()
            this.$forceUpdate();
          }
        } else {
          // localhide()
        }
        if (response.config.url.indexOf('dk-dm-portal-api') == -1) {
          ModalHelper.beforeClose() //解决遮罩层穿透
        }
        return response;
      }, (error) => {
        this.loadingnum=0;
        if (this.loadingnum == 0) {
          localhide()
        }
        localhide()
        return Promise.reject(error);
      });
    },
    methods: {
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
    },
		watch: {
			'$route' (to, from) {
//				alert(to.name)
				if(to.name == '智享首页') {
//					alert('滚动的距离: '+this.$store.state.changeScrollY)
					let recruitScrollY = this.$store.state.changeScrollY
//						alert(this.$store.state.changeScrollY)
//					window.scroll(0, recruitScrollY)
						this.scroll.scrollTo(0, recruitScrollY)
				}
			}
		}
  }

</script>

<style scoped>

</style>
