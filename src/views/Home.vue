<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
</script>

<template>
  <body>
    <section class="left">
      <!--課程介紹-->
    </section>
    <section class="right">
      <!--登錄表單-->
      <LoginForm />
    </section>
  </body>
</template>

<style scoped lang="scss">
body {
  margin-top: 1rem;
  padding: 0rem 1rem;
  display: flex;
  flex-wrap: wrap;
  section.left,
  section.right {
    padding: 1.5rem;
  }

  section.left {
    flex: 4 1 350px;
  }

  section.right {
    background-color: rgb(218, 218, 218);
    height: 30vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 1 250px;
  }
}
</style>
