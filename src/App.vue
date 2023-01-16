<template>
  <div id="app">
    <div class="main-cnt">
      <div class="sidebar-container">
        <v-sidebar></v-sidebar>
      </div>
      <div class="content-container">
        <router-view/>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable*/
import Sidebar from '@/components/Sidebar';
export default {
  name: 'App',
  components: {
    'v-sidebar': Sidebar
  }
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
  display: flex;
}

.sidebar-container {
  width: 210px;
  height: 100%;
}

.content-container {
  flex: 1;
  height: 100%;
}
</style>
