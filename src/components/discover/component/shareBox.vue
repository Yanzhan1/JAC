<template>
<div :id="'share_'+flag+index" class="shareHide">
  <div class="personWrap" v-if="isCenter && flag=='person'">
    <div class="contentWord">
      <span class="shareWord">分享</span>
      <span class="cancelWord" @click="back">取消</span>
    </div>
    <div class="contentShare">
      <div class="shareBox">
        <img src="../../../../static/images/discover/pyq.png" class="shareIcon" @click="toShare(item,'WEIXIN_CIRCLE')"/>
        <span style="color: #222222;">朋友圈</span>
      </div>
      <div class="shareBox">
        <img src="../../../../static/images/discover/wx.png" class="shareIcon" @click="toShare(item,'WEIXIN')"/>
        <span style="color: #222222;">微信</span>
      </div>
      <div class="shareBox">
        <img src="../../../../static/images/discover/qq.png" class="shareIcon" @click="toShare(item,'QQ')"/>
        <span style="color: #222222;">QQ</span>
      </div>
      <div class="shareBox">
        <img src="../../../../static/images/discover/weibo.png" class="shareIcon" @click="toShare(item,'SELF')"/>
        <span style="color: #222222;">微博</span>
      </div>
      <div class="shareBox">
        <img src="../../../../static/images/discover/jubao.png" class="shareIcon" @click="inform(item.user.user_id,'SELF')"/>
        <span style="color: #222222;">举报</span>
      </div>
    </div>
  </div>
  <div class="contentWrap" v-else-if="isCenter">
    <div class="contentWord">
      <span class="shareWord">分享</span>
      <span class="cancelWord" @click="back">取消</span>
    </div>
    <div class="contentShare">
      <div class="shareBox">
        <img src="../../../../static/images/discover/pyq.png" class="shareIcon" @click="toShare(item,'WEIXIN_CIRCLE')"/>
        <span style="color: #222222;">朋友圈</span>
      </div>
      <div class="shareBox">
        <img src="../../../../static/images/discover/wx.png" class="shareIcon" @click="toShare(item,'WEIXIN')"/>
        <span style="color: #222222;">微信</span>
      </div>
      <div class="shareBox">
        <img src="../../../../static/images/discover/qq.png" class="shareIcon" @click="toShare(item,'QQ')"/>
        <span style="color: #222222;">QQ</span>
      </div>
      <!--<div class="shareBox">
        <img src="../../../static/images/discover/zn.png" class="shareIcon" @click="toShare(item,'SELF')"/>
        <span style="color: #222222;">QQ空间</span>
      </div>-->
      <div class="shareBox">
        <img src="../../../../static/images/discover/weibo.png" class="shareIcon" @click="toShare(item,'SELF')"/>
        <span style="color: #222222;">微博</span>
      </div>
    </div>
  </div>
  <div class="listWrap" v-else>
    <div class="shareBox">
      <img src="../../../../static/images/discover/pyq.png" class="shareIcon" @click="toShare(item,'WEIXIN_CIRCLE')"/>
      <span style="color: #222222;">朋友圈</span>
    </div>
    <div class="shareBox">
      <img src="../../../../static/images/discover/wx.png" class="shareIcon" @click="toShare(item,'WEIXIN')"/>
      <span style="color: #222222;">微信</span>
    </div>
    <div class="shareBox">
      <img src="../../../../static/images/discover/qq.png" class="shareIcon" @click="toShare(item,'QQ')"/>
      <span style="color: #222222;">QQ</span>
    </div>
    <!--<div class="shareBox">
      <img src="../../../static/images/discover/zn.png" class="shareIcon" @click="toShare(item,'SELF')"/>
      <span style="color: #222222;">QQ空间</span>
    </div>-->
  </div>
</div>
</template>
<script>
  export default {
    name: "shareBox",
    props: ['index','item','flag','type','isCenter'],
    methods: {
      //分享到朋友圈
      toShare: function (item,platform) {

        let content = '';
        let imageURL = '';
        let title = '';
        let description = '描述';
        if(this.type=='now'){
          content = waiwangip+'discover/nowDetail?id='+item.id;
          if(item.momentImgList == null){
            imageURL = null
          }else{
            imageURL = item.momentImgList[0];
          }
          // imageURL = item.momentImgList;
          title = "";
          description = item.momentMessage?item.momentMessage:item.title;
          platform = platform;
        }else if(this.type=='information'){
          content = waiwangip+'discdetail?id='+(item.manageId?item.manageId:item.id);
          imageURL = item.pictureUrl?item.pictureUrl:item.imgUrl;
          title = "";
          description = item.title?item.title:item.manageTitle;
          platform = platform;
        }else if(this.type=='activity'){
          content = waiwangip+'activity/DetailActivity?activityId='+(item.activityId?item.activityId:item.id);
          imageURL = item.imgUrl?item.imgUrl:item.pictureUrl;
          title = "";
          description = item.activityTitle?item.activityTitle:item.title;
          platform = platform;
        }else if(this.type=='question'){
          content = waiwangip+'discover/questionDetail?id='+item.id;
          imageURL = '';
          title = "";
          description = item.questionTitle;
          platform = platform;
        }
        var platformType = "";
        switch (platform){
          case "WEIXIN":
            platformType = "2";
            break;
          case "QQ":
            platformType = "3";
            break;
          case "WEIXIN_CIRCLE":
            platformType = "1";
            break;
          case "SELF":
            platformType = "5";
            break;
          default:
            break;
        }
        //console.log('类型:'+this.type +"  "+"内容:"+content +"  "+"图片:"+imageURL +"  "+"标题:"+title +"  "+"描述:"+description +"  "+"平台:"+platform)
        if (isMobile.iOS()) {
          var params = {
            content,imageURL,title,description,platform
          }
          window.webkit.messageHandlers.share.postMessage(params);
        } else if(isMobile.Android()) {
          /*拼音转数字*/
          var platformType = "";
          switch (platform){
            case "WEIXIN":
              platformType = "2";
              break;
            case "QQ":
              platformType = "3";
              break;
            case "WEIXIN_CIRCLE":
              platformType = "1";
              break;
            case "SELF":
              platformType = "5";
              break;
            default:
              break;
          }
          var obj = {
            "platformType":platformType,
            "thumbnail":imageURL,
            "title":title,
            "description":description,
            "url":content,
            "thumbnailType":"1",
            "contentType":"3"
          }
          var param = JSON.stringify(obj);
          NativeJavaScriptInterface.share(param);
          //NativeJavaScriptInterface.share(content,imageURL,title,description,platform);
        }
      },
      //跳转到举报页面
      inform: function (userId) {
        this.$store.state.UserStartId = userId;
        this.$router.push('/inform');
      },
      back:function () {
        //this.$router.go(-1);
        this.$emit('closeShare')
      }
    },
    mounted(){
    }
  }
</script>
<style scoped>
  /*分享*/
  .shareIcon{
    padding-left:0.2rem;
    padding-right:0.2rem;
    width: 1.2rem;
  }
  .shareBox{
    width: 1.2rem;
    height: 100%;
    float: left;
    text-align: center;
    font-size: 0.3rem;
    color: #555555;
  }
  .shareHide{
    display: none;
    z-index: 20;
  }
  .listWrap{
    width: 5.2rem;
    padding: 0.2rem;
    height: 1.6rem;
    z-index: 999666;
    background: #fdfdfd;
    border-radius: 0.4rem;
    margin-left:0.1rem;
    position: absolute
  }
  .contentWrap{
    width: 92%;
    padding: 0.4rem;
    height: 24%;
    z-index: 999666;
    background: #fdfdfd;
    border-radius: 0.2rem;
    margin-left:5%;
    position: fixed;
    bottom: 0.2rem;
  }
  .contentWord{
    border-bottom: 0.01rem solid #b7b7b7;
    height: 34%;
  }
  .contentShare{
    height: 64%;
    width: 100%;
    padding-top: 6%;
  }
  .shareWord{
    font-family: PingFangSC-Medium;
    font-size: 0.32rem;
    color: #333333;
  }
  .cancelWord{
    font-size: 0.32rem;
    color: #FC3846;
    float: right;
  }
  .personWrap{
    width: 92%;
    padding: 0.4rem;
    height: 24%;
    z-index: 999666;
    background: #fdfdfd;
    border-radius: 0.2rem;
    position: fixed;
    bottom: 0.2rem;
  }
</style>
