<template lang="html">
    <div class="compare-column-chart">
        <div 
            :id="compareColumnId">
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import { compareOptions } from '../options/compareOptions';

    export default {
        props: {
            compareColumnId: {
                type: String,
                default: ''
            },
            lossColumnData: {
                type: Array,
                default: []
            },
            profitColumnData: {
                type: Array,
                default: []
            },
            legendColumnData: {
                type: Array,
                default: []
            },
            xAxisColumnData: {
                type: Array,
                default: []
            }
        },
        data () {
            return {
                myChart: {}
            }
        },
        methods: {
            getOption() {
                // var timeData = [
                //     '2009/6/12 2:00', '2009/6/12 3:00', '2009/6/12 4:00', '2009/6/12 5:00', '2009/6/12 6:00', '2009/6/12 7:00', '2009/6/12 8:00', '2009/6/12 9:00', '2009/6/12 10:00', '2009/6/12 11:00', '2009/6/12 12:00', '2009/6/12 13:00', '2009/6/12 14:00', '2009/6/12 15:00', '2009/6/12 16:00', '2009/6/12 17:00', '2009/6/12 18:00', '2009/6/12 19:00', '2009/6/12 20:00', '2009/6/12 21:00', '2009/6/12 22:00', '2009/6/12 23:00',
                // ];

                // timeData = timeData.map(function (str) {
                //     return str.replace('2009/', '');
                // });
                // var timeData = ['1', '2', '3', '4', '5', '6'];

                let option = {
                    title: {
                        show: false,
                        text: '雨量流量关系图',
                        subtext: '数据来自西安兰特水电测控技术有限公司',
                        x: 'center'
                    },
                    tooltip: {
                        show: true,
                        trigger: 'axis',
                        axisPointer: {
                            animation: false
                        }
                    },
                    legend: {
                        show: false,
                        data:['流量','降雨量'],
                        x: 'left'
                    },
                    toolbox: {
                        show: false,
                        feature: {
                            dataZoom: {
                                yAxisIndex: 'none'
                            },
                            restore: {},
                            saveAsImage: {}
                        }
                    },
                    axisPointer: {
                        link: {xAxisIndex: 'all'}
                    },
                    // dataZoom: [
                    //     {
                    //         show: true,
                    //         realtime: true,
                    //         start: 30,
                    //         end: 70,
                    //         xAxisIndex: [0, 1]
                    //     },
                    //     {
                    //         show: true,
                    //         type: 'inside',
                    //         realtime: true,
                    //         start: 30,
                    //         end: 70,
                    //         xAxisIndex: [0, 1]
                    //     }
                    // ],
                    grid: [{
                        left: 70,
                        right: 10,
                        height: '35%'
                    }, {
                        left: 70,
                        right: 10,
                        top: '55%',
                        height: '35%'
                    }],
                    xAxis: [
                        {
                            type: 'category',
                            boundaryGap: true,
                            axisLine: {onZero: true},
                            axisLabel: {
                                interval: 0,
                                color: '#fff',
                                fontSize: 12
                            },
                            data: []
                        },
                        {
                            gridIndex: 1,
                            type: 'category',
                            boundaryGap: true,
                            axisLine: {onZero: true},
                            axisLabel: {
                                interval: 0,
                                color: '#fff',
                                fontSize: 12
                            },
                            data: [],
                            position: 'top'
                        }
                    ],
                    yAxis : [
                        {
                            name : '盈利(元)',
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            type : 'value',
                            axisLabel: {
                                color: '#fff',
                                fontSize: 14
                            },
                            // max : 500
                        },
                        {
                            gridIndex: 1,
                            name : '亏损(元)',
                            nameLocation: 'start',
                            nameTextStyle: {
                                color: '#fff',
                                fontSize: 14
                            },
                            type : 'value',
                            axisLabel: {
                                color: '#fff',
                                fontSize: 14
                            },
                            inverse: false
                        }
                    ],
                    series : [
                        {
                            name:'盈利',
                            // type:'line',
                            type: 'bar',
                            // symbolSize: 8,
                            hoverAnimation: false,
                            data:[]
                        },
                        {
                            name:'亏损',
                            // type:'line',
                            type: 'bar',
                            xAxisIndex: 1,
                            yAxisIndex: 1,
                            // symbolSize: 8,
                            // hoverAnimation: false,
                            data: []
                        }
                    ]
                };
                return option;
            },
        },
        created() {
            this.$watch('legendColumnData.lossColumnData.profitColumnData.xAxisColumnData', options => {
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
                    this.myChart.setOption({
                        xAxis: [
                            {
                                data: this.xAxisColumnData
                            },
                            {
                                data: this.xAxisColumnData
                            }
                        ],
                        series: [
                            {
                                data: this.profitColumnData
                            },
                            {
                                data: this.lossColumnData
                            }
                        ]
                    })
                }, 1000); 
            }, { deep:!this.watchShallow })
        },
        mounted() {
            this.myChart = echarts.init(document.getElementById(this.compareColumnId));
            this.myChart.setOption(this.getOption(), true);
            window.addEventListener('resize', this.myChart.resize);
        },
    }
</script>

<style scoped>
    .compare-column-chart {
        position: relative;
        width: 100%;
        height: 100%;
    }
    #compareColumn {
        width: 100%;
        height: 93%;
    }
</style>