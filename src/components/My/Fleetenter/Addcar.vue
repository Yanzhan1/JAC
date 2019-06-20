<template>
  	<div>
        <mhead currentTitle="添加车辆"></mhead>
        <div class="flex cocenter between list" v-for="(item,index) in 5" :key="index">
          <div class="left">
            <div class="plate">宝马xx</div>
            <div class="vin">VIN:1253214321</div>
          </div>
          <div class="middle">浙AAA</div>
           <label class="chooseimages" :class="index==currentIndex?'active':''" @click="choose(index)"></label>
        </div>
        <div class="sure" @click="sure">确定</div>
    </div>
</template>
<script>
import PublicHead from "./../../publicmodel/PublicHead";
export default {
  data() {
    return {
      currentIndex:-1
    };
  },
  components: {
    mhead: PublicHead
  },
  methods: {
    choose(val){
      console.log(val)
      this.currentIndex=val
    },
    sure(){
      alert('提交')
    }
  },
  mounted(){
  }
};
</script>

<style scoped>
.list{
  height: 1.1rem;
  border-bottom: .01rem solid #eeeeee;
}
.list .left{
  margin-left: .3rem;
}
.list .left .plate{
  font-size:.28rem;
  font-family:PingFang-SC-Bold;
  font-weight:bold;
  color:rgba(73,187,255,1);
}
.list .left .vin{
  font-size:.22rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.list .middle{
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(85,85,85,1);
  margin-left: 1.5rem;
  margin-top: -.2rem;
}
.list .chooseimages {
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background-image: url("/static/images/Lovecar/loseWindow.png");
  border-radius: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  padding: 0.2rem;
  margin-right: .3rem;
}
.list .active {
  background-image: url("/static/images/Lovecar/window2@2x.png");
  width: 0.44rem;
  height: 0.44rem;
  background-size: 100%;
  background-repeat: no-repeat;
}
.sure{
  position: fixed;
  bottom: 0;
  width: 100%;
  line-height: .98rem;
  text-align: center;
  background: #49BBFF;
  color: #ffffff;
}
</style>
