<template>
  <div>
    <div class="comment-bg" v-show="flag" @click="blur"></div>
    <div class="flex contentcenter myInput" id="myInput">
      <input ref="input" type="text" id="comment" @focus="flag = true;sendFlag = true" :value="value" @input="$emit('input', $event.target.value)"
        placeholder="写评论..." />
      <span class="send" @click="comment">发送</span>
    </div>
  </div>
</template>

<script>
  import {
    MessageBox
  } from 'mint-ui';

  export default {
    props: ['value'],
    data() {
      return {
        flag: false,
        sendFlag: false
      }
    },
    methods: {
      focus() {
        this.$refs['input'].focus()
      },
      blur() {
        this.$refs['input'].blur()
        this.flag = false
        this.sendFlag = false
        this.$emit('input', '')
      },
      msgIsNull: function (str) {
        if (str == "") return true;
        var regu = "^[ ]+$";
        var re = new RegExp(regu);
        return re.test(str);
      },
      // 评论
      comment: function () {
        if (!this.sendFlag) {
          return
        }
        if (this.msgIsNull(this.value)) {
          MessageBox('提示', "评论内容不能为空");
          return false;
        }
        this.sendFlag = false
        this.$emit('comment')
      }
    }
  }

</script>

<style scoped>
  @import "./../../../../static/css/discover/detail.css";

  .comment-bg {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: #000000;
    z-index: 1;
    opacity: 0.2;
  }

</style>
