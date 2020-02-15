<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']" :default-active="'/admin/student'" router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>学生 & 宿舍管理</template>
        <el-menu-item-group>
          <template slot="title">学生管理</template>
          <el-menu-item :index="'/admin/student'">学生信息管理</el-menu-item>
          <el-menu-item index="1-2">班级信息管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="宿舍管理">
          <el-menu-item index="1-3">宿舍信息管理</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">卫生管理</template>
          <el-menu-item index="1-4-1">卫生信息展示</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="2">
        <template slot="title"><i class="el-icon-menu"></i>访客权限管理</template>
        <el-menu-item-group>
          <template slot="title">访客管理</template>
          <el-menu-item index="2-1">访客权限管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>反馈报修管理</template>
        <el-menu-item-group>
          <template slot="title">反馈管理</template>
          <el-menu-item index="3-1">反馈管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="报修管理">
          <el-menu-item index="3-3">报修管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
export default {
  name: 'LeftSideMenu'
}
</script>

<style scoped>

</style>
