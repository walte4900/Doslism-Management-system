<template>
  <div class="register">
    <div class="form_container">
      <div class="manage_tip">
        <span class="title">Doslism Management System</span>
        <el-form
          :model="registerUser"
          :rules="rules"
          ref="registerForm"
          label-width="80px"
          class="registerForm"
        >
          <el-form-item label="用户名" prop="name">
            <el-input
              type="text"
              v-model="registerUser.name"
              placeholder="请输入用户名"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="邮箱" prop="email">
            <el-input
              type="email"
              v-model="registerUser.email"
              placeholder="请输入邮箱"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="password">
            <el-input
              type="password"
              v-model="registerUser.password"
              placeholder="请输入密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="password2">
            <el-input
              type="password"
              v-model="registerUser.password2"
              placeholder="确认密码"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="身份" prop="identity">
            <el-select
              v-model="registerUser.identity"
              placeholder="选择你的身份"
            >
              <el-option lable="管理员" value="admin"></el-option>
              <el-option lable="员工" value="emplyee"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('registerForm')">
              注册
            </el-button>
            <el-button @click="resetForm('registerForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped>
.register {
  position: relative;
  width: 100%;
  height: 100%;
  background: url(../assets/bg.jpg) no-repeat center center;
  background-size: 100% 100%;
}
.form_container {
  width: 370px;
  height: 210px;
  position: absolute;
  top: 10%;
  left: 34%;
  padding: 25px;
  border-radius: 5px;
  text-align: center;
}
.form_container .manage_tip .title {
  font-family: "Microsoft YaHei";
  font-weight: bold;
  font-size: 26px;
  color: rgb(255, 255, 255);
}
.registerForm {
  margin-top: 20px;
  background-color: #fff;
  padding: 20px 40px 20px 20px;
  border-radius: 5px;
  box-shadow: 0px 5px 10px #cccc;
}

.submit_btn {
  width: 100%;
}
</style>

<script>
export default {
  name: "register",
  components: {},
  data() {
    var validatePass2 = (rule, value, callback) => {
      if (value !== this.registerUser.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };

    return {
      registerUser: {
        name: "",
        email: "",
        password: "",
        password2: "",
        identity: "",
      },

      rules: {
        password: [
          { required: true, message: "密码不能为空", tigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "密码长度应在6到30之间",
            trigger: "blur",
          },
        ],
        password2: [
          { required: true, message: "密码不能为空", tigger: "blur" },
          {
            min: 6,
            max: 30,
            message: "密码长度应在6到30之间",
            trigger: "blur",
          },
          {
              validator: validatePass2,
              trigger: "blur"
          }
        ],
        email: [{ required: true, message: "邮箱格式不正确", trigger: "blur" }],
        name: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 30, message: "长度在2到30字符之间" },
        ],
      },
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
  },
};
</script>
