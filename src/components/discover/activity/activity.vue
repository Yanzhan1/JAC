<template>
  <div class="all">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
      :topDistance="80">
      <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="font-size: 0.3rem;visibility: hidden">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div v-infinite-scroll="loadmore" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
        <!--活动列表S-->
        <div v-for="(item) in activityList" :key="item.id">
          <div class="boxInfo">
            <p class="listTitleInfo" @click="toDetail(item.activityId,item.activityType)">
              {{item.activityTitle.slice(0,46)}}
              <span v-if="item.activityTitle.length>46">...</span>
            </p>
            <div class="listPic312" @click="toDetail(item.activityId,item.activityType)">
              <lazy-img :imgUrl="item.imgUrl"></lazy-img>
            </div>
            <!-- <img class="listPic312" @click="toDetail(item.activityId,item.activityType)" :src="item.imgUrl" /> -->
            <div class="listIconActivity">
              <!--未开始-->
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
                <span class="f_right">进行中</span>
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
        <bottom-loading :pageNo="listParams.pageNo" :loading="loading" :isLastPage="isLastPage"></bottom-loading>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import LazyImg from '@/components/discover/component/LazyImg'
  import BottomLoading from '@/components/discover/component/BottomLoading'
  import {
    mapState,
    mapMutations
  } from 'vuex'
  import {
    Popup
  } from 'mint-ui';
  import {
    Toast
  } from 'mint-ui';
  export default {
    name: "ActivityIndex",
    components: {
      LazyImg,
      BottomLoading
    },
    data() {
      return {
        userId: this.$store.state.userId,
        pageNum: 1,
        allLoaded: false,
        loadEnd: false,
        loading: false,
        activityList: [],
        list: 3,
        topStatus: '',
        value: null,
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
    // props:['activityList'],
    // computed:{
    //   getUserId(){
    //     return this.$store.state.userId
    //   }
    // },
    methods: {
      confirm: function () {
        let _this = this
        let pushLabes = []
        pushLabes.push(_this.value)
        // _this.$store.dispatch("popupFalse")
        _this.$http.post(INDEXMESSAGE.getActivity, {
          "uid": this.$store.state.userId,
          "pageNo": 1,
          "length": _this.list,
          labelIds: pushLabes
        }).then(function (res) {
          if (res.data.status) {
            _this.activityList = res.data.data;
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      cancle: function () {
        this.$store.dispatch("popupFalse")
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
      toDetail: function (id,activityType) {
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
      getRefreshList: function () {
        //获取活动列表第一页
        let _this = this;
        this.loading = true;
        this.loadEnd = false;
        this.$http.post(INDEXMESSAGE.getActivity, {
          "uid": this.$store.state.userId,
          "pageNo": 1,
          "length": _this.list,
          labelIds: this.$store.state.selectLabelState
        }).then(function (res) {
          if (res.data.status) {
            _this.pageNum = 1;
            _this.loading = false;
            _this.activityList = res.data.data;
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
        this.activityList = []
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
        this.$http.post(INDEXMESSAGE.getActivity, this.listParams).then((res) => {
          this.loading = false
          if (res.data.status !== 1) {
            console.log(res.data.errorMsg)
            return
          }
          this.activityList.push(...res.data.data)
          if (this.activityList.length >= res.data.recordsTotal) {
            this.isLastPage = true
          }
          this.$nextTick(() => {
            this.$refs.loadmore.onTopLoaded()
          })
        })
      },
      //活动刷新翻页
      getNextList: function () {
        if (this.$router.currentRoute.path != '/activity') {
          return
        }
        let _this = this;
        if (this.loadEnd) {
          this.loadBottom();
          return;
        }
        this.loadEnd = true;
        this.pageNum++;
        this.$http.post(INDEXMESSAGE.getActivity, {
          "uid": this.$store.state.userId,
          "pageNo": _this.pageNum,
          "length": _this.list,
          labelIds: this.$store.state.selectLabelState
        }).then(function (res) {
          _this.loadEnd = false;
          if (res.data.status) {
            _this.activityList = _this.activityList.concat(res.data.data);
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
    },
    computed: {
      selectLabelState() {
        return this.$store.state.selectLabelState
      }
    },
    watch: {
      getUserId(val) {
        // this.getRefreshList()
        // if(val != null){
        //   alert(this.$store.state.userId)
        // }
        this.reset()
        this.getList()
      },
      selectLabelState() {
        // this.getRefreshList()
        this.reset()
        this.getList()
      }
    },
    // mounted() {
    //   this.getRefreshList();
    // },
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
