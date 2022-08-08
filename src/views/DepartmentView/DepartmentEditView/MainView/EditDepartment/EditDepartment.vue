<template>
    <div>
        <el-card style="margin-top:20px">
            <div>
                <el-button color="#296a99" icon="Back" size="large" @click="back">返回部门信息</el-button>
                <el-button color="#296a99" icon="Right" size="large" @click="goGroupEdit">编辑小组信息</el-button>
            </div>
            <br>
            <el-form ref="updateDeptFormRef" :rules="rules" :model="editDeptData.editDeptData" size="large"
                label-width="auto" style="width:30%;margin: 0 auto;" class="editForm">
                <el-form-item label="当前部门头像:">
                    <el-avatar style="width:40px;height: 40px;" :src="editDeptData.editDeptData.avatar" />
                </el-form-item>
                <el-form-item label="修改的部门头像:">
                    <div class="uploadAvatar">
                        <el-upload ref="upload" class="avatar-uploader" :action="uploadUrl" :auto-upload="false"
                            list-type="picture-card" :on-success="handleAvatarSuccess" :limit="1"
                            :before-upload="beforeAvatarUpload" :on-exceed="handleExceed">
                            <template #file="{ file }">
                                <div>
                                    <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
                                    <span class="el-upload-list__item-actions">
                                        <span class="el-upload-list__item-preview"
                                            @click="handlePictureCardPreview(file)">
                                            <el-icon>
                                                <zoom-in />
                                            </el-icon>
                                        </span>
                                        <span class="el-upload-list__item-delete" @click="handleRemove(file)">
                                            <el-icon>
                                                <Delete />
                                            </el-icon>
                                        </span>
                                    </span>
                                </div>
                            </template>
                            <el-icon class="avatar-uploader-icon">
                                <Plus />
                            </el-icon>
                        </el-upload>
                    </div>

                </el-form-item>
                <el-form-item label="部门名字:" prop="dname">
                    <el-input v-model="editDeptData.editDeptData.dname" placeholder=""></el-input>
                </el-form-item>
                <el-form-item label="部门职责:" prop="explain">
                    <el-input v-model="editDeptData.editDeptData.explain" placeholder=""></el-input>
                </el-form-item>

                <el-form-item label="">
                    <el-button icon="edit" color="#296a99" @click="submit(updateDeptFormRef)" :loading="loading">确认修改
                    </el-button>
                </el-form-item>
            </el-form>

        </el-card>
        <el-dialog v-model="dialogVisible">
            <img class="showImg" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>
    </div>
</template>

<script lang='ts'>

import { reactive, ref, toRefs, defineComponent, onMounted, inject, getCurrentInstance, computed } from 'vue'
import { editDepartmentDataInit, updateDepartmentNoAvatar } from '@/types/department'
import { ElMessage, genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadFile, UploadRawFile, FormInstance } from 'element-plus';
import { useRouter } from 'vue-router';
export default defineComponent({
    name: 'EditDepaetMent',
    props: ['editDeptData', 'isEdit'],
    setup(props, ctx) {
        // 定义路由
        const router = useRouter();
        // 上传的原型
        const upload = ref<UploadInstance>();
        // 定义预览图片url
        const dialogImageUrl = ref('')
        // 是否预览
        const dialogVisible = ref(false)
        // loading
        const loading = ref(false)
        // API
        const API = getCurrentInstance().appContext.config.globalProperties.$API;
        // 定义数据
        const data = reactive(new editDepartmentDataInit())
        // 获取数据
        data.editDeptData = props.editDeptData;
        // 上传之前判断是否是jpg或png且不能大于2mb
        const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
            const imageType = ['image/jpeg', 'image/png']
            if (imageType.indexOf(rawFile.type) === -1) {
                ElMessage.error('上传的图片必须是JPG或PNG格式!')
                return false
            } else if (rawFile.size / 1024 / 1024 > 2) {
                ElMessage.error('图像不能超过2MB!')
                return false
            }
            return true
        }
        // 成功回调
        const handleAvatarSuccess: UploadProps['onSuccess'] = (
            response,
            uploadFile
        ) => {
            console.log(response);
            // 已经上传了图片
            data.editDeptData.isUpload = true;
            // 将上传后的url返回显示
            // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
        }
        // 点击删除按钮时删除图片
        const handleRemove = (file: UploadFile) => {
            upload.value!.handleRemove(file);
            // 取消了上传
            data.editDeptData.isUpload = false;
        }
        // 文件超出时 替换掉上面那个
        const handleExceed: UploadProps['onExceed'] = (files) => {
            // 删除原来的
            upload.value!.clearFiles()
            const file = files[0] as UploadRawFile
            file.uid = genFileId()
            // 设置最新的
            upload.value!.handleStart(file);
            // 上传状态为false
            data.editDeptData.isUpload = false;
        }
        // 点击预览时显示图片
        const handlePictureCardPreview = (file: UploadFile) => {
            dialogImageUrl.value = file.url!
            // 设置图片可见
            dialogVisible.value = true
        }
        // 返回按钮
        const back = () => {
            ctx.emit('back')
        }
        // 上传图片
        const uploadAvatar = () => {
            // 先上传  在成功的回调里再执行
            upload.value!.submit();
        }
        // 基础表单验证规则
        const rules = {
            dname: [
                { required: true, message: "请输入部门名字!", trigger: "blur" },
                { min: 4, max: 8, message: "用户名必须是4-8位", trigger: "blur" },
            ],
            explain: [
                { required: true, message: "请输入部门描述!", trigger: "blur" },
                { min: 2, max: 60, message: "部门描述必须是2-50位", trigger: "blur" },
            ],
        };
        // 确认修改
        const submit = (formEl: FormInstance | undefined) => {
            if (!formEl) return
            formEl.validate((valid) => {
                if (valid) {
                    // 执行上传图片 如果有图片会上传
                    uploadAvatar();
                    loading.value! = true;
                    setTimeout(async () => {
                        //isupload为true时 执行修改logo的api
                        if (data.editDeptData.isUpload) {
                            setTimeout(() => {
                                ElMessage.success('修改成功!')
                                // 返回初始界面
                                data.editDeptData.isEdit = false;
                                // 取消loading
                                loading.value! = false;
                            }, 800)

                        }
                        else {
                            // 执行没有修改logo的api
                            const res = await updateDepartmentNoAvatar(API, data.editDeptData)
                            if (res.code == 200) {
                                ElMessage.success('信息修改成功!')
                            } else {
                                ElMessage.error('信息修改失败!')
                            }
                            data.editDeptData.isEdit = false;
                            loading.value! = false;
                        }
                    }, 1000)

                } else {
                    ElMessage.warning('请确认输入的数据格式是否正确！')

                }
            })


        }
        // 计算action
        const uploadUrl = computed(() => {
            // 定义action地址 并把参数传递过去
            return `/api/editDept?dno=${data.editDeptData.editDeptData.dno}&dname=${data.editDeptData.editDeptData.dname}&explain=${data.editDeptData.editDeptData.explain}`;
        })
        // 小组编辑页面
        const goGroupEdit = () => {
            // todo 路由跳转到编辑小组页面
            router.push({
                name: 'EditGroup',
                params: {
                    dno: data.editDeptData.editDeptData.dno
                }
            })
        }



        return {
            ...toRefs(data),
            back,
            beforeAvatarUpload,
            submit,
            handleExceed,
            handleRemove,
            handleAvatarSuccess,
            handlePictureCardPreview,
            upload,
            dialogImageUrl,
            dialogVisible,
            uploadAvatar,
            loading,
            uploadUrl,
            rules,
            goGroupEdit

        }

    }
});
</script>
<style lang='scss'>
.showImg {
    max-width: 800px;
}

.el-dialog {
    max-width: 800px;
}

.avatar-uploader .el-upload {
    width: 100px;
    height: 60px;
}

.el-upload-list--picture-card .el-upload-list__item {
    width: 100px;
    height: 60px;

}
</style>