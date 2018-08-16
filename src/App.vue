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
        this.$store.dispatch('userInfo',userInfo);
        alert(
          "vin: "+ this.$store.state.vin +
          " userId: "+ this.$store.state.userId +
          " no: "+ this.$store.state.no +
          " token: "+ this.$store.state.token +
          " mobile: "+ this.$store.state.mobile
        )
      }else{
        this.$store.dispatch('isLogin',false);
        this.$store.dispatch('userId',null);
        this.$store.dispatch('userInfo',null);
      }
      this.$http.defaults.headers.common['token'] = this.$store.state.token;
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
