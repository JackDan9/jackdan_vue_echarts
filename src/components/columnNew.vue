<template lang="html">
    <div class="column-chart">
        <div 
            class="main"
            v-bind:id="columnNewId">
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import { columnNewOption } from '../options/columnNewOptions';
    export default {
        props: {
            columnNewId: {
                type: String,
                default: ''
            },
            title: {
                type: String,
                default: ''
            },
            subtitle: {
                type: String,
                default: ''
            },
            xAxisData: {
                type: Array,
                default: []
            },
            seriesData: {
                type: Array,
                default: []
            },
            legendData: {
                type: Array,
                default: []
            }
        },

        data() {
            return {
                myChart: {}
            }
        },

        mounted() {
            this.init();
        },

        created() {
            this.$watch('xAxisData', options => {
                if (!this.myChart && xAxisData) {
                    this.init()
                } else {
                    this.myChart = echarts.init(document.getElementById(this.columnNewId));
                    this.myChart.setOption({
                        title: {
                            text: this.title,
                            subtext: this.subtitle,
                        },
                        legend: {
                            data: this.legendData
                        },
                        xAxis: [
                            {
                                data: this.xAxisData
                            }
                        ],
                        series: this.seriesData
                    })
                }
            }, { deep:!this.watchShallow })
        },

        methods: {
            init() {
                this.myChart = echarts.init(document.getElementById(this.columnNewId));
                this.myChart.setOption(columnNewOption, true);

                window.addEventListener('resize', this.myChart.resize);
            }
        }
    }
</script>

<style scoped>
    .column-chart {
        position: relative;
        width: 100%;
        height: 100%;
    }

    .column-chart .main {
        width: 100%;
        height: 75%;
        margin-top: 20px;
    }

    @media screen and (max-width: 1366px) {
        .column-chart .main {
            height: 66%;
        }
    }
</style>