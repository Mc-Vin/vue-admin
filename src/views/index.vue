<template>
  <div class="index-wrap">
    <el-container class="above">
      <el-header>
        <el-row>
          <el-col class="left" :span="5">
            Vincent Zhu
          </el-col>
          <el-col :span="18">
            <h2>Vue-admin</h2>
          </el-col>
          <el-col :span="1">
            <i class="iconfont" @click="logout">&#xe60a;</i>
          </el-col>
        </el-row>
      </el-header>
      <el-container class="below">
        <el-aside width="200px">
          <el-row class="tac">
            <el-col :span="24">
              <el-menu
                default-active="2"
                class="el-menu-vertical-demo"
                :unique-opened="true"
                :router="true"
              >
                <!-- 左侧列表内容渲染 -->
                <el-submenu v-for="(item,index) in menuList" :index="''+index">
                  <template slot="title">
                    <i class="el-icon-location"></i>
                    <span>{{item.authName}}</span>
                  </template>
                  <el-menu-item-group v-for="(subItem) in item.children">
                    <el-menu-item :index="'/index/'+subItem.path">
                      <i class="el-icon-menu"></i>
                      {{subItem.authName}}
                    </el-menu-item>
                  </el-menu-item-group>
                </el-submenu>
              </el-menu>
            </el-col>
          </el-row>
        </el-aside>
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { menus } from "../api/http";
export default {
  name: "index",
  data() {
    return {
      menuList: []
    };
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
          this.$router.push("/login");
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
  },
  created() {
    //页面加载后获取左侧列表数据
    menus()
      .then(response => {
        this.menuList = response.data.data;
      })
      .catch(err => {
        console.log(err);
      });
  }
};
</script>

<style lang='scss' scoped>
.index-wrap {
  height: 800px;
  display: flex;
  flex-direction: column;
  .el-container {
    .el-header {
      height: 60px;
      background-color:black;
      .el-row .el-col {
        color:#fff;
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
      // flex: 1;s
      .el-menu.el-menu-vertical-demo {
        border-right: none;
      }
      .el-main {
        padding-top: 0;
        background-color: rgb(233, 238, 243);
      }
    }
  }
}
</style>
