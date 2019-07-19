<template>
  <div>
    <breadcrumb subTitle1="权限管理" subTitle2="权限列表"></breadcrumb>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="authName" label="权限名称" width="180" align="center"></el-table-column>
      <el-table-column prop="path" label="路径" width="180" align="center"></el-table-column>
      <el-table-column prop="level" label="层级" width="180" align="center"></el-table-column>
    </el-table>
  </div>
</template>

<script>
import { rights } from "../api/http";
export default {
  name: "rights",
  data() {
    return {
      tableData: []
    };
  },
  //页面加载后获取权限列表数据
  created() {
    rights()
      .then(response => {
        if (response.data.meta.status == 200) {
          this.tableData = response.data.data;
          //处理层级数据
          const arr = response.data.data;
          for (let i = 0; i < arr.length; i++) {
            switch (response.data.data[i].level) {
              case "0": {
                this.tableData[i].level = "一级";
                break;
              }
              case "1": {
                this.tableData[i].level = "二级";
                break;
              }
              case "2": {
                this.tableData[i].level = "三级";
                break;
              }
              default: {
                break;
              }
            }
          }
        }
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang='scss' scoped>
.el-table-column[type="index"] {
  text-align: center;
}
</style>