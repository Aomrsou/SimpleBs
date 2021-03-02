<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-weight: bold;font-size: 20px">最近更新</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
    </div>
    <div class="block">
      <el-timeline>
        <el-timeline-item timestamp="2020/3/13" placement="top">
          <el-card>
            <h4>实现登录动画和弹框Tips</h4>
            <p>张子扬 提交于 2019/3/13 21:32</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/2/11" placement="top">
          <el-card>
            <h4>实现可视化对于后台管理的操作</h4>
            <p>张子扬 提交于 2020/2/11 09:02</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/1/1" placement="top">
          <el-card>
            <h4>实现后台管理CRUD的部分内容</h4>
            <p>张子扬 提交于 2020/1/1 22:10</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2020/12/17" placement="top">
          <el-card>
            <h4>实现搜索框模糊查询</h4>
            <p>张子扬 提交于 2020/12/17 19:51</p>
          </el-card>
        </el-timeline-item>
        <el-timeline-item timestamp="2019/12/5" placement="top">
          <el-card>
            <h4>实现登录功能</h4>
            <p>张子扬 提交于 2019/12/5 22:52</p>
          </el-card>
        </el-timeline-item>
      </el-timeline>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: 'UpdateCard'
    }
</script>

<style scoped>
  .box-card {
    margin-top: 5px;
    width: 988px;
    height: 1050px;
    text-align: left;
  }
</style>
