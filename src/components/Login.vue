<template>
  <body id="poster">

  <el-tabs class="login-container" v-model="activeName" @tab-click="handleClick">

    <el-tab-pane label="学生登录" name="first">

      <h3 class="login_title">学生登录查看寝室信息</h3>
      <el-form label-position="left"
               label-width="0px">
        <el-form-item>
          <el-input type="text" v-model="loginForm.username"
                    auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginForm.password"
                    auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" style="width: 230px;background: #505458;border: none" v-on:click="check">登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-form>
    </el-tab-pane>
    <el-tab-pane label="管理员登录" name="second">
      <h3 class="login_title">寝室报修后台管理</h3>
      <el-form label-position="left"
               label-width="0px">
        <el-form-item>
          <el-input type="text" v-model="loginForm.username"
                    auto-complete="off" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input type="password" v-model="loginForm.password"
                    auto-complete="off" placeholder="密码"></el-input>
        </el-form-item>
        <el-form :inline="true" class="demo-form-inline">
          <el-form-item>
            <el-button type="primary" style="width: 230px;background: #505458;border: none" v-on:click="check">登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-form>
    </el-tab-pane>
  </el-tabs>

  </body>
</template>

<script>

    export default {
        name: 'Login',
        data() {
            return {
                loginForm: {
                    username: '',
                    password: ''
                },
                responseResult: [],
                isAdmin: false,
                activeName: 'first',
                path: '/loginStudent'
            }
        },
        methods: {
            handleClick(tab, event) {
                if(this.activeName == 'first'){
                    this.path = '/loginStudent'
                } else {
                    this.path = '/login'
                }
                console.log(this.activeName);
            },
            check() {
                var username = this.loginForm.username
                var password = this.loginForm.password
                if (username !== '' && password !== '') {
                    this.login()
                } else {
                    this.$message({
                        type: 'info',
                        message: '账号密码不能为空'
                    })
                }
            },
            openFullScreen2() {
                const loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                setTimeout(() => {
                    loading.close()
                }, 1000)
            },
            login() {
                let path = this.path

                var _this = this
                this.$axios
                    .post(path, {
                        name: this.loginForm.username,
                        password: this.loginForm.password
                    })
                    .then(successResponse => {
                        if (successResponse.data.code === 200) {
                            // var data = this.loginForm
                            this.openFullScreen2()
                            _this.$store.commit('login', _this.loginForm)
                            window.localStorage.setItem('myInfo', JSON.stringify(successResponse.data.data[0]))
                            setTimeout(() => {
                                var path = this.$route.query.redirect
                                this.$router.replace({path: path === '/' || path === undefined ? '/index' : path})
                            }, 1000)
                            // location.reload()
                        } else if (successResponse.data.code === 404) {
                            this.$message({
                                type: 'info',
                                message: '账号或密码不正确'
                            })
                        }
                    })
                    .catch(failResponse => {
                    })
            }
        }
    }
</script>
<style>
  .login-container {
    border-radius: 15px;
    background-clip: padding-box;
    margin: 160px auto;
    width: 350px;
    padding: 35px 35px 15px 35px;
    background: #fff;
    border: 1px solid #eaeaea;
    box-shadow: 0 0 25px #cac6c6;
  }

  .login_title {
    margin: 0px auto 40px auto;
    text-align: center;
    color: #505458;
  }

  #poster {
    background: url("../assets/bgpic.jpg") no-repeat;
    background-position: center;
    height: 100%;
    width: 100%;
    background-size: cover;
    position: fixed;
  }

  body {
    margin: 0px;
  }
</style>
