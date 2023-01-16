<template lang="html">
  <div class="map-container">
    <div id="chartBar"></div>
  </div>
</template>

<script>
/* eslint-disable*/
import * as echarts from "echarts";

export default {
  name: "Bar",
  props: {},

  data() {
    return {
      myChart: {},
      name: "",
      cityList: [],
    };
  },
  methods: {
    getOption() {
      let option = {
        legend: {},
        tooltip: {},
        dataset: {
          source: [
            ["product", "2021", "2022", "2023"],
            ["Matcha Latte", 43.3, 85.8, 93.7],
            ["Milk Tea", 83.1, 73.4, 55.1],
            ["Cheese Cocoa", 86.4, 65.2, 82.5],
            ["Walnut Brownie", 72.4, 53.9, 39.1],
          ],
        },
        xAxis: { type: "category" },
        yAxis: {},
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [{ type: "bar" }, { type: "bar" }, { type: "bar" }],
      };
      return option;
    },
    clickMap(params) {
      this.$emit("clickMap", params.name);
    },
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById("chartBar"));
    this.myChart.setOption(this.getOption());
    this.myChart.on("click", this.clickMap);

    window.addEventListener("resize", this.myChart.resize);
  },
};
</script>

<style scoped>
.map-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* border: 1px solid #ebeef5; */
  border-radius: 4px;
}
#chartBar {
  width: 100%;
  height: 100%;
}
</style>