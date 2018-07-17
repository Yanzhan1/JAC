<template>
  <div class="all">
    <div @click="bgHide" id="bgShareNow"></div>
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="80">
      <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" class="down-frash">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div v-infinite-scroll="getNextList" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
        <!--社区列表S-->
        <div  v-for="(item,index) in nowList">
          <div :class="['box_1' ,item.momentImgList ? 'height_582' : 'height_27']">
            <div class="box_2" v-if="item.momentImgList">
              <img @click="toDetail(item.id)" :src="item.momentImgList[0]"/>
            </div>
            <div class="box_3 height_188 thin_line">
              <p class="title_now" @click="toDetail(item.id,item.user.user_id)">
                {{item.momentMessage.slice(0,46)}}
                <span v-if="item.momentMessage.length>46">...</span>
              </p>
              <div class="operation_info">
                <!--阅读数量-->
                <img src="../../../../static/images/discover/eye.png" class="w_04 mr_006"/>
                <span>{{item.readNum}}</span>
                <!--评论数量-->
                <img @click="toDetail(item.id)" src="../../../../static/images/discover/comment.png" class="w_04 mr_006"/>
                <span class="size_28">{{item.commentNum}}</span>
                <!--是否点赞以及点赞数量-->
                <img v-if="item.likeStatus" src="../../../../static/images/discover/nozan.png" class="w_04 mr_006" @click="giveMomentLike(item.id,index)"/>
                <img v-else src="../../../../static/images/discover/zan.png" class="w_04 mr_006" @click="removeMomentLike(item.id,index)"/>
                <span class="size_28">{{item.likeNum}}</span>
              </div>
            </div>
            <div class="box_4 height_188">
              <div class="operation_info">
                <div @click="changeUserStartId(item.user.user_id)">
                  <img v-if="item.user" :src="item.user.head_image" src="../../../../static/images/discover/a.png" class="mr_16 f_left circle_4"/>
                  <img v-else src="../../../../static/images/discover/normalhead.png" class="mr_16 f_left circle_4"/>
                  <span v-if="item.user" class="now_user f_left">{{item.user.nick_name}}</span>
                  <span v-else class="now_user f_left">尚未设置昵称</span>
                </div>
                <span class="now_date">{{item.createDate}}</span>
              </div>
            </div>
          </div>
        </div>
        <!--社区列表E-->
      </div>
    </mt-loadmore>
  </div>


</template>

<script>
    import moment from "moment";
    import { MessageBox } from 'mint-ui';
    import shareBox from '../component/shareBox.vue';
    export default {
      name: "Now",
      data(){
          return{
            userId:this.$store.state.userId,
            nowList:[],
            //刷新分页
            allLoaded: false,
            loadEnd:false,
            loading:false,
            list:4,
            pageNum:1,
            topStatus: '',
            //点击大图
            showImg:false,
            imgSrc: '',
            //分享参数
            flag: 'now',
            type: 'now',
          }
      },
      components: {
        shareBox
      },
      methods:{
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
          //this.nowList=[];
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
        toDetail: function (id,userId) {
          this.$store.state.UserStartId = userId;
          this.$router.push({path:"/now/nowDetail",query:{id:id}})
        },
        //转换时间
        convert: function(date) {
          moment.locale('zh-cn');
          let beforeDate = date
          let newDate = moment(new Date()).valueOf()
          date = moment(date).valueOf()
          let twoDayDate = 172800000
          let oneDayDate = 86400000
          let oneMinute = 60000
          if(newDate - date > twoDayDate) {
            return beforeDate.substring(0,10).substr(5,6)
          }
          if(newDate - date > oneDayDate || newDate - date <= twoDayDate) {
            return beforeDate = '昨天'
          }
          if (newDate - date > oneMinute || newDate - date <= oneDayDate) {
            let data = moment(beforeDate.substring(0,10), "YYYYMMDD").fromNow();
            return data
          }
          if(newDate - date < oneMinute){
            return beforeDate = '刚刚'
          }
        },
        getRefreshList: function () {
          //获取此刻列表第一页
          let _this = this;
          this.loading=true;
          this.loadEnd=false;
          this.$http.post(INDEXMESSAGE.getNow, {"uid": this.$store.state.userId,"pageNo":1, "length":_this.list}).then(function (res) {
            if (res.data.status) {
              _this.pageNum=1;
              _this.loading=false;
              _this.nowList = res.data.data;
              for(let i = 0; i < _this.nowList.length; i++) {
                _this.nowList[i].createDate = _this.convert(_this.nowList[i].createDate)
              }
              if(res.data.recordsTotal <= _this.list){
                _this.loadEnd = true;
              }
            } else {
              console.log(res.data.errorMsg);
            }
          });
        },
        //此刻刷新翻页
        getNextList: function () {
          let _this = this;
          if(this.loadEnd){
            this.loadBottom();
            return;
          }
          this.loadEnd=true;
          this.pageNum++;
          this.$http.post(INDEXMESSAGE.getNow, {"uid": this.$store.state.userId,"pageNo":_this.pageNum, "length":_this.list}).then(function (res) {
            _this.loadEnd=false;
            if (res.data.status) {
                for(let i = 0; i < res.data.data.length; i++) {
                  res.data.data[i].createDate = _this.convert(res.data.data[i].createDate)
                }
                _this.nowList = _this.nowList.concat(res.data.data);
                var allPages = Math.ceil(res.data.recordsTotal/_this.list);
                if(allPages <= _this.pageNum){
                  _this.loading = true;
                  _this.allLoaded = true;
                  _this.loadEnd = true;
                  //$("#showAll4").show();
                }
            } else {
              _this.pageNum = _this.pageNum -1;
              console.log(res.data.errorMsg);
            }
          });
        },
        //此刻点赞
        giveMomentLike: function (manageId,index) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.momentGiveLike, {"uid":this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              _this.nowList[index].likeNum = res.data.data.num;
              _this.nowList[index].likeStatus = false;
            } else {
              _this.toLogin();
              //MessageBox('提示', res.data.errorMsg);
            }
          });
        },
        //取消点赞
        removeMomentLike: function (manageId,index) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.momentRemoveLike, {"uid": this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              _this.nowList[index].likeNum = res.data.data.num;
              _this.nowList[index].likeStatus = true;
            } else {
              _this.toLogin();
              //MessageBox('提示', res.data.errorMsg);
            }
          });
        },
        //加关注
        addFoucs: function (foucsId,index) {
          var _this = this;
          console.log(this.$store.state.userId)
          this.$http.post(DISCOVERMESSAGE.focusOn, {"uid":this.$store.state.userId,"focusId": foucsId}).then(function (res) {
            if (res.data.status) {
              _this.nowList[index].focusStatus = res.data.data;
              for(var i=0;i< _this.nowList.length;i++){
                if(_this.nowList[i].user.user_id == foucsId){
                  _this.nowList[i].focusStatus=res.data.data;
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
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.unFocus, {"uid":this.$store.state.userId,"focusId": foucsId}).then(function (res) {
            if (res.data.status) {
              _this.nowList[index].focusStatus = res.data.data;
              _this.nowList[index].focusStatus = res.data.data;
              for(var i=0;i< _this.nowList.length;i++){
                if(_this.nowList[i].user.user_id == foucsId){
                  _this.nowList[i].focusStatus=res.data.data;
                }
              }
            } else {
              _this.toLogin();
              //MessageBox('提示', res.data.errorMsg);
            }
          });
        },
        //此刻收藏
        collection: function (manageId,index) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.momentCollection, {"uid": this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              _this.informationList[index].collectionStatus = false;
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          });
        },
        //此刻取消收藏
        messageBoxCofirm: function(manageId,index){
          MessageBox.confirm('确定取消收藏?').then(action => {
            var _this = this;
            this.$http.post(DISCOVERMESSAGE.momentCollection, {"uid": this.$store.state.userId,"lid": manageId}).then(function (res) {
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
          var showId = '#share_now'+index;
          $(showId).show();
          $("#bgShareNow").show();
        },
        bgHide: function () {
          var showId = '#share_now'+this.indexNum;
          $(showId).hide();
          $("#bgShareNow").hide();
        }
      },
      computed:{
        getUserId(){
          return this.$store.state.userId
        }
      },
      watch:{
        getUserId(val){
          this.getRefreshList()
        }
      },
      mounted(){
        this.getRefreshList()
      }
    }
</script>

<style scoped>
  @import "./../../../../static/css/discover/all.css";
</style>
