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
//       alert("原生传进来的值： "+JSON.stringify(userInfo))
      if(userInfo && userInfo.no){
        this.$store.dispatch('isLogin',true);
        // 江淮用户系统的需要通过no字段作为用户的唯一标识，所以将no作为userId使用
        this.$store.dispatch('userId',userInfo.no);
        this.$store.dispatch('userInfo',userInfo);
        // alert(
        //   "store里面的值，" +
        //   "vin: "+ this.$store.state.vin +
        //   " userId: "+ this.$store.state.userId +
        //   " no: "+ this.$store.state.no +
        //   " token: "+ this.$store.state.token +
        //   " mobile: "+ this.$store.state.mobile
        // )
      }else{
        this.$store.dispatch('isLogin',false);
        this.$store.dispatch('userId',null);
        this.$store.dispatch('userInfo',null);
      }
      this.$http.defaults.headers.common['timaToken'] = this.$store.state.token;
      // alert("axios里面的token值： "+this.$http.defaults.headers.common['timaToken'])
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
