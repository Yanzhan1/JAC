<template>
    <div class="all">
        <header class="specil MobileHeight header">
			<div  @click="goback"><img style="width:.4rem;height:.4rem;" :src="'./static/images/back@2x.png'"></div>
			<router-link tag='p' class="p1" to="/wit/Characteristic">车系特色<span></span></router-link>
			<router-link tag='p' class="p2 active" style="margin-right: 1.3rem;" to="/wit/Configure">配置参数<span></span></router-link>
		</header>
        <div style="height:.88rem" class="MobileHeight"></div>
        <div style="position:fixed;background:#fff;width:100%">
            <div class="talbs">
                <div v-for="(item,index) in nav" class="talbs_next" @click="choose($event,index)" :class="{blue:current==index}" :key="index">{{item}}</div>
            </div>
        </div>
        <div style="width:100%;height:1.53rem"></div>
        <div class="every_img" >
            <!-- <img style="display:block;width:100%;" class="nav" :src="this.allimage[this.current]" alt=""> -->
            <img v-for="(item,index) in this.arr[this.current]" :key="index" style="display:block;width:100%;" class="nav" :src="item" alt="">
        </div>
        <div style="height:.88rem"></div>
        <div class="bottom-btn" @click="reserve" >在线订车</div>
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
            seriesName:'',
            arr:[],
            arrr:[],
        }
    },
    methods:{
        characteristic(){
            this.$router.push({
                name:'车系特色',
                params:{
                    // everyno:this.everyno,
                    // seriesName:this.seriesName
                }
            })
        },
        goback(){
             this.$router.push('/wit')
        },
        reserve(){
             if(this.seriesName=='瑞风S4'){
                    this.$router.push('/wit/tabChooseCar',{
                        name:'车型选择',
                        params:{
                            levelCode:this.levelCode
                        }
                    })
            }else{
                    this.$router.push('/wit/Reserve',{
                                            name:'车辆预定',
                                            params:{
                                                levelCode:this.levelCode
                                            }
                                        })
            }
        },
        choose(el,index){
            this.current=index;
        }
    },
    mounted(){
        $(".MobileHeight").css({
				"borderTopWidth": this.$store.state.mobileStatusBar,
				"borderTopColor": "#fff",
			})
        let params={
            no:this.$store.state.everyno
        }
        this.$http.post(Wit.searchVehicleSeriesOne,params).then((res)=>{
            let allimage=res.data.data.imageRelationVO
            this.seriesName=res.data.data.seriesName
            this.nav=[]
            for(let i=0;i<allimage.length;i++){
                if(allimage[i].imageType==5&&allimage[i].imageTitle!=undefined){
                    // this.arrr=allimage[i].imgUrls
                    this.arr.push(allimage[i].imgUrls)
                    // for(let j=0;j<allimage[i].imgUrls.length;j++){
                    //     this.allimage.push(allimage[i].imgUrls[j])
                    // }
                    this.nav.push(allimage[i].imageTitle)
                }
            }
        })
    }
}
</script>

<style scoped>
	.MobileHeight {
		border-top-style: solid;
		box-sizing: content-box;
	}
.talbs{
    width:100%;
    display: flex;
    overflow-x: auto;
    flex: 1;
    margin-top:.66rem;
}
.talbs::-webkit-scrollbar{
    display: none;
}
.talbs_next{
    height: .7rem;
    position: relative;
    display: flex;
    line-height: .5rem;
    /* flex: 1; */
    flex-shrink: 0;
    padding: 0 .2rem;
    justify-content: center;
}
.every_img{
    width: 100%;
    overflow-x: auto;
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
    align-items: center;
    position: fixed;
    margin-bottom: .3rem;
    background: #fff;
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
.bottom-btn{
    position: fixed;
    bottom: 0;
}
</style>
