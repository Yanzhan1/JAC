<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  data () {
  	 return{
       
     }
  },
  methods: {
  	getNo () { //调试使用的模拟no
  		this.$store.dispatch('NO', 'UBS2018072410503423882')
  	}
  },
  mounted () {
  	this.getNo()
  }
}
</script>
<style>
.picker-item{
 color:#ccc
}
.picker-item.picker-selected{
    color:#222
}
</style>
