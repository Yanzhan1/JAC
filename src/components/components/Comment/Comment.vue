<template>
  <!--评论S-->
  <div class="comment" id="commentTop">
    <p class="all_comment">全部评论 ({{recordsTotal}})</p>
    <div class="comment_wrap" v-for="(item,index) in conmmentsList" :key="index">
      <!--评论者信息S-->
      <div class="comment_userinfo">
        <div class="user_head">
          <div @click="changeUserStartId(item.user.user_id)">
            <span v-if="item.user && item.user.head_image">
              <img :src="item.user.head_image" />
            </span>
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
              <img v-if="item.likeStatus" src="../../../../static/images/discover/nozan.png" class="w_04 mr_16 v_m f_left"
                @click="giveCommentLike(item.id,index)" />
              <img v-else src="../../../../static/images/discover/zan.png" class="w_04 mr_16 v_m f_left" @click="removeCommentLike(item.id,index)" />
              <span style="font-size: 0.28rem;">{{item.likeNum}}</span>
            </div>
          </div>
          <div class="user_date">
            {{item.commentTime | formatDate('YYYY-MM-DD HH:mm:ss')}}
            <span v-if="item.user && $store.state.userId == item.user.user_id">
              <span @click="deleteComment(item.id , index)" class="font_1">删除</span>
            </span>
          </div>
        </div>
      </div>
      <!--评论者信息E-->
      <!--评论内容和回复内容S-->
      <div class="comment_content">
        <p @click="commentbtnBack(item.id, undefined, index)">{{item.message}}</p>
        <div v-if="item.reverts && item.reverts.length>0">
          <div class="comment_msg">
            <div v-for="(back,backIndex) in item.reverts.slice(0,3)" :key="backIndex">
              <span class="font_1">
                <span>
                  <span @click="changeUserStartId(back.user.user_id)">
                    <span v-if="back.user.nick_name">{{back.user.nick_name}}</span>
                    <span v-else>尚未设置昵称:</span>
                  </span>
                </span>
                <span v-if="backIndex!=0 && back.beCommentUser" @click="changeUserStartId(back.beCommentUser.user_id)">
                  &nbsp;&nbsp;回复&nbsp;&nbsp;
                  <span v-if="back.beCommentUser.nick_name">{{back.beCommentUser.nick_name}}</span>
                  <span v-else>尚未设置昵称:</span><br>
                </span>
              </span>
              <span class="font_2" @click="commentbtnBack(item.id,back.id, index)">{{back.message}}</span>
              <span v-if="back.user && $store.state.userId == back.user.user_id">
                <span @click="deleteComment(back.id, index, backIndex)" class="font_1">删除</span>
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
    props: ['conmmentsList', 'recordsTotal'],
    methods: {
      changeUserStartId(id) {
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
      deleteComment: function (id, index, backIndex) {
        this.$emit('deleteComment', id, index, backIndex)
      },
      //点击回复
      commentbtnBack(id, backId, index) {
        this.$emit('commentbtnBack', id, backId, index)
      },
      toCommentList: function (id) {
        this.$router.push({
          path: "/component/commentList",
          query: {
            id
          }
        })
      }
    }
  }

</script>

<style scoped>
  @import "../../../../static/css/discover/detail.css";
</style>
