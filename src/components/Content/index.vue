<template>
  <div>
    <div @click="swichCom(item)" v-for="item in data" :key="item.name">
      {{ item.name }}
    </div>
      <!-- 动态组件切换，类似选项卡 -->
      <component :is="curent.comName"></component>
    <hr />
  </div>
</template>
<script setup lang="ts">
import { reactive, ref, markRaw } from "vue";
import A from "./A.vue";
import B from "./B.vue";

type Tabs = {
  name: string;
  comName: any;
};
type Com = Pick<Tabs, "comName">;

// 会对数据进行proxy代理，但是我们组件不需要代理，所以使用markRaw跳过代理(多一个_v_skip属性为true)
const data = reactive<Tabs[]>([
  {
    name: "我是A组件",
    comName: markRaw(A),
  },
  {
    name: "我是B组件",
    comName: markRaw(B),
  },
]);
let curent = reactive<Com>({
  comName: data[0].comName,
});

const swichCom = (item: Tabs) => {
  curent.comName = item.comName;
};
</script>
