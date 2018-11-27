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
			<li class="flex row li_st between cocenter">
				<p style="font-size:.27rem;color:#555">省份</p>
				<div class="flex row cocenter">
					<span>上海</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
			<li class="flex row li_st between cocenter">
				<p style="font-size:.27rem;color:#555">城市</p>
				<div class="flex row cocenter">
					<span>上海</span>
					<img src="../../../static/images/next@2x.png" alt="" style="width:.4rem;height:.4rem">
				</div>
			</li>
		</ul>
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
							<img v-if="chooseserveimg" style="width:,44rem;height:.44rem;margin-top:.8rem;margin-left:1rem;margin-right:.2rem;" src="../../../static/images/Wit/icon-select.png" alt="">
							<img v-else style="width:,44rem;height:.44rem;margin-top:.8rem;margin-left:1rem;margin-right:.2rem;" src="../../../static/images/Wit/icon-offselect.png" alt="">
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
								<span class="txt_m" style="margin-top:.2rem;width:1.14rem;">距离0.2</span>
							</div>
						</div>
					</li>
					<li class="ul_list flex row around " >
						<img style="width:,44rem;height:.44rem;margin-top:.8rem;margin-left:1rem;margin-right:.2rem;" src="../../../static/images/Wit/icon-select.png" alt="">
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
								<span class="txt_m" style="margin-top:.2rem;width:1.14rem;">距离0.2</span>
							</div>
						</div>
					</li>
					<li  class="ul_list flex row around " >
						<img style="width:,44rem;height:.44rem;margin-top:.8rem;margin-left:1rem;margin-right:.2rem;" src="../../../static/images/Wit/icon-select.png" alt="">
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
								<span class="txt_m" style="margin-top:.2rem;width:1.14rem;">距离0.2</span>
							</div>
						</div>
					</li>
				</ul>
		</div>
		<span class="bottom-btn" style="background-color:#49BBFF;" >立即预约</span>
		<!-- <mt-popup v-model="popupVisible" position="bottom">
			<div style="width:100%;z-index:999" v-if="type==1">
				<div class="flex row between pp">
					<span></span>
					<span style="font-size:.34rem;color:#222;margin-left: .7rem;">选择服务时间</span>
					<span style="font-size:.3rem;color:#49BBFF;margin:0 .3rem" @click="sure">确定</span>
				</div>
				<mt-picker :slots="slotss" @change="onDateChange"></mt-picker>
			</div>
			<div style="width:100%;z-index:999" v-if="type==2">
				<div class="flex row between pp">
					<span></span>
					<span style="font-size:.34rem;color:#222;margin-left: .7rem;">选择经销商</span>
					<span style="font-size:.3rem;color:#49BBFF;margin:0 .3rem" @click="sure">确定</span>
				</div>
				<mt-picker :slots="slots" @change="onValuesChange"></mt-picker>
			</div>

			<div style="width:100%;z-index:999" v-if="type==4">
				<div class="flex row between pp">
					<span></span>
					<span style="font-size:.34rem;color:#222;margin-left: .7rem;">选择服务类型</span>
					<span style="font-size:.3rem;color:#49BBFF;margin:0 .3rem" @click="sure">确定</span>
				</div>
				<mt-picker :slots="service" @change="onServicesChange"></mt-picker>
			</div>
			<div style="width:100%;z-index:999" v-if="type==3">
				<div class="flex row between pp">
					<span></span>
					<span style="font-size:.34rem;color:#222;margin-left: .7rem;">选择服务车型</span>
					<span style="font-size:.3rem;color:#49BBFF;margin:0 .3rem" @click="sure">确定</span>
				</div>
				<mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
			</div>
		</mt-popup> -->
		<!-- 提交成功后显示 -->
		<!-- <div class="submit" v-show="">
			<img src="/static/images/Wit/gou@2x.png" alt="" style="width:.8rem;height:.8rem;" class="gou">
			<h3>提交成功</h3>
			<div class="success_bt">{{this.thanks}}</div>
			<div style="width:5.68rem;height:.02rem;background:#f1f1f1;margin:.2rem auto;"></div>
			<div class="look">
				<div class="look_l">查看订单</div>
				<div style="width:.02rem;height:.6rem;background:#f1f1f1;"></div>
				<div class="look_r" @click="complete">完成</div>
			</div>
		</div> -->
		<div v-show="allback" class="black" @click='backgroundshow'></div>
		<!-- 遮罩层  -->
	</div>
</template>
<script>
import { Picker } from "mint-ui";
import { Toast } from "mint-ui";
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
      chooseserveimg:false,//控制选择服务站图片默认不选择
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
      slotss: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "left",
          defaultIndex: 2
        },
        {
          flex: 1,
          values: [
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
            "12"
          ],
          className: "slot2",
          textAlign: "center",
          defaultIndex: 2
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "right",
          defaultIndex: 2
        }
      ],
      addressSlots: [
        {
          flex: 1,
          values: [],
          className: "slot1",
          textAlign: "center"
        },
        {
          divider: true,
          content: "",
          itemHieight: 74,
          className: "slot2"
        },
        {
          flex: 1,
          values: [],
          className: "slot3",
          textAlign: "center"
        }
      ],
      slots: [
        {
          values: [],
          defaultIndex: 3
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
	subsub(){
		this.allback=false;
		this.servicezhan=false;
	},
	//点击遮罩层消失
	backgroundshow(){
			this.allback=false;
		this.servicezhan=false;
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