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
						<li v-for="(item,index) in searchVehicleSeriesList" :key="index" @click="chooseCarType(index,item.no)">{{item.seriesName}}</li>
					</ul>
				</div>
			</div>
			<div class="flex row cocenter">
				<!-- 省份 -->
				<div class="selection-show" @click="toggleProvin">
					<span> {{searchCountryAreaCodeListPage[provinIndex] && searchCountryAreaCodeListPage[provinIndex].name}} </span>
					<span v-if="provinceState">{{cityname}}</span>
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
					<span v-if="cityState">{{citysi}}</span>
					<div class="arrow"></div>
				</div>
				<div class="selection-list" v-if="cityDrop">
					<ul>
						<li v-for="(item,index) in cityList" :key="index" @click="chooseCityType(index, item.id)">{{item.name,item.id}}</li>
					</ul>
				</div>
			</div>
		</div>
		<div class="one" style="height:.1rem;"></div>
		<div :style="{'-webkit-overflow-scrolling': scrollMode}">
			<mt-loadmore :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="80" :auto-fill="false">
				<ul class="" style="padding:.1rem .2rem" v-infinite-scroll="getNextList" infinite-scroll-disabled="loading" infinite-scroll-distance="80">
					<li class="ul_list flex row around " v-for="(item,index) in mainbus" :key="index" @click="search()">
						<div class="ul_list flex cocenter"> <img class="pic" src="../../../static/images/Wit/bg-mine.png" alt=""></div>
						<div class="flex column around  mid">
							<span class="txt_top dian">{{item.dealerName}}</span>
							<span class="txt_m">电话： </span>
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
			</mt-loadmore>
		</div>
		
		
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
	import { Toast } from 'mint-ui';
	import selectCompon from '../publicmodel/SelectCompon'
	export default {
		data() {
			return {
				popupVisible: false,
				mainbus: [], //存储展示的数据经销商列表
				searchVehicleBrandList: [], //品牌列表
				searchVehicleSeriesList: [], //车型列表
				searchCountryAreaCodeListPage: [], //省份列表
				cityList: [], //城市列表
				seriesNo: null, //车型Id
				bustypeno:null,//车型no
				brandNo: null, //品牌Id
				provinceId: null, //省份id
				cityId: '', //城市id
				city_id:null,//城市ID 
				isDrop: false, //品牌下拉
				carDrop: false, //车型下拉
				provinceDrop: false, //省份下拉
				cityDrop: false, //城市下拉
				nowIndex: 0,  //品牌index
				carIndex: 0, //车型index
				provinIndex: 0, //省份index
				cityIndex: 0, //城市index
				brandState: true, //品牌伪标题状态
				carState: true, //车型伪标题状态 
				provinceState: true, //省份伪标题状态
				cityState: true ,//城市伪标题状态
				cityname:'',//默认省
				citysi:'',//默认市
				allLoaded: false, //为真，则 bottomMethod 不会被再次触发,为false会再次触发
				scrollMode: "auto",
				loading: false,  //false,触发无线滚动, true,不会触发无线滚动
				loadEnd:false, //false,再次滚动会加载更多数据, true再次滚动不会加载更多数据
				size: 10, //每页的数据长度
				current: 1 //当前页码
				
			};
		},
		components: {
			selectCompon
		},
		methods: {
			init() {
	          	this.loading=true;   //第一次加载数据,没有滚动的情况下,是不可以无线滚动的
          		this.loadEnd=false;  //第一次加载数据,还可以继续加载
				var param = {
					brandNo:this.brandNo,//品牌no
					vehicleSeridesNo:this.bustypeno,//车系
				  	dealerProvinceCode: this.provinceId,//省编码
					dealerCityCode:this.city_id,//城市id
					dealerType:"01",
					size: 10,
					current: 1
					}
					
				var data = {
					"parentId": null,
					"level": 1
				}
				//请求品牌列表
				this.$http.post(Wit.searchVehicleBrandList, data).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.searchVehicleBrandList = data.data;
					}
				})
				//经销商
			
				 this.$http.post(Wit.Dealer, param).then(res => {
				 	const data = res.data;
				  		if(data.code == 0) {
				  			this.current = 1, //当前页码
				  			this.loading = false , //加载完数据可以无线滚动
							this.mainbus = data.data.records
							if (data.data.total <= this.size) { //如果总条数小于等于请求的数据条数,不在请求加载更多
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
				 	.catch( err => {
				 		Toast({
							message: '系统异常',
							position: 'middle',
							duration: 2000
						});
				 	})
				 ,
				//请求省份列表
				this.$http.post(Wit.searchCountryAreaCodeListPage, data).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.searchCountryAreaCodeListPage = data.data.records;
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
				if (this.carDrop || this.provinceDrop || this.cityDrop) { //对其它下拉列表的判断,只显示一个下拉列表
					this.carDrop = false;
					this.provinceDrop = false;
					this.cityDrop = false ;
				}
			},
			toggleCar () {//改变车型下拉状态
				this.carDrop = !this.carDrop;
				this.carState = false;
				if (this.isDrop || this.provinceDrop || this.cityDrop) {  
					this.isDrop = false;
					this.provinceDrop = false;
					this.cityDrop = false;
				}
			},
			toggleProvin () { //改变省份下拉状态
				this.provinceDrop = !this.provinceDrop;
				this.provinceState = false;
				if (this.cityDrop || this.carDrop || this.isDrop) {
					this.cityDrop = false;
					this.carDrop = false;
					this.isDrop = false;
				}
			},
			toggleCity () { //改变城市下拉装填
				this.cityDrop = !this.cityDrop
				this.cityState = false;
				if (this.provinceDrop || this.isDrop || this.carDrop) {
					this.provinceDrop = false;
					this.isDrop = false;
					this.carDrop = false;
				}
			},
			chooseSelection (ind, val) {//选择品牌
			     this.nowIndex = ind;
                 this.isDrop = false;
				 this.brandNo = val
				 this.publicrequst()
		  	},
			chooseCarType (ind,val) {//选择车型
			this.bustypeno=val
				this.carIndex = ind;
				this.carDrop = false
				this.publicrequst()
			},
			chooseProvinType (ind, val) {//选择省份
				 this.provinIndex = ind;
				 this.provinceId = val;
				 this.provinceDrop = false;
				 this.publicrequst()
			},
			chooseCityType (ind,val) {//选择城市
			     this.city_id=val
				this.cityIndex = ind;
				this.cityDrop = false;
				 this.publicrequst()
			},
			loadTop () { //列表顶部下拉刷新
				var param={
					brandNo:this.brandNo,//品牌no
					vehicleSeridesNo:this.bustypeno,//车系
				  	dealerProvinceCode: this.provinceId,//省编码
					dealerCityCode:this.city_id,//城市id
          			dealerType:"01",
					size: 10,
					current: this.current
                }
				this.$http.post(Wit.Dealer, param).then(res => {
				 	const data = res.data;
				  		if(data.code == 0) {
				  			this.current = 1, //当前页码
				  			this.loading = false , //加载完数据可以无线滚动
							this.mainbus = data.data.records
							if (data.data.total <= this.size) { //如果总条数小于等于请求的数据条数,不在请求加载更多
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
				 	.catch( err => {
				 		Toast({
							message: '系统异常',
							position: 'middle',
							duration: 2000
						});
				 	})
          		this.$refs.loadmore.onTopLoaded();
			},
			loadBottom () { //列表底部下拉刷新
				
			},
			getNextList () { //上拉加载更多方法
				
				if(this.loadEnd){
		            this.loadBottom();
		            return;
		       }
				this.loadEnd=true;
          		this.current++;
          		var data = {
          			brandNo:this.brandNo,//品牌no
					vehicleSeridesNo:this.bustypeno,//车系
				  	dealerProvinceCode: this.provinceId,//省编码
					dealerCityCode:this.city_id,//城市id
          			dealerType:"01",
					size: 10,
					current: this.current
          		}
				this.$http.post(Wit.Dealer, data).then(res => {
				 	const data = res.data;
				 	this.loadEnd=false;
				  		if(data.code == 0) {
//				  			console.log(this.mainbus)
				  			console.log(data.data.records)
				  			this.mainbus = this.mainbus.concat(data.data.records) 
//				  			console.log(this.mainbus)
				  			var allpages = Math.ceil(data.data.total/this.size);
							if (allpages <= this.current) {
								this.loading = true;   //禁止无限滚动
				                this.allLoaded = true; //不在触发方法
				                this.loadEnd = true;  //不在请求数据
//				                  $("#showAll2").show();
							}
						} else {
							this.current = this.current -1;
							Toast({
								message: '报错',
								position: 'middle',
								duration: 2000
							});
						}
					})
				 	.catch( err => {
				 		Toast({
							message: '系统异常',
							position: 'middle',
							duration: 2000
						});
				 	})
			},
			//公共请求，
			  publicrequst(){
			  	  this.current = 1;
				  var param={
					brandNo:this.brandNo,//品牌no
					vehicleSeridesNo:this.bustypeno,//车系
				  	dealerProvinceCode: this.provinceId,//省编码
					dealerCityCode:this.city_id,//城市id
					dealerType:"01",
					size: 10,
					current: this.current
                }
			    this.$http.post(Wit.Dealer, param).then(res=>{
                      if(res.data.code == 0) {
						    this.mainbus=[]
							this.mainbus = res.data.data.records
						}
				})
			  }

		},
		mounted() {
			this.init()
		},
		created(){
			var Position=js2android.getLocationInfo()//获取定位信息
			var NewPosition= JSON.parse(Position)
			this.cityname=NewPosition.city
			this.citysi=NewPosition.city
		},
		watch: {
			brandNo(newVal, oldVal) {//监听品牌id,获得车型列表
		  	let data = {
					no: this.brandNo
				}
//		  	this.mainbus=[]
			  //请求车型列表
				this.$http.post(Wit.searchVehicleSeriesList, data).then(res => {
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
				this.$http.post(Wit.searchCountryAreaCodeListPage, data).then(res => {
					const data = res.data;
					if(data.code == 0) {
						this.cityList = data.data.records;
					} else {
						// alert(data.msg)
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
	    overflow: hidden;
    	white-space: nowrap;
    	text-overflow: ellipsis;
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