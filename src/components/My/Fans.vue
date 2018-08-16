<template>
    <div>
      <header class="header">
        <img src="../../../static/images/back@2x.png" alt="" @click="goBack">
        <span class="header-title-fff">粉丝列表</span>
        <div class="header-right"></div>
      </header>
      <div style="margin-top: 1.2rem;"></div>
      <ul class="wrap_92" v-for="item in list">
        <li>
          <img v-if="item.user" :src="item.user.head_image" class="headPic">
          <img v-else src="../../../static/images/discover/normalhead.png" class="headPic">
          <div class="nameBox">
            <span v-if="item.user" class="name">{{item.user.nick_name}}</span>
            <span v-else class="name">尚未设置昵称</span>
            <div class="line"></div>
          </div>
        </li>
      </ul>
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
  import { MessageBox } from 'mint-ui';
    export default {
        name: "fans",
      data(){
          return{
            listNum:9,
            list:[],
            userId:null
          }
      },
      created(){
      },
      methods:{
        goBack:function () {
          if (isMobile.iOS()) {
            window.webkit.messageHandlers.back.postMessage({ back:0 });
          } else if(isMobile.Android()) {
            window.NativeJavaScriptInterface.back({back:1});
          }
        },
        getFansList: function () {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.fansList, {"uid":this.userId},this.$store.state.mytoken).then(function (res) {
            if (res.data.status) {
              _this.list = res.data.data;
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          });
        }
      },
      mounted(){
        this.userId = this.$store.state.userId;
        this.getFansList();
      }
    }
</script>

<style scoped>
  @import "./../../../static/css/discover/detail.css";
  ul li{
    list-style: none;
    overflow: hidden;
  }
  .headPic{
    width: 0.6rem;
    height: 0.6rem;
    margin-top: 0.1rem;
    border-radius: 50%;
    float: left;
  }
  .name{
    color: #222222;
    font-size: 0.28rem;
    line-height: 0.5rem;
    height: 0.5rem;
  }
  .nameBox{
    float: right;
    width: 88%;
    height: 0.8rem;
    line-height: 0.8rem;
    border-bottom: 0.02rem solid #f1f1f1;
  }
</style>
