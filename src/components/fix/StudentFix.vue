<template>
    <div class="container">
      <el-steps :active="active" align-center>
        <el-step title="填写报修" description="填写信息并上传照片"></el-step>
        <el-step title="等待受理" description="报修已发送至管理员"></el-step>
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
      <hr>
      <h1 style="height: 50px;">我的报修:</h1>
      <div class="myFix" v-for="item in myFix">
        <el-divider></el-divider>
        <el-image :src="item.cover" class="myFixImg"></el-image>
        <br>
        <el-tag size="medium" effect="light" class="myTag">报修编号: {{item.id}}</el-tag>
        <br>
        <div style="font-size: 16px;margin-left: 30px">报修物品: {{item.stuff}}</div>
        <br>
        <div style="font-size: 16px;margin-left: 30px">报修描述: {{item.description}}</div>
        <br>

        <el-button type="success" icon="el-icon-share" style="margin-left: 30px" v-if="item.display == 0" @click="displayFix(item.id)">分享报修信息</el-button>
        <el-button type="success" icon="el-icon-check" style="margin-left: 30px" v-if="item.display == 1" :disabled="true">已分享</el-button>
        <div style="width: 70%; margin-top: 20px" >
          <el-steps :active="item.process" align-center finish-status="success" process-status="process">
            <el-step title="已完成"></el-step>
            <el-step title="正在受理"></el-step>
            <el-step title="正在维修"></el-step>
            <el-step title="已完成"></el-step>
          </el-steps>
        </div>
      </div>
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
                active: 1,
                dorid: '',
                stuid: '',
                flag: false,
                myFix: []
            }
        },
        methods: {
            uploadImg () {
                this.cover = this.$refs.imgUpload.url
                this.flag = true
            },
            onSubmit() {
                this.$axios.post('/studentFix/insert',{
                    stuff: this.stuff,
                    description: this.desc,
                    cover: this.cover,
                    dorid: this.dorid,
                    stuid: this.stuid
                }).then(resp => {
                    if(resp.data.code == 200){
                        this.active = 2
                        this.getMyFix()
                    }
                })
            },
            getMyFix(){
                this.$axios.post('/studentFix/list',{
                    stuid: this.stuid
                }).then(resp => {
                    if(resp.data.code == 200){
                        this.myFix = resp.data.data
                    }
                })
            },
            displayFix(id){
                this.$axios.post('/studentFix/update',{
                    id: id,
                    display: 1
                }).then(resp => {
                    if(resp.data.code == 200){
                        this.message
                    }
                })
            }
        },
        mounted: function () {
            var info = window.localStorage.getItem('myInfo')
            this.dorid = JSON.parse(info).did
            this.stuid = JSON.parse(info).id
            this.getMyFix()
        }
    }
</script>

<style scoped>
.container{
  width: 40%;
  min-height: 600px;
  margin-left: 30%;
  padding-top: 30px;
  margin-bottom: 200px;
}
.myFix{
  text-align: left;
  min-height: 300px;
  padding-top: 10px;
  padding-left: 20px;
}
  .myFixImg {
    width: 250px;
    height: 250px;
    margin-left: 26%;
    margin-top: 20px;
    position: absolute;
  }
  .myTag{
    height: 40px;
    width: 140px;
    font-size: 20px;
    padding-top: 5px;
    margin-bottom: 10px;
  }
</style>
