<template>
  <el-container>
    <el-header height="150px" style="padding: 10px">
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
        <el-form-item>
          <student-edit-form @onSubmit="onSubmit" ref="insert"></student-edit-form>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item  label="班级">
          <el-select v-model="cls" filterable  placeholder="请输入班级">
            <el-option v-for="(item,index) in classSelectInfo" :key="index" :label="item.name" :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="宿舍">
          <el-select v-model="dor" filterable placeholder="请选择宿舍">
            <el-option v-for="(item,index) in dorSelectInfoByBid" :key="index" :label="item.dornum" :value="item.dornum"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="宿舍楼">
          <el-select v-model="buildName" filterable placeholder="请选择宿舍楼" @change="dorSelect">
            <el-option v-for="(item,index) in curriculums" :key="index" :label="item.buildName" :value="item.bid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width: 80px">查询</el-button>
        </el-form-item>
      </el-form>
      <el-form>
        <el-form-item>
          <download-excel :data="json_data" :fields="json_fields" name="学生信息.xls" >
            <el-button type="warning">导出学生信息为excel表</el-button>
          </download-excel>
        </el-form-item></el-form>
    </el-header>
    <el-main>
      <el-table :data="students.slice((currentPage-1)*pagesize,currentPage*pagesize)" style="width: 100%;margin: 10px">
        <el-table-column prop="num" label="学号" width="160"></el-table-column>
        <el-table-column prop="name" label="姓名" width="120"></el-table-column>
        <el-table-column prop="sex" label="性别" width="100"></el-table-column>
        <el-table-column prop="cls" label="班级" width="180"></el-table-column>
        <el-table-column prop="buildName" label="所属宿舍楼" width="180"></el-table-column>
        <el-table-column prop="dor" label="宿舍" width="100"></el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editStudent(scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        :total="students.length">
      </el-pagination>
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
      curriculums: [],
      classSelectInfo: [],
      dorSelectInfoByBid: [],
      input: '',
      num: '',
      name: '',
      sex: '',
      cls: '',
      dor: '',
      buildName: '',
      total: 0,
      pagesize: 5,
      currentPage: 1,
      json_fields: {
        '学号': 'num',
        '姓名': 'name',
        '性别': 'sex',
        '班级': 'cls',
        '宿舍楼': 'buildName',
        '宿舍': 'dor'
      },
      json_data: [],
      json_meta: [
        [
          {
            'key': 'charset',
            'value': 'utf-8'
          }
        ]
      ]
    }
  },
  mounted: function () {
    this.loadStudents()
    this.buildSelect()
    this.classSelect()
    this.dorSelect()
  },
  methods: {
    onSubmit () {
      var _this = this
      var num = this.num
      var name = this.name
      var sex = this.sex
      var cls = this.cls
      var dor = this.dor
      var buildName = this.buildName
      this.$axios
        .post('/stu/list', {
          num, name, sex, cls, dor, buildName
        }).then(resp => {
          if (resp && resp.status === 200) {
            _this.students = resp.data.data
          }
        })
    },
    handleCurrentChange: function (currentPage) {
      this.currentPage = currentPage
    },
    loadStudents () {
      var _this = this
      this.$axios.get('/stu/getlist').then(resp => {
        if (resp && resp.status === 200) {
          _this.students = resp.data.data
          _this.json_data = resp.data.data
        }
      })
    },
    buildSelect () {
      var _this = this
      this.$axios.get('/build/buildSelect').then(resp => {
        _this.curriculums = resp.data.data
      })
    },
    classSelect () {
      var _this = this
      this.$axios.post('/class/list', {
        flag: 1
      }).then(resp => {
        if (resp && resp.status === 200) {
          _this.classSelectInfo = resp.data.data
        }
      })
    },
    dorSelect () {
      var _this = this
      var bid = this.buildName
      this.$axios.post('/dor/list', {
        bid
      }).then(resp => {
        if (resp && resp.status === 200) {
          _this.dorSelectInfoByBid = resp.data.data
        }
      })
    },
    editStudent (item) {
      console.log(item)
      this.$refs.insert.StuDialogFormVisible = true
      this.$refs.insert.studentForm = {
        xuehao: item.num,
        xingming: item.name,
        xingbie: item.sex,
        banji: item.cid,
        sushelou: item.buildName,
        sushe: item.dor,
        susheid: item.did,
        id: item.id
      }
    },
    handleDelete (index) {
      this.$confirm('此操作将永久删除该学生, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/stu/delete', {
          id: index
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功！'
            })
            this.loadStudents()
          }
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
