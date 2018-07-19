<template>
  <div class="pop-up">
    <mt-popup
        style="width:80%;border-radius:4px;"
        v-model="popup"
        position="center">
        <div class="channel">
            切换频道
        </div>
        <p class="base-line"></p>
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
        <div class="btn">
            <p @click="cancle">取消</p>  
            <p @click="confirm">确定</p>
        </div>          
    </mt-popup>        
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
        popup: false,
        picked: "1",      
      }
    },
    components: {
    },
    methods: {
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
        this.$nextTick(function () {    
          console.log("this.picked",this.picked)
        })
    }
  }
</script>

<style scoped>
    .channel {
        width:100%;
        text-align:center;
        box-sizing:border-box;
        font-size:.36rem;
        color:#555555;
    }
    .base-line {
        height:.02rem;
        background:#F1F1F1;
        width:100%;
    }
    .btn {
        width:100%;
        display:flex;
        text-align:center;
    }
    .btn p {
        flex:1;
        width:100%;
        font-size:.32rem;
    }
    .btn p:nth-child(1) {
        color:#888888;
    }
    .btn p:nth-child(1) {
        color:#49BBFF;;
    }
</style>
