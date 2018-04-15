<template lang="html">
    <div class="dashboard">
        <div class="flex-container column">
            <div class="chart-content">
                <div class="chart-title">
                    <h1>机票数据对比</h1>
                </div>
                <div class="box-card" v-for="(item, index) in chartType" :key="index" v-on:click="typeClick(index)">
                    <div class="box-card-header">
                        <div class="clearfix">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chart-price">
                <v-echart-header :name="name" :legendArr="legendArr" :myChart="myLineChart"></v-echart-header>
                <div class="chart-select-all">
                    <button v-on:click="selectAll">全不选</button>
                </div>
                <v-line-new :lineId="lineId" v-on:chartFlightLine="chartFlightLine"></v-line-new>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import echartHeader from '../components/echartHeader';
    import LineNew from '../components/lineNew';
    import filter from '../components/filter'

    export default {
        data() {
            return {
                items: [],
                name: "票价数据对比",
                lineId: 'priceLine',
                legendArr: [],
                chartType: [
                    {"name": "票数数据对比"},
                    {"name": "票价数据对比"},
                    {"name": "订单数据对比"}
                ],
                myLineChart: {},
                typePriceIndex: 0,
            }
        },

        mounted() {
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myLineChart.showLoading(showLoadingDefault);
            this.$store.commit('openLoading');
            this.$store.dispatch('fetchLineFlightData', this.myLineChart);
        },

        methods: {
            resize() {
                this.$root.charts.forEach((myChart) => {
                    myChart.resize()
                })
            },
            chartFlightLine(msg) {
                this.myLineChart = msg;
            },
            typeClick(index) {
                this.typePriceIndex = index;
                this.$store.commit('updateTypePriceIndex', this.typePriceIndex);
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myLineChart.showLoading(showLoadingDefault);
                this.$store.commit('openLoading');
                this.$store.dispatch('fetchLineFlightData', this.myLineChart);
            },
            selectAll() {
                
            },
            init() {
                this.legendArr = this.myLineChart.getOption().series;
                this.legendArr.forEach((data) => {
                    data.selected = true;
                })
            }
        },

        components: {
            'v-echart-header': echartHeader,
            'v-line-new': LineNew,
            'v-filter': filter
        }
    }
</script>

<style scoped>
.chart-content {
        width: 19%;
        margin-left: 0.5%;
        margin-right: 0.5%;
        height: 100%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        float: left;
    }
    .chart-content .chart-title {
        width: 100%;
        height: 61px;
        line-height: 60px;
        border-bottom: 1px solid #ebeef5;
        text-align: center;
    }
    .chart-content .chart-title h1 {
        font-size: 24px;
        color: #fff;
        letter-spacing: 1px;
    }
    .chart-content .box-card {
        width: 89%;
        margin-top: 20px;
        margin-left: 15px;
        margin-bottom: 20px;
        -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border: 1px solid #ebeef5;
        transition: .3s;
        border-radius: 4px;
        overflow: hidden;
        background: none;
        color: #fff;
        font-size: 22px;
        text-align: center;
        cursor: pointer;
    }    
    .chart-content .box-card:hover {
        color: #e9903a;
        border: 1px solid #e9903a;
    }
    .chart-content .box-card .box-card-header {
        padding-top: 18px;
        padding-bottom: 18px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .chart-price {
        width: 80%;
        height: 100%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        float: right;
    }

</style>
