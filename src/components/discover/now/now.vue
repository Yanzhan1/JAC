<template>
  <div class="all">
    <div @click="bgHide" id="bgShareNow"></div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
      :topDistance="80">
      <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" class="down-frash">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div v-infinite-scroll="loadmore" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
        <!--社区列表S-->
        <div v-for="(item,index) in nowList" @click="handleRecordIndex(index)">
          <div class="boxInfo">
            <!--发布者信息S-->
            <div class="comment_userinfo">
              <div class="user_head">
                <div @click="changeUserStartId(item.user.user_id, item.id, index)">
                  <img v-if="item.user && item.user.head_image" :src="item.user.head_image" class="head_72" />
                  <img v-else src="../../../../static/images/discover/normalhead.png" class="head_72" />
                  <!--加V-->
                  <img v-if="item.user && item.user.vflag.indexOf('V') != -1" src="../../../../static/images/discover/v.png"
                    class="head_22" />
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
                <div class="guanzhu">
                  <div v-if="item.user && userId != item.user.user_id">
                    <div v-if="item.focusStatus == 1" @click="removeFoucs(item.user.user_id,index)">
                      <img src="../../../../static/images/discover/ygz.png">
                      <span class="font_4">已关注</span>
                    </div>
                    <div v-else-if="item.focusStatus == 2" @click="removeFoucs(item.user.user_id,index)">
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
                  {{item.createDate}}
                </div>
              </div>
            </div>
            <!--发布者信息E-->
            <div @click="toDetail(item.id)" class="listTitleInfo">{{item.momentMessage}}</div>
            <div class="pics" v-if="item.momentImgList">
              <!--加精华-->
              <img v-if="item.supreme==1" src="../../../../static/images/discover/jinghua.png" class="jinghua" />
              <div v-if="item.momentImgList.length==1" v-for="imgItem in item.momentImgList">
                <div class="pic1" @click="toDetail(item.id)">
                  <lazy-img :imgUrl="imgItem"></lazy-img>
                </div>
                <!-- <img @click="toDetail(item.id)" :src="imgItem" class="pic1" /> -->
              </div>
              <div v-if="item.momentImgList.length==2">
                <div style="margin-right: 2%;" class="pic2_1" @click="toDetail(item.id)">
                  <lazy-img :imgUrl="item.momentImgList[0]"></lazy-img>
                </div>
                <div class="pic2_2" @click="toDetail(item.id)">
                  <lazy-img :imgUrl="item.momentImgList[1]"></lazy-img>
                </div>
                <!-- <img @click="toDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic2_1" />
                <img @click="toDetail(item.id)" :src="item.momentImgList[1]" class="pic2_2" /> -->
              </div>
              <div v-if="item.momentImgList.length==3">
                <div style="margin-right: 2%;" class="pic3_1" @click="toDetail(item.id)">
                  <lazy-img :imgUrl="item.momentImgList[0]"></lazy-img>
                </div>
                <div class="pic3_2" @click="toDetail(item.id)">
                  <lazy-img :imgUrl="item.momentImgList[1]"></lazy-img>
                </div>
                <div class="pic3_3" @click="toDetail(item.id)">
                  <lazy-img :imgUrl="item.momentImgList[2]"></lazy-img>
                </div>
                <!-- <img @click="toDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic3_1" />
                <img @click="toDetail(item.id)" :src="item.momentImgList[1]" class="pic3_2" />
                <img @click="toDetail(item.id)" :src="item.momentImgList[2]" class="pic3_3" /> -->
              </div>
              <div v-if="item.momentImgList.length>3">
                <div class="shequMore_box">
                  <div class="shequNum">
                    {{item.momentImgList.length}}
                  </div>
                  <img @click="toDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic3_1" />
                  <img @click="toDetail(item.id)" :src="item.momentImgList[1]" class="pic3_2" />
                  <img @click="toDetail(item.id)" :src="item.momentImgList[2]" class="pic3_3" />
                </div>
              </div>
            </div>
            <!--阅读数量,是否点赞以及点赞数量S-->
            <div class="listIconInfo">
              <img src="../../../../static/images/discover/eye.png" class="f_left" />
              <span class="f_left">{{item.readNum}}</span>
              <span class="f_right">{{item.likeNum}}</span>
              <img v-if="item.likeStatus==0" src="../../../../static/images/discover/nozan.png" class="f_right" @click="giveMomentLike(item.id,index)" />
              <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeMomentLike(item.id,index)" />
            </div>
            <!--阅读数量,是否点赞以及点赞数量E-->
          </div>
        </div>
        <!--社区列表E-->
        <bottom-loading :pageNo="listParams.pageNo" :loading="loading" :isLastPage="isLastPage"></bottom-loading>
      </div>
    </mt-loadmore>
  </div>


</template>

<script>
  import moment from "moment";
  import {
    MessageBox
  } from 'mint-ui';
  import shareBox from '../component/shareBox.vue';
  import LazyImg from '@/components/discover/component/LazyImg'
  import BottomLoading from '@/components/discover/component/BottomLoading'

  export default {
    name: "Now",
    data() {
      return {
        userId: this.$store.state.userId,
        nowList: [],
        //刷新分页
        allLoaded: false,
        loadEnd: false,
        loading: false,
        list: 4,
        pageNum: 1,
        topStatus: '',
        //点击大图
        showImg: false,
        imgSrc: '',
        //分享参数
        flag: 'now',
        type: 'now',
        _index: null,
        isLastPage: false, // 是不是最后一页
        listParams: { // 获取列表的参数
          pageNo: 1,
          length: 4
        }
      }
    },
    created() {
      this.getList()
    },
    components: {
      shareBox,
      LazyImg,
      BottomLoading
    },
    watch: {
      getUserId(val) {
        // this.getRefreshList()
        this.reset()
        this.getList()
      },
      ['$route'](to, from) {
        if (from.path == '/mystart') {
          // this.getRefreshList();
          this.reset()
          this.getList()
        }
        if (!from.query.id) {
          return
        }
        if ((from.path == '/now/nowDetail' || from.path == '/userstart') && this._index !== null) {
          this.$http.post(DISCOVERMESSAGE.nowDetail, {
            "uid": this.$store.state.userId,
            "id": from.query.id
          }).then((res) => {
            if (res.data.status) {
              const {
                data: {
                  data: {
                    likeStatus,
                    readNum,
                    likeNum,
                    focusStatus
                  }
                }
              } = res
              this.nowList[this._index].likeStatus = likeStatus
              this.nowList[this._index].readNum = readNum
              this.nowList[this._index].likeNum = likeNum
              this.nowList[this._index].focusStatus = focusStatus
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          });
        }
      }
    },
    methods: {
      self(id) {
        if (id == this.$store.state.userId) {
          return false;
        } else {
          return true;
        }
      },
      /**
       * 记录index
       */
      handleRecordIndex(index) {
        this._index = index
      },
      clickImg(e) {
        this.showImg = true;
        this.imgSrc = e.currentTarget.src;
      },
      viewImg() {
        this.showImg = false;
      },
      loadTop() {
        this.reset()
        this.getList()
        // this.getRefreshList();
        // this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {},
      handleTopChange(status) {
        this.topStatus = status;
      },
      /* changeUserStartId(id) {
         if (id == this.$store.state.userId) {
           this.$router.push({
             path: '/mystart'
           });
           // this.$router.push({path:'/myIndex'});
         } else {
           this.$store.state.UserStartId = id;
           this.$router.push({
             path: '/userstart',
             query: {
               id
             }
           });
         }
       },*/
      changeUserStartId(id, id1, index) {
        if (id == this.$store.state.userId) {
          this.$router.push({
            path: "/mystart"
          });
        } else {
          this.handleRecordIndex(index)
          this.$store.state.UserStartId = id;
          this.$router.push({
            path: "/userstart",
            query: {
              id: id1
            }
          });
        }
      },
      toDetail: function (id, userId) {
        this.$store.state.UserStartId = userId;
        this.$router.push({
          path: "/now/nowDetail",
          query: {
            id: id
          }
        })
      },
      //转换时间
      convert: function (date) {
        moment.locale('zh-cn');
        let beforeDate = date
        let newDate = moment().valueOf()
        date = moment(date).valueOf()
        let twoDayDate = 172800000 // 两天的时间戳
        let oneDayDate = 86400000 // 一天的时间戳
        let oneMinute = 60000 // 一分钟的时间戳
        let courseDate = newDate - date // 现在时间的时间戳减去发布时间得到的时间段
        if (courseDate > twoDayDate) {
          return beforeDate.substring(0, 10).substr(5, 6)
        }
        if (courseDate > oneDayDate && courseDate <= twoDayDate) {
          return '昨天'
        }
        if (courseDate > oneMinute && courseDate <= oneDayDate) {
          let data = moment(beforeDate).startOf('minute').fromNow();
          return data
        }
        if (courseDate < oneMinute) {
          return '刚刚'
        }
      },
      getRefreshList: function () {
        //获取此刻列表第一页
        let _this = this;
        this.loading = true;
        this.loadEnd = false;
        this.$http.post(INDEXMESSAGE.getNow, {
          "uid": this.$store.state.userId,
          "pageNo": 1,
          "length": _this.list
        }).then(function (res) {
          if (res.data.status) {
            _this.pageNum = 1;
            _this.loading = false;
            _this.nowList = res.data.data;
            for (let i = 0; i < _this.nowList.length; i++) {
              _this.nowList[i].createDate = _this.convert(_this.nowList[i].createDate)
            }
            if (res.data.recordsTotal <= _this.list) {
              _this.loadEnd = true;
            }
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      /**
       * 重置
       */
      reset() {
        this.listParams.pageNo = 1
        this.isLastPage = false
        this.nowList = []
      },
      /**
       * 上拉加载更多
       */
      loadmore() {
        if (this.isLastPage) {
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
        this.$http.post(INDEXMESSAGE.getNow, this.listParams).then((res) => {
          this.loading = false
          if (res.data.status !== 1) {
            console.log(res.data.errorMsg)
            return
          }
          for (let i = 0; i < res.data.data.length; i++) {
            res.data.data[i].createDate = this.convert(res.data.data[i].createDate)
          }
          this.nowList.push(...res.data.data)
          if (this.nowList.length >= res.data.recordsTotal) {
            this.isLastPage = true
          }
          this.$nextTick(() => {
            this.$refs.loadmore.onTopLoaded()
          })
        })
      },
      //此刻刷新翻页
      getNextList: function () {
        if (this.$router.currentRoute.path != '/now') {
          return
        }
        let _this = this;
        if (this.loadEnd) {
          this.loadBottom();
          return;
        }
        this.loadEnd = true;
        this.pageNum++;
        this.$http.post(INDEXMESSAGE.getNow, {
          "uid": this.$store.state.userId,
          "pageNo": _this.pageNum,
          "length": _this.list
        }).then(function (res) {
          _this.loadEnd = false;
          if (res.data.status) {
            for (let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].createDate = _this.convert(res.data.data[i].createDate)
            }
            _this.nowList = _this.nowList.concat(res.data.data);
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
      //此刻点赞
      giveMomentLike: function (manageId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentGiveLike, {
          "uid": this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.nowList[index].likeNum = res.data.data.num;
            _this.nowList[index].likeStatus = 1;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //取消点赞
      removeMomentLike: function (manageId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentRemoveLike, {
          "uid": this.$store.state.userId,
          "lid": manageId
        }).then(function (res) {
          if (res.data.status) {
            _this.nowList[index].likeNum = res.data.data.num;
            _this.nowList[index].likeStatus = 0;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //加关注
      addFoucs: function (foucsId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.focusOn, {
          "uid": this.$store.state.userId,
          "focusId": foucsId
        }).then(function (res) {
          if (res.data.status) {
            _this.nowList[index].focusStatus = res.data.data;
            for (var i = 0; i < _this.nowList.length; i++) {
              if (_this.nowList[i].user.user_id == foucsId) {
                _this.nowList[i].focusStatus = res.data.data;
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
        this.$http.post(DISCOVERMESSAGE.unFocus, {
          "uid": this.$store.state.userId,
          "focusId": foucsId
        }).then(function (res) {
          if (res.data.status) {
            _this.nowList[index].focusStatus = res.data.data;
            _this.nowList[index].focusStatus = res.data.data;
            for (var i = 0; i < _this.nowList.length; i++) {
              if (_this.nowList[i].user.user_id == foucsId) {
                _this.nowList[i].focusStatus = res.data.data;
              }
            }
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //此刻收藏
      collection: function (manageId, index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentCollection, {
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
      //此刻取消收藏
      messageBoxCofirm: function (manageId, index) {
        MessageBox.confirm('确定取消收藏?').then(action => {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.momentCollection, {
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
        var showId = '#share_now' + index;
        $(showId).show();
        $("#bgShareNow").show();
      },
      bgHide: function () {
        var showId = '#share_now' + this.indexNum;
        $(showId).hide();
        $("#bgShareNow").hide();
      }
    },
    computed: {
      getUserId() {
        return this.$store.state.userId
      }
    },
    // mounted() {
    //   this.getRefreshList()
    // }
  }

</script>

<style scoped>
  @import "./../../../../static/css/discover/all.css";
  @import "./../../../../static/css/discover/detail.css";

  .head_22 {
    width: 0.2rem !important;
    height: 0.2rem !important;
    position: relative;
    right: -0.54rem;
    bottom: 0.12rem;
  }

  .jinghua {
    width: 1.12rem !important;
    height: 1.12rem !important;
    position: absolute;
    right: 0;
  }

</style>
