<template>
  <div class="index-wrap">
    <el-container>
      <el-header>
        <el-row>
          <el-col calss="left" :span="5">
            <img src="../assets/static/images/logo.png" />
          </el-col>
          <el-col :span="18">
            <h2>电商后台管理系统</h2>
          </el-col>
          <el-col :span="1">
            <i class="iconfont" @click="logout">&#xe60a;</i>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                @open="handleOpen"
                @close="handleClose"
                :unique-opened="true"
              >
                <el-submenu index="1">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>用户管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="1-1">
                      <i class="el-icon-menu"></i>用户列表
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="2">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>权限管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="2-1">
                      <i class="el-icon-menu"></i>角色列表
                    </el-menu-item>
                    <el-menu-item index="2-2">
                      <i class="el-icon-menu"></i>权限列表
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="3">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>商品管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="3-1">
                      <i class="el-icon-menu"></i>商品列表
                    </el-menu-item>
                    <el-menu-item index="3-2">
                      <i class="el-icon-menu"></i>分类参数
                    </el-menu-item>
                    <el-menu-item index="3-3">
                      <i class="el-icon-menu"></i>商品分类
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="4">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>订单管理</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="4-1">
                      <i class="el-icon-menu"></i>订单列表
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
                <el-submenu index="5">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>数据统计</span>
                  </template>
                  <el-menu-item-group>
                    <el-menu-item index="5-1">
                      <i class="el-icon-menu"></i>数据报表
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>Main</el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  name: "index",
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$confirm("确定要退出吗", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          window.localStorage.removeItem("token");
          this.$router.push('/login')
          this.$message({
            type: "success",
            message: "退出成功!"
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消退出"
          });
        });
    }
  }
};
</script>

<style lang='scss' scoped>
.index-wrap {
  .el-container {
    .el-header {
      background-color: rgb(179, 192, 209);
      .el-row .el-col {
        height: 60px;
        line-height: 60px;
        h2 {
          font-size: 24px;
          color: #fff;
          font-weight: normal;
          line-height: 60px;
          text-align: center;
        }
        .iconfont {
          font-size: 24px;
          color: red;
        }
      }
    }
    .el-container {
      height: 1000px;
      .el-menu.el-menu-vertical-demo {
        border-right: none;
      }
      .el-main {
        background-color: rgb(233, 238, 243);
      }
    }
  }
}
</style>
