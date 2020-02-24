<template>
  <div>
    <el-button @click="StuDialogFormVisible = true" type="primary">新增</el-button>
    <el-dialog title="学生管理" :visible.sync="StuDialogFormVisible">
      <el-form v-model="studentForm" style="text-align: left">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="studentForm.xuehao" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="studentForm.xingming" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-input v-model="studentForm.xingbie" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-input v-model="studentForm.banji" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="宿舍" :label-width="formLabelWidth">
          <el-input v-model="studentForm.sushe" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="height: 0">
          <el-input type="hidden" v-model="studentForm.id" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="StuDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSureCommit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  name: 'StudentEditForm',
  data () {
    return {
      StuDialogFormVisible: false,
      formLabelWidth: '120px',
      studentForm: {
        xuehao: '',
        xingming: '',
        xingbie: '',
        banji: '',
        sushe: '',
        id: ''
      }
    }
  },
  methods: {
    clear () {
      this.studentForm = {
        xuehao: 'a',
        xingming: 'a',
        xingbie: 'a',
        banji: '',
        sushe: '',
        id: ''
      }
    },
    onSureCommit () {
      this.studentForm = {
        xuehao: 'a',
        xingming: 'a',
        xingbie: 'bb',
        banji: '',
        sushe: '',
        id: ''
      }
    }
  }
}
</script>

<style scoped>

</style>
