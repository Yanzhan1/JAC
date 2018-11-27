<template>
    <div class="box">
        <ul class="left">
            <li v-for="(item,index) in title" :key="index" @click="but(index)">{{item}}</li>
        </ul>
        <ul class="right">
            <li v-for="(item,index) in firstcontent" :key="index" v-if="oneContent == '0'"  @click="show(index)">{{item}}</li>
            <li v-for="(item,index) in secondcontent" :key="index" v-if="oneContent == '1'" @click="show(index)">{{item}}</li>           
        </ul>
        <!-- <ul>
            <li v-for="(item,index) in last" v-if="showlist == '0'">{{item}}</li>
        </ul> -->
    </div>
</template>

<script>
export default {
    data(){
        return{
            title:['标题1','标题2','标题3','标题4'],
            // firstcontent:['内容1','内容1','内容1','内容1'],
            // secondcontent:['内容2','内容2','内容2','内容2'],
            // oneContent: '', //判断显示几级内容
            // last:['三级页面','三级页面','三级页面'],
            // showlist: ''
        }
    },
    methods:{
        but(index){
            this.oneContent = index
            // console.log(this.oneContent)
        },
        // show (val) {
        //     this.showlist = val
        // }
    },
    watch: {
        // oneContent (newVal, oldVal) {
        //     if (newVal == 0) {
        //         this.type = 0
        //     }
        // }
    }
}
</script>

<style scoped>
    .box{
        width: 5rem;
        height: 5rem;
        border: .02rem solid #f0f0f0;
        box-shadow: 0 0 #f0f0f0;
        margin: 2rem auto;
        display: flex;
    }
    .left{
        width: 20%;
        height:100%;
        display: flex;
        flex-direction: column;
        justify-content: space-around;
    }
    .right{
        position: relative;
    }
</style>
