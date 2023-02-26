<template>
  <div style="background-color: green" @click="emitB">我是A</div>
</template>

<script setup lang="ts">
import { getCurrentInstance } from "vue";
import Bus from "./bus";

const instance = getCurrentInstance();
console.log('instance',instance?.appContext.config.globalProperties)
let flag = false;
const emitB = () => {
  flag = !flag;
  Bus.emit("on-click", flag);
  // instance?.proxy?.$Bus.emit("on-click", flag)
};
</script>

<style></style>
