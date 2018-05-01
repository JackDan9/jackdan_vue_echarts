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
            xAxisData: {
                type: Array,
                default: []
            }
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
            this.$watch('xAxisData', options => {
                if (!this.myChart && xAxisData) {
                    this.init()
                } else {
                   console.log(2);
                }
            }, { deep:!this.watchShallow })
        },

        mounted() {
            this.myChart = echarts.init(document.getElementById(this.columnId));
            let myChartColumn = this.myChart;
            this.$emit('chartColumn', myChartColumn);
            this.myChart.setOption(columnOption);

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
