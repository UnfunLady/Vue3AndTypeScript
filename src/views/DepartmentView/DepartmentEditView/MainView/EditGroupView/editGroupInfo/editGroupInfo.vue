<template>
    <div>
        <el-card>
            <el-button color="#296a99" icon="Back" size="large" @click="back">返回</el-button>
            <br />
            <el-form ref="editGroupFormRef" :rules="rules" :model="editGroupForm" style="width: 20%; margin: 0 auto"
                label-width="auto">
                <el-form-item label="小组名字:" prop="deptname">
                    <el-input v-model="editGroupForm['deptname']" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="所在位置:" prop="location">
                    <el-input v-model="editGroupForm['location']" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="小组总人数:" prop="count">
                    <el-input v-model="editGroupForm['count']" placeholder=""></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button color="#296a99" icon="Check" size="default" @click="editGroup(editGroupFormRef)">修改信息
                    </el-button>

                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script lang='ts'>
import { ElMessage, FormInstance } from "element-plus";
import { ref, defineComponent, getCurrentInstance } from "vue";
import { updateGroupInfo } from '@/types/department'
export default defineComponent({
    name: "editGroupInfo",
    emits: ["back"],
    props: {
        editGroupForm: {
            default: [],
        },
    },
    setup(props, ctx) {

        // 表单原型
        const editGroupFormRef = ref<FormInstance>()
        // API
        const API = getCurrentInstance().appContext.config.globalProperties.$API;
        // 返回
        const back = () => {
            ctx.emit("back");
        };
        // 表单验证
        const rules = {
            deptname: [
                { required: true, message: "请输入小组名字!", trigger: "blur" },
                { min: 2, max: 8, message: "小组名在2-8位之间!", trigger: "blur" },
            ],
            location: [
                { required: true, message: "请输入小组地址!", trigger: "blur" },
                { min: 2, max: 8, message: "地址名在2-8位之间!", trigger: "blur" },
            ],
            count: [
                { required: true, message: "请输入小组总人数,请确定无误后输入!", trigger: "blur" },
            ],
        };
        // 确认修改
        const editGroup = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate(async (valid) => {
                if (valid) {
                    const res = await updateGroupInfo(API, props.editGroupForm);
                    if (res && res.code === 200) {
                        ElMessage.success('修改信息成功!');
                        back()
                    }
                    else {
                        ElMessage.error('修改信息失败')
                    }
                } else {
                    ElMessage.warning('请确认输入的数据格式是否正确！')
                }
            })
        }

        return {
            back,
            rules,
            editGroup,
            editGroupFormRef
        };
    },
});
</script>
<style lang='scss' >
</style>