<template>
    <div>
        <header class="header MobileHeight bgcolor">
            <img @click="$router.go(-1)" class="header-left" :src="'./static/images/back@2x.png'" style="margin-left:.3rem">
            <span class='header-title' style="margin-right: .75rem;">车辆报警</span>
            <span></span>
        </header>
        <div v-if="this.shows" style="margin:.4rem;margin-top:1.5rem;text-align: center">暂无消息</div>
      <mt-loadmore v-else :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomLoadingText="loadingText" ref="loadmore" :topDistance="20">
        <div
          v-infinite-scroll="getNextList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <ul class="content">
            <li class="area" v-for="(item,index) in List" :key="index"  style="">
              <div class="content_p">
                <span class="content_t"><span style="width: 0.16rem;height: 0.16rem;border-radius: 50%;background: red;display: inline-block" v-if="item.readState"></span>{{item.title}}</span>
                <span class="content_x">{{item.createTime}}</span>
              </div>
              <h5 class="wen">
               {{item.content}}
              </h5>
            </li>

          </ul>
        </div>
      </mt-loadmore>
      <div style="height: .3rem;"></div>
      <p id="showAll2">已加载全部</p>
    </div>
</template>
<script>
  import {Toast} from 'mint-ui'
  import PublicHead from '../publicmodel/PublicHead';
export default {
	components: {
	  mhead:PublicHead
  },
  data(){
    return{
      loadingText: "",
      allLoaded: false,
      loadEnd:false,
      loading:false,
      topStatus:'',
      pageNum:1,
      length:4,
      List:[],
      shows:false,
    }
  },
  methods: {
    loadTop() {
      this.getNextList();
      this.$refs.loadmore.onTopLoaded();
    },
    loadBottom() {

    },
    //1，通知 2、评论 3、活动
    //readState 已读状态
    init(){
      //获取列表第一页
      this.loading=true;
      this.loadEnd=false;
      this.$http.post(IMFORMATION.getList, {"pageNo":this.pageNum, "length":this.length,type:5}).then((res)=> {
        if (res.data.status) {
          if(res.data.data[0]==undefined){
            this.shows=true
          }else{
             this.shows=false
          }
          this.pageNum=1;
          this.loading=false;
          this.List = res.data.data;
          console.log(this.List)
          if(res.data.recordsTotal <= this.list){
            this.loadEnd = true;
          }
        }
      });
    },
    //通知list翻新
    getNextList() {
      if(this.loadEnd){
        this.loadBottom();
        return;
      }
      this.loadEnd=true;
      this.pageNum++;
      this.$http.post(IMFORMATION.getList, {"pageNo":this.pageNum, "length":this.length,type:5}).then((res)=> {
        this.loadEnd=false;
        if (res.data.status) {
          var allPages = Math.ceil(res.data.recordsTotal/this.length);
          if(allPages <= this.pageNum){
            this.loading = true;
            this.allLoaded = true;
            this.loadEnd = true;
            $("#showAll2").show();
          }
          if(allPages >= this.pageNum){
            this.List = this.List.concat(res.data.data);
          }
        } else {
          this.pageNum = this.pageNum -1;
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
  margin-top: 0.9rem;
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
  padding: 0.2rem;
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
  padding: 0.4rem .2rem;
  border-top: 1px solid #ccc;
  height: 0.62rem;
}
.look {
  font-size: 0.24rem;
  color: rgba(252, 87, 31);
}
#showAll2{
  display: none;
  font-size: 0.3rem;
  margin: auto;
  text-align: center;
  margin-bottom: .3rem;
}
</style>

