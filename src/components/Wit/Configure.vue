<template>
    <div class="all">
        <div class="specil">
            <router-link to="/wit" tag="div"><img src="/static/images/back@2x.png" alt="" style="width:.4rem;height:.4rem"></router-link>
            <p class="p1" @click="characteristic">车系特色</p>
            <p class="p2 active" @click="characteristic">配置参数</p>
        </div>
        <mt-navbar class="page-part" v-model="selected" style="width:100%;">
            <mt-tab-item id="1"><span class="pagecontent">精致内饰<span></span></span></mt-tab-item>
            <mt-tab-item id="2"><span class="pagecontent">时尚外观<span></span></span></mt-tab-item>
            <mt-tab-item id="3"><span class="pagecontent">主要性能指标<span></span></span></mt-tab-item>
            <mt-tab-item id="4"><span class="pagecontent">关键尺寸<span></span></span></mt-tab-item>
        </mt-navbar>
        <div style="background:#fff;width:100%;height:.18rem;"></div>
        <div class="nav">
           <div style="width:38%;text-align:center">项目</div>
           <div style="width:62%;overflow-x:auto;display:flex" class="navtop">
                    <div>指向性</div>
                    <div>智联型</div>
                    <div>智慧型</div>
                    <div>指向性</div>
                    <div>智联型</div>
                    <div>智慧型</div>
           </div>
        </div>
        <mt-tab-container v-model="selected">
            <mt-tab-container-item id="1">
                <ul class="main_3">
                    <li class="main_3_all">
                        <div class="left">发动机型号</div>
                        <div class="right">HFC4GC1.6D</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">发动机型式</div>
                        <div class="right">DOHC直列4缸16气门</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">排量（L）</div>
                        <div class="right">1.499</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">进气形式</div>
                        <div class="right">涡轮增压</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">发动机特有技术</div>
                        <div class="right">缸内直喷、双独立 可变气门正时系统（DVVT）</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">额定功率（Kw/rpm）</div>
                        <div class="right">128/4850～5500</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">最大扭矩（Nm/rpm）</div>
                        <div class="right">251/1500～4500</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">缸盖材料</div>
                        <div class="right">铝</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">缸体材料</div>
                        <div class="right">铁</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">最高车速（Km/h）</div>
                        <div class="right">160</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">百公里综合油耗（L）</div>
                        <div class="right">8.8</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">排放标准</div>
                        <div class="right">国V</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">悬挂系统</div>
                        <div class="right">前麦弗逊式独立悬架/后多连杆独立悬架</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">转向系统</div>
                        <div class="right">EPS电子随速助力转向</div>
                    </li>
                </ul> 
            </mt-tab-container-item>
            <mt-tab-container-item id="2">
                <ul class="main_3">
                    <li class="main_3_all">
                        <div class="left">全景天窗</div>
                        <div class="right_2">
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">行李架</div>
                        <div class="right_2">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">运动双色铝合金轮辋</div>
                        <div class="right_2">
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">四门车窗一键升降+防夹</div>
                        <div class="right_2">
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">四门车窗钥匙遥控升降</div>
                        <div class="right_2">
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">电动外后视镜+加热</div>
                        <div class="right_2">
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">后视镜电动折叠</div>
                        <div class="right_2">
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">前后无骨雨刷</div>
                        <div class="right_2">
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">LED日间行车灯</div>
                        <div class="right_2">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">大灯高度电动可调</div>
                        <div class="right_2">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">卤素大灯</div>
                        <div class="right_2">
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">LED大灯</div>
                        <div class="right_2">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">自动头灯</div>
                        <div class="right_2">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="radius"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">大灯延时关闭</div>
                        <div class="right_2">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">转向辅助照明功能</div>
                        <div class="right_2">
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="line"></div>
                            <div class="radius"></div>
                        </div>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="3">
                <ul class="main_3">
                    <li class="main_3_all">
                        <div class="left">发动机型号</div>
                        <div class="right">HFC4GC1.6D</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">发动机型式</div>
                        <div class="right">DOHC直列4缸16气门</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">排量（L）</div>
                        <div class="right">1.499</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">进气形式</div>
                        <div class="right">涡轮增压</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">发动机特有技术</div>
                        <div class="right">缸内直喷、双独立 可变气门正时系统（DVVT）</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">额定功率（Kw/rpm）</div>
                        <div class="right">128/4850～5500</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">最大扭矩（Nm/rpm）</div>
                        <div class="right">251/1500～4500</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">缸盖材料</div>
                        <div class="right">铝</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">缸体材料</div>
                        <div class="right">铁</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">最高车速（Km/h）</div>
                        <div class="right">160</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">百公里综合油耗（L）</div>
                        <div class="right">8.8</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">排放标准</div>
                        <div class="right">国V</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">悬挂系统</div>
                        <div class="right">前麦弗逊式独立悬架/后多连杆独立悬架</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">转向系统</div>
                        <div class="right">EPS电子随速助力转向</div>
                    </li>
                </ul>
            </mt-tab-container-item>
            <mt-tab-container-item id="4">
                <ul class="main_3">
                    <li class="main_3_all">
                        <div class="left">发动机型号</div>
                        <div class="right">HFC4GC1.6D</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">发动机型式</div>
                        <div class="right">DOHC直列4缸16气门</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">排量（L）</div>
                        <div class="right">1.499</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">进气形式</div>
                        <div class="right">涡轮增压</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">发动机特有技术</div>
                        <div class="right">缸内直喷、双独立 可变气门正时系统（DVVT）</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">额定功率（Kw/rpm）</div>
                        <div class="right">128/4850～5500</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">最大扭矩（Nm/rpm）</div>
                        <div class="right">251/1500～4500</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">缸盖材料</div>
                        <div class="right">铝</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">缸体材料</div>
                        <div class="right">铁</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">最高车速（Km/h）</div>
                        <div class="right">160</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">百公里综合油耗（L）</div>
                        <div class="right">8.8</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">排放标准</div>
                        <div class="right">国V</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">悬挂系统</div>
                        <div class="right">前麦弗逊式独立悬架/后多连杆独立悬架</div>
                    </li>
                    <li class="main_3_all">
                        <div class="left">转向系统</div>
                        <div class="right">EPS电子随速助力转向</div>
                    </li>
                </ul>
            </mt-tab-container-item>
        </mt-tab-container>
        <div class="bottom-btn" @click="reserve">在线订车</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            selected:'1'
        }
    },
    methods:{
        characteristic(){
            this.$router.push('/wit/Characteristic')
        },
        reserve(){
            this.$router.push('/wit/Reserve')
        }
    },
    // directives:{
    //     change(el){
    //         var val=0;
    //         if(val<100){
    //             el.style.opacity=val/100;
    //             val++
    //         }
    //     }
    // }
}
</script>

<style scoped>
.all{
    position: relative;
}
.specil{
    display: flex;
    height: 1.18rem;
    justify-content: center;
    align-items: center;
    position: relative;
}
.specil>p{
    padding: .25rem;
    font-weight: Regular;
    font-family: PingFangSC-Regular;
    font-size: .3rem;
    color: #ccc;
}
.specil>div>img{
    position: absolute;
    left:0.27rem;
    top: 0.33rem;
}
.specil .active{
    font-size: .36rem;
    color: #222;
}
.nav{
    width: 100%;
    height: .72rem;
    background: #efefef;
    display: flex;
    justify-content: space-between;
    align-items: center;
    overflow: hidden;
}
.nav .nav_right{
    display: block;
}
.navtop::-webkit-scrollbar {
         display: none;
}
.nav .slide>li{
    /* white-space:nowrap; */
    padding: .24rem .18rem;
}
.main_3 .main_3_all{
    display: flex;
    justify-content: space-between;
    align-items: center;
    /* height: .6rem; */
}
.main_3>li:nth-of-type(odd){
    background: #fff;
}
.main_3>li:nth-of-type(even){
    background: #f5f5f5;
}
.main_3 .main_3_all .left{
    font-family: PingFangSC-Regular;
    font-weight: Regular;
    font-size: .23rem;
    color: #555;
    padding: .3rem .4rem;
    width:49%;
}
.main_3 .main_3_all .right{
    font-family:PingFangSC-Medium;
    font-weight: Medium;
    font-size: .19rem;
    padding: .3rem .4rem;
    width: 65%;
    text-align: center;
}
.main_3 .main_3_all .right_2{
    display: flex;
    justify-content: center;
    align-items: center;
}
/* 底部提交 */
.footer{
    width: 100%;
    font-weight: Regular;
    font-family: PingFangSC-Regular;
    font-size: .32rem;
    color: #fff;
    position: absolute;
    bottom: 0;
    background: #49BBFF;
    line-height: .97rem;
    text-align: center;
}
/* 小圆点 */
.radius{
    width: .18rem;
    height: .18rem;
    border-radius: 50%;
    background: #313131;
    margin:0 .46rem;
}
/* 内容中的下划线 */
.line{
    width: .2rem;
    height: .04rem;
    background: #313131;
    opacity: .2;
    margin:0 .46rem;
}
.navtop>div{
    display: flex;
    flex-shrink: 0;
    width: 1.1rem;
    justify-content: center
}
/* 修改头部下划线长度 */
.mint-navbar .mint-tab-item.is-selected {
    /* padding: .34rem .5rem .27rem .5rem; */
    color: #49BBFF;
    border-bottom: 0;
}
.pagecontent{
    position:relative
}
.is-selected .pagecontent>span{
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
    width: 0.46rem;
    height: .88rem;
    border-bottom: .06rem solid #49BBFF;
}
.mint-navbar .mint-tab-item {
    padding: .3rem .09rem;
    font-size: .26rem;
    font-family: PingFangSC-Regular;
    font-weight: Regular;
}
</style>
