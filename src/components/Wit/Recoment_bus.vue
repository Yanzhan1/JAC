<template>
  <div>
    <header class="header MobileHeight bgcolor">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.push('/wit')">
      <div id="tip">
        <span class="header-title" :class="type==1?'active':''" style="margin-right:.2rem" @click="getcarbus(1)">全部车型</span>
        <span class="header-title" :class="type==2?'active':''" @click="getcarbus(2)">主推车型</span>
      </div>
      <span @click="shai()" class="header-right" style="margin-right: .65rem;"><img src="../../../static/images/Wit/shaixuan1@3x.png" alt="" style="width:.4rem"></span>
    </header>
    <div style="height:.88rem" class="MobileHeight"></div>
    <ul>
      <li class="bus_li" v-for="(item,index) in this.mainbus" :key="index" @click="tode(item)">
        <img :src="item.imgUrl" alt="">
        <div class="bus_1" v-if="item.guidancePriceStart>0">
          <div>
            <img :src="'./../../../static/images/Wit/dingzi.png'" alt="">
            <span class="bus_2">{{item.seriesName}}</span>
          </div>
          <div>
            <span class="bus_3"  >
              <div> 官方指导价:</div> {{item.guidancePriceStart}}万起</span>
          </div>
        </div>
        <div class="bus_n" v-else>
          <div>
            <img :src="'./../../../static/images/Wit/dingzi.png'" alt="">
            <span class="bus_2">{{item.seriesName}}</span>
          </div>
        </div>
        <!-- <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem"> -->
      </li>
    </ul>
    <mt-popup v-model="popupVisible" position="middle">
     
       <div >
        <div style="width:100%;text-align:center;line-height:.88rem;font-size:.36rem;color:#555555;border-bottom:1px solid #f1f1f1">
          系列
        </div>
        <div class="flex row cocenter roe">
          <label><input type="radio" v-model="gender" :value="null" /></label>
          <span class="txt" style="margin-left:.1rem">全选</span>
        </div>
        <ul class="flex row wrap between">
          <li class="flex row cocenter list_li" v-for="(item,index) in good_list" :key="index">
            <label><input type="radio" v-model="gender" :value="item.no" /></label>
            <span class="txt" style="margin-left:.1rem">{{item.brandName}}</span>
          </li>
        </ul>
        <div class="fot">
          <p class="pp" style="" @click="fn(1)">取消</p>
          <p class="sure" style="" @click="fn(2)">确定</p>
        </div>
      </div>
    </mt-popup>
  </div>
</template>
<script>
import { Popup } from "mint-ui";
import { Radio } from "mint-ui";
export default {
  data() {
    return {
      popupVisible: false,
      selected_all: false,
      type: 1,
      highlyRecommend: "", //全部车型 传1 主推车型
      mainbus: {}, //存储展示的数据 主推车型 全部车型
      choosebus: {}, //选择频道
      arr: [],
      gender: "", //主推车型 选中的No
      good_list: [],
      gender: this.$store.state.busNo, //主推车型全选默认选中，
      no:''
     };
  },
  methods: {
    shai() {
      this.popupVisible = true;
    },
    tode(item) {
     this.$store.dispatch("NONAME", item);
     this.$store.state.shownum=2
      this.$router.push({
        name: "车系特色",
        params: {
          }
      });
    },
//切换频道
    fn(num) {
      if (num == 2) {
       var arr = this.arr;
       if(this.type==1){
          var param = {
          highlyRecommend: this.highlyRecommend,
          no: this.gender ,//全部车型
          };   
          this.$store.state.busNo=this.gender
       }else{
          var param = {
          highlyRecommend: this.highlyRecommend,
          no: this.gender//主推车型
        };   
        this.$store.state.busNo=this.gender
       }
       this.$http.post(Wit.MainBus, param).then(res => {
          if (res.data.code == 0) {
            var arr = res.data.data;
           
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].imageRelationVO.length > 0) {
                for (let j = 0; j < arr[i].imageRelationVO.length; j++) {
                  if (arr[i].imageRelationVO[j].isDefault == 1) {
                    arr[i].imgUrl = arr[i].imageRelationVO[j].imageUrl;

                   } 
                }
             } else {
                arr[i].imgUrl = "";
              }
            }
            this.mainbus = {};
             
            this.mainbus = arr;
          }
        });
      
      } else {
         this.popupVisible = false;
      }
      this.popupVisible = false;
    },
    //渲染列表   1
    getcarbus(num) {
    if (num == 1) {
      let time=new Date().getTime()
      let params={
        "uid":this.$store.state.userId,
        "start_time":time,
        "sign":this.$store.state.sign,
        "moduleName":"allCar"
      }
        this.$http.post(POINT.addpoint,params).then((res)=>{
            console.log(res)
        }).catch((err)=>{

        })
        //等于1 传“” 。 获取全部车型
        this.type = 1;
        this.highlyRecommend = "";
        this.no=this.gender
      } else {
          let time=new Date().getTime()
          let params={
            "uid":this.$store.state.userId,
            "start_time":time,
            "sign":this.$store.state.sign,
            "moduleName":"recommendCar"
          }
            this.$http.post(POINT.addpoint,params).then((res)=>{
                console.log(res)
            }).catch((err)=>{

            })
        this.type = 2; //等于2 传“1” 。 获取主推车型
        this.highlyRecommend = "1";
        this.no=this.gender
      }
      var param = {
        highlyRecommend: this.highlyRecommend,
        no:this.no
      };
   this.$http.post(Wit.MainBus, param).then(res => {
        if (res.data.code == 0) {
          var arr = res.data.data;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].imageRelationVO.length > 0) {
              for (let j = 0; j < arr[i].imageRelationVO.length; j++) {
                if (arr[i].imageRelationVO[j].isDefault == 1) {
                  arr[i].imgUrl = arr[i].imageRelationVO[j].imageUrl;
                  } 
               }
             } else {
              arr[i].imgUrl = "";
            }
          }
          this.mainbus = {};
          this.mainbus = arr;
        }
      });
    },
    //切换频道 多选框
    choosemore() {
      var param = {};
      this.$http.post(Wit.Switching, param).then(res => {
        if (res.data.code == 0) {
          this.choosebus = res.data.data;
          for (let i = 0; i < this.choosebus.length; i++) {
            this.choosebus[i].is_selected = false;
          }
        }
        this.good_list = this.choosebus;
      });
    }
  },
  created() {
    //获取全部车型，主推车型
    this.getcarbus();
    this.choosemore();
   
  },
  mounted(){
  	
     $(".MobileHeight").css({
				"borderTopWidth": this.$store.state.mobileStatusBar,
				"borderTopColor": "#fff",
			})
  }
};
</script>
 <style scoped>
 	.MobileHeight {  
		border-top-style: solid;
		box-sizing: content-box;
	}
.mint-popup {
  width: 80%;
}
.bgcolor{
  background: #fff;
}
.fot {
  position: relative;
  width: 100%;
  display: flex;
  text-align: center;
  padding: 0.3rem;
}
.pp {
  felx: 1;
  width: 100%;
  font-size: 0.32rem;
  color: #888888;
}
.sure {
  felx: 1;
  width: 100%;
  font-size: 0.32rem;
  color: #49bbff;
}
.pp:after {
  content: "";
  position: absolute;
  right: 3rem;
  top: 0.2rem;
  width: 0.01rem;
  height: 0.6rem;
  background-color: #f1f1f1;
}
.row {
  flex-direction: row;
}
.wrap {
  flex-wrap: wrap;
  border-bottom: 1px solid #f1f1f1;
}
.wrap li:nth-of-type(odd) {
  margin-left: 0.8rem;
}
.roe {
  margin-left: 0.8rem;
  line-height: 0.88rem;
}

.header-title {
  height: 0.88rem;
  line-height: 0.88rem;
  font-size: 0.36rem;
  color: #ccc;
}
.active {
  color: #222;
}
.list_li {
  width: 40%;
  line-height: 0.88rem;
  vertical-align: middle;
}

.bus_li {
  height: 3.57rem;
  width: 100%;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.bus_li img {
  width:100%;
  height: 2.37rem;
}
.bus_1 {
  width: 100%;
  height: 1.2rem;
  display: flex;
  flex: 1;
  justify-content: space-between;
  align-items: center;
}
.bus_n{
   width: 100%;
  height: 1.2rem;
  display: flex;
  flex: 1;
  justify-content:center;
  align-items: center;
}
.bus_n>div>img{
  width: .28rem;
  height: .28rem;
}
.bus_1>div>img{
  width: .28rem;
  height: .28rem;
  margin-left: .3rem;
}
.bus_n>div{
  display: flex;
  align-items: center;
  padding: 0.3rem;
}
.bus_1>div{
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.3rem;
}
.bus_2 {
    color: #222;
		padding: .2rem;
		font-size:.32rem;
		font-family:'PingFang-SC-Bold';
		font-weight:bold;
		color:rgba(34,34,34,1);
}
.bus_3 {
  margin-right: .33rem;
		display: flex;
		align-items: center;
		font-size:.28rem;
		font-family:'PingFang-SC-Bold';
		font-weight:bold;
		color:rgba(73,187,255,1);
}
.bus_3>div{
    font-size:.24rem;
		font-family:'PingFangSC-Regular';
		font-weight:400;
		color:rgba(153,153,153,1);
    margin-right: .2rem;
}
.input-label {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  background-image: url("../../../static/images/Wit/weixuanzhong@2x.png");
  border-radius: 50%;
  background-size: 100%;
  margin: 0 0 0 0.2rem;
}
.input-label.active {
  display: block;
  width: 0.3rem;
  height: 0.3rem;
  background-image: url("../../../static/images/Wit/xuanzhong@2x.png");
  border-radius: 50%;
  background-size: 100%;
}
</style>
