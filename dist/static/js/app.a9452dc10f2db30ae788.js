webpackJsonp([5],{"+Xd3":function(e,t){},"49fU":function(e,t){e.exports=vendor_library},"6iV/":function(e,t,n){e.exports=n("49fU")(381)},"9rMa":function(e,t,n){e.exports=n("49fU")(384)},AQYe:function(e,t){},AScp:function(e,t){},BPVH:function(e,t){},EP0Q:function(e,t){},J0mU:function(e,t){},NHnr:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("rVsN"),a=n.n(i),s=(n("AQYe"),n("QAku"),n("qxYw")),o=n.n(s),c=(n("uIkt"),n("gZz5")),u=n.n(c),r=(n("fgw4"),n("7ToB")),l=n.n(r),d=(n("AScp"),n("gWvt")),m=n.n(d),f=(n("J0mU"),n("GrTs")),v=n.n(f),p=(n("BPVH"),n("6pzL")),h=n.n(p),g=n("MVMM"),C=n("aozt"),M=n.n(C),_={data:function(){return{active:!1,activeClass:"nav-flyout-trigger-active",errorClass:"nav-flyout-trigger",arrowActive:!1,activeArrowClass:"active-popover",errorArrowClass:"nav-popover",secMenuActive:!1,items:[{name:"验价订单",ad:"num"},{name:"航线数据",ad:"price"}],titleName:"",firstMenuItems:[],secondMenuItems:[]}},created:function(){var e=n("XiWp");this.firstMenuItems=e.data,this.titleName=e.titledata.titlename},methods:{showMenu:function(){this.active=!0},hideMenu:function(){this.active=!1},showSec:function(){this.secMenuActive=!0,this.active=!0},hideSec:function(){this.secMenuActive=!1,this.active=!1},showSecMenu:function(e){for(var t=0;t<this.firstMenuItems.length;t++)t==e&&(this.secMenuActive=!0,this.secondMenuItems=this.firstMenuItems[e].submenu)},hideSecMenu:function(){this.secMenuActive=!1},showArrow:function(e){this.arrowActive=2==e}}},w={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"header-container"},[n("div",{staticClass:"nav-header-left"},[n("div",{class:[e.active?e.activeClass:"",e.errorClass],on:{mouseover:function(t){e.showMenu()},mouseout:function(t){e.hideMenu()}}},[n("i",{staticClass:"el-icon-menu icon-pointer nav-icon-reorder",attrs:{title:"菜单"}}),e._v("\n            菜单\n        ")]),e._v(" "),n("div",{staticClass:"menu-icon",on:{mouseover:function(t){e.hideMenu()}}},[n("h1",[n("router-link",{attrs:{to:"/"}},[e._v("\n                    "+e._s(e.titleName)+"\n                ")])],1)]),e._v(" "),n("div",{staticClass:"nav-quicklinks",on:{mouseover:function(t){e.hideMenu()}}},e._l(e.items,function(t,i){return n("div",{key:i,staticClass:"nav-quicklink",on:{click:function(t){e.showArrow(i)}}},[n("router-link",{attrs:{to:"/"+t.ad}},[e._v("\n                    "+e._s(t.name)+"\n                    ")])],1)}))]),e._v(" "),n("div",{staticClass:"nav-header-right",on:{mouseover:function(t){e.hideMenu()}}},[n("div",{staticClass:"nav-cta-button-outer"},[n("div",{staticClass:"lb-mbox js-mbox"},[n("router-link",{staticClass:"nav-button",attrs:{to:"/"}},[e._v("注册")])],1)])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.active,expression:"active"}],staticClass:"nav-flyout level-0 fixed opacity",on:{mouseover:function(t){e.showMenu()},mouseout:function(t){e.hideMenu()}}},[n("div",{staticClass:"nav-flyout-content"},[n("div",{staticClass:"nav-vertical"},e._l(e.firstMenuItems,function(t,i){return n("div",{key:i,staticClass:"nav-vertical-item",on:{mouseover:function(t){e.showSecMenu(i)},mouseout:function(t){e.hideSecMenu()}}},[n("a",{staticClass:"has-icon"},[e._v("\n                        "+e._s(t.name)+"\n                        "),n("i",{staticClass:"el-icon-arrow-right"})])])}))])]),e._v(" "),n("div",{directives:[{name:"show",rawName:"v-show",value:e.secMenuActive,expression:"secMenuActive"}],staticClass:"nav-flyout level-1 opacity fixed",on:{mouseover:function(t){e.showSec()},mouseout:function(t){e.hideSec()}}},[n("div",{staticClass:"nav-flyout-content"},[n("div",{staticClass:"nav-vertical"},e._l(e.secondMenuItems,function(t,i){return n("div",{key:i,staticClass:"nav-vertical-item"},[n("router-link",{staticClass:"has-icon",attrs:{to:"/"+t.url}},[e._v("\n                        "+e._s(t.subname)+"\n                    ")])],1)}))])])])},staticRenderFns:[]},b={render:function(){var e=this;e.$createElement;return e._self._c,e._m(0)},staticRenderFns:[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"footer"},[n("p",[e._v("Copyright © "),n("span",[e._v("bigdata")]),e._v(" 2018 ")])])}]},y={name:"app",components:{myHeader:n("Z0/y")(_,w,!1,function(e){n("EP0Q")},"data-v-f8508244",null).exports,myFooter:n("Z0/y")(null,b,!1,function(e){n("V2eK")},"data-v-156764eb",null).exports}},x={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{staticClass:"headerWrapper"},[n("header",{staticClass:"header"},[n("my-header")],1)]),e._v(" "),n("div",{staticClass:"main-cnt"},[n("router-view",{staticClass:"router-view"})],1)])},staticRenderFns:[]},T=n("Z0/y")(y,x,!1,function(e){n("+Xd3")},null,null).exports,k=n("9rMa"),A=n("zO6J");g.default.use(A.default);var D=new A.default({routes:[{path:"/",name:"home",component:function(){return Promise.all([n.e(0),n.e(1)]).then(n.bind(null,"/7y9t"))}},{path:"/price",name:"price",component:function(){return Promise.all([n.e(0),n.e(3)]).then(n.bind(null,"frgDn"))}},{path:"/num",name:"num",component:function(){return Promise.all([n.e(0),n.e(2)]).then(n.bind(null,"15XwL"))}}]}),L=(n("6iV/"),n("briU"),{api:"http://dx.spider.jiaoan100.com/bigdata"}),I={state:(n("RzFn"),n("bTWF"),{isLoading:!0,isChoose:!0,startDateTime:0,endDateTime:parseInt((new Date).getTime()/1e3),count:0,color:["#325B69","#698570","#AE5548","#6D9EA8","#9CC2B0","#C98769"],typeIndex:0,typePriceIndex:0,smallStartTime:0,isFlesh:!1}),getters:{},mutations:{closeLoading:function(e){e.isLoading=!1},updateStartDateTime:function(e,t){e.startDateTime=t},updateEndDateTime:function(e,t){e.endDateTime=t},openLoading:function(e){e.isLoading=!0},updateTypeIndex:function(e,t){e.typeIndex=t},updateChooseState:function(e,t){e.isChoose=t},updateSmallStartTime:function(e,t){e.smallStartTime=t},updateFleshTime:function(e){e.isFlesh=!0},updateTypePriceIndex:function(e,t){e.typePriceIndex=t}},actions:{fetchTimeLineData:function(e,t){var n=e.state,i=e.commit;M.a.get("http://192.168.112.100:8080/static/time/time.json").then(function(e){var a=e.data.data;n.isLoading&&(t.hideLoading(),i("closeLoading")),0==n.endDateTime.length?i("updateEndDateTime",n.endDateTime):0!=n.endDateTime.length&&a.push(n.endDateTime),t.setOption({timeline:{data:a}})}).catch(function(e){})},fetchLineData:function(e,t){var n=e.state;e.commint,M.a.get("http://192.168.112.100:8080/static/data/line/line.json").then(function(e){e.data.data,n.isLoading&&(t.hideLoading(),commit("closeLoading")),t.setOption({series:void 0})}).catch(function(e){})},fetchColumnData:function(e,t){e.state,e.commit},fetchLineFlightData:function(e,t){e.state,e.commit}}};g.default.use(k.default);var S=new k.default.Store({modules:{TimeMap:I}});g.default.component(h.a.name,h.a),g.default.component(v.a.name,v.a),g.default.component(m.a.name,m.a),g.default.component(l.a.name,l.a),g.default.use(k.default),M.a.defaults.timeout=1e5;var F=void 0;M.a.interceptors.request.use(function(e){return F=u.a.service({lock:!0,text:"Loading",spinner:"el-icon-loading",background:"rgba(0, 0, 0, 0.8)"}),e},function(e){return F.close(),o.a.error({message:"加载超时"}),a.a.reject(e)}),M.a.interceptors.response.use(function(e){return F.close(),e},function(e){return F.close(),o.a.error({message:"加载失败"}),a.a.reject(e)}),g.default.config.productionTip=!1,M.a.defaults.baseURL=L.api,new g.default({el:"#app",router:D,store:S,template:"<App/>",components:{App:T},data:{charts:[]}})},QAku:function(e,t){},RzFn:function(e,t){},V2eK:function(e,t){},XiWp:function(e,t){e.exports={code:0,titledata:{titlename:"大象航空数据平台"},quicklinedata:[{quickname:"",url:""},{quickname:"",url:""},{quickname:"",url:""}],data:[{name:"一级菜单",submenu:[{subname:"单军军是个大傻叉",url:""},{subname:"单军军是个大傻叉",url:""}]},{name:"firstMenu",submenu:[{subname:"单军军是个大傻叉1",url:""},{subname:"单军军是个大傻叉2",url:""}]}],msg:""}},aozt:function(e,t,n){e.exports=n("49fU")(440)},bTWF:function(e,t){},briU:function(e,t,n){e.exports=n("49fU")(179)},fgw4:function(e,t){},"nvO+":function(e,t,n){e.exports=n("49fU")(55)},uIkt:function(e,t){},zO6J:function(e,t,n){e.exports=n("49fU")(178)}},["NHnr"]);