<template>
  <div>
    <A>我是匿名(默认)插槽</A>
    <B>
      <!-- <template v-slot:footer>
        <p>具名插槽footer</p>
      </template>
      <template v-slot:header>
        <p>具名插槽header</p>
      </template>
        <template v-slot>
        <p>具名插槽默认</p>
      </template> -->

      <!-- #号是简写方式 ，插槽可以是一个变量名(动态插槽) -->
      <!-- <template #footer> -->
      <template #[name]>
        <p>具名插槽footer</p>
      </template>
      <template #header>
        <p>具名插槽header</p>
      </template>
      <template #default="{ itemInfo }">
        <p>具名插槽默认{{ itemInfo }}</p>
      </template>
    </B>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import A from "./A.vue";
import B from "./B.vue";

const name = ref('具名插槽footer')
</script>
