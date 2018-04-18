<template lang="html">
    <div class="dashboard">
        <div class="flex-container column">
            <!--
            <div class="item one" @click="clickChart('1')" style="transform: translate(-22.4%, -33.5%) scale(0.33)">
                <multipleColumn></multipleColumn>
            </div>
            <div class="item two active" @click="clickChart('2')" style="transform: translate(43.7%, 0) scale(1)">
                <v-echart-header :name="name" :legendArr="legendArr" :myChart="myChartColumn"></v-echart-header>
                <column :columnId="columnId" v-on:chartColumn="chartColumn"></column>
            </div>
            -->
            <!--
            <div class="item two active" style="transform: translate(43.7%, 0) scale(1)">
                <v-echart-header :name="name" :legendArr="legendArr" :myChart="myChartColumn"></v-echart-header>
                <column :columnId="columnId" v-on:chartColumn="chartColumn"></column>
            </div>
            -->
            <div class="chart-content">
                <div class="chart-title">
                    <h1>验价订单</h1>
                </div>
                <div v-bind:class="[item.isNumActive ? activeClass : '', errorClass]" v-for="(item, index) in chartType" :key="index" v-on:click="typeClick(index)">
                    <div class="box-card-header">
                        <div class="clearfix">
                            <span>{{item.name}}</span>
                        </div>
                    </div>
                </div>
            </div>
            <div class="chart-num">
                <v-echart-header :name="name" :legendArr="legendArr" :showSelectAll="showSelectAll" :myChart="myChartColumn" :showFilter="showFilter" :showWeek="showWeek" :showMonth="showMonth"></v-echart-header>
                <v-column :columnId="columnId" v-on:chartColumn="chartColumn"></v-column>
            </div>
        </div>
    </div>
</template>

<script>
    import column from '../components/column';
    import echartHeader from '../components/echartHeader';
    import multipleColumn from '../components/multipleColumn';

    export default {
        data() {
            return {
                items: [],
                columnId: 'columnChart',
                legendArr: [],
                name: '订单数',
                myChartColumn: {},
                typeIndex: 0,
                activeClass: 'box-card-active',
                errorClass: 'box-card',
                chartType: [
                    {"name": "订单数", "isNumActive": true},
                    {"name": "订单乘机人", "isNumActive": false},
                    {"name": "订单金额", "isNumActive": false},
                    {"name": "验价数", "isNumActive": false}
                ],
                showSelectAll: false,
                showFilter: true,
                showWeek: true,
                showMonth: true
            }
        },

        mounted() {
            // this.init();
            let showLoadingDefault = {
                text: 'Loading...',
                color: '#23531',
                textColor: '#fff',
                maskColor: '#272D3A',
                zlevel: 0,
            }
            this.myChartColumn.showLoading(showLoadingDefault);
            this.$store.commit('openLoading');
            this.$store.dispatch('fetchColumnData', this.myChartColumn);
            // this.legendArr = this.myChartColumn.getOption().legend;
            this.legendArr.forEach((data) => {
                data.selected = true;
            })
        },

        methods: {
            resize() {
                this.$root.charts.forEach((myChart) => {
                    myChart.resize()
                })
            },
            chartColumn(msg) {
                this.myChartColumn = msg;
            },
            typeClick(index) {
                for(let i = 0; i < this.chartType.length; i++) {
                    if (i == index) {
                        this.chartType[i].isNumActive = true;
                    } else {
                        this.chartType[i].isNumActive = false;
                    }
                }
                this.typeIndex = index;
                this.name = this.chartType[index]['name'];
                this.$store.commit('updateTypeIndex', this.typeIndex);
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myChartColumn.showLoading(showLoadingDefault);
                this.$store.commit('openLoading');
                this.$store.dispatch('fetchColumnData', this.myChartColumn); 
            }
            /*
            init() {
                this.items = document.querySelectorAll('.flex-container .item')
                for (let i = 0; i < this.items.length; i++) {
                    this.items[i].dataset.order = i + 1;
                }
            },
            */
            /*
            clickChart(clickIndex) {
                let activeItem = document.querySelector('.flex-container .active')
                let activeIndex = activeItem.dataset.order
                let clickItem = this.items[clickIndex - 1]
                if (activeIndex === clickIndex) {
                  return;
                }
                activeItem.classList.remove('active')
                clickItem.classList.add('active')
                this.setStyle(clickItem, activeItem)
            },

            setStyle(el1, el2) {
                let transform1 = el1.style.transform
                let transform2 = el2.style.transform
                el1.style.transform = transform2
                el2.style.transform = transform1
            }
            */
        },

        components: {
            multipleColumn,
            'v-echart-header': echartHeader,
            'v-column': column
        }
    }
</script>

<style scoped>
    .chart-content {
        width: 19%;
        margin-left: 0.5%;
        margin-right: 0.5%;
        height: 100%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        float: left;
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
    .chart-num {
        width: 80%;
        height: 100%;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        float: right;
    }

</style>
