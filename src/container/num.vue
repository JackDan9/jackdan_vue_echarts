<template lang="html">
    <div class="dashboard">
        <div class="flex-container column">
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
            <div class="chart-content">
                <div class="chart-title">
                    <h1>验价订单</h1>
                </div>
                <div v-bind:class="[item.isNumActive ? activeClass : '', errorClass]" v-for="(item, index) in chartType" :key="index" v-on:click="typeClick(index)">
                    <div class="box-card-header">
                        <div class="clearfix">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
                <v-new-pie
                    :legendData="legendData"
                    :seriesData="seriesData"
                    >
                </v-new-pie>
            </div>
            <div class="chart-num">
                <v-echart-header :name="name" :legendArr="legendArr" :showSelectAll="showSelectAll" :myChart="myChartColumn" :showFilter="showFilter" :showWeek="showWeek" :showMonth="showMonth"></v-echart-header>
                <v-column :columnId="columnId" v-on:chartColumn="chartColumn"></v-column>
            </div>
        </div>
        <div class="table-num">
            <table class="table-title">
                <thead>
                    <tr>
                        <td></td>
                        <td>姓名</td>
                        <td>身份证号</td>
                        <td>地区</td>
                        <td>工作单位</td>
                        <td>职位</td>
                        <td>廉政风险点</td>
                        <td></td>
                    </tr>
                </thead>
            </table>
            <div class="table-body">
                <table>
                    <tbody>
                        <tr>
                            <td>
                                <img width="75" src="../assets/images/user.png" alt="">
                            </td>
                            <td class="table-body-td">张三</td>
                            <td class="table-body-td">520500197701150000</td>
                            <td class="table-body-td">毕节市</td>
                            <td class="table-body-td">民政局</td>
                            <td class="table-body-td">低保股股长</td>
                            <td class="table-body-td">房产数量</td>
                            <td></td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
    import column from '../components/column';
    import echartHeader from '../components/echartHeader';
    import newPie from '../components/newPie';
    import axios from 'axios';
    import multipleColumn from '../components/multipleColumn';

    export default {
        data() {
            return {
                items: [],
                columnId: 'columnChart',
                legendArr: [],
                name: '订单数',
                myChartColumn: {},
                typeIndex: 0,
                activeClass: 'box-card-active',
                errorClass: 'box-card',
                chartType: [
                    {"name": "订单数", "isNumActive": true},
                    {"name": "订单乘机人", "isNumActive": false},
                    {"name": "订单金额", "isNumActive": false},
                    {"name": "验价数", "isNumActive": false}
                ],
                legendData: [],
                seriesData: [],
                showSelectAll: false,
                showFilter: true,
                showWeek: true,
                showMonth: true
            }
        },

        mounted() {
            // this.init();
            this.getData();
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myChartColumn.showLoading(showLoadingDefault);
            this.$store.commit('openLoading');
            this.$store.dispatch('fetchColumnData', this.myChartColumn);
            // this.legendArr = this.myChartColumn.getOption().legend;
            this.legendArr.forEach((data) => {
                data.selected = true;
            })
        },

        methods: {
            resize() {
                this.$root.charts.forEach((myChart) => {
                    myChart.resize()
                })
            },

            chartColumn(msg) {
                this.myChartColumn = msg;
            },
            typeClick(index) {
                for(let i = 0; i < this.chartType.length; i++) {
                    if (i == index) {
                        this.chartType[i].isNumActive = true;
                    } else {
                        this.chartType[i].isNumActive = false;
                    }
                }
                this.typeIndex = index;
                this.getData();
                this.name = this.chartType[index]['name'];
                this.$store.commit('updateTypeIndex', this.typeIndex);
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myChartColumn.showLoading(showLoadingDefault);
                this.$store.commit('openLoading');
                this.$store.dispatch('fetchColumnData', this.myChartColumn); 
            },
            getData() {
                let random = parseInt(Math.random() * 10 + 1);

                if (this.typeIndex < 3) {
                    axios.get('/orders_carrier?ver=' + random, {params: {from:0}})
                        .then(
                            (res) => {
                                let ret = res.data.data;
                                let numberData = ret.number;
                                let countData = ret.count;
                                let priceData = ret.price;
                                if(this.typeIndex == 0) {
                                    let showData = countData;
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
                                } else if(this.typeIndex == 1) {
                                    let showData = numberData;
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
                                } else {
                                    let showData = priceData;
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
                                }
                            }
                        )
                        .catch((error) => {
                            console.log(error);
                        }
                    )
                } else {
                    axios.get('/verify_carrier?ver=' + random, {params: {from:0}})
                        .then(
                            (res) => {
                                let ret = res.data.data;
                                let showData = ret.number;
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
                            }
                        )
                        .catch( (error) => {
                            console.log(error);
                        })
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
            'v-column': column
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
    .chart-num {
        width: 80%;
        height: 100%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        float: right;
    }
    .table-num {
        padding: 0 15px 65px;
        position: relative;
        width: 90%;
        margin: 0 auto;
    }
    .table-num .table-title {
        width: 100%;
        color: #fff;
        text-align: center;
    }
    .table-num .table-title thead tr {
        line-height: 56px;
        border: 1px solid #0183d7;
        box-shadow: 0 0 8px #0183d7 inset;
    }
    .table-num .table-body {
        width: 99.95%;
        max-height: 667px;
        overflow: auto;
        border-left: 1px solid #0183d7;
        border-bottom: 1px solid #0183d7;
        border-right: 1px solid #0183d7;
        box-sizing: border-box;
    }
    .table-num .table-body table {
        width: 100%;
        text-align: center;
        color: #fff;
    }
    .table-num .table-body table tbody td {
        line-height: 110px;
    }
    .table-num .table-body table tbody td img {
        vertical-align: middle;
    }
    .table-num .table-body table .table-body-td {
        border-bottom: 1px solid #054c76;
    }
    .table-num table td:first-child {
        width: 14% !important;
    }
    .table-num table td {
        width: 13.33%;
    }
</style>
