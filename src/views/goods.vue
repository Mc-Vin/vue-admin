<template>
  <div>
    <!-- 面包屑导航 -->
    <breadcrumb subTitle1="商品管理" subTitle2="商品列表"></breadcrumb>
    <!-- 路由出口 -->
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: "goods"
};
</script>

<style lang='sass' scoped>
</style>