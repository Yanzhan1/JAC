<template>
  <div>
    <header class="header">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <div id="tip">
        <span class="header-title" :class="type==1?'active':''" style="margin-right:.2rem" @click="getcarbus(1)">全部车型</span>
        <span class="header-title" :class="type==2?'active':''" @click="getcarbus(2)">主推车型</span>
      </div>
      <span @click="shai()" class="header-right"><img src="../../../static/images/Wit/shaixuan1@3x.png" alt="" style="width:.4rem"></span>
    </header>
    <div style="height:.88rem"></div>
    <ul>
      <li class="bus_li" v-for="(item,index) in this.mainbus" :key="index" @click="tode(item)">
        <img :src="item.imgUrl" alt="">
        <div class="bus_1">
          <span class="bus_2">{{item.seriesName}}</span>
          <span class="bus_3">
            <span style="color:#a5a5a5;font-size:.22rem"> 官方指导价</span> ：{{item.guidancePriceStart}}万起</span>
        </div>
        <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
      </li>
    </ul>
    <mt-popup v-model="popupVisible" position="middle">
      <div style="width:100%;text-align:center;line-height:.88rem;font-size:.36rem;color:#555555;border-bottom:1px solid #f1f1f1">
        切换频道
      </div>
      <div class="flex row cocenter roe">
        <!-- <label class="input-label" :class="{active: selected_all}" @click="slect_all"></label> -->
        <label><input type="radio" v-model="gender" :value="null" /></label>
        <span class="txt" style="margin-left:.1rem">全选</span>
      </div>
      <ul class="flex row wrap between">
        <li class="flex row cocenter list_li" v-for="(item,index) in good_list" :key="index">
          <!-- <label class="input-label" :class="{active: item.is_selected}" @click="select_one(index)"></label> -->
          <label><input type="radio" v-model="gender" :value="item.no" /></label>
          <span class="txt" style="margin-left:.1rem">{{item.brandName}}</span>
        </li>
      </ul>
      <div class="fot">
        <p class="pp" style="" @click="fn(1)">取消</p>
        <p class="sure" style="" @click="fn(2)">确定</p>
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
      gender: "",
      good_list: [],
      gender: null //全选默认选中
    };
  },
  methods: {
    shai() {
    	// console.log(11)
      this.popupVisible = true;
    },
    tode(item) {
      // alert(item.no)
      this.$store.dispatch('NONAME',item)
      this.$router.push({
        name:'车系特色',
        params:{
          // everyno:item.no
        }
      });
    },

    // select_one(index) {
    //   if (this.good_list[index].is_selected == true) {
    //     this.good_list[index].is_selected = false;
    //   } else {
    //     this.good_list[index].is_selected = true;
    //   }
    // },
    // slect_all() {
    //   if (this.selected_all) {
    //     for (var i = 0; i < this.good_list.length; i++) {
    //       this.good_list[i].is_selected = false;
    //     }
    //     this.selected_all = false;
    //   } else {
    //     for (var i = 0; i < this.good_list.length; i++) {
    //       this.good_list[i].is_selected = true;
    //     }
    //     this.selected_all = true;
    //   }
    // },
    //切换频道
    fn(num) {
      if (num == 2) {
        var arr = this.arr;
        var param = {
          highlyRecommend: this.highlyRecommend,
          no: this.gender
        };

        this.$http.post(Wit.MainBus, param).then(res => {
          if (res.data.code == 0) {
            var arr = res.data.data;
            for (let i = 0; i < arr.length; i++) {
              if (arr[i].imageRelationVO.length > 0) {
               for (let j = 0; j < arr[i].imageRelationVO.length; j++) {
                    if (arr[i].imageRelationVO[j].imageType == "4") {
                      arr[i].imgUrl = arr[i].imageRelationVO[0].imageUrl;
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


             
                
        // for(let i=0;i<this.good_list.length;i++){
        //   if(this.good_list[i].is_selected){
        //     this.arr.push(this.good_list[i].no)
        //     var arr=this.arr
        //     var param = {
        //       'highlyRecommend': this.highlyRecommend,
        //        nos:arr
        //      };
        //     this.$http.post(Wit.MainBus,param).then(res=>{
        //     if (res.data.code == 0){
        //       this.arr=[]
        //       this.mainbus={},
        //       this.mainbus=res.data.data
        //     }
        //     })
        //   }
        // }
      } else {
      }
      this.popupVisible = false;
    },
    //渲染列表   1
    getcarbus(num) {
      if (num == 1) {
        //等于1 传“” 。 获取全部车型
        this.type = 1;
        this.highlyRecommend = "";
      } else {
        this.type = 2; //等于2 传“1” 。 获取主推车型
        this.highlyRecommend = "1";
      }
      var param = {
        highlyRecommend: this.highlyRecommend
      };
      this.$http.post(Wit.MainBus, param).then(res => {
        if (res.data.code == 0) {
          var arr = res.data.data;
          for (let i = 0; i < arr.length; i++) {
            if (arr[i].imageRelationVO.length > 0) {
            for (let j = 0; j < arr[i].imageRelationVO.length; j++) {
                    if (arr[i].imageRelationVO[j].imageType == "4") {
                      arr[i].imgUrl = arr[i].imageRelationVO[0].imageUrl;
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
  }
};
</script>
 <style scoped>
.mint-popup {
  width: 80%;
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
  height: 2.3rem;
  border-bottom: 1px solid #f5f5f5;
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
}
.bus_li img {
  width: 2.56rem;
  height: 1.4rem;
  margin-left: 0.3rem;
}
.bus_1 {
  display: flex;
  flex-direction: column;
  margin-left: 0.38rem;
  align-items: flex-start;
  width: 4rem;
}
.bus_2 {
  font-size: 0.3rem;
  color: #222;
  padding: 0.1rem 0;
}
.bus_3 {
  font-size: 0.28rem;
  color: #3a5cff;
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
