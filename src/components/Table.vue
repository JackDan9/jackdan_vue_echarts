<template lang="html">
  <div class="table-container">
    <el-table
      :data="tableData"
      :border="true"
      class="table">
      <el-table-column v-for="(item, index) in columnsData" :prop="item.prop" :label="item.label" :key="index">
      </el-table-column>
      <!-- <el-table-column
        prop="date"
        label="日期"
        width="180">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名"
        width="180">
      </el-table-column>
      <el-table-column
        prop="address"
        label="地址">
      </el-table-column> -->
    </el-table>
  </div>
</template>

<script>
/* eslint-disable*/

export default {
  name: "Table",
  props: {
    columnsData: {
      type: Array,
      default: []
    },
    tableData: {
      type: Array,
      default: []
    }
  },

  data() {
    return {
      myChart: {},
      name: "",
      cityList: [],
    };
  },
  methods: {
  },
  mounted() {
  },
};
</script>

<style scoped>
.table-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* border: 1px solid #ebeef5; */
  border-radius: 4px;
}
.table {
  width: 100%;
  height: auto;
}
</style>