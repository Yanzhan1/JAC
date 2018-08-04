<template>
    <div>
        <header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">我的订单</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>
        <mt-navbar v-model="selected">
            <mt-tab-item id="one">线索</mt-tab-item>
            <mt-tab-item id="two">商城</mt-tab-item>
            <mt-tab-item id="three">维保</mt-tab-item>
            <mt-tab-item id="four">停车</mt-tab-item>
            <mt-tab-item id="five">流量</mt-tab-item>
        </mt-navbar>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="one">
                <ul>
                    <li class="flex column" v-for="(item,index)  in Xorder" :key="index">
                        <p class="flex row tim">
                            <span class="times">{{item.time}}</span>
                            <span></span>
                        </p>
                        <router-link to="/orderdetails" tag="div" class="flex row con">
                            <div class="flex column bus_left">
                                <img style="height:1.2rem;width:2.46rem" src="../../../static/images/test/my/car_ruifeng_s5.png" alt="">
                                <span class="busname">{{item.model}}</span>
                            </div>
                            <div class="flex column tp">
                                <span class="bus_right">经销商：上海天马汽车销售有限</span>
                                <span class="bus_right">地址：{{item.address}}</span>
                                <span class="bus_right">订单编号：{{item.fkDealerId}}</span>
                                <span class="bus_right">基本型 {{item.carColor}}</span>
                            </div>
                        </router-link>
                        <div class="flex row between bt">
                            <span></span>
                            <span class="cancel" @click="confirmRevise()">取消订单</span>
                        </div>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="two">
                <ul>
                    <li class="flex column">
                        <p class="flex row tim between">
                            <span class="times">2018 09-21 18:34</span>
                            <span class="times">待付款</span>
                        </p>
                        <div class="buycity flex row cocenter between">
                            <div class="flex row">
                                <img class="pictu" src="../../../static/images/test/my/car_ruifeng_s5.png" alt="" style="height:1.2rem;width:1.14rem;">
                                <div class="flex column cocenter maincenter">
                                    <p style="font-size:.31rem;color:#222;">马克华杯</p>
                                    <p style="font-size:.22rem;color:#888;">白色 400ml</p>
                                </div>
                            </div>
                            <div class="flex row cocenter" style="margin-right:.3rem">
                                <span style="font-size:.2rem;color:#222;">X 1</span>
                                <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                            </div>
                        </div>
                        <div class="flex row between bts">
                            <span class="cancels" v-if="3>4">退款申请</span>
                            <span class="cancels" v-if="3>4">查看物流</span>
                            <span class="cancels" @click="confirmRevise()">取消订单</span>
                            <span class="cancel" v-if="3>4">评价晒单</span>
                            <span class="cancel">待付款</span>
                        </div>
                    </li>
                    <li class="flex column">
                        <p class="flex row tim between">
                            <span class="times">2018 09-21 18:34</span>
                            <span class="times">待评价</span>
                        </p>
                        <div class="buycity flex row cocenter between">
                            <div class="flex row">
                                <img class="pictu" src="../../../static/images/test/my/car_ruifeng_s5.png" alt="" style="height:1.2rem;width:1.14rem;">
                                <div class="flex column cocenter maincenter">
                                    <p style="font-size:.31rem;color:#222;">马克华杯</p>
                                    <p style="font-size:.22rem;color:#888;">白色 400ml</p>
                                </div>
                            </div>
                            <div class="flex row cocenter" style="margin-right:.3rem">
                                <span style="font-size:.2rem;color:#222;">X 1</span>
                                <img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
                            </div>
                        </div>
                        <div class="flex row  bts">
                            <span class="cancels" v-if="3>4">取消订单</span>
                            <span class="cancels">退款申请</span>
                            <span class="cancels" @click="wul()">查看物流</span>
                            <span class="cancel" @click="compontent()">评价晒单</span>
                            <span class="cancel" v-if="3>4">待付款</span>
                        </div>
                    </li>

                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="three">
                <ul>
                    <li class="flex column">
                        <p class="flex row tim between">
                            <span class="times">2018 09-21 18:34</span>
                            <span class="times">已预约</span>
                        </p>
                        <div class="flex row cont">
                            <div class="flex column bus_left">
                                <img style="height:1.68rem;width:2.56rem" src="../../../static/images/test/my/car_ruifeng_s5.png" alt="">
                                <span class="busname"></span>
                            </div>
                            <div class="flex column tp">
                                <span class="bus_right">预约网点：上海天马汽车销售有限</span>
                                <span class="bus_right">地址：上海市徐汇区田林路200号</span>
                                <span class="bus_right">预约时间：08509859043589</span>
                                <span class="bus_right">预约项目</span>
                            </div>
                        </div>
                        <div class="flex row between bt">
                            <span></span>
                            <span class="cancel">取消订单</span>
                        </div>
                    </li>
                    <li class="flex column">
                        <p class="flex row tim between">
                            <span class="times">2018 09-21 18:34</span>
                            <span class="times">已完成</span>
                        </p>
                        <div class="flex row cont">
                            <div class="flex column bus_left">
                                <img style="height:1.68rem;width:2.56rem" src="../../../static/images/test/my/car_ruifeng_s5.png" alt="">
                                <span class="busname"></span>
                            </div>
                            <div class="flex column tp">
                                <span class="bus_right">预约网点：上海天马汽车销售有限</span>
                                <span class="bus_right">地址：上海市徐汇区田林路200号</span>
                                <span class="bus_right">预约时间：08509859043589</span>
                                <span class="bus_right">预约项目:维修</span>
                            </div>
                        </div>
                        <div class="flex row between bt">
                            <span></span>
                            <span class="cancel" v-if="3>4">取消订单</span>
                            <span class="cancel">评价晒单</span>
                        </div>
                    </li>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
    </div>
</template>
<script>
import { MessageBox } from "mint-ui";
export default {
  data() {
    return {
      selected: "one",
      Xorder:{}//线索订单
    };
  },
  methods: {
    confirmRevise() {
      MessageBox.confirm("", {
        title: "提示",
        message: "您确定要取消吗？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      })
        .then(action => {
          if (action == "confirm") {
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    },
    wul() {
      this.$router.push("/mywl");
    },
    compontent(){
      this.$router.push("/compontent");
    },
    //线索订单
      GetXorder(){
          this.$http.post(Wit.ClueOrder,{"userNo":"UBS2018072410503423882"}).then(res=>{
              if(res.data.code==0){
                  this.Xorder=res.data.data
                  for(let i =0;i<this.Xorder.length;i++){
                      this.Xorder[i].time= operationTime.getTime(  this.Xorder[i].createdDate, 1 );
                  }
                  console.log(this.Xorder)
              }
           
          })
      }
  },
  created(){
    this.GetXorder()
  }
};
</script>
<style scoped>
.mint-navbar .mint-tab-item {
  padding: 0.3rem 0;
  font-size: 0.28rem;
  color: #555;
}
.mint-navbar {
  border-bottom: 0.01rem solid #f1f1f1;
  padding: 0 0.3rem;
}
.times {
  padding: 0.3rem 0;
  font-size: 0.24rem;
  color: #888;
}
.tim {
  border-bottom: 0.01rem solid #f1f1f1;
  padding: 0 0.4rem;
}
.bus_left {
  margin-top: 0.4rem;
  margin-left: 0.4rem;
}
.busname {
  color: #49bbff;
  font-size: 0.28rem;
  text-align: center;
  margin-top: 0.2rem;
}
.bus_right {
  font-size: 0.24rem;
  color: #555;
  margin-top: 0.15rem;
  /* font-family:  */
}
.tp {
  margin-top: 0.15rem;
  margin-left: 0.4rem;
}
.bt {
  border-top: 1px solid #f1f1f1;
  border-bottom: 0.2rem solid #f5f5f5;
}
.bts {
  border-top: 1px solid #f1f1f1;
  border-bottom: 0.2rem solid #f5f5f5;
  justify-content: flex-end;
}
.cancel {
  text-align: center;
  line-height: 0.5rem;
  width: 1.4rem;
  color: #49bbff;
  border: 1px solid #49bbff;
  border-radius: 0.3rem;
  font-size: 0.24rem;
  margin-top: 0.2rem;
  margin-right: 0.4rem;
  margin-bottom: 0.2rem;
}
.cancels {
  text-align: center;
  line-height: 0.5rem;
  width: 1.4rem;
  color: #555;
  border: 1px solid #555;
  border-radius: 0.3rem;
  font-size: 0.24rem;
  margin-top: 0.2rem;
  margin-right: 0.4rem;
  margin-bottom: 0.2rem;
}
.con {
  padding-bottom: 0.3rem;
}
.cont {
  padding: 0.3rem 0;
}
.buycity {
  height: 2rem;
}
.pictu {
  margin: 0 0.5rem;
}
</style>
