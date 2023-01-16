<template lang="html">
  <div class="china-map-container">
    <div v-bind:id="this.id"></div>
  </div>
</template>

<script>
/* eslint-disable*/
import * as echarts from "echarts";

export default {
  name: "ChinaMap",
  props: {
    id: {
      type: String,
      default: "",
    },
    linesCityData: {
      type: Array,
      default: [],
    },
  },

  data() {
    return {
      myChart: {},
      name: "",
      cityList: [],
    };
  },

  watch: {
    linesCityData(val) {
      this.myChart.setOption(this.getOption(this.cityList, val));
      window.addEventListener("resize", this.myChart.resize);
    },
  },

  methods: {
    convertData(data) {
      let res = [];
      let geoCoordMap = {
        台湾: [121.509062, 25.044332],
        河北: [114.502461, 38.045474],
        山西: [112.549248, 37.857014],
        内蒙古: [111.670801, 40.818311],
        辽宁: [123.429096, 41.796767],
        吉林: [125.3245, 43.886841],
        黑龙江: [126.642464, 45.756967],
        江苏: [118.767413, 32.041544],
        浙江: [120.153576, 30.287459],
        安徽: [117.283042, 31.86119],
        福建: [119.306239, 26.075302],
        江西: [115.892151, 28.676493],
        山东: [117.000923, 36.675807],
        河南: [113.665412, 34.757975],
        湖北: [114.298572, 30.584355],
        湖南: [112.982279, 28.19409],
        广东: [113.280637, 23.125178],
        广西: [108.320004, 22.82402],
        海南: [110.33119, 20.031971],
        四川: [104.065735, 30.659462],
        贵州: [106.713478, 26.578343],
        云南: [102.712251, 25.040609],
        西藏: [91.132212, 29.660361],
        陕西: [108.948024, 34.263161],
        甘肃: [103.823557, 36.058039],
        青海: [101.778916, 36.623178],
        宁夏: [106.278179, 38.46637],
        新疆: [87.617733, 43.792818],
        北京: [116.405285, 39.904989],
        天津: [117.190182, 39.125596],
        上海: [121.472644, 31.231706],
        重庆: [106.504962, 29.533155],
        香港: [114.173355, 22.320048],
        澳门: [113.54909, 22.198951],
      };
      for (let i = 0; i < data.length; i++) {
        let geoCoord = geoCoordMap[data[i].name];
        if (geoCoord) {
          res.push({
            name: data[i].name,
            value: geoCoord.concat(data[i].value),
          });
        }
      }
      console.log(res);
      return res;
    },
    getOption() {
      let option = {
        visualMap: {
          min: 0,
          max: 1000,
          left: "left",
          top: "bottom",
          text: ["高", "低"],
          calculable: false,
          orient: "horizontal",
          inRange: {
            color: ["#e0ffff", "#006edd"],
            // symbolSize: [30, 100],
          },
        },
        tooltip: {
          padding: 8,
          enterable: true,
          transitionDuration: 1,
          textStyle: {
            color: "#fff",
            decoration: "none",
          },
        },
        series: [
          {
            name: "接入医院数量",
            type: "map",
            mapType: "china",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                },
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
            },
            label: {
              normal: {
                //静态的时候展示样式
                show: true, //是否显示地图省份得名称
                textStyle: {
                  color: "#fff",
                  fontSize: 12,
                },
              },
              emphasis: {
                //动态展示的样式
                color: "#fff",
              },
            },
            data: [
              {
                name: "北京",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "天津",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "上海",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "重庆",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "河北",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "河南",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "云南",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "辽宁",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "黑龙江",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "湖南",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "安徽",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "山东",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "新疆",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "江苏",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "浙江",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "江西",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "湖北",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "广西",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "甘肃",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "山西",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "内蒙古",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "陕西",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "吉林",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "福建",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "贵州",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "广东",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "青海",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "西藏",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "四川",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "宁夏",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "海南",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "台湾",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "香港",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
              {
                name: "澳门",
                value: Math.round(Math.random() * 1000),
                tipData: [
                  Math.round(Math.random() * 1000),
                  Math.round(Math.random() * 1000),
                ],
              },
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
    let geoJson = require("../../static/data/map/chinaMap.json");

    this.myChart = echarts.init(document.getElementById(this.id));
    echarts.registerMap("china", geoJson);
    this.myChart.setOption(this.getOption());
    this.myChart.on("click", this.clickMap);

    window.addEventListener("resize", this.myChart.resize);
  },
};
</script>

<style scoped>
.china-map-container {
  position: relative;
  width: 100%;
  height: 100%;
  /* border: 1px solid #ebeef5; */
  border-radius: 4px;
}
#map {
  width: 100%;
  height: 100%;
  opacity: 0.9;
}
</style>