<template>
  <div>
    <breadcrumb subTitle1="权限管理" subTitle2="角色列表"></breadcrumb>
    <el-row>
      <el-col :span="2">
        <el-button>添加角色</el-button>
      </el-col>
    </el-row>
    <!-- table -->
    <el-table :data="tableData" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="scope">
          <el-row v-for="item in scope.row.children">
            <el-col :span="6">
              <el-tag
                closable
                @close="delRoleRight(scope.row.id,item.id,scope.row)"
              >{{item.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="18">
              <el-row v-for="secItem in item.children">
                <el-col :span="6">
                  <el-tag
                    type="success"
                    closable
                    @close="delRoleRight(scope.row.id,secItem.id,scope.row)"
                  >{{secItem.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="18">
                  <span v-for="trdItem in secItem.children">
                    <el-tag
                      type="warning"
                      closable
                      @close="delRoleRight(scope.row.id,trdItem.id,scope.row)"
                    >{{trdItem.authName}}</el-tag>
                  </span>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column type="index" align="center"></el-table-column>
      <el-table-column prop="roleName" label="角色名称" width="180" align="center"></el-table-column>
      <el-table-column prop="roleDesc" label="角色描述" width="180" align="center"></el-table-column>
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
    <!-- 树形结构对话框 -->
    <el-dialog title="收货地址" :visible.sync="treeDataVisible">
      <!-- 树形数据结构 -->
      <el-tree
        :data="treeData"
        show-checkbox
        node-key="id"
        :default-expand-all="true"
        :default-checked-keys="checkedKeys"
        :props="defaultProps"
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeDataVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitAssignRole">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  roleList,
  assignRole,
  delRole,
  rightsList,
  reAssignRole
} from "../api/http";
export default {
  name: "roles",
  data() {
    return {
      tableData: [],
      roleId: 0,
      //树形数据显示与否
      treeDataVisible: false,
      //树形数据
      treeData: [],
      checkedKeys: [],
      defaultProps: {
        children: "children",
        label: "authName"
      }
    };
  },
  methods: {
    //删除角色指定权限
    delRoleRight(roleId, rightId, row) {
      delRole({ roleId, rightId })
        .then(response => {
          if (response.data.meta.status == 200) {
            this.$message.success("删除权限成功");
            //重新获取table数据加载
            this.getRoleList();
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //加载页面后即获取角色列表
    getRoleList() {
      roleList()
        .then(response => {
          if (response.data.meta.status == 200) {
            // console.log(response);
            this.tableData = response.data.data;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    //打开分配角色对话框
    openAssignRole(row) {
      rightsList().then(response => {
        // console.log(response);
        this.treeData = response.data.data;
        // 默认选择的节点，递归实现
        //仔细看
        this.checkedKeys = [];
        const getNode = row => {
          if (row.children == undefined) {
            this.checkedKeys.push(row.id);
          } else {
            for (let i = 0; i < row.children.length; i++) {
              getNode(row.children[i]);
            }
          }
        };
        //调用上面递归函数
        getNode(row);
        this.roleId = row.id;
        this.treeDataVisible = true;
      });
    },
    // 角色授权，重新分配角色权限
    submitAssignRole() {
      const roleId = this.roleId;
      const rids = this.checkedKeys.join(",");
      reAssignRole({
        roleId,
        rids
      })
        .then(response => {
          if (response.data.meta.status == 200) {
            this.getRoleList();
            this.treeDataVisible=false;
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  created() {
    this.getRoleList();
  }
};
</script>

<style lang='scss' scoped>
.el-col {
  span {
    margin: 0 5px 5px 10px;
  }
}
</style>
