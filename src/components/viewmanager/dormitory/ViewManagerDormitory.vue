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
      <div v-if="dormitorys.length < 1">
        <hr>
        —— 该楼暂无宿舍，新建一个吧！ ——
      </div>
      <el-row style="height: 840px;">
        <div v-for="item in dormitorys"
             :key="item.did">
          <el-card style="width: 135px;margin-bottom: 20px;height: 133px;float: left;margin-right: 15px" class="book"
                   bodyStyle="padding:10px" shadow="hover">
            <div class="cover" @click="editBuild(item)">
              <img :src="item.heal" alt="封面">
            </div>
            <div class="info">
              <div class="title">
                <router-link :to="{name:'/viewadmin/student',query:{dornum:item.dornum}}">{{item.dornum}}</router-link>
              </div>
              <i class="el-icon-delete" @click="handleDelete(item.did, item.nownum)"></i>
            </div>
            <div class="author">{{item.buildName}}{{item.floor}}层</div>
          </el-card>
        </div>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
import DorEditForm from './DorEditForm'

export default {
  name: 'ViewManagerDormitory',
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
    if (this.$route.query.id) {
      this.searchBuild = this.$route.query.id
      this.searchDormitory()
    } else {
      this.loadDormitorys()
    }
    this.buildSelect()
  },
  methods: {
    loadDormitorys () {
      var _this = this
      this.$axios.get('/dor/getlist').then(resp => {
        if (resp && resp.status === 200) {
          _this.dormitorys = resp.data.data
          for (let i = 0; i < _this.dormitorys.length; i++) {
            var temp = _this.dormitorys[i].nownum
            _this.dormitorys[i].heal = 'http://localhost:8888/bs/img/' + temp + '.png'
          }
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
        if (resp && resp.status === 200) {
          _this.dormitorys = resp.data.data
          for (let i = 0; i < _this.dormitorys.length; i++) {
            var temp = _this.dormitorys[i].nownum
            _this.dormitorys[i].heal = 'http://localhost:8888/bs/img/' + temp + '.png'
          }
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
    handleDelete (index, nownum) {
      if (nownum === 0) {
        this.$confirm('此操作将永久删除该宿舍, 是否继续?', '警告', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$axios.post('/dor/delete', {
            did: index
          }).then(resp => {
            if (resp && resp.status === 200) {
              this.$message({
                type: 'success',
                message: '删除成功！'
              })
              this.searchDormitory()
            }
          })
        })
      } else {
        this.$message({
          type: 'info',
          message: '尚有人居住，无法删除！'
        })
      }
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

  .cover {
    width: 115px;
    height: 72px;
    margin-bottom: 7px;
    overflow: hidden;
    cursor: pointer;
  }

  img {
    width: 115px;
    height: 72px;
    /*margin: 0 auto;*/
  }

  .title {
    font-size: 14px;
    text-align: left;
  }

  .author {
    color: #333;
    width: 102px;
    font-size: 13px;
    margin-bottom: 6px;
    text-align: left;
  }

  .abstract {
    display: block;
    line-height: 17px;
  }

  .el-icon-delete {
    cursor: pointer;
    float: right;
  }

  .switch {
    display: flex;
    position: absolute;
    left: 780px;
    top: 25px;
  }

  a {
    text-decoration: none;
  }

  a:link, a:visited, a:focus {
    color: #3377aa;
  }
</style>
