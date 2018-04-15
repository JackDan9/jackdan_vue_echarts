<template lang="html">
    <div class="multipleColumn">
        <v-echart-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-echart-header>
        <div class="filter">
            <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
        </div>
        <div class="main" id="multipleColumnChart"></div>
    </div>
</template>

<script>
    import echarts from 'echarts';
    import echartHeader from '../components/echartHeader'
    import filter from '../components/filter'
    import {multipleColumnOption} from '../options/multipleColumnOptions'

    export default {
        data() {
            return {
                legendArr: [],
                color: this.$store.state.color,
                styleArr: [],
                myChart: {},
                name: '复杂柱状图'
            }
        },

        methods: {
            init() {
                this.legendArr = this.myChart.getOption().series;
                this.legendArr.forEach((data) => {
                  data.selected = true;
                })
                this.$root.charts.push(this.myChart)
                window.addEventListener('resize', function() {
                  this.myChart.resize()
                }.bind(this))
            }
        },

        components: {
            'v-echart-header': echartHeader,
            'v-filter': filter
        },

        mounted() {
            this.myChart = echarts.init(document.getElementById('multipleColumnChart'))
            this.myChart.setOption(multipleColumnOption);
            this.init()
        }
    }
</script>

<style scoped>
    .multipleColumn {
        height: 1000px;
        background: url('../assets/images/bg.png') no-repeat;
        background-size: 100% 100%;
    }
    
    .multipleColumn .main {
        width: 100%;
        height: calc(100% - 100px);
        margin-top: -15px;
    }
</style>
