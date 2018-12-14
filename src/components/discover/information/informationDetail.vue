<template>
  <div>
    <div @click="bgHide" id="bgShare" style="position: fixed; width: 100%;height: 100%;background: #000000; display: none;opacity: 0.2"></div>
    <div>
      <my-header :id="'asd'" :title="title" :isShow="isShow" :rightPic="rightPic">
        <!-- <img slot="backblue" v-show="rightPic" src="../../../../static/images/discover/backfff.png" />
        <img slot="backblue" v-show="!rightPic" src="../../../../static/images/discover/backblue.png" /> -->

        <img slot="share" v-show="leftPic" src="../../../../static/images/discover/morefff.png" @click="onShareClick(0)" />
        <img slot="share" v-show="!leftPic" src="../../../../static/images/discover/moreblue.png" @click="onShareClick(0)" />
      </my-header>
      <!--分享组件-->
      <shareBox :index="0" :item="content" :flag="flag" :type="type" :collectionStatus="content.collectionStatus"
        :isCenter="true" @closeShare="bgHide" @collection="collection" @reCollection="messageBoxCofirm"></shareBox>
      <!--资讯详情S-->
      <img :src="content.imgUrl" style="width: 100%;" id="bgImg" />
      <div class="wrap_92">
        <!--内容S-->
        <p class="title_info">
          {{content.manageTitle}}
        </p>
        <p class="date_info">
          {{content.issuedDate}}
        </p>
        <p v-if="content.manageType == 2" ref="content" class="content" >
          <iframe :src="content.manageBody" style="width: 100%;min-height: 714px;border: none;"></iframe>
        </p>
        <p v-else ref="content" class="content" v-html="content.manageBody">
        </p>
        <div class="contentIconInfo">
          <!--阅读数量-->
          <img src="../../../../static/images/discover/eye.png" class="f_left" />
          <span class="f_left">{{content.readNum}}</span>
          <!--是否点赞以及点赞数量-->
          <span class="f_right">{{content.likeNum}}</span>
          <img v-if="content.likeStatus" src="../../../../static/images/discover/nozan.png" class="f_right" @click="giveArticleLike">
          <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeArticleLike">
        </div>
        <!--内容E-->
        <!--评论S-->
        <comment :conmmentsList="conmmentsList" @giveCommentLike="giveCommentLike" @removeCommentLike="removeCommentLike"
          @deleteComment="deleteComment" @commentbtnBack="commentbtnBack"></comment>
        <!--评论E-->
      </div>
      <!--资讯详情E-->
    </div>
    <div style="height: 1rem;"></div>
    <!--评论输入框S-->
    <!--<DiscCommentBox ref="commentbox"></DiscCommentBox>-->
    <div id="commentBg" @click="closeComment" />
    <div class="flex contentcenter myInput" id="myInput">
      <input ref="commentfocus" id="comment" type="text" v-model="commentMsg" @click="commentbtn" placeholder="写评论..." />
      <span class="send" @click="comment">发送</span>
    </div>
    <!--评论输入框E-->
  </div>
</template>

<script>
  import DiscCommentBox from '../component/DiscCommentBox.vue';
  import Comment from '@/components/components/Comment'
  import {
    MessageBox
  } from 'mint-ui';
  import {
    Toast
  } from 'mint-ui';
  import shareBox from '../component/shareBox.vue';
  export default {
    name: "disc-detail",
    data() {
      return {
        listNum: 1,
        manageId: '',
        content: [],
        imgTemp: '../../../static/images/1.jpg',
        conmmentsList: [],
        fId: null,
        bId: null,
        rows: 1,
        commentMsg: '',
        flag: 'information',
        type: 'information',
        userId: this.$store.state.userId,
        isDisable: false,
        leftPic: true,
        rightPic: true,
        bgImgHeight: 0,
        title: '',
        isShow: true
      }
    },
    created() {
      this.manageId = this.$route.query.id;
    },
    components: {
      shareBox,
      DiscCommentBox,
      Comment
    },
    methods: {
      CommentBoxchange() {
        this.$store.dispatch('showcommentBox')
        this.$refs.commentbox.boxfocus();
      },
      toCommentList: function (id) {
        this.$router.push({
          path: "/component/commentList",
          query: {
            id: id
          }
        })
      },
      //资讯收藏
      collection: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationCollection, {
          "uid": _this.userId,
          "lid": _this.manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.content.collectionStatus = 1;
            setTimeout(() => {
              _this.bgHide();
            }, 1500)
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //资讯取消收藏
      messageBoxCofirm: function () {
        //MessageBox.confirm('确定取消收藏?').then(action => {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationRemoveCollection, {
          "uid": _this.userId,
          "lid": _this.manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.content.collectionStatus = 0;
            setTimeout(() => {
              _this.bgHide();
            }, 1500)
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
          //});
        });
      },
      changeUserStartId(id) {
        console.log(id == this.$store.state.userId)
        if (id == this.$store.state.userId) {
          this.$router.push({
            path: '/mystart'
          });
        } else {
          this.$store.state.UserStartId = id;
          this.$router.push({
            path: '/userstart'
          });
        }
      },
      //详情
      getDetail: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationDetail, {
          "uid": _this.$store.state.userId,
          "id": _this.manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.content = res.data.data;
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      //删除评论
      deleteComment: function (id) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.deleteComment, {
          "id": id
        }).then(function (res) {
          if (res.data.status) {
            Toast('删除成功');
            _this.getComments();
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //给文章点赞
      giveArticleLike: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationGiveLike, {
          "uid": _this.$store.state.userId,
          "lid": _this.manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.content.likeNum = res.data.data.num;
            _this.content.likeStatus = false;
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //给文章取消点赞
      removeArticleLike: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationRemoveLike, {
          "uid": _this.$store.state.userId,
          "lid": _this.manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.content.likeNum = res.data.data.num;
            _this.content.likeStatus = true;
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //给评论点赞
      giveCommentLike: function (commentsId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationCommentGiveLike, {
          "uid": _this.$store.state.userId,
          "lid": commentsId
        }).then(function (res) {
          if (res.data.status) {
            _this.conmmentsList[index].likeNum = res.data.data.num;
            _this.conmmentsList[index].likeStatus = false;
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //给评论取消点赞
      removeCommentLike: function (commentsId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationCommentRemoveLike, {
          "uid": _this.$store.state.userId,
          "lid": commentsId
        }).then(function (res) {
          if (res.data.status) {
            _this.conmmentsList[index].likeNum = res.data.data.num;
            _this.conmmentsList[index].likeStatus = true;
          } else {
            if (_this.$store.state.userId == null) {
              _this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //浏览量
      getReadNum: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationRead, {
          "uid": _this.$store.state.userId,
          "lid": _this.manageId
        }).then(function (res) {
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
        this.$http.post(DISCOVERMESSAGE.informationCommentList, {
          "uid": _this.$store.state.userId,
          "lid": _this.manageId
        }).then(function (res) {
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
        if (!_this.$store.state.userId) {
          _this.toLogin();
          return false;
        }
        _this.isDisable = true;
        if (_this.msgIsNull(_this.commentMsg)) {
          MessageBox('提示', "评论内容不能为空");
          _this.isDisable = false
          return false;
        }
        var concatId = null;
        if (_this.bId) {
          concatId = _this.fId + "," + _this.bId;
        } else {
          concatId = _this.fId;
        }
        this.$http.post(DISCOVERMESSAGE.informationComment, {
          "uid": _this.$store.state.userId,
          "lid": _this.manageId,
          "message": _this.commentMsg,
          "id": concatId
        }).then(function (res) {
          if (res.data.status) {
            _this.fId = null;
            setTimeout(() => {
              _this.getComments();
              _this.isDisable = false;
            }, 1000)
            _this.closeComment();
            window.scrollTo(0, $("#commentTop").offset().top);
          } else {
            MessageBox('提示', "请登录");
            _this.isDisable = false;
            _this.closeComment();
          }
        });
      },
      msgIsNull: function (str) {
        if (str == "") return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
      },
      //点击评论
      commentbtn() {
        $("#commentBg").show();
        $("#comment").focus();
      },
      //点击回复
      commentbtnBack(id, backId) {
        $("#commentBg").show();
        $("#comment").focus();
        this.fId = id;
        this.bId = backId;
      },
      //取消评论
      closeComment() {
        $("#commentBg").hide();
        $("#id_pl_icon").show();
        this.commentMsg = '';
      },
      //分享弹出
      onShareClick: function (index) {
        this.indexNum = index;
        var showId = '#share_information' + index;
        $(showId).show();
        console.log(showId)
        $("#bgShare").show();
        $("#myInput").hide();
      },
      //分享关闭
      bgHide: function () {
        var showId = '#share_information' + this.indexNum;
        $(showId).hide();
        $("#bgShare").hide();
        $("#myInput").show();
      },
      //返回上一级
      goBack: function () {
        this.$router.go(-1);
        this.$store.dispatch("showFoot")
      },
      handleScroll() {
        var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
        var scrollHeight = (scrollTop / this.bgImgHeight).toFixed(1);
        if (scrollHeight == 0.0) {
          scrollHeight = 0;
        } else if (scrollHeight > 0.9) {
          scrollHeight = 1;
        }
        if (scrollHeight > 0.4) {
          this.leftPic = false;
          this.rightPic = false;
        } else if (scrollHeight <= 0.4) {
          this.leftPic = true;
          this.rightPic = true;
        }
        if (scrollHeight == 1) {
          this.title = '资讯详情'
          this.isShow = false
        } else {
          this.title = ''
          this.isShow = true
        }
        $("#asd").css("background", `rgba(255, 255, 255, ${scrollHeight})`)
      },
    },
    /*beforeRouteLeave(to, from, next) {
      if (to.path == "/discover/index") {
        to.meta.keepAlive = true;
      } else {
        to.meta.keepAlive = false;
      }
      next();
    },*/
    mounted() {
      this.$store.dispatch("hideFoot"),
        /*悬浮,更换头部背景透明度和文字*/
        window.addEventListener('scroll', this.handleScroll)
      //初始化数据
      this.$nextTick(function () {
        this.getDetail();
        this.getReadNum();
        this.getComments();
        //this.$store.state.commentboxflag = true;
      })
    },
    updated() {
      this.$nextTick(() => {
        const content = this.$refs.content
        const h1 = content.querySelector('h1')
        const spans = content.querySelectorAll('span')
        const imgs = content.querySelectorAll('img')

        if (h1) {
          h1.style['line-height'] = h1.style['font-size']
        }
        for (let span of spans) {
          span.style['white-space'] = 'normal'
        }
        for (let img of imgs) {
          img.style['width'] = '100%'
          img.style['height'] = 'auto'
        }

        const bgImg = document.querySelector('#bgImg')
        const asd = document.querySelector('#asd')

        this.bgImgHeight = bgImg.getBoundingClientRect().height - asd.getBoundingClientRect().height
      })
    }
  }

</script>

<style scoped>
  @import "./../../../../static/css/discover/detail.css";

</style>
