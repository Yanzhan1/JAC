<template>
    <div>
        <!--<header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">远程授权</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>-->
        <mhead currentTitle="远程授权"></mhead>
        <div class="count flex">
            <div class="imgs">
                <img src="../../../static/images/Lovecar/car_bg@2x.png" alt="">
            </div>
            <div>
                <!-- <div>
                    <span style="font-size:.26rem;color:#555;">昵称：</span>
                    <span style="font-size:.34rem;color:#222">暮岁</span>
                </div> -->
                <div>
                    <span style="font-size:.26rem;color:#555;">账号：</span>
                    <span style="font-size:.34rem;color:#222">{{this.toAuthperson}}</span>
                </div>
            </div>
        </div>
        <div style="height:2px;background-color:#f1f1f1"></div>
        <ul class="authort flex column">
            <li class="authort_t cocenter flex" style="border-bottom:1px solid #f1f1f1">
                <span style="font-size:.26rem;color:#555">授权时间：</span>
                <span class="times mid">{{this.gettime}}</span>
                
            </li>
            <li class="authort_t cocenter flex">
                <span style="font-size:.26rem;color:#555">结束授权时间：</span>
                <span class="times mid">{{this.overtime}}</span>
                
            </li>
        </ul>
        <button class="bottom-btn" @click="confirmRevise">解除授权</button>
    </div>
</template>
 <script>
import { MessageBox } from "mint-ui";
import { Toast } from "mint-ui";
import PublicHead from "../publicmodel/PublicHead";
export default {
  name: "authorizeNext",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      gettime: "",
      overtime: "",
      count: "", //被授权人的手机号
      // authTime:'',//起始时间
      // endauthTime:'',//结束时间
      userName: "", //账号
      toAuthperson: "", //展示的昵称
     
    };
  },
  created(){
    // this.tochangeTime(1577793600000)
    // console.log(this.tochangeTime(1577793600000))
  },
   mounted() {
    // alert(JSON.stringify(this.$store.state.tsppin))
    if (!this.$route.params.count) {
      this.count = this.$route.params.count;
    this.gettime = this.$route.params.a;
    this.overtime = this.$route.params.b;
    }
    if (this.gettime == undefined) {
      this.vehiclestatus();
    }
    this.userName = this.$store.state.userName;
     
  },
  methods: {
     tochangeTime(inputTime) {
            var date = new Date(inputTime);
            var y = date.getFullYear();
            var m = date.getMonth() + 1;
            m = m < 10 ? ('0' + m) : m;
            var d = date.getDate();
            d = d < 10 ? ('0' + d) : d;
            var h = date.getHours();
            h = h < 10 ? ('0' + h) : h;
            var minute = date.getMinutes();
            var second = date.getSeconds();
            minute = minute < 10 ? ('0' + minute) : minute;
            second = second < 10 ? ('0' + second) : second;
            return y + '-' + m + '-' + d + ' ' + '　' + h + ':' + minute + ':' + second;
      },
    //车辆授权状态
    vehiclestatus() {
      this.$http
        .post(Lovecar.vehiclestatus, {}, this.$store.state.tsppin)
        .then(res => {
          if (res.data.returnSuccess) {
            for (let i = 0; i < res.data.data.length; i++) {
              if (res.data.data[i].isLocking == true) {
                var authTime =parseInt(res.data.data[i].authTime) ;
                var endauthTime = parseInt(res.data.data[i].endAuthTime);
                this.gettime = this.tochangeTime(authTime);
                this.overtime =this.tochangeTime(endauthTime);
                this.toAuthperson = res.data.data[i].toAuthPerson;
                this.count = res.data.data[i].phone;
              }
            }
            // this.Rajtigo=res.data.data[0].isLocking  //isLocking:true 代表已授权
            // this.vehicleState=res.data.data[0].vin
          }
        });
    },
     
    confirmRevise() {
      MessageBox.confirm("", {
        title: "提示",
        message: "您确定要解除对该用户的授权码？",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonClass: "cancelButton",
        confirmButtonClass: "confirmButton",
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        confirmButtonHighlight: true,
        cancelButtonHighlight: true
      })
        .then(action => {
          if (action == "confirm") {
            if (this.count) {
              var data = {
                vin: this.$store.state.vins,
                // vin: 'LS5A3CJC9JF830022',
                childNum: this.count,
                userId: this.$store.state.userId,
                phone: this.$store.state.mobile,
                operationType: "CONTROL_AUTH",
                operation: 0,
                extParams: {}
              };
              this.$http
                .post(Lovecar.Longrange, data, this.$store.state.tsppin)
                .then(res => {
                  if (res.data.returnSuccess) {
                    Toast({
                      message: "解除授权成功",
                      position: "middle",
                      duration: 2000
                    });
                     if (isMobile.iOS()) {
                          window.webkit.messageHandlers.gotoMyIndex.postMessage();
                        } else if (isMobile.Android()) {
                          js2android.gotoMyIndex();
                        }
                    setTimeout(() => {
                      this.$router.push("/myindex");
                    }, 2000);
                  } else {
                    Toast({
                      message: res.data.returnErrMsg,
                      position: "middle",
                      duration: 2000
                    });
                  }
                })
                .catch(err => {});
            } else {
              Toast({
                message: "未查到授权人手机号",
                position: "middle",
                duration: 2000
              });
            }
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    }
  },
 
};
</script>
 <style scoped>
.count {
  height: 1.9rem;
  flex-direction: row;
  align-items: center;
}
.imgs {
  width: 1.2rem;
  height: 1.2rem;
  border-radius: 50%;
  margin-left: 0.3rem;
  margin-right: 0.34rem;
}
.imgs img {
  width: 100%;
}
.authort_t {
  height: 1rem;
  justify-content: flex-start;
}
.authort {
  margin-left: 0.3rem;
}
.times {
  font-size: 0.28rem;
  color: #222;
}
.mid {
  padding: 0 0.4rem;
}
</style>
 
 
