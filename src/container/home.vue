<template lang="html">
    <div class="box">
        <div class="container">
            <div class="fl overview">
                <div class="overview-title">
                    <h1>{{this.name}}</h1>
                </div>

                <div class="box-card" v-for="(item, index) in overviewItem" :key="index">
                    <div class="box-card-header">
                        <div class="clearfix">
                            <span>{{item.title}}</span>
                            <el-button style="float: right; padding: 3px 0; font-size: 16px;" type="text">查看详情</el-button>
                        </div>
                    </div>
                </div>

                <!--
                <el-card class="box-card">
                  <div slot="header" class="clearfix">
                    <span>公安局数据对比</span>
                    <el-button style="float: right; padding: 3px 0; font-size: 16px;" type="text">查看详情</el-button>
                  </div>
                </el-card>
                -->
            </div>
            <div class="map">
                <v-map :id="id" v-on:clickMap="changeData"></v-map>
            </div>
            <div class="fr detail">
                <div class="detail-title">
                    <h1>{{this.name}}数据对比详情</h1>
                </div>
                <div class="detail-pie">
                    <v-pie :pieId="pieId"></v-pie>
                </div>
                <div class="detail-line">
                    <v-echart-header 
                        class="detail-line-header" 
                        :name="nameLine" 
                        :legendArr="legendArr" 
                        :myChart="myLineChart">
                    </v-echart-header>
                    <!--
                    <v-line-new 
                        :lineId="lineId" 
                        v-on:chartLine="chartLine"
                    ></v-line-new>
                    -->

                    <v-line-new
                        :lineId="lineId"
                        :legendData="legendData"
                        :xAxisData="xAxisData"
                        :seriesData="seriesData"
                        :selectStatus="selectStatus">
                    </v-line-new>
                </div>
            </div>
        </div>
    </div>
</template>


<script>
import column from '../components/column';
import Map from '../components/map';
import Pie from '../components/pie';
import LineNew from '../components/lineNew';
import echartHeader from '../components/echartHeader'
import axios from 'axios'

export default {
    data() {
        return {
            currentDate: new Date(),
            id: 'map',
            pieId: 'pie',
            lineId: 'homeLine',
            name: '',
            nameLine: '各部门数据走势',
            myLineChart: {},
            legendArr: [],
            legendData: [],
            xAxisData: [],
            seriesData: [],
            selectStatus: true,
            overviewItem: [],
            overviewItems: [
                {
                    "name": "北关区", 
                    "data": [
                        {"title": "公安部门数据对比", "url": ""},
                        {"title": "交通部门数据对比", "url": ""},
                        {"title": "教育局数据对比", "url": ""},
                        {"title": "扶贫办数据对比", "url": ""},
                        {"title": " 法院数据对比", "url": ""}
                    ]
                },
                {
                    "name": "安阳县",
                    "data": [
                        {"title": "公安部门数据对比", "url": ""},
                        {"title": "交通部门数据对比", "url": ""},
                        {"title": "教育局数据对比", "url": ""},
                        {"title": " 法院数据对比", "url": ""}
                    ]
                }
            ],
            lineEchartsData: [],
            lineEchartsDatas: [],
        };
    },
    methods: {
        /*
        init() {
            this.legendArr = this.myLineChart.getOption().series;
            this.legendArr.forEach((data) => {
                data.selected = true;
            })
        },
        */
        getLineData() {
            axios.get('http://192.168.112.14:8080/static/data/line/line.json')
                .then(
                    (res) => {
                        let ret = res.data.data;
                        // console.log(res.data)
                        this.lineEchartsDatas = ret;
                    }
                )
                .catch( (error) => {
                    console.log(error);
                }
            )
        },
        changeData(msg) {
            let mapName = this.name = msg;
            let oLen = this.overviewItems.length;
            let dLen = this.lineEchartsDatas.length;
            
            for (let i = 0; i < oLen; i++) {
                if (mapName === this.overviewItems[i].name) {
                    this.overviewItem = this.overviewItems[i].data;
                }
            }
            for (let j = 0; j < dLen; j++) {
                if (mapName === this.lineEchartsDatas[j].name) {
                    this.xAxisData = [];
                    this.legendData = [];
                    this.seriesData = [];
                    this.lineEchartsData = this.lineEchartsDatas[j].echartsData;
                    this.xAxisData = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
                    for(let key in this.lineEchartsData) {
                        let nameStr = this.lineEchartsData[key]['name'];
                        let typeStr = this.lineEchartsData[key]['type'];
                        let dataArr = this.lineEchartsData[key]['data'];
                        this.legendData.push({
                            name: nameStr,
                            icon: 'bar',
                            textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'},
                        });
                        this.seriesData.push({
                            name: nameStr,
                            type: typeStr,
                            data: dataArr
                        })
                    }
                }
            }
            // console.log(JSON.parse(JSON.stringify(this.lineEchartsData)));

            // let data = this.lineEchartsData;
            /*
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myLineChart.showLoading(showLoadingDefault);
            this.myLineChart.setOption({
                toolbox: {
                    show: true
                },
                series: data
            });
            this.myLineChart.hideLoading();
            */
            // this.init();
        },
        /*
            chartLine(msg) {
                this.myLineChart = msg;
            }
        */
    },

    components: {
        'v-map': Map,
        'v-pie': Pie,
        'v-line-new': LineNew,
        'v-echart-header': echartHeader
    },

    mounted() {
        // this.init();
        this.getLineData();
    }
}
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
    .box .container {
        margin: 100px auto 0;
        height: 100%;
    }
    .fl {
        float: left;
    }
    .box .container .overview {
        width: 29%;
        height: 90%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        margin-left: 0.5%;
    }
    @media screen and (max-width: 1366px) {
        .box .container .overview {
            height: 100%;
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
        width: 40%;
        height: 90%;
        margin-left: 0.5%;
    }

    @media screen and (max-width: 1366px) {
        .box .container .map {
            height: 100%;
        }
    }

    .box .container .detail {
        width: 29%;
        height: 90%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        margin-right: 0.5%;
    }

    @media screen and (max-width: 1366px) {
        .box .container .detail {
            height: 100%;
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
        clear: both
    }

    .overview .box-card {
        width: 89%;
        margin: 20px auto;
        -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border: 1px solid #ebeef5;
        transition: .3s;
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