<template>
	<div class="my-bus">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">我的车辆</span>
			<span class="header-right"><router-link tag="img" to="/myindex/addBus" style="width: 0.36rem;height: 0.36rem;" :src="'./static/images/my/mycar_add.png'"></router-link></span>
		</header>
		<div style="height:0.88rem"></div>
		<!--<div class="bus-wrap">-->
			<ul class="bus-list">
				<li class="bus-content flex-center-between">
					<div class="bus-left">
						<div class="bus-name flex-align-center">
							<img v-if="carState" :src="'./static/images/Lovecar/window2@2x.png'" alt="" />
							<img v-else :src="'./static/images/Lovecar/loseWindow.png'" alt="" />
							<span style="color: #49BBFF;">瑞风 S7 {{carState ? '默认' : ''}}</span>
						</div>
						<img :src="'./static/images/my/car_ruifeng_s5@2x.png'" alt="" />
					</div>
					<div class="bus-right">
						<p class="bus-untie" @click="unite">解绑</p>
						<div class="flex-align-center">
							<span style="color:#49BBFF;">{{carState ? '沪A 12345' : '添加车牌'}}</span>
							<router-link tag="img" class="modify-num" :src="'./static/images/my/mycar_input@2x.png'" to="/myindex/plateBind"></router-link>
						</div>
						<div>
							<span class="commonFontSize">车架号：ea39588182284554</span>
						</div>
						<div>
							<span class="commonFontSize">发动机号：dd94895984395949</span>
						</div>
					</div>
				</li>
			</ul>
		<!--</div>-->
	</div>
</template>

<script>
	import { MessageBox } from 'mint-ui';
	export default {
		name: 'myBus',
		data () {
			return {
				//汽车默认状态
				carState: true
				
			}
		},
		methods: {
			unite () {
				MessageBox.confirm('',{
					title: '提示',
					message: '您确定要解绑该车牌吗？',
					showConfirmButton: true,
					showCancelButton: true,
					cancelButtonClass: 'cancelButton',
					confirmButtonClass: 'confirmButton',
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					confirmButtonHighlight: true,
					cancelButtonHighlight: true
				}).then(action => {
					if(action == 'confirm') {
						//跳转修改成功页面
						console.log('abc');
					}
				}).catch(err => {
					if(err == 'cancel') {
						console.log('123');
					}
				});
			}
		}
	}
</script>

<style scoped>
	/*flex*/
	.flex-center{/*水平垂直居中*/
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.flex-align-center{/*垂直居中*/
	  display: flex;
	  align-items: center;
	}
	.flex-center-between{/*水平垂直居中-两边对齐*/
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	/*公共样式-字体*/
	.commonFontSize {
		font-size: 0.22rem;
		color: #555555;
	}
	/*bus主体*/
	/*.bus-wrap {
		padding: 0.3rem;
	}*/
	.bus-list {
		margin: 0.4rem 0.3rem 0;
	}
	.bus-content {
		padding: 0.2rem 0.3rem 0.5rem;
		background: #F5F5F5;
	    border-radius: 0.08rem;
	    align-items: flex-start;
	}
	/*left部分*/
	.bus-left {
		height: 2.22rem;
	}
	.bus-left>img {
	    width: 2.78rem;
    	height: 1.42rem;
	    margin-top: 0.45rem;
	}
	.bus-name {
	    margin-left: 0.1rem;
	}
	.bus-name>img {
		width: 0.28rem;
		height: 0.28rem;
	}
	/*right部分*/
	.bus-right {
	    display: flex;
    	flex-direction: column;
    	justify-content: space-between
	}
	.bus-untie {
	    width: 1rem;
	    height: 0.4rem;
	    margin-bottom: 0.46rem;
	    line-height: 0.4rem;
	    background: #49BBFF;
	    text-align: center;
	    font-size: 0.22rem;
	    color: #fff;
	    border-radius: 0.2rem;
	    align-self: flex-end;
	}
	.modify-num {
    	width: 0.24rem;
    	height: 0.24rem;
    	margin-left: 0.2rem;
	}
</style>