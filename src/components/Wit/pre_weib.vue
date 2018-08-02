<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">维保预约</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <ul style="padding:0 .33rem">
            <li class="flex row li_st between cocenter"  @click="times(3)">
                <p style="font-size:.27rem;color:#555">申请服务车型</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">{{this.car[0]}} {{this.car[1]}}</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">车辆VIN码</p>
                <div class="flex row cocenter">
                   <input type="text" placeholder="请输入pin码" style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter" @click="times(2)">
                <p style="font-size:.27rem;color:#555">希望联系的服务商</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">{{this.address[0]}}</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter" @click="times(1)">
                <p style="font-size:.27rem;color:#555">选择服务时间</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222"></span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">可预约项目</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222"></span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
        </ul>
        <div style="padding:0 .33rem;margin-top:.4rem;">
            <span style="font-size:.27rem;color:#555">需求描述:</span>
            <textarea placeholder="输入文本..." class="texta" style="line-height: normal;outline:none" maxlength="50"></textarea>
        </div>
        <ul style="padding:0 .33rem">
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">姓名</p>
                <div class="flex row cocenter">
                   <input type="text" placeholder="请输入姓名" style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">手机号</p>
                <div class="flex row cocenter">
                     <input type="text" placeholder="请输入手机号" style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">电子邮箱</p>
                <div class="flex row cocenter">
                     <input type="text" placeholder="请输入邮箱" style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
        </ul>
        <span class="bottom-btn" style="background-color:#ccc;">立即预约</span>
        <mt-popup v-model="popupVisible" position="bottom">
            <div style="width:100%;z-index:999" v-if="type==1">
                <div class="flex row between pp">
                    <span></span>
                    <span style="font-size:.34rem;color:#222;margin-left: .7rem;">选择服务时间</span>
                    <span style="font-size:.3rem;color:#49BBFF;margin:0 .3rem" @click="sure">确定</span>
                </div>
                <mt-picker  :slots="slotss" @change="onDateChange"></mt-picker>
            </div>
           <div style="width:100%;z-index:999" v-if="type==2">
             <div class="flex row between pp">
                    <span></span>
                    <span style="font-size:.34rem;color:#222;margin-left: .7rem;">选择经销商</span>
                    <span style="font-size:.3rem;color:#49BBFF;margin:0 .3rem" @click="sure">确定</span>
                </div>
                <mt-picker  :slots="slots" @change="onValuesChange"></mt-picker>
            </div>
        <div style="width:100%;z-index:999" v-if="type==3">
             <div class="flex row between pp">
                    <span></span>
                    <span style="font-size:.34rem;color:#222;margin-left: .7rem;" >选择服务车型</span>
                    <span style="font-size:.3rem;color:#49BBFF;margin:0 .3rem" @click="sure">确定</span>
                </div>
                 <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
            </div>
        </mt-popup>
</div>
</template>
<script>
import { Picker } from "mint-ui";
export default {
  
  data() {
    return {
      popupVisible: false,
      showToolbar:true,
      type:1,
      car:[],
      address:[],
      Idchooseaddress:[],//返回服务商的no
      Idchoosebrand:[],//返回品牌的no
      Idchoosesystem:[],//返回车系的no
      slotss: [
        {
          flex: 1,
          values: ["2018","2017","2015","2014","2013","2012","2011",],
          className: "slot1",
          textAlign: "left",
           defaultIndex: 2
        },
        {
          flex: 1,
          values: ["01","02","03","04","05","06","07","08","09","10","11","12", ],
          className: "slot2",
          textAlign: "center",
           defaultIndex: 2
        },
       {
          flex: 1,
          values: ["01","02", "03","04","05","06","07","08","09","10","11","12","13",],
          className: "slot3",
          textAlign: "right",
          defaultIndex: 2
        }
      ],
          addressSlots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "",
          itemHieight: 74,
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        }
      ],
      slots:[
          {values: [],defaultIndex: 3,} ]
    };
  },
  mounted(){
        this.$http.post(Wit.Distributor,{"dealerType":"01"}).then((res)=>{
        var chooseaddress= res.data.data.records
        for(var i=0;i<chooseaddress.length;i++){
        this.slots[0].values.push(chooseaddress[i].dealerName)
        this.Idchooseaddress.push(chooseaddress[i].no)
            }
        })
        // 申请服务车型
        this.$http.post(Wit.Brand,{}).then((res)=>{
            var choosecar=res.data.data
            for(var i=0;i<choosecar.length;i++){
                this.addressSlots[0].values.push(choosecar[i].brandName)
                this.Idchoosebrand.push(choosecar[i].no)
            }
        })
        // 车系
        this.$http.post(Wit.System,{"brandNo":"VB2018071805540264192"}).then((res)=>{
            for(var i=0;i<res.data.data.length;i++){
                this.addressSlots[2].values.push(res.data.data[i].seriesName)
                this.Idchoosesystem.push(res.data.data[i].no)
            }
        })
  },
  methods: {
    onValuesChange(picker, values) {
        this.address=values
        console.log(picker)
   },
   onValuesChanges(picker, values){

   },
    onDateChange(picker,values){
        console.log();
   },
    times(type){
        this.popupVisible=true
        this.type=type
    },
    sure(){
         this.popupVisible=false
    },
    //选择服务车型
 onAddressChange(picker, values) {
      this.car = values;
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
  },
  created(){
    //   品牌
    var param={}
    this.$http.post(Wit.Switching,param).then(res=>{
      
    })
  }
};
</script>
<style scoped>
/* 插件样式 */

.one{
    position: fixed;
    height: 1.7rem;
    width: 100%;
    background-color: #fff;
    top: .7rem;
    z-index:1002 ;
    opacity: .7;
}
.li_st {
   height: 0.99rem;
   border-bottom: 0.01rem solid #f1f1f1;
}
.pp{
   line-height: .88rem;
}
.texta {
   height: 1.44rem;
   width: 100%;
   background-color: #f8f8f8;
   font-size: 0.28rem;
   color: #888888;
   margin: 0.4rem 0;
   border: none;
   border-radius: 0.16rem;
   padding: 0.2rem;
}
.mint-popup {
  width: 100%;
}
</style>

