<template>
    <div>
        <div class="mytop">
            <div class="flex between mytopicon">
              <img src="../../../static/images/my/mine_service@2x.png" alt="">
              <img src="../../../static/images/my/mine_message@2x.png" alt="">
            </div>
          <div class="mytophead">
            <img src="" alt="">
          </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Myindex",
      data(){
        return{

        }
      },
      methods:{

      },
      mounted(){
          console.log($('.mytop').height())
      }
    }
</script>

<style scoped>
.mytop{
  height: 4.48rem;
  padding: 0 0.3rem;
  background: url("../../../static/images/my/bg-mine@2x.png") no-repeat center center;
  background-size: 100% 100%;
}
  .mytopicon{
     padding-top: 0.4rem;
   }
  .mytopicon>img{
    width: 0.4rem;
    height: 0.4rem;
  }
  .mytophead{
    margin-top: 0.3rem;
  }
</style>
