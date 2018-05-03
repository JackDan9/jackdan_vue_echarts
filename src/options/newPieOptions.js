export const newPieOptions = {
    title: {
        show: false,
        text: '订单数',
        subtext: '',
        x:'center',
        textStyle: {
            color: "#fff",
        }
    },
    tooltip: {
        trigger: 'item',
        formatter: "{a} <br/>{b} : {c} ({d}%)"
    },
    legend: {
        show: true,
        type: 'scroll',
        // orient: 'vertical',
        right: 0,
        top: 0,
        bottom: 0,
        // zlevel: 9000,
        inactiveColor: '#333',
        pageFormatter: '{current}',
        pageIconColor: '#fff',
        pageIconInactiveColor: '#333',
        pageTextStyle: {
            color: '#fff'
        },
        data: []
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: ['65%', '85%'],
            center: ['50%', '55%'],
            // roseType: 'radius',
            // roseType: 'area',
            avoidLabelOverlap: false,
            label: {
                normal: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    show: true,
                    textStyle: {
                        fontSize: '30',
                        fontWeight: 'bold'
                    }
                }
            },
            labelLine: {
                normal: {
                    show: false
                }
            },
            data: [
                {
                    name: 'VJ',
                    value: 48
                },
                {
                    name: 'VY',
                    value: 35
                },
                {
                    name: 'VJ',
                    value: 410
                }
            ],
            itemStyle: {
                emphasis: {
                    shadowBlur: 10,
                    shadowOffsetX: 0,
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        }
    ]
}