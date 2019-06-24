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
                  <div class="title_leader flex">
                    <span>车队长</span>
                    <span class="specil">{{item.contact}}</span>
                    <span>车辆数</span>
                    <span class="specil">{{item.vehicleNum}}</span>
                  </div>
                </div>
                <div class="choose_default">
                  <div class="flex default">
                    <label for="foot-check" class="input-label" :class="index==curindex?'active':''"  @click="default_team(index,item.teamId)"> </label>
                    <span class="moren" :class="index==curindex?'actived':''">默认车队</span>
                  </div>
                  <div class="flex edict" @click="toFleetmodification(item)">
                    <img src="/static/images/carteam/edit@2x.png" alt="">
                    <div>编辑车队</div>
                  </div>
                </div>
              </div>

            </div>
            <div class="bottom flex" >
              <div>实时监控</div>
              <div>历史轨迹</div>
              <div>流量查询</div>
              <div>车辆体检</div>
              <div>驾驶分析</div>
            </div>
          </div>
      </div>
</template>

<script>
import {Toast} from 'mint-ui'
export default {
		data() {
			return {
        list:[],
        curindex:-1,
      };
    },
    methods:{
      init(){
        let params={
          userid:'1333298182',
          teamId:'',
          brandId:'1'
        }
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
            for(let i=0;i<this.list.length;i++){
              if(this.list[i].defalutTeam==1){
                  this.curindex=i
              }
            }
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
        this.$store.dispatch('FleetInformation',item)
      },
      default_team(index,teamId){
        this.$http.post(Lightcar.setdefaultteam,{teamId:teamId}).then(res=>{
          if(res.data.code==0){
            this.curindex=index
          }else{
              Toast({
                  message: res.data.msg,
                  position: "middle",
                  duration: 2000
                });
          }
        })
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
    margin-left: .2rem;
    align-items: center;
  }
  .showcarteam .top .title_leader span{
    font-size:.2rem ;
    padding: .2rem;
  }
  .showcarteam .top .title_leader .specil{
    font-size:.3rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(34,34,34,1);
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
    height: .8rem;
    background:rgba(255,255,255,1);
    border-radius:.1rem;
    border-top: .01rem solid #eeeeee;
    margin-top: .3rem;
    line-height: .8rem;
    justify-content: space-around;
    color:rgba(136,136,136,1)
  }
  .showcarteam .bottom>div{
    font-size: .22rem;
  }
  .choose_default{
    margin-top:.15rem;
    margin-right: .3rem;
  }
  .choose_default .default{
    align-items: center;
  }
  .choose_default .default .input-label {
  display: block;
  width: 0.24rem;
  height: 0.24rem;
  background-image: url("../../../../static/images/Lovecar/loseWindow.png");
  border-radius: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  margin-right: .1rem;
}
 .choose_default .default .input-label.active {
  background-image: url("../../../../static/images/Lovecar/window2@2x.png");
  width: 0.24rem;
  height: 0.24rem;
  background-size: 100%;
  background-repeat: no-repeat;
}
.choose_default .default .moren{
  font-size:.22rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color: #000;
}
.choose_default .default .moren.actived{
  color: #49BBFF;
}
.edict{
  align-items: center;
  margin-top: .67rem;
}
.showcarteam .top .edict>img{
  width: .2rem;
  height: .2rem;
  margin-right: .1rem;
}
.showcarteam .top .edict>div{
  font-size:.22rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  color:rgba(187,187,187,1);
}
</style>
