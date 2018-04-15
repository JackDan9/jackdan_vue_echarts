<template lang="html">
    <div class="timeLine">
        <v-echart-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-echart-header>
        <div class="filter">
            <div class="startTime">
                <span class="timeText">起始时间</span>
                <el-date-picker
                    v-model="startDate"
                    type="date"
                    placeholder="选择日期"
                    @change="startDateChange">
                </el-date-picker>
                <div class="myCalendar"></div>
            </div>

            <div class="endTime">
                <span class="timeText">截止时间</span>
                <el-date-picker
                    v-model="endDate"
                    type="date"
                    placeholder="选择日期"
                    @change="endDateChange">
                </el-date-picker>
                <div class="myCalendar"></div>
            </div>
            <v-filter :myChart="myChart" v-if="myChart._dom"></v-filter>
        </div>
        <div class="main" id="timeLineChart"></div>
    </div>
</template>
<script>
    import axios from 'axios';
    import echarts from 'echarts';
    import echartHeader from '../components/echartHeader'
    import filter from '../components/filter'
    import {timeLineOption} from '../options/timeLineOptions'

    export default {
        data() {
            return {
                startDate: '2017.03.14',
                endDate: '2017.03.27',
                startDateValue: '',
                endDateValue: '',
                legendArr: [],
                color: this.$store.state.color,
                myChart: {},
              	name: '折线图',
              	firstData: {},
              	tacketURL: 'tickets_15'
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

            startDateChange(val) {
                this.startDateValue = val;
            },  

            endDateChange(val) {
                this.endDateValue = val;
                this.$store.commit('updateEndDateTime', val)
                setInterval(() => {
                    this.$store.dispatch('fetchTimeLineData', this.myChart)
                }, 1000)
            },

            drawMyChart(id) {
                this.myChart = echarts.init(document.getElementById(id));
                this.myChart.setOption(timeLineOption);
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myChart.showLoading(showLoadingDefault)
                this.$store.commit('openLoading')
                this.$store.dispatch('fetchTimeLineData', this.myChart)
            },
        },

      	components: {
            'v-echart-header': echartHeader,
            'v-filter': filter
      	},

      	mounted() {
            this.drawMyChart('timeLineChart');
            this.init();
      	}
    }
</script>

<style scoped>
  	.timeLine {
        width: 100%;
        height: 100%;
        background: url('../assets/images/bg.png') no-repeat;
        background-size: 100% 100%;
        color: #fff;
  	}
  	.timeLine .main {
        width: 100%;
        height: calc(100% - 100px);
        margin-top: -15px;
  	}
</style>