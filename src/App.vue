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
//      this.$store.dispatch('userInfo',null);
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
            //获取用户
            let params = {
                userNo: this.$store.state.userId
            }
            this.$http.post(Lovecar.TSP, params).then((res) => {
                // alert(res.data.data.tspId)
                // alert(JSON.stringify(res))
                if(res.data.msg=='success'){
                  var tsp = res.data.data
                  this.$store.dispatch('TSP', tsp)
                  params={
                    tspUserId:this.$store.state.tspId
                  }
                  // console.log(Lovecar.vehicle)
                  // console.log(this.$store.state.tspId)
                  // console.log(this.$store.state.getpin)

                  this.$http.post(Lovecar.vehicle,params,this.$store.state.getpin).then((res)=>{
                    console.log(res)
                  })
                }
                    // alert(JSON.parse(this.$store.state.getpin.headers.identityParam).userId)
                    // alert(res.data.data.tspId)
                    // JSON.parse(this.$store.state.getpin.headers.identityParam).userId=res.data.data.tspId		
                    // alert(JSON.parse(this.$store.state.getpin.headers.identityParam).userId)
                    // alert(2)
            })

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
