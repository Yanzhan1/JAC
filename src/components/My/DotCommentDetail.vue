<template>
	<div class="dot-comment">
		<mhead currentTitle="网点评分详情"></mhead>
		<p style="height: 1px;width: 100%;margin: 0 auto;background: #F1F1F1;"></p>
		<div >
		<!-- <div v-if="this.recordNo"> -->
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
							<my-start ></my-start>
						</div>
						<div>
							<p>服务态度</p>
							<my-start></my-start>
						</div>
						<div>
							<p>维修质量</p>
							<my-start></my-start>
						</div>
					</div>

				</div>
			</div>
			<!--评价主体End-->

			<!--页面尾部Start-->
			<div class="score-textarea">
				<div class="greater">
					<transition-group tag="div" class="greater-wrap" :css="false" @before-enter="beforeEnter" @enter="enter" @leave="leave">
						<button v-for="(item, index) in questionList" :key="index" :data-index="index">{{item.dictValue}}</button>
					</transition-group>

				</div>
				<div style="text-align: center;width:100%;">
					<textarea v-model="proposal" disabled></textarea>
				</div>
			</div>
		</div>
		<!-- <div v-else>
			暂无评价
		</div> -->
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
      questionList: [], //问题列表,展示用
      nowIndex: [], //多选问题列表内容(数组形式)
      question: "", //真正传给后台的内容,要求字符串形式
      proposal: "123dasdhfjhdsafhdsahfdsahfidsahdshafdsjfhkjhiuewqhfiu", //客户意见的展示
      screenHeight: $(window).height(),
      recordNo: this.$store.state.recordNo
    };
  },
  methods: {
    init() {
      //获取问题列表
      var data = {
        // recordNo: this.$store.state.recordNo,
        recordNo: "AU182139219837218"
      };
      this.$http.post(My.searchBranchesEvaluationOne, data).then(res => {
		  let data=res.data
        if(data.code==0){
				this.proposal=data.data.remark
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
    this.init();
  },
  beforeDestroy() {}
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
/*提示框*/

.dot-comment >>> .mint-popup {
  width: 84%;
  border-radius: 0.2rem;
}
textarea {
  text-indent: .1rem;
  padding: 0.1rem;
  height: 2rem;
  border-radius: 0;
  border: 0;
  -webkit-box-flex: 1;
  -ms-flex: 1;
  flex: 1;
  outline: 0;
  width: 90%;
  font-size: inherit;
}
</style>