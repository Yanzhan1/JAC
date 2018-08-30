<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
  	 return{

     }
  },
  methods: {
    isLogin(userInfo){
      if(userInfo && userInfo.no){
        this.$store.dispatch('isLogin',true);
        // 江淮用户系统的需要通过no字段作为用户的唯一标识，所以将no作为userId使用
        this.$store.dispatch('userId',userInfo.no);
        this.$store.dispatch('userInfo',userInfo);
      }else{
      	
        this.$store.dispatch('isLogin',false);
        this.$store.dispatch('userId',null);
        this.$store.dispatch('userInfo',null);
      }
//    alert('放到vuex中的token：'+this.$store.state.token)
      this.$http.defaults.headers.common['timaToken'] =  this.$store.state.token
//    console.log("axios里面的token值： "+this.$http.defaults.headers.timaToken)
    }
  },
  created(){
    window.isLogin = this.isLogin;
  },
  mounted () {
  	// this.getNo()
  }
}
</script>
<style>
.picker-item{
 color:#ccc
}
.picker-item.picker-selected{
    color:#222
}
</style>
