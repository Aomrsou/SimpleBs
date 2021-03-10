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
      title="公告"
      :visible.sync="drawer"
      :with-header="true"
      style="">
      <Message></Message>
<!--      <div v-if="myInfo.name !== 'admin'"></div>-->
<!--      <div v-if="myInfo.name === 'admin'"></div>-->
    </el-drawer>
  </el-menu>
</template>

<script>
    import Message from "./Message"
    export default {
        name: 'NavMenu',
        components:{Message},
        data(key) {
            return {
                navList: [],
                username: '',
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
                this.navList.push(
                    {name: '/index', navItem: '首页'},
                    {name: '/studentFix', navItem: '寝室报修'},
                    {name: '/los', navItem: '失物招领'}
                    )
            } else {
                this.navList.push(
                    {name: '/admin/notice', navItem: '公告管理'},
                    {name: '/admin/fix', navItem: '后台管理'},
                    {name: '/viewadmin/build', navItem: '可视化后台'}
                )
            }
            var info = window.localStorage.getItem('myInfo')
            this.myInfo = JSON.parse(info)
            console.log(this.myInfo)
        },
        methods: {
            loginOut() {
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
  a {
    text-decoration: none;
  }

  span {
    pointer-events: none;
  }
</style>
