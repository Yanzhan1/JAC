<template>
	<d class="hot-sell">
		<header class="header MobileHeight">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<router-link tag='span' class="seatAeration active" to="/wit/hotSell">热销车型<span></span></router-link>
			<router-link tag='span' class="seatHeating" style="margin-right: 1.3rem;" to="/wit/intelligentCar">智能选车<span></span></router-link>
		</header>
		<div style="height:0.88rem" class="MobileHeight"></div>
		<!--车型列表Start-->
		<d class="car-wrapper" ref="carWrapper">
			<ul>
			<!--<transition-group name="staggered-fade" tag="ul" v-bind:css="false" v-on:before-enter="beforeEnter" v-on:enter="enter" v-on:leave="leave">-->
					<li class="car-content" v-for="(item, index) in carList"  
						v-bind:key="item.id"
      			v-bind:data-index="index"
      		>
						<div class="car-img">
							<img :src="item.src"/>
						</div>
						<d class="car-body">
							<h3 style="color: #222222;font-size: .33rem;">{{item.modelName}}</h3>
							<div class="car-special">
								<div>{{item.seriesName}}</div>
								<div>{{item.road}}</div>
							</div>
							<div class="car-info">
								<span>目标行业:</span>
								<span style="color: #666666;">{{item.targetIndustry}}</span>
							</div>
						</d>
						<img class="car-return" src="../../../static/images/my/next@2x.png" alt="" />
					</li>		
					</ul>
			<!--</transition-group>-->
		</d>
		<!--车型列表End-->
	</d>
</template>

<script>
	import BScroll from "better-scroll";
	export default {
		name: 'hotSell',
		data() {
			return {
				carList: [] //车型列表
			}
		},
		methods: {
			getcarlist() {
				let data = {
					hotCar:1,
					size: 100,
					current: 1
				};
				this.$http.post(Wit.searchHeavyCarModelListPage,data).then(res => {
					this.carList=res.data.data.records
				});
				},
		},
		mounted() {
			this.$nextTick(() => {
				 /*if (!this.scroll) {
						this.scroll = new BScroll(this.$refs.carWrapper, {})
			    }*/
				this.scroll = new BScroll(this.$refs.carWrapper, {
					click: true
				})
			})
			
			$(".MobileHeight").css({
				"marginTop": this.$store.state.mobileStatusBar
			}) //头部挤出一定高度,配合原生做沉浸式开发
			/*Velocity($('.car-wrapper'), 'transition.swoopIn', {  //可选slideUp
							duration: 400,
							complete: () => {
							}
			})*/
			this.getcarlist()
		}
	}
</script>

<style scoped>
	.hot-sell {
		height: 100vh;
		
	}
	/*页面标题*/
	
	.header {
		line-height: 0.88rem;
  	background: #fff;
	}
	
	.header>span {
		position: relative;
		font-size: 0.3rem;
		color: #999999;
	}
	
	.header>span.active {
		color: #49bbff;
	}
	
	.header>span.active>span {
		position: absolute;
		left: 50%;
		top: 50%;
		-webkit-transform: translate(-50%, -50%);
		transform: translate(-50%, -50%);
		width: 0.46rem;
		height: 0.88rem;
		border-bottom: 0.06rem solid #49bbff;
	}
	/*车型列表*/
	.car-wrapper {
		/*display: none;
		opacity: 0;*/
    position: absolute;
    top: .88rem;
    left: 0;
    width: 100%;
    height: 100%;
		padding: .3rem;
    overflow: hidden;
	}
	.car-wrapper>ul {
		/*height: 100vh;*/
	}
	.car-content {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: .5rem 0rem;
		border-bottom: 1px solid #F1F1F1;
	}
	/*左*/
	.car-img >img {
		width: 2.56rem;
		height: 1.4rem;
	}
	/*中*/
	.car-body {
		margin-left: 0.5rem;
	}
	.car-special {
		margin: .3rem 0rem;
		font-size: .26rem;
		color: #49BBFF;
	}
	.car-special div {
		display: inline-block;
		height: .4rem;
		line-height: .4rem;
		background: #ECF8FF;
		border-radius: .08rem;
		text-align: center;
	}
	.car-info {
		color: #999999;
		font-size: .24rem;
	}
	/*右*/
	.car-return {
		width: .16rem;
		height: .3rem;
	}
</style>