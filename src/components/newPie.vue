<template lang="html">
    <div class="new-pie-container">
        <div id="newPieId"></div>
    </div>
</template>

<script>
    import echarts from 'echarts'
    import { newPieOptions } from '../options/newPieOptions'

    export default {
        props: {
            legendData: {
                type: Array,
                default: []
            },
            seriesData: {
                type: Array,
                default: []
            }
        },
        data() {
            return {
                myChart: {}
            }
        },
        /*
        mounted() {
            this.myChart = echarts.init(document.getElementById("newPieId"))
            this.myChart.setOption(newPieOptions)

            window.addEventListener('resize', this.myChart.resize)
        },
        */
        mounted() {
            this.init();
        },
        created() {
            this.$watch('legendData.seriesData', options => {
                if (!this.myChart && legendData.seriesData) {
                    this.init()
                } else {
                    this.myChart = echarts.init(document.getElementById("newPieId"))
                    this.myChart.setOption(newPieOptions, true)
                    this.myChart.setOption({
                        legend: {
                            data: this.legendData
                        },
                        series: [
                            {
                                data: this.seriesData
                            }
                        ]
                    })
                }
            }, { deep: !this.watchShallow })
        },
        methods: {
            init() {
                if (this.myChart) {
                    return
                }
                this.myChart = echarts.init(document.getElementById("newPieId"))
                this.myChart.setOption(newPieOptions, true)

                window.addEventListener('resize', this.myChart.resize)
            }
        }
    }
</script>


<style scoped>

    .new-pie-container {
        position: relative;
        width: 100%;
        height: 56%;
        border-top: 1px solid #ebeef5;
    }
    @media screen and (max-width: 1366px) {
        .new-pie-container {
            height: 41%;
        }
    }
    #newPieId {
        width: 100%;
        height: 100%;
        opacity: 0.9;
    }
</style>

