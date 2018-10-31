<template>
	<div class="plate-bind">
		<!--<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">车牌绑定</span>
			<span class="header-right"></span>
		</header>
		<div style="height:0.88rem"></div>-->
		<mhead currentTitle="车牌绑定"></mhead>
		<div class="rame-number">
			<span style="color: #555555;">车牌号码</span>
			<input type="text" placeholder="请输入车牌号" v-model="plate" />
		</div>
		<button class="confirm" @click="add()">确认</button>
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import PublicHead from '../publicmodel/PublicHead';
export default {
  name: "plateBind",
  components: {
  	mhead:PublicHead
  },
  data() {
    return {
      //车牌号
      plate: "",
      //vin
      vin: this.$route.query.vin
    };
  },
  methods: {
    // 添加车辆
   add() {
	   var param = {
        vin: this.vin,
        extParams: { plateLicenseNo: this.plate },
        operationType: "PLATE_NO",
        operation: 1 //绑定
      };
      this.$http.post(My.planbus, param, this.$store.state.tsppin).then(res => {
        if (res.data.returnSuccess) {
          Toast({
            message: "添加成功",
            duration: 1000,
            position: "middle"
          });
          this.$router.go(-1);
        }else{
          Toast({
            message:res.data.returnErrMsg,
            duration:1000,
            position:'middle'
          })
        }
      });
	}
},
  created() {}
};
</script>

<style scoped>
.rame-number {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 92%;
  height: 1rem;
  margin: 0 auto;
  border-bottom: 1px solid #f1f1f1;
}

input {
  width: 2.6rem;
  border: none;
  outline: none;
}

.confirm {
  display: block;
  width: 92%;
  height: 0.88rem;
  margin: 0.8rem auto 0 auto;
  line-height: 0.88rem;
  color: #ffffff;
  font-size: 0.32rem;
  background: #49bbff;
  border: none;
  outline: none;
  border-radius: 0.08rem;
}
</style>