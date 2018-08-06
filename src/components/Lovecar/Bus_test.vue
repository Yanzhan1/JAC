<template>
  <div>
    <header class="header">
      <img class="header-left" :src="'./static/images/back@2x.png'" @click="$router.go(-1)">
      <span class="header-title">车辆体检</span>
      <span class="header-right"></span>
    </header>
    <div style="height:.88rem"></div>
    <h2>诊断时间：06-29 17:33</h2>
    <ul class="ul_content">
      <li class="flex row between cocenter">
        <p class="li_quan">电子转向柱锁</p>
        <span class="right_pic actives"></span>
      </li>
      <li class="flex row between cocenter">
        <p class="li_quan">电子转向柱锁</p>
        <span class="right_pic"></span>
      </li>
      <li class="flex row between cocenter">
        <p class="li_quan">电子转向柱锁</p>
        <span class="right_pic"></span>
      </li>
      <li class="flex row between cocenter">
        <p class="li_quan">电子转向柱锁</p>
        <span class="right_pic"></span>
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },
  created() {
    var self=this
    var param={
       'vin':'LS5A3CJC9JF810003'
    }
    this.$http.post(Lovecar.BusTest,param,getpin).then(res=>{

    })
    setTimeout(function() {
        self.$router.push('/test_result');
    }, 3000);
  }
};
</script>
<style scoped>
h2 {
  text-align: center;
  font-size: 0.26rem;
  color: #555;
  margin-top: 0.4rem;
}
.li_quan {
  position: relative;
  font-size: 0.28rem;
  color: #222;
}
.row {
  flex-direction: row;
}
.ul_content {
  margin: 0.5rem 0.3rem 0 0.8rem;
}
.ul_content li {
  height: 0.87rem;
  border-bottom: 1px solid #f1f1f1;
}
.li_quan:before {
  position: absolute;
  background-color: #2099ff;
  display: block;
  height: 0.12rem;
  width: 0.12rem;
  border-radius: 50%;
  top: 0.1rem;
  left: -0.3rem;
  content: "";
}
.right_pic {
  background-image: url("../../../static/images/Lovecar/complete@3x.png");
  width: 0.4rem;
  height: 0.4rem;
  display: block;
  background-size: 100%;
}
.right_pic.actives {
  background-image: url("../../../static/images/Lovecar/yichang.png");
  width: 0.4rem;
  height: 0.34rem;
  display: block;
}
</style>

