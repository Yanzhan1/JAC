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
        window.location.hash.split('?')[1]
        if(window.location.hash.split('?')[1]=='traffic'){
            this.$router.push("/Lovecar/FlowQuery");
        }else if(window.location.hash.split('?')[1]=='diagnosis'){
            this.$router.push("/Bus_test");
        }
      }
    },
    created(){
      window.onloaded=this.onloaded

    }
}
</script>

<style>

</style>
