<template>
  	<div>
        <mhead currentTitle="选择车队长"></mhead>
        <mt-cell title="标题文字" is-link>
          <span style="margin-right:3.7rem">这里是元素</span>
        </mt-cell>
        <div class="adddriverbtn flex contentcenter " @click="create">
            <img src="/static/images/carteam/adddriver@2x.png" alt="">
            <div>创建的新的车队长</div>
        </div>
    </div>
</template>
<script>
import PublicHead from "./../../publicmodel/PublicHead";
import { Cell } from 'mint-ui';
export default {
  data() {
    return {
    };
  },
  components: {
    mhead: PublicHead
  },
  methods: {
    create(){
      this.$router.push({
        path:"/felltManagement/createteamleader",
      })
    },
  },
  mounted(){
  }
};
</script>

<style scoped>
.mint-cell-text{
  line-height: .98rem;
}
.adddriverbtn{
  border: .01rem dashed #49BBFF;
  width: 90%;
  margin:0 auto;
  margin-top: .4rem;
  height: 1rem;
  color: #49BBFF;
}
.adddriverbtn img{
  width: .24rem;
  height: .24rem;
  margin-right: .2rem;
}
</style>
