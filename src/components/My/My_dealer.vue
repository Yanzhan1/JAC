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
                    <div style="width:2.56rem;height:1.68rem;border-radius:6px;overflow:hidden">
                        <img style="width:100%;height:1.68rem" src="../../../static/images/Wit/bg-mine.png" alt="">
                    </div>
                    <div class="flex column around" style="width:3rem">
                        <span style="font-size:.29rem;color:#222;" class="mui-ellipsis-2">{{item.shortDealerName}}</span>
                        <span style="font-size:.23rem;color:#888;">电话：{{item.receiveMessagePhone}}</span>
                        <span class="flex row cocenter">
                            <img style="width:.19rem;height:.22rem;margin-right:.1rem;" src="../../../static/images/Wit/list_position_icon.png" alt="">
                            <span style="font-size:.23rem;color:#888;" class="mui-ellipsis-2">{{item.dealerAddress}}</span>
                        </span>
                    </div>
                    <div class="flex column between cocenter" style="padding:.1rem 0">
                        <span style="font-size:.19rem;color:#888;">0.3km</span>
                        <img @click="search()" style="width:.42rem;" src="../../../static/images/Wit/nav_btn.png" alt="">
                    </div>
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
      mydealer:{}//我的经销
    };
  },
  methods: {
    search() {
      this.popupVisible = true;
    },
    cancel() {
      this.popupVisible = false;
    },
    //我的经销商列表
    GetMyDealer() {
        var param={
           current:2,
           size:20
        }
        this.$http.post(Wit.MyDealer,param).then(res=>{
         if(res.data.code==0){
             this.mydealer=res.data.data.records
          }
        })
      }
  },
   created(){
        this.GetMyDealer()
    }
};
</script>
<style scoped>
.mui-ellipsis-2 {
    display: -webkit-box;
    overflow: hidden;
    white-space: normal!important;
   text-overflow: ellipsis;
   word-wrap: break-word;   -webkit-line-clamp: 1;
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
</style>

