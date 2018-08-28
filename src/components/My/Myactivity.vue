<template>
    <div class="all">
      <div class="header">
        <img class="header-left" src="../../../static/images/back@2x.png" alt="" @click="goList">
        <span class="header-title">我的活动</span>
        <div class="header-right"></div>
      </div>
      <div style="padding: 0.16rem 0;margin-top: 0.88rem">
   <!--     <div v-for="item in myActivityList" class="list">
          <div style="font-size: 0.36rem;margin-bottom: 0.2rem;color: #222222">{{item.activityTitle}}</div>
          <div @click="toDetail(item.activityId)">
            <img :src="item.imgUrl"  style="border-radius: 5px;width: 100%;height: 3.2rem;object-fit:cover;"/>
          </div>
          <div class="flex cocenter between">
            <div class="flex contentcenter" style="padding: 0.1rem 0.16rem;border-radius: 0.16rem;border: 1px solid #555555;color: #555555">
              <span v-if="item.activityState==0">
                     报名中
               </span>
              <span v-if="item.activityState==1">
                     进行中
              </span>
              <span v-if="item.activityState==2">
                     已结束
              </span>
            </div>

            <router-link tag="div" :to="{path:'/my/registryInfo',query: {activityId: item.activityId}}" class="flex contentcenter" style="padding: 0.1rem 0.22rem;border-radius: 0.16rem;border: 1px solid #555555;color: #555555">查看报名信息</router-link>
            <div class="flex contentcenter" style="padding: 0.1rem 0.22rem;border-radius: 0.16rem;border: 1px solid #555555;color: #555555">{{item.planDate}}</div>
          </div>
        </div>-->


          <!--<div class="wrap">
            <div class="box" v-for="item in myActivityList">
              <img @click="goActivityDetail(item.activityId)" :src="item.imgUrl" class="headPic"/>
              <p @click="goActivityDetail(item.activityId)">{{item.activityTitle}}</p>
              <div class="date-box-left">
                <img v-if="item.activityState==0" src="../../../../static/images/discover/daojishi1@2x.png"/>
                <img v-else-if="item.activityState==1" src="../../../../static/images/discover/daojishi2@2x.png"/>
                <img v-else-if="item.activityState==2" src="../../../../static/images/discover/daojishi3@2x.png"/>
                <span>{{item.planDate}}</span>
              </div>
              <div class="date-box-right">
                  <div @click="goActivityDetail(item.activityId)" class="flex contentcenter reconerbox">
                    查看报名信息
                  </div>
              </div>
            </div>
          </div>-->
          <div class="liner"></div>
      </div>
      <div style="height: 1rem"></div>
    </div>
</template>

<script>
    export default {
      name: "Myactivity",
      data(){
        return{
          myActivityList:[],
          imgTemp: '../../../../static/images/1.jpg',
          userId:28
        }
      },
      methods:{
        toDetail: function (id) {
          this.$router.push({path:"/activity/DetailActivity",query:{activityId:id}})
        },
        // 进入活动报名详情
        goActivityDetail: function (id) {
          this.$router.push({path:"/my/registryInfo",query:{activityId:id}})
        },
        //活动列表
        getList: function () {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.myRegistrationList, {"uid": this.$store.state.userId}).then(function (res) {
            if (res.data.status) {
              //console.log(res.data.data)
              _this.myActivityList = res.data.data;
            } else {
              console.log(res.data.errorMsg);
            }
          });
        },
        goList: function() {
          this.$router.push({path:"/discover/allActivity"});
        }
      },
      mounted(){
        this.$nextTick(function () {
          //初始化数据
          this.getList();
        })
      }

    }

</script>

<style scoped>
.all{
  height: 100%;
}
.list{
  padding-top: 0.4rem;
  font-size: 0.24rem;
}
.func>img{
  margin-right: 0.24rem;
}
/*活动*/
.wrap{
  display: flex;
  -webkit-box-orient: vertical;
  -webkit-box-direction: normal;
  flex-direction: column;
  width: 92%;
  margin: 0 auto;
}
.box{
  border: 0.02rem solid #EFEFEF;
  border-radius: 0.08rem;
  height: 4.6rem;
}
.box p{
  padding: 0.1rem 0 0.08rem 0.2rem;
  font-size: 0.32rem;
  color: #222;
}
.date-box-left{
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0 0 0 0.2rem;
  width: 64%;
  float: left;
}
.date-box-right{
  width: 32%;
  float: right;
  text-align: right;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-size: 0.24rem;
}
.date-box-left span,.date-box-right span{
  color: #555555;
  font-size: 0.28rem;
}
.date-box-left img,.date-box-right img{
  margin-right: 0.16rem;
}
.liner{
  height: 0.08rem;
  background: #f4f4f4;
  margin: 0.3rem 0;
}
.headPic{
  height: 3.2rem;
  width: 100%;
  object-fit: cover;
}
.reconerbox{
    padding: 0.1rem 0.22rem;
    border-radius: 0.16rem;
    border: 1px solid #555555;
    color: #555555
  }
</style>
