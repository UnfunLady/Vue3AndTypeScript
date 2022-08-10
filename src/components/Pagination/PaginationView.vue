<template>
    <div>
        <el-pagination :disabled="disabled" :total="total" :current-page="page" :page-size="size"
            :page-sizes="pageSizes" @current-change="handleCurrentChange" :layout="layout"
            @size-change="handleSizeChange">
        </el-pagination>
    </div>
</template>

<script lang='ts'>
import { defineComponent } from "vue";

export default defineComponent({
    name: "PaginationView",
    props: {
        page: Number,
        size: Number,
        total: Number,
        layout: {
            type: String,
            default: "->,total, sizes, prev,pager, next,jumper",
        },
        // 页容量布局
        pageSizes: {
            type: Array,
            default: [8, 10, 15]
        },
        // 是否禁用
        disabled: {
            type: Boolean,
            default: false
        }
    },
    emits: ['pagination'],
    setup(props, ctx) {
        function handleCurrentChange(val: number) {
            const query = {
                page: val,
                size: props.size
            }
            ctx.emit('pagination', query)


        }

        function handleSizeChange(val: number) {
            const query = {
                page: props.page,
                size: val
            }
            ctx.emit('pagination', query)
        }
        return {
            handleCurrentChange,
            handleSizeChange,
        };
    },
});
</script>
<style lang='scss' scoped>
</style>