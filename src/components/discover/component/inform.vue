<template>
    <div>
      <header class="head">
        <img class="header-left" src="../../../../static/images/back@2x.png" @click="$router.go(-1)">
        <p class="header-title-fff">举报</p>
        <span @click="send">提交</span>
      </header>
      <div style="margin-top: 0.4rem;"></div>
      <span class="title">举报原因:</span>
      <div class="inform-radio">
      <mt-radio
        v-model="value"
        :options="['色情低俗', '广告骚扰', '政治宗教', '虚假欺骗', '侵权（肖像、诽谤、抄袭、冒用）', '违禁内容（暴力恐怖、令人不适…）','其他']">
      </mt-radio>
      </div>
      <!--<span class="title">上传截图:</span><br/>
      <img style="margin-left: 0.4rem;width: 1rem;height: 1rem;" src="../../../static/images/discover/jiahao.png"/>-->
    </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { Radio } from 'mint-ui';
  import { Toast } from 'mint-ui';
    export default {
      name: "infrom",
      data(){
          return{
            value:''
          }
      },
      created(){
        this.$store.state.UserStartId = this.$store.state.UserStartId;
      },
      methods:{
        send: function () {
          MessageBox.confirm('确定提交举报?').then(action => {
            var _this = this;
            this.$http.post(DISCOVERMESSAGE.informOthers, {"uid": _this.$store.state.userId,"lid":_this.$store.state.UserStartId,"informStatus":_this.value}).then(function (res) {
              if (res.data.status) {
                Toast('举报成功');
                _this.$router.go(-1);
              } else {
                if(_this.$store.state.userId == null){
                  _this.toLogin();
                }else{
                  MessageBox('提示', res.data.errorMsg);
                }
              }
            });
          });
        }
      },
      mounted(){
      }
    }
</script>

<style scoped>
  @import "./../../../../static/css/discover/detail.css";
  ul li{
    list-style: none;
  }
  .title{
    font-size: 0.36rem;
    color: #222222;
    margin-left: 0.4rem;
  }
  .list span{
    padding-left: 0.4rem;
  }
  ul li{
    height: 0.6rem;
  }
  input{
    background-size: 0.24rem 0.24rem;
    background-position: 0 0.08rem;
    margin-left:-15px;
  }
  label{
    float: right;
    color:#888888;
    font-size: 0.28rem;
  }
</style>
