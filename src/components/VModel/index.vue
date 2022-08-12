<template>
  <div>
    <hr />
    <h3 v-move:aaa.xiaoman="{ color: msg }">model变化</h3>
    <input v-model="msg" />{{ title }}<br />
    <A v-model.xiaoman="msg" v-model:title="title" />
    <hr />
  </div>
</template>

<script setup lang="ts">
import { ref, Directive, DirectiveBinding } from "vue";
import A from "./A.vue";
let msg = ref("red");
let title = ref("title");

type Dir = {
  color: string;
};
const vMove: Directive = {
  created() {
    console.log("vMode created 元素初始化的时候");
  },
  beforeMount() {
    console.log("vMode beforeMount 指令绑定到元素后调用 只调用一次");
  },
  mounted(el: HTMLElement, dir: DirectiveBinding<Dir>) {
    console.log("vMode mounted 元素插入父级dom调用",el);
    el.style.color = dir.value.color;
  },
  beforeUpdate() {
    console.log("vMode beforeUpdate");
  },
  updated(el: HTMLElement, dir: DirectiveBinding<Dir>) {
    console.log("vMode updated");
    el.style.color = dir.value.color;
  },
  beforeUnmount() {
    console.log("vMode beforeUnmount");
  },
  unmounted() {
    console.log("vMode unmounted ");
  },
};
// 简写 ，只在 mounted 和 updated 时触发
const vMove1: Directive = (el: HTMLElement, dir: DirectiveBinding<Dir>) => {};
</script>

<style></style>
