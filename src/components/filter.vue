<template lang="html">
    <div class="product-wrapper" v-show="showProduct">
        <div class="products">
            <!--
            <div class="all" @click="selectAll()" v-show="pro_filter_flag">
                <checkbox :isChecked="selectAll_flag"></checkbox>
                <span>全选</span>
            </div>
            -->
            <div class="pro" @click="showProPane()">
                航线<i class="arrow"></i>
            </div>
        </div>

        <div class="pro_list" v-show="pro_filter_flag">
            <ul>
                <li v-for="(pro, index) in pro_list" @click="pro_toggle(pro, index)">
                    <checkbox :isChecked="pro.selected"></checkbox>
                    <span class="name">{{pro.name}}</span>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import checkbox from '../components/checkbox'

    export default {
        props: {
            myChart: {
                type: Object,
                default: {}
            },
            optionNew: {
                type: Object,
                default: {}
            }
        },

        data() {
            return {
                pro_filter_flag: false,
                selectAll_flag: true,
                pro_list: [],
                option: {},
                resetOption: {}, // 存储最开始的数据
                preClass: '',
                showProduct: false,
            }
        },

        mounted() {
            this.init();
            //console.log(this.optionNew);
        },

        
        created() {
            this.$watch('optionNew', options => {
                if(!this.optionNew) {
                    this.init()
                } else {
                    this.pro_filter_flag = false
                    this.init()
                }
            })
        },
            

        methods: {
            init() {
                this.prevClass = this.$parent.$el._prevClass
                // this.option = this.myChart.getOption()
                // this.resetOption = this.deepCopy(this.myChart.getOption())
                this.option = this.optionNew;
                this.resetOption = this.deepCopy(this.optionNew);
                this.initProList()
            },

            initProList() {
                let arr = []
                if (this.prevClass !== 'point') {
                    let legendLen = this.optionNew.legend.data.length
                    if (legendLen != 0) {
                        this.showProduct = true
                    } else {
                        this.showProduct = false
                    }
                    // this.option.xAxis[0].data.forEach((pro, index) => {
                    // this.option.legend[0].selected.forEach((pro, index) => {
                    let selectedObj = this.option.legend.selected;
                    for(let pro in selectedObj) {
                        arr.push({
                            name: pro,
                            selected: selectedObj[pro]
                        })
                    }
                    this.pro_list = arr
                }
            },

            /*
            deepCopy(obj) {
                let str, newobj;
                str = newobj = obj.constructor === Array ? [] : {};
                if (typeof obj !== 'object') {
                    return;
                } else if (window.JSON) {
                    str = JSON.stringify(obj); //系列化对象
                    newobj = JSON.parse(str); //还原
                } else {
                    for (let i in obj) {
                        newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
                    }
                }
                return newobj;
            },
            */

            pro_toggle(pro, index) {
                pro.selected = !pro.selected
                for(let key in this.optionNew.legend.selected) {
                    if(key == pro.name) {
                        this.optionNew.legend.selected[key] = pro.selected
                    }
                }
                this.myChart.setOption(this.optionNew)
            },

            deepCopy(obj) {
                let str, newObj;
                str = newObj = obj.constructor === Array ? [] : {};
                if (typeof obj !== 'object') {
                    return;
                } else if (window.JSON) {
                    str = JSON.stringify(obj); //系列化对象
                    newObj = JSON.parse(str); // 还原
                } else {
                    for (let i in obj) {
                        newobj[i] = typeof obj[i] === 'object' ? cloneObj(obj[i]) : obj[i];
                    }
                }
                return newObj;
            },

            redraw() {
                //let option = this.deepCopy(this.resetOption)

            },

            /*
            pro_toggle(pro, index) {
                pro.selected = !pro.selected
                this.selectAll_flag = this.isSelectAll()
                this.redraw()
            },

            redraw() {
                let option = this.deepCopy(this.resetOption);
                let count = 0;
                this.pro_list.forEach((pro, index) => {
                    index = index - count;
                    if (!pro.selected) {
                        option.legend[0].data.splice(index, 1)
                        option.series.forEach((obj) => {
                            obj.data.splice(index, 1);
                        })  
                        count ++;
                    }
                })
                this.myChart.setOption(option)
            },

            isSelectAll() {
                let flag = true;
                this.pro_list.forEach((pro) => {
                    if(!pro.selected) {
                        flag = false;
                    }
                })
                return flag;
            },

            selectAll() {
                this.selectAll_flag = !this.selectAll_flag
                this.pro_list.forEach((pro) => {
                    pro.selected = this.selectAll_flag;
                })
                this.redraw();
            },
            */
            showProPane() {
                this.pro_filter_flag = !this.pro_filter_flag
            }
        },

        components: {
            checkbox
        }
    }
</script>
<style scoped>
    .products {
        position: absolute;
        display: inline-block;
        // right: 15px;
        right: 0;
    }

    .products .all {
        display: inline-block;
        margin-right: 18px;
    }

    .products .all .v-checkbox {
        position: relative;
        top: 2px;
        left: -3px;
    }

    .products .pro {
        float: right;
        padding: 2px 25px 2px 2px;
    }

    .products .pro .arrow {
        position: absolute;
        width: 6px;
        height: 6px;
        margin-left: 10px;
        border-left: 2px solid #fff;
        border-bottom: 2px solid #fff;
        transform: rotate(-45deg);
    }

    .pro_list {
        position: absolute;
        // right: 22px;
        right: 0;
        width: 58px;
        text-align: left;
        background: #1e3642;
        font-size: 14px;
        margin-top: 22px;
        // overflow: hidden;
        overflow-y: auto;
        z-index: 9;
        // height: 686px;
        max-height: 686px;
        height: auto;
    }

    @media screen and (max-width: 1366px) {
        .pro_list {
            max-height: 604px;
        }
    }
    
    .pro_list li {
        height: 36px;
        line-height: 36px;
        border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    }

    .pro_list li:last-child {
        border: none;
    }

    .pro_list li .v-checkbox {
        left: 8px;
    }

   .pro_list li .name {
        position: absolute;
        display: inline-block;
        // right: 8px;
        right: 2px;
        width: 25px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
</style>
