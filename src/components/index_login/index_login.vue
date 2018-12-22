<template>
  <div class="all">
    <div>
      <div style="margin:0.3rem 0;display:inline-block">
        <img src="../../../static/images/discover/index_login/logo.png" style="height:0.8rem;margin-bottom: 0;" />
      </div>
      <div class="login" style="margin:0.3rem 0;display:inline-block;float:right;" @click="toLogin()">
        <!--<img src="../../../static/images/discover/index_login/logo.png" style="height:0.8rem;margin-bottom: 0;" />-->
        <p style="padding:0 0.1rem">登陆/注册</p>
      </div>
    </div>
    <div class="boxInfo" style="margin-top:0 ">
      <img src="../../../static/images/discover/index_login/title.jpg" style="width:100%">
    </div>
    <!--资讯列表S-->
    <div>
      <div class="boxInfo">
        <div @click="toDetail(1)">
          <p class="listTitleInfo">
            你已经是辆成熟的车了，该自动驾驶了
          </p>
          <img src="../../../static/images/discover/index_login/list1.jpg" class="listPic312">
        </div>
      </div>
    </div>
    <div>
      <div class="boxInfo">
        <div @click="toDetail(2)">
          <p class="listTitleInfo">
            改革开放40年丨变的是时代，不变的是创新！
          </p>
          <img src="../../../static/images/discover/index_login/list2.jpg" class="listPic312">
        </div>
      </div>
    </div>
    <div>
      <div class="boxInfo">
        <div @click="toDetail(3)">
          <p class="listTitleInfo">
            中国工业报：江淮汽车荣膺中国工业大奖，成为行业首家获奖的综合型车企
          </p>
          <img src="../../../static/images/discover/index_login/list3.jpg" class="listPic312">
        </div>
      </div>
    </div>
    <!--资讯列表E-->
  </div>
</template>

<script>
  export default {
    name: "indexLogin",
    data() {
      return {
      }
    },
    methods: {
      //跳转到举报页面
      toDetail: function (index) {
        this.$router.push('/indexLogin/indexLoginDetail'+index);
      },
    },
    computed: {
    },
    watch: {
    },
    mounted() {
    }
  }

</script>

<style scoped>
  @import "../../../static/css/discover/all.css";

  .channel {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    font-size: .36rem;
    color: #555555;
  }

  .base-line {
    height: .02rem;
    background: #F1F1F1;
    width: 100%;
  }

  .btn {
    width: 100%;
    display: flex;
    text-align: center;
  }

  .btn p {
    flex: 1;
    width: 100%;
    font-size: .32rem;
  }

  .btn p:nth-child(1) {
    color: #888888;
  }

  .btn p:nth-child(1) {
    color: #49BBFF;
    ;
  }
  .login {
    bottom: 0.3rem;
    border-radius: 0.1rem;
    border-color: #49BBFF;
    border:1px solid;
    color: #49BBFF;
    box-sizing:border-box;
    line-height: 0.78rem;
  }
</style>
