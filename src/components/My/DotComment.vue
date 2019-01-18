<template>
	<div class="dot-comment">
		<mhead currentTitle="网点评分"></mhead>
		<p style="height: 1px;width: 100%;margin: 0 auto;background: #F1F1F1;"></p>
		<!--评价主体Start-->
		<div class="score-wrap">
			<div class="score-content">
				<div class="score-title">
					<img src="../../../static/images/my/pingfen.png" />
					<h3 style="padding-left: .14rem;font-size: .34rem;color: #222222;">网点服务评价</h3>
				</div>

				<div class="score-body">
					<div class="score">
						<p>总体评价</p>
						<my-start @numChange="evaluate"></my-start>
					</div>
					<div>
						<p>服务态度</p>
						<my-start @numChange="service"></my-start>
					</div>
					<div>
						<p>维修质量</p>
						<my-start @numChange="repair"></my-start>
					</div>
				</div>

			</div>
		</div>
		<!--评价主体End-->

		<!--页面尾部Start-->
		<div class="score-textarea">
			<div class="greater">
				<transition-group tag="div" class="greater-wrap" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
					<button v-for="(item, index) in questionList" v-show="evaluatePoint <= 2" @click="toggleClass(item)" :class="{active: checkIndex(item)}" :key="index" :data-index="index">{{item}}</button>
				</transition-group>

			</div>
			<div>
				<mt-field @focus.native.capture="changeFocus" placeholder="亲，对本次服务还满意吗?" type="textarea" rows="5" v-model="introduction" :attr="{ maxlength: 200 }"></mt-field>
				<span class="score-time">{{introduction.length}}/200</span>
			</div>
		</div>
		<!--页面尾部End-->
		<button class="btn" @click="submitScore">提交评分</button>
		<mt-popup v-model="popupVisible" popup-transition="popup-fade">
			<div class="information-box">
				<div class="info-up">
					<h3 style="font-size: .34rem;color: #222222;margin-bottom: .52rem;">提示</h3>
					<p style="color: #444444;">您还未选择不满意的原因，选择 不满意标签后才可提交</p>
				</div>
				<div class="info-down" style="color: #999999;font-size: .32rem;" @click="popupVisible = false">
					好的，知道了
				</div>
			</div>
		</mt-popup>
	</div>
</template>

<script>
import PublicHead from "../publicmodel/PublicHead";
import { Toast, MessageBox } from "mint-ui";
export default {
  name: "dotComment",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      evaluatePoint: 5, //总体评价得分,默认>2不显示问题选择按钮
      servicePoin: "", //服务得分
      repairePoin: "", //维修得分
      introduction: "", //问题收集输入文本
      questionList: [], //问题列表,展示用
      nowIndex: [], //多选问题列表内容(数组形式)
      question: "", //真正传给后台的内容,要求字符串形式
      popupVisible: false, //控制提示状态变量,false消失, true显现
      screenHeight: $(window).height()
    };
  },
  methods: {
    init() {
      //获取问题列表
      var data = {
        enable: "0"
      };
      this.$http.post(My.searchReasonsForDissatisfactionList, data).then(res => {
        const data = res.data;
        if (data.code == 0) {
		  for(let val of data.data){
			  this.questionList.push(val.name)
		  }
		  console.log(this.questionList)
        } else {
          Toast({
            message: "服务器内部错误",
            position: "middle",
            duration: 2000
          });
        }
      });
    },
    evaluate(value) {
      //总体评价
      this.evaluatePoint = value;
    },
    service(value) {
      //服务分
      this.servicePoin = value;
    },
    repair(value) {
      //维修分
      this.repairePoin = value;
    },
    toggleClass(value) {
      //多选问题
      if (this.nowIndex.indexOf(value) == -1) {
        this.nowIndex.push(value);
        // this.question = this.nowIndex.join(',')
      } else {
        this.nowIndex = this.nowIndex.filter(val => {
          return val != value;
        });
      }
    },
    checkIndex(value) {
      //返回数组中有的下标
      return this.nowIndex.indexOf(value) != -1;
    },
    changeFocus() {
      //处理ios机型fixed布局失效
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //安卓
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isIOS) {
        var docheight = $(window).height() - 1; //ios使用resize监听屏幕高度与安卓不一样,把软键盘高度依然算在了屏幕内,手动减值,触发判断
        if (docheight < this.screenHeight) {
          $(".btn").css("position", "static");
          $(".score-time").css("bottom", "0.24rem"); //解决数字计数器bug
        } else {
          $(".score-time").css("bottom", "0.24rem"); //解决数字计数器bug
          $(".btn").css("position", "fixed");
        }
      } else if (IOSAndAndroid.isIOSOrAndroid() === "Android") {
        var windheight = $(window).height();
        var docheight = $(window).height();
        // console.log("Android resize后高度:" + docheight);
        if (docheight < this.screenHeight) {
          //						$('.btn').css('position', 'fixed')
          //						$(".score-time").css("bottom", "1.14rem");
        } else {
          $(".score-time").css("bottom", "0.24rem");
        }
      }
    },
    submitScore() {
      //提交评分
      var self = this;
      if (
        self.evaluatePoint == 5 ||
        self.servicePoin == "" ||
        self.repairePoin == ""
      ) {
        Toast({
          message: "网点星级评分不能为空",
          position: "middle",
          duration: 1000
        });
        return;
      } else if (self.evaluatePoint <= 2 && self.nowIndex.length == 0) {
        self.popupVisible = true;
        return;
      } else {
        var data = {
          brandNo: "VB2018071807034444249",
          evaluationOne: self.evaluatePoint,
          evluationThree: self.servicePoin,
          evluationTwo: self.repairePoin,
          notSatisfiedReason: self.nowIndex,
          recordNo: "AU182139219837218",
          userNo: "AD022018091010154751445",
          remark: self.introduction
        };
        self.$http.post(My.addBranchesEvaluation, data).then(res => {
          const data = res.data;
          if (data.code == 0) {
            this.$store.dispatch("RECORDNO", data.data.recordNo);
            Toast({
              message: "评价成功",
              position: "middle",
              duration: 2000
            });
          } else {
            Toast({
              message: data.msg,
              position: "middle",
              duration: 2000
            });
            this.chooseFlag = true;
          }
        });
      }
    },
    beforeEnter(el) {
      //动画
      el.style.opacity = 0;
      el.style.transform = "translateX(100%)";
    },
    enter(el, done) {
      var delay = el.dataset.index * 200;
      setTimeout(function() {
        Velocity(
          el,
          {
            opacity: [1, "easeInSine", 0],
            translateX: [0, "100%"]
          },
          {
            complete: done
          }
        );
      }, delay);
    },
    leave(el, done) {
      var delay = el.dataset.index * 200;
      Velocity(el, "transition.bounceUpOut", {
        //可选slideUp
        duration: 500,
        complete: done
      });
    }
  },
  mounted() {
    window.addEventListener("resize", this.changeFocus);
    this.init();
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.changeFocus);
  }
};
</script>

<style scoped>
/*评分部分*/

.score-wrap {
  padding: 0.86rem 0.3rem;
  padding-bottom: 0;
}

.score-content {
  margin-bottom: 0.6rem;
  padding-bottom: 0.86rem;
  border-bottom: 1px solid #e7e7e7;
}

.score-title {
  display: flex;
  align-items: center;
  margin-bottom: 0.82rem;
}

.score-title > img {
  width: 0.44rem;
  height: 0.44rem;
  margin-bottom: 0;
}

.score-body {
  padding: 0 0.38rem;
}

.score-body > div {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.72rem;
}

.score-body > div:last-child {
  margin-bottom: 0;
}

.score-textarea {
  position: relative;
  margin-bottom: 3.06rem;
}

.score-textarea >>> .mint-field-core {
  background: #f5f5f5;
}

.score-textarea >>> .mint-cell-wrapper {
  /*padding-left: .1rem;*/
  padding: 0 0.5rem;
  border-radius: 0.08rem;
}

.score-textarea >>> .mint-field-core {
  text-indent: 10px;
  padding: 0.1rem;
}

.score-time {
  position: absolute;
  right: 0.65rem;
  bottom: 0.24rem;
  color: #222222;
  font-size: 0.24rem;
}
/*评分底部选项*/

.greater-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  padding: 0 0.2rem;
}

.greater button {
  margin-bottom: 0.3rem;
  color: #999999;
  background: none;
  outline: none;
  border: none;
  padding: 0.22rem 0.2rem;
  border: 1px solid #f1f1f1;
  border-radius: 0.35rem;
}

.greater button.active {
  border: 1px solid #49bbff;
  color: #49bbff;
}
/*提交按钮*/

.btn {
  position: fixed;
  bottom: 0;
  display: block;
  width: 100%;
  height: 1rem;
  color: #ffffff;
  line-height: 1rem;
  text-align: center;
  background: #49bbff;
  border: none;
}
/*提示框*/

.dot-comment >>> .mint-popup {
  width: 84%;
  border-radius: 0.2rem;
}

.information-box {
  height: 3.54rem;
  background: #ffffff;
  padding: 0.45rem 0.3rem 0.34rem;
  border-radius: 0.2rem;
}

.info-up {
  text-align: center;
  border-bottom: 1px solid #f1f1f1;
}

.info-up > p {
  padding: 0 0.5rem;
  margin-bottom: 0.5rem;
}

.info-down {
  text-align: center;
  height: 0.9rem;
  line-height: 0.9rem;
}
</style>