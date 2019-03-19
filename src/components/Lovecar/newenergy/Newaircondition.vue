<template>
	<div class="window-control" @touchmove.prevent>
		<mhead currentTitle="空调控制"></mhead>
		<div class="window-header">
			<!--<div class="window-btn">
				<mt-switch v-model="value" @change="turn"></mt-switch>
				<span>OFF/NO</span>
			</div>-->
			<div class="window-sign flex-column">
				<span class="window-ch">空调</span>
				<span class="window-en">CONDITIONERS</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>

		<!--车窗主体Start-->
		<div class="window-wrap flex-column-align">
			<div class="window-content flex-center-between">
				<div class="wind-blows">
					<img v-if="!this.flags" :src="'./static/images/Lovecar/air1@2x.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/air@2x.png'" alt="" />
				</div>
			</div>
      <div class="allcontrol">
        <div :class="this.flags?'':'allchangecolor'" @click="alloff">全关</div>
        <div :class="this.flags?'allchangecolor':''" @click="allon">全开</div>
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
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
import PublicHead from "../../publicmodel/PublicHead";
import { MessageBox } from "mint-ui";
export default {
  name: "windowControl",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      fluctuationType: 1, //当等于1的时候一键全开关,等于2的时候百分比
      flags: false,
      percent: "", //车窗打开百分比
      //车窗控制按钮开关
      //value: false,
      windowwords: [], //车窗提示语
      allwords: [], //所有提示语
      sjc:'',
      //移动端键盘值
      ownKeyBoard: {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
      },
      operationIds: "",
      //图片激活变量
      activeShowImg: 0,
      winMin: 0,
      //pin码弹出框控制变量
      popupVisible: false,
      //pin码值
      pinNumber: "",
      //自定义软键盘状态 0 消失 2 键盘开启
      showTyper: 0,
      //软键盘内容12位随机数组
      keyNums: []
    };
  },
  methods: {
    alloff() {
      this.fluctuationType = 1;
      this.popupVisible = true;
      // this.httpwindowall();
    },
    allon() {
      this.fluctuationType = 3;
      this.popupVisible = true;
      // this.httpwindowall();
    },
    //路由跳转的时候清除轮询loading
    goback() {
      this.$router.go(-1);
      localhide();
    },
    //拿到车窗的提示语
    getwindowwords() {
      this.allwords = this.$store.state.GETWORDS;
      for (let value of this.allwords) {
        if (value.dictType == "vehicle_window") {
          this.windowwords = value.sysDictDataVOs;
        }
      }
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
    //车窗接口一键系列
    httpwindowall() {
      let percent = this.fluctuationType == "1" ? "0" : "100";
      var param = {
        vin: this.$store.state.vins,
        operationType: "WINDOW",
        // operation: this.nums, //操作项
        extParams: {
          windowNum: 5,
          fluctuationType: 2,
          percent: percent
          // gear:''
        }
      };
      this.$http
        .post(Lovecar.Control, param, this.$store.state.tsppin)
        .then(res => {
          this.operationIds = res.data.operationId;
          if (res.data.returnSuccess) {
            Toast({
              message: this.windowwords[0].dictValue,
              position: "middle",
              duration: 2000
            });
            setTimeout(() => {
              this.getAsyReturn(res.data.operationId);
            }, 2000);
          } else {
            Toast({
              message: res.data.returnErrMsg,
              position: "middle",
              duration: 2000
            });
          }
        })
        .catch(err => {
          Toast({
            message: res.data.returnErrMsg,
            position: "middle",
            duration: 2000
          });
        });
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
    Toasteach() {
      MessageBox("提示", this.windowwords[3].dictValue);
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
              if (tSS >= 56) {
                Toast({
                  message: this.windowwords[2].dictValue,
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
                          if (tSS >= 56) {
                            Toast({
                              message: this.windowwords[2].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                            clearInterval(this.time);
                            localhide();
                          }
                        } else if (res.data.status == "SUCCEED") {
                          if (this.fluctuationType == "1") {
                            //车窗图片关闭
                            this.activeShowImg = false;
                            //canvas的关闭
                            Toast({
                              message: this.windowwords[4].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          }
                          if (this.fluctuationType == "3") {
                            //车窗图片激活
                            this.activeShowImg = true;
                            //canvas的激活
                            Toast({
                              message: this.windowwords[5].dictValue,
                              position: "middle",
                              duration: 2000
                            });
                          }
                          clearInterval(this.time);
                          localhide();
                        } else if (res.data.status == "FAILED") {
                          Toast({
                            message: this.windowwords[2].dictValue,
                            position: "middle",
                            duration: 2000
                          });
                          clearInterval(this.time);
                          localhide();
                        }
                      } else {
                        Toast({
                          message: this.windowwords[2].dictValue,
                          position: "middle",
                          duration: 2000
                        });
                        clearInterval(this.time);
                        localhide();
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              if (this.fluctuationType == "1") {
                //车窗图片关闭
                this.activeShowImg = false;
                Toast({
                  message: this.windowwords[4].dictValue,
                  position: "middle",
                  duration: 2000
                });
              }
              if (this.fluctuationType == "3") {
                //车窗图片激活
                this.activeShowImg = true;
                Toast({
                  message: this.windowwords[1].dictValue,
                  position: "middle",
                  duration: 2000
                });
              }
              clearInterval(this.time);
              localhide();
            } else if (res.data.status == "FAILED") {
              Toast({
                message: this.windowwords[2].dictValue,
                position: "middle",
                duration: 2000
              });
              clearInterval(this.time);
              localhide();
            }
          } else {
            Toast({
              message: this.windowwords[2].dictValue,
              position: "middle",
              duration: 2000
            });
            clearInterval(this.time);
            localhide();
          }
        });
    },
    Carquery() {
      this.$http
        .post(
          Lovecar.Carquery,
          { vins: [this.$store.state.vins] },
          this.$store.state.tsppin
        )
        .then(res => {
          if (res.data.returnSuccess) {
            // this.getAsyReturn(res.data.operationId);
          } else {
            Toast({
              message: res.data.returnErrMsg,
              position: "middle",
              duration: 2000
            });
          }
        })
        .catch(err => {
          Toast({
            message: res.data.returnErrMsg,
            position: "middle",
            duration: 2000
          });
        });
    }
  },
  mounted() {
    
  },
  created() {
    this.getwindowwords();
    this.inputs();
    // this.Carquery()
  },
  beforeDestroy() {
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
    }
  },
  filters: {
    changenum(value) {
      value = 100 - value.replace(/%/g, "") + "%";
      return value;
    }
  },
  watch: {
    pinNumber(newVal, oldVal) {
      if (this.pinNumber.length == 6) {
        var nums = this.pinNumber;
        //      alert(this.$store.state.tsppin.headers.identityParam.token)
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
              // this.value = !this.value;\
              this.httpwindowall();
              //pin码正确激活弧线
              // //pin码正确激活空调图
              // (this.activeShowImg = !this.activeShowImg),
              // this.refreshPmData(),
              //消失遮罩
              this.popupVisible = !this.popupVisible;
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.pinNumber = "");
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
            if (res.data.returnSuccess) {
              // this.value = !this.value;
              this.httpwindowall();
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
/*车窗头部*/

.window-header {
  padding: 1.6rem 0.64rem 0 0.68rem;
}
/*车窗开关按钮*/

.window-btn {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.allcontrol {
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  vertical-align: middle;
  width: 100%;
  height: 0.8rem;
}
.allcontrol > div {
  line-height: 0.8rem;
  width: 2rem;
  height: 0.8rem;
  border: 0.01rem solid rgba(204, 204, 204, 1);
  border-radius: 0.4rem;
  margin: 0.4rem;
  color: #fff;
  background: rgba(204, 204, 204, 1);
}

/*车窗标志*/

.window-ch {
  height: 0.31rem;
  margin-bottom: 0.17rem;
  line-height: 0.31rem;
  color: rgb(34, 34, 34);
  font-size: 0.32rem;
}

.window-en {
  height: 0.18rem;
  margin-bottom: 0.36rem;
  line-height: 0.18rem;
  font-size: 0.22rem;
  font-family: PingFang-SC-Regular;
  color: rgba(34, 34, 34, 1);
}

/*车窗主体*/

.window-wrap {
  height: 6.6rem;
  padding: 0.45rem 0.68rem;
}

.window-content {
  height: 4.6rem;
  width: 100%;
  position: relative;
  justify-content: center;
}
/*车窗高度*/

.temperature {
  align-self: flex-start;
  width: 0.8rem;
}
/*车窗图*/

.wind-blows {
}

.wind-blows > img {
  width: 2.7rem;
  height: 2.02rem;
}
/*车窗高度计数器*/

.window-change {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
}

.window-change > div > img {
  width: 0.8rem;
  height: 1px;
}

.wind-count {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 2.1rem;
  margin: 0 auto;
  border: 1px solid #999999;
  border-radius: 0.3rem;
}

.window-change .wind-input {
  width: 0.9rem;
  height: 0.6rem;
  outline: none;
  border: none;
  text-align: center;
}

.addWind {
  display: block;
  width: 0.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  border-right: 1px solid #999999;
}

.reduceWind {
  display: block;
  width: 0.6rem;
  height: 0.6rem;
  line-height: 0.6rem;
  text-align: center;
  border-left: 1px solid #999999;
}
/*车窗展示激活*/

/*页面进入提示*/

.wind-wrap {
  width: 6.3rem;
  padding: 0.44rem 0.58rem 0.33rem;
}

.window-title {
  margin-bottom: 0.54rem;
  text-align: center;
  color: #222222;
  font-size: 0.36rem;
}

.info-content {
  margin-bottom: 0.48rem;
  color: #444444;
  font-size: 0.26rem;
  text-align: center;
}

.info-time {
  display: flex;
  align-items: center;
  color: #888888;
  height: 0.24rem;
  line-height: 0.24rem;
  margin-bottom: 0.48rem;
}

.info-time > img {
  width: 0.4rem;
  height: 0.4rem;
  margin-right: 0.2rem;
}

.info-time > span {
  font-size: 0.24rem;
}

.info-btn {
  height: 0.98rem;
  border-top: 1px solid #f1f1f1;
  line-height: 0.98rem;
  text-align: center;
}

.info-btn > button {
  outline: none;
  border: none;
  color: #49bbff;
  font-size: 0.32rem;
  background: no-repeat;
  width: 50%;
  padding: 0.1rem 0;
}

.info-btn > button:not(:last-child) {
  border-right: 1px solid #f1f1f1;
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
  background: url(../../../../static/images/Lovecar/border@2x.png) no-repeat
    center;
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
.question {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
}
div.allchangecolor {
  border: 0.01rem solid #49bbff;
  background: #49bbff;
}
</style>