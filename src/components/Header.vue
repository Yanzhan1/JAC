<template>
  <div>
    <div>
      <div class="myheader" style="height: auto;" :style="$statusBarHeightObj">
        <div>
          <img src="../../static/images/discover/shaixuan.png" @click="open" style="width: 0.4rem;margin-bottom: 0;" />
        </div>
        <div style="" class="head-tab" :class="{ recommand: isRecommand }" @click.stop.prevent="goIsRecommand">
          <span>推荐</span>
        </div>
        <div style="" class="head-tab" :class="{ information: isInformation }" @click.stop.prevent="goInformation">
          <span class="size_36">资讯</span>
        </div>
        <div style="" class="head-tab" :class="{ allActivity: isAllActivity }" @click.stop.prevent="goAllActivity">
          <span>活动</span>
        </div>
        <div style="" class="head-tab" :class="{ now: isNow }" @click.stop.prevent="goIsNow">
          <span>社区</span>
        </div>
        <div style="position: relative;">
          <div style="position: absolute;top: 0;left: 0;z-index: 1;width: 100%;height: 100%;" @click="publish"></div>
          <img src="../../static/images/discover/camera.png" style="width: 0.4rem;margin-bottom: 0;" id='id_publish' />
        </div>
        <mt-popup style="width:80%;border-radius:4px;" v-model="popup" position="center">
          <div style="width:100%;text-align:center;box-sizing:border-box;font-size:.36rem;color:#555555;">
            切换频道
          </div>
          <p style="height:.02rem;background:#F1F1F1;width:100%;"></p>
          <div>
            <div style="margin-left:10%;">
              <input type="radio" id="picked" v-model="picked">
              <label for="picked">全部</label>
            </div>
            <div v-for="(item,index) in labels" style="margin-left:10%;width:40%;display:inline-block">
              <input type="radio" :id="'picked_'+item.labelId" :value="item.labelId" v-model="picked">
              <label :for="'picked_'+item.labelId">{{item.labelName}}</label>
            </div>
          </div>
          <div style="width:100%;display:flex;text-align:center;">
            <p style="felx:1;width:100%;font-size:.32rem;color:#888888;" @click="cancle">取消</p>
            <p style="felx:1;width:100%;font-size:.32rem;color:#49BBFF;" @click="confirm">确定</p>
          </div>
        </mt-popup>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: this.$store.state.userId,
        isRecommand: true,
        isInformation: true,
        isAllActivity: true,
        isNow: true,
        isQuestion: true,
        labels: [],
        picked: this.$store.state.selectLabelState ? this.$store.state.selectLabelState[0] : null,
        popup: false,
        labelState: 11 //标签默认值为11
      }
    },
    components: {
      /*Mine*/
    },
    computed: {},
    methods: {
      popupVisibleChange: function () {
        this.$refs.mine.popupVisibleChange()
      },
      goIsRecommand: function () {
        this.$router.push('/recommend')
        this.isRecommand = true
        this.isInformation = false
        this.isAllActivity = false
        this.isNow = false
        this.isQuestion = false
      },
      goInformation: function () {
        this.$router.push('/information')
        this.isInformation = true
        this.isRecommand = false
        this.isAllActivity = false
        this.isNow = false
        this.isQuestion = false
      },
      goAllActivity: function () {
        this.$router.push("/activity")
        this.isAllActivity = true
        this.isRecommand = false
        this.isInformation = false
        this.isNow = false
        this.isQuestion = false
      },
      goIsNow: function () {
        this.$router.push("/now")
        this.isNow = true
        this.isRecommand = false
        this.isInformation = false
        this.isAllActivity = false
        this.isQuestion = false
      },
      goQuestion: function () {
        this.isNow = false
        this.isRecommand = false
        this.isInformation = false
        this.isAllActivity = false
        this.isQuestion = true
      },
      //发布心情
      publish: function () {
        // this.$router.push({path:"/now/addPic"})
        if (isMobile.iOS()) {
          let uuid = this.$store.state.uuid;
          let params = {
            uuid
          }
          window.webkit.messageHandlers.send.postMessage(params);
        } else if (isMobile.Android()) {
          js2android.send("社区", this.$store.state.uuid, null);
        }
      },
      open: function () {
        this.popup = true
      },
      confirm: function () {
        console.log("this.picked", this.picked)
        this.popup = false
        if (this.picked) {
          this.$store.dispatch('selectLabelState', [this.picked]);
        } else {
          this.$store.dispatch('selectLabelState', null);
        }
      },
      cancle: function () {
        this.popup = false
      },
      // 获取初始化标签列表
      getLabels: function () {
        let _this = this
        this.$http.post(DISCOVERMESSAGE.getLabels, {
          labelState: this.labelState
        }).then(function (res) {
          if (res.data.status) {
            const [zero, one, two, three, four, fives] = res.data.data
            const arr = [one, three, zero, fives, two, four]

            _this.labels = arr
          }
        });
      },
    },
    computed: {
      loginState() {
        return this.$store.state.islogin
      }
    },
    watch: {
      loginState(loginState) {
        if (loginState) {
          this.getLabels()
        }
      }
    },
    mounted: function () {
      this.isInformation = false
      this.isAllActivity = false
      this.isNow = false
      this.isQuestion = false
      var temp = window.location.href;
      var flag = temp.substring(temp.length - 3);
      var all = temp.substring(temp.length - 8);
      if (all == 'question') {
        this.isNow = false
        this.isRecommand = false
        this.isInformation = false
        this.isAllActivity = false
        this.isQuestion = true
      } else {
        if (flag == 'ity') {
          this.isAllActivity = true
          this.isRecommand = false
          this.isInformation = false
          this.isNow = false
          this.isQuestion = false
        } else if (flag == 'now') {
          this.isAllActivity = false
          this.isRecommand = false
          this.isInformation = false
          this.isNow = true
          this.isQuestion = false
        } else if (flag == 'ion') {
          this.isAllActivity = false
          this.isRecommand = false
          this.isInformation = true
          this.isNow = false
          this.isQuestion = false
        }
      }
      this.$nextTick(function () {
        this.getLabels()
        console.log("this.picked", this.picked)
      })
      window.toNow = () => {
        this.goIsNow()
        this.$emit('refresh')
      }
    }
  }

</script>

<style scoped>
  @import "./../../static/css/discover/all.css";

  .top-pic img {
    width: 0.48rem;
    height: 0.48rem;
    position: relative;
    top: 16%;
  }

  /*.myheader {
    width: 90%;
    height: .88rem;
    line-height: .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 199;
    padding:none !important;
  }*/
  .recommand,
  .information,
  .allActivity,
  .now,
  .question {
    border-bottom: 0.04rem solid #49BBFF;
    color: #49BBFF;
    height: 0.8rem;
    line-height: 0.78rem;
  }

  .myheader {
    font-size: 0.4rem;
    position: fixed;
    width: 100%;
    background: #ffffff;
    height: .88rem;
    line-height: .88rem;
    padding: 0 .4rem 0;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    top: 0;
    z-index: 999;
  }

</style>
