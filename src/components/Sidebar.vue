<template>
  <el-menu
    default-active="1"
    class="el-menu-vertical-demo"
    @open="handleOpen"
    @close="handleClose"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <el-menu-item index="1"  @click="handleMap">
      <i class="el-icon-location"></i>
      <span>地图</span>
    </el-menu-item>
    <el-menu-item index="2" @click="handlePie">
      <i class="el-icon-menu"></i>
      <span slot="title">饼图</span>
    </el-menu-item>
    <el-menu-item index="3" @click="handleLine">
      <i class="el-icon-document"></i>
      <span slot="title">折线图</span>
    </el-menu-item>
    <el-menu-item index="4" @click="handleScatter">
      <i class="el-icon-setting"></i>
      <span slot="title">散点图</span>
    </el-menu-item>
    <el-menu-item index="5" @click="handleCandlestick">
      <i class="el-icon-s-marketing"></i>
      <span slot="title">K线图</span>
    </el-menu-item>
    <el-menu-item index="6" @click="handleBar">
      <i class="el-icon-s-data"></i>
      <span slot="title">柱状图</span>
    </el-menu-item>
  </el-menu>
</template>
<script>
/* eslint-disable*/
export default {
  name: 'Sidebar',
  methods: {
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handlePie() {
      this.$router.replace('pie')
    },
    handleMap() {
      this.$router.replace('/')
    },
    handleLine() {
      this.$router.replace('/line')
    },  
    handleScatter() {
      this.$router.replace('/scatter')
    }, 
    handleCandlestick() {
      this.$router.replace('/candlestick')
    },
    handleBar() {
      this.$router.replace('/bar')
    }
  },
};
</script>
<style scoped>
.el-menu-vertical-demo {
  height: 100%;
}
</style>