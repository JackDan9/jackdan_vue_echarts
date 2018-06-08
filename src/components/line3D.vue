<template lang="html">
	<!-- <div class="lineThree"> -->
	<div class="line-container">
		<!-- <v-echart-header 
			:name="name" 
			:legendArr="legendArr" 
			:myChart="myChart">		
		</v-echart-header> -->
		
		<!-- <div class="main" id="line3DChart"></div> -->
		<div :id="lineThreeID"></div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	require('echarts-gl');
	import { line3DOption } from '../options/line3DOptions';

	export default {
		props: {
			lineThreeID: {
				type: String,
				default: ''
			},
			xAxisData: {
				type: Array,
				default: []
			},
			yAxisData: {
				type: Array,
				default: []
			},
			zAxisData: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				legendArr: [],
				myChart: {},
				optionNew: {}
				// name: '3D折线图',
			}
		},

		methods: {
			init() {
				// this.$root.charts.push(this.myChart)
				window.addEventListener('resize', function() {
					this.myChart.resize()
				}.bind(this))
			},

			// getData() {

			// }
		},

		// components: {
		// 	'v-echart-header': echartHeader,
		// },
		created() {
			this.$watch('xAxisData.yAxisData.zAxisData', options => {
				this.myChart = echarts.init(document.getElementById(this.lineThreeID));
                this.myChart.setOption(line3DOption, true);
                let data = [];
                for (let t = 0; t < this.xAxisData.length; t++) {
                	data.push([this.xAxisData[t], this.yAxisData[t], this.zAxisData[t]]);
                }
                // data.push([
                // 	{name: '时间', value: this.xAxisData}, 
                // 	{name: '价格', value: this.yAxisData}, 
                // 	{name: '剩余座位', value: this.zAxisData}
                // ]);
    			// let dataArr = [];
				// for (let t = 0; t < 25; t += 0.001) {
				//     let x = (1 + 0.25 * Math.cos(75 * t)) * Math.cos(t);
				//     let y = (1 + 0.25 * Math.cos(75 * t)) * Math.sin(t);
				//     let z = t + 2.0 * Math.sin(75 * t);
				//     dataArr.push([x, y, z]);
				// }
                // console.log(data);
                // console.log(dataArr);
                this.optionNew = {
                    xAxis3D: {
                        axisLabel: {
                            textStyle: {
                                color: '#fff'
                            },
                            formatter:function(params) {
                                let name = new Date(params).toLocaleString("ch", {hour12:false}).replace(/:\d{1,2}$/,' ');
                                let nameNew = name.substring(5, (name.length - 6));
                                return nameNew;
                            }
                        }
                    },
                	series: [{
                		data: data
                	}]
                }
                let showLoadingDefault = {
                    text: 'Loading...',
                    color: '#23531',
                    textColor: '#fff',
                    maskColor: '#272D3A',
                    zlevel: 0,
                }
                this.myChart.showLoading(showLoadingDefault);
                setTimeout(() => {
                    this.myChart.hideLoading();
                    this.myChart.setOption(this.optionNew);

                }, 1000);
			}, { deep: !this.watchShallow })           
		},
        mounted() {
            this.init();
        }
		/*
		mounted() {
			this.myChart = echarts.init(document.getElementById(this.lineThreeID));
			let data = [];
			for (let t = 0; t < 25; t += 0.001) {
			    let x = (1 + 0.25 * Math.cos(75 * t)) * Math.cos(t);
			    let y = (1 + 0.25 * Math.cos(75 * t)) * Math.sin(t);
			    let z = t + 2.0 * Math.sin(75 * t);
			    data.push([x, y, z]);
			}
			this.myChart.setOption(line3DOption);
			this.myChart.setOption({
				series: [{
					data: data
				}]
			})
			// this.init();
		}
		*/
	}
</script>

<style scoped>
/*
	.lineThree {
		width: 100%;
		height: 100%;
		background: url('../assets/images/bg.png') no-repeat;
		background-size: 100% 100%;
		color: #fff;
	}
	
	.line-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

	.lineThree .main {
		width: 100%;
		// height: calc(100% - 100px);
		height: 93%;
		margin-top: -15px;
	}
*/
	.line-container {
        position: relative;
        width: 100%;
        height: 100%;
    }

    #flightLine {
        width: 100%;
        height: 93%;
        opacity: 0.9;
    }
</style>
