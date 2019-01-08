<template>  
    <div>
      <!--nav导航Start-->
      <div class="topb"></div>
      <div class="find_nav">
        <div class="find_nav_left">
          <div class="find_nav_list">
            <ul id="pagenavi1">
              <li >
                <a href="javascript:;" class="active">主推车型</a>
              </li>
              <li>
                <a href="javascript:;">全部车型</a>
              </li>
              <li>
                <a href="javascript:;" >经销网点</a>
              </li>
              <li>
                <a href="javascript:;">维保网点</a>
              </li>					
              <!-- <li>
                <a href="javascript:;">维保预约</a>
              </li>					 -->
              <li class="sideline"></li>
            </ul>
          </div>
        </div>
      </div>
      <!--nav导航End-->
      <div
      class="roadrescue" 
             ref="moveDiv"
      >
        <img
        @mousedown="down"
        @mousemove.prevent="move"
        @mouseup="up"
        @touchstart="down"
        @touchmove.prevent="move"
        @touchend="up"
        @click="confirmRevise" 
         src="../../../static/images/Wit/loadhelp.png" alt="">
      </div>
      <div @click="bgclick" class="mask" v-if="flag"></div>
      <ul class="ulList" v-if="flag" @click="cancel()">
        <li class="cont flex column contentcenter" @click="call(1)">
          <span style="font-size:.32rem;color:#222">4008-889933</span>
          <span style="font-size:.22rem;color:#888">(瑞风，和悦)</span>
        </li>
        <li class="cont flex column contentcenter" @click="call(2)">
          <span style="font-size:.32rem;color:#222">4008-009933</span>
          <span style="font-size:.22rem;color:#888">(帅铃，骏铃，康铃)</span>
        </li>
        <li class="cont flex column contentcenter" @click="call(3)">
          <span style="font-size:.32rem;color:#222">4008-003366</span>
          <span style="font-size:.22rem;color:#888">(星锐)</span>
        </li>
        <li class="cont flex column contentcenter" @click="call(4)">
          <span style="font-size:.32rem;color:#222">4008-006633</span>
          <span style="font-size:.22rem;color:#888">(格尔发)</span>
        </li>
        <li class="cont flex column contentcenter" style="border-bottom:none">
          <span style="font-size:.32rem;color:#666">取消</span>
        </li>
      </ul>
      <!--内容Start-->
      <div id="slider1" class="swipe">
        <ul class="box01_list" >
          <li class="li_list " @click="Record(1)">
            <Recomentbus ></Recomentbus>
          </li>
          <li class="li_list specilall" @click="Record(2)">
            <Allbus></Allbus>
          </li>
          <li class="li_list" @click="Record(3)">
            <dealer></dealer>					
          </li>
          <li class="li_list" @click="Record(4)">
            <searchnet></searchnet>					
          </li>
          <!-- <li class="li_list">
            <preweib></preweib>				
          </li> -->
        </ul>
      </div>
      <!--内容End-->
    </div>
 
</template>

<script>
import TouchSl from "../../../src/assets/touchslider.js";
import { MessageBox } from "mint-ui";
import {Toast} from "mint-ui"
import dealer from "./dealer.vue";
import searchnet from "./Search_net.vue";
import Recomentbus from "./Recoment_bus.vue";
import Allbus from "./Allbus.vue";
import Preweib from "./pre_weib.vue";
export default {
  name: "wit",
  data() {
    return {
      flag: false,
      moveFlag: false,
      clickFlag: false,
      position: {
      x: 0,
      y: 0
    },
    nx: '', 
    ny: '', 
    dx: '', 
    dy: '', 
    xPum: '', 
    yPum: '',
    };
  },
  components: {
    dealer,//经销商查询
    searchnet,//维保网点
    Recomentbus,//主推车型
    Allbus,//全部车型
    Preweib,//维保预约
  },
  methods: {
    sliderHeight() {
      var wHeight = $(window).height();
      var sliderHeight = wHeight - 70;

      $(".swipe>li").height(sliderHeight);
    },
    //道路救援
    confirmRevise() {
      if(this.$store.state.userId){

        MessageBox.confirm("", {
          title: "是否允许",
          message: "发送当前手机定位到呼叫中心？",
          showConfirmButton: true,
          showCancelButton: true,
          cancelButtonClass: "cancelButton",
          confirmButtonClass: "confirmButton",
          confirmButtonText: "允许",
          cancelButtonText: "不允许",
          confirmButtonHighlight: true,
          cancelButtonHighlight: true
        })
          .then(action => {
            if (action == "confirm") {
              this.flag = true;
              if (isMobile.iOS()) {
                window.webkit.messageHandlers.iOSLocationNotice.postMessage({}); //调用ios方法发送通知ios调用H5方法传
                var param = {
                  latitude: this.latitude,
                  longitude: this.longitude,
                  positionTypeNo: this.$store.state.userId
                };
                this.$http.post(Wit.Help, param).then(res => {
          });
              } else if (isMobile.Android()) {
                var position = js2android.getLocationInfo();
                var positions = JSON.parse(position);
  
                this.latitude = positions.latitude;
                this.longitude = positions.longitude;
                var param = {
                  latitude: this.latitude,
                  longitude: this.longitude,
                  positionTypeNo: this.$store.state.aaaid
                };
                this.$http.post(Wit.Help, param).then(res => {
          });
              }
            }
          })
          .catch(err => {
            if (err == "cancel") {
              this.flag = true;
            }
          });
      }else{
          Toast({
                  message: "请先登入",
                  position: "middle",
                  duration: 2000
                });
      }
    },
    //取消
    cancel() {
      this.flag = false;
  },
  //记录wit是从哪里跳转的
  Record(num){
      this.$store.dispatch('RECORD',num)
  },
	//点击遮罩层消失
	bgclick(){
		this.flag=false;
  },
  backwit(){
    // console.log($('.find_nav_list li').eq(0))
    if(this.$store.state.record=='1'){
      $('.find_nav_list li').eq(0)
          .addClass("find_nav_cur")
          .siblings()
          .removeClass("find_nav_cur");
      $(".sideline").animate(
      {
        //底部导航条动画移动到点击的li下
        left: $($('.find_nav_list li').eq(0)).position().left
      },
      200
    );
    }else if(this.$store.state.record=='2'){
      $('.find_nav_list li').eq(1)
          .addClass("find_nav_cur")
          .siblings()
          .removeClass("find_nav_cur"); //给点击的li添加激活类名,其它li清除类名
          $(".sideline").animate(
      {
        //底部导航条动画移动到点击的li下
        left: $($('.find_nav_list li').eq(1)).position().left
      },
      300
    );
    }
  
  },
  down(){
     var touch ;
     this.moveFlag = true;
    if(event.touches){
        touch = event.touches[0];
    }else {
        touch = event;
    }
    this.position.x = touch.clientX;
    this.position.y = touch.clientY;
    this.dx = this.$refs.moveDiv.offsetLeft;
    this.dy = this.$refs.moveDiv.offsetTop;　
  },
  move(){
    if (this.moveFlag) {
      var touch;
      var moveDiv = this.$refs.moveDiv
      if(event.touches){
          touch = event.touches[0];
      }else {
          touch = event;
      }
      this.nx = touch.clientX - this.position.x;
      this.ny = touch.clientY - this.position.y;
      this.xPum = this.dx+this.nx;
      this.yPum = this.dy+this.ny;
      if(this.xPum<0){
        this.xPum=0
      }
      let right=document.body.clientWidth-touch.clientX-this.$refs.moveDiv.offsetWidth/2
      if(right<0){
        this.xPum=document.body.clientWidth-this.$refs.moveDiv.offsetHeight
      }
      let bottom=document.body.clientHeight-touch.clientY-this.$refs.moveDiv.offsetHeight
      if(bottom<0){
        this.yPum=document.body.clientHeight-this.$refs.moveDiv.offsetHeight*1.7
      }

      
      if(this.yPum<0){
        this.yPum=0
      }
      moveDiv.style.left = this.xPum+"px";
      moveDiv.style.top = this.yPum +"px";
    }        　
  },
  up(){
    this.moveFlag = false; 
    if (!this.moveFlag) {
    }
  },
	//打电话传号码
	 call(num) {
      var tell = "";
      if (num == 1) {
        tell = "4008-889933";
      } else if (num == 2) {
        tell = "4008-009933";
      } else if (num == 3) {
        tell = "4008-003366";
      } else if (num == 4) {
        tell = "4008-006633";
      }
      if (isMobile.iOS()) {
        window.webkit.messageHandlers.call.postMessage(tell);
      } else if (isMobile.Android()) {
        js2android.call(tell);
      }
    },
    init() {
      var $window = $(window);
      var initialWindowHeight = null;

      $window.resize(function() {
        this.sliderHeight();
      });
      this.sliderHeight();
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
    getIosLocation(locationMes){
      this.$store.dispatch("GETLOCATIONINFO", locationMes)
      // this.$store.state.locationMes=locationMes
    },
    changeTap() {
      var fnl_x, x1, y1, ty_left;
      $(".find_nav_list").css("left", 0);

      $(".find_nav_list li").each(function() {
        //初始遍历li
        $(".sideline").css({
          //设置底部到航线初始值为0
          left: 0
        });
        $(".find_nav_list li")
          .eq(0)
          .addClass("find_nav_cur")
          .siblings()
          .removeClass("find_nav_cur"); //给第一个li添加激活类名,其它兄弟li去除激活的类名
      });

      var nav_w = $(".find_nav_list li")
        .first()
        .width(); //获取第一个li的宽度
      $(".sideline").width(nav_w); //把第一个li的宽度赋值给
      let nav_all=$(".find_nav_list li")
      $(".find_nav_list li").on("click", function() {
        //点击头部li
        // console.log($(this).position().left); //打印出点击li的定位left值
        nav_w = $(this).width(); //获取点击li的宽度
        $(".sideline").stop(true); //先停止底部导航条动画
        $(".sideline").animate(
          {
            //底部导航条动画移动到点击的li下
            left: $(this).position().left
          },
          300
        );
        $(".sideline").animate({
          //底部导航条动画的为li的宽度
          width: nav_w
        });
        $(this)
          .addClass("find_nav_cur")
          .siblings()
          .removeClass("find_nav_cur"); //给点击的li添加激活类名,其它li清除类名
        //对点击li的left值与嵌套盒子宽度做判断,让.find_nav_list盒子的定位left处于正中间
        var fn_w = ($(".find_nav").width() - nav_w) / 2;
        var fnl_l; //第三方变量,最终赋值给.find_nav_list的left的值
        var fnl_x = parseInt($(this).position().left); //点击li的定位left值
        if (fnl_x <= fn_w) {
          fnl_l = 0;
        } else if (fn_w - fnl_x <= flb_w - fl_w) {
          fnl_l = flb_w - fl_w;
        } else {
          fnl_l = fn_w - fnl_x;
        }
        $(".find_nav_list").animate(
          {
            left: fnl_l
          },
          300
        );
      });
      var fl_w = $(".find_nav_list").width(); //find_nav_list的宽度
      var flb_w = $(".find_nav_left").width(); //find_nav_left的宽度
      $(".find_nav_list").on("touchstart", function(e) {
        var touch1 = e.originalEvent.targetTouches[0];
        x1 = touch1.pageX; //获取手指滑动开始的X位置
        y1 = touch1.pageY; //获取手指滑动开始的Y位置
        ty_left = parseInt($(this).css("left")); //获取手指滑动开始的定位left值
        // console.log(touch1,x1,y1,ty_left,'touchstart')
      });
      $(".find_nav_list").on("touchmove", function(e) {
        var touch2 = e.originalEvent.targetTouches[0];
        var x2 = touch2.pageX; //持续获得手指的X,Y的值
        var y2 = touch2.pageY;
        //  console.log(touch2,x2,y2,ty_left,'touchstart')
        if (ty_left + x2 - x1 >= 0) {
          $(this).css("left", 0);
        } else if (ty_left + x2 - x1 <= flb_w - fl_w) {
          $(this).css("left", flb_w - fl_w);
        } else {
          $(this).css("left", ty_left + x2 - x1);
        }
        if (Math.abs(y2 - y1) > 0) {
          e.preventDefault();
        }
      });

      for (var n = 1; n < 9; n++) {
        var page = "pagenavi" + n;
        var mslide = "slider" + n;
        var mtitle = "emtitle" + n;
        var arrdiv = "arrdiv" + n;
        var as = $("#" + page + "").find("a");
        var tt = new TouchSlider({
          id: mslide,
          auto: "-1",
          fx: "ease-in-out",
          direction: "left",
          speed: 600,
          timeout: 5000,
          before: function(index) {
            var as = document
              .getElementById(this.page)
              .getElementsByTagName("a");
            as[this.p].className = "";
            this.p = index;

            fnl_x = parseInt(
              $(".find_nav_list li")
                .eq(this.p)
                .position().left
            );

            nav_w = $(".find_nav_list li")
              .eq(this.p)
              .width();
            $(".sideline").stop(true);
            $(".sideline").animate(
              {
                left: $(".find_nav_list li")
                  .eq(this.p)
                  .position().left
              },
              300
            );
            $(".sideline").animate(
              {
                width: nav_w
              },
              100
            );
            $(".find_nav_list li")
              .eq(this.p)
              .addClass("find_nav_cur")
              .siblings()
              .removeClass("find_nav_cur");
            var fn_w = ($(".find_nav").width() - nav_w) / 2;
            var fnl_l;
            if (fnl_x <= fn_w) {
              fnl_l = 0;
            } else if (fn_w - fnl_x <= flb_w - fl_w) {
              fnl_l = flb_w - fl_w;
            } else {
              fnl_l = fn_w - fnl_x;
            }
            $(".find_nav_list").animate(
              {
                left: fnl_l
              },
              300
            );
          }
        });
        tt.page = page;
        tt.p = 0;
        //console.dir(tt); console.dir(tt.__proto__);

        for (var i = 0; i < as.length; i++) {
          (function() {
            var j = i;
            as[j].tt = tt;
            as[j].onclick = function() {
              this.tt.slide(j);
              return false;
            };
          })();
        }
      }
      this.backwit()
    }
  },
  created() {
    
    var system = this.isIOSOrAndroid();
    if (system == "Android") {
      this.$store.dispatch("GETLOCATIONINFO", js2android.getLocationInfo())
      // this.$store.state.locationMes=js2android.getLocationInfo()
    } else if (system == "IOS") {
      window.getIosLocation = this.getIosLocation; //ios获取定位信息,放到window对象供ios调用
      setTimeout(() => {
        
        window.webkit.messageHandlers.iOSLocationNotice.postMessage({}); //调用ios方法发送通知ios调用H5方法传
      }, 0);
    }
  },
  mounted() {
    this.init();
    this.changeTap();
  },
  beforeDestroy() {}
};
</script>

<style scoped>
.topb {
  width: 100%;
  height: 0.7rem;
  position: fixed;
  background: #fff;
  top: 0;
  z-index: 888;
}
.find_nav {
  width: 100%;
  height: 0.8rem;
  background-color: #fff;
  position: fixed;
  font-size: .28rem;
  font-family: 'PingFangSC';
  top: 0.7rem;
  z-index:888;
  display: flex;
  box-sizing: border-box;
}

.find_nav_left {
  height: 100%;
  position: relative;
  overflow: hidden;
  flex: 1;
}

.find_nav_list {
  position: absolute;
  left: 0;
}

.find_nav_list ul {
  position: relative;
  white-space: nowrap;
  font-size: 0;
}

.find_nav_list ul li {
  display: inline-block;
  padding: 0;
  margin: 0 0.4rem;
}

.find_nav_list ul li a {
  display: block;
  width: 100%;
  height: 100%;
  font-size: 0.28rem;
  text-align: center;
  color: #666;
}

.find_nav_cur a {
  color: #49bbff !important;
}
/* .find_nav_list a.active {
		color: #C00
	} */
.sideline {
  display: block;
  position: absolute;
  border: 0;
  height: 0.03rem;
  background-color: #49bbff;
  left: 0;
  top: 0.6rem;
  pointer-events: none;
}

.li_list {
  height: 100vh !important;
  overflow-y: auto;
  display: table;
}
/*将每个li封闭成一个盒子，就可以独立每个li内的内容*/
.li_list span {
  display: block;
  height: 0.3rem;
  overflow: hidden;
  background: rgba(255, 255, 255, 0.2);
  color: #fff;
  margin: 0 0 0.2rem;
  font-size: 0.55rem;
  line-height: 3rem;
  text-align: center;
}

.swipe {
  padding: 0.7rem 0 0 0;
}
.roadrescue {
  position: fixed;
  display: table-cell;
  text-align: center;
  vertical-align: middle;
  width: 1.3rem;
  height: 1.3rem;
  z-index: 9999;
  top:50% ;
  right: 0.3rem;
  border-radius: 50%;
}
.roadrescue>img{
  width: 1.3rem;
  height: 1.3rem;
  position: absolute;
  top: 50%;
  left: 50%;
  margin-top: -.5rem;
  margin-left: -.5rem;
}
.ulList {
  width: 100%;
  background-color: #fff;
  position: fixed;
  bottom: 0;
  left: 0;
  padding: 0.1rem;
  z-index: 10001;
}
.ulList>li{
  padding: .15rem 0;
}
.mask {
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
}
</style>