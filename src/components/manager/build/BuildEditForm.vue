<template>
  <div>
    <el-button @click="BuildDialogFormVisible = true" type="info" style="width: 160px">新增宿舍楼</el-button>
    <el-dialog title="宿舍楼管理" :visible.sync="BuildDialogFormVisible" @close="clear">
      <el-form v-model="buildForm" style="text-align: left">
        <el-form-item label="宿舍楼名" :label-width="formLabelWidth">
          <el-input v-model="buildForm.name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="宿舍楼号" :label-width="formLabelWidth"
          :rules="[
          { required: true, message: '年龄不能为空'},
          { type: 'number', message: '年龄必须为数字值'}
        ]">
          <el-input  type="no" v-model.number="buildForm.no" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="height: 0">
          <el-input type="hidden" v-model="buildForm.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="BuildDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSureCommit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'BuildEditForm',
  data () {
    return {
      buildForm: {
        name: '',
        no: '',
        id: ''
      },
      BuildDialogFormVisible: false,
      formLabelWidth: '120px'
    }
  },
  methods: {
    clear () {
      this.buildForm = {
        name: '',
        no: '1',
        id: ''
      }
    },
    onSureCommit () {
      this.$axios.post('/build/addOrUpdate', {
        bid: this.buildForm.id,
        buildName: this.buildForm.name,
        buildNo: this.buildForm.no
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.BuildDialogFormVisible = false
          this.$emit('onSubmit')
        }
      })
    },
    editBuild () {

    }
  }
}
</script>

<style scoped>

</style>
