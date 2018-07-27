<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">评论</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <ul style="padding:0 .31rem;">
            <li style="border-bottom:.01rem solid #f1f1f1;margin-top:.3rem" v-for="(item,index) in 2" :key="index">
                <div class="flex row between cocenter">
                    <div class="flex row cocenter">
                        <div style="width:.72rem;height:.72rem;border-radius:50%;">
                            <img style="width:100%" src="../../../static/images/test/my/pic_touxiang@2x.png" alt="">
                        </div>
                        <span style="font-size:.31rem;color:#222;margin-left:.2rem">生如夏花</span>
                    </div>
                    <span style="font-size:.22rem;color:#888;">10分钟前</span>
                </div>
                <div style="font-size:.26rem;color:#555;margin-left:1.2rem">太赞了，下次记得叫上我一起！</div>
                <div style="height:1.32rem;background-color:#f1f1f1;margin:.3rem 0 .3rem 1.2rem;">
                    <div style="font-size:.22rem;color:#555;padding:.2rem"> 去留有吧孩子，去看看外面的世界，你会有异性不道德受罪哦</div>
                </div>
                <div class="revse">回复</div>
            </li>
            
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style scoped>
.revse {
  line-height: 0.48rem;
  width: 1rem;
  border-radius: 0.3rem;
  color: #49bbff;
  font-size: 0.24rem;
  border: 0.01rem solid #49bbff;
  text-align: center;
  margin-left: 1.2rem;
  margin-bottom: 0.4rem;
}
</style>
