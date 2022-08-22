<template>
    <div>
        <!-- <router-view v-slot="{ Component }">
<keep-alive>
<component :is="Component" />
</keep-alive>
</router-view> -->
        <router-view></router-view>
    </div>
</template>
<script lang='ts'>
import { defineComponent } from 'vue';
export default defineComponent({
    name: 'SalaryView',
    setup() {
    }
});
</script>
<style lang='scss' scoped>
</style>