<template>
  <div class="all">
    <div @click="bgHide" id="bgShareNow"></div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
      :topDistance="80">
      <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" class="down-frash">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div v-infinite-scroll="getNextList" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
        <!--社区列表S-->
        <div v-for="(item,index) in nowList">
          <div class="boxInfo">
            <!--发布者信息S-->
            <div class="comment_userinfo">
              <div class="user_head">
                <div @click="changeUserStartId(item.user.user_id)">
                  <img v-if="item.user && item.user.head_image" :src="item.user.head_image" class="head_72" />
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
                    <div v-if="item.focusStatus == 0" @click="addFoucs(item.user.user_id,index)">
                      <img src="../../../../static/images/discover/jgz.png">
                      <span class="font_4">关注</span>
                    </div>
                    <div v-else-if="item.focusStatus == 1" @click="removeFoucs(item.user.user_id,index)">
                      <img src="../../../../static/images/discover/ygz.png">
                      <span class="font_4">已关注</span>
                    </div>
                    <div v-else="item.focusStatus == 2" @click="removeFoucs(item.user.user_id,index)">
                      <img src="../../../../static/images/discover/ygz.png">
                      <span class="font_4">相互关注</span>
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
              <div v-if="item.momentImgList.length==1" v-for="imgItem in item.momentImgList">
                <img @click="toDetail(item.id)" :src="imgItem" class="pic1" />
              </div>
              <div v-if="item.momentImgList.length==2">
                <img @click="toDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic2_1" />
                <img @click="toDetail(item.id)" :src="item.momentImgList[1]" class="pic2_2" />
              </div>
              <div v-if="item.momentImgList.length==3">
                <img @click="toDetail(item.id)" :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic3_1" />
                <img @click="toDetail(item.id)" :src="item.momentImgList[1]" class="pic3_2" />
                <img @click="toDetail(item.id)" :src="item.momentImgList[2]" class="pic3_3" />
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
              <span v-if="item.supreme==1" style="color: orange;margin-right: 0.16rem;" class="f_right">精品</span>
            </div>
            <!--阅读数量,是否点赞以及点赞数量E-->
          </div>
        </div>
        <!--社区列表E-->
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
      }
    },
    components: {
      shareBox
    },
    methods: {
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
        //this.nowList=[];
        this.getRefreshList();
        this.$refs.loadmore.onTopLoaded();
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
            _this.toLogin();
            //MessageBox('提示', res.data.errorMsg);
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
            _this.toLogin();
            //MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //加关注
      addFoucs: function (foucsId, index) {
        var _this = this;
        console.log(this.$store.state.userId)
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
            _this.toLogin();
            //MessageBox('提示', res.data.errorMsg);
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
            _this.toLogin();
            //MessageBox('提示', res.data.errorMsg);
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
    watch: {
      getUserId(val) {
        this.getRefreshList()
      }
    },
    mounted() {
      console.log('now')
      this.getRefreshList()
    }
  }

</script>

<style scoped>
  @import "./../../../../static/css/discover/all.css";
  @import "./../../../../static/css/discover/detail.css";

</style>
