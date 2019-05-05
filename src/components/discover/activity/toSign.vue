<template>
  <div class="allcontent">
    <div>
      <!-- <header class="head">
        <img class="header-left" src="../../../../static/images/back@2x.png" @click="$router.go(-1)">
        <p class="header-title-fff" style="text-align: center">活动报名</p>
        <div class="header-right"></div>
      </header> -->

       <my-header title="活动报名"></my-header>

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
      <div v-if="activityType != 3">
      <div class="sign_cell">
        <p>预约人数</p>
        <input v-model="peopleNumber" placeholder="请输入预约人数"/>
      </div>
      <div class="f5_line02"></div>
      <div class="sign_cell">
        <p>是否携带小孩</p><br>
        <div class="inform-radio">
          <mt-radio
            v-model="value"
            :options="['是','否']">
          </mt-radio>
        </div>
      </div>
      </div>
      <div class="tosign_btn" @click="sublime" id="send">
        提 交
      </div>
      <div>
        <mt-popup v-model="peoplesVisible" class="mint-popup-4">
          <mt-picker
            :slots="numberSlot"
            @change="onNumberChange"
            :visible-item-count="3"
            :show-toolbar="false" :item-height="100"></mt-picker>
        </mt-popup>
      </div>
    </div>
    <mt-popup v-model="popupVisible">
      <p style="padding: 0.2rem 0.4rem;font-size: 0.28rem;color: #222222;">您已报名成功</p>
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
        activityType: '',
        user:'',
        phoneNum:'',
        userId:0,
        value:'否'
      }
    },
    created(){
      this.activityId = this.$route.query.activityId;
      this.activityType = this.$route.query.activityType;
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
        var phoneReg = /^1\d{10}$/;
        //大于0的正整数正则
        var peopleReg = /^([1-9]|10)$/;
        //电话
        var phone = $.trim(_this.phoneNum);
        if (!phoneReg.test(phone)) {
          MessageBox('提示', "请输入有效的手机号码");
          return false;
        }
        if (_this.activityType != 3 && !peopleReg.test(_this.peopleNumber)) {
          MessageBox('提示', "报名人数最多10人");
          return false;
        }
        var joinInfo = {"uid": _this.userId,"aid": _this.activityId,"reservationNum":_this.peopleNumber,"childFlag":child,"name":_this.user,"phone":_this.phoneNum};
        this.$http.post(DISCOVERMESSAGE.activetyWantGo, joinInfo).then(function (res) {
          if (res.data.status) {
            Toast('报名成功');
            //_this.$router.push({path:"/discover/allActivity"});
            _this.$router.go(-1);
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
          $("#send").css("background-color","#49BBFF");
        }
      },
      phoneNum: function (val) {
        this.phoneNum = val;
        if(this.phoneNum){
          $("#send").css("background-color","#49BBFF");
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
  .mint-popup-4 {
    width: 100%;
    height:0.88rem;
  }
  .mint-popup-4{
    height: 3.4rem;
  }
  input:focus {
    outline:none;
    /* border: 0.02rem solid #49BBFF; */
  }
</style>
