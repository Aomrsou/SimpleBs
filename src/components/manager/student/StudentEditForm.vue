<template>
  <div>
    <el-button @click="StuDialogFormVisible = true" type="info" style="width: 160px">新增</el-button>
    <el-dialog title="学生管理" :visible.sync="StuDialogFormVisible">
      <el-form v-model="studentForm" style="text-align: left">
        <el-form-item label="学号" :label-width="formLabelWidth">
          <el-input v-model="studentForm.xuehao" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="姓名" :label-width="formLabelWidth">
          <el-input v-model="studentForm.xingming" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" :label-width="formLabelWidth">
          <el-radio v-model="studentForm.xingbie" label="男"></el-radio>
          <el-radio v-model="studentForm.xingbie" label="女"></el-radio>
        </el-form-item>
        <el-form-item label="班级" :label-width="formLabelWidth">
          <el-select v-model="studentForm.banji" filterable placeholder="请选择班级">
            <el-option v-for="(item,index) in classSelectInfo" :key="index" :label="item.name"
                       :value="item.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍楼" :label-width="formLabelWidth">
          <el-select v-model="studentForm.sushelou" filterable placeholder="请选择宿舍楼" @change="dorSelect">
            <el-option v-for="(item,index) in curriculums" :key="index" :label="item.buildName"
                       :value="item.bid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍" :label-width="formLabelWidth">
          <el-select v-model="studentForm.sushe" filterable placeholder="请先选择宿舍楼" :disabled="flagToDisable">
            <el-option v-for="(item,index) in dorSelectInfoByBid" :key="index" :label="item.dornum"
                       :value="item.did"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="height: 0">
          <el-input type="hidden" v-model="studentForm.id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item style="height: 0">
          <el-input type="hidden" v-model="studentForm.susheid" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="clear">取 消</el-button>
        <el-button type="primary" @click="onSureCommit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: 'StudentEditForm',
        data() {
            return {
                StuDialogFormVisible: false,
                formLabelWidth: '120px',
                studentForm: {
                    xuehao: '',
                    xingming: '',
                    xingbie: '男',
                    banji: '',
                    sushe: '',
                    susheid: '',
                    sushelou: '',
                    id: ''
                },
                curriculums: [],
                classSelectInfo: [],
                dorSelectInfoByBid: [],
                flagToDisable: true,
                myFlag: 'noAdjust'
            }
        },
        mounted: function () {
            this.buildSelect()
            this.classSelect()
        },
        methods: {
            clear() {
                this.studentForm = {
                    xuehao: '',
                    xingming: '',
                    xingbie: '男',
                    banji: '',
                    sushe: '',
                    susheid: '',
                    sushelou: '',
                    id: ''
                }
                this.flagToDisable = true
                this.StuDialogFormVisible = false
            },
            onSureCommit() {
                console.log(this.studentForm)
                var num = this.studentForm.xuehao
                var name = this.studentForm.xingming
                var sex = this.studentForm.xingbie
                var cls = this.studentForm.banji
                var dor = this.studentForm.sushe
                var id = this.studentForm.id
                var did = this.studentForm.susheid
                var buildName = (dor === did) ? 'noAdjust' : 'isAdjust'
                this.$axios.post('/stu/addOrUpdate', {
                    num, name, sex, cls, dor, id, did, buildName
                }).then(resp => {
                    if (resp && resp.status === 200) {
                        this.$message({
                            type: 'success',
                            message: '添加成功'
                        })
                    }
                })
                this.StuDialogFormVisible = false
                this.clear()
                this.$emit('onSubmit')
            },
            buildSelect() {
                var _this = this
                this.$axios.get('/build/buildSelect').then(resp => {
                    _this.curriculums = resp.data.data
                })
            },
            classSelect() {
                var _this = this
                this.$axios.post('/class/list', {
                    flag: 1
                }).then(resp => {
                    if (resp && resp.status === 200) {
                        _this.classSelectInfo = resp.data.data
                    }
                })
            },
            dorSelect() {
                var _this = this
                var bid = this.studentForm.sushelou
                this.$axios.post('/dor/list', {
                    bid
                }).then(resp => {
                    if (resp && resp.status === 200) {
                        _this.dorSelectInfoByBid = resp.data.data
                    }
                })
                _this.flagToDisable = false
            }
        }
    }
</script>

<style scoped>

</style>
