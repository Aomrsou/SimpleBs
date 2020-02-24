<template>
  <el-container>
    <el-header height="100px" style="padding: 10px">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item  label="学号">
          <el-input v-model="num" placeholder="请输入学号" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item  label="姓名">
          <el-input v-model="name" placeholder="请输入姓名" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item  label="性别">
          <el-select v-model="sex" placeholder="请选择性别">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>
            <el-option label="-未选择-" value=""></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item  label="班级">
          <el-input v-model="cls" placeholder="请输入班级" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item  label="宿舍">
          <el-input v-model="dor" placeholder="请输入宿舍" style="width: 180px"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 160px">查询</el-button>
        </el-form-item>
        <el-form-item>
          <student-edit-form></student-edit-form>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="students" style="width: 100%;margin: 10px">
        <el-table-column prop="num" label="学号" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="sex" label="性别"></el-table-column>
        <el-table-column prop="cls" label="班级" width="180"></el-table-column>
        <el-table-column prop="dor" label="宿舍" width="180"></el-table-column>
        <el-table-column prop="id" label="操作"></el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import StudentEditForm from './StudentEditForm'

export default {
  name: 'ManagerStudent',
  components: {StudentEditForm},
  data () {
    return {
      students: [],
      input: '',
      num: '',
      name: '',
      sex: '',
      cls: '',
      dor: ''
    }
  },
  mounted: function () {
    this.loadStudents()
  },
  methods: {
    onSubmit () {
      var _this = this
      var num = this.num
      var name = this.name
      var sex = this.sex
      var cls = this.cls
      var dor = this.dor
      console.log(num)
      this.$axios
        .post('/stu/list', {
          num, name, sex, cls, dor
        }).then(resp => {
          console.log(resp)
          if (resp && resp.status === 200) {
            _this.students = resp.data.data
          }
        })
    },
    loadStudents () {
      var _this = this
      this.$axios.get('/stu/getlist').then(resp => {
        if (resp && resp.status === 200) {
          _this.students = resp.data.data
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
