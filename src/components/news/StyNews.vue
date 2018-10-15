<template>
    <div>
        <mhead currentTitle="系统消息"></mhead>
        <div style="height:.48rem"></div>
        <ul style="padding:0 .3rem">
            <li style="margin-top:.3rem">
                <p style="font-size:.22rem;color:#888;text-align:center">2018 03-21 18:20</p>
                  <div style="height:2.3rem;width:100%;background-color:#f1f1f1;margin-top:.2rem">
                      <p style="font-size:.32rem;color:#222;padding:.2rem;font-weight:700">这是一条系统消息的标题</p>
                      <div style="padding:0 .2rem">
                       <span style="display:block;font-size:.3rem;color:#555;text-indent:2em;">挥一挥衣袖，不带走一片云彩</span>
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
  data() {
    return {};
  },
  components: {
	  mhead:PublicHead
    },
};
</script>

<style scoped>
</style>
