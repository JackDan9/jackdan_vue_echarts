<template lang="html">
    <div class="columnChart">
        <div class="main" v-bind:id="columnId"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import {columnOption} from '../options/columnOptions';

    export default {
        props: {
            columnId: {
                type: String,
                default: ''
            }
        },
        data() {
            return {
                color: this.$store.state.color,
                myChart: {}
            }
        },

        methods: {
        },

        components: {
        },

        created() {
            this.$watch('legendData.xAxisData.seriesData', options => {
                if (!this.myChart && option) {
                    this.init()
                } else {
                   
                }
            })
        },

        mounted() {
            this.myChart = echarts.init(document.getElementById(this.columnId));
            let myChartColumn = this.myChart;
            this.$emit('chartColumn', myChartColumn);
            this.myChart.setOption(columnOption);

            window.addEventListener('resize', this.myChart.resize);
        }
    }
</script>

<style scoped>
    .columnChart {
        height: 800px;
        background: url('../assets/images/bg.png') no-repeat;
        // background: none;
        background-size: 100% 100%;
        color: #fff;
    }

    .columnChart .main {
        width: 100%;
        height: 93%;
        margin-top: -3px;
    }
</style>
