<template>
  <div class="all">
    <header class="header">
      <img class="header-left" src="../../../static/images/back@2x.png" @click="$router.go(-1)">
      <span class="header-title">报名信息</span>
      <div></div>
    </header>
    <div class="line"></div>
    <div class="content">
      <div class="activityInfo">
        <h3 class="activityTittle">活动信息</h3>
        <div class="gradientline"></div>
        <ul>
          <li>活动名称: <span>{{info.activityTitle}}</span></li>
          <li>活动时间: <span>{{info.planDate}}</span></li>
          <li>活动地址: <span>{{info.activityAddress}}</span></li>
        </ul>
      </div>
      <div class="activityInfo">
        <h3 class="activityTittle">报名信息</h3>
        <div class="gradientline"></div>
        <ul>
          <li>姓名: <span>{{info.name}}</span></li>
          <li>手机号码: <span>{{info.phone}}</span></li>
          <li>预约人数: <span>{{info.reservationNum}}</span></li>
          <li>是否携带儿童: <span v-if="info.childFlag==0">否</span><span v-else>是</span></li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data(){
      return {
        popupVisible:false,
        info:'',
        userId:this.$store.state.userId,
      }
    },
    created(){
      this.activityId = this.$route.query.activityId;
    },
    methods:{
      //报名信息
      getList: function () {
        var _this = this;
        console.log(_this.$store.state.userId)
        console.log(_this.activityId)
        this.$http.post(DISCOVERMESSAGE.myRegistrationInfo, {"uid": _this.$store.state.userId,"lid":_this.activityId}).then(function (res) {
          if (res.data.status) {
            _this.info = res.data.data;
            //console.log(res.data.data)
          } else {
            console.log(res.data.errorMsg);
          }
        });
      }
    },
    mounted(){
      this.$nextTick(function () {
        //初始化数据
        this.getList();
      }),
        this.$store.dispatch('hideFoot');
    }
  }
</script>


<style scoped>
  /*分割线*/
  ul li{
    list-style: none;
  }
  .line{
    height: 0;
    margin-top: .92rem;
  }
  .content{

  }
  .activityInfo{
    padding: .4rem;
    margin-bottom: .1rem;
  }
  .activityTittle{
    font-size: .3rem;
    color: #555555;
    font-weight: bolder;
    padding: .2rem 0;
  }
  .activityInfo li{
    font-size: .22rem;
    color: #888888;
    padding: .1rem 0;
  }
</style>
