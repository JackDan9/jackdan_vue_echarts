<template lang="html">
    <div class="flight-container">
        <v-table
            :wholePage="wholePage"
            :tableData="tableData">        
        </v-table>
        <v-table-test></v-table-test>
    </div>
</template>

<script>
    import table from '../components/table'
    import tableTest from '../components/tableTest'
    import axios from 'axios'

    export default {
        data() {
            return {
                wholePage: true,
                tableData: []
            }
        },

        mounted() {
            this.getData()
        },

        methods: {
            getData() {
                axios.get('http://192.168.112.14:8080/static/data/table/table.json')
                    .then(
                        (res) => {
                            let ret = res.data.data;
                            this.tableData = ret.tableData;
                        }
                    )
                    .catch( (error) => {
                        console.log(error)
                    }
                )
            }
        },

        components: {
            'v-table': table,
            'v-table-test': tableTest
        }
    }
</script>

<style scoped>
    .flight-container {
        padding-top: 5%;
    }
    .flight-container.table-container {
        margin: 0 auto !important;
    }
</style>
<!-- <template lang="html">
    <div class="dashboard">
        <div class="flex-container column">
            <div class="item four active" style="transform: translate(20%, 0) scale(1)">
                <time-line></time-line>
            </div>
        </div>
    </div>
</template>

<script>
    import timeLine from '../components/timeLine'

    export default {
        data() {
            return {
                items: [],
            }
        },

        mounted() {
             
        },

        methods: {
        },

        components: {
            'time-line': timeLine
        }
    }
</script>

<style scoped>


</style>
 -->