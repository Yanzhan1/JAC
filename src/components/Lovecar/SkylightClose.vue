<template>
	<div class="skylight-control">
		<mhead currentTitle="天窗控制"></mhead>
		<div class="skylight-header">
			<!--<div class="skylight-btn">
				<mt-switch v-model="value" @change="turn"></mt-switch>
				<span>OFF/NO</span>
			</div>-->
			<div class="skylight-sign flex-column">
				<span class="skylight-ch">天窗</span>
				<span class="skylight-en">SKYLIGHT</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>
				
		<!--天窗主体Start-->
		<div class="skylight-wrap flex-column-align">
			<div class="skylight-content flex-center-between">
				<div class="wind-blows">
					<img v-if="!hasNOClick" :src="'./static/images/Lovecar/skylight@2x.png'" alt="" />
					<img v-else  :src="'./static/images/Lovecar/skylight1@2x.png'" alt="" />
				</div>
			</div>
			<div class="close-skylight" @click="popupVisible=true">
				<button :disabled="this.curveState" :class="!this.curveState === false ? 'active' : ''">点击关闭天窗</button>
			</div>
		</div>
		
		<!--pin码弹出框Start-->
		<div class="bgMask" v-if="popupVisible" @click="removeMask"></div>
		<mt-popup v-model="popupVisible" :modal="false" popup-transition="popup-fade">
			<div class="pin-remain">
				<div class="flex-center-between">
					<img @click="removeMask" :src="'./static/images/Wit/delete@3x.png'" alt="" style="width:.28rem">
					<div style="font-size:.36rem;color:#222">请输入PIN码</div>
					<span></span>
				</div>
        <img @click="Toasteach"  class="question" style="width:.35rem;height:.35rem" :src="'./static/images/Lovecar/question.png'" alt="">
				<div class="pin-code flex-center">
					<div v-if="$store.state.softkeyboard" id="pinCon" @click="onTypewriting">
						<input class="pin-input" maxlength="6" type="password" v-model="pinNumber" readonly/>
					</div>
					<div v-else class="pin">
						<input v-model="ownKeyBoard.first"  type="text" maxlength="1" />
						<input v-model="ownKeyBoard.second"  type="text" maxlength="1" />
						<input v-model="ownKeyBoard.third"  type="text" maxlength="1" />
						<input v-model="ownKeyBoard.fourth"  type="text" maxlength="1" />
						<input v-model="ownKeyBoard.fifth"  type="text" maxlength="1" />
						<input v-model="ownKeyBoard.sixth"  type="text" maxlength="1" />
					</div>
				</div>
			</div>
		</mt-popup>
		<!--pin码弹出框结束-->
		<!--自定义软键盘Start-->
		<mt-popup class="typer" v-show="showTyper!=0" position="bottom">
			<ul v-show="showTyper==2">
				<li class="typer-num" v-for="item in keyNums" :class="{'is-A': item=='A','is-OK':item=='OK','is-Del':item=='Del'}" @click="input(item)">{{item}}</li>
			</ul>
		</mt-popup>
		<!--自定义软键盘End-->
	</div>
</template>

<script>
import { Createarc } from "../../../src/assets/drawarc.js";
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
import { MessageBox } from "mint-ui";
import PublicHead from "../publicmodel/PublicHead";
export default {
  name: "skylightClose",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      time: "", //定时器命名
      //天窗控制按钮开关
      //				value: false,
      curveState: false,
      //移动端键盘值
      allwords: [], //所有提示
      skywords: [], //天窗提示
      ownKeyBoard: {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
      },
      //图片激活变量
      activeShowImg: 0,
      //天窗宽度展示
      windNum: ["0%", "100%"],
      winMin: 0,
      //pin码弹出框控制变量
      popupVisible: false,
      //pin码值
      pinNumber: "",
      //自定义软键盘状态 0 消失 2 键盘开启
      showTyper: 0,
      //软键盘内容-12位随机数组
      keyNums: [],
      operationIds: ""
    };
  },
  methods: {
    end() {
      this.httpsky();
    },
    //路由跳转的时候清除轮询loading
    goback() {
      this.$router.go(-1);
      localhide();
    },
    //拿到天窗的提示
    getskywords() {
      this.allwords = this.$store.state.GETWORDS;
      for (let value of this.allwords) {
        if (value.dictType == "skylight") {
          this.skywords = value.sysDictDataVOs;
        }
      }
    },
    Toasteach() {
      console.log(1);
      MessageBox("提示", this.skywords[3].dictValue);
      console.log(2);
    },
    //点击遮罩或者'x'移除popup
    removeMask() {
      this.popupVisible = !this.popupVisible;
      this.showTyper = 0;
    },
    //产生随机数
    randomnum(min, max) {
      var num = Math.floor(Math.random() * (max - min) + min);
      return num;
    },
    //键盘点击事件，传入键盘本身的值
    input(item) {
      if (item == "关闭") {
        //判断是否点击了关闭按钮
        this.showTyper = 0;
        return;
      }
      if (item == "Del") {
        //判断是否点击了删除按钮
        this.pinNumber = this.pinNumber.slice(0, -1);
        return;
      }
      if (this.pinNumber.length < 6) {
        //判断位数，还未超出5位则可继续输入
        this.pinNumber = this.pinNumber + item;
      } else {
      }
    },
    //点击pin码验证框时，弹出自定义键盘
    onTypewriting() {
      this.showTyper = 2;
      this.produceArray();
    },
    //产生软键盘12位随机数组
    produceArray() {
      var that = this;
      var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
      var arr2 = [];
      for (var i = 0; i < 12; i++) {
        var randomnumber = that.randomnum(0, arr.length);
        if (i == 9) {
          arr2.push("关闭");
        } else if (i == 11) {
          arr2.push("Del");
        } else {
          arr2.push(arr[randomnumber]);
          arr.splice(randomnumber, 1);
        }
      }
      that.keyNums = arr2;
    },
    //执行判定
    inputs() {
      var _this = this;
      $(".pin input").on("input propertychange", function() {
        _this.inputFun($(this));
      });
      $(".pin input").on("keyup", function(e) {
        var ev = e;
        _this.keyupFun($(this), ev);
      });
    },
    //判断输入的密码还是否为数字
    inputFun(value) {
      var reg = new RegExp("^[0-9]*$");
      var val = value.val();
      if (!reg.test(val)) {
        value.val("");
      } else {
        value.next().focus();
      }
    },
    //监听backspace事件
    keyupFun(value, e) {
      var k = e.keyCode;
      var val = e.key; //"Backspace"
      if (k == 8) {
        //8是backspace的keyCode
        value.prev().focus();
      } else {
        return false;
      }
    },
    //控制天窗起始状态
    carcontrolskylight() {
      // console.log("jinru");
      if (this.$route.query.carcontrol.skylightStatus == "1") {
        //pin码正确激活弧线
        this.curveState = true;
        //pin码正确激活空调图
        this.activeShowImg = true;
      } else {
      }
    },
    //重复调用异步接口
    getAsyReturn(operationId) {
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
                  message: this.skywords[2].dictValue,
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
                              message: this.skywords[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            clearInterval(this.time);
                            localhide();
                          }
                        } else if (res.data.status == "SUCCEED") {
                          //  pin码正确激活弧线
                          this.curveState = false;
                          //pin码正确激活空调图
                          this.activeShowImg = false;
                          Toast({
                            message: this.skywords[1].dictValue,
                            position: "middle",
                            duration: 2000
                          });
                          this.value = !this.value;
                          clearInterval(this.time);
                          localhide();
                        } else if (res.data.status == "FAILED") {
                          flag = false;
                          Toast({
                            message: this.skywords[2].dictValue,
                            position: "middle",
                            duration: 2000
                          });
                          clearInterval(this.time);
                          localhide();
                        }
                      } else {
                        Toast({
                          message: this.skywords[2].dictValue,
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
              //pin码正确激活弧线
              this.curveState = false;
              //pin码正确激活空调图
              this.activeShowImg = false;
              Toast({
                message: this.skywords[1].dictValue,
                position: "middle",
                duration: 2000
              });
              this.value = !this.value;
              clearInterval(this.time);
              localhide();
            } else if (res.data.status == "FAILED") {
              Toast({
                message: this.skywords[2].dictValue,
                position: "middle",
                duration: 2000
              });
              clearInterval(this.time);
              localhide();
            }
          } else {
            Toast({
              message: this.skywords[2].dictValue,
              position: "middle",
              duration: 2000
            });
            flag = false;
            clearInterval(this.time);
            localhide();
          }
        });
    },
    httpsky() {
      // let gear = this.activeShowImg ? "1" : "0";
      var param = {
        vin: this.$store.state.vins,
        operationType: "SUNROOF",
        extParams: {
          fluctuationType: 1, //档位qg
          // percent: this.windNum[this.skylightSpace].replace(/%/g, ""), //0-100
          gear: '2' //车窗1是开,2是关
        }
      };
      this.$http
        .post(Lovecar.Control, param, this.$store.state.tsppin)
        .then(res => {
          // console.log(res);
          this.operationIds = res.data.operationId;
          if (res.data.returnSuccess) {
            Toast({
              message: this.skywords[0].dictValue,
              position: "middle",
              duration: 2000
            });
            setTimeout(() => {
              this.getAsyReturn(res.data.operationId);
            }, 2000);
          } else {
            if (res.data.returnErrCode == 400) {
              Toast({
                message: "token验证失败",
                position: "middle",
                duration: 2000
              });
            } else {
              Toast({
                message: this.skywords[2].dictValue,
                position: "middle",
                duration: 2000
              });
            }
          }
        })
        .catch(err => {
          Toast({
            message: this.skywords[2].dictValue,
            position: "middle",
            duration: 2000
          });
        });
    }
  },
  mounted() {
    //  this.produCurve();
    this.inputs();
    this.getskywords();
    // this.carcontrolskylight();
  },
  beforeDestroy(){
     clearInterval(this.time);
  },
  computed: {
    fullValue: {
      //拼接input输入框值,激活修改
      get() {
        return (
          this.ownKeyBoard.first +
          this.ownKeyBoard.second +
          this.ownKeyBoard.third +
          this.ownKeyBoard.fourth +
          this.ownKeyBoard.fifth +
          this.ownKeyBoard.sixth
        );
      },
      set(newVal) {
        this.ownKeyBoard.first = newVal;
        this.ownKeyBoard.second = newVal;
        this.ownKeyBoard.third = newVal;
        this.ownKeyBoard.fourth = newVal;
        this.ownKeyBoard.fifth = newVal;
        this.ownKeyBoard.sixth = newVal;
      }
    },
    hasNOClick() {
      //判断图片的与隐藏
      return this.activeShowImg;
    }
  },
  watch: {
    pinNumber(newVal, oldVal) {
      //console.log(this.pinNumber.length)
      if (this.pinNumber.length == 6) {
        var nums = this.pinNumber;
        this.$http
          .post(
            Lovecar.Checkphonepin,
            {
              pin: nums
            },
            this.$store.state.tsppin
          )
          .then(res => {
            if (res.data.returnSuccess) {
              // this.value = !this.value;
              console.log(1)
              this.httpsky();
              // this.refreshPmData(),
              //消失遮罩
              this.popupVisible = !this.popupVisible;
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.pinNumber = "");
              // console.log(1)
            } else {
              //消失遮罩
              this.popupVisible = !this.popupVisible;

              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.pinNumber = "");
              Toast({
                message: res.data.returnErrMsg,
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(err => {
            Toast({
              message: res.data.returnErrMsg,
              position: "middle",
              duration: 1000
            });
            this.popupVisible = !this.popupVisible;
            //消失软键盘
            (this.showTyper = 0),
              //清空pin码
              (this.pinNumber = "");
          });
      }
    },
    fullValue(newVal, oldVal) {
      if (this.fullValue.length == 6) {
        var nums = this.fullValue;
        this.$http
          .post(
            Lovecar.Checkphonepin,
            {
              pin: nums
            },
            this.$store.state.tsppin
          )
          .then(res => {
            console.log(res.data.returnSuccess);
            if (res.data.returnSuccess) {
              // this.value = !this.value;
              this.httpsky();
              //pin码正确激活弧线
              // this.curveState = !this.curveState;
              // //pin码正确激活空调图
              // (this.activeShowImg = !this.activeShowImg),
              // this.refreshPmData(),
              //消失遮罩
              this.popupVisible = !this.popupVisible;
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.fullValue = "");
            } else {
              //消失遮罩
              this.popupVisible = !this.popupVisible;
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.fullValue = "");
              Toast({
                message: res.data.returnErrMsg,
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(err => {
            Toast({
              message: res.data.returnErrMsg,
              position: "middle",
              duration: 1000
            });
          });
      }
    }
  }
};
</script>

<style scoped>
/*flex*/

.flex-column-align {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
}

.flex-column-align {
  /*竖直方向水平居中*/
  display: flex;
  flex-direction: column;
  align-items: center;
}

.flex-center-between {
  /*水平垂直居中-两边对齐*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.flex-column {
  /*竖直方向*/
  display: flex;
  flex-direction: column;
}

.flex-center {
  /*水平垂直居中*/
  display: flex;
  justify-content: center;
  align-items: center;
}
.mint-popup {
  border-radius: 0.1rem;
}

.conmmon-style {
  /*公共样式*/
  border: none;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  background: none;
}
/*天窗头部*/

.skylight-header {
  padding: 1.6rem 0.64rem 0 0.68rem;
}
/*天窗开关按钮*/

.skylight-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.question {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
}
/*天窗标志*/

.skylight-ch {
  height: 0.31rem;
  margin-bottom: 0.17rem;
  line-height: 0.31rem;
  color: rgb(34, 34, 34);
  font-size: 0.32rem;
}

.skylight-en {
  height: 0.18rem;
  margin-bottom: 0.36rem;
  line-height: 0.18rem;
  font-size: 0.22rem;
  font-family: PingFang-SC-Regular;
  color: rgba(34, 34, 34, 1);
}
/*曲线*/
.curve {
  position: relative;
}

.curve > .cureve-text > span {
  position: absolute;
  color: #222222;
  font-size: 0.26rem;
}

.curve > div {
  position: absolute;
  left: 50%;
  top: 0.7rem;
  margin-left: -2%;
}
/*天窗主体*/

.skylight-wrap {
  height: 7.6rem;
  padding: 0.45rem 0.68rem;
}

.skylight-content {
  height: 4.6rem;
  width: 100%;
  justify-content: center;
}
/*天窗宽度*/

.temperature {
  align-self: flex-start;
  width: 0.8rem;
}
/*天窗图片*/

.wind-blows {
  /*margin-right: 0.5rem;*/
  /*align-self: flex-end;*/
}
.wind-blows > img {
  width: 1.95rem;
  height: 2.16rem;
}

.window-change > div > img {
  width: 2.66rem;
  height: 1.89rem;
}
/*关闭按钮*/
.close-skylight {
}
.close-skylight > button {
  display: block;
  width: 3rem;
  height: 0.8rem;
  font-size: 0.32rem;
  color: #ffff;
  border: none;
  outline: none;
  border-radius: 0.4rem;
  background: #49bbff;
}
.close-skylight > button.active {
  background: #cccccc;
  color: #fff;
  opacity: 0.5;
}
/*pin码提示框*/

.pin-remain {
  width: 6.3rem;
  height: 3.3rem;
  padding: 0.2rem 0.4rem;
}

.pin-code {
  height: 2rem;
  width: 100%;
}

.pin-code > div {
}

.pin-code > div > .pin-input {
  display: block;
  width: 5.6rem;
  height: 0.94rem;
  text-indent: 0.4rem;
  letter-spacing: 0.77rem;
  /*text-align: center;*/
  border: none;
  outline: none;
  background: url(../../../static/images/Lovecar/border@2x.png) no-repeat center;
  background-size: 100%;
}
.pin-code > .pin {
  display: flex;
  align-items: center;
  border: 1px solid #ccc;
}
.pin-code > .pin > input:not(:last-child) {
  border-right: 1px solid #ccc;
}
.pin-code > .pin > input {
  width: 0.93rem;
  height: 0.94rem;
  text-align: center;
  border: none;
  outline: none;
}
/*自定义软键盘*/

ul {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  height: 100%;
}

ul > li {
  width: 33.3%;
}

.typer {
  position: fixed;
  bottom: 0;
  background-color: #fff;
  height: 4rem;
  width: 100%;
  z-index: 3001;
}

.typer li {
  float: left;
  height: 0.7rem;
  margin: 0.1rem 0.05rem 0;
  color: #333;
  text-align: center;
  font-size: 0.32rem;
  line-height: 0.7rem;
  background-color: #ccc;
  -webkit-border-radius: 0.1rem;
  -moz-border-radius: 0.1rem;
  border-radius: 0.1rem;
}

.typer li.typer-pro {
  width: 31%;
  padding: 0 0.15rem;
}

.typer li.typer-pro.is-closeType {
  width: 1.2rem;
  float: right;
}

.typer li.typer-num {
  width: 31%;
  /*padding: 0.8rem .1rem;*/
  background-image: -webkit-linear-gradient(
    125deg,
    #147b96,
    #e6d205 25%,
    #147b96 50%,
    #e6d205 75%,
    #147b96
  );
  -webkit-text-fill-color: transparent;
  -webkit-background-clip: text;
  -webkit-background-size: 200% 100%;
  -webkit-animation: masked-animation 4s infinite linear;
}
.typer li.typer-num.is-A {
  margin-left: 0.31rem;
}
.typer li.typer-num.is-OK {
  width: 0.8rem;
  margin-left: 0.1rem;
}
@-webkit-keyframes masked-animation {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: -100% 0;
  }
}
/*自定遮罩层*/
.bgMask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
}
</style>