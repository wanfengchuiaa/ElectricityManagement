<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path: '/huanying' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>权限管理</el-breadcrumb-item>
      <el-breadcrumb-item>权限列表</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片 -->
    <el-card class="box-card">
      <el-table :data="List" stripe style="width: 100%" :border="true">
        <el-table-column prop="date" label="#" type="index"></el-table-column>
        <el-table-column prop="authName" label="权限名称"></el-table-column>
        <el-table-column prop="path" label="路径"></el-table-column>
        <el-table-column prop="level" label="权限等级">
          <template slot-scope="scope">
            <el-tag v-if="scope.row.level === '0'">等级一</el-tag>
            <el-tag type="success" v-else-if="scope.row.level === '1'"
            >等级二
            </el-tag
            >
            <el-tag type="warning" v-else>等级三</el-tag>
          </template>
        </el-table-column>
      </el-table>
    </el-card
    >

  </div>
</template>

<script>
import { getPermissionsList } from '@/api'

export default {
  data() {
    return {
      List: []

    }
  },
  created() {
    this.getPermissionsList()
  },
  methods: {
    // 获取所有权限列表
    async getPermissionsList() {
      const res = await getPermissionsList('list')
      this.List = res.data.data
    }
  }
}
</script>

<style></style>
