<template>
  <el-container>
    <el-header>
      <el-input
        style="width: 500px; float: left; margin: 10px" v-model="searchLos" placeholder="请输入内容">
      </el-input>
      <el-button style="float: left; margin: 10px" @click="loadFix()" >查询</el-button>
    </el-header>
    <el-main style="height: 600px">
      <hr style="margin-top: -20px; width: 620px; float:left">
      <div v-for="(loses, index) in loses" v-bind:key="index">
        <div style="width: 600px; height: 100px; margin: 10px; box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)"
           :class="loses.flag == 1? 'resolved': 'normal'">
          <div style="width: 500px; height: 40px;margin-left: 30px">
            <i class="el-icon-collection-tag" style="float:left; margin-top: 10px; padding-right: 10px"><b> {{loses.title}}</b></i>
          </div>
          <div style="width: 500px;">
            {{loses.content}}
          </div>
          <div style="float:right; margin-top: -10px; margin-right: 10px">
            <div v-if="loses.flag == 0">
              <el-button type="success" icon="el-icon-check" circle @click="updateFix(loses.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="deleteFix(loses.id)"></el-button>
            </div>
            <div v-if="loses.flag == 1">
              <i class="el-icon-check">已解决</i>
              <el-button type="danger" icon="el-icon-delete" circle></el-button>
            </div>
          </div>
        </div>
      </div>
      <hr style=" width: 620px; float:left">
    </el-main>
  </el-container>
</template>

<script>
export default {
  name: 'ViewManagerFixAdmin',
  data () {
    return {
      loses: [],
      insertTitle: '',
      insertContent: '',
      searchLos: ''
    }
  },
  mounted: function () {
    this.loadFix()
  },
  methods: {
    loadFix () {
      var _this = this
      var search = this.searchLos
      this.$axios.post('/losAndFix/listFix', {
        searchContent: search
      }).then(resp => {
        if (resp && resp.status === 200) {
          _this.loses = resp.data.data
        }
      })
    },
    insert () {
      var title = this.insertTitle
      var content = this.insertContent
      this.$axios.post('losAndFix/addFix', {
        title, content
      }).then(resp => {
        if (resp && resp.status === 200) {
          this.$message({
            type: 'success',
            message: '发表成功!'
          })
        }
        this.loadFix()
      })
      this.insertTitle = ''
      this.insertContent = ''
    },
    updateFix (id) {
      this.$confirm('该问题已解决？', '˙○˙ฅ', {
        confirmButtonText: '是',
        cancelButtonText: '非',
        type: 'info'
      }).then(() => {
        this.$axios.post('losAndFix/updateFix', {
          id
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message({
              type: 'success',
              message: '已更新!'
            })
          }
          this.loadFix()
        })
      })
    },
    deleteFix (id) {
      this.$confirm('是否删除该条报修信息？', '˙○˙ฅ', {
        confirmButtonText: '是',
        cancelButtonText: '非',
        type: 'info'
      }).then(() => {
        this.$axios.post('losAndFix/deleteFix', {
          id
        }).then(resp => {
          if (resp && resp.status === 200) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
          }
          this.loadFix()
        })
      })
    }
  }
}
</script>

<style scoped>
.resolved {
  background-color: #eaeaea;
}
.normal {
  background-color: white;
}
</style>
