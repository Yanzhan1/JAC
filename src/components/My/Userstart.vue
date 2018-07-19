<template>
  <div class="all" style="word-break:break-all;">
   <!-- <div @click="bgHide" id="bgShare" style="position: fixed; width: 100%;height: 100%;background: #000000; display: none;opacity: 0.2"></div>
    <big-img v-if="showImg" @clickit="viewImg" :imgSrc="imgSrc"></big-img>
    <div>
      <div class="nav flex between cocenter">
        <img src="../../../static/images/back2.png" style="width: 0.26rem;height: 0.42rem" alt="" @click="goBack">
        &lt;!&ndash;<img src="../../../static/images/more.png" alt="" @click="sheetVisible = true" style="width: 0.4rem;height: 0.08rem">&ndash;&gt;
        &lt;!&ndash;<img src="../../../static/images/more.png" alt="" @click="onShareClick(0)" style="width: 0.4rem;height: 0.08rem">&ndash;&gt;
      </div>
      <div class="top" ref="top">
        <div class="sculpture flex">
          <img :src="this.userInfo.headImgurl" alt="" style="width: 1.4rem;height: 1.4rem">
          <div class="flex column around cocenter" style=";margin-left: 0.2rem;color: #ffffff">
            <div class="name" style="font-size: 0.36rem">{{this.userInfo.nickName}}</div>
            <div v-if='this.userInfo.city !=null ' style="font-size: 0.24rem">
              <img src="../../../static/images/location.png" alt="" style="width: 0.3rem;height: 0.3rem">
              <span class="place">{{this.userInfo.city}}</span>
            </div>
          </div>
          <div class="message flex around">
            <div>
              <span>获赞</span><span>{{likeNum}}</span>
            </div>
            <router-link tag="div" :to="{path:'/focus',query: {uid: this.$store.state.UserStartId}}">
              <span>关注</span><span>{{focsNum}}</span>
            </router-link>
            <router-link tag="div" :to="{path:'/fans',query: {uid: this.$store.state.UserStartId}}">
              <span>粉丝</span><span>{{fansNum}}</span>
            </router-link>
          </div>
        </div>
      </div>
      <div style="padding:0.16rem 0.4rem 0 0.4rem">
        <div class="flex between cocenter">
		    			<span style="font-size: 0.28rem;color: #ffffff">
		    			TA的发布
		    			</span>
          <span style="font-size: 0.24rem;color: #888888;">共{{myList.length}}条</span>
        </div>
        <div class="list" v-for="(item,index) in myList" :key="index">
          <shareBox :index="0" :item="item" :flag="flag" :type="type" :isCenter="true" @closeShare="bgHide"></shareBox>
          <div class="flex">
            <div>
              <img :src="item.user.head_image" style="width: 0.72rem;height: 0.72rem;border-radius: 35px" />
            </div>
            <div class="flex column between" style="margin-left: 0.18rem">
              <span style="color: #222222;font-size: 0.28rem;"> {{item.user.nick_name}}</span>
              <span class="time" style="color: #888888;">{{item.issuedDate}}</span>
            </div>
          </div>
          <router-link tag="div" :to="{path:'/discover/nowDetail',query: {id:item.id}}">
            <div class="d_06">
              <span style="color: #555555;margin-top: 0.2rem;margin-bottom: 0.12rem">
                {{item.momentMessage}}
              </span>
            </div>
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
                <img :src="item.momentImgList[1]" class="pic3_3"/>
              </div>
              <div v-if="item.momentImgList.length>3">
                <div style="position: relative;">
                  <div style="color: #ffffff;right: 0.4rem;bottom: -3rem;position: absolute;font-size: 0.4rem;">
                    {{item.momentImgList.length}}
                  </div>
                  <img :src="item.momentImgList[0]" style="margin-right: 2%;" class="pic3_1"/>
                  <img :src="item.momentImgList[1]" class="pic3_2"/>
                  <img :src="item.momentImgList[1]" class="pic3_3"/>
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
              <img @click="toDetail(item.id)" src="../../../static/images/discover/pinglun.png" class="icon"/>
              <span class="iconNum">{{item.commentNum}}</span>
              <div style="width: 0.2rem;"></div>
              &lt;!&ndash;是否点赞&ndash;&gt;
              <span v-if="item.likeStatus">
                <img src="../../../static/images/discover/good2@2x.png" class="icon" @click="giveNowLike(item.id,index)">
              </span>
              <span v-else>
                <img src="../../../static/images/discover/good1@2x.png" class="icon" @click="removeNowLike(item.id,index)">
              </span>
              <span class="iconNum">{{item.likeNum}}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="height: 1rem;"></div>
      <div v-if="focusStatu==0" class="add" @click="addFoucs">加关注</div>
      <div v-else-if="focusStatu==1" class="added" @click="removeFoucs">已关注</div>
      <div v-else-if="focusStatu==2" class="added" @click="removeFoucs">相互关注</div>
      <mt-actionsheet
        :actions="actions"
        v-model="sheetVisible"
        cancelText="">
      </mt-actionsheet>
    </div>
    <mt-popup
      v-model="popupVisible"
      position="middle">
       <div style="font-size: 0.28rem;width: 6rem;height: 2.8rem;padding-left: 0.4rem;padding-top: 0.4rem;overflow: hidden">
        <span style="margin-bottom: 0.16rem;color: #222222">您需要发送验证申请，等待对方通过。</span>
        <input type="text" placeholder="请输入验证消息" v-model="verifycontent" class="verifycontent">
        <div class="flex cocenter btn">
          <div style="color: #ED9660" @click="addfriendtrue">确定</div>
          <div style="color: #cccccc" @click="addfriendfalse">取消</div>
        </div>
      </div>
    </mt-popup>
    <mt-popup
      v-model="delfriendVisible"
      position="middle">
      <div style="font-size: 0.28rem;width: 6rem;padding-left: 0.4rem;padding-top: 0.4rem;overflow: hidden">
        <span style="margin-bottom: 0.16rem;color: #222222">你确定要删除此好友吗</span>
        <div class="flex cocenter btn">
          <div style="color: #ED9660" @click="delfriendtrue">确定</div>
          <div style="color: #cccccc" @click="delfriendVisible = false">取消</div>
        </div>
      </div>
    </mt-popup>
    &lt;!&ndash;<CommentBox ref="commentbox"></CommentBox>&ndash;&gt;
    <div id="bg1" @click="bgbtn1" style="display: none;  position:fixed;  top: 0;  left: 0;  width: 100%;  height: 100%;  background-color: #000000;  z-index:1; opacity: 0.2;"/>-->
  </div>
</template>

<script>
  /*import CommentBox from './commentBox.vue';*/
  import moment from "moment";
  import { Toast } from 'Mint-ui';
  import { MessageBox } from 'mint-ui';
  /*import shareBox from '../publicmodule/shareBox.vue';*/
  export default {
    /*components:{
      CommentBox
    },*/
    name: "user-start",
    data(){
      return{
        sheetVisible:false,
        popupVisible:false,
        delfriendVisible:false,
        verifycontent:"",
        userInfo:{},
        focusStatu:0,
        actions:[
          {name:"关注",method:this.removeFoucs},
          {name:"加好友",method:this.addfriend},
          {name:"修改备注",method:this.changeremark},
          /*{name:"发消息",method:function () {
              console.log(222)
            }},*/
          {name:"删除好友",method:this.delfriend},
          // {name:"举报",method:this.inform}
        ],
        myList: [],
        likeNum:0,
        fansNum:0,
        focsNum:0,
        user:this.$store.state.UserId,
        showImg:false,
        imgSrc: '',
        flag: 'person',
        type: 'person',
      }
    },
    components: {
      /*shareBox*/
    },
    methods:{
      //转换时间
      convert: function(date) {
        date = date.substring(0,10)
        moment.lang('zh-cn');
        let data = moment(date, "YYYYMMDD").fromNow();
        return data
      },
      toDetail: function (id,userId) {
        this.$store.state.UserStartId = userId;
        this.$router.push({path:"/discover/nowDetail",query:{id:id}})
      },
      clickImg(e) {
        this.showImg = true;
        this.imgSrc = e.currentTarget.src;;
      },
      viewImg(){
        this.showImg = false;
      },
      CommentBoxchange(){
        this.$store.dispatch('showcommentBox')
        this.$refs.commentbox.boxfocus();
      },
      init(){
        //获取用户信息
        var data={
          userid:this.$store.state.UserStartId
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
      collect(){

      },
      //电咖没有好友功能
//      getfriendconnect(){
//        //获取是否是好友关系
//        var checkfriend={
//          from_account:this.$store.state.userId,
//          to_account:this.$store.state.UserStartId
//        }
//        this.$http({url: FRIENDMESSAGE.checkFriend,
//          params: checkfriend,
//          method:"post",
//          formUrlencoded
//        }).then((res)=>{
//          console.log(res)
//          if(!res.data.runflag){
//            this.actions.splice(2,2)
//          }else{
//            this.actions.splice(1,1)
//          }
//        }).catch(()=>{
//
//        })
//      },
      changeremark(){
        this.$router.push({path:'/friend/changeremark'})
      },
      addfriend(){
        this.popupVisible = true;
      },
      addfriendtrue(){
        /*var userid = this.$store.state.userId;
        var UserStartId = this.$store.state.UserStartId;
        var add_type = 'Add_Type_Both';*/
        if(isMobile.iOS()){
          var params = {
            uuid:this.$store.state.userstartUuid,
            content:this.verifycontent
          }
          window.webkit.messageHandlers.addFriend.postMessage(params);
        }else if(isMobile.Android()){
          js2android.addFriend(this.$store.state.userstartUuid,this.verifycontent);
        }
          this.popupVisible = false;
        /*if (isMobile.iOS()) {
          var add_source = 'AddSource_Type_ios'
        } else if(isMobile.Android()) {
          var add_source = 'AddSource_Type_android'
        }
        // alert(this.$store.state.userstartUuid)
        var data = {
          from_account:this.$store.state.uuid,
          to_account:this.$store.state.userstartUuid,
          add_type:'Add_Type_Both',
          add_source:add_source,
          // add_wording:this.verifycontent
        }
        var url = FRIENDMESSAGE.addFriend
        this.$http({url: url,
          params: data,
          method:"post",
          formUrlencoded
        }).then((res)=>{
          console.log(res)
          if(res.data.errcode == 0){
            let instance = Toast({
              message: '添加成功',
              position: 'middle',
              duration: 1000
            });
          }else{
            let instance = Toast({
              message: res.data.errmsg,
              position: 'middle',
              duration: 1000
            });
          }
        }).catch(()=>{

        })*/
      },
      delfriend(){
        this.delfriendVisible = true
      },
      delfriendtrue(){
        if(isMobile.iOS()){
          var params = {
            uuid:this.$store.state.userstartUuid
          }
          window.webkit.messageHandlers.delFriend.postMessage(params);
        }else if(isMobile.Android()){
          js2android.delFriend(this.$store.state.userstartUuid);
        }
        this.delfriendVisible = false;
      },
      //跳转到举报页面
      inform: function () {
        this.$store.state.UserStartId = this.$store.state.UserStartId;
        this.$router.push('/inform');
      },
      //获取我和他人的关注状态
      focusStatus: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.focusStatu,{"uid": _this.$store.state.userId,"focusId": _this.$store.state.UserStartId}).then(function (res) {
          if (res.data.status) {
            _this.focusStatu = res.data.data;
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      //加关注
      addFoucs: function () {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.focusOn, {"uid": _this.$store.state.userId,"focusId": _this.$store.state.UserStartId}).then(function (res) {
          if (res.data.status) {
            _this.focusStatus();
            _this.focusStatu = res.data.data;
            Toast('关注成功');
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //取消关注
      removeFoucs: function () {
        var _this = this;
        MessageBox.confirm('确定取消关注?').then(action => {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.unFocus, {"uid": _this.$store.state.userId,"focusId": _this.$store.state.UserStartId}).then(function (res) {
            if (res.data.status) {
              _this.focusStatus();
              _this.focusStatu = res.data.data;
              Toast('取消成功');
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
      //他的关注数量
      myFocusNum: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myFocusNum,{"uid": _this.$store.state.UserStartId}).then(function (res) {
          if (res.data.status) {
            _this.focsNum = res.data.data;
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      //他的粉丝数量
      myFansNum: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myFansNum,{"uid": _this.$store.state.UserStartId}).then(function (res) {
          if (res.data.status) {
            _this.fansNum = res.data.data;
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      //他的点赞数量
      myLikeNum: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.myLikeNum,{"uid": _this.$store.state.UserStartId}).then(function (res) {
          if (res.data.status) {
            _this.likeNum = res.data.data;
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      getUserList: function(){
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.issueMomentList,{"uid": _this.$store.state.userId,"hisUid":_this.$store.state.UserStartId}).then(function (res) {
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
        this.$http.post(DISCOVERMESSAGE.momentGiveLike, {"uid": _this.$store.state.UserStartId,"lid": manageId}).then(function (res) {
          if (res.data.status) {
            _this.myList[index].likeNum = res.data.data.num;
            _this.myList[index].likeStatus = false;
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      //给此刻取消点赞
      removeNowLike: function (manageId,index) {
        var _this = this;
        this.$http.post(DISCOVERMESSAGE.momentRemoveLike, {"uid": _this.userId,"lid": manageId}).then(function (res) {
          if (res.data.status) {
            _this.myList[index].likeNum = res.data.data.num;
            _this.myList[index].likeStatus = true;
          } else {
            if(_this.$store.state.userId == null){
              _this.toLogin();
            }else{
              MessageBox('提示', res.data.errorMsg);
            }
          }
        });
      },
      addfriendfalse(){
        this.popupVisible = false;
      },
      //返回上一级
      goBack:function () {
        this.$router.go(-1);
        this.$store.dispatch("showFoot")
      },
      //分享
      onShareClick: function (index) {
        this.indexNum = index;
        var showId = '#share_person'+index;
        $(showId).show();
        $("#bgShare").show();
        this.bgbtn1();
      },
      bgbtn1(){
        $("#mess").hide();
        $("#bg1").hide();
      },
      bgHide: function () {
        var showId = '#share_person'+this.indexNum;
        $(showId).hide();
        $("#bgShare").hide();
      },
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
      this.init();
      //获取好友关系 电咖没有好友功能
      // this.getfriendconnect();
      this.getUserList();
      this.myFocusNum();
      this.myFansNum();
      this.myLikeNum();
      this.focusStatus();
    }
  }
</script>

<style scoped>
  /*@import "css/discover.css";*/
  .all .mui-content{
    padding-top: 0rem;
  }
  .nav{
    height: 0.88rem;
    background:rgba(0,0,0,0.4);
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
 /* .top{
    height: 5.24rem;
    background:url("./../../../static/images/personbg.png") no-repeat center center ;
    background-size: cover;
    overflow: hidden;
    position: relative;
  }*/
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
    background: rgba(34,34,34,0.10);
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
    width: 0.32rem;
    height: 0.32rem;
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
    background:  #f8f8f8;
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
  ::-webkit-input-placeholder { /* WebKit browsers */
    color:    #888888;
    font-size: .24rem;
  }
  :-moz-placeholder { /* Mozilla Firefox 4 to 18 */
    color:    #888888;
    font-size: .24rem;
  }
  ::-moz-placeholder { /* Mozilla Firefox 19+ */
    color:    #888888;
    font-size: .24rem;
  }
  :-ms-input-placeholder { /* Internet Explorer 10+ */
    color:    #888888;
    font-size: .24rem;
  }
  .add{
    background: #FC3846;
    border-radius: 0.16rem;
    height: 0.88rem;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.88rem;
    position: fixed;
    bottom: 0.1rem;
    width: 90%;
    margin-left: 5%;
  }
  .added{
    background: #CCCCCC;
    border-radius: 8px;
    height: 0.88rem;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.88rem;
    position: fixed;
    bottom: 0.1rem;
    width: 90%;
    margin-left: 5%;
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
  }
</style>
