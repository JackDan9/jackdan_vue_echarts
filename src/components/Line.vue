<template lang="html">
  <div class="map-container">
    <div id="chartLine"></div>
  </div>
</template>

<script>
/* eslint-disable*/
import * as echarts from "echarts";

export default {
  name: "Line",
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
        title: {
          text: "Stacked Area Chart",
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985",
            },
          },
        },
        legend: {
          data: ["电商", "零售", "证劵", "能源", "军工"],
        },
        toolbox: {
          feature: {
            saveAsImage: {},
          },
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "电商",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [120, 132, 101, 134, 90, 230, 210],
          },
          {
            name: "零售",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [220, 182, 191, 234, 290, 330, 310],
          },
          {
            name: "证劵",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [150, 232, 201, 154, 190, 330, 410],
          },
          {
            name: "能源",
            type: "line",
            stack: "Total",
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [320, 332, 301, 334, 390, 330, 320],
          },
          {
            name: "军工",
            type: "line",
            stack: "Total",
            label: {
              show: true,
              position: "top",
            },
            areaStyle: {},
            emphasis: {
              focus: "series",
            },
            data: [820, 932, 901, 934, 1290, 1330, 1320],
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
    this.myChart = echarts.init(document.getElementById("chartLine"));
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
#chartLine {
  width: 100%;
  height: 100%;
}
</style>