<template>
    <div class="my-setup">
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">远程授权</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <div class="autime flex column around">
            <div class="aut">授权时间</div>
            <div class="flex row cocenter flex-start">
                <div class="flex row cocenter btns">
                    <span style="font-size:.24rem;color:#888;margin-right:.1rem">起始时间</span>
                    <img src="../../../static/images/Lovecar/zhankai@3x.png" alt="" style="width:.18rem;height:.1rem">
                </div>
                <span class="line">---</span>
                <div class="flex row cocenter btns">
                    <span style="font-size:.24rem;color:#888;margin-right:.1rem">结束时间</span>
                    <img src="../../../static/images/Lovecar/zhankai@3x.png" alt="" style="width:.18rem;height:.1rem">
                </div>
            </div>
            <div class="aut auts">被授权者账号：</div>
            <div>
                <span style="font-size:.24rem;color:#888">请输入账号</span>
                <input maxlength="" type="text" class="ipt">
            </div>
        </div>
        <button class="bottom-btn">发送授权</button>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {};
  }
};
</script>

<style scoped>
.autime {
  margin-left: 0.3rem;
}
.aut {
  font-size: 0.3rem;
  color: #222;
  margin-top: 0.3rem;
  margin-bottom: 0.4rem;
}
.row {
  flex-direction: row;
}
.flex-start {
  justify-content: flex-start;
}
.btns {
  border: 1px solid #f1f1f1;
  border-radius: 0.1rem;
  width: 2rem;
  height: 0.5rem;
  justify-content: center;
}
.line {
  display: block;
  color: #f1f1f1;
  padding: 0 0.3rem;
}
.auts {
  margin-top: 0.7rem;
}
.ipt{
    border:none
}

</style>