<template>
      <div>
        <header class="header MobileHeight">
          <img class="header-left" :src="'./static/images/back@2x.png'" @click="goindex">
          <span class="header-title">车队管理</span>
          <span >
            <router-link tag="div" to="/felltManagement/createateam" style="color:#49BBFF" >创建车队</router-link>
          </span>
        </header>
        <div style="height:.88rem" class="MobileHeight"></div>
        <div class="control">
            <div class="carcontrol" @click="toVehiclemanagement">车辆管理</div>
            <div style="color:#EEEEEE">|</div>
            <div class="persioncontrol" @click="toDrivermanagemen">司机管理</div>
        </div>
        <div class="showcarteam" v-for="(item,index) in this.list" :key="index">
            <div>
              <div class="top">
                <div>
                  <div class="title">{{item.teamName}}</div>
                  <div class="title_leader">
                    <span>车队长</span>
                    <span>车辆数</span>
                  </div>
                  <div class="title_name">
                    <span>{{item.contact}}</span>
                    <span>{{item.vehicleNum}}</span>
                  </div>
                </div>
                <img src="/static/images/carteam/goldBody.png" alt=""/>
              </div>

            </div>
            <div class="bottom" @click="toFleetmodification(item)">编辑车队</div>
          </div>
      </div>
</template>

<script>
export default {
		data() {
			return {
        list:[]
      };
    },
    methods:{
      init(){
        let params={
          userid:'1333298182',
          teamId:'',
          brandId:'1'
        }
        console.log(Lightcar.findteamlist)
          this.$http
        .post(
          Lightcar.findteamlist,
          {
            userId:'1333298182',
            teamId:'',
            brandId:'1'
          }
        )
        .then(res => {
          if(res.data.code==0){
            this.list=res.data.data
          }
        });
      },
      goindex(){
        this.$router.push({
          path:'/myindex'
        })
      },
      toVehiclemanagement(){
        this.$router.push({
          path:'/felltManagement/vehiclemanagement'
        })
      },
      toDrivermanagemen(){
        this.$router.push({
          path:'/felltManagement/drivermanagemen'
        })
      },
      toFleetmodification(item){
        this.$router.push({
          path:'/felltManagement/Editteam',
          query:{
            item
          }
        })
      }
    },
    created(){
      this.init()
    },
    mounted(){
      console.log(this.$store.state.mobileStatusBar)
      $(".MobileHeight").css({ marginTop: this.$store.state.mobileStatusBar });
    }
}
</script>

<style scoped>
  .header{
    background: #ffffff;
  }
  .MobileHeight{
    background: #ffffff;
  }
  .control{
    position: fixed;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    line-height: .88rem;
    border-top: .01rem solid #EEEEEE;
    border-bottom: .01rem solid #EEEEEE;
    background: #ffffff;
    z-index: 2;
  }
  .control>div{
    color: #49BBFF;
    font-size: .28rem;
  }
  .showcarteam{
    position: relative;
    top: .88rem;
    width:90%;
    margin: 0 auto;
    background:rgba(255,255,255,1);
    box-shadow:0 0 12px 0 rgba(0, 0, 0, 0.1);
    border-radius:.1rem;
    height: 3rem;
    margin-top: .31rem;
  }
  .showcarteam .top{
    display:flex;
    justify-content: space-between;
  }
  .showcarteam .top>img{
    width: 3.04rem;
    height: 1.95rem;
  }
  .showcarteam .top .title{
    width: 2rem;
    height: .6rem;
    color: #ffffff;
    font-size: .28rem;
    line-height: .6rem;
    text-align: center;
    background:rgba(73,187,255,1);
    box-shadow:0px 0px 8px 0px rgba(0, 0, 0, 0.1);
    border-radius:.1rem 0;
  }
  .showcarteam .top .title_leader{
    font-family:'PingFang-SC-Medium';
    color:rgba(136,136,136,1);
    margin-top: .49rem;
  }
  .showcarteam .top .title_leader span{
    padding: .4rem;
    font-size:.2rem !important;
  }
  .showcarteam .top .title_name{
    font-family:'PingFang-SC-Bold';
    font-weight:bold;
    color:rgba(34,34,34,1);
    margin-top: .14rem;
  }
  .showcarteam .top .title_name span{
    font-size: .3rem;
    margin: .4rem;
  }
  .showcarteam .bottom{
    text-align: center;
    height: .8rem;
    background:rgba(255,255,255,1);
    border-radius:.1rem;
    border-top: .01rem solid #eeeeee;
    margin-top: .3rem;
    line-height: .8rem;
    font-size: .28rem;
    color: #49BBFF;
  }
</style>
