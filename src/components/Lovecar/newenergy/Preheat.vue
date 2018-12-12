<template>
    <div>
        <mhead currentTitle="远程预热"></mhead>
        <div style="width:100%;height:.01rem;background:#f1f1f1"></div>
        <div class="box flex cocenter">
            <div class="boxtest">当前车辆预热状态</div>
            <div class="minbox flex cocenter">
                <div style="width:.12rem;height:.12rem;background:#999999;border-radius:50%;"></div>
                <div style="font-size:.24rem;color:rgba(102,102,102,1);margin-right:.3rem;margin-left:.1rem">无状态</div>
            </div>
        </div>
        <div class="sethot">预热时间设置</div>
        <div class="flex cocenter between nextbox" @click="choosehottime">
            <span>预热开始时间</span>
            <div >
                <div>{{starttime2}}</div>
                <img :src="'./../../../../static/images/next@2x.png'" alt="">
            </div>
        </div>
        <div class="hotset">
            预热档位设置
        </div>
        <div class="flex cocenter around setdangwei">
            <div @click="setlow" :class="this.chooseGear?'activelow':'activehigh'">低档</div>
            <div @click="sethigh" :class="!this.chooseGear?'activelow':'activehigh'">高档</div>
        </div>
        <div class="botsub">开始预热</div>
        <mt-popup v-model="popupVisible" position="bottom" popup-transition="popup-fade" style="width:100%">
                  <h3 style="text-align:center;padding:.3rem;font-size:.34rem;">开始时间</h3>
                  <span class="suretime" @click="choosebegin">确定</span>
                  <mt-picker :slots="slots" @change="beginTime" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
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
      chooseGear: true, //true为默认低档
      popupVisible: false,
      starttime1: "", //选择的预热时间
      starttime2: "",
      slots: [
        {
          values: ["1:00", "2:00", "3:00", "4:00"],
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
    //低档
    setlow() {
      this.chooseGear = !this.chooseGear;
    },
    //高档
    sethigh() {
      this.chooseGear = !this.chooseGear;
    },
    //控制时间选择弹框
    choosehottime() {
      this.popupVisible = true;
    },
    //点击确定选择的预热时间
    choosebegin() {
      this.popupVisible = false;
      this.starttime2 = this.starttime1;
    },
    //picker插件里面的选择具体时间
    beginTime(picker, values) {
      this.starttime1 = values[0];
    }
  },
  components: {
    mhead: PublicHead
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
.boxtest {
  font-size: 0.3rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  margin-left: 0.43rem;
}
.sethot {
  font-size: 0.32rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  margin-top: 0.69rem;
  margin-left: 0.46rem;
}
.nextbox {
  width: 6.9rem;
  height: 1rem;
  margin: 0.4rem auto;
  border-bottom: 0.01rem solid #f1f1f1;
}
.nextbox > div {
  display: flex;
  align-items: center;
  justify-content: center;
}
.nextbox > div > img {
  width: 0.22rem;
  height: 0.32rem;
}
.nextbox > div > div {
  padding: 0 0.1rem;
}
.hotset {
  font-size: 0.32rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
  margin-top: 0.69rem;
  margin-left: 0.46rem;
}
.setdangwei {
  width: 80%;
  height: 0.8rem;
  margin-top: 0.7rem;
}
.setdangwei > div {
  width: 2.2rem;
  height: 0.8rem;
  box-shadow: 0px 4px 24px 0px rgba(0, 60, 230, 0.12);
  border-radius: 0.08rem;
  text-align: center;
  line-height: 0.8rem;
  font-size: 0.3rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
}
div.activelow {
  background: rgba(73, 187, 255, 1);
  box-shadow: 0px 4px 24px 0px rgba(0, 60, 230, 0.12);
  color: #fff;
}
div.activehigh {
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 4px 24px 0px rgba(79, 79, 79, 0.08);
  color: #4f4f4f;
}
.suretime {
  display: block;
  text-align: right;
  margin-right: 0.3rem;
  color: #49bbff;
}
.botsub {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 0.98rem;
  background: rgba(73, 187, 255, 1);
  box-shadow: 0px 0px 15px 0px rgba(68, 68, 68, 0.2);
  font-size: 0.34rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(255, 255, 255, 1);
  line-height: 0.98rem;
  text-align: center;
}
</style>
