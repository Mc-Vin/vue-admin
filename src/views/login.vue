<template>
  <div class="wrap">
    <el-form
      :model="ruleForm"
      status-icon
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model="ruleForm.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { login } from "../api/http";
export default {
  name: "login",
  data() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入正确用户名", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入正确密码", trigger: "blur" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          login({
            username: this.ruleForm.username,
            password: this.ruleForm.password
          })
            .then(response => {
              if(response.data.meta.status==200){
                this.$message.success(response.data.meta.msg);
                window.localStorage.setItem('token',response.data.data.token);
                this.$router.push('/index');
              }else if(response.data.meta.status==400){
                this.$message.success(response.data.meta.msg);
              }
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.wrap {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  background: rgb(50, 65, 82);
  .el-form {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    width: 580px;
    height: 440px;
    padding: 40px 40px 0;
    background-color: #fff;
    border-radius: 5px;
    h2 {
      margin-bottom: 20px;
      font-weight: 600;
    }
    .el-button {
      width: 100%;
      margin-top: 15px;
    }
  }
}
</style>
