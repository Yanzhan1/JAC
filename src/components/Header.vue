<template>
  <div>
    <div>
      <div class="myheader" style="height: auto;" :style="$statusBarHeightObj">
        <div>
          <img src="../../static/images/discover/shaixuan.png" @click="open" style="width: 0.4rem;margin-bottom: 0;" />
        </div>
        <div style="" class="head-tab" :class="{ recommand: isRecommand }" @click.stop.prevent="goIsRecommand">
          <span>推荐</span>
        </div>
        <div style="" class="head-tab" :class="{ now: isNow }" @click.stop.prevent="goIsNow">
          <span>社区</span>
        </div>
        <div style="" class="head-tab" :class="{ information: isInformation }" @click.stop.prevent="goInformation">
          <span class="size_36">资讯</span>
        </div>
        <div style="" class="head-tab" :class="{ allActivity: isAllActivity }" @click.stop.prevent="goAllActivity">
          <span>活动</span>
        </div>
        <div style="position: relative;">
          <div style="position: absolute;top: 0;left: 0;z-index: 1;width: 100%;height: 100%;" @click="publish"></div>
          <img src="../../static/images/discover/camera.png" style="width: 0.4rem;margin-bottom: 0;" id='id_publish' />
        </div>
        <mt-popup style="width:80%;border-radius:4px;" v-model="popup" position="center">
          <div style="width:100%;text-align:center;box-sizing:border-box;font-size:.36rem;color:#555555;">
            切换频道
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
        </mt-popup>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        userId: this.$store.state.userId,
        isRecommand: true,
        isInformation: true,
        isAllActivity: true,
        isNow: true,
        isQuestion: true,
        labels: [],
        picked:[],
        //picked:this.$store.state.selectLabelState ? this.$store.state.selectLabelState : [],
        popup: false,
        labelState: 11, //标签默认值为11
        obj: { //tab状态的映射表
          '/recommend': this.goIsRecommand,
          '/now': this.goIsNow,
          '/information': this.goInformation,
          '/activity': this.goAllActivity
        }
      }
    },
    components: {
      /*Mine*/
    },
    computed: {},
    created() {
      this.addPoint = this.bbox(this.addPoint)
    },
    methods: {
      // 闭了个包
      bbox: function (fn) {
        var timer = null
        var self = this

        return function () {
          var args = arguments

          clearTimeout(timer)
          timer = null
          timer = setTimeout(function () {
            fn.apply(self, args)
          }, 180)
        }
      },
      popupVisibleChange: function () {
        this.$refs.mine.popupVisibleChange()
      },
      changeSlide(index) {
        this.$root.eventHub.$emit('changeSlide', index)
      },
      goIsRecommand: function () {
        this.$router.push('/recommend')
        this.isRecommand = true
        this.isInformation = false
        this.isAllActivity = false
        this.isNow = false
        this.isQuestion = false
        this.changeSlide(0)
        this.addPoint('recommend');
      },
      goInformation: function () {
        this.$router.push('/information')
        this.isInformation = true
        this.isRecommand = false
        this.isAllActivity = false
        this.isNow = false
        this.isQuestion = false
        this.changeSlide(2)
        this.addPoint('inform');
      },
      goAllActivity: function () {
        this.$router.push("/activity")
        this.isAllActivity = true
        this.isRecommand = false
        this.isInformation = false
        this.isNow = false
        this.isQuestion = false
        this.changeSlide(3)
        this.addPoint('activity');
      },
      goIsNow: function () {
        this.$router.push("/now")
        this.isNow = true
        this.isRecommand = false
        this.isInformation = false
        this.isAllActivity = false
        this.isQuestion = false
        this.changeSlide(1)
        this.addPoint('community');
      },
      goQuestion: function () {
        this.isNow = false
        this.isRecommand = false
        this.isInformation = false
        this.isAllActivity = false
        this.isQuestion = true
      },
      //埋点
      addPoint: function (flag) {
        var _this = this;
        this.$http.post(POINT.addpoint, {
          "uid": _this.$store.state.userId,
          "id": '',
          "sign": _this.$store.state.uuid,
          "moduleName": flag
        }).then(function (res) {

        }).catch(() => {

        })
      },
      //发布心情
      publish: function () {
        // this.$router.push({path:"/now/addPic"})
        var _this = this;
        if(!_this.$store.state.userId){
          _this.toLogin();
          return false;
        }
        if (isMobile.iOS()) {
          let uuid = this.$store.state.uuid;
          let params = {
            uuid
          }
          window.webkit.messageHandlers.send.postMessage(params);
        } else if (isMobile.Android()) {
          js2android.send("社区", this.$store.state.uuid, null);
        }
      },
      open: function () {
        this.popup = true
      },
      confirm: function () {
        this.popup = false
        let pickData = []
        if (this.picked.length === 0) {
          pickData = this.labels.map((item) => {
            return item.labelCode
          })
        }else{
          pickData = this.picked.map((item) => {
            return item
          })
        }
        this.picked = pickData
        this.$store.dispatch('selectLabelState', pickData);
        if(!this.$store.state.islogin){
          return false;
        }
        this.$http.post(DISCOVERMESSAGE.addUserBindingOtherModules, {
            brandNos: pickData
          }).then(function (res) {
            if (res.data.status) {
              Toast('保存成功');
            } else {
              MessageBox('提示', res.data.errorMsg);
            }
          });
      },
      cancle: function () {
        this.popup = false
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
          }
        });
      },
      // 查询用户兴趣车型
      searchUserBindingOtherModulesOne: function () {
        let _this = this
        this.$http.post(DISCOVERMESSAGE.searchUserBindingOtherModulesOne, {}).then(function ({data}) {
          if(!data.data){
            _this.$router.push({
              path: "/setChannel"
            })
          }
          else if (data.code == 0 && data.data.brandsNo) {
            _this.$store.dispatch('selectLabelState', data.data.brandsNo.split(','));
          }
        });
      },
      // 设置tab状态
      setTabStatu() {
        const {
          path
        } = this.$route

        this.obj[path] && this.obj[path].apply(this, arguments)
      },
      // 设置tab状态
      onChangeTab() {
        this.$root.eventHub.$on('changeTab', (index) => {
          const list = ['goIsRecommand', 'goIsNow', 'goInformation', 'goAllActivity']

          this[list[index]]()
        })
      }
    },
    computed: {
      loginState() {
        return this.$store.state.islogin
      },
      selectLabelState() {
        return this.$store.state.selectLabelState
      }
    },
    watch: {
      loginState() {
        if (this.$store.state.islogin) {
          this.searchUserBindingOtherModulesOne()
        }
      },
      selectLabelState() {
        this.picked = this.$store.state.selectLabelState
      },
      $route(newVal, oldVla) {
        this.setTabStatu()
      }
    },
    mounted: function () {
      this.setTabStatu()
      this.$nextTick(function () {
        this.getLabels()
      })
      window.toNow = () => {
        this.goIsNow()
        this.$emit('refresh')
      }
      this.onChangeTab()
      if (this.$store.state.islogin) {
        this.searchUserBindingOtherModulesOne()
      }
    }
  }

</script>

<style scoped>
  @import "./../../static/css/discover/all.css";

  .top-pic img {
    width: 0.48rem;
    height: 0.48rem;
    position: relative;
    top: 16%;
  }

  /*.myheader {
    width: 90%;
    height: .88rem;
    line-height: .8rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed;
    top: 0;
    z-index: 199;
    padding:none !important;
  }*/
  .recommand,
  .information,
  .allActivity,
  .now,
  .question {
    border-bottom: 0.04rem solid #49BBFF;
    color: #49BBFF;
    height: 0.8rem;
    line-height: 0.78rem;
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

</style>
