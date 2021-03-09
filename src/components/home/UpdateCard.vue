<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span style="font-weight: bold;font-size: 20px">宿舍报修信息</span>
      <!--<el-button style="float: right; padding: 3px 0" type="text">修改</el-button>-->
    </div>
    <div class="block">
      <el-divider content-position="center" v-if="show">当前暂无报修信息！</el-divider>
      <div class="myFix" v-for="item in myFix">
        <el-image :src="item.cover" class="myFixImg"></el-image>
        <br>
        <el-tag size="medium" effect="light" class="myTag">报修编号: {{item.id}}</el-tag>
        <br>
        <div style="font-size: 16px;margin-left: 30px">报修物品: {{item.stuff}}</div>
        <br>
        <div style="font-size: 16px;margin-left: 30px">报修描述: {{item.description}}</div>
        <br>
        <div style="font-size: 16px;margin-left: 30px">报修人: {{item.stuname}}</div>
        <br>
        <div style="width: 70%; margin-top: 20px" >
          <el-steps :active="item.process" align-center process-status="process">
            <el-step title="已完成"></el-step>
            <el-step title="正在受理"></el-step>
            <el-step title="正在维修"></el-step>
            <el-step title="已完成"></el-step>
          </el-steps>
        </div>
        <el-divider></el-divider>
      </div>

    </div>
  </el-card>
</template>

<script>
    export default {
        name: 'UpdateCard',
        data() {
            return {
                myFix: [],
                stuid: '',
                dorid: '',
                show: true
            }
        },
        methods :{
            getMyFix(){
                this.$axios.post('/studentFix/list',{
                    dorid: this.dorid
                }).then(resp => {
                    if(resp.data.code == 200){
                        this.show = false
                        this.myFix = resp.data.data
                    }
                })
            },
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
  .box-card {
    margin-top: 5px;
    width: 988px;
    min-height: 150px;
    text-align: left;
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
    margin-left: 660px;
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
