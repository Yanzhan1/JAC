<template>
  <div class="container" :style="containerStyleObj">
    <!--活动内容S-->
    <iframe id="childframe" :src="content.activityBody" border="0" style="border:none;" scrolling="no"></iframe>
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
        containerStyleObj: {
          'height': window.innerHeight + 'px'
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

  .container {
    width: 100%;
    overflow: auto;
    -webkit-overflow-scrolling: touch;
  }

  iframe {
    /*width: 1px;*/
    height: 100%;
    width: 100%;
    /*min-width:100%;*/
  }

  iframe.safaric_fix {
    width: 1px;
    min-width: 100%;
  }

</style>
