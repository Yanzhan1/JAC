<template>
    <div>
        <!-- <div class="specil">
            <div class="header-left" @click="goback"><img :src="'./static/images/back@2x.png'" alt="" style="width:.4rem;height:.4rem;"></div>
            <p class="active p1">车系特色</p>
            <p class="p2" @click="configure">配置参数</p>
        </div> -->
        <header class="specil MobileHeight header">
			<div  @click="goback"><img style="width:.4rem;height:.4rem;" :src="'./static/images/back@2x.png'"></div>
			<router-link tag='p' class="active p1" to="/wit/Characteristic">车系特色<span></span></router-link>
			<router-link tag='p' class="p2" style="margin-right: 1.3rem;" to="/wit/Configure">配置参数<span></span></router-link>
		</header>
        <div class="main">
            <div v-for="(item,index) in this.everyimage" :key="index">
                <img style="display:block;width:100%;height:100%" :src="item" alt="">
            </div>
            <div style="height:1rem;"></div>
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
                    levelCode:this.levelCode
                    // everyno:this.everyno,
                    // seriesName:this.seriesName
                }
            })
        },
        reserve(){
            if(this.seriesName=='瑞风S4'){
                    this.$router.push('/CarChoose',{
                        name:'车型选择',
                        params:{
                           
                        }
                    })
            }else{
                    this.$router.push('/wit/Reserve',{
                                            name:'车辆预定',
                                            query:{
                                                
                                            }
                                        })
            }
        },
        goback(){
                this.$router.push('/wit')         
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
            this.srouceNo=res.data.data.lmscode
            this.$store.state.levelCode=res.data.data.lmslevelCode
            for(let i=0;i<allimage.length;i++){
                if(allimage[i].imageType==4){
                    this.everyimage.push(allimage[i].imageUrl)
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
.specil{
    width: 100%;
    display: flex;
    height: 1.18rem;
    align-items: center;
    position: fixed;
    top:0;
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
.main{
    position: relative;
    width: 100%;
    margin-top: 1.5rem;
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
