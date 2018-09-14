<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">系统消息</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <ul style="padding:0 .3rem">
            <!-- <li style="margin-top:.3rem">
                <p style="font-size:.22rem;color:#888;text-align:center">2018 03-21 18:20</p>
                  <div style="height:2.3rem;width:100%;background-color:#f1f1f1;margin-top:.2rem">
                      <p style="font-size:.32rem;color:#222;padding:.2rem;font-weight:700">这是一条系统消息的标题</p>
                      <div style="padding:0 .2rem">
                       <span style="font-size:.3rem;color:#555;">这是一条付款了多少积分离开系统消仿佛看到快乐fk梵蒂冈梵蒂冈梵蒂冈g</span>
                      </div>
                      
                 </div>
            </li>
            <li style="margin-top:.3rem">
                <p style="font-size:.22rem;color:#888;text-align:center">2018 03-21 18:20</p>
                  <div style="height:2.3rem;width:100%;background-color:#f1f1f1;margin-top:.2rem">
                      <p style="font-size:.32rem;color:#222;padding:.2rem;font-weight:700">这是一条系统消息的标题</p>
                      <div style="padding:0 .2rem">
                       <span style="font-size:.3rem;color:#555;">这是一条付款了多少积分离开系统消仿佛看到快乐fk梵蒂冈梵蒂冈梵蒂冈g</span>
                      </div>
                      
                 </div>
            </li> -->
            <div  style="margin:.4rem"> 暂无任何消息</div>
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
</style>
