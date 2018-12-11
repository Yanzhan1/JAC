<template>
    <div>
        <mhead currentTitle="远程预热"></mhead>
        <div style="width:100%;height:.01rem;background:#f1f1f1"></div>
        <div class="box flex cocenter">
            <div class="boxtest">当前车辆预热状态</div>
            <div class="minbox flex cocenter">
                <div style="width:.12rem;height:.12rem;background:#999999;border-radius:50%;"></div>
                <div style="font-size:.24rem;color:rgba(102,102,102,1);margin-right:.3rem;margin-left:.1rem">无状态</div>
            </div>
        </div>
        <div class="sethot">预热时间设置</div>
        <div class="flex cocenter between nextbox">
            <span>预热开始时间</span>
            <div>
                <div>12:00</div>
                <img :src="'./../../../../static/images/next@2x.png'" alt="">
            </div>
        </div>
    </div>
</template>

<script>
import { Popup } from "mint-ui";
import { Picker } from "mint-ui";
import PublicHead from "../../publicmodel/PublicHead";
export default {
  data() {
    return {};
  },
  components: {
    mhead: PublicHead
  }
};
</script>

<style scoped>
.box {
  width: 6.9rem;
  height: 1.2rem;
  box-shadow: 0px 4px 24px 0px rgba(79, 79, 79, 0.12);
  border-radius: 0.08rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  justify-content: space-between;
}
.boxtest {
  font-size: 0.3rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  margin-left: 0.43rem;
}
.sethot{
    font-size:.32rem;
    font-family:'PingFang-SC-Medium';
    font-weight:500;
    color:rgba(34,34,34,1);
    margin-top: .69rem;
    margin-left: .46rem;
}
.nextbox{
    width: 6.9rem;
    height: 1rem;
    margin: .4rem auto;
    border-bottom:.01rem solid #F1F1F1;
}
.nextbox>div{
    display: flex;
    align-items: center;
    justify-content: center;
}
.nextbox>div>img{
    width: .22rem;
    height: .32rem;
}
.nextbox>div>div{
    padding: 0 .1rem;
}
</style>
