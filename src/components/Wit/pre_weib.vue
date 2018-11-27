<template>
	<div>
		<!--<header class="header">
			<img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
			<span class="header-title">维保预约</span>
			<span class="header-right"></span>
		</header>
		<div style="height:.88rem"></div>-->
		<mhead currentTitle="维保预约"></mhead>
		<hr style="backgroun:rgba(241,241,241,1)">
		<div class="carmessage">车主信息</div>
		<ul style="padding:0 .33rem">
			<li class="flex row li_st between cocenter">
				<p style="font-size:.27rem;color:#555">姓名</p>
				<div class="flex row cocenter">
					<input type="text" placeholder="请输入姓名"  style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
			<li class="flex row li_st between cocenter">
				<p style="font-size:.27rem;color:#555">手机号</p>
				<div class="flex row cocenter">
					<input type="text" placeholder="请输入手机号"  style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
			<li class="flex row li_st between cocenter">
				<p style="font-size:.27rem;color:#555">品牌</p>
				<div class="flex row cocenter">
					<input type="text" placeholder="请输入品牌" style="border:none;outline:none;text-align:right;font-size:.26rem;color:#222">
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
			<li class="flex row li_st between cocenter">
				<p style="font-size:.27rem;color:#555">车型</p>
				<div class="flex row cocenter">
					<span>瑞风S4</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
			<li class="flex row li_st between cocenter" @click="chooseprovinces">
				<p style="font-size:.27rem;color:#555">省份</p>
				<div class="flex row cocenter">
					<span>{{this.valuesprovince1}}</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
			<li class="flex row li_st between cocenter" @click="choosecitys">
				<p style="font-size:.27rem;color:#555">城市</p>
				<div class="flex row cocenter">
					<span>{{this.valuescity1}}</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
		</ul>
    <mt-popup id="provinceLabel" class="region"  position="bottom">
                  <h3>选择省</h3>
                  <span @click="chooseprovinceone">确定</span>
                  <mt-picker :slots="slots1" @change="provinceChange" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
    </mt-popup>
    <mt-popup id="cityLabel" class="region"  position="bottom">
                  <h3>选择市</h3>
                  <span @click="choosecityone">确定</span>
                  <mt-picker :slots="slots2" @change="cityChange" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
    </mt-popup>
		<div class="carmessage">预约信息</div>
		<ul style="padding:0 .33rem">
			<li class="flex row li_st between cocenter" @click="servicestatus">
				<p style="font-size:.27rem;color:#555">服务站</p>
				<div class="flex row cocenter">
					<span style="font-size:.26rem;color:#222"></span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
			<li class="flex row li_st between cocenter">
				<p style="font-size:.27rem;color:#555">预约时间</p>
				<div class="flex row cocenter">
					<span ref="Gettimes" style="font-size:.26rem;color:#222"></span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
			<li class="flex row li_st between cocenter" >
				<p style="font-size:.27rem;color:#555">维保类型</p>
				<div class="flex row cocenter">
					<span style="font-size:.26rem;color:#222"></span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
		</ul>
		<!-- 服务站弹出框 -->
		<div class="service " v-if="servicezhan">
			<h2 style="padding:.2rem; text-align: center;font:.4rem/.6rem 'PingFang-SC-Regular'">服务站</h2>
			<span class="surebuttom" @click="subsub">确定</span>
			<ul style="padding:.1rem .2rem" >
					<li class="ul_list flex row around " >
            <label class="chooseimages" :class="this.flag?'active':''" @click="chooseimage"></label>
							<!-- <img @click="imageselect" v-if="chooseserveimg" style="width:.44rem;height:.44rem;margin-top:.8rem;margin-left:1rem;margin-right:.2rem;" src="../../../static/images/Wit/icon-select.png" alt="">
							<img @click="imageoff" v-else style="width:.44rem;height:.44rem;margin-top:.8rem;margin-left:1rem;margin-right:.2rem;" src="../../../static/images/Wit/icon-offselect.png" alt=""> -->
						<!--<div class="ul_list flex cocenter"> <img class="pic" v-lazy="imgSrc" alt=""></div>-->
						<div class="flex column around  mid">
							<span class="txt_top dian">上海呼伦汽车</span>
							<span class="flex row cocenter">
		                        <img style="width:.25rem;margin-right:.1rem;" src="../../../static/images/Wit/list_position_icon.png" alt="">
		                        <span class="txt_m dian" style="margin-top:.1rem">上海市闵行区啦啦啦</span>
							</span>
						</div>
						<div class="cocenter flex-center">
							<div class="flex-column-align">
								<span class="txt_m" style="display:inline-block;margin-top:.2rem;height:0.3rem;line-height:0.3rem;">距离</span><span class="txt_m" style="display:inline-block;margin-top:.2rem;height:0.3rem;line-height:0.3rem;">0.2</span>
							</div>
						</div>
					</li>
					<li class="ul_list flex row around " >
            <label class="chooseimages" :class="this.flag?'active':''" @click="chooseimage"></label>
							<!-- <img @click="imageselect" v-if="chooseserveimg" style="width:.44rem;height:.44rem;margin-top:.8rem;margin-left:1rem;margin-right:.2rem;" src="../../../static/images/Wit/icon-select.png" alt="">
							<img @click="imageoff" v-else style="width:.44rem;height:.44rem;margin-top:.8rem;margin-left:1rem;margin-right:.2rem;" src="../../../static/images/Wit/icon-offselect.png" alt=""> -->
						<!--<div class="ul_list flex cocenter"> <img class="pic" v-lazy="imgSrc" alt=""></div>-->
						<div class="flex column around  mid">
							<span class="txt_top dian">上海呼伦汽车</span>
							<span class="flex row cocenter">
		                        <img style="width:.25rem;margin-right:.1rem;" src="../../../static/images/Wit/list_position_icon.png" alt="">
		                        <span class="txt_m dian" style="margin-top:.1rem">上海市闵行区啦啦啦</span>
							</span>
						</div>
						<div class="cocenter flex-center">
							<div class="flex-column-align">
								<span class="txt_m" style="display:inline-block;margin-top:.2rem;height:0.3rem;line-height:0.3rem;">距离</span><span class="txt_m" style="display:inline-block;margin-top:.2rem;height:0.3rem;line-height:0.3rem;">0.2</span>
							</div>
						</div>
					</li>
					<li class="ul_list flex row around " >
            <label class="chooseimages" :class="this.flag?'active':''" @click="chooseimage"></label>
							<!-- <img @click="imageselect" v-if="chooseserveimg" style="width:.44rem;height:.44rem;margin-top:.8rem;margin-left:1rem;margin-right:.2rem;" src="../../../static/images/Wit/icon-select.png" alt="">
							<img @click="imageoff" v-else style="width:.44rem;height:.44rem;margin-top:.8rem;margin-left:1rem;margin-right:.2rem;" src="../../../static/images/Wit/icon-offselect.png" alt=""> -->
						<!--<div class="ul_list flex cocenter"> <img class="pic" v-lazy="imgSrc" alt=""></div>-->
						<div class="flex column around  mid">
							<span class="txt_top dian">上海呼伦汽车</span>
							<span class="flex row cocenter">
		                        <img style="width:.25rem;margin-right:.1rem;" src="../../../static/images/Wit/list_position_icon.png" alt="">
		                        <span class="txt_m dian" style="margin-top:.1rem">上海市闵行区啦啦啦</span>
							</span>
						</div>
						<div class="cocenter flex-center">
							<div class="flex-column-align">
								<span class="txt_m" style="display:inline-block;margin-top:.2rem;height:0.3rem;line-height:0.3rem;">距离</span><span class="txt_m" style="display:inline-block;margin-top:.2rem;height:0.3rem;line-height:0.3rem;">0.2</span>
							</div>
						</div>
					</li>
				</ul>
		</div>
		<span class="bottom-btn" style="background-color:#49BBFF;" >立即预约</span>

		<div v-show="allback" class="black" @click='backgroundshow'></div>
		<!-- 遮罩层  -->
	</div>
</template>
<script>
import { Picker } from "mint-ui";
import { Toast } from "mint-ui";
import { Popup } from "mint-ui";
import PublicHead from "../publicmodel/PublicHead";
export default {
  name: "preWeib",
  components: {
    mhead: PublicHead
  },
  data() {
    return {
      servicezhan: false, //控制服务站
      allback: false, //遮罩层
      chooseserveimg: false, //控制选择服务站图片默认不选择
      chooseprovinceq: false, //控制省份弹框
      valuesprovince: "", //被选中的省份
      valuesprovince1: "", //被选中的省份
      valuescity: "", //被选中的城市
      valuescity1: "", //被选中的城市
      choosecity: false, //控制城市弹框
      flag:false,
      array31: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30",
        "31"
      ],
      array30: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29",
        "30"
      ],
      array29: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28",
        "29"
      ],
      array28: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
        "13",
        "14",
        "15",
        "16",
        "17",
        "18",
        "19",
        "20",
        "21",
        "22",
        "23",
        "24",
        "25",
        "26",
        "27",
        "28"
      ],
      slots1: [
        {
          flex: 1,
          values: ["上海", "浙江省", "安徽省", "河南省"],
          className: "slot1",
          textAlign: "center"
        }
      ],
      slots2: [
        {
          flex: 1,
          values: ["杭州", "金华", "丽水", "南京"],
          className: "slot1",
          textAlign: "center"
        }
      ]
    };
  },
  mounted() {},
  methods: {
    servicestatus() {
      this.servicezhan = true;
      this.allback = true;
    },
    //选择确定服务站
    subsub() {
      this.allback = false;
      this.servicezhan = false;
    },
    //点击遮罩层消失
    backgroundshow() {
      this.allback = false;
      this.servicezhan = false;
      $("#provinceLabel").hide();
      $("#cityLabel").hide();
    },
    //选择省份
    chooseprovinces() {
      $("#provinceLabel").show();
      this.allback = true;
    },
    //确认省份
    chooseprovinceone() {
      $("#provinceLabel").hide();
      this.allback = false;
      this.valuesprovince1 = this.valuesprovince;
    },
    //确认城市
    choosecityone() {
      $("#cityLabel").hide();
      this.allback = false;
      this.valuescity1 = this.valuescity;
    },
    //选择城市
    choosecitys() {
      this.allback = true;
      $("#cityLabel").show();
    },
    //省份的滑动选择
    provinceChange(picker, values) {
      this.valuesprovince = values[0];
      picker.setSlotValue(1, values[0]);
    },
    //城市的滑动选择
    cityChange(picker, values) {
      this.valuescity = values[0];
      picker.setSlotValue(1, values[0]);
    },
    chooseimage(){
      this.flag=!this.flag
    },
    imageselect() {
      this.chooseserveimg = false;
    },
    imageoff() {
      this.chooseserveimg = true;
    }
  },
  created() {},
  watch: {
    onDateChangevalue() {}
  }
};
</script>
<style scoped>
/* 插件样式 */
.carmessage {
  width: 1.5rem;
  height: 0.31rem;
  color: #49bbff;
  margin-top: 0.5rem;
  margin-left: 0.29rem;
  font: 0.32rem/0.38rem "PingFang-SC-Medium";
}
.one {
  position: fixed;
  height: 1.7rem;
  width: 100%;
  background-color: #fff;
  top: 0.7rem;
  z-index: 1002;
  opacity: 0.7;
}

.li_st {
  height: 0.99rem;
  border-bottom: 0.01rem solid #f1f1f1;
}
.surebuttom {
  width: 1rem;
  height: 0.28rem;
  font-size: 0.3rem;
  font-family: PingFang-SC-Regular;
  font-weight: 400;
  color: rgba(73, 187, 255, 1);
  float: right;
}
.chooseimages {
  display: block;
  width: 0.44rem;
  height: 0.44rem;
  background-image: url("../../../static/images/Lovecar/loseWindow.png");
  border-radius: 50%;
  background-size: 100%;
  background-repeat: no-repeat;
  margin-top: 0.45rem;
  padding: 0.2rem;
  margin-right: 0.2rem;
  margin-left: 0.3rem;
}
.active {
  background-image: url("../../../static/images/Lovecar/window2@2x.png");
  width: 0.44rem;
  height: 0.44rem;
  background-size: 100%;
  background-repeat: no-repeat;
}
.mid {
  padding: 0.2rem 0;
}

.txt_top {
  font-size: 0.3rem;
  color: #222;
}
.around {
  width: 100%;
}
.dian {
  /*overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;*/
  width: 5rem;
}

.txt_m {
  font-size: 0.24rem;
  color: #999;
}
.ul_list {
  height: 2.3rem;
  border-bottom: 1px solid #f7f7f7;
}
.flex-column-align {
  width: 1.14rem;
  margin-right: 0.4rem;
  height: 0.3rem;
  line-height: 0.3rem;
}
.service {
  position: fixed;
  bottom: 0;
  width: 100%;
  background: #fff;
  z-index: 1001;
}
.pp {
  line-height: 0.88rem;
}

.texta {
  height: 1.44rem;
  width: 100%;
  background-color: #f8f8f8;
  font-size: 0.28rem;
  color: #888888;
  margin: 0.4rem 0;
  border: none;
  border-radius: 0.16rem;
  padding: 0.2rem;
}
.flex-center {
  /*水平垂直居中*/
  display: flex;
  justify-content: center;
  align-items: center;
}

.mint-popup {
  width: 100%;
}

.submit {
  position: absolute;
  top: 3.31rem;
  left: 0.65rem;
  width: 6.2rem;
  height: 4.12rem;
  background: #fff;
  z-index: 1001;
  border-radius: 0.2rem;
  font-family: PingFang SC;
  font-weight: Medium;
  color: #222;
}

.submit > h3 {
  text-align: center;
  font-size: 0.36rem;
  margin-top: 0.31rem;
}

.success_bt {
  width: 5.02rem;
  text-align: center;
  margin-left: 0.59rem;
  margin-top: 0.36rem;
}
.region {
  /* position: absolute; */
  /* bottom: -1.5rem; */
  width: 100%;
  height: 5rem;
  color: #222;
  background: #fff;
  font-weight: Regular;
  font-family: "PingFangSC-Regular";
  z-index: 1001;
}
.region > h3 {
  text-align: center;
  margin-top: 0.42rem;
  font-size: 0.36rem;
  color: #222;
  line-height: 0.36rem;
}
.region > span {
  /* position: absolute; */
  float: right;
  margin-right: 0.5rem;
  color: #49bbff;
  font-size: 0.28rem;
}
.gou {
  margin-left: 2.7rem;
  margin-top: 0.21rem;
}

.look {
  display: flex;
  justify-content: space-around;
  align-items: center;
  color: #1e99ff;
}

.look .look_l {
  margin-left: 0.49rem;
  font-size: 0.34rem;
}

.look .look_r {
  margin-right: 0.49rem;
  font-size: 0.34rem;
}

.black {
  width: 100%;
  height: 110%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 1000;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
}
</style>