<template>
	<div>
		<header class="header MobileHeight" style="z-index: 100!important;">
			<img class="header-left" src="../../../static/images/back@2x.png" @click="$router.go(-1)">
			<span class="header-title" style="margin-right: 0.65rem;">查询维保网点</span>
			<span class="header-right"></span>
		</header>
		<div style="height:.88rem" class="MobileHeight"></div>
		<div class="flex row around con cocenter title">
			<div class="flex row cocenter">
				<!-- 品牌 -->
				<div class="selection-show " @click="bottomPicker(1)">
					<div class="headlines">
						<div> {{brandName}} </div>
					</div>
					<div class="arrow"></div>
				</div>
			</div>
			<div class="flex row cocenter">
				<!-- 车型 -->
				<div class="selection-show" @click="bottomPicker(2)">
					<div class="headlines">
						<div> {{carName}} </div>
					</div>
					<div class="arrow"></div>
				</div>
			</div>
			<div class="flex row cocenter">
				<!-- 省份 -->
				<div class="selection-show" @click="bottomPicker(3)">
					<div class="headlines">
						<div> {{provinceName}} </div>
					</div>
					<div class="arrow"></div>
				</div>
			</div>
			<div class="flex row cocenter">
				<!--城市-->
				<div class="selection-show" @click="bottomPicker(4)">
					<div class="headlines">
						<div> {{cityName}} </div>
					</div>

					<div class="arrow"></div>
				</div>
			</div>
		</div>
		<div class="one" style="height:.1rem;"></div>
		<div class="dealer-wrapper" :style="{'-webkit-overflow-scrolling': scrollMode}">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="80" :auto-fill="false">
				<ul style="padding:.1rem .2rem" v-infinite-scroll="getNextList" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
					<li ref="dataCon" class="ul_list flex row around " v-for="(item,index) in mainbus" :key="index" @click="setUpMap(item.latitude, item.longitude, item.dealerName, item.dealerAddress)">
						<!--<div class="ul_list flex cocenter"> <img class="pic" v-lazy="imgSrc" alt=""></div>-->
						<div class="flex column around  mid">
							<span class="txt_top dian">{{item.dealerName}}</span>
							<span class="txt_m">电话： </span>
							<span class="flex row cocenter">
		                        <img style="width:.25rem;margin-right:.1rem;" src="../../../static/images/Wit/list_position_icon.png" alt="">
		                        <span class="txt_m dian" style="margin-top:.1rem">{{item.dealerAddress}}</span>
							</span>
						</div>
						<div class="cocenter flex-center">
							<div class="flex-column-align">
								<img style="width:.42rem;text-align: center;" src="../../../static/images/Wit/nav_btn.png" alt="">
								<span class="txt_m" style="margin-top:.2rem">{{ Number(item.juli) | toFixed(2)}}km</span>
							</div>
						</div>
					</li>
				</ul>
			</mt-loadmore>
		</div>
		<p id="showAll2" style="visibility: hidden">已加载全部</p>
		<!--没有数据时,对用户进行提示-->
		<div class="dataInfo" v-if="flag" style="position: absolute;top: 50%;left: 50%;transform: translate(-50%, -50%);font-size: 0.34rem;color: #555555;">
			没有符合该条件的网点
		</div>

		<mt-popup v-model="popupVisible" position="bottom">
			<div v-show="type == 1">
				<div class="flex-center-around">
					<span></span>
					<h3 style="margin-left: 0.5rem;">选择品牌</h3>
					<span @click="confirmBrand">确定</span>
				</div>
				<mt-picker :slots="brandSlot" @change="chooseBrand" :visible-item-count="5" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem"></mt-picker>
			</div>
			<div v-show="type == 2">
				<div class="flex-center-around">
					<span></span>
					<h3 style="margin-left: 0.5rem;">选择车型</h3>
					<span @click="confirmCarType">确定</span>
				</div>

				<mt-picker :slots="carSlot" @change="chooseCar" :visible-item-count="5" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem"></mt-picker>
			</div>

			<div v-show="type == 3">
				<div class="flex-center-around">
					<span></span>
					<h3 style="margin-left: 0.5rem;">选择省</h3>
					<span @click="confirmProvince">确定</span>
				</div>
				<mt-picker :slots="provinceSlot" @change="chooseProvince" :visible-item-count="5" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
			</div>
			<div v-show="type == 4">
				<div class="flex-center-around">
					<span></span>
					<h3 style="margin-left: 0.5rem;">选择市</h3>
					<span @click="confirmCity">确定</span>
				</div>

				<mt-picker :slots="citySlot" @change="chooseCity" :visible-item-count="5" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
			</div>
		</mt-popup>
	</div>
</template>
<script>
	import { Popup } from "mint-ui";
	import { Toast } from 'mint-ui';
	export default {
		data() {
			return {
				popupVisible: false, //popup状态, false=>消失, true=>展现
				mainbus: [], //存储展示的数据维保网点列表
				searchVehicleBrandList: [], //品牌列表
				searchVehicleSeriesList: [], //车型列表
				searchCountryAreaCodeListPage: [], //省份列表
				cityList: [], //城市列表
				bustypeno: null, //车型no
				brandNo: null, //品牌Id
				city_id: null, //城市ID 
				allLoaded: false, //为真，则 bottomMethod 不会被再次触发,为false会再次触发
				scrollMode: "touch",
				loading: false, //false,触发无线滚动, true,不会触发无线滚动
				loadEnd: false, //false,再次滚动会加载更多数据, true再次滚动不会加载更多数据
				size: 10, //每页的数据长度
				current: 1, //当前页码
				latitude: null, //维度
				longitude: null, //经度,
				provinceCode: null, //   省份coed
				flag: false, //没有数据提示状态
				provinceName: '', //原生给出用户所在位置的省份
				cityName: '', //原生给出用户所在位置的城市
				brandName: '品牌', //品牌标题默认展示title
				carName: '车型', //车型标题默认展示title
				provinceId: null, //省份id
				proid: null, //第三方变量为了拿到省份id,在popup的确定按钮的回调事件中,赋值给ProvinceId,不改变逻辑
				proCode: null, //第三方变量为了拿到省份code,在popup的确定按钮的回调事件中,赋值给省份code,不改变逻辑
				cyId: null, //第三方变量为了拿到城市code,在popup的确定按钮的回调事件中,赋值给城市code,不改变逻辑
				bno: null, //第三方变量拿到品牌no
				serino: null, //第三方变量拿到车系no
				paramsProvinceName: null, //picker选中的省份名字
				paramsCityName: null, //picker选中城市名字
				paramsBrandName: null, //picker选中品牌名字
				paramsCarName: null, //picker选中车型名字
				type: 1, //唤起对应picker, 1=>品牌, 2=>车型, 3=>省份, 4=>城市
				firstcode:'',//第一次通过iso获取到的省份拿到的code
				firstno:'',//第一次默认品牌的第一个获取的到no
				brandSlot: [{ //品牌picker的数据
					flex: 1,
					values: [],
					className: "brandSlot",
					textAlign: "center"
				}],
				carSlot: [{ //车系picker的数据
					flex: 1,
					values: [],
					className: "carSlot",
					textAlign: "center"
				}],
				provinceSlot: [{ //省份picker的数据
					flex: 1,
					values: [],
					className: "provinceSlot",
					textAlign: "center"
				}],
				citySlot: [{ //城市picker的数据
					flex: 1,
					values: [],
					className: "citySlot",
					textAlign: "center"
				}]
			};
		},
		methods: {
			init() {
				this.loading = true; //第一次加载数据,没有滚动的情况下,是不可以无线滚动的
				this.loadEnd = false; //第一次加载数据,还可以继续加载
				var data = {
					"parentId": null,
					"level": 1,
					"size": 50
				}
				//请求品牌列表
				this.$http.post(Wit.searchVehicleBrandList, data).then(res => {
						const data = res.data;
						this.firstno=data.data[0].no
						if(data.code == 0) {
							this.searchVehicleBrandList = data.data;
							this.searchVehicleBrandList.forEach((item, index) => {
								this.brandSlot[0].values.push(item.brandName)
								// let data = {
								// 		no: this.firstno
								// 	}
								// 	//请求车型列表
								// 	this.$http.post(Wit.searchVehicleSeriesList, data).then(res => {
								// 		const data = res.data;
								// 		if(data.code == 0) {
								// 			this.searchVehicleSeriesList = data.data;
								// 			this.carSlot[0].values = []
								// 			this.searchVehicleSeriesList.forEach((item, index) => {
								// 				this.carSlot[0].values.push(item.seriesName)
								// 				this.carName = this.searchVehicleSeriesList[0].seriesName
								// 			})
								// 		}
								// 	})
							})

						}
					}),
					//请求省份列表   原生拿到的省份name  去对比省份列表 找到对应的省份code
					this.$http.post(Wit.searchCountryAreaCodeListPage, data).then(res => {
						const data = res.data;						
						if(data.code == 0) {
							this.searchCountryAreaCodeListPage = data.data.records;
							for(let i = 0; i < this.searchCountryAreaCodeListPage.length; i++) {
								this.provinceSlot[0].values.push(this.searchCountryAreaCodeListPage[i].name)
								if(this.searchCountryAreaCodeListPage[i].name == this.provinceName) {
									this.provinceCode = this.searchCountryAreaCodeListPage[i].code
									this.proid = this.searchCountryAreaCodeListPage[i].id
									if(this.provinceCode) {
										let datas = {
											parentId: this.proid, //传参省份的id,请求该省份的城市列表 
											level: 2
										}
										this.$http.post(Wit.searchCountryAreaCodeListPage, datas).then(res => { //请求城市列表
											const data = res.data;
											if(data.code == 0) {
												this.cityList = data.data.records;
												this.citySlot[0].values = []; //清除上一次城市的选择
												this.cityList.forEach((item, index) => {
													this.citySlot[0].values.push(item.name)
//													this.cityName = this.cityList[0].name
												})
											} else {

											}
										})
										this.mydeler() //省份code 赋值成功后 调用获取维保网点列表
									}
								}
							}

						}

					})

			},
			//获取维保网点列表
			mydeler() {
				var param = {
					brandNo: this.brandNo, //品牌no
					vehicleSeridesNo: this.bustypeno, //车系
					dealerProvinceCode: this.provinceCode, //省编码
					dealerCityCode: this.city_id, //城市id
					longitude: this.longitude, //经度
					latitude: this.latitude, //维度
					dealerType: "02",
					size: 10,
					current: 1
				}
				this.$http.post(Wit.Dealer, param).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.current = 1, //当前页码
							this.loading = false, //加载完数据可以无线滚动
							this.mainbus = data.data.records
						if(this.mainbus.length == 0) {
							this.flag = true
						} else {
							this.flag = false
						}
						if(data.data.total <= this.size) { //如果总条数小于等于请求的数据条数,不在请求加载更多
							this.loadEnd = true;
						}
					} else {
						Toast({
							message: '报错',
							position: 'middle',
							duration: 2000
						});
					}
				})
			},
			loadTop() { //列表顶部下拉刷新
				this.$refs.loadmore.onTopLoaded();
			},
			loadBottom() { //列表底部下拉刷新

			},
			getNextList() { //上拉加载更多方法
				if(this.loadEnd) {
					this.loadBottom();
					return;
				}
				this.loadEnd = true;
				this.current++;
				var data = {
					brandNo: this.brandNo, //品牌no
					vehicleSeridesNo: this.bustypeno, //车系
					dealerProvinceCode: this.provinceCode, //省编码
					dealerCityCode: this.city_id, //城市id
					longitude: this.longitude, //经度
					latitude: this.latitude, //维度
					dealerType: "02",
					size: 10,
					current: this.current
				}
				this.$http.post(Wit.Dealer, data).then(res => {
						const data = res.data;
						this.loadEnd = false;
						if(data.code == 0) {
							this.mainbus = this.mainbus.concat(data.data.records)
							var allpages = Math.ceil(data.data.total / this.size);
							if(allpages <= this.current) { //总页数小于等于已经加载过的页数时
								this.loading = true; //禁止无限滚动
								this.allLoaded = true; //不在触发方法
								this.loadEnd = true; //不在请求数据
							}
						} else {
							this.current = this.current - 1;
							Toast({
								message: '报错',
								position: 'middle',
								duration: 2000
							});
						}
					})
					.catch(err => {
						Toast({
							message: '系统异常',
							position: 'middle',
							duration: 2000
						});
					})
			},
			//公共请求，
			publicrequst() {
				this.current = 1;
				var param = {
					brandNo: this.brandNo, //品牌no
					vehicleSeridesNo: this.bustypeno, //车系
					dealerProvinceCode: this.provinceCode, //省编码
					dealerCityCode: this.city_id, //城市id
					longitude: this.longitude, //经度
					latitude: this.latitude, //维度
					dealerType: "02",
					size: 10,
					current: this.current
				}
				this.$http.post(Wit.Dealer, param).then(res => {
					if(res.data.code == 0) {
						// console.log(res.data)
						this.mainbus = []
						this.mainbus = res.data.data.records
						if(this.mainbus.length == 0) {
							this.flag = true
						} else {
							this.flag = false
						}
					}
				})
			},
			isIOSOrAndroid() { //判断ios和安卓机型的方法
				var u = navigator.userAgent,
					app = navigator.appVersion;
				var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
				var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
				if(isAndroid) {
					return "Android"
				} else if(isIOS) {
					return "IOS"
				}
			},
			setUpMap(latitude, longitude, adress, des) { //唤起原生地图
				//				console.log(latitude, longitude, adress, des)
				var system = this.isIOSOrAndroid();
				if(system == 'Android') {
					window.js2android.sendLocation2Map(latitude, longitude, adress, des)
				} else if(system == "IOS") {
					var data = {
						latitude,
						longitude,
						adress,
						des
					}
					window.webkit.messageHandlers.sendLocation2Map.postMessage(data);
				}
			},
			getIosLocation(locationMes) { //IOS调用,H5获取ios定位信息
				this.provinceName = JSON.parse(locationMes).province.replace('自治区', '').replace('省', '').replace('市', '').replace('壮族', '').replace('回族', '')
				this.cityName = JSON.parse(locationMes).city
				this.latitude = JSON.parse(locationMes).latitude //精
				this.longitude = JSON.parse(locationMes).longitude //韦

			},
			bottomPicker(type) { //激活pupop
				this.popupVisible = true
				this.type = type
			},
			chooseBrand(picker, values) {
				this.paramsBrandName = values.join('')
				this.searchVehicleBrandList.forEach((item, index) => {
					if(item.brandName == this.paramsBrandName) {
						this.bno = item.no
					}
				})

			},
			chooseCar(picker, values) {
				this.paramsCarName = values.join('')
				this.searchVehicleSeriesList.forEach((item, index) => {
					if(item.seriesName == this.paramsCarName) {
						this.serino = item.no
					}
				})
			},
			chooseProvince(picker, values) {
				this.paramsProvinceName = values.join('')
				this.searchCountryAreaCodeListPage.forEach((item, index) => {
					if(item.name == this.paramsProvinceName) {
						this.proid = item.id //获取当前省份的id,以便获取市列表
						this.proCode = item.code
					}
				})
			},
			chooseCity(picker, values) {
				this.paramsCityName = values.join('')
				this.cityList.forEach((item, index) => {
					if(item.name == this.paramsCityName) {
						this.cyId = item.code
					}
				})
			},
			confirmBrand() { //确定品牌
				this.popupVisible = false; //隐藏popup
				this.brandName = this.paramsBrandName //品牌标题替换为picker选择的品牌
				this.brandNo = this.bno  //改变维保网点列表请求 品牌参数brandNo

				let data = {
					no: this.bno
				}
				//请求车型列表
				this.$http.post(Wit.searchVehicleSeriesList, data).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.searchVehicleSeriesList = data.data; //车型数据
						this.carSlot[0].values = []  //清空上一次picker的数据
						this.searchVehicleSeriesList.forEach((item, index) => {
							this.carSlot[0].values.push(item.seriesName) //车型数据放入到车型picker中
							this.carName = this.searchVehicleSeriesList[0].seriesName  //车型标题替换为车型第一个
							this.bustypeno = this.searchVehicleSeriesList[0].no //改变维保网点列表请求 车系参数bustypeno 
							this.publicrequst(); //请求该品牌第一个车型维保网点列表
						})
					}
				})
			},
			confirmCarType() {
				this.popupVisible = false; //隐藏popup
				this.carName = this.paramsCarName
				this.bustypeno = this.serino
				this.publicrequst()
			},
			confirmProvince() {
				this.popupVisible = false; //隐藏popup
				this.provinceName = this.paramsProvinceName //省份标题替换为picker选择的省份
				this.provinceCode = this.proCode //改变维保网点列表请求 省份参数provinceCode
				let data = {
					parentId: this.proid, //传参省份的id,请求该省份的城市列表 
					level: 2
				}
				this.$http.post(Wit.searchCountryAreaCodeListPage, data).then(res => { //请求城市列表
					const data = res.data;
					if(data.code == 0) {
						this.cityList = data.data.records;
						console.log(this.cityList)
						this.citySlot[0].values = []; //清除上一次城市的选择
						this.cityList.forEach((item, index) => {
							this.citySlot[0].values.push(item.name)  //城市数据放入picker中
							this.cityName = this.cityList[0].name //替换为城市数据的第一个数据
							this.city_id = this.cityList[0].code //改变维保网点列表请求 城市参数city_id
							this.publicrequst() //请求该省份第一个城市的维保网点列表
						})
					} else {

					}
				})
				
			},
			confirmCity() {
				this.popupVisible = false; //隐藏popup
				this.cityName = this.paramsCityName
				this.city_id = this.cyId
				this.publicrequst() //请求该省份的维保网点列表
			}
		},
		mounted() {
			this.init()
			$(".MobileHeight").css({
				"borderTopWidth": this.$store.state.mobileStatusBar,
				"borderTopColor": "#fff",
			})
		},
		created() {
			window.getIosLocation = this.getIosLocation //ios获取定位信息,放到window对象供ios调用			
			var system = this.isIOSOrAndroid();
			if(system == 'Android') {
				var Position = js2android.getLocationInfo() //获取安卓定位信息
				var NewPosition = JSON.parse(Position)
				this.provinceName = NewPosition.province.replace('自治区', '').replace('省', '').replace('市', '').replace('壮族', '').replace('回族', '') //省
				this.cityName = NewPosition.city //市
				this.latitude = NewPosition.latitude //经度
				this.longitude = NewPosition.longitude //纬度
			} else if(system == "IOS") {
				window.webkit.messageHandlers.iOSLocationNotice.postMessage({}); //调用ios方法发送通知ios调用H5方法传
			}
		},
		filters: {
			toFixed(input, param1) { //可以有好多的自定义过滤器，这里的this指向的是window
				return input.toFixed(param1)
			}
		}
	};
</script>
<style scoped>
	/*配合原生做沉浸式开发设置border-top*/
	
	.MobileHeight {
		border-top-style: solid;
		box-sizing: content-box;
	}
	/*没有数据时,提示样式*/
	
	.dataInfo {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		font-size: 0.34rem;
		color: #555555;
	}
	
	.flex-center {
		/*水平垂直居中*/
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	.flex-column-align {
		/*竖直方向水平居中*/
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	.flex-between {
		/*两边对齐*/
		display: flex;
		justify-content: space-between;
	}
	
	.flex-center-around {
		/*水平垂直居中-平均对齐*/
		display: flex;
		justify-content: space-around;
		align-items: center;
		padding-top: 0.2rem;
	}
	
	.row {
		flex-direction: row;
	}
	
	.title {
		/*position: fixed;
		height: 0.88rem;
		line-height: 0.88rem;*/
	}
	
	.con>div {
		position: relative;
		height: 0.88rem;
		width: 1.5rem;
	}
	
	.con div img {
		width: 0.4rem;
		display: block;
	}
	
	.one {
		background: linear-gradient(#f7f7f7, #f9f9f9);
	}
	
	.dealer-wrapper {
		min-height: 100%;
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
		/*overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;*/
		width: 5rem;
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
	
	.selection-component {
		position: relative;
		display: inline-block;
	}
	
	.selection-show {
		position: relative;
		cursor: pointer;
		height: 100%;
		width: 100%;
		line-height: 0.88rem;
		background: #fff;
	}
	
	.selection-show>.headlines {
		position: absolute;
		left: 50%;
		width: 70%;
		height: 100%;
		line-height: 0.88rem;
		margin-left: -35%;
	}
	
	.selection-show>.headlines>div {
		position: absolute;
		/*display: block;*/
		width: 1.1rem;
		height: 90%;
		overflow: hidden;
		white-space: nowrap;
		text-overflow: ellipsis;
	}
	
	.selection-show>.arrow {
		display: inline-block;
		width: 0;
		height: 0;
		border-left: 4px solid transparent;
		border-right: 4px solid transparent;
		border-top: 5px solid #e3e3e3;
	}
	
	.flex-center-around h3 {
		text-align: center;
		font-size: 0.36rem;
		color: #222;
	}
	
	.flex-center-around span {
		color: #49bbff;
		font-size: 0.28rem;
	}
</style>