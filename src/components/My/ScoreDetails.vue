<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">会员积分</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <div class="flex column arounds">
            <span class="mycore">我的积分</span>
            <span class="score">180</span>
        </div>
        <ul>
            <div class="scoredeatails">积分明细</div>
            <li class="flex  row between cont cocenter">
                <div class="flex column xan">
                    <span style="color:#444;font-size:.28rem">每日签到</span>
                    <span style="color:#888;font-size:.22rem">2018-2-12</span>
                </div>
                <div style="color:#49BBFF;font-size:.36rem;margin-right:.3rem">+20</div>
            </li>
            <li class="flex  row between cont cocenter">
                <div class="flex column xan">
                    <span style="color:#444;font-size:.28rem">每日签到</span>
                    <span style="color:#888;font-size:.22rem">2018-2-12</span>
                </div>
                <div style="color:#49BBFF;font-size:.36rem;margin-right:.3rem">+20</div>
            </li>
            <li class="flex  row between cont cocenter">
                <div class="flex column xan">
                    <span style="color:#444;font-size:.28rem">每日签到</span>
                    <span style="color:#888;font-size:.22rem">2018-2-12</span>
                </div>
                <div style="color:#49BBFF;font-size:.36rem;margin-right:.3rem">+20</div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  methods: {
    scoredetails() {
      var data = {
        ruleStr: "SIGN_IN",
        serviceTypeStr: "SERVICE_FIXED",
        typeStr: "TYPE_RETAIN",
        no: this.$store.state.userid
      };
      this.$http.post(My.CreditDetail,data).then(res=>{

      })
    }
  },
  created() {
      this.scoredetails()
  }
};
</script>

<style scoped>
.arounds {
  text-align: center;
}
.mycore {
  margin-top: 0.4rem;
  font-size: 0.28rem;
  color: #888;
}
.score {
  font-size: 0.6rem;
  color: #49bbff;
  margin-top: 0.3rem;
  border-bottom: 0.1rem solid #f1f1f1;
  padding-bottom: 0.1rem;
}
.scoredeatails {
  color: #222;
  font-size: 0.32rem;
  margin: 0.28rem;
}
.cont {
  border-bottom: 0.01rem solid #f1f1f1;
  height: 1.2rem;
  margin: 0 0.3rem 0 0.3rem;
}
.scoreY {
}
.xan {
  margin-left: 0.3rem;
}
</style>