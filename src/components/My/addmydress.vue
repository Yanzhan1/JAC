<template>
	<div style="height:100%;position:fixed;left:0;top:0;width:100%" class="gobottom">
		<div v-show="bgcolor" class="bgcolor" @click="hidess"></div>
		<!--<header class="header">
			<img class="header-left" src="../../../static/images/back@2x.png" @click="$route.meta.keepAlive = false;$router.go(-1)">
			<span class="header-title">添加新地址</span>
			<div></div>
		</header>
		<div style="height:.88rem"></div>-->
		<mhead currentTitle="添加新地址"></mhead>
		<div style="padding:0 .3rem">
			<div class="contentList">
				<span class="contentList-left">姓名</span>
				<input type="text" placeholder="请输入姓名" v-model="name">
			</div>
			<div class="contentList nickname">
				<span class="contentList-left">手机号码</span>
				<input type="text" placeholder="点击输入手机号" v-model="num">
			</div>
			<!-- 省 -->
			<div class="city">
				<div class="contentList nickname areas">
					<span class="contentList-left" style="float:left">所在地区</span>
					<div class="contentList-right" style="float:right">
						<input  type="text" name="" id="" class="place" @click="choosearea()" placeholder="请选择地区" v-model="this.choosedarea" readonly="readonly">
						<img class="pic" src="../../../static/images/my/next@2x.png" />
					</div>
				</div>
			</div>
			<!-- 市 -->
			<div class="city">
				<div class="contentList nickname areas">
					<span class="contentList-left" style="float:left">选择市</span>
					<div class="contentList-right" style="float:right">
						<input type="text" name="" id="" class="place" @click="choosecitys()" v-model="this.choosecity" readonly="readonly">
						<img class="pic" src="../../../static/images/my/next@2x.png" />
					</div>
				</div>
			</div>

			<div class="inputcontent">
				<div class="peop">详细地址：</div>
				<textarea maxlength='40' class="textare" placeholder="点击输入详细地址" form="usrform" v-model="address">
				</textarea>
			</div>
			<div class="ft">
				<div class="ft_1">
					<label for="foot-check" class="input-label" :class="{active:selected}" @click="selected=!selected"></label>
				</div>
				<span class="ft_2">&nbsp;设为默认地址</span>
			</div>
		</div>
		<!-- 省 -->
		<mt-popup style="position:absolute;z-index:1000;bottom:-.5rem;width:100%;background:#fff;" v-show="this.shows" position="bottom">
			<div style="text-align:center;line-height:.8rem;font-size:.4rem">选择省</div>
			<div style="text-align: right;color: #49BBFF;margin-right:.2rem;" @click="hides()">确定</div>
			<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
		</mt-popup>
		<!-- 市 -->
		<mt-popup style="position:absolute;z-index:1001;bottom:-.5rem;width:100%;background:#fff;" v-show="this.showss" position="bottom">
			<div style="text-align:center;line-height:.8rem;font-size:.4rem">选择市</div>
			<div style="text-align: right;color: #49BBFF;margin-right:.2rem;" @click="hideses()">确定</div>
			<mt-picker :slots="slots1" @change="onValuesChanges"></mt-picker>
		</mt-popup>

		<!-- <div style="height:7.1rem"></div> -->
		<span class="bottom-btn" @click="handleSubmit">保存</span>
	</div>
</template>
<script>
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
import PublicHead from "../publicmodel/PublicHead";
export default {
  name: "addMyDress",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      numadd: 0,
      numcityadd:0,
      change:false,
      bgcolor: false,
      provinceName: "", //当地的省份
      cityName: "", //当地的市
      shows: false, //控制选择地区显示
      showss: false, //控制选择城市显示
      selected: true,
      name: "",
      num: "",
      isShow: false,
      everycode: "", //返回给后台的地区code
      everyid: "", //通过省份的id  获取对应的市
      allarea: [], //所有的地区
      city: [],
      choosedarea: "", //被选择的地区
      choosecity: "", //被选择的城市
      choose_si: "",
      ishide: false, //控制城市的显示
      nowindex: 0, //默认显示上海
      provinceId: "100000",
      provinceName: "北京",
      address: "",
      options: [],
      no: "",
      cityList: [""], //城市列表
      cityCode: '', //城市code
      slots: [
        {
          flex: 1,
          values: [],
          className: "slot",
          textAlign: "center"
        }
      ],
      slots1: [
        {
          flex: 1,
          values: [],
          className: "slots",
          textAlign: "center"
        }
      ]
    };
  },
  created() {
    //获取定位信息
    this.provinceName=this.$store.state.position.localprovince
    this.cityName=this.$store.state.position.localcity
    this.choosedarea = this.provinceName
  },
  mounted() {
    $(".gobottom").height($(".gobottom").height());
    this.info = this.$route.query;
    this.init()
  },
  methods: {
    init() {
      this.$http
        .post(My.Area, { size: 1000, parentId: null, level: 1 })
        .then(res => {
          this.allarea = res.data.data.records;
          this.slots[0].values = [];
          for (var i = 0; i < this.allarea.length; i++) {
            this.slots[0].values.push(this.allarea[i].name);
            if (this.allarea[i].name == this.choosedarea) {
              this.cityid = this.allarea[i].id;
            }
          }
          var param = {
            parentId: this.cityid,
            level: 2,
            size: 100
          };
          this.$http
            .post(Wit.searchCountryAreaCodeListPage, param)
            .then(res => {
              let data = res.data.data.records;
              this.slots1[0].values = [];
              for (let val of data) {
                if(this.cityName==val.name){
                  this.cityCode=val.code
                }
                this.slots1[0].values.push(val.name);
              }
            });
        });
    },
    //保存提交
    async handleSubmit() {
      var self = this;
      var flag = 0;
      if (!self.selected) flag = 1;
      var name = this.name;
      if (name == "") {
        Toast({
          message: "姓名不能为空",
          duration: 1000,
          position: "bottom"
        });
        return false;
      }
      let reg =  /^1\d{10}$/;;
      var numFlag = reg.test(this.num);
      if (!numFlag) {
        Toast({
          message: "手机号码格式不对！",
          duration: 1000,
          position: "bottom"
        });
        return false;
      }
      var address = this.address.trim();
      if (address == "") {
        Toast({
          message: "收货地址不能为空",
          duration: 1000,
          position: "bottom"
        });
        return false;
      }
      var param = {
        userNo: this.$store.state.userId,
        receiveName: this.name, //姓名
        receiveMobile: this.num, //手机号码
        isDefalut: flag, //是否选定为默认1为选择默认
        provinceCode: this.everycode, //所在地区的code
        cityCode: this.cityCode, //城市code
        address: this.address //用户手动输入的地址
      };
      await this.$http.post(My.AddAddress, param).then(res => {
        if (res.data.code == 0) {
          this.no = res.data.data.no;
          this.$router.go(-1);
        }
      });
      if (flag == 1) {
        var param = {
          userNo: this.$store.state.userId,
          receiveName: this.name, //姓名
          receiveMobile: this.num, //手机号码
          isDefalut: flag, //是否选定为默认1为选择默认
          provinceCode: this.everycode, //所在地区的code
          cityCode: this.cityCode, //城市code
          address: this.address, //用户手动输入的地址
          no: this.no
        };
        await this.$http.post(My.Defaultaddress, param).then(res => {});
      }
    },
    isIOSOrAndroid() {
      //判断ios和安卓机型的方法
      var u = navigator.userAgent,
        app = navigator.appVersion;
      var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Linux") > -1; //g
      var isIOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
      if (isAndroid) {
        return "Android";
      } else if (isIOS) {
        return "IOS";
      }
    },
    choosearea() {
      this.shows = true;
      this.bgcolor = true;
    },
    choosecitys() {
      this.showss = true;
      this.bgcolor = true;
    },
    hides() {
      this.bgcolor = false;
      this.shows = false;
      this.showss = false;
      if(!this.change){
        this.choosedarea=this.allarea[0].name;
        this.everyid=this.allarea[0].id;
      }
      let data = {
        parentId: this.everyid, //被检测的省份id
        level: 2,
        size:99,
      };
      this.$http.post(Wit.searchCountryAreaCodeListPage, data).then(res => {
        var city = res.data.data.records;
        this.cityList = city;
        this.slots1[0].values = [];
        for (var i = 0; i < city.length; i++) {
          this.slots1[0].values.push(city[i].name);
        }
      });
    },
    hideses() {
      this.bgcolor = false;
      this.showss = false;
    },
    hidess() {
      this.bgcolor = false;
      this.shows = false;
      this.showss = false;
    },
    onValuesChange(picker, values) {

      this.numadd++
      if(this.numadd>2){
        this.choosedarea=values[0]
        this.change=true
      }else{
        this.choosedarea=this.provinceName
      }
          for (var i = 0; i < this.allarea.length; i++) {
                if (this.choosedarea == this.allarea[i].name) {
                  this.provinceName = this.allarea[i].name;
                  this.everycode = this.allarea[i].code;
                  this.everyid = this.allarea[i].id;
                }
              }
    },
    onValuesChanges(picker, values) {
      this.numcityadd++
      if(this.numcityadd>2){
        this.choosecity=values[0]
      }else{
        this.choosecity=this.cityName
        }
          for(let val of this.cityList){
            if(this.choosecity==val.name){
              this.cityCode=val.code
            }
      }
    }
  }
};
</script>
<style scoped>
.bgcolor {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 999;
}

.contentList {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid #f8f8f8;
  line-height: 1rem;
}

.contentList input {
  width: 60%;
  line-height: 0.8rem;
  font-size: 0.26rem;
  border: none;
  text-align: right;
}

.contentList-left {
  font-size: 0.28rem;
  color: #555;
}

.contentList-right {
  display: flex;
  align-items: center;
  justify-content: flex-end;
}

.pic {
  width: 0.3rem;
  height: 0.4rem;
}

.place {
  color: #222;
  font-size: 0.28rem;
}

.peop {
  font-size: 0.3rem;
  padding: 0.3rem 0;
  color: #555;
}
/*昵称*/

.nickname {
  line-height: 1rem;
}

::-webkit-input-placeholder {
  color: #ccc;
}

:-moz-placeholder {
  color: #ccc;
}

::-moz-placeholder {
  color: #ccc;
}

:-ms-input-placeholder {
  color: #ccc;
}

input {
  background-color: transparent;
  color: #555;
}

.input-label {
  display: block;
  width: 0.28rem;
  height: 0.28rem;
  background-image: url("../../../static/images/my/checked.png");
  border-radius: 50%;
  background-size: 100%;
}

.input-label.active {
  background-image: url("../../../static/images/my/mycar_check.png");
}

input {
  outline: none;
}

.textare {
  background-color: #efefef;
  color: #222;
  border-radius: 0.1rem;
  border: 0;
  font-size: 0.3rem;
  width: 6.9rem;
  height: 1.6rem;
  line-height: 0.34rem;
  padding: 0.2rem 0.4rem;
  outline: none;
}

.city li {
  list-style: none;
  height: 0.5rem;
  font-size: 0.28rem;
  line-height: 0.5rem;
  color: #555;
  text-align: center;
  background-color: #fff;
}

.city {
  position: relative;
}

.citys {
  position: absolute;
  right: 0.06rem;
  height: 3rem;
  overflow: auto;
  z-index: 1001;
  /* padding: 0.1rem 0; */
}

.ft {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  margin-top: 0.33rem;
}

.ft_1 {
  width: 0.3rem;
  height: 0.3rem;
}

.ft_2 {
  font-size: 0.25rem;
  color: #555;
}

.inputcontent {
  z-index: 999;
}
.bottom-btn {
  position: absolute;
  bottom: 0;
  left: 0;
}
</style>
