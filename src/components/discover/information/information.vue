<template>
  <div class="all" >
    <!--<div @click="bgHide" id="bgShareInfo" style="position: fixed; width: 100%;height: 100%;background: black; display: none;opacity: 0"></div>-->
    <mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="80">
      <div slot="top" class="mint-loadmore-top" style="margin-top:-54px;">
        <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" class="down-frash">下拉刷新</span>
        <span v-show="topStatus === 'loading'">Loading...</span>
      </div>
      <div v-infinite-scroll="getNextList" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
        <!--资讯列表S-->
          <div v-for="(item,index) in informationList">
            <div class="boxInfo">
              <p class="listTitleInfo" @click="toDetail(item.manageId)">
                {{item.manageTitle.slice(0,46)}}
                <span v-if="item.manageTitle.length>46">...</span>
              </p>
              <img class="listPic312" @click="toDetail(item.manageId)" :src="item.imgUrl"/>
              <div class="listIconInfo">
                <!--阅读数量-->
                <img src="../../../../static/images/discover/eye.png" class="f_left"/>
                <span class="f_left">{{item.readNum}}</span>
                <!--是否点赞以及点赞数量-->
                <span class="f_right">{{item.likeNum}}</span>
                <img v-if="item.likeStatus" src="../../../../static/images/discover/nozan.png" class="f_right" @click="giveInformationLike(item.manageId,index)"/>
                <img v-else src="../../../../static/images/discover/zan.png" class="f_right" @click="removeInformationLike(item.manageId,index)"/>
              </div>
            </div>
          </div>
        <!--资讯列表E-->
      </div>
    </mt-loadmore>
  </div>
</template>

<script>
    import { MessageBox } from 'mint-ui';
    import shareBox from '../component/shareBox.vue';
    import { Toast } from 'mint-ui';
    let shareIndex="";
    export default {
      name: "Information",
      data(){
          return{
            userId:this.$store.state.userId,
            pageNum:1,
            allLoaded: false,
            loadEnd:false,
            loading:false,
            informationList:[],
            list: 4,
            topStatus: '',
            flag: 'information',
            type: 'information',
            value: null
          }
      },
      components: {
        shareBox,
      },
      methods:{
        toDetail: function (id) {
          this.$router.push({path:"/information/informationDetail",query:{id:id}})
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
        getRefreshList: function () {
          //获取资讯列表第一页
          let _this = this;
          this.loading=true;
          this.loadEnd=false;
          this.$http.post(INDEXMESSAGE.getInfomation, {"uid": this.$store.state.userId,"pageNo":1, "length":_this.list,labelIds: this.$store.state.selectLabelState}).then(function (res) {
            if (res.data.status) {
              _this.pageNum=1;
              _this.loading=false;
              _this.informationList = res.data.data;
              if(res.data.recordsTotal <= _this.list){
                _this.loadEnd = true;
              }
            } else {
              console.log(res.data.errorMsg);
            }
          });
        },
        //资讯刷新翻页
        getNextList: function () {
          let _this = this;
          if(this.loadEnd){
            this.loadBottom();
            return;
          }
          this.loadEnd=true;
          this.pageNum++;
          this.$http.post(INDEXMESSAGE.getInfomation, {"uid": this.$store.state.userId,"pageNo":_this.pageNum, "length":_this.list,labelIds: this.$store.state.selectLabelState}).then(function (res) {
            _this.loadEnd=false;
            if (res.data.status) {
                _this.informationList = _this.informationList.concat(res.data.data);
                var allPages = Math.ceil(res.data.recordsTotal/_this.list);
                if(allPages <= _this.pageNum){
                  _this.loading = true;
                  _this.allLoaded = true;
                  _this.loadEnd = true;
                }
            } else {
              _this.pageNum = _this.pageNum -1;
              console.log(res.data.errorMsg);
            }
          });
        },
        //资讯点赞
        giveInformationLike: function (manageId,index) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.informationGiveLike, {"uid": this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              _this.informationList[index].likeNum = res.data.data.num;
              _this.informationList[index].likeStatus = false;
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
        removeInformationLike: function (manageId,index) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.informationRemoveLike, {"uid": this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              _this.informationList[index].likeNum = res.data.data.num;
              _this.informationList[index].likeStatus = true;
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
        collection: function (manageId,index) {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.informationCollection, {"uid": this.$store.state.userId,"lid": manageId}).then(function (res) {
            if (res.data.status) {
              _this.informationList[index].collectionStatus = false;
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
        messageBoxCofirm: function(manageId,index){
          MessageBox.confirm('确定取消收藏?').then(action => {
            var _this = this;
            this.$http.post(DISCOVERMESSAGE.informationRemoveCollection, {"uid": this.$store.state.userId,"lid": manageId}).then(function (res) {
              if (res.data.status) {
                _this.informationList[index].collectionStatus = true;
                Toast('取消收藏成功');
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
        //分享
        onShareClick: function (index) {
          this.indexNum = index;
          var showId = '#share_information'+index;
          $(showId).show();
          $("#bgShareInfo").show();
        },
        bgHide: function () {
          var showId = '#share_information'+this.indexNum;
          $(showId).hide();
          $("#bgShareInfo").hide();
        }
      },
      computed:{
        selectLabelState(){
          return this.$store.state.selectLabelState
        }
      },
      watch:{
        selectLabelState(){
          this.getRefreshList()
        }
      },
      mounted(){
//    	alert(11)
        this.$nextTick(function () {
          this.getRefreshList()
        })
      }
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
