<template lang="html">
    <div class="dashboard">
        <div class="container">
            <!--
            <div class="item one" @click="clickChart('1')" style="transform: translate(-22.4%, -33.5%) scale(0.33)">
                <multipleColumn></multipleColumn>
            </div>
            <div class="item two active" @click="clickChart('2')" style="transform: translate(43.7%, 0) scale(1)">
                <v-echart-header :name="name" :legendArr="legendArr" :myChart="myChartColumn"></v-echart-header>
                <column :columnId="columnId" v-on:chartColumn="chartColumn"></column>
            </div>
            -->
            <!--
            <div class="item two active" style="transform: translate(43.7%, 0) scale(1)">
                <v-echart-header :name="name" :legendArr="legendArr" :myChart="myChartColumn"></v-echart-header>
                <column :columnId="columnId" v-on:chartColumn="chartColumn"></column>
            </div>
            -->
            <v-timer></v-timer>
            <div class="chart-content">
                <div class="chart-title">
                    <h1>验价订单</h1>
                </div>
                <div 
                    v-bind:class="[item.isNumActive ? activeClass : '', errorClass]"
                    v-for="(item, index) in chartType" 
                    :key="index" 
                    v-on:click="typeClick(index)">
                    <div class="box-card-header">
                        <div class="clearfix">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
                <v-new-pie
                    v-show="false"
                    :legendData="legendData"
                    :seriesData="seriesData">
                </v-new-pie>
            </div>
            <div class="chart-num">
                <!-- 
                <v-echart-header 
                    :name="name" 
                    :legendArr="legendArr" 
                    :showSelectAll="showSelectAll" 
                    :myChart="myChartColumn" 
                    :showFilter="showFilter" 
                    :showWeek="showWeek" 
                    :showMonth="showMonth">        
                </v-echart-header>
                -->
                <v-echart-header  
                    :name="name" 
                    :legendArr="legendArr" 
                    :showSelectAll="showSelectAll" 
                    :showFilter="showFilter" 
                    :showWeek="showWeek" 
                    :showMonth="showMonth"
                    v-on:startTime="startTime"
                    v-on:endTime="endTime"
                    v-on:oneWeek="oneWeek"
                    v-on:twoWeek="twoWeek"
                    v-on:oneMonth="oneMonth">        
                </v-echart-header>
                <!--   
                    <v-column 
                        :columnId="columnId" 
                        v-on:chartColumn="chartColumn"
                        :columnData="columnData">
                    </v-column> 
                -->
                <v-column 
                    v-if="showColumn"
                    :columnId="columnId"
                    :columnData="columnData">
                </v-column>

                <v-compare-column
                    v-if="showCompareColumn"
                    :compareColumnId="compareColumnId"
                    :xAxisColumnData="xAxisColumnData"
                    :legendColumnData="legendColumnData"
                    :lossColumnData="lossColumnData"
                    :profitColumnData="profitColumnData">
                </v-compare-column>
            </div>
        </div>
        <v-table
            :tableData="tableData">
        </v-table>
    </div>
</template>

<script>
    import column from '../components/column'
    import compareColumn from '../components/compareColumn'
    import echartHeader from '../components/echartHeader'
    import newPie from '../components/newPie'
    import multipleColumn from '../components/multipleColumn'
    import table from '../components/table'
    import timer from '../components/timer'
    import axios from 'axios'
    
    export default {
        data() {
            return {
                // items: [],
                showColumn: true,
                columnId: 'numColumn',
                columnData: [],
                legendArr: [],
                name: '订单数',
                // myChartColumn: {},
                typeIndex: 0,
                activeClass: 'box-card-active',
                errorClass: 'box-card',
                chartType: [
                    {"name": "订单数", "isNumActive": true},
                    {"name": "订单乘机人", "isNumActive": false},
                    {"name": "订单金额", "isNumActive": false},
                    {"name": "亏损数目", "isNumActive": false},
                    {"name": "盈利数目", "isNumActive": false},
                    {"name": "对比数目", "isNumActive": false},
                    {"name": "验价数", "isNumActive": false}
                ],
                xAxisData: [],
                legendData: [],
                seriesData: [],
                compareColumnId: 'compareColumn',
                xAxisColumnData: [],
                legendColumnData: [],
                lossColumnData: [],
                profitColumnData: [],
                showCompareColumn: false,
                showSelectAll: false,
                showFilter: true,
                showWeek: true,
                showMonth: true,
                fromTime: 0,
                toTime: parseInt((new Date().getTime())/1000),
                tableData: []
            }
        },

        mounted() {
            // this.init();
            this.getData();
            // let showLoadingDefault = {
            //     text: 'Loading...',
            //     color: '#23531',
            //     textColor: '#fff',
            //     maskColor: '#272D3A',
            //     zlevel: 0,
            // }
            // this.myChartColumn.showLoading(showLoadingDefault);
            // this.$store.commit('openLoading');
            // this.$store.dispatch('fetchColumnData', this.myChartColumn);
            // // this.legendArr = this.myChartColumn.getOption().legend;
            // this.legendArr.forEach((data) => {
            //     data.selected = true;
            // })
        },

        methods: {
            resize() {
                this.$root.charts.forEach((myChart) => {
                    myChart.resize()
                })
            },

            // chartColumn(msg) {
            //     this.myChartColumn = msg;
            // },
            startTime(msg) {
                this.fromTime = msg;
                // console.log(msg);
            },
            endTime(msg) {
                this.toTime = msg
                this.getData()
            },
            oneWeek(msg) {
                this.fromTime = msg
                this.getData()
            },
            twoWeek(msg) {
                this.fromTime = msg
                this.getData()
            },
            oneMonth(msg) {
                this.fromTime = msg
                this.getData()
            },
            typeClick(index) {
                for (let i = 0; i < this.chartType.length; i++) {
                    if (i == index) {
                        this.chartType[i].isNumActive = true;
                    } else {
                        this.chartType[i].isNumActive = false;
                    }
                }
                this.typeIndex = index;
                if (index == 5) {
                    this.showCompareColumn = true;
                    this.showColumn = false;
                    this.getData();
                } else {
                    this.showColumn = true;
                    this.showCompareColumn = false;
                    this.getData();
                }
                this.name = this.chartType[index]['name'];
                // this.$store.commit('updateTypeIndex', this.typeIndex);
                // let showLoadingDefault = {
                //     text: 'Loading...',
                //     color: '#23531',
                //     textColor: '#fff',
                //     maskColor: '#272D3A',
                //     zlevel: 0,
                // }
                // this.myChartColumn.showLoading(showLoadingDefault);
                // this.$store.commit('openLoading');
                // this.$store.dispatch('fetchColumnData', this.myChartColumn); 
            },
            getData() {
                let random = parseInt(Math.random() * 10 + 1);
                if (this.typeIndex < 6) {
                    axios.get('/orders_carrier?ver=' + random, {params: {from:this.fromTime, to:this.toTime}})
                        .then(
                            (res) => {
                                let ret = res.data.data;
                                let numberData = ret.number;
                                let countData = ret.count;
                                let priceData = ret.price;
                                let lossData = ret.loss;
                                let profitData = ret.profit;
                                this.columnData = [];
                                if(this.typeIndex == 0) {
                                    this.columnData = [];
                                    let showData = countData;
                                    this.columnData = showData;
                                    this.legendData = [];
                                    this.seriesData = [];
                                    for(let j = 1;  j < showData.length; j++) {
                                        this.legendData.push({
                                            name: showData[j][0],
                                            textStyle: {
                                                color: '#fff'
                                            }
                                        });
                                        this.seriesData.push({
                                            name: showData[j][0],
                                            value: showData[j][3]
                                        })
                                    }
                                } else if (this.typeIndex == 1) {
                                    this.columnData = [];
                                    let showData = numberData;
                                    this.columnData = showData;
                                    this.legendData = [];
                                    this.seriesData = [];
                                    for(let j = 1;  j < showData.length; j++) {
                                        this.legendData.push({
                                            name: showData[j][0],
                                            textStyle: {
                                                color: '#fff'
                                            }
                                        });
                                        this.seriesData.push({
                                            name: showData[j][0],
                                            value: showData[j][3]
                                        })
                                    }
                                } else if (this.typeIndex == 2) {
                                    this.columnData = [];
                                    let showData = priceData;
                                    this.columnData = showData;
                                    this.legendData = [];
                                    this.seriesData = [];
                                    for (let j = 1;  j < showData.length; j++) {
                                        this.legendData.push({
                                            name: showData[j][0],
                                            textStyle: {
                                                color: '#fff'
                                            }
                                        });
                                        this.seriesData.push({
                                            name: showData[j][0],
                                            value: showData[j][3]
                                        })
                                    }
                                } else if (this.typeIndex == 3) {
                                    this.columnData = [];
                                    let showData = lossData;
                                    this.columnData = showData;
                                    this.legendData = [];
                                    this.seriesData = [];
                                    for (let j = 1;  j < showData.length; j++) {
                                        this.legendData.push({
                                            name: showData[j][0],
                                            textStyle: {
                                                color: '#fff'
                                            }
                                        });
                                        this.seriesData.push({
                                            name: showData[j][0],
                                            value: showData[j][3]
                                        })
                                    }
                                } else if (this.typeIndex == 4) {
                                    this.columnData = [];
                                    let showData = profitData;
                                    this.columnData = showData;
                                    this.legendData = [];
                                    this.seriesData = [];
                                    for (let j = 1;  j < showData.length; j++) {
                                        this.legendData.push({
                                            name: showData[j][0],
                                            textStyle: {
                                                color: '#fff'
                                            }
                                        });
                                        this.seriesData.push(
                                            {
                                                name: showData[j][0],
                                                value: showData[j][3]
                                            }
                                        )
                                    }
                                } else {
                                    let showFirstData = profitData;
                                    let showSecondData = lossData;
                                    this.xAxisColumnData = [];
                                    this.legendColumnData = [];
                                    this.lossColumnData = [];
                                    this.profitColumnData = [];
                                    for (let i = 1; i < showFirstData.length; i++) {
                                        for (let k = i; k < showFirstData.length; k++) {
                                            if (showFirstData[i][5] < showFirstData[k][5]) {
                                                let tempFir = showFirstData[i];
                                                showFirstData[i] = showFirstData[k];
                                                showFirstData[k] = tempFir;
                                                let tempSec = showSecondData[i];
                                                showSecondData[i] = showSecondData[k];
                                                showSecondData[k] = tempSec;
                                            }
                                        }
                                    }
                                    for (let j = 1;  j < showFirstData.length; j++) {
                                            this.xAxisColumnData.push(showFirstData[j][0])
                                            this.lossColumnData.push(lossData[j][5]);
                                            this.profitColumnData.push(profitData[j][5]);
                                        // this.legendColumnData.push({
                                        //     name: showFirstData[j][0],
                                        //     textStyle: {
                                        //         color: '#fff'
                                        //     }
                                        // });
                                        // console.log(showFirstData[j][0]);
                                        // console.log(showFirstData[j][3]);
                                        // this.seriesColumnData.push(
                                        //     {
                                        //         name: showFirstData[j][0],
                                        //         value: showFirstData[j][3]
                                        //     },
                                        //     {
                                        //         name: showFirstData[j][0],
                                        //         value: showFirstData[j][3]
                                        //     }
                                        // )
                                    }
                                }
                            }
                        )
                        .catch((error) => {
                            console.log(error);
                        }
                    )
                } else {
                    axios.get('/verify_carrier?ver=' + random, {params: {from:this.fromTime, to:this.toTime}})
                        .then(
                            (res) => {
                                this.showColumn = true;
                                this.showCompareColumn = false;
                                this.columnData = [];
                                let ret = res.data.data;
                                let showData = ret.number;
                                this.columnData = showData;
                                this.legendData = [];
                                this.seriesData = [];
                                for(let j = 1;  j < showData.length; j++) {
                                    this.legendData.push({
                                        name: showData[j][0],
                                        textStyle: {
                                            color: '#fff'
                                        }
                                    });
                                    this.seriesData.push({
                                        name: showData[j][0],
                                        value: showData[j][5]
                                    })
                                }
                            }
                        )
                        .catch( (error) => {
                            console.log(error);
                        }
                    )
                }

            },
            /*
            init() {
                this.items = document.querySelectorAll('.flex-container .item')
                for (let i = 0; i < this.items.length; i++) {
                    this.items[i].dataset.order = i + 1;
                }
            },
            */
            /*
            clickChart(clickIndex) {
                let activeItem = document.querySelector('.flex-container .active')
                let activeIndex = activeItem.dataset.order
                let clickItem = this.items[clickIndex - 1]
                if (activeIndex === clickIndex) {
                  return;
                }
                activeItem.classList.remove('active')
                clickItem.classList.add('active')
                this.setStyle(clickItem, activeItem)
            },

            setStyle(el1, el2) {
                let transform1 = el1.style.transform
                let transform2 = el2.style.transform
                el1.style.transform = transform2
                el2.style.transform = transform1
            }
            */
        },

        components: {
            multipleColumn,
            'v-echart-header': echartHeader,
            'v-new-pie': newPie,
            'v-column': column,
            'v-compare-column': compareColumn,
            'v-table': table,
            'v-timer': timer
        }
    }
</script>

<style scoped>
    .chart-content {
        width: 19%;
        margin-left: 0.5%;
        margin-right: 0.5%;
        /*height: 100%;*/
        height: 91%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        float: left;
    }
    @media screen and (max-width: 1366px) {
        .chart-content {
            height: 88%;
        }
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
    .chart-num {
        width: 80%;
        /*height: 100%;*/
        height: 91%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        float: right;
    }
    @media screen and (max-width: 1366px) {
        .chart-num {
            height: 88%;
        }
    }
</style>
