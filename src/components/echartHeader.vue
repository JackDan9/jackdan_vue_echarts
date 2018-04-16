<template lang="html">
    <div class="title">
        <h1>{{name}}</h1>
        <div class="chart-select-all" v-show="showSelectAll">
            <button v-on:click="selectNotAll">全不选</button>
            <button v-on:click="selectAll">全选</button>
        </div>
        <div class="chart-select-time" v-show="showSelectAll">
            <button v-on:click="selectSmall">3小时</button>
            <button v-on:click="selectMiddle">6小时</button>
            <button v-on:click="selectBig">12小时</button>
            <button v-on:click="selectSum">总数</button>
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
        name: String,
        defaultTime: 0,
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
            chooseState: true
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

        selectNotAll() {
            this.chooseState = false
            /*
            let selectArr = this.myChart.getOption().legend[0].data;
            let option = this.myChart.getOption();
            let obj = {};
            for (let key in selectArr) {
                // console.log(key);
                // console.log(selectArr[key]['name']);
                obj[selectArr[key]['name']] = false;
            }
            option.legend.selected = obj;
            console.log(option);
            */
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myChart.showLoading(showLoadingDefault);
            this.$store.commit('openLoading');
            // this.myChart.setOption(option);
            this.$store.commit('updateChooseState', this.chooseState);
            this.$store.dispatch('fetchLineFlightData', this.myChart)
        },
        selectAll() {
            this.chooseState = true;
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
        },
        selectSmall() {
            let smallStartTime = parseInt((new Date().getTime())/1000 - 3 * 60 * 60);
            this.$store.commit('updateSmallStartTime', smallStartTime);
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
        },
        selectMiddle() {
            let smallStartTime = parseInt((new Date().getTime())/1000 - 6 * 60 * 60);
            this.$store.commit('updateSmallStartTime', smallStartTime);
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
        },
        selectBig() {
            let smallStartTime = parseInt((new Date().getTime())/1000 - 12 * 60 * 60);
            this.$store.commit('updateSmallStartTime', smallStartTime);
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
        },
        selectSum() {
            let smallStartTime = 0;
            this.$store.commit('updateSmallStartTime', smallStartTime);
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
</style>
