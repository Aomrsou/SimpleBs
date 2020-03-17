<template>
  <el-container>
    <el-header height="100px" style="padding: 10px">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="班级名称">
          <el-input v-model="searchName" placeholder="请输入班级名称"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-select v-model="searchFlag" placeholder="请选择宿舍楼号">
            <el-option label="有效" value="1"></el-option>
            <el-option label="无效" value="2"></el-option>
            <el-option label="-未选择-" value=""></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="searchClass" style="width: 160px">查询</el-button>
        </el-form-item>
        <el-form-item>
          <class-edit-form @onSubmit="loadClass" ref="edit"></class-edit-form>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="classes" style="width: 100%;margin: 10px">
        <el-table-column label="班级名称" width="220">
          <template slot-scope="scope">
            <span v-show="!edit">({{ scope.row.name }})</span>
            <el-input v-show="edit" v-model="scope.row.name" style="width: 180px"></el-input>
            <i :inline="true"
              :class="{'el-icon-edit': !edit, 'el-icon-check': edit}"
              @click="edit = !edit"
            ></i>
          </template>
        </el-table-column>
        <el-table-column label="是否启用" width="180">
          <template slot-scope="scope">
            <el-radio v-model="scope.row.flag" label="1">是</el-radio>
            <el-radio v-model="scope.row.flag" label="2">否</el-radio>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editClass(scope.row)">保存
            </el-button>
<!--            <el-button size="mini" disabled="true" type="danger" @click="handleDelete(scope.row.id)">删不删-->
<!--            </el-button>-->
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import ClassEditForm from './ClassEditForm'
export default {
  name: 'ManagerClass',
  components: {ClassEditForm},
  data () {
    return {
      classes: [],
      searchName: '',
      searchFlag: '',
      edit: false
    }
  },
  mounted: function () {
    this.loadClass()
  },
  methods: {
    loadClass () {
      var _this = this
      this.$axios.get('/class/getlist').then(resp => {
        if (resp && resp.status === 200) {
          _this.classes = resp.data.data
        }
      })
    },
    searchClass () {
      var _this = this
      var name = this.searchName
      var flag = this.searchFlag
      this.$axios.post('/class/list', {
        name, flag
      }).then(resp => {
        if (resp && resp.status === 200) {
          _this.classes = resp.data.data
        }
      })
    },
    editClass (item) {
      var _this = this
      var id = item.id
      var name = item.name
      var flag = item.flag
      this.$axios.post('/class/update', {
        id, name, flag
      }).then(resp => {
        this.$message({
          type: 'success',
          message: '修改成功!'
        })
      })
      _this.edit = false
    },
    handleDelete (index) {
      this.$confirm('此操作将永久删除该班级, 是否继续?', '警告', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.post('/class/delete', {
          bid: index
        }).then(resp => {
          if (resp && resp.data.code === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.loadBuild()
          } else {
            var numbersRoom = resp.data.data
            var str = '('
            for (var key in numbersRoom) {
              str += numbersRoom[key].dornum + '有' + numbersRoom[key].nownum + '人,'
            }
            str += '等)'
            this.$message({
              type: 'danger',
              message: '该宿舍楼内' + str + '居住，无法删除!'
            })
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    }
  }
}
</script>

<style scoped>

</style>
