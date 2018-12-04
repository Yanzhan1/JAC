<template>
	<div>
		<mhead currentTitle="网点评分"></mhead>
		<p style="height: 1px;width: 100%;margin: 0 auto;background: #F1F1F1;"></p>
		<!--评价主体Start-->
		<div class="score-wrap">
			<div class="score-content">
				<div class="score-title">
					<img src="../../../static/images/my/mine_set@2x.png" />
					<h3 style="padding-right: .1rem;font-size: .34rem;color: #222222;">网点服务评价</h3>
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
		<div class="score-textarea">
			<mt-field placeholder="自我介绍" type="textarea" rows="4" v-model="introduction"></mt-field>
		</div>
		<!--评价主体End-->
		<!--<my-start></my-start>-->

		<!--<start></start>-->
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
				self: '自我介绍',
				introduction: ''
			}
		},
		methods: {
			evaluate(value) {
				console.log('总体评价' + value + '分')
			},
			service(value) {
				console.log('服务' + value + '分')
			},
			repair(value) {
				console.log('维修' + value + '分')
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
</style>