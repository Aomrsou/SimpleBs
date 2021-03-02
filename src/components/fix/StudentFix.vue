<template>
    <div class="container">
      <el-steps :active="1" align-center>
        <el-step title="填写报修" description="如实填写信息并上传照片"></el-step>
        <el-step title="等待受理" description="报修信息已发送至管理员"></el-step>
        <el-step title="上门维修" description="管理员会尽快通知维修人员上门"></el-step>
        <el-step title="维修完成" description="有事第一时间反馈"></el-step>
      </el-steps>
      <el-form label-width="100px" style="width: 320px;margin-left: 30%;margin-top: 30px">
        <el-form-item label="需维修物品：">
          <el-select v-model="stuff" placeholder="请选择损坏物品">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.value"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="损坏描述：">
          <el-input type="textarea" v-model="desc" maxlength="30" show-word-limit></el-input>
        </el-form-item>
        <el-form-item label="损坏图片：" label-width="100px">
          <el-input v-model="cover" autocomplete="off" placeholder="图片 URL" :disabled="true" v-show="false"></el-input>
          <img-up-load @onUpload="uploadImg" ref="imgUpload"></img-up-load>
          <el-image :src="cover" v-show="flag"></el-image>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:140px">提交报修信息</el-button>
        </el-form-item>

      </el-form>
    </div>
</template>

<script>
    import ImgUpLoad from "../common/ImgUpLoad";
    export default {
        name: "StudentFix",
        components:{ImgUpLoad},
        data() {
            return {
                options: [{
                    value: '床'
                }, {
                    value: '门',
                }, {
                    value: '窗',
                }, {
                    value: '桌子',
                }, {
                    value: '椅子',
                }, {
                    value: '扫把',
                }, {
                    value: '簸箕',
                }, {
                    value: '墩布',
                }, {
                    value: '柜子',
                }, {
                    value: '灯管',
                }],
                stuff: '',
                desc: '',
                cover: 'http://localhost:8888/bs/static/0uevzj.jpg',
                flag: false
            }
        },
        methods: {
            uploadImg () {
                this.cover = this.$refs.imgUpload.url
                this.flag = true
            },
            onSubmit() {

            }
        }
    }
</script>

<style scoped>
.container{
  width: 40%;
  min-height: 600px;
  margin-left: 20%;
  border: #3a8ee6;
  border-style: double;
  padding-top: 30px;
}
</style>
