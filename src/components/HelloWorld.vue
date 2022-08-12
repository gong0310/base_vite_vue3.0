<template>
  <h1>{{ msg }}</h1>

  <div class="card">
    <button type="button" @click="count++">count is {{ count }}</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

// 使用传递字面量类型的纯类型语法做为参数，这是TS特有的
// defineProps<{ msg: string }>();
type Props = {
  msg?: string;
};
defineProps<Props>();

const emit = defineEmits(["handleAdd"]);
const handleClickAdd = () => {
  emit("handleAdd", "哈哈哈");
};
const count = ref(0);

defineExpose({
  msg:'来来来'
})
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
