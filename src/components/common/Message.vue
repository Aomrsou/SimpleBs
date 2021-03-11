<template>
  <div >
    <div>
      <el-table
        :data="tableData"
        stripe
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="scope">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item>
                <span>{{ scope.row.content }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>

        <el-table-column prop="title"></el-table-column>

        <el-table-column prop="noticetime" align="right"></el-table-column>
        <el-table-column width="60px" v-if="myInfo.name === 'admin'">
          <template slot-scope="scope">
          <el-button @click="deleteNotice(scope.row.id)" type="danger" icon="el-icon-delete" size="mini" circle></el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Message',
        data() {
            return {
                tableData: [],
                myInfo: []
            }
        },
        methods:{
            loadNotice(){
                this.$axios.post('/notice/list', {
                    id: 1
                }).then(resp => {
                    if(resp.data.code == 200){
                        this.tableData = resp.data.data
                    }
                })
            },
            deleteNotice(id){
                this.$confirm('是否删除该公告？', '˙○˙ฅ', {
                    confirmButtonText: '删除',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$axios.post('/notice/delete', {
                        id
                    }).then(resp => {
                        if (resp && resp.status === 200) {
                            this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        }
                        this.loadNotice()
                    })
                })
            }
        },
        mounted: function () {
            this.loadNotice()
            var info = window.localStorage.getItem('myInfo')
            this.myInfo = JSON.parse(info)
        }
    }
</script>

<style>
  a{
    color: #7ac804;
  }
</style>

