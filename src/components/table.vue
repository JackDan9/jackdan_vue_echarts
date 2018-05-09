<template lang="html">
    <div>
        <div 
            class="switch-title"
            :style="'width:' + switchData.length * 10 + '%'">
            <div 
                v-for="(switchItem, switchIndex) in switchData" 
                :key="switchIndex"
                :class="[switchItem.isSwitchActive ? activeClass : '', errorClass]"
                v-on:click="switchClick(switchIndex)"
                :style="'width:' + 100/switchData.length + '%'">
                {{switchItem.name}}
            </div>
        </div>
        <div 
            class="table-container" 
            :class="[wholePage ? tableInWhole : '']">
            <table class="table-title">
                <thead>
                    <tr>
                        <td 
                            v-for="(theadItem, theadIndex) in theadData" 
                            :key="theadIndex"
                            :style="'width:' + 100/theadData.length + '%'">
                            {{theadItem}}
                        </td>
                    </tr>
                </thead>
            </table>
            <div class="table-body">
                <table>
                    <tbody>
                        <tr 
                            v-for="(tbodyItem, tbodyIndex) in tbodyData" 
                            :key="tbodyIndex">
                            <td 
                                v-for="(item, index) in tbodyItem" 
                                :key="index" 
                                :style="'width:' + 100/theadData.length + '%'">
                                {{item}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        <!--
        <ul class="pagination">
            <li 
                v-show="current != 1" 
                @click="current -- && goto(current)">
                <a href="javascript:;">上一页</a>
            </li>
            <li 
                v-for="index in pages" 
                @click="goto(index)" 
                v-bind:class="{ 'active-pagination':current == index }" 
                :key="index">
                <a href="javascript:;">{{index}}</a>        
            </li>
            <li 
                v-show="(allpage != current) && (allpage != 0)"
                @click="current++ && goto(current++)">
                <a href="javascript:;">下一页</a>        
            </li>
        </ul>
        -->
    </div>
</template>

<script>
    export default {
        props: {
            wholePage: {
                type: Boolean,
                default: false
            },
            tableData: {
                type: Array,
                default: []
            },
            tableType: {
                type: Number,
                default: 0
            }
        },
        data() {
            return {
                theadData: ["No", "日期", "市民提交", "已受理", "已办结", "办事总量"],
                tbodyData: [
                    [0, 2017, 1620, 1573, 22, 1620],
                    [1, 2017, 1620, 1573, 22, 1620],
                    [2, 2017, 1620, 1573, 22, 1620],
                    [3, 2017, 1620, 1573, 22, 1620],
                    [4, 2017, 1620, 1573, 22, 1620],
                    [5, 2017, 1620, 1573, 22, 1620],
                    [6, 2017, 1620, 1573, 22, 1620],
                    [7, 2017, 1620, 1573, 22, 1620],
                    [8, 2017, 1620, 1573, 22, 1620],
                    [9, 2017, 1620, 1573, 22, 1620],
                    [10, 2017, 1620, 1573, 22, 1620],
                    [11, 2017, 1620, 1573, 22, 1620],
                    [12, 2017, 1620, 1573, 22, 1620],
                    [13, 2017, 1620, 1573, 22, 1620],
                    [14, 2017, 1620, 1573, 22, 1620],
                    [15, 2017, 1620, 1573, 22, 1620],
                    ['合计', '' , 1620, 1573, 22, 1620]
                ],
                switchData: [
                    {
                        name: "总体波动", isSwitchActive: true
                    },
                    {
                        name: "最大波动", isSwitchActive: false
                    },
                    {
                        name: "最小波动", isSwitchActive: false
                    }
                ],
                switchType: 0,
                activeClass: 'swicth-title-active',
                errorClass: 'swicth-title-inactive',
                tableWhole: 'table-container',
                tableInWhole: 'table-container-whole',
                dataArr: [],
                maxData: [],
                minData: [],
                switchIndex: 0,
                current: 1,
                showItem: 5,
                allpage: 13
            }
        },

        computed: {
            pages: function() {
                let pag = [];
                if ( this.current < this.showItem ) {
                    let i = Math.min(this.showItem, this.allpage);
                    while(i) {
                        pag.unshift(i--);
                    }
                } else {
                    let middle = this.current - Math.floor(this.showItem / 2);
                    let i = this.showItem;
                    if (middle > (this.allpage - this.showItem)) {
                        middle = (this.allpage - this.showItem) + 1;
                    }
                    while(i--) {
                        pag.push( middle++ );
                    }
                }
                return pag;
            }
        },

        created() {
            this.$watch('tableData', options => {
                this.tbodyData = [];
                this.theadData = [];
                this.dataArr = [];
                if (this.tableType == 1) {
                     this.switchData = [
                        {
                            name: "总体波动", isSwitchActive: true
                        }
                    ]
                } else {
                    this.switchData = [
                        {
                            name: "总体波动", isSwitchActive: true
                        },
                        {
                            name: "最大波动", isSwitchActive: false
                        },
                        {
                            name: "最小波动", isSwitchActive: false
                        }
                    ]
                }
                this.tableData.map((item, index) => {
                    let name = item['name'];
                    let data = item['data'];
                    let len = item['data'].length;
                    let stdevData = this.stdev(data, len);
                    let stdevType = '';
                    if (stdevData == 0) {
                        stdevType = '此数据没有波动'
                    } else if ((stdevData > 0) && (stdevData <= 100)) {
                        stdevType = '小于100'
                    } else if ((stdevData > 100) && (stdevData <= 1000)){
                        stdevType = '小于1000'
                    } else {
                        stdevType = '大于1000'
                    }
                    this.dataArr.push({
                        name, stdevData, stdevType
                    })
                })
                // console.log(dataArr);
                // this.tbodyData = this.dataArr;
                this.tbodyData = this.arrSort(this.dataArr, this.dataArr.length);
                this.theadData = ['No', '波动大小数值', '波动范围']
                // this.maxData = this.arrMax(this.dataArr, this.dataArr.length);
                // this.minData = this.arrMin(this.dataArr, this.dataArr.length);
                // console.log(this.tbodyData);
                // this.theadData = this.tableData[this.switchType]['theadData']
                // this.tbodyData = this.tableData[this.switchType]['tbodyData']
            })
        },

        methods: {
            switchClick(switchIndex) {
                this.switchIndex = switchIndex;
                let switchLen = this.switchData.length;
                for(let i = 0; i < switchLen; i++) {
                    if (this.switchIndex == i) {
                        this.switchData[this.switchIndex]['isSwitchActive'] = !this.switchData[this.switchIndex]['isSwitchActive']
                        this.theadData = []
                        this.tbodyData = []
                        this.theadData = ['No', '波动大小数值', '波动范围']
                        if (this.switchIndex == 0) {
                            // this.dataArr = [];
                            // this.tableData.map((item, index) => {
                            //     let name = item['name'];
                            //     let data = item['data'];
                            //     let len = item['data'].length;
                            //     let stdevData = this.stdev(data, len);
                            //     let stdevType = '';
                            //     if (stdevData == 0) {
                            //         stdevType = '此数据没有波动'
                            //     } else if ((stdevData > 0) && (stdevData <= 100)) {
                            //         stdevType = '小于100'
                            //     } else if ((stdevData > 100) && (stdevData <= 1000)){
                            //         stdevType = '小于1000'
                            //     } else {
                            //         stdevType = '大于1000'
                            //     }
                            //     this.dataArr.push({
                            //         name, stdevData, stdevType
                            //     })
                            // })
                            this.tbodyData = this.arrSort(this.dataArr, this.dataArr.length);
                        } else if (this.switchIndex == 1) {
                            // this.tbodyData = this.maxData
                            // this.dataArr = [];
                            // this.tableData.map((item, index) => {
                            //     let name = item['name'];
                            //     let data = item['data'];
                            //     let len = item['data'].length;
                            //     let stdevData = this.stdev(data, len);
                            //     let stdevType = '';
                            //     if (stdevData == 0) {
                            //         stdevType = '此数据没有波动'
                            //     } else if ((stdevData > 0) && (stdevData <= 100)) {
                            //         stdevType = '小于100'
                            //     } else if ((stdevData > 100) && (stdevData <= 1000)){
                            //         stdevType = '小于1000'
                            //     } else {
                            //         stdevType = '大于1000'
                            //     }
                            //     this.dataArr.push({
                            //         name, stdevData, stdevType
                            //     })
                            // })
                            let tbodyMaxData = [];
                            let splLen = this.dataArr.length;
                            tbodyMaxData = this.arrSort(this.dataArr, this.dataArr.length);
                            this.tbodyData = tbodyMaxData.splice(splLen-5, splLen);
                            // let splLen = this.tbodyData.length;
                            // this.tbodyData = this.tbodyData.splice(splLen-5, splLen)
                        } else {
                            // this.dataArr = [];
                            // this.tableData.map((item, index) => {
                            //     let name = item['name'];
                            //     let data = item['data'];
                            //     let len = item['data'].length;
                            //     let stdevData = this.stdev(data, len);
                            //     let stdevType = '';
                            //     if (stdevData == 0) {
                            //         stdevType = '此数据没有波动'
                            //     } else if ((stdevData > 0) && (stdevData <= 100)) {
                            //         stdevType = '小于100'
                            //     } else if ((stdevData > 100) && (stdevData <= 1000)){
                            //         stdevType = '小于1000'
                            //     } else {
                            //         stdevType = '大于1000'
                            //     }
                            //     this.dataArr.push({
                            //         name, stdevData, stdevType
                            //     })
                            // })
                            let tbodyMinData = [];
                            tbodyMinData = this.arrSort(this.dataArr, this.dataArr.length);
                            this.tbodyData = tbodyMinData.slice(0, 5);
                            // this.tbodyData = this.tbodyData.slice(0, 5);
                        }  
                    } else {
                        this.switchData[i]['isSwitchActive'] = false
                    }
                }
            },
            stdev(data, num) {  
                let i = 0;
                let avg1 = this.avg(data, num);
                let sum = 0;
                for (i = 0; i < num; i++) {
                    sum += (data[i] - avg1) * (data[i] - avg1);
                }
                return Math.sqrt(sum/num);
            },
            avg(data, num) {
                let i = 0;
                let sum = 0;
                for (i = 0; i < num; i++) {
                    sum += data[i]
                }
                return sum/num
            },
            arrSort(dataArr, num) {
                for (let i = 0;  i < num; i++) {
                    for (let j = i; j < num; j++) {
                        if (dataArr[i]['stdevData'] > dataArr[j]['stdevData']) {
                            let temp = dataArr[i]
                            dataArr[i] = dataArr[j]
                            dataArr[j] = temp
                        }
                    }
                }
                return dataArr;
            },
            arrMax(dataArr, num) {
                let index = 0;
                let max = dataArr[0]['stdevData'];
                for (let i = 1; i < num; i++) {
                    if (dataArr[i]['stdevData'] > max) {
                        max = dataArr[i]['stdevData']
                        index = i;
                    }
                }
            },
            arrMin(dataArr, num) {
                let index = 0;
                let min = dataArr[0]['stdevData']; 
                for (let i = 1; i < num; i++) {
                    if (dataArr[i]['stdevData'] < min) {
                        min = dataArr[i]['stdevData']
                        index = i
                    }
                }
                // return dataArr[index];
            },
            goto:function(index) {
                if (index == this.current) {
                    return;
                }
                this.current = index
            }
        }
    }
</script>

<style scoped>
    .switch-title {
        display: flex;
        /*width: 380px;*/
        /*width: auto;*/
        /*max-width: 800px;*/
        /*width: 100%;*/
        height: 40px;
        margin: 20px auto;
        border: 1px solid #0682d8;
        border-radius: 5px;
        line-height: 40px;
        text-align: center;
        color: #fff;
        /*overflow: auto;*/
        letter-spacing: normal;
        text-overflow: ellipsis;
    }
    .swicth-title-active {
        background-color: rgb(1, 122, 203);
    }
    .swicth-title-inactive {
        background-color: none;
    }
    .switch-title div {
        -ms-flex: 1;
        flex: 1;
        border-radius: 3px;
        cursor: pointer;
    }

    @media screen and (max-width: 1366px) {
        .switch-title div {
            font-size: 12px;
        }
    }
    .table-container {
        padding: 0 15px 65px;
        position: relative;
        /*width: 90%;*/
        /*margin: 0 auto;*/
        width: 74%;
        margin-left: 22%;
        margin-top: 1%;
    }

    .table-container-whole {
        width: 80%;
        margin: 0 auto;
        position: relative;
    }
    @media screen and (max-width: 1366px) {
        .table-container-whole {
            width: 90%;
        }
    }
    .table-container .table-title {
        width: 100%;
        color: #fff;
        text-align: center;
    }

    .table-container .table-title thead tr {
        line-height: 56px;
        border: 1px solid #0183d7;
        box-shadow: 0 0 8px #0183d7 inset;
        /* top-left | top-right | bottom-right | bottom-left */
        border-radius: 4px 4px 0 0;
    }
    .table-container .table-body {
        width: 99.95%;
        max-height: 667px;
        overflow: auto;
        border-left: 1px solid #0183d7;
        border-bottom: 1px solid #0183d7;
        border-right: 1px solid #0183d7;
        box-sizing: border-box;
        /* top-left | top-right | bottom-right | bottom-left */
        border-radius: 0 0 4px 4px;
    }
    .table-container .table-body table {
        width: 100%;
        text-align: center;
        color: #fff;
    }
    .table-container .table-body table tbody tr {
        border-bottom: 1px solid #0183d7;
    }
    .table-container .table-body table tbody tr:last-child {
        border-bottom: none;
    }
    .table-container .table-body table tbody td {
        /*line-height: 110px;*/
        line-height: 40px;
    }
    .table-container .table-body table tbody td img {
        vertical-align: middle;
    }
    .table-container .table-body table .table-body-td {
        border-bottom: 1px solid #054c76;
    }
    .table-container table td:first-child {
        /*width: 14% !important;*/
    }
    .table-container table td {
        /*width: 13.33%;*/
    }
    .pagination {
        position: relative;
    }
    .pagination li{
        display: inline-block;
        margin:0 5px;
    }
    .pagination li a{
        padding:.5rem 1rem;
        display:inline-block;
        border:1px solid #ddd;
        background:#fff;
        color:#0E90D2;
    }
    .pagination li a:hover{
        background:#eee;
    }
    .pagination li.active-pagination a{
        background:#0E90D2;
        color:#fff;
    }
</style>