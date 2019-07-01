<template>
<div>
    <div @click="on1" style="margin-top:2rem">大连后台</div>
    <div @click="on2" style="margin-top:2rem">本地后台</div>
</div>
</template>

<script>
export default {
    methods:{
        on1(){
      this.$http
        .post(DISCOVERMESSAGE.count, { uid: this.$store.state.userId })
        .then((res)=>{
            alert(JSON.stringify(res))
          if (res.data.status) {
            this.focusNum = res.data.data.focusNum;
            this.fansNum = res.data.data.fansNum;
            this.likeNum = res.data.data.likeNum;
            this.momentNum = res.data.data.momentNum;
          } else {
            // MessageBox('提示', res.data.errorMsg);
          }
        });
        },
        on2(){
      this.$http.post(My.UserInfo, {no: this.$store.state.userId}).then((res)=>{
          alert(JSON.stringify(res))
        if (res.data.code == 0) {
          this.Personal = res.data.data;
          for (let val of this.Personal.entitys) {
            if (val.entity == "V") {
              this.imgV = true;
            }
            if (val.entity == "JAC") {
              this.imgJac = true;
            }
          }
        }
      }).catch((err)=>{
        alert(err)
      })
        }
    }
}
</script>

<style scoped>

</style>
