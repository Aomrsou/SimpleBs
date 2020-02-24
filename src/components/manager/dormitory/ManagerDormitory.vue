<template>
  <el-container>
    <el-header height="100px" style="padding: 10px">
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item  label="宿舍楼">
          <el-select v-model="searchBuild" placeholder="请选择宿舍楼">
            <el-option v-for="(item,index) in curriculums" :key="index" :label="item.buildName" :value="item.bid"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="楼层">
          <el-select v-model="searchFloor" placeholder="请选择楼层">
            <el-option label="1层" value="1"></el-option>
            <el-option label="2层" value="2"></el-option>
            <el-option label="3层" value="3"></el-option>
            <el-option label="4层" value="4"></el-option>
            <el-option label="5层" value="5"></el-option>
            <el-option label="6层" value="6"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item  label="宿舍号">
          <el-input v-model="searchNum" placeholder="请输入宿舍号" style="width: 180px"></el-input>
        </el-form-item>
      </el-form>
      <el-form :inline="true" class="demo-form-inline">
        <el-form-item>
          <el-button type="primary" @click="searchDormitory" style="width: 160px">查询</el-button>
        </el-form-item>
        <el-form-item>
          <dor-edit-form @onSubmit="loadDormitorys" ref="edit"></dor-edit-form>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <el-table :data="dormitorys" style="width: 100%;margin: 10px">
        <el-table-column prop="buildName" label="宿舍楼" width="180"></el-table-column>
        <el-table-column prop="dornum" label="宿舍编号" width="180"></el-table-column>
        <el-table-column prop="floor" label="楼层"></el-table-column>
        <el-table-column prop="maxnum" label="床位数" width="180"></el-table-column>
        <el-table-column prop="nownum" label="现居人数" width="180"></el-table-column>
        <el-table-column prop="did" label="宿舍" width="180" v-if="false"></el-table-column>
        <el-table-column prop="bid" label="宿舍" width="180" v-if="false"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" @click="editBuild(scope.row)">编辑
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row.did)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-main>
  </el-container>
</template>

<script>
import DorEditForm from './DorEditForm'

export default {
  name: 'ManagerDormitory',
  components: {DorEditForm},
  data () {
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
      searchNum: ''
    }
  },
  mounted: function () {
    this.loadDormitorys()
    this.buildSelect()
  },
  methods: {
    loadDormitorys () {
      var _this = this
      this.$axios.get('/dor/getlist').then(resp => {
        if (resp && resp.status === 200) {
          _this.dormitorys = resp.data.data
        }
      })
    },
    searchDormitory () {
      var _this = this
      var bid = this.searchBuild
      var floor = this.searchFloor
      var dornum = this.searchNum
      this.$axios.post('/dor/list', {
        bid, floor, dornum
      }).then(resp => {
        console.log(resp)
        if (resp && resp.status === 200) {
          _this.dormitorys = resp.data.data
        }
      })
    },
    editBuild (item) {
      this.$refs.edit.DorDialogFormVisible = true
      this.$refs.edit.dorForm = {
        buildName: item.buildName,
        floor: item.floor,
        num: item.num,
        dornum: item.floor + item.num,
        maxnum: item.maxnum,
        heal: item.heal,
        nownum: item.nownum,
        did: item.did,
        bid: item.bid
      }
    },
    handleDelete (index) {
      console.log('1+1=' + index)
    },
    buildSelect () {
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
