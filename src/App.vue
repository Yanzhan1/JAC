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
      console.log(userInfo)
      if(userInfo && userInfo.userId){
        this.$store.dispatch('isLogin',true);
        this.$store.dispatch('userId',userInfo.userId);
        this.$store.dispatch('uuid',userInfo.uuid);
        alert("登录了！接收到:"+userInfo.userId+userInfo.mobile+"vuex:"+this.$store.state.isLogin+this.$store.state.userId)
      }else{
        this.$store.dispatch('isLogin',false);
        this.$store.dispatch('userId',null);
        this.$store.dispatch('uuid',null);
        alert("登出了！接收到:"+userInfo+"vuex:"+this.$store.state.isLogin+this.$store.state.userId)

      }
    },
  	getNo () { //调试使用的模拟no
  		this.$store.dispatch('NO', 'UBS2018072410503423882')
  	}
  },
  created(){
    window.isLogin = this.isLogin;
  },
  mounted () {
  	this.getNo()
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
