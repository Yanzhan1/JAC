<template>
    <div>
        <header class="header">
                <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
                <span class="header-title">推荐码</span>
                <span class="header-right"></span>
        </header>
            
            <div class="center">
                <div class="my">我的推荐码</div>
                <img src="/static/images/my/icon_share@2x.png" alt="">
            <div class="num">{{this.share}}</div>
            </div>
        <div class="mask"></div>
        
    </div>
</template>

<script>
export default {
    data(){
        return{
            share:'329A87N2197'
        }
    }
}
</script>

<style>
    .header{
        z-index: 999;
    }
    .center{
        z-index: 998;
        position: absolute;
        top: 4.88rem;
        left: .6rem;
        width: 6.3rem;
        height: 2.9rem;
        background: #fff;
        font-weight: Medium;
        font-family: PingFang-SC-Medium;
        border-radius:.08rem;
    }
    .center .my{
        font-size: .31rem;
        color:#555;
        margin-left: .31rem;
        margin-top: .44rem;
        width: 1.57rem;
        height: .31rem;
    }
    .center>img{
        width: .32rem;
        height: .33rem;
        position: absolute;
        left:5.68rem;
        top: .48rem;
    }
    .num{
        width: 5.7rem;
        height: 1.2rem;
        position: absolute;
        top: 1.3rem;
        left: .3rem;
        background: #f5f5f5;
        font-size: .56rem;
        line-height:1.2rem;
        color: #222;
        text-align: center;
        letter-spacing: .1rem;
    }
    .mask{
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, .5);
        z-index:997;
        position: absolute;
    }
</style>
