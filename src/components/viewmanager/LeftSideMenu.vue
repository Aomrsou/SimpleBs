<template>
  <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
    <el-menu :default-openeds="['1']" :default-active="active" router>
      <el-submenu index="1">
        <template slot="title"><i class="el-icon-message"></i>学生 & 宿舍管理</template>
        <el-menu-item-group>
          <template slot="title">学生管理</template>
          <el-menu-item :index="'/viewadmin/student'">学生信息管理</el-menu-item>
          <el-menu-item :index="'/viewadmin/class'">班级信息管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="宿舍管理">
          <el-menu-item :index="'/viewadmin/build'">宿舍楼管理</el-menu-item>
          <el-menu-item :index="'/viewadmin/dormitory'">宿舍信息管理</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <template slot="title">卫生管理</template>
          <el-menu-item :index="'/viewadmin/hygiene'">卫生信息展示</el-menu-item>
        </el-submenu>
      </el-submenu>
      <!--      <el-submenu index="2">-->
      <!--        <template slot="title"><i class="el-icon-menu"></i>访客权限管理</template>-->
      <!--        <el-menu-item-group>-->
      <!--          <template slot="title">访客管理</template>-->
      <!--          <el-menu-item index="2-1">访客权限管理</el-menu-item>-->
      <!--        </el-menu-item-group>-->
      <!--      </el-submenu>-->
      <el-submenu index="3">
        <template slot="title"><i class="el-icon-setting"></i>失物报修管理</template>
        <el-menu-item-group>
          <template slot="title">报修管理</template>
          <el-menu-item :index="'/viewadmin/fix'">报修管理</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="失物管理">
          <el-menu-item :index="'/viewadmin/los'">失物管理</el-menu-item>
        </el-menu-item-group>
      </el-submenu>
    </el-menu>
  </el-aside>
</template>

<script>
    export default {
        name: 'LeftSideMenu',
        data() {
            return {
                active: ''
            }
        },
        mounted: function () {
            this.active = this.$route.name
        }
    }
</script>

<style scoped>

</style>
