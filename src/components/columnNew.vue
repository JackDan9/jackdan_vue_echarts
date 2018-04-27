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
            xAxisData: {
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
            // this.myChart = echarts.init(document.getElementById(this.columnNewId));
            // this.myChart.setOption(columnNewOption, true);
            // window.addEventListener('resize', this.myChart.resize);
            this.init();
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

        methods: {
            init() {
                // if (this.myChart) {
                //     return
                // }
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
        height: 85%;
    }
</style>