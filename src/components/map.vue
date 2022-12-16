<template lang="html">
  <div class="map-container">
    <div v-bind:id="this.id" ></div>
  </div>
</template>

<script>
/* eslint-disable*/
import * as echarts from 'echarts';

export default {
  name: "Map",
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
    getOption(cityList, linesCityData) {
      let option = {
        visualMap: {
          // 视觉映射组件配置
          type: "continuous", // 定义为连续型 visualMap
          show: false,
          bottom: "5%",
          left: "2%",
          text: ["高", "低"], // 两端的文本
          min: 0, // 指定 visualMapContinuous 组件的允许的最小值
          max: 100, // 指定 visualMapContinuous 组件的允许的最大值
          inRange: {
            // 定义 在选中范围中 的视觉元素
            color: ["#fff", "#A0CFFF", "#409EFF"], // 图元的颜色
          },
          calculable: true, // 是否显示拖拽用的手柄（手柄能拖拽调整选中范围）
        },
        geo: {
          map: "china",
          label: {
            //标签组件（地图名）
            normal: {
              //默认状态
              show: false, //默认是true 因为后面我们要画省会所以就直接设为false
            },
            emphasis: {
              //高亮下的状态
              show: true,
              color: "#1f589b",
            },
          },
          roam: true,
        },
        series: [
          {
            type: "effectScatter", //系列为涟漪类
            coordinateSystem: "geo",
            showEffectOn: "render", //涟漪特效的触发的方式 'render'直接显示  'emphasis'hover的时候显示
            symbolSize: 10, //标记的大小
            rippleEffect: {
              //涟漪的相关配置
              brushType: "fill", //涟漪的类型 stroke 线圈效果 stroke水波效果
              scale: 5, //波纹的最大的缩放比例
              period: 4, //涟漪的扩散周期
            },
            label: {
              //标签的配置
              normal: {
                formatter: "{b}",
                show: true,
                position: "bottom",
                color: "blue",
                offset: [0, 10], //文字偏移 [上，下]
              },
            },
            itemStyle: {
              //每个点的配置
              normal: {
                shadowBlur: 5,
              },
            },
            data: cityList,
          },
          {
            type: "lines",
            zLevel: 2,
            effect: {
              show: true,
              period: 4, //箭头指向速度，值越小速度越快
              trailLength: 0.02, //特效尾迹长度[0,1]值越大，尾迹越长重
              symbol: "arrow", //箭头图标
              symbolSize: 10, //图标大小
            },
            lineStyle: {
              normal: {
                width: 2, //尾迹线条宽度
                opacity: 1, //尾迹线条透明度
                curveness: 0.3, //尾迹线条曲直度
                color: "orange",
              },
            },
            data:
              linesCityData && linesCityData.length > 0
                ? [
                    {
                      coords: [
                        [90.9169986, 29.29850075, 0], //起点经纬度
                        [121.3359985, 31.1979007, 10], //终点经纬度
                      ],
                    },
                    {
                      coords: [
                        [114.277506, 30.607282, 0],
                        [111.59244, 26.46098, 0],
                      ],
                    },
                  ].concat(linesCityData)
                : [
                    {
                      coords: [
                        [90.9169986, 29.29850075, 0], //起点经纬度
                        [121.3359985, 31.1979007, 10], //终点经纬度
                      ],
                    },
                    {
                      coords: [
                        [114.277506, 30.607282, 0],
                        [111.59244, 26.46098, 0],
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
    let cityJson = require("../../static/data/map/lng_and_lat.json");
    let cityList = [
      {
        name: "上海",
        value: [121.3359985, 31.1979007, 10], //经纬度与值
      },
      {
        name: "拉萨",
        value: [90.9169986, 29.29850075, 0],
      },
    ];
    cityJson.map((cityItem) => {
      let name = cityItem["district_name"]
        ? cityItem["district_name"]
        : cityItem["city_name"];
      let value = [cityItem["lng"], cityItem["lat"], 0];

      cityList.push({
        name: name,
        value: value,
      });
    });
    this.cityList = cityList;

    this.myChart = echarts.init(document.getElementById(this.id));
    echarts.registerMap("china", geoJson);
    this.myChart.setOption(this.getOption(cityList));
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
#map {
  width: 100%;
  height: 100%;
  opacity: 0.9;
}
</style>