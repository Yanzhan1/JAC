<template>
  <div>
    <my-header :title="'粉丝列表'"></my-header>
    <!-- <header class="header">
        <img src="../../../static/images/back@2x.png" alt="" @click="goBack">
        <span class="header-title-fff">粉丝列表</span>
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
        <ul class="wrap_92" v-for="item in fansList">
          <li style="position:relative">
            <img v-if="item.user && item.user.head_image" :src="item.user.head_image" class="headPic">
            <img v-else src="../../../static/images/discover/normalhead.png" class="headPic">
            <!--加V-->
            <!-- <img v-if="item.user && item.user.vflag.indexOf('V') != -1" src="../../../static/images/discover/v.png" class="head_22"/> -->
              <img class="heade_99" v-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('普通会员')!=-1" src="../../../static/images/my/member1_v.png" alt="">
              <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('认证会员')!=-1" src="../../../static/images/my/member2_v.png" alt="">
              <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('白银会员')!=-1" src="../../../static/images/my/member3_v.png" alt="">
              <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('黄金会员')!=-1" src="../../../static/images/my/member4_v.png" alt="">
              <img class="heade_99" v-else-if="item.user&&item.user.vflag.indexOf('V') != -1&&item.user.vflag.indexOf('钻石会员')!=-1" src="../../../static/images/my/member5_v.png" alt="">
              <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('普通会员')!=-1" src="../../../static/images/my/member1.png" alt="">
              <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('认证会员')!=-1" src="../../../static/images/my/member2.png" alt="">
              <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('白银会员')!=-1" src="../../../static/images/my/member3.png" alt="">
              <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('黄金会员')!=-1" src="../../../static/images/my/member4.png" alt="">
              <img class="heade_98" v-else-if="item.user&&item.user.vflag.indexOf('V') == -1&&item.user.vflag.indexOf('钻石会员')!=-1" src="../../../static/images/my/member5.png" alt="">
            <div class="nameBox">
              <span v-if="item.user && item.user.nick_name" class="name">{{item.user.nick_name}}</span>
              <span v-else class="name">尚未设置昵称</span>
              <span v-if="item.user && item.user.vflag.indexOf('JAC') != -1" class="jac">JAC</span>
              <div class="line"></div>
            </div>
          </li>
        </ul>
      </div>
    </mt-loadmore>
  </div>
  <!--<header class="header" style="background: RGBA(27, 29, 34, 1)">
        <img src="../../../static/images/back2.png" alt="" @click="goBack">
        <span class="header-title"  style="color: RGBA(204, 204, 204, 1)">粉丝列表</span>
        <div class="header-right"></div>
      </header>
      <div style="margin-top: 1.2rem;"></div>
      <ul v-for="item in list">
        <li>
          <img v-if="item.user" :src="item.user.head_image" class="headPic">
          <img v-else src="../../../static/images/discover/guanfang.png" style="border-radius: 15px;width:0.72rem;height: 0.72rem; "  />
          <div class="nameBox">
            <span v-if="item.user" class="name">{{item.user.nick_name}}</span>
            <span v-else class="name">尚未设置昵称</span>
            <div class="line"></div>
          </div>
        </li>
      </ul>-->
</template>

<script>
  import {
    MessageBox
  } from 'mint-ui';
  export default {
    name: "fans",
    data() {
      return {
        listNum: 9,
        fansList: [],
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
        //获取粉丝列表第一页
        let _this = this;
        this.loading = true;
        this.loadEnd = false;
        this.$http.post(DISCOVERMESSAGE.fansList, {
          "uid": this.userId,
          "pageNo":1,
          "length":_this.list,
        }).then(function (res) {
          if (res.data.status) {
            _this.pageNum = 1;
            _this.loading = false;
            _this.fansList = res.data.data;
            if (res.data.recordsTotal <= _this.list) {
              _this.loadEnd = true;
            }
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      //粉丝刷新翻页
      getNextList: function () {
        console.log('翻页')
        let _this = this;
        if (this.loadEnd) {
          this.loadBottom();
          return;
        }
        this.loadEnd = true;
        this.pageNum++;
        this.$http.post(DISCOVERMESSAGE.fansList, {
          "uid": this.userId,
          "pageNo":_this.pageNum,
          "length":_this.list
        }).then(function (res) {
          _this.loadEnd = false;
          if (res.data.status) {
            _this.fansList = _this.fansList.concat(res.data.data);
            console.log(_this.fansList.length+'关注长度')
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
      getFansList: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.fansList, {
          "uid": this.userId,
          "pageNo":1,
          "length":10
        }).then(function (res) {
          if (res.data.status) {
            _this.list = res.data.data;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      }
    },
    mounted() {
      this.userId = this.$store.state.userId;
      //this.getFansList();
      this.getRefreshList()
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
  .heade_99{
    display: block;
    width: .6rem !important;
    height: 0.25rem !important;
    bottom: .1rem;
    left: 0rem;
    position: absolute;
  }
  .heade_98{
    display: block;
    width: .6rem !important;
    height: 0.2rem !important;
    bottom: .1rem;
    left: 0rem;
    position: absolute;
  }
</style>
