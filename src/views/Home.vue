<script setup lang="ts">
import Person from "@/components/Person.vue";
import ElNavbar from "@/components/ElNavbar.vue";
</script>

<template>
  <ElNavbar />
  <body>
    <router-view />
  </body>
</template>

<style scoped lang="css">
body {
  margin: 1rem 1rem;
  padding: 1rem 1rem;
  border-radius: 1rem;
  border-style: solid;
}
</style>
