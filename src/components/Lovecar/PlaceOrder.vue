<template>
	<div class="place-order">
		<mhead currentTitle="提交订单"></mhead>
		<div class="order-header">
			<h5>瑞风S7</h5>
			<p>汽车VIN：52779000</p>
		</div>
		<div class="lines"></div>
		<div class="order-detail">
			<div class="order-num">
				<span class="num">200</span>
				<span class="unit">MB</span>
			</div>
			<div class="order-info">
				<h5>套餐A</h5>
				<span>￥<span>2</span>.00元</span>
			</div>
		</div>
		<div class="linetwo"></div>
		<div class="pay-method">
			<p>支付方式</p>
			<button class="money-way">微信支付</button>
		</div>
	</div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead';
	export default {
		name: 'placeOrder',
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
	.order-header {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		padding: .5rem;
	}
	.order-header>h5 {
		margin-bottom: .3rem;
	}
	.lines {
		width: 95%;
		background: #DCDCDC;
		height: .01rem;
		margin: 0 auto
	}
	.order-detail {
		display: flex;
		padding: .5rem .7rem
	}
	.order-num {
		height: 1rem;
		line-height: 1rem;
		padding-right: .4rem;
		border-right: .01rem solid #F1F1F1;
	}
	.num {
		background: linear-gradient(180deg, #2099FF, #79BFF9, #0F46F9);
  	-webkit-background-clip: text;
    color: transparent;
	}
	.unit {
		background: linear-gradient(180deg, #2099FF, #79BFF9, #0F46F9);
  	-webkit-background-clip: text;
    color: transparent;
	}
	.order-info {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    padding-left: .4rem;
	}
	.order-info span {
		background: linear-gradient(180deg, #2099FF, #79BFF9, #0F46F9);
  	-webkit-background-clip: text;
    color: transparent;
	}
	.linetwo {
		width: 95%;
		background: #DCDCDC;
		height: .01rem;
		margin: 0 auto;
		margin-bottom: .42rem;
	}
	/*支付方式*/
	.pay-method {
		padding: 0 .3rem
	}
	.pay-method>p {
		margin-bottom: .4rem;
	}
	.money-way {
		display: block;
		width: 1.97rem;
		height: 1.44rem;
		line-height: 1.44rem;
		color: #49BBFF;
		border: .01rem solid #49BBFF;
		border-radius: .08rem;
		outline: none;
		background: none;
		background: url('../../../static/images/Lovecar/background@2x.png') no-repeat center center;
		background-size: 100% 100%;
	}
</style>