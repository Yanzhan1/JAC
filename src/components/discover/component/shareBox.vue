<template>
<div :id="'share_'+flag+index" class="shareHide">
  <div :class="flag == 'person'?'personWrap':'contentWrap'">
    <div :class="flag == 'person'?'personShare':'contentShare'">
      <div v-if="flag != 'person'">
        <div class="shareBox">
          <img src="../../../../static/images/discover/wx.png" class="shareIcon" @click="toShare(item,'WEIXIN')"/>
          <span style="color: #222222;">微信</span>
        </div>
        <div class="shareBox">
          <img src="../../../../static/images/discover/pyq.png" class="shareIcon" @click="toShare(item,'WEIXIN_CIRCLE')"/>
          <span style="color: #222222;">朋友圈</span>
        </div>
        <div class="shareBox">
          <img src="../../../../static/images/discover/qq.png" class="shareIcon" @click="toShare(item,'QQ')"/>
          <span style="color: #222222;">QQ</span>
        </div>
        <div class="shareBox">
          <img src="../../../../static/images/discover/qqkongjian.png" class="shareIcon" @click="toShare(item,'QQ')"/>
          <span style="color: #222222;">QQ空间</span>
        </div>
      </div>
      <div class="shareBox" v-if="isCenter && flag=='person'">
        <img src="../../../../static/images/discover/yijubao.png" class="shareIcon" @click="inform(item.id)"/>
        <span style="color: #222222;">举报</span>
      </div>

      <!--此刻（举报）-->
      <!--<div  v-if="isCenter && flag=='person'">
        <div class="shareBox mt_4">
          <img src="../../../../static/images/discover/yijubao.png" class="shareIcon" @click="inform(item.user.user_id,'SELF')"/>
          <span style="color: #222222;">举报</span>
        </div>
        &lt;!&ndash;<div class="shareBox mt_4">
          <img src="../../../../static/images/discover/jubao.png" class="shareIcon" @click="inform(item.user.user_id,'SELF')"/>
          <span style="color: #222222;">已举报</span>
        </div>&ndash;&gt;
      </div>-->
      <!--资讯、活动（收藏）-->
      <div v-else>
        <div class="shareBox mt_4" v-if="collectionStatus" @click="collection">
          <img src="../../../../static/images/discover/yishoucang.png" class="shareIcon"/>
          <span style="color: #222222;">收藏</span>
        </div>
        <div class="shareBox mt_4" v-if="!collectionStatus" @click="reCollection">
          <img src="../../../../static/images/discover/shoucang.png" class="shareIcon"/>
          <span style="color: #222222;">已收藏</span>
        </div>
        </div>
    </div>
  </div>
  <div @click="back" class="cancle">取消</div>

</div>
</template>
<script>
  import { Toast } from 'mint-ui';
  export default {
    name: "shareBox",
    props: ['index','item','flag','type','collectionStatus','isCenter'],
    data: function () {
      return {
        myCollect: this.collectionStatus
      };
    },
    methods: {
      //分享到朋友圈
      toShare: function (item,platform) {
        let content = '';
        let imageURL = '';
        let title = '';
        let description = '描述';
        let waiwangip = 'http://test.jac.timanetwork.net/JACH5/#/';
        if(this.type=='now'){
          content = waiwangip+'/now/nowDetail?id='+item.id;
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
          content = waiwangip+'share/informationDetail?id='+(item.manageId?item.manageId:item.id);
          imageURL = item.pictureUrl?item.pictureUrl:item.imgUrl;
          title = "";
          description = item.title?item.title:item.manageTitle;
          platform = platform;
        }else if(this.type=='activity'){
          content = waiwangip+'share/activityDetail?activityId='+(item.activityId?item.activityId:item.id);
          imageURL = item.imgUrl?item.imgUrl:item.pictureUrl;
          title = "";
          description = item.activityTitle?item.activityTitle:item.title;
          platform = platform;
        }/*else if(this.type=='question'){
          content = waiwangip+'discover/questionDetail?id='+item.id;
          imageURL = '';
          title = "";
          description = item.questionTitle;
          platform = platform;
        }*/
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
        console.log('类型:'+this.type +"  "+"内容:"+content +"  "+"图片:"+imageURL +"  "+"标题:"+title +"  "+"描述:"+description +"  "+"平台:"+platform)
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
      inform: function (manageId) {
        debugger
        this.$router.push({ path: '/component/inform', query: {'manageId':manageId} });
      },
      back:function () {
        this.$emit('closeShare')
      },
      collection:function () {
        this.change();
        this.$emit('collection')
      },
      reCollection:function () {
        this.change();
        this.$emit('reCollection')
      },
      change() {
        this.myCollect = !this.myCollect;
      }
    },
    watch: {
      collectionStatus(val) {
        this.myCollect = val;
      }
    },
    mounted(){
    }
  }
</script>
<style scoped>
  /*分享*/
  .cancle{
    width: 92%;
    height: 0.88rem;
    line-height: 0.88rem;
    background: #ffffff;
    margin-top: 0.1rem;
    z-index: 1000000;
    bottom: 0.2rem;
    position: fixed;
    border-radius: 0.08rem;
    font-size: 0.32rem;
    color: #49BBFF;
    text-align: center;
    margin-left: 4%;
  }
  .shareIcon{
    padding-left:0.2rem;
    padding-right:0.2rem;
    width: 1.2rem;
  }
  .shareBox{
    width: 20%;
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
  .contentWrap{
    width: 92%;
    padding: 0.4rem;
    height: 14%;
    z-index: 999666;
    background: #fdfdfd;
    border-radius: 0.08rem;
    margin-left:4%;
    position: fixed;
    bottom: 1.24rem;
  }
  .personWrap{
    width: 92%;
    padding: 0.2rem;
    height: 11%;
    z-index: 999666;
    background: #fdfdfd;
    border-radius: 0.08rem;
    margin-left:4%;
    position: fixed;
    bottom: 1.24rem;
  }
  .contentShare{
    height: 48%;
    width: 100%;
  }
  .personShare{
    height: 48%;
    width: 100%;
  }
  .mt_4{
    //margin-top: 0.4rem;
  }
</style>
