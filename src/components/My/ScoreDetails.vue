<template>
    <div>
        <header class="header MobileHeight headers">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">会员积分</span>
            <span class="header-right"></span>
        </header>      
        <div style="width:100%;height:.88rem"></div>  
          <!-- <mhead currentTitle="会员积分"></mhead> -->
          <div class="flex column arounds">
              <span class="mycore">当前积分</span>
              <span class="score">{{integral}}</span>
              <div class="scoredeatails">积分明细</div>
          </div>
          <div style="width:100%;height:3.3rem"></div>
        <ul>
            <!-- <div class="scoredeatails">积分明细</div> -->
            <li class="flex  row between cont cocenter" v-for="(item,index) in this.details" :key="index">
                <div class="flex column xan">
                    <span style="color:#444;font-size:.28rem">{{item.changeDescription}}</span>
                    <span style="color:#888;font-size:.22rem">{{item.times}}</span>
                </div>
                <!-- <div style="color:#49BBFF;font-size:.36rem;margin-right:.3rem" ref="changecolor" id="changecolor">{{item.integral}}</div> -->
                <div style="font-size:.36rem;margin-right:.3rem"  class="changecolor">{{item.integral}}</div>
            </li>
            
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
        details:{},
        integral:this.$store.state.integral
    };
  },
  methods: {
    scoredetails() {
      var data = {
        // no:'AD022018090502444422707'
        no:this.$store.state.userId
      };
     this.$http.post(My.CreditDetail,data).then(res=>{
       if(res.data.code==0){
            this.details=res.data.data
            console.log(this.details)
           for(let i=0;i<this.details.length;i++){
             if(this.details[i].ruleId=='8'){
               this.$nextTick(()=>{
                  $(".changecolor").eq(i).css("color",'#ccc')
               })
               
             }else{
                this.$nextTick(()=>{
                  $(".changecolor").eq(i).css("color",'#49BBFF')
               })
             }
               this.details[i].times=operationTime.getTime( this.details[i].createTime, 2  )
           }
        }
    //     console.log(this.details)
      })
    }
  },
  mounted() {
      $(".MobileHeight").css({
            "borderTopWidth": this.$store.state.mobileStatusBar,
            "borderTopColor": "#fff",
          })
      this.scoredetails()
  }
};
</script>

<style scoped>
.headers{
  background: #fff;
  padding:0;
}
.header-left{
  margin-left: .3rem;
}
.arounds {
  text-align: center;
  position: fixed;
  width: 100%;
  background: #fff
}
.MobileHeight {  
		border-top-style: solid;
		box-sizing: content-box;
	}
.mycore {
  margin-top: 0.4rem;
  font-size: 0.28rem;
  color: #888;
}
.score {
  font-size: 0.6rem;
  color: #49bbff;
  margin-top: 0.3rem;
  padding-bottom: 0.1rem;
}
.scoredeatails {
  color: #222;
  font-size: 0.32rem;
  margin: 0.28rem;
}
.cont {
  border-bottom: 0.01rem solid #f1f1f1;
  height: 1.2rem;
  margin: 0 0.3rem 0 0.3rem;
}
.scoreY {
}
.xan {
  margin-left: 0.3rem;
}
</style>