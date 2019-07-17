<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>{{subTitle1}}</el-breadcrumb-item>
      <el-breadcrumb-item>{{subTitle2}}</el-breadcrumb-item>
    </el-breadcrumb>
  </div>
</template>

<script>
export default {
  name: "breadcrumb",
  props: ["subTitle1", "subTitle2"]
};
</script>

<style lang='scss' scoped>
.el-breadcrumb {
  height: 45px;
  line-height: 45px;
  font-size: 15px;
  padding-left: 10px;
  background-color: rgb(211, 220, 230);
}
</style>
