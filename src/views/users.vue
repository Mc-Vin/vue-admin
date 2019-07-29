<template>
  <div>
    <breadcrumb subTitle1="用户管理" subTitle2="用户列表"></breadcrumb>
    <el-row>
      <el-col :span="8">
        <el-input
          placeholder="请输入内容"
          v-model="userParams.query"
          class="input-with-select"
          @keyup.enter.native="searchData"
        >
          <el-button slot="append" icon="el-icon-search" @click="searchData"></el-button>
        </el-input>
      </el-col>
      <el-col :span="2">
        <el-button type="success" plain @click="dialogFormVisible = true">添加用户</el-button>
      </el-col>
    </el-row>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="index" width="50" align="center"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180" align="center"></el-table-column>
      <el-table-column prop="email" label="邮箱" width="180" align="center"></el-table-column>
      <el-table-column prop="mobile" label="电话" align="center"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="180" align="center">
        <template slot-scope="scope">
          <el-switch
            v-model="scope.row.mg_state"
            active-color="#13ce66"
            inactive-color="#ff4949"
            @change="changeUserState(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="handle" label="操作" align="center">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            size="mini"
            plain
            @click="openEditDialog(scope.row)"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            size="mini"
            plain
            @click="deleteData(scope.row)"
          ></el-button>
          <el-button
            type="warning"
            icon="el-icon-check"
            size="mini"
            plain
            @click="openAssignRole(scope.row)"
          ></el-button>
        </template>
      </el-table-column>
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
    <!-- 新增用户对话框&表单验证 -->
    <el-dialog title="添加用户" :visible.sync="dialogFormVisible">
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input v-model="ruleForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="formLabelWidth" prop="password">
          <el-input v-model="ruleForm.password" auto-complete="off" type="password"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="ruleForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="ruleForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('ruleForm')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 修改用户对话框 -->
    <el-dialog title="修改用户" :visible.sync="editFormVisible">
      <el-form :model="editForm" :rules="rules" ref="editForm">
        <el-form-item label="用户名" :label-width="formLabelWidth" prop="username">
          <el-input disabled v-model="editForm.username" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" :label-width="formLabelWidth" prop="email">
          <el-input v-model="editForm.email" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" :label-width="formLabelWidth" prop="mobile">
          <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUserData">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色对话框 -->
    <el-dialog title="分配角色" :visible.sync="assignFormVisible">
      <el-form :model="assignForm" class="assign-role">
        <el-form-item label="当前用户" :label-width="formLabelWidth">
          <el-input v-model="assignForm.username" auto-complete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="请选择角色" :label-width="formLabelWidth">
          <el-select v-model="assignForm.role_name" placeholder="请选择角色">
            <!-- v-for渲染数据 -->
            <el-option :label="item.roleName" :value="item.id" v-for="item in roleList"></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="assignUserRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  users,
  addUserData,
  deleteUser,
  changeState,
  editUser,
  roleList,
  assignRole
} from "../api/http";
export default {
  name: "users",
  data() {
    return {
      searchContent: "",
      currentPage: 1,
      userParams: {
        query: "",
        pagenum: 1,
        pagesize: 20
      },
      dialogFormVisible: false,
      editFormVisible: false,
      assignFormVisible: false,
      ruleForm: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      editForm: {
        username: "",
        email: "",
        mobile: "",
        id: ""
      },
      assignForm: {},
      formLabelWidth: "120px",
      tableData: [],
      // 角色列表信息
      roleList: [],
      //添加用户表单验证
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 3, max: 16, message: "长度在 3 到 16 个字符", trigger: "blur" }
        ],
        email: [
          { type: "email", message: "邮箱地址格式不正确", trigger: "blur" }
        ],
        mobile: [{ type: "", message: "请输入用户名", trigger: "blur" }]
      }
    };
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    //获取用户数据并渲染
    getUserData() {
      users(this.userParams)
        .then(response => {
          if (response.data.meta.status == 200) {
            this.tableData = response.data.data.users;
          } else {
            this.$message.error("获取数据失败");
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //搜索数据
    searchData() {
      this.getUserData();
    },
    //提交表单验证方法
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //验证成功，调用添加用户方法
          addUserData(this.ruleForm)
            .then(response => {
              if (response.data.meta.status == 201) {
                this.getUserData();
                this.dialogFormVisible = false;
                this.$message.success(response.data.meta.msg);
                //表单数据清除
                this.$refs[formName].resetFields();
              } else if (response.data.meta.status == 400) {
                console.log(response);
                this.$message.warning(response.data.meta.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          //验证失败
          this.$message.error("创建失败");
          return false;
        }
      });
    },
    //删除用户
    deleteData(row) {
      this.$confirm("确定要删除用户信息吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        //确定删除
        .then(() => {
          deleteUser({
            id: row.id
          })
            .then(response => {
              console.log(response);
              //重新获取用户数据并渲染
              this.getUserData();
            })
            .catch(err => {
              console.log(err);
            });
        })
        //取消删除
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //修改用户状态
    changeUserState(row) {
      changeState({
        uId: row.id,
        type: row.mg_state
      })
        .then(response => {
          if (response.data.meta.status == 200) {
            this.$message.success(response.data.meta.msg);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打开修改信息对话框
    openEditDialog(row) {
      this.editFormVisible = true;
      this.editForm.username = row.username;
      this.editForm.email = row.email;
      this.editForm.mobile = row.mobile;
      this.editForm.id = row.id;
    },
    //修改用户数据
    editUserData() {
      editUser({
        id: this.editForm.id,
        email: this.editForm.email,
        mobile: this.editForm.mobile
      })
        .then(response => {
          console.log(response);
          if (response.data.meta.status == 200) {
            this.getUserData();
            this.$message.success(response.data.meta.msg);
          } else {
            return;
          }
          this.editFormVisible = false;
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打开分布角色对话框，同时获得角色信息
    openAssignRole(row) {
      console.log(row);
      this.assignFormVisible = true;
      this.assignForm = row;
      roleList()
        .then(response => {
          if (response.data.meta.status == 200) {
            console.log(response);
            this.roleList = response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 修改用户角色
    assignUserRole() {
      //如果角色名为字符串，说明没有修改
      if (typeof this.assignForm.role_name == "string") {
      } else {
        //如果角色名为数值，说明修改了
        assignRole({
          id: this.assignForm.id,
          rid: this.assignForm.role_name
        })
        .then(response => {
          //重新获取数据渲染
          console.log(response);
          this.getUserData();
          this.assignFormVisible = false;
        })
        .catch(err=>{
          console.log(err);
        })
      }
    }
  },
  created() {
    //进入组件后即渲染页面
    this.getUserData();
  }
};
</script>

<style lang='scss' scoped>
.el-dialog__wrapper {
  /deep/ .el-dialog {
    padding-right: 20px;
  }
  .el-form.assign-role {
    .el-form-item {
      /deep/ .el-form-item__label {
        width: 120px;
      }
    }
  }
}
</style>
