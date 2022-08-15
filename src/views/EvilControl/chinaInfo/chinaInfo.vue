<template>
    <Header title="全国疫情信息" msg='展示的是中国全国疫情信息包括港澳台' />
    <br>
    <div class="main">
        <div class="allInfo">
            <div class="title">
                <h3 class="titleInfo">{{ data.chinaInfo.title }}</h3>
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
                            <count-to :startVal="0" separator="" decimal="" :endVal="114514" :decimals="0"
                                :duration="1800">
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
                            + <count-to :startVal="0" :endVal="24" :decimals="0" :duration="2000">
                            </count-to>
                        </div>
                    </div>
                </div>

            </div>
            <div class="deadTime" style="margin:30px 30px 0 40px;color:gray;float: left;">
                上次更新时间:2022-08-15 09:15:41
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
import { reactive, ref, toRefs, defineComponent, onMounted } from 'vue'
import { chinaInfoInit, getAllEvilInfo, chart } from '@/types/evilControl';
const data = reactive(new chinaInfoInit())
onMounted(async () => {
    // const res = await getAllEvilInfo();
    // console.log(res);
    chart(document.querySelector('.chart'))
})
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
                margin: 40px 40px 10px 40px;
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