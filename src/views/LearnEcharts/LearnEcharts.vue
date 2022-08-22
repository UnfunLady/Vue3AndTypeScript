<template>
    <iframe src="https://echarts.apache.org/zh/index.html" id="mobsf" frameborder="0"></iframe>
</template>

<script lang='ts'>
import { defineComponent } from 'vue'
export default defineComponent({
    name: 'EchartsDocument',
    setup() {

        return {
        }

    }
});
</script>
<style lang='scss' scoped>
#mobsf {
    width: 100%;
    height: 90vh
}
</style>