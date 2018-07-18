<template>
  <div>
    <header class="header header2">
      <img class="header-left" src="../../../../static/images/discover/backblue.png" @click="goBack">
      <p class="header-title-fff" style="width: 100%;text-align: center">评论详情</p>
    </header>
    <div style="margin-bottom: 1rem;margin-top: 1.2rem;">
      <div id="pinglun_item01" class="dd_02 detail" v-for="(item,index) in conmmentsList">
        <!--评论者信息S-->
        <div class="comment_userinfo">
          <div class="user_head">
            <div @click="changeUserStartId(item.user.user_id)">
              <img v-if="item.user" :src="item.user.head_image" />
              <img v-else src="../../../../static/images/discover/normalhead.png" />
            </div>
          </div>
          <div class="user_info">
            <div v-if="item.user" class="user_name">
              {{item.user.nick_name}}
            </div>
            <div v-else class="user_name">
              尚未设置昵称
            </div>
            <div class="operation_comment">
              <div>
                <img v-if="item.likeStatus" src="../../../../static/images/discover/nozan.png" class="w_04 mr_16 v_m f_left" @click="giveCommentLike(item.id,index)"/>
                <img v-else src="../../../../static/images/discover/zan.png" class="w_04 mr_16 v_m f_left" @click="removeCommentLike(item.id,index)"/>
                <span style="font-size: 0.28rem;">{{item.likeNum}}</span>
              </div>
            </div>
            <div class="user_date">
              {{item.commentTime}}
              <span v-if="item.user && userId == item.user.user_id">
                    <span @click="deleteComment(item.id)" class="font_1">删除</span>
                  </span>
            </div>
          </div>
        </div>
        <!--评论者信息E-->
        <div style="width:100%;">
          <!--评论内容-->
          <p class="commentB" @click="commentbtnBack(item.id)">{{item.message}}</p>
          <div class="commentB_back">
            <!--回复内容S-->
            <div v-for="(back,index) in item.reverts" class="commentB_msg">
                <span class="font_1">
                  <span>
                    <span @click="changeUserStartId(back.user.user_id)">
                      <span v-if="back.user.nick_name">{{back.user.nick_name}}</span>
                      <span v-else>尚未设置昵称:</span>
                    </span>
                  </span>
                  <span v-if="index!=0 && back.beCommentUser" @click="changeUserStartId(back.beCommentUser.user_id)">
                    &nbsp;&nbsp;回复&nbsp;&nbsp;
                    <span v-if="back.beCommentUser.nick_name">{{back.beCommentUser.nick_name}}</span>
                    <span v-else>尚未设置昵称:</span>
                  </span><br>
                </span>
              <span class="font_4" @click="commentbtnBack(item.id,back.id)">{{back.message}}</span>
              <span v-if="back.user && userId == back.user.user_id">
                <span @click="deleteComment(back.id)" style="color: #888888;font-size: 0.24rem;">删除</span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--评论输入框S-->
    <div id="commentBg" @click="closeComment"/>
    <div class="flex contentcenter myInput">
      <input autofocus="autofocus" ref="commentfocus" id="comment" type="text" v-model="commentMsg" @click="commentbtn"/>
      <span class="send" @click="comment">发送</span>
    </div>
    <!--评论输入框E-->
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  export default {
    name: "disc-detail",
    data(){
      return{
        listNum:1,
        manageId:'',
        content:[],
        conmmentsList:[],
        fId:null,
        bId:null,
        rows:1,
        commentMsg:'',
        userId: this.$store.state.userId,
        flag:1
      }
    },
    created(){
      this.manageId = this.$route.query.id;
      this.flag = this.$route.query.flag;
    },
    methods:{
      changeUserStartId(id){
        if(id == this.$store.state.userId){
          this.$router.push({path:'/my/mystart'});
        }else{
          this.$store.state.UserStartId = id;
          this.$router.push({path:'/userstart'});
        }
      },
      //获取评论列表
      getComments: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.getOneComment, {"uid": _this.$store.state.userId,"id": _this.manageId}).then(function (res) {
          if (res.data.status) {
            console.log(_this.$store.state.userId)
            console.log(_this.manageId)
            _this.conmmentsList = res.data.data;
            console.log(res.data.data)
          } else {
            console.log(res.data.errorMsg);
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
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //给评论点赞
      giveCommentLike: function (commentsId,index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationCommentGiveLike, {"uid": _this.$store.state.userId,"lid": commentsId}).then(function (res) {
          if (res.data.status) {
            _this.conmmentsList[index].likeNum = res.data.data.num;
            _this.conmmentsList[index].likeStatus = false;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //给评论取消点赞
      removeCommentLike: function (commentsId,index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationCommentRemoveLike, {"uid": _this.$store.state.userId,"lid":commentsId}).then(function (res) {
          if (res.data.status) {
            _this.conmmentsList[index].likeNum = res.data.data.num;
            _this.conmmentsList[index].likeStatus = true;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //评论
      comment: function () {
        var _this = this;
        if(_this.msgIsNull(_this.commentMsg)){
          MessageBox('提示', "评论内容不能为空");
          return false;
        }
        var concatId = null;
        if(_this.bId){
          concatId = _this.fId+","+_this.bId;
        }else{
          concatId = _this.fId;
        }
        this.$http.post(DISCOVERMESSAGE.informationComment, {"uid": _this.$store.state.userId,"lid": _this.manageId,"message":_this.commentMsg,"id":concatId}).then(function (res) {
          if (res.data.status) {
            _this.fId = null;
            _this.getComments();
            _this.closeComment();
          } else {
            MessageBox('提示', "请登录");
          }
        });
      },
      msgIsNull: function( str ){
        if ( str == "" ) return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
      },
      //点击评论
      commentbtn(){
        $("#commentBg").show();
        $("#comment").focus();
      },
      //回复
      commentbtnBack(id,backId){
        $("#commentBg").show();
        $("#comment").focus();
        this.fId = id;
        this.bId = backId;
      },
      //取消评论
      closeComment(){
        $("#commentBg").hide();
        $("#id_pl_icon").show();
        this.commentMsg = '';
      },
      //返回上一级
      goBack:function () {
        this.$router.go(-1);
        this.$store.dispatch("showFoot")
      }
    },
    mounted(){
      this.$store.dispatch("hideFoot"),
        this.$nextTick(function () {
          this.getComments();
        })
    }
  }
</script>

<style scoped>
  @import "./../../../../static/css/discover/detail.css";
  .dd_02{
    display: flex;flex-direction: column;;
  }
  .detail{
    width: 90%;
    margin: 0 auto;
  }
</style>
