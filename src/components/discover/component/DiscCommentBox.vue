<template>
    <div>
      <div style="width: 100%;padding:0.24rem 0;background: #ffffff;position: fixed;bottom: 0;z-index: 1001;height: 0.94rem;" class="flex contentcenter">
        <input autofocus="autofocus" ref="commentfocus" id="commentfocus" type="text"/>
        <span class="send">发送</span>
      </div>
      <div v-show="$store.state.commentboxflag" @click="hidecommentbox" class="bg" style="position: fixed;left: 0;top: 0;height: 100%;width: 100%;background: #000000;opacity: 0.4;z-index: 1000"></div>
    </div>
</template>

<script>
    export default {
        name: "discCommentBox",
      data(){
          return{
            inputname:"",
            flag:false
          }
      },
      methods:{
        hidecommentbox(){
          this.$store.dispatch('hidecommentBox')
          this.flag = true;
          setTimeout(function () {
            /*console.log(222)
            this.$refs.commentfocus.focus();*/
          }.bind(this),2000)
          // console.log(this.$refs.commentfocus)
          // console.log(this.$refs)
          // console.log(document.querySelector(".commentfocus"))
          // console.log(document.getElementById("commentfocus"))
        },
        boxfocus(){
          // $("#commentfocus")[0].focus()
          // alert(111)
          this.$nextTick(()=>{
            // 这个时候 dom 才被插入文档， 在这里获取焦点试试
            this.$refs.commentfocus.focus();

          })

        }
      },
      computed:{
          getcommentflag(){
            return this.$store.state.commentboxflag
          }
      },
      watch:{
        getcommentflag:function(val){
            if(val == true){
              this.flag = true
              // console.log(this.$refs)
              // console.log(document.querySelector(".commentfocus"))
              // console.log($(".commentfocus")[0]);
              // console.log(document.getElementById("commentfocus"))
              // console.log(this.inputname)
            }else{
              this.flag = false
            }
        },
        flag:function (val) {
          if(val == true){
            console.log(this.flag)
          }
        }
      },
      mounted(){

          // this.inputname = document.getElementById("commentfocus");
      }
    }
</script>

<style scoped>
  #commentfocus{
    width: 80%;
    /*min-height: 0.52rem;
    max-height:0.86rem;*/
    height: 0.52rem;
    border-radius: 0.08rem;
    margin-bottom: 0;
    font-size: 0.24rem;
    background: #ffffff;
    padding: 0.14rem;
    overflow-x: auto;
    box-sizing: border-box;
    color: #888888;
    border: 1px solid #CCCCCC;
  }
  .send{
      font-size: 0.28rem;
      color: #2099FF;
      text-align: center;
      line-height: 0.28rem;
      margin-left: 0.4rem;
  }
</style>
