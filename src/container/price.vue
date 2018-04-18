<template lang="html">
    <div class="dashboard">
        <div class="flex-container column">
            <div class="chart-content">
                <div class="chart-title">
                    <h1>航线数据</h1>
                </div>
                <div v-bind:class="[item.isPriceActive ? activeClass : '', errorClass]" v-for="(item, index) in chartType" :key="index" v-on:click="typeClick(index)">
                    <div class="box-card-header">
                        <div class="clearfix">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chart-price">
                <v-echart-header :name="name" :showSelectAll="showSelectAll" :legendArr="legendArr" :myChart="myLineChart" :showFilter="showFilter"></v-echart-header>
                <v-line-new :lineId="lineId" :option="option" v-on:chartFlightLine="chartFlightLine"></v-line-new>
            </div>
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import echartHeader from '../components/echartHeader';
    import LineNew from '../components/lineNew';
    import filter from '../components/filter'
    import axios from 'axios'

    export default {
        data() {
            return {
                items: [],
                name: "15分钟数据",
                lineId: 'priceLine',
                activeClass: 'box-card-active',
                errorClass: 'box-card',
                legendArr: [],
                chartType: [
                    {"name": "15分钟数据", "isPriceActive": true},
                    {"name": "15分钟总数", "isPriceActive": false},
                    {"name": "15分钟占比", "isPriceActive": false}
                ],
                option: {},
                myLineChart: {},
                typePriceIndex: 0,
                showSelectAll: true,
                showFilter: false
            }
        },

        mounted() {
            this.getData();
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
            // this.legendArr = this.myLineChart.getOption().legend;
        },

        methods: {
            getData() {
                axios.get('/15mins_carrier')
                    .then (
                        (res) => {
                            console.log(res.data.data);
                        }
                    )
                    .catch((error) => {
                        console.log(error);
                    }
                )
            },
            resize() {
                this.$root.charts.forEach((myChart) => {
                    myChart.resize()
                })
            },
            chartFlightLine(msg) {
                this.myLineChart = msg;
            },
            typeClick(index) {
                for(let i = 0; i < this.chartType.length; i++) {
                    if (i == index) {
                        this.chartType[i].isPriceActive = true;
                    } else {
                        this.chartType[i].isPriceActive = false;
                    }
                }
                this.name = this.chartType[index]['name']
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
                // debugger;
                // this.myLineChart.clear();
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
        display: block;
        width: 78%;
        margin: 20px auto;
        -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border: 1px solid #ebeef5;
        transition: .3s;
        border-radius: 4px;
        overflow: hidden;
        background: none;
        color: #fff;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
    }    
    .chart-content .box-card-active {
        color: #e9903a;
        border: 1px solid #e9903a;
    }
    .chart-content .box-card .box-card-header {
        padding-top: 14px;
        padding-bottom: 14px;
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
