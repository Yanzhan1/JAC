<template>
	<div class="intelligent-car">
		<header class="header MobileHeight">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<router-link tag='span' class="seatAeration" to="/wit/hotSell">热销车型<span></span></router-link>
			<router-link tag='span' class="seatHeating active" style="margin-right: 1.3rem;" to="/wit/intelligentCar">智能选车<span></span></router-link>
		</header>
		<div style="height:0.88rem" class="MobileHeight"></div>
	</div>
</template>

<script>
	export default {
		name: 'intelligentCar',
		data () {
			return {
				
			}
		},
		mounted () {
			$(".MobileHeight").css({"marginTop": this.$store.state.mobileStatusBar}) //头部挤出一定高度,配合原生做沉浸式开发
		}
	}
</script>

<style scoped>
	/*页面标题*/
.header {
  line-height: 0.88rem;
}
.header > span {
  position: relative;
  font-size: 0.3rem;
  color: #999999;
}
.header > span.active {
  color: #49bbff;
}
.header > span.active > span {
  position: absolute;
  left: 50%;
  top: 50%;
  -webkit-transform: translate(-50%, -50%);
  transform: translate(-50%, -50%);
  width: 0.46rem;
  height: 0.88rem;
  border-bottom: 0.06rem solid #49bbff;
}
</style>