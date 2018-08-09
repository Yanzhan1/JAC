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
                   <input type="text" placeholder="请输入pin码" v-model="Pinma" style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
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
                    <span  ref="Gettimes" style="font-size:.26rem;color:#222">{{this.newyear[0]}}-{{this.allvalues[1]}}-{{this.allvalues[2]}}</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter"  @click="times(4)">
                <p style="font-size:.27rem;color:#555">可预约项目</p>
                <div class="flex row cocenter">
                    <span style="font-size:.26rem;color:#222">{{this.services[0]}}</span>
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
        </ul>
        <div style="padding:0 .33rem;margin-top:.4rem;">
            <span style="font-size:.27rem;color:#555">需求描述:</span>
            <textarea placeholder="输入文本..." v-model="Textarea" class="texta" style="line-height: normal;outline:none" maxlength="50"></textarea>
        </div>
        <ul style="padding:0 .33rem">
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">姓名</p>
                <div class="flex row cocenter">
                   <input type="text" placeholder="请输入姓名" v-model="Names" style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">手机号</p>
                <div class="flex row cocenter">
                     <input type="text" placeholder="请输入手机号" v-model="Phones" style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
            <li class="flex row li_st between cocenter">
                <p style="font-size:.27rem;color:#555">电子邮箱</p>
                <div class="flex row cocenter">
                     <input type="email" placeholder="请输入邮箱" v-model="Email" style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
                    <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                </div>
            </li>
        </ul>
        <span class="bottom-btn" style="background-color:#ccc;" @click="submitt($event)">立即预约</span>
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

           <div style="width:100%;z-index:999" v-if="type==4">
             <div class="flex row between pp">
                    <span></span>
                    <span style="font-size:.34rem;color:#222;margin-left: .7rem;">选择服务类型</span>
                    <span style="font-size:.3rem;color:#49BBFF;margin:0 .3rem" @click="sure">确定</span>
                </div>
                <mt-picker  :slots="service" @change="onServicesChange"></mt-picker>
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
          <!-- 提交成功后显示 -->
       <div class="submit" v-show="success">
                <img src="/static/images/Wit/gou@2x.png" alt="" style="width:.8rem;height:.8rem;" class="gou">
                <h3>提交成功</h3>
                <div class="success_bt">{{this.thanks}}</div>
                <div style="width:5.68rem;height:.02rem;background:#f1f1f1;margin:.2rem auto;"></div>
                <div class="look">
                    <div class="look_l">查看订单</div>
                    <div style="width:.02rem;height:.6rem;background:#f1f1f1;"></div>
                    <div class="look_r" @click="complete">完成</div>
                </div>
            </div> 
             <div v-show="region" class="black" ></div> <!-- 遮罩层  --> 
</div>
</template>
<script>
import { Picker } from "mint-ui";
import { Toast } from 'mint-ui';
export default {
  
  data() {
    return {
      popupVisible: false,
      showToolbar:true,
       success: false,
       region:false,
      type:1,
      thanks:
        "感谢您对江淮汽车的关注与支持，我们专业的服务员会第一时间与您联系!",
       car:[],
      newyear:[],
      choosetimes:'',
      timesstamp:'',//时间戳
      Textarea:'',//需求描述
      Pinma:'',//pin码
      Names:'',//姓名
      Phones:'',//电话
      Email:'',//电子邮箱
      choosecar:{},//所有的车型品牌的接口数据
      chooseaddress:{},//所有的服务商接口数据
      choosebrands:{},//所有的车系接口数据
      address:[],
      allvalues:[],//时间
      onDateChangevalue:[],//values的月份
      Idchooseaddress:'',//返回服务商的每个no
      Idchoosebrand:'',//返回品牌的每个nobrand
      Idchoosesystem:'',//返回每个车系的no
      allnum:0,//判断所有必要内容是否填写
      services:[],
      array31: [
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
      array30: [
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
        "30"
      ],
      array29: [
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
        "29"
      ],
      array28: [
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
        "28"
      ],
      slotss: [
        {
          flex: 1,
          values: [],
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
          values: [],
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
          {values: [],defaultIndex: 3,} ],
     service:[{values:['维修','保养']}]
    };
  },
  mounted(){
        //选择经销商接口
        this.$http.post(Wit.Distributor,{"dealerType":"01"}).then((res)=>{
        this.chooseaddress= res.data.data.records
        for(var i=0;i<this.chooseaddress.length;i++){
        this.slots[0].values.push(this.chooseaddress[i].dealerName)
            }
        })
        // 申请服务车型接口
        this.$http.post(Wit.Brand,{}).then((res)=>{
             this.choosecar=res.data.data
            for(var i=0;i<this.choosecar.length;i++){
                this.addressSlots[0].values.push(this.choosecar[i].seriesName)
            }
        })
        var date=new Date();
        this.newyear.push(date.getFullYear())
        this.slotss[0].values=this.newyear
  },
  methods: {
    onValuesChange(picker, values) {
        this.address=values
        for(var i=0;i<this.chooseaddress.length;i++){
            if(this.chooseaddress[i].dealerName==this.address[0]){
                this.Idchooseaddress=this.chooseaddress[i].no
            }
        }
        console.log(this.Idchooseaddress)
   },
    onDateChange(picker,values){
        this.allvalues=values;
        this.onDateChangevalue=values[1]
       
    },
    onServicesChange(picker, values){
        console.log(values)
        this.services=values
    },
    times(type){
        this.popupVisible=true
        this.type=type
    },
    sure(){
         this.popupVisible=false
    },
    complete() {
      this.success = false;
      this.region=false
    },
    //选择服务车型
    onAddressChange(picker, values) {
      this.car = values;
            for(var i=0;i<this.choosecar.length;i++){
                if(this.choosecar[i].seriesName==this.car[0]){
                   this.Idchoosebrand=this.choosecar[i].brandNo
                }
            }
            //选择车系接口
              this.$http.post(Wit.System,{brandNo:this.Idchoosebrand}).then((res)=>{
                  this.choosebrands=res.data.data
                  this.addressSlots[2].values=[]
                      for(var i=0;i<this.choosebrands.length;i++){
                          this.addressSlots[2].values.push(this.choosebrands[i].seriesName)
                          if(this.choosebrands[i].seriesName==this.car[1]){
                              this.Idchoosesystem=this.choosebrands[i].no
                          }
                      }                  
        })
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    choose_color(){
                if(this.Names==''){
            Toast('请输入姓名')
            return false
        }
        if(this.car.length==0){
            Toast('请选择车型')
            return false
        }
        if(this.Pinma==''){
            Toast('请输入pin码')
            return false
        }
        if(this.address.length==0){
            Toast('请选择经销商')
            return false
        }
        if(this.allvalues.length==0){
            Toast('请选择日期')
            return false
        }
        if(this.Textarea==''){
            Toast('请输入文本')
            return false
            
        }
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        console.log(reg.test(this.Phones))
        if(!reg.test(this.Phones)){
            Toast('请输入正确的手机号')
            return false
        }
   
        var regs=/^[0-9a-zA-Z_]{5,12}@[a-zA-Z0-9_]{2,5}([.][a-zA-Z]{2,5})$/
        if(!regs.test(this.Email)){
            Toast('请输入正确的邮箱')
            return false
        }
        
    },
    submitt(el){
        console.log(this.$refs.Gettimes.innerHTML)
        this.timesstamp=(new Date(this.$refs.Gettimes.innerHTML)).getTime()
        this.choose_color()
       var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
          var regs=/^[0-9a-zA-Z_]{5,12}@[a-zA-Z0-9_]{2,5}([.][a-zA-Z]{2,5})$/
        
        if(this.Names!=''&&this.car.length!=0&&this.Pinma!=''&&this.address.length!=0&&this.allvalues.length!=0&&this.Textarea!=''&&reg.test(this.Phones)==true&&regs.test(this.Email)==true){
            el.target.style.backgroundColor='#49BBFF'
            
            var parmass={
            customerName:this.Names, 
            fkDealerId:"N7650100", //姓名
            gender:"1", //性别
            mobile:this.Phones, //电话
            email:this.Email, //邮箱
            address:"上海市徐汇区田林路", 
            comments:this.Idchooseaddress, //商家
            province:"022", 
            series:this.Idchoosesystem,//车系
            model: this. Idchoosebrand//车型
        }
        this.$http.post(Wit.PreBus,parmass).then((res)=>{
           this.success=true,
           this.region=true
        })
        }
    }
  },
//   watch:{
//       onDateChangevalue(){
//           if(this.allvalues[1]==1||this.allvalues[1]==3||this.allvalues[1]==5||this.allvalues[1]==7||this.allvalues[1]==8||this.allvalues[1]==10||this.allvalues[1]==12){
//             this.slotss[2].values=this.array31
//         }
//         if(this.allvalues[1]==4||this.allvalues[1]==6||this.allvalues[1]==9||this.allvalues[1]==11){
//             this.slotss[2].values=this.array30
//         }
//         if(this.newyear%4==0||this.newyear%100==0&&this.newyear%400){
//             if(this.allvalues[1]==2){
//                 this.slotss[2].values=this.array28
//             }
//         }
//     }
//   },
  watch:{
      onDateChangevalue(){
          if(this.allvalues[1]==1||this.allvalues[1]==3||this.allvalues[1]==5||this.allvalues[1]==7||this.allvalues[1]==8||this.allvalues[1]==10||this.allvalues[1]==12){
            this.slotss[2].values=this.array31
        }
        if(this.allvalues[1]==4||this.allvalues[1]==6||this.allvalues[1]==9||this.allvalues[1]==11){
            this.slotss[2].values=this.array30
        }
        if(this.newyear%4==0||this.newyear%100==0&&this.newyear%400){
            if(this.allvalues[1]==2){
                this.slotss[2].values=this.array28
            }
        }else{
            if(this.allvalues[1]==2){
                this.slotss[2].values=this.array29
            }
        }
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
.submit {
  position: absolute;
  top: 3.31rem;
  left: 0.65rem;
  width: 6.2rem;
  height: 4.12rem;
  background: #fff;
  z-index: 1001;
  border-radius: 0.2rem;
  font-family: PingFang SC;
  font-weight: Medium;
  color: #222;
}
.submit > h3 {
  text-align: center;
  font-size: 0.36rem;
  margin-top: 0.31rem;
}
.success_bt {
  width: 5.02rem;
  text-align: center;
  margin-left: 0.59rem;
  margin-top: 0.36rem;
}
.gou {
  margin-left: 2.7rem;
  margin-top: 0.21rem;
}
.look {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #1e99ff;
}
.look .look_l {
  margin-left: 0.49rem;
  font-size: 0.34rem;
}
.look .look_r {
  margin-right: 0.49rem;
  font-size: 0.34rem;
}
.black {
  width: 100%;
  height: 110%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>

