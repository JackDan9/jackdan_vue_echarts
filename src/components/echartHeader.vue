<template lang="html">
    <div class="title">
        <h1>{{name}}</h1>
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
        name: String
    },

    created() {
        this.init()
    },

    mounted() {
    },

    data() {
        return {
            styleArr: [],
            color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769']
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
