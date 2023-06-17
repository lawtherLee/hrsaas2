<script>
import { defineComponent } from 'vue'
import COS from 'cos-js-sdk-v5'

const cos = new COS({
  SecretId: 'AKIDT6Yptv24vdEoXFpJdqxzSsGSc7ugO624',
  SecretKey: '4ExeCh4NlEYge2NXUEl6FJJbicLrDTTS'
})
export default defineComponent({
  name: 'UploadImg',
  data() {
    return {
      fileList: [
        { name: 'default', url: 'http://destiny001.gitee.io/image/cxk.gif' }
      ],
      previewImgDialogVisible: false,
      previewImgUrl: '',
      loading: false
    }
  },
  methods: {
    onChange() {

    },
    // 开始上传
    onRequest({ file, statusCode }) {
      this.loading = true
      cos.putObject({
        Bucket: 'hz-33-1259696257',
        Region: 'ap-nanjing',
        Key: file.name,
        StorageClass: 'STANDARD',
        Body: file,
        onProgress: progressData => {
          console.log(JSON.stringify(progressData))
        }
      }, (err, data) => {
        if (!err && data.statusCode === 200) {
          this.$emit('onSuccess', 'https://' + data.Location)
        } else {
          this.$message.error('上传失败')
        }
        this.loading = false
      })
    },
    onRemove(file, fileList) {
      this.fileList = fileList
    },
    onPreview(file) {
      this.previewImgUrl = file.url
      this.previewImgDialogVisible = true
    },
    beforeUpload(file) {
      // 检查文件类型
      const types = ['image/jpeg', 'image/gif', 'image/bmp', 'image/png']
      if (!types.includes(file.type)) {
        this.$message.error('上传图片只能是 JPG、GIF、BMP、PNG 格式!')
        return false
      }
      // 检查大小
      const maxSize = 5 * 1024 * 1024
      if (maxSize < file.size) {
        this.$message.error('图片大小最大不能超过5M')
        return false
      }
      return true
    }

  }
})
</script>

<template>
  <div>
    <el-upload
      v-loading="loading"
      :before-upload="beforeUpload"
      :class="fileList.length === 1 ? 'hideAdd' : ''"
      :file-list="fileList"
      :http-request="onRequest"
      :limit="1"
      :on-change="onChange"
      :on-preview="onPreview"
      :on-remove="onRemove"
      action="#"
      class="custom-upload"
      list-type="picture-card"
    >
      <i class="el-icon-plus" />
    </el-upload>
    <el-dialog
      :visible.sync="previewImgDialogVisible"
      title="图片预览"
    >
      <img :src="previewImgUrl" alt="" style="width: 100%">
    </el-dialog>
  </div>
</template>

<style lang="scss" scoped>
.hideAdd .el-upload--picture-card {
  display: none;
}

.custom-upload {
  width: 148px;
  height: 148px;
  overflow: hidden;
}
</style>
