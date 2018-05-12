<template lang="html">
    <div class="dashboard">
        <div class="container">
            <v-timer></v-timer>
            <div class="list-header">
                <el-button 
                    class="list-title"
                    v-for="(listItem, listIndex) in listItems" 
                    :key="listIndex">
                    {{listItem.name}}
                </el-button>
            </div>
            <div class="filter">
                <div class="startTime">
                    <span class="timeText">起始日期 :</span>
                    <el-date-picker
                        v-model="startDate"
                        type="date"
                        placeholder="选择日期"
                        value-format="timestamp"
                        >
                    </el-date-picker>
                </div>
                <div class="endTime">
                    <span class="timeText">截止日期 :</span>
                    <el-date-picker
                        v-model="endDate"
                        type="date"
                        placeholder="选择日期"
                        value-format="timestamp">
                    </el-date-picker>
                </div>

                <div class="select-range">
                    <span class="rangeText">统计范围 :</span>
                    <el-select 
                        v-model="selectValue" 
                        clearable 
                        placeholder="请选择">
                        <el-option
                            v-for="selectItem in selectOptions"
                            :key="selectItem.value"
                            :label="selectItem.label"
                            :value="selectItem.value"></el-option>
                    </el-select>
                </div>
                <div class="input-range">
                    <span class="rangeText">排行榜 :</span>
                    <div style="display: inline-block; position: relative; width: 38%;">
                        <el-input
                            placeholder="请输入内容"
                            v-model="inputValue">
                        </el-input>
                    </div>
                    <span class="rangeText">名</span>
                </div>
                <div class="search">
                    <div style="display: inline-block; position: relative;">
                        <el-button type="primary" size="mini" plain>搜索</el-button>
                    </div>
                </div>
            </div>
            <v-column-new
                :columnNewId="columnNewId"
                :title="title"
                :subtitle="subtitle"
                :xAxisData="xAxisData"
                :legendData="legendData"
                :seriesData="seriesData"
                >    
            </v-column-new>
        </div>
    </div>
</template>

<script>
    import timer from '../components/timer'
    import columnNew from '../components/columnNew'
    import axios from 'axios'

    export default {
        data() {
            return {
                columnNewId: 'columnList',
                startDate: '',
                endDate: '',
                selectOptions: [{
                    value: 10,
                    label: '前10名'
                },{
                    value: 20,
                    label: '前20名'
                }, {
                    value: 30,
                    label: '前30名'
                }],
                selectValue: '',
                inputValue: '',
                title: '',
                subtitle: '',
                listItems: [
                    {"name": "窗口上报", "isListActive": true},
                    {"name": "窗口发布", "isListActive": false},
                    {"name": "科室发布", "isListActive": false}
                ],
                xAxisData: [],
                legendData: [],
                seriesData: []

            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                axios.get('http://192.168.112.14:8080/static/data/column/newColumn.json')
                    .then(
                        (res) => {
                            let ret = res.data.data;
                            this.title = ret.title;
                            this.subtitle = ret.subtitle;
                            this.xAxisData = [];
                            this.xAxisData = ret.firstData.xAxisData;
                            this.seriesData = [];
                            this.legendData = [];
                            for(let key in ret.firstData.seriesData) {
                                this.legendData.push(key);
                                this.seriesData.push({
                                    name: key,
                                    data: ret.firstData.seriesData[key]
                                })
                            }
                        }
                    )
                    .catch( (error) => {
                        console.log(error)
                    } 
                )
            }
        },
        components: {
            'v-timer': timer,
            'v-column-new': columnNew
        }
    }

</script>

<style scoped>
    .list-header {
        width: 100%;
        height: 60px;
        border-bottom: 1px solid #0C9DF7;
    }
</style>