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
      </el-table>
    </div>
  </div>
</template>

<script>
    export default {
        name: 'Message',
        data() {
            return {
                tableData: []
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
            }
        },
        mounted: function () {
            this.loadNotice()
        }
    }
</script>

<style>
  a{
    color: #7ac804;
  }
</style>

