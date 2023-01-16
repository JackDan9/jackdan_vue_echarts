<template lang="html">
  <div class="map-container">
    <div id="chartPie"></div>
  </div>
</template>

<script>
/* eslint-disable*/
import * as echarts from "echarts";

export default {
  name: "Pie",
  props: {
  },

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
        legend: {
          top: "bottom",
        },
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true },
          },
        },
        series: [
          {
            name: "Nightingale Chart",
            type: "pie",
            radius: [50, 250],
            center: ["50%", "50%"],
            roseType: "area",
            itemStyle: {
              borderRadius: 8,
            },
            data: [
              { value: 40, name: "rose 1" },
              { value: 38, name: "rose 2" },
              { value: 32, name: "rose 3" },
              { value: 30, name: "rose 4" },
              { value: 28, name: "rose 5" },
              { value: 26, name: "rose 6" },
              { value: 22, name: "rose 7" },
              { value: 18, name: "rose 8" },
            ],
          },
        ],
      };
      return option;
    },
    clickMap(params) {
      this.$emit("clickMap", params.name);
    },
  },
  mounted() {
    this.myChart = echarts.init(document.getElementById('chartPie'));
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
#chartPie {
  width: 100%;
  height: 100%;
}
</style>