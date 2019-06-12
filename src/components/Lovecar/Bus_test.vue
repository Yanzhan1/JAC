<template>
  <div>
    <header class="header">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="goback">
      <span class="header-title">车辆体检</span>
      <span class="header-right"></span>
    </header>
    <div style="height:.88rem"></div>
    <!-- <mhead currentTitle="车辆体检"></mhead> -->
    <!-- <h2>诊断时间：06-29 17:33</h2> -->
    <!-- <mt-button type="primary" size="large" @click.native="bustest">刷新</mt-button> -->
    <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">↓</span>
          <span v-show="topStatus === 'loading'">Loading...</span>
        </div>
        <ul class="ul_content">
          <li class="flex row between cocenter" >
            <p class="li_quan">电子转向柱锁</p>
            <span class="right_pic actives"></span>
          </li>
          <li class="flex row between cocenter">
            <p class="li_quan">电子转向柱锁</p>
            <span class="right_pic"></span>
          </li>
          <li class="flex row between cocenter">
            <p class="li_quan">电子转向柱锁</p>
            <span class="right_pic"></span>
          </li>
          <li class="flex row between cocenter">
            <p class="li_quan">电子转向柱锁</p>
            <span class="right_pic"></span>
          </li>
        </ul>
    </mt-loadmore>
  </div>
</template>
<script>
import {Toast} from 'mint-ui';
import {Button} from 'mint-ui';
import {Loadmore} from 'mint-ui';
import PublicHead from '../publicmodel/PublicHead';
export default {
	name: 'busTest',
	components: {
  	mhead:PublicHead
  },
  data() {
    return {
      topStatus: '',
      time: "",
      sjc: "",
      allfalse:[],//储存所有的车辆体检错误信息
    };
  },
  created() {
    //进入页面获取一次车辆体检
    this.starttest()
  },
  methods: {
    goback(){
      if(this.$route.query.id=='diagnosis'){
        if (isMobile.iOS()) {
          var params = {};
          window.webkit.messageHandlers.exit.postMessage(params);
      } else if (isMobile.Android()) {
        js2android.exit();
      }
      }else{
        this.$router.go(-1)
      }
    },
     handleTopChange(status) {
        this.topStatus = status;
      },
      loadTop() {
          this.bustest()
          this.$refs.loadmore.onTopLoaded();
        },
    //进入页面发起的车辆查询
    starttest(){
       var param = {
        vin:'LJ12EKS22J4757945',
        operationType: "CYC_CAR_EXAMINATION",
      };
    this.$http
      .post(Lovecar.Control, param, this.$store.state.tsppin)
      .then(res => {
        if (res.data.returnSuccess) {
          this.getAsyReturn(res.data.operationId);
        } else {
            Toast({
              message: res.data.returnErrMsg,
              position: "middle",
              duration: 3000
            });
        }
      })
      .catch(err => {
        Toast({
          message:  res.data.returnErrMsg,
          position: "middle",
          duration: 3000
        });
      });
    },
    //点击刷新按钮查询车辆体检
    bustest(){
      var param = {
      vin: 'LJ12EKS22J4757945'
    };
    this.$http
      .post(Lovecar.BusTest, param, this.$store.state.tsppin)
      .then(res => {
        if (res.data.returnSuccess) {

        } else {
            Toast({
              message: res.data.returnErrMsg,
              position: "middle",
              duration: 3000
            });
        }

      })
      .catch(err => {
        Toast({
          message:  res.data.returnErrMsg,
          position: "middle",
          duration: 3000
        });
      });
    },
    //重复调用的接口
    getAsyReturn(operationId) {
      var flag = true;
      this.sjc = new Date().getTime();
      this.$http
        .post(
          Lovecar.OperationId,
          { operationId: operationId },
          this.$store.state.tsppin
        )
        .then(res => {
          var tS = new Date().getTime() - this.sjc; //时间戳 差
          var tSS = parseInt((tS / 1000) % 60); // 时间差
          if (res.data.returnSuccess == true) {
            if (res.data.status == "IN_PROGRESS") {
              //60s  后 清除定时器，不在发请求

              if (tSS >= 56) {
                Toast({
                  message: "请求超时",
                  position: "middle",
                  duration: 3000
                });
                localhide();
              } else {
                this.time = setInterval(() => {
                  this.$http
                    .post(
                      Lovecar.OperationId,
                      { operationId: operationId },
                      this.$store.state.tsppin
                    )
                    .then(res => {
                      var tS = new Date().getTime() - this.sjc; //时间戳 差
                      var tSS = parseInt((tS / 1000) % 60); // 时间差
                      if (res.data.returnSuccess == true) {
                        if (res.data.status == "IN_PROGRESS") {
                          //60s  后 清除定时器，不在发请求

                          if (tSS >= 56) {
                            Toast({
                              message: "请求超时",
                              position: "middle",
                              duration: 3000
                            });
                            clearInterval(this.time);
                            localhide();
                          }
                        } else if (res.data.status == "SUCCEED") {
                          this.allfalse=res.data.data
                          // Toast({
                          //   message: "下达指令成功",
                          //   position: "middle",
                          //   duration: 3000
                          // });
                          clearInterval(this.time);
                          localhide();
                        } else if (res.data.status == "FAILED") {
                          Toast({
                            message: "指令下发成功，处理失败！",
                            position: "middle",
                            duration: 3000
                          });
                          clearInterval(this.time);
                          localhide();
                        }
                      } else {
                        Toast({
                          message: "指令下发失败！",
                          position: "middle",
                          duration: 3000
                        });
                        clearInterval(this.time);
                        localhide();
                      }
                    });
                }, 4000);
              }
            } else if (res.data.status == "SUCCEED") {
              // Toast({
              //   message: "下达指令成功",
              //   position: "middle",
              //   duration: 3000
              // });
              this.allfalse=res.data.data
               clearInterval(this.time);
              localhide();
            } else if (res.data.status == "FAILED") {
              Toast({
                message: "指令下发成功，处理失败！",
                position: "middle",
                duration: 3000
              });
               clearInterval(this.time);
              localhide();
            }
          } else {
            Toast({
              message: "指令下发失败！",
              position: "middle",
              duration: 3000
            });
            flag = false;
            clearInterval(this.time);
            localhide();
          }
        });
    }
  },
  beforeDestroy() {
      clearInterval(this.time);
  },
};
</script>
<style scoped>
h2 {
  text-align: center;
  font-size: 0.26rem;
  color: #555;
  margin-top: 0.4rem;
}
.li_quan {
  position: relative;
  font-size: 0.28rem;
  color: #222;
}
.row {
  flex-direction: row;
}
.ul_content {
  margin: 0.5rem 0.3rem 0 0.8rem;
}
.ul_content li {
  height: 0.87rem;
  border-bottom: 1px solid #f1f1f1;
}
.li_quan:before {
  position: absolute;
  background-color: #2099ff;
  display: block;
  height: 0.12rem;
  width: 0.12rem;
  border-radius: 50%;
  top: 0.1rem;
  left: -0.3rem;
  content: "";
}
.right_pic {
  background-image: url("../../../static/images/Lovecar/complete@3x.png");
  width: 0.4rem;
  height: 0.4rem;
  display: block;
  background-size: 100%;
}
.right_pic.actives {
  background-image: url("../../../static/images/Lovecar/yichang.png");
  width: 0.4rem;
  height: 0.34rem;
  display: block;
}
</style>

