<template lang="html">
  <div class="box">
      <!-- <div class="left-container">
          <div class="table-content">
              <el-table
                  :data="tableData"
                  :border="true"
                  style="width: 100%">
                  <el-table-column
                      prop="date"
                      label="来源"
                      width="60">
                  </el-table-column>
                  <el-table-column
                      prop="name"
                      label="目的"
                      width="60">
                  </el-table-column>
                  <el-table-column
                      prop="address"
                      label="描述">
                  </el-table-column>
              </el-table>
          </div>
          <div class="next-btn-content">
              <el-button type="primary" :loading="nextBtnLoading" @click="handleNextStep">下一步</el-button>
          </div>
      </div> -->
      <div class="container">
          <!-- <v-timer></v-timer> -->
          <div class="map">
              <v-china-map :id='id' :linesCityData="linesCityData" v-on:clickMap="changeData">
              </v-china-map>
          </div>
      </div>
  </div>
</template>

<script>
/* eslint-disable*/
import ChinaMap from "@/components/ChinaMap";
import Map from "@/components/Map";
import Timer from '@/components/Timer';

export default {
  data() {
    return {
      id: "map", // 地图的id, 在map组件中使用
      tableData: [
        {
          date: "永州",
          name: "重庆",
          address: "永州到重庆",
        },
        {
          date: "拉萨",
          name: "上海",
          address: "拉萨到上海",
        },
        {
          date: "贵阳",
          name: "北京",
          address: "贵阳到北京",
        },
        {
          date: "成都",
          name: "海口",
          address: "成都到海口",
        },
        {
          date: "长春",
          name: "昆明",
          address: "长春到昆明",
        },
      ],
      nextBtnLoading: false,
      linesCityData: [],
    };
  },
  methods: {
    handleNextStep() {
      this.linesCityData = [
        {
          coords: [
            [81.284242, 43.915299, 0],
            [108.501439, 22.792227, 10],
          ],
        },
      ];
    },
    /*
      init() {
          this.legendArr = this.myLineChart.getOption().series;
          this.legendArr.forEach((data) => {
              data.selected = true;
          })
      },
      */
    changeData(msg) {
      // this.init();
    },
  },

  components: {
    "v-china-map": ChinaMap,
    "v-map": Map,
    "v-timer": Timer
  },

  mounted() {
  },
};
</script>

<style>
.box {
  width: 100%;
  height: 89%;
}

@media screen and (max-width: 1366px) {
  .box {
    height: 100%;
  }
}

.box .left-container {
  display: none;
  position: absolute;
  width: 320px;
  height: 100%;
  z-index: 99;
  background-color: #f3f3f3;
}

.table-content,
.next-btn-content {
  width: 98%;
  margin: 20px auto;
}

.next-btn-content {
  margin: 40px auto;
}

.next-btn-content button {
  width: 100%;
}

.box .container {
  margin: 0 auto;
  height: 100%;
}

.fl {
  float: left;
}

.box .container .overview {
  width: 29%;
  height: 90%;
  /* border: 1px solid #ebeef5; */
  border-radius: 4px;
  margin-left: 0.5%;
}
@media screen and (max-width: 1366px) {
  .box .container .overview {
    height: calc(100% - 69px);
  }
}

.box .container .overview .overview-title {
  width: 100%;
  color: #fff;
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.box .container .map {
  float: left;
  width: 100%;
  height: 100%;
}

@media screen and (max-width: 1366px) {
  .box .container .map {
    height: calc(100% - 69px);
  }
}

.box .container .detail {
  width: 29%;
  height: 90%;
  /* border: 1px solid #ebeef5; */
  border-radius: 4px;
  margin-right: 0.5%;
}

@media screen and (max-width: 1366px) {
  .box .container .detail {
    height: calc(100% - 69px);
  }
}

.fr {
  float: right;
}

.box .container .detail .detail-title {
  width: 100%;
  color: #fff;
  font-size: 24px;
  text-align: center;
  margin-top: 20px;
  margin-bottom: 20px;
}

.box .container .detail .detail-pie {
  width: 100%;
  height: 40%;
}

.box .container .detail .detail-line {
  width: 100%;
  height: 45%;
}

.detail .detail-line .detail-line-header {
  height: 13%;
}

.text {
  font-size: 18px;
}

.item {
  margin-bottom: 18px;
}
.el-card {
  background: none;
  color: #fff;
  font-size: 22px;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}
.clearfix:after {
  clear: both;
}

.overview .box-card {
  width: 89%;
  margin: 20px auto;
  -webkit-box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  /* border: 1px solid #ebeef5; */
  transition: 0.3s;
  border-radius: 4px;
  overflow: hidden;
  background: none;
  color: #fff;
  font-size: 16px;
}
.overview .box-card .box-card-header {
  padding: 18px 20px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  border-bottom: 1px solid #ebeef5;
}
.el-card__body {
  padding: 0;
}
</style>