<template>
  <div class="all">
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="80">
      <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="font-size: 0.3rem;visibility: hidden">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div v-infinite-scroll="getNextList" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
        <!--活动列表S-->
        <div v-for="item in activityList">
          <div class="box_1 height_444">
            <div class="box_2">
              <img :src="item.imgUrl" @click="toDetail(item.activityId)"/>
            </div>
            <div class="box_3 height_132">
              <p class="title_activity" @click="toDetail(item.activityId)">
                {{item.activityTitle.slice(0,20)}}
                <span v-if="item.activityTitle.length>20">...</span>
              </p>
              <div v-if="item.activityState==0">
                <div class="operation_activity f_left">
                  <img src="../../../../static/images/discover/date1.png" class="w_28 mr_004"/>
                  <span>{{item.planDate}}</span>
                </div>
                <div class="operation_activity f_right t_right">
                  <img src="../../../../static/images/discover/start1.png" class="w_28 mr_004"/>
                  <span>未开始</span>
                </div>
              </div>
              <div v-if="item.activityState==1">
                <div class="operation_activity f_left">
                  <img src="../../../../static/images/discover/date2.png" class="w_28 mr_004"/>
                  <span>{{item.planDate}}</span>
                </div>
                <div class="operation_activity f_right t_right">
                  <img src="../../../../static/images/discover/start2.png" class="w_28 mr_004"/>
                  <span>进行中</span>
                </div>
              </div>
              <div v-if="item.activityState==2">
                <div class="operation_activity f_left">
                  <img src="../../../../static/images/discover/date3.png" class="w_28 mr_004"/>
                  <span>{{item.planDate}}</span>
                </div>
                <div class="operation_activity f_right t_right">
                  <img src="../../../../static/images/discover/start3.png" class="w_28 mr_004"/>
                  <span>已结束</span>
                </div>
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
          }
      },
     // props:['activityList'],
      methods:{
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
      computed:{
        getUserId(){
          return this.$store.state.userId
        }
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
        // alert(this.$store.state.userId)
      },
    }
</script>

<style scoped>
  @import "./../../../../static/css/discover/all.css";
</style>
