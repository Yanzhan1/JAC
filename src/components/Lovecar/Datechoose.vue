<template>
  <div>
    <header class="header">
      <!-- <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">{{this.times}}</span>
      <span class="header-right"><img src="/static/images/Lovecar/zhankai@2x.png" alt="" @click="choose_times"></span> -->

      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <div class="header-title flex row cocenter">
        <span>{{this.times}}</span>
        <img :src="'./static/images/Lovecar/zhankai@2x.png'" alt="" @click="choose_times" style="width:.18rem;height:.1rem;margin-left:.1rem">
      </div>
      <span class="header-right"></span>
    </header>
    <div style="width:100%;height:.01rem;background:#f1f1f1"></div>
    <div style="margin-top:.95rem;height:11.16rem;width:100%;" class="nav">
      <div v-if="this.times=='年'">
        <div class="every_times">
          <img :src="'./static/images/Lovecar/left-balck.png'" alt="" class="img_l" @click="l_year">
          <div class="center">{{this.leftnewsyear}}年~{{this.newsyear}}年</div>
          <img :src="'./static/images/Lovecar/right-black.png'" alt="" class="img_r" @click="r_year">
          <div class="year_main" style="position:absolute;width:100%;top:1rem">
            <div class="year_center" v-for="(item,index) in arrayyear" @click.stop="changecoloryear($event,index)" :class="{blue:current==index}" :key="index">{{item}}</div>
          </div>
        </div>
      </div>
      <div v-if="this.times=='月'">
        <div class="every_times">
          <img :src="'./static/images/Lovecar/left-balck.png'" alt="" class="img_l" @click="turn_l">
          <div class="center">{{this.newdates.years}}年{{this.newdates.months}}月</div>
          <img :src="'./static/images/Lovecar/right-black.png'" alt="" class="img_r" @click="turn_r">
          <div style="position:absolute" class="date_all">
            <div class="date_top">
              <div>一</div>
              <div>二</div>
              <div>三</div>
              <div>四</div>
              <div>五</div>
              <div style="color:#FF3366">六</div>
              <div style="color:#FF3366">日</div>
            </div>
            <div class="date_center" v-for="(item,index) in arraynum" :key="index">{{item}}</div>
          </div>
        </div>
      </div>
      <div v-if="this.times=='周'">
        <div class="every_times">
          <img :src="'./static/images/Lovecar/left-balck.png'" alt="" class="img_l" @click="turn_l_week">
          <div class="center">{{this.newdates.years}}年{{this.newdates.months}}月,第{{this.showweek}}周</div>
          <img :src="'./static/images/Lovecar/right-black.png'" alt="" class="img_r" @click="turn_r_week">
          <div style="position:absolute" class="date_all">
            <div class="addweek">
              <div class="date_top addweeks" v-for="(item,index) in newarr" ref="color">
                {{item}}
                <!-- <div>一</div>
                <div>二</div>
                <div>三</div>
                <div>四</div>
                <div>五</div>
                <div style="color:#FF3366">六</div>
                <div style="color:#FF3366">日</div> -->
              </div>
            </div>
            <div class="date_center" v-for="(item,index) in newarraynum" :key="index">{{item}}</div>
          </div>
        </div>
      </div>
      <div v-if="this.times=='日'">
        <div class="every_times">
          <img :src="'./static/images/Lovecar/left-balck.png'" alt="" class="img_l" @click="turn_l">
          <div class="center">{{this.newdates.years}}年{{this.newdates.months}}月{{this.showdate}}日</div>
          <img :src="'./static/images/Lovecar/right-black.png'" alt="" class="img_r" @click="turn_r">
          <div style="position:absolute" class="date_all">
            <div class="date_top">
              <div>一</div>
              <div>二</div>
              <div>三</div>
              <div>四</div>
              <div>五</div>
              <div style="color:#FF3366">六</div>
              <div style="color:#FF3366">日</div>
            </div>
            <div class="date_center" v-for="(item,index) in arraynum" @click.stop="changecolor($event,index)" :class="{blue:current==index}" :key="index">{{item}}</div>
          </div>
        </div>
      </div>
    </div>
    <div class="date_bottom">
      <div class="cheek" @click="cheeks">点击查询</div>
    </div>
    <div>

    </div>
    <div class="choose_date" v-show="this.opentime">
      <img :src="'./static/images/Lovecar/delete@2x.png'" alt="" @click="close_times">
      <div class="choose_data_t">
        <div @click="year">
          <span>年</span><img :src="'./static/images/Lovecar/gou.png'" alt="" class="img" v-show="this.showgou4"></div>
        <div @click="month">
          <span>月</span><img :src="'./static/images/Lovecar/gou.png'" alt="" class="img" v-show="this.showgou1"></div>
        <div @click="week">
          <span>周</span><img :src="'./static/images/Lovecar/gou.png'" alt="" class="img" v-show="this.showgou2"></div>
        <div @click="day">
          <span>日</span><img :src="'./static/images/Lovecar/gou.png'" alt="" class="img" v-show="this.showgou3"></div>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div class="black" v-show="this.opentime" @click="close_times"></div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      current: 11, //用来判断日的时候具体选择哪一个的index
      times: "月", //默认选择月
      opentime: false, //遮罩层
      showgou1: true, //选择月的选项
      showgou2: false, //选择周的选项
      showgou3: false, //选择日的选项
      showgou4: false, //选择年的选项
      showdate: "", //选择具体的日
      showweek: 1, //选择具体的周
      showyear: "", //选择具体的年
      newsday: "", //当天的日
      monthsstart: "",
      monthsend: "",
      newsyear: "", //当前年份
      leftnewsyear: "",
      // newdates:'',
      newdates: { years: "", months: "" },
      arraynum: [], //需要被渲染的数组
      arrayyear: [], //年
      array1: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31"
      ],
      array2: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30"
      ],
      array3: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29"
      ],
      array4: [
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28"
      ],
      newarray1: [],
      newarray2: [],
      newarray3: [],
      newarray4: [],
      newarraynum: [],
      // arrweek:['一','二','三','四','五','六','日'],
      newarr:['一','二','三','四','五','六','日'],
    };

  },
  mounted() {
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    this.newsday = date.getDate();
    this.newdates.years = year;
    this.newdates.months = month;
    this.newsyear = year;
    this.leftnewsyear = this.newsyear - 11;
    for (var i = this.leftnewsyear; i <= this.newsyear; i++) {
      this.arrayyear.push(i);
    }
    if (
      this.newdates.months == 1 ||
      this.newdates.months == 3 ||
      this.newdates.months == 5 ||
      this.newdates.months == 7 ||
      this.newdates.months == 8 ||
      this.newdates.months == 10 ||
      this.newdates.months == 12
    ) {
      this.arraynum = this.array1;
    }
    if (
      this.newdates.months == 4 ||
      this.newdates.months == 6 ||
      this.newdates.months == 9 ||
      this.newdates.months == 11
    ) {
      this.arraynum = this.array2;
    }
    if (this.newdates.months == 2) {
      if (this.newdates.years % 4 == 0 || this.newdates.years % 400 == 0) {
        this.arraynum = this.array4;
      } else {
        this.arraynum = this.array3;
      }
    }
    //判断当前时间是当月的第几周
    var getMonthWeek = function(a, b, c) {
      //a = d = 当前日期
      //b = 6 - w = 当前周的还有几天过完(不算今天)
      //a + b 的和在除以7 就是当天是当前月份的第几周
      var date = new Date(a, parseInt(b) - 1, c),
        w = date.getDay(),
        d = date.getDate();
      return Math.ceil((d + 6 - w) / 7);
    };
    var n = getMonthWeek(
      this.newdates.years,
      this.newdates.months,
      this.showdate
    );
    //判断周
    switch (n) {
      case 1:
        this.showweek = "1";
        break;
      case 2:
        this.showweek = "2";
        break;
      case 3:
        this.showweek = "3";
        break;
      case 4:
        this.showweek = "4";
        break;
      case 5:
        this.showweek = "5";
        break;
    }
    this.weeknew();
    this.topweek()
  },
  updated() {
    if (this.times != "周") {
      this.week_left();
    }
    this.reduceleft();
  },
  methods: {
    choose_times() {
      this.opentime = true;
    },
    close_times() {
      this.opentime = false;
    },
    l_year() {
      this.leftnewsyear -= 11;
      this.newsyear -= 11;
      this.arrayyear = [];
      for (var i = this.leftnewsyear; i <= this.newsyear; i++) {
        this.arrayyear.push(i);
      }
    },
    r_year() {
      if (this.newsyear < new Date().getFullYear()) {
        this.leftnewsyear += 11;
        this.newsyear += 11;
        this.arrayyear = [];
        for (var i = this.leftnewsyear; i <= this.newsyear; i++) {
          this.arrayyear.push(i);
        }
      }
    },
    year() {
      this.showgou4 = true;
      this.showgou1 = false;
      this.showgou2 = false;
      this.showgou3 = false;
      setTimeout(() => {
        this.opentime = false;
      }, 200);
      this.times = "年";
    },
    month() {
      this.showgou1 = true;
      this.showgou2 = false;
      this.showgou3 = false;
      this.showgou4 = false;
      setTimeout(() => {
        this.opentime = false;
      }, 200);
      this.times = "月";
    },
    week() {
      this.showgou1 = false;
      this.showgou2 = true;
      this.showgou3 = false;
      this.showgou4 = false;
      setTimeout(() => {
        this.opentime = false;
      }, 200);
      this.times = "周";
    },
    day() {
      this.showgou1 = false;
      this.showgou2 = false;
      this.showgou3 = true;
      this.showgou4 = false;
      setTimeout(() => {
        this.opentime = false;
      }, 200);
      this.times = "日";
    },
    //解决周部分不需要右margin的问题
    reduceleft() {
      if (this.times == "周") {
        var center_l = document.getElementsByClassName("date_center");
        center_l[0].style.marginLeft = "0rem";
      }
      if (this.times == "年") {
        var center_ll = document.getElementsByClassName("year_center");
        center_ll[0].style.marginLeft = 0;
      }
    },
    //根据每个月的1号是星期几判断每个月1号与左边的距离
    week_left() {
      if (this.times != "周" && this.times != "年") {
        var dt = new Date(this.newdates.years, this.newdates.months - 1, 1);
        var n = dt.getDay();
        var center_l = document.getElementsByClassName("date_center");
        switch (n) {
          case 0: //一号是星期天
            center_l[0].style.marginLeft = "85.59%";
            center_l[0].style.borderLeft = ".01rem solid #eee";
            break;
          case 2: //一号是星期二
            center_l[0].style.marginLeft = "14.26%";
            center_l[0].style.borderLeft = ".01rem solid #eee";
            break;
          case 3: //一号是星期三
            center_l[0].style.marginLeft = "28.52%";
            center_l[0].style.borderLeft = ".01rem solid #eee";
            break;
          case 4: //一号是星期四
            center_l[0].style.marginLeft = "42.81%";
            center_l[0].style.borderLeft = ".01rem solid #eee";
            break;
          case 5: //一号是星期五
            center_l[0].style.marginLeft = "57.07%";
            center_l[0].style.borderLeft = ".01rem solid #eee";
            break;
          case 6: //一号是星期六
            center_l[0].style.marginLeft = "71.33%";
            center_l[0].style.borderLeft = ".01rem solid #eee";
            break;
        }
      }
    },
    //周渲染的数据
    weeknew() {
      if (this.showweek == 1) {
        this.newarray1 = this.array1.slice(0, 7);
        this.newarraynum = this.newarray1;
      }
      if (this.showweek == 2) {
        this.newarray1 = this.array1.slice(7, 14);
        this.newarraynum = this.newarray1;
      }
      if (this.showweek == 3) {
        this.newarray1 = this.array1.slice(14, 21);
        this.newarraynum = this.newarray1;
      }
      if (this.showweek == 4) {
        this.newarray1 = this.array1.slice(21, 28);
        this.newarraynum = this.newarray1;
      }
      if (this.showweek == 5) {
        if (
          this.newdates.months == 1 ||
          this.newdates.months == 3 ||
          this.newdates.months == 5 ||
          this.newdates.months == 7 ||
          this.newdates.months == 8 ||
          this.newdates.months == 10 ||
          this.newdates.months == 12
        ) {
          this.newarray1 = this.array1.slice(28, 31);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray1 = this.array1.slice(28, 30);
          this.newarraynum = this.newarray1;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarray1 = this.array1.slice(28, 28);
            this.newarraynum = this.newarray1;
          } else {
            this.newarray1 = this.array1.slice(28, 29);
            this.newarraynum = this.newarray1;
          }
        }
      }
    },
    //输入年月，输出具体的某一周的起止日期
    getInfo(year, month) {
      var d = new Date();
      // what day is first day
      d.setFullYear(year, month - 1, 1);
      var w1 = d.getDay();
      if (w1 == 0) w1 = 7;
      // total day of month
      d.setFullYear(year, month, 0);
      var dd = d.getDate();
      // first Monday
      var d1;
      if (w1 != 1) d1 = 7 - w1 + 2;
      else d1 = 1;
      var week_count = Math.ceil((dd - d1 + 1) / 7);
      var arrfrom = [];
      var arrto = [];
      for (var i = 0; i < week_count; i++) {
        var monday = d1 + i * 7;
        var sunday = monday + 6;
        var from = year + "-" + month + "-" + monday;
        var to;
        if (sunday <= dd) {
          to = year + "-" + month + "-" + sunday;
        } else {
          d.setFullYear(year, month - 1, sunday);
          to = d.getFullYear() + "-" + (d.getMonth() + 1) + "-" + d.getDate();
        }
        arrfrom.push(from);
        arrto.push(to);
        // console.log(i + 1, from, to)
      }
      return { arrfrom, arrto };
    },
    topweek(){
      var dt = new Date(this.newdates.years, this.newdates.months - 1, 1);
      //m表示当月的1号是周几
      var m = dt.getDay();
      // console.log(this.newdates.years,this.newdates.months)
      // console.log(m);
      if(m==0){
        this.newarr=[]
        this.newarr.push('日','一','二','三','四','五','六')
      }
      if(m==1){
        this.newarr=[]
        this.newarr.push('一','二','三','四','五','六','日')
      }
      if(m==2){
        this.newarr=[]
        this.newarr.push('二','三','四','五','六','日','一')
      }
      if(m==3){
        this.newarr=[]
        this.newarr.push('三','四','五','六','日','一','二')
      }
      if(m==4){
        this.newarr=[]
        this.newarr.push('四','五','六','日','一','二','三')
      }
      if(m==5){
        this.newarr=[]
        this.newarr.push('五','六','日','一','二','三','四')
      }
      if(m==6){
        this.newarr=[]
        this.newarr.push('六','日','一','二','三','四','五')
      }
      // console.log(this.$refs.color)
      // console.log($('.addweeks'))
    },
    //选择每个月的第几周的天数排列出来
    // week_choose() {
    //   var dt = new Date(this.newdates.years, this.newdates.months - 1, 1);
    //   //m表示当月的1号是周几
    //   var m = dt.getDay();
    //   console.log(m);
    //   if (this.showweek == 1) {
    //     if (m == 0) {
    //       m = 7;
    //     }
    //     if (
    //       this.newdates.months == 1 ||
    //       this.newdates.months == 3 ||
    //       this.newdates.months == 5 ||
    //       this.newdates.months == 7 ||
    //       this.newdates.months == 8 ||
    //       this.newdates.months == 10 ||
    //       this.newdates.months == 12
    //     ) {
    //       this.newarray1 = this.array1.slice(0, 7 - m);
    //       this.newarraynum = this.newarray1;
    //     }
    //     if (
    //       this.newdates.months == 4 ||
    //       this.newdates.months == 6 ||
    //       this.newdates.months == 9 ||
    //       this.newdates.months == 11
    //     ) {
    //       this.newarray2 = this.array2.slice(0, 7 - m);
    //       this.newarraynum = this.newarray2;
    //     }
    //     if (this.newdates.months == 2) {
    //       if (
    //         this.newdates.years % 4 == 0 ||
    //         (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
    //       ) {
    //         this.newarray3 = this.array3.slice(0, 7 - m);
    //         console.log(this.newarray3);
    //         this.newarraynum = this.newarray3;
    //       } else {
    //         this.newarray4 = this.array4.slice(0, 7 - m);
    //         this.newarraynum = this.newarray4;
    //       }
    //     }
    //   }
    //   if (this.showweek == 2) {
    //     if (m == 0) {
    //       m = 7;
    //     }
    //     if (
    //       this.newdates.months == 1 ||
    //       this.newdates.months == 3 ||
    //       this.newdates.months == 5 ||
    //       this.newdates.months == 7 ||
    //       this.newdates.months == 8 ||
    //       this.newdates.months == 10 ||
    //       this.newdates.months == 12
    //     ) {
    //       this.newarray1 = this.array1.slice(7 - m, 14 - m);
    //       this.newarraynum = this.newarray1;
    //     }
    //     if (
    //       this.newdates.months == 4 ||
    //       this.newdates.months == 6 ||
    //       this.newdates.months == 9 ||
    //       this.newdates.months == 11
    //     ) {
    //       this.newarray2 = this.array2.slice(7 - m, 14 - m);
    //       this.newarraynum = this.newarray2;
    //     }
    //     if (this.newdates.months == 2) {
    //       if (
    //         this.newdates.years % 4 == 0 ||
    //         (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
    //       ) {
    //         this.newarray4 = this.array4.slice(7 - m, 14 - m);
    //         this.newarraynum = this.newarray4;
    //       } else {
    //         this.newarray3 = this.array3.slice(7 - m, 14 - m);
    //         this.newarraynum = this.newarray3;
    //       }
    //     }
    //   }
    //   if (this.showweek == 3) {
    //     if (m == 0) {
    //       m = 7;
    //     }
    //     if (
    //       this.newdates.months == 1 ||
    //       this.newdates.months == 3 ||
    //       this.newdates.months == 5 ||
    //       this.newdates.months == 7 ||
    //       this.newdates.months == 8 ||
    //       this.newdates.months == 10 ||
    //       this.newdates.months == 12
    //     ) {
    //       this.newarray1 = this.array1.slice(14 - m, 21 - m);
    //       this.newarraynum = this.newarray1;
    //     }
    //     if (
    //       this.newdates.months == 4 ||
    //       this.newdates.months == 6 ||
    //       this.newdates.months == 9 ||
    //       this.newdates.months == 11
    //     ) {
    //       this.newarray2 = this.array2.slice(14 - m, 21 - m);
    //       this.newarraynum = this.newarray2;
    //     }
    //     if (this.newdates.months == 2) {
    //       if (
    //         this.newdates.years % 4 == 0 ||
    //         (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
    //       ) {
    //         this.newarray4 = this.array4.slice(14 - m, 21 - m);
    //         this.newarraynum = this.newarray4;
    //       } else {
    //         this.newarray3 = this.array3.slice(14 - m, 21 - m);
    //         this.newarraynum = this.newarray3;
    //       }
    //     }
    //   }
    //   if (this.showweek == 4) {
    //     if (m == 0) {
    //       m = 7;
    //     }
    //     if (
    //       this.newdates.months == 1 ||
    //       this.newdates.months == 3 ||
    //       this.newdates.months == 5 ||
    //       this.newdates.months == 7 ||
    //       this.newdates.months == 8 ||
    //       this.newdates.months == 10 ||
    //       this.newdates.months == 12
    //     ) {
    //       this.newarray1 = this.array1.slice(21 - m, 28 - m);
    //       this.newarraynum = this.newarray1;
    //     }
    //     if (
    //       this.newdates.months == 4 ||
    //       this.newdates.months == 6 ||
    //       this.newdates.months == 9 ||
    //       this.newdates.months == 11
    //     ) {
    //       this.newarray2 = this.array2.slice(21 - m, 28 - m);
    //       this.newarraynum = this.newarray2;
    //     }
    //     if (this.newdates.months == 2) {
    //       if (
    //         this.newdates.years % 4 == 0 ||
    //         (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
    //       ) {
    //         this.newarraynum = this.newarray4;
    //         this.newarray4 = this.array4.slice(21 - m, 28 - m);
    //       } else {
    //         this.newarray3 = this.array3.slice(21 - m, 28 - m);
    //         this.newarraynum = this.newarray3;
    //       }
    //     }
    //   }
    //   if (this.showweek == 5) {
    //     if (m == 0) {
    //       m = 7;
    //     }
    //     if (
    //       this.newdates.months == 1 ||
    //       this.newdates.months == 3 ||
    //       this.newdates.months == 5 ||
    //       this.newdates.months == 7 ||
    //       this.newdates.months == 8 ||
    //       this.newdates.months == 10 ||
    //       this.newdates.months == 12
    //     ) {
    //       this.newarray1 = this.array1.slice(28 - m, 35 - m);
    //       this.newarraynum = this.newarray1;
    //     }
    //     if (
    //       this.newdates.months == 4 ||
    //       this.newdates.months == 6 ||
    //       this.newdates.months == 9 ||
    //       this.newdates.months == 11
    //     ) {
    //       this.newarray2 = this.array2.slice(28 - m, 35 - m);
    //       this.newarraynum = this.newarray2;
    //     }
    //     if (this.newdates.months == 2) {
    //       if (
    //         this.newdates.years % 4 == 0 ||
    //         (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
    //       ) {
    //         this.newarraynum = this.newarray4;
    //         this.newarray4 = this.array4.slice(28 - m, 35 - m);
    //       } else {
    //         this.newarray3 = this.array3.slice(28 - m, 35 - m);
    //         this.newarraynum = this.newarray3;
    //       }
    //     }
    //   }
    //   if (this.showweek == 6) {
    //     if (m == 0) {
    //       m = 7;
    //     }
    //     if (
    //       this.newdates.months == 1 ||
    //       this.newdates.months == 3 ||
    //       this.newdates.months == 5 ||
    //       this.newdates.months == 7 ||
    //       this.newdates.months == 8 ||
    //       this.newdates.months == 10 ||
    //       this.newdates.months == 12
    //     ) {
    //       this.newarray1 = this.array1.slice(35 - m, 38 - m);
    //       this.newarraynum = this.newarray1;
    //     }
    //     if (
    //       this.newdates.months == 4 ||
    //       this.newdates.months == 6 ||
    //       this.newdates.months == 9 ||
    //       this.newdates.months == 11
    //     ) {
    //       this.newarray2 = this.array2.slice(35 - m, 38 - m);
    //       this.newarraynum = this.newarray2;
    //     }
    //     if (this.newdates.months == 2) {
    //       if (
    //         this.newdates.years % 4 == 0 ||
    //         (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
    //       ) {
    //         this.newarray4 = this.array4.slice(35 - m, 38 - m);
    //         this.newarraynum = this.newarray4;
    //       } else {
    //         this.newarray3 = this.array3.slice(35 - m, 38 - m);
    //         this.newarraynum = this.newarray3;
    //       }
    //     }
    //   }
    // },
    //点击切换周左按钮
    turn_l_week() {
      if (this.showweek > 1 && this.showweek <= 5) {
        this.showweek--;
      }
      this.weeknew();
      if (this.showweek > 2 && this.showweek <= 5) {
        this.week_left();
      }
      this.reduceleft();
    },
    //点击切换右按钮的周
    turn_r_week() {
      if (this.showweek > 0 && this.showweek < 5) {
        this.showweek++;
      }
      this.weeknew();
      this.reduceleft();
    },
    turn_l() {
      this.newdates.months--;
      if (this.newdates.months == 0) {
        this.newdates.months = 12;
        this.newdates.years--;
      }
      //判断月份选择哪个数组渲染
      if (
        this.newdates.months == 1 ||
        this.newdates.months == 3 ||
        this.newdates.months == 5 ||
        this.newdates.months == 7 ||
        this.newdates.months == 8 ||
        this.newdates.months == 10 ||
        this.newdates.months == 12
      ) {
        this.arraynum = this.array1;
      }
      if (
        this.newdates.months == 4 ||
        this.newdates.months == 6 ||
        this.newdates.months == 9 ||
        this.newdates.months == 11
      ) {
        this.arraynum = this.array2;
      }
      if (this.newdates.months == 2) {
        if (this.newdates.years % 4 == 0 || this.newdates.years % 400 == 0) {
          this.arraynum = this.array4;
        } else {
          this.arraynum = this.array3;
        }
      }
      this.week_left();
      this.topweek();
    },
    turn_r() {
      var date = new Date();
      if (
        this.newdates.years == date.getFullYear() &&
        this.newdates.months == date.getMonth() + 1
      ) {
        this.newdates.years == date.getFullYear();
        this.newdates.months == date.getMonth();
      } else {
        if (
          this.newdates.years <= date.getFullYear() &&
          this.newdates.months <= 13
        ) {
          this.newdates.months++;
          if (this.newdates.months == 13) {
            this.newdates.months = 1;
            this.newdates.years++;
          }
        }
      }
      if (
        this.newdates.months == 1 ||
        this.newdates.months == 3 ||
        this.newdates.months == 5 ||
        this.newdates.months == 7 ||
        this.newdates.months == 8 ||
        (this.newdates.months == 10) | (this.newdates.months == 12)
      ) {
        this.arraynum = this.array1;
      }
      if (
        this.newdates.months == 4 ||
        this.newdates.months == 6 ||
        this.newdates.months == 9 ||
        this.newdates.months == 11
      ) {
        this.arraynum = this.array2;
      }
      if (this.newdates.months == 2) {
        if (this.newdates.years % 4 == 0 || this.newdates.years % 400 == 0) {
          this.arraynum = this.array4;
        } else {
          this.arraynum = this.array3;
        }
      }
      this.week_left();
      this.topweek();
    },
    //日部分判断点击之后的日子没有燃油数据以及日的选择
    changecolor(el, index) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      if (
        this.newdates.years == year &&
        this.newdates.months == month &&
        el.target.innerHTML > day
      ) {
        MessageBox({
          title: "提示",
          message: "您当天没有燃油消耗的数据",
          showCanceButton: true
        });
      } else {
        this.current = index;
        // el.target.style.backgroundColor='#49bbff';
        this.showdate = el.target.innerHTML;
      }
    },
    changecoloryear(el, index) {
      this.current = index;
      // el.target.style.backgroundColor='#49bbff';
      this.showyear = el.target.innerHTML;
    },
    //点击查询时候传过去的东西
    cheeks() {
      //根据选择的是日或者周选择传过去的起始和结束时间戳
      if (this.times == "日") {
        this.monthsstart = this.Changetimestamp();
        this.monthsend = new Date().getTime();
      }
      if (this.times == "周") {
        this.monthsstart = this.Changetimestamp()[0];
        this.monthsend = this.Changetimestamp()[1];
      }
      if (this.times == "月") {
        this.monthsstart = this.Changetimestamp()[1];
        this.monthsend = this.Changetimestamp()[0];
      }
      if (this.times == "年") {
        this.monthsstart = this.Changetimestamp()[1];
        this.monthsend = this.Changetimestamp()[0];
      }
      console.log(this.Changetimestamp());
      this.$router.push({
        name: "燃油查询",
        params: {
          begintime: this.monthsstart, //传过去的起始时间戳
          endtime: this.monthsend, //传过去的结束时间戳
          times: this.times, //传过去的顶部显示的年月日
          showtop: this.newdates, //传过去的具体年和月是个对象
          showtopdate: this.showdate //传过去的具体日
        }
      });
    },
    //转化时间戳
    Changetimestamp(value) {
      if (this.times == "日") {
        return operationTime.toTimeStamp(this.callback0);
      }
      if (this.times == "周") {
        this.getInfo(this.newdates.years, this.newdates.months);
        if (this.showweek == 1) {
          return [
            operationTime.toTimeStamp(
              this.getInfo(this.newdates.years, this.newdates.months).arrfrom[0]
            ), //起始
            operationTime.toTimeStamp(
              this.getInfo(this.newdates.years, this.newdates.months).arrto[0]
            ) //结束
          ];
        }
        if (this.showweek == 2) {
          return [
            operationTime.toTimeStamp(
              this.getInfo(this.newdates.years, this.newdates.months).arrfrom[1]
            ), //起始
            operationTime.toTimeStamp(
              this.getInfo(this.newdates.years, this.newdates.months).arrto[1]
            ) //结束
          ];
        }
        if (this.showweek == 3) {
          return [
            operationTime.toTimeStamp(
              this.getInfo(this.newdates.years, this.newdates.months).arrfrom[2]
            ), //起始
            operationTime.toTimeStamp(
              this.getInfo(this.newdates.years, this.newdates.months).arrto[2]
            ) //结束
          ];
        }
        if (this.showweek == 4) {
          return [
            operationTime.toTimeStamp(
              this.getInfo(this.newdates.years, this.newdates.months).arrfrom[3]
            ), //起始
            operationTime.toTimeStamp(
              this.getInfo(this.newdates.years, this.newdates.months).arrto[3]
            ) //结束
          ];
        }
      }
      if (this.times == "月") {
        if (this.times == "年" && this.showyear == new Date().getFullYear()) {
          return [
            operationTime.toTimeStamp(this.callbacknow),
            operationTime.toTimeStamp(this.callback1)
          ];
        } else {
          if (this.newdates.month == 1 || 3 || 5 || 7 || 8 || 10 || 12) {
            return [
              operationTime.toTimeStamp(this.callback31),
              operationTime.toTimeStamp(this.callback1)
            ];
          }
          if (this.newdates.months == 4 || 6 || 9 || 11) {
            return [
              operationTime.toTimeStamp(this.callback30),
              operationTime.toTimeStamp(this.callback1)
            ];
          }
          if (this.newdates.months == 2) {
            if (
              this.newdates.years % 4 == 0 ||
              (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
            ) {
              return [
                operationTime.toTimeStamp(this.callback28),
                operationTime.toTimeStamp(this.callback1)
              ];
            } else {
              return [
                operationTime.toTimeStamp(this.callback29),
                operationTime.toTimeStamp(this.callback1)
              ];
            }
          }
        }
      }
      if (this.times == "年") {
        if (this.times == "年" && this.showyear == new Date().getFullYear()) {
          return [
            operationTime.toTimeStamp(this.callbacknow),
            operationTime.toTimeStamp(this.callbackyearstart)
          ];
        } else {
          return [
            operationTime.toTimeStamp(this.callbackyearlast),
            operationTime.toTimeStamp(this.callbackyearstart)
          ];
        }
      }
    }
  },
  computed: {
    //年月日拼接
    callback00: function() {
      return new Date().getFullYear() + "-1-01";
    },
    callback0: function() {
      return (
        this.newdates.years + "-" + this.newdates.months + "-" + this.showdate
      );
    },
    //年月拼接
    callback31: function() {
      return this.newdates.years + "-" + this.newdates.months + "-" + "31";
    },
    callback30: function() {
      return this.newdates.years + "-" + this.newdates.months + "-" + "30";
    },
    callback29: function() {
      return this.newdates.years + "-" + this.newdates.months + "-" + "29";
    },
    callback28: function() {
      return this.newdates.years + "-" + this.newdates.months + "-" + "28";
    },
    callback1: function() {
      return this.newdates.years + "-" + this.newdates.months + "-" + "1";
    },
    callbacknow: function() {
      return (
        this.newsyear.years + "-" + this.newdates.months + "-" + this.newsday
      );
    },
    callbackyearlast: function() {
      return this.showyear + "-" + "12" + "-" + "31";
    },
    callbackyearstart: function() {
      return this.showyear + "-" + "1" + "-" + "1";
    }
  }
};
</script>

<style scoped>
.header-right > img {
  position: absolute;
  width: 0.18rem;
  height: 0.1rem;
  top: 0.42rem;
  left: 4.02rem;
}
.every_times {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 0.93rem;
  background: #fff;
  font: Medium 0.28rem/0.3rem "PingFang-SC-Medium";
}
.every_times > img {
  width: 0.16rem;
  height: 0.26rem;
  position: absolute;
}
.every_times .img_l {
  left: 0.68rem;
  top: 0.39rem;
}
.every_times .img_r {
  right: 0.52rem;
  top: 0.39rem;
}
.center {
  position: absolute;
}
.choose_date {
  position: absolute;
  top: 0;
  z-index: 1000;
  width: 100%;

  background: #fff;
}

.choose_date > img {
  position: absolute;
  width: 0.2rem;
  height: 0.2rem;
  top: 0.35rem;
  left: 0.3rem;
}
.choose_data_t {
  margin-top: 0.96rem;
  height: 3.83rem;
}
.choose_data_t > div {
  height: 0.96rem;
  width: 100%;
  border-bottom: 0.01rem solid #f1f1f1;
  font-family: PingFang-SC-Medium;
  font-weight: Medium;
  line-height: 0.96rem;
  font-size: 0.27rem;
  color: #222;
  vertical-align: middle;
  padding-left: 0.7rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.choose_data_t .img {
  width: 0.35rem;
  height: 0.31rem;
  margin-right: 0.19rem;
}
.black {
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
}
.table > hr > th {
  font-family: PingFang-SC-Medium;
  font-weight: Medium;
  font-size: 0.19rem;
  line-height: 0.24rem;
  color: #333;
}
.date_all {
  width: 100%;
  top: 0.93rem;
  left: 0rem;
  font-family: PingFang-SC-Medium;
  font-weight: Medium;
  font-size: 0.19rem;
  line-height: 0.24rem;
  color: #333;
}
.date_top {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
}
.date_top > div {
  width: 14.26%;
  text-align: center;
  border: 0.01rem solid #eee;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
  border-left: 0;
}
.date_weekall {
  width: 100%;
  top: 0.93rem;
  left: 0rem;
  font-family: PingFang-SC-Medium;
  font-weight: Medium;
  font-size: 0.19rem;
  line-height: 0.24rem;
  color: #333;
}
.date_week {
  display: flex;
  flex: 1;
  justify-content: center;
  align-items: center;
  border-bottom: 0.01rem solid #eee;
}
.date_week > div {
  width: 14.26%;
  text-align: center;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
}
.date_center {
  width: 14.26%;
  height: 1.07rem;
  border: 0.01rem solid #eee;
  border-left: 0;
  float: left;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
  background: #e8f5ff;
}
.year_center {
  width: 24.9%;
  height: 1.6rem;
  background: #e8f5ff;
  float: left;
  text-align: left;
  font-size: 0.3rem;
  font-family: PingFang SC;
  font-weight: Medium;
  color: #222;
  line-height: 1.2rem;
  padding-left: 0.28rem;
}
.date_bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 0.98rem;
  background: #49bbff;
}
.date_bottom .cheek {
  text-align: center;
  line-height: 0.98rem;
  font-family: PingFang-SC-Medium;
  font-weight: Medium;
  font-size: 0.31rem;
  color: #fff;
}
.week_center {
  width: 14.26%;
  height: 1.07rem;
  float: left;
  text-align: center;
  line-height: 1rem;
}
year_main {
  /* position: absolute;
    top: 1rem;
    width: 100%; */
}
.blue {
  background: #49bbff;
}
.addweek{
  display: flex;
  flex: 1;
}
.addweeks{
  border: 0.01rem solid #eee;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
  border-left: 0;
}
</style>

