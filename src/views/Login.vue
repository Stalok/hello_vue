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
              <el-icon>
                <i-ep-user />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            placeholder="請輸入密碼"
            v-model="formData.password"
            size="large"
            type="password"
            @keyup.enter.native="login()"
          >
            <template #prefix>
              <el-icon>
                <i-ep-lock />
              </el-icon>
            </template>
          </el-input>
        </el-form-item>
        <el-form-item label="">
          <el-button
            type="primary"
            style="width: 100%"
            @click="login()"
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
// import request from "@/utils/request"; // 自行封裝的axios，請根據你的專案修改路徑
import { useRouter } from "vue-router";

const formDataRef = ref();
let formData = reactive({
  username: "",
  password: "",
});

const rules = {
  username: [{ required: true, message: "請輸入用戶名" }],
  password: [{ required: true, message: "請輸入密碼" }],
};

const router = useRouter();

const login = () => {
  const formObj = JSON.parse(JSON.stringify(formData));
  // request.post("/user/login", formObj).then((res) => {
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
  // })
  ElMessage.error("賬號或密碼錯誤！登錄失敗！");
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
