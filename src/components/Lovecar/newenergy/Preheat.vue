<template>
    <div>
        <mhead currentTitle="远程预热"></mhead>
        <div style="width:100%;height:.01rem;background:#f1f1f1"></div>
        <div class="switch flex contentcenter">
          <mt-switch v-model="onoff" @change="turn"></mt-switch>
          <span>OFF/ON</span>
        </div>
        <div class="title">
           <div>加热</div>
           <div class="specil">HEATING</div>
        </div>
        <div v-show="num==0" class="flex cocenter  nextbox" @click="openPicker">
            <span>预约加热</span>
            <img :src="'./../../../../static/images/nextblue@2x.png'" alt="">
        </div>
        <div v-show='num==1' class="  nextbox" @click="Tips">
          <div class="flex cocenter">
            <span>预热加热已开启</span>
            <img :src="'./../../../../static/images/nextblue@2x.png'" alt="">
          </div>
          <div class="flex cocenter">
            <div ref="nextbox_dang" style="color:#222;padding:.1rem 0 0 .3rem;font-size:.22rem;width:.9rem;">低档 ,</div>
            <div style="color:#222;padding:.1rem 0 0 .3rem;font-size:.22rem;">{{this.showhour}}{{this.showminute}}后开始加热</div>
          </div>
        </div>
        <div v-show='num==2' class="flex cocenter  nextbox" >
            <span style="color:#222">远程预热中…</span>
        </div>
        <div class="mainimg">
           <img v-show="mainhotimg" :src="'./../../../../static/images/Lovecar/hot@2x.png'" alt="">
           <img v-show="!mainhotimg" :src="'./../../../../static/images/Lovecar/hoton@2x.png'" alt="">
        </div>
        <div class="control">
           <div class="control_bg"></div>
           <div class="control_on" ref="control_bottom">
              <span @click="lowon"><</span>
              <div class="dangwei" ref="commenttext">低</div>
              <span @click="highon">></span>
           </div>
        </div>
        <div style="text-align: center">加热档位</div>
        <!-- <mt-datetime-picker
            ref="picker"
            type="datetime"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            hourFormat="{value} 时"
            minuteFormat="{value} 分"
            @confirm="handleConfirm"
            :startDate="startday"
            :endDate="endtime"
            >
        </mt-datetime-picker> -->
        <mt-datetime-picker
            ref="picker"
            type="time"
            hourFormat="{value} 时"
            minuteFormat="{value} 分"
            @confirm="handleConfirm"
            :visible-item-count='5'
            >
        </mt-datetime-picker>

    </div>
</template>

<script>
import PublicHead from "../../publicmodel/PublicHead";
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      hottimes:'',//选择得到的预热时间
      startday:new Date(),//限定开始时间的选择
      endtime:'',//限定结束时间的选择
      totime:'',//传给后台的时间戳
      onoff:false,//控制开关的变化
      mainhotimg:true,//控制主加热图片的变化
      num:0,
      showhour:'',
      showminute:'',
    };
  },
  methods: {
    turn(){
      //改变加热开关
      if(this.num==1){
        if(!this.onoff){
          this.mainhotimg=true;
        }else{
           MessageBox.confirm('预约充电已开启，确认关闭吗?').then(action => {
              if(action == 'confirm') {
                this.onoff=true;
                this.mainhotimg=false;
                this.num=2
                this.$forceUpdate()
                //立即充电
              }
          }).catch(err => {
            if(err == 'cancel') {
                this.onoff=false;
            }
          });
        }
      }else{
        if(this.onoff){
          this.mainhotimg=false;
          this.num=2
        }else{
          this.num=0
          this.mainhotimg=true
        }
      }
      
    },
    openPicker() {
        this.$refs.picker.open();
    },
    //完成预热后点击提示
    Tips(){
      MessageBox.confirm('预约充电已开启，确认关闭吗?').then(action => {
              if(action == 'confirm') {
                this.num=0
                this.$forceUpdate()
                //立即充电
              }
          }).catch(err => {
            if(err == 'cancel') {

            }
          });
    },
    //左按钮低档加热
    lowon(){
      if(this.$refs.commenttext.innerHTML=='高'){      
        this.$refs.control_bottom.style.left=2.2+'rem'
        this.$refs.commenttext.innerHTML='低'
        this.$refs.nextbox_dang.innerHTML='低档 ,'
      }
    },
    //右按钮高档加热
    highon(){
      if(this.$refs.commenttext.innerHTML=='低'){
        this.$refs.control_bottom.style.left=3+'rem'
        this.$refs.commenttext.innerHTML='高'
        this.$refs.nextbox_dang.innerHTML='高档 ,'
      }
    },
    //时间戳转化
    tochangeTime(inputTime) {
            var date = new Date(inputTime);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            minute = minute < 10 ? ('0' + minute) : minute;
            return y + '年' + m + '月' + d + '日' + '' + h + ':' + minute;
    },
    handleConfirm(data){
      this.num=1
      this.showhour=data.split(':')[0]+'小时';
      this.showminute=data.split(':')[1]+'分钟'
      //totime为得到的时间戳
      this.totime=new Date(data).getTime()
      this.hottimes=this.tochangeTime(new Date(data).getTime())
    },
    Conversiontime(timestamp) {
                    var date = new Date(timestamp);
                    let Y,M,D,h,m,s
                    Y = date.getFullYear() + '-';
                    M =  (date.getMonth()+1)+ '-';
                    D = date.getDate();
                    return Y+M+D;
           },
    loadcss(){
      this.$nextTick(()=>{
       $('.mint-datetime .picker-toolbar').css('position','relative').css('top','3.3rem')
       $('.mint-datetime-cancel').css('border-right','solid 1px #eaeaea')
      $('.mint-datetime .picker-items').css('position','relative').css('top','-.7rem').css('border-bottom','solid 1px #eaeaea')
    })
    }
  },
  components: {
    mhead: PublicHead
  },
  // computed:{
  //     newnum(){
  //       return this.num
  //     }
  // },
  created(){
    this.loadcss()
    
    // this.endtime=this.toDate()
    let time= new Date().getTime()+1000*60*60*24*7
    this.endtime=new Date(this.Conversiontime(time)+'') 
  },
  mounted(){
    this.hottimes=this.tochangeTime(new Date().getTime())
  }
};
</script>

<style scoped>
.box {
  width: 6.9rem;
  height: 1.2rem;
  box-shadow: 0px 4px 24px 0px rgba(79, 79, 79, 0.12);
  border-radius: 0.08rem;
  margin: 0 auto;
  margin-top: 0.5rem;
  justify-content: space-between;
}
.nextbox {
  height: 1rem;
  margin: 0.4rem auto;
  color: #49BBFF;
}
.nextbox span{
    font-size: .3rem;
    margin:0 .1rem 0 .3rem;
}
.nextbox   img {
  width: 0.07rem;
  height: 0.11rem;
}
.mint-popup{
    bottom: 4rem;
    width: 82%;
    height: 40%;
    border-radius: 5%
}
.switch{
  width: 100%;
  flex-direction: column;
}
.switch span{
  padding: .2rem;
}
.title{
  margin-left: .5rem;
  font-size: .28rem;
  color: #222;
}
.title .specil{
    font-size: .24rem;
    width: .6rem;
    color: #999999;
    padding:.05rem 0 .2rem 0;
    border-bottom: .01rem solid #999999;
}
.mainimg{
  width: 100%;
  position: relative;
  height: 5.5rem;
}
.mainimg>img{
  width: 2.08rem;
  height: 2.42rem;
  position: absolute;
  left: 50%;
  margin-left: -1.04rem;
  margin-top: 1.57rem;
}
.control{
  position: relative;
  height: 1rem;
}
.control .control_bg{
  width:3.6rem;
  position: absolute;
  height: .01rem;
  background: #999;
  left: 50%;
  margin-left: -1.8rem;
  top: .5rem;
}
.control .control_on{
  position: absolute;
  width: 2.3rem;
  height: .6rem;
  left: 2.2rem;
  border-radius: 9.99rem;
  border:.01rem solid #999;
  display:flex;
  justify-content: space-around;
  align-items: center;
  background: #fff;
  top: .22rem;
}
.dangwei{
  font:600 .24rem/.6rem 'PingFang-SC-Medium';
  color: #222;
}
.mint-popup{
  height: 30%;
}
</style>
