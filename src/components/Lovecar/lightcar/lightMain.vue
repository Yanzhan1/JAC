<template>
      <div>
      </div>
</template>

<script>
export default {
    data(){
      return{

      }
    },
    methods:{
      onloaded(){
        if(window.location.hash.split('?')[1]=='traffic'){
            this.$router.push({
              path:"/Lovecar/FlowQuery",
              query:{
                id:'traffic'
              }
            });
        }else if(window.location.hash.split('?')[1]=='diagnosis'){
            this.$router.push({
              path:"/Bus_test",
              query:{
                id:'diagnosis'
              }
            });
        }else if(window.location.hash.split('?')[1]=='tabbus'){
            this.$router.push({
              path:"/myindex/myBus",
              query:{
                id:'tabbus'
              }
            });
        }
      }
    },
    computed:{
        no(){
          return this.$store.state.token
        }
    },
    watch:{
        no(newVal,oldVal){
          console.log(newVal,oldVal)
          if(newVal){
            console.log('jinru')
            this.onloaded()
          }
        }
    },
    mounted(){
      if(this.$store.state.token){
        this.onloaded()
      }
    }
}
</script>

<style>

</style>
