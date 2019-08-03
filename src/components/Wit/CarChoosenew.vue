<template>
<div class="main">
    <div style="width:100%;height:.38rem;position:fixed;background:#fff;top:0;"></div>
    <header class="newheader">
      <div class="navTitle">选购瑞风S4</div>
      <!-- <div></div> -->
		</header>
  <div class="headerHeight"></div>
  <div class="content">
    <div class="contentTitle">车型选择</div>
    <div class="contentSmallTitle">
      <span class="smallTitle">车型</span>
      <span class="smallTitle">颜色</span>
      <!-- <span class="smallTitle">轮辋</span>
      <span class="smallTitle one">选配</span> -->
    </div>
  </div>
  <div class="headerHeight2"></div>
  <div class="contentImg">
    <div class="carImg">
      <img style="width:7.2rem;height: 4rem;background-size: 100% 100%;position: absolute;left: 0.25rem" :src="'./static/images/Wit/whiteBody.png'"/>
    </div>
  </div>
  <!--<div class="headerHeight3"></div>-->
  <div class="contentCar">
    <div class="contentCarBtn"  :class="index == currentIndex ?'contentCarBtn2':'contentCarBtn'" v-for="(item,index) in carData" :key="item.id" @click="carBtn(index,item.label)">
      {{item.label}}
    </div>
  </div>
  <div class="contentBtn">
      <div class="contentColorBtn" @click="colorChooseBtn">
        颜色选择 >>
      </div>
  </div>
</div>
</template>
<script>
export default {
  data() {
    return {
      item: { no: "AU112018110106375078380" },
      currentIndex: 0,
      currentTitle: "超越型",
      carData: [
        {
          id: 1,
          label: "超越型",
          value: "车型:超越型"
        },
        {
          id: 2,
          label: "梦想型",
          value: "车型:梦想型"
        },
        {
          id: 3,
          label: "探索型",
          value: "车型:探索型"
        },
        {
          id: 4,
          label: "自由型",
          value: "车型:自由型"
        }
      ]
    };
  },
  methods: {
    getno() {
      this.$store.dispatch("NONAME", this.item);

    },
    carBtn(index, labelTitle) {
      this.currentIndex = index;
      this.currentTitle = labelTitle;
    },
    colorChooseBtn() {
      this.$router.push({
        path: "/wit/ColorChoose",
        query: {
          currentTitle: this.currentTitle,
          carName: "瑞风S4"
        }
      });
    },
    goBack() {
      this.$router.go(-1);
    }
  },
  mounted() {
    $(".MobileHeight").css({
      borderTopWidth: this.$store.state.mobileStatusBar,
      borderTopColor: "#fff"
    });
    this.getno();
    this.$store.state.levelCode= 'CY001'
    this.$store.state.srouceNo='CYRF016'
  }
};
</script>
<style scoped>
.MobileHeight {
  border-top-style: solid;
  box-sizing: content-box;
}
.main {
  /*background-color: #ccc;*/
  height: 100%;
  background-color: #fff;
}
.nav {
  width: 100%;
  height: 0.88rem;
  line-height: 0.88rem;
  position: fixed;
  background-color: #fff;
}
.nav div {
  flex: 1;
}
/*.nav .navBack{*/
/*padding-left: 0.15rem;*/
/*}*/

.navTitle {
  text-align: center;
  /* padding-left: 0.2rem; */
  font-size: 0.36rem;
  font-family: "PingFangSC-Regular";
  font-weight: 400;
  color: rgba(34, 34, 34, 1);
}
.headerHeight {
  height: 1.5rem;
}
.headerHeight2 {
  height: 0.5rem;
}
.headerHeight3 {
  height: 0.9rem;
}
.content {
  height: 1.5rem;
  margin: 0 0.2rem;
}
.content .contentTitle {
  margin-left: 0.2rem;
  font-size: 0.36rem;
  height: 0.9rem;
  line-height: 0.9rem;
  color: rgb(32, 32, 32);
}
.content .contentSmallTitle {
  font-size: 0.28rem;
  color: rgb(111, 111, 111);
}
.content .contentSmallTitle .smallTitle {
  display: inline-block;
  width: 1rem;
  text-align: center;
  border-right: 0.01rem solid rgba(111, 111, 111, 0.6);
}
.content .contentSmallTitle .one {
  border-right: none;
}
.contentImg {
  width: 100%;
  height: 4rem;
}
.carImg {
  width: 7.2rem;
  height: 4rem;
  position: relative;
}
.contentCar {
  margin: 0 0.2rem;
  display: flex;
  height: 2rem;
}
.contentCar .contentCarBtn {
  flex: 1;
  height: 2rem;
  line-height: 2rem;
  color: #6f6f6f;
  text-align: center;
  font-size: 0.32rem;
}
.contentCar .contentCarBtn2 {
  flex: 1;
  height: 2rem;
  line-height: 2rem;
  color: #222222;
  text-align: center;
  font-size: 0.36rem;
}
.contentBtn {
  height: 3.5rem;
  /*background-color: green;*/
}
.contentBtn .contentColorBtn {
  padding-top: 1.2rem;
  height: 0.88rem;
  line-height: 0.88rem;
  font-size: 0.36rem;
  color: rgb(111, 111, 111);
  text-align: center;
}
.newheader {
  position: fixed;
  width: 100%;
  height: 0.98rem;
  top: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  top: .38rem;
}
</style>
