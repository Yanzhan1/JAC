<template>
  <div class="all" style="word-break:break-all;">
    <!--推荐-->
    <div @click="bgHide" id="bgShareReco" style="position: fixed; width: 100%;height: 100%;background: black; display: none;opacity: 0"></div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
      :topDistance="80">
      <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="font-size: 0.3rem;visibility: hidden">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div v-infinite-scroll="loadmore" :infinite-scroll-disabled="loading" infinite-scroll-distance="80">
        <div v-if="recommendList.length==0">
          <div style="height: 8rem;"></div>
        </div>
        <!--内容S-->
        <div v-for="(item,index) in recommendList" :key="index" @click="handleRecordIndex(index)">
          <!--资讯列表S-->
          <div v-if="item.recommendType==1">

            <div class="boxInfo" v-if="item.manageType == 3">
              <p class="listTitleInfo">
                {{item.title.slice(0,46)}}
                <span v-if="item.title.length>46">...</span>
              </p>

              <div class="listPic312" style="height:4rem">
                <my-video ref="myVideo" :index="index" :imgUrl="item.pictureUrl" :manageBody="item.manageBody"
                  @addPageviews="addPageviews" @closeOther="closeOther"></my-video>
              </div>

              <div class="listIconInfo">
                <!--阅读数量-->
                <img src="../../../../static/images/discover/eye.png" class="f_left" />
                <span class="f_left">{{item.readNum}}</span>
                <!--是否点赞以及点赞数量-->
                <span class="f_right">{{item.likeNum}}</span>
                <img v-if="item.likeStatus" src="../../../../static/images/discover/nozan.png" class="f_right" @click="giveInformationLike(item.id, index, 2)" />
                <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeInformationLike(item.id, index, 2)" />
              </div>
            </div>

            <div class="boxInfo" v-else>
              <p class="listTitleInfo" @click="toDetailInfo(item.id)">
                {{item.title.slice(0,46)}}
                <span v-if="item.title.length>46">...</span>
              </p>
              <div class="listPic312" @click="toDetailInfo(item.id)">
                <lazy-img :imgUrl="item.pictureUrl"></lazy-img>
              </div>
              <!-- <img class="listPic312" @click="toDetailInfo(item.id)" :src="item.pictureUrl" /> -->
              <div class="listIconInfo">
                <!--阅读数量-->
                <img src="../../../../static/images/discover/eye.png" class="f_left" />
                <span class="f_left">{{item.readNum}}</span>
                <!--是否点赞以及点赞数量-->
                <span class="f_right">{{item.likeNum}}</span>
                <img v-if="item.likeStatus" src="../../../../static/images/discover/nozan.png" class="f_right" @click="giveInformationLike(item.id, index, 2)" />
                <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeInformationLike(item.id, index, 2)" />
              </div>
            </div>

          </div>
          <!--资讯列表E-->
          <!--活动列表S-->
          <div v-if="item.recommendType==0">
            <div class="boxInfo">
              <p class="listTitleInfo" @click="toActDetail(item.id,item.manageType)">
                {{item.title.slice(0,46)}}
                <span v-if="item.title.length>46">...</span>
              </p>
              <div class="listPic312" @click="toActDetail(item.id,item.manageType)">
                <lazy-img :imgUrl="item.pictureUrl"></lazy-img>
              </div>
              <!-- <img class="listPic312" @click="toActDetail(item.id,item.manageType)" :src="item.pictureUrl" /> -->
              <div class="listIconActivity">
                <!--报名中-->
                <div v-if="item.activityState==0">
                  <img src="../../../../static/images/discover/date1.png" class="f_left" />
                  <span class="f_left">{{item.planDate}}</span>
                  <span class="f_right">报名中</span>
                  <img src="../../../../static/images/discover/start1.png" class="f_right" />
                </div>
                <!--已开始-->
                <div v-if="item.activityState==1">
                  <img src="../../../../static/images/discover/date2.png" class="f_left" />
                  <span class="f_left">{{item.planDate}}</span>
                  <span class="f_right">已开始</span>
                  <img src="../../../../static/images/discover/start2.png" class="f_right" />
                </div>
                <!--已结束-->
                <div v-if="item.activityState==2">
                  <img src="../../../../static/images/discover/date3.png" class="f_left" />
                  <span class="f_left">{{item.planDate}}</span>
                  <span class="f_right">已结束</span>
                  <img src="../../../../static/images/discover/start3.png" class="f_right" />
                </div>
              </div>
            </div>
          </div>
          <!--活动列表E-->
          <!--社区列表S-->
          <div v-if="item.recommendType==2">
            <div class="boxInfo">
              <!--发布者信息S-->
              <div class="comment_userinfo">
                <div class="user_head">
                  <div @click="changeUserStartId(item.user.user_id)">
                    <img v-if="item.user" :src="item.user.head_image" class="head_72" />
                    <img v-else src="../../../../static/images/discover/normalhead.png" class="head_72" />
                  </div>
                </div>
                <div class="user_info">
                  <div v-if="item.user" class="user_name">
                    {{item.user.nick_name}}
                  </div>
                  <div v-else class="user_name">
                    尚未设置昵称
                  </div>
                  <div class="guanzhu">
                    <div v-if="item.user && userId != item.user.user_id">
                      <div v-if="item.focusType == 1" @click="removeFoucs(item.user.user_id,index)">
                        <img src="../../../../static/images/discover/ygz.png">
                        <span class="font_4">已关注</span>
                      </div>
                      <div v-else="content.focusStatus == 2" @click="removeFoucs(item.user.user_id,index)">
                        <img src="../../../../static/images/discover/ygz.png">
                        <span class="font_4">相互关注</span>
                      </div>
                      <div v-else @click="addFoucs(item.user.user_id,index)">
                        <img src="../../../../static/images/discover/jgz.png">
                        <span class="font_4">关注</span>
                      </div>
                    </div>
                  </div>
                  <div class="user_date">
                    {{item.issuedDate}}
                  </div>
                </div>
              </div>
              <!--发布者信息E-->
              <div @click="toDetail(item.id)" class="listTitleInfo">{{item.title}}</div>
              <div class="pics" v-if="item.momentImgList">
                <div v-if="item.momentImgList.length==1" v-for="imgItem in item.momentImgList">
                  <img @click="toNowDetail(item.id)" :src="imgItem" class="pic1" />
                </div>
                <div v-if="item.momentImgList.length==2">
                  <img @click="toNowDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic2_1" />
                  <img @click="toNowDetail(item.id)" :src="item.momentImgList[1]" class="pic2_2" />
                </div>
                <div v-if="item.momentImgList.length==3">
                  <img @click="toNowDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic3_1" />
                  <img @click="toNowDetail(item.id)" :src="item.momentImgList[1]" class="pic3_2" />
                  <img @click="toNowDetail(item.id)" :src="item.momentImgList[2]" class="pic3_3" />
                </div>
                <div v-if="item.momentImgList.length>3">
                  <div style="position: relative;">
                    <div style="color: #ffffff;right: 0.4rem;bottom: -3rem;position: absolute">
                      {{item.momentImgList.length}}
                    </div>
                    <img @click="toNowDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic3_1" />
                    <img @click="toNowDetail(item.id)" :src="item.momentImgList[1]" class="pic3_2" />
                    <img @click="toNowDetail(item.id)" :src="item.momentImgList[2]" class="pic3_3" />
                  </div>
                </div>
              </div>
              <!--阅读数量,是否点赞以及点赞数量S-->
              <div class="listIconInfo">
                <img src="../../../../static/images/discover/eye.png" class="f_left" />
                <span class="f_left">{{item.readNum}}</span>
                <span class="f_right">{{item.likeNum}}</span>
                <img v-if="item.likeStatus" src="../../../../static/images/discover/nozan.png" class="f_right" @click="giveMomentLike(item.id, index, 2)" />
                <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeMomentLike(item.id,index,2)" />
              </div>
              <!--阅读数量,是否点赞以及点赞数量E-->
            </div>
            <!-- <div :class="['box_1' ,item.momentImgList ? 'height_582' : 'height_27']">
                <div class="box_2" v-if="item.momentImgList">
                  <img @click="toNowDetail(item.id)" :src="item.momentImgList[0]"/>
                </div>
                <div class="box_3 height_188 thin_line">
                  <p class="title_now" @click="toNowDetail(item.id)">{{item.title}}</p>
                  <div class="operation_info">
                    &lt;!&ndash;阅读数量&ndash;&gt;
                    <img src="../../../../static/images/discover/eye.png" class="w_04 mr_006"/>
                    <span>{{item.readNum}}</span>
                    &lt;!&ndash;评论数量&ndash;&gt;
                    <img src="../../../../static/images/discover/comment.png" class="w_04 mr_006"/>
                    <span class="size_28">{{item.commentNum}}</span>
                    &lt;!&ndash;是否点赞以及点赞数量&ndash;&gt;
                    <img v-if="item.likeStatus" src="../../../../static/images/discover/nozan.png" class="w_04 mr_006" @click="giveMomentLike(item.id,index,2)">
                    <img v-else src="../../../../static/images/discover/zan.png" class="w_04 mr_006" @click="removeMomentLike(item.id,index,2)">
                    <span class="size_28">{{item.likeNum}}</span>
                  </div>
                </div>
                <div class="box_4 height_188">
                  <div class="operation_info">
                    <img src="../../../../static/images/discover/a.png" class="mr_16 f_left circle_4"/>
                    <span class="now_user f_left">探索家</span>
                    <span class="now_date">06-25</span>
                  </div>
                </div>
              </div>-->
          </div>
          <!--社区列表E-->
        </div>
        <!--内容E-->
        <bottom-loading :pageNo="listParams.pageNo" :loading="loading" :isLastPage="isLastPage"></bottom-loading>
      </div>
    </mt-loadmore>
    <!-- <div style="height: 1rem;"></div> -->
  </div>
</template>

<script>
  import moment from "moment";
  import {
    MessageBox,
    Toast
  } from 'mint-ui';
  import Header from '../../Header.vue';
  import shareBox from '../component/shareBox.vue';
  import MyVideo from '@/components/components/myVideo/MyVideo'
  import LazyImg from '@/components/discover/component/LazyImg'
  import BottomLoading from '@/components/discover/component/BottomLoading'

  export default {
    name: "Recommend",
    data() {
      return {
        userId: 0,
        pageNum: 1,
        allLoaded: false,
        loadEnd: false,
        loading: false,
        recommendList: [],
        list: 4,
        topStatus: '',
        showImg: false,
        imgSrc: '',
        flag: 'recommend',
        typeInfo: 'information',
        typeNow: 'now',
        _index: null,
        isLastPage: false, // 是不是最后一页
        listParams: { // 获取列表的参数
          pageNo: 1,
          length: 4
        }
      }
    },
    created(){
      this.getList()
    },
    components: {
      shareBox,
      MyVideo,
      LazyImg,
      BottomLoading
    },
    methods: {
      /**
       * 记录index
       */
      handleRecordIndex(index) {
        this._index = index
      },
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
      getReadNum: function (id, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.informationRead, {
          "uid": _this.$store.state.userId,
          "lid": id
        }).then(function (res) {
          if (res.data.status) {
            _this.recommendList[index].readNum = res.data.data;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      /**
       * set浏览量
       */
      addPageviews(index) {
        this.getReadNum(this.recommendList[index].id, index)
      },
      toDetailInfo: function (id) {
        this.$router.push({
          path: "/information/informationDetail",
          query: {
            id: id
          }
        })
      },
      toNowDetail: function (id) {
        this.$router.push({
          path: "/now/nowDetail",
          query: {
            id: id
          }
        })
      },
      toActDetail: function (id,activityType) {
        var path = '';
        if(activityType == 2){
          path = '/activity/activityLive';
        }else{
          path = '/activity/activityDetail';
        }
        this.$router.push({
          path: path,
          query: {
            activityId: id
          }
        })
      },
      self(id) {
        if (id == this.$store.state.userId) {
          return false;
        } else {
          return true;
        }
      },
      clickImg(e) {
        this.showImg = true;
        this.imgSrc = e.currentTarget.src;
      },
      viewImg() {
        this.showImg = false;
      },
      loadTop() {
        // this.getRefreshList();
        // this.$refs.loadmore.onTopLoaded();
        this.reset()
        this.getList()
      },
      loadBottom() {},
      handleTopChange(status) {
        this.topStatus = status;
      },
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
      //加关注
      addFoucs: function (foucsId, index) {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        this.$http.post(DISCOVERMESSAGE.focusOn, {
          "uid": this.$store.state.userId,
          "focusId": foucsId
        }).then(function (res) {
          if (res.data.status) {
            _this.recommendList[index].focusType = res.data.data;
            for (var i = 0; i < _this.recommendList.length; i++) {
              if (_this.recommendList[i].user.user_id == foucsId) {
                _this.recommendList[i].focusType = res.data.data;
              }
            }
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //取消关注
      removeFoucs: function (foucsId, index) {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        this.$http.post(DISCOVERMESSAGE.unFocus, {
          "uid": this.$store.state.userId,
          "focusId": foucsId
        }).then(function (res) {
          if (res.data.status) {
            _this.recommendList[index].focusType = res.data.data;
            for (var i = 0; i < _this.recommendList.length; i++) {
              if (_this.recommendList[i].user.user_id == foucsId) {
                _this.recommendList[i].focusType = res.data.data;
              }
            }
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //转换时间
      convert: function (date) {
        moment.locale('zh-cn');
        let beforeDate = date
        let newDate = moment(new Date()).valueOf()
        date = moment(date).valueOf()
        let twoDayDate = 172800000
        let oneDayDate = 86400000
        let oneMinute = 60000
        if (newDate - date > twoDayDate) {
          return beforeDate.substring(0, 5)
        }
        if (newDate - date > oneDayDate || newDate - date <= twoDayDate) {
          return beforeDate = '昨天'
        }
        if (newDate - date > oneMinute || newDate - date <= oneDayDate) {
          let data = moment(beforeDate, "YYYYMMDD").fromNow();
          return data
        }
        if (newDate - date < oneMinute) {
          return beforeDate = '刚刚'
        }
      },
      getRefreshList: function () {
        //获取推荐列表第一页
        let _this = this;
        this.loading = true;
        this.loadEnd = false;
        this.$http.post(INDEXMESSAGE.getRecommend, {
          "uid": this.$store.state.userId,
          "pageNo": 1,
          "length": _this.list,
          labelIds: this.$store.state.selectLabelState
        }).then(function (res) {
          if (res.data.status) {
            _this.pageNum = 1;
            _this.loading = false;
            _this.recommendList = res.data.data;

            _this.$nextTick(function(){
              _this.$root.eventHub.$emit('closePlayer', '/recommend')
            })

            for (let i = 0; i < _this.recommendList.length; i++) {
              _this.recommendList[i].issuedDate = _this.convert(_this.recommendList[i].issuedDate)
            }
            if (res.data.recordsTotal <= _this.list) {
              _this.loadEnd = true;
            }
          } else {
          }
        });
      },
      /**
       * 重置
       */
      reset() {
        this.listParams.pageNo = 1
        this.isLastPage = false
        this.recommendList = []
      },
      /**
       * 上拉加载更多
       */
      loadmore() {
        if (this.isLastPage || this.loading) {
          return
        }
        this.listParams.pageNo++
        this.getList()
      },
      /**
       * 获取列表
       */
      getList() {
        this.loading = true
        this.$http.post(INDEXMESSAGE.getRecommend, {
          "uid": this.$store.state.userId,
          "pageNo": this.listParams.pageNo,
          "length": this.listParams.length,
          labelIds: this.$store.state.selectLabelState
        }).then((res) => {
          this.loading = false
          if (res.data.status !== 1) {
            return
          }
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].createDate = this.convert(res.data.data[i].createDate)
          }
          this.recommendList.push(...res.data.data)
          if (this.recommendList.length >= res.data.recordsTotal) {
            this.isLastPage = true
          }
          this.$nextTick(() => {
            this.$refs.loadmore.onTopLoaded()
          })
        })
      },
      //推荐刷新翻页
      getNextList: function () {
        if (this.$router.currentRoute.path != '/recommend') {
          return
        }
        let _this = this;
        if (this.loadEnd) {
          this.loadBottom();
          return;
        }
        this.loadEnd = true;
        this.pageNum++;
        this.$http.post(INDEXMESSAGE.getRecommend, {
          "uid": this.$store.state.userId,
          "pageNo": _this.pageNum,
          "length": _this.list,
          labelIds: this.$store.state.selectLabelState
        }).then(function (res) {
          _this.loadEnd = false;
          if (res.data.status) {
            for (let i = 0; i < _this.recommendList.length; i++) {
              _this.recommendList[i].issuedDate = _this.convert(_this.recommendList[i].issuedDate)
            }
            _this.recommendList = _this.recommendList.concat(res.data.data);
            var allPages = Math.ceil(res.data.recordsTotal / _this.list);
            if (allPages <= _this.pageNum) {
              _this.loading = true;
              _this.allLoaded = true;
              _this.loadEnd = true;
            }
          } else {
            _this.pageNum = _this.pageNum - 1;
          }
        });
      },
      //资讯点赞
      giveInformationLike: function (manageId, index, flag) {
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
            if (flag == 1) {
              _this.informationList[index].likeNum = res.data.data.num;
              _this.informationList[index].likeStatus = false;
            } else if (flag == 2) {
              _this.recommendList[index].likeNum = res.data.data.num;
              _this.recommendList[index].likeStatus = false;
            }
          } else {
              MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //取消点赞
      removeInformationLike: function (manageId, index, flag) {
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
            if (flag == 1) {
              _this.informationList[index].likeNum = res.data.data.num;
              _this.informationList[index].likeStatus = true;
            } else if (flag == 2) {
              _this.recommendList[index].likeNum = res.data.data.num;
              _this.recommendList[index].likeStatus = true;
            }
          } else {
              MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //资讯收藏
      collection: function (manageId, index, flag) {
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
            if (flag == 1) {
              _this.informationList[index].collectionStatus = false;
            } else if (flag == 2) {
              _this.recommendList[index].collectionStatus = false;
            }
          } else {
              MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //资讯取消收藏
      messageBoxCofirm: function (manageId, index, flag) {
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
              if (flag == 1) {
                _this.informationList[index].collectionStatus = true;
              } else if (flag == 2) {
                _this.recommendList[index].collectionStatus = true;
              }
            } else {
                MessageBox('提示', res.data.errorMsg);
            }
          });
        });
      },
      //此刻点赞
      giveMomentLike: function (manageId, index, flag) {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        this.$http.post(DISCOVERMESSAGE.momentGiveLike, {
          "uid": this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            if (flag == 1) {
              _this.nowList[index].likeNum = res.data.data.num;
              _this.nowList[index].likeStatus = false;
            } else if (flag == 2) {
              _this.recommendList[index].likeNum = res.data.data.num;
              _this.recommendList[index].likeStatus = false;
            }
          } else {
              MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //取消点赞
      removeMomentLike: function (manageId, index, flag) {
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        this.$http.post(DISCOVERMESSAGE.momentRemoveLike, {
          "uid": this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            if (flag == 1) {
              _this.nowList[index].likeNum = res.data.data.num;
              _this.nowList[index].likeStatus = true;
            } else if (flag == 2) {
              _this.recommendList[index].likeNum = res.data.data.num;
              _this.recommendList[index].likeStatus = true;
            }
          } else {
              MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //分享
      onShareClick: function (index) {
        this.indexNum = index;
        var showId = '#share_recommend' + index;
        $(showId).show();
        $("#bgShareReco").show();
      },
      bgHide: function () {
        var showId = '#share_recommend' + this.indexNum;
        $(showId).hide();
        $("#bgShareReco").hide();
      },
    },
    computed: {
      getUserId() {
        return this.$store.state.userId
      },
      selectLabelState() {
        return this.$store.state.selectLabelState
      }
    },
    watch: {
      getUserId(val) {
        if (val != null) {
          // this.getRefreshList()
          this.reset()
          this.getList()
        }
      },
      selectLabelState() {
        // this.getRefreshList()
        this.reset()
        this.getList()
      },
      ['$route'](to, from){
        if (!from.query.id) {
          return
        }
        if (to.path == '/recommend' && from.path == '/information/informationDetail') {
          this.$http.post(DISCOVERMESSAGE.informationDetail, {
            "uid": this.$store.state.userId,
            "id": from.query.id
          }).then(({
                     data
                   }) => {
            if (data.status) {
              for (let i = 0; i < this.recommendList.length; i++) {
                if (this.recommendList[i].recommendType == 1 && this.recommendList[i].id == from.query.id) {
                  this.recommendList[i].readNum = data.data.readNum;
                  break
                }
              }
            } else {

              //MessageBox('提示', res.data.errorMsg);
            }
          });
        }
      }
    },
    mounted() {
      // this.getRefreshList();
      this.userId = this.$store.state.userId;
      // alert(this.$store.state.userId)
    }

  }

</script>

<style scoped>
  @import "./../../../../static/css/discover/all.css";
  @import "./../../../../static/css/discover/detail.css";

</style>
