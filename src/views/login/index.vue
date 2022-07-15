<template>
  <div class="body">
    <div class="login_box">
      <!-- 头像 -->
      <div class="login_log">
        <img :src="require('@/assets/img/dog.jpg')" alt="" />
      </div>
      <!-- 表单 -->
      <div>
        <el-form ref="form" :model="form" :rules="loginFormRules" label-width="80px">
          <div class="input">
            <el-form-item label-width="0" prop="username">
              <el-input v-model="form.username" prefix-icon="el-icon-s-custom"></el-input>
            </el-form-item>
            <el-form-item label-width="0" prop="password">
              <el-input v-model="form.password" prefix-icon="el-icon-lock" type="password"></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
      <!-- button按钮 -->
      <div class="button">
        <el-row>
          <el-button type="primary" @click="goLogin">登录</el-button>
          <el-button type="info" @click="resetForm">重置</el-button>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { getLogin } from '@/api'
export default {
  data () {
    return {
      // 表单value
      form: {
        username: 'admin',
        password: '123456'
      },
      // 表单验证规则
      loginFormRules: {
        username: [
          { required: true, message: '请输入用户名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入用户密码', trigger: 'blur' },
          { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    // 登录接口
    async goLogin () {
      const res = await getLogin(this.form)
      this.$store.commit('setUser', res.data.data.token)
      localStorage.setItem('dianshangToken', res.data.data.token)
      this.$router.push('/layout')
    },
    // 重置表单
    resetForm () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style scoped lang="less">
.body {
  position: relative;
  height: 100%;
  background-color: #2b4b6b;
  .login_box {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 15px;
    width: 450px;
    height: 300px;
    border-radius: 3px;
    background-color: #fff;
    .input {
      margin-top: 100px;
    }
    .button {
      margin-top: 25px;
      float: right;
    }
    .login_log {
      position: absolute;
      top: -75px;
      left: 50%;
      transform: translateX(-50%);
      height: 130px;
      width: 130px;
      border: 1px solid #eee;
      border-radius: 50%;
      padding: 10px;
      box-shadow: 0 0 10px #ddd;
      background-color: #fff;
      img {
        width: 100%;
        height: 100%;
        border-radius: 50%;
      }
    }
  }
}
</style>
