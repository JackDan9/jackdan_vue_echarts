export const newPieOptions = {
    title: {
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
        right: 10,
        top: 20,
        bottom: 20,
        // zlevel: 9000,
        data: [{
            name: '系列1',
            // 强制设置图形为圆。
            icon: 'circle',
            // 设置文本为红色
            textStyle: {
                color: 'red'
            }
        }]
    },
    series: [
        {
            name: '',
            type: 'pie',
            radius: '55%',
            center: ['50%', '50%'],
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
                    shadowColor: 'rgba(0, 0, 0, 0.5'
                }
            }
        }
    ]
}