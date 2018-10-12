<template>
    <div>流量购买页面</div>
</template>

<script>
export default {
    name:'FlowBuy',
    mounted(){
        this.$http.post(Lovecar.FlowBuy,{},this.$store.state.tsppin).then((res)=>{
            console.log(res)
        })
        // var params={
        //     // vin:this.$store.state.vins
        //     vin:123456789,
        //     userName:this.$store.state.mobile
        // }
        // this.$http.post(Lovecar.Getoederlist,params,this.$store.state.tsppin).then((res)=>{
        //     console.log(res)
        // })
    }
}
</script>

<style>

</style>
