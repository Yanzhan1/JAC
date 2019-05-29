<template>
  <div>
    <div class="backgroundimage"></div>
    <router-view />
    <!--轮询请求loading-->
    <!-- <loading-page ref="loadingPage" v-show="$store.state.loadingflag"></loading-page> -->
    <!--全局loading-->
    <!-- <loading-page ref="loadingPageGlobal" v-show="loadingflag"></loading-page> -->
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
      // regg:/\/jacenergy\/(.*?)\//,
      num: 0,
      flag:true,
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
        if (this.loadingnum == 0) {
          if(arr){
            switch (arr[1]) {
              case "dk-dm-portal-api": // 发现
                if (!(params.pageNo && params.pageNo > 1)) {
                  localshow();
                }
                break;
              case "jac-car-control": //爱车
                localshow();
                break;
              default:
                localshow();
            }
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
        return Promise.reject(error);
      }
    );
    // 添加响应拦截器
    this.$http.interceptors.response.use(
      response => {

        let flag = true

        this.loadingnum--;
        const data = response.data;
        switch (data.code) { //判断接口状态,403  token失效,重新登录,本地调试可注释掉,发布提交时必须解开
          case 403:
            this.num++;
            if (this.$store.state.userId) {
              if (this.num == 1) {
                // this.$store.state.userId=null
                this.$store.state.code403=100
                if (isMobile.iOS()) {
                  window.webkit.messageHandlers.logout403.postMessage("");
                } else if (isMobile.Android() && window.js2android) {
                  window.js2android.reLogin();
                }
              }
            } else if(this.$store.state.code403!=100) {
                // delete response.data;
                  flag = false
                  this.toLogin();
            }
            break;
        }
        if (
          response.config.url != Lovecar.OperationId&&
          response.config.url != Newenergy.energyvehicleasyncresults &&
          response.config.url != Newenergy.energyvehiclePINvalidation&&
          response.config.url != Newenergy.energyremotevehiclecontrol&&
          response.config.url !=Newenergy.energyqueryvehiclecondition
        ) {
          if (this.loadingnum == 0) {
            localhide();
            this.$forceUpdate();
          }
        } else {

        }
        if (response.config.url.indexOf("dk-dm-portal-api") == -1) {
          ModalHelper.beforeClose(); //解决遮罩层穿透
        }
        if(flag){
          return response;
        }else {
          return Promise.reject(403);
        }
      },
      error => {
        this.loadingnum--;
        // this.loadingnum=0;
        if (this.loadingnum == 0) {
          localhide();
        }
        return Promise.reject(error);
      }
    );
  },
  methods: {}
};
</script>

<style scoped>
</style>
