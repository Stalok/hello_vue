<template>
  <div class="person">
    <h1>{{ name }}</h1>
    <h1>{{ age }}</h1>
    <button @click="addAge">Add Age</button>
  </div>
</template>

<script lang="ts">
export default {
  name: "Person",
};
</script>

<script setup lang="ts">
import { ref } from "vue";
let name = ref("john");
let age = ref(18);

function addAge() {
  age.value += 1;
}
</script>

<style lang=""></style>
