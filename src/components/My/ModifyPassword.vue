<template>
	<div class="modify-password">
		<!--<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">修改密码</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>-->
		<mhead currentTitle="修改密码"></mhead>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon" >
				<span style="font-size: 0.26rem;color: #444444;">
					旧密码:
				</span>
				<input   v-model="condition.oldPassword" placeholder="请输入旧密码" type="password"  />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon" >
				<span style="font-size: 0.26rem;color: #444444;">
					新密码:
				</span>
				<input v-model="condition.newPassword" placeholder="请输入新密码" type="password" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-center-between revisePinCommon" >
				<span style="font-size: 0.26rem;color: #444444;">
					确认新密码:
				</span>
				<input v-model="condition.newAgainpassword" placeholder="请输入新密码" type="password" />
			</div>
		</div>
		<button class="bottom-btn" @click="modifyPwd">确认修改</button>
    <div  style="width:100%;padding:.2rem;font-size:.24rem;">
      密码须包含字母、数字和字符，长度8-16位，其中字符包括：`~!@%():;,.?，例如，abc,1234
    </div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import PublicHead from "../publicmodel/PublicHead";
export default {
  name: "modifyPassword",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      condition: {
        //用户信息
        oldPassword: "",
        newPassword: "",
        newAgainpassword: "",
        no: this.$store.state.userId
      }
      // isok:false,//区分ios和安卓只读和可读
      // num:0,
    };
  },
  methods: {
    modifyPwd() {
      //修改密码
      var regPwd = /^((?=.*[0-9].*)(?=.*[a-zA-Z].*)(?=.*[`~!@%():;,.?].*))[0-9a-zA-Z`~!@%():;,.?]{8,16}$/;
      if (
        this.condition.newPassword == null ||
        this.condition.oldPassword == null
      ) {
        Toast({
          message: "输入不能为空",
          position: "middle",
          duration: 2000
        });
        return;
      } else if (!regPwd.test(this.condition.newPassword)) {
        Toast({
          message: "密码须包含字母、数字和字符，长度8-16位，其中字符包括：`~!@%():;,.?，例如，abc,1234",
          position: "middle",
          duration: 2000
        });
        return;
      } else if (this.condition.oldPassword == this.condition.newPassword) {
        Toast({
          message: "新密码不可与旧密码相同",
          position: "middle",
          duration: 2000
        });
        return false;
      } else if (this.condition.newAgainpassword == null) {
        Toast({
          message: "请确认密码",
          position: "middle",
          duration: 2000
        });
        return false;
      } else if (
        this.condition.newPassword != this.condition.newAgainpassword
      ) {
        Toast({
          message: "请保持新密码一致",
          position: "middle",
          duration: 2000
        });
        return false;
      } else {
        let data = {
          oldPassword: this.$md5(this.condition.oldPassword), //对密码进行md5 32位小写加密
          newPassword: this.$md5(this.condition.newPassword),
          no: this.$store.state.userId
        };
        this.$http
          .post(Wit.updateUserPassword, data)
          .then(res => {
            const data = res.data;
            if (data.code == 0) {
              this.$router.replace("/myindex/reviousePwdSuccess");
            } else {
              let instance = Toast({
                message: data.msg,
                position: "middle",
                duration: 2000
              });
            }
          })
          .catch(error => {
            let instance = Toast({
              message: "系统异常",
              position: "middle",
              duration: 2000
            });
          });
      }
    }
  },
  created() {
  }
};
</script>

<style scoped>
.flex-center-between {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
.modify-password {
}
.origin-pin > div {
  width: 90%;
  margin: 0 auto;
}
.revisePinCommon {
  height: 1rem;
  border-bottom: 1px solid #efefef;
}
.revisePinCommon > input {
  border: none;
  outline: none;
}
</style>
