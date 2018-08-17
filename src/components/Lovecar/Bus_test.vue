<template>
  <div>
    <header class="header">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">车辆体检</span>
      <span class="header-right"></span>
    </header>
    <div style="height:.88rem"></div>
    <h2>诊断时间：06-29 17:33</h2>
    <ul class="ul_content">
      <li class="flex row between cocenter">
        <p class="li_quan">电子转向柱锁</p>
        <span class="right_pic actives"></span>
      </li>
      <li class="flex row between cocenter">
        <p class="li_quan">电子转向柱锁</p>
        <span class="right_pic"></span>
      </li>
      <li class="flex row between cocenter">
        <p class="li_quan">电子转向柱锁</p>
        <span class="right_pic"></span>
      </li>
      <li class="flex row between cocenter">
        <p class="li_quan">电子转向柱锁</p>
        <span class="right_pic"></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: "",
      sjc: ""
    };
  },
  created() {
    var self = this;
    var param = {
      vin: this.$store.state.vin
    };
    this.$http
      .post(Lovecar.BusTest, param, this.$store.state.getpin)
      .then(res => {
        if (res.data.returnSuccess) {
          this.getAsyReturn(res.data.operationId);
        } else {
          Toast({
            message: "token验证失败",
            position: "middle",
            duration: 3000
          });
        }
        //     self.$router.replace('/test_result');
      });
  },
  methods: {
    //重复调用的接口
    getAsyReturn(operationId) {
      this.sjc = new Date().getTime();
      this.time = setInterval(() => {
        this.$http
          .post(
            Lovecar.OperationId,
            { operationId: operationId },
            this.$store.state.getpin
          )
          .then(res => {
            var tS = new Date().getTime() - this.sjc; //时间戳 差
            var tSS = parseInt((tS / 1000) % 60); // 时间差
            if ((res.data.returnSuccess = true)) {
              if (res.data.status == "IN_PROGRESS") {
                //60s  后 清除定时器，不在发请求
                console.log(tSS);
                if (tSS >= 12) {
                  Toast({
                    message: "请求超时",
                    position: "middle",
                    duration: 3000
                  });
                  var self = this;
                  clearInterval(self.time);
                }
              } else if (res.data.status == "SUCCEED") {
                clearInterval(this.time);
              } else if (res.data.status == "FAILED") {
                Toast({
                  message: "指令下发成功，处理失败！",
                  position: "middle",
                  duration: 3000
                });
                clearInterval(this.time);
              }
            } else {
              Toast({
                message: "指令下发失败！",
                position: "middle",
                duration: 3000
              });
              clearInterval(this.time);
            }
          });
      }, 4000);
    }
  }
};
</script>
<style scoped>
h2 {
  text-align: center;
  font-size: 0.26rem;
  color: #555;
  margin-top: 0.4rem;
}
.li_quan {
  position: relative;
  font-size: 0.28rem;
  color: #222;
}
.row {
  flex-direction: row;
}
.ul_content {
  margin: 0.5rem 0.3rem 0 0.8rem;
}
.ul_content li {
  height: 0.87rem;
  border-bottom: 1px solid #f1f1f1;
}
.li_quan:before {
  position: absolute;
  background-color: #2099ff;
  display: block;
  height: 0.12rem;
  width: 0.12rem;
  border-radius: 50%;
  top: 0.1rem;
  left: -0.3rem;
  content: "";
}
.right_pic {
  background-image: url("../../../static/images/Lovecar/complete@3x.png");
  width: 0.4rem;
  height: 0.4rem;
  display: block;
  background-size: 100%;
}
.right_pic.actives {
  background-image: url("../../../static/images/Lovecar/yichang.png");
  width: 0.4rem;
  height: 0.34rem;
  display: block;
}
</style>

