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
      }else{
        this.$store.dispatch('isLogin',false);
        this.$store.dispatch('userId',null);
        this.$store.dispatch('uuid',null);
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
