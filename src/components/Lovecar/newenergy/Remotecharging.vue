<template>
    <div>
        <mhead currentTitle="远程充电"></mhead>
        <div style="width:100%;height:.01rem;background:#f1f1f1;"></div>
        <div class="title_show flex">
          <div style="position:relative;width:1.6rem;height:2.2rem;top:.6rem;left:.4rem;">
            <div style="position:absolute;width:1.4rem;height:1.9rem;top:.2rem;left:.1rem;overflow:hidden;">
              <!-- <div class="showElectricquantity" >{{this.carcontrol.soc==-1?0:this.carcontrol.soc}}</div> -->
              <div class="showElectricquantity" >20%</div>
            </div>
            <img style="width:1.6rem;height:2.2rem;position:absolute"  src="./../../../../static/images/Lovecar/bgbattery@2x.png" alt="">
          </div>
            <div class="tilte_right">
              <div class="flex between" style="margin-top:.6rem;">
                  <div >
                    <div style="padding:.15rem">剩余电量</div>
                    <!-- <span style="padding:.15rem;">{{this.carcontrol.soc==-1?0:this.carcontrol.soc}}</span> -->
                    <span style="padding:.15rem;"></span>20%</span>
                  </div>
                  <img @click="refish" style="width:.38rem;height:.32rem;position:absolute;left:3.5rem" src="./../../../../static/images/Lovecar/refreshagain@2x.png" alt="">
              </div>
              <div class="flex contentcenter around title_right_bottom">
                  <div>
                      <div>空调关闭剩余里程</div>
                      <!-- <span>{{this.carcontrol.acOffMile}}</span> -->
                      <span>111km</span>
                  </div>
                  <div>
                      <div>空调开启剩余里程</div>
                      <span>80km</span>
                      <!-- <span>{{this.carcontrol.acOnMile}}</span> -->
                  </div>
              </div>
            </div>
        </div>
        <ul class="comment">
          <li>
            <div>  
              <div>充电枪状态</div>
              <!-- <span>{{this.chgPlugStatus}}</span> -->
              <span>sile</span>
            </div>
            <div>  
              <div>当前充电状态</div>
              <span>guale</span>
              <!-- <span>{{this.chgStatus}}</span> -->
            </div>
          </li>
          <li>
            <div>  
              <div>预计慢充时间</div>
              <!-- <span>{{this.carcontrol.slowChgLeftTime}}</span> -->
              <span>adsf</span>
            </div>
            <div>  
              <div>预计快充时间</div>
              <!-- <span>{{this.carcontrol.quickChgLeftTime}}</span> -->
              <span>jsafkas</span>
            </div>
          </li>
        </ul>
        <div class="flex between begintime" >
            <div>预约充电</div>
            <mt-switch v-model="value" @change="turn"  style="padding:.2rem;"></mt-switch>
        </div>
        <div ref="showtime" v-show="value" class="showtime">{{this.showhour}}{{this.showminute}}后开始充电</div>
        <div v-if="!controlcharge" class="lastdian" @click="Charging">
          <img src="./../../../../static/images/Lovecar/btndian@2x.png" alt="">
          <div>立即充电</div>
        </div>
        <div v-else class="lastdian" @click="Charging">
          <img src="./../../../../static/images/Lovecar/btnoff@2x.png" alt="">
          <div>停止充电</div>
        </div>
         <mt-datetime-picker
            ref="pickerstart"
            type="time"
            hourFormat="{value} 时"
            minuteFormat="{value} 分"
            @confirm="handleConfirmstart"
            @cancel="cancelchoose"
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
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
export default {
  data() {
    return {
      value: false, //控制开关
      flag: false, //控制接口调用直接开始还是预约开始
      showhour: "",
      showminute: "",
      chargeimg: "", //知道是充电状态还是非充电装填1为停止充电2为开始充电
      controlcharge: false, //控制底下充电图标
      sjc: "",
      operation: "", //1为停止充电,2为开始充电
      totime: "", //传给后台的时间
      //移动端键盘值
      ownKeyBoard: {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
      },
      //pin码弹出框控制变量
      popupVisible: false,
      //pin码值
      pinNumber: "",
      //自定义软键盘状态 0 消失 2 键盘开启
      showTyper: 0,
      //软键盘内容12位随机数组
      keyNums: [],
      //存储所有充电数据,以及变动数据
      carcontrol:{
      },
    };
  },
  methods: {
    //调用充电接口
    charged() {
      let data = {
        vin: this.$store.state.vins,
        operationType: "RESERVATION_RECHARGE",
        operation: this.operation,
        extParams: {
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
            this.getAsyReturn(res.data.operationId);
          }
        }).catch((err)=>{
          if(this.operation==2){
            this.value=false
          }
        });
    },
    Toasteach() {
      MessageBox("提示", this.windowwords[3].dictValue);
    },
    //点击遮罩或者'x'移除popup
    removeMask() {
      this.popupVisible = !this.popupVisible;
      this.showTyper = 0;
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
    //产生随机数
    randomnum(min, max) {
      var num = Math.floor(Math.random() * (max - min) + min);
      return num;
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
    getAsyReturn(operationId) {
      this.sjc = new Date().getTime();
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
                            //超时提示并且清除定时器关闭遮罩层
                            clearInterval(this.time);
                            localhide();
                          }
                        } else if (res.data.status == "SUCCEED") {
                          if (this.flag) {
                            if (this.chargeimg == 1) {
                              this.controlcharge = false;
                            } else {
                              this.controlcharge = true;
                            }
                          } else {
                            if (this.operation == 1) {
                              this.value = false;
                            } else {
                              this.value=true
                              this.flag = false;
                            }
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
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              if (this.flag) {
                if (this.chargeimg == 1) {
                  this.controlcharge = false;
                } else {
                  this.controlcharge = true;
                }
              } else {
                if (this.operation == 1) {
                  this.value = false;
                } else {
                  this.value=true
                  this.flag = false;
                }
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
    //选择充电开始时间
    begintime() {
      this.operation = 2;
      this.$refs.pickerstart.open();
    },
    //改变开关
    turn() {
      if (this.controlcharge) {
        setTimeout(() => {
          this.value = false;
          Toast({
            message: "充电中,请先停止充电",
            position: "middle",
            duration: 2000
          });
        }, 0);
      } else {
        if (this.value) {
          this.operation = 2;
          this.begintime();
        } else {
          MessageBox.confirm("预约充电已开启，确认关闭吗?")
            .then(action => {
              if (action == "confirm") {
                this.operation = 1;
                this.totime = 0;
                this.popupVisible=!this.popupVisible
                // this.charged();
              }
            })
            .catch(err => {
              if (err == "cancel") {
                this.value = true;
              } else {
              }
            });
        }
      }
    },
    cancelchoose() {
      this.value = false;
    },
    //刷新按钮
    refish() {

    },
    sec_to_time(data) {
      let hour = parseFloat(data.split(":")[0]) * 3600;
      let mit = parseFloat(data.split(":")[1]) * 60;
      this.totime = hour + mit;
      this.value=false
      this.popupVisible=!this.popupVisible
      // this.charged();
    },
    handleConfirmstart(data) {
      this.operation = 2;
      this.showhour = data.split(":")[0] + "小时";
      this.showminute = data.split(":")[1] + "分钟";
      this.sec_to_time(data);
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
    Conversiontime(timestamp) {
      var date = new Date(timestamp);
      let Y, M, D, h, m, s;
      Y = date.getFullYear() + "-";
      M = date.getMonth() + 1 + "-";
      D = date.getDate();
      return Y + M + D;
    },
    //点击立即充电
    Charging() {
      if (this.value) {
        MessageBox.confirm("预约充电已开启，确认关闭吗?")
          .then(action => {
            if (action == "confirm") {
              this.chargeimg = 2;
              this.flag = true;
              this.value = false;
              this.controlcharge = true;
              //立即充电
              this.totime = 0;
              this.popupVisible=!this.popupVisible
              // this.charged();
            }
          })
          .catch(err => {
            if (err == "cancel") {
              this.flag = false;
              this.controlcharge = false;
            }
          });
      } else {
        //立即充电
        this.flag = true;
        if (this.controlcharge) {
          this.chargeimg = 1;
          this.operation = 1;
        } else {
          this.chargeimg = 2;
          this.operation = 2;
        }
        this.totime = 0;
        this.popupVisible=!this.popupVisible
        // this.charged();
      }
    },
    //获取电池状态
    batteryStatis() {
      let top =
        1.9 *
          (100 - 20) /
          100 +
        "rem";
      $(".showElectricquantity").css("top", top);
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
  created() {
    // this.endtime=this.toDate()
    // this.loadcss()
    this.carcontrol=this.$route.query.carcontrol
    let time = new Date().getTime() + 1000 * 60 * 60 * 24 * 7;
    this.endtime = new Date(this.Conversiontime(time) + "");
    this.inputs();
  },
  mounted() {
    this.batteryStatis();
    // this.starttimes=this.tochangeTime(new Date().getTime())
  },
  watch: {
    pinNumber(newVal, oldVal) {
      if (this.pinNumber.length == 6) {
        
        var nums = this.pinNumber;
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
              this.popupVisible = !this.popupVisible;
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.pinNumber = "");
                alert(this.operation)
                this.charged()
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
  }
};
</script>

<style scoped>
.box {
  width: 6.9rem;
  height: 3.6rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 24px 0px rgba(79, 79, 79, 0.12);
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 0.7rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
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
.begintime {
  font-size: 0.34rem;
  color: #222;
  line-height: 0.4rem;
}
.begintime > div {
  padding: 0.2rem;
  font-size: 0.34rem;
  color: #222;
}
.showtime {
  margin-left: 0.2rem;
  font-size: 0.22rem;
  color: #555;
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
.title_show {
  width: 90%;
  height: 3.4rem;
  position: relative;
  color: #222;
  margin: 0.2rem auto;
  border-bottom: 0.01rem solid #f1f1f1;
}
.title_show .showElectricquantity {
  width: 1.4rem;
  height: 1.9rem;
  position: absolute;
  background: linear-gradient(
    135deg,
    rgba(74, 255, 245, 1),
    rgba(73, 187, 255, 1)
  );
  z-index: 2;
  text-align: center;
  border-radius: 0.06rem;
  font-size: 0.36rem;
  color: #49bbff;
}
.title_show .tilte_right {
  position: absolute;
  left: 2.6rem;
}
.title_show .tilte_right div {
  font-size: 0.22rem;
}
.title_show .tilte_right span {
  font-size: 0.4rem;
  color: #49bbff;
}
.title_show .tilte_right .title_right_bottom > div {
  padding: 0.12rem;
  width: 2.2rem;
}
.title_show .tilte_right .title_right_bottom span {
  padding: 0.2rem;
}
.comment {
  width: 90%;
  position: relative;
  height: 2.8rem;
  margin: 0.2rem auto;
  border-bottom: 0.01rem solid #f1f1f1;
}
.comment > li {
  display: flex;
  align-items: center;
  height: 1.4rem;
  margin-left: -0.2rem;
}
.comment > li > div {
  padding: 0.46rem 0.7rem;
}
.comment li div {
  font-size: 0.22rem;
  color: #222;
}
.comment li span {
  font-size: 0.28rem;
  color: #49bbff;
}
.comment > li > div > div {
  padding: 0.1rem;
  width: 2rem;
}
.comment > li > div > span {
  padding: 0.1rem;
}
.lastdian {
  width: 100%;
  position: relative;
}
.lastdian > img {
  width: 1.64rem;
  height: 1.64rem;
  position: absolute;
  left: 50%;
  margin-left: -0.82rem;
  top: 1.56rem;
}
.lastdian > div {
  position: absolute;
  top: 3.5rem;
  width: 100%;
  text-align: center;
  color: #49bbff;
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
