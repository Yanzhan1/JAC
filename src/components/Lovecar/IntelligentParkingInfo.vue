<template>
	<div class="intelligent-parking-info">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">智能停车</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<mt-cell title="城建车场" value="查看详情" is-link>
		</mt-cell>
		<mt-cell title="负一层89号">
			<img slot="icon" :src="'./static/images/Lovecar/wei@2x.png'" alt="" />
		</mt-cell>
		<mt-cell title="泸A52014">
			<img slot="icon" :src="'./static/images/Lovecar/che@2x.png'" alt="" />
		</mt-cell>
		<div class="line"></div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span class="commentFont">
					授权时间：
				</span>
				<input class="commentFontSize" :disabled="disabled" type="text" v-model="accreditData" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span class="commentFont">
					结束时间：
				</span>
				<input class="commentFontSize" :disabled="disabled" type="text" v-model="overData" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span class="commentFont">
					担保费：
				</span>
				<input style="margin-left: 0.6rem" class="commentFontSize" :disabled="disabled" type="text" v-model="securitySpend" />
			</div>
		</div>
		<div class="origin-pin">
			<div class="flex-align-center revisePinCommon">
				<span class="commentFont">
					可停止：
				</span>
				<input :disabled="disabled" type="text" v-model="parkingDuration" style="color: #3A5CFF;font-size: 0.28rem;margin-left: 0.6rem;" />
			</div>
		</div>
		<div class="btn flex-center-around">
			<div class="payNum">
				<span style="font-size: 0.26rem;">需付金额</span>
				<span style="color: #49BBFF">￥30.00</span>
			</div>
			<div class="pay">
				立即支付
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name: 'intelligentParkingInfo',
		data() {
			return {
				//授权时间
				accreditData: '2018-06-01 15:00:00',
				//结束时间
				overData: '2018-06-01 16:00:00',
				//担保费
				securitySpend: '￥4.00（可抵扣停车费）',
				//可停止
				parkingDuration: '10天后',
				//输入框不可输入
				disabled: true
			}
		}
	}
</script>

<style scoped>
	/*覆盖公共样式*/
	
	img {
		display: inline-block;
		width: 0.21rem;
		height: 0.21rem;
	}
	/*flex*/
	
	.flex-center-between {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex-center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.flex-center-around {
		/*水平垂直居中-平均对齐*/
		display: flex;
		justify-content: space-around;
		align-items: center;
	}
	.flex-align-center{/*垂直居中*/
	  display: flex;
	  align-items: center;
	}
	/*公共样式*/
	
	.commentFont {
		color: #555555;
		font-size: 0.26rem
	}
	
	.commentFontSize {
		color: #222222;
		font-size: 0.28rem;
	}
	
	.revisePinCommon {
		height: 1rem;
		border-bottom: 1px solid #EFEFEF;
	}
	
	input {
		outline: none;
		border: none;
		background: none;
		margin-left: 0.4rem;
	}
	
	.origin-pin>div {
		width: 90%;
		margin: 0 auto;
	}
	/*底部btn*/
	
	.btn {
		position: absolute;
		bottom: 0;
		width: 100%;
		height: 0.98rem;
	}
	
	.btn>div {
		flex: 1;
		text-align: center;
	}
	.btn>.payNum {
		height: 0.98rem;
		line-height: 0.98rem;
		box-shadow:0px 0px 15px rgba(68,68,68,0.2);
	}
	.btn>.pay {
		height: 0.98rem;
		line-height: 0.98rem;
		background-color: #49BBFF;
		font-size: 0.32rem;
		color: #fff;
	}
</style>