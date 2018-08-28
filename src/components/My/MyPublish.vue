<template>
    <div class="all">
      <header class="mui-bar mui-bar-nav">
        <a class="mui-icon mui-icon-left-nav mui-pull-left" @click="$router.go(-1)"></a>
        <h1 class="mui-title">我的发布</h1>
      </header>

<!--      <div class="mui-content" style="background-color: #FFFFFF;">
        <div style="height: 0.4rem;"></div>
        <div v-for="item in listNum" class="d_01">
          <div class="d_02">
            <div class="d_03">
              <router-link to="/userstar">
                <img src="../../../static/images/user-photo.png" style="width: 0.6rem;height: 0.6rem" />
              </router-link>
            </div>
            <div class="d_04">
              <span style="color: #333333;font-size: 0.3rem;"> 张一歌 </span>
            </div>
            <div class="d_05">
              <span style="color: #333333;font-size: 0.3rem;">+ 关注</span>
            </div>
          </div>

          <div style="width: 100%; height: 3rem;">
            <img src="../../../static/images/4.jpg" style="border-radius: 5px;width: 100%;height: 3rem"/>
          </div>
          <router-link tag="div" class="d_06" to="/discdetail">
            <span style="color: #333333;font-size:0.3rem;">小马哥说车,告诉你想知道的。</span>
          </router-link>
          <div class="d_07">
            <div class="d_08">
              <span style="color: #999999;font-size: 0.3rem;">3-08</span>
            </div>
            <div class="d_09">
              <img src="../../../static/images/查看.png" style="width: 0.4rem;height: 0.4rem"/>
              <span style="color: #999999;font-size: 0.3rem;">1006</span>
            </div>
          </div>
          <div class="d_12"></div>
          <div style="height: 0.4rem;"></div>
        </div>

      </div>-->

    </div>
</template>

<script>
    export default {
        name: "ugc",
      data(){
          return{
            listNum:5
          }
      },
      methods:{
          getList:function () {
            console.log('进入列表渲染方法');
            this.$http.get('../static/data/comment.json').then(function(res){
              console.log(res.data.data[0].createBy);
            },function(res){
              console.log(res.status);
            });
            /*this.$http.post('http://172.18.31.43:8868/infoLabel/v1/likeStatusAndNum',{id:2},{emulateJSON:true}).then(function(res){
              console.log(res.data.status);
            },function(res){
              console.log(res.status);
            });*/
          }
      },
      mounted(){
        this.getList();
      }
    }
</script>

<style scoped>
  @import "./../../../static/css/discover/all.css";
  @import "./../../../static/css/discover/detail.css";
</style>
