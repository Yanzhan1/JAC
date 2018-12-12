<template>
    <div>
        <mhead currentTitle="远程充电"></mhead>
        <div style="width:100%;height:.01rem;background:#f1f1f1;"></div>
        <div class="box">
            <div class="box_top">
                <div class="batterystatus">当前电池状态</div>
                <div class="flex cocenter batterystatusright" >
                    <div :class="'coloryellow'"></div>
                    &nbsp&nbsp&nbsp待充电</div>
            </div>
            <div class="flex around box_bottom">
                <div class="flex column bottom_div">
                    <div style="font-size:.48rem;color:rgba(102,102,102,1);">183</div>
                    <div style="font-size:.24rem;color:rgba(102,102,102,1)">续航里程(km)</div>
                </div>
                <div class="flex column bottom_div">
                    <div style="font-size:.48rem;color:rgba(102,102,102,1)">70%</div>
                    <div style="font-size:.24rem;color:rgba(102,102,102,1)">电量</div>
                </div>
                <div class="flex column bottom_div">
                    <div style="font-size:.48rem;color:rgba(102,102,102,1)">32</div>
                    <div style="font-size:.24rem;color:rgba(102,102,102,1)">蓄电池电压(v)</div>
                </div>
            </div>
        </div>
        <div class="charginggun">充电枪状态</div>
        <div class="flex cocenter charginggunstatus" ><div :class="'coloryellow'"></div>&nbsp&nbsp&nbsp未连接</div>
        <div class="charginggun">充电时间</div>
        <div class="flex between begintime" @click="begintime">
            <div>开始时间</div>
            <div class="flex contentcenter">
                <div>{{starttime2}}</div>
                <img :style="'display:block;width:.3rem;height:.3rem;margin-top:-.06rem'" src="./../../../../static/images/next@2x.png" alt="">
            </div>
        </div>
        <div class="flex between begintime" @click="endtime">
            <div>结束时间</div>
            <div class="flex contentcenter">
                <div>{{endtime2}}</div>
                <img :style="'display:block;width:.3rem;height:.3rem;margin-top:-.06rem'" src="./../../../../static/images/next@2x.png" alt="">
            </div>
        </div>
        <div class="bottombut" @click="subbt">
            预约充电
        </div>
        <mt-popup v-model="popupVisible1" position="bottom" popup-transition="popup-fade" style="width:100%">
                  <h3 style="text-align:center;padding:.3rem;font-size:.34rem;">开始时间</h3>
                  <span class="suretime" @click="choosebegin">确定</span>
                  <mt-picker :slots="slots1" @change="beginTime" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
        </mt-popup>
        <mt-popup v-model="popupVisible2" position="bottom" popup-transition="popup-fade" style="width:100%">
                  <h3 style="text-align:center;padding:.3rem;font-size:.34rem;">结束时间</h3>
                  <span class="suretime" @click="chooseend">确定</span>
                  <mt-picker :slots="slots2" @change="endTime" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
        </mt-popup>
    </div>
</template>

<script>
import { Popup } from "mint-ui";
import { Picker } from "mint-ui";
import PublicHead from "../../publicmodel/PublicHead";
export default {
  data() {
    return {
      popupVisible1: false,//控制起始时间弹框
      popupVisible2: false,//控制结束时间弹框
      starttime1:'',//起始时间
      starttime2:'',//起始时间
      endtime1:'',//结束时间
      endtime2:'',//结束时间
      slots1: [
        {
          values: ["1:00", "2:00", "3:00", "4:00"],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          itemHieight: 74
        }
      ],
      slots2: [
        {
          values: ["1:00", "2:00", "3:00", "4:00",'5:00'],
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
    //提交
    subbt() {},
    begintime() {
      this.popupVisible1 = true;
    },
    endtime() {
        this.popupVisible2 = true;
    },
    choosebegin(){
        this.popupVisible1=false;
        this.starttime2=this.starttime1
    },
    chooseend(){
        this.popupVisible2=false;
        this.endtime2=this.endtime1
    },
     beginTime(picker, values) {
          this.starttime1=values[0]
     },
     endTime(picker, values) {
          this.endtime1=values[0]
     }
  },
  mounted: {},
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
.batterystatus {
  font-size: 0.3rem;
  color: rgba(34, 34, 34, 1);
}
.batterystatusright {
  color: #ffcc00;
}
.popo{
    width: 100%;
    height: 5rem;
}
.box_top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.4rem;
}
.box_bottom {
}
.box_bottom > .bottom_div {
  padding: 0.25rem;
}
.box_bottom > .bottom_div > div {
  padding: 0.1rem;
  text-align: center;
}
.coloryellow {
  width: 0.12rem;
  height: 0.12rem;
  border-radius: 50%;
  background: rgba(255, 204, 0, 1);
}
.charginggunstatus {
  color: #ffcc00;
  margin-top: 0.3rem;
  margin-left: 0.5rem;
}
.charginggun {
  font-size: 0.32rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  margin-top: 0.69rem;
  margin-left: 0.49rem;
}
.begintime {
  border-bottom: 0.01rem solid #f1f1f1;
}
.begintime > div {
  padding: 0.4rem;
}
.bottombut {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.98rem;
  background: rgba(73, 187, 255, 1);
  box-shadow: 0px 0px 15px 0px rgba(68, 68, 68, 0.2);
  text-align: center;
  line-height: 0.98rem;
  font-size: 0.34rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
}
.suretime{
    display: block;
    text-align: right;
    margin-right: .3rem;
    color: #49BBFF;
}
</style>
