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
                <div>
                    <span style="font-size:.26rem;color:#555;">昵称：</span>
                    <span style="font-size:.34rem;color:#222">暮岁</span>
                </div>
                <div>
                    <span style="font-size:.26rem;color:#555;">账号：</span>
                    <span style="font-size:.34rem;color:#222">123123213</span>
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
import PublicHead from '../publicmodel/PublicHead'
export default {
	name: 'authorizeNext',
	components: {
  	mhead:PublicHead
  },
  data() {
    return {
      gettime:'',
      overtime:'',
      count: this.$route.params.count
    };
  },
  methods: {
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
      }).then(action => {
          if (action == "confirm") {
          	var data = {
                    vin: this.$store.state.vins, 
                    // vin: 'LS5A3CJC9JF830022', 
                    childNum: this.count, 
                    operationType: "CONTROL_AUTH", 
                    operation: 0, 
                    extParams: {
                }
            }
          	this.$http.post(Lovecar.Longrange, data, this.$store.state.tsppin).then( res => {
          		
          	})
          	.catch (err => {
          		
          	})
          }
        })
        .catch(err => {
          if (err == "cancel") {
          }
        });
    }
  },
  mounted(){
    console.log(this.$route.params)
    this.gettime=this.$route.params.a;
    this.overtime=this.$route.params.b;
  }
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
.imgs img{
  width:100%
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
 
 
