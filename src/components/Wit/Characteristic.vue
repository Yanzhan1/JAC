<template>
    <div>  
        <div class="specil">
            <!-- <router-link class="header-left" to="/wit" tag="div"><img :src="'./static/images/back@2x.png'" alt="" style="width:.4rem;height:.4rem;"></router-link> -->
            <div class="header-left" @click="$router.go(-1)"><img :src="'./static/images/back@2x.png'" alt="" style="width:.4rem;height:.4rem;"></div>
            <p class="active p1">车系特色</p>
            <p class="p2" @click="configure">配置参数</p>
        </div>
        <div class="main">
            <div v-for="(item,index) in this.everyimage" :key="index">
                <img style="width:100%;height:100%" :src="item" alt="">
            </div>
           <h3 class="bottom-btn" @click="reserve">在线订车</h3>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return{
            everyno:'',
            everyimage:[],
            seriesName:'',
            srouceNo:'',//车辆预定中的model
            levelCode:'',//车辆预定中的series
        }
    },
    methods:{
        configure(){
            this.$router.push({
                name:'配置参数',
                params:{
                    // everyno:this.everyno,
                    // seriesName:this.seriesName
                }
            })
        },
        reserve(){
            this.$router.push({
                name:'车辆预定',
                params:{
                    levelCode:this.levelCode
                }
            })
        }
    },
    mounted(){
        // console.log(this.$route.params.everyno)
        // alert(this.seriesName)
        let params={
            no:this.$store.state.everyno
        }
        this.$http.post(Wit.searchVehicleSeriesOne,params).then((res)=>{
            let allimage=res.data.data.imageRelationVO
            console.log(res.data.data.srouceNo)
            this.srouceNo=res.data.data.srouceNo
            this.levelCode=res.data.data.levelCode
            for(let i=0;i<allimage.length;i++){
                if(allimage[i].imageType==4){
                    this.everyimage.push(allimage[i].imageUrl)
                }
            }
            // console.log(this.everyimage)
        })
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
    position: fixed;
    top:0
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
    margin-top: 0.98rem;
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
.main>img{
    width: 100%;
}
</style>
