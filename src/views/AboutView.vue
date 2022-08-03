<template>
  <el-upload ref="uploadAvatar" class="avatar-uploader" action="/api/editDept" :auto-upload="false"
    list-type="picture-card" :on-success="handleAvatarSuccess" :limit="1" :before-upload="beforeAvatarUpload"
    :on-exceed="handleExceed">
    <template #file="{ file }">
      <div>
        <img class="el-upload-list__item-thumbnail" :src="file.url" alt="" />
        <span class="el-upload-list__item-actions">
          <span class="el-upload-list__item-preview" @click="handlePictureCardPreview(file)">
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

  <el-dialog v-model="dialogVisible">
    <img class="showImg" :src="dialogImageUrl" alt="Preview Image" />
  </el-dialog>

  <el-button type="success" @click="submit">上传图片</el-button>
</template>


<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, genFileId } from 'element-plus'
import type { UploadInstance, UploadProps, UploadFile, UploadRawFile, } from 'element-plus'
// 获取ref
const uploadAvatar = ref<UploadInstance>()
// 定义预览图片url
const dialogImageUrl = ref('')
// 是否预览
const dialogVisible = ref(false)
// 上传之前判断是否是jpg且不能大于2mb
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
  // 将上传后的url返回显示
  // imageUrl.value = URL.createObjectURL(uploadFile.raw!)
}
// 点击删除按钮时删除图片
const handleRemove = (file: UploadFile) => {
  uploadAvatar.value.handleRemove(file);
}

// 文件超出时 替换掉上面那个
const handleExceed: UploadProps['onExceed'] = (files) => {
  // 删除原来的
  uploadAvatar.value!.clearFiles()
  const file = files[0] as UploadRawFile
  file.uid = genFileId()
  // 设置最新的
  uploadAvatar.value!.handleStart(file)
}

const submit = () => {
  uploadAvatar.value!.submit()
}

// 点击预览时显示图片
const handlePictureCardPreview = (file: UploadFile) => {
  dialogImageUrl.value = file.url!
  dialogVisible.value = true
}



</script>



<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}



.showImg {
  max-width: 900px;
}

.el-icon.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  text-align: center;
}
</style>