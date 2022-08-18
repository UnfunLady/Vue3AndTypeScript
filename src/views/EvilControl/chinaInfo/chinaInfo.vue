<template>
    <Header title="全国疫情信息" msg='展示的是中国全国疫情信息包括港澳台' />
    <br>
    <div class="main">
        <div class="allInfo">
            <div class="title">
                <h3 class="titleInfo">{{ data.chinaInfo.title }}</h3>
                <el-button color="#e44a3d" icon="AlarmClock" @click="updateNewEvilInfo">点击更新最新数据</el-button>
            </div>
            <!-- 疫情信息 -->
            <div class="infoCards">
                <div class="infoCard" v-for="item in data.chinaInfo.allInfo" :key="item['id']">
                    <div class="infoCard-title">
                        <h4>{{ item['title'] }}</h4>
                    </div>
                    <div class="infoCard-main">
                        <div class="infoNumber" :style="{
                            color: item['color']
                        }">
                            <!-- https://www.pudn.com/news/6228c8019ddf223e1ad0844a.html -->
                            <count-to :startVal="0" separator="" decimal="" :endVal="item['data']['oneNumber']"
                                :decimals="0" :duration="2000" @reset="reset">
                            </count-to>
                        </div>
                    </div>
                    <div class=" compare">
                        <div class="compareNumber" style="color:gray">
                            相较昨日:
                        </div>
                        <div class="compareNumber" :style="{
                            color: item['color']
                        }">
                            + <count-to :startVal="0" :endVal="item['data']['twoNumber']" :decimals="0"
                                :duration="2000">
                            </count-to>
                        </div>
                    </div>
                </div>

            </div>
            <div class="deadTime" style="margin:30px 30px 0 40px;color:gray;float: left;">
                上次更新时间:{{ data.chinaInfo.updateTime }}
            </div>
            <div class="about" style="float:right;margin:30px 40px 0 30px;color:gray ">
                数据来源：国家卫健委
            </div>
        </div>
        <div class="chart">

        </div>
    </div>




</template>

<script lang='ts' setup>
import { reactive, ref, toRefs, defineComponent, onMounted, getCurrentInstance, nextTick } from 'vue'
import { chinaInfoInit, getAllEvilInfo, chart, numberInit } from '@/types/evilControl';
import useStore from '@/store';


const instance = getCurrentInstance();
const data = reactive(new chinaInfoInit())
const API = getCurrentInstance().appContext.config.globalProperties.$API
const { evilInfo } = useStore();
onMounted(async () => {
    // 如果没有疫情数据就获取新数据
    if (evilInfo.evilDataInfo.evilData['length'] === 0) {
        console.log(0);
        const res = await getAllEvilInfo(API);
        evilInfo.savaEvilDataInfo(res.newslist[0].desc)
        data.chinaInfo.evilData = evilInfo.getEvilInfo
        // 将时间转换格式
        data.chinaInfo.updateTime = timestampToTime(evilInfo.getEvilInfo['modifyTime'])
    } else {
        // 有则拿数据
        data.chinaInfo.evilData = (evilInfo.getEvilInfo)
        // 将时间转换格式
        data.chinaInfo.updateTime = timestampToTime(evilInfo.getEvilInfo['modifyTime'])
    }
    // 赋值具体数字
    numberInit(data);
    // 初始化echarts x轴的值
    initEchartsxData()
    // 初始化echarts y轴的值
    initEchartsyData()
    chart(document.querySelector('.chart'), data)
})

// 时间戳转日期
const timestampToTime = (timestamp: number | string) => {
    let date = new Date(timestamp);//时间戳为10位需*1000，时间戳为13位的话不需乘1000
    let Y: string, M: string, D: string, h: string, m: string, s: number
    Y = date.getFullYear() + '-';
    M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
    D = date.getDate() < 10 ? '0' + date.getDate() + ' ' : date.getDate() + ' ';
    h = date.getHours() < 10 ? '0' + date.getHours() : date.getHours() + ':';
    m = date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes() + ':';
    s = date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds();
    return Y + M + D + h + m + s;
}
// 点击更新最新数据
const updateNewEvilInfo = async () => {
    // 清除前面的数据
    evilInfo.delEvilDataInfo();
    // 获取最新数据
    const res = await getAllEvilInfo(API);
    evilInfo.savaEvilDataInfo(res.newslist[0].desc)
    data.chinaInfo.evilData = evilInfo.getEvilInfo
    // 将时间转换格式
    data.chinaInfo.updateTime = timestampToTime(evilInfo.getEvilInfo['modifyTime'])
    initEchartsxData()
    instance.proxy.$forceUpdate();
}
// echarts 赋值给x轴数据
const initEchartsxData = () => {
    // x轴数据 6个
    data.chinaInfo.allInfo.map((i) => {
        data.chinaInfo.echarts.xData.push(i['title']);
    })
}
// echarts 赋值给x轴数据
const initEchartsyData = () => {
    // y轴数据 
    data.chinaInfo.allInfo.map((i) => {
        data.chinaInfo.echarts.yData.countData.push(i['data']['oneNumber'])
        data.chinaInfo.echarts.yData.moreData.push(i['data']['twoNumber'])
    })

}

const reset = () => {
    console.log(1);

}


</script>
<style lang='scss' scoped>
.main {

    display: flex;

    .allInfo {
        width: 40vw;
        height: 50vh;
        box-shadow: 2px 2px 10px 2px rgba(203, 201, 201, 0.384);
        border-radius: 10px;

        .title {
            text-align: center;

            .titleInfo {
                padding-top: 10px;
                color: rgb(51, 51, 51);
                font-size: 25px;
                margin-bottom: 20px;
            }
        }

        .infoCards {
            display: flex;
            flex-wrap: wrap;


            .infoCard {

                text-align: center;
                width: 23.566%;
                margin: 35px 40px 10px 40px;
                height: 13vh;

            }

            .infoCard-main {
                .infoNumber {
                    font-size: 40px;
                    color: rgb(180, 180, 180);
                    margin: 8px 0 8px 0;
                }
            }

            .compare {
                .compareNumber {
                    font-weight: 500;
                    font-family: Microsoft YaHei;
                    display: inline;
                }
            }
        }

    }

    .chart {
        box-shadow: 2px 2px 10px 2px rgba(203, 201, 201, 0.384);
        flex: 1;
        margin-left: 30px;

    }
}
</style>