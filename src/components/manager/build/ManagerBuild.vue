<template>
  <el-container>
    <el-header height="100px" style="padding: 10px">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="宿舍楼名">
          <el-select v-model="searchBuildName" placeholder="请选择宿舍楼名">
            <el-option label="文澜" value="文澜"></el-option>
            <el-option label="文韬" value="文韬"></el-option>
            <el-option label="-未选择-" value=""></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍楼号">
          <el-select v-model="searchBuildNo" placeholder="请选择宿舍楼号">
            <el-option label="1" value="1"></el-option>
            <el-option label="2" value="2"></el-option>
            <el-option label="3" value="3"></el-option>
            <el-option label="4" value="4"></el-option>
            <el-option label="-未选择-" value=""></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="searchBuild" style="width: 160px">查询</el-button>
        </el-form-item>
        <el-form-item>
          <build-edit-form @onSubmit="loadBuild" ref="edit"></build-edit-form>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="builds" style="width: 100%;margin: 10px">
        <el-table-column label="宿舍楼名" width="180">
          <template slot-scope="scope">{{scope.row.buildName}}</template>
        </el-table-column>
        <el-table-column label="宿舍楼号" width="180">
          <template slot-scope="scope">{{scope.row.buildNo}}</template>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editBuild(scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.bid)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
    import BuildEditForm from './BuildEditForm'

    export default {
        name: 'ManagerBuild',
        components: {BuildEditForm},
        data() {
            return {
                builds: [],
                searchBuildName: '',
                searchBuildNo: ''
            }
        },
        mounted: function () {
            this.loadBuild()
        },
        methods: {
            loadBuild() {
                var _this = this
                this.$axios.get('/build/getlist').then(resp => {
                    if (resp && resp.status === 200) {
                        _this.builds = resp.data.data
                    }
                })
            },
            searchBuild() {
                var _this = this
                var buildName = this.searchBuildName
                var buildNo = this.searchBuildNo
                this.$axios.post('/build/list', {
                    buildName, buildNo
                }).then(resp => {
                    if (resp && resp.status === 200) {
                        _this.builds = resp.data.data
                    }
                })
            },
            editBuild(item) {
                this.$refs.edit.BuildDialogFormVisible = true
                this.$refs.edit.buildForm = {
                    name: item.buildName,
                    no: item.buildNo,
                    id: item.bid
                }
            },
            handleDelete(index) {
                this.$confirm('此操作将永久删除该宿舍楼及其下属宿舍, 是否继续?', '警告', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    this.$axios.post('/build/delete', {
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
