<template>
  <el-container>
    <el-header>
      <el-select v-model="searchFix" placeholder="请选择" style="width: 200px; float: left; margin: 10px">
        <el-option label="全部" value="" key=""></el-option>
          <el-option label="待处理" value="2" key="2"></el-option>
          <el-option label="正在处理" value="3" key="3"></el-option>
          <el-option label="已完成" value="4" key="4"></el-option>
      </el-select>
      <el-button style="float: left; margin: 10px" @click="loadFix()">查询</el-button>
      <download-excel :data="json_data" :fields="json_fields" name="报修信息.xls">
        <el-button style="float: left; margin: 10px" type="success">导出报修信息为excel表</el-button>
      </download-excel>
    </el-header>
    <el-main style="height: 600px">
      <hr style="margin-top: -20px; width: 620px; float:left">
      <div class="myFix" v-for="item in fixes">
        <el-divider></el-divider>
        <el-image :src="item.cover" class="myFixImg"></el-image>
        <br>
        <el-tag size="medium" type="danger" effect="dark" class="myTag" v-if="item.process == 2">待维修: {{item.id}}号报修</el-tag>
        <el-tag size="medium" effect="dark" class="myTag" v-if="item.process == 3">正在维修: {{item.id}}号报修</el-tag>
        <el-tag size="medium" type="success" effect="dark" class="myTag" v-if="item.process == 4">维修完成: {{item.id}}号报修</el-tag>
        <br>
        <div style="font-size: 16px;margin-left: 30px">报修人: {{item.stuname}}</div>
        <br>
        <div style="font-size: 16px;margin-left: 30px">宿舍位置: {{item.buildName}}</div>
        <br>
        <div style="font-size: 16px;margin-left: 30px">报修物品: {{item.stuff}}</div>
        <br>
        <div style="font-size: 16px;margin-left: 30px">报修描述: {{item.description}}</div>
        <br>
        <el-button type="danger" icon="el-icon-s-open" style="margin-left: 30px" @click="goFix(item.id, item.process)" v-if="item.process == 2">去处理</el-button>
        <el-button type="primary" icon="el-icon-s-open" style="margin-left: 30px" @click="goFix(item.id, item.process)" v-if="item.process == 3">维修完成</el-button>
        <el-button type="success" icon="el-icon-delete-solid" style="margin-left: 30px" @click="deleteFix(item.id)" v-if="item.process == 4">删除报修信息</el-button>
      </div>
      <hr style=" width: 620px; float:left">
    </el-main>
  </el-container>
</template>

<script>
    export default {
        name: 'ManagerFixAdmin',
        data() {
            return {
                fixes: [],
                insertTitle: '',
                insertContent: '',
                searchFix: '',
                json_data: [],
                json_meta: [
                    [
                        {
                            'key': 'charset',
                            'value': 'utf-8'
                        }
                    ]
                ],
                json_fields: {
                    '编号': 'id',
                    '报修物品': 'stuff',
                    '报修描述': 'description',
                    '报修人': 'stuname',
                    '报修地址': 'buildName',
                    '报修进度': 'process'
                },
            }
        },
        mounted: function () {
            this.loadFix()
        },
        methods: {
            loadFix() {
                var _this = this
                this.$axios.post('/studentFix/list', {
                    process: this.searchFix
                }).then(resp => {
                    if (resp && resp.status === 200) {
                        _this.fixes = resp.data.data
                        _this.json_data = resp.data.data
                    }
                })
            },
            goFix(id, process) {
                this.$confirm('结束当前阶段，进入下一阶段？', '˙○˙ฅ', {
                    confirmButtonText: '下一阶段',
                    cancelButtonText: '取消',
                    type: 'info'
                }).then(() => {
                    this.$axios.post('/studentFix/update', {
                        id: id,
                        process: process+1
                    }).then(resp => {
                        if (resp && resp.status === 200) {
                            this.$message({
                                type: 'success',
                                message: '已完成请求!'
                            })
                        }
                        this.loadFix()
                    })
                })
            },
            deleteFix(id) {
                this.$confirm('是否删除该条报修信息？', '˙○˙ฅ', {
                    confirmButtonText: '是',
                    cancelButtonText: '非',
                    type: 'info'
                }).then(() => {
                    this.$axios.post('/studentFix/delete', {
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

  .myFix{
    text-align: left;
    width: 600px;
    min-height: 300px;
    padding-left: 20px;
  }
  .myFixImg {
    width: 250px;
    height: 250px;
    margin-left: 400px;
    margin-top: 20px;
    position: absolute;
  }
  .myTag{
    height: 40px;
    width: 190px;
    font-size: 20px;
    padding-top: 5px;
    margin-bottom: 10px;
  }
</style>
