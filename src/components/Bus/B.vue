<template>
  <div style="background-color: rebeccapurple">我是B{{ Flag }}</div>
</template>

<script setup lang="ts">
import { ref, getCurrentInstance } from "vue";
// import Bus from "./bus";
import Bus from "./bus";

const instance = getCurrentInstance();

let Flag = ref(false);
instance?.proxy?.$Bus.on("on-click", (flag) => {
  console.log(flag);
});
// Bus.on("on-click", (flag: boolean) => {
//   Flag.value = flag;
// });
// Bus.on("on-click", (flag: boolean) => {
//   console.log(flag);
// });
</script>

<style></style>
