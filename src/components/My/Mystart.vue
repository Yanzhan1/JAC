<template>
  <div>
    <header class="header header1" id="header1" style="border: none;">
      <img class="header_left" src="../../../static/images/discover/backfff.png" @click="goBack">
      <img class="header_right" src="../../../static/images/discover/morefff.png" @click="onShareClick(0)"/>
    </header>
    <header class="header header2" id="header2" style="display: none">
      <img class="header_left" src="../../../static/images/discover/backblue.png" @click="goBack">
      <p class="header-title-fff">资讯详情</p>
      <img class="header_right" src="../../../static/images/discover/moreblue.png" @click="onShareClick(0)"/>
    </header>
    <div style="background: url('../../../static/images/discover/startbg.png');width: 100%;height: 6rem;text-align: center">
      <div style="width: 100%;height: 1.4rem;padding-top: 1.5rem;background: green">
        <img src="../../../static/images/discover/jshoucang@2x.png"/>
      </div>
      <div style="width: 100%;margin-top: 2.2rem;">
        <p class="font_36 mb_16">用户名</p>
        <p class="font_24fff">千秋无绝色！悦目是佳人！倾国倾城貌！惊为天下人！</p>
        <div class="mytopbottom flex around">
          <div>
            <span>获赞</span>
            <span>176</span>
          </div>
          <div>
            <span>关注</span>
            <span>0</span>
          </div>
          <div>
            <span>粉丝</span>
            <span>107</span>
          </div>
        </div>
      </div>
    </div>
    <!--<img src="../../../static/images/discover/startbg.png" style="width: 100%;height: 6rem;"/>-->
   <!-- <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    <div>
      <div class="nav flex between cocenter">
        <img src="../../../../static/images/back2.png" alt="" @click="$router.go(-1)">
        <img src="../../../../static/images/more.png" alt="" @click="sheetVisible = true">
      </div>
      <div class="top" ref="top">
        <div class="sculpture flex">
          <img :src="userInfo.headImgurl" alt="">
          <div class="flex column around cocenter" style="margin-left: 0.2rem;color: #ffffff">
            <div class="name" style="font-size: 0.36rem">{{userInfo.nickName}}</div>
            <div  v-if='userInfo.city !=null ' style="font-size: 0.24rem">
              <img src="../../../../static/images/location.png" alt="" style="width: 0.3rem;height: 0.3rem">
              <span class="place">{{userInfo.city}}</span>
            </div>
          </div>
          <div class="message flex around">
            <div>
              <span>获赞</span><span>{{likeNum}}</span>
            </div>
            <router-link tag="div"  :to="{path:'/focus',query: {uid: this.$store.state.userId}}">
              <span>关注</span><span>{{focsNum}}</span>
            </router-link>
            <router-link tag="div" :to="{path:'/fans',query: {uid: this.$store.state.userId}}">
              <span>粉丝</span><span>{{fansNum}}</span>
            </router-link>
          </div>
        </div>
      </div>
      <div style="padding:0.16rem 0.4rem 0 0.4rem">
        <div class="flex between cocenter">
		    			<span style="font-size: 0.28rem;color: #ffffff">
		    			我的发布
		    			</span>
          <span style="font-size: 0.24rem;color: #888888;">共{{myList.length}}条</span>
        </div>
        <div class="list" v-for="(item,index) in myList">
          <div class="flex">
            <div>
              <img :src="item.user.head_image" style="width: 0.72rem;height: 0.72rem;border-radius: 35px" />
            </div>
            <div class="flex column between" style="margin-left: 0.18rem">
              <span style="color: #222222;font-size: 0.28rem;"> {{item.user.nick_name}} </span>
              <span class="time" style="color: #888888;">{{item.issuedDate}}</span>
            </div>
          </div>
          <router-link tag="div" class="d_06" :to="{path:'/discover/nowDetail',query: {id:item.id}}">
              <span style="color: #555555;margin-top: 0.2rem;margin-bottom: 0.12rem">
                {{item.momentMessage}}
              </span>
          </router-link>
          <router-link tag="div" :to="{path:'/discover/nowDetail',query: {id:item.id}}">
            <div class="pics" v-if="item.momentImgList">
              <div v-if="item.momentImgList.length==1" v-for="imgItem in item.momentImgList">
                <img :src="imgItem" class="pic1"/>
              </div>
              <div v-if="item.momentImgList.length==2">
                <img :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic2_1"/>
                <img :src="item.momentImgList[1]" class="pic2_2"/>
              </div>
              <div v-if="item.momentImgList.length==3">
                <img :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic3_1"/>
                <img :src="item.momentImgList[1]" class="pic3_2"/>
                <img :src="item.momentImgList[2]" class="pic3_3"/>
              </div>
              <div v-if="item.momentImgList.length>3">
                <div style="position: relative;">
                  <div style="color: #ffffff;right: 0.4rem;bottom: -3rem;position: absolute;font-size: 0.4rem;">
                    {{item.momentImgList.length}}
                  </div>
                  <img :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic3_1"/>
                  <img :src="item.momentImgList[1]" class="pic3_2"/>
                  <img :src="item.momentImgList[2]" class="pic3_3"/>
                </div>
              </div>
            </div>
          </router-link>
          <div class="d_07" style="margin-bottom: 0.3rem;">
            &lt;!&ndash;浏览量&ndash;&gt;
            <div class="d_08">
              <span class="iconNum">{{item.createDate}}</span>
            </div>
            <div class="d_09">
              &lt;!&ndash;评论&ndash;&gt;
              <img @click="toDetail(item.id)" src="../../../../static/images/discover/pinglun.png" class="icon"/>
              <span class="iconNum">{{item.commentNum}}</span>
              <div style="width: 0.2rem;"></div>
              &lt;!&ndash;是否点赞&ndash;&gt;
              <span v-if="item.likeStatus">
                <img src="../../../../static/images/discover/good2@2x.png" class="icon" @click="giveNowLike(item.id,index)">
              </span>
              <span v-else>
                <img src="../../../../static/images/discover/good1@2x.png" class="icon" @click="removeNowLike(item.id,index)">
              </span>
              <span class="iconNum">{{item.likeNum}}</span>
            </div>
          </div>
        </div>
      </div>

      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible"
        cancelText="">
      </mt-actionsheet>
    </div>-->
  </div>
</template>

<script>
  import moment from "moment";
  import { MessageBox } from 'mint-ui';
  export default {
    name: "user-start",
    data(){
      return{
        listNum:3,
        sheetVisible:false,
        popupVisible:false,
        verifycontent:"",
        actions:[
          {name:"编辑个人信息",method:this.editPersonalDetails},
        ],
        myList: [],
        userInfo:{

        },
        likeNum:0,
        fansNum:0,
        focsNum:0,
        giveId:0,
        showImg:false,
        imgSrc: ''
      }
    },
    components: {
    },
    methods:{
      //转换时间
      convert: function(date) {
        date = date.substring(0,10)
        moment.lang('zh-cn');
        let data = moment(date, "YYYYMMDD").fromNow();
        return data
      },
      clickImg(e) {
        this.showImg = true;
        this.imgSrc = e.currentTarget.src;;
      },
      toDetail: function (id,userId) {
        this.$store.state.UserStartId = userId;
        this.$router.push({path:"/discover/nowDetail",query:{id:id}})
      },
      viewImg(){
        this.showImg = false;
      },
      getuserMessage(){
        var data={
          userid:this.$store.state.userId
        }
        var url = USERMESSAGE.getuser
        this.$http({url: url,
          params: data,
          method:"get",
          formUrlencoded
        }).then((res)=>{
          if(res.data.success){
            this.userInfo = res.data.data;
//            this.$store.state.userstartUuid = res.data.account.uuid;
          }
        }).catch(()=>{

        })
      },
      //跳转到关注页面
      toFocus: function(){
        this.giveId = this.$store.state.userId;
        this.$router.push({path:'/focus'});
      },
      //跳转到粉丝页面
      toFans(){
        this.giveId = this.$store.state.userId;
        this.$router.push({path:'/fans'});
      },
      //我的关注数量
      myFocusNum: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myFocusNum,{"uid": _this.$store.state.userId}).then(function (res) {
          if (res.data.status) {
            _this.focsNum = res.data.data;
          } else {
            console.log(res.data.errorMsg);
            // MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //我的粉丝数量
      myFansNum: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myFansNum,{"uid": _this.$store.state.userId}).then(function (res) {
          if (res.data.status) {
            _this.fansNum = res.data.data;
          } else {
            console.log(res.data.errorMsg);
            //MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //我的点赞数量
      myLikeNum: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myLikeNum,{"uid": _this.$store.state.userId}).then(function (res) {
          if (res.data.status) {
            _this.likeNum = res.data.data;
            //
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      getMineList: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.issueMomentList,{"uid": _this.$store.state.userId,"hisUid":_this.$store.state.userId}).then(function (res) {
          if (res.data.status) {
            for(let i = 0; i < res.data.data.length; i++) {
              res.data.data[i].createDate = _this.convert(res.data.data[i].createDate)
            }
            _this.myList = res.data.data;
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      //给此刻点赞
      giveNowLike: function (manageId,index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentGiveLike, {"uid": _this.$store.state.userId,"lid": manageId}).then(function (res) {
          if (res.data.status) {
            _this.myList[index].likeNum = res.data.data.num;
            _this.myList[index].likeStatus = false;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      //给此刻取消点赞
      removeNowLike: function (manageId,index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentRemoveLike, {"uid": _this.$store.state.userId,"lid": manageId}).then(function (res) {
          if (res.data.status) {
            _this.myList[index].likeNum = res.data.data.num;
            _this.myList[index].likeStatus = true;
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
      collect(){

      },
      editPersonalDetails(){
        this.$router.push({path:'/my/editPersonalDetails'})
      },
      addfriend(){
        this.popupVisible = true;
      },
      addfriendtrue(){
        this.popupVisible = false;
      },
      addfriendfalse(){
        this.popupVisible = false;
      }
    },
    mounted(){
      this.$store.dispatch('hideFoot');
      /*$(window).scroll(()=> {
        if($("html,body").scrollTop() >= $(".top").height()){
            $(".nav").css('background','#666666')
        }else{
          $(".nav").css('background','rgba(34,34,34,0.10)')
        }
      })*/
      this.getMineList();
      this.getuserMessage();
      this.myFocusNum();
      this.myFansNum();
      this.myLikeNum();
    }
  }

  /*悬浮,更换头部背景透明度和文字*/
  $(document).ready(function(){
    //获取图片高度imgHeight
    var imgHeight = 0;
    $("#bgImg").on("load",function(){
      imgHeight = $(this).height();
    });
    //根据图片高度切换透明/不透明头部
    $(document).scroll(function(){
      var top = $(document).scrollTop();
      if(top < imgHeight){
        $("#header1").show();
        $("#header2").hide();
      }
      else if(top >= imgHeight){
        $("#header1").hide();
        $("#header2").show();
      }
    });
  });
</script>

<style scoped>
  @import "./../../../static/css/discover/detail.css";
/*  @import "../../publicmodule/css/discover.css";
  .all .mui-content{
    padding-top: 0rem;
  }
  .nav{
    height: 0.88rem;
    background: rgba(34,34,34,0.10);
    width: 100%;
    position: fixed;
    padding: 0 0.4rem;
    z-index: 999;
  }
  .nav>img:nth-child(1){
    width: 0.26rem;
    height: 0.42rem;
  }
  .nav>img:nth-child(2){
    width: 0.4rem;
    height: 0.08rem;
  }
  .top{
    height: 5.24rem;
    background:url("../../../../static/images/personbg.png") no-repeat center center ;
    background-size: cover;
    overflow: hidden;
    position: relative;
  }
  .sculpture{
    width: 100%;
    margin-top: 2rem;
    height: 1.4rem;
  }
  .sculpture>img{
    width: 1.4rem;
    margin-left: 0.4rem;
  }
  img{
    margin-bottom: -3px;
  }
  .message{
    height: 1.2rem;
    width: 100%;
    background: rgba(34,34,34,0.40);
    font-size: 0.36rem;
    color: #ffffff;
    position: absolute;
    bottom: 0;
    line-height: 1.2rem;
  }
  .message>div>span:nth-child(1){
    margin-right: 0.1rem;
  }
  .list{
    padding-top: 0.4rem;
    font-size: 0.24rem;
  }
  .func>img{
    margin-right: 0.24rem;
  }
  .verifycontent{
    margin-top: 0.16rem;
    width: 90%;
    position: relative;
    display: block;
    height: 0.88rem;
    font-size: 0.28rem;
    color: #222222;
    border-radius: 0.16rem;
    background:  #F8F8F8;
    border: 0;
    padding-left: 0.48rem;
    line-height: 0.28rem;
  }
  .btn{
    flex-direction: row-reverse;
  }
  .btn>div{
    padding: 0.1rem 0.2rem 0.2rem 0.2rem;
  }
  .pics{
    margin-bottom: 0.2rem;
    height: 3.2rem;
    object-fit:cover;
  }
  .pic1{
    border-radius: 0.1rem;width: 100%;height:3.2rem;object-fit:cover;
  }
  .pic2_1{
    border-radius: 0.1rem;width: 49%;height:3.2rem;float: left; border-radius: 0.1rem 0 0 0.1rem;object-fit:cover;
  }
  .pic2_2{
    border-radius: 0.1rem;width: 49%;height:3.2rem;float: left; border-radius: 0 0.1rem 0.1rem 0;object-fit:cover;
  }
  .pic3_1{
    border-radius: 0.1rem;width: 60%;height:3.2rem;float: left; border-radius: 0.1rem 0 0 0.1rem;object-fit:cover;
  }
  .pic3_2{
    border-radius: 0.1rem;width: 38%;height:1.55rem;float: left; border-radius: 0 0.1rem 0 0;object-fit:cover;
    margin-bottom: 0.1rem;
  }
  .pic3_3{
    border-radius: 0.1rem;width: 38%;height:1.55rem;float: left; border-radius: 0 0 0.1rem 0;object-fit:cover;
  }
  .icon{
    width: 0.44rem;margin-right: 0.16rem;
  }
  .iconNum{
    color: #888888;font-size: 0.24rem;margin-right: 0.1rem;
  }*/
</style>
