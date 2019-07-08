<template>
    <div>
        <!-- <header class="header MobileHeight bgcolor">
            <img @click="$router.go(-1)" class="header-left" :src="'./static/images/back@2x.png'" style="margin-left:.4rem">
            <span class='header-title' style="margin-right: .75rem;">活动</span>
            <span></span>
        </header> -->
				<mhead currentTitle="活动" style="background:#fff"></mhead>
        <div style="margin:.4rem;margin-top:1.5rem;text-align: center" v-show="this.noactivity">暂无活动信息</div>
      <mt-loadmore v-show="!this.noactivity"  :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" ref="loadmore" :topDistance="20">
        <!-- <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="font-size: 0.3rem">下拉刷新</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div> -->
        <div
          v-infinite-scroll="getNextList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <ul class="content">
            <li class="area" v-for="(item,index) in List" :key="index" @click="toactivity(item.lid,item.id)" style="">
              <div class="content_p">
                <span class="content_t">{{item.title}}</span>
                <span class="content_x">{{item.createTime}}</span>
              </div>
              <h5 class="wen">
                {{item.content}}
              </h5>
              <div class="teyu">
                <span class="look">点击查看</span>
                <span><img src="../../../static/images/next@2x.png" alt=""></span>
              </div>
            </li>

          </ul>
         </div>
      </mt-loadmore>
      <div style="height: 2rem;"></div>
      <!-- <p id="showAll2">已加载全部</p> -->
    </div>
</template>
<script>
	import PublicHead from '../publicmodel/PublicHead';
export default {
	components: {
	  mhead:PublicHead
  },
  data(){
    return{
      allLoaded: false,
      loadEnd:false,
      loading:false,
      topStatus:'',
      pageNum:1,
      length:4,
      List:[],
      noactivity:true,
    }
  },
  methods: {
    //前往活动详情
    toactivity(lid,id){
      this.$http.post(IMFORMATION.read,{lid:id,uid:this.$store.state.userId}).then((res)=>{

      }).catch((err)=>{

      })
      this.$router.push({path:'/activity/activityDetail',query: {activityId:lid}})
    },
    fn() {

    //   this.$router.push("/info/info_details");
    },
    loadTop() {
      this.getNextList();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom(){

    },
    //1，通知 2、评论 3、活动
    //readState 已读状态
    init(){
      //获取列表第一页
      let _this = this;
      this.loading=true;
      this.loadEnd=false;
      this.$http.post(IMFORMATION.getList, {"uid": this.$store.state.userId,"pageNo":_this.pageNum, "length":_this.length,type:3}).then(function (res) {
        // console.log(res.data.data[0])
        if(res.data.data.length > 0){
         _this.noactivity=false
        }
        if (res.data.status) {
          _this.pageNum=1;
          _this.loading=false;
          _this.List = res.data.data;
          if(res.data.recordsTotal <= _this.list){
            _this.loadEnd = true;
          }
        } else {
          // console.log(res.data.errorMsg);
        }
      });
    },
    //通知list翻新
    getNextList: function () {
      let _this = this;
      if(this.loadEnd){
        this.loadBottom();
        return;
      }
      this.loadEnd=true;
      this.pageNum++;
      this.$http.post(IMFORMATION.getList, {"uid": this.$store.state.userId,"pageNo":_this.pageNum, "length":_this.length,type:3}).then(function (res) {
        _this.loadEnd=false;
        if (res.data.status) {
          // _this.List = _this.List.concat(res.data.data);
          var allPages = Math.ceil(res.data.recordsTotal/_this.length);
          if(allPages <= _this.pageNum){
            _this.loading = true;
            _this.allLoaded = true;
            _this.loadEnd = true;
            $("#showAll2").show();
          }
          if(allPages >= _this.pageNum){
            _this.List = _this.List.concat(res.data.data);
          }
        } else {
          _this.pageNum = _this.pageNum -1;
          // console.log(res.data.errorMsg);
        }
      });
    },
  },
  mounted(){
        $(".MobileHeight").css({
            "borderTopWidth": this.$store.state.mobileStatusBar,
            "borderTopColor": "#fff",
          })
    this.init()
  }
};
</script>

<style scoped>
* {
  padding: 0;
  margin: 0;
}
.MobileHeight {
		border-top-style: solid;
		box-sizing: content-box;
	}
  .bgcolor{
    background: #fff;
  }
li {
  list-style: none;
  margin-top: 0.2rem;
}
.content {
  background-color: #f8f8f8;
  width: 100%;
  padding: 0.5rem 0.4rem 0.4rem 0.4rem;
  margin-top: 0.3rem;
}
.area {
  border: 1px solid #ccc;
  background-color: #fff;
}
.content_p {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem;
}
.content_t {
  font-size: 0.35rem;
  color: rgba(10, 4, 4, 0.8);
  font-weight: 700;
}
.content_x {
  font-size: 0.22rem;
  color: rgba(10, 4, 4, 0.86);
}
.wen {
  padding: 0.2rem 0.4rem;
  font-size: 0.23rem;
  color: rgba(10, 4, 4, 0.5);
  line-height: 0.5rem;
}
.teyu {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 0.4rem;
  border-top: 1px solid #ccc;
  height: 0.62rem;
}
.look {
  font-size: 0.24rem;
  color: rgba(252, 87, 31);
}
#showAll2{
  display: none; font-size: 0.3rem;margin: auto;text-align: center
}
</style>

