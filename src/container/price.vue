<template lang="html">
    <div class="dashboard">
        <div class="container">
            <v-timer></v-timer>
            <div class="chart-content">
                <div class="chart-title">
                    <h1>航线数据</h1>
                </div>
                <div 
                    v-bind:class="[item.isPriceActive ? activeClass : '', errorClass]" v-for="(item, index) in chartType" 
                    :key="index" 
                    v-on:click="typeClick(index)">
                    <div class="box-card-header">
                        <div class="clearfix">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chart-price">
            <!--
                <v-echart-header
                    :name="name"
                    :showSelectAll="showSelectAll"
                    :showSelectTimeAll="showSelectTimeAll"
                    :legendArr="legendArr"
                    :showFilter="showFilter"
                    v-on:selectNotAll="selectNotAll"
                ></v-echart-header>
            -->
                <div class="title">
                    <h1>{{name}}</h1>
                    <!--
                    <div class="chart-select-all" v-show="showSelectAll">
                        <button v-on:click="selectNotAll" v-bind:disabled="this.allNotDisabled">全不选</button>
                        <button v-on:click="selectAll" v-bind:disabled="this.allDisabled">全选</button>
                    </div>
                    -->
                    <div class="chart-select-all" v-show="showSelectAll">
                        <button
                            v-for="(itemSelect, indexSelect) in selectType"
                            v-on:click="selectClick(indexSelect)" v-bind:disabled="itemSelect.isSelectDisabled">
                            {{itemSelect.name}}
                        </button>
                    </div>
                    <!--
                    <div class="chart-select-time" v-show="showSelectTimeAll">
                        <button v-on:click="selectSmall" v-bind:disabled="this.smallDisabled">3小时</button>
                        <button v-on:click="selectMiddle" v-bind:disabled="this.middleDisabled">6小时</button>
                        <button v-on:click="selectBig" v-bind:disabled="this.bigDisabled">12小时</button>
                        <button v-on:click="selectSum" v-bind:disabled="this.sumDisabled">总数</button>
                    </div>
                    -->
                    <div class="chart-select-time" v-show="showSelectTimeAll">
                        <button
                            v-for="(itemTime, indexTime) in chooseTimeType"
                            v-on:click="timeClick(indexTime)"
                            v-bind:disabled="itemTime.isTimeDisabled">
                            {{itemTime.name}}
                        </button>
                    </div>

                    <div class="chart-select-range" v-show="showSelectRange">
                        <div style="display: inline-block; position: relative; width: 50%;">
                            <input 
                                type="text" 
                                name="flight" 
                                placeholder="航线号"
                                class="price-input"
                                v-model="inputValue"
                                @change="rangeChange()" />
                        </div>
                        <button
                            v-on:click="rangeClick()" 
                            v-bind:disabled="isRangeDisabled">搜索</button>
                    </div>
                </div>
                <!--
                <v-line-new :option="option"></v-line-new>
                -->
                <v-line-new
                    :lineId="lineId"
                    :xAxisData="xAxisData"
                    :legendData="legendData"
                    :seriesData="seriesData"
                    :selectStatus="selectStatus"
                    :searchData="searchData"
                    :filterStatus="filterStatus">
                </v-line-new>
            </div>
        </div>
        <v-table
            :tableData="tableData"
            :tableType="tableType">
        </v-table>
    </div>
</template>

<script>
    import echartHeader from '../components/echartHeader'
    import lineNew from '../components/lineNew'
    import filter from '../components/filter'
    import timer from '../components/timer'
    import table from '../components/table'
    import axios from 'axios'

    export default {
        data() {
            return {
                items: [],
                name: "15分钟数据",
                activeClass: 'box-card-active',
                errorClass: 'box-card',
                legendArr: [],
                data: {},
                optionData: {},
                lineId:'priceLine',
                legendData: [],
                xAxisData: [],
                seriesData: [],
                chartType: [
                    {"name": "15分钟数据", "isPriceActive": true},
                    {"name": "15分钟总数", "isPriceActive": false},
                    {"name": "15分钟占比", "isPriceActive": false}
                ],
                selectType: [
                    {"name": "全选", "isSelectDisabled": false},
                    {"name": "全不选", "isSelectDisabled": false}
                ],
                chooseTimeType: [
                    {"name": "3小时", "isTimeDisabled": false},
                    {"name": "6小时", "isTimeDisabled": false},
                    {"name": "12小时", "isTimeDisabled": false},
                    {"name": "总数", "isTimeDisabled": false}
                ],
                myLineChart: {},
                selectedObj: {},
                typePriceIndex: 0,
                selectStatus: true,
                formTime: parseInt((new Date().getTime())/1000 - 24 * 60 * 60),
                // toTime: parseInt((new Date().getTime())/1000),
                showSelectAll: true,
                showSelectTimeAll: true,
                showSelectRange: true,
                showFilter: false,
                chooseNotAll: true,
                isRangeDisabled: false,
                tableData: [],
                tableType: 0,
                inputValue: '',
                searchData: '',
                filterStatus: true
                // allDisabled: false,
                // allNotDisabled: false,
                // smallDisabled: false,
                // middleDisabled: false,
                // bigDisabled: false,
                // sumDisabled: false
            }
        },
        // created () {
        //     this.getData();
        // },
        // mounted() {
        //     this.getData();
        // },
        mounted() {
            this.getData();
            // setInterval( () => {
            //     this.getData();
            // }, 900000)

            /*
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
            */
            // this.legendArr = this.myLineChart.getOption().legend;
        },
        methods: {
            rangeClick() {
                this.isRangeDisabled = true;
                this.searchData = this.inputValue;
                this.getData();
            },
            rangeChange() {
                this.isRangeDisabled = false;
            },
            /*
            selectNotAll(msg) {
                this.chooseNotAll = msg;
            },
            */
            /*获取数据函数*/
            getData() {
                axios.get('/15mins_carrier', {params: {from:this.formTime}})
                    .then (
                        (res) => {
                            let ret = res.data.data;
                            this.data = ret;
                            this.legendData = [];
                            this.xAxisData = [];
                            this.seriesData = [];
                            this.tableData = [];
                            for(let i = 0; i < this.data['ts'].length; i++) {
                                let timeNew = new Date(parseInt(this.data['ts'][i]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ');
                                this.xAxisData.push(timeNew);
                            }
                            if (this.typePriceIndex == 0) {
                                this.tableType = 0;
                                for(let key in this.data['num15']) {
                                    this.legendData.push({
                                        name: key,
                                        icon: 'bar',
                                        textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'},
                                    });
                                    this.tableData.push({
                                        name: key,
                                        data: this.data['num15'][key]
                                    })
                                    this.seriesData.push({
                                        name: key,
                                        type: 'line',
                                        data: this.data['num15'][key],
                                        smooth: true
                                    })
                                }

                                /*
                                this.option  = {
                                    legend: {
                                        data: this.legendData,
                                    },
                                    xAxis: {
                                        data: this.xAxisData
                                    },
                                    series: this.seriesData
                                }
                                */
                            } else if (this.typePriceIndex == 1) {
                                this.tableType = 1;
                                let arr = [];
                                let sum = 0;
                                for (let num = 0; num < this.data['num15']['BE'].length; num ++) {
                                    sum = 0;
                                    for (let key in this.data['num15']) {
                                        if (this.data['num15'][key][num] == undefined) {
                                            this.data['num15'][key][num] = 0;
                                        }
                                        sum += this.data['num15'][key][num]
                                    }
                                    arr.push(sum);
                                }
                                this.tableData.push({
                                    name: '总数',
                                    data: arr
                                })
                                this.seriesData.push({
                                    name: '总数',
                                    type: 'line',
                                    data: arr,
                                    smooth: true
                                })

                                /*
                                this.option = {
                                    legend: {
                                        show: false
                                    },
                                    xAxis: {
                                        data: this.xAxisData
                                    },
                                    series: this.seriesData
                                }
                                */
                            } else {
                                this.tableType = 2;
                                for(let key in this.data['per']) {
                                    this.legendData.push({
                                        name: key,
                                        icon: 'bar',
                                        textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'},
                                    });
                                    this.tableData.push({
                                        name: key,
                                        data: this.data['per'][key]
                                    })
                                    this.seriesData.push({
                                        name: key,
                                        type: 'line',
                                        data: this.data['per'][key],
                                        smooth: true
                                    })
                                }

                                /*
                                this.option  = {
                                    legend: {
                                        data: this.legendData,
                                    },
                                    xAxis: {
                                        data: this.xAxisData
                                    },
                                    series: this.seriesData
                                }
                                */
                            }
                        }
                    )
                    .catch((error) => {
                        console.log(error);
                    }
                )
            },
            /*全不选与全选进行切换*/
            selectClick(indexSelect) {
                for(let i = 0; i < this.selectType.length; i++) {
                    if (indexSelect == i) {
                        this.selectType[i]['isSelectDisabled'] = true
                    } else {
                        this.selectType[i]['isSelectDisabled'] = false
                    }
                }
                if (indexSelect == 0) {
                    this.selectStatus = true;
                    this.searchData = '';
                    this.getData();
                } else if (indexSelect == 1) {
                    this.selectStatus = false;
                    this.searchData = '';
                    this.getData();
                }
            },
            /*时间区间选择*/
            timeClick(indexTime) {
                for(let i = 0; i < this.chooseTimeType.length; i++) {
                    if (indexTime == i) {
                        this.chooseTimeType[i]['isTimeDisabled'] = true
                    } else {
                        this.chooseTimeType[i]['isTimeDisabled'] = false
                    }
                }
                if (indexTime == 0) {
                    let smallStartTime = parseInt((new Date().getTime())/1000 - 3 * 60 * 60);
                    this.formTime = smallStartTime;
                    this.getData();
                } else if (indexTime == 1) {
                    let middleStartTime = parseInt((new Date().getTime())/1000 - 6 * 60 * 60);
                    this.formTime = middleStartTime;
                    this.getData();
                } else if (indexTime == 2) {
                    let bigStartTime = parseInt((new Date().getTime())/1000 - 12 * 60 * 60);
                    this.formTime = bigStartTime;
                    this.getData();
                } else {
                    let sumStartTime = 1;
                    this.formTime = sumStartTime;
                    this.getData();
                }
            },
            /*全部不选*/
            selectNotAll() {
                this.allDisabled = false;
                this.allNotDisabled = true;
                this.chooseNotAll = false;
                let obj = {}
                for (let i = 0; i < this.legendData.length; i++) {
                    obj[this.legendData[i]['name']] = false
                }
                this.option = {
                    legend: {
                        data: this.legendData,
                        selected: obj
                    },
                    xAxis: {
                        data: this.xAxisData
                    },
                    series: this.seriesData
                }
                // this.$emit("selectNotAll", false)
                // this.chooseState = false
                // this.$store.commit('updateChooseState', this.chooseState);
                /*
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myChart.showLoading(showLoadingDefault);
                this.$store.commit('openLoading');
                this.$store.commit('updateChooseState', this.chooseState);
                this.$store.dispatch('fetchLineFlightData', this.myChart)
                */
                /*
                let obj = {};
                let arr = this.myChart.getOption().legend[0].data
                for(let key in arr) {
                    obj[arr[key]['name']] = false;
                }
                console.log(obj);
                this.myChart.setOption({
                    legend: {
                        selected: obj
                    }
                })
                */
            },
            /*全选*/
            selectAll() {
                this.allDisabled = true;
                this.allNotDisabled = false;
                let obj = {}
                for(let i = 0; i < this.legendData.length; i++) {
                    obj[this.legendData[i]['name']] = true
                }
                this.option = {
                    legend: {
                        data: this.legendData,
                        selected: obj
                    },
                    xAxis: {
                        data: this.xAxisData
                    },
                    series: this.seriesData
                }

                // this.chooseState = true;
                // this.$store.commit('updateChooseState', this.chooseState);
                /*
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myChart.showLoading(showLoadingDefault);
                this.$store.commit('openLoading');
                this.$store.commit('updateChooseState', this.chooseState);
                this.$store.dispatch('fetchLineFlightData', this.myChart)
                */
                /*
                let obj = {};
                let arr = this.myChart.getOption().legend[0].data
                for(let key in arr) {
                    obj[arr[key]['name']] = true;
                }
                console.log(obj);
                this.myChart.setOption({
                    legend: {
                        selected: obj
                    }
                })
                */
            },
            selectSmall() {
                this.smallDisabled = true;
                this.middleDisabled = false;
                this.bigDisabled = false;
                this.sumDisabled = false;
                this.allDisabled = false;
                this.allNotDisabled = false;
                let smallStartTime = parseInt((new Date().getTime())/1000 - 3 * 60 * 60);
                this.formTime = smallStartTime;
                this.getData();

                // Second Try
                /*
                this.xAxisData = [];
                for(let i = 0; i < this.data['ts'].length; i++) {
                    if (smallStartTime < this.data['ts'][i]) {
                        let timeSmallNew = new Date(parseInt(this.data['ts'][i]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ')
                        this.xAxisData.push(timeSmallNew)
                    }
                }
                this.xAxisData = this.xAxisData.reverse()

                for(let key in this.seriesData) {
                    this.seriesData.push({
                        name: this.seriesData[key]['name'],
                        type: 'line',
                        data: this.seriesData[key]['data'].reverse()
                    })
                }
                console.log(this.seriesData);
                this.option = {
                    legend: {
                        data: this.legendData
                    },
                    xAxis: {
                        data: this.xAxisData
                    },
                    series: this.seriesData
                }
                */
                /* First Try */
                // this.$store.commit('updateSmallStartTime', smallStartTime);
                /*
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myChart.showLoading(showLoadingDefault);
                this.$store.commit('openLoading');
                this.$store.dispatch('fetchLineFlightData', this.myChart);
                */
            },
            selectMiddle() {
                this.smallDisabled = false;
                this.middleDisabled = true;
                this.bigDisabled = false;
                this.sumDisabled = false;
                let middleStartTime = parseInt((new Date().getTime())/1000 - 6 * 60 * 60);
                this.xAxisData = [];
                for(let i = 0; i < this.data['ts'].length; i++) {
                    if (middleStartTime < this.data['ts'][i]) {
                        let timeSmallNew = new Date(parseInt(this.data['ts'][i]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ')
                        this.xAxisData.push(timeSmallNew)
                    }
                }
                this.option = {
                    legend: {
                        data: this.legendData,
                    },
                    xAxis: {
                        data: this.xAxisData
                    },
                    series: this.seriesData
                }

                /*
                    this.legendData = [];
                    this.seriesData = [];
                    this.xAxisData = [];
                    for(let i = 0; i < this.data['ts'].length; i++) {
                        let timeNew = new Date(parseInt(this.data['ts'][i]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ');
                        this.xAxisData.push(timeNew);
                    }
                    for(let key in this.data['per']) {
                        this.legendData.push({
                            name: key,
                            icon: 'bar',
                            textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'},
                        });
                        this.seriesData.push({
                            name: key,
                            type: 'line',
                            data: this.data['per'][key]
                        })
                    }
                    this.option = {
                        legend: {
                            data: this.legendData
                        },
                        xAxis: {
                            data: this.xAxisData
                        },
                        series: this.seriesData
                    }
                */
                // this.$store.commit('updateSmallStartTime', middelStartTime);
                /*
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myChart.showLoading(showLoadingDefault);
                this.$store.commit('openLoading');
                this.$store.dispatch('fetchLineFlightData', this.myChart);
                */
            },
            selectBig() {
                this.smallDisabled = false;
                this.middleDisabled = false;
                this.bigDisabled = true;
                this.sumDisabled = false;
                let bigStartTime = parseInt((new Date().getTime())/1000 - 12 * 60 * 60);
                this.xAxisData = [];
                for(let i = 0; i < this.data['ts'].length; i++) {
                    if (bigStartTime < this.data['ts'][i]) {
                        let timeSmallNew = new Date(parseInt(this.data['ts'][i]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ')
                        this.xAxisData.push(timeSmallNew)
                    }
                }
                this.option  = {
                    legend: {
                        data: this.legendData,
                    },
                    xAxis: {
                        data: this.xAxisData
                    },
                    series: this.seriesData
                }

                // this.$store.commit('updateSmallStartTime', bigStartTime);
                /*
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myChart.showLoading(showLoadingDefault);
                this.$store.commit('openLoading');
                this.$store.dispatch('fetchLineFlightData', this.myChart);
                */
            },
            selectSum() {
                this.smallDisabled = false;
                this.middleDisabled = false;
                this.bigDisabled = false;
                this.sumDisabled = true;
                let sumStartTime = 0;
                this.xAxisData = [];
                for(let i = 0; i < this.data['ts'].length; i++) {
                    if (sumStartTime < this.data['ts'][i]) {
                        let timeSmallNew = new Date(parseInt(this.data['ts'][i]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ')
                        this.xAxisData.push(timeSmallNew)
                    }
                }
                this.option  = {
                    legend: {
                        data: this.legendData,
                    },
                    xAxis: {
                        data: this.xAxisData
                    },
                    series: this.seriesData
                }

                // this.$store.commit('updateSmallStartTime', sumStartTime);
                /*
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myChart.showLoading(showLoadingDefault);
                this.$store.commit('openLoading');
                this.$store.dispatch('fetchLineFlightData', this.myChart);
                */
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

                if (index == 0) {
                    this.showSelectAll = true;
                    this.allDisabled = false;
                    this.allNotDisabled = false;
                    this.getData();
                    /*
                    this.legendData = [];
                    this.seriesData = [];
                    this.showSelectAll = true;
                    this.allDisabled = false;
                    this.allNotDisabled = false;
                    this.xAxisData = [];
                    for(let i = 0; i < this.data['ts'].length; i++) {
                        let timeNew = new Date(parseInt(this.data['ts'][i]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ');
                        this.xAxisData.push(timeNew);
                    }
                    for (let key in this.data['num15']) {
                        this.legendData.push({
                            name: key,
                            icon: 'bar',
                            textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'},
                        });
                        this.seriesData.push({
                            name: key,
                            type: 'line',
                            data: this.data['num15'][key]
                        })
                    }

                    this.option = {
                        legend: {
                            data: this.legendData,
                        },
                        xAxis: {
                            data: this.xAxisData
                        },
                        series: this.seriesData
                    }
                    */
                } else if (index == 1) {
                    this.showSelectAll = false;
                    this.getData();
                    /*
                    this.legendData = [];
                    this.seriesData = [];
                    this.showSelectAll = false;
                    let arr = [];
                    let sum = 0;
                    this.xAxisData = [];
                    for (let i = 0; i < this.data['ts'].length; i++) {
                        let timeNew = new Date(parseInt(this.data['ts'][i]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ');
                        this.xAxisData.push(timeNew);
                    }
                    for (let num = 0; num < this.data['num15']['BE'].length; num ++) {
                        sum = 0;
                        for(let key in this.data['num15']) {
                            if(this.data['num15'][key][num] == undefined) {
                                this.data['num15'][key][num] = 0;
                            }
                            sum += this.data['num15'][key][num]
                        }
                        arr.push(sum);
                    }
                    this.seriesData.push({
                        name: '总数',
                        type: 'line',
                        data: arr
                    })
                    this.option = {
                        legend: {
                            show: false
                        },
                        xAxis: {
                            data: this.xAxisData
                        },
                        series: this.seriesData
                    }
                    */
                } else {
                    this.showSelectAll = true;
                    this.allDisabled = false;
                    this.allNotDisabled = false;
                    this.getData();
                    /*
                    this.showSelectAll = true;
                    this.legendData = [];
                    this.seriesData = [];
                    this.allDisabled = false;
                    this.allNotDisabled = false;
                    this.xAxisData = [];
                    for(let i = 0; i < this.data['ts'].length; i++) {
                        let timeNew = new Date(parseInt(this.data['ts'][i]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ');
                        this.xAxisData.push(timeNew);
                    }
                    for(let key in this.data['per']) {
                        this.legendData.push({
                            name: key,
                            icon: 'bar',
                            textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'},
                        });
                        this.seriesData.push({
                            name: key,
                            type: 'line',
                            data: this.data['per'][key]
                        })
                    }

                    this.option = {
                        legend: {
                            data: this.legendData
                        },
                        xAxis: {
                            data: this.xAxisData
                        },
                        series: this.seriesData
                    }
                    */
                }

                /*
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
                */
            },

            /*
            selectAll(msg) {

            },
            */
            init() {
                this.legendArr = this.myLineChart.getOption().series;
                this.legendArr.forEach((data) => {
                    data.selected = true;
                })
            }
        },

        components: {
            'v-echart-header': echartHeader,
            'v-line-new': lineNew,
            'v-filter': filter,
            'v-timer': timer,
            'v-table': table
        },

        destroyed () {
            clearInterval()
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
    .chart-price {
        width: 80%;
        /*height: 100%;*/
        height: 91%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        float: right;
    }
    @media screen and (max-width: 1366px) {
        .chart-price {
            height: 88%;
        }
    }

    .title {
        position: relative;
        display: flex;
        width: 100%;
        height: 50px;
        line-height: 50px;
        // background-color: rgba(32, 32, 35, 0.2);
        color: #fff;
    }

    .title h1 {
        flex: 0 0 200px;
        font-size: 12px;
        font-weight: bold;
        padding-left: 20px;
        font-size: 20px;
    }

    .title ul {
        position: absolute;
        right: 0;
        padding-left: 20px;
        margin-top: -2px;
    }

    .title ul li {
        display: inline-block;
        min-width: 59px;
        padding: 2px 10px 2px 10px;
        line-height: 20px;
        text-align: center;
        font-size: 11px;
    }

    .title ul li:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .title ul li:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }

    .title ul li+li {
        margin-left: -1px;
    }

    .chart-select-all, .chart-select-time, .chart-select-flesh, .chart-select-week, .chart-select-month, .chart-select-range {
        margin-right: 30px;
        height: 100%;
    }

    .chart-select-all button {
        background: green;
    }
    .chart-select-time button {
        background: blue;
    }
    .chart-select-flesh button {
        background: red;
    }
    .chart-select-week button {
        background: #82D900;
    }
    .chart-select-month button {
        background: #FFD1A4;
    }
    .chart-select-range button {
        background: #FF8000;
    }

    button {
        display: inline-block;
        border: 0;
        outline: 0;
        color: #fff;
        font-size: 12px;
        font-weight: 400;
        padding: 3px 15px;
        margin-right: 10px;
        cursor: pointer;
        height: 24px;
        line-height: 18px;
    }
    button:disabled{
        border: 1px solid #333;
        background-color: #333;
        color:#ACA899;
    }
    //IE8-
    button[disabled]{
        border: 1px solid #333;
        background-color: #333;
        color:#ACA899;
    }
    //IE6 Using Javascript to add CSS class "disabled"
    * html button.disabled{
        border: 1px solid #333;
        background-color: #333;
        color:#ACA899;
    }
    .price-input {
        width: 100%;
        padding: 0px 0 0 15px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        outline: none;
        border: none;
        border: 1px solid green;
        background: none;
        color: #fff;
    }
</style>
