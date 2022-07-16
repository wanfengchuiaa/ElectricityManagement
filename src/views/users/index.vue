<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/huanying' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 卡片内容 -->
    <el-card class="box-card">
      <el-row :gutter="15">
        <el-col :span="9">
          <div>
            <el-input
              placeholder="请输入内容"
              class="input-with-select"
              v-model="query.query"
              clearable
              @clear="EmptyIpt"
            >
              <el-button
                slot="append"
                icon="el-icon-search"
                @click="getUsersList"
              ></el-button>
            </el-input>
          </div>
        </el-col>
        <el-col :span="4"
          ><el-button type="primary" @click="dialogFormVisible = true"
            >添加用户</el-button
          ></el-col
        >
      </el-row>
      <!-- 表格 -->
      <el-table
        :data="tableData.users"
        stripe
        style="width: 100%"
        :border="true"
      >
        <el-table-column type="index" label="#"> </el-table-column>
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="create_time" label="电话"> </el-table-column>
        <el-table-column prop="role_name" label="角色"> </el-table-column>
        <el-table-column prop="mg_state" label="状态">
          <template slot-scope="scope">
            <el-switch
              v-model="scope.row.mg_state"
              @change="changeChecked(scope.row)"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column prop="create_time" label="操作" width="190">
          <template slot-scope="scope">
            <!-- 编辑用户信息 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="ModifyTheUser(scope.row.id)"
            ></el-button>
            <!-- 删除用户信息 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete-solid"
              @click="delUser(scope.row.id)"
            ></el-button>
            <!-- 用户信息分配 -->
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="DistributionUser(scope.row.id)"
            ></el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页 -->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="query.pagenum"
        :page-sizes="[1, 2, 5, 10]"
        :page-size="query.pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="tableData.total"
      >
      </el-pagination>
      <!-- 添加用户提示区域 -->
      <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
        <el-form
          :model="AddUserForm"
          label-width="85px"
          :rules="AddUserFormRules"
          ref="ruleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="AddUserForm.username"></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input type="password" v-model="AddUserForm.password"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="AddUserForm.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model.number="AddUserForm.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="CancelUser">取 消</el-button>
          <el-button type="primary" @click="AddUser">确 定</el-button>
        </div>
      </el-dialog>
      <!-- 修改用户信息 提示区域-->
      <el-dialog title="修改用户信息" :visible.sync="ModifyTheFormVisible">
        <el-form
          :model="emitFrom"
          label-width="85px"
          :rules="emitUserFormRules"
          ref="emitRuleForm"
        >
          <el-form-item label="用户名" prop="username">
            <el-input v-model="emitFrom.username" disabled></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input v-model="emitFrom.email"></el-input>
          </el-form-item>
          <el-form-item label="手机号" prop="mobile">
            <el-input v-model.number="emitFrom.mobile"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="ModifyTheFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="emitUser">确 定</el-button>
        </div>
      </el-dialog>
    </el-card>
  </div>
</template>

<script>
import {
  getUsersList,
  ModifyUserState,
  AddUser,
  IdGetUser,
  emitUser,
  delUser,
  DistributionUser
} from '@/api'
export default {
  data() {
    return {
      tableData: [],
      query: {
        query: '',
        pagenum: 1,
        pagesize: 5
      },
      dialogFormVisible: false, // 添加用户区域显示隐藏
      ModifyTheFormVisible: false, // 修改用户信息区域显示隐藏
      emitFrom: {},
      // 表单信息
      AddUserForm: {
        username: '',
        password: '',
        email: '',
        mobile: ''
      },
      // 添加用户表单验证规则
      AddUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 6 到 16 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入邮箱', trigger: 'blur' }]
      },
      // 修改信息表单验证
      emitUserFormRules: {
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        email: [{ required: true, message: '请输入邮箱', trigger: 'blur' }],
        mobile: [{ required: true, message: '请输入手机号', trigger: 'blur' }]
      }
    }
  },
  created() {
    this.getUsersList()
  },
  methods: {
    // 获取用户数据列表
    async getUsersList() {
      const res = await getUsersList(this.query)
      console.log(res)
      this.tableData = res.data.data
    },
    // 改变每页显示多少条数据的回调
    handleSizeChange(a) {
      this.query.pagesize = a
      this.getUsersList()
    },
    // 选择当前页数的回调
    handleCurrentChange(a) {
      this.query.pagenum = a
      this.getUsersList()
    },
    // 修改用户状态
    async changeChecked(userinfo) {
      console.log(userinfo)
      await ModifyUserState(userinfo.id, userinfo.mg_state)
    },
    // 添加用户
    AddUser() {
      this.$refs.ruleForm.validate(async (a) => {
        if (!a) return
        this.dialogFormVisible = false
        try {
          await AddUser(this.AddUserForm)
          this.$message.success('添加用户成功')
        } catch (error) {
          this.$message.error('出错了，添加失败')
        }
      })
    },
    // 获取修改编辑用户信息
    async ModifyTheUser(id) {
      const res = await IdGetUser(id)
      console.log(res)
      this.emitFrom = res.data.data
      this.ModifyTheFormVisible = true
    },
    // 修改用户信息并提交
    async emitUser() {
      this.$refs.emitRuleForm.validate(async (a) => {
        if (!a) return
        this.ModifyTheFormVisible = false
        try {
          await emitUser(
            this.emitFrom.id,
            this.emitFrom.email,
            this.emitFrom.mobile
          )
          this.$message.success('修改用户信息成功')
        } catch (error) {
          this.$message.error('出错了，修改失败')
        }
      })
    },
    // 删除用户
    async delUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          try {
            await delUser(id)
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.getUsersList()
          } catch (error) {
            this.$message({
              type: 'error',
              message: '删除失败'
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 分配用户角色 未完成
    async DistributionUser() {
      await DistributionUser()
    },
    // 取消添加用户
    CancelUser() {
      this.dialogFormVisible = false
      this.$refs.ruleForm.resetFields()
    },
    // 清空搜索框事件
    EmptyIpt() {
      this.getUsersList()
    }
  }
}
</script>

<style scoped lang="less">
.el-breadcrumb {
  margin-bottom: 20px;
}
</style>
