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
					<button v-for="(item, index) in questionList" v-show="evaluatePoint <= 2" @click="toggleClass(index)" :class="{active: checkIndex(index)}" :key="index" :data-index="index">{{item}}</button>
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
	import PublicHead from '../publicmodel/PublicHead';
	import { Toast, MessageBox } from 'mint-ui';
	export default {
		name: 'dotComment',
		components: {
			mhead: PublicHead,
		},
		data() {
			return {
				evaluatePoint: 5, //总体评价得分,默认>2不显示问题选择按钮
				servicePoin: '', //服务得分
				repairePoin: '', //维修得分
				introduction: '', //问题收集输入文本
				questionList: ['时间过长', '维保质量低', '收费不合理', '人员态度恶劣', '问题解释不清', '休息区不舒适', '进/出站不方便'], //问题列表
				nowIndex: [], //多选问题列表
				popupVisible: false, //控制提示状态变量,false消失, true显现
				screenHeight: $(window).height()
			}
		},
		methods: {
			evaluate(value) { //总体评价
				//				console.log('总体评价' + value + '分')
				this.evaluatePoint = value
			},
			service(value) { //服务分
				//				console.log('服务' + value + '分')
				this.servicePoin = value
			},
			repair(value) { //维修分
				//				console.log('维修' + value + '分')
				this.repairePoin = value
			},
			toggleClass(index) { //多选问题
				if(this.nowIndex.indexOf(index) == -1) {
					this.nowIndex.push(index)
				} else {
					this.nowIndex = this.nowIndex.filter((inx) => {
						return inx != index
					})
				}
			},
			checkIndex(index) { //返回数组中有的下标
				return this.nowIndex.indexOf(index) != -1
			},
			changeFocus() { //处理ios机型fixed布局失效
				var u = navigator.userAgent,
					app = navigator.appVersion;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //安卓
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isIOS) {
					var docheight = $(window).height() - 1; //ios使用resize监听屏幕高度与安卓不一样,把软键盘高度依然算在了屏幕内,手动减值,触发判断
					console.log('IOS resize后高度:' + docheight)
					if(docheight < this.screenHeight) {
						$('.btn').css('position', 'static')
						$(".score-time").css("bottom", "0.24rem"); //解决数字计数器bug
					} else {
						$(".score-time").css("bottom", "0.24rem"); //解决数字计数器bug
						$('.btn').css('position', 'fixed')
					}
				} else if(IOSAndAndroid.isIOSOrAndroid() === 'Android') {
					var windheight = $(window).height();
					var docheight = $(window).height();
					console.log('Android resize后高度:' + docheight)
					if(docheight < this.screenHeight) {
//						$('.btn').css('position', 'fixed')
//						$(".score-time").css("bottom", "1.14rem");
					} else {
						$(".score-time").css("bottom", "0.24rem");
					}
				}
			},
			submitScore() { //提交评分
				if(this.evaluatePoint == 5 || this.servicePoin == '' || this.repairePoin == '') {
					Toast({
						message: '网点星级评分不能为空',
						position: 'middle',
						duration: 1000
					});
					return
				} else if(this.evaluatePoint <= 2 && this.nowIndex.length == 0) {
					this.popupVisible = true
					return
				} else {
					console.log('111')
				}
			},
			beforeEnter(el) { //动画
				el.style.opacity = 0
				el.style.transform = 'translateX(100%)'
			},
			enter(el, done) {
				var delay = el.dataset.index * 200
				setTimeout(function() {
					Velocity(
						el, {
							opacity: [1, "easeInSine", 0],
							translateX: [0, '100%']
						}, {
							complete: done
						}
					)
				}, delay)
			},
			leave(el, done) {
				var delay = el.dataset.index * 200
				//				setTimeout(function() {
				/*Velocity(
					el, {
						opacity: [ 0, "easeInSine", 1],
						translateX: ['100%', 0]
					}, {
						complete: done
					}
				)*/
				//				}, delay)
				//					setTimeout ( () => {
				Velocity(el, "transition.bounceUpOut", { //可选slideUp
					duration: 500,
					complete: done
				})
				//					}, delay)

			},
		},
		mounted() {
			console.log('初次进入页面高度:' + this.screenHeight)
			window.addEventListener('resize', this.changeFocus)
		},
		beforeDestroy() {
			window.removeEventListener('resize', this.changeFocus)
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
		margin-bottom: 3.06rem;
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
	
	.greater-wrap {
		display: flex;
		justify-content: space-between;
		align-items: center;
		flex-wrap: wrap;
		padding: 0 .2rem;
	}
	
	.greater button {
		margin-bottom: .3rem;
		color: #999999;
		background: none;
		outline: none;
		border: none;
		padding: .22rem .2rem;
		border: 1px solid #F1F1F1;
		border-radius: .35rem;
	}
	
	.greater button.active {
		border: 1px solid #49BBFF;
		color: #49BBFF;
	}
	/*提交按钮*/
	
	.btn {
		position: fixed;
		bottom: 0;
		display: block;
		width: 100%;
		height: 1rem;
		color: #FFFFFF;
		line-height: 1rem;
		text-align: center;
		background: #49BBFF;
		border: none;
	}
	/*提示框*/
	
	.dot-comment>>>.mint-popup {
		width: 84%;
		border-radius: .2rem;
	}
	
	.information-box {
		height: 3.54rem;
		background: #FFFFFF;
		padding: .45rem .3rem .34rem;
		border-radius: .2rem;
	}
	
	.info-up {
		text-align: center;
		border-bottom: 1px solid #F1F1F1;
	}
	
	.info-up>p {
		padding: 0 .5rem;
		margin-bottom: .5rem;
	}
	
	.info-down {
		text-align: center;
		height: 0.9rem;
		line-height: 0.9rem
	}
</style>