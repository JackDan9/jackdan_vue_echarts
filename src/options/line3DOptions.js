export const line3DOption = {
    tooltip: {},
    backgroundColor: 'none',
    xAxis3D: {
        name: '时间',
        nameTextStyle: {
            color: '#fff'
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        },
        type: 'time'
    },
    yAxis3D: {
        name: '价格',
        nameTextStyle: {
            color: '#fff'
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        },
        type: 'value'
    },
    zAxis3D: {
        name: '座位数',
        nameTextStyle: {
            color: '#fff'
        },
        axisLine: {
            lineStyle: {
                color: '#fff'
            }
        },
        axisLabel: {
            textStyle: {
                color: '#fff'
            }
        },
        type: 'value'
    },
    grid3D: {
        viewControl: {
            // projection: 'orthographic'
            projection: 'perspective'
        }
    },
    series: [{
    	type: 'line3D',
        name: '3D剩余座位与价格',
        data: [],
        lineStyle: {
            width: 4
        }
    }]
}