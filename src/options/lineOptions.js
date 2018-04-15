export const lineOption = {
	title: {
    	show: false
    },
    tooltip: {
    	trigger: 'axis'
    },
    legend: {
    	show: false
	},
    toolbox: {
    	show: false
    },
	color: [],
    calculable: true,
	xAxis: [{
    	name: 'Number',
    	type: 'category',
    	axisLine: {
        	show: false
    	},
    	axisTick: {
        	show: false
    	},
    	nameTextStyle: {
        	color: 'rgba(255, 255, 255, 0.69)'
    	},
   		axisLabel: {
        	textStyle: {
            	color: 'white'
          	}
    	},
        data: []
    }],
    yAxis: [{
   		axisLine: {
        	show: false
    	},
    	nameLocation: 'end',
    	nameGap: 20,
    	nameRotate: 0,
        axisTick: {
        	show: false
    	},
    	splitLine: {
        	lineStyle: {
        		color: ['rgba(230, 230, 230, 0.2)']
        	}
    	},
    	axisLabel: {
        	textStyle: {
        		color: 'white',
        		fontSize: 14
        	}
    	},
    	name: '数量',
    	type: 'value',
    	nameTextStyle: {
        	color: 'rgba(255, 255, 255, 0.69)'
    	}
    }],
    series: [
    {
    	name: '0~15',
    	type: 'line',
    	stack: '总量',
    	data: []
    }, {
        name: '15~30',
        type: 'line',
        stack: '',
        data: []
    }]
}