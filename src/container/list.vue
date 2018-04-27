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
            <!--
                <div class="chart-title">
                    <p>{{title}}</p>
                    <p>{{subtext}}</p>
                </div>
            -->
            <v-column-new
                :columnNewId="columnNewId"
                :xAxisData="xAxisData"
                >    
            </v-column-new>
        </div>
    </div>
</template>

<script>
    import timer from '../components/timer';
    import columnNew from '../components/columnNew';

    export default {
        data() {
            return {
                columnNewId: 'columnList',
                title: '信息发布量排行榜',
                subtext: '前十名',
                listItems: [
                    {"name": "窗口上报", "isListActive": true},
                    {"name": "窗口发布", "isListActive": false},
                    {"name": "科室发布", "isListActive": false}
                ],
                xAxisData: ['水务公司', '华润燃气', '国税局', '住房保障处', '规划局']

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