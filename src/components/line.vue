<template lang="html">
    <div class="line">
        <v-echart-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-echart-header>
        <div class="filter">
            <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
        </div>
        <div class="main" id="lineChart"></div>
    </div>
</template> 

<script>
    import echarts from 'echarts';
    import echartHeader from '../components/echartHeader'
    import filter from '../components/filter'
    import {lineOption} from '../options/lineOptions'

    export default {
        data() {
            return {
                legendArr: [],
                color: this.$store.state.color,
                myChart: {},
                name: '折线图',
                firstData: {},
                tacketURL: 'tickets_15',
                startDateValue: '',
                endDateValue: '',
            }
        },

        methods: {
            init() {
              this.legendArr = this.myChart.getOption().series
              this.legendArr.forEach((data) => {
                data.selected = true;
              })
              this.$root.charts.push(this.myChart)
              window.addEventListener('resize', function() {
                this.myChart.resize()
              }.bind(this))
            },

            getMyChartData() {
                this.$axios.get(this.tacketURL).then((res) => {
                    const ret = res.data;
                    this.firstData = ret;
                    this.$nextTick(() => {
                      this.getMyChartDataLast();
                    })
                })
            },

            getMyChartDataLast() {
                this.$axios.get(this.tacketURL).then((res) => {
                    const ret = res.data
                    if (ret.status == 0) {
                        let xAxisDataLast = ret.data.x
                        let yAxisDataLast = ret.data.y
                        this.myChart.setOption({
                            color: this.color,
                            xAxis: [
                            {
                                data: xAxisDataLast
                            }],
                            series: [{
                                data: this.firstData.data.y
                            }, {
                                data: yAxisDataLast
                            }]
                        })
                    }
                })
            }
        },

        components: {
            'v-echart-header': echartHeader,
            'v-filter': filter
        },

        mounted() {
            this.myChart = echarts.init(document.getElementById('lineChart'));
            this.myChart.setOption(lineOption);
            this.init();
            this.getMyChartData();
        }
    }
</script>

<style scoped>
    .line {
        height: 800px;
        background: url('../assets/images/bg.png') no-repeat;
        background-size: 100% 100%;
        color: #fff;
    }

    .line .main {
        width: 100%;
        height: calc(100% - 100px);
        margin-top: -15px;
    }
</style>
