<template>
  <div>
    <el-button @click="ClassDialogFormVisible = true" type="info" style="width: 160px">新增班级</el-button>
    <el-dialog title="班级管理" :visible.sync="ClassDialogFormVisible" @close="clear">
      <el-form v-model="classForm" style="text-align: left">
        <el-form-item label="班级名" :label-width="formLabelWidth">
          <el-input v-model="classForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否启用" :label-width="formLabelWidth">
          <el-radio v-model="classForm.flag" label="1">是</el-radio>
          <el-radio v-model="classForm.flag" label="0">否</el-radio>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="ClassDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSureCommit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'ClassEditForm',
  data () {
    return {
      classForm: {
        name: '',
        flag: '1',
        id: ''
      },
      ClassDialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.classForm = {
        name: '',
        flag: '1',
        id: ''
      }
    },
    onSureCommit () {
      this.$axios.post('/class/add', {
        name: this.classForm.name,
        flag: this.classForm.flag
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.ClassDialogFormVisible = false
          this.$emit('onSubmit')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
