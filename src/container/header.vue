<template>
    <div class="header-container">
        <div class="nav-header-left">
            <div v-bind:class="[active ? activeClass : '', errorClass]" 
                @mouseover="showMenu()"
                @mouseout="hideMenu()">
                <i class="el-icon-menu icon-pointer nav-icon-reorder" title="菜单"></i>
                菜单
            </div>
            
            <div 
                class="menu-icon" 
                @mouseover="hideMenu()">
                <h1>
                    <router-link :to="'/'">
                        {{titleName}}
                    </router-link>
                </h1>
            </div>

            <div class="nav-quicklinks" 
                @mouseover="hideMenu()">
                <div 
                    class="nav-quicklink" 
                    v-for="(item, index) in items" 
                    :key="index" 
                    @click="showArrow(index)">
                    <router-link :to="'/' + item.ad">
                        {{item.name}}
                        <!--
                        <i v-show="item.ad=='flight'" class="el-icon-caret-bottom icon-padding"></i>
                        -->
                    </router-link>
                </div>
            </div>
        </div>
        <!--
        <div v-bind:class="[arrowActive ? activeArrowClass : '', errorArrowClass]">
            <ul>
                <li><router-link :to="'/price'">票价</router-link></li>
                <li><router-link :to="'/num'">票数</router-link></li>
            </ul>
            <div class="nav-popover-arrow"></div>
            <div class="nav-popover-arrow-inner"></div>
        </div>
        -->

        <div class="nav-header-right" @mouseover="hideMenu()">
            <div class="nav-cta-button-outer">
                <div class="lb-mbox js-mbox">
                    <router-link :to="'/'" class="nav-button">注册</router-link>
                </div>
            </div>
        </div>
        
        <div 
            class="nav-flyout level-0 fixed opacity" 
            @mouseover="showMenu()"
            @mouseout="hideMenu()"
            v-show="active">
            <div class="nav-flyout-content">
                <div class="nav-vertical">
                    <div 
                        class="nav-vertical-item" 
                        v-for="(item, indexFirst) in firstMenuItems" 
                        :key="indexFirst" 
                        @mouseover="showSecMenu(indexFirst)" 
                        @mouseout="hideSecMenu()">
                        <a class="has-icon">
                            {{item.name}}
                            <i class="el-icon-arrow-right"></i>
                        </a>
                    </div>
                </div>
            </div>
        </div>

        <div 
            class="nav-flyout level-1 opacity fixed" 
            v-show="secMenuActive"
            @mouseover="showSec()" 
            @mouseout="hideSec()">
            <div class="nav-flyout-content">
                <div class="nav-vertical">
                    <div class="nav-vertical-item" v-for="(item, indexSec) in secondMenuItems" :key="indexSec">
                        <router-link :to="'/' + item.url" class="has-icon">
                            {{item.subname}}
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import axios from 'axios'

    export default {
        data () {
            return {
                active: false,
                activeClass: 'nav-flyout-trigger-active',
                errorClass: 'nav-flyout-trigger',
                arrowActive: false,
                activeArrowClass: 'active-popover',
                errorArrowClass: 'nav-popover',
                secMenuActive: false,
                items: [
                    {name: '验价订单', ad: 'num', isQuicklinksActive: false},
                    {name: '航线数据', ad: 'price', isQuicklinksActive: false},
                    {name: '毛利率', ad: 'money', isQuicklinksActive: false},
                    {name: '一小时数据搜索', ad: 'search', isQuicklinksActive: false}      
                ],
                titleName: '',
                firstMenuItems: [],
                secondMenuItems: []
            }
        },
        
        created() {
            let retData = require ('../../static/data/header/header.json');
            this.firstMenuItems = retData.data;
            this.titleName = retData.titledata.titlename;
        },

        methods: {
            showMenu: function() {
                this.active = true;
            },
            hideMenu: function() {
                this.active = false;
            },
            showSec: function() {
                this.secMenuActive = true;
                this.active = true;
            },
            hideSec: function() {
                this.secMenuActive = false;
                this.active = false;
            },
            showSecMenu: function(indexFirst) {
                for(let i = 0; i < this.firstMenuItems.length; i++) {
                    if(i == indexFirst) {
                        this.secMenuActive = true;
                        this.secondMenuItems = this.firstMenuItems[indexFirst].submenu;
                    }
                } 
            },
            hideSecMenu: function() {
                this.secMenuActive = false;
            },
            showArrow: function(index) {
                if(index == 2) {
                    this.arrowActive = true
                } else {
                    this.arrowActive = false
                }
            }
        }
    }
</script>
<style scoped>
    .header-container .nav-header-left {
        float: left;
        height: 100%;
    }

    .header-container .nav-header-right {
        position: absolute;
        top: 1px;
        right: 0;
        height: 60px;
        padding-right: 30px;
        background-color: #232f3e;
        z-index: 6100;
    }

    .nav-cta-button-outer {
        float: right;
    }

    .nav-header-right .nav-button {
        display: inline-block;
        margin: 0 0 0 15px;
        min-width: 105px;
        width: auto;
        max-width: 100%;
        height: 30px;
        padding: 5px 16px 6px;
        border: 1px solid;
        border-color: #be952c #a68226 #9b7924;
        line-height: 1.4;
        vertical-align: middle;
        text-align: center;
        font-size: 14px;
        font-weight: 500;
        text-shadow: hsla(0,0%,100%,.8) 0 1px 0;
        text-decoration: none;
        background: #eeba37;
        background-image: linear-gradient(180deg,#fee6b0,0,#eeba37);
        box-shadow: inset 0 1px 0 hsla(0,0%,100%,.6);
        border-radius: 3px;
        cursor: pointer;
        font-family: Helvetica,Arial,Microsoft Yahei,微软雅黑,STXihei,华文细黑,sans-serif;
    }

    .nav-flyout-trigger {
        position: relative;
        float: left;
        display: block;
        height: 100%;
        margin: 0;
        padding: 25px 22px 0 53px;
        border-right: 1px solid #1c2531;
        line-height: 0.9;
        text-align: center;
        font-size: 16px;
        font-weight: 500;
        text-shadow: rgba(0,0,0,.8) 0 -1px 0;
        cursor: pointer;
        outline: 0;
        -webkit-user-select: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-family: Arial, sans-serif;
    }
    .nav-flyout-trigger:hover {
        color: #e9903a;
    }
    .nav-flyout-trigger::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 1px;
        height: 60px;
        border-right: 1px solid #283647;
    }
    .nav-flyout-trigger::after {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 1px;
        height: 60px;
        border-right: 1px solid #283647;
    }
    .nav-flyout-trigger .nav-icon-reorder {
        position: absolute;
        top: 19px;
        left: 22px;
        display: block;
        width: 21px;
        height: 35px;
        margin: 0;
        padding: 0;
        line-height: 1;
        font-family: FontAwesome;
        font-style: normal;
        font-size: 25px;
    }
    .nav-quicklinks {
        position: absolute;
        top: 0;
        left: 360px;
        height: 100%;
        // line-height: 60px;
        overflow: hidden;
        z-index: 6050;
    }

    .nav-quicklink {
        float: left;
        // margin-top: 6px;
        cursor: pointer;
        font-weight: 500;
        // line-height: 1.4;
        text-shadow: none;
        -webkit-tap-highlight-color: transparent;
        -webkit-user-select: none;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #fff;
        font-family: Helvetica,Arial,Microsoft Yahei,微软雅黑,STXihei,华文细黑,sans-serif;
        list-style: none;
        cursor: pointer;
    }

    .nav-quicklink a {
        font-size: 16px;
        color: #fff;
        padding: 22px 22px;
    }

    .nav-quicklink a:hover {
        color: #e9903a;
    }

    .nav-quicklink .icon-padding {
        padding-left: 0;
    }

    .nav-item a:hover {
        color: rgba(255, 255, 255, 0.8);
    }

    /*
    .nav-flyout-trigger a.router-link-active {
        color: rgba(255, 255, 255, 0.9);
        border-bottom: solid 2px #409eff;
    }
    */
    .nav-quicklinks a.router-link-active {
        /*color: rgba(255, 255, 255, 0.9);*/
        /*border-bottom: solid 2px #409eff;*/
        color: #e9903a;
    }

    .header-container {
        position: relative;
        min-width: 1140px;
        height: 100%;
        border-bottom: 1px solid #1b2532;
        box-shadow: 0 1px 1px #273546;
        background-color: #232f3e;
        box-sizing: border-box;
        padding: 0;
        margin: 0 auto;
        z-index: 6001;
    }

    .nav-popover {
        visibility: hidden;
        position: absolute;
        top: 50px;
        left: 516.5px;
        max-width: 220px;
        min-width: 96px;
        padding: 13px 18px 11px;
        border: 1px solid #ccc;
        font-size: 13px;
        text-align: center;
        background-color: #fff;
        zoom: 1;
        border-radius: 3px;
        box-shadow: 0 2px 4px rgba(0,0,0,.1);
        z-index: 7000;
    }

    .nav-popover.active-popover {
        visibility: visible;
        animation: anim-dropdown-hide .11s ease-out 0s 1 normal both;
    }

    .nav-popover ul {
        margin: 0;
        padding: 0;
        list-style-type: none;
        list-style-position: outside;
    }

    .nav-popover li {
        line-height: 1.3;
    }

    .nav-popover li a {
        display: block;
        padding: 5px 0;
        color: #333;
        margin-top: 10px;
        text-decoration: none;
        outline: none;
        text-shadow: hsla(0,0%,100%,.8) 0 1px 0;
        -webkit-tap-highlight-color: transparent;
    }
    .nav-popover li a::first-child {
        margin-top: 0;
    }

    .nav-popover-arrow {
        position: absolute;
        left: 50%;
        width: 0;
        height: 0;
        margin-left: -9px;
        line-height: 0;
        font-size: 0;
        border-style: solid;
        border-width: 9px;
        border-color: transparent;
        border-top-width: 0;
        top: -9px;
        border-bottom: 9px solid #ccc;
    }

    .nav-popover-arrow-inner {
        position: absolute;
        left: 50%;
        width: 0;
        height: 0;
        margin-left: -9px;
        line-height: 0;
        font-size: 0;
        border-style: solid;
        border-width: 9px;
        border-color: transparent;
        border-top-width: 0;
        top: -8px;
        border-bottom: 9px solid #fff;
    }

    .nav-flyout {
        /*top: 61px;*/
        top: 59px;
        border-right: 1px solid #e2e2e2;
        font-size: 15px;
        background: #f7f7f7;
    }
    .nav-flyout::before {
        content: "";
        position: absolute;
        top: 0;
        right: 0;
        display: block;
        width: 1px;
        height: 100%;
        border-right: 1px solid #f7f7f7;
    }
    .header-container .nav-flyout.level-0 {
        width: 281px;
        z-index: 5900;
        height: 5927.45px;
        left: 0;
    }
    .header-container .nav-flyout.level-1 {
        width: 320px;
        /*z-index: 5800;*/
        z-index: 6139;
        height: 5928.45px;
        visibility: visible;
        left: 279px;
        border-left: 1px solid #e2e2e2;
    }
    .nav-flyout.fixed {
        position: fixed;
    }
    .nav-flyout.opacity {
        opacity: .98;
    } 

    .nav-flyout-content {
        position: absolute;
        top: 0;
        left: 0;
        width: 279px;
        height: 100%;
        overflow-y: auto;
        overflow-x: hidden;
        background: linear-gradient(#f7f7f7 30%, hsla(0,0%,100%,0)),linear-gradient(hsla(0,0%,100%,0),#f7f7f7,70%) 0 100%, radial-gradient(farthest-side at 50% 0,rgba(0,0,0,.2),transparent),radial-gradient(farthest-side at 50% 100%,rgba(0,0,0,.2),transparent) 0 100%;
        background-repeat: no-repeat;
        bacground-color: #f7f7f7;
        background-size: 100% 40px,100% 40px,100% 10px,100% 10px;
        background-attachment: local,local,scroll,scroll;
    }

    .nav-vertical {
        margin: 25px 0 41px;
    }

    .nav-vertical::before {
        content: "";
        position: relative;
        top: 0;
        left: 0;
        display: block;
        float: left;
        width: 100%;
        height: 2px;
        margin-top: -25px;
        border-top: 2px solid #f7f7f7;
    }

    .nav-vertical .nav-vertical-item {
        position: relative;
        line-height: 1.3;
    }

    .nav-vertical .nav-vertical-item a {
        display: block;
        padding: 7px 30px;
        text-shadow: #fff 0 1px 0;
    }

    .nav-vertical .nav-vertical-item a.has-icon {
        padding-right: 44px;
    }

    .nav-vertical .nav-vertical-item a:hover {
        color: #e9903a;
    }

    .nav-flyout i {
        position: absolute;
        right: 0;
        top: 50%;
        left: 241px;
        width: 20px;
        margin-top: -11px;
        text-align: center;
        font-size: 20px;
        // color: #828282;
    }

    .menu-icon {
        display: inline-block;
        float:left;
    }

    .menu-icon h1 {
        font-size: 22px;
    }

    .menu-icon h1 a {
        color: #fff;
    }

    .icon-pointer {
        cursor: pointer;
        position: absolute;
        left: 70px;
        top: 20px;
        font-size: 22px;
    }

    .nav-flyout-trigger-active {
        color: #e9903a;
    }

</style>
