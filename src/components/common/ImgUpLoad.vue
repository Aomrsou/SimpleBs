<template>
  <el-upload
    class="img-upload"
    ref="upload"
    action="http://localhost:8888/bs/studentFix/imgUpload"
    :on-preview="handlePreview"
    :on-remove="handleRemove"
    :before-remove="beforeRemove"
    :on-success="handleSuccess"
    multiple
    :limit="1"
    :on-exceed="handleExceed"
    :file-list="fileList">
    <el-button type="primary" plain style="width: 220px">点击上传 图片<i class="el-icon-upload el-icon--right"></i></el-button>
    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
  </el-upload>
</template>

<script>
    export default {
        name: 'ImgUpLoad',
        data () {
            return {
                fileList: [],
                url: ''
            }
        },
        methods: {
            handleRemove (file, fileList) {
            },
            handlePreview (file) {
            },
            handleExceed (files, fileList) {
                this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
            },
            beforeRemove (file, fileList) {
                return this.$confirm(`确定移除 ${file.name}？`)
            },
            handleSuccess (response) {
                this.url = response.data[0]
                this.$emit('onUpload')
                this.$message.warning('上传成功')
            },
            clear () {
                this.$refs.upload.clearFiles()
            }
        }
    }
</script>

<style scoped>

</style>
