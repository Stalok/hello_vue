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
        <img
          style="width: 4rem"
          src="@/images/black logo.svg"
          alt="Element logo"
        />
      </router-link>
    </el-menu-item>
    <div class="flex-grow" />
    <!-- <el-menu-item index="1"
      ><router-link to="/about" class="link">About</router-link></el-menu-item
    > -->
    <el-menu-item index="1" v-if="!logged" disabled>Guest</el-menu-item>
    <el-sub-menu index="1" v-else
      ><template #title>{{ username }}</template>
      <!--TODO: Setting page-->
      <el-menu-item index="1-1">Settings</el-menu-item>
      <el-menu-item index="1-2" divided @click="logout">Logout</el-menu-item>
      <!-- <router-link to="/login" class="link">Login</router-link> -->
    </el-sub-menu>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
};

let logged = ref(false);
let username = localStorage.getItem("username") || "Guest";

const logout = () => {
  localStorage.removeItem("username");
  logged.value = false;
  // back to home page
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
