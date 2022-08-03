<template>
    <div>
        <el-card>
            <div>
                <p style="font-size: 22px;">  {{title}}</p>
            </div>
            <div class="explain">
                {{msg}}
            </div>
        </el-card>
    </div>
</template>

<script lang='ts'>
import { toRefs } from 'vue';
export default {
    name: 'EmployeHeaderView',
    props: {
        title: String,
        msg: String
    },
    setup(prop) {
        const { msg, title } = toRefs(prop);
        return {
            msg, title
        }

    }
};
</script>
<style lang='scss' scoped>
.el-main {
    padding: 0;
}

.el-card {
    padding: 0;

    .explain {
        padding-top: 20px;
        color: #909399;
    }
}
</style>