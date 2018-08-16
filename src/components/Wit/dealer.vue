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
				<!-- 品牌 -->
				<div class="selection-show" @click="toggleDrop">
					<span> {{searchVehicleBrandList[nowIndex] && searchVehicleBrandList[nowIndex].brandName}} </span>
					<span v-if="brandState">品牌</span>
					<div class="arrow"></div>
				</div>
				<div class="selection-list" v-if="isDrop">
					<ul>
						<li v-for="(item,index) in searchVehicleBrandList" :key="index" @click="chooseSelection(index, item.no)">{{item.brandName}}</li>
					</ul>
				</div>
			</div>
			<div class="flex row cocenter">
				<!-- 车型 -->
				<div class="selection-show" @click="toggleCar">
					<span> {{searchVehicleSeriesList[carIndex] && searchVehicleSeriesList[carIndex].seriesName}} </span>
					<span v-if="carState">车型</span>
					<div class="arrow"></div>
				</div>
				<div class="selection-list" v-if="carDrop">
					<ul>
						<li v-for="(item,index) in searchVehicleSeriesList" :key="index" @click="chooseCarType(index)">{{item.seriesName}}</li>
					</ul>
				</div>
			</div>
			<div class="flex row cocenter">
				<!-- 省份 -->
				<div class="selection-show" @click="toggleProvin">
					<span> {{searchCountryAreaCodeListPage[provinIndex] && searchCountryAreaCodeListPage[provinIndex].name}} </span>
					<span v-if="provinceState">省份</span>
					<div class="arrow"></div>
				</div>
				<div class="selection-list" v-if="provinceDrop">
					<ul>
						<li v-for="(item,index) in searchCountryAreaCodeListPage" :key="index" @click="chooseProvinType(index, item.id)">{{item.name}}</li>
					</ul>
				</div>
			</div>
			<div class="flex row cocenter">
				<!--城市-->
				<div class="selection-show" @click="toggleCity">
					<span> {{cityList[cityIndex] && cityList[cityIndex].name}} </span>
					<span v-if="cityState">城市</span>
					<div class="arrow"></div>
				</div>
				<div class="selection-list" v-if="cityDrop">
					<ul>
						<li v-for="(item,index) in cityList" :key="index" @click="chooseCityType(index, item.id)">{{item.name}}</li>
					</ul>
				</div>
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
	import selectCompon from '../publicmodel/SelectCompon'
	export default {
		data() {
			return {
				popupVisible: false,
				mainbus: {}, //存储展示的数据经销商列表
				searchVehicleBrandList: [], //品牌列表
				searchVehicleSeriesList: [], //车型列表
				searchCountryAreaCodeListPage: [], //省份列表
				cityList: [], //城市列表
				seriesNo: '', //车型Id
				brandNo: '', //品牌Id
				provinceId: '', //省份id
				cityId: '', //城市id
				isDrop: false, //品牌下拉
				carDrop: false, //车型下拉
				provinceDrop: false, //省份下拉
				cityDrop: false, //城市下拉
				nowIndex: 0,  //品牌index
				carIndex: 0, //车型index
				provinIndex: 0, //身份index
				cityIndex: 0, //城市index
				brandState: true, //品牌伪标题状态
				carState: true, //车型伪标题状态 
				provinceState: true, //省份伪标题状态
				cityState: true //城市伪标题状态
			};
		},
		components: {
			selectCompon
		},
		methods: {
			init() {
				var param = {}
				var data = {
					"parentId": null,
					"level": 1
				}
				//请求品牌列表
				this.$http.post(Wit.searchVehicleBrandList, data,this.$store.state.mytoken).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.searchVehicleBrandList = data.data;
					}
				})
				//经销商
				this.$http.post(Wit.Dealer, param,this.$store.state.mytoken).then(res => {
						if(res.data.code == 0) {
							this.mainbus = res.data.data.records
						}
					}),
				//请求省份列表
				this.$http.post(Wit.searchCountryAreaCodeListPage, data,this.$store.state.mytoken).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.searchCountryAreaCodeListPage = data.data.records;
//						console.log(this.searchCountryAreaCodeListPage)
					}
				})
			},
			search() {
				this.popupVisible = true;
			},
			cancel() {
				this.popupVisible = false;
			},
			toggleDrop() {//改变品牌下拉状态
				this.isDrop = !this.isDrop;
				this.brandState = false;
			},
			toggleCar () {//改变车型下拉状态
				this.carDrop = !this.carDrop;
				this.carState = false;
			},
			toggleProvin () { //改变省份下拉状态
				this.provinceDrop = !this.provinceDrop;
				this.provinceState = false;
			},
			toggleCity () { //改变城市下拉装填
				this.cityDrop = !this.cityDrop
				this.cityState = false;
			},
			chooseSelection (ind, val) {//选择品牌
				 this.nowIndex = ind;
                 this.isDrop = false;
                 this.brandNo = val
			},
			chooseCarType (ind) {//选择车型
				this.carIndex = ind;
				this.carDrop = false
			},
			chooseProvinType (ind, val) {//选择省份
				 this.provinIndex = ind;
				 this.provinceId = val;
				 this.provinceDrop = false;
			},
			chooseCityType (ind) {//选择城市
				this.cityIndex = ind;
				this.cityDrop = false;
			}

		},
		mounted() {
			this.init()
		},
		watch: {
			brandNo(newVal, oldVal) {//监听品牌id,获得车型列表
				let data = {
					brandNo: this.brandNo
				}
				//请求车型列表
				this.$http.post(Wit.searchVehicleSeriesList, data,this.$store.state.mytoken).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.searchVehicleSeriesList = data.data;
					}
				})

			},
			provinceId(newVal, oldVal) { //监听省,获取市列表
				let data = {
					parentId: this.provinceId, //被检测的省份id 
					level: 2
				}
				this.$http.post(Wit.searchCountryAreaCodeListPage, data,this.$store.state.mytoken).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.cityList = data.data.records;
					} else {
						alert(data.msg)
					}
				})
			}
		}
	};
</script>
<style scoped>
	.row {
		flex-direction: row;
	}
	
	.con div {
		position: relative;
		height: 0.88rem;
		width:1.5rem
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
	
	.title {}
	
	.selection-component {
		position: relative;
		display: inline-block;
	}
	
	.selection-show {
		/*position: relative;*/
		display: inline-block;
		padding: 0 20px 0 10px;
		cursor: pointer;
		height: 100%;
		line-height: 0.84rem;
		border-radius: 3px;
		background: #fff;
	}
	
	.selection-show span {
		position: absolute;
		top: 0;
		left: 0;
		width: 1.4rem;
		height: 100%;
		background: #fff;
		text-align: center;
		margin-left:.2rem;
	}
	
	.selection-show .arrow {
		display: inline-block;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 5px solid #e3e3e3;
		width: 0;
		height: 0;
		margin-top: -1px;
		margin-left: 0;
		margin-right: -14px;
		vertical-align: middle;
	}
	
	.selection-list {
		display: inline-block;
		position: absolute;
		left: -0.5rem;
		top: 0.8rem;
		background: #fff;
		border-top: 1px solid #e3e3e3;
		border-bottom: 1px solid #e3e3e3;
		z-index: 5;
	}
	
	.selection-list li {
		padding: 5px 15px 5px 10px;
		border-left: 1px solid #e3e3e3;
		border-right: 1px solid #e3e3e3;
		cursor: pointer;
		background: #fff;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.selection-list li:hover {
		background: #e3e3e3;
	}
</style>