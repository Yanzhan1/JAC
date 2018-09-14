<template>
    <div class="all">
        <div class="specil">
            <router-link to="/wit" tag="div"><img :src="'./static/images/back@2x.png'" alt="" style="width:.4rem;height:.4rem"></router-link>
            <p class="p1" @click="characteristic">车系特色</p>
            <p class="p2 active" @click="characteristic">配置参数</p>
        </div>
        <!-- <div style="display:flex;flex:1;just-content:center">
            <div v-for="(item,index) in Edition">{{item}}</div>
        </div> -->
        <div class="talbs">
            <div v-for="(item,index) in nav" class="talbs_next" @click="choose($event,index)" :class="{blue:current==index}" :key="index">{{item}}</div>
        </div>
        <div class="every_img" >
            <img style="height:9rem;" class="nav" :src="this.allimage[this.current]" alt="">
        </div>
        <div class="bottom-btn" @click="reserve">在线订车</div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            nav:[],
            images:[],
            Edition:['超级版','运动版','普通版'],
            current:0,//选择tablb中的index值
            allimage:[],
            seriesName:''

        }
    },
    methods:{
        characteristic(){
            this.$router.push({
                name:'车系特色',
                params:{
                    everyno:this.everyno,
                    seriesName:this.seriesName
                }
            })
        },
        reserve(){
            this.$router.push({
                name:'车辆预定',
                params:{
                    everyno:this.everyno,
                    seriesName:this.seriesName
                }
            })
        },
        choose(el,index){
            this.current=index;
        }
    },
    mounted(){
        this.everyno=this.$route.params.everyno
        this.seriesName=this.$route.params.seriesName
        let params={
            no:this.$route.params.everyno
        }
        this.$http.post(Wit.searchVehicleSeriesOne,params).then((res)=>{
            let allimage=res.data.data.imageRelationVO
            // console.log(res.data.data)
            this.nav=[]
            for(let i=0;i<allimage.length;i++){
                if(allimage[i].imageType==5&&allimage[i].imageTitle!=undefined){
                    this.allimage.push(allimage[i].imageUrl)
                    this.nav.push(allimage[i].imageTitle)
                }
            }
            // console.log(this.nav)
            // console.log(this.allimage)
        })
    }
}
</script>

<style scoped>
.talbs{
    width:100%;
    display: flex;
    overflow-x: auto;
    flex: 1;
}
.talbs::-webkit-scrollbar{
    display: none;
}
.talbs_next{
    height: .7rem;
    position: relative;
    display: flex;
    flex: 1;
    flex-shrink: 0;
    width: 1.9rem;
    justify-content: center;
}
.every_img{
    width: 100%;
    overflow-x: auto;
    height: 10.3rem;
}
.every::-webkit-scrollbar{
    /* display: none; */
}
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
.blue{
    color: #49BBFF;
    border-bottom:.03rem solid #49BBFF;
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
