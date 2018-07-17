<template>
  <div class="all">
    <!--<div @click="bgHide" id="bgShare" style="position: fixed; width: 100%;height: 100%;background: black; display: none;opacity: 0"></div>-->
    <header class="header header2">
      <img class="header-left" src="../../../../static/images/discover/backblue.png" @click="goBack">
      <p class="header-title-fff">圈子详情</p>
      <img src="../../../../static/images/discover/moreblue.png" @click="onShareClick(0)"/>
    </header>
      <shareBox :index="0" :item="content" :flag="flag" :type="type" :isCenter="true" @closeShare="bgHide"></shareBox>
      <div class="detail">
        <div style="margin-top: 1.4rem;width: 100%;">
          <div>
            <!--评论者信息S-->
            <div class="comment_userinfo">
              <div class="user_head">
                <div @click="changeUserStartId(content.user.user_id)">
                  <img v-if="content.user" :src="content.user.head_image" />
                  <img v-else src="../../../../static/images/discover/normalhead.png" />
                </div>
              </div>
              <div class="user_info">
                <div v-if="content.user" class="user_name">
                  {{content.user.nick_name}}
                </div>
                <div v-else class="user_name">
                  尚未设置昵称
                </div>
                <div class="operation_comment">
                  <div style="float: right;" v-if="content.user && userId != content.user.user_id">
                    <div v-if="content.focusStatus == 0">
                      <img src="../../../../static/images/discover/jgz.png" style="width:0.28rem;height: 0.28rem; " />
                      <span class="font_4" @click="addFoucs(content.user.user_id)">关注</span>
                    </div>
                    <div v-else-if="content.focusStatus == 1">
                      <img src="../../../../static/images/discover/ygz.png" style="width:0.28rem;height: 0.28rem; " />
                      <span class="font_4" @click="removeFoucs(content.user.user_id)">已关注</span>
                    </div>
                    <div v-else="content.focusStatus == 2">
                      <img src="../../../../static/images/discover/ygz.png" style="width:0.28rem;height: 0.28rem; ">
                      <span class="font_4" @click="removeFoucs(content.user.user_id)">相互关注</span>
                    </div>
                  </div>
                </div>
                <div class="user_date">
                  {{content.issuedDate}}
                </div>
              </div>
            </div>
            <!--评论者信息E-->
            <!--<div class="d_02">
              <div class="d_03">
                <div @click="changeUserStartId(content.user.user_id)">
                  <img v-if="content.user" :src="content.user.head_image" class="head_72"/>
                  <img v-else src="../../../../static/images/discover/normalhead.png" class="head_72"/>
                </div>
              </div>
              <div class="d_04" style="width: 88%;">
                <span  style="color: #222222;font-size: 0.28rem;padding-left: 0.2rem;width: 100%;">
                <span v-if="content.user">{{content.user.nick_name}}</span>
                <span v-else>尚未设置昵称</span>
                <span style="color: #222222;font-size: 0.28rem;float: right;" v-if="content.user && userId != content.user.user_id">
                    <div v-if="content.focusStatus == 0">
                      <img src="../../../../static/images/discover/jiaguanzhu1@2x.png" style="width:0.2rem;height: 0.2rem; " /> <span @click="addFoucs(content.user.user_id)">关注</span>
                    </div>
                    <div v-else-if="content.focusStatus == 1">
                      <img src="../../../../static/images/discover/yiguanzhu1@2x.png" style="width:0.2rem;height: 0.2rem; " /> <span @click="removeFoucs(content.user.user_id)">已关注</span>
                    </div>
                    <div v-else="content.focusStatus == 2">
                      <img src="../../../../static/images/discover/yiguanzhu1@2x.png" style="width:0.2rem;height: 0.2rem; "> <span @click="removeFoucs(content.user.user_id)">相互关注</span>
                    </div>
                  </span>
                <br>
                <span style="color: #888888;font-size: 0.24rem;">{{content.issuedDate}}</span>
              </span>
              </div>
            </div>-->
            <div style="width: 100%;overflow: hidden;color: #555555;font-size: 0.24rem;line-height: 0.4rem;margin: auto;padding: 0.1rem;">
              {{content.momentMessage}}
            </div>
            <div v-for="item in content.momentImgList">
              <img :src="item" style="width: 100%;overflow: hidden;border-radius: 0.2rem"/>
            </div>
            <div class="d_07">
              <!--浏览距今时间-->
              <div class="d_08">
                <img src="../../../../static/images/discover/eye.png" class="icon"/>
                <span class="iconNum">{{content.issuedDate}}</span>
              </div>
              <div class="d_09">
                <!--评论-->
                <!--<img @click="toDetail(content.id)" src="../../../../static/images/discover/pinglun.png" class="icon"/>
                <span class="iconNum">{{content.commentNum}}</span>
                <div style="width: 0.2rem;"></div>-->
                <!--是否点赞-->
                <span v-if="content.likeStatus">
                  <img src="../../../../static/images/discover/nozan.png" class="icon" @click="giveArticleLike">
                </span>
                <span v-else>
                  <img src="../../../../static/images/discover/zan.png" class="icon" @click="removeArticleLike">
                </span>
                <span class="iconNum">{{content.likeNum}}</span>
              </div>
              <!--<div class="d_08">
                <img  src="../../../../static/images/discover/fenxiang.png"  style="width: 0.32rem;margin-right: 0.16rem;" @click="onShareClick(0)"/>
                &lt;!&ndash;是否点赞&ndash;&gt;
                <span v-if="content.likeStatus">
                    <img src="../../../../static/images/discover/good2@2x.png" alt="" style="width: 0.32rem;margin-right: 0.16rem;" @click="giveArticleLike">
                  </span>
                <span v-else>
                    <img src="../../../../static/images/discover/good1@2x.png" alt="" style="width: 0.32rem;margin-right: 0.16rem;" @click="removeArticleLike">
                  </span>
                <span style="color: #888888;font-size: 0.24rem;margin-right: 0.16rem;">{{content.likeNum}}</span>
                <img src="../../../../static/images/discover/pinglun.png" style="width: 0.32rem;margin-right: 0.16rem;"/>
                <span style="color: #888888;font-size: 0.24rem;margin-right: 0.1rem;">{{content.commentNum}}</span>
              </div>
              <div class="d_09">
                <span style="color: #888888;font-size: 0.24rem;margin-right: 0.1rem;">{{content.readNum}}</span>
                <img src="../../../../static/images/discover/chakan.png" style="width: 0.32rem;"/>
              </div>-->
            </div>
          </div>
        </div>
      </div>
    <div style="height: 0.8rem;"></div>
   <!-- <div class="liner"></div>-->
    <div style="margin-bottom: 1rem;">
      <div id="pinglun" class="dd_01 detail" style="font-size: 0.32rem;color: #222222;font-weight: bold">
        全部评论
      </div>
      <div id="pinglun_item01" class="dd_02 detail" v-for="(item,index) in conmmentsList">
        <div class="dd_03">
          <div @click="changeUserStartId(item.user.user_id)">
            <img v-if="item.user" :src="item.user.head_image" style="border-radius: 35px;width:0.72rem;height: 0.72rem; "  />
            <img v-else src="../../../../static/images/discover/normalhead.png" style="border-radius: 15px;width:0.72rem;height: 0.72rem; "  />
          </div>
          <div class="d_04" style="width: 88%;">
              <span style="color: #222222;font-size: 0.28rem;padding-left: 0.2rem;width: 100%;">
                <span v-if="item.user">{{item.user.nick_name}}</span>
                <span v-else>尚未设置昵称</span>
                <div style="float: right;height: 0.32rem;line-height: 0.32rem">
                  <!--是否点赞-->
                  <span v-if="item.likeStatus">
                    <img src="../../../../static/images/discover/nozan.png" alt="" style="width: 0.32rem;float:left;" @click="giveCommentLike(item.id,index)">
                  </span>
                  <span v-else>
                    <img src="../../../../static/images/discover/zan.png" alt="" style="width: 0.32rem;float:left;" @click="removeCommentLike(item.id,index)">
                  </span>
                  <span style="color: #888888;font-size: 0.24rem;margin-left: 0.1rem;float:left;">{{item.likeNum}}</span>
                  <img @click="commentbtn1(item.id)" src="../../../../static/images/discover/comment.png" style="width: 0.32rem;height: 0.32rem;margin-left:0.2rem;float:right;"/>
                </div>
                <br>
                <div>
                  <span style="color: #888888;font-size: 0.24rem;">{{item.commentTime}}</span>
                  <span v-if="item.user && userId == item.user.user_id">
                    <span @click="deleteComment(item.id)" style="color: #888888;font-size: 0.24rem;">删除</span>
                  </span>
                </div>
              </span>
          </div>
        </div>
        <div style="width:100%;">
          <div style="width: 86%;float: right;padding-bottom: 0.2rem;">
            <div @click="commentbtn1(item.id)">
              <span style="font-size: 0.24rem;color: #555555;">{{item.message}}</span>
            </div>
            <div style="background: #F8F8F8;border-radius: 8px;padding: 0.2rem;" v-if="item.reverts && item.reverts.length>0">
              <div v-for="(back,index) in item.reverts.slice(0,3)">
                <span style="color: #666666;font-size: 0.24rem;">
                  <span>
                    <span @click="changeUserStartId(back.user.user_id)">
                      <span v-if="back.user.nick_name">{{back.user.nick_name}}</span>
                      <span v-else style="color: #666666;font-size: 0.24rem;">尚未设置昵称:</span>
                    </span>
                  </span>
                  <span v-if="index!=0 && back.beCommentUser" @click="changeUserStartId(back.beCommentUser.user_id)">
                    &nbsp;&nbsp;回复&nbsp;&nbsp;
                    <span v-if="back.beCommentUser.nick_name">{{back.beCommentUser.nick_name}}</span>
                    <span v-else style="color: #666666;font-size: 0.24rem;">尚未设置昵称</span><br>
                  </span>
                </span>
                <span style="color: #888888;font-size: 0.2rem;margin-left: 0.4rem" @click="commentbtn1(item.id,back.id)">{{back.message}}</span>
                <span v-if="back.user && userId == back.user.user_id">
                    <span @click="deleteComment(back.id)" style="color: #888888;font-size: 0.24rem;">删除</span>
                </span>
              </div>
              <div class="allHideComment" v-if="item.reverts && item.reverts.length>3" @click="toCommentList(item.id)">
                全部{{item.reverts.length}}条评论>
              </div>
            </div>
          </div>
        </div>
        <div class="dd_08">
        </div>
      </div>
    </div>
    <div class="comment-wrap">
      <div  style="width: 80%;display: flex;flex-direction: row;" id="commentBox">
        <div id='id_comment' @click="commentbtn"  style="display: flex;flex-direction: row;align-items: center;width: 100%;bottom: 0;">
          <input v-model="commentMsg" id="comment" placeholder="写评论..." class="comment-input"/>
        </div>
      </div>
      <div id="id_pl_btn">
        <button id="sendBtn" @click="comment" :disabled="isDisable">发送</button>
      </div>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible"
        cancelText="">
      </mt-actionsheet>
    </div>
    <div id="bg1" @click="bgbtn1" style="display: none;  position:fixed;  top: 0;  left: 0;  width: 100%;  height: 100%;  background-color: black;  z-index:999; opacity: 0.3;"/>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import shareBox from '../component/shareBox.vue';
  export default {
    name: "disc-detail",
    data(){
      return{
        listNum:1,
        manageId:'',
        content:[],
        date: "",
        imgTemp: '../../../static/images/1.jpg',
        conmmentsList:[],
        fId:null,
        bId:null,
        rows:1,
        commentMsg:'',
        sheetVisible:false,
        actions:[
          // {name:"举报",method:this.inform},
          {name:"删除",method:this.deleteNow}
        ],
        showImg:false,
        imgSrc: '',
        indexNum:0,
        flag: 'person',
        type: 'person',
        myList:[],
        userId: this.$store.state.userId,
        isDisable: false
      }
    },
    created(){
      this.manageId = this.$route.query.id;
    },
    components: {
      shareBox
    },
    methods:{
      toCommentList: function(id){
        this.$router.push({path:"/commentList",query:{id:id}})
      },
      getUserList: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.issueMomentList,{"uid": _this.$store.state.userId,"hisUid":_this.$store.state.UserStartId}).then(function (res) {
          if (res.data.status) {
            _this.myList = res.data.data;
            console.log(_this.myList);
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      changeUserStartId(id){
        if(id == this.$store.state.userId){
          this.$router.push({path:'/my/mystart'});
        }else{
          this.$store.state.UserStartId = id;
          this.$router.push({path:'/userstart'});
        }
      },
      clickImg(e) {
        this.showImg = true;
        this.imgSrc = e.currentTarget.src;
      },
      viewImg(){
        this.showImg = false;
      },
      //详情
      getDetail: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.nowDetail, {"uid": _this.$store.state.userId,"id": _this.manageId}).then(function (res) {
          if (res.data.status) {
            _this.content.issuedDate = res.data.data.issuedDate
            _this.content = res.data.data;
            if(res.data.data.user.user_id == _this.$store.state.userId){
              _this.actions[0].name = '删除';
              _this.actions[0].method = _this.deleteNow;
            }else{
              _this.actions[0].name = '返回';
              _this.actions[0].method = _this.goBack;
            }
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //圈子收藏
      collection: function (manageId) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentCollection, {"uid": _this.userId,"lid": manageId}).then(function (res) {
          if (res.data.status) {
            _this.content.collectionStatus = false;
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //圈子取消收藏
      messageBoxCofirm: function(manageId){
        MessageBox.confirm('确定取消收藏?').then(action => {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.momentRemoveCollection, {"uid": _this.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              _this.content.collectionStatus = true;
              Toast('取消收藏成功');
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        });
      },
      //删除此刻
      deleteNow: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.deleteMoment, {"id": _this.manageId}).then(function (res) {
          if (res.data.status) {
            Toast('删除成功');
            _this.goBack();
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //删除评论
      deleteComment: function (id) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.deleteComment, {"id": id}).then(function (res) {
          if (res.data.status) {
            Toast('删除成功');
            _this.getComments();
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //跳转到举报页面
      inform: function () {
        this.$store.state.UserStartId = _this.manageId;
        this.$router.push('/inform');
      },
      //给此刻点赞
      giveArticleLike: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentGiveLike, {"uid": _this.$store.state.userId,"lid": _this.manageId}).then(function (res) {
          if (res.data.status) {
            _this.content.likeNum = res.data.data.num;
            _this.content.likeStatus = false;
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //给此刻取消点赞
      removeArticleLike: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentRemoveLike, {"uid": _this.$store.state.userId,"lid": _this.manageId}).then(function (res) {
          if (res.data.status) {
            _this.content.likeNum = res.data.data.num;
            _this.content.likeStatus = true;
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //给评论点赞
      giveCommentLike: function (commentsId,index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentCommentGiveLike, {"uid": _this.$store.state.userId,"lid": commentsId}).then(function (res) {
          if (res.data.status) {
            _this.conmmentsList[index].likeNum = res.data.data.num;
            _this.conmmentsList[index].likeStatus = false;
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //给评论取消点赞
      removeCommentLike: function (commentsId,index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentCommentRemoveLike, {"uid": _this.$store.state.userId,"lid":commentsId}).then(function (res) {
          if (res.data.status) {
            _this.conmmentsList[index].likeNum = res.data.data.num;
            _this.conmmentsList[index].likeStatus = true;
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //浏览量
      getReadNum: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentRead, {"uid": _this.$store.state.userId,"lid": _this.manageId}).then(function (res) {
          if (res.data.status) {
            _this.content.readNum = res.data.data;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //获取评论列表
      getComments: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentCommentList, {"uid": _this.$store.state.userId,"lid": _this.manageId}).then(function (res) {
          if (res.data.status) {
            _this.conmmentsList = res.data.data;
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      //评论
      comment: function () {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        _this.isDisable = true
        if(_this.msgIsNull(_this.commentMsg)){
          MessageBox('提示', "评论内容不能为空");
          _this.isDisable = false
          return false;
        }
        var concatId = null;
        if(_this.bId){
          concatId = _this.fId+","+_this.bId;
        }else{
          concatId = _this.fId;
        }
        this.$http.post(DISCOVERMESSAGE.momentComment, {"uid": _this.$store.state.userId,"lid": _this.manageId,"message":_this.commentMsg,"id":concatId}).then(function (res) {
          if (res.data.status) {
            _this.fId = null;
            setTimeout(()=>{
              _this.getComments();
              _this.isDisable = false;
            },1000)
            _this.bgbtn();
          } else {
            MessageBox('提示', res.data.errorMsg);
            _this.isDisable = false;
            _this.bgbtn();

          }
        });
      },
      msgIsNull: function( str ){
        if ( str == "" ) return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
      },
      //加关注
      addFoucs: function (foucsId) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.focusOn, {"uid": _this.$store.state.userId,"focusId": foucsId}).then(function (res) {
          if (res.data.status) {
            _this.content.focusStatus = res.data.data;
            _this.getDetail();
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //取消关注
      removeFoucs: function (foucsId) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.unFocus, {"uid": _this.$store.state.userId,"focusId": foucsId}).then(function (res) {
          if (res.data.status) {
            _this.content.focusStatus = res.data.data;
            _this.getDetail();
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //点击评论
      commentbtn(){
        $("#bg").show();//显示遮罩层
        $("#id_pl_icon").hide();
        //$("#id_pl_btn").show();
        $("#comment").focus();
      },
      //回复
      commentbtn1(id,backId){
        $("#bg").show();
        $("#id_pl_icon").hide();
        //$("#id_pl_btn").show();
        $("#comment").focus();
        this.fId = id;
        this.bId = backId;
      },
      //取消评论
      bgbtn(){
        $("#bg").hide();
        $("#id_pl_icon").show();
        //$("#id_pl_btn").hide();
        this.commentMsg = '';
      },
      //分享
      onShareClick: function (index) {
        this.indexNum = index;
        var showId = '#share_person'+index;
        $(showId).show().css('padding',"0 .3rem");
        $("#bgShare").show();
        $("#bg1").show();
//        this.bgbtn1();
      },
      bgbtn1(){
        var showId = '#share_person'+this.indexNum;
        $(showId).hide();
        $("#bgShare").hide();
        $("#bg1").hide();
      },
      bgHide: function () {
        var showId = '#share_person'+this.indexNum;
        $(showId).hide();
        $("#bgShare").hide();
        $("#bg1").hide();
      },
      //返回上一级
      goBack:function () {
        this.$router.go(-1);
        this.$store.dispatch("showFoot")
      }
    },
    /*beforeRouteLeave(to, from, next) {
      if (to.path == "/discover/index") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    },*/
    mounted(){
      this.$store.dispatch("hideFoot"),
        console.log(this.$store.state.UserStartId);
        this.$nextTick(function () {
          //初始化数据
          this.getDetail();
          this.getReadNum();
          this.getComments();
          this.getUserList();
        })
    }
  }
</script>

<style scoped>
  @import "./../../../../static/css/discover/detail.css";
  .all .mui-title,.all .mui-bar{
    font-size: 0.4rem;
    line-height: 1rem;
    height: 1rem;
  }
  .liner{
    height: 0.2rem;background: #f8f8f8;
  }
  .all .mui-bar a{
    font-size: 0.4rem;
    line-height: 0.8rem;
  }
  .dd_01{
    width:100%;height: 1rem;display: flex;flex-direction: row;align-items: center;justify-content: flex-start;;
  }
  .dd_02{
    display: flex;flex-direction: column;;
  }
  .dd_03{
    width:100%;height:0.8rem;display: flex;flex-direction: row;
  }
  .dd_08{
    height: 0.2rem;display: flex;flex-direction: row;align-items: center;
  }
  .detail{
    width: 90%;
    margin: 0 auto;
  }
  #sendBtn{
    color: #FC3846;
    font-size: 0.28rem;
    margin: 0.16rem;
    float: right;
    width: 1rem;
    height: 0.6rem;
    background: #1A1D23;
    border: none;
  }
  #id_pl_btn{
    width: 20%;
    flex-direction: row;
    align-items: center;
    justify-content: flex-end;
  }
  .header-title{
    color: #FC3846 ;
    font-size: 0.36rem;
  }
  .icon{
    width: 0.44rem;margin-right: 0.16rem;
  }
  .iconNum{
    color: #888888;font-size: 0.24rem;margin-right: 0.1rem;
  }
  .comment-wrap{
    width:100%;
    height: 0.9rem;
    background: #1A1D23;
    border-top:1px solid #f8f8f8;
    position: fixed;
    bottom: 0;
    display: flex;
    flex-direction: row;
    padding-left: 0.4rem;
    padding-right: 0.4rem;
    z-index: 20000;
  }
  .comment-input{
    background:#1A1D23;
    height: 0.52rem;
    width: 100%;
    border-radius:0.16rem;
    border: none;
    font-size: 0.3rem;
    padding: 0.1rem;
    color: #ffffff;
    border: 0.02rem solid rgba(152, 152, 152, 0.51);
  }
  .allHideComment{
    font-family: PingFangSC-Regular;
    font-size: 0.28rem;
    color: #666666;
    height: 0.6rem;
    line-height: 0.6rem;
  }
</style>
