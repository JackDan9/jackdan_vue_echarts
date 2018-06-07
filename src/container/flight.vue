<template lang="html">
    <div class="dashboard">
        <div class="container">
            <v-timer></v-timer>
            <div class="chart-flight">
                <div class="title">
                    <h1>{{name}}</h1>
                    <div class="chart-select-range" v-show="showSelectRange">
                        <div style="display: inline-block; position: relative; width: 68%;">
                            <input 
                                type="text" 
                                name="flight" 
                                placeholder="航司号码"
                                class="flight-input"
                                v-model="inputValue"
                                @change="rangeChange()" />
                        </div>
                        <button
                            v-on:click="rangeClick()" 
                            v-bind:disabled="isRangeDisabled">搜索</button>
                    </div>
                </div>
                <v-line-3d
                    :lineThreeID="lineThreeID"
                    :xAxisData="xAxisData"
                    :yAxisData="yAxisData"
                    :zAxisData="zAxisData"
                >
                </v-line-3d>
                <!-- 
                <v-line-new
                    :lineId="lineId"
                    :legendData="legendData"
                    :xAxisData="xAxisData"
                    :seriesData="seriesData"
                    :legendShow="legendShow"
                ></v-line-new> 
                -->
            </div>
        </div>
    </div>
</template>

<script>
    import axios from 'axios';
    import line3D from '../components/line3D';
    import timer from '../components/timer';

    export default {
        data () {
            return {
                flightData: [],
                name: '',
                // lineId: 'flightLine',
                legendData: [],
                xAxisData: [],
                yAxisData: [],
                zAxisData: [],
                legendShow: true,
                flightId: 2230451,
                showSelectRange: true,
                isRangeDisabled: false,
                inputValue: '',
                lineThreeID: 'flightLine'
            }
        },

        beforeMount () {
            this.getFlightData();
        },

        methods: {
            rangeClick() {
                this.isRangeDisabled = true;
                let numId = this.inputValue;
                let RegExpObject = new RegExp(/^\d{7}$/);
                if (RegExpObject.test(numId)) {
                    this.flightId = parseInt(this.inputValue)
                    this.getFlightData();
                } else {
                    alert("请输入正确的航司号");
                }
                // this.flightId = this.inputValue;
                // this.getFlightData();
                // console.log(this.inputValue);
            },
            rangeChange() {
                this.isRangeDisabled = false;
            },
            getFlightData() {
                axios.get('/flight?id=' + this.flightId)
                    .then (
                        (res) => {
                            let ret = res.data;
                            this.flightData = ret.data;
                            this.name = ret.name;
                            this.xAxisData = [];
                            this.yAxisData = [];
                            this.zAxisData = [];
                            let priceArr = [];
                            let seatArr = [];
                            let dataArr = [];
                            this.flightData.map((item, index) => {
                                // let timeNew = new Date(parseInt(item[0]) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,'');
                                // console.log(timeNew);
                                // console.log(parseInt(timeNew));
                                // this.xAxisData.push(timeNew);
                                this.xAxisData.push(item[0] * 1000);
                                priceArr.push(item[1]);
                                seatArr.push(item[2]);
                            })
                            this.yAxisData = priceArr;
                            this.zAxisData = seatArr;

                            /*
                            dataArr.push({
                                name: "剩余价格",
                                data: priceArr
                            },{
                                name: "座位数",
                                data: seatArr
                            })
                            for(let key in dataArr) {
                                this.legendData.push({
                                    name: dataArr[key]['name'],
                                    icon: 'bar',
                                    textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'}
                                })
                                this.seriesData.push({
                                    name: dataArr[key]['name'],
                                    type: 'line',
                                    data: dataArr[key]['data'],
                                    smooth: true
                                })
                            }
                            
                            console.log(dataArr);
                            */
                        }
                    )
                    .catch( 
                        (error) => {
                            console.log(error);
                    } 
                )
            }
        },

        components: {
            'v-line-3d': line3D,
            'v-timer': timer
        }
    }
</script>

<style scoped>
    .chart-flight {
        width: 98%;
        /*width: 49%;*/
        height: 91%;
        float: left;
        border: 1px solid #ebeef5;
        border-radius: 4px;
    }
    @media screen and (max-width: 1366px) {
        .chart-flight {
            height: 88%;
        }
    }

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

    .chart-select-range {
        margin-right: 30px;
        height: 100%;
    }

    .chart-select-range button {
        background: #FF8000;
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
        height: 24px;
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
    .flight-input {
        width: 100%;
        padding: 0px 0 0 15px;
        height: 24px;
        line-height: 24px;
        font-size: 12px;
        outline: none;
        border: none;
        border: 1px solid green;
        background: none;
        color: #fff;
    }
</style>