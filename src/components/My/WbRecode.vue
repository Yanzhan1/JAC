<template>
	<div class="wb-recode">
		<!--<header class="header">
            <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
            <span class="header-title">维保记录</span>
            <span class="header-right"></span>
        </header>
        <div style="height:.88rem"></div>-->
		<header class="header MobileHeight bgcolor">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">维保记录</span>
      <span class="header-right"></span>
    </header>
		<div ref="wrapper" class="wrapper">
			<ul>
				<li v-for="(item, index) in this.datalist" :key="item.id">
					<div class="times">
						<img src="../../../static/images/Wit/zhandian.png" style="width: .36rem;height: .34rem;" />
						<span class="tim">{{item.dealerName}}</span>
					</div>
					<div class="record-wrap" style="padding:.52rem .5rem 0 .8rem">
						<p class="record-name">维保类型：<span class="record-con">{{item.repairType}}</span> </p>
						<p class="record-name">送修人：<span class="record-con">{{item.deliverer}}</span></p>
						<p class="record-name">车牌号：<span class="record-con">{{item.license}}</span></p>
						<p class="record-name">VIN：<span class="record-con">{{item.vin}}</span></p>
						<div style="height: 1px;width: 100%;margin: 0 auto;background: #F1F1F1;"></div>
					</div>
					<div class="record-footer">
						<div style="display: flex;justify-content: center;align-items: center;">
							<img src="../../../static/images/Wit/shijian.png" style="width: .3rem;height: .3rem;margin-bottom: 0;" />
							<p style="color: #999999;margin-left: .2rem;">{{item.forBalanceTime}}</p>
						</div>

						<!-- <router-link tag="p" :to="{path:'/myindex/dotcomment'}" class="dot-score">网点评分</router-link> -->
					</div>
				</li>
			</ul>
		</div>

	</div>
</template>
<script>
import { Popup } from "mint-ui";
import {Toast} from 'mint-ui'
import PublicHead from "../publicmodel/PublicHead";
import BScroll from "better-scroll";
export default {
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      datalist: []
    };
  },
  methods: {
    //跳到网点评分页面
    tocomment() {
      this.$router.push("/myindex/dotcomment");
    },
    init() {
      let param = {
        // vin: "LJ16AA33777028846",
        vin:this.$store.state.vins,
        brandNo:this.$store.state.brandNo
      };
      this.$http
        .post(My.searchMaintenanceRecordList, param)
        .then(res => {
          if (res.data.code == 0) {
            this.datalist=res.data.data
          }else{
            Toast({
                  message: '无维保记录',
                  position: "middle",
                  duration: 1000
                });
          }
        });
    }
  },
  created() {
    this.init();
  },
  mounted() {
    $(".MobileHeight").css({
      borderTopWidth: this.$store.state.mobileStatusBar,
      borderTopColor: "#fff"
    });
    // this.$nextTick(() => {
    //   this.scroll = new BScroll(this.$refs.wrapper, {
    //     click: true
    //   });
    // });
  }
};
</script>
<style scoped>
.wb-recode {
  height: 100vh;
}
.MobileHeight {
		border-top-style: solid;
		box-sizing: content-box;
	}
.wrapper {
  position: absolute;
  top: 1.3rem;
  width: 100%;
  height: 100%;
}

.times {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0 0.3rem;
  border-top: 0.1rem solid #f1f1f1;
  border-bottom: 0.01rem solid #f1f1f1;
}

.tim {
  line-height: 0.85rem;
  font-size: 0.32rem;
  color: #222;
  padding-left: 0.17rem;
  display: block;
}

.timrs {
  width: 1.5rem;
  height: 0.27rem;
  font-size: 0.28;
  font-family: "PingFang-SC-Regular";
  font-weight: 400;
  color: rgba(153, 153, 153, 1);
}
/*维保记录主体信息*/

.record-wrap {
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 0 !important;
}

.record-wrap > p {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 0.28rem;
}

.record-name {
  color: #444444;
}

.record-con {
  color: #222222;
  font-size: 0.3rem;
  font-weight: 600;
}

.record-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 1rem;
  padding: 0 0.3rem;
}

.dot-score {
  width: 1.6rem;
  height: 0.66rem;
  line-height: 0.62rem;
  text-align: center;
  color: #49bbff;
  border: 1px solid #49bbff;
  border-radius: 0.33rem;
}

.titlecar {
  width: 12rem;
  height: 0.32rem;
  font-size: 0.34rem;
  font-family: "PingFang-SC-Medium";
  font-weight: 500;
  color: rgba(34, 34, 34, 1);
}
.bgcolor{
  background:#fff;
  padding: 0;
}
.leftname {
  font-size: 0.24rem;
  color: #555;
  margin-top: 0.5rem;
}
</style>
