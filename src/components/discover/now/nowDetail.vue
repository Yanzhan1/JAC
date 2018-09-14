<template>
  <div>
    <div @click="bgHide" id="bgShare" style="position: fixed; width: 100%;height: 100%;background: #000000; display: none;opacity: 0.2;top: 0;"></div>
    <header class="header header2">
      <img class="header-left" src="../../../../static/images/discover/backblue.png" @click="goBack">
      <p class="header-title-fff">社区详情</p>
      <img src="../../../../static/images/discover/moreblue.png" @click="onShareClick(0)"/>
    </header>
      <shareBox :index="0" :item="content" :flag="flag" :type="type" :isCenter="true" @closeShare="bgHide"></shareBox>
      <div class="wrap_92">
        <div class="top_14">
            <!--发布者信息S-->
            <div class="comment_userinfo">
              <div class="user_head">
                <div @click="changeUserStartId(content.user.user_id)">
                  <img v-if="content.user && content.user.head_image" :src="content.user.head_image"/>
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
                <div class="guanzhu">
                  <div v-if="content.user && userId != content.user.user_id">
                    <div v-if="content.focusStatus == 0"  @click="addFoucs(content.user.user_id)">
                      <img src="../../../../static/images/discover/jgz.png">
                      <span class="font_4">关注</span>
                    </div>
                    <div v-else-if="content.focusStatus == 1"  @click="removeFoucs(content.user.user_id)">
                      <img src="../../../../static/images/discover/ygz.png">
                      <span class="font_4">已关注</span>
                    </div>
                    <div v-else="content.focusStatus == 2" @click="removeFoucs(content.user.user_id)">
                      <img src="../../../../static/images/discover/ygz.png">
                      <span class="font_4">相互关注</span>
                    </div>
                  </div>
                </div>
                <div class="user_date">
                  {{content.issuedDate}}
                </div>
              </div>
            </div>
            <!--发布者信息E-->
            <!--详情S-->
            <div class="now_detail">
              {{content.momentMessage}}
            </div>
            <div v-for="item in content.momentImgList">
              <img :src="item" class="now_detailPic"/>
            </div>
            <!--详情E-->
            <div class="contentIconInfo">
              <!--阅读数量-->
              <img src="../../../../static/images/discover/eye.png" class="f_left"/>
              <span class="f_left">{{content.readNum}}</span>
              <!--是否点赞以及点赞数量-->
              <span class="f_right">{{content.likeNum}}</span>
              <img v-if="content.likeStatus" src="../../../../static/images/discover/nozan.png" class="f_right" @click="giveArticleLike">
              <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeArticleLike">
            </div>
        </div>
        <!--评论S-->
        <div class="comment" id="commentTop">
      <p class="all_comment">全部评论 ({{conmmentsList.length}})</p>
      <div class="comment_wrap" v-for="(item,index) in conmmentsList">
        <!--评论者信息S-->
        <div class="comment_userinfo">
          <div class="user_head">
            <div @click="changeUserStartId(item.user.user_id)">
              <img v-if="item.user && item.user.head_image" :src="item.user.head_image" />
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
        <!--评论内容和回复内容S-->
        <div class="comment_content">
          <p @click="commentbtnBack(item.id)">{{item.message}}</p>
          <div v-if="item.reverts && item.reverts.length>0">
            <div class="comment_msg">
              <div v-for="(back,index) in item.reverts.slice(0,3)">
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
                        <span>尚未设置昵称:</span><br>
                      </span>
                    </span>
                <span class="font_2" @click="commentbtnBack(item.id,back.id)">{{back.message}}</span>
                <span v-if="back.user && userId == back.user.user_id">
                        <span @click="deleteComment(back.id)" class="font_1">删除</span>
                    </span>
              </div>
              <div class="allHideComment" v-if="item.reverts && item.reverts.length>3" @click="toCommentList(item.id)">
                全部{{item.reverts.length}}条评论>
              </div>
            </div>
          </div>
        </div>
        <!--评论内容和回复内容E-->
        <div class="interval_002"></div>
      </div>
    </div>
  </div>
  <div style="height: 1rem;"></div>
  <!--评论E-->
  <!--评论输入框S-->
  <!--<DiscCommentBox ref="commentbox"></DiscCommentBox>-->
  <div id="commentBg" @click="closeComment" />
  <div class="flex contentcenter myInput" id="myInput">
    <input autofocus="autofocus" ref="commentfocus" id="comment" type="text" v-model="commentMsg" @click="commentbtn" placeholder="写评论..."/>
    <span class="send" @click="comment">发送</span>
  </div>
  <!--评论输入框E-->
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
          this.$router.push({path:'/mystart'});
        }else{
          this.$store.state.UserStartId = id;
          this.$router.push({
            path: '/userstart'
          });
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
        /*this.$store.state.UserStartId = _this.manageId;
        this.$router.push('/inform');*/
        this.$store.state.UserStartId = userId;
        this.$router.push({path:"/inform",query:{id:this.manageId}})
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
            _this.closeComment();
          } else {
            MessageBox('提示', res.data.errorMsg);
            _this.isDisable = false;
            _this.closeComment();

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
        $("#commentBg").show();
        $("#comment").focus();
      },
      //点击回复
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
      //分享弹出
      onShareClick: function (index) {
        this.indexNum = index;
        var showId = '#share_person'+index;
        $(showId).show();
        console.log(showId)
        $("#bgShare").show();
        $("#myInput").hide();
      },
      //分享关闭
      bgHide: function () {
        var showId = '#share_person'+this.indexNum;
        $(showId).hide();
        $("#bgShare").hide();
        $("#myInput").show();
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
</style>
