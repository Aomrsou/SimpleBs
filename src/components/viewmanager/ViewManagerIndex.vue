<template>
  <el-container style="height: 1080px;padding-left: 100px; border: 1px solid #eee">
<!--  <left-side-menu></left-side-menu>-->
    <div class="backTo">
      <el-button @click="back" style="height: 100%">
        <i class="el-icon-arrow-left" style="size: 50px"></i>
      </el-button>
    </div>
    <router-view/>
  </el-container>
</template>

<script>
import LeftSideMenu from './LeftSideMenu'

export default {
  name: 'ViewManagerIndex',
  components: {LeftSideMenu},
  mounted: function () {
    const h = this.$createElement
    this.$notify({
      title: 'Tips:',
      message: h('i', {style: 'color: teal'}, '点击图片进入编辑模式，点击蓝色名称进入此模块')
    })
  },
  data () {
    const item = {
      date: '2020-02-12',
      name: '张子扬',
      address: '山西'
    }
    return {
      tableData: Array(20).fill(item)
    }
  },
  methods: {
    back () {
      console.log(1)
      this.$router.go(-1)
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
