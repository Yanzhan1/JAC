<template>
	<div class="flow-query">
		<div class="bgMask" v-if="popupVisible" ></div>
		<!--<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.push('/lovecar')">
			<span class="header-title">流量查询</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>-->
		<mhead currentTitle="流量查询"></mhead>
		<!-- <div class="flow-title">
			<span>截止日期</span>
			<span>{{this.Closingdate}}</span>
		</div> -->
		<!-- <div class="line"></div>
		<div class="flow-title">
			<span>流量包名称</span>
			<span>{{this.Flowpacket}}</span>
		</div> -->
		<div class="line"></div>
		<div class="flow-wrap">

			<div v-for="(item,index) in 1" class="flow-apnone">
				<!-- <div class="apn-title">
					<span>APN1</span>
				</div> -->
				<div class="origin-pin">
					<div class="flex-align-center revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
					本月总流量:
				</span>
						<input :disabled="disabled" type="text" v-model="num" />
					</div>
				</div>
				<div class="origin-pin">
					<div class="flex-align-center revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
					已使用流量:
				</span>
						<input :disabled="disabled" type="text" v-model="num" />
					</div>
				</div>
				<div class="origin-pin">
					<div class="flex-align-center revisePinCommon">
						<span style="font-size: 0.26rem;color: #444444;">
					剩余流量:
				</span>
						<input :disabled="disabled" type="text" v-model="num" />
					</div>
				</div>
			</div>
		</div>
		<!--pin码弹出框Start-->
		<mt-popup v-model="popupVisible" :modal="false">
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
		<div class="typer" v-show="showTyper!=0">
			<ul v-show="showTyper==2">
				<li class="typer-num" v-for="item in keyNums" :class="{'is-A': item=='A','is-OK':item=='OK','is-Del':item=='Del'}" @click="input(item)">{{item}}</li>
			</ul>
		</div>
		<button class="bottom-btn">流量购买</button>
	</div>
</template>

<script>
import {Toast} from 'mint-ui'
import PublicHead from '../publicmodel/PublicHead';
export default {
  name: "flowQuery",
  components: {
  	mhead:PublicHead
  },
  data() {
    return {
      time: "", //定时器命名
      //流量
      num: "100G",
      IsShow: false, //控制自定义键盘显示
      popupVisible: true, //控制pin码框显示
      pinNumber: "", //输入的pin码值
      showTyper: 0, //自定义软键盘状态 0 消失 2 键盘开启
      keyNums: [], //软键盘内容12位随机数组
      disabled: true, //展示作用，不能输入
      Closingdate: "2020-07-12", //截止日期
      Flowpacket: "至尊黄金套餐", //流量包名称
      //移动端键盘值
      ownKeyBoard: {
        first: "",
        second: "",
        third: "",
        fourth: "",
        fifth: "",
        sixth: ""
      }
    };
  },
  methods: {
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
    removeMask() {
      this.popupVisible = !this.popupVisible;
      this.showTyper = 0;
    }
  },
  mounted() {},
  watch: {
    pinNumber(newVal, oldVal) {
      //				console.log(this.pinNumber.length)
      if (this.pinNumber.length == 6) {
		let nums = this.pinNumber;
		console.log(Lovecar.Checkphonepin,nums,this.$store.state.tsppin)
        this.$http
          .post(Lovecar.Checkphonepin, { pin: nums }, this.$store.state.tsppin)
          .then(res => {
            if (res.data.returnSuccess == true) {
              let oDate=new Date()
              let year=oDate.getFullYear()
              let month=oDate.getMonth()+1
              month=month<10?'0'+month:month;
              let totime=year+month
              this.$http
                .post(
                  Lovecar.Flow,
                  {
                    vin: this.$store.state.vins, //车辆vin码
                    queryDate:totime//传给后台的查询时间
                    // simNum: "12", //Tbox中的sim卡号
                    // imei: "1", //sim卡中的imei卡号
                    // iccid: "12" //sim卡中的iccid卡号
                  },
                  this.$store.state.tsppin
                )
                .then(res => {
                  console.log(res)
				});
                            this.value = !this.value;
              //消失遮罩
              this.popupVisible = !this.popupVisible;
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
		        (this.pinNumber = "");
            } else {
				Toast({
					message: res.data.returnErrMsg,
					position: "middle",
					duration: 1000
				});
				this.value = !this.value;
              //消失遮罩
              this.popupVisible = !this.popupVisible;
              //消失软键盘
              (this.showTyper = 0),
                //清空pin码
				(this.fullValue = "");
				this.$router.go(-1)
            
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
.mint-popup {
  border-radius: 0.1rem;
}
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
  margin-left: 0.46rem;
}
/*头部*/

.flow-title {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  height: 1.5rem;
  padding: 0 0.3rem;
  font-family: PingFang-SC-Medium;
  font-weight: Medium;
  color: #222;
  font-size: 0.26rem;
  line-height: 0.28rem;
}

.flow-title > span:nth-of-type(1) {
  color: #49bbff;
  font-size: 0.32rem;
}

.flow-title > span:nth-of-type(2) {
  color: #222222;
}
/*灰色间隔*/

.line {
  height: 0.1rem;
  background: #f1f1f1;
}
/*apn*/

.flow-wrap {
  padding: 0 0.3rem;
}

.apn-title {
  height: 0.86rem;
  line-height: 1.16rem;
  font-size: 0.32rem;
  color: #3a5cff;
}

.origin-pin > div {
  margin: 0 auto;
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
  z-index: 3000;
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
  margin: 0;
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