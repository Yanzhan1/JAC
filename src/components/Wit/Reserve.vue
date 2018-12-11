<template>
  <div style="height:100%;position:absolute;left:0;top:0;width:100%" class="gobottom">
          <div v-show="region" class="black" @click="choose2"></div> <!-- 遮罩层  -->
          <div class="bgcolor">                 
                  <mhead currentTitle="在线订车"></mhead>
                  <ul>
                      <li class="all">
                          <span>预定车型</span>
                          <div>{{this.$store.state.seriesName?this.$store.state.seriesName:this.$route.query.carName}}</div>
                      </li>
                      <li @click="regions" class="all">
                          <span><span style="display:inline-block;font-size:.31rem;color:red">*</span>省</span>
                          <div class="allflex">
                              <input type="text" name="" id="" v-model="area" readonly style="text-align:right">
                              <img src="../../../static/images/next@2x.png" alt="">
                          </div>
                      </li>
                      <li @click="cityes" class="all">
                          <span><span style="display:inline-block;font-size:.31rem;color:red">*</span>市</span>
                          <div class="allflex" >
                              <input type="text" name="" id="" v-model="city" readonly style="text-align:right">
                              <img src="../../../static/images/next@2x.png" alt="">
                          </div>
                      </li>
                      
                      <li class="all">
                          <span style="width:2rem"><span style="display:inline-block;font-size:.31rem;color:red">*</span>经销商</span>
                          <div class="allflex" @click="Distributor">
                              <span>{{this.Distribution}}</span>
                              <img src="../../../static/images/next@2x.png" alt="" >
                          </div>        
                      </li>
                      <li class="name all">
                          <span><span style="display:inline-block;font-size:.31rem;color:red">*</span>姓名</span>
                          <div class="allflex">
                              <input placeholder="点击输入姓名" v-model="name">
                              <img src="../../../static/images/next@2x.png" alt="">
                          </div>
                      </li>
                      <li class="sixname all">
                          <span><span style="display:inline-block;font-size:.31rem;color:red">*</span>性别</span>
                          <div class="specilflex">
                              <!-- <input type="text" name="" id="" placeholder="点击输入称谓" v-model="smallname">
                              <img src="/static/images/next@2x.png" alt=""> -->
                                <input type="radio" name="choosea" value="男" checked @click="choosesex"><span>男</span>
                                <input type="radio" name="choosea" value="女" @click="choosesex"><span>女</span>
                          </div>
                      </li>
                      <li class="phone all">
                          <span><span style="display:inline-block;font-size:.31rem;color:red">*</span>手机</span>
                          <div class="allflex">
                              <input placeholder="点击输入手机号" v-model="tell">
                              <img src="../../../static/images/next@2x.png" alt="">
                          </div>
                      </li>
                      <!-- <li class="all">
                          <span>推荐码</span>
                          <div class="allflex">
                              <input type="text" name="" id="" placeholder='点击输入推荐码' v-model="Recommend" @blur="Codigo">
                              <img src="../../../static/images/next@2x.png" alt="">
                          </div>
                      </li> -->
                      <li class="all">
                          <span>电子邮箱</span>
                          <div class="allflex">
                              <input type="text" name="" id="" placeholder="点击输入邮箱" v-model="email">
                              <img src="../../../static/images/next@2x.png" alt="">
                          </div>
                      </li>
                      <li class="all">
                          <span>地址</span>
                          <div class="allflex">
                              <input type="text" name="" id="" placeholder="点击输入地址" v-model="address">
                              <img src="../../../static/images/next@2x.png" alt="">
                          </div>
                      </li>
                  </ul>
                  <!-- <span class='Remarks'>备注说明：</span>
                  <textarea placeholder="输入文本..." v-model="beizhu"></textarea> -->
                  <div style="height:2rem;"></div>
              <div class="submit" v-show="success">
                  <img src="../../../static/images/Wit/gou@2x.png" alt="" style="width:.8rem;height:.8rem;" class="gou">
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
                  <h3>选择省</h3>
                  <span @click="choosedelay">确定</span>
                  <mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
              </mt-popup>
              <mt-popup class="region" v-show="citys" position="bottom">
                  <h3>选择市</h3>
                  <span @click="choose3">确定</span>
                  <mt-picker :slots="slots3" @change="onValuesChange3" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
              </mt-popup>
              <mt-popup class="region" v-show="distributors" position="bottom">
                  <h3>选择经销商</h3>
                  <span @click="choose2">确定</span>
                  <mt-picker :slots="slots2" @change="onValuesChange2" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
              </mt-popup>
            <h3 @click="sub" class="bottom-btn" style="position:fixed;bottom:0;left:0">提交</h3>
  </div>
</template>

<script>
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
import PublicHead from '../publicmodel/PublicHead';
export default {
	name: 'reserve',
	components: {
  	mhead:PublicHead
  },
  data() {
    return {
      num:0,
      region: false,
      distributors: false,
      localprovince:'',
      localcity:'',
      localparentId:'',
      localdealercitycode:'',
      citys: false,
      success: false,
      areas: false,
      ischange:false,
      vehicleData:'',//s4系列传过来的数据
      Distribution: "", //经销商
      Recommend: "", //推荐码
      name: "", //姓名
      smallname: "", //称谓 男女
      tell: "", //电话
      email: "", //邮箱
      area: [], //省
      city: [], //市
      address: "", //地址
      beizhu: "", //备注
      codecity: "", //市的code
      chooseaddress: [],
      Idchooseaddress: [], //返回选择经销商的no
      myaddress: {},
      everycode: "",
      latitude:'',//经度
      longitude:'',//纬度
      thanks:
        "感谢您对江淮汽车的关注与支持，我们专业的服务员会第一时间与您联系!",
      province: [], //地区省份
      business: "", //经销商的所有id
      provinceCode: null, //省份code
      provinceid: "",
      parentId: [],
      data: [],
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        }
       /* {
          divider: true,
          content: "",
          itemHieight: 74,
          className: "slot2"
        }*/
      ],
      slots2: [
        {
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          itemHieight: 74
        }
      ],
      slots3: [
        {
          values: [],
          className: "slot1",
          textAlign: "center"
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
    cityes() {
      this.citys = true;
      this.region = true;
    },
    Codigo(){
      if(this.Recommend==''){

      }else{

        this.$http.post(Wit.ValidateCode,{
          code:this.Recommend
        }).then((res)=>{
            if(res.data.code==0){
                Toast({
                  message: '该验证码正确',
                  duration: 1000,
                  position: "middle"
                });
            }else{
              Toast({
                  message: res.data.msg,
                  duration: 1000,
                  position: "middle"
                });
            }
        })
      }
    },
    choosedelay(){
      setTimeout(()=>{
        this.choose()
      },0)
    },
    choose() {
      this.region = false;
      this.distributors = false;
      this.areas = false;
      this.citys = false;
      //选择市
      if(this.provinceid==''){
        this.provinceid=1
        this.area = '四川'
      }
      var data = {
        parentId: this.provinceid,
        level: 2,
        size:100,
      };
      
      this.$http.post(Wit.searchCountryAreaCodeListPage, data).then(res => {
        this.data = res.data.data.records;
        this.slots3[0].values = [];
        for (var i = 0; i < this.data.length; i++) {
          this.slots3[0].values.push(this.data[i].name);
          
          if(this.city==this.data[i].name){
            
            this.everycode=this.data[i].code
          }
        }
        setTimeout(()=>{
          for (var i = 0; i <  this.slots3[0].values.length; i++) {
                    
                    if(this.city==this.slots3[0].values){
                      
                      this.everycode=this.data[i].code
                    }
          }
              // alert(this.everycode)
              //经销商
              var param = {
                dealerType: "01",
                dealerCityCode: this.everycode,
                vehicleSeridesNo:this.$store.state.everyno,
                longitude:this.longitude,//经度
                latitude:this.latitude,//纬度
              };
              this.$http.post(Wit.Dealer, param, this.$store.state.getpin).then(res => {
                this.chooseaddress = res.data.data.records;
                // console.log(this.chooseaddress)
                this.slots2[0].values = [];
                for (var i = 0; i < this.chooseaddress.length; i++) {
                  this.slots2[0].values.push(this.chooseaddress[i].dealerName);
                  this.Idchooseaddress.push(this.chooseaddress[i].no);
                  
                }
              });
        },0)
        
      });
      
      
    },
    choose3(){
      this.region = false;
      this.distributors = false;
      this.areas = false;
      this.citys = false;
          //经销商
          // alert(this.everycode)
      var param = {
        dealerType: "01",
        dealerCityCode: this.everycode,
        vehicleSeridesNo:this.$store.state.everyno,
        longitude:this.longitude,//经度
        latitude:this.latitude,//纬度
      };
      this.$http.post(Wit.Dealer, param, this.$store.state.getpin).then(res => {
        this.chooseaddress = res.data.data.records;
        this.slots2[0].values = [];
        for (var i = 0; i < this.chooseaddress.length; i++) {
          this.slots2[0].values.push(this.chooseaddress[i].dealerName);
          this.Idchooseaddress.push(this.chooseaddress[i].no);
        }
      });
    },
    choose2() {
      this.region = false;
      this.distributors = false;
      this.areas = false;
      this.success = false;
      this.citys = false;
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
      if(this.Distribution=='此地区暂无经销商'){
         Toast({
          message: "此地区暂无经销商",
          duration: 1000,
          position: "middle"
        });
        return false;
      }
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
      if(this.provinceid==''){
          for(let value of this.myaddress){
            if(value.name==this.localprovince){
              this.provinceid=value.code
            }
          }
             var data = {
            parentId: this.provinceid,
            level: 2,
            size:100,
          };
          this.$http.post(Wit.searchCountryAreaCodeListPage, data).then(res=>{
              let city=res.data.data.records
              for(let values of city){
                if(values.name==this.localcity){
                  this.codecity=name.id
                }
              }
          })
      }
      var param = {
        customerName: this.name, //姓名
        fkDealerId: this.business, //经销商编号
        gender: gender, //性别
        mobile: this.tell, //手机号
        email: this.email, //email
        address: this.address, //地址
        comments: this.vehicleData, //车型配置
        province: this.provinceid, //省份ID
        series: this.$store.state.levelCode, //意向车系
        model: this.$store.state.srouceNo, //意向车型
        city: this.codecity, //城市ID
        userNo: this.$store.state.userId,
        code:this.Recommend,//推荐码
      };
      this.$http.post(Wit.PreBus, param).then(res => {
        if (res.data.code == 0) {
          this.success = true;
          this.region = true;
        } else {
          Toast({
            message: res.data.msg,
            duration: 3000,
            position: "middle"
          });
          return false;
        }
      });
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
    //选择性别
    choosesex() {
      this.smallname = $("input:radio:checked").val();
    },
    backs() {
      this.$router.push({
        name: "车系特色",
        params: {
          // everyno:this.$route.params.everyno,
          // seriesName:this.$route.params.seriesName
        }
      });
    },
    //选择省
    onValuesChange(picker, values) {
      this.num++;
      // alert('sheng'+this.num)
      // alert('进入')
      if(this.num == 4){
        // alert('触发')
        this.area = this.localprovince
      }else{
        // alert(values)
        this.area=values
          for (var i = 0; i < this.myaddress.length; i++) {
                if (this.area[0] == this.myaddress[i].name) {
                  this.provinceid = this.myaddress[i].id;
                }
      }  


      }

      
    },
    //选择经销商
    onValuesChange2(picker, values) {
      this.num++;
      // alert('jingxiao'+this.num)
      if(this.num == 3){
        this.Distribution='此地区暂无经销商'
      }else{
        if(values==''){
          this.Distribution='此地区暂无经销商'
        }else{
          this.Distribution = values[0];
        }
      }  
        for (var i = 0; i < this.slots2[0].values.length; i++) {
          if (this.Distribution == this.slots2[0].values[i]) {
            this.business = this.chooseaddress[i].dealerCodeDms;
          }
      }
    },
    //选择经销市
    onValuesChange3(picker, values) {
      
      this.num++
      // alert('shi'+this.num)
      if(this.num == 5){
      
        this.city = this.localcity
      }else{
        
        this.city = values;
      for (var i = 0; i < this.data.length; i++) {
        if (this.city == this.data[i].name) {
          this.codecity = this.data[i].id;
          this.everycode = this.data[i].code;
        }
      }
      }  
    },
    getcity(){
      this.$http
      .post(
        Wit.searchCountryAreaCodeListPage,
        {
          parentId: null,
          level: 1,
          size: 100
        },
        this.$store.state.getpin
      )
      .then(res => {
        this.province = res.data.data.records;
        this.area=this.localprovince
        this.city=this.localcity
        this.province.forEach((item, index) => {
          if(this.localprovince==this.province[index].name){
            this.localparentId=this.province[index].id
          }
          this.slots[0].values.push(this.province[index].name);
          this.parentId.push(this.province[index].id);
        });
        this.myaddress = res.data.data.records;
        for (let i = 0; i < this.myaddress.length; i++) {
          this.slots[0].values.push(this.myaddress[i].name);
        }
        //选择市
          var data = {
            parentId: this.localparentId,
            level: 2,
            size:100,
          };
          this.$http.post(Wit.searchCountryAreaCodeListPage, data).then(res => {
            this.data = res.data.data.records;
            this.slots3[0].values = [];
            for (var i = 0; i < this.data.length; i++) {
              if(this.localcity==this.data[i].name){
                this.localdealercitycode=this.data[i].code
              }
              this.slots3[0].values.push(this.data[i].name);
            }
            //经销商
            var param = {
              dealerType: "01",
              dealerCityCode: this.localdealercitycode,
              vehicleSeridesNo:this.$store.state.everyno,
              longitude:this.longitude,//经度
              latitude:this.latitude,//纬度
            };
            this.$http.post(Wit.Dealer, param, this.$store.state.getpin).then(res => {
              this.chooseaddress = res.data.data.records;
              this.slots2[0].values = [];
              for (var i = 0; i < this.chooseaddress.length; i++) {
                this.slots2[0].values.push(this.chooseaddress[i].dealerName);
                this.Idchooseaddress.push(this.chooseaddress[i].no);
              }
            });
          });
      });


      
 
    },
    getIosLocation(locationMes) { //IOS调用,H5获取ios定位信息
				this.localprovince = JSON.parse(locationMes).province.replace('自治区', '').replace('省', '').replace('市', '').replace('壮族', '').replace('回族', '')
				this.localcity = JSON.parse(locationMes).city.replace('市', '')
				this.latitude = JSON.parse(locationMes).latitude //精
        this.longitude = JSON.parse(locationMes).longitude //韦
        this.getcity()
      },
      //拼接
      Pikante(){
        let vehicleData=this.$route.query.vehicleData
        if(vehicleData[3]==undefined){
          this.vehicleData=vehicleData[0]+','+vehicleData[1]+','+vehicleData[2]
        }else{
          this.vehicleData=vehicleData[0]+','+vehicleData[1]+','+vehicleData[2]+','+vehicleData[3]
        }
      }
  },
  created(){
    		window.getIosLocation = this.getIosLocation //ios获取定位信息,放到window对象供ios调用			
      var system = this.isIOSOrAndroid();
			if(system == 'Android') {
				var Position = js2android.getLocationInfo() //获取安卓定位信息
        var NewPosition = JSON.parse(Position)
        this.localprovince=NewPosition.province.replace('自治区', '').replace('省', '').replace('市', '').replace('壮族', '').replace('回族', '')//当地的省
        console.log(this.localprovince)
        this.localcity= NewPosition.city.replace('市', '')//当地的市
				this.latitude = NewPosition.latitude //经度
        this.longitude = NewPosition.longitude //纬度
        this.getcity()
			} else if(system == "IOS") {
				window.webkit.messageHandlers.iOSLocationNotice.postMessage({}); //调用ios方法发送通知ios调用H5方法传
      }
  },
  mounted() {
    this.tell=this.$store.state.mobile
    this.Pikante();
    //地区
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
  font-weight: 'Regular';
  font-family: 'PingFangSC-Regular';
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
  align-items: center;
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
 /* position: absolute; */
  /* bottom: -1.5rem; */
  width: 100%;
  height: 5rem;
  color: #222;
  background: #fff;
  font-weight: 'Regular';
  font-family: 'PingFangSC-Regular';
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
  /* position: absolute; */
  float:right;
  margin-right: .5rem;
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
.specilflex {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex: 1;
}
.specilflex > input {
  width: 1rem;
  margin: 0 0 0.02rem 0;
}
</style>
