<template>
    <div>
        <header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">{{this.times}}</span>
			<span class="header-right"><img src="/static/images/Lovecar/zhankai@2x.png" alt="" @click="choose_times"></span>
		</header>
        <div style="width:100%;height:.01rem;background:#f1f1f1"></div>
        <div style="margin-top:.95rem;height:11.16rem;width:100%;" class="nav">
            <div v-if="this.times=='月'">
                <div class="every_times">
                <img src="/static/images/Lovecar/left-balck.png" alt="" class="img_l" @click="turn_l">
                <div class="center">{{this.newdates.years}}年{{this.newdates.months}}月</div>
                <img src="/static/images/Lovecar/right-gray.png" alt="" class="img_r" @click="turn_r">
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
                <img src="/static/images/Lovecar/left-balck.png" alt="" class="img_l" @click="turn_l_week">
                <div class="center">{{this.newdates.years}}年{{this.newdates.months}}月,第{{this.showweek}}周</div>
                <img src="/static/images/Lovecar/right-gray.png" alt="" class="img_r" @click="turn_r_week">
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
                    <div ref="weekdate" class="date_center" v-for="(item,index) in newarraynum" :key="index">{{item}}</div>
                </div>
            </div>
            </div>
            <div v-if="this.times=='日'">
                <div class="every_times">
                <img src="/static/images/Lovecar/left-balck.png" alt="" class="img_l" @click="turn_l">
                <div class="center">{{this.newdates.years}}年{{this.newdates.months}}月{{this.showdate}}日</div>
                <img src="/static/images/Lovecar/right-gray.png" alt="" class="img_r" @click="turn_r">
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
                    <div class="date_center" v-for="(item,index) in arraynum" @click.stop="changecolor($event,index)" :class="{blue:current==index}"  :key="index">{{item}}</div>
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
                <img src="/static/images/Lovecar/delete@2x.png" alt="" @click="close_times">
            <div class="choose_data_t">
                <div @click="month"><span>月</span><img src="/static/images/Lovecar/gou.png" alt="" class="img" v-show="this.showgou1"></div>
                <div @click="week"><span>周</span><img src="/static/images/Lovecar/gou.png" alt="" class="img" v-show="this.showgou2"></div>
                <div @click="day"><span>日</span><img src="/static/images/Lovecar/gou.png" alt="" class="img" v-show="this.showgou3"></div>
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
      current:0,
      times: "月",
      opentime: false, //遮罩层
      showgou1: true,
      showgou2: false,
      showgou3: false,
      showdate: "",
      showweek: "",
      // newdates:'',
      newdates: { years: "", months: "" },
      arraynum: [],
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
      newarraynum: []
    };
  },
  mounted() {
    this.$nextTick(() => {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      this.newdates.years = year;
      this.newdates.months = month;
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
      var dt = new Date(this.newdates.years, this.newdates.months - 1, 1);
      var m = dt.getDay();
      if (this.showweek == 1) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(0, 8 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(0, 8 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarray3 = this.array3.slice(0, 8 - m);
            this.newarraynum = this.newarray4;
          } else {
            this.newarraynum = this.newarray3;
            this.newarray4 = this.array4.slice(0, 8 - m);
          }
        }
      }
      if (this.showweek == 2) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(8 - m, 15 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(8 - m, 15 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarray4 = this.array4.slice(8 - m, 15 - m);
            this.newarraynum = this.newarray4;
          } else {
            this.newarray3 = this.array3.slice(8 - m, 15 - m);
            this.newarraynum = this.newarray3;
          }
        }
      }
      if (this.showweek == 3) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(15 - m, 22 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(15 - m, 22 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarray4 = this.array4.slice(15 - m, 22 - m);
            this.newarraynum = this.newarray4;
          } else {
            this.newarray3 = this.array3.slice(15 - m, 22 - m);
            this.newarraynum = this.newarray3;
          }
        }
      }
      if (this.showweek == 4) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(22 - m, 29 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(22 - m, 29 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarraynum = this.newarray4;
            this.newarray4 = this.array4.slice(22 - m, 29 - m);
          } else {
            this.newarray3 = this.array3.slice(22 - m, 29 - m);
            this.newarraynum = this.newarray3;
          }
        }
      }
      if (this.showweek == 5) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(29 - m, 36 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(29 - m, 36 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarraynum = this.newarray4;
            this.newarray4 = this.array4.slice(29 - m, 36 - m);
          } else {
            this.newarray3 = this.array3.slice(29 - m, 36 - m);
            this.newarraynum = this.newarray3;
          }
        }
      }
      if (this.showweek == 6) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(36 - m, 39 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(36 - m, 39 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarray4 = this.array4.slice(36 - m, 39 - m);
            this.newarraynum = this.newarray4;
          } else {
            this.newarray3 = this.array3.slice(36 - m, 39 - m);
            this.newarraynum = this.newarray3;
          }
        }
      }
    });
  },
  updated() {
    var dt = new Date(this.newdates.years, this.newdates.months - 1, 1);
    var n = dt.getDay();
    var center_l = document.getElementsByClassName("date_center");
    switch (n) {
      case 0: //一号是星期天
        center_l[0].style.marginLeft = "6.42rem";
        center_l[0].style.borderLeft = ".01rem solid #eee";
        break;
      case 2: //一号是星期二
        center_l[0].style.marginLeft = "1.07rem";
        center_l[0].style.borderLeft = ".01rem solid #eee";
        break;
      case 3: //一号是星期三
        center_l[0].style.marginLeft = "2.14rem";
        center_l[0].style.borderLeft = ".01rem solid #eee";
        break;
      case 4: //一号是星期四
        center_l[0].style.marginLeft = "3.21rem";
        center_l[0].style.borderLeft = ".01rem solid #eee";
        break;
      case 5: //一号是星期五
        center_l[0].style.marginLeft = "4.28rem";
        center_l[0].style.borderLeft = ".01rem solid #eee";
        break;
      case 6: //一号是星期六
        center_l[0].style.marginLeft = "5.35rem";
        center_l[0].style.borderLeft = ".01rem solid #eee";
        break;
    }
  },
  methods: {
    choose_times() {
      this.opentime = true;
    },
    close_times() {
      this.opentime = false;
    },
    month() {
      this.showgou1 = true;
      this.showgou2 = false;
      this.showgou3 = false;
      setTimeout(() => {
        this.opentime = false;
      }, 200);
      this.times = "月";
    },
    week() {
      this.showgou1 = false;
      this.showgou2 = true;
      this.showgou3 = false;
      setTimeout(() => {
        this.opentime = false;
      }, 200);
      this.times = "周";
    },
    day() {
      this.showgou1 = false;
      this.showgou2 = false;
      this.showgou3 = true;
      setTimeout(() => {
        this.opentime = false;
      }, 200);
      this.times = "日";
    },
    //选择每个月的第几周的天数排列出来
    week_choose(){
      var dt = new Date(this.newdates.years, this.newdates.months - 1, 1);
      var m = dt.getDay();
      if (this.showweek == 1) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(0, 8 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(0, 8 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarray3 = this.array3.slice(0, 8 - m);
            console.log(this.newarray3);
            this.newarraynum = this.newarray4;
          } else {
            this.newarraynum = this.newarray3;
            this.newarray4 = this.array4.slice(0, 8 - m);
          }
        }
      }
      if (this.showweek == 2) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(8 - m, 15 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(8 - m, 15 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarray4 = this.array4.slice(8 - m, 15 - m);
            this.newarraynum = this.newarray4;
          } else {
            this.newarray3 = this.array3.slice(8 - m, 15 - m);
            this.newarraynum = this.newarray3;
          }
        }
      }
      if (this.showweek == 3) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(15 - m, 22 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(15 - m, 22 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarray4 = this.array4.slice(15 - m, 22 - m);
            this.newarraynum = this.newarray4;
          } else {
            this.newarray3 = this.array3.slice(15 - m, 22 - m);
            this.newarraynum = this.newarray3;
          }
        }
      }
      if (this.showweek == 4) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(22 - m, 29 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(22 - m, 29 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarraynum = this.newarray4;
            this.newarray4 = this.array4.slice(22 - m, 29 - m);
          } else {
            this.newarray3 = this.array3.slice(22 - m, 29 - m);
            this.newarraynum = this.newarray3;
          }
        }
      }
      if (this.showweek == 5) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(29 - m, 36 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(29 - m, 36 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarraynum = this.newarray4;
            this.newarray4 = this.array4.slice(29 - m, 36 - m);
          } else {
            this.newarray3 = this.array3.slice(29 - m, 36 - m);
            this.newarraynum = this.newarray3;
          }
        }
      }
      if (this.showweek == 6) {
        if (m == 0) {
          m = 7;
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
          this.newarray1 = this.array1.slice(36 - m, 39 - m);
          this.newarraynum = this.newarray1;
        }
        if (
          this.newdates.months == 4 ||
          this.newdates.months == 6 ||
          this.newdates.months == 9 ||
          this.newdates.months == 11
        ) {
          this.newarray2 = this.array2.slice(36 - m, 39 - m);
          this.newarraynum = this.newarray2;
        }
        if (this.newdates.months == 2) {
          if (
            this.newdates.years % 4 == 0 ||
            (this.newdates.years % 100 == 0 && this.newdates.years % 400 == 0)
          ) {
            this.newarray4 = this.array4.slice(36 - m, 39 - m);
            this.newarraynum = this.newarray4;
          } else {
            this.newarray3 = this.array3.slice(36 - m, 39 - m);
            this.newarraynum = this.newarray3;
          }
        }
      }
    },
    turn_l_week() {
      if (this.showweek > 1 && this.showweek <= 6) {
        this.showweek--;
      }
        this.week_choose();
      if (this.showweek > 2 && this.showweek <= 6) {
        var dt = new Date(this.newdates.years, this.newdates.months - 1, 1);
        var n = dt.getDay();
        console.log(n)
        console.log(this.$refs.weekdate[0].style.marginLeft)
        switch (n) {
            case 0: //一号是星期天
              this.$refs.weekdate[0].style.marginLeft = "-6.42rem";
              this.$refs.weekdate[0].style.borderLeft = ".01rem solid #eee";
              break;
            case 2: //一号是星期二
              this.$refs.weekdate[0].style.marginLeft = "-1.07rem";
              this.$refs.weekdate[0].style.borderLeft = ".01rem solid #eee";
              break;
            case 3: //一号是星期三
              this.$refs.weekdate[0].style.marginLeft = "-2.14rem";
              this.$refs.weekdate[0].style.borderLeft = ".01rem solid #eee";
              break;
            case 4: //一号是星期四
              this.$refs.weekdate[0].style.marginLeft = "-3.21rem";
              this.$refs.weekdate[0].style.borderLeft = ".01rem solid #eee";
              break;
            case 5: //一号是星期五
              this.$refs.weekdate[0].style.marginLeft = "-4.28rem";
              this.$refs.weekdate[0].style.borderLeft = ".01rem solid #eee";
              break;
            case 6: //一号是星期六
              this.$refs.weekdate[0].style.marginLeft = "-5.35rem";
              this.$refs.weekdate[0].style.borderLeft = ".01rem solid #eee";
              break;
          }
      }
    },
    turn_r_week() {
      if (this.showweek > 0 && this.showweek < 6) {
        this.showweek++;
      }
          this.week_choose()
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
      //根据每个月的1号是星期几判断每个月1号与左边的距离
      var dt = new Date(this.newdates.years, this.newdates.months - 1, 1);
      var n = dt.getDay();
      var center_l = document.getElementsByClassName("date_center");
      switch (n) {
        case 0: //一号是星期天
          center_l[0].style.marginLeft = "6.42rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
        case 2: //一号是星期二
          center_l[0].style.marginLeft = "1.07rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
        case 3: //一号是星期三
          center_l[0].style.marginLeft = "2.14rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
        case 4: //一号是星期四
          center_l[0].style.marginLeft = "3.21rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
        case 5: //一号是星期五
          center_l[0].style.marginLeft = "4.28rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
        case 6: //一号是星期六
          center_l[0].style.marginLeft = "5.35rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
      }
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
      var dt = new Date(this.newdates.years, this.newdates.months - 1, 1);
      var n = dt.getDay();
      var center_l = document.getElementsByClassName("date_center");
      switch (n) {
        case 0: //一号是星期天
          center_l[0].style.marginLeft = "6.42rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
        case 2: //一号是星期二
          center_l[0].style.marginLeft = "1.07rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
        case 3: //一号是星期三
          center_l[0].style.marginLeft = "2.14rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
        case 4: //一号是星期四
          center_l[0].style.marginLeft = "3.21rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
        case 5: //一号是星期五
          center_l[0].style.marginLeft = "4.28rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
        case 6: //一号是星期六
          center_l[0].style.marginLeft = "5.35rem";
          center_l[0].style.borderLeft = ".01rem solid #eee";
          break;
      }
    },
    changecolor(el,index) {
      var date = new Date();
      var year = date.getFullYear();
      var month = date.getMonth() + 1;
      var day = date.getDate();
      console.log(index)
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
        this.current=index;
        // el.target.style.backgroundColor='#49bbff';
        this.showdate = el.target.innerHTML;
      }
    },
    cheeks() {
      this.$router.push("/fuelQuery");
    }
  }
};
</script>

<style>
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
  height: 2.94rem;
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
  width: 1.07rem;
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
  width: 1.07rem;
  text-align: center;
  padding-top: 0.15rem;
  padding-bottom: 0.15rem;
}
.date_center {
  width: 1.07rem;
  height: 1.07rem;
  border: 0.01rem solid #eee;
  border-left: 0;
  float: left;
  padding-top: 0.2rem;
  padding-left: 0.2rem;
  background: #e8f5ff;
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
  width: 1.07rem;
  height: 1.07rem;
  float: left;
  text-align: center;
  line-height: 1rem;
}
.blue{
     background:#49bbff;
}
</style>

