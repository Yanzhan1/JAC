<template>
  <div>
    <div style="width:100%;text-align:center;box-sizing:border-box;font-size:.36rem;color:#555555;">
      选择频道
    </div>
    <p style="height:.02rem;background:#F1F1F1;width:100%;"></p>
    <div>
      <div v-for="(item,index) in labels" style="margin-left:10%;width:40%;display:inline-block">
        <input type="checkbox" :id="'picked_'+item.labelId" :value="item.labelCode" v-model="picked">
        <label :for="'picked_'+item.labelId">{{item.labelName}}</label>
      </div>
    </div>
    <div style="width:100%;display:flex;text-align:center;">
      <p style="felx:1;width:100%;font-size:.32rem;color:#888888;" @click="cancle">取消</p>
      <p style="felx:1;width:100%;font-size:.32rem;color:#49BBFF;" @click="confirm">确定</p>
    </div>
  </div>
</template>

<script>
  import { MessageBox } from 'mint-ui';
  import { Toast } from 'mint-ui';
  export default {
    name: "setChannel",
    data(){
      return{
        labels: [],
        picked:this.$store.state.selectLabelState ? this.$store.state.selectLabelState : [],
        labelState: 11, //标签默认值为11
      }
    },
    methods:{
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
          }
        });
      },
      confirm: function () {
        if (this.picked) {
          this.$store.dispatch('selectLabelState', this.picked);
          this.$http.post(DISCOVERMESSAGE.addUserBindingOtherModules, {
            brandNos: this.picked
          }).then(function (res) {
            if (res.data.status) {
              Toast('保存成功');
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          });
        } else {
          this.$store.dispatch('selectLabelState', null);
        }
      },
      cancle: function () {
      },
    },
    mounted(){
      this.getLabels()
    }
  }
</script>

<style scoped>

</style>
