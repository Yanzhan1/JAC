<template>
  <div class="setChannel">
    <h1 class="title">
      选择您感兴趣的车型
    </h1>
    <!-- <Multicheckbox :source='labels' :busValue="picked" @getTt="getTtInfo"></Multicheckbox> -->

    <div class="content">
      <div class="all-check" v-bind:class="allChecked ? 'allcheck-css' : 'noallcheck-css'" @click="allCheckedFunc">
        全选
        <img src="../../../../static/images/discover/tick_1.png" alt="" v-if="allChecked">
        <img src="../../../../static/images/discover/tick_0.png" alt="" v-else>
      </div>
      <div class="check">
        <div v-for="(item,index) in labels" :key="item.id" class="round" v-bind:class="item.checked ? 'check-css' : 'nocheck-css'" @click.stop="CheckedFunc(item,index)">
          <label :for="'picked_'+item.labelId">{{item.labelName}}</label>
          <img src="../../../../static/images/discover/tick_1.png" alt="" v-if="item.checked">
          <img src="../../../../static/images/discover/tick_0.png" alt="" v-else>
        </div>
      </div>
    </div>
    <div class="footer">
      <p class="confirm" @click="confirm">确定</p>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  import Multicheckbox from '../component/Multicheckbox';
  export default {
    name: "setChannel",
    data(){
      return{
        allChecked: false, //全选
        labels: [],
        picked:[],
        labelState: 11, //标签默认值为11
      }
    },
    components:{Multicheckbox},
    methods:{
      // 全选
      allCheckedFunc() {
        this.allChecked = !this.allChecked
        if(this.allChecked) {
          this.picked = []
          this.labels.map((item) => {
            item.checked = true
            this.picked.push(item)
          })
        } else {
          this.labels.map((item) => {
            item.checked = false
          })
          this.picked = []
        }
      },
      // 单选
      CheckedFunc(item,index) {
        item.checked = !item.checked
        if(item.checked) {
          this.picked.push(item)
        } else {
          this.picked.map((list) => {
            if(list == item) {
              const index = this.picked.indexOf(item)
              this.picked.splice(index, 1)
            }
          })
        }
      },
      getTtInfo:function(par){
        this.objInfo.tt= par;
      },
      // 获取初始化标签列表
      getLabels: function () {
        let _this = this
        this.$http.post(DISCOVERMESSAGE.getLabels, {
          labelState: this.labelState
        }).then(function (res) {
          if (res.data.status) {
            // 给基础数据排序
            const [zero, one, two, three, four, fives, a] = res.data.data
            const arr = [one, three, zero, fives, two, four, a].filter((item) => {
              return item ? true : false
            })

            _this.labels = arr

            _this.labels.map((item) => {
              _this.$set(item, 'checked', false)
            })
          }
        });
      },
      confirm: function () {
        var _this = this
        let pickData = []
        //如果客户不选择车型，直接点击确认，默认全选
        if (this.picked.length === 0) {
          pickData = this.labels.map((item) => {
            return item.labelCode
          })
        }else{
          pickData = this.picked.map((item) => {
            return item.labelCode
          })
        }
        _this.$store.dispatch('selectLabelState', pickData);
        _this.$http.post(DISCOVERMESSAGE.addUserBindingOtherModules, {
          brandNos: pickData
        }).then(function (res) {
          if (res.data.code == 0) {
            Toast('保存成功');
            // _this.$router.push({
            //   path: "/recommend"
            // })
            _this.$parent.changeSetChannelFlag()
          } else {
            MessageBox('提示', res.data.errorMsg);
          }
        });
      },
    },
    mounted(){
      this.getLabels()
    }

  }
</script>

<style scoped>
.setChannel {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  z-index: 1000;
  background-color: #fff;
}
.setChannel .title{
  color:#555555;
  width:100%;
  text-align:center;
  margin-top:20%;
  font-size:0.35rem;
  font-weight: 600;
}
.setChannel .content .all-check {
  text-align:center;
  font-size:.34rem;
  font-family:PingFang-SC-Medium;
  font-weight:500;
  margin-top:.6rem;
  margin-bottom:.4rem;
}
.setChannel .content img {
  width:.34rem;
  height:.34rem;
  display:inline-block;
}
.setChannel .content .check{
  margin:0 auto;
  display: grid;
  justify-items:center;
  align-items:center;
  grid-template-columns:50% 50%;
  grid-template-rows: 100px 100px 100px;
  font-size:.28rem;
  color:rgba(85,85,85,1);
}
.setChannel .content .check .round {
  width:2rem;
  height:1rem;
  background:rgba(255,255,255,1);
  border-radius:8px;
  display: grid;
  justify-items:center;
  align-items:center;
  position:relative;
}
.setChannel .content .check .round img {
  position:absolute;
  right:-9px;
}
.setChannel .footer {
  position:fixed;
  bottom:0;
  z-index: 1001;
  width:100%;
  height:.98rem;
  line-height: .98rem;
  text-align: center;
  background:rgba(73,187,255,1);
  color:rgba(255,255,255,1);
  font-size:32px;
}
.check-css {
  border:2px solid rgba(73,187,255,1);
  color:rgba(73,187,255,1);
}
.nocheck-css {
  border:2px solid rgba(238,238,238,1);
  color:rgba(153,153,153,1);
}
.allcheck-css {
  color:rgba(73,187,255,1);
}
.noallcheck-css {
  color:rgba(153,153,153,1);
}
</style>
