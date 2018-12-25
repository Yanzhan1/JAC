<template>
  <div>
    <!--活动内容S-->
    <p v-if="frameFlag">直播正在加载中!请稍等...</p>
    <iframe id="childframe" :src="content.activityBody" :style="iframHeightObj"></iframe>
  </div>
</template>

<script>
  export default {
    name: "detail-activity",
    data() {
      return {
        activityId: '',
        content: [],
        userId: this.$store.state.userId,
        bgImgHeight: 0,
        title: '',
        iframHeightObj: {
          'border': 'none',
          'minHeight': window.innerHeight + 'px',
          'width': '100%'
        },
        frameFlag: true
      }
    },
    created() {
      this.activityId = this.$route.query.activityId;
      this.getActivity()
    },
    methods: {
      sendMessage() {
        var iframe = document.querySelector('#childframe')

        iframe.onload = () => {
          this.frameFlag = false
        }
      },
      //活动详情
      getActivity() {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.getActivityDetail, {
          "uid": _this.$store.state.userId,
          "id": this.activityId
        }, ).then(function (res) {
          if (res.data.status) {

            res.data.data.activityBody = res.data.data.activityBody.includes('?') ?
              `${res.data.data.activityBody}&t=${+new Date}` :
              `${res.data.data.activityBody}?t=${+new Date}`

            _this.content = res.data.data;

            _this.$nextTick(function () {
              _this.sendMessage(res.data.data.activityBody)
            })

          } else {
            console.log('提示', res.data.errorMsg);
          }
        });
      },
    }
  }

</script>

<style scoped>
  @import "./../../../../static/css/discover/detail.css";

  .act_16 img {
    height: 0.32rem;
    width: 0.32rem
  }

  #bgShare {
    position: fixed;
    width: 100%;
    height: 100%;
    background: black;
    opacity: 0.2
  }

</style>
