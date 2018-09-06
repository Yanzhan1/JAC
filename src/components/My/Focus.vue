<template>
    <div>
      <header class="header">
        <img src="../../../static/images/back@2x.png" alt="" @click="goBack">
        <span class="header-title-fff">关注列表</span>
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
            this.$router.go(-1);
          },
          getFocusList: function () {
            var _this = this;
            this.$http.post(DISCOVERMESSAGE.focusOnList, {"uid": this.userId},this.$store.state.mytoken).then(function (res) {
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
        mounted(){
          this.userId = this.$store.state.userId;
          this.getFocusList();
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
