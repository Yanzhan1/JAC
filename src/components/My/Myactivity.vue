<template>
    <div style="">
      <header class="header MobileHeight bgcolor">
        <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
        <span class="header-title">我的活动</span>
        <span class="header-right"></span>
      </header>
      <div style="height:.88rem"></div>
      <div style="padding: 0.16rem 4%;">
        <!--活动列表S-->
        <div v-for="(item) in myActivityList" :key="item.id">
          <div class="boxInfo">
            <p class="listTitleInfo" @click="toDetail(item.activityId)">
              {{item.activityTitle.slice(0,46)}}
              <span v-if="item.activityTitle.length>46">...</span>
            </p>
            <img class="listPic312" @click="toDetail(item.activityId)" :src="item.imgUrl"/>
            <div class="listIconActivity">
              <!--报名中-->
              <div v-if="item.activityState==0">
                <img src="../../../static/images/discover/date1.png" class="f_left"/>
                <span class="f_left">{{item.planDate}}开始</span>
                <span class="f_right reconerbox" @click="goActivityDetail(item.activityId)">
                  查看报名信息
                </span>
              </div>
              <!--已开始-->
              <div v-if="item.activityState==1">
                <img src="../../../static/images/discover/date2.png" class="f_left"/>
                <span class="f_left">{{item.planDate}}</span>
                <span class="f_right reconerbox" @click="goActivityDetail(item.activityId)">
                  查看报名信息
                </span>
              </div>
              <!--已结束-->
              <div v-if="item.activityState==2">
                <img src="../../../static/images/discover/date3.png" class="f_left"/>
                <span class="f_left">{{item.planDate}}</span>
                <span class="f_right reconerbox" @click="goActivityDetail(item.activityId)">
                  查看报名信息
                </span>
              </div>
            </div>
          </div>
        </div>
        <!--活动列表E-->
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
                <img v-if="item.activityState==0" src="../../../static/images/discover/daojishi1@2x.png"/>
                <img v-else-if="item.activityState==1" src="../../../static/images/discover/daojishi2@2x.png"/>
                <img v-else-if="item.activityState==2" src="../../../static/images/discover/daojishi3@2x.png"/>
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
	import PublicHead from '../publicmodel/PublicHead';
    export default {
      name: "Myactivity",
      components: {
	  	mhead:PublicHead
	  },
      data(){
        return{
          myActivityList:[],
          imgTemp: '../../../static/images/1.jpg',
        }
      },
      methods:{
        toDetail: function (id) {
          this.$router.push({path:"/activity/activityDetail",query:{activityId:id}})
        },
        // 进入活动报名详情
        goActivityDetail: function (id) {
          this.$router.push({path:"/registryInfo",query:{activityId:id}})
        },
        //活动列表
        getList: function () {
          var _this = this;
          this.$http.post(DISCOVERMESSAGE.myRegistrationList, {"uid": this.$store.state.userId}).then(function (res) {
            if (res.data.status) {
              _this.myActivityList = res.data.data;
            } else {
            }
          });
        },
        goList: function() {
          this.$router.push({path:"/discover/allActivity"});
        }
      },
      mounted(){
        this.$nextTick(function () {
           $(".MobileHeight").css({
              "borderTopWidth": this.$store.state.mobileStatusBar,
              "borderTopColor": "#fff",
            })
          //初始化数据
          this.getList();
        })
      }

    }

</script>

<style scoped>
  @import "./../../../static/css/discover/all.css";
  .header{
    background: #fff;
    margin-left: -0.3rem;
  }
  .MobileHeight {
		border-top-style: solid;
		box-sizing: content-box;
	}
  .reconerbox{
    padding: 0.02rem 0.1rem;
    border-radius: 0.08rem;
    border: 0.02rem solid #2099FF;
    color: #2099FF !important;
    font-size: 0.24rem !important;
  }
</style>
