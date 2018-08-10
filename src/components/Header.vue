<template>
    <div>
      <div class="myheader">
        <div>
          <img src="../../static/images/discover/shaixuan.png" @click="open" style="width: 0.4rem;margin-top: 0.1rem;"  />
        </div>
        <div style="" class="head-tab"  :class="{ recommand: isRecommand }" @click.stop.prevent="goIsRecommand">
          <span class="size_36">推荐</span>
        </div>
        <div style="" class="head-tab" :class="{ information: isInformation }" @click.stop.prevent="goInformation">
          <span class="size_36">资讯</span>
        </div>
        <div style="" class="head-tab" :class="{ allActivity: isAllActivity }"  @click.stop.prevent="goAllActivity">
          <span class="size_36">活动</span>
        </div>
        <div style="" class="head-tab" :class="{ now: isNow }" @click.stop.prevent="goIsNow">
          <span class="size_36">社区</span>
        </div>
        <div>
          <img src="../../static/images/discover/camera.png" @click="publish" style="width: 0.4rem;" id='id_publish'/>
        </div>
        <mt-popup
          style="width:80%;border-radius:4px;"
          v-model="popup"
          position="center">
          <div style="width:100%;text-align:center;box-sizing:border-box;font-size:.36rem;color:#555555;">
            切换频道
          </div>
          <p style="height:.02rem;background:#F1F1F1;width:100%;"></p>
          <div>
            <div>
              <table style="margin:0 auto;">
                <tr>
                  <td>
                    <input type="radio" value="1" v-model="picked">
                    <label for="one">全部</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="radio" value="2" v-model="picked">
                    <label for="two">乘用车</label>
                  </td>
                  <td>
                    <input type="radio" value="3" v-model="picked">
                    <label for="two">新能源</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="radio" value="4" v-model="picked">
                    <label for="two">商务车</label>
                  </td>
                  <td>
                    <input type="radio" value="5" v-model="picked">
                    <label for="two">轻卡</label>
                  </td>
                </tr>
                <tr>
                  <td>
                    <input type="radio" value="6" v-model="picked">
                    <label for="two">皮卡</label>
                  </td>
                  <td>
                    <input type="radio" value="7" v-model="picked">
                    <label for="two">重卡</label>
                  </td>
                </tr>
              </table>
            </div>
          </div>
          <div style="width:100%;display:flex;text-align:center;">
            <p style="felx:1;width:100%;font-size:.32rem;color:#888888;" @click="cancle">取消</p>
            <p style="felx:1;width:100%;font-size:.32rem;color:#49BBFF;" @click="confirm">确定</p>
          </div>
        </mt-popup>
      </div>
    </div>
</template>

<script>
  /*import Mine from "./publicmodule/Mine.vue";*/
  import { Radio } from 'mint-ui';
  import { Popup } from 'mint-ui';
  export default {
    data() {
      return {
        userId:this.$store.state.userId,
        isRecommand: true,
        isInformation: true,
        isAllActivity: true,
        isNow: true,
        isQuestion: true,
        popup: false,
        picked: "1",
      }
    },
    components: {
      /*Mine*/
    },
    methods: {
      popupVisibleChange:function () {
        this.$refs.mine.popupVisibleChange()
      },
      goIsRecommand: function() {
        this.$router.push('/recommend')
        this.isRecommand = true
        this.isInformation = false
        this.isAllActivity = false
        this.isNow = false
        this.isQuestion = false
      },
      goInformation: function() {
        this.$router.push('/information')
        this.isInformation = true
        this.isRecommand = false
        this.isAllActivity = false
        this.isNow = false
        this.isQuestion = false
      },
      goAllActivity: function() {
        this.$router.push("/activity")
        this.isAllActivity = true
        this.isRecommand = false
        this.isInformation = false
        this.isNow = false
        this.isQuestion = false
      },
      goIsNow: function() {
        this.$router.push("/now")
        this.isNow = true
        this.isRecommand = false
        this.isInformation = false
        this.isAllActivity = false
        this.isQuestion = false
      },
      goQuestion: function() {
        this.isNow = false
        this.isRecommand = false
        this.isInformation = false
        this.isAllActivity = false
        this.isQuestion = true
      },
      //发布心情
      publish:function () {
         // this.$router.push({path:"/now/addPic"})
        if (isMobile.iOS()) {
          let uuid = this.$store.state.uuid;
          let params = {
            uuid
          }
          window.webkit.messageHandlers.send.postMessage(params);
        } else if (isMobile.Android()) {
          js2android.send("圈子", this.$store.state.uuid, null);
        }
      },
      open: function() {
        this.popup = true
      },
      confirm: function() {
        console.log("this.picked",this.picked)
        this.popup = false
        this.$http.post(INDEXMESSAGE.getRecommend, {"uid":this.userId,"pageNo":1, "length":4, labelIds: this.picked}).then(function (res) {
          if (res.data.status) {
            // _this.pageNum=1;
            // _this.loading=false;
            // _this.recommendList = res.data.data;
            console.log(res.data.data)
            // if(res.data.recordsTotal <= _this.list){
            //   _this.loadEnd = true;
            // }
          } else {
            console.log(res.data.errorMsg);
          }
        });
      },
      cancle: function() {
        this.popup = false
      }
    },
    mounted:function() {
        this.isInformation = false
        this.isAllActivity = false
        this.isNow = false
        this.isQuestion = false
        var temp =window.location.href ;
        var flag = temp.substring(temp.length-3);
        var all = temp.substring(temp.length-8);
        if(all == 'question'){
          this.isNow = false
          this.isRecommand = false
          this.isInformation = false
          this.isAllActivity = false
          this.isQuestion = true
        }else{
            if(flag == 'ity'){
              this.isAllActivity = true
              this.isRecommand = false
              this.isInformation = false
              this.isNow = false
              this.isQuestion = false
            }else if(flag == 'now'){
              this.isAllActivity = false
              this.isRecommand = false
              this.isInformation = false
              this.isNow = true
              this.isQuestion = false
            }else if(flag == 'ion'){
              this.isAllActivity = false
              this.isRecommand = false
              this.isInformation = true
              this.isNow = false
              this.isQuestion = false
            }
        }
        this.$nextTick(function () {
          console.log("this.picked",this.picked)
        })
    }
  }
</script>

<style scoped>
  @import "./../../static/css/discover/all.css";
  .top-pic img{
    width: 0.48rem;height: 0.48rem;position: relative;top: 16%;
  }
  .recommand,.information,.allActivity,.now,.question {
    border-bottom: 0.04rem solid #49BBFF;
    color: #49BBFF;
    height: 0.8rem;
    line-height: 0.8rem;
  }
  .myheader {
    font-size: 0.4rem;
    position: fixed;
    width: 100%;
    background: #ffffff;
    height: .88rem;
    line-height: .88rem;
    padding: 0 .4rem 0;
    display: flex;
    -webkit-box-pack: justify;
    justify-content: space-between;
    -webkit-box-align: center;
    align-items: center;
    top: 0;
    z-index: 999;
  }
  .size_36{
    font-size: 0.36rem;
  }
</style>
