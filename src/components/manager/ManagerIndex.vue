<template>
  <el-container style="height: 1080px; border: 1px solid #eee">
  <left-side-menu></left-side-menu>
  <router-view/>
</el-container>
</template>

<script>
import LeftSideMenu from './LeftSideMenu'

export default {
  name: 'ManagerIndex',
  components: {LeftSideMenu},
  data () {
    const item = {
      date: '2020-02-12',
      name: '张子扬',
      address: '山西'
    }
    return {
      tableData: Array(20).fill(item)
    }
  }
}
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }
</style>
