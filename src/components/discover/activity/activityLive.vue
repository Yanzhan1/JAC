<template>
  <div>
    <my-header :id="'asd'" :title="title" :isShow="isShow" :rightPic="rightPic">
      <!--<img slot="share" v-show="leftPic" src="../../../../static/images/discover/morefff.png" @click="onShareClick(0)" />
      <img slot="share" v-show="!leftPic" src="../../../../static/images/discover/moreblue.png"/>-->
      <!--<img slot="share" v-show="!leftPic" src="../../../../static/images/discover/moreblue.png" @click="onShareClick(0)" />-->
    </my-header>
    <!--活动内容S-->
    <iframe id="childframe" :src="content.activityBody" :style="iframHeightObj"></iframe>
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
        leftPic: true,
        rightPic: true,
        bgImgHeight: 0,
        title: '',
        isShow: true,
        iframHeightObj: {
          'border': 'none',
          'minHeight': window.innerHeight + 'px',
          'width': '100%'
        }
      }
    },
    created() {
      this.activityId = this.$route.query.activityId;
    },
    components: {
      shareBox
    },
    methods: {
      postMessageObj() {
        var count = 0
        var self = this

        return {
          sendPostMessage: function (activityBody) {
            if (count >= 10) {
              console.log('不瘠薄调了')
              return
            }
            count++
            var {
              protocol,
              host
            } = url.parse(activityBody, true)
            var auth = self.$store.state.islogin
            var userId = self.$store.state.userId
            var headImgUrl = self.$store.state.imgUrl
            var userName = self.$store.state.userName

            try {
              document.querySelector('#childframe').contentWindow.postMessage({
                src: 'jh',
                auth: auth ? 'yes' : 'no',
                userId,
                headImgUrl,
                userName
              }, '*')
            } catch (e) {
              console.log('没调通')
              setTimeout(() => {
                this.sendPostMessage(activityBody)
              }, 1000)
            }
          }
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
            _this.content = res.data.data;

            _this.$nextTick(function () {
              _this.postMessageObj().sendPostMessage(res.data.data.activityBody)
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
      this.$nextTick(function () {
        this.getActivity();
      })
    },
    updated() {
      this.$nextTick(() => {
        const bgImg = document.querySelector('#bgImg')
        const asd = document.querySelector('#asd')
        //this.bgImgHeight = bgImg.getBoundingClientRect().height - asd.getBoundingClientRect().height
      })
    },

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
    display: none;
    opacity: 0.2
  }

</style>
