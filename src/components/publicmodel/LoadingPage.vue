<template>
  <div class="loadingPage flex-center">
    <div class="flex-center loadingBackground">
      <img  id="img" src="../../../static/images/Lovecar/loading.gif">
      <p style="color: #FFFFFF;">加载数据中...</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: [],
    data() {
      return {
        timer:"",
      };
    },
    watch: {

    },
    created(){

    },
    methods:{
      closeLoading(){
//      clearInterval(this.timer);
      }
    },
    mounted:function () {
      this.$nextTick(function () {
//      let img=document.getElementById('img');
//      var  current=0;
//      this.timer=setInterval(()=>{
//        current = (current+8)%360;
//        img.style.transform = 'rotate('+current+'deg)'
//      },50)
      });
    },
  };
</script>

<style>
  /*无数据*/
  .loadingPage{
    position: fixed;
    top: 0;
    left: 0;
    z-index: 999;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.5);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loadingBackground{
  	display: flex;
  	flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 1.87rem;
    height: 1.87rem;
    color: #FFFFFF;
    border-radius: 0.1rem;
  }
  .loadingBackground>img{
    width: 1.44rem !important;
    height: 1.44rem !important;
    margin-bottom: 0.1rem;
    /*animation: rotate 1.5s linear  infinite*/
  }
  @-webkit-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-ms-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-o-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
