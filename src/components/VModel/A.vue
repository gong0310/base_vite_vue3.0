<template>
  <div>
    AAA
    <input :value="modelValue" @input="changeInput" type="text" />
    {{ title }}
  </div>
</template>

<script setup lang="ts">
type Props = {
  modelValue: string;
  title: string;
  modelModifiers?: {
    // modelValue的修饰符
    xiaoman: boolean;
  };
  titleModifiers?: {
    default: () => {};
  };
};
const PropsData = defineProps<Props>();
const emit = defineEmits(["update:modelValue", "update:title"]);

const changeInput = (e: any) => {
  console.log(PropsData.modelModifiers); // modelModifiers 配置了就是true。{xiaoman: true}

  emit("update:modelValue", e.target.value);
  emit("update:title", e.target.value + "title");
};
</script>

<style></style>