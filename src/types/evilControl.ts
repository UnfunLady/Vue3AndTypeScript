import axios from 'axios';
import * as echarts from 'echarts';
type EChartsOption = echarts.EChartsOption

interface chinaInfo {
    title: string,
    allInfo: Array<Object>,
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
        ]
    }
}


export const getAllEvilInfo = () => {
    return new Promise(resolve => {
        axios({
            url: 'https://c.m.163.com/ug/api/wuhan/app/data/list-total'
        }).then((res) => {
            resolve(res)
        })
    })
}

export const chart = (dom: HTMLElement) => {
    var myChart = echarts.init(dom);
    var option: EChartsOption;
    const colors = ['#5470C6', '#91CC75', '#EE6666'];

    option = {
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'shadow'
            }
        },
        legend: {},
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis: [
            {
                type: 'category',
                data: ['境外输入', '无症状感染者', '现有确诊', '累计确诊', '累计死亡', '累计治愈']
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name: '境外输入',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [11514, 11514, 11514, 11514, 11514, 11514]
            },
            {
                name: '无症状感染者',
                type: 'bar',

                emphasis: {
                    focus: 'series'
                },
                data: [11514, 11514, 11514, 11514, 11514, 11514]
            },
            {
                name: '现有确诊',
                type: 'bar',

                emphasis: {
                    focus: 'series'
                },
                data: [11514, 11514, 11514, 11514, 11514, 11514]
            },
            {
                name: '累计确诊',
                type: 'bar',

                emphasis: {
                    focus: 'series'
                },
                data: [11514, 11514, 11514, 11514, 11514, 11514]
            },
            {
                name: '累计死亡',
                type: 'bar',
                data: [11514, 11514, 11514, 11514, 11514, 11514],
                emphasis: {
                    focus: 'series'
                },

            },
            {
                name: '累计治愈',
                type: 'bar',
                emphasis: {
                    focus: 'series'
                },
                data: [11514, 11514, 11514, 11514, 11514, 11514]
            },

        ]
    };

    option && myChart.setOption(option);

}