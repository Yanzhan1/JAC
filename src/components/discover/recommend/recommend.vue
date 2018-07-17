<template>
    <div class="all" style="word-break:break-all;">
      <!--推荐-->
      <div @click="bgHide" id="bgShareReco" style="position: fixed; width: 100%;height: 100%;background: black; display: none;opacity: 0"></div>
      <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="80">
        <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="font-size: 0.3rem;visibility: hidden">下拉刷新</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
        <div v-infinite-scroll="getNextList" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
          <div v-if="recommendList.length==0">
            <div style="height: 8rem;"></div>
          </div>
          <!--内容S-->
          <div v-for="(item,index) in recommendList">
            <!--资讯列表S-->
            <div v-if="item.recommendType==1">
              <div class="box_1 height_5">
                <div class="box_2">
                  <img src="../../../../static/images/discover/1.jpg" @click="toDetailInfo(item.id)"/>
                </div>
                <div class="box_3 height_188">
                  <p class="title_info" @click="toDetailInfo(item.id)">
                    {{item.title.slice(0,46)}}
                    <span v-if="item.title.length>46">...</span>
                  </p>
                  <div class="operation_info">
                    <!--阅读数量-->
                    <img src="../../../../static/images/discover/eye.png" class="w_04 mr_006"/>
                    <span>{{item.readNum}}</span>
                    <!--评论数量-->
                    <img src="../../../../static/images/discover/comment.png" class="w_04 mr_006" @click="toDetailInfo(item.id)"/>
                    <span class="size_28">{{item.commentNum}}</span>
                    <!--是否点赞以及点赞数量-->
                    <img v-if="item.likeStatus" src="../../../../static/images/discover/nozan.png" class="w_04 mr_006" @click="giveInformationLike(item.id,index,2)">
                    <img v-else src="../../../../static/images/discover/zan.png" class="w_04 mr_006" @click="removeInformationLike(item.id,index,2)">
                    <span class="size_28">{{item.likeNum}}</span>
                  </div>
                </div>
              </div>
            </div>
            <!--资讯列表E-->
            <!--活动列表S-->
            <div  v-if="item.recommendType==2">
              <div class="box_1 height_444">
                <div class="box_2">
                  <img :src="item.pictureUrl" @click="toActDetail(item.id)"/>
                </div>
                <div class="box_3 height_132">
                  <p class="title_activity" @click="toActDetail(item.id)">
                    {{item.title.slice(0,20)}}
                    <span v-if="item.title.length>20">...</span>
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
            <!--社区列表S-->
            <div  v-if="item.recommendType==3">
              <div :class="['box_1' ,item.momentImgList ? 'height_582' : 'height_27']">
                <div class="box_2" v-if="item.momentImgList">
                  <img @click="toNowDetail(item.id)" :src="item.momentImgList[0]"/>
                </div>
                <div class="box_3 height_188 thin_line">
                  <p class="title_now" @click="toNowDetail(item.id)">{{item.title}}</p>
                  <div class="operation_info">
                    <!--阅读数量-->
                    <img src="../../../../static/images/discover/eye.png" class="w_04 mr_006"/>
                    <span>{{item.readNum}}</span>
                    <!--评论数量-->
                    <img src="../../../../static/images/discover/comment.png" class="w_04 mr_006"/>
                    <span class="size_28">{{item.commentNum}}</span>
                    <!--是否点赞以及点赞数量-->
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
              </div>
            </div>
            <!--社区列表E-->
          </div>
          <!--内容E-->
        </div>
      </mt-loadmore>
      <div style="height: 1rem;"></div>
      <p style="display: none; font-size: 0.3rem;margin: auto;text-align: center;margin-bottom: 1rem;visibility: hidden" id="showAll1">已加载全部</p>
      </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import shareBox from '../component/shareBox.vue';
    export default {
      name: "Recommend",
      data(){
          return{
            userId:this.$store.state.userId,
            pageNum:1,
            allLoaded: false,
            loadEnd:false,
            loading:false,
            recommendList:[],
            list:4,
            topStatus: '',
            showImg:false,
            imgSrc: '',
            flag: 'recommend',
            typeInfo: 'information',
            typeNow: 'now'
          }
      },
      components: {
        shareBox
      },
      methods:{
        toDetailInfo: function (id) {
          this.$router.push({path:"/discdetail",query:{id:id}})
        },
        toNowDetail: function(id){
          this.$router.push({path:"/discover/nowDetail",query:{id:id}})
        },
        toActDetail: function (id) {
          this.$router.push({path:"/activity/DetailActivity",query:{activityId:id}})
        },
        self(id){
          if(id==this.$store.state.userId){
            return false;
          }else{
            return true;
          }
        },
        clickImg(e) {
          this.showImg = true;
          this.imgSrc = e.currentTarget.src;
        },
        viewImg(){
          this.showImg = false;
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
        changeUserStartId(id){
          if(id == this.$store.state.userId){
            this.$router.push({path:'/my/mystart'});
          }else{
            this.$store.state.UserStartId = id;
            this.$router.push({path:'/userstart'});
          }
        },
        //加关注
        addFoucs: function (foucsId,index) {
          var _this = this;
          console.log(this.$store.state.userId)
          this.$http.post(DISCOVERMESSAGE.focusOn, {"uid":this.$store.state.userId,"focusId": foucsId}).then(function (res) {
            if (res.data.status) {
              _this.recommendList[index].focusType = res.data.data;
              for(var i=0;i< _this.recommendList.length;i++){
                if(_this.recommendList[i].user.user_id == foucsId){
                  _this.recommendList[i].focusType=res.data.data;
                }
              }
            } else {
              _this.toLogin();
              //MessageBox('提示', res.data.errorMsg);
            }
          });
        },
        //取消关注
        removeFoucs: function (foucsId,index) {
          console.log(foucsId)
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.unFocus, {"uid":this.$store.state.userId,"focusId": foucsId}).then(function (res) {
            if (res.data.status) {
              _this.recommendList[index].focusType = res.data.data;
              for(var i=0;i< _this.recommendList.length;i++){
                if(_this.recommendList[i].user.user_id == foucsId){
                  _this.recommendList[i].focusType=res.data.data;
                }
              }
            } else {
              _this.toLogin();
              //MessageBox('提示', res.data.errorMsg);
            }
          });
        },
        getRefreshList: function () {
          //获取推荐列表第一页
          let _this = this;
          this.loading=true;
          this.loadEnd=false;
          this.$http.post(INDEXMESSAGE.getRecommend, {"uid":this.$store.state.userId,"pageNo":1, "length":_this.list}).then(function (res) {
            if (res.data.status) {
              _this.pageNum=1;
              _this.loading=false;
              _this.recommendList = res.data.data;
              //console.log(res.data.data)
              if(res.data.recordsTotal <= _this.list){
                _this.loadEnd = true;
              }
            } else {
              console.log(res.data.errorMsg);
            }
          });
        },
        //推荐刷新翻页
        getNextList: function () {
          let _this = this;
          if(this.loadEnd){
            this.loadBottom();
            return;
          }
          this.loadEnd=true;
          this.pageNum++;
          this.$http.post(INDEXMESSAGE.getRecommend, {"uid":this.$store.state.userId,"pageNo":_this.pageNum, "length":_this.list}).then(function (res) {
            _this.loadEnd=false;
            if (res.data.status) {
                _this.recommendList = _this.recommendList.concat(res.data.data);
                var allPages = Math.ceil(res.data.recordsTotal/_this.list);
                if(allPages <= _this.pageNum){
                  _this.loading = true;
                  _this.allLoaded = true;
                  _this.loadEnd = true;
                  //$("#showAll1").show();
                }
            } else {
              _this.pageNum = _this.pageNum -1;
            }
          });
        },
        //资讯点赞
        giveInformationLike: function (manageId,index,flag) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.informationGiveLike, {"uid":this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              if(flag == 1){
                _this.informationList[index].likeNum = res.data.data.num;
                _this.informationList[index].likeStatus = false;
              }else if(flag == 2){
                _this.recommendList[index].likeNum = res.data.data.num;
                _this.recommendList[index].likeStatus = false;
              }
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        },
        //取消点赞
        removeInformationLike: function (manageId,index,flag) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.informationRemoveLike, {"uid":this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              if(flag == 1){
                _this.informationList[index].likeNum = res.data.data.num;
                _this.informationList[index].likeStatus = true;
              }else if(flag == 2){
                _this.recommendList[index].likeNum = res.data.data.num;
                _this.recommendList[index].likeStatus = true;
              }
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        },
        //资讯收藏
        collection: function (manageId,index,flag) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.informationCollection, {"uid":this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              if(flag == 1){
                _this.informationList[index].collectionStatus = false;
              }else if(flag == 2){
                _this.recommendList[index].collectionStatus = false;
              }
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        },
        //资讯取消收藏
        messageBoxCofirm: function(manageId,index,flag){
          MessageBox.confirm('确定取消收藏?').then(action => {
            var _this = this;
            this.$http.post(DISCOVERMESSAGE.informationRemoveCollection, {"uid":this.$store.state.userId,"lid": manageId}).then(function (res) {
              if (res.data.status) {
                if(flag == 1){
                  _this.informationList[index].collectionStatus = true;
                }else if(flag == 2){
                  _this.recommendList[index].collectionStatus = true;
                }
              } else {
                if(_this.$store.state.userId == null){
                  _this.toLogin();
                }else{
                  MessageBox('提示', res.data.errorMsg);
                }
              }
            });
          });
        },
        //此刻点赞
        giveMomentLike: function (manageId,index,flag) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.momentGiveLike, {"uid":this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              if(flag == 1){
                _this.nowList[index].likeNum = res.data.data.num;
                _this.nowList[index].likeStatus = false;
              }else if(flag == 2){
                _this.recommendList[index].likeNum = res.data.data.num;
                _this.recommendList[index].likeStatus = false;
              }
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        },
        //取消点赞
        removeMomentLike: function (manageId,index,flag) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.momentRemoveLike, {"uid":this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              if(flag == 1){
                _this.nowList[index].likeNum = res.data.data.num;
                _this.nowList[index].likeStatus = true;
              }else if(flag == 2){
                _this.recommendList[index].likeNum = res.data.data.num;
                _this.recommendList[index].likeStatus = true;
              }
            } else {
              if(_this.$store.state.userId == null){
                _this.toLogin();
              }else{
                MessageBox('提示', res.data.errorMsg);
              }
            }
          });
        },
        //分享
        onShareClick: function (index) {
          this.indexNum = index;
          var showId = '#share_recommend'+index;
          $(showId).show();
          $("#bgShareReco").show();
        },
        bgHide: function () {
          var showId = '#share_recommend'+this.indexNum;
          $(showId).hide();
          $("#bgShareReco").hide();
        }
      },
      computed:{
        getUserId(){
          return this.$store.state.userId
        }
      },
      watch:{
        getUserId(val){
          if(val != null){
            this.getRefreshList()
          }
        }
      },
      mounted(){
        this.getRefreshList();
        // alert(this.$store.state.userId)
      }

    }
</script>

<style scoped>
  @import "./../../../../static/css/discover/all.css";
</style>
