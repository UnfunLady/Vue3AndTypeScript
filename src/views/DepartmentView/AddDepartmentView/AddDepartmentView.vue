<template>
    <div>
        <Header title="创建新部门" msg="创建新的一个工作部门之前,请确认不要重复" />
        <br>
        <el-card>
            <div style="max-width:400px;margin:0 auto;">
                <el-form :model="data.addDepartmentData.addDepartmentForm" label-width="auto">
                    <el-form-item label="部门头像:">
                        <div class="uploadAvatar">
                            <el-upload :headers="config" ref="upload" class="avatar-uploader" :action="uploadUrl"
                                :auto-upload="false" list-type="picture-card" :on-success="handleAvatarSuccess"
                                :limit="1" :before-upload="beforeAvatarUpload" :on-exceed="handleExceed">
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
                    <el-form-item label="部门名字:">
                        <el-input v-model="data.addDepartmentData.addDepartmentForm.dname" size="large"
                            placeholder="请输入新建部门的名字">
                        </el-input>
                    </el-form-item>
                    <el-form-item label="部门职责:">
                        <el-input v-model="data.addDepartmentData.addDepartmentForm.explain" size="large"
                            placeholder="请输入新建部门的职责">
                        </el-input>
                    </el-form-item>
                </el-form>
            </div>
            <div style="text-align: center;">
                <el-button style=" color: white !important;" icon="Plus" size="large" type="info" @click="clearForm"
                    :loading="data.addDepartmentData.addDepartmentForm.loading">
                    重置表单
                </el-button>
                <el-button style=" color: white !important;" icon="Plus" size="large" color="#529a7c"
                    :disabled="data.addDepartmentData.addDepartmentForm.dname == '' || data.addDepartmentData.addDepartmentForm.explain == ''"
                    @click="confirmAddDepartment" :loading="data.addDepartmentData.addDepartmentForm.loading">
                    确认创建
                </el-button>
            </div>

        </el-card>
        <el-dialog v-model="dialogVisible">
            <img class="showImg" :src="dialogImageUrl" alt="Preview Image" />
        </el-dialog>


    </div>
</template>

<script lang='ts' setup>
import { reactive, ref, getCurrentInstance, computed } from 'vue'
import { addDepartmentDataInit } from '@/types/department'
import { UploadInstance, UploadProps, UploadFile, UploadRawFile, FormInstance, ElMessageBox } from 'element-plus';
import { ElMessage, genFileId } from 'element-plus'
import useStore from '@/store';
// 初始化数据
const data = reactive(new addDepartmentDataInit())
// 上传的原型
const upload = ref<UploadInstance>();
const API = getCurrentInstance().appContext.config.globalProperties.$API;
// 上传头像的地址
const uploadUrl = computed(() => {
    return `/api/addDeptpartment?dname=${data.addDepartmentData.addDepartmentForm.dname}&explain=${data.addDepartmentData.addDepartmentForm.explain}`
})
// 获取用户信息
const { user } = useStore()
// 上传文件时候携带的token
const config = {
    token: user.getUserToken
}


// 是否预览
const dialogVisible = ref(false)
// 预览的url
const dialogImageUrl = ref('')
// 成功回调
const handleAvatarSuccess: UploadProps['onSuccess'] = (response) => {
    if (response.code === 200) {
        ElMessage.success('创建新部门成功!')
        upload.value!.clearFiles();
        data.addDepartmentData.addDepartmentForm.dname = '';
        data.addDepartmentData.addDepartmentForm.explain = '';
    } else {
        ElMessage.error(response.msg)
    }
}
// 上传之前
const beforeAvatarUpload: UploadProps['beforeUpload'] = (rawFile) => {
    const imageType = ['image/jpeg', 'image/png']
    if (imageType.indexOf(rawFile.type) === -1) {
        ElMessage.error('上传图片的格式必须是JPG或PNG！')
        return false
    } else if (rawFile.size / 1024 / 1024 > 2) {
        ElMessage.error('图像大小不能超过2MB！')
        return false
    }
    return true
}
// 超过最大上传数量
// 文件超出时 替换掉上面那个
const handleExceed: UploadProps['onExceed'] = (files) => {
    // 删除原来的
    upload.value!.clearFiles()
    const file = files[0] as UploadRawFile
    file.uid = genFileId()
    // 设置最新的
    upload.value!.handleStart(file);
}
// 预览
const handlePictureCardPreview = (file: UploadFile) => {
    dialogVisible.value = true;
    dialogImageUrl.value = file.url;
}
// 点击删除按钮时删除图片
const handleRemove = (file: UploadFile) => {
    upload.value!.handleRemove(file);
}
// 重置表单
const clearForm = () => {
    data.addDepartmentData.addDepartmentForm.dname = '';
    data.addDepartmentData.addDepartmentForm.explain = '';
    upload.value!.clearFiles();

}
// 确认新增部门
const confirmAddDepartment = () => {
    ElMessageBox.confirm('请您确认是否上传了头像,<span style="color: red">未上传头像将添加失败!</span>', '确认信息', {
        confirmButtonText: '是的我确认',
        cancelButtonText: '我再看看',
        confirmButtonClass: 'cButton',
        type: 'warning',
        dangerouslyUseHTMLString: true,
    }).then(() => {
        data.addDepartmentData.addDepartmentForm.loading = true;
        upload.value!.submit();
        setTimeout(() => {
            data.addDepartmentData.addDepartmentForm.loading = false;
        }, 1000)
    })
}



</script>
<style lang='scss' >
.showImg {
    max-width: 700px;
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

.cButton {
    background-color: rgba(0, 128, 0, 0.812) !important;
    border: none;

}

.cButton:hover {
    background-color: rgb(45, 96, 41) !important;
}
</style>