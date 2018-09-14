<template>
	<div class="freedback-record">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">反馈记录</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div v-for="(item,index) in questionContent" class="freeback-wrap flex-center" :key="index">
			<router-link tag="div" class="question-content flex-column-align" :to="{path:'/myindex/feedbackDetail', query:{no:item.no}}">
				<div class="question">
					<span class="content">【{{questionTyep[item.complaintsType]}}】{{item.complaintsContent}}</span>
					<span>{{getTime(item.createdDate)}}</span>
				</div>
			</router-link>
		</div>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
export default {
  name: "feedbackRecord",
  data() {
    return {
      condition: {
        //后台需要传参
        userNo: this.$store.state.userId
      },
      questionContent: [], //意见内容
      questionTyep: {
        //意见种类
        "1": "问题	",
        "2": "意见"
      }
    };
  },
  methods: {
    init() {
      this.$http
        .post(Wit.searchComplaintsSuggestionsList, this.condition)
        .then(res => {
          const data = res.data;
          if (data.code == 0) {
            this.questionContent = data.data;
          } else {
            let instance = Toast({
              message: data.Msg,
              position: "middle",
              duration: 1000
            });
          }
        })
        .catch(error => {
          let instance = Toast({
            message: "系统异常",
            position: "middle",
            duration: 1000
          });
        });
    },
    getTime(date) {
      //转化时间戳
      return operationTime.getTime(date, 2);
    }
  },
  mounted() {
    this.init();
  }
};
</script>

<style scoped>
.content {
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
 -webkit-line-clamp: 2;
}
/*水平垂直居中*/

.flex-center {
  display: flex;
  justify-content: center;
  align-items: center;
}
/*竖直方向水平居中*/

.flex-column-align {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
/*反馈内容*/

.freedback-record {
  min-height: 100%;
  background: #f5f5f5;
}

.question-content {
  width: 92%;
  height: 2.07rem;
  margin-top: 0.3rem;
  background: #fff;
  border-radius: 0.08rem;
  padding: 0.4rem;
}
/*问题*/

.question {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
  height: 1.2rem;
  width: 100%;
}

.question > span:nth-of-type(1) {
  font-size: 0.32rem;
  color: #222222;
}

.question > span:nth-of-type(2) {
  font-size: 0.22rem;
  color: #888888;
}
/*线*/

.line {
  width: 100%;
  height: 1px;
  margin: 0.3rem 0 0.26rem;
  background-color: #f1f1f1;
}
/*回答*/

.answer {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 1.6rem;
}

.answer > span:nth-of-type(1) {
  font-size: 0.28rem;
  color: #555555;
}

.answer > span:nth-of-type(2) {
  font-size: 0.22rem;
  color: #888888;
}
</style>