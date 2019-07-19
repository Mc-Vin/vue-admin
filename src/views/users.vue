<template>
  <div>
    <breadcrumb subTitle1="用户管理" subTitle2="用户列表"></breadcrumb>
    <el-row>
      <el-col :span="8">
        <el-input placeholder="请输入内容" v-model="searchContent" class="input-with-select">
          <el-button slot="append" icon="el-icon-search"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain>添加用户</el-button>
      </el-col>
    </el-row>
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
    </el-table>
    <!--分页 -->
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-sizes="[100, 200, 300, 400]"
        :page-size="100"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { users } from "../api/http";
export default {
  name: "users",
  data() {
    return {
      searchContent: "",
      currentPage: 1,
      params: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      tableData: []
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    }
  },
  created() {
    users(this.params)
    .then(response=>{
      if(response.data.meta.status==200){
        this.tableData=response.data.data.users;
      }
    })
    .catch(err=>{
      console.log(err);
    })
  }
};
</script>

<style>
</style>
