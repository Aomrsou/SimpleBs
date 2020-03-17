<template>
  <el-menu
    :default-active="active"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1200px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <el-button @click="loginOut" type="text" style="margin: 8px;float: right">
      注销登录
    </el-button>
    <el-button @click="drawer = true" type="text" style="margin: 8px;float: right;font-size: 16px">
      当前用户：{{username}}
    </el-button>
    <el-drawer
      title="我是标题"
      :visible.sync="drawer"
      :with-header="false"
      style="padding-top: 60px; padding-bottom: 300px">
      <span><i class="el-icon-caret-right">姓名 :  </i>{{myInfo.name}}</span><br>
      <span><i class="el-icon-caret-right">学号 :  </i>{{myInfo.num}}</span><br>
      <span><i class="el-icon-caret-right">性别 :  </i>{{myInfo.sex}}</span><br>
      <span><i class="el-icon-caret-right">所在宿舍楼 :  </i>{{myInfo.buildName}}</span><br>
      <span><i class="el-icon-caret-right">所在宿舍 :  </i>{{myInfo.dor}}</span><br>
      <span><i class="el-icon-caret-right">是否在读 :  </i>{{myInfo.flag == 1 ? '是' : '否'}}</span><br>
    </el-drawer>
    <span style="position: absolute;padding-top: 20px;right: 43%;font-size: 20px;font-weight: bold">Something Just Like This...🎵</span>
  </el-menu>
</template>

<script>
export default {
  name: 'NavMenu',
  data (key) {
    return {
      navList: [
        {name: '/index', navItem: '首页'},
        {name: '/fix', navItem: '反馈报修'},
        {name: '/los', navItem: '失物招领'},
        {name: '/library', navItem: '图书馆'},
        {name: '/admin/student', navItem: '后台管理'}
      ],
      username: '系统管理员',
      active: 'index',
      drawer: false,
      myInfo: []
    }
  },
  mounted: function () {
    this.active = this.$route.name
    var usr = window.localStorage.getItem('user')
    const str = JSON.parse(usr)
    this.username = str.username
    if (str.username !== 'admin') {
      this.navList.pop()
    }
    var info = window.localStorage.getItem('myInfo')
    this.myInfo = JSON.parse(info)
    console.log(this.myInfo)
  },
  methods: {
    loginOut () {
      this.$confirm('确定退出登录吗？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'info'
      }).then(() => {
        window.localStorage.clear()
        this.$router.replace('/login')
        location.reload()
      })
    }
  }
}
</script>

<style scoped>
  a{
    text-decoration: none;
  }
  span {
    pointer-events: none;
  }
</style>
