<template>
    <div>
        <!--<header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">系统消息</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>-->
        <mhead currentTitle="系统消息" class="bgcolor"></mhead>
        <ul style="padding:0 .3rem">
            <li style="margin-top:.3rem" v-for="(item,index) in allsystem" :key="index">
                <p style="font-size:.22rem;color:#888;text-align:center">{{item.sendTime}}</p>
                  <div style="height:2.3rem;width:100%;background-color:#f1f1f1;margin-top:.2rem">
                      <p style="font-size:.32rem;color:#222;padding:.2rem;font-weight:700">{{item.title}}</p>
                      <div style="padding:0 .2rem">
                       <span style="display:block;font-size:.3rem;color:#555;text-indent:2em;">{{item.text}}</span>
                      </div>
                      
                 </div>
            </li>
            <!-- <div style="margin:.4rem"> 暂无任何消息</div> -->
        </ul>
    </div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead';
export default {
	components: {
	  mhead:PublicHead
  },
  data() {
    return {
        allsystem:[]
    };
  },
  methods:{
      systemmessagelist(){
          this.$http.post(IMFORMATION.systemmessagelist,{
              userId:this.$store.state.userId
          }).then((res)=>{
             this.allsystem= res.data.data
          })
      },
        //已读消息接口
    readmessage(){
      this.$http.post(IMFORMATION.systemmessageread,{
        userId:this.$store.state.userId
      }).then(res=>{
        console.log(res)
      })
    },
  },
  mounted(){
      this.systemmessagelist()
      this.readmessage()
  },
  components: {
	  mhead:PublicHead
    },
};
</script>

<style scoped>
.bgcolor{
    background: #fff;
}
</style>
