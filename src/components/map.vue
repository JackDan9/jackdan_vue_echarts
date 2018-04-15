<template lang="html">
    <div class="map-container">
        <div v-bind:id="this.id" ></div>
    </div>
</template>

<script>
    import echarts from 'echarts';

    export default {
        props: {
            id: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                myChart: {},
                name: '',
            }
        },
        methods: {
            getOption () {
                let option = {
                    visualMap: {
                        show: false,
                        min: 0,
                        max: 100,
                        right: 40,
                        top: 'bottom',
                        text: ['高', '低'], // 文本, 默认为数值文本
                        inRange: {
                            color: ['#a4dafe', '#1f589b']
                        },
                        textStyle: {
                            color: '#fff'
                        },
                        calculable: true
                    },
                    grid: {
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                    },
                    series: [{
                        type: 'map',
                        mapType: '安阳市',
                        label: {
                            normal: {
                                show: true,
                                textStyle: {
                                    color: '#fff'
                                }
                            },
                            emphasis: {
                                textStyle: {
                                    color: '#000'
                                }
                            }
                        },
                        itemStyle: {
                            normal: {
                                borderWidth: 2,
                                borderColor: '#fff',
                                areaColor: '#fff',
                            },
                            emphasis: {
                                areaColor: '#a4dafe'
                            }
                        },
                        animation: false,
                        data: [
                            {name: '北关区', value: 100},
                            {name: '文峰区', value: 100},
                            {name: '殷都区', value: 100},
                            {name: '龙安区', value: 100},
                            {name: '林州市', value: 100},
                            {name: '安阳县', value: 100},
                            {name: '汤阴县', value: 100},
                            {name: '滑县', value: 100},
                            {name: '内黄县', value: 100}
                        ]
                    }]
                }
                return option; 
            },
            clickMap(params) {
                this.$emit('clickMap', params.name);
            }
        },
        mounted() {
            let geoJson = require('../../static/data/map/map.json');
            this.myChart = echarts.init(document.getElementById(this.id));
            echarts.registerMap('安阳市', geoJson);
            this.myChart.setOption(this.getOption());
            this.myChart.on('click', this.clickMap);

            window.addEventListener('resize', this.myChart.resize);
        }
    }
</script>

<style scoped>
    .map-container {
        position: relative;
        width: 100%;
        height: 100%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
    }
    #map {
        width: 100%;
        height: 100%;
        opacity: 0.9;
    }
</style>