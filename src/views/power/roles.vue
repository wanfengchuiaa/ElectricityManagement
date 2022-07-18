<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/huanying' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>角色管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <el-button type="primary">添加角色</el-button>
      <el-table :data="List" stripe style="width: 100%" :border="true">
        <el-table-column label="" type="expand">
          <template slot-scope="scope">
            <!-- 一级 -->
            <el-row
              :class="['row-button', index === 0 ? 'row-button1' : '']"
              v-for="(item, index) in scope.row.children"
              :key="item.id"
              class="center"
            >
              <el-col :span="5">
                <el-tag closable @close="delTag(scope.row, item.id)">{{
                  item.authName
                }}</el-tag>
                <i class="el-icon-caret-right"></i>
              </el-col>
              <!-- 二级 -->
              <el-col :span="19">
                <el-row
                  :class="['row-button', index1 === 0 ? 'row-button1' : '']"
                  v-for="(i, index1) in item.children"
                  :key="i.id"
                  class="center"
                >
                  <el-col :span="6">
                    <el-tag
                      type="success"
                      closable
                      @close="delTag(scope.row, i.id)"
                      >{{ i.authName }}</el-tag
                    >
                    <i class="el-icon-caret-right"></i>
                  </el-col>
                  <!-- 三级 -->
                  <el-col :span="18">
                    <el-tag
                      closable
                      @close="delTag(scope.row, ii.id)"
                      type="warning"
                      v-for="ii in i.children"
                      :key="ii.id"
                      >{{ ii.authName }}</el-tag
                    >
                  </el-col>
                </el-row>
              </el-col>
            </el-row>
          </template>
        </el-table-column>
        <el-table-column label="#" type="index"> </el-table-column>
        <el-table-column prop="roleName" label="角色名称"> </el-table-column>
        <el-table-column prop="roleDesc" label="角色描述"> </el-table-column>
        <el-table-column label="操作" width="600px">
          <template slot-scope="scope">
            <!-- 编辑用户信息 -->
            <el-button
              type="primary"
              size="mini"
              icon="el-icon-edit"
              @click="ModifyTheUser(scope.row.id)"
              >编辑</el-button
            >
            <!-- 删除用户信息 -->
            <el-button
              type="danger"
              size="mini"
              icon="el-icon-delete-solid"
              @click="delUser(scope.row.id)"
              >删除</el-button
            >
            <!-- 用户信息分配 -->
            <el-button
              type="warning"
              size="mini"
              icon="el-icon-setting"
              @click="AssignUserRights"
              >分配权限</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </el-card>

    <!-- 分配用户权限的对话框 -->

    <el-dialog title="提示" :visible.sync="showAssignUserRights" width="30%">
      <!-- 树型控件 -->
      <el-tree
        :data="treeList"
        :props="treedefaultProps"
        show-checkbox
        default-expand-all
        node-key="id"
        :default-expanded-keys="OpenByDefaultList"
      ></el-tree>
      <span slot="footer" class="dialog-footer">
        <el-button @click="showAssignUserRights = false">取 消</el-button>
        <el-button type="primary" @click="showAssignUserRights = false"
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getRoleList, delAuthz, getPermissionsListtree } from '@/api'
export default {
  data() {
    return {
      List: [],
      // 分配用户权限对话框
      showAssignUserRights: false,
      treeList: [],
      // 树型控件的属性绑定对象
      treedefaultProps: {
        label: 'authName',
        children: 'children'
      },
      // 默认展开的数组
      OpenByDefaultList: []
    }
  },
  created() {
    this.getRoleList()
  },
  methods: {
    async getRoleList() {
      const res = await getRoleList()
      this.List = res.data.data
    },
    // 删除权限(标签)
    async delTag(RoleId, PermissionsId) {
      console.log(RoleId) // 角色id
      console.log(PermissionsId) // 权限id
      try {
        await this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
        const res = await delAuthz(RoleId.id, PermissionsId)
        console.log(res)
        RoleId.children = res.data.data
        this.$message({
          message: '删除成功',
          type: 'success'
        })
      } catch (error) {
        this.$message({
          message: '取消删除',
          type: 'warning'
        })
      }
    },
    // 分配用户权限
    async AssignUserRights() {
      try {
        this.showAssignUserRights = true
        const res = await getPermissionsListtree()
        console.log(res)
        this.treeList = res.data.data
      } catch (error) {
        this.$message({
          message: '出错了，获取列表失败',
          type: 'warning'
        })
      }
    }
  }
}
</script>

<style scoped lang="less">
.el-tag {
  margin: 10px 15px;
}
.row-button {
  border-bottom: 1px solid #eee;
}
.row-button1 {
  border-top: 1px solid #eee;
}
.center {
  display: flex;
  align-items: center;
}
</style>
