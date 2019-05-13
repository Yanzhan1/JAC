<template>
	<div>
		<!--<header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">订单详情</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>-->
		<mhead currentTitle="维保详情"></mhead>
		<ul style="padding:0 .32rem;border-bottom:.2rem solid #F9F9F9">
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>预约编码:</span>
				</div>
				<span>{{userinfo.revervationCode}}</span>				
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>预约状态:</span>
				</div>
				<span>{{userinfo.revervationStatus}}</span>				
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>服务商:</span>
				</div>
				<span>{{userinfo.dealerName}}</span>				
			</li>
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>服务类型:</span>
				</div>
				<span>{{userinfo.revervationTypeName}}</span>
			</li>
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>预约日期:</span>
				</div>
				<span>{{userinfo.revervationDate}}</span>
			</li>
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>预约时间:</span>
				</div>
				<span>{{userinfo.revervationTime?userinfo.revervationTime:'全天'}}</span>
			</li>
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>车主名称:</span>
				</div>
				<span>{{userinfo.ownerName}}</span>
			</li>
            <li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>车主电话:</span>
				</div>
				<span>{{userinfo.ownerMobile}}</span>
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>VIN:</span>
				</div>
				<span>{{userinfo.vin}}</span>
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>预约顾问名称:</span>
				</div>
				<span>{{userinfo.server}}</span>
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>预约专员ID:</span>
				</div>
				<span>{{userinfo.serverId}}</span>
			</li>
			<li class="flex row between cocenter" style="height:.99rem;border-bottom:.01rem solid #f1f1f1">
				<div class="order-title">
					<!-- <img src="../../../static/images/my/start.png" alt="" /> -->
					<span>反馈日期:</span>
				</div>
				<span>{{userinfo.feedbackTime}}</span>
			</li>			
		</ul>
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
				userinfo: {} //存放用户信息
			};
		},
		created() {
			this.userinfo = this.$route.query
			console.log(this.userinfo)
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