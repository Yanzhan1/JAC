<template>
	<div class="MallOrderDetails" style="margin-top: 2rem;">
		<mhead currentTitle="订单详情"></mhead>
	</div>
</template>

<script>
	import PublicHead from '../publicmodel/PublicHead';
	export default {
		name: 'mallOrderDetails',
		components: {
	  	mhead:PublicHead
	  },
		data () {
			return {
				orderNo: this.$route.query.orderNo
			}
		},
		mounted () {
			this.$http.post(My.orderDetail).then( res => {
				
			})
			.catch( err => {
				
			})
		},
		methods: {
			
		}
	}
</script>

<style scoped>

</style>