<template>
	<div class="my-feedback">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">我的反馈</span>
			<span class="header-right">记录</span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="freedback-wrap">
			<div class="freedback-type">
				<span :class="{active:1==FreebackMode}" @click="change(1)">问题</span>
				<span :class="{active:2==FreebackMode}" @click="change(2)" style="margin-left: 0.25rem;">意见</span>
			</div>
			<textarea class="freedback-content" placeholder="请输入您的问题或意见" name="" rows="" cols="" v-model="TextContent"></textarea>
			<div class="flex-column person-info">
				<span>姓名</span>
				<input @focus="focus" ref="input" v-model="FeedbackPerson.name" type="text" />
			</div>
			<div class="flex-column person-info">
				<span>联系方式</span>
				<input @focus="focus" v-model="FeedbackPerson.mobile" type="text" />
			</div>
			
		</div>
		<button class="bottom-btn" @click="submitFeedback">提交反馈</button>
	</div>
</template>

<script>
	import { Toast } from 'mint-ui';
	export default {
		name: '',
		data() {
			return {
				//反馈类型
				FreebackMode: 1,
				//文本框内容
				TextContent: '',
				FeedbackPerson: {
					name: '',
					mobile: ''
				},
				interval: null
			}
		},
		methods: {
			//更改反馈类型
			change(val) {
				this.FreebackMode = val
			},
			//提交反馈
			submitFeedback() {
				let regMobile = 11 && /^((13|14|15|17|18)[0-9]{1}\d{8})$/;
				let checkName = /^[\u4e00-\u9fa5]{2,4}$/
				if(this.FeedbackPerson.name == '' || this.FeedbackPerson.mobile == '' || this.TextContent == '') {
					Toast({
						message: '输入不能为空',
						position: 'middle',
						duration: 2000
					});
					return false;
				}
				if(!checkName.test(this.FeedbackPerson.name)) {
					Toast({
						message: '用户2-4位中文名',
						position: 'middle',
						duration: 2000
					});
					this.FeedbackPerson.name = '';
					return false;
				}
				if(!regMobile.test(this.FeedbackPerson.mobile)) {
					Toast({
						message: '手机号格式不正确',
						position: 'middle',
						duration: 2000
					});
					this.FeedbackPerson.mobile = '';
					return false;
				} else {
					console.log(this.FeedbackPerson.name)
				}
			},
			//文档高度等于可视区域高度
			initHeight() {
				//文档的高度，小于可视窗口的高度情况下，设置文档高度等于可视区域高度
				if($(document).height() < $(window).height()) {
					$('.bottom-btn').css({
						'position': 'fixed',
						'bottom': '0px'
					});
					$(document).height($(window).height() + 'px');
				}
			},
		    //ios输入框唤起键盘时改变fixed布局
			focus() {
				var u = navigator.userAgent,
					app = navigator.appVersion;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid) {

				} else if(isIOS) {
					$('input').on('focus', function() {
						$('.bottom-btn').css('position', 'static');
						$('.header').css('position', 'static');
						//或者$('#viewport').height($(window).height()+'px');
					}).on('blur', function() {
						$('.bottom-btn').css({
							'position': 'fixed',
							'bottom': '0'
						});
						$('.header').css({
							'position': 'fixed',
							'top': '0'
						});
						//或者$('#viewport').height('auto');
					})
					$('textarea').on('focus', function() {
						$('.bottom-btn').css('position', 'static');
						$('.header').css('position', 'static');
						//或者$('#viewport').height($(window).height()+'px');
					}).on('blur', function() {
						$('.bottom-btn').css({
							'position': 'fixed',
							'bottom': '0'
						});
						$('.header').css({
							'position': 'fixed',
							'top': '0'
						});
						//或者$('#viewport').height('auto');
					})
				}

				//				document.body.scrollTop = document.body.scrollHeight
			},

		},
		mounted() {

			this.initHeight()
			this.focus()
		}
	}
</script>

<style scoped>
	.flex-column {
		/*竖直方向*/
		display: flex;
		flex-direction: column;
	}
	
	.my-feedback {
		height: 100vh;
	}
	
	.header .header-right {
		width: 0.7rem;
		height: .4rem;
		line-height: .4rem;
		text-align: center;
		color: #49BBFF;
	}
	/*总体设置*/
	
	.freedback-wrap {
		padding: 0.4rem 0.3rem;
	}
	/*反馈类型*/
	
	.freedback-type {
		height: 0.96rem;
	}
	
	.freedback-type>span {
		display: inline-block;
		width: 1.2rem;
		height: 0.56rem;
		line-height: 0.56rem;
		text-align: center;
		font-size: 0.28rem;
		color: #555555;
		border: 1px solid #CCCCCC;
		border-radius: 0.08rem;
	}
	
	.freedback-type>span.active {
		color: #FFFFFF;
		border: none;
		background: #49BBFF;
	}
	/*反馈内容*/
	
	.freedback-content {
		display: block;
		width: 100%;
		height: 4.2rem;
		background: #F5F5F5;
		text-indent: 0.2rem;
		padding: 0.2rem;
		border: none;
		border-radius: 0.08rem;
		outline: none;
	}
	/*反馈人信息*/
	
	.person-info {
		margin-top: 0.6rem;
	}
	
	.person-info>span {
		display: inline-block;
		padding-bottom: 0.1rem;
		color: #555555;
	}
	
	.person-info>input {
		height: 1rem;
		outline: none;
		-webkit-appearance: none;
		border: none;
		font-size: 0.4rem;
		text-indent: 0.1rem;
		background: #f5f5f5;
		border-radius: 0.08rem;
	}
	
</style>