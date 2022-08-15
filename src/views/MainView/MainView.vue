<template>
    <div class="father">
        <div id="one" class="one"></div>
        <div id="two" class="two"></div>

    </div>
</template>

<script lang="ts">
import { defineComponent, getCurrentInstance, onMounted, reactive } from 'vue'
import { mainViewDataInit, oneCharts, twoCharts } from '@/types/main'
import * as echarts from 'echarts';
import axios from 'axios';

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
        })


        return {}
    }
})
</script>

<style scoped>
.father {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    overflow: hidden;
    height: 100%;
}

.one,
.two {
    width: 80vh;
    height: 60vh;

    margin: 30px 30px 30px 30px;

}

.three,
.four {
    width: 80vh;
    height: 40vh;

    margin: 30px 30px 30px 30px;

}
</style>