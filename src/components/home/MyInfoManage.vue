<template>
  <body id = "form">
    <el-form :model="ruleForm" ref="ruleForm" label-width="80px">
      <el-form-item label="学号：">
        <span>{{ruleForm.num}}</span>
      </el-form-item>
      <el-form-item label="姓名：">
        <span>{{ruleForm.name}}</span>
      </el-form-item>
      <el-form-item label="密码：">
        <el-button type="success" @click="open()" style="margin-right: 10px">修改密码</el-button>
      </el-form-item>
      <el-form-item label="手机：">
        <span>{{ruleForm.phone}}</span>
      </el-form-item>
      <el-form-item label="性别：">
        <span>{{ruleForm.sex}}</span>
      </el-form-item>
      <el-form-item label="班级：">
        <span>{{ruleForm.cls}}</span>
      </el-form-item>
      <el-form-item label="宿舍：">
        <span>{{ruleForm.buildName}}{{ruleForm.dor}}室</span>
      </el-form-item>
      <el-form-item label="头像：">
        <el-avatar :size="60" :src="cover"></el-avatar>
        <img-up-load @onUpload="uploadImg" ref="imgUpload"></img-up-load>
        <el-button type="info" @click="reserve()" style="margin-left: 10px;margin-top: -30px">保存头像</el-button>

      </el-form-item>
    </el-form>
    <el-divider></el-divider>
  </body>
</template>

<script>
    import ImgUpLoad from "../common/ImgUpLoad";
    export default {
        name: "MyInfoManage",
        components:{ImgUpLoad},
        mounted: function () {
            var info = window.localStorage.getItem('myInfo')
            console.log(info)
            this.ruleForm = JSON.parse(info);
            this.cover = this.ruleForm.cover
        },
        data() {
            return {
                ruleForm: {
                    id: '',
                    did: '',
                    num: '',
                    name: '',
                    sex: '',
                    cls: '',
                    cid: '',
                    dor: '',
                    flag: '',
                    buildName: '',
                    cover: '',
                    phone: ''
                },
                flag: true,
                cover:'https://cube.elemecdn.com/e/fd/0fc7d20532fdaf769a25683617711png.png'
            }
        },
        methods: {
            uploadImg () {
                this.cover = this.$refs.imgUpload.url
            },
            reserve(){
                this.$axios
                    .post('/stu/updateCover', {
                        id: this.ruleForm.id,
                        cover: this.cover
                    }).then(resp => {
                    if (resp.data.code == 200) {
                        this.$message({
                            type: 'success',
                            message: '头像保存成功！'
                        });
                    }
                })
            },
            open() {
                this.$prompt('修改密码为：', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                }).then(({ value }) => {
                    this.$axios
                        .post('/stu/updatePass', {
                            id: this.ruleForm.id,
                            password: value
                        }).then(resp => {
                        if (resp.data.code == 200) {
                            this.$message({
                                type: 'success',
                                message: '密码修改成功！'
                            });
                        }
                    })

                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '取消输入'
                    });
                });
            }
        }
    }
</script>

<style scoped>
  #form{
    width: 400px;
  }
</style>
