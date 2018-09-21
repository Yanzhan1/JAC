<template>
  <div>
    <Header @refresh="refresh"></Header>
    <div style="height: 0.88rem"></div>
    <!-- <keep-alive v-if="flag"> -->
      <router-view v-if="flag"/>
    <!-- </keep-alive> -->
  </div>
</template>

<script>
  import Header from '../Header'
  export default {
    name: "discover",
    data() {
      return {
        flag: true
      }
    },
    methods: {
      refresh() {
        this.flag = false
        setTimeout(() => {
          this.flag = true
        })
      }
    },
    components: {
      Header
    },
  }

</script>

<style scoped>

</style>
