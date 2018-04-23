<template lang="html">
    <div class="title">
        <h1>{{name}}</h1>
        <div class="chart-select-all" v-show="showSelectAll">
            <button v-on:click="selectNotAll" v-bind:disabled="this.allNotDisabled">全不选</button>
            <button v-on:click="selectAll" v-bind:disabled="this.allDisabled">全选</button>
        </div>
        <div class="chart-select-time" v-show="showSelectTimeAll">
            <button v-on:click="selectSmall" v-bind:disabled="this.smallDisabled">3小时</button>
            <button v-on:click="selectMiddle" v-bind:disabled="this.middleDisabled">6小时</button>
            <button v-on:click="selectBig" v-bind:disabled="this.bigDisabled">12小时</button>
            <button v-on:click="selectSum" v-bind:disabled="this.sumDisabled">总数</button>
        </div>
        <div class="chart-select-flesh" v-show="showSelectAll">
            <button v-on:click="selectFlesh">刷新</button>
        </div>
        <div class="filter" v-show="showFilter">
            <div class="startTime">
                <span class="timeText">起始时间</span>
                <el-date-picker
                    v-model="startDate"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="timestamp"
                    @change="startDateTime">
                </el-date-picker>
            </div>
            <div class="endTime">
                <span class="timeText">截止时间</span>
                <el-date-picker
                    v-model="endDate"
                    type="datetime"
                    placeholder="选择日期"
                    value-format="timestamp"
                    @change="endDateTime">
                </el-date-picker>
            </div>
        </div>
        <div class="chart-select-week" v-show="showWeek">
            <button v-on:click="selectOneWeek" v-bind:disabled="oneWeekDisabled">前一周</button>
            <button v-on:click="selectTwoWeek" v-bind:disabled="twoWeekDisabled">前两周</button>
        </div>
        <div class="chart-select-month" v-show="showMonth">
            <button v-on:click="selectOneMonth" v-bind:disabled="oneMonthDisabled">前一月</button>
        </div>
        <div class="legend-wrapper">
            <ul>
                <li v-for="(legend, index) in legendArr" v-on:mouseout="downplay(index)" v-on:mouseover="highlight(index)" :style="styleArr[index]" @click="legendToggle(legend)"> 
                    {{legend.name}}
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    props: {
        legendArr: {
            type: Array,
            default: []
        },
        myChart: Object,
        showSelectAll: Boolean,
        showFilter: Boolean,
        showWeek: {
            type: Boolean,
            default: false
        },
        showMonth: {
            type: Boolean,
            default: false
        },
        showSelectTimeAll: {
            type: Boolean,
            default: false
        },
        name: String
    },

    created() {
        this.init();
    },

    mounted() {
    },

    data() {
        return {
            styleArr: [],
            color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769'],
            chooseState: true,
            allDisabled: false,
            allNotDisabled: false,
            smallDisabled: false,
            middleDisabled: false,
            bigDisabled: false,
            sumDisabled: false,
            oneWeekDisabled: false,
            twoWeekDisabled: false,
            oneMonthDisabled: false,
            startDate: '',
            endDate: ''
        }
    },

    methods: {
        init() {
            this.color.forEach((color) => {
                this.styleArr.push({
                    background: color,
                    border: '1px solid' + color
                })
            })
        },
        startDateTime(val) {
            let startTime = parseInt(val/1000);
            this.$store.commit('updateStartDateTime', startTime);
            this.$store.dispatch('fetchColumnData', this.myChart)
        },
        endDateTime(val) {
            let endTime = parseInt(val/1000);
            this.$store.commit('updateEndDateTime', endTime);
            this.$store.dispatch('fetchColumnData', this.myChart)
        },
        selectNotAll() {
            this.allDisabled = false;
            this.allNotDisabled = true;
            this.$emit("selectNotAll", false)
            // this.chooseState = false
            // this.$store.commit('updateChooseState', this.chooseState);
            /*
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myChart.showLoading(showLoadingDefault);
            this.$store.commit('openLoading');
            this.$store.commit('updateChooseState', this.chooseState);
            this.$store.dispatch('fetchLineFlightData', this.myChart)
            */
            /*
            let obj = {};
            let arr = this.myChart.getOption().legend[0].data
            for(let key in arr) {
                obj[arr[key]['name']] = false;
            }
            console.log(obj);
            this.myChart.setOption({
                legend: {
                    selected: obj
                }
            })
            */
        },
        selectAll() {
            this.allDisabled = true;
            this.allNotDisabled = false;
            // this.chooseState = true;
            // this.$store.commit('updateChooseState', this.chooseState);
            /*
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myChart.showLoading(showLoadingDefault);
            this.$store.commit('openLoading');
            this.$store.commit('updateChooseState', this.chooseState);
            this.$store.dispatch('fetchLineFlightData', this.myChart)
            */
            /*
            let obj = {};
            let arr = this.myChart.getOption().legend[0].data
            for(let key in arr) {
                obj[arr[key]['name']] = true;
            }
            console.log(obj);
            this.myChart.setOption({
                legend: {
                    selected: obj
                }
            })
            */
        },
        selectSmall() {
            this.smallDisabled = true;
            this.middleDisabled = false;
            this.bigDisabled = false;
            this.sumDisabled = false;
            let smallStartTime = parseInt((new Date().getTime())/1000 - 3 * 60 * 60);
            this.$store.commit('updateSmallStartTime', smallStartTime);
            /*
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myChart.showLoading(showLoadingDefault);
            this.$store.commit('openLoading');
            this.$store.dispatch('fetchLineFlightData', this.myChart);
            */
        },
        selectMiddle() {
            this.smallDisabled = false;
            this.middleDisabled = true;
            this.bigDisabled = false;
            this.sumDisabled = false;
            let middleStartTime = parseInt((new Date().getTime())/1000 - 6 * 60 * 60);
            this.$store.commit('updateSmallStartTime', middelStartTime);
            /*
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myChart.showLoading(showLoadingDefault);
            this.$store.commit('openLoading');
            this.$store.dispatch('fetchLineFlightData', this.myChart);
            */
        },
        selectBig() {
            this.smallDisabled = false;
            this.middleDisabled = false;
            this.bigDisabled = true;
            this.sumDisabled = false;
            let bigStartTime = parseInt((new Date().getTime())/1000 - 12 * 60 * 60);
            this.$store.commit('updateSmallStartTime', bigStartTime);
            /*
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myChart.showLoading(showLoadingDefault);
            this.$store.commit('openLoading');
            this.$store.dispatch('fetchLineFlightData', this.myChart);
            */
        },
        selectSum() {
            this.smallDisabled = false;
            this.middleDisabled = false;
            this.bigDisabled = false;
            this.sumDisabled = true;
            let sumStartTime = 0;
            this.$store.commit('updateSmallStartTime', sumStartTime);
            /*
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myChart.showLoading(showLoadingDefault);
            this.$store.commit('openLoading');
            this.$store.dispatch('fetchLineFlightData', this.myChart);
            */
        },
        selectFlesh() {
            // let fleshTime = parseInt((new Date().getTime())/1000 + 15*60);
            this.$store.commit('updateFleshTime');
            // this.$store.dispatch('fetchLineFlightData', this.myChart);
        },
        selectOneWeek() {
            this.oneWeekDisabled = true;
            this.twoWeekDisabled = false;
            this.oneMonthDisabled = false;
            let startOneWeekTime = (((new Date().getTime())/1000) - 432000);
            this.$store.commit('updateStartDateTime', startOneWeekTime);
            this.$store.dispatch('fetchColumnData', this.myChart);
        },  
        selectTwoWeek() {
            this.oneWeekDisabled = false;
            this.twoWeekDisabled = true;
            this.oneMonthDisabled = false;
            let startTwoWeekTime = (((new Date().getTime())/1000) - 864000);
            this.$store.commit('updateStartDateTime', startTwoWeekTime);
            this.$store.dispatch('fetchColumnData', this.myChart);
        },
        selectOneMonth() {
            this.oneWeekDisabled = false;
            this.twoWeekDisabled = false;
            this.oneMonthDisabled = true;
            let startOneMonthTime = (((new Date().getTime())/1000) - 2592000);
            this.$store.commit('updateStartDateTime', startOneMonthTime);
            this.$store.dispatch('fetchColumnData', this.myChart);
        },

        downplay(index) {
            this.myChart.dispatchAction({
                type: 'downplay',
                seriesIndex: index
            })
        },

        highlight(index) {
            this.myChart.dispatchAction({
                type: 'highlight',
                seriesIndex: index
            })
        },

        legendToggle(legend) {
            legend.selected = !legend.selected
            this.myChart.dispatchAction({
                type: 'legendToggleSelect',
                name: legend.name
            })
            this.changeStyle()
        },

        changeStyle() {
            this.legendArr.forEach((data, index) => {
                if (data.selected) {
                    this.styleArr[index].background = this.color[index]
                    this.styleArr[index].border = '1px solid' + this.color[index]
                } else {
                    this.styleArr[index].background = 'transparent'
                    this.styleArr[index].border = '1px solid #9C8C84'
                }
            })
        }
    }
}
</script>

<style scoped>
    .title {
        position: relative;
        display: flex;
        width: 100%;
        height: 50px;
        line-height: 50px;
        // background-color: rgba(32, 32, 35, 0.2);
        color: #fff;
    }

    .title h1 {
        flex: 0 0 200px;
        font-size: 12px;
        font-weight: bold;
        padding-left: 20px;
        font-size: 20px;
    }

    .title ul {
        position: absolute;
        right: 0;
        padding-left: 20px;
        margin-top: -2px;
    }

    .title ul li {
        display: inline-block;
        min-width: 59px;
        padding: 2px 10px 2px 10px;
        line-height: 20px;
        text-align: center;
        font-size: 11px;
    }

    .title ul li:first-child {
        border-top-left-radius: 5px;
        border-bottom-left-radius: 5px;
    }

    .title ul li:last-child {
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
    }
    
    .title ul li+li {
        margin-left: -1px;
    }

    .chart-select-all, .chart-select-time, .chart-select-flesh, .chart-select-week, .chart-select-month {
        margin-right: 30px;
        height: 100%;
    }

    .chart-select-all button {
        background: green;
    }
    .chart-select-time button {
        background: blue;
    }
    .chart-select-flesh button {
        background: red;
    }
    .chart-select-week button {
        background: #82D900;
    }
    .chart-select-month button {
        background: #FFD1A4;
    }

    button {
        display: inline-block;
        border: 0;
        outline: 0;
        color: #fff;
        font-size: 12px;
        font-weight: 400;
        padding: 3px 15px;
        margin-right: 10px;
        cursor: pointer;
        height: 22px;
        line-height: 18px;
    }
    button:disabled{
        border: 1px solid #333;
        background-color: #333;
        color:#ACA899;
    }
    //IE8-
    button[disabled]{
        border: 1px solid #333;
        background-color: #333;
        color:#ACA899;
    }
    //IE6 Using Javascript to add CSS class "disabled"
    * html button.disabled{
        border: 1px solid #333;
        background-color: #333;
        color:#ACA899;
    }
</style>
