<template>
    <div class="my-setup">
        <div class="bgblack" v-show="this.bgblack" @click="bgblacks"></div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">远程授权</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <div class="autime flex column around">
            <div class="aut" style="color:#49BBFF;font-size:.31rem;line-height:.32rem;">授权时间</div>
            <div class="">
                <div class="starttimes">
                    <div style="width:2rem;">起始时间</div>
                    <span style="margin-left:2rem;">{{this.start[0]}}-{{this.start[1]}}-{{this.start[2]}}-{{this.start[3]}}</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem" @click="startlefts">
                </div>
                <div class="starttimes">
                    <div style="width:2rem;">结束时间</div>
                    <span style="margin-left:2rem;">{{this.end[0]}}-{{this.end[1]}}-{{this.end[2]}}-{{this.end[3]}}</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem" @click="endrights">
                </div>
            </div>
            <div class="aut auts">被授权者账号：</div>
            <div class="iptcont flex row cocenter">
                <span style="font-size:.24rem;color:#888;" >请输入账号</span>
                <input maxlength="" type="text" class="ipt" style="margin-left:.5rem;outline:none">
            </div>
        </div>
        <div v-show="this.startleft" class="starts">
            <div style="text-align:center;line-height:1rem;font-size:.3rem;">选择起始时间</div>
            <div style="float:right;margin-right:.3rem;color:#49BBFF;" @click="hided1">确定</div>
            <mt-picker :slots="slotsone" @change="onValuesChange" style="height:4rem;margin-top:1rem;"></mt-picker>
        </div>
        <div v-show="this.endright" class="starts">
            <div style="text-align:center;line-height:1rem;font-size:.3rem;">选择结束时间</div>
            <div style="float:right;margin-right:.3rem;color:#49BBFF;" @click="hided2">确定</div>
            <mt-picker :slots="slotstwo" @change="onValuesChangend" style="height:4rem;margin-top:1rem;"></mt-picker>
        </div>
        <button class="bottom-btn" @click='next()'>发送授权</button>
    </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        bgblack:false,
        startleft:false,
        endright:false,
        start:[],
        end:[],
         slotsone: [
            {
            flex: 1,
            values: ['2010', '2011', '2012', '2013', '2014', '2015'],
            className: 'slot1',
            textAlign: 'right'
            }, {
            divider: true,
            content: '-',
            className: 'slot2'
            }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06'],
            className: 'slot3',
            textAlign: 'left'
            },{
            divider: true,
            content: '-',
            className: 'slot4'
            }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06'],
            className: 'slot5',
            textAlign: 'center'
            }, {
            divider: true,
            content: '-',
            className: 'slot6'
            },{
            flex: 1,
            values: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
            className: 'slot7',
            textAlign: 'center'
            }
        ],
         slotstwo: [
            {
            flex: 1,
            values: ['2015', '2016', '2017', '2018', '2019', '2020'],
            className: 'slot1',
            textAlign: 'center'
            }, {
            divider: true,
            content: '-',
            className: 'slot2'
            }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06'],
            className: 'slot3',
            textAlign: 'center'
            }, {
            divider: true,
            content: '-',
            className: 'slot4'
            }, {
            flex: 1,
            values: ['01', '02', '03', '04', '05', '06'],
            className: 'slot5',
            textAlign: 'center'
            }, {
            divider: true,
            content: '-',
            className: 'slot6'
            },{
            flex: 1,
            values: ['00:00', '01:00', '02:00', '03:00', '04:00', '05:00'],
            className: 'slot7',
            textAlign: 'center'
            }
        ]
    };
  },
  methods:{
      next(){
          this.$router.push('/Authorize_next')
      },
      bgblacks(){
          this.bgblack=false;
          this.endright=false;
          this.startleft=false;
      },
      startlefts(){
          this.bgblack=true;
          this.startleft=true;
      },
      endrights(){
          this.bgblack=true;
          this.endright=true
      },
      hided1(){
          this.bgblack=false;
          this.startleft=false;
      },
      hided2(){
          this.bgblack=false;
          this.endright=false;
      },
       onValuesChange(picker, values) {
           this.start=values
    },
        onValuesChangend(picker, values) {
            this.end=values
    }
  },
  mounted(){
      this.$http.post(Lovecar.Longrange,{
        vin: "LS5A3CJC9JF810003", 
        operationType: "CONTROL_AUTH", 
        operation: 1, 
        extParams: {
        childNum: "1234556", 
        beginTime: 1531732112967, 
        endTime: 1531735990657
    }
},getpin).then((res)=>{
          console.log(res)
      })
  }
};
</script>

<style scoped>
.autime {
  margin-left: 0.3rem;
  margin-right:.3rem
}
.aut {
  font-size: 0.3rem;
  color: #222;
  margin-top: 0.3rem;
  margin-bottom: 0.4rem;
}
.row {
  flex-direction: row;
}
.flex-start {
  justify-content: flex-start;
}
.btns {
  border: 1px solid #f1f1f1;
  border-radius: 0.1rem;
  width: 2rem;
  height: 0.5rem;
  justify-content: center;
}
.lines {
  display: block;
  color: #f1f1f1;
  padding: 0 0.3rem;
}
.auts {
  margin-top: 0.7rem;
}
.ipt{
    border:none
}
.iptcont{
    padding:.2rem 0;
    border-bottom:1px solid #f1f1f1
}
.starttimes{
    display: flex;
    flex: 1;
    justify-content: space-between;
    align-items: center;
    font-family: PingFang-SC-Medium;
    font-size:.22rem;
    line-height: .28rem;
    font-weight: Medium;
    color: #222;
    width: 100%;
    height: 1rem;
    border-bottom: .01rem solid #f5f5f5;
}
.bgblack{
    width: 100%;
    height: 100%;
    position:absolute;
    top: 0;
    left: 0;
    bottom: 0;
    right: 0;
    background: rgba(0, 0, 0, .5);
    z-index:1000;
}
.starts{
    position: absolute;
    bottom: 0rem;
    background: #fff;
    width: 100%;
    height: 6rem;
    z-index: 1001;
}
</style>