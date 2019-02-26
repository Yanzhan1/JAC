<template>
	<div>
		<!--<header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">订单详情</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>-->
		<mhead currentTitle="订单详情"></mhead>
		<ul style="padding:0 .32rem;border-bottom:.2rem solid #F9F9F9">
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<img src="../../../static/images/my/start.png" alt="" />
					<span>预定车型</span>
				</div>

				<span>{{userinfo.seriesName}}</span>
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<img src="../../../static/images/my/start.png" alt="" />
					<span>省</span>
				</div>
				<span>{{userinfo.provinceName}}</span>
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<img src="../../../static/images/my/start.png" alt="" />
					<span>市</span>
				</div>

				<span>{{userinfo.cityName}}</span>
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<img src="../../../static/images/my/start.png" alt="" />
					<span>经销商</span>
				</div>
				<span>{{userinfo.dealerName}}</span>
			</li>

		</ul>
		<ul style="padding:0 .32rem;border-bottom:.2rem solid #F9F9F9">
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<img src="../../../static/images/my/start.png" alt="" />
					<span>姓名</span>
				</div>
				<span>{{userinfo.customerName}}</span>
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<img src="../../../static/images/my/start.png" alt="" />
					<span>性别</span>
				</div>
				<span>{{userinfo.gender}}</span>
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<img src="../../../static/images/my/start.png" alt="" />
					<span>手机号</span>
				</div>
				<span>{{userinfo.realMobile}}</span>
			</li>
		</ul>
		<ul style="padding:0 .32rem;border-bottom:.2rem solid #F9F9F9">
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<span>电子邮箱</span>
				<span>{{userinfo.email}}</span>
			</li>

			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<span>地址</span>
				<span>{{userinfo.address}}</span>
			</li>
		</ul>
		<!-- <div style="padding:0 .3rem">
			<p style="font-size:.27rem;color:#222;padding:.3rem 0">备注说明</p>
			<div class="content">
				{{userinfo.comments}}
			</div>
		</div> -->

	</div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead';
	export default {
		components: {
			mhead: PublicHead
		},
		data() {
			return {
				userinfo: {}, //存放用户信息
				mobile:'',
			};
		},
		methods:{
			// jiami(val){
			// 	val=val+''
			// 	let mobile1=val.slice(0,3);
			// 	let mobile2=val.slice(7,11);
			// 	let newtell=`${mobile1}****${mobile2}`
			// 	this.mobile=newtell
			// }
		},
		created() {
			this.userinfo = this.$route.query
			// console.log(this.userinfo)
			// this.mobile=this.userinfo.realMobile
			// this.jiami(this.userinfo.mobile)
			if(this.userinfo.gender == 1) {
				this.userinfo.gender = '女'
			} else {
				this.userinfo.gender = '男'
			}
		}
	};
</script>

<style scoped>
	.order-title {
		display: flex;
		justify-content: center;
	}
	
	.order-title img {
		width: 0.1rem;
		height: 0.1rem;
	}
	
	ul li:last-child {
		border-bottom: none !important;
	}
	
	ul li span:first-child {
		color: #555;
		font-size: 0.26rem;
	}
	
	ul li span:last-child {
		color: #222;
		font-size: 0.26rem;
	}
	
	.content {
		height: 1.14rem;
		background-color: #f8f8f8;
		padding: .3rem;
		color: #222;
		font-size: .36rem
	}
</style>