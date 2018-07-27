<template>
  <div class="editPersonalDetails">
    <header class="header">
      <img class="header-left" src="../../../static/images/back@2x.png" @click="$route.meta.keepAlive = false;$router.go(-1)">
      <span class="header-title">个人信息</span>
      <div></div>
    </header>
    <div style="height:.88rem"></div>
    <div class="content">
      <div class="contentList">
        <span class="contentList-left">头像</span>
        <div class="contentList-right">
          <div style="width:.76rem;height:.76rem">
            <img :src="userInfo.head_image" alt="" style="margin-right: .1rem;width: 0.76rem;height: 0.76rem">
          </div>
          <div class="inputfile">
            <img src="../../../static/images/my/next@2x.png" style="width: 0.4rem;height: 0.4rem;z-index: 1" />
          </div>
          <input type="file" accept=".jpeg, .jpg, .png" name="upload_file" id="js-title-img-input" @change="changepicture($event)">
        </div>
      </div>
      <div class="gradientline"></div>
      <div class="contentList nickname">
        <span class="contentList-left">昵称</span>
        <div class="contentList-right">
          <input type="text" v-model="userInfo.nick_name" class="name" maxlength="16">
        </div>
      </div>
      <div class="gradientline"></div>
      <!-- <div class="contentList nickname">
        <span class="contentList-left">地区</span>
        <div class="contentList-right">
          <input type="text" v-model="userInfo.region" class="name" maxlength="16">
        </div>
      </div> -->

      <div class="personalSignature">
        <span class="contentList-left">个人签名:</span>
        <textarea v-model="userInfo.description" style="line-height: normal" maxlength="50"></textarea>
      </div>
      <div class="gradientline"></div>
      <div class="personalSignature">
        <span class="contentList-left">性别:</span>
        <div class="sex name" @click="userInfo.sex=1" style="margin-bottom: .2rem">
          <span>男</span>
          <img v-if="userInfo.sex==1" src="../../../static/images/my/yiguanzhu@3x.png" style="width: 0.42rem;height: 0.42rem">
        </div>
        <div class="sex name" @click="userInfo.sex=2">
          <span>女</span>
          <img v-if="userInfo.sex==2" src="../../../static/images/my/yiguanzhu@3x.png" style="width: 0.42rem;height: 0.42rem">
        </div>
      </div>
      <div class="gradientline"></div>
      <div class="contentList nickname" @click="toaddress">
        <span class="contentList-left">我的地址</span>
        <div class="contentList-right" >
          <img src="../../../static/images/my/next@2x.png" style="width: 0.4rem;height: 0.4rem" />
        </div>
      </div>
      <div class="gradientline"></div>
    </div>
    <span class="submit" @click="changemessage">保存</span>

    <mt-popup v-model="popupVisible" position="middle">
      <div style="width:100%;text-align:center;line-height:.88rem;font-size:.36rem;color:#222;margin-top:.34rem">
        保存成功
      </div>
      <div style="display: flex;justify-content: center;align-items: center;  margin-top:.3rem">
        <img src="../../../static/images/my/complete@3x.png" alt="" style="width:1.2rem;display:block;">
      </div>
      <div style="display: flex;justify-content: center;align-items: center;margin-top:.5rem">
        <button class="btn">开启您的自驾之旅吧...</button>
      </div>
    </mt-popup>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
export default {
  data() {
    return {
      popupVisible: false,
      sex: 1, //1男，0女
      userInfo: {
        head_image: "../../../static/images/Lovecar/bg.png",
        nick_name: "fnaggna",
        region: "江苏",
        description: "fdsfds",
        sex: 1
      },
      changeInfo: {}
    };
  },
  methods: {
    init() {},
    changepicture(e) {
      var _this = this;
      var reader = new FileReader();
      reader.onload = (function(file) {
        return function(e) {
          _this.userInfo.head_image = this.result;
        };
      })(e.target.files[0]);
      reader.readAsDataURL(e.target.files[0]);
    },

    messageBoxAlert: function() {
      MessageBox.alert("您的密码修改成功", "提示");
    },
    changemessage() {
      this.popupVisible = true;
      //   this.changeInfo.user_id = this.$store.state.userId;
      //   if(this.userInfo.nick_name == ""){
      //     let instance = Toast({
      //       message: "昵称不能为空",
      //       position: "middle",
      //       duration: 1000
      //     });
      //     return
      //   }
      //   this.changeInfo.nick_name = this.userInfo.nick_name;
      //   //验证表情
      //   var regRule = /\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g;
      //   if(this.changeInfo.nick_name.match(regRule)) {
      //     this.changeInfo.nick_name = this.changeInfo.nick_name.replace(/\uD83C[\uDF00-\uDFFF]|\uD83D[\uDC00-\uDE4F]/g, "");
      //     let instance = Toast({
      //       message: "昵称不能输入表情",
      //       position: "middle",
      //       duration: 1000
      //     });
      //     return
      //   }
      //   this.changeInfo.description = this.userInfo.description;
      //   this.changeInfo.sex = this.userInfo.sex;
      //   this.changeInfo.region = this.userInfo.region;
      //   this.changeInfo.head_image = this.userInfo.head_image.replace(
      //     "data:image/jpeg;base64,",
      //     ""
      //   );
      //  this.$http
      //     .post('', this.changeInfo)
      //     .then(res => {
      //     if (res.data.errcode == 0) {
      //         let instance = Toast({
      //           message: "修改成功",
      //           position: "middle",
      //           duration: 1000
      //         });
      //         if(res.data.retobj){
      //           if (isMobile.iOS()) {
      //             var data = {
      //               head_image:res.data.head_image
      //             }
      //             window.webkit.messageHandlers.changeImage.postMessage(data);
      //           } else if(isMobile.Android()) {
      //             js2android.changeImage(res.data.head_image);
      //           }
      //         }
      //         this.$router.go(-1);
      //       } else {
      //         let instance = Toast({
      //           message: res.data.errmsg,
      //           position: "middle",
      //           duration: 1000
      //         });
      //       }
      //     }).catch(() => {
      //       let instance = Toast({
      //         message: "系统出现问题",
      //         position: "middle",
      //         duration: 1000
      //       });
      //     });
    },
    toaddress() {
        // var id = this.$store.state.userId;
        this.$router.push({ path: "/myaddress", query: {} });
    }
  },
  mounted() {},
  created() {},
  destroyed() {}
};
</script>


<style scoped>
/*分割线*/
.inputfile {
  width: 0.16rem;
  height: 0.3rem;
  position: relative;
  /* overflow: hidden; */
}
.inputfile > img {
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
}
#js-title-img-input {
  opacity: 0;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
}
.contentList-right > input {
  background: transparent;
  border: 0;
  text-align: right;
  width: 5rem;
  line-height: 1rem;
  height: 1rem;
}
.line {
  height: 0.2rem;
  margin-top: 0.92rem;
}
.editPersonalDetails {
  height: 100%;
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
}
.content {
  padding: 0 0.4rem;
  padding-bottom: 0.88rem;
}
.contentList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1.2rem;
  border-bottom: 1px solid #f1f1f1;
}
.contentList-left {
  font-size: 0.28rem;
  color: #888888;
}
.contentList-right {
  display: flex;
  align-items: center;
  position: relative;
}
.name {
  font-size: 0.28rem;
  color: #222222;
}
/*昵称*/
.nickname {
  height: 1rem;
  line-height: 1rem;
  width: 100%;
}
/*个人签名*/
.personalSignature {
  display: flex;
  flex-direction: column;
}
.personalSignature .contentList-left {
  height: 0.8rem;
  line-height: 0.8rem;
}
.personalSignature textarea {
  height: 1.44rem;
  width: 100%;
  background-color: #f8f8f8;
  font-size: 0.28rem;
  color: #888888;
  padding: 0.2rem 0.4rem;
  border: none;
  border-radius: 0.16rem;
}
.sex {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 0.72rem;
  background-color: #f8f8f8;
  color: #888888;
  padding: 0 0.4rem;
  border-radius: 0.16rem;
}
/*保存*/
.submit {
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  text-align: center;
  font-size: 0.28rem;
  color: #ffffff;
  background-color: #49bbff;
  position: absolute;
  bottom: 0;
}
input {
  border: 1px #ccc solid;
  outline: none;
}
/* 保存成功后弹出层样式 */
.mint-popup {
  width: 80%;
  height: 4.46rem;
  border-radius: 0.2rem;
}
.btn {
  line-height: 0.88rem;
  width: 5rem;
  background-color: #44bbff;
  font-size: 0.31rem;
  color: #fff;
  text-align: center;
  display: block;
  border: 0;
  outline: none;
  border-radius: 5px;
}
textarea:hover{
        border-color: #FF00FF;
    }
</style>
