<template>
    <div>
      <div class="backgroundimage"></div>
      <router-view/>
      <loading-page ref="loadingPage" v-show="$store.state.loadingflag"></loading-page>
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
		      if (config.url == 'http://test.jac.timanetwork.net/jvconnectedcar/vehicle/vehicle-async-results') {
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
		    this.$http.interceptors.response.use((response)=> {
//		    	console.log(response.config.url)
		    	if (response.config.url != 'http://test.jac.timanetwork.net/jvconnectedcar/vehicle/vehicle-async-results') {
		    		   this.loadingnum--;		    		   
				      	if(this.loadingnum == 0){
				        	this.loadingflag = false;
				        	this.$forceUpdate();
				        	this.$refs.loadingPage.closeLoading();
				     	} 
		    	}
	    		this.loadingnum--;	    		   
		      	if(this.loadingnum == 0){
		        	this.loadingflag = false;
		        	this.$forceUpdate();
		        	this.$refs.loadingPage.closeLoading();
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
		  }
    }
</script>

<style scoped>

</style>
