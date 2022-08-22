<template>
    <div class="father">
        <div id="one" class="one"></div>
        <div id="two" class="two"></div>
        <div id="three" class="three">
            <div class="card" v-for="(item) in mainViewData.showData " :key="item['id']">
                <div class="number" :style="{
                    color: item['color']
                }">
                    <count-to v-if="Number(item['num'])" :startVal="0" :endVal="item['num']" :decimals="0"
                        :duration="2000">
                    </count-to>
                    <span v-else>{{ item['num'] }}</span>
                </div>
                <div>
                    <span style="color:gray;font-size: 18px;">{{ item['title'] }}</span>
                </div>
            </div>
        </div>
    </div>
</template>
<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive, toRefs } from 'vue'
import { mainViewDataInit, oneCharts, twoCharts, getCompanyDetail, initData } from '@/types/main'
export default defineComponent({
    setup() {
        // 初始化数据
        const data = reactive(new mainViewDataInit());
        // API
        const API = getCurrentInstance().appContext.config.globalProperties.$API;
        onMounted(async () => {
            const oneRes = await API.main.getDeptInfo();
            oneCharts(document.getElementById('one')!, oneRes)
            const twoRes = await API.main.getDeptDetailInfo();
            twoCharts(document.getElementById('two')!, twoRes)
            // 获取细节数据
            const detail = await getCompanyDetail(API);
            if (detail.code === 200) {
                data.mainViewData.DetailData = detail.detailData;
                initData(data)
            }
        })
        return {
            ...toRefs(data)
        }
    }
})
</script>
<style lang="scss" scoped>
.father {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
    height: 100%;
}

.one,
.two {
    min-width: 80vh;
    min-height: 45vh;
    margin: 30px 30px 30px 30px;
}

.three {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 37vh;
    box-shadow: 0 2px 13px 2px rgba(143, 141, 141, 0.17);
    border-radius: 10px;
    margin: 30px 30px 30px 30px;
}

.card {
    text-align: center;
    margin: 40px;
    width: 250px;
    background-color: white;
    border-radius: 4px;
    margin-left: 18px;
    vertical-align: middle;
    display: inline-block;
}

.card span {
    margin: 10px;
    display: inline-block;
    letter-spacing: 2px;
}

.number {
    font-size: 40px;
    font-weight: bold;
}
</style>