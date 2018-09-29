<template>
  <div class="editPersonalDetails">
    <mhead currentTitle="个人信息"></mhead>
    <div class="content">
      <div class="contentList">
        <span class="contentList-left">头像</span>
        <div class="contentList-right">
          <div style="width:.76rem;height:.76rem">
            <img   id="img" alt="" style="margin-right: .1rem;width: 0.76rem;height: 0.76rem;border-radius:50%">
          </div>
          <div class="inputfile">
            <img src="../../../static/images/my/next@2x.png" style="width: 0.4rem;height: 0.4rem;z-index: 1" />
          </div>
          <input type="file" accept=".jpeg, .jpg, .png" name="upload_file" id="js-title-img-input" @change="selectImg($event)">
        </div>
      </div>
      <div class="gradientline"></div>
      <div class="contentList nickname">
        <span class="contentList-left">昵称</span>
        <div class="contentList-right">
          <input type="text" v-model="userInfo.userName" class="name" maxlength="16" placeholder="请输入昵称">
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
        <textarea v-model="userInfo.personalSignature" style="line-height: normal;out-line:none" maxlength="50"></textarea>
      </div>
      <div class="gradientline"></div>
      <div class="personalSignature">
        <span class="contentList-left">性别:</span>
        <div class="sex name" @click="selectSex(1)" style="margin-bottom: .2rem">
          <span>男</span>
          <img v-if="userInfo.sex==1" src="../../../static/images/my/yiguanzhu@3x.png" style="width: 0.42rem;height: 0.42rem">
        </div>
        <div class="sex name" @click="selectSex(2)">
          <span>女</span>
          <img v-if="userInfo.sex==2" src="../../../static/images/my/yiguanzhu@3x.png" style="width: 0.42rem;height: 0.42rem">
        </div>

      </div>
      <div class="gradientline"></div>
      <div class="contentList nickname" @click="toaddress">
        <span class="contentList-left">我的地址</span>
        <div class="contentList-right">
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
import PublicHead from '../publicmodel/PublicHead';
export default {
	name: 'edictPerson',
	components: {
  	mhead:PublicHead
  },
  data() {
    return {
      popupVisible: false,
      sex: 1, //1男，0女
      userInfo: {
      //  headUrl: "../../../static/images/my/qq.png"
      }, //展示用户信息
      changeInfo: {}, //更该用户信息传的参数
      headUrl: "", //图片地址,
      picpath:'',//文件路径
      picname:'',//文件名名称
      base64:'',

    };
  },
  methods: {

    init() {},
    //图片更改
    getimgsrc(src) {
      this.userInfo.headUrl = "data:image/jpeg;base64," + src;
      this.$forceUpdate();
    },
		selectImg($event){
     this.getPic("js-title-img-input","img",$event.target.value);
		},
		getPic(piElementId,imgElementId,path){
       this.picpath=path//文件路径
      	var self = this;
        var file = document.getElementById(piElementId).files[0]; //文件
         this.picname=file.name //文件名
				var reads= new FileReader();
				var img = new Image();
				reads.readAsDataURL(file);
				reads.onload = function(e){
          img.src = e.target.result;
					img.onload = function(){
            var res = self.compress(img,100,100);
            document.getElementById(imgElementId).src = res;
            self.base64=res;//base64
             var params={
         fileOldName:self.picname, //文件名
         filePjectPath:'DAS', //
         filePjectName:'jav',
          base64:self.base64.split(',')[1], //base64数据
         prj:'DM',
         remark:'修改头像'
        }
       self.$http.post(FILESTORE.uploadPicture,params).then(res=>{
          if(res.data.status==1){
             self.changeInfo.imageUrl=res.data.data.fileUrl+res.data.data.fileNewName
           }
       })
          	}
        }

		},
		compress(img,w,h){
			var canvas = document.createElement("canvas");
			var ctx = canvas.getContext("2d");
			canvas.height = h;
			canvas.width = w;
			ctx.drawImage(img,0,0,w,h);
			return canvas.toDataURL("image/jpeg",0.92);
		},

    //点击保存
    changemessage() {
      //  alert( this.changeInfo.imageUrl)
       if (this.userInfo.userName == "") {
        let instance = Toast({
          message: "昵称不能为空",
          position: "middle",
          duration: 1000
        });
        return;
      }
      this.changeInfo.userName = this.userInfo.userName; //赋值  参数 昵称
      this.changeInfo.personalSignature = this.userInfo.personalSignature;
      this.changeInfo.sex = this.userInfo.sex;
      this.changeInfo.no = this.$store.state.userId,
       this.changeInfo.imageUrl= this.changeInfo.imageUrl
      this.$http.post(My.UpUserinfo, this.changeInfo, {}).then(res => {
            if (res.data.code == 0) {
              this.popupVisible = true;
              var self = this;
              setTimeout(function() {
               self.$router.go(-1);
              }, 2000);
            } else {
              let instance = Toast({
                message: "保存失败",
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(() => {
            let instance = Toast({
              message: "系统出现问题",
              position: "middle",
              duration: 1000
            });
          });
    },
    toaddress() {
      this.$router.push({ path: "/myaddress", query: {} });
    },
    selectSex(num) {
      this.userInfo.sex = num;
      this.$forceUpdate();
    }
  },
  mounted() {
    window.getimgsrc = this.getimgsrc;
    //获取用户基本信息
    var param = {
    no: this.$store.state.userId
       // no:'AD022018072505235135056'
    };
    this.$http.post(My.UserInfo, param).then(res => {
      if (res.data.code == 0) {

        this.userInfo = res.data.data;
        this.userInfo.sex = res.data.data.sex || 1;
        this.userInfo.personalSignature = res.data.data.personalSignature || "";
        this.userInfo.userName = res.data.data.userName || "";

        document.getElementById('img').src=this.userInfo.headUrl||'../../../static/images/discover/normalhead.png'

      }
    });
  }
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
textarea:hover {
  border-color: #ff00ff;
}
</style>
