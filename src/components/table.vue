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
                                :style="'width:' + 100/tbodyItem.length + '%'">
                                {{item}}
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
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
            }
        },
        data() {
            return {
                theadData: ["No", "日期", "市民提交", "已受理", "已办结", "办事总量"],
                tbodyData: [
                    [1, 2017, 1620, 1573, 22, 1620],
                    [2, 2017, 1620, 1573, 22, 1620],
                    [3, 2017, 1620, 1573, 22, 1620],
                    [4, 2017, 1620, 1573, 22, 1620],
                    [1, 2017, 1620, 1573, 22, 1620],
                    [2, 2017, 1620, 1573, 22, 1620],
                    [3, 2017, 1620, 1573, 22, 1620],
                    [4, 2017, 1620, 1573, 22, 1620],
                    [1, 2017, 1620, 1573, 22, 1620],
                    [2, 2017, 1620, 1573, 22, 1620],
                    [3, 2017, 1620, 1573, 22, 1620],
                    [4, 2017, 1620, 1573, 22, 1620],
                    [1, 2017, 1620, 1573, 22, 1620],
                    [2, 2017, 1620, 1573, 22, 1620],
                    [3, 2017, 1620, 1573, 22, 1620],
                    [4, 2017, 1620, 1573, 22, 1620],
                    ['合计', '' , 1620, 1573, 22, 1620]
                ],
                switchData: [
                    {
                        name: "办事项功能开启统计", isSwitchActive: true
                    },
                    {
                        name: "居委办事项功能开启统计", isSwitchActive: false
                    },
                    {
                        name: "政府办事项", isSwitchActive: false
                    },
                    {
                        name: "高新数码港办事项", isSwitchActive: false
                    }
                ],
                switchType: 0,
                activeClass: 'swicth-title-active',
                errorClass: 'swicth-title-inactive',
                tableWhole: 'table-container',
                tableInWhole: 'table-container-whole'
            }
        },

        created() {
            this.$watch('tableData', options => {
                this.theadData = this.tableData[this.switchType]['theadData']
                this.tbodyData = this.tableData[this.switchType]['tbodyData']
            })
        },

        methods: {
            switchClick(switchIndex) {
                for(let i = 0; i < this.switchData.length; i++) {
                    if (switchIndex == i) {
                        this.switchData[switchIndex]['isSwitchActive'] = !this.switchData[switchIndex]['isSwitchActive']
                        this.theadData = []
                        this.tbodyData = []
                        this.theadData = this.tableData[switchIndex]['theadData']
                        this.tbodyData = this.tableData[switchIndex]['tbodyData']
                    } else {
                        this.switchData[i]['isSwitchActive'] = false
                    }
                }
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
</style>