<template>
  <div>
    <header class="header">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">我的经销商</span>
      <span class="header-right"></span>
    </header>
    <div style="height:.88rem"></div>
   
        <ul v-for="(item,index) in mydealer" :key="index" class="flex column " style="padding:.3rem;border-bottom:.1rem solid #f5f5f5">
          <div class="titles">{{item.seriesName}}</div>
          <li class="flex column" v-for="(item,index) in item.departmentDeforeAndAfterSales" :key="index">
            <p class="mydelar" v-if="item.dealerType=='01'">购车经销商</p>
            <p class="mydelar" v-if="item.dealerType=='02'">维保经销商</p>
            <div class="flex row between" style="border-bottom:1px solid #f1f1f1;padding:.2rem 0">
              <!-- <div style="width:2.56rem;height:1.68rem;border-radius:6px;overflow:hidden">
                <img style="width:100%;height:1.68rem" v-lazy="imgSrc" alt="">
              </div> -->
              <div class="flex column around" style="width:3rem;height:1.5rem">
                <span style="font-size:.29rem;color:#222;" class="mui-ellipsis-2">{{item.dealerName}}</span>
                <span style="font-size:.23rem;color:#888;">电话：{{item.receiveMessagePhone}}</span>
                <span class="flex row cocenter">
                  <img style="width:.19rem;height:.22rem;margin-right:.1rem;" src="../../../static/images/Wit/list_position_icon.png" alt="">
                  <span style="font-size:.23rem;color:#888;" class="mui-ellipsis-2">{{item.dealerAddress}}</span>
                </span>
              </div>
              <div class="cocenter flex-center" style="padding:.1rem 0">
              	<div class="flex-column-align">
              		<img @click="search(item.latitude, item.longitude, item.dealerName, item.dealerAddress)" style="width:.42rem;" src="../../../static/images/Wit/nav_btn.png" alt="">
              		<span style="font-size:.19rem;color:#888;margin-top:.3rem">0.3km</span>
              	</div>               
              </div>
            </div>
          </li>

        </ul>
      
  </div>
</template>
<script>
import { Popup } from "mint-ui";
export default {
  data() {
    return {
      popupVisible: false,
      mydealer: {}, //我的经销
      size: 10,
      current: 1,
      topStatus: "",
      imgSrc: '../../../static/images/Wit/bg-mine.png'
    };
  },
  methods: {
     search(latitude, longitude, adress, des) {
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
    cancel() {
      this.popupVisible = false;
    },
  
    //我的经销商列表
    GetMyDealer() {
     
      this.loading = true;
      this.loadEnd = false;
      var param = {
        // current: 1,
        // size: this.size,
        userNo:this.$store.state.userId
      };
      this.$http.post(My.MyDealer, param).then(res => {
        if (res.data.code == 0) {
           this.mydealer = res.data.data;
       }
      });
    },
 
  },
  mounted() {
    this.GetMyDealer();
  }
};
</script>
<style scoped>
	.flex-center{/*水平垂直居中*/
	  display: flex;
	  justify-content: center;
	  align-items: center;
	}
	.flex-column-align{/*竖直方向水平居中*/
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	}
.mui-ellipsis-2 {
  display: -webkit-box;
  overflow: hidden;
  white-space: normal !important;
  text-overflow: ellipsis;
  word-wrap: break-word;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
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
.titles {
  font-size: 0.29rem;
  color: #555;
}
.mydelar {
  width: 6.9rem;
  color: #fff;
  line-height: 0.5rem;
  padding-left: 0.3rem;
  background-color: #49bbff;
  margin-top: 0.33rem;
}
img[lazy=loading] {
  /*height: 100px;*/
  /*margin: auto;*/
  background: url("../../../static/images/Wit/ceshi.1.jpg") no-repeat fixed center;
}
</style>

