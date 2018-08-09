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
                <div class="starttimes" @click="startlefts">
                    <div style="width:2rem;">起始时间</div>
                    <span style="margin-left:2rem;" ref="startt">{{this.start[0]}}-{{this.start[1]}}-{{this.start[2]}} {{this.start[3]}}</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem" >
                </div>
                <div class="starttimes" @click="endrights">
                    <div style="width:2rem;" >结束时间</div>
                    <span style="margin-left:2rem;" ref="endd">{{this.end[0]}}-{{this.end[1]}}-{{this.end[2]}} {{this.end[3]}}</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem" >
                </div>
            </div>
            <div class="aut auts">被授权者账号：</div>
            <div class="iptcont flex row cocenter">
                <span style="font-size:.24rem;color:#888;" >请输入账号</span>
                <input maxlength="" type="text" class="ipt" style="margin-left:.5rem;outline:none" v-model="Account">
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
            <mt-picker :slots="slotsone" @change="onValuesChangend" style="height:4rem;margin-top:1rem;"></mt-picker>
        </div>
        <router-link :to="{name:'Authorize_next',params:{a:this.shang,b:this.xia}}" tag="button" class="bottom-btn" @click.native="next">发送授权</router-link>
       </div>
</template>

<script>
export default {
  name: "",
  data() {
    return {
        bgblack:false,//遮罩层
        startleft:false,//控制起始时间选择
        endright:false,//控制结束时间选择
        shang:'',//起始时间
        xia:'',//结束时间
        start:[],
        end:[],//起始时间
        Account:'',
         slotsone: [
            {
            flex: 1,
            values: ['2010', '2011', '2012', '2013', '2014', '2015'],
            className: 'slot1',
            textAlign: 'center'
            }, {
            divider: true,
            content: '-',
            className: 'slot2'
            }, {
            flex: 1,
            values:[
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
                "10",
                "11",
                "12"
            ],
            className: 'slot3',
            textAlign: 'center'
            },{
            divider: true,
            content: '-',
            className: 'slot4'
            }, {
            flex: 1,
            values:[
                "01",
                "02",
                "03",
                "04",
                "05",
                "06",
                "07",
                "08",
                "09",
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
            className: 'slot5',
            textAlign: 'center'
            }, {
            divider: true,
            content: ' ',
            className: 'slot6'
            },{
            flex: 1,
            values: [
                '00:00',
                "01:00",
                "02:00",
                "03:00",
                "04:00",
                "05:00",
                "06:00",
                "07:00",
                "08:00",
                "09:00",
                "10:00",
                "11:00",
                "12:00",
                "13:00",
                "14:00",
                "15:00",
                "16:00",
                "17:00",
                "18:00",
                "19:00",
                "20:00",
                "21:00",
                "22:00",
                "23:00",
            ],
            className: 'slot7',
            textAlign: 'center'
            }
        ]
    };
  },
  methods:{
      next(){
          //获得时间戳
          var shang=new Date(this.shang).getTime()
          var xia=new Date(this.xia).getTime()
      
          var param={
                vin: "LS5A3CJC9JF810003", 
                operationType: "CONTROL_AUTH", 
                operation: 1, 
                extParams: {
                childNum: this.Account, 
                beginTime: shang, 
                endTime: xia,
            }
        }
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
          this.endright=true;
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
           this.shang=this.$refs.startt.innerHTML
           this.xia=this.$refs.endd.innerHTML
    },
        onValuesChangend(picker, values) {
            this.end=values
            this.xia=this.$refs.endd.innerHTML
            this.shang=this.$refs.startt.innerHTML
    }
  },
  mounted(){

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