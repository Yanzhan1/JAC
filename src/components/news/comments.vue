<template>
    <div>
        <!-- <header class="header MobileHeight bgcolor">
            <img @click="$router.go(-1)" class="header-left" :src="'./static/images/back@2x.png'" style="margin-left:.3rem">
            <span class='header-title' style="margin-right: .75rem;">评论</span>
            <span></span>
        </header> -->
        <mhead currentTitle="评论" style="background:#fff"></mhead>
      <div v-if="this.nowactivity" style="margin:.4rem;margin-top:1.5rem;text-align: center">暂无评论</div>
      <mt-loadmore v-else :top-method="loadTop" :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" :bottomLoadingText="loadingText" ref="loadmore" :topDistance="20">
        <!-- <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }" style="font-size: 0.3rem">下拉刷新</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div> -->
        <div
          v-infinite-scroll="getNextList"
          infinite-scroll-disabled="loading"
          infinite-scroll-distance="10">
          <!--<div v-if="List.length==0">
            <div style="height: 8rem;"></div>
          </div>-->
          <ul class="content">
            <li class="area" v-for="(item,index) in List" :key="index" @click="todetail(item.lid,item.id)" style="">
              <div class="content_p">
                <span class="content_t"><span style="width: 0.16rem;height: 0.16rem;border-radius: 50%;background: red;display: inline-block" v-if="!item.readState"></span>{{item.title}}</span>
                <span class="content_x">{{item.createTime}}</span>
              </div>
              <h5 class="wen">
               {{item.content}}
              </h5>
              <div class="teyu">
                <span class="look">点击查看</span>
                <span><img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem"></span>
              </div>
            </li>

          </ul>
          <!--<div v-for="(item,index) in List">

          </div>-->
      <div style="height: 2rem;"></div>
      <!-- <p id="showAll2">已加载全部</p> -->
        </div>
      </mt-loadmore>
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
      nowactivity:false,
    }
  },
  methods: {
    //跳转到详情
    //commentType1：文章 2：此刻 3: 问答4 晒图
    todetail(lid,id){
      this.$http.post(IMFORMATION.read,{lid:id,uid:this.$store.state.userId}).then((res)=>{

      }).catch((err)=>{

      })
      this.$http.get(IMFORMATION.commentRequest+'?id='+lid).then((res)=>{
          if(res.data.status){
            if(res.data.data.commentType==null){
              Toast({
              message: res.data.errorMsg,
              position: 'middle',
              duration: 1000
            })
            }
           if(res.data.data.commentType == 1){
             this.$router.push({path:"/information/informationDetail",query:{id:res.data.data.lid}})
           }else if(res.data.data.commentType == 2){
             this.$router.push({path:"/now/nowDetail",query:{id:res.data.data.lid}})
           }
          }else{
            let instance = Toast({
              message: res.data.errorMsg,
              position: 'middle',
              duration: 1000
            })
          }
      }).catch((err)=>{
        let instance = Toast({
              message: res.data.errorMsg,
              position: 'middle',
              duration: 1000
            })
      })
    },
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
      this.$http.post(IMFORMATION.getList, {"uid": this.$store.state.userId,"pageNo":this.pageNum, "length":this.length,type:2}).then((res)=> {
        if (res.data.status) {
          if(res.data.data[0]==undefined){
            this.nowactivity=true
          }else{
             this.nowactivity=false
          }
          this.pageNum=1;
          this.loading=false;
          this.List = res.data.data;
          // console.log(res.data.data)
          if(res.data.recordsTotal <= this.list){
            this.loadEnd = true;
          }
        } else {
          // console.log(res.data.errorMsg);
        }
      });
    },
    //通知list翻新
    getNextList () {
      if(this.loadEnd){
        this.loadBottom();
        return;
      }
      this.loadEnd=true;
      this.pageNum++;
      this.$http.post(IMFORMATION.getList, {"uid": this.$store.state.userId,"pageNo":this.pageNum, "length":this.length,type:2}).then((res) =>{
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
  text-align: center
}
</style>

