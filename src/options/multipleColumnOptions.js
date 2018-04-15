export const multipleColumnOption = {    
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
    color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769'],
    calculable: true,
    xAxis: [{
        name: '产品',
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
        data: ['产品1', '产品2', '产品3', '产品4', '产品5']
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
    series: [{
        name: '标签1',
        stack: 'stack1',
        type: 'bar',
        data: [2.0, 4.9, 5.9, 3, 6],
        barWidth: 16,
        barGap: 0
    }, {
        name: '标签2',
        stack: 'stack2',
        type: 'bar',
        data: [2.6, 5.9, 3.6, 6, 8],
        barWidth: 16,
        barGap: 0
    }, {
        name: '标签3',
        stack: 'stack3',
        type: 'bar',
        data: [2.0, 6.4, 6.0, 4, 5],
        barWidth: 16,
        barGap: 0
    }, {
        name: '标签4',
        stack: 'stack1',
        type: 'bar',
        data: [4.0, 5.9, 3, 3, 6],
        barWidth: 16,
        barGap: 0
    }, {
        name: '标签5',
        stack: 'stack2',
        type: 'bar',
        data: [5.6, 4.9, 6, 5, 5],
        barWidth: 16,
        barGap: 0
    }, {
        name: '标签6',
        stack: 'stack3',
        type: 'bar',
        data: [2.0, 3.4, 8],
        barWidth: 16,
        barGap: 0
    }]
}