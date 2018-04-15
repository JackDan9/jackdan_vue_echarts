<template lang="html">
	<div class="lineThree">
		<v-echart-header :name="name" :legendArr="legendArr" :myChart="myChart"></v-echart-header>
		<div class="main" id="line3DChart"></div>
	</div>
</template>

<script>
	import echarts from 'echarts';
	require('echarts-gl');
	import echartHeader from '../components/echartHeader';
	import {line3DOption} from '../options/line3DOptions';

	export default {
		data() {
			return {
				legendArr: [],
				myChart: {},
				name: '3D折线图',
			}
		},

		methods: {
			init() {
				this.$root.charts.push(this.myChart)
				window.addEventListener('resize', function() {
					this.myChart.resize()
				}.bind(this))
			},

			getData() {

			}
		},

		components: {
			'v-echart-header': echartHeader,
		},
		
		mounted() {
			this.myChart = echarts.init(document.getElementById('line3DChart'));
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
			this.init();
		}
	}
</script>

<style scoped>
	.lineThree {
		width: 100%;
		height: 100%;
		background: url('../assets/images/bg.png') no-repeat;
		background-size: 100% 100%;
		color: #fff;
	}

	.lineThree .main {
		width: 100%;
		height: calc(100% - 100px);
		margin-top: -15px;
	}
</style>
