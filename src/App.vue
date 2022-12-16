<template>
  <div id="app">
    <div class="main-cnt">
      <router-view/>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  display: block;
}
.main-cnt {
  position: absolute;
  height: 100%;
  width: 100%;
}
</style>
