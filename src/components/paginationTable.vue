<template lang="html">
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
</template>

<script>
    
    export default {
        data() {
            return {
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

        methods: {
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