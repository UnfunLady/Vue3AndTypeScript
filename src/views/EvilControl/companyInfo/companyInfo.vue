<template>
    <Header title="公司疫苗接种信息" msg='展示的是公司人员部门疫苗接种详细情况' />
    <br>
    <el-card></el-card>

</template>

<script lang='ts'>
import { reactive, ref, toRefs, defineComponent, onMounted } from 'vue'
export default defineComponent({
    name: 'companyInfo',
    setup() {
        const changeMobsfIframe = () => {
            const mobsf = document.getElementById('mobsf');
            const deviceWidth = document.body.clientWidth;
            const deviceHeight = document.body.clientHeight;
            mobsf.style.width = (Number(deviceWidth)) + 'px'; //数字是页面布局宽度差值
            mobsf.style.height = (Number(deviceHeight)) + 'px'; //数字是页面布局高度差
        }

        window.onresize = function () {
            changeMobsfIframe()
        }
        return {
        }

    }
});
</script>
<style lang='scss' scoped>
</style>