<template>
  <div class="all">
    <!--<div @click="bgHide" id="bgShareInfo" style="position: fixed; width: 100%;height: 100%;background: black; display: none;opacity: 0"></div>-->
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
      :topDistance="80">
      <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" class="down-frash">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div v-infinite-scroll="getNextList" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
        <!--资讯列表S-->
        <div v-for="(item,index) in informationList" :key="index" @click="handleRecordIndex(index)">

          <div class="boxInfo" v-if="item.manageType == 3">
            <div>
              <p class="listTitleInfo">
                {{item.manageTitle.slice(0,46)}}
                <span v-if="item.manageTitle.length>46">...</span>
              </p>
              <div class="listPic312" style="height:4rem">
                <my-video ref="myVideo" :index="index" :imgUrl="item.imgUrl" :manageBody="item.manageBody"
                  @addPageviews="addPageviews" @closeOther="closeOther"></my-video>
              </div>
            </div>
            <div class="listIconInfo">
              <!--阅读数量-->
              <img src="../../../../static/images/discover/eye.png" class="f_left" />
              <span class="f_left">{{item.readNum}}</span>
              <!--是否点赞以及点赞数量-->
              <span class="f_right">{{item.likeNum}}</span>
              <img v-if="item.likeStatus == 0" src="../../../../static/images/discover/nozan.png" class="f_right"
                @click="giveInformationLike(item.manageId,index)" />
              <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeInformationLike(item.manageId,index)" />
            </div>
          </div>

          <div class="boxInfo" v-else>
            <div @click="toDetail(item.manageId, index)">
              <p class="listTitleInfo">
                {{item.manageTitle.slice(0,46)}}
                <span v-if="item.manageTitle.length>46">...</span>
              </p>
              <div class="listPic312">
                <lazy-img :imgUrl="item.imgUrl"></lazy-img>
              </div>
              <!-- <img class="listPic312" :src="item.imgUrl" /> -->
            </div>
            <div class="listIconInfo">
              <!--阅读数量-->
              <img src="../../../../static/images/discover/eye.png" class="f_left" />
              <span class="f_left">{{item.readNum}}</span>
              <!--是否点赞以及点赞数量-->
              <span class="f_right">{{item.likeNum}}</span>
              <img v-if="item.likeStatus == 0" src="../../../../static/images/discover/nozan.png" class="f_right"
                @click="giveInformationLike(item.manageId,index)" />
              <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeInformationLike(item.manageId,index)" />
            </div>
          </div>

        </div>
        <!--资讯列表E-->
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import {
    MessageBox,
    Toast
  } from 'mint-ui';
  import shareBox from '../component/shareBox.vue';
  import MyVideo from '@/components/components/myVideo/MyVideo'
  import LazyImg from '@/components/discover/component/LazyImg'

  let shareIndex = "";
  export default {
    name: "Information",
    data() {
      return {
        userId: this.$store.state.userId,
        pageNum: 1,
        allLoaded: false,
        loadEnd: false,
        loading: false,
        informationList: [],
        list: 4,
        topStatus: '',
        flag: 'information',
        type: 'information',
        value: null,
        _index: null
      }
    },
    components: {
      shareBox,
      MyVideo,
      LazyImg
    },
    methods: {
      /**
       * 打开一个视频关闭其他视频
       */
      closeOther(index) {
        this.$refs['myVideo'].forEach((myVideo, i) => {
          if (i != index) {
            myVideo.player.pause()
          }
        })
      },
      getReadNum: function (manageId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationRead, {
          "uid": _this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.informationList[index].readNum = res.data.data;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      /**
       * set浏览量
       */
      addPageviews(index) {
        this.getReadNum(this.informationList[index].manageId, index)
      },
      toDetail: function (id, index) {
        this._index = index
        this.$router.push({
          path: "/information/informationDetail",
          query: {
            id: id
          }
        })
      },
      loadTop() {
        this.getRefreshList();
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {},
      handleTopChange(status) {
        this.topStatus = status;
      },
      getRefreshList: function () {
        //获取资讯列表第一页
        let _this = this;
        this.loading = true;
        this.loadEnd = false;
        this.$http.post(INDEXMESSAGE.getInfomation, {
          "uid": this.$store.state.userId,
          "pageNo": 1,
          "length": _this.list,
          labelIds: this.$store.state.selectLabelState
        }).then(function (res) {
          if (res.data.status) {
            _this.pageNum = 1;
            _this.loading = false;
            _this.informationList = res.data.data;

            _this.$nextTick(function () {
              _this.$root.eventHub.$emit('closePlayer', '/information')
            })

            if (res.data.recordsTotal <= _this.list) {
              _this.loadEnd = true;
            }
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      //资讯刷新翻页
      getNextList: function () {
        if (this.$router.currentRoute.path != '/information') {
          return
        }
        let _this = this;
        if (this.loadEnd) {
          this.loadBottom();
          return;
        }
        this.loadEnd = true;
        this.pageNum++;
        this.$http.post(INDEXMESSAGE.getInfomation, {
          "uid": this.$store.state.userId,
          "pageNo": _this.pageNum,
          "length": _this.list,
          labelIds: this.$store.state.selectLabelState
        }).then(function (res) {
          _this.loadEnd = false;
          if (res.data.status) {
            _this.informationList = _this.informationList.concat(res.data.data);
            var allPages = Math.ceil(res.data.recordsTotal / _this.list);
            if (allPages <= _this.pageNum) {
              _this.loading = true;
              _this.allLoaded = true;
              _this.loadEnd = true;
            }
          } else {
            _this.pageNum = _this.pageNum - 1;
            console.log(res.data.errorMsg);
          }
        });
      },
      //资讯点赞
      giveInformationLike: function (manageId, index) {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        this.$http.post(DISCOVERMESSAGE.informationGiveLike, {
          "uid": this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.informationList[index].likeNum = res.data.data.num;
            _this.informationList[index].likeStatus = 1;
          } else {
              MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //取消点赞
      removeInformationLike: function (manageId, index) {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        this.$http.post(DISCOVERMESSAGE.informationRemoveLike, {
          "uid": this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.informationList[index].likeNum = res.data.data.num;
            _this.informationList[index].likeStatus = 0;
          } else {
              MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //资讯收藏
      collection: function (manageId, index) {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        this.$http.post(DISCOVERMESSAGE.informationCollection, {
          "uid": this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.informationList[index].collectionStatus = false;
          } else {
              MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //资讯取消收藏
      messageBoxCofirm: function (manageId, index) {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        MessageBox.confirm('确定取消收藏?').then(action => {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.informationRemoveCollection, {
            "uid": this.$store.state.userId,
            "lid": manageId
          }).then(function (res) {
            if (res.data.status) {
              _this.informationList[index].collectionStatus = true;
              Toast('取消收藏成功');
            } else {
                MessageBox('提示', res.data.errorMsg);
            }
          });
        });
      },
      //分享
      onShareClick: function (index) {
        this.indexNum = index;
        var showId = '#share_information' + index;
        $(showId).show();
        $("#bgShareInfo").show();
      },
      bgHide: function () {
        var showId = '#share_information' + this.indexNum;
        $(showId).hide();
        $("#bgShareInfo").hide();
      },
      /**
       * 记录index
       */
      handleRecordIndex(index) {
        this._index = index
      },
    },
    computed: {
      selectLabelState() {
        return this.$store.state.selectLabelState
      }
    },
    watch: {
      selectLabelState() {
        this.getRefreshList()
      },
      ['$route'](to, from) {
        if (from.path == '/information/informationDetail') {
          this.$http.post(DISCOVERMESSAGE.informationDetail, {
            "uid": this.$store.state.userId,
            "id": from.query.id
          }).then((res) => {
            // console.log(res)
            if (res.data.status) {
              const {
                data: {
                  data: {
                    readNum
                  }
                }
              } = res

              this.informationList[this._index].readNum = readNum
            } else {
              console.log(res.data.errorMsg);
            }
          });
        }
      }
    },
    mounted() {
      console.log('information')
      this.$nextTick(function () {
        this.getRefreshList()
      })
    }
  }

</script>

<style scoped>
  @import "./../../../../static/css/discover/all.css";

  .channel {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    font-size: .36rem;
    color: #555555;
  }

  .base-line {
    height: .02rem;
    background: #F1F1F1;
    width: 100%;
  }

  .btn {
    width: 100%;
    display: flex;
    text-align: center;
  }

  .btn p {
    flex: 1;
    width: 100%;
    font-size: .32rem;
  }

  .btn p:nth-child(1) {
    color: #888888;
  }

  .btn p:nth-child(1) {
    color: #49BBFF;
    ;
  }

</style>
