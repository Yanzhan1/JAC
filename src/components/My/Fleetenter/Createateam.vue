<template>
  	<div>
        <mhead currentTitle="创建车队"></mhead>
        <div class="title">输入车队名称和车队长信息来创建车队</div>
        <div class="flex cocenter box">
          <div>车队名:</div>
          <input type="text" placeholder="请输入车队名">
        </div>
    </div>
</template>
<script>
import PublicHead from "./../../publicmodel/PublicHead";
export default {
  data() {
    return {
    };
  },
  components: {
    mhead: PublicHead
  },
  methods: {
  },
  mounted(){
  }
};
</script>

<style scoped>
.title{
  width:90%;
  margin: 0 auto;
  line-height: .95rem;
  border-bottom: .01rem solid #eeeeee;
  font-size:.24rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(136,136,136,1);
}
.box{
  width: 90%;
  margin: 0 auto;
  height: .98rem;
  border-bottom: .01rem solid #eeeeee;
}
</style>
