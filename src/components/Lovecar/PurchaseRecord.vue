<template>
	<div class="purchase-record">
		<mhead currentTitle="购买记录"></mhead>
		<div class="record-title">
			<span>剩余流量:</span>
			<div class="order-num">
				<span class="num">200</span>
				<span class="unit">MB</span>
			</div>
		</div>
		<div class="lineBlock"></div>
		<div class="purchase-content">
			<h5>购买记录</h5>
			<ul class="order-list">
				<li class="list">
					<div>
						<h6>套餐A</h6>
						<p>2018-08-17</p>
					</div>
					<div class="content-num">
						<span class="show-um">200</span>
						<span class="show-unit">MB</span>
					</div>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead';
	export default {
		name: 'purchaseRecord',
		components: {
	  	mhead:PublicHead
	  },
		data () {
			return {
				
			}
		}
	}
</script>

<style scoped>
	.record-title {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: .38rem 0;
	}
	.record-title>span {
		color: #666666;
	}
	.num, .unit {
		background: linear-gradient(180deg, #2099FF, #79BFF9, #0F46F9);
  	-webkit-background-clip: text;
    color: transparent;
	}
	.num {
				font-size: .6rem;
	}
	.lineBlock {
		height: .1rem;
		background: #F1F1F1;
	}
	.purchase-content {
		padding: .28rem .3rem 0;
	}
	.purchase-content>h5 {
		margin-bottom: .6rem;
	}
	.order-list {
		padding: 0 .32rem;
	}
	.list {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
</style>