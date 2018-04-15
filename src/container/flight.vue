<template lang="html">
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
