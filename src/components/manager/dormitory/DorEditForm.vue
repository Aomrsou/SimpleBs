<template>
  <div>
    <el-button @click="DorDialogFormVisible = true" type="info" style="width: 160px">新增宿舍</el-button>
    <el-dialog title="宿舍楼管理" :visible.sync="DorDialogFormVisible" @close="clear">
      <el-form v-model="dorForm" style="text-align: left">
        <el-form-item label="所属宿舍楼" :label-width="formLabelWidth">
          <el-select v-model="dorForm.buildName" placeholder="请选择宿舍楼">
            <el-option v-for="(item,index) in curriculums" :key="index" :label="item.buildName"
                       :value="item.bid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="所在楼层" :label-width="formLabelWidth">
          <el-select v-model="dorForm.floor" placeholder="请选择楼层" v-on:input="compute">
            <el-option label="1层" value="1"></el-option>
            <el-option label="2层" value="2"></el-option>
            <el-option label="3层" value="3"></el-option>
            <el-option label="4层" value="4"></el-option>
            <el-option label="5层" value="5"></el-option>
            <el-option label="6层" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍编号" :label-width="formLabelWidth">
          <el-input v-model="dorForm.num" autocomplete="off" v-on:input="compute"></el-input>
        </el-form-item>
        <el-form-item label="完整宿舍号" :label-width="formLabelWidth">
          <el-input v-model="dorForm.dornum" autocomplete="off" :disabled="true"></el-input>
        </el-form-item>
        <el-form-item label="宿舍床数" :label-width="formLabelWidth">
          <el-select v-model="dorForm.maxnum" placeholder="请选择床位数">
            <el-option label="1个" value="1"></el-option>
            <el-option label="2个" value="2"></el-option>
            <el-option label="3个" value="3"></el-option>
            <el-option label="4个" value="4"></el-option>
            <el-option label="5个" value="5"></el-option>
            <el-option label="6个" value="6"></el-option>
            <el-option label="7个" value="7"></el-option>
            <el-option label="8个" value="8"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input type="hidden" v-model="dorForm.did" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="hidden" v-model="dorForm.bid" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="DorDialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="onSureCommit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: 'DorEditForm',
        data() {
            return {
                dorForm: {
                    buildName: '',
                    floor: '1',
                    num: '',
                    dornum: '',
                    maxnum: '6',
                    heal: '',
                    nownum: '',
                    did: '',
                    bid: ''
                },
                DorDialogFormVisible: false,
                formLabelWidth: '120px',
                curriculums: []
            }
        },
        mounted: function () {
            this.buildSelect()
        },
        methods: {
            clear() {
                this.dorForm = {
                    buildName: '',
                    floor: '1',
                    num: '',
                    dornum: '',
                    maxnum: '6',
                    heal: '',
                    nownum: '',
                    did: '',
                    bid: ''
                }
            },
            onSureCommit() {
                this.$axios.post('/dor/addOrUpdate', {
                    bid: this.dorForm.bid,
                    buildName: this.dorForm.buildName,
                    did: this.dorForm.did,
                    floor: this.dorForm.floor,
                    num: this.dorForm.num,
                    dornum: this.dorForm.dornum,
                    maxnum: this.dorForm.maxnum
                }).then(resp => {
                    if (resp && resp.status === 200) {
                        this.DorDialogFormVisible = false
                        this.$emit('onSubmit')
                    }
                })
            },
            compute() {
                this.dorForm.dornum = this.dorForm.floor + this.dorForm.num
            },
            buildSelect() {
                var _this = this
                this.$axios.get('/build/buildSelect').then(resp => {
                    _this.curriculums = resp.data.data
                })
            }
        }
    }
</script>

<style scoped>

</style>
