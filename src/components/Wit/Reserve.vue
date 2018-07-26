<template>
<div>
        <div v-show="region" class="black"></div>     
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
                        <div class="allflex">
                            <span class="shows">{{this.Distribution}}</span>
                            <img src="/static/images/next@2x.png" alt="" @click="Distributor">
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
            <mt-button plain size='large' style="background:#49BBFF;color:#fff;border:0;">提交</mt-button>
            </div>
            <div class="region" v-show="region">
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
    data(){
        return{
            stylecar:'瑞风M6',
            region:false,
            distributors:false,
            Distribution:'',//经销商
            Recommend:'',//推荐码
            name:'',//姓名
            smallname:'',//称谓
            phone:'',//电话
            email:'',//邮箱
            area:[],//地区
            address:'',//地址
            slots: [
                {
                flex: 1,
                values: ['上海市', '浙江省', '江苏省', '安徽省', '黑龙江省', '陕西省'],
                className: 'slot1',
                textAlign: 'center',
                }, {
                divider: true,
                content: '',
                itemHieight:74,
                className: 'slot2',
                }, {
                flex: 1,
                values: ['开发区', '松江区', '闵行区', '浦东新区', '萧山区', '滨江区'],
                className: 'slot3',
                textAlign: 'center',
                }
            ],
            slots2: [
                {
                values: ['阿里巴巴有限公司', '阿里嘻嘻', '阿里哈哈按时', '阿里哦哦', '阿里啊啊', '阿里旺旺'],
                className: 'slot1',
                textAlign: 'right'
                }, {
                divider: true,
                itemHieight:74,
                }
            ]
        }
    },
    methods:{
        regions(){
            this.region=true
        },
        choose(){
            this.region=false
            this.distributors=false

        },
        Distributor(){
            this.distributors=true
            this.region=true
        },
        //所在地区
        onValuesChange(picker, values) {
            this.area=values
            if (values[0] > values[1]) {
            picker.setSlotValue(1, values[0]);
      }
    },
        //选择经销商
        onValuesChange2(picker, values) {
            this.Distribution=values[0]
            if (values[0] > values[1]) {
            picker.setSlotValue(1, values[0]);
      }
    }
    }
}
</script>

<style scoped>
.bgcolor{
    position: relative;
    width: 100%;
    height: 2.99rem;
    background: #fff;
    font-weight: Regular;
    font-family: PingFangSC-Regular;
}
.black{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, .5);
    z-index: 1000;
    position: absolute;
    top: 0;
    left: 0;
}
.all{
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: .28rem;
    height: 1rem;
    line-height: .28rem;
    font-size: .28rem;
    font-family: PingFangSC-Regular;
    font-weight: Regular;
}
.all img{
    width: 0.16rem;
    height: 0.3rem;
}
.allflex{
    display: flex;
    justify-content: flex-end;
}
.allflex>input{
    border:0;
    width: 2.5rem;
    outline:none;
}
.name{
    margin-top: .11rem;
}
.phone{
    margin-bottom: .13rem;
}
.Remarks{
    display: block;
    background: #fff;
    padding: .28rem;
}
textarea{
    width: 6.88rem;
    height: 1.14rem;
    background: #f5f5f5;
    border:#f5f5f5 solid .01rem;
    margin:.37rem .31rem;
    font-size: .28rem;
    font-weight: Regular;
    font-family: PingFangSC-Regular;
    outline:none;
}
.region{
    position: absolute;
    bottom: -.6rem;
    width: 100%;
    height: 6rem;
    color: #222;
    background: #fff;
    font-weight: Regular;
    font-family: PingFangSC-Regular;
    z-index:1001;
}
.region>h3{
    text-align: center;
    margin-top: .42rem;
    font-size: .36rem;
    color: #222;
    line-height: .36rem;
}
.region>span{
    position:absolute;
    bottom:5.32rem;
    right: .35rem;
    color: #49BBFF;
    font-size: .28rem;
}
.picker-slot.picker-slot-right{
    text-align: center;
}
</style>
