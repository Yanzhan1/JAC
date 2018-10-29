<template>
	<div class="login-vehicleState">
		<mhead currentTitle="车机登录状态"></mhead>
		<div style="position:relative;width:100%;height:100%;top:5rem;">
			<div class="vehicle-show">
				<img class="state-car" src="../../../static/images/my/car@2x.png" alt="" />
				<div style="margin-top:4rem;">
					<h5 class="car-title">您已登录账号到车机</h5>
					<div class="car-info">
						<span style="font-size: .26rem;color: #999999;margin-right: .3rem;">车辆VIN:</span><span style="font-size: .32rem;color: #49BBFF;">{{vin}}</span>
					</div>			
				</div>
			</div>
		</div>
		<!-- <div class="out">
			<h3  @click="out">机车登出</h3>
		</div> -->
	</div>
</template>

<script>
import { Toast } from "mint-ui";
import { MessageBox } from "mint-ui";
import PublicHead from "../publicmodel/PublicHead";
export default {
  name: "loginVehicleState",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      vin: this.$route.query.vin
    };
  },
  methods: {
    out() {
      let data = {
        vin: this.$route.query.vin
      };
      this.$http
        .post(Lovecar.loginOut, data, this.$store.state.tsppin)
        .then(res => {
          console.log(res);
          if (res.data.returnSuccess) {
            MessageBox.confirm("", {
              title: "提示",
              message: "您确定要退出吗？",
              showConfirmButton: true,
              showCancelButton: true,
              cancelButtonClass: "cancelButton",
              confirmButtonClass: "confirmButton",
              confirmButtonText: "退出",
              cancelButtonText: "取消",
              confirmButtonHighlight: true,
              cancelButtonHighlight: true
            })
              .then(action => {
                if (action == "confirm") {
					   Toast({
						message:'退出成功',
						position: "middle",
						duration: 2000
						});
						setTimeout(()=>{
							this.$router.push({
							  path: "/myindex"
							});
						},2000)
                }
              })
              .catch(err => {
                if (err == "cancel") {
                  console.log("123");
                }
              });
          }else{
			   Toast({
              message:'退出失败',
              position: "middle",
              duration: 2000
            });
		  }
          //  Toast({
          // 		message: res.data.returnErrMsg,
          // 		position: "middle",
          // 		duration: 2000
          // 	});
        });
    }
  }
};
</script>

<style scope>
.out {
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1rem;
  background: #49bbff;
  line-height: 1rem;
  text-align: center;
  color: #fff;
}
.vehicle-show {
  display: flex;
  position: absolute;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}
.state-car {
  position: absolute;
  width: 2.2rem;
  height: 1.73rem;
}
.car-title {
  margin-bottom: 0.39rem;
  color: #444444;
  font-size: 0.36rem;
  text-align: center;
}
.car-info {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  text-align: center;
}
</style>