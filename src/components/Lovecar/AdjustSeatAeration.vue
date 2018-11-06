<template>
	<div class="adjust-seat-temper">
		<header class="header MobileHeight">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="goback">
			<router-link tag='span' class="seatAeration active" to="/lovecar/adjustSeatAeration">座椅通风<span></span></router-link>
			<router-link tag='span' class="seatHeating" style="margin-right: 1.3rem;" to="/lovecar/adjustSeatTemper">座椅加热<span></span></router-link>
		</header>
		<div style="height:0.88rem" class="MobileHeight"></div>
		<div class="seat-header">
			<div class="seat-btn">
				<div class="seat-warm flex-center-between" style="width: 2.2rem;">
					<span>主驾</span>
					<mt-switch id="mainDri" @click.native="changeState('主驾')" v-model="value" @change="turn"><span></span></mt-switch>
				</div>
				<div class="car-aeration flex-center-between" style="width: 2.2rem;">
					<span>副驾</span>
					<mt-switch id="viceDri" @click.native="changeState('副驾')" data-index="2" v-model="aeraValue" @change="ventilatingSwitch"><span></span></mt-switch>
				</div>

			</div>
			<div class="seat-sign flex-column">
				<span class="seat-ch">座椅通风</span>
				<span class="seat-en">CHAIRAERATION</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>
		<!--主副驾驶位温度展示Start-->
		<div class="seat-remind">
			<span :class="activeShowImgLeft?'fontActive':'loseActives'">{{windNum[seatTemperSpace]}}</span>
			<span :class="activeShowImgRight?'fontActive':'loseActives'">{{fuWindNum[fuSeatTemperSpace]}}</span>
		</div>
		<!--主副驾驶位温度展示End-->

		<!--曲线Start-->
		<div class="curve">
			<div class="cureve-text">
				<span style="left: 1.8rem;top: -0.3rem;">高</span>
				<span style="left: 2.5rem;top: -0.3rem;">高</span>
				<span style="left: 0.2rem;top: 0.4rem;">中</span>
				<span style="left: 4.1rem;top: 0.4rem;">中</span>
				<span style="left: -0.3rem;top: 1.7rem;">低</span>
				<span style="left: 4.6rem;top: 1.7rem;">低</span>
			</div>
			<div class="curveActive" style="z-index: 100;">
				<canvas :style="{visibility:value?'visible':'hidden'}" id="leftColorful" @touchend='endleft'></canvas>
				<canvas :style="{visibility:aeraValue?'visible':'hidden'}"  id="rightColorful" @touchend='endright'></canvas>
			</div>
			<div class="curveLoseActive" style="z-index: 50;">
				<canvas :style="{visibility:value?'hidden':'visible'}" id="leftGray"></canvas>
				<canvas :style="{visibility:aeraValue?'hidden':'visible'}" id="rightGray"></canvas>
			</div>
		</div>

		<!--曲线End-->

		<!--座椅主体Start-->
		<div class="seat-wrap flex-column-align">
			<div class="wind-blows">
				<div class="seat-text">
					<div style="display: flex;justify-content: space-around;">
						<span  style="color: #666666;font-size:0.26rem;left: 0.3rem;">主驾驶</span>
						<span  style="color: #666666;font-size:0.26rem;left: 1.6rem;">副驾驶</span>
					</div>
				</div>
				<div class="seat-active" >
					<div style="display: flex;margin-bottom: 0.23rem;justify-content: space-around;">
						<img :style="{visibility:value?'visible':'hidden'}" :src="'./static/images/Lovecar/Chair2@2x.png'" alt="" />
						<img :style="{visibility:aeraValue?'visible':'hidden'}" :src="'./static/images/Lovecar/Chair2@2x.png'" alt="" />					
					</div>
				</div>
				<div class="seat-loseactive">
					<div style="display: flex;margin-bottom: 0.23rem;justify-content: space-around;">
						<img :style="{visibility:value?'hidden':'visible'}" style="width: 1.34rem;" :src="'./static/images/Lovecar/Chair3@2x.png'" alt="" />
						<img :style="{visibility:aeraValue?'hidden':'visible'}" style="width: 1.34rem;" :src="'./static/images/Lovecar/Chair3@2x.png'" alt="" />
					</div>
				</div>
			</div>
		</div>
		<!--座椅主体End-->
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
					<div v-if="$store.state.softkeyboard" id="pinCon" @click="onTypewriting">
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
		<!--pin码弹出框End-->
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
import { Createarc } from "../../../static/js/drawarc.js";
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
export default {
  name: "adjustSeatAeration",
  data() {
    return {
      //移动端键盘值
      ownKeyBoard: {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
      },
      //主驾通风开关
      value: false,
      //副驾通风开关
      aeraValue: false,
      //图片激活变量左
      activeShowImgLeft: 0,
      //图片激活变量右
      activeShowImgRight: 0,
      //主驾展示
      windNum: ["低", "中", "高"],
      //副驾展示
      fuWindNum: ["低", "中", "高"],
      //pin码弹出框控制变量
      popupVisible: false,
      time: "", //定时器命名
      //pin码值
      pinNumber: "",
      //自定义软键盘状态 0 消失 2 键盘开启
      showTyper: 0,
      //软键盘内容-12位随机数组
      keyNums: [],
      //主驾座椅弧线温度默认点
      seatTemperSpace: 0,
      //副驾座椅弧线温度默认点
      fuSeatTemperSpace: 0,
      //左右按钮
      btnContent: "",
      maincool: 0,
      operationIds: "",
      nextcool: 0,
      operationIdss: ""
    };
  },
  methods: {
    //主驾座椅通风开关方法
    turn() {
      if (this.activeShowImgLeft) {
        this.value = true;
      } else {
        this.value = false;
      }
      this.popupVisible = !this.popupVisible;
    },
    //副驾座椅通风开关方法
    ventilatingSwitch() {
      if (this.activeShowImgRight) {
        this.aeraValue = true;
      } else {
        this.aeraValue = false;
      }
      this.popupVisible = !this.popupVisible;
    },
    //路由跳转的时候清除轮询loading
    goback () {
    	this.$router.push('/lovecar');
    	this.$store.dispatch('LOADINGFLAG', false)
    },
    //判断点击是左边还是右边
    changeState(val) {
      this.btnContent = val;
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
      //主驾激活弧线
      new Createarc({
        el: "leftColorful", //canvas id
        vuethis: this, //使用位置的this指向
        num: "seatTemperSpace", //data数值
        type: "left", //圆弧方向  left right
        tempdel: 3, //总差值
        ratio: 0.3, //宽度比例
        iscontrol: true, //控制是否能滑动，可以滑动
        color: {
          start: "#e22e10", //圆弧下边颜色
          center: "#f39310",
          end: "#04e8db", //圆弧上边颜色
          num: 3
        }
      });
      //副驾激活弧线
      new Createarc({
        el: "rightColorful", //canvas id
        vuethis: this, //使用位置的this指向
        num: "fuSeatTemperSpace", //data数值
        type: "right", //圆弧方向  left right
        tempdel: 3, //总差值
        ratio: 0.3, //宽度比例
        iscontrol: true, //控制是否能滑动，可以滑动
        color: {
          start: "#e22e10", //圆弧下边颜色
          center: "#f39310",
          end: "#04e8db", //圆弧上边颜色
          num: 3
        }
      });
      //主驾未激活弧线
      new Createarc({
        el: "leftGray", //canvas id
        vuethis: this, //使用位置的this指向
        num: "seatTemperSpace", //data数值
        type: "left", //圆弧方向  left right
        tempdel: 3, //总差值
        ratio: 0.3, //宽度比例
        iscontrol: false, //控制是否能滑动，禁止滑动
        color: {
          start: "#EEEEEE", //圆弧下边颜色
          end: "#EEEEEE" //圆弧上边颜色
        }
      });
      //副驾未激活弧线
      new Createarc({
        el: "rightGray", //canvas id
        vuethis: this, //使用位置的this指向
        num: "fuSeatTemperSpace", //data数值
        type: "right", //圆弧方向  left right
        tempdel: 3, //总差值
        ratio: 0.3, //宽度比例
        iscontrol: false, //控制是否能滑动，禁止滑动
        color: {
          start: "#EEEEEE", //圆弧下边颜色
          end: "#EEEEEE" //圆弧上边颜色
        }
      });
    },
    //执行判定
    inputs() {
      console.log(111);
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
                          // Toast({
                          //   message: "下达指令成功",
                          //   position: "middle",
                          //   duration: 2000
                          // });
                          if(this.btnContent == "主驾"){
                              this.value = !this.value;
                          }else{
                              this.aeraValue = !this.aeraValue;
                          }
                          clearInterval(this.time);
                          this.$store.dispatch("LOADINGFLAG", false);
                        } else if (res.data.status == "FAILED") {
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
              // Toast({
              //   message: "下达指令成功",
              //   position: "middle",
              //   duration: 2000
              // });
               if(this.btnContent == "主驾"){
                              this.value = !this.value;
                          }else{
                              this.aeraValue = !this.aeraValue;
                          }
               clearInterval(this.time);
              this.$store.dispatch("LOADINGFLAG", false);
            } else if (res.data.status == "FAILED") {
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
    },
    endleft() {
      this.httpcoolmain();
    },
    endright() {
      this.httpcoolnext();
    },
    //主驾通风接口
    httpcoolmain() {
      if (this.value) {
        if (this.windNum[this.seatTemperSpace] == "低") {
          this.maincool = 1;
        }
        if (this.windNum[this.seatTemperSpace] == "中") {
          this.maincool = 2;
        }
        if (this.windNum[this.seatTemperSpace] == "高") {
          this.maincool = 3;
        }
      }else{
        this.maincool=0;
      }
      var param = {
        vin: this.$store.state.vins,
        operationType: "HOSTSEAT_HEAT",
        operation: 1, //操作项
        extParams: {
          windOper: this.maincool
        }
      };
      this.$http
        .post(Lovecar.Control, param, this.$store.state.tsppin)
        .then(res => {
          this.operationIds = res.data.operationId;
          console.log(this.operationIds);
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
              message: '系统异常',
              position: "middle",
              duration: 2000
            });
        });
    },
    //副驾通风接口
    httpcoolnext() {
      if (this.aeraValue) {
        if (this.fuWindNum[this.fuSeatTemperSpace] == "低") {
          this.nextcool = 1;
        }
        if (this.fuWindNum[this.fuSeatTemperSpace] == "中") {
          this.nextcool = 2;
        }
        if (this.fuWindNum[this.fuSeatTemperSpace] == "高") {
          this.nextcool = 3;
        }
      }else{
        this.nextcool=0;
      }
      var param = {
        vin: this.$store.state.vins,
        operationType: "VICESEAT_HEAT",
        operation: 1, //操作项
        extParams: {
          windOper: this.nextcool
        }
      };
      this.$http
        .post(Lovecar.Control, param, this.$store.state.tsppin)
        .then(res => {
          this.operationIdss = res.data.operationId;
          console.log(this.operationIdss);
          if (res.data.returnSuccess) {
            this.getAsyReturn(res.data.operationId);
          } else {
            Toast({
              message: "token验证失败",
              position: "middle",
              duration: 2000
            });
          }
          //   setTimeout(() => {
          //     this.$http
          //       .post(
          //         Lovecar.OperationId,
          //         { operationId: this.operationIdss },
          //         this.$store.state.tsppin
          //       )
          //       .then(res => {
          //         console.log(res);
          //       }, 1000);
          //   });
        });
    }
  },
  mounted() {
  	$(".MobileHeight").css({"marginTop": this.$store.state.mobileStatusBar}) //头部挤出一定高度,配合原生做沉浸式开发
  	clearInterval(this.time)
    this.produCurve();
    this.inputs();
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
      .catch( err => {
      	Toast({
            message: '系统异常',
            position: "middle",
            duration: 2000
          });
      })
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
      //监听一个input输入值(与自定义软键盘配合)，激活对应状态
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
            const data = res.data;
            if (data.returnSuccess == true) {
              if (this.btnContent == "主驾") {
                //主驾通风激活
                // this.value = !this.value;
                this.httpcoolmain();
                //pin码正确激活主驾座椅图
                (this.activeShowImgLeft = !this.activeShowImgLeft),
                  //消失遮罩
                  (this.popupVisible = !this.popupVisible);
                //消失软键盘
                (this.showTyper = 0),
                  //清空pin码
                  (this.pinNumber = "");
              } else {
                //副驾通风激活
                // this.aeraValue = !this.aeraValue;
                this.httpcoolnext();
                //pin码正确激活座椅图
                (this.activeShowImgRight = !this.activeShowImgRight),
                  //消失遮罩
                  (this.popupVisible = !this.popupVisible);
                //消失软键盘
                (this.showTyper = 0),
                  //清空pin码
                  (this.pinNumber = "");
              }
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
            let instance = Toast({
              message: "系统异常",
              position: "middle",
              duration: 1000
            });
          });
      }
    },
    fullValue(newVal, oldVal) {
      //监听拼接后的input输入框值(与手机自带键盘配合)，激活对应的状态
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
            const data = res.data;
            if (data.returnSuccess == true) {
              if (this.btnContent == "主驾") {
                // this.value = !this.value;
                //pin码正确激活主驾座椅图
                (this.activeShowImgLeft = !this.activeShowImgLeft),
                  //消失遮罩
                  (this.popupVisible = !this.popupVisible);
                //消失软键盘
                (this.showTyper = 0),
                  //清空pin码
                  (this.fullValue = "");
              } else {
                // this.aeraValue = !this.aeraValue;
                //pin码正确激活座椅图
                (this.activeShowImgRight = !this.activeShowImgRight),
                  //消失遮罩
                  (this.popupVisible = !this.popupVisible);
                //消失软键盘
                (this.showTyper = 0),
                  //清空pin码
                  (this.fullValue = "");
              }
            } else {
              //消失遮罩
              this.popupVisible = !this.popupVisible;
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
                (this.fullValue = "");
              let instance = Toast({
                message: data.returnErrMsg,
                position: "middle",
                duration: 1000
              });
            }
          })
          .catch(err => {
            let instance = Toast({
              message: "系统异常",
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

.flex-center-around {
  /*水平垂直居中-平均对齐*/
  display: flex;
  justify-content: space-around;
  align-items: center;
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

.flex-column {
  /*竖直方向*/
  display: flex;
  flex-direction: column;
}

.mint-popup {
  border-radius: 0.1rem;
}
/*座椅头部*/
.header {
  line-height: 0.78rem;
}
.header > span {
  position: relative;
  font-size: 0.34rem;
}
.header > span.active {
  color: #49bbff;
}
.header > span.active > span {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 0.46rem;
  height: 0.88rem;
  border-bottom: 0.06rem solid #49bbff;
}
.seat-header {
  padding: 0.4rem 0.64rem 0 0.68rem;
}
/*座椅开关按钮*/

.seat-btn {
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-bottom: 0.47rem;
}
/*座椅标志*/

.seat-ch {
  height: 0.31rem;
  margin-bottom: 0.17rem;
  line-height: 0.31rem;
  color: rgb(34, 34, 34);
  font-size: 0.32rem;
}

.seat-en {
  height: 0.18rem;
  margin-bottom: 0.36rem;
  line-height: 0.18rem;
  font-size: 0.22rem;
  font-family: PingFang-SC-Regular;
  color: rgba(34, 34, 34, 1);
}
/*主副驾温度*/

.seat-remind {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 0.5rem;
}

.seat-remind > span {
  color: #222222;
  font-size: 0.68rem;
}
/*曲线*/

.curve {
  position: relative;
  height: 2.1rem;
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
  margin-left: -31%;
}
/*座椅主体*/

.seat-wrap {
  height: 4.8rem;
}
.wind-blows {
  position: relative;
  height: 1.6rem;
  width: 3.35rem;
}
.wind-blows > div {
  position: absolute;
  top: 0.2rem;
  left: 0.3rem;
}
.wind-blows > .seat-text > div > span {
  position: absolute;
  top: 1.5rem;
  width: 0.8rem;
}
.wind-blows img {
  width: 1.34rem;
  height: 1.57rem;
}
/*计数器*/

.seat-change {
  width: 3.7rem;
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

.seat-change .wind-input {
  width: 0.9rem;
  height: 0.6rem;
  outline: none;
  border: none;
  text-align: center;
}

.input-count {
  width: 90%;
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

.fontActive {
  color: #222222;
  font-size: 0.68rem;
}
/*座椅温度展示未激活字体*/

.loseActives {
  color: #666666;
  font-size: 0.68rem;
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
  z-index: 1000;
}
</style>