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
    <el-menu-item index="1"
      ><router-link to="/about" class="link">About</router-link></el-menu-item
    >
    <el-menu-item index="2"
      ><router-link to="/login" class="link">Login</router-link></el-menu-item
    >
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

const activeIndex = ref("1");
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath);
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
