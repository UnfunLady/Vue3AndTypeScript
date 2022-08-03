<template>
    <div>
        <el-pagination :total="total" :current-page="page" :page-size="size" :page-sizes="pageSizes"
            @current-change="handleCurrentChange" :layout="layout" @size-change="handleSizeChange">
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
            type: [],
            default: [5, 10, 15]
        }
    },
    emits: ['Pagination'],
    setup(props, ctx) {
        function handleCurrentChange(val: number) {
            const query = {
                page: val,
                size: props.size
            }
            ctx.emit('Pagination', query)
        }

        function handleSizeChange(val: number) {
            const query = {
                page: props.page,
                size: val
            }
            ctx.emit('Pagination', query)
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