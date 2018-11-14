<template>
  <div>
    <el-card class="box-card-component" style="margin-left:8px;">
      <h1>邮箱提醒功能</h1>
      <el-input v-model="email" placeholder="请输入邮箱" style="width: 50%; margin-right: 1rem;"></el-input>
      <el-button type="primary" @click="onClick">添加每日提醒</el-button>
    </el-card> 
  </div>  
</template>

<script>
import { addEmailNotify } from '../../../api/weather'
import { getLocalCityCN } from '../../../api/location'

export default {
  name: 'email-notify',
  data() {
    return {
      email: null
    }
  },
  methods: {
    async onClick(){
      var localCity = getLocalCityCN()
      var username = sessionStorage.getItem('username')
      if (!username || !this.email) {
        this.$message({
          message: `添加失败`,
          type: 'warning'
        })  
        return
      }
      var res = await addEmailNotify(this.email, username, localCity)
      var status = res['retcode']
      if (status === null || status !== 0) {
        this.$message({
          message: `添加失败`,
          type: 'warning'
        })   
      } else {
        this.$message({
          message: `成功添加邮箱提醒`,
          type: 'success'
        }) 
      }
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.box-card-component{
  .el-card__header {
    padding: 0px!important;
  }
}
</style>