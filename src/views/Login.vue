<template>
  <div class="login-body">
    <div class="login-panel">
      <div class="login-title">用戶登錄</div>
      <el-form :model="formData" :rules="rules" ref="formDataRef">
        <el-form-item prop="username">
          <el-input
            placeholder="請輸入賬號"
            v-model="formData.username"
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
            v-model="formData.password"
            size="large"
            type="password"
            @keyup.enter.native="submitLogin()"
          >
            <template #prefix>
              <el-icon><Lock /></el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            style="width: 100%"
            @click="submitLogin()"
            size="large"
          >
            登錄
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import { ElMessage } from "element-plus";
import service from "@/utils/request"; // 自行封裝的axios，請根據你的專案修改路徑
import { useRouter } from "vue-router";

import { login } from "@/utils/api";

const formDataRef = ref();
let formData = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [
    { required: true, message: "請輸入用戶名" },
    {
      min: 3, // 最小字符书
      max: 20, // 最大字符数
      message: "用户名长度需要在3-20个字符之间", // 触发的提示信息
      trigger: "blur", // 触发的条件
    },
  ],
  password: [
    { required: true, message: "請輸入密碼" },
    {
      min: 8, // 最小字符书
      max: 20, // 最大字符数
      message: "密码长度需要在8-20个字符之间", // 触发的提示信息
      trigger: "blur", // 触发的条件
    },
  ],
};

const router = useRouter();

const submitLogin = () => {
  const formObj = JSON.parse(JSON.stringify(formData));
  service.post("/login", formObj).then((res) => {
    if (res) {
      ElMessage({
        message: "登錄成功",
        type: "success",
      });

      const tokenObj = { token: "isLogin", startTime: new Date().getTime() };
      window.localStorage.setItem("isLogin", JSON.stringify(tokenObj));
      localStorage.setItem(
        "username",
        JSON.parse(JSON.stringify(formData.username))
      );

      router.push("/");
    } else {
      ElMessage.error("賬號或密碼錯誤！登錄失敗！");
    }
  });
  // request.post("/login", formObj).then((res) => {
  //   if (res) {
  //     ElMessage({
  //       message: "登錄成功",
  //       type: "success",
  //     });

  //     const tokenObj = { token: "isLogin", startTime: new Date().getTime() };
  //     window.localStorage.setItem("isLogin", JSON.stringify(tokenObj));
  //     localStorage.setItem(
  //       "username",
  //       JSON.parse(JSON.stringify(formData.username))
  //     );

  //     router.push("/");
  //   } else {
  //     ElMessage.error("賬號或密碼錯誤！登錄失敗！");
  //   }
  // });
};
</script>

<style lang="scss" scoped>
.login-body {
  /* background: url("../assets/your-background-image.png") no-repeat center center; */
  background-color: aqua;
  height: 100%;
  width: 100%;
  background-size: cover;
  position: absolute;
  left: 0;
  top: 0;

  .login-panel {
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    margin: auto;
    padding: 25px;
    width: 26%;
    min-width: 460px;
    height: 30%;
    min-height: 300px;
    background: rgba(255, 255, 255, 0.6);
    border-radius: 5%;
  }
}
</style>
