<template>
	<div class="skylight-control">
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">空气进化器</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>
		<div class="window-header">
			<div class="window-btn">
				<mt-switch v-model="value" @change="turn"></mt-switch>
				<span>OFF/NO</span>
			</div>
			<div class="window-sign flex-column">
				<span class="window-ch">天窗</span>
				<span class="window-en">AIRCLEAER</span>
				<span style="width: 0.54rem;height: 1px; background: rgba(153,153,153,1);margin-bottom: 0.4rem;"></span>
			</div>
		</div>
		<!--进化器主体Start-->
		<div class="window-wrap flex-column-align">
			<div class="window-content flex-center-between">
				<div class="temperature">
					<span style="font-size: 0.68rem;color: #222222;">{{windNum[winIndex]}}</span>
				</div>
				<div class="wind-blows">
					<img v-if="activeShowImg" :src="'./static/images/Lovecar/Purify@2x.png'" alt="" />
					<img v-else :src="'./static/images/Lovecar/Purify1@2x.png'" alt="" />
					<div class="pm-data" v-if="value">
						<div v-if="pmState" style="color: #888888;" @click="getPmData">点击获取数据</div>
						<div v-else>
							<div class="pm-show">
								<span style="color: #49BBFF;">pm2.5:</span>&nbsp;&nbsp;
								<span style="font-size: 0.36rem;color: #49BBFF;">11μg/m³</span>
							</div>
							
							<div class="Refresh flex-center-between">
								<img :class="{rotateActive: rotateState}" :src="'./static/images/Lovecar/Refresh@2x.png'" alt="" />
								<span @click="refreshPmData">刷新数据</span>
							</div>
						</div>					
					</div>					
				</div>
				<div class="num">
					<!--<span :class="activeShowImg?'fontActive':'loseActives'">{{number}}</span>-->
				</div>
			</div>
			<!--进化器强度计数器Start-->
			<div class="window-change">
				<div style="margin-bottom: 0.36rem;" class="flex-center">
					<span style="width: 0.5rem;margin-right: 0.47rem;font-size: 0.24rem;color: #222222;">风速</span>
					<img :src="'./static/images/Lovecar/left@2x.png'" alt="" />
					<div class="wind-count">
						<span @click=" windReduce" class="addWind"><</span>
						<input class="wind-input" type="text" v-model="windNum[winIndex]" />
						<span @click="windAdd" class="reduceWind">></span>
					</div>
					<img :src="'./static/images/Lovecar/right@2x.png'" alt="" />
				</div>

				<!--<span>升降强度</span>-->
			</div>
			<!--进化器强度计数器End-->
		</div>
	</div>
</template>

<script>
	export default {
		name: 'skylightControl',
		data () {
			return {
				//进化器控制按钮开关
				value: false,
				//图片激活变量
				activeShowImg: 0,
				//进化器强度展示
				windNum: ['高', '中', '低'],
				winMin: 0,
				//进化器控制变量
				winIndex: 0,
				//PM提示状态
				pmState: true,
				//PM2.5数据loading状态
				rotateState: false,
			}
		},
		methods: {
			//进化器控制开关方法
			turn() {
				this.activeShowImg = !this.activeShowImg
			},
			//激活底部图标方法
			change(val) {
				this.activeShowImg ? this.activeShowImg = val : this.activeShowImg = 0
			},
			//进化器强度增加
			windAdd() {
				if(this.activeShowImg) {
					if(this.winIndex >= this.windNum.length - 1) {
						this.winIndex = 0
					} else {
						this.winIndex++
					}
				} else {
					return
				}

			},
			//进化器强度减弱
			windReduce() {
				if(this.activeShowImg) {
					if(this.winIndex <= this.winMin) {
						this.winIndex = this.windNum.length - 1
					} else {
						this.winIndex--
					}
				} else {
					return
				}

			},
			//获取PM2.5数据
			getPmData () {
				this.pmState = false
			},
			//刷新PM2.5数据
			refreshPmData () {
				this.rotateState = true
				setTimeout(() => {
					this.rotateState = false
				}, 1000)
			}
		}
	}
</script>

<style scoped>
	/*flex*/
	
	.flex-column-align {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex-column-align {
		/*竖直方向水平居中*/
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.flex-center-between {
		/*水平垂直居中-两边对齐*/
		display: flex;
		justify-content: space-between;
		align-items: center;
	}
	
	.flex-column {
		/*竖直方向*/
		display: flex;
		flex-direction: column;
	}
	
	.flex-center {
		/*水平垂直居中*/
		display: flex;
		justify-content: center;
		align-items: center;
	}
	/*进化器头部*/
	
	.window-header {
		padding: 0.4rem 0.64rem 0 0.68rem
	}
	/*进化器开关按钮*/
	
	.window-btn {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	/*进化器标志*/
	
	.window-ch {
		height: 0.31rem;
		margin-bottom: 0.17rem;
		line-height: 0.31rem;
		color: rgb(34, 34, 34);
		font-size: 0.32rem;
	}
	
	.window-en {
		height: 0.18rem;
		margin-bottom: 0.36rem;
		line-height: 0.18rem;
		font-size: 0.22rem;
		font-family: PingFang-SC-Regular;
		color: rgba(34, 34, 34, 1);
	}
	/*进化器主体*/
	
	.window-wrap {
		height: 8.6rem;
		padding: 0.45rem 0.68rem;
	}
	
	.window-content {
		height: 7.6rem;
		width: 100%;
	}
	/*进化器强度*/
	
	.temperature {
		align-self: flex-start;
		width: 0.8rem;
	}
	/*进化器图片*/
	
	.wind-blows {
	    display: flex;
	    flex-direction: column;
	    justify-content: space-between;
	    align-items: center;
		align-self: flex-end;
	    width: 3rem;
	    height: 4.6rem;
	    margin-right: 0.5rem;
	}
	
	.wind-blows>img {
	    width: 1.4rem;
	    height: 2.35rem;
	    margin: 0 auto;
	}
	/*PM数据*/
	.pm-data {
		display: flex;
		flex-direction: column;
	    width: 3rem;
	    height: 1.6rem;
    	line-height: 0.5rem;
    	text-align: center;
	}
	.pm-show {
		display: flex;
	}
	.Refresh {
		justify-content: space-around;
	}
	.Refresh>img {
		width: 0.4rem;
		height: 0.32rem;
	}
	.Refresh>span {
	    display: inline-block;
    	margin-right: 0.9rem;
    	color: #888888;
	}
	/*进化器强度计数器*/
	
	.window-change {
	    display: flex;
	    justify-content: center;
	    flex-direction: column;
	    align-items: center;
        margin-right: 0.6rem;
	}
	
	.window-change>div>img {
		width: 0.8rem;
		height: 1px;
	}
	
	.wind-count {
		display: flex;
		justify-content: center;
		align-items: center;
		width: 2.1rem;
		margin: 0 auto;
		border: 1px solid #999999;
		border-radius: 0.3rem;
	}
	
	.window-change .wind-input {
		width: 0.9rem;
		height: 0.6rem;
		outline: none;
		border: none;
		text-align: center;
	}
	
	.addWind {
		display: block;
		width: 0.6rem;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		border-right: 1px solid #999999;
	}
	
	.reduceWind {
		display: block;
		width: 0.6rem;
		height: 0.6rem;
		line-height: 0.6rem;
		text-align: center;
		border-left: 1px solid #999999;
	}
	.rotateActive {
		animation: rotate 2s linear infinite;
	}
	@-webkit-keyframes rotate{
		0%{
			transform: rotate(0deg);
		}
		100%{
			transform: rotate(360deg);
		}
	}
</style>