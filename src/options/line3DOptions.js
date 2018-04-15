export const line3DOption = {
    tooltip: {},
    backgroundColor: 'none',
    visualMap: {
        show: false,
        dimension: 2,
        min: 0,
        max: 30,
        inRange: {
            color: ['#313695', '#4575b4', '#74add1', '#abd9e9', '#e0f3f8', '#ffffbf', '#fee090', '#fdae61', '#f46d43', '#d73027', '#a50026']
        }
    },
    xAxis3D: {
        type: 'value'
    },
    yAxis3D: {
        type: 'value'
    },
    zAxis3D: {
        type: 'value'
    },
    grid3D: {
        viewControl: {
            projection: 'orthographic'
        }
    },
    series: [{
    	type: 'line3D',
        data: [],
        lineStyle: {
            width: 4
        }
    }]
}