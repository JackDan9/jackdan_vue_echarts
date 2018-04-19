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
        <div id="priceLine"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import echartHeader from '../components/echartHeader';

    export default {
        props: {
            lineId: {
                type: String,
                default: ''
            },
            option: {
                type: Object,
                default: {}
            },
            name: {
                type: String,
                default: '15分钟数据'
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
                            data:[150, 232, 201, 154, 190, 330, 410]
                        }
                    ]
                }
                return option;
            },
            init() {
                if(this.myChart) {
                    return
                }
                this.myChart = echarts.init(document.getElementById("priceLine"));
                this.myChart.setOption(this.getOption(), true);
            }
        },
        created () {
            this.$watch('option', options => {
                if(!this.myChart && option) {
                    this.init()
                } else {
                    let optionData = JSON.parse(JSON.stringify(this.option));
                    this.myChart = echarts.init(document.getElementById("priceLine"));
                    this.myChart.setOption(this.getOption(), true);
                    let showLoadingDefault = {
                        text: 'Loading...',
                        color: '#23531',
                        textColor: '#fff',
                        maskColor: '#272D3A',
                        zlevel: 0,
                    }
                    this.myChart.showLoading(showLoadingDefault);
                    this.myChart.setOption(optionData);
                    this.myChart.hideLoading();
                }
            }, { deep: !this.watchShallow })
        },
        mounted() {
            if (this.option) {
                this.init()
            }
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
            'v-echart-header': echartHeader
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