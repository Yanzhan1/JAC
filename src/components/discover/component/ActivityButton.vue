<template>
  <div class="sign_btn" @click="fn">
    <span v-html="text"></span>
  </div>
</template>

<script>
  Function.prototype.after = function (afterFn) {
    var self = this

    return function () {
      var ret = self.apply(this, arguments)

      if (ret === 'nextSuccessor') {
        return afterFn.apply(this, arguments)
      }
      return ret
    }
  }

  export default {
    props: ['activityId', 'userId', 'activityType', 'activityState', 'joinStatus'],
    data() {
      return {
        strategies: {
          'noUserId': {
            text: '报&nbsp;名',
            fn: this.cantWantGo
          },
          'sign': {
            text: '报&nbsp;名',
            fn: this.toSign
          },
          'noSign': {
            text: '取消报名',
            fn: this.removeWant
          },
          'end': {
            text: '活动已结束',
            fn: null
          },
          'pic': {
            text: '晒&nbsp;图',
            fn: this.pic
          }
        },
        finalState: 'noUserId'
      }
    },
    computed: {
      text() {
        return this.strategies[this.finalState].text
      }
    },

    created() {
      this.finalState = this.noUserId.after(this.sign).after(this.noSign).after(this.end).after(this.pic).call(this)
    },
    methods: {
      fn() {
        this.strategies[this.finalState].fn && this.strategies[this.finalState].fn.call(this)
      },
      /**
       * 没登录
       */
      noUserId() {
        if (!this.userId) {
          console.log('没登录')
          return 'noUserId'
        }
        return 'nextSuccessor'
      },
      /**
       * 报名
       */
      sign() {
        if (this.activityType == 3) {
          if ((this.activityState == 0 || this.activityState == 1) && this.joinStatus) {
            console.log('报名')
            return 'sign'
          }
        } else {
          if (this.activityState == 0 && this.joinStatus) {
            console.log('报名')
            return 'sign'
          }
        }
        return 'nextSuccessor'
      },
      /**
       * 取消报名
       */
      noSign() {
        if (this.activityType != 3 && this.activityState == 0 && !this.joinStatus) {
          console.log('取消报名')
          return 'noSign'
        }
        return 'nextSuccessor'
      },
      /**
       * 活动已结束
       */
      end() {
        if (this.activityState == 2 && this.joinStatus) {
          console.log('活动已结束')
          return 'end'
        }
        return 'nextSuccessor'
      },
      /**
       * 晒图
       */
      pic() {
        if (this.activityType == 3) {
          if (!this.joinStatus) {
            console.log('晒图')
            return 'pic'
          }
        } else {
          if (this.activityState != 0 && !this.joinStatus) {
            console.log('晒图')
            return 'pic'
          }
        }
        return '匹配有误'
      },
      /**
       * 登录
       */
      cantWantGo() {
        this.$emit('cantWantGo')
      },
      /**
       * 报名
       */
      toSign() {
        this.$emit('toSign', this.activityId)
      },
      /**
       * 晒图
       */
      toPic() {
        this.$emit('toPic', this.activityId)
      },
      /**
       * 取消报名
       */
      removeWant() {
        this.$emit('removeWant')
      }
    }
  }

</script>


<style scoped>
  .sign_btn {
    position: fixed;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 0.88rem;
    background: #49BBFF;
    font-size: 0.32rem;
    color: #F5F5F5;
    text-align: center;
    line-height: 0.88rem;
    letter-spacing: 1px;
  }

</style>
