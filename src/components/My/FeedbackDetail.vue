<template>
	<div class="feedback-detail">
		<!--<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">反馈详情</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>-->
		<mhead currentTitle="反馈详情"></mhead>
		<ul class="feedback-wrap">
			<li>
				<div class="question">【{{questionTyep[replyDetailSuggestions.complaintsType]}}】{{replyDetailSuggestions.complaintsContent}}</div>
				<div class="question-time">{{getTime(replyDetailSuggestions.createdDate)}}</div>
				<div class="answer-content">官方回复：{{ replyDetailSuggestions.comSugRe ? replyDetailSuggestions.comSugRe.replyContent : '抱歉，暂时还没有官方回复'}}</div>
				<div class="answer-time">{{ replyDetailSuggestions.lastModifiedDate}}</div>
			</li>
		</ul>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	import PublicHead from '../publicmodel/PublicHead';
	export default {
		name: 'feedbackDetail',
		components: {
		  mhead:PublicHead
		},
		data () {
			return {
				condition: {
					complaintsNo: this.$route.query.no
				},
				detailSuggestions:{},//投诉建议详细查看
				replyDetailSuggestions: {}, //回复投诉建议详细
				questionTyep: { //意见种类
					'1': '问题	',
					'2': '意见'
				}
			}
		},
		methods: {
			init() {
				//请求投诉及建议回复查询详细信息
				this.$http.post(Wit.getComAndSugDet, this.condition).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.replyDetailSuggestions = data.data
this.replyDetailSuggestions.lastModifiedDate = this.replyDetailSuggestions.comSugRe ? operationTime.getTime(this.replyDetailSuggestions.comSugRe.createdDate, 2) : '暂无时间'

					} else {
						let instance = Toast({
							message: data.Msg,
							position: 'middle',
							duration: 1000
						});
					}
				}).catch((error) => {
					let instance = Toast({
						message: '系统异常',
						position: 'middle',
						duration: 1000
					});
				});

			},
		    getTime (date) { //转化时间戳
		    	return operationTime.getTime(date,2)
		    },
		},
		mounted () {
			this.init()
		}
	}
</script>

<style scoped>
	.feedback-wrap {
		padding: 0.42rem 0.3rem 0 0.3rem
	}
	.question {
		margin-bottom: 0.4rem;
		font-size: 0.32rem;
		color: #222222;
		font-weight: bold;
	}
	.question-time {
		padding-bottom: 0.3rem;
		margin-bottom: 0.3rem;
		font-size: 0.22rem;
		color: #888888;
		border-bottom: 1px solid #F1F1F1;
	}
	.answer-content {
		margin-bottom: 0.4rem;
		color: #555555;
	}
	.answer-time {
		color: #888888;
	}
</style>
