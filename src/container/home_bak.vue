<template lang="html">
    <div class="dashboard">
        <div class="flex-container column">
            <div class="item one" @click="clickChart('1')" style="transform: translate(-22.4%, -33.5%) scale(0.33)">
                <multipleColumn></multipleColumn>
            </div>
            <div class="item two" @click="clickChart('2')" style="transform: translate(-22.4%, 0.5%) scale(0.33)">
                <column></column>
            </div>
            <div class="item four active" @click="clickChart('3')" style="transform: translate(43.7%, 0) scale(1)">
                <v-line></v-line>
            </div>
        </div>
    </div>
</template>

<script>
    import column from '../components/column';
    import line from '../components/line';
    import multipleColumn from '../components/multipleColumn';

    export default {
        data() {
            return {
                items: []
            }
        },

        mounted() {
            this.init();
        },

        methods: {
            resize() {
                this.$root.charts.forEach((myChart) => {
                    myChart.resize()
                })
            },

            init() {
                this.items = document.querySelectorAll('.flex-container .item')
                for (let i = 0; i < this.items.length; i++) {
                    this.items[i].dataset.order = i + 1;
                }
            },

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
        },

        components: {
            multipleColumn,
            column,
            'v-line': line,
        }
    }
</script>

<style scoped>
</style>
