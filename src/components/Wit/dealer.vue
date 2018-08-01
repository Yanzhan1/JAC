<template>
	<div>
		<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">查询经销商</span>
			<span class="header-right"><img src="../../../static/images/Wit/map_icon.png" alt="" style="width:.4rem"></span>
		</header>
		<div style="height:.88rem"></div>
		<div class="flex row around con cocenter">
			<div class="flex row cocenter">
				<select v-model="brandNo">
					<option value="" disabled selected>品牌</option>
					<option v-for="(item,index) in searchVehicleBrandList" :key="index" :value="item.no">{{item.brandName}}</option>
				</select>
				<!--<span>品牌</span>
				<img src="../../../static/images/Wit/screen_arrow_btn.png" alt="">-->
			</div>
			<div class="flex row cocenter">
				<select v-model="seriesNo">
					<option value="" disabled selected>车型</option>
					<option v-for="(item,index) in searchVehicleSeriesList" :key="index" :value="item.no">{{item.seriesName}}</option>
				</select>
				<!--<span>车型</span>
				<img src="../../../static/images/Wit/screen_arrow_btn.png" alt="">-->
			</div>
			<div class="flex row cocenter">
				<span>省份</span>
				<img src="../../../static/images/Wit/screen_arrow_btn.png" alt="">
			</div>
			<div class="flex row cocenter">
				<span>城市</span>
				<img src="../../../static/images/Wit/screen_arrow_btn.png" alt="">
			</div>
		</div>
		<div class="one" style="height:.1rem;"></div>
		<ul class="" style="padding:.1rem .2rem">
			<li class="ul_list flex row around " v-for="(item,index) in mainbus" :key="index" @click="search()">
				<div class="ul_list flex cocenter"> <img class="pic" src="../../../static/images/Wit/bg-mine.png" alt=""></div>
				<div class="flex column around  mid">
					<span class="txt_top dian">{{item.dealerName}}</span>
					<span class="txt_m">电话： 021-3324234</span>
					<span class="flex row cocenter">
                        <img style="width:.25rem;margin-right:.1rem;" src="../../../static/images/Wit/list_position_icon.png" alt="">
                        <span class="txt_m dian" style="margin-top:.1rem">{{item.dealerAddress}}</span>
					</span>
				</div>
				<div class="flex column around cocenter">
					<span class="txt_m">1.6km</span>
					<img style="width:.42rem;" src="../../../static/images/Wit/nav_btn.png" alt="">
				</div>
			</li>
		</ul>
		<mt-popup v-model="popupVisible" position="bottom">
			<div style="height:2.5rem;width:100%;">
				<ul class="search">
					<li>高德导航</li>
					<li>百度地图</li>
					<li class="cancel" @click="cancel()">取消</li>
				</ul>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	import { Popup } from "mint-ui";
	export default {
		data() {
			return {
				popupVisible: false,
				mainbus: {}, //存储展示的数据经销商列表
				searchVehicleBrandList: [], //品牌列表
				brandNo: '',//品牌Id
				searchVehicleSeriesList: [],//车型列表
				seriesNo: '', //车型Id
			};
		},
		methods: {
			init() {
				var param = {}
				var data = {}
				console.log(Wit)
				//请求品牌列表
				this.$http.post(Wit.searchVehicleBrandList, data).then(res => {
						const data = res.data;
//						console.log(data);
						if(data.code == 0) {
							this.searchVehicleBrandList = data.data;
//							console.log(this.searchVehicleBrandList)
						} else {
							alert(data.msg)
						}
					})
					.catch((error) => {
						alert('系统异常')
					});
					//经销商
				this.$http.post(Wit.Dealer, param).then(res => {
					if(res.data.code == 0) {
						this.mainbus = res.data.data.records
					}
				})					
			},
			search() {
				this.popupVisible = true;
			},
			cancel() {
				this.popupVisible = false;
			}
		},
		mounted () {
			this.init()
		},
		watch: {
			brandNo (newVal, oldVal) {	
				let data = {
					brandNo: this.brandNo
				}
				//请求车型列表
				this.$http.post(Wit.searchVehicleSeriesList, data).then(res => {
						const data = res.data;
						if(data.code == 0) {
							this.searchVehicleSeriesList = data.data;
							console.log(this.searchVehicleBrandList)
						} else {
							alert(data.msg)
						}
					})
					.catch((error) => {
						alert('系统异常')
					});
			},
			seriesNo (newVal, oldVal) {
				
			}
		}
	};
</script>
<style scoped>
	.row {
		flex-direction: row;
	}
	
	.con div {
		height: 0.88rem;
	}
	
	.con div img {
		width: 0.4rem;
		display: block;
	}
	
	.one {
		background: linear-gradient(#f7f7f7, #f9f9f9);
	}
	
	.ul_list {
		height: 2.3rem;
		border-bottom: 1px solid #f7f7f7;
	}
	
	.pic {
		width: 2.56rem;
		height: 1.68rem;
	}
	
	.mid {
		padding: 0.2rem 0;
	}
	
	.txt_top {
		font-size: 0.3rem;
		color: #222;
	}
	
	.dian {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 3rem;
	}
	
	.txt_m {
		font-size: 0.24rem;
		color: #999;
	}
	
	.mint-popup {
		width: 100%;
	}
	
	.search {
		text-align: center;
	}
	
	.search li {
		font-size: 0.3rem;
		color: #222;
		text-align: center;
		height: 0.8rem;
		line-height: 0.8rem;
		border-bottom: 1px solid #f1f1f1;
	}
	
	.search .cancel {
		font-size: 0.3rem;
		color: #888;
		border: 0;
	}
	select {
		/*Chrome和Firefox里面的边框是不一样的，所以复写了一下*/
		border: none;
		/*很关键：将默认的select选择框样式清除*/
		appearance: none;
		-moz-appearance: none;
		-webkit-appearance: none;
		outline: none;
	}
</style>