<template>
  <div class="main">
    <!-- 登录表单 -->
<!--    <transition name="fade">-->
      <div v-if="!showRegisterForm" class="login-form">
        <el-form ref="loginForm" :model="loginData" :rules="rules" label-width="80px">
          <!-- ... 其他登录表单字段 ... -->
          <el-form-item prop="username">
            <el-input
              placeholder="請輸入賬號"
              v-model="loginData.username"
              size="large"
              type="text"
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="請輸入密碼"
              v-model="loginData.password"
              size="large"
              type="password"
              @keyup.enter.native="login()"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">登录</el-button>
            <el-button @click="showRegisterForm = true">注册</el-button>
          </el-form-item>
        </el-form>
      </div>
<!--    </transition>-->

    <!-- 注册表单 -->
<!--    <transition name="fade">-->
      <div v-if="showRegisterForm" class="login-form" >
        <el-form ref="registerForm" :model="registerData" :rules="rules" label-width="80px">
          <!-- ... 其他注册表单字段 ... -->
          <el-form-item prop="username">
            <el-input
              placeholder="請輸入賬號"
              v-model="registerData.username"
              size="large"
              type="text"
            >
              <template #prefix>
                <el-icon><User /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="email">
            <el-input
              placeholder="請輸入郵箱"
              v-model="registerData.email"
              size="large"
              type="text"
            >
              <template #prefix>
                <el-icon><MessageBox /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              placeholder="請輸入密碼"
              v-model="registerData.password"
              size="large"
              type="password"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item prop="confirmPassword">
            <el-input
              placeholder="請再次輸入密碼"
              v-model="registerData.confirmPassword"
              size="large"
              type="password"
              @keyup.enter.native="register()"
            >
              <template #prefix>
                <el-icon><Lock /></el-icon>
              </template>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="register">注册</el-button>
            <el-button @click="showRegisterForm = false">返回登录</el-button>
          </el-form-item>
        </el-form>
      </div>
<!--    </transition>-->
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";
import service from "@/utils/request.ts";
import router from "@/router";
import {ElMessage} from "element-plus";
import {Lock, MessageBox, User} from "@element-plus/icons-vue";

const loginData = ref({
  username: "",
  password: "",
});

const registerData = ref({
  username: "",
  email: "",
  password: "",
  confirmPassword: "",
});

const rules = {
  username: [{ required: true, message: "請輸入賬號", trigger: "blur" }, { min: 3, max: 10, message: "長度在 3 到 10 個字符", trigger: "blur" }],
  password: [{ required: true, message: "請輸入密碼", trigger: "blur" }, { min: 6, max: 20, message: "長度在 6 到 20 個字符", trigger: "blur" }],
  email: [
    { required: true, message: "請輸入郵箱", trigger: "blur" },
    { type: "email", message: "請輸入正確的郵箱地址", trigger: ["blur", "change"] },
  ],
  confirmPassword: [
    { required: true, message: "請再次輸入密碼", trigger: "blur" },
    { validator: (rule, value, callback) => {
      if (value === registerData.value.password) {
        callback();
      } else {
        callback(new Error("兩次輸入的密碼不一致"));
      }
    }, trigger: "blur" },
  ],
};

const login = () => {
  // 处理登录逻辑
  // let res = service.post("/login", loginData.value);
  let res = service.post("/login", loginData.value);
  res.then(
      (res) => {
      if (res.status !== 200) {
        ElMessage.error(res.data);
      }
      localStorage.setItem("Authorization", res.data);
      localStorage.setItem("username", loginData.value.username);
      router.push("/course");
  },
      (err) => {
        ElMessage.error(err);
  });
};

const register = () => {
  service.post("/register", {username: registerData.value.username, password: registerData.value.password, email: registerData.value.email}).then(
      (res) => {
      if (res.status !== 200) {
        ElMessage.error(res.data);
      }
      ElMessage.success("注册成功，请登录");
      showRegisterForm.value = false;
  },
      (err) => {
        ElMessage.error(err.response.data);
  });
};

const showRegisterForm = ref(false); // 控制显示登录或注册表单

</script>

<style>

.login-form {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
