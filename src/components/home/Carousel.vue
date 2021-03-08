<template>
  <el-table
    :data="stus"
    stripe
    style="width: 100%">
    <el-table-column
      prop="num"
      label="学号"
      width="180">
    </el-table-column>
    <el-table-column
      prop="name"
      label="姓名"
      width="180">
    </el-table-column>
    <el-table-column
      prop="sex"
      label="性别">
    </el-table-column>
  </el-table>
</template>

<style>
</style>

<script>
    export default {
        name: 'Carousel',
        data: function () {
            return {
                stus: [],
                did: ''
            }
        },
        methods: {
            getList(){
                this.$axios
                    .post('/stu/list', {
                        did: this.did
                    }).then(resp => {
                    if (resp.data.code == 200) {
                        this.stus = resp.data.data
                    }
                })
            }
        },
        mounted() {
            var info = window.localStorage.getItem('myInfo')
            this.did = JSON.parse(info).did
            this.getList()
        }

    }
</script>
