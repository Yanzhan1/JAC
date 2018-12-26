<template>
  <div>
    <div v-show="bgShareFlag" @click="bgHide" id="bgShare"></div>
    <my-header :id="'asd'" :title="title" :isShow="isShow" :rightPic="rightPic">
      <img slot="share" v-show="leftPic" src="../../../../static/images/discover/morefff.png" @click="onShareClick(0)" />
      <img slot="share" v-show="!leftPic" src="../../../../static/images/discover/moreblue.png" @click="onShareClick(0)" />
    </my-header>
    <!--活动内容S-->

    <div class="container" :style="containerStyleObj">
      <iframe id="childframe" :src="content.activityBody" frameborder="0" marginwidth="0" marginheight="0" border="0"
        vspace="0" hspace="0" scrolling="no"></iframe>
    </div>

    <shareBox :index="0" :item="content" :flag="flag" :type="type" :collectionStatus="content.collectionStatus"
      :isCenter="true" @closeShare="bgHide" @collection="collection" @reCollection="messageBoxCofirm"></shareBox>

  </div>
</template>

<script>
  var url = require('url')
  import {
    MessageBox
  } from 'mint-ui';
  import shareBox from '../component/shareBox.vue';
  import {
    Toast
  } from 'mint-ui';
  export default {
    name: "detail-activity",
    data() {
      return {
        activityId: '',
        content: [],
        userId: this.$store.state.userId,
        leftPic: false,
        rightPic: true,
        bgImgHeight: 0,
        title: ' ',
        isShow: true,
        bgShareFlag: false,
        flag: 'activity',
        type: 'activityLive',
        containerStyleObj: {}
      }
    },
    created() {
      this.activityId = this.$route.query.activityId;
    },
    components: {
      shareBox
    },
    methods: {
      //收藏
      collection: function () {
        var _this = this;
        console.log(_this.userId);
        this.$http.post(DISCOVERMESSAGE.activetyCollection, {
          "uid": _this.userId,
          "lid": _this.activityId
        }).then(function (res) {
          if (res.data.status) {
            _this.content.collectionStatus = 1;
            setTimeout(() => {
              _this.bgHide();
            }, 2000)
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //取消收藏
      messageBoxCofirm: function () {
        var _this = this;
        /*MessageBox.confirm('确定取消收藏?').then(action => {*/
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.activetyRemoveCollection, {
          "uid": _this.userId,
          "lid": _this.activityId
        }).then(function (res) {
          if (res.data.status) {
            _this.content.collectionStatus = 0;
            setTimeout(() => {
              _this.bgHide();
            }, 2000)
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
        /*});*/
      },
      onShareClick: function (index) {
        this.indexNum = index;
        var showId = '#share_activity' + index;
        $(showId).show();
        this.bgShareFlag = true
      },
      bgHide() {
        var showId = '#share_activity' + this.indexNum;
        $(showId).hide();
        this.bgShareFlag = false
      },
      sendMessage(activityBody) {
        var iframe = document.querySelector('#childframe')

        iframe.onload = () => {
          var targetOrigin = activityBody.split('?')[0]
          var auth = this.$store.state.islogin
          var userId = this.$store.state.userId
          var headImgUrl = this.$store.state.imgUrl
          var userName = this.$store.state.userName

          document.querySelector('#childframe').contentWindow.postMessage({
            src: 'jh',
            auth: auth ? 'yes' : 'no',
            userId,
            headImgUrl,
            userName
          }, targetOrigin)
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
    },
    mounted() {
      this.$store.dispatch("hideFoot")
      /*悬浮,更换头部背景透明度和文字*/
      window.addEventListener('scroll', this.handleScroll)
      //初始化数据
      this.$nextTick(() => {
        var asd = document.querySelector('#asd')

        this.containerStyleObj['height'] = window.innerHeight + 'px'
        this.getActivity();
      })
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
    opacity: 0.2;
    z-index: 9999;
  }

  .container {
    width: 100%;
    overflow-y: scroll;
    -webkit-overflow-scrolling: touch;
  }

  iframe {
    width: 1px;
    min-width: 100%;
    *width: 100%;
    height: 1px;
    min-height: 100%;
    *height: 100%;
    border: none;
    margin: 0;
  }

</style>
