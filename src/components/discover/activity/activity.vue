<template>
  <div class="all">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="80">
      <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="font-size: 0.3rem;visibility: hidden">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div v-infinite-scroll="getNextList" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
        <!--活动列表S-->
          <div v-for="(item) in activityList" :key="item.id">
            <div class="boxInfo">
              <p class="listTitleInfo" @click="toDetail(item.manageId)">
                {{item.activityTitle.slice(0,46)}}
                <span v-if="item.activityTitle.length>46">...</span>
              </p>
              <img class="listPic312" @click="toDetail(item.activityId)" :src="item.imgUrl"/>
              <div class="listIconActivity">
                <!--未开始-->
                <div v-if="item.activityState==0">
                  <img src="../../../../static/images/discover/date1.png" class="f_left"/>
                  <span class="f_left">{{item.planDate}}</span>
                  <span class="f_right">未开始</span>
                  <img src="../../../../static/images/discover/start1.png" class="f_right"/>
                </div>
                <!--已开始-->
                <div v-if="item.activityState==1">
                  <img src="../../../../static/images/discover/date2.png" class="f_left"/>
                  <span class="f_left">{{item.planDate}}</span>
                  <span class="f_right">已开始</span>
                  <img src="../../../../static/images/discover/start2.png" class="f_right"/>
                </div>
                <!--已结束-->
                <div v-if="item.activityState==2">
                  <img src="../../../../static/images/discover/date3.png" class="f_left"/>
                  <span class="f_left">{{item.planDate}}</span>
                  <span class="f_right">已结束</span>
                  <img src="../../../../static/images/discover/start3.png" class="f_right"/>
                </div>
              </div>
            </div>
          </div>
        <!--活动列表E-->
      </div>
    </mt-loadmore>
    <p style="display: none; font-size: 0.3rem;margin: auto;text-align: center;visibility: hidden" id="showAll3">已加载全部</p>
  </div>
</template>

<script>
    import {mapState, mapMutations} from 'vuex'
    import { Popup } from 'mint-ui';
    import { Toast } from 'mint-ui';
    export default {
      name: "ActivityIndex",
      data(){
          return{
            userId:this.$store.state.userId,
            pageNum:1,
            allLoaded: false,
            loadEnd:false,
            loading:false,
            activityList:[],
            list:3,
            topStatus: '',
            value: null
          }
      },
     // props:['activityList'],
      // computed:{
      //   getUserId(){
      //     return this.$store.state.userId
      //   }
      // },
      methods:{
        confirm: function() {
          let _this = this
          let pushLabes = []
          pushLabes.push(_this.value)
          // _this.$store.dispatch("popupFalse")
          _this.$http.post(INDEXMESSAGE.getActivity, {"uid":this.$store.state.userId,"pageNo":1, "length":_this.list, labelIds: pushLabes}).then(function (res) {
            if (res.data.status) {
              _this.activityList = res.data.data;
            } else {
              console.log(res.data.errorMsg);
            }
          });
        },
        cancle: function() {
          this.$store.dispatch("popupFalse")
        },
        loadTop() {
          this.getRefreshList();
          this.$refs.loadmore.onTopLoaded();
        },
        loadBottom() {
        },
        handleTopChange(status) {
          this.topStatus = status;
        },
        toDetail: function (id) {
          this.$router.push({path:"/activity/activityDetail",query:{activityId:id}})
        },
        getRefreshList: function () {
          //获取活动列表第一页
          let _this = this;
          this.loading=true;
          this.loadEnd=false;
          this.$http.post(INDEXMESSAGE.getActivity, {"uid":this.$store.state.userId,"pageNo":1, "length":_this.list}).then(function (res) {
            if (res.data.status) {
              _this.pageNum=1;
              _this.loading=false;
              _this.activityList = res.data.data;
              if(res.data.recordsTotal <= _this.list){
                _this.loadEnd = true;
              }
            } else {
              console.log(res.data.errorMsg);
            }
          });
        },
        //活动刷新翻页
        getNextList: function () {
          let _this = this;
          if(this.loadEnd){
            this.loadBottom();
            return;
          }
          this.loadEnd=true;
          this.pageNum++;
          this.$http.post(INDEXMESSAGE.getActivity, {"uid":this.$store.state.userId,"pageNo":_this.pageNum, "length":_this.list}).then(function (res) {
            _this.loadEnd=false;
            if (res.data.status) {
                _this.activityList = _this.activityList.concat(res.data.data);
                var allPages = Math.ceil(res.data.recordsTotal/_this.list);
                if(allPages <= _this.pageNum){
                  _this.loading = true;
                  _this.allLoaded = true;
                  _this.loadEnd = true;
                  //$("#showAll3").show();
                }
            } else {
              _this.pageNum = _this.pageNum -1;
              console.log(res.data.errorMsg);
            }
          });
        },
      },
      watch:{
        getUserId(val){
          this.getRefreshList()
          // if(val != null){
          //   alert(this.$store.state.userId)
          // }
        }
      },
      mounted(){
        this.getRefreshList();
      },
    }
</script>

<style scoped>
  @import "./../../../../static/css/discover/all.css";
  .channel {
      width:100%;
      text-align:center;
      box-sizing:border-box;
      font-size:.36rem;
      color:#555555;
  }
  .base-line {
      height:.02rem;
      background:#F1F1F1;
      width:100%;
  }
  .btn {
      width:100%;
      display:flex;
      text-align:center;
  }
  .btn p {
      flex:1;
      width:100%;
      font-size:.32rem;
  }
  .btn p:nth-child(1) {
      color:#888888;
  }
  .btn p:nth-child(1) {
      color:#49BBFF;;
  }
</style>
