<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">维保预约</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <ul style="padding:0 .33rem">
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">申请服务车型</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">瑞风M6</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">车辆VIN码</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">TcLjfafkdsjflkds</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">希望联系的服务商</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">上海马太科技汽车中心</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">选择服务时间</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222"></span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">可预约项目</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222"></span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
        </ul>
        <div style="padding:0 .33rem;margin-top:.4rem;">
            <span style="font-size:.27rem;color:#555">需求描述:</span>
            <textarea placeholder="输入文本..." class="texta" style="line-height: normal" maxlength="50"></textarea>
        </div>
        <ul style="padding:0 .33rem">
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">姓名</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">李涛</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">手机号</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">15021015604</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">电子邮箱</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">342285154@qq.com</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
        </ul>
        <span class="bottom-btn" style="background-color:#ccc;">立即预约</span>
    </div>
</template>
<script>
export default {};
</script>
<style scoped>
.li_st {
  height: 0.99rem;
  border-bottom: 0.01rem solid #f1f1f1;
}
.texta {
  height: 1.44rem;
  width: 100%;
  background-color: #f8f8f8;
  font-size: 0.28rem;
  color: #888888;
  margin: 0.4rem 0;
  border: none;
  border-radius: 0.16rem;
  padding: 0.2rem;
}
</style>


