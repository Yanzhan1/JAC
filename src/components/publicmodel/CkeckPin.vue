<template>
    <div>
        <mt-popup v-model="popupVisible" position="middle" :modal="false">
			<div class="con" style="position:relative">
				<div class="del">
					<img @click="cancel" src="../.././../static/images/Wit/delete@3x.png" alt="" style="width:.28rem">
					<div style="font-size:.36rem;color:#222">请输入PIN码</div>
					<span></span>
				</div>
				<div class="pin-code flex maincenter cocenter">
					<div id="pinCon">
						<input @click="onTypewriting" v-model="pinNumber" class="pin-input" maxlength="6" type="password" readonly/>
					</div>
				</div>
			</div>
		</mt-popup>
        <div class="typer" v-if="IsShow">
			<ul class="flex yy">
				<li class="typer-num" v-for="(item,index) in keyNums" :key="index" :class="{'is-A': item=='A','is-OK':item=='OK','is-Del':item=='Del'}" @click="input(item)">{{item}}</li>
			</ul>
		</div>
        <div class="bgMask" v-show="this.popupbg" @click="mainbgmask"></div>
    </div>
</template>

<script>
import { Popup } from "mint-ui";
export default {
    data(){
        return{
            keyNums:[],
            IsShow: false,//控制输入框
            popupVisible:false,//控制弹出框输入pin码
            popupbg:false,//控制遮罩层
        }
    },
    methods:{
        //关闭PIN码弹框
        cancel() {
            this.IsShow = false;
            this.popupVisible = false;
            this.popupbg = false;
        },
         onTypewriting() {
            this.IsShow = true;
            this.produceArray();
        },
         produceArray() {
            var that = this;
            var arr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
            var arr2 = [];
            for (var i = 0; i < 12; i++) {
                var randomnumber = that.randomnum(0, arr.length);
                if (i == 9) {
                arr2.push("关闭");
                } else if (i == 11) {
                arr2.push("Del");
                } else {
                arr2.push(arr[randomnumber]);
                arr.splice(randomnumber, 1);
                }
            }
            that.keyNums = arr2;
    },
    }
}
</script>

<style scoped>
.con {
  width: 6rem;
  height: 3rem;
  padding: 0.2rem 0.4rem;
}
.del {
  display: flex;
  flex-direction: row;
  align-items: center;
  background-color: #fff;
  justify-content: space-between;
  border-bottom: 1px solid #f1f1f1;
  height: 0.88rem;
}
.pin-code{
    display: flex;
    justify-content: center;
    align-items: center;
}
.pin-code > div > input {
  display: block;
  width: 5.6rem;
  height: 0.94rem;
  text-indent: 0.4rem;
  letter-spacing: 0.77rem;
  border: none;
  outline: none;
  background: url(../../../static/images/Lovecar/border@2x.png) no-repeat center;
  background-size: 100%;
}
.typer li.typer-num.is-A {
  margin-left: 0.31rem;
}

.typer li.typer-num.is-OK {
  width: 0.8rem;
  margin-left: 0.1rem;
}
.yy {
  display:flex;
  flex-wrap: wrap;
  justify-content: center;
  height: 100%;
}
.bgMask {
  position: absolute;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  opacity: 0.5;
  background: #000;
  z-index: 999;
}
</style>
