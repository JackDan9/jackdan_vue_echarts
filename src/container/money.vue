<template lang="html">
    <div class="dashboard">
        <div class="container">
            <v-timer></v-timer>
            <div class="chart-money">
                <v-line-new
                    :lineId="lineId"
                    :xAxisData="xAxisData"
                    :legendData="legendData"
                    :seriesData="seriesData"
                    :selectStatus="selectStatus">
                </v-line-new>
            </div>
            <div class="chart-money-column">
                <v-column
                    :columnId="columnId"
                    :columnData="columnData">
                </v-column>
            </div>
        </div>
    </div>
</template>

<script>
    import timer from '../components/timer'
    import lineNew from '../components/lineNew'
    import column from '../components/column'
    import axios from 'axios'

    export default {
        data () {
            return {
                lineId: 'moneyLine',
                columnId: 'moneyColumn',
                columnData: [],
                legendData: [],
                xAxisData: [],
                seriesData: [],
                moneyData: [],
                selectStatus: true
            }
        },
        beforeMount () {
            this.getMoneyData()
        },
        methods: {
            getMoneyData() {
                axios.get('/profit')
                    .then(
                        (res) => {
                            let ret = res.data.data;
                            this.moneyData = ret;
                            this.legendData = [];
                            this.xAxisData = [];
                            this.seriesData = [];
                            this.columnData = [];
                            let arr = [];
                            let columnArr = [['', '']];
                            for (let key in this.moneyData) {
                                let timeNew = new Date(parseInt(key) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ');
                                this.xAxisData.push(timeNew.slice(0, 9));
                                arr.push(this.moneyData[key]);
                                columnArr.push([timeNew.slice(0, 9), this.moneyData[key]])
                            }
                            this.columnData = columnArr;
                            this.seriesData.push({
                                name: '赚取',
                                type: 'line',
                                data: arr
                            })
                        }
                    )
                    .catch( (error) => {
                        console.log(error);
                    }
                )
            }
        },
        components: {
            'v-timer': timer,
            'v-line-new': lineNew,
            'v-column': column
        }
    }
</script>

<style scoped>
    .chart-money {
        /*width: 90%;*/
        width: 49%;
        height: 91%;
        float: left;
        border: 1px solid #ebeef5;
        border-radius: 4px;
    }
    @media screen and (max-width: 1366px) {
        .chart-money {
            height: 88%;
        }
    }
    .chart-money-column {
        /*width: 90%;*/
        width: 49%;
        float: right;
        height: 91%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
    }
    @media screen and (max-width: 1366px) {
        .chart-money-column {
            height: 88%;
        }
    }
</style>