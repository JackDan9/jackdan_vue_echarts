<template lang="html">
    <div class="line-container">
    <!--
        <v-echart-header
            :name="name"
            :showSelectAll="showSelectAll"
            :showSelectTimeAll="showSelectTimeAll"
            :legendArr="legendArr"
            :showFilter="showFilter"
            :myChart="this.myChart"
        ></v-echart-header>
    -->
        <div class="line-filter">
            <!--
            <div class="product-wrapper">
                <div class="products">
                    <div class="pro">
                        航线<i class="arrow"></i>
                    </div>
                </div>

                <div class="pro-list">
                    <ul>
                        <li>
                            <span class="checkbox"></span>
                            <span class="name">BX</span>
                        </li>
                    </ul>
                </div>
            </div>
            -->

            <v-filter 
                :myChart="myChart"
                :lineId="lineId"
                :optionNew="optionNew"
                v-if="myChart._dom">    
            </v-filter>
        </div>

        <!-- <div id="priceLine"></div> -->
        <div :id="lineId"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import echartHeader from '../components/echartHeader'
    import filter from '../components/filter'

    export default {
        props: {
            lineId: {
                type: String,
                default: ''
            },
            name: {
                type: String,
                default: '15分钟数据'
            },
            xAxisData: {
                type: Array,
                default: []
            },
            legendData: {
                type: Array,
                default: []
            },
            seriesData: {
                type: Array,
                default: []
            },
            selectStatus: {
                type: Boolean,
                default: true
            }
        },
        data() {
            return {
                legendArr: [],
                myChart: {},
                // option: {}
                obj: {},
                optionNew: {}
            }
        },
        methods: {
            getOption() {
                let option = {
                    title: {
                        show: false
                    },
                    tooltip: {
                        show: true,
                        trigger: 'axis'
                        // trigger: 'item'
                    },
                    legend: {
                        show: false,
                        type: 'scroll',
                        orient: 'vertical',
                        // left: 40,
                        right: -3,
                        top: 0,
                        bottom: 10,
                        // backgroundColor: 'rgba(128, 128, 128, 0.5)', 
                        inactiveColor: '#ACA899',
                        borderRadius: 5,
                        pageIconColor: '#aaa',
                        pageFormatter: '{current}',
                        pageButtonItemGap: 0,
                        pageIconInactiveColor: '#333',
                        pageIconSize: [30, 11],
                        pageTextStyle: {
                            color: '#aaa',
                            fontStyle: 'normal',
                            fontWeight: 400
                        },
                        animation: true,
                        animationDurationUpdate: 0,
                        data: []
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            saveAsImage: {}
                        }
                    },

                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        axisLine: {
                            show: true
                        },
                        axisTick: {
                            show: true
                        },
                        nameTextStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 1)',
                                fontSize: 14
                            },
                            formatter: function(params) {
                                let upName = params.substring(0,9);
                                let downName = params.substring(9, params.length);
                                let newParamsName = "";
                                newParamsName = downName + "\n" + upName;
                                return newParamsName
                            }
                        },
                        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
                    },

                    yAxis: {
                        axisLine: {
                            show: true
                        },
                        nameLocation: 'end',
                        nameGap: 20,
                        nameRotate: 0,
                        axisTick: {
                            show: true
                        },
                        splitLine: {
                            show: false,
                            lineStyle: {
                                color: ['rgba(230, 230, 230, 0.2)']
                            }
                        },
                        axisLabel: {
                            textStyle: {
                                color: 'rgba(255, 255, 255, 1)',
                                fontSize: 14
                            }
                        },
                        nameTextStyle: {
                            color: 'rgba(255, 255, 255, 1)'
                        },
                        type: 'value'
                    },

                    dataZoom: [
                        {
                            type: 'inside',
                            xAxisIndex: [0],
                            start: 0,
                            end: 100
                        },
                        {
                            type: 'inside',
                            yAxisIndex: [0],
                            start: 0,
                            end: 100
                        }
                    ],

                    series: [
                        {
                            name:'教育局',
                            type:'line',
                            data:[150, 232, 201, 154, 190, 330, 410],
                            smooth:true
                        }
                    ]
                }
                return option;
            },
            init() {
                if(this.myChart) {
                    return
                }
                // this.myChart = echarts.init(document.getElementById("priceLine"));
                this.myChart = echarts.init(document.getElementById(this.lineId));
                this.myChart.setOption(this.getOption(), true);
            }
        },
        created () {
            this.$watch('legendData.xAxisData.seriesData.selectStatus', options => {
                if (!this.myChart && option) {
                    this.init()
                } else {
                    if (this.selectStatus) {
                        this.obj = {}
                        for (let i = 0; i < this.legendData.length; i++) {
                            this.obj[this.legendData[i]['name']] = this.selectStatus
                        }
                        this.optionNew = {
                            legend: {
                                data: this.legendData,
                                selected: this.obj
                            },
                            xAxis: {
                                data: this.xAxisData
                            },
                            series: this.seriesData
                        }
                    } else if (!this.selectStatus) {
                        this.obj = {}
                        for(let i = 0; i < this.legendData.length; i++) {
                            this.obj[this.legendData[i]['name']] = this.selectStatus
                        }
                        this.optionNew = {
                            legend: {
                                data: this.legendData,
                                selected: this.obj
                            },
                            xAxis: {
                                data: this.xAxisData
                            },
                            series: this.seriesData
                        }
                    }


                    /*
                    let optionNew = {
                        legend: {
                            data: this.legendData,
                            selected: this.selectedObj
                        },
                        xAxis: {
                            data: this.xAxisData
                        },
                        series: this.seriesData
                    }
                    */

                    // let optionData = JSON.parse(JSON.stringify(optionNew));
                    // this.myChart = echarts.init(document.getElementById("priceLine"));
                    this.myChart = echarts.init(document.getElementById(this.lineId));
                    this.myChart.setOption(this.getOption(), true);
                    let showLoadingDefault = {
                        text: 'Loading...',
                        color: '#23531',
                        textColor: '#fff',
                        maskColor: '#272D3A',
                        zlevel: 0,
                    }
                    this.myChart.showLoading(showLoadingDefault);
                    setTimeout(() => {
                        this.myChart.hideLoading();
                        this.myChart.setOption(this.optionNew);
                    }, 1000);
                    /*
                    this.myChart.setOption(optionNew);
                    this.myChart.hideLoading();
                    */
                }
            }, { deep: !this.watchShallow })
        },
        mounted() {
            if (this.option) {
                this.init()
            }
            // console.log(this.option);
            /*
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myChart.showLoading(showLoadingDefault);
            this.myChart.setOption(JSON.parse(JSON.stringify(this.option)));
            this.myChart.hideLoading();
            let myChartLine = this.myChart;
            this.$emit('chartLine', myChartLine);
            this.$emit('chartFlightLine', myChartLine);
            this.myChart.setOption(this.getOption());
            */
            window.addEventListener('resize', this.myChart.resize);
        },
        components: {
            'v-echart-header': echartHeader,
            'v-filter': filter
        }
    }
</script>

<style scoped>
    .line-container {
        position: relative;
        width: 100%;
        height: 100%;
    }
    #lineId {
        width: 100%;
        height: 100%;
        opacity: 0.9;
    }
    #priceLine {
        width: 100%;
        height: 93%;
        opacity: 0.9;
    }
    #homeLine {
        width: 100%;
        height: 93%;
        opacity: 0.9;
    }
    #moneyLine {
        width: 100%;
        height: 93%;
        opacity: 0.9;
    }
    .line-filter {
        position: relative;
        display: flex;
        padding: 5px 0 0 28px;
        font-size: 12px;
        line-height: 11px;
        color: #fff;
        z-index: 9999;
    }
</style>
