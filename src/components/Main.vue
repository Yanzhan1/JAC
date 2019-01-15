<template>
  <div>
    <div class="backgroundimage"></div>
    <router-view />
    <!--轮询请求loading-->
    <loading-page ref="loadingPage" v-show="$store.state.loadingflag"></loading-page>
    <!--全局loading-->
    <loading-page ref="loadingPageGlobal" v-show="loadingflag"></loading-page>
  </div>
</template>

<script>
import LoadingPage from "./publicmodel/LoadingPage.vue";
export default {
  name: "Main",
  data() {
    return {
      loadingflag: false,
      loadingnum: 0,
      reg: /\/api\/(.*?)\//,
      num: 0
    };
  },
  components: {
    LoadingPage
  },
  created() {
    this.$http.interceptors.request.use(
      config => {
        const params = config.method == "post" ? config.data : config.params;
        const arr = config.url.match(this.reg);
        // 在发送请求之前做些什么
        // if (config.url == Lovecar.OperationId) {
        //     localshow()
        // }
        if (this.loadingnum == 0) {
          switch (arr[1]) {
            case "dk-dm-portal-api": // 发现
              if (!(params.pageNo && params.pageNo > 1)) {
                localshow();
              }
              break;
            case "jac-car-control": //爱车
              localshow();
            default:
              localshow();
          }
        }
        this.loadingnum++;
        if (config.url.indexOf("dk-dm-portal-api") == -1) {
          ModalHelper.afterOpen(); //解决遮罩层穿透
        }
        return config;
      },
      error => {
        // this.loadingnum=0;
        this.loadingnum--;
        if (this.loadingnum == 0) {
          localhide();
        }
        // localhide()
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    let _this = this;
    this.$http.interceptors.response.use(
      response => {
        this.loadingnum--;
        const data = response.data;
        switch (data.code) { //判断接口状态,403  token失效,重新登录,本地调试可注释掉,发布提交时必须解开
          case 403:
            this.num++;
            if (this.$store.state.userId) {
              if (this.num == 1) {
                if (isMobile.iOS()) {
                  window.webkit.messageHandlers.logout403.postMessage("");
                } else if (isMobile.Android() && window.js2android) {
                  window.js2android.reLogin();
                }
              }
            } else {
              delete response.data;
              _this.toLogin();
            }
            break;
        }
        console.log(response.config.url);
        if (
          response.config.url != Lovecar.OperationId 
          // response.config.url != Lovecar.TSP &&
          // response.config.url != Lovecar.vehiclestatus &&
          // response.config.url != My.My_Bus &&
          // response.config.url != Lovecar.Support &&
          // response.config.url != Lovecar.Carquery
        ) {
          if (this.loadingnum == 0) {
            console.log("jinru");
            localhide();
            this.$forceUpdate();
          }
        } else {
          // localhide()
        }
        if (response.config.url.indexOf("dk-dm-portal-api") == -1) {
          ModalHelper.beforeClose(); //解决遮罩层穿透
        }
        return response;
      },
      error => {
        this.loadingnum--;
        // this.loadingnum=0;
        if (this.loadingnum == 0) {
          localhide();
        }
        // localhide()
        return Promise.reject(error);
      }
    );
  },
  methods: {}
};
</script>

<style scoped>
</style>
