<template>
    <div>
      <mhead currentTitle="车辆报警" style="background:#fff"></mhead>
       <mt-loadmore :top-method="loadTop" ref="loadmore" @top-status-change="handleTopChange">
        <div slot="top" class="mint-loadmore-top">
          <span v-show="topStatus !== 'loading'" :class="{ 'rotate': topStatus === 'drop' }">释放刷新</span>
          <span v-show="topStatus === 'loading'">释放刷新...</span>
        </div>
        <ul style="height:calc(100vh);margin-top:1rem">
          <li  class="list" v-for="(item,index) in this.list" :key="index">
            <div>
              <p class="timer">{{item.time}}</p>
              <p class="box">{{item.text}}</p>
            </div>
          </li>
        </ul>
    </mt-loadmore>
    </div>
</template>

<script>
import PublicHead from '../publicmodel/PublicHead';
export default {
  data(){
    return{
      list:[
        {
          time:'12:00',
          text:'您的车被偷了'
        },
        {
          time:'11:00',
          text:'您的车被偷了'
        },
        {
          time:'1:00',
          text:'您的车被偷了'
        },
      ],
      topStatus:''
    }
  },
  components: {
	  mhead:PublicHead
  },
  methods: {
      handleTopChange(status) {
        console.log(status)
        this.topStatus = status;
      },
      loadTop() {
          this.$refs.loadmore.onTopLoaded();
        },
    },
}
</script>

<style scoped>
  .list{
    padding: .5rem;
    text-align: center;
    margin: 0 auto;
    background: #f8f8f8;
    margin-top: .3rem;
  }
  .list>div{
    border: .01rem solid #000;
  }
  .list .timer{
    text-align: right;
    padding:.1rem;
    font-size: 0.22rem;
    color: rgba(10, 4, 4, 0.86);
  }
  .list .box{
    padding: .3rem;
    font:600 .26rem/.3rem ''
  }
</style>
