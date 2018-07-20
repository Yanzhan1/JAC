<template>
  <div class="allcontent">
    <div>
      <header class="head">
        <img class="header-left" src="../../../../static/images/back@2x.png" @click="$router.go(-1)">
        <p class="header-title-fff" style="text-align: center">活动报名</p>
        <div class="header-right"></div>
      </header>
      <div class="sign_cell">
        <p>姓名</p>
        <input v-model="user" placeholder="点击输入姓名"/>
      </div>
      <div class="f5_line02"></div>
      <div class="sign_cell">
        <p>手机号码</p>
        <input v-model="phoneNum" placeholder="请输入手机号"/>
      </div>
      <div class="f5_line1"></div>
      <div class="sign_cell">
        <p>预约人数</p>
        <input v-model="user" placeholder="点击选择预约人数"/>
      </div>
      <div class="f5_line02"></div>
      <div class="sign_cell">
        <p>是否携带小孩</p>
        <input v-model="user" placeholder="点击选择是否携带小孩"/>
      </div>
      <!--<div class="box_01">
        <p class="lab">姓名:</p>
        <input v-model="user" class="inp" placeholder=""/>
      </div>
      <div class="box_01">
        <p class="lab">手机:</p>
        <input v-model="phoneNum" class="inp" placeholder=""/>
      </div>
      <div class="box_01">
        <p class="lab">预约人数:</p>
        <input v-model="peopleNumber" class="inp" placeholder=""/>
      </div>
      <div class="box_01">
        <p class="lab">是否携带小孩:</p>
        <div class="inform-radio">
          <mt-radio
            v-model="value"
            :options="['是','否']">
          </mt-radio>
        </div>
      </div>-->

      <!--<p class="sure">
        <img src="../../../../static/images/discover/select_icon@2x.png"/>
        <span style="color: #888888;">确认以上信息真实有效且报名即代表已同意</span>
        <span class="sureTo">《 报名须知 》</span>
      </p>-->

      <div class="wantgo" @click="sublime" id="send">提交</div>
      <div>
        <mt-popup v-model="peoplesVisible" class="mint-popup-4">
          <mt-picker
            :slots="numberSlot"
            @change="onNumberChange"
            :visible-item-count="3"
            :show-toolbar="false" :item-height="100"></mt-picker>
        </mt-popup>
      </div>
      <div>
        <!--<mt-popup v-model="carryChildVisible"  class="mint-popup-4">
          <mt-picker
            :slots="carryChildSlot"
            @change="onCarryChange"
            :visible-item-count="2"
            :show-toolbar="false"
            :item-height="100"></mt-picker>
        </mt-popup>-->
      </div>

    </div>
    <mt-popup v-model="popupVisible">
      <p style="padding: 0.2rem 0.4rem;font-size: 0.28rem;color: #222222;">您已成功报名</p>
    </mt-popup>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  import { MessageBox } from 'mint-ui';
  export default {
    /*components: {MtPopup},*/
    name: "want-go",
    data(){
      return {
        peopleNumber:1,
        carryChild:"",
        peoplesVisible:false,
        carryChildVisible:false,
        popupVisible:false,
        numberSlot: [{
          flex: 1,
          defaultIndex: 0,
          values: [1, 2, 3, 4, 5, 6],
          className: 'slot1'
        }],
        carryChildSlot: [{
          flex: 1,
          defaultIndex: 0,
          values: ["否","是"],
          className: 'slot1'
        }],
        activityId: '',
        user:'',
        phoneNum:'',
        userId:0,
        value:'否'
      }
    },
    created(){
      this.activityId = this.$route.query.activityId;
    },
    methods:{
      onNumberChange:function (picker, values) {
        this.peopleNumber=values[0];
      },
      peopleNumberClick:function () {
        this.peoplesVisible=true;
      },
      onCarryChange:function (picker, values) {
        this.carryChild=values[0];
      },
      carryChildClick:function () {
        this.carryChildVisible=true;
      },
      sublime:function () {
        this.popupVisible=true;
      },
      //提交
      sublime: function () {
        var _this = this;
        var child = 0;
        if(_this.value=='是'){
          child = 1;
        }else{
          child = 0;
        }
        if(_this.msgIsNull(_this.user)){
          MessageBox('提示', "姓名不能为空");
          return false;
        }
        //手机号正则
        var phoneReg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/;
        //大于0的正整数正则
        var peopleReg = /^[1-9]{1,}[\d]*$/;
        //电话
        var phone = $.trim(_this.phoneNum);
        if (!phoneReg.test(phone)) {
          MessageBox('提示', "请输入有效的手机号码");
          return false;
        }
        if (!peopleReg.test(this.peopleNumber)) {
          MessageBox('提示', "请输入有效预约人数");
          return false;
        }
        var joinInfo = {"uid": _this.userId,"aid": _this.activityId,"reservationNum":_this.peopleNumber,"childFlag":child,"name":_this.user,"phone":_this.phoneNum};
        this.$http.post(DISCOVERMESSAGE.activetyWantGo, joinInfo).then(function (res) {
          if (res.data.status) {
            Toast('报名成功');
            _this.$router.push({path:"/discover/allActivity"});
            //_this.$router.go(-1);
            _this.$store.dispatch('showFoot');
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      msgIsNull: function( str ){
        if ( str == "" ) return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
      },
    },
    watch : {
      user: function (val) {
        this.user = val;
        if(this.user){
          $("#send").css("background-color","#FC3846");
        }
      },
      phoneNum: function (val) {
        this.phoneNum = val;
        if(this.phoneNum){
          $("#send").css("background-color","#FC3846");
        }
      },
    },
    mounted(){
      this.$store.dispatch("hideFoot");
      this.userId = this.$store.state.userId;
    }
  }
</script>

<style scoped>
  @import "./../../../../static/css/discover/detail.css";
  .allcontent{
    height: 100%;
  }
  .box_01{
    height: 1.42rem;
    width: 90%;
    margin: 0 auto;
    margin-bottom: 0.4rem;
  }
  .lab{
    font-family: PingFangSC-Regular;
    font-size: 0.28rem;
    color: #555555;
    margin-bottom: 0.16rem;
  }
  .inp{
    background: #efefef;
    border-radius: 0.16rem;
    height: 0.88rem;
    width: 100%;
    font-size: 0.38rem;
    border: none;
    text-indent: 0.3rem;
  }
  .mint-popup-4 {
    width: 100%;
    height:0.88rem;
  }
  .mint-popup-4{
    height: 3.4rem;
  }
  .wantgo{
    background: #CCCCCC;/*#FC3846*/
    border-radius: 8px;
    height: 0.88rem;
    color: #ffffff;
    letter-spacing: 0;
    text-align: center;
    font-size: 0.28rem;
    line-height: 0.88rem;
    position: absolute;
    bottom: 0.4rem;
    width: 90%;
    margin-left: 5%;
  }
  .header-title{
    color: #FC3846;
    font-size: 0.36rem;
  }
  .header{
    background-color: #1A1D23;
  }
</style>
