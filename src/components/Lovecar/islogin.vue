<template>
  <div>
    <header class="header">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">登录状态</span>
      <span class="header-right"></span>
    </header>
    <div style="height:.88rem"></div>
    <div style="text-align: center; width: 100%;"><img style="margin: 0 auto;width:2rem;display:block;margin-top:2.8rem" src="../../../static/images/Lovecar/qiche.png" alt=""></div>
    <div style="font-size:.3rem;color:#222;text-align:center;margin-top:1rem;">瑞丰R3 车机已登录</div>
    <div style="font-size:.28rem;color:#888;text-align:center;margin-top:.31rem">如果不是本人操作，可以立即退出</div>
    <button class="bottom-btn" @click="confirmRevise">退出车机登录</button>
  </div>
</template>
 <script>
import { MessageBox } from "mint-ui";

export default {
  data() {
    return {};
  },
  methods: {
    confirmRevise() {
      MessageBox.confirm("", {
        title: "提示",
        message: "您确定要退出机车登录？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      })
        .then(action => {
          if (action == "confirm") {
            var param = {
              vin:this.$store.state.vin,
              operation: "0"
            };
            this.$http.post(Lovecar.LoginOut,param,this.$store.state.tsppin).then(res => {
              if(res.status==200){
                 this.$router.go(-1)
              }
            });
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    }
  }
};
</script>
 <style scoped>
.count {
  height: 1.9rem;
  flex-direction: row;
  align-items: center;
}
.imgs {
  width: 1.2rem;
  height: 1.2rem;
  background-color: PINK;
  border-radius: 50%;
  margin-left: 0.3rem;
  margin-right: 0.34rem;
}
.authort_t {
  height: 1rem;
  justify-content: flex-start;
}
.authort {
  margin-left: 0.3rem;
}
.times {
  font-size: 0.28rem;
  color: #222;
}
.mid {
  padding: 0 0.4rem;
}
</style>
 
 
