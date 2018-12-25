<template>
  <div>
    <!--活动内容S-->
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
          'height': window.innerHeight + 'px',
          'width': '100%'
        }
      }
    },
    created() {
      this.activityId = this.$route.query.activityId;
      this.getActivity()
    },
    methods: {
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
