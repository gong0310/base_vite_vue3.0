<template>
  <div>
    <slot name="header"></slot>
    <!-- 作用域插槽，组件动态绑定参数 派发给父组件的slot去使用 -->
    <div v-for="item in 10" :key="item">
      <slot :itemInfo="item"></slot>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
<script setup lang="ts"></script>
