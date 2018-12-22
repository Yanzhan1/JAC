<template>
  <div>
    <div>
      <my-header :id="'asd'" :title="title" :isShow="isShow" :rightPic="rightPic">
        <!-- <img slot="backblue" v-show="rightPic" src="../../../../static/images/discover/backfff.png" />
        <img slot="backblue" v-show="!rightPic" src="../../../../static/images/discover/backblue.png" /> -->
      </my-header>
      <!--资讯详情S-->
      <img src="../../../static/images/discover/index_login/list1.jpg" style="width: 100%;" id="bgImg">
      <div class="wrap_92">
        <!--内容S-->
        <p class="title_info">
          你已经是辆成熟的车了，该自动驾驶了
        </p>
        <p class="content" >
          <img src="../../../static/images/discover/index_login/1-1.jpg" style="width: 100%;">
          <img src="../../../static/images/discover/index_login/1-2.jpg" style="width: 100%;">
          <img src="../../../static/images/discover/index_login/1-3.jpg" style="width: 100%;">
        </p>
        <!--内容E-->
      </div>
      <!--资讯详情E-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "indexLoginDetail1",
    data() {
      return {
        title:"",
        isShow: true,
        rightPic: false,
      }
    },
    created() {
    },
    components: {
    },
    methods: {},
    mounted() {
    },
    updated() {
    }
  }

</script>

<style scoped>
  @import "../../../static/css/discover/detail.css";
</style>
