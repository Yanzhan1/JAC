<template>
  <div>
    <div style="width:100%;height:.7rem;background:#fff;position:fixed;top:0;z-index:99999"></div>
      <header class="header MobileHeight">
        <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
        <span class="header-title">推荐码</span>
        <span class="header-right"></span>
      </header>
      <div class="center">
        <div class="my">我的推荐码</div>
        <img src="../../../static/images/my/icon_share@2x.png" alt="" @click="enjoy()">
        <div class="num">{{this.share}}</div>
      </div>
    <div class="mask"></div>
    <mt-popup v-model="popupVisible" position="bottom">
      <div style="height:2.5rem;width:100%;">
        <ul class="search flex row around cocenter" style="height:2rem">
          <li class="flex column contentcenter uu " @click="wei('WEIXIN')">
            <img src="../../../static/images/my/wei.png" alt="">
            <span>微信</span>
          </li>
          <li class="flex column contentcenter uu " @click="friendq('WEIXIN_CIRCLE')">
            <img src="../../../static/images/my/friendquan.png" alt="">
            <span>朋友圈</span>
          </li>
          <li class="flex column contentcenter uu " @click="qq('QQ')">
            <img src="../../../static/images/my/qq.png" alt="">
            <span>QQ</span>
          </li>
          <li class="flex column contentcenter uu " @click="qzone('QZONE')">
            <img src="../../../static/images/my/qqquan.png" alt="">
            <span>QQ空间</span>
          </li>
          <!-- <li class="flex column contentcenter uu ">
            <img src="../../../static/images/my/xinlang.png" alt="">
            <span>新浪微博</span>
          </li> -->
        </ul>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { Popup } from "mint-ui";
export default {
  data() {
    return {
      share: "",
      popupVisible: false,
      
    };
  },
  methods: {
    //点击分享
    enjoy() {
      this.popupVisible = true;
    },
    //分享微信
    wei(platform) {
        let content ='我在江淮的推荐码：'+this.share;
        let imageURL = 'www.baidu.com';
        let title = '';
        let description = '描述111';
        platform = platform;
      if (isMobile.iOS()) {
        var params = [content, platform];
        window.webkit.messageHandlers.share.postMessage(params);
      } else if (isMobile.Android()) {
        js2android.share(content,imageURL,title,description,platform);
      }
    },
    //分享朋友圈
    friendq(platform) {
        let content = '我在江淮的推荐码：'+this.share;
        let imageURL = '';
        let title = '';
        let description = '描述';
        platform = platform;
      if (isMobile.iOS()) {
        var params = [content, platform];
        window.webkit.messageHandlers.share.postMessage(params);
      } else if (isMobile.Android()) {
        js2android.share(content,imageURL,title,description,platform);
      }
    },
    //分享qq
    qq(platform) {
       let content ='我在江淮的推荐码：'+this.share;
        let imageURL = '';
        let title = '';
        let description = '描述';
        platform = platform;
      if (isMobile.iOS()) {
        var params = [content, platform];
        window.webkit.messageHandlers.share.postMessage(params);
      } else if (isMobile.Android()) {
       js2android.share(content,imageURL,title,description,platform);
      }
    },
    //分享qq
    qzone(platform) {
       let content ='我在江淮的推荐码：'+this.share;
        let imageURL = '';
        let title = '';
        let description = '描述';
        platform = platform;
      if (isMobile.iOS()) {
        var params = [content, platform];
        window.webkit.messageHandlers.share.postMessage(params);
      } else if (isMobile.Android()) {
       js2android.share(content,imageURL,title,description,platform);
      }
    }
  },
  created() {
    //获取推荐码
    var param = {
      userNo: this.$store.state.userId
    };
    this.$http.post(My.RecomendCode, param).then(res => {

     if (res.data.code == 0) {
        this.share = res.data.data.code;
      }
    });
  },
  mounted(){
    $(".MobileHeight").css({
            "borderTopWidth": this.$store.state.mobileStatusBar,
            "borderTopColor": "#fff",
          })
  }
};
</script>

<style scoped>
.search li img {
  width: 0.8rem;
  display: block;
}
.search li span {
  font-size: 0.24rem;
  display: block;
  color: #444;
  margin-top: 0.2rem;
}
.header {
  z-index: 999;
  margin-top:.68rem;
}
.center {
  z-index: 998;
  position: absolute;
  top: 4.88rem;
  left: 0.6rem;
  width: 6.3rem;
  height: 2.9rem;
  background: #fff;
  font-weight: Medium;
  font-family: 'PingFang-SC-Medium';
  border-radius: 0.08rem;
}
.center .my {
  font-size: 0.31rem;
  color: #555;
  margin-left: 0.31rem;
  margin-top: 0.44rem;
  width: 1.57rem;
  height: 0.31rem;
}
.center > img {
  width: 0.32rem;
  height: 0.33rem;
  position: absolute;
  left: 5.68rem;
  top: 0.48rem;
}
.num {
  width: 5.7rem;
  height: 1.2rem;
  position: absolute;
  top: 1.3rem;
  left: 0.3rem;
  background: #f5f5f5;
  font-size: 0.56rem;
  line-height: 1.2rem;
  color: #222;
  text-align: center;
  letter-spacing: 0.1rem;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 997;
  position: absolute;
}

.mint-popup-bottom {
  top: auto;
  right: auto;
  bottom: 0.3rem;
  height: 2rem;
  left: 50%;
  width: 90%;
  border-radius: 0.1rem;
}
</style>
