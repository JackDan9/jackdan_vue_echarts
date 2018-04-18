<template lang="html">
    <div class="line-container">
        <div v-bind:id="this.lineId"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        props: {
            lineId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                legendArr: [],
                myChart: {}
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
                        show: true,
                        type: 'scroll',
                        // orient: 'vertical',
                        left: 40,
                        right: 0,
                        top: 0,
                        bottom: 0,
                        inactiveColor: '#ACA899',
                        pageIconColor: '#aaa',
                        pageIconInactiveColor: '#333',
                        pageTextStyle: {
                            color: '#aaa',
                            fontStyle: 'normal',
                            fontWeight: 400
                        },
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
                                let downName = params.substring(10, params.length);
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
                            stack:'总量',
                            data:[150, 232, 201, 154, 190, 330, 410]
                        },
                        {
                            name:'法院',
                            type:'line',
                            stack:'总量',
                            data:[320, 332, 301, 334, 390, 330, 320]
                        },
                        {
                            name:'扶贫办',
                            type:'line',
                            stack:'总量',
                            data:[820, 932, 901, 934, 1290, 1330, 1320]
                        },
                    ]
                /*
                    legend: {
                        // color: 'rgba(255,255,255,1)',
                        textStyle: {
                            color: 'rgba(255,255,255,1)'
                        },
                        inactiveColor: '#333'
                    },
                    tooltip: {},
                    dataset: {
                        source: [
                            ['Matcha Latte', 43.3, 85.8, 93.7],
                            ['Milk Tea', 83.1, 73.4, 55.1],
                            ['Cheese Cocoa', 86.4, 65.2, 82.5],
                            ['Walnut Brownie', 72.4, 53.9, 39.1]      
                        ]
                    },
                    xAxis: {
                        type: 'category',
                        axisLabel: {
                            textStyle: {
                                color: 'white'
                            }
                        }
                    },
                    yAxis: {
                        axisLabel: {
                            textStyle: {
                                color: 'white',
                                fontSize: 14
                            }
                        },
                    },
                    // Declare several bar series, each will be mapped
                    // to a column of dataset.source by default.
                    series: [
                        {type: 'line'},
                        {type: 'line'},
                        {type: 'line'}
                    ]
                */
                }
                return option;
            }
        },

        mounted() {
            this.myChart = echarts.init(document.getElementById(this.lineId));
            let myChartLine = this.myChart;
            this.$emit('chartLine', myChartLine);
            this.$emit('chartFlightLine', myChartLine);
            this.myChart.setOption(this.getOption());

            window.addEventListener('resize', this.myChart.resize);
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
        height: 88%;
        opacity: 0.9;
    }
</style>