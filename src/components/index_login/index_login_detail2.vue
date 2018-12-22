<template>
  <div>
    <div>
      <my-header :id="'asd'" :title="title" :isShow="isShow" :rightPic="rightPic">
        <!-- <img slot="backblue" v-show="rightPic" src="../../../../static/images/discover/backfff.png" />
        <img slot="backblue" v-show="!rightPic" src="../../../../static/images/discover/backblue.png" /> -->
      </my-header>
      <!--资讯详情S-->
      <img src="../../../static/images/discover/index_login/list2.jpg" style="width: 100%;" id="bgImg">
      <div class="wrap_92">
        <!--内容S-->
        <p class="title_info">
          改革开放40年丨变的是时代，不变的是创新！
        </p>
        <p class="content">
          今天，为期七天的安徽省庆祝改革开放40周年科技创新成果展开幕式在合肥滨湖会展中心隆重举行，作为安徽省自主汽车领导品牌，江淮汽车携第一台“江淮”牌载货车模型，无人驾驶汽车，和江淮新能源iEVA60、iEV6E运动版、iEV7S等车型以及江淮新能源核心零部件参加展示，集中体现江淮汽车在40年创业创新过程中取得的科技成果。
          <img src="../../../static/images/discover/index_login/2-1.jpg" style="width: 100%;padding:0.3rem 0;"/>
          <h3 style="text-align:center; width: 100%;padding:0.3rem 0;">创新，是安徽的特色名片</h3>
          惟改革者进，惟创新者强，惟改革创新者胜。科技是国之利器，创新更是国家和民族发展的重要力量。40年以来，安徽大地始终是一片创新创业的热土，而伴随科技创新步伐的加快,一大批原始创新成果在安徽竞相涌现。
          <img src="../../../static/images/discover/index_login/2-2.jpg" style="width: 100%;padding:0.3rem 0;"/>
          从安徽第一条高速公路开通、安徽第一辆汽车问世、中国第一台微型电子计算机发明、中国第一台C波段全相参移动式多普勒天气雷达出现，到世界第一台VCD、世界首台光量子计算机诞生等，均成为安徽科技创新的闪亮名片。如今，随着科技创新能力和科技成果转化水平的努力提升，安徽区域创新能力连续稳居全国第一方阵。无论是量子通信、大数据分析教学，亦或智能网联汽车、新工业机器人等，都充分展现了安徽系统推进全面科技创新改革的巨大能力和潜力。
          <img src="../../../static/images/discover/index_login/2-3.jpg" style="width: 100%;padding:0.3rem 0;"/>
          <h3 style="text-align:center; width: 100%;padding:0.3rem 0;">创新，是引领江淮汽车发展的第一驱动力</h3>
          作为安徽汽车产业创新的先锋力量，江淮汽车的前身-合肥江淮汽车制造厂创建于1964年，靠着纯手工打造出了安徽第一辆汽车：第一台“江淮”牌载货汽车，载重2.5吨，外形上采用了平头设计，它的问世既填补了安徽汽车工业空白，也拉开了安徽汽车业自主创业路的序幕。
          <img src="../../../static/images/discover/index_login/2-4.jpg" style="width: 100%;padding:0.3rem 0;"/>
          多年来，江淮汽车始终坚持强化核心技术能力建设，提升公司技术研发水平，全力打造中国品牌汽车的核心竞争力，在智能网联技术领域、新能源领域等均取得一系列实实在在的成果。在本次展会开幕式上，由江淮汽车与百度共同研发的无人驾驶汽车，盛装亮相直播现场，展示无人驾驶体验场景，这款无人驾驶汽车是基于江淮纯电动汽车平台开发，目前已达到SAE 3级水平，具备自主跟车、车道保持、自动变道、自动超车等功能，能够在城市快速路、高速公路环境下实现自动驾驶。
          <img src="../../../static/images/discover/index_login/2-5.jpg" style="width: 100%;padding:0.3rem 0;"/>
          江淮汽车同时还带来了液冷电池系统、“三大电、六小电”系统以及江淮iEV7S电动车、iEVA60电动车等在新能源领域的最新产品，向大家集中展示了创造力、爆发力、想象力。作为国内最早从事新能源汽车研发、生产和销售的车企之一，江淮汽车经过11年迭代研发，目前已实现了7代技术2代产品研发，系统掌握电动汽车的电池成组、电机、电控三大核心技术及能量回收、驱动与制动电耦合、远程监控、电磁兼容等关键技术，特别是高比能电池包热失控安全技术在国内率先取得突破，形成拥有国际先进水平的产品正向开发能力，未来将力争以核心技术研发带动产品的转型升级，应对新能源汽车市场的不断变化。
          <img src="../../../static/images/discover/index_login/2-6.jpg" style="width: 100%;padding:0.3rem 0;"/>
          40年，是改革开放伟大成就和宝贵经验的总结！也是开启新时期到跨入新世纪的新起点！不忘初心，牢记使命，江淮汽车将继续通过自主创新、打造中国品牌核心竞争力，努力向高端攀升，奋力谱写新时代改革开放的新篇章。
        </p>
        <!--内容E-->
      </div>
      <!--资讯详情E-->
    </div>
  </div>
</template>

<script>
  export default {
    name: "indexLoginDetail3",
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
