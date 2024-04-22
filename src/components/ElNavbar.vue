<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    :ellipsis="false"
    @select="handleSelect"
  >
    <el-menu-item index="0">
      <router-link to="/">
        <img style="width: 4rem" src="@/images/black logo.svg" alt="Logo" />
      </router-link>
    </el-menu-item>
    <el-text>SQL Learning System</el-text>
    <div class="flex-grow" />
    <!-- <el-menu-item index="1"
      ><router-link to="/about" class="link">About</router-link></el-menu-item
    > -->
    <!--    TODO: not working-->
    <el-sub-menu :index="username" v-if="!logged"
      ><template #title>{{ username }}</template>
      <!--TODO: Setting page-->
      <el-menu-item index="2-1">Settings</el-menu-item>
      <el-menu-item index="2-2" divided @click="logout">Logout</el-menu-item>
      <!-- <router-link to="/login" class="link">Login</router-link> -->
    </el-sub-menu>
    <el-menu-item index="Guest" v-else disabled>Guest</el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import router from "@/router";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

let logged = ref(false);
let username = ref(localStorage.getItem("username") || "Guest");

const logout = () => {
  localStorage.removeItem("username");
  localStorage.removeItem("Authorization");
  logged.value = false;
  // back to home page
  router.push("/");
};
</script>

<style>
.flex-grow {
  flex-grow: 1;
}
.link {
  color: #fff;
  text-decoration-line: none;
}
</style>
