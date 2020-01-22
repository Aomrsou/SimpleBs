<template>
  <el-menu
    :default-active="'/index'"
    router
    mode="horizontal"
    background-color="white"
    text-color="#222"
    active-text-color="red"
    style="min-width: 1200px">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      {{ item.navItem }}
    </el-menu-item>
    <span style="position: absolute;padding-top: 18px; font-size: 20px; margin-left: 300px; color: #42b983">
      {{username}}
      <i class="el-icon-switch-button" @click="loginOut"></i>
    </span>

    <a href="#nowhere" style="color: #222;float: right;padding: 20px;">更多</a>
    <i class="el-icon-menu" style="float:right;font-size: 45px;color: #222;padding-top: 8px"></i>
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
        {name: '/jotter', navItem: '笔记本'},
        {name: '/library', navItem: '图书馆'},
        {name: '/admin', navItem: '个人中心'}
      ],
      username: window.localStorage.username
    }
  },
  methods: {
    loginOut () {
        console.log('giao')
      window.localStorage.clear()
      this.$router.replace('/index')
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
