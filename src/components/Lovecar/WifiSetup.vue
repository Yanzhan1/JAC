<template>
	<div class="wifi-setup">
		<!--<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">设置账户密码</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>-->
		<mhead currentTitle="设置账户密码"></mhead>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					wifi名称:
				</span>
				<input type="text" v-model="wifiData.name" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span style="font-size: 0.26rem;color: #444444;">
					密码:
				</span>
				<input style="margin-left: 0.9rem;" type="text" v-model="wifiData.pwd" />
			</div>
		</div>
		<button class="bottom-btn" @click="confirm">确认</button>
	</div>
</template>

<script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import PublicHead from '../publicmodel/PublicHead';
export default {
  name: "wifiSetup",
  components: {
  	mhead:PublicHead
  },
  data() {
    return {
      time: "", //定时器命名
      //wifi数据
      wifiData: {
        name: "",
        //wifi密码
        pwd: ""
      },
      userCategory: "", //传入1：车主或者2：授权用户
      operationIds: ""
    };
  },
  methods: {
    //重复调用异步接口
    getAsyReturn(operationId) {
      var flag = true;
      this.sjc = new Date().getTime();
      this.$http
        .post(
          Lovecar.OperationId,
          { operationId: operationId },
          this.$store.state.tsppin
        )
        .then(res => {
          var tS = new Date().getTime() - this.sjc; //时间戳 差
          var tSS = parseInt((tS / 1000) % 60); // 时间差
          if (res.data.returnSuccess == true) {
            if (res.data.status == "IN_PROGRESS") {
              //60s  后 清除定时器，不在发请求
              console.log(tSS);
              if (tSS >= 56) {
                Toast({
                  message: "请求超时",
                  position: "middle",
                  duration: 2000
                });
                localhide();
              } else {
                this.time = setInterval(() => {
                  this.$http
                    .post(
                      Lovecar.OperationId,
                      { operationId: operationId },
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      var tS = new Date().getTime() - this.sjc; //时间戳 差
                      var tSS = parseInt((tS / 1000) % 60); // 时间差
                      if (res.data.returnSuccess == true) {
                        if (res.data.status == "IN_PROGRESS") {
                          //60s  后 清除定时器，不在发请求
                          console.log(tSS);
                          if (tSS >= 56) {
                            Toast({
                              message: "请求超时",
                              position: "middle",
                              duration: 2000
                            });
                            clearInterval(this.time);
                            localhide();
                          }
                        } else if (res.data.status == "SUCCEED") {
                          // flag = false;
                          // Toast({
                          //   message: "下达指令成功",
                          //   position: "middle",
                          //   duration: 2000
                          // });
                          clearInterval(this.time);
                          localhide();
                        } else if (res.data.status == "FAILED") {
                          flag = false;
                          Toast({
                            message: "指令下发成功，处理失败！",
                            position: "middle",
                            duration: 2000
                          });
                          clearInterval(this.time);
                          localhide();
                        }
                      } else {
                        Toast({
                          message: "指令下发失败！",
                          position: "middle",
                          duration: 2000
                        });
                        flag = false;
                        clearInterval(this.time);
                        localhide();
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              // flag = false;
              // Toast({
              //   message: "下达指令成功",
              //   position: "middle",
              //   duration: 2000
              // });
               clearInterval(this.time);
              localhide();
            } else if (res.data.status == "FAILED") {
              Toast({
                message: "指令下发成功，处理失败！",
                position: "middle",
                duration: 2000
              });
               clearInterval(this.time);
              localhide();
            }
          } else {
            Toast({
              message: "指令下发失败！",
              position: "middle",
              duration: 2000
            });
            flag = false;
            clearInterval(this.time);
            localhide();
          }
        });
    },

    confirm() {
      var regNum =  /^[a-zA-Z\d]{8,16}$/;
      if (this.wifiData.name == '' || this.wifiData.pwd == '') {
  			Toast({
              message: "输入不能为空",
              position: "middle",
              duration: 2000
            });
      } else if (!regNum.test(this.wifiData.name) || !regNum.test(this.wifiData.pwd)) {
      		Toast({
              message: "请输入8-16位数字或字母wifi名称和密码",
              position: "middle",
              duration: 2000
            });
      } else {
      	MessageBox.confirm("", {
        title: "提示",
        message: "您确定保存当前WiFi信息吗？？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      })
        .then(action => {
          if (action == "confirm") {
            var param = {
              vin: this.$store.state.vins,
              operationType: "WIFI",
              operation: 3,
              extParams: {
                userCategory: 1,
                newAccount: this.wifiData.name,
                newPwd: this.wifiData.pwd
              }
            };
            this.$http
              .post(Lovecar.Control, param, this.$store.state.tsppin)
              .then(res => {
                console.log(res);
                this.operationIds = res.data.operationId;
                console.log(this.operationIds);
                if (res.data.returnSuccess) {
                  this.getAsyReturn(res.data.operationId);
                } else {
                  if (res.data.returnErrCode == 403) {
                    Toast({
                      message: "token验证失败",
                      position: "middle",
                      duration: 2000
                    });
                  } else {
                    Toast({
                      message: res.data.returnErrMsg,
                      position: "middle",
                      duration: 2000
                    });
                  }
                }
                if (res.data.returnSuccess == true) {
                    Toast({
                          message: "修改成功",
                          position: "middle",
                          duration: 2000
                        });
                        setTimeout(()=>{
                          this.$router.push({
                            name: "wifi直连",
                            params: {
                              wifiname: this.wifiData.name,
                              // userCategory:this.userCategory,
                            }
                          });
                        },2000)
                }
              })
              .catch(err => {
                Toast({
                  message:  res.data.returnErrMsg,
                  position: "middle",
                  duration: 1000
                });
              });
          }
        })
        .catch(err => {
          if (err == "cancel") {
            console.log("cancel");
          }
        });
      }     
    }
  },
  mounted() {
    // this.$route.params.userCategory?this.userCategory=1:this.userCategory=2
    this.wifiData.name = this.$route.params.names;
    // console.log(this.userCategory)
  },
   beforeDestroy(){
     clearInterval(this.time);
  },
};
</script>

<style scoped>
/*flex*/

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
.flex-align-center {
  /*垂直居中*/
  display: flex;
  align-items: center;
}
/*公共样式*/

.revisePinCommon {
  height: 1rem;
  border-bottom: 1px solid #efefef;
}

input {
  outline: none;
  border: none;
  background: none;
  margin-left: 0.4rem;
}

.origin-pin > div {
  width: 90%;
  margin: 0 auto;
}
</style>