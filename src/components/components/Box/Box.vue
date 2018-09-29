<template>
  <div infinite-scroll-immediate-check v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"
    infinite-scroll-distance="80">
    <comment :recordsTotal="recordsTotal" :conmmentsList="conmmentsList" @giveCommentLike="giveCommentLike"
      @removeCommentLike="removeCommentLike" @deleteComment="deleteComment" @commentbtnBack="commentbtnBack"></comment>
    <my-input ref="MyInput" v-model="commentMsg" @comment="comment"></my-input>
  </div>
</template>

<script>
  import {
    MessageBox,
    Toast
  } from 'mint-ui';
  import Comment from '@/components/components/Comment/Comment'
  import MyInput from '@/components/components/MyInput/MyInput'

  export default {
    props: ['urlObj'],
    components: {
      Comment,
      MyInput
    },
    data() {
      return {
        conmmentsList: [],
        recordsTotal: 0,
        fId: null,
        bId: null,
        commentMsg: '',
        loading: false,
        isLastPage: false,
        listParams: {
          "uid": this.$store.state.userId,
          "lid": this.$route.query.id,
          pageNo: 1,
          length: 5
        },
        index: null,
        userInfo: null
      }
    },
    created() {
      this.getUserInfo()
    },
    methods: {
      /**
       * 获取用户信息 
       */
      getUserInfo() {
        this.$http.get(this.urlObj.getUserInfo, {
          params: {
            uid: this.$store.state.userId
          }
        }).then((res) => {
          this.userInfo = res.data.data
        });
      },
      loadMore() {
        if (this.isLastPage) {
          return
        }
        this.getComments()
      },
      getList(params, callback) {
        this.$http.post(this.urlObj.getList, params).then((res) => {
          callback(res)
        });
      },
      // 获取评论列表
      getComments: function () {
        this.loading = true
        this.getList(this.listParams, (res) => {
          this.loading = false
          if (res.data.status) {
            this.conmmentsList.push(...res.data.data);
            this.recordsTotal = res.data.recordsTotal
            if (this.recordsTotal != 0) {
              if (this.recordsTotal != this.conmmentsList.length) {
                this.listParams.pageNo++
              } else {
                this.isLastPage = true
              }
            } else {
              if (this.listParams.pageNo == 1) {
                this.isLastPage = true
              }
            }
          } else {
            console.log(res.data.errorMsg);
          }
        })
      },
      // 给评论点赞
      giveCommentLike: function (commentsId, index) {
        this.$http.post(this.urlObj.addLike, {
          "uid": this.$store.state.userId,
          "lid": commentsId
        }).then((res) => {
          if (res.data.status) {
            this.conmmentsList[index].likeNum = res.data.data.num;
            this.conmmentsList[index].likeStatus = false;
          } else {
            if (this.$store.state.userId == null) {
              this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      // 给评论取消点赞
      removeCommentLike: function (commentsId, index) {
        this.$http.post(this.urlObj.delLike, {
          "uid": this.$store.state.userId,
          "lid": commentsId
        }).then((res) => {
          if (res.data.status) {
            this.conmmentsList[index].likeNum = res.data.data.num;
            this.conmmentsList[index].likeStatus = true;
          } else {
            if (this.$store.state.userId == null) {
              this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      // 删除评论
      deleteComment: function (id, index, backIndex) {
        this.$http.post(this.urlObj.delCom, {
          id
        }).then((res) => {
          if (res.data.status) {
            Toast('删除成功');
            if (backIndex !== undefined) {
              const pageNo = Math.ceil((index + 1) / 5)
              const currIndex = index % 5

              this.getList({
                ...this.listParams,
                pageNo
              }, (res) => {
                if (res.data.status) {
                  this.conmmentsList = this.conmmentsList.map((conmment, conmmentIndex) => {
                    if (index == conmmentIndex) {
                      return res.data.data[currIndex]
                    }
                    return conmment
                  })
                } else {
                  console.log(res.data.errorMsg);
                }
              })
            } else {
              this.conmmentsList = this.conmmentsList.filter((conmment, conmmentIndex) => {
                return index != conmmentIndex
              })
              this.recordsTotal--
            }
          } else {
            if (this.$store.state.userId == null) {
              this.toLogin();
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      // 点击回复
      commentbtnBack(id, backId, index) {
        this.fId = id;
        this.bId = backId;
        this.index = index
        this.$refs['MyInput'].focus()
      },
      comment() {
        if (!this.$store.state.userId) {
          this.toLogin();
          return false;
        }
        var concatId = null;
        if (this.bId) {
          concatId = this.fId + "," + this.bId;
        } else {
          concatId = this.fId;
        }
        this.$http.post(this.urlObj.addCom, {
          "uid": this.$store.state.userId,
          "lid": this.$route.query.id,
          "message": this.commentMsg,
          "id": concatId
        }).then((res) => {
          const index = this.index

          this.$refs['MyInput'].blur()
          this.fId = null;
          this.bId = null
          this.index = null
          if (res.data.status) {
            if (concatId) {
              const pageNo = Math.ceil((index + 1) / 5)
              const currIndex = index % 5

              this.getList({
                ...this.listParams,
                pageNo
              }, (res) => {
                if (res.data.status) {
                  this.conmmentsList = this.conmmentsList.map((conmment, conmmentIndex) => {
                    if (index == conmmentIndex) {
                      return res.data.data[currIndex]
                    }
                    return conmment
                  })
                } else {
                  console.log(res.data.errorMsg);
                }
              })
            } else {

              this.getList({
                ...this.listParams,
                pageNo: 1,
                length: 1
              }, (res) => {
                if (res.data.status) {
                  this.conmmentsList.unshift(res.data.data[0])
                  this.recordsTotal = res.data.recordsTotal
                } else {
                  console.log(res.data.errorMsg);
                }
              })
            }
          } else {
            MessageBox('提示', "请登录");
          }
        });
      }
    }
  }

</script>
