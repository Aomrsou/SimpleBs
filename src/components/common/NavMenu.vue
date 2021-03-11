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
      <div>
      <Message ref="message"></Message>
        <div v-if="myInfo.name === 'admin'">
          <el-button type="success" style="margin-top: 20px" @click="innerDrawer=true">发布公告</el-button>
        </div>
        <el-drawer
          :append-to-body="true"
          :visible.sync="innerDrawer"
          size="400px">
          <el-form :model="form">
            <el-form-item label="公告标题" :label-width="formLabelWidth">
              <el-input v-model="form.title" autocomplete="off" style="width: 60%"></el-input>
            </el-form-item>
            <el-form-item label="公告内容" :label-width="formLabelWidth">
              <el-input
                v-model="form.content"
                autocomplete="off"
                type="textarea"
                :autosize="{ minRows: 4, maxRows: 4}"></el-input>
            </el-form-item>
            <el-form-item label="发布时间" :label-width="formLabelWidth">
              <el-input v-model="form.noticetime" autocomplete="off" disabled></el-input>
            </el-form-item>
            <el-form-item label-width="formLabelWidth">
              <el-button type="primary" @click="submitNotice()" style="margin-left: 33%">发布</el-button>
              <el-button @click="clearNotice()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-drawer>
      </div>
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
                myInfo: [],
                formLabelWidth: '80px',
                drawer: false,
                innerDrawer: false,
                form:{
                    title:'',
                    content:'',
                    noticetime:''
                }
            }
        },
        mounted: function () {
            const date = new Date();
            this.form.noticetime = date.getFullYear()+"-"+(date.getMonth()+1)+"-"+date.getDate();

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
                    // {name: '/admin/notice', navItem: '公告管理'},
                    {name: '/admin/fix', navItem: '后台管理'},
                    {name: '/viewadmin/build', navItem: '可视化后台'}
                )
            }
            var info = window.localStorage.getItem('myInfo')
            this.myInfo = JSON.parse(info)
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
            },
            submitNotice(){
                this.$axios.post('/notice/insert', {
                    title: this.form.title,
                    content: this.form.content,
                    noticetime: this.form.noticetime
                }).then(resp => {
                      this.$message({
                          type: 'success',
                          message: '已发布公告!'
                      })
                      this.$refs.message.loadNotice()
                      this.innerDrawer = false
                })
            },
            clearNotice(){
                this.form.title = '';
                this.form.content = '';
                this.innerDrawer = false
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
