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
       	data () {
		    return {
		      loadingflag:false,
		      loadingnum: 0
		    }
	  	},
        components: {
		    LoadingPage
	  	},
	  	created(){
		    this.$http.interceptors.request.use((config)=> {
		      // 在发送请求之前做些什么
		      if (config.url == 'http://test.jac.timanetwork.net/api/jac-car-control/vehicle/vehicle-async-results'){
		      	this.$store.dispatch('LOADINGFLAG', true)
		      }
		      if(this.loadingnum == 0){
		        this.loadingflag = true;
		      }
		      this.loadingnum++;
		      return config;
		    }, (error)=> {
		      this.loadingnum--;
		      if(this.loadingnum == 0){
		        this.loadingflag = false;
		        this.$refs.loadingPageGlobal.closeLoading();
		      }
		      this.$store.dispatch('LOADINGFLAG', false)
		      this.$refs.loadingPage.closeLoading();
		      return Promise.reject(error);
		    });

		// 添加响应拦截器
        let _this = this;
		    this.$http.interceptors.response.use((response)=> {
//		    	console.log(response.config.url)
          _this.loadingnum--;
		      	if(_this.loadingnum == 0){
              _this.loadingflag = false;
              _this.$forceUpdate();
              _this.$refs.loadingPage.closeLoading();
		     	}
		      return response;
		    },(error)=> {
		       this.loadingnum--;
		      if(this.loadingnum == 0){
		        this.loadingflag = false;
		        this.$refs.loadingPageGlobal.closeLoading();
		      }
		      this.$store.dispatch('LOADINGFLAG', false)
		      this.$refs.loadingPage.closeLoading();
		      return Promise.reject(error);
				});
/*				//获取用户
				let params={
					userNo:this.$store.state.userId
				}
				this.$http.post('http://test.jac.timanetwork.net/api/jac-admin/admin/thirdPartyUserBaseInformation/searchThirdPartyUserBaseInformationOne',params).then((res)=>{
					console.log(res)
				})*/
		  }
    }
</script>

<style scoped>

</style>
