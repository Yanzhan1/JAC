<template>
<div style="">
        <div v-show="region" class="black" @click="choose2"></div> <!-- 遮罩层  -->
        <div class="bgcolor">
                <header class="header">
                <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
                <span class="header-title">车辆预定</span>
                <span class="header-right"></span>
                </header>
                <ul style="margin-top:1.43rem">
                    <li class="all">
                        <span>预定车型</span>
                        <div>{{this.stylecar}}</div>
                    </li>
                    <li class="all">
                        <span>选择经销商</span>
                        <div class="allflex" @click="Distributor">
                            <span class="shows">{{this.Distribution}}</span>
                            <img src="/static/images/next@2x.png" alt="" >
                        </div>        
                    </li>
                    <li class="all">
                        <span>推荐码</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder='点击输入推荐码' v-model="this.Recommend">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <li class="name all">
                        <span>姓名</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击输入姓名" v-model="this.name">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <li class="sixname all">
                        <span>称谓</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击输入称谓" v-model="this.smallname">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <li class="phone all">
                        <span>手机</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击输入手机号" v-model="this.phone">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <li class="all">
                        <span>电子邮箱</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击输入邮箱" v-model="this.email">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <li @click="regions" class="all">
                        <span>所在地区</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击选择地区" v-model="this.area">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                    <li class="all">
                        <span>地址</span>
                        <div class="allflex">
                            <input type="text" name="" id="" placeholder="点击输入地址" v-model="this.address">
                            <img src="/static/images/next@2x.png" alt="">
                        </div>
                    </li>
                </ul>
                <span class='Remarks'>备注说明：</span>
                <textarea placeholder="输入文本..."></textarea>
            <!-- <mt-button plain size='large' style="background:#49BBFF;color:#fff;border:0;" @click.native="sub">提交</mt-button> -->
            <div class="submit" v-show="success">
                <img src="/static/images/Wit/gou@2x.png" alt="" style="width:.8rem;height:.8rem;" class="gou">
                <h3>提交成功</h3>
                <div class="success_bt">{{this.thanks}}</div>
                <div style="width:5.68rem;height:.02rem;background:#f1f1f1;margin:.2rem auto;"></div>
                <div class="look">
                    <div class="look_l">查看订单</div>
                    <div style="width:.02rem;height:.6rem;background:#f1f1f1;"></div>
                    <div class="look_r" @click="complete">完成</div>
                </div>
            </div>
             <div class="bottom">
                    <h3 @click="sub">提交</h3>
            </div>
            </div>
            <div class="region" v-show="this.areas">
                <h3>选择地区</h3>
                <span @click="choose">确定</span>
                <mt-picker :slots="slots" @change="onValuesChange" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem"></mt-picker>
            </div>
            <div class="region" v-show="this.distributors">
                <h3>选择经销商</h3>
                <span @click="choose">确定</span>
                <mt-picker :slots="slots2" @change="onValuesChange2" :visible-item-count="3" style="margin-top:.69rem;font-size:.34rem;lin-height:.36rem;text-algin:center;"></mt-picker>
            </div>
           
</div>
</template>

<script>
export default {
  data() {
    return {
      stylecar: "瑞风M6",
      region: false,
      distributors: false,
      success: false,
      areas: false,
      Distribution: "", //经销商
      Recommend: "", //推荐码
      name: "", //姓名
      smallname: "", //称谓
      phone: "", //电话
      email: "", //邮箱
      area: [], //地区
      address: "", //地址
      thanks:
        "感谢您对江淮汽车的关注与支持，我们专业的服务员会第一时间与您联系!",
      slots: [
        {
          flex: 1,
          values: [
            "上海市",
            "浙江省",
            "江苏省",
            "安徽省",
            "黑龙江省",
            "陕西省"
          ],
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
          values: [
            "开发区",
            "松江区",
            "闵行区",
            "浦东新区",
            "萧山区",
            "滨江区"
          ],
          className: "slot3",
          textAlign: "center"
        }
      ],
      slots2: [
        {
          values: [
            "阿里巴巴有限公司",
            "阿里嘻嘻",
            "阿里哈哈按时",
            "阿里哦哦",
            "阿里啊啊",
            "阿里旺旺"
          ],
          className: "slot1",
          textAlign: "right"
        },
        {
          divider: true,
          itemHieight: 74
        }
      ]
    };
  },
  methods: {
    regions() {
      this.region = true;
      this.areas = true;
    },
    choose() {
      this.region = false;
      this.distributors = false;
      this.areas = false;
    },
    choose2() {
      this.region = false;
      this.distributors = false;
      this.areas = false;
      this.success = false;
    },
    Distributor() {
      this.distributors = true;
      this.region = true;
    },
    complete() {
      this.success = false;
      this.region = false;
    },
    sub() {
      this.success = true;
      this.region = true;
    },
    //所在地区
    onValuesChange(picker, values) {
      this.area = values;
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    },
    //选择经销商
    onValuesChange2(picker, values) {
      this.Distribution = values[0];
      if (values[0] > values[1]) {
        picker.setSlotValue(1, values[0]);
      }
    }
  }
};
</script>

<style scoped>
.bgcolor {
  position: relative;
  width: 100%;
  height:100%;
  background: #fff;
  font-weight: Regular;
  font-family: PingFangSC-Regular;
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
.all {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0.28rem;
  height: 1rem;
  line-height: 0.28rem;
  font-size: 0.28rem;
  font-family: PingFangSC-Regular;
  font-weight: Regular;
}
.all img {
  width: 0.16rem;
  height: 0.3rem;
}
.allflex {
  display: flex;
  justify-content: flex-end;
}
.allflex > input {
  border: 0;
  width: 2.5rem;
  outline: none;
}
.name {
  margin-top: 0.11rem;
}
.phone {
  margin-bottom: 0.13rem;
}
.Remarks {
  display: block;
  background: #fff;
  padding: 0.28rem;
}
textarea {
  width: 6.88rem;
  height: 1.14rem;
  background: #f5f5f5;
  border: #f5f5f5 solid 0.01rem;
  margin: 0.37rem 0.31rem;
  font-size: 0.28rem;
  font-weight: Regular;
  font-family: PingFangSC-Regular;
  outline: none;
}
.region {
  position: absolute;
  bottom: -1.4rem;
  width: 100%;
  height: 6rem;
  color: #222;
  background: #fff;
  font-weight: Regular;
  font-family: PingFangSC-Regular;
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
  position: absolute;
  bottom: 5.32rem;
  right: 0.35rem;
  color: #49bbff;
  font-size: 0.28rem;
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
.bottom{
    width: 100%;
    font-weight: Regular;
    font-family: PingFangSC-Regular;
    font-size: .32rem;
    color: #fff;
    position: absolute;
    bottom: -1rem;
    height: 0.97rem;
    background: #49BBFF;
    text-align: center;
    line-height: 0.97rem;
}
</style>
