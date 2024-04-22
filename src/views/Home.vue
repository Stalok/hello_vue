<template>
  <body>
    <section class="left">
      <!--課程介紹-->
      <img
        src="@/images/jigar-panchal-8BAyCFRCHqY-unsplash.jpg"
        alt="A bunch of different types of pipes and fittings"
      />
    </section>
    <section class="right">
      <!--登錄表單-->
      <LoginForm />
    </section>
  </body>
  Photo by
  <a
    href="https://unsplash.com/@brave4_heart?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    >Jigar Panchal</a
  >
  on
  <a
    href="https://unsplash.com/photos/a-bunch-of-different-types-of-pipes-and-fittings-8BAyCFRCHqY?utm_content=creditCopyText&utm_medium=referral&utm_source=unsplash"
    >Unsplash</a
  >
</template>

<script setup lang="ts">
import LoginForm from "@/components/LoginForm.vue";
</script>

<style scoped lang="scss">
body {
  margin-top: 1rem;
  padding: 0 1rem;
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
    background-color: rgb(247, 241, 241);
    height: 30vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    flex: 1 1 250px;
  }
}
</style>
