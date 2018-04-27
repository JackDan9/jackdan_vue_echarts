export const columnNewOption = {
    title: {
        show: true,
        text: '2016年12月长宁区合规成本分析',
        left: 'center',
        textStyle: {
            color: '#fff',
            fontSize: 20,
            align: 'center'
        },
        subtext: '前十名',
        subtextStyle: {
            color: '#fff',
            fontSize: 14,
            align: 'center'
        },
        itemGap: 15,
        padding: [0, 0, 20, 0],
        top: 0,
        
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: { // 坐标轴指示器，坐标轴触发有效
            type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
        }
    },
    legend: {
        bottom: -5,
        inactiveColor: '#333',
        textStyle: {
            color: '#fff',
            fontSize: 14
        },
        data: ['包租费', '装修费', '保洁费']
    },
    grid: {
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true
    },
    xAxis: [{
        type: 'category',
        axisLabel: {
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        },
        data: ['新虹桥', '中山公园', '虹桥', '镇宁路', '天山古北']
    }],
    yAxis: [{
        type: 'value',
        name: '总价(万元)',
        nameLocation: 'middle',
        nameTextStyle: {
            color: '#fff',
            fontSize: 14
        },
        nameGap: 35,
        axisLabel: {
            formatter: '{value}',
            textStyle: {
                color: '#fff',
                fontSize: 14
            }
        }
    }],
    series: [{
        name: '包租费',
        type: 'bar',
        data: [20, 12, 31, 34, 31]
    }, {
        name: '装修费',
        type: 'bar',
        data: [10, 20, 5, 9, 3]
    }, {
        name: '保洁费',
        type: 'bar',
        data: [1, 1, 2, 3, 1]
    }]
}