<template>
  <!--评论S-->
  <div class="comment" id="commentTop">
    <p class="all_comment">全部评论 ({{conmmentsList.length}})</p>
    <div class="comment_wrap" v-for="(item,index) in conmmentsList">
      <!--评论者信息S-->
      <div class="comment_userinfo">
        <div class="user_head">
          <div @click="changeUserStartId(item.user.user_id)">
            <span v-if="item.user && item.user.head_image">
              <img :src="item.user.head_image" />
            </span>
            <img v-else src="../../../static/images/discover/normalhead.png" />
            <!--加V-->
            <img v-if="item.user && item.user.vflag.indexOf('V') != -1" src="../../../static/images/discover/v.png" class="head_list"/>
          </div>
        </div>
        <div class="user_info">
          <div v-if="item.user" class="user_name">
            {{item.user.nick_name}}
          </div>
          <div v-else class="user_name">
            尚未设置昵称
          </div>
          <span v-if="item.user && item.user.vflag.indexOf('JAC') != -1" class="jac">JAC</span>
          <div class="operation_comment">
            <div v-if="item.deleteFlag == 0">
              <img v-if="item.likeStatus" src="../../../static/images/discover/nozan.png" class="w_04 mr_16 v_m f_left"
                @click="giveCommentLike(item.id,index)" />
              <img v-else src="../../../static/images/discover/zan.png" class="w_04 mr_16 v_m f_left" @click="removeCommentLike(item.id,index)" />
              <span style="font-size: 0.28rem;">{{item.likeNum}}</span>
            </div>
          </div>
          <div class="user_date">
            {{item.commentTime}}
            <span v-if="item.user && $store.state.userId == item.user.user_id && item.deleteFlag != 1">
              <span @click="deleteComment(item.id)" class="font_1">删除</span>
            </span>
          </div>
        </div>
      </div>
      <!--评论者信息E-->
      <!--评论内容和回复内容S-->
      <div class="comment_content">
        <p :class="{'fontStyleItalic': item.deleteFlag == 1}" @click="commentbtnBack(item.id, undefined, item.deleteFlag)">{{item.message}}</p>
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
                  <span v-else>尚未设置昵称:</span><br>
                </span>
              </span>
              <span :class="{'fontStyleItalic': back.deleteFlag == 1}" class="font_2" @click="commentbtnBack(item.id, back.id, back.deleteFlag)">{{back.message}}</span>
              <span v-if="back.user && $store.state.userId == back.user.user_id && back.deleteFlag != 1">
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
  <!--评论E-->
</template>

<script>
  export default {
    props: ['conmmentsList'],
    methods: {
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
      //给评论点赞
      giveCommentLike: function (commentsId, index) {
        this.$emit('giveCommentLike', commentsId, index)
      },
      //给评论取消点赞
      removeCommentLike: function (commentsId, index) {
        this.$emit('removeCommentLike', commentsId, index)
      },
      //删除评论
      deleteComment: function (id) {
        this.$emit('deleteComment', id)
      },
      //点击回复
      commentbtnBack(id, backId, deleteFlag) {
        if(deleteFlag == 1){
          return
        }
        this.$emit('commentbtnBack', id, backId)
      },
      toCommentList: function (id) {
        this.$router.push({
          path: "/component/commentList",
          query: {
            id: id
          }
        })
      }
    }
  }

</script>

<style scoped>
  @import "../../../static/css/discover/detail.css";
  .head_list{
    width: 0.2rem !important;
    height: 0.2rem !important;
    position: relative;
    right: -0.54rem;
    bottom: 0.1rem;
  }
</style>
