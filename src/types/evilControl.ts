import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption
// 全国疫情信息
interface chinaInfo {
    title: string,
    allInfo: Array<Object>,
    evilData: {},
    updateTime: number | string,
    echarts: {
        xData: Array<string | number>,
        yData: {
            countData: Array<string | number>,
            moreData: Array<string | number>
        }
    }
}

export class chinaInfoInit {
    chinaInfo: chinaInfo = {
        title: '全国疫情数据(包含港澳台)',
        allInfo: [
            {
                id: 0,
                title: '境外输入',
                color: '#ffa352',
                data: []
            },
            {
                id: 1,
                title: '无症状感染者',
                color: '#791618',
                data: []
            },
            {
                id: 2,
                title: '现有确诊',
                color: '#e44a3d',
                data: []
            },
            {
                id: 3,
                title: '累计确诊',
                color: '#a31d13',
                data: []
            },
            {
                id: 4,
                title: '累计死亡',
                color: '#333333',
                data: []

            },
            {
                id: 5,
                title: '累计治愈',
                color: '#34aa70',
                data: []
            },
        ],
        evilData: {},
        updateTime: 0,
        echarts: {
            xData: [],
            yData: {
                moreData: [],
                countData: []
            }
        }
    }
}

// 获取疫情数据
export const getAllEvilInfo = (API: any) => {
    return API.evilControl.reqGetEvilInfo();
}
// echarts
export const chart = (dom: HTMLElement, data: any) => {
    var myChart = echarts.init(dom);
    var option: EChartsOption;
    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross',
                crossStyle: {
                    color: '#7F7D80',

                },
                label: {
                    precision: 0
                }

            }
        },
        toolbox: {
            feature: {
                dataView: { show: true, readOnly: false },
                magicType: { show: true, type: ['line', 'bar'] },
                restore: { show: true },

            }
        },
        legend: {
            data: ['总数', '相较昨日']
        },
        xAxis: [
            {
                type: 'category',
                data: data.chinaInfo.echarts.xData,
                axisPointer: {
                    type: 'shadow'
                },
            }
        ],
        yAxis: [
            {
                type: 'log',
                name: '现存人数',

                interval: 10000,
                axisLabel: {
                    formatter: '{value} 人'
                }
            },
            {
                type: 'log',
                name: '相较昨日',
                interval: 10000,

                axisLabel: {
                    formatter: '多{value} 人'
                }
            }
        ],
        series: [
            {
                name: '总数',
                type: 'bar',
                barWidth: 55,
                tooltip: {
                    valueFormatter: function (value: number) {
                        return value + '人';
                    }
                },
                data: data.chinaInfo.echarts.yData.countData
                , itemStyle: { color: '#ee6666' }
            },

            {
                name: '相较昨日',
                type: 'line',
                yAxisIndex: 1,
                lineStyle: {

                    color: '#ffa352',
                },
                tooltip: {
                    valueFormatter: function (value: number) {
                        return '+' + value + '人';
                    }
                },
                data: data.chinaInfo.echarts.yData.moreData
            }
        ]
    };

    option && myChart.setOption(option);

}
// 全国疫情数据数字细节赋值
export const numberInit = (data: any) => {
    // 设计的有问题只能一个个赋值
    data.chinaInfo.allInfo[0]['data'] = {
        oneNumber: data.chinaInfo.evilData['suspectedCount'],
        twoNumber: data.chinaInfo.evilData['suspectedIncr']
    };
    data.chinaInfo.allInfo[1]['data'] = {
        oneNumber: data.chinaInfo.evilData['seriousCount'],
        twoNumber: data.chinaInfo.evilData['seriousIncr']
    };
    data.chinaInfo.allInfo[2]['data'] = {
        oneNumber: data.chinaInfo.evilData['currentConfirmedCount'],
        twoNumber: data.chinaInfo.evilData['currentConfirmedIncr']
    };
    data.chinaInfo.allInfo[3]['data'] = {
        oneNumber: data.chinaInfo.evilData['confirmedCount'],
        twoNumber: data.chinaInfo.evilData['confirmedIncr']
    };
    data.chinaInfo.allInfo[4]['data'] = {
        oneNumber: data.chinaInfo.evilData['deadCount'],
        twoNumber: data.chinaInfo.evilData['deadIncr']
    };
    data.chinaInfo.allInfo[5]['data'] = {
        oneNumber: data.chinaInfo.evilData['curedCount'],
        twoNumber: data.chinaInfo.evilData['curedIncr']
    };
}




// 公司疫情信息
type companyInfo = {
    allDeptInfo: []
}

export class companyInfoInit {
    companyData: companyInfo = {
        allDeptInfo: []
    }
}


// 员工相关信息
type evilEmployeInfo = {
    // 员工相关信息
    employeInfo: [],
    allEmployeInfo: [],
    page: number | string,
    size: number | string,
    count: number | string,
    isAllEmploye: boolean,
}
export class evilEmployeInfoInit {
    employeData: evilEmployeInfo = {
        employeInfo: [],
        allEmployeInfo: [],
        page: 1,
        size: 8,
        count: 5,
        isAllEmploye: false
    }
}

export const getEvilEmployeInfo = (API: any, params: Object) => {
    return API.evilControl.reqGetEmployeEvilInfo(params)
}