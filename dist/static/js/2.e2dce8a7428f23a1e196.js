webpackJsonp([2],{"+Kut":function(t,e){},"/t4R":function(t,e){},"15Xw":function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=a("K07iM"),n=a("Userh"),s=a("5YEj"),r=a.n(s),o={title:{show:!1,text:"订单数",subtext:"",x:"center",textStyle:{color:"#fff"}},tooltip:{trigger:"item",formatter:"{a} <br/>{b} : {c} ({d}%)"},legend:{show:!0,type:"scroll",right:0,top:0,bottom:0,inactiveColor:"#333",pageFormatter:"{current}",pageIconColor:"#fff",pageIconInactiveColor:"#333",pageTextStyle:{color:"#fff"},data:[]},series:[{name:"",type:"pie",radius:["65%","85%"],center:["50%","55%"],avoidLabelOverlap:!1,label:{normal:{show:!1,position:"center"},emphasis:{show:!0,textStyle:{fontSize:"30",fontWeight:"bold"}}},labelLine:{normal:{show:!1}},data:[{name:"VJ",value:48},{name:"VY",value:35},{name:"VJ",value:410}],itemStyle:{emphasis:{shadowBlur:10,shadowOffsetX:0,shadowColor:"rgba(0, 0, 0, 0.5)"}}}]},c={props:{legendData:{type:Array,default:[]},seriesData:{type:Array,default:[]}},data:function(){return{myChart:{}}},mounted:function(){this.init()},created:function(){var t=this;this.$watch("legendData.seriesData",function(e){!t.myChart&&legendData.seriesData?t.init():(t.myChart=r.a.init(document.getElementById("newPieId")),t.myChart.setOption(o,!0),t.myChart.setOption({legend:{data:t.legendData},series:[{data:t.seriesData}]}))},{deep:!this.watchShallow})},methods:{init:function(){this.myChart||(this.myChart=r.a.init(document.getElementById("newPieId")),this.myChart.setOption(o,!0),window.addEventListener("resize",this.myChart.resize))}}},l={render:function(){var t=this;t.$createElement;return t._self._c,t._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticClass:"new-pie-container"},[e("div",{attrs:{id:"newPieId"}})])}]},h=a("Z0/y")(c,l,!1,function(t){a("/t4R")},"data-v-f6655f22",null).exports,m=a("rUbYz"),u={title:{show:!1},tooltip:{trigger:"axis"},legend:{show:!1},toolbox:{show:!1},color:["#325B69","#698570","#AE5548","#6D9EA8","#9CC2B0","#C98769"],calculable:!0,xAxis:[{name:"产品",type:"category",axisLine:{show:!1},axisTick:{show:!1},nameTextStyle:{color:"rgba(255, 255, 255, 0.69)"},axisLabel:{textStyle:{color:"white"}},data:["产品1","产品2","产品3","产品4","产品5"]}],yAxis:[{axisLine:{show:!1},nameLocation:"end",nameGap:20,nameRotate:0,axisTick:{show:!1},splitLine:{lineStyle:{color:["rgba(230, 230, 230, 0.2)"]}},axisLabel:{textStyle:{color:"white",fontSize:14}},name:"数量",type:"value",nameTextStyle:{color:"rgba(255, 255, 255, 0.69)"}}],series:[{name:"标签1",stack:"stack1",type:"bar",data:[2,4.9,5.9,3,6],barWidth:16,barGap:0},{name:"标签2",stack:"stack2",type:"bar",data:[2.6,5.9,3.6,6,8],barWidth:16,barGap:0},{name:"标签3",stack:"stack3",type:"bar",data:[2,6.4,6,4,5],barWidth:16,barGap:0},{name:"标签4",stack:"stack1",type:"bar",data:[4,5.9,3,3,6],barWidth:16,barGap:0},{name:"标签5",stack:"stack2",type:"bar",data:[5.6,4.9,6,5,5],barWidth:16,barGap:0},{name:"标签6",stack:"stack3",type:"bar",data:[2,3.4,8],barWidth:16,barGap:0}]},d={data:function(){return{legendArr:[],color:this.$store.state.color,styleArr:[],myChart:{},name:"复杂柱状图"}},methods:{init:function(){this.legendArr=this.myChart.getOption().series,this.legendArr.forEach(function(t){t.selected=!0}),this.$root.charts.push(this.myChart),window.addEventListener("resize",function(){this.myChart.resize()}.bind(this))}},components:{"v-echart-header":n.a,"v-filter":m.a},mounted:function(){this.myChart=r.a.init(document.getElementById("multipleColumnChart")),this.myChart.setOption(u),this.init()}},f={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"multipleColumn"},[a("v-echart-header",{attrs:{name:t.name,legendArr:t.legendArr,myChart:t.myChart}}),t._v(" "),a("div",{staticClass:"filter"},[t.myChart._dom?a("v-filter",{attrs:{myChart:t.myChart}}):t._e()],1),t._v(" "),a("div",{staticClass:"main",attrs:{id:"multipleColumnChart"}})],1)},staticRenderFns:[]},v=a("Z0/y")(d,f,!1,function(t){a("+Kut")},"data-v-b895affc",null).exports,p=a("D7x10"),y=a("6CT3g"),w=a("aozt"),g=a.n(w),D={data:function(){return{columnId:"columnChart",columnData:[],legendArr:[],name:"订单数",typeIndex:0,activeClass:"box-card-active",errorClass:"box-card",chartType:[{name:"订单数",isNumActive:!0},{name:"订单乘机人",isNumActive:!1},{name:"订单金额",isNumActive:!1},{name:"验价数",isNumActive:!1}],xAxisData:[],legendData:[],seriesData:[],showSelectAll:!1,showFilter:!0,showWeek:!0,showMonth:!0,fromTime:0,toTime:parseInt((new Date).getTime()/1e3),tableData:[]}},mounted:function(){this.getData()},methods:{resize:function(){this.$root.charts.forEach(function(t){t.resize()})},startTime:function(t){this.fromTime=t},endTime:function(t){this.toTime=t,this.getData()},oneWeek:function(t){this.fromTime=t,this.getData()},twoWeek:function(t){this.fromTime=t,this.getData()},oneMonth:function(t){this.fromTime=t,this.getData()},typeClick:function(t){for(var e=0;e<this.chartType.length;e++)this.chartType[e].isNumActive=e==t;this.typeIndex=t,this.getData(),this.name=this.chartType[t].name},getData:function(){var t=this,e=parseInt(10*Math.random()+1);this.typeIndex<3?g.a.get("/orders_carrier?ver="+e,{params:{from:this.fromTime,to:this.toTime}}).then(function(e){var a=e.data.data,i=a.number,n=a.count,s=a.price;if(t.columnData=[],0==t.typeIndex){t.columnData=[];var r=n;t.columnData=r,t.legendData=[],t.seriesData=[];for(var o=1;o<r.length;o++)t.legendData.push({name:r[o][0],textStyle:{color:"#fff"}}),t.seriesData.push({name:r[o][0],value:r[o][3]})}else if(1==t.typeIndex){t.columnData=[];var c=i;t.columnData=c,t.legendData=[],t.seriesData=[];for(var l=1;l<c.length;l++)t.legendData.push({name:c[l][0],textStyle:{color:"#fff"}}),t.seriesData.push({name:c[l][0],value:c[l][3]})}else{t.columnData=[];var h=s;t.columnData=h,t.legendData=[],t.seriesData=[];for(var m=1;m<h.length;m++)t.legendData.push({name:h[m][0],textStyle:{color:"#fff"}}),t.seriesData.push({name:h[m][0],value:h[m][3]})}}).catch(function(t){}):g.a.get("/verify_carrier?ver="+e,{params:{from:this.fromTime,to:this.toTime}}).then(function(e){t.columnData=[];var a=e.data.data.number;t.columnData=a,t.legendData=[],t.seriesData=[];for(var i=1;i<a.length;i++)t.legendData.push({name:a[i][0],textStyle:{color:"#fff"}}),t.seriesData.push({name:a[i][0],value:a[i][5]})}).catch(function(t){})}},components:{multipleColumn:v,"v-echart-header":n.a,"v-new-pie":h,"v-column":i.a,"v-table":p.a,"v-timer":y.a}},b={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"dashboard"},[a("div",{staticClass:"container"},[a("v-timer"),t._v(" "),a("div",{staticClass:"chart-content"},[t._m(0),t._v(" "),t._l(t.chartType,function(e,i){return a("div",{key:i,class:[e.isNumActive?t.activeClass:"",t.errorClass],on:{click:function(e){t.typeClick(i)}}},[a("div",{staticClass:"box-card-header"},[a("div",{staticClass:"clearfix"},[a("span",[t._v(t._s(e.name))])])])])}),t._v(" "),a("v-new-pie",{attrs:{legendData:t.legendData,seriesData:t.seriesData}})],2),t._v(" "),a("div",{staticClass:"chart-num"},[a("v-echart-header",{attrs:{name:t.name,legendArr:t.legendArr,showSelectAll:t.showSelectAll,showFilter:t.showFilter,showWeek:t.showWeek,showMonth:t.showMonth},on:{startTime:t.startTime,endTime:t.endTime,oneWeek:t.oneWeek,twoWeek:t.twoWeek,oneMonth:t.oneMonth}}),t._v(" "),a("v-column",{attrs:{columnId:t.columnId,columnData:t.columnData}})],1)],1),t._v(" "),a("v-table",{attrs:{tableData:t.tableData}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"chart-title"},[a("h1",[t._v("验价订单")])])}]},C=a("Z0/y")(D,b,!1,function(t){a("miOc")},"data-v-65fac411",null);e.default=C.exports},D7x1:function(t,e,a){"use strict";var i={props:{wholePage:{type:Boolean,default:!1},tableData:{type:Array,default:[]}},data:function(){return{theadData:["No","日期","市民提交","已受理","已办结","办事总量"],tbodyData:[[0,2017,1620,1573,22,1620],[1,2017,1620,1573,22,1620],[2,2017,1620,1573,22,1620],[3,2017,1620,1573,22,1620],[4,2017,1620,1573,22,1620],[5,2017,1620,1573,22,1620],[6,2017,1620,1573,22,1620],[7,2017,1620,1573,22,1620],[8,2017,1620,1573,22,1620],[9,2017,1620,1573,22,1620],[10,2017,1620,1573,22,1620],[11,2017,1620,1573,22,1620],[12,2017,1620,1573,22,1620],[13,2017,1620,1573,22,1620],[14,2017,1620,1573,22,1620],[15,2017,1620,1573,22,1620],["合计","",1620,1573,22,1620]],switchData:[{name:"办事项功能开启统计",isSwitchActive:!0},{name:"居委办事项功能开启统计",isSwitchActive:!1},{name:"政府办事项",isSwitchActive:!1},{name:"高新数码港办事项",isSwitchActive:!1}],switchType:0,activeClass:"swicth-title-active",errorClass:"swicth-title-inactive",tableWhole:"table-container",tableInWhole:"table-container-whole",current:1,showItem:5,allpage:13}},computed:{pages:function(){var t=[];if(this.current<this.showItem)for(var e=Math.min(this.showItem,this.allpage);e;)t.unshift(e--);else{var a=this.current-Math.floor(this.showItem/2),i=this.showItem;for(a>this.allpage-this.showItem&&(a=this.allpage-this.showItem+1);i--;)t.push(a++)}return t}},created:function(){var t=this;this.$watch("tableData",function(e){t.theadData=t.tableData[t.switchType].theadData,t.tbodyData=t.tableData[t.switchType].tbodyData})},methods:{switchClick:function(t){for(var e=0;e<this.switchData.length;e++)t==e?(this.switchData[t].isSwitchActive=!this.switchData[t].isSwitchActive,this.theadData=[],this.tbodyData=[],this.theadData=this.tableData[t].theadData,this.tbodyData=this.tableData[t].tbodyData):this.switchData[e].isSwitchActive=!1},goto:function(t){t!=this.current&&(this.current=t)}}},n={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"switch-title",style:"width:"+10*t.switchData.length+"%"},t._l(t.switchData,function(e,i){return a("div",{key:i,class:[e.isSwitchActive?t.activeClass:"",t.errorClass],style:"width:"+100/t.switchData.length+"%",on:{click:function(e){t.switchClick(i)}}},[t._v("\n            "+t._s(e.name)+"\n        ")])})),t._v(" "),a("div",{staticClass:"table-container",class:[t.wholePage?t.tableInWhole:""]},[a("table",{staticClass:"table-title"},[a("thead",[a("tr",t._l(t.theadData,function(e,i){return a("td",{key:i,style:"width:"+100/t.theadData.length+"%"},[t._v("\n                        "+t._s(e)+"\n                    ")])}))])]),t._v(" "),a("div",{staticClass:"table-body"},[a("table",[a("tbody",t._l(t.tbodyData,function(e,i){return a("tr",{key:i},t._l(e,function(i,n){return a("td",{key:n,style:"width:"+100/e.length+"%"},[t._v("\n                            "+t._s(i)+"\n                        ")])}))}))])])]),t._v(" "),a("ul",{staticClass:"pagination"},[a("li",{directives:[{name:"show",rawName:"v-show",value:1!=t.current,expression:"current != 1"}],on:{click:function(e){t.current--&&t.goto(t.current)}}},[a("a",{attrs:{href:"javascript:;"}},[t._v("上一页")])]),t._v(" "),t._l(t.pages,function(e){return a("li",{key:e,class:{"active-pagination":t.current==e},on:{click:function(a){t.goto(e)}}},[a("a",{attrs:{href:"javascript:;"}},[t._v(t._s(e))])])}),t._v(" "),a("li",{directives:[{name:"show",rawName:"v-show",value:t.allpage!=t.current&&0!=t.allpage,expression:"(allpage != current) && (allpage != 0)"}],on:{click:function(e){t.current++&&t.goto(t.current++)}}},[a("a",{attrs:{href:"javascript:;"}},[t._v("下一页")])])],2)])},staticRenderFns:[]},s=a("Z0/y")(i,n,!1,function(t){a("Tdqp")},"data-v-7e3e611c",null);e.a=s.exports},K07i:function(t,e,a){"use strict";var i=a("5YEj"),n=a.n(i),s={legend:{textStyle:{color:"rgba(255,255,255,1)"},inactiveColor:"#333"},tooltip:{},dataset:{source:[["Matcha Latte",43.3,85.8,93.7],["Milk Tea",83.1,73.4,55.1],["Cheese Cocoa",86.4,65.2,82.5],["Walnut Brownie",72.4,53.9,39.1]]},xAxis:{type:"category",axisLabel:{textStyle:{color:"#fff",fontSize:14}}},yAxis:{axisLabel:{textStyle:{color:"#fff",fontSize:14}}},series:[{type:"bar"},{type:"bar"},{type:"bar"}]},r={props:{columnId:{type:String,default:""},columnData:{type:Array,default:[]}},data:function(){return{color:this.$store.state.color,myChart:{}}},components:{},created:function(){var t=this;this.$watch("columnData",function(e){var a,i=[],r=[];t.columnData[0].map(function(t,e){i.push(t),e>0&&r.push({type:"bar"})}),a=t.columnData.slice(1),t.myChart=n.a.init(document.getElementById(t.columnId)),t.myChart.setOption(s,!0),t.myChart.setOption({dataset:{dimensions:i,source:a},series:r})},{deep:!this.watchShallow})},mounted:function(){window.addEventListener("resize",this.myChart.resize)},methods:{init:function(){this.myChart||(this.myChart=n.a.init(document.getElementById(this.columnId)),this.myChart.setOption(s))}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"column-chart"},[a("div",{staticClass:"main",attrs:{id:t.columnId}})])},staticRenderFns:[]},c=a("Z0/y")(r,o,!1,function(t){a("rt7o")},"data-v-9461beb4",null);e.a=c.exports},Tdqp:function(t,e){},miOc:function(t,e){},rt7o:function(t,e){}});