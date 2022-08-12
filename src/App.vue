<template>
  <div class="layout">
    <div class="layout-left">
      菜单区域<br />
      <Tree />
    </div>
    <div class="layout-right">
      <div class="layout-right-header">头部区域</div>
      <div class="layout-right-main">
        <Content />
        <Slot />
        <Provide />
        <Bus />
        <VModel />
        <hr />
        主体区域<br />
        {{ message }}
        <input class="main-input" v-model="message" type="text" />
        <hr />
        <button @click="handleGetRef">获取子组件ref</button>
        <HelloWorld ref="hellos" msg="Vite + Vue" />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import HelloWorld from "./components/HelloWorld.vue";
import Tree from "./components/Tree/index.vue";
import Content from "./components/Content/index.vue";
import Slot from "./components/Slot/index.vue";
import Provide from "./components/Provide/index.vue";
import Bus from "./components/Bus/index.vue";
import VModel from "./components/VModel/index.vue";
import { Ref, ref } from "vue";

const message: Ref<string> = ref("哈哈哈");
const hellos = ref(null);
const instance = getCurrentInstance();

const handleGetRef = () => {
  console.log("hellos", hellos.value);
  instance?.appContext.config.globalProperties.$loading.show();
};
/**
 * nextTick源码实现过程：
 *  nextTick 接受一个参数fn（函数），定义了一个变量P是promise类型，如果传了fn 就使用变量P.then执行一个微任务去执行fn函数，
 *  then里面this 如果有值就调用bind改变this指向返回新的函数，否则直接调用fn，如果没传fn，就返回一个promise，最终结果都会返回一个promise
 *  注：浏览器如果不兼容则有几种备选方案，其中setTimeout是最后的一种备选方案，它会将回调函数加入任务队列 task 中，等待执行
 * 
 *  异步更新源码解读: https://www.cnblogs.com/yanxiaoliang/p/16427069.html
 *  1、数据更改，调用set方法，检测到数据的变化，会触发相应trigger函数（可以理解为监听者）,
 *  2、把trigger函数通过queueJob函数放入任务队列里面。
 *  2、然后遍历主任务队列调用queueFlush函数执行异步任务处理，DOM更新 , 里面会通过includes查看是否已经存在进行去重，以及根据id进行排序：
 *  排序，先渲染父节点，再渲染子节点， 这样可以避免不必要的子节点渲染
 *  3、处理完之后才会执行 nextTick里面的回调，因为先来后到
 */
</script>
<style scoped lang="less">
@border: #ccc;
.layout {
  display: flex;
  overflow: hidden;
  height: 100%;
  &-left {
    width: 200px;
    height: 100%;
    background-color: aliceblue;
    border: 1px solid @border;
  }
  &-right {
    flex: 1;
    height: 100%;
    display: flex;
    flex-direction: column;
    &-header {
      height: 60px;
      background-color: bisque;
    }
    &-main {
      margin: 20px;
      flex: 1;
      background-color: aquamarine;
      overflow-y: auto;
    }
  }
}
</style>
