<template lang="html">
    <div class="column-chart">
        <div 
            class="main" 
            v-bind:id="columnId">    
        </div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import { columnOption } from '../options/columnOptions';

    export default {
        props: {
            columnId: {
                type: String,
                default: ''
            },
            columnData: {
                type: Array,
                default: []
            }
            // xAxisData: {
            //     type: Array,
            //     default: []
            // }
        },

        data() {
            return {
                color: this.$store.state.color,
                myChart: {}
            }
        },

        components: {
        },

        created() {
            this.$watch('columnData', options => {
                let nameData = [];
                let seriesData = [];
                let seriesType = [];
                this.columnData[0].map((item, index) => {
                    nameData.push(item);
                    if(index > 0) {
                        seriesType.push({
                            type: 'bar'
                        })
                    }
                })
                // for(let i = 0; i < showData[0].length; i++) {
                //     nameData.push(showData[0][i]);
                // }
                seriesData = this.columnData.slice(1);
                this.myChart = echarts.init(document.getElementById(this.columnId));
                this.myChart.setOption(columnOption, true);
                this.myChart.setOption({
                    dataset: {
                        dimensions: nameData,
                        source: seriesData
                    },
                    series: seriesType
                })
            }, { deep:!this.watchShallow })
        },

        mounted() {
            // this.myChart = echarts.init(document.getElementById(this.columnId));
            // this.myChart.setOption(columnOption, true);
            // let myChartColumn = this.myChart;
            // this.$emit('chartColumn', myChartColumn);

            window.addEventListener('resize', this.myChart.resize);
        },
        
        methods: {
            init() {
                if(this.myChart) {
                    return
                }  
                this.myChart = echarts.init(document.getElementById(this.columnId))
                this.myChart.setOption(columnOption);
            }
        },
    }
</script>

<style scoped>
    .column-chart {
        position: relative;
        width: 100%;
        height: 100%;
    }

    #columnList {
        width: 100%;
        height: 93%;
    }

    #columnChart {
        width: 100%;
        height: 93%;
    }
</style>
