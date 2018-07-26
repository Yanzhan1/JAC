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
                    <span style="font-size:.26rem;color:#222">瑞风M6</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">车辆VIN码</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">TcLjfafkdsjflkds</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter" @click="times(2)">
                <p style="font-size:.27rem;color:#555">希望联系的服务商</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">上海马太科技汽车中心</span>
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
            <textarea placeholder="输入文本..." class="texta" style="line-height: normal" maxlength="50"></textarea>
        </div>
        <ul style="padding:0 .33rem">
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">姓名</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">李涛</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">手机号</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">15021015604</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">电子邮箱</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">342285154@qq.com</span>
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
                <mt-picker  :slots="slotss" @change="onValuesChange"></mt-picker>
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
                    <span style="font-size:.34rem;color:#222;margin-left: .7rem;">选择服务车型</span>
                    <span style="font-size:.3rem;color:#49BBFF;margin:0 .3rem" @click="sure">确定</span>
                </div>
                 <mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
            </div>
        </mt-popup>
       
    </div>
</template>
<script>
import { Picker } from "mint-ui";
const address = {
  '江西': ['南昌', '吉安', '宜春', '抚州', '上饶'],
    '广东': ['广州',  '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
    '湖南': ['长沙',  '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
    '广西': ['南宁', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
   };
export default {
  
  data() {
    return {
      popupVisible: false,
      showToolbar:true,
      type:1,
      slotss: [
        {
          flex: 1,
          values: ["2018","2017","2016","2015","2014","2013","2012","2011",],
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
            values: Object.keys(address),
            className: 'slot1',
            textAlign: 'center'
          }, {
            divider: true,
            content: '-',
            className: 'slot2'
          }, {
            flex: 1,
            values: ['南昌'],
            className: 'slot3',
            textAlign: 'center',
            
          }
        ],
         addressProvince: '北京1',
        addressCity: '北京1',
      slots:[{values: ['苏州金龙汽车销售有限公司','大连中盛汽车4销售有限公司', '大连中盛汽车销售有限公司', '泰马金融股颠三倒四份汽车'],defaultIndex: 3,}, ]
    };
  },
  methods: {
    onValuesChange(picker, values) {
      console.log(picker, values);
      },
    times(type){
        this.popupVisible=true
        this.type=type
    },
    sure(){
         this.popupVisible=false
    },
     onAddressChange(picker, values) {
        picker.setSlotValues(1, address[values[0]]);
        this.addressProvince = values[0];
        this.addressCity = values[1];
      }
  },
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


