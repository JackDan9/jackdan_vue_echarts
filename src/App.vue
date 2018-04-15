<template>
    <div id="app">
        <div class="headerWrapper">
            <header class="header">
                <my-header></my-header>
            </header>
        </div>
        <div class="main-cnt">
            <router-view class="router-view"></router-view>
        </div>
    </div>
</template>

<script>
    import myHeader from './container/header'
    import myFooter from './container/footer'
  
    export default {
        name: 'app',
        components: {
            myHeader,
            myFooter
        },
    }
</script>

<style>
    .headerWrapper {
        position: fixed;
        width: 100%;
        height: 60px;
        z-index: 6001;
    }

    .header {
        height: 60px;
        background-color: none;
        color: #fff;
        top: 0;
        left: 0;
        width: 100%;
        line-height: 60px;
        z-index: 100;
        position: relative;
    }

    .header h1 {
        margin: 0;
        float: right;
        margin-left: 20px;
        font-size: 22px;
        font-weight: 400;
    }

    .main-cnt {
        position: absolute;
        height: 100%;
        width: 100%;
    }
    #app {
        display: block;
    }
</style>
