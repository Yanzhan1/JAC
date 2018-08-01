<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
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
