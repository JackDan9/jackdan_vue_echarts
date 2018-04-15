<template lang="html">
    <div class="pie-container">
        <div v-bind:id="this.pieId"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        props: {
            pieId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                myChart: {}
            }
        },

        methods: {
            getOption() {
                let option = {
                    // backgroundColor: '#2c343c',
                    // backgroundColor: 'none',

                    title: {
                        text: '各部门数据对比图',
                        left: 'center',
                        top: 20,
                        textStyle: {
                            color: '#fff'
                        }
                    },

                    tooltip: {
                        trigger: 'item',
                        formatter: "{a} <br/>{b} : {c} ({d}%)"
                    },

                    visualMap: {
                        show: false,
                        min: 80,
                        max: 600,
                        inRange: {
                            colorLightness: [0, 1]
                        }
                    },

                    series: [
                        {
                            name: '数据来源',
                            type: 'pie',
                            radius: '55%',
                            center: ['50%', '50%'],
                            data: [
                                {name:'公安部门', value:335},
                                {name:'交通部门', value:310},
                                {name:'教育局', value:274},
                                {name:'法院', value:235},
                                {name:'扶贫办', value:400}
                            ].sort(function (a, b) { return a.value - b.value}),
                            roseType: 'angle',
                            label: {
                                normal: {
                                    textStyle: {
                                        color: 'rgba(255, 255, 255, 1)'
                                    }
                                }
                            },
                            labelLine: {
                                normal: {
                                    lineStyle: {
                                        color: 'rgba(255, 255, 255, 1)'
                                    },
                                    smooth: 0.2,
                                    length: 10,
                                    length2: 20
                                }
                            },
                            itemStyle: {
                                color: 'blue',
                                shadowBlur: 200,
                                shadowColor: 'rgba(0, 0, 0, 0.5)'
                            }
                        }
                    ]
                }
                return option;
            }
        },

        mounted() {
            this.myChart = echarts.init(document.getElementById(this.pieId));
            this.myChart.setOption(this.getOption());

            window.addEventListener('resize', this.myChart.resize);
        }
    }
</script>

<style scoped>
    .pie-container {
        position: relative;
        width: 100%;
        // margin-left: 2%;
        height: 100%;
        border-top: 1px solid #ebeef5;
        border-bottom: 1px solid #ebeef5;
        // border: 1px solid #ebeef5;
        // border-radius: 4px;
    }
    #pie {
        width: 100%;
        height: 100%;
        opacity: 0.9;
    }
</style>