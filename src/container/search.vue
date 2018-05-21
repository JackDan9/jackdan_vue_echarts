<template lang="html">
    <div class="dashboard">
        <div class="container">
            <v-timer></v-timer>
            <div class="chart-content">
                <div class="chart-title">
                    <h1>一小时数据搜索</h1>
                </div>
                <div
                    v-bind:class="[item.isSearchActive ? activeClass : '', errorClass]"
                    v-for="(item, index) in chartType"
                    :key="index"
                    v-on:click="typeClick(index)">
                    <div class="box-card-header">
                        <span>{{item.name}}</span>
                    </div>        
                </div>
            </div>
            <div class="chart-search">
                <div class="title">
                    <h1>{{name}}</h1>
                </div>
                <v-line-new
                    :lineId="lineId"
                    :xAxisData="xAxisData"
                    :legendData="legendData"
                    :seriesData="seriesData"
                    :selectStatus="selectStatus"
                    :searchData="searchData"
                    :filterStatus="filterStatus"
                    :legendShow="legendShow">
                </v-line-new>
            </div>
        </div>
    </div>
</template>

<script>
    import timer from '../components/timer';
    import lineNew from '../components/lineNew';
    import axios from 'axios';

    export default {
        data () {
            return {
                name: "同程",
                chartType: [
                    {"name":"同程", isSearchActive: true},
                    {"name":"去哪儿", isSearchActive: false},
                    {"name":"携程", isSearchActive: false},
                    {"name":"去那儿2", isSearchActive: false} 
                ],
                activeClass: 'box-card-active',
                errorClass: 'box-card',
                lineId: "searchLine",
                xAxisData: [],
                seriesData: [],
                legendData: [],
                searchData: '',
                filterStatus: false,
                selectStatus: true,
                legendShow: true,
                oneHourData: [],
                srcType: 1
            }
        },

        mounted() {
            this.getSearchData();
        },

        methods: {
            getSearchData() {
                axios.get('search?=' + this.srcType, {params: {src: this.srcType}})
                    .then(
                        (res) => {
                            let ret = res.data.data;
                            this.xAxisData = [];
                            this.seriesData = [];
                            this.legendData = [];
                            this.oneHourData = ret;
                            let searchcountData = [];
                            let meetcountData = [];
                            let roundtripData = [];
                            let data = [];
                            for (let key in this.oneHourData) {
                                let time = new Date(parseInt(this.oneHourData[key]['ts']) * 1000).toLocaleString("ch",{hour12:false}).replace(/:\d{1,2}$/,' ');
                                this.xAxisData.push(time.slice(0, 12));
                                searchcountData.push(this.oneHourData[key]['searchcount']);
                                meetcountData.push(this.oneHourData[key]['meetcount']);
                                roundtripData.push(this.oneHourData[key]['roundtrip']);
                            }
                            data.push(
                                {name: "搜索量", data: searchcountData}, 
                                {name: "命中量", data: meetcountData},
                                {name: "往返量", data: roundtripData}
                            )
                            for (let key in data) {
                                this.legendData.push({
                                    name: data[key]['name'],
                                    icon: 'bar',
                                    textStyle: {fontWeight:'bold', color: 'rgba(255,255,255,1)'},
                                });
                                this.seriesData.push({
                                    name: data[key]['name'],
                                    type: 'line',
                                    data: data[key]['data'],
                                    smooth: true
                                }); 
                            }
                        }
                    )
                    .catch( (error)=> {
                        console.log(error);
                    } 
                )
            },
            typeClick(index) {
                for(let i = 0; i < this.chartType.length; i++) {
                    if (i == index) {
                        this.chartType[i].isSearchActive = true;
                    } else {
                        this.chartType[i].isSearchActive = false;
                    }
                }
                this.name = this.chartType[index]['name'];
                if (index == 0) {
                    this.srcType = 1;
                    this.getSearchData();
                }
                else if (index == 1) {
                    this.srcType = 2;
                    this.getSearchData();
                } else if (index == 2) {
                    this.srcType = 3;
                    this.getSearchData();
                } else {
                    this.srcType = 4;
                    this.getSearchData();
                }
            }
        },
        components: {
            'v-timer': timer,
            'v-line-new': lineNew
        }
    }

</script>

<style scoped>
    .chart-content {
        width: 19%;
        margin-left: 0.5%;
        margin-right: 0.5%;
        /*height: 100%;*/
        height: 91%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        float: left;
    }
    @media screen and (max-width: 1366px) {
        .chart-content {
            height: 88%;
        }
    }
    .chart-content .chart-title {
        width: 100%;
        height: 61px;
        line-height: 60px;
        border-bottom: 1px solid #ebeef5;
        text-align: center;
    }
    .chart-content .chart-title h1 {
        font-size: 24px;
        color: #fff;
        letter-spacing: 1px;
    }
    .chart-content .box-card {
        display: block;
        width: 78%;
        margin: 20px auto;
        -webkit-box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
        border: 1px solid #ebeef5;
        transition: .3s;
        border-radius: 4px;
        overflow: hidden;
        background: none;
        color: #fff;
        font-size: 14px;
        text-align: center;
        cursor: pointer;
    }
    .chart-content .box-card-active {
        color: #e9903a;
        border: 1px solid #e9903a;
    }
    .chart-content .box-card .box-card-header {
        padding-top: 14px;
        padding-bottom: 14px;
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
    }
    .chart-search {
        width: 80%;
        /*height: 100%;*/
        height: 91%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        float: right;
    }
    @media screen and (max-width: 1366px) {
        .chart-search {
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

    .chart-select-all, .chart-select-time, .chart-select-flesh, .chart-select-week, .chart-select-month, .chart-select-range {
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
    .price-input {
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