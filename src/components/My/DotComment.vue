<template>
	<div>
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
			<div class="greater" v-if="evaluatePoint <= 2">
				<button v-for="(item, index) in questionList" @click="toggleClass(index)" :class="{active: checkIndex(index)}">{{item}}</button>
			</div>
			<div>
				<mt-field placeholder="亲，对本次服务还满意吗?" type="textarea" rows="6" v-model="introduction" :attr="{ maxlength: 200 }"></mt-field>
				<span class="score-time">{{introduction.length}}/200</span>
			</div>

		</div>
		<!--页面尾部End-->
	</div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead';
	export default {
		name: 'dotComment',
		components: {
			mhead: PublicHead,
		},
		data() {
			return {
				evaluatePoint: 5,//总体评价得分,默认>2不显示问题选择按钮
				servicePoin: '',//服务得分
				repairePoin: '', //维修得分
				introduction: '', //问题收集输入文本
				questionList: ['时间过长','维保质量低', '收费不合理', '人员态度恶劣', '问题解释不清', '休息区不舒适', '进/出站不方便'],//问题列表
				nowIndex: [],
			}
		},
		methods: {
			evaluate(value) {
//				console.log('总体评价' + value + '分')
				this.evaluatePoint = value
			},
			service(value) {
//				console.log('服务' + value + '分')
				this.servicePoin = value
			},
			repair(value) {
//				console.log('维修' + value + '分')
				this.repairePoin = value
			},
			toggleClass (index) {
				if (this.nowIndex.indexOf(index) == -1) {
					this.nowIndex.push(index)
				} else {
					this.nowIndex = this.nowIndex.filter((inx) => {
						return inx != index
					})
				}
			},
			checkIndex (index) {  //返回数组中有的下标
//				console.log(this.nowIndex.indexOf(index) != -1)
				return this.nowIndex.indexOf(index) != -1
			}
		}
	}
</script>

<style scoped>
	/*评分部分*/
	
	.score-wrap {
		padding: .86rem .3rem;
		padding-bottom: 0;
	}
	
	.score-content {
		margin-bottom: .6rem;
		padding-bottom: .86rem;
		border-bottom: 1px solid #E7E7E7;
	}
	
	.score-title {
		display: flex;
		align-items: center;
		margin-bottom: .82rem;
	}
	
	.score-title>img {
		width: .44rem;
		height: .44rem;
		margin-bottom: 0;
	}
	
	.score-body {
		padding: 0 .38rem;
	}
	
	.score-body>div {
		display: flex;
		justify-content: space-between;
		align-items: center;
		margin-bottom: .72rem;
	}
	
	.score-body>div:last-child {
		margin-bottom: 0;
	}
	
	.score-textarea {
		position: relative;
	}
	
	.score-textarea>>>.mint-field-core {
		background: #F5F5F5;
	}
	
	.score-textarea>>>.mint-cell-wrapper {
		/*padding-left: .1rem;*/
		padding: 0 .5rem;
		border-radius: .08rem;
	}
	
	.score-textarea>>>.mint-field-core {
		text-indent: 10px;
		padding: .1rem;
	}
	
	.score-time {
		position: absolute;
		right: 0.65rem;
		bottom: 0.24rem;
		color: #222222;
		font-size: .24rem;
	}
	/*评分底部选项*/
	.greater {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 .2rem;
	}
	.greater>button {
		margin-bottom: .3rem;
		color: #999999;
		background: none;
		outline: none;
		border: none;
		padding: .22rem .2rem;
		border: 1px solid #F1F1F1;
		border-radius: .35rem;
		
	} 
	.greater>button.active {
		border: 1px solid #49BBFF;
		color: #49BBFF;
	}
</style>