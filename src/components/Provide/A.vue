<template>
  <div style="background-color: green">
    我是A
    <div>{{ flag }}</div>
    <B/>
  </div>
</template>

<script setup lang="ts">
import B from "./B.vue";
import { inject, Ref, ref } from 'vue'
 
const flag = inject('flag')
 
</script>

<style></style>
