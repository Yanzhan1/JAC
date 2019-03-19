<template>
    <div>
        <mhead currentTitle="远程充电"></mhead>
        <div style="width:100%;height:.01rem;background:#f1f1f1;"></div>
        <div class="title_show flex">
          <div style="position:relative;width:1.6rem;height:2.2rem;top:.6rem;left:.4rem;">
            <div style="position:absolute;width:1.4rem;height:1.9rem;top:.2rem;left:.1rem;overflow:hidden;">
              <div class="showElectricquantity" >{{this.allbetterymessage.Surpluselectricity}}</div>
            </div>
            <img style="width:1.6rem;height:2.2rem;position:absolute"  :src="'./../../../../static/images/Lovecar/bgbattery@2x.png'" alt="">
          </div>
            <div class="tilte_right">
              <div class="flex between" style="margin-top:.6rem;">
                  <div >
                    <div style="padding:.15rem">剩余电量</div>
                    <span style="padding:.15rem;">{{this.allbetterymessage.Surpluselectricity}}</span>
                  </div>
                  <img @click="refish" style="width:.38rem;height:.32rem" :src="'./../../../../static/images/Lovecar/refreshagain@2x.png'" alt="">
              </div>
              <div class="flex contentcenter around title_right_bottom">
                  <div>
                      <div>空调关闭剩余里程</div>
                      <span>{{this.allbetterymessage.closemileage}}</span>
                  </div>
                  <div>
                      <div>空调开启剩余里程</div>
                      <span>{{this.allbetterymessage.openmileage}}</span>
                  </div>
              </div>
            </div>
        </div>
        <ul class="comment">
          <li>
            <div>  
              <div>充电枪状态</div>
              <span>{{this.allbetterymessage.Charginggunstatus}}</span>
            </div>
            <div>  
              <div>当前充电状态</div>
              <span>{{this.allbetterymessage.Chargingstate}}</span>
            </div>
          </li>
          <li>
            <div>  
              <div>预计慢充时间</div>
              <span>{{this.allbetterymessage.Slowchargingtime}}</span>
            </div>
            <div>  
              <div>预计快充时间</div>
              <span>{{this.allbetterymessage.Fastchargingtime}}</span>
            </div>
          </li>
        </ul>
        <div class="flex between begintime" >
            <div>预约充电</div>
            <mt-switch v-model="value" @change="turn"  style="padding:.2rem;"></mt-switch>
        </div>
        <div ref="showtime" v-show="value" class="showtime">{{this.showhour}}{{this.showminute}}后开始充电</div>
        <div v-if="!controlcharge" class="lastdian" @click="Charging">
          <img :src="'./../../../../static/images/Lovecar/btndian@2x.png'" alt="">
          <div>立即充电</div>
        </div>
        <div v-else class="lastdian" @click="Charging">
          <img :src="'./../../../../static/images/Lovecar/btnoff@2x.png'" alt="">
          <div>停止充电</div>
        </div>
         <mt-datetime-picker
            ref="pickerstart"
            type="time"
            hourFormat="{value} 时"
            minuteFormat="{value} 分"
            @confirm="handleConfirmstart"
            @cancel="cancelchoose"
            :visible-item-count='5'
            >
        </mt-datetime-picker>
    </div>
</template>

<script>
import PublicHead from "../../publicmodel/PublicHead";
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
export default {
  data() {
    return {
      tostarttime: "",
      value:false,//控制开关
      showhour:'',
      showminute:'',
      controlcharge:false,//控制底下充电图标
      sjc:'',
      //占时储存所有充电数据
      allbetterymessage:{
        Surpluselectricity:'30%',
        openmileage:'266km',
        closemileage:'300km',
        Charginggunstatus:'未连接',
        Chargingstate:'待命',
        Slowchargingtime:'14小时22分钟',
        Fastchargingtime:'12小时22分钟',
      }
    };
  },
  methods: {
    init(){
      let data={

      }
      this.$http.post(Newenergy.energyremotevehiclecontrol,data,this.$store.sate.tsppin).then((res)=>{
        if(res.data.code==0){
            this.getAsyReturn(res.data.opationId)
        }
      })
    },
    getAsyReturn(operationId) {
      this.sjc = new Date().getTime();
      this.$http
        .post(
          Newenergy.OperationId,
          {
            operationId: operationId
          },
          this.$store.state.tsppin
        )
        .then(res => {
          var tS = new Date().getTime() - this.sjc; //时间戳 差
          var tSS = parseInt((tS / 1000) % 60); // 时间差
          if (res.data.returnSuccess == true) {
            if (res.data.status == "IN_PROGRESS") {
              //60s  后 清除定时器，不在发请求
              if (tSS >= 56) {
                    //超时提示         
              } else {
                this.time = setInterval(() => {
                  this.$http
                    .post(
                      Lovecar.OperationId,
                      {
                        operationId: operationId
                      },
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      var tS = new Date().getTime() - this.sjc; //时间戳 差
                      var tSS = parseInt((tS / 1000) % 60); // 时间差
                      if (res.data.returnSuccess == true) {
                        if (res.data.status == "IN_PROGRESS") {
                          //60s  后 清除定时器，不在发请求
                          if (tSS >= 56) {
                            //超时提示并且清除定时器关闭遮罩层
                            clearInterval(this.time);
                            localhide()
                          }
                        } else if (res.data.status == "SUCCEED") {
                          clearInterval(this.time);
                          localhide()
                        } else if (res.data.status == "FAILED") {

                          clearInterval(this.time);
                          localhide()
                        }
                      } else {

                        clearInterval(this.time);
                        localhide()
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              clearInterval(this.time);
              localhide()
            } else if (res.data.status == "FAILED") {
              clearInterval(this.time);
              localhide()
            }
          } else {
            clearInterval(this.time);
            localhide()
          }
        });
    },
    //选择充电开始时间
    begintime() {
      this.$refs.pickerstart.open();
    },
    //改变开关
    turn(){
      if(this.controlcharge){
        setTimeout(() => {       
          this.value=false;
           Toast({
              message: '充电中,请先停止充电',
              position: "middle",
              duration: 2000
            });
        },0);
      }else{
        if(this.value){
          this.begintime()
        }else{
          MessageBox.confirm('预约充电已开启，确认关闭吗?').then(action => {
              if(action == 'confirm') {
                this.value=false;
                console.log('jin')
                //立即充电
              }
          }).catch(err => {
            if(err == 'cancel') {
                this.value=true
            }
          });
        }
      }
    },
    cancelchoose(){
      this.value=false;
    },
    //刷新按钮
    refish(){

    },
    handleConfirmstart(data) {
      this.showhour=data.split(':')[0]+'小时';
      this.showminute=data.split(':')[1]+'分钟'
    },
    //时间戳转化
    tochangeTime(inputTime) {
      var date = new Date(inputTime);
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      var h = date.getHours();
      h = h < 10 ? "0" + h : h;
      var minute = date.getMinutes();
      minute = minute < 10 ? "0" + minute : minute;
      return y + "年" + m + "月" + d + "日" + "" + h + ":" + minute;
    },
    Conversiontime(timestamp) {
      var date = new Date(timestamp);
      let Y, M, D, h, m, s;
      Y = date.getFullYear() + "-";
      M = date.getMonth() + 1 + "-";
      D = date.getDate();
      return Y + M + D;
    },
    //点击立即充电
    Charging(){
      if(this.value){
        MessageBox.confirm('预约充电已开启，确认关闭吗?').then(action => {
            if(action == 'confirm') {
              this.value=false;
              this.controlcharge=true
              //立即充电
            }
        }).catch(err => {
					if(err == 'cancel') {
              this.controlcharge=false
					}
				});;
      }else{
        //立即充电
        this.controlcharge=!this.controlcharge
      }
    },
    //获取电池状态
    batteryStatis(){
      let top=1.9*(100-this.allbetterymessage.Surpluselectricity.replace(/%/ig, ''))/100+'rem'
      $('.showElectricquantity').css('top',top)
    },
    loadcss(){
      this.$nextTick(()=>{
       $('.mint-datetime .picker-toolbar').css('position','relative').css('top','3.3rem')
       $('.mint-datetime-cancel').css('border-right','solid 1px #eaeaea')
      $('.mint-datetime .picker-items').css('position','relative').css('top','-.7rem').css('border-bottom','solid 1px #eaeaea')
    })
    },
  },
  created() {
    // this.endtime=this.toDate()
    // this.loadcss()
    let time = new Date().getTime() + 1000 * 60 * 60 * 24 * 7;
    this.endtime = new Date(this.Conversiontime(time) + "");
  },
  mounted() {
    this.batteryStatis()
    // this.starttimes=this.tochangeTime(new Date().getTime())
  },
  components: {
    mhead: PublicHead
  }
};
</script>

<style scoped>
.box {
  width: 6.9rem;
  height: 3.6rem;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 24px 0px rgba(79, 79, 79, 0.12);
  border-radius: 8px;
  margin: 0 auto;
  margin-top: 0.7rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
}

.begintime {
  font-size: .34rem;
  color: #222;
  line-height: .4rem;
}
.begintime > div {
  padding: 0.2rem;
  font-size: .34rem;
  color: #222;
}
.showtime{
  margin-left: .2rem;
  font-size:.22rem;
  color: #555;

}
.mint-popup{
    bottom: 4rem;
    width: 82%;
    height: 40%;
    border-radius: 5%
}
.title_show{
  width: 90%;
  height: 3.4rem;
  position: relative;
  color: #222;
  margin:.2rem auto;
  border-bottom: .01rem solid #F1F1F1;
}
.title_show .showElectricquantity{
  width:1.4rem;
  height: 1.9rem;
  position:absolute;
  background:linear-gradient(135deg,rgba(74,255,245,1),rgba(73,187,255,1));
  z-index:2;
  text-align: center;
  border-radius: .06rem;
  font-size: .36rem;
  color: #49BBFF;
}
.title_show .tilte_right{
  position: absolute;
  left: 2.6rem;
}
.title_show .tilte_right div{
    font-size: .22rem;
}
.title_show .tilte_right span{
    font-size: .4rem;
    color: #49BBFF;
}
.title_show .tilte_right .title_right_bottom>div{
  padding: .15rem;
}
.title_show .tilte_right .title_right_bottom span{
  padding: .2rem;
}
.comment{
  width: 90%;
  position: relative;
  height: 2.8rem;
  margin:.2rem auto;
  border-bottom: .01rem solid #F1F1F1;
}
.comment>li{
  display: flex;
  align-items: center;
  height: 1.4rem;
  margin-left: -.2rem
}
.comment>li>div{
  padding: .46rem .7rem;
}
.comment li div{
  font-size: .22rem;
  color: #222;
}
.comment li span{
  font-size: .28rem;
  color: #49BBFF;
}
.comment>li>div>div{
  padding: .1rem;
  width: 2rem;
}
.comment>li>div>span{
  padding: .1rem;
}
.lastdian{
  width: 100%;
  position: relative;
}
.lastdian>img{
  width: 1.64rem;
  height: 1.64rem;
  position: absolute;
  left: 50%;
  margin-left: -.82rem;
  top: 1.56rem;
}
.lastdian>div{
  position: absolute;
  top: 3.5rem;
  width: 100%;
  text-align: center;
  color: #49BBFF;
}
.mint-popup{
  height: 5rem;
}
</style>
