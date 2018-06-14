export const compareOptions = {
    title: {
        show: false
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            animation: false
        }
    },
    legend: {
        show: false,
        data: [],
        x: 'center'
    },
    axisPointer: {
        link: {xAxisIndex: 'all'}
    },
    xAxis: [
        {
            type: 'value',
            boundaryGap : false,
            axisLine: {onZero: true},
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        {
            gridIndex: 1, 
            type : 'category',
            boundaryGap : false,
            axisLine: {onZero: true},
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
            position: 'top'
        }
    ],
    yAxis: [
        {
            type: 'value',
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                }
            }
        },
        {
            gridIndex: 1,
            type: 'value',
            inverse: true,
            axisLabel: {
                textStyle: {
                    color: '#fff',
                    fontSize: 14
                }
            }
        }
    ],
    series: [
        {
            name:'流量',
            type:'bar',
            symbolSize: 8,
            hoverAnimation: false,
            data:[-10, -20, -30, -40, -50, -60, -70, -80, -90, -100]
        },
        {
            name:'降雨量',
            type:'bar',
            xAxisIndex: 1,
            yAxisIndex: 1,
            symbolSize: 8,
            hoverAnimation: false,
            data: [1, 2, 3, 4, 5, 6, 7, 8, 9]
        }
    ]
} 