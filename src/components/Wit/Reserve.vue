<template>
<div style="height:100%;position:fixed;left:0;top:0;width:100%" class="gobottom">
        <div v-show="region" class="black" @click="choose2"></div> <!-- 遮罩层  -->
        <div class="bgcolor">
                <header class="header">
                <img class="header-left" :src="'./static/images/back@2x.png'" @click="backs">
                <span class="header-title">车辆预定</span>
                <span class="header-right"></span>
                </header>
                <ul style="margin-top:.88rem">
                    <li class="all">
                        <span>预定车型</span>
                        <div>{{this.$store.state.seriesName}}</div>
                    </li>
                                        <li @click="regions" class="all">
                        <span>所在地区</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击选择地区" v-model="area" readonly>
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <!-- <li class="all">
                        <span>选择经销商</span>
                        <div class="allflex" @click="Distributor">
                            <span class="shows">{{this.Distribution}}</span>
                            <img src="/static/images/next@2x.png" alt="" >
                        </div>        
                    </li> -->
                    <li class="all">
                        <span>推荐码</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder='点击输入推荐码' v-model="Recommend">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <li class="name all">
                        <span>姓名</span>
                        <div class="allflex">
                            <input placeholder="点击输入姓名" v-model="name">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <li class="sixname all">
                        <span>称谓</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击输入称谓" v-model="smallname">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <li class="phone all">
                        <span>手机</span>
                        <div class="allflex">
                            <input placeholder="点击输入手机号" v-model="tell">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <li class="all">
                        <span>电子邮箱</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击输入邮箱" v-model="email">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <!-- <li @click="regions" class="all">
                        <span>所在地区</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击选择地区" v-model="area">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li> -->
                     <li class="all">
                        <span>选择经销商</span>
                        <div class="allflex" @click="Distributor">
                            <span class="shows">{{this.Distribution}}</span>
                            <img src="/static/images/next@2x.png" alt="" >
                        </div>        
                    </li>
                    <li class="all">
                        <span>地址</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击输入地址" v-model="address">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                </ul>
                <span class='Remarks'>备注说明：</span>
                <textarea placeholder="输入文本..." v-model="beizhu"></textarea>
                <div style="height:.88rem"></div>
            <div class="submit" v-show="success">
                <img src="/static/images/Wit/gou@2x.png" alt="" style="width:.8rem;height:.8rem;" class="gou">
                <h3>提交成功</h3>
                <div class="success_bt">{{this.thanks}}</div>
                <div style="width:5.68rem;height:.02rem;background:#f1f1f1;margin:.2rem auto;"></div>
                <div class="look">
                    <!-- <div class="look_l"></div> -->
                    <router-link tag="div" to="/myorder" class="look_l"> 查看订单</router-link>
                    <div style="width:.02rem;height:.6rem;background:#f1f1f1;"></div>
                    <div class="look_r" @click="complete">完成</div>
                </div>
            </div>

            </div>
            <mt-popup class="region" v-show="areas" position="bottom">
                <h3>选择地区</h3>
                <span @click="choose">确定</span>
                <mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem"></mt-picker>
            </mt-popup>
            <mt-popup class="region" v-show="distributors" position="bottom">
                <h3>选择经销商</h3>
                <span @click="choose">确定</span>
                <mt-picker :slots="slots2" @change="onValuesChange2" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
            </mt-popup>
           
            <div >
                <h3 @click="sub" class="bottom-btn" style="position:absolute;bottom:0;left:0">提交</h3>
            </div>

</div>
</template>

<script>
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
export default {
  data() {
    return {
      region: false,
      distributors: false,
      success: false,
      areas: false,
      Distribution: "", //经销商
      Recommend: "", //推荐码
      name: "", //姓名
      smallname: "", //称谓 男女
      tell: "", //电话
      email: "", //邮箱
      area: [], //地区
      address: "", //地址
      beizhu: "", //备注
      chooseaddress:[],
      Idchooseaddress: [], //返回选择经销商的no
      myaddress:{},
      everycode:'',
      thanks:
        "感谢您对江淮汽车的关注与支持，我们专业的服务员会第一时间与您联系!",
      province: [], //地区省份
      business:'',//经销商的所有id
      provinceCode: null, //省份code
      provinceid:'',
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "",
          itemHieight: 74,
          className: "slot2"
        }
      ],
      slots2: [
        {
          values: [],
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          itemHieight: 74
        }
      ]
    };
  },
  methods: {
    regions() {
      this.region = true;
      this.areas = true;
    },
    choose() {
      this.region = false;
      this.distributors = false;
      this.areas = false;
    },
    choose2() {
      this.region = false;
      this.distributors = false;
      this.areas = false;
      this.success = false;
    },
    Distributor() {
      this.distributors = true;
      this.region = true;
    },
    complete() {
      this.success = false;
      this.region = false;
    },
    // 提交前 先判断用户输入的推荐码是否正确
    sub() {
      var param = {
        code: this.$store.state.userId
      };
      this.$http.post(My.RecomendCode, param).then(res => {
        if (res.data.code == 0) {
        }
      });

      var name = this.name;
      if (name == "") {
        Toast({
          message: "姓名不能为空",
          duration: 1000,
          position: "middle"
        });
        return false;
      }
      var tell = this.tell; //手机号
      let reg = /^[1][3,4,5,7,8][0-9]{9}$/;
      var numFlag = reg.test(tell);
      if (!numFlag) {
        Toast({
          message: "手机号码格式不对！",
          duration: 1000,
          position: "middle"
        });
        return false;
      }
      // var address = this.address;
      // if (address == "") {
      //   Toast({
      //     message: "地址不能为空",
      //     duration: 1000,
      //     position: "middle"
      //   });
      //   return false;
      // }
      // var beizhu = this.beizhu;
      // if (beizhu == "") {
      //   Toast({
      //     message: "备注不能为空",
      //     duration: 1000,
      //     position: "middle"
      //   });
      //   return false;
      // }
      var gender = this.smallname == "女" ? 1 : 2;

      var param = {
        customerName: this.$store.state.seriesName, //姓名
        fkDealerId: this.business, //经销商编号
        gender: gender, //性别
        mobile: this.tell, //手机号
        email: this.email, //email
        address: this.address, //地址
        comments: this.beizhu, //商家备注
        province: this.provinceid, //省份ID
        series:this.$route.params.levelCode, //意向车系
        model: this.$store.state.srouceNo,//意向车型
        // code:'',
        userNo:this.$store.state.userId,
      };
      // alert(JSON.stringify(param));
      this.$http.post(Wit.PreBus, param).then(res => {
        // alert(JSON.stringify(res));
        if (res.data.code == 0) {
          this.success = true;
          this.region = true;
        }else{
           Toast({
          message: '系统异常，请稍后重试',
          duration: 1000,
          position: "middle"
        });
        return false;
        }
      });
    },
    backs(){
            this.$router.push({
                name:'车系特色',
                params:{
                    // everyno:this.$route.params.everyno,
                    // seriesName:this.$route.params.seriesName
                }
            })
    },
    //所在地区
    onValuesChange(picker, values) {
      this.area = values;
      // this.province.forEach((item, index) => {
      // 	if (item.name == values) {
      // 		this.everycode  = item.code; //拿到省份code,请求经销商列表
      // 	}
      // })
      // alert(this.everycode)
      // var param = {
      // 	dealerType: "01",
      // 	dealerCityCode:this.everycode
      // };
      // this.$http.post(Wit.Dealer, param, this.$store.state.mytoken).then(res => { //经销商列表请求
      // 	this.slots2[0].values = [] //清除已经选择的经销商
      // var chooseaddress = res.data.data.records;
      // chooseaddress.forEach((item, index) => {
      // 	this.slots2[0].values.push(chooseaddress[index].dealerName)
      // })

    //   console.log(this.area)
      for(var i=0;i<this.myaddress.length;i++){
        if(this.area[0]==this.myaddress[i].name){
          this.everycode=this.myaddress[i].code
          this.provinceid=this.myaddress[i].id
        }
      }
          //经销商
    var param = {
      dealerType: "01",
      dealerCityCode:this.everycode
    };
    this.$http.post(Wit.Dealer, param,this.$store.state.getpin).then(res => {
      // console.log(res);
      this.chooseaddress = res.data.data.records;
        this.slots2[0].values=[]
      for (var i = 0; i < this.chooseaddress.length; i++) {
        this.slots2[0].values.push(this.chooseaddress[i].dealerName);
        this.Idchooseaddress.push(this.chooseaddress[i].no);
      }
      // alert(this.slots2[0].values)

    });
    },
    //选择经销商
    onValuesChange2(picker, values) {
      this.Distribution = values[0];
      for(var i=0;i<this.slots2[0].values.length;i++){
        if(this.Distribution==this.slots2[0].values[i]){
          this.business=this.chooseaddress[i].dealerCodeDms
          // alert(this.business)
        }
      }
    }
  },
  mounted() {
    // alert(this.$route.params.levelCode)
    // alert(this.$route.params.srouceNo)
    // alert(this.$route.params.seriesName)
    //地区
    this.$http
      .post(Wit.searchCountryAreaCodeListPage, {
        parentId: null,
        level: 1,
        size: 100
      }, this.$store.state.getpin)
      .then(res => {

        this.province = res.data.data.records;
		this.province.forEach((item,index) => {
			this.slots[0].values.push(this.province[index].name);
		});
        this.myaddress = res.data.data.records;
        // console.log(this.myaddress);
        for (let i = 0; i < this.myaddress.length; i++) {
          this.slots[0].values.push(this.myaddress[i].name);
        }
      });



    $(".gobottom").height($(".gobottom").height());
  }
};
</script>

<style scoped>
.bgcolor {
  position: relative;
  width: 100%;
  height: 100%;
  background: #fff;
  font-weight: Regular;
  font-family: PingFangSC-Regular;
}
.black {
  width: 100%;
  height: 110%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
.all {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.28rem;
  height: 1rem;
  line-height: 0.28rem;
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  font-weight: Regular;
}
.all img {
  width: 0.16rem;
  height: 0.3rem;
}
.allflex {
  display: flex;
  justify-content: flex-end;
}
.allflex > input {
  border: 0;
  width: 2.5rem;
  outline: none;
}
.name {
  margin-top: 0.11rem;
}
.phone {
  margin-bottom: 0.13rem;
}
.Remarks {
  display: block;
  background: #fff;
  padding: 0.28rem;
}
textarea {
  width: 6.88rem;
  height: 1.14rem;
  background: #f5f5f5;
  border: #f5f5f5 solid 0.01rem;
  margin: 0rem 0.31rem;
  font-size: 0.28rem;
  font-weight: Regular;
  font-family: PingFangSC-Regular;
  outline: none;
  padding: 0.1rem;
}
.region {
  position: absolute;
  bottom: -1.4rem;
  width: 100%;
  height: 6rem;
  color: #222;
  background: #fff;
  font-weight: Regular;
  font-family: PingFangSC-Regular;
  z-index: 1001;
}
.region > h3 {
  text-align: center;
  margin-top: 0.42rem;
  font-size: 0.36rem;
  color: #222;
  line-height: 0.36rem;
}
.region > span {
  position: absolute;
  bottom: 5.32rem;
  right: 0.35rem;
  color: #49bbff;
  font-size: 0.28rem;
}
.submit {
  position: absolute;
  top: 3.31rem;
  left: 0.65rem;
  width: 6.2rem;
  height: 4.12rem;
  background: #fff;
  z-index: 1001;
  border-radius: 0.2rem;
  font-family: PingFang SC;
  font-weight: Medium;
  color: #222;
}
.submit > h3 {
  text-align: center;
  font-size: 0.36rem;
  margin-top: 0.31rem;
}
.success_bt {
  width: 5.02rem;
  text-align: center;
  margin-left: 0.59rem;
  margin-top: 0.36rem;
}
.gou {
  margin-left: 2.7rem;
  margin-top: 0.21rem;
}
.look {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #1e99ff;
}
.look .look_l {
  margin-left: 0.49rem;
  font-size: 0.34rem;
}
.look .look_r {
  margin-right: 0.49rem;
  font-size: 0.34rem;
}
</style>
