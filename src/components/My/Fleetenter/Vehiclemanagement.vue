<template>
      <div>
        <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
          <span class="header-title" style="margin-left:.6rem">车辆管理</span>
          <span ></span>
        </header>
        <div style="height:0.88rem" class="MobileHeight"></div>
        <!-- <div class="mui-table-view-cell" v-for="(item,index) in this.list" :key="index">
            <div class="mui-slider-right mui-disabled">
              <a class="mui-btn mui-btn-primary" style="background-color:#F4F4F4;">删除车辆</a>
              <a class="mui-btn mui-btn-red">解除司机</a>
            </div>
            <div class="mui-slider-handle">
              <div class="mui-table-cell"> -->
                <div class="box" v-for="(item,index) in this.list" :key="index">
                    <div class="top">
                        <div class="seriesName">{{item.model}}</div>
                        <div class="idvin">VIN:{{item.vin}}</div>
                        <div class="plated" @click="godetail(item)">详情 ></div>
                    </div>
                    <div class="middle">
                        <div style="margin-left:.29rem;">车牌</div>
                        <div>里程</div>
                        <div style="margin-right:.29rem;">油耗</div>
                    </div>
                    <div class="bottom">
                        <div style="margin-left:.29rem">{{item.plate}}</div>
                        <div style="margin-right:.7rem">{{item.mileage}}KM</div>
                        <div style="margin-right:.31rem">{{item.averageFuelConsumption}}L/h</div>
                    </div>
                </div>
              <!-- </div>
            </div>
        </div> -->
      </div>
</template>

<script>
export default {
  data(){
    return{
      list:[]
    }
  },
  methods:{
    init(){
      let param={
        brandId:this.$store.state.brandId,
      }
      this.$http.post(Lightcar.truckfindvehiclelist,param).then(res=>{
        if(res.data.code==0){
           this.list=res.data.data
        }
      })
    },
    godetail(val){
      this.$router.push({
        path:"/felltManagement/vehicledetails",
        query:{
            item:val
        }
      })
      this.$store.dispatch("VehicleInformation",val)
    }
  },
  created(){
    this.init()
  },
  mounted(){
      $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
  }
}
</script>

<style scoped>
.header{
  border-bottom: .01rem solid #eee;
}
.box{
  width: 100%;
  height: 1.6rem;
  border-bottom: .01rem solid #eeeeee;
}
.box .top{
  display: flex;
  align-items: center;
  font-weight:bold;
  color:rgba(136,136,136,1);
  width:100%;
  justify-content: space-between;
}
.box .top .plated{
  color: #49BBFF;
  font-weight: 500;
  font-size: .24rem;
  margin-right: .29rem;
}
.box .top .seriesName{
  color:rgba(34,34,34,1);
  font-size: .28rem;
  margin: 0.1rem 0.29rem;
}
.box .top>div{
  font-size: .22rem;
  height: .3rem;
  line-height: .3rem;
}
.box .middle{
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.box .middle>div{
  font-weight:500;
  color:rgba(85,85,85,1);
  font-size: .22rem;
  /* margin-left: 2rem; */
}
.box .bottom{
  display: flex;
  margin-top: .15rem;
  justify-content: space-between;
}
.box .bottom>div{
  font-size: .24rem;
  color:#555;
  font-weight:bold;
}
.box .top .idvin{
  /* margin-left: .5rem; */
}
.mui-table-view-cell{
  border-bottom: .01rem solid #eee;
}
</style>
