<template>
  <div>
    <my-header :title="'关注列表'"></my-header>
    <!-- <header class="header">
        <img src="../../../static/images/back@2x.png" alt="" @click="goBack">
        <span class="header-title-fff">关注列表</span>
        <div class="header-right"></div>
      </header> -->
    <div style="margin-top: 0.32rem;"></div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore"
                 :topDistance="80">
      <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" class="down-frash">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div v-infinite-scroll="getNextList" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
        <ul class="wrap_92" v-for="item in focusList">
          <li>
            <img v-if="item.user && item.user.head_image" :src="item.user.head_image" class="headPic">
            <img v-else src="../../../static/images/discover/normalhead.png" class="headPic">
            <!--加V-->
            <img v-if="item.user && item.user.vflag.indexOf('V') != -1" src="../../../static/images/discover/v.png" class="head_22"/>
            <div class="nameBox">
              <span v-if="item.user" class="name">{{item.user.nick_name}}</span>
              <span v-else class="name">尚未设置昵称</span>
              <span v-if="item.user && item.user.vflag.indexOf('JAC') != -1" class="jac">JAC</span>
            </div>
          </li>
        </ul>
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'mint-ui';
  export default {
    name: "fans",
    data() {
      return {
        focusList: [],
        userId: null,
        pageNum: 1,
        allLoaded: false,
        loadEnd: false,
        loading: false,
        topStatus: '',
        list:20
      }
    },
    created() {},
    methods: {
      loadTop() {
        this.getRefreshList();
        this.$refs.loadmore.onTopLoaded();
      },
      loadBottom() {},
      handleTopChange(status) {
        this.topStatus = status;
      },
      getRefreshList: function () {
        //获取关注列表第一页
        let _this = this;
        this.loading = true;
        this.loadEnd = false;
        this.$http.post(DISCOVERMESSAGE.focusOnList, {
          "uid": this.userId,
          "pageNo":1,
          "length":_this.list,
        }).then(function (res) {
          if (res.data.status) {
            _this.pageNum = 1;
            _this.loading = false;
            _this.focusList = res.data.data;
            if (res.data.recordsTotal <= _this.list) {
              _this.loadEnd = true;
            }
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      //关注刷新翻页
      getNextList: function () {
        let _this = this;
        if (this.loadEnd) {
          this.loadBottom();
          return;
        }
        this.loadEnd = true;
        this.pageNum++;
        this.$http.post(DISCOVERMESSAGE.focusOnList, {
          "uid": this.userId,
          "pageNo":_this.pageNum,
          "length":_this.list
        }).then(function (res) {
          _this.loadEnd = false;
          if (res.data.status) {
            _this.focusList = _this.focusList.concat(res.data.data);
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
      goBack: function () {
        this.$router.go(-1);
      },
      getFocusList: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.focusOnList, {
          "uid": this.userId,
          "pageNo":1,
          "length":10
        }).then(function (res) {
          if (res.data.status) {
            //console.log(res.data.data);
            _this.list = res.data.data;
          } else {
            //console.log(res.data.errorMsg);
            MessageBox('提示', res.data.errorMsg);
          }
        });
      }
    },
    mounted() {
      this.userId = this.$store.state.userId;
      //this.getFocusList();
      this.$nextTick(function () {
        this.getRefreshList()
      })
    }
  }

</script>

<style scoped>
  @import "./../../../static/css/discover/detail.css";

  ul li {
    list-style: none;
    overflow: hidden;
  }

  .headPic {
    width: 0.6rem;
    height: 0.6rem;
    margin-top: 0.1rem;
    border-radius: 50%;
    float: left;
  }

  .name {
    color: #222222;
    font-size: 0.28rem;
    line-height: 0.5rem;
    height: 0.5rem;
  }

  .nameBox {
    float: right;
    width: 88%;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 0.02rem solid #f1f1f1;
  }
  .head_22{
    width: 0.2rem !important;
    height: 0.2rem !important;
    position: relative;
    right: 0.15rem;
    bottom: -0.58rem;
  }

</style>
