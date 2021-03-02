<template>
  <el-container>
    <el-header height="100px" style="padding: 10px">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item label="宿舍楼">
          <el-select v-model="searchBuild" placeholder="请选择宿舍楼">
            <el-option v-for="(item,index) in curriculums" :key="index" :label="item.buildName"
                       :value="item.bid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="楼层">
          <el-select v-model="searchFloor" placeholder="请选择楼层">
            <el-option label="1层" value="1"></el-option>
            <el-option label="2层" value="2"></el-option>
            <el-option label="3层" value="3"></el-option>
            <el-option label="4层" value="4"></el-option>
            <el-option label="5层" value="5"></el-option>
            <el-option label="6层" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="宿舍号">
          <el-input v-model="searchNum" placeholder="请输入宿舍号" style="width: 180px"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="searchDormitory" style="width: 160px">查询</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="dormitorys" style="width: 100%;margin: 10px">
        <el-table-column prop="buildName" label="宿舍楼" width="180"></el-table-column>
        <el-table-column prop="dornum" label="宿舍编号" width="180"></el-table-column>
        <el-table-column prop="floor" label="楼层" width="100"></el-table-column>
        <el-table-column prop="heal" label="卫生状况" width="180">
          <template slot-scope="scope">
            <el-rate v-model="scope.row.heal" :colors="colors"></el-rate>
          </template>
        </el-table-column>
        <el-table-column prop="did" label="宿舍" width="180" v-if="false"></el-table-column>
        <el-table-column prop="bid" label="宿舍" width="180" v-if="false"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editHygiene(scope.row.did, scope.row.heal)">评分
            </el-button>
            <el-button size="mini" type="info" @click="editHygiene(scope.row.did, 2)">重置为2分
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: 'ViewManagerHygiene',
        data() {
            return {
                dormitorys: [],
                curriculums: [],
                buildName: '',
                dornum: '',
                floor: '',
                maxnum: '',
                numnum: '',
                bid: '',
                did: '',
                searchBuild: '',
                searchFloor: '',
                searchNum: '',
                colors: ['#99A9BF', '#F7BA2A', '#FF9900']
            }
        },
        mounted: function () {
            this.loadDormitorys()
            this.buildSelect()
        },
        methods: {
            loadDormitorys() {
                var _this = this
                this.$axios.get('/dor/getlist').then(resp => {
                    if (resp && resp.status === 200) {
                        _this.dormitorys = resp.data.data
                    }
                })
            },
            searchDormitory() {
                var _this = this
                var bid = this.searchBuild
                var floor = this.searchFloor
                var dornum = this.searchNum
                this.$axios.post('/dor/list', {
                    bid, floor, dornum
                }).then(resp => {
                    if (resp && resp.status === 200) {
                        _this.dormitorys = resp.data.data
                    }
                })
            },
            buildSelect() {
                var _this = this
                this.$axios.get('/build/buildSelect').then(resp => {
                    _this.curriculums = resp.data.data
                })
            },
            editHygiene(did, heal) {
                this.$axios.post('/dor/addOrUpdate', {
                    heal, did
                }).then(resp => {
                    if (resp && resp.status === 200) {
                        this.$message({
                            type: 'success',
                            message: '评分成功！'
                        })
                        this.loadDormitorys()
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
