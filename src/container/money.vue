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
        </div>
    </div>
</template>

<script>
    import timer from '../components/timer'
    import lineNew from '../components/lineNew'
    import axios from 'axios'

    export default {
        data () {
            return {
                lineId: 'moneyLine',
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
                            let arr = [];
                            for (let key in this.moneyData) {
                                let timeNew = new Date(parseInt(key) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ');
                                this.xAxisData.push(timeNew);
                                arr.push(this.moneyData[key]);
                            }
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
            'v-line-new': lineNew
        }
    }
</script>

<style scoped>
    .chart-money {
        /*width: 90%;*/
        width: 100%;
        height: 91%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
    }
    @media screen and (max-width: 1366px) {
        .chart-money {
            height: 88%;
        }
    }
</style>