<template>
    <div>  
        <div class="specil">
            <router-link class="header-left" to="/wit" tag="div"><img src="/static/images/back@2x.png" alt="" style="width:.4rem;height:.4rem;"></router-link>
            <p class="active p1">车系特色</p>
            <p class="p2" @click="configure">配置参数</p>
        </div>
        <div class="main">
            <img src="" alt="" class="nav">
            <div class="comment">
                <div class="car"></div>
                <div class="bottom">
                    <h3 @click="reserve">在线订车</h3>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods:{
        configure(){
            this.$router.push('/wit/Configure')
        },
        reserve(){
            this.$router.push('/wit/Reserve')
        }
    }
}
</script>

<style scoped>
.specil{
    width: 100%;
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
.main{
    position: relative;
    width: 100%;
    height: 12.04rem;
    margin-top: 0.98rem;
}
.magin .nav{
    height: 2.93rem;
    background: green;
}
.main .comment{
    height:9.11rem;

}
.main .comment .car{
    height: 8.14rem;

}
.main .comment .bottom{
    height: 0.97rem;
    background: #49BBFF;
    text-align: center;
    line-height: 0.97rem;
}
.main .bottom{
    width: 100%;
    font-weight: Regular;
    font-family: PingFangSC-Regular;
    font-size: .32rem;
    color: #fff;
    position: absolute;
    bottom: 0;
}
</style>
