export const columnOption = {
    // title: {
    //     show: false
    // },
    // tooltip: {
    //     trigger: 'axis'
    // },
    // legend: {
    //     show: true
    // },
    // toolbox: {
    //     show: false
    // },
    // color: ['#325B69', '#698570', '#AE5548', '#6D9EA8', '#9CC2B0', '#C98769'],
    // calculable: true,

    // dataset: {
    //     source: [
    //         ['name', '2015', '2016', '2017'],
    //         ['Matcha Latte', 43.3, 85.8, 93.7],
    //         ['Milk Tea', 83.1, 73.4, 55.1],
    //         ['Cheese Cocoa', 86.4, 65.2, 82.5],
    //         ['Walnut Brownie', 72.4, 53.9, 39.1]
    //     ]
    // },
    // xAxis: [{
    //     type: 'category',
    //     axisLine: {
    //         show: false
    //     },
    //     axisTick: {
    //         show: false
    //     },
    //     nameTextStyle: {
    //         color: 'rgba(255, 255, 255, 0.69)'
    //     },
    //     axisLabel: {
    //         textStyle: {
    //             color: 'white'
    //         }
    //     }
    //     // data: ['产品1', '产品2']
    // }],
    // yAxis: [{
    //     axisLine: {
    //         show: false
    //     },
    //     nameLocation: 'end',
    //     nameGap: 20,
    //     nameRotate: 0,
    //     axisTick: {
    //         show: false
    //     },
    //     splitLine: {
    //         lineStyle: {
    //             color: ['rgba(230, 230, 230, 0.2)']
    //         }
    //     },
    //     axisLabel: {
    //         textStyle: {
    //             color: 'white',
    //             fontSize: 14
    //         }
    //     },
    //     name: '数量',
    //     type: 'value',
    //     nameTextStyle: {
    //         color: 'rgba(255, 255, 255, 0.69)'
    //     }
    // }],
    // series: [{
    //     type: 'bar',
    //     barWidth: 16,
    //     barGap: 0
    // }, {
    //     type: 'bar',
    //     barWidth: 16,
    //     barGap: 0
    // }, {
    //     type: 'bar',
    //     barWidth: 16,
    //     barGap: 0
    // }]
    legend: {
        // color: 'rgba(255,255,255,1)',
        textStyle: {
            color: 'rgba(255,255,255,1)'
        },
        inactiveColor: '#333'
    },
    tooltip: {},
    dataset: {
        source: [
            ['Matcha Latte', 43.3, 85.8, 93.7],
            ['Milk Tea', 83.1, 73.4, 55.1],
            ['Cheese Cocoa', 86.4, 65.2, 82.5],
            ['Walnut Brownie', 72.4, 53.9, 39.1]      
        ]
    },
    xAxis: {
        type: 'category',
        axisLabel: {
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        }
    },
    yAxis: {
        axisLabel: {
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
    },
    // Declare several bar series, each will be mapped
    // to a column of dataset.source by default.
    series: [
    ]
}