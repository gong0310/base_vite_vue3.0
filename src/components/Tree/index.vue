<template>
  <!-- 递归组件 -->
  <TreeItem :data="data" @on-click="handleGetItem" />
</template>
<script setup lang="ts">
import TreeItem from "./TreeItem.vue";
import { reactive } from "vue";
type TreeList = {
  name: string;
  icon?: string;
  children?: TreeList[] | [];
};
const data = reactive<TreeList[]>([
  {
    name: "no.1",
    children: [
      {
        name: "no.1.1",
        children: [
          {
            name: "no.1.1.1",
          },
        ],
      },
    ],
  },
  {
    name: "no.2",
    children: [
      {
        name: "no.2.1",
        children: [
          {
            name: "no.2.1.1",
          },
          {
            name: "no.2.1.2",
          },
        ],
      },
      {
        name: "no.2.2",
        children: [
          {
            name: "no.2.2.1",
          },
        ],
      },
    ],
  },
]);

const handleGetItem = (item: TreeList) => {
  console.log("item", item);
};
</script>
