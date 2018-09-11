<template>
	<div class="aircondition-control">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="goback">
			<span class="header-title">空调控制</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="air-header">
			<div class="air-btn">
				<div>
					<span style="margin-right: 0.2rem;">开关</span>
					<mt-switch v-model="value" @change="turn"><span></span></mt-switch>
				</div>

				<div>
					<span style="margin-right: 0.2rem;">压缩机</span>
					<mt-switch v-model="compressor" @change="turnCompressor"><span></span></mt-switch>
				</div>
				<div v-if="!value" class="switch-mask"></div>
			</div>
			<div class="air-sign flex-column">
				<span class="air-ch">空调</span>
				<span class="air-en">conditioners</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>
		<!--曲线Start-->
		<div class="curve">
			<div class="cureve-text">
				<span style="left: 3.1rem;top: 2.6rem;">17</span>
				<span style="left: 2.6rem;top: 0.9rem;">22</span>
				<span style="left: 1.6rem;top: -0.1rem;">27</span>
				<span style="left: 0rem;top: -0.3rem;">32</span>
			</div>
			<div @touchend="end" class="curveActive" v-show="curveState">
				<canvas id="rightColorful"></canvas>
			</div>
			<div class="curveLoseActive" v-show="!curveState">
				<canvas id="rightGray"></canvas>
			</div>

		</div>
		<!--曲线End-->

		<!--空调主体Start-->
		<div class="air-wrap flex-column-align">
			<div class="air-content flex-center-between">
				<!--温度计数器Start-->
				<div class="temperature">
					<span style="display:block;margin-bottom: 0.4rem;">温度</span>
					<div class="temper-inputcoun flex-center">
						<div class="counter">
							<button class="conmmon-style" :disabled="!value" @click="add" style="transform: rotateZ(-90deg);">></button>
							<button class="conmmon-style" :disabled="!value" @click="reduce" style="transform: rotateZ(-90deg);"><</button>
						</div>
					</div>
				</div>
				<!--温度计数器End-->

				<!--空调图Start-->
				<div class="wind-blows">
					<div  v-if="activeShowImg">
						<img class="color-fan" :class="{rotateActive: rotateState}" :src="'./static/images/Lovecar/ariss@2x.png'" alt="" />
						<img class="small-fan" :class="{rotateActive: rotateState}" :src="'./static/images/Lovecar/airs@2x.png'" alt="" />
					</div>
					<div v-else style="margin-left: 0.4rem;">
						<img class="gray-fan" :src="'./static/images/Lovecar/air1@2x.png'" alt="" />
					</div>
					<!--<img :class="{rotateActive: rotateState}" :src="'./static/images/Lovecar/air@2x.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/air1@2x.png'" alt="" />-->
				</div>
				<!--空调End-->

				<!--温度数值Start-->
				<div class="num">
					<span :class="activeShowImg?'fontActive':'loseActives'" ref="temperature">{{temperNum[airSpace]}}℃</span>
				</div>
				<!--温度数值End-->
			</div>
			<!--风量计数器Start-->
			<div class="air-change flex-center">
				<img :src="'./static/images/Lovecar/left@2x.png'" alt="" />
				<div class="wind-count">
					<button  @click=" windReduce" class="addWind conmmon-style"><</button>
					<input class="wind-input" ref="Air" type="text" v-model="windNum[winIndex]" readonly />
					<button  @click="windAdd" class="reduceWind conmmon-style">></button>
				</div>
				<img :src="'./static/images/Lovecar/right@2x.png'" alt="" />
			</div>
			<!--风量计数器End-->
		</div>
		<!--空调主体End-->
		<div class="sing-line"></div>
		<!--底部导航Start-->
		<div class="air-footer flex-center-between">
			<button :disabled="!value" class="tabar flex-column-align" @click="change(1)">
				<img v-if="activeShowImg == 1" :src="'./static/images/Lovecar/no-off@2x.png'" />
				<img v-else :src="'./static/images/Lovecar/no-off2@2x.png'" />
			</button>
			<button :disabled="!value" class="tabar flex-column-align" @click="change(2)">
				<img v-if="activeShowImg == 2" :src="'./static/images/Lovecar/off-left@2x.png'" />
				<img v-else :src="'./static/images/Lovecar/off-left2@2x.png'" />
				<span :class="activeShowImg==2?'active':'actives'">内循环</span>
			</button>
			<button :disabled="!value" class="tabar flex-column-align" @click="change(3)">
				<img v-if="activeShowImg == 3" :src="'./static/images/Lovecar/off-right@2x.png'" />
				<img v-else :src="'./static/images/Lovecar/off-right2@2x.png'" />
				<span :class="activeShowImg==3?'active':'actives'">外循环</span>
			</button>
			<!--底部导航End-->
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
				<div class="pin-code flex-center">
					<div  v-if="$store.state.softkeyboard" id="pinCon" @click="onTypewriting">
						<input class="pin-input" maxlength="6" type="text" v-model="pinNumber" readonly/>
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
		</div>
		<!--自定义软键盘End-->

	</div>
</template>

<script>
import { Createarc } from "../../../static/js/drawarc.js";
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
export default {
  name: "airconditionControl",
  data() {
    return {
      time: "", //定时器命名
      //移动端键盘值
      ownKeyBoard: {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
      },
      //开关switch按钮激活变量
      value: false,
      //压缩机switch按钮激活变量
      compressor: false,
      //图片激活变量
      activeShowImg: 0,
      //温度调节最大值
      max: 15,
      //温度调节最小值
      min: 0,
      //温度展示值,通过空调默认点控制
      temperNum: [
        17,
        18,
        19,
        20,
        21,
        22,
        23,
        24,
        25,
        26,
        27,
        28,
        29,
        30,
        31,
        32
      ],
      //风量展示
      windNum: [1, 2, 3, 4, 5, 6, 7],
      winMin: 0,
      //风量控制变量
      winIndex: 0,
      //pin码弹出框控制变量
      popupVisible: false,
      //pin码值
      pinNumber: "",
      //自定义软键盘状态 0 消失 2 键盘开启
      showTyper: 0,
      //软键盘内容12位随机数组
      keyNums: [],
      //曲线状态
      curveState: false,
      //空调默认点
      airSpace: 0,
      //空调图旋转状态
      rotateState: false,
      nums: 2,
      loop: 0, //传给后台循环的index
      compressors: 0, //传给后台的控制压缩机数值
      operationIds: ""
    };
  },
  methods: {
    //空调控制开关方法
    turn() {
      if (this.activeShowImg) {
        this.value = true;
      } else {
        this.value = false;
      }
      this.value ? (this.nums = 2) : (this.nums = 1);
      this.popupVisible = !this.popupVisible;
    },
    //压缩机控制开关
    turnCompressor() {
      if (this.activeShowImg) {
        this.compressor = this.compressor;
      } else {
        this.compressor = false;
      }
      // console.log(this.compressor)
      this.compressor ? (this.compressors = 2) : (this.compressors = 1);
      this.httpair();
    },
    //激活底部图标方法
    change(val) {
      if (val == 1) {
        this.loop = 0;
      }
      if (val == 2) {
        this.loop = 1;
      }
      if (val == 3) {
        this.loop = 2;
      }
      this.activeShowImg
        ? (this.activeShowImg = val)
        : (this.activeShowImg = 0);
      this.httpair();
    },
    //路由跳转的时候清除轮询loading
    goback() {
      this.$router.go(-1);
      this.$store.dispatch("LOADINGFLAG", false);
    },
    //温度增加
    add() {
      if (this.activeShowImg && this.airSpace < this.max) {
        this.airSpace++;
        //计数器控制曲线
        new Createarc({
          el: "rightColorful", //canvas id
          vuethis: this, //使用位置的this指向
          num: "airSpace", //data数值
          type: "right", //圆弧方向  left right
          tempdel: 16, //总差值
          ratio: 0.4, //宽度比例
          iscontrol: true, //控制是否能滑动，可以滑动
          color: {
            start: "#e22e10", //圆弧下边颜色
            center: "#f39310", //圆弧中间颜色
            end: "#04e8db", //圆弧上边颜色
            num: 3
          }
        });
      } else if (this.airSpace >= this.max) {
        this.airSpace = this.max;
        return;
      }
      this.httpair();
    },
    //温度减少
    reduce() {
      if (this.activeShowImg && this.airSpace > this.min) {
        this.airSpace--;
        //计数器控制曲线
        new Createarc({
          el: "rightColorful", //canvas id
          vuethis: this, //使用位置的this指向
          num: "airSpace", //data数值
          type: "right", //圆弧方向  left right
          tempdel: 16, //总差值
          ratio: 0.4, //宽度比例
          iscontrol: true, //控制是否能滑动，可以滑动
          color: {
            start: "#e22e10", //圆弧下边颜色
            center: "#f39310", //圆弧中间颜色
            end: "#04e8db", //圆弧上边颜色
            num: 3
          }
        });
      } else if (this.airSpace <= this.min) {
        this.airSpace = this.min;
        return;
      }
      this.httpair();
    },
    //风量增加
    windAdd() {
      if (this.activeShowImg) {
        if (this.winIndex >= this.windNum.length - 1) {
          this.winIndex = this.windNum.length - 1;
        } else {
          this.winIndex++;
        }
      } else {
        return;
      }
      this.httpair();
    },
    //风量减少
    windReduce() {
      if (this.activeShowImg) {
        if (this.winIndex <= this.winMin) {
          this.winIndex = this.winMin;
        } else {
          this.winIndex--;
        }
      } else {
        return;
      }
      this.Air = this.$refs.Air.value;
      this.httpair();
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
        //判断位数，还未超出6位则可继续输入
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
    //产生曲线
    produCurve() {
      //温度激活弧线
      new Createarc({
        el: "rightColorful", //canvas id
        vuethis: this, //使用位置的this指向
        num: "airSpace", //data数值
        type: "right", //圆弧方向  left right
        tempdel: 16, //总差值
        ratio: 0.4, //宽度比例
        iscontrol: true, //控制是否能滑动，可以滑动
        color: {
          start: "#e22e10", //圆弧下边颜色
          center: "#f39310",
          end: "#04e8db", //圆弧上边颜色
          num: 3
        }
      });
      //温度未激活弧线
      new Createarc({
        el: "rightGray", //canvas id
        vuethis: this, //使用位置的this指向
        num: "airSpace", //data数值
        type: "right", //圆弧方向  left right
        tempdel: 16, //总差值
        ratio: 0.4, //宽度比例
        iscontrol: false, //控制是否能滑动，禁止滑动
        color: {
          start: "#EEEEEE", //圆弧下边颜色
          center: "#EEEEEE",
          end: "#EEEEEE", //圆弧上边颜色
          num: 3
        }
      });
    },
    //用户停止滑动触发移动端事件,发送后端请求
    end() {
      //				var start = $('#rightColorful').on('touchstart)
      this.httpair();
      console.log(this.temperNum[this.airSpace]);
    },
    //激活空调图,进行旋转
    refreshPmData() {
      this.rotateState = true;
      setTimeout(() => {
        this.rotateState = false;
      }, 1000);
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
                this.$store.dispatch("LOADINGFLAG", false);
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
                            this.$store.dispatch("LOADINGFLAG", false);
                          }
                        } else if (res.data.status == "SUCCEED") {
                          flag = false;
                          Toast({
                            message: "下达指令成功",
                            position: "middle",
                            duration: 2000
                          });
                          clearInterval(this.time);
                          this.$store.dispatch("LOADINGFLAG", false);
                        } else if (res.data.status == "FAILED") {
                          flag = false;
                          Toast({
                            message: "指令下发成功，处理失败！",
                            position: "middle",
                            duration: 2000
                          });
                          clearInterval(this.time);
                          this.$store.dispatch("LOADINGFLAG", false);
                        }
                      } else {
                        Toast({
                          message: "指令下发失败！",
                          position: "middle",
                          duration: 2000
                        });
                        flag = false;
                        clearInterval(this.time);
                        this.$store.dispatch("LOADINGFLAG", false);
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              flag = false;
              Toast({
                message: "下达指令成功",
                position: "middle",
                duration: 2000
              });
              this.$store.dispatch("LOADINGFLAG", false);
            } else if (res.data.status == "FAILED") {
              Toast({
                message: "指令下发成功，处理失败！",
                position: "middle",
                duration: 2000
              });
              this.$store.dispatch("LOADINGFLAG", false);
            }
          } else {
            Toast({
              message: "指令下发失败！",
              position: "middle",
              duration: 2000
            });
            flag = false;
            clearInterval(this.time);
            this.$store.dispatch("LOADINGFLAG", false);
          }
        });
    },
    //每次改变请求的方法
    httpair() {
      var param = {
        vin: this.$store.state.vins,
        operationType: "AIRCONDITIONER",
        operation: this.nums, //操作项
        extParams: {
          airQuantity: this.windNum[this.winIndex],
          loop: this.loop,
          temperature: this.temperNum[this.airSpace],
          airType: 0,
          ac: this.compressors
        }
      };
      // console.log(this.compressors);
      this.$http
        .post(Lovecar.Control, param, this.$store.state.tsppin)
        .then(res => {
          if (res.data.returnSuccess) {
            this.getAsyReturn(res.data.operationId);
          } else {
            if (res.data.returnErrCode == 400) {
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
        })
        .catch(err => {
          Toast({
            message: "系统异常",
            position: "middle",
            duration: 2000
          });
        });
    }
  },
  mounted() {
    clearInterval(this.time);
    this.produCurve();
    this.inputs();
    //调取车况
    // this.$http
    //   .post(
    //     Lovecar.Carquery,
    //     { vins: [this.$store.state.vins] },
    //     this.$store.state.tsppin
    //   )
    //   .then(res => {
    //     if (res.data.returnSuccess) {
    //       // this.getAsyReturn(res.data.operationId);
    //     } else {
    //       Toast({
    //         message: res.data.returnErrMsg,
    //         position: "middle",
    //         duration: 2000
    //       });
    //     }
    //   })
    //   .catch(err => {
    //     Toast({
    //       message: "系统异常",
    //       position: "middle",
    //       duration: 2000
    //     });
    //   });
  },
  beforeRouteLeave(to, from, next) {
    clearInterval(this.time);
    next();
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
  watch: {
    pinNumber(newVal, oldVal) {
      if (this.pinNumber.length == 6) {
        var PIN = this.pinNumber;
        this.$http
          .post(
            Lovecar.Checkphonepin,
            {
              pin: PIN
            },
            this.$store.state.tsppin
          )
          .then(res => {
            res.data.returnSuccess ? (this.num = 1) : (this.num = 2);
            if (res.data.returnSuccess) {
              this.value = !this.value;
              this.httpair();
              //pin码正确激活弧线
              this.curveState = !this.curveState;
              //pin码正确激活空调图
              (this.activeShowImg = !this.activeShowImg),
                this.refreshPmData(),
                //消失遮罩
                (this.popupVisible = !this.popupVisible);
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.pinNumber = "");
              /*console.log(this.Compressors);
              console.log(this.temperNum[this.airSpace]);*/
            } else {
              //消失遮罩
              this.popupVisible = !this.popupVisible;
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.pinNumber = "");
              Toast({
                message: data.returnErrMsg,
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(err => {
            Toast({
              message: "系统异常",
              position: "middle",
              duration: 1000
            });
          });
      }
    },
    fullValue(newVal, oldVal) {
      if (this.fullValue.length == 6) {
        var PIN = this.fullValue;
        this.$http
          .post(
            Lovecar.Checkphonepin,
            {
              pin: PIN
            },
            this.$store.state.tsppin
          )
          .then(res => {
            console.log(res.data.returnSuccess);
            res.data.returnSuccess ? (this.num = 1) : (this.num = 2);
            if (res.data.returnSuccess) {
              this.value = !this.value;
              this.httpair();
              //pin码正确激活弧线
              this.curveState = !this.curveState;
              //pin码正确激活空调图
              (this.activeShowImg = !this.activeShowImg),
                this.refreshPmData(),
                //消失遮罩
                (this.popupVisible = !this.popupVisible);
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.fullValue = "");
              console.log(this.Compressors);
              console.log(this.temperNum[this.airSpace]);
            } else {
              //消失遮罩
              this.popupVisible = !this.popupVisible;
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.fullValue = "");
              Toast({
                message: data.returnErrMsg,
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(err => {
            Toast({
              message: "系统异常",
              position: "middle",
              duration: 1000
            });
          });
      }
    },
    updated() {}
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
	border: none;
	outline: none;
	appearance: none;
	-webkit-appearance: none;
	background: none;
}
/*空调头部*/

.air-header {
  padding: 0.4rem 0.64rem 0 0.68rem;
}
/*空调开关按钮*/

.air-btn {
  position: relative;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.47rem;
}
.air-btn > div {
  display: flex;
  align-items: center;
}
.air-btn>.switch-mask {
    position: absolute;
    left: 54%;
    width: 38%;
    height: 100%;
    background-color:transparent ;
}
/*空调标志*/

.air-ch {
  height: 0.31rem;
  margin-bottom: 0.17rem;
  line-height: 0.31rem;
  color: rgb(34, 34, 34);
  font-size: 0.32rem;
}

.air-en {
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
  top: 0.9rem;
  margin-left: -7%;
}
/*空调主体*/

.air-wrap {
  height: 6.3rem;
  padding: 0 0.68rem;
}

.air-content {
  width: 100%;
}

.temperature {
}

.temper-inputcoun {
  height: 3.4rem;
  background: url("../../../static/images/Lovecar/line5@2x_21.png") no-repeat
    center;
  background-size: contain;
}
/*温度计数器*/

.counter {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  width: 0.6rem;
  height: 1.8rem;
  border: 1px solid #999999;
  border-radius: 0.3rem;
  background: #fff;
}
.count>button {
	border: none
}
/*风扇部分*/

.wind-blows {
  margin-left: 0.5rem;
  align-self: flex-end;
}
.wind-blows > div {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}
.wind-blows > div > .color-fan {
  width: 1.8rem;
  height: 1.89rem;
}
.wind-blows > div > .gray-fan {
  width: 2.35rem;
  height: 1.89rem;
}
.wind-blows > div > .small-fan {
  position: absolute;
  top: 0.7rem;
  left: 1.6rem;
  width: 1.1rem;
  height: 1.1rem;
  z-index: -1;
}
/*温度部分*/

.num {
  align-self: flex-start;
}
/*温度激活字体*/

.fontActive {
  font-size: 0.68rem;
  color: #222222;
}
/*温度未激活字体*/

.loseActives {
  font-size: 0.68rem;
  color: #999999;
}
/*风量计数器*/

.air-change {
  width: 3.7rem;
  /*background: url('../../../static/images/Lovecar/line4@2x.png') no-repeat center;*/
  background-size: contain;
}

.air-change > img {
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

.air-change .wind-input {
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
/*分割线*/

.sing-line {
  width: 6.18rem;
  height: 1px;
  margin: 1rem auto 0.4rem auto;
  background: rgba(153, 153, 153, 0.3);
}
/*空调底部*/

.air-footer {
  width: 71%;
  margin: 0.36rem auto 0 auto;
}
.tabar {
  height: 1.24rem;
  background: none;
  appearance: none;
  border: none;
  -webkit-appearance: none;
  outline: none;
}
.tabar > img {
  width: 0.88rem;
  height: 0.88rem;
  margin-bottom: 0.13rem;
}

.tabar > span {
  font-size: 0.22rem;
}
/*底部激活字体*/

.active {
  display: block;
  color: #49bbff;
}
/*底部未激活字体*/

.actives {
  display: none;
  color: #999999;
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
.rotateActive {
  transform-origin: (center, center);
  animation: rotate 1s ease-in-out infinite;
}
@-webkit-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-moz-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-ms-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@-o-keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
