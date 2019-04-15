<template>
    <div>
        <mhead currentTitle="远程预热"></mhead>
        <div style="width:100%;height:.01rem;background:#f1f1f1"></div>
        <div class="switch flex contentcenter">
          <mt-switch v-model="onoff" @change="turn"></mt-switch>
          <span>OFF/ON</span>
        </div>
        <div class="title">
           <div>加热</div>
           <div class="specil">HEATING</div>
        </div>
        <div v-show="num==0" class="flex cocenter  nextbox" @click="openPicker">
            <span>预约加热</span>
            <img :src="'./../../../../static/images/nextblue@2x.png'" alt="">
        </div>
        <div v-show='num==1' class="  nextbox" @click="Tips">
          <div class="flex cocenter">
            <span>预约加热已开启</span>
            <img :src="'./../../../../static/images/nextblue@2x.png'" alt="">
          </div>
          <div class="flex cocenter">
            <div ref="nextbox_dang" style="color:#222;padding:.1rem 0 0 .3rem;font-size:.22rem;width:1rem;">低档 ,</div>
            <div style="color:#222;padding:.1rem 0 0 .3rem;font-size:.22rem;">{{this.showhour}}{{this.showminute}}后开始加热</div>
          </div>
        </div>
        <div v-show='num==2' class="flex cocenter  nextbox" >
            <span style="color:#222">远程预热中…</span>
        </div>
        <div class="mainimg">
           <img v-show="mainhotimg" :src="'./../../../../static/images/Lovecar/hot@2x.png'" alt="">
           <img v-show="!mainhotimg" :src="'./../../../../static/images/Lovecar/hoton@2x.png'" alt="">
        </div>
        <div class="control">
           <div class="control_dianleft"></div>
           <div class="control_dianright"></div>     
           <div class="control_bg"></div>
           <div class="control_on" ref="control_bottom">
              <span @click="lowon"><</span>
              <div class="dangwei" ref="commenttext">低</div>
              <span @click="highon">></span>
           </div>
        </div>
        <div style="text-align: center;margin-top:.4rem;">加热档位</div>
        <mt-datetime-picker
            ref="picker"
            type="time"
            hourFormat="{value} 时"
            minuteFormat="{value} 分"
            @confirm="handleConfirm"
            :visible-item-count='5'
            >
        </mt-datetime-picker>
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
import PublicHead from "../../publicmodel/PublicHead";
import {Toast} from 'mint-ui'
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      totime: 0, //传给后台的时间戳
      onoff: false, //控制开关的变化
      mainhotimg: true, //控制主加热图片的变化
      num: 0,
      showhour: "", //预热展示的小时
      showminute: "", //预热展示的分钟
      sjc: "",
      level: 1, //预热低高档默认低档2为高档
      //移动端键盘值
      ownKeyBoard: {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
      },
      operation:0,
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
    Toasteach() {
      MessageBox("提示", this.windowwords[3].dictValue);
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
    //远程加热接口
    hotted() {
      let data = {
        vin: "LS5A3CJC9JF830022",
        operationType: "PREHEAT",
        operation:this.operation,
        extParams: {
          level: this.level,
          bookTime: this.totime
        }
      };
      this.$http
        .post(
          Newenergy.energyremotevehiclecontrol,
          data,
          this.$store.state.tsppin
        )
        .then(res => {
          if (res.data.returnSuccess) {
            this.getAsyReturn("1034548346");
          }
        });
    },
    getAsyReturn(operationId) {
      this.sjc = new Date().getTime();
      console.log(Newenergy);
      this.$http
        .post(
          Newenergy.energyvehicleasyncresults,
          {
            operationId: operationId
          },
          this.$store.state.tsppin
        )
        .then(res => {
          var tS = new Date().getTime() - this.sjc; //时间戳 差
          var tSS = parseInt((tS / 1000) % 60); // 时间差
          if (res.data.returnSuccess == true) {
            if (res.data.status == "IN_PROGRESS") {
              //60s  后 清除定时器，不在发请求
              if (tSS >= 56) {
                //超时提示
              } else {
                this.time = setInterval(() => {
                  this.$http
                    .post(
                      Lovecar.OperationId,
                      {
                        operationId: operationId
                      },
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      var tS = new Date().getTime() - this.sjc; //时间戳 差
                      var tSS = parseInt((tS / 1000) % 60); // 时间差
                      if (res.data.returnSuccess == true) {
                        if (res.data.status == "IN_PROGRESS") {
                          //60s  后 清除定时器，不在发请求
                          if (tSS >= 56) {
                            //超时提示并且清除定时器关闭遮罩层
                            clearInterval(this.time);
                            localhide();
                          }
                        } else if (res.data.status == "SUCCEED") {
                          clearInterval(this.time);
                          localhide();
                        } else if (res.data.status == "FAILED") {
                          clearInterval(this.time);
                          localhide();
                        }
                      } else {
                        clearInterval(this.time);
                        localhide();
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              if (this.choose == "立即预约加热") {
                if (!this.onoff) {
                  this.mainhotimg = false;
                  this.onoff = true;
                  this.num = 2;
                } else {
                  this.num = 0;
                  this.onoff = false;
                  this.mainhotimg = true;
                }
              } else if (this.choose == "准备预约加热") {
                this.num = 1;
              } else if (this.choose == "档位调高") {
                if (this.$refs.commenttext.innerHTML == "低") {
                  this.$refs.control_bottom.style.left = 3 + "rem";
                  this.$refs.commenttext.innerHTML = "高";
                  this.$refs.nextbox_dang.innerHTML = "高档 ,";
                }
              } else if (this.choose == "档位调低") {
                if (this.$refs.commenttext.innerHTML == "高") {
                  this.$refs.control_bottom.style.left = 2.2 + "rem";
                  this.$refs.commenttext.innerHTML = "低";
                  this.$refs.nextbox_dang.innerHTML = "低档 ,";
                }
              }else if(this.choose == "准备关闭预热"){
                this.num = 0;
              }
              clearInterval(this.time);
              localhide();
            } else if (res.data.status == "FAILED") {
              clearInterval(this.time);
              localhide();
            }
          } else {
            clearInterval(this.time);
            localhide();
          }
        });
    },
    turn() {
      if (this.onoff) {
        setTimeout(() => {
          this.onoff = false;
        }, 0);
      } else {
        setTimeout(() => {
          this.onoff = true;
        }, 0);
      }
      this.choose = "立即预约加热";
      if (this.num == 1) {
        if (!this.onoff) {
          
        } else {
          MessageBox.confirm("预约加热中,是否直接开启直接加热?")
            .then(action => {
              if (action == "confirm") {
                this.popupVisible = !this.popupVisible;
                //立即充电
              }
            })
            .catch(err => {
              if (err == "cancel") {
                this.onoff = false;
              }
            });
        }
      } else {
        this.popupVisible = !this.popupVisible;
      }
    },
    openPicker() {
      this.choose = "准备预约加热";
      this.$refs.picker.open();
    },
    //完成预热后点击提示
    Tips() {
      this.choose = "准备关闭预约加热";

      MessageBox.confirm("预约加热中,是否直接开启直接加热?")
        .then(action => {
          if (action == "confirm") {
            this.popupVisible = !this.popupVisible;
            //立即加热
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    },
    //左按钮低档加热
    lowon() {
      this.popupVisible = !this.popupVisible;
      this.choose = "档位调低";
    },
    //右按钮高档加热
    highon() {
      this.popupVisible = !this.popupVisible;
      this.choose = "档位调高";
    },
    //时间戳转化
    tochangeTime(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      return y + "年" + m + "月" + d + "日" + "" + h + ":" + minute;
    },
    sec_to_time(data) {
      let hour = parseFloat(data.split(":")[0]) * 3600;
      let mit = parseFloat(data.split(":")[1]) * 60;
      this.totime = hour + mit;
      this.popupVisible = !this.popupVisible;
    },
    handleConfirm(data) {
      this.showhour = data.split(":")[0] + "小时";
      this.showminute = data.split(":")[1] + "分钟";
      this.sec_to_time(data);
    },
    Conversiontime(timestamp) {
      var date = new Date(timestamp);
      let Y, M, D, h, m, s;
      Y = date.getFullYear() + "-";
      M = date.getMonth() + 1 + "-";
      D = date.getDate();
      return Y + M + D;
    },
    loadcss() {
      this.$nextTick(() => {
        $(".mint-datetime .picker-toolbar")
          .css("position", "relative")
          .css("top", "3.3rem");
        $(".mint-datetime-cancel").css("border-right", "solid 1px #eaeaea");
        $(".mint-datetime .picker-items")
          .css("position", "relative")
          .css("top", "-.7rem")
          .css("border-bottom", "solid 1px #eaeaea");
      });
    }
  },
  watch: {
    pinNumber(newVal, oldVal) {
      if (this.pinNumber.length == 6) {
        this.popupVisible = !this.popupVisible;
        //消失软键盘
        (this.showTyper = 0),
          //清空pin码
          (this.pinNumber = "");
        var nums = this.pinNumber;
        //改变加热开关
        this.$http
          .post(
            Newenergy.energyvehiclePINvalidation,
            {
              pin: nums
            },
            this.$store.state.tsppin
          )
          .then(res => {
            if (res.data.returnSuccess) {
        // this.value = !this.value;\
        //pin码正确激活弧线
        // //pin码正确激活空调图
        // (this.activeShowImg = !this.activeShowImg),
        // this.refreshPmData(),
        //消失遮罩
        if (this.choose == "立即预约加热") {
          this.totime = 0;
          if(this.onoff){
            this.operation=1;
          }else{
            this.operation=2;
          }
        } else if (this.choose == "准备预约加热") {
          this.operation=2;
        } else if (this.choose == "档位调低") {
          if(this.operation==0){
                Toast({
                  message: '请先选择预热时间或者直接预热',
                  position: "middle",
                  duration: 2000
                });
            return false
          }
          this.level = 1;
        } else if (this.choose == "档位调高") {
          if(this.operation==0){
                Toast({
                  message: '请先选择预热时间或者直接预热',
                  position: "middle",
                  duration: 2000
                });
            return false
          }
          this.level = 2;
        } else if (this.choose == "准备关闭预约加热") {
          this.operation=1
        }
        this.hotted();
        
        
        } else {
          localhide();
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
          localhide();
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
          });
      }
    }
  },
  components: {
    mhead: PublicHead
  },
  created() {
    this.inputs();
    // this.loadcss()
  },
  mounted() {}
};
</script>

<style scoped>
.box {
  width: 6.9rem;
  height: 1.2rem;
  box-shadow: 0px 4px 24px 0px rgba(79, 79, 79, 0.12);
  border-radius: 0.08rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  justify-content: space-between;
}
.nextbox {
  height: 1rem;
  margin: 0.4rem auto;
  color: #49bbff;
}
.nextbox span {
  font-size: 0.3rem;
  margin: 0 0.1rem 0 0.3rem;
}
.nextbox img {
  width: 0.07rem;
  height: 0.11rem;
}
.mint-datetime {
  bottom: 4rem;
  width: 82%;
  height: 40%;
  border-radius: 5%;
}
.mint-popup {
  border-radius: 0.1rem;
}
.switch {
  width: 100%;
  margin-top:.4rem;
  flex-direction: column;
}
.switch span {
  padding: 0.2rem;
}
.title {
  margin-left: 0.5rem;
  font-size: 0.28rem;
  color: #222;
}
.title .specil {
  font-size: 0.24rem;
  width: 0.6rem;
  color: #999999;
  padding: 0.05rem 0 0.2rem 0;
  border-bottom: 0.01rem solid #999999;
}
.mainimg {
  width: 100%;
  position: relative;
  height: 5.5rem;
}
.mainimg > img {
  width: 2.08rem;
  height: 2.42rem;
  position: absolute;
  left: 50%;
  margin-left: -1.04rem;
  margin-top: 1.57rem;
}
.control {
  position: relative;
  height: 1rem;
}
.control .control_bg {
  width: 3.6rem;
  position: absolute;
  height: 0.02rem;
  background: #999;
  left: 50%;
  margin-left: -1.8rem;
  top: 0.5rem;
}
.control .control_dianleft{
  position: absolute;
  width: .08rem;
  height: .08rem;
  background: #999;
  border-radius: 50%;
  left: 25%;
  top:.46rem;
}
.control .control_dianright{
  position: absolute;
  width: .08rem;
  height: .08rem;
  background: #999;
  border-radius: 50%;
  right: 25%;
  top:.46rem;
}
.control .control_on {
  position: absolute;
  width: 2.3rem;
  height: 0.6rem;
  left: 2.2rem;
  border-radius: 9.99rem;
  border: 0.02rem solid #999;
  display: flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  top: 0.22rem;
}
.dangwei {
  font: 600 0.24rem/0.6rem "PingFang-SC-Medium";
  color: #222;
}

.question {
  position: absolute;
  top: 0.3rem;
  right: 0.3rem;
}
.flex-center-between {
  /*水平垂直居中-两边对齐*/
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.flex-center {
  /*水平垂直居中*/
  display: flex;
  justify-content: center;
  align-items: center;
}
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
/*自定遮罩层*/
.bgMask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100vh;
  opacity: 0.5;
  background: #000;
}
</style>
