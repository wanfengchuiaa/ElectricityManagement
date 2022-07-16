<template>
  <!-- 头部 -->
  <el-container class="home_main">
    <el-header>
      <header class="layout_header">
        <div class="layout_header_left">
          <img :src="require('@/assets/img/dog.jpg')" alt="" />
          <div>杭州后台管理系统</div>
        </div>
        <div class="layout_header_right">
          <el-button @click="delToken">退出</el-button>
        </div>
      </header>
    </el-header>
    <el-container>
      <el-aside :width="FoldShow ? '64px' : '200px'">
        <div class="Fold" @click="ControlFold">|||</div>

        <el-menu
          default-active="2"
          class="el-menu-vertical-demo"
          background-color="#373d41"
          text-color="#fff"
          active-text-color="#ffd04b"
          :collapse="FoldShow"
          :collapse-transition="false"
          :router="true"
        >
          <el-submenu
            :index="item.id + ''"
            v-for="item in navList"
            :key="item.id"
          >
            <!-- 一级 -->
            <template slot="title">
              <i :class="icon[item.id]"></i>
              <span>{{ item.authName }}</span>
            </template>
            <!-- 二级 -->
            <el-menu-item
              :index="'/' + i.path"
              v-for="i in item.children"
              :key="i.id"
            >
              <template slot="title">
                <i class="el-icon-menu"></i>
                <span>{{ i.authName }}</span>
              </template>
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <!-- 主体 -->
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script>
import { getLeftSideMenu } from '@/api'
export default {
  name: 'layout',
  data() {
    return {
      navList: [], // 左侧菜单列表
      icon: {
        125: 'el-icon-s-custom',
        103: 'el-icon-setting',
        101: 'el-icon-s-cooperation',
        102: 'el-icon-s-management',
        145: 'el-icon-s-grid'
      },
      FoldShow: false // 折叠控制
    }
  },
  created() {
    this.getLeftSideMenu()
  },
  methods: {
    delToken() {
      localStorage.removeItem('dianshangToken')
    },
    async getLeftSideMenu() {
      const res = await getLeftSideMenu()
      console.log(res)
      this.navList = res.data.data
    },
    // 控制折叠
    ControlFold() {
      this.FoldShow = !this.FoldShow
    }
  }
}
</script>

<style scoped lang="less">
.Fold {
  background-color: #4a5064;
  font-size: 10px;
  line-height: 24px;
  color: #fff;
  text-align: center;
  cursor: pointer;
  letter-spacing: 0.2em;
}
.home_main {
  height: 100%;
}
.el-aside {
  height: 100%;
  background-color: #373d41;
}
.el-header {
  width: 100%;
  height: 70px !important;
  background-color: #373d41;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .layout_header {
    width: 100%;
    height: 60px;
    background-color: #373d41;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .layout_header_right {
      margin-right: 20px;
    }
    .layout_header_left {
      height: 50px;
      // line-height: 50%;
      display: flex;
      align-items: center;
      img {
        height: 100%;
        border-radius: 50%;
        margin-left: 20px;
      }
      div {
        font-size: 24px;
        color: #fff;
        margin-left: 20px;
      }
    }
  }
}
// .layout_header {
//   width: 100%;
//   height: 65px;
//   background-color: #373d41;
//   display: flex;
//   justify-content: space-between;
//   align-items: center;
//   .layout_header_right {
//     margin-right: 20px;
//   }
//   .layout_header_left {
//     height: 50px;
//     // line-height: 50%;
//     display: flex;
//     align-items: center;
//     img {
//       height: 100%;
//       border-radius: 50%;
//       margin-left: 20px;
//     }
//     div {
//       font-size: 24px;
//       color: #fff;
//       margin-left: 20px;
//     }
//   }
// }
</style>
