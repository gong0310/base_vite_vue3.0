<template>
  <div style="margin-left: 10px">
    <div  @click.stop="handleClickItem(item)" v-for="(item, index) in data" :key="index">
      {{ item.name }}
      <TreeItem @on-click="handleClickItem" v-if="item.children?.length" :data="item.children" />
    </div>
  </div>
</template>
<script setup lang="ts">
// 方式一 自身调用自身组件
import TreeItem from "./TreeItem.vue";

type TreeList = {
  name: string;
  icon?: string;
  children?: TreeList[] | [];
};

type Props = {
  data: TreeList[];
};
defineProps<Props>();

const emit=defineEmits(['on-click'])
const handleClickItem=(item:TreeList)=>{
    emit('on-click',item)
}
</script>

<script lang="ts">
export default {
  name: "TreeItem",
};
</script>
