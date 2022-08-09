import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption
// 主页数据
export interface mainViewData {
    deptInfo: []
}

export class mainViewDataInit {
    mainViewData: mainViewData = {
        deptInfo: []
    }
}
// 第一张图
export const oneCharts = (dom: HTMLElement, data: any) => {
    var chartDom = dom!;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
        title: {
            text: data.title,
            left: 'center'
        },
        tooltip: {
            trigger: 'item'
        },
        legend: {
            orient: 'vertical',
            left: 'left'
        },
        series: [

            {
                animationDuration: 2500,
                name: '单位:人数',
                type: 'pie',
                radius: ['40%', '70%'],
                avoidLabelOverlap: false,
                data: data.deptInfo,
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                },
                label: {
                    show: false,
                    position: 'inner',
                    color: 'white',
                }
            }
        ]
    };
    option && myChart.setOption(option);
}

// 第二张图
export const twoCharts = (dom: HTMLElement, data: any) => {
    // 部门名字集合
    const nameData = []
    // 平均薪资集合
    const avgData = []
    // 部门总人数集合
    const countData = []
    // 部门小组数集合
    const groupData = []
    data.deptDetailInfo.forEach((item, index) => {
        nameData.push(item.name)
        avgData.push(item.avg)
        countData.push(item.count)
        groupData.push(item.groupCount)
    })

    var chartDom = dom;
    var myChart = echarts.init(chartDom);
    var option: EChartsOption;
    option = {
        animationDuration: 2500,
        title: {
            text: '各部门细节'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data: ['平均工资', '总人数', '部门小组数']
        },
        grid: {
            left: '3%',
            right: '2%',
            bottom: '0%',
            containLabel: true
        },

        xAxis: {
            type: 'category',
            boundaryGap: false,
            data: nameData
        },
        yAxis: {
            type: 'value'
        },
        series: [

            {
                name: '平均工资',
                type: 'line',
                stack: 'Total',
                data: avgData
            },
            {
                name: '总人数',
                type: 'line',
                stack: 'Total',
                data: countData
            },
            {
                name: '部门小组数',
                type: 'line',
                stack: 'Total',
                data: groupData
            },

        ]
    };

    option && myChart.setOption(option);

}