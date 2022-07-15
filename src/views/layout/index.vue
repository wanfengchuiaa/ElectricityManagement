<template>
  <div>
    <!-- 头部 -->
    <header class="layout_header">
         <div class="layout_header_left">
          <img :src="require('@/assets/img/dog.jpg')" alt="">
          <div>杭州后台管理系统</div>
         </div>

         <div class="layout_header_right">
        <el-button>退出</el-button>
         </div>
    </header>
  </div>
</template>

<script>
export default {

}
</script>

<style scoped lang="less">
.layout_header {
  width: 100%;
  height: 65px;
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
</style>
