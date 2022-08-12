<template>
    <div class="App">
        <button>我是Provide</button>
        <A></A>
    </div>
</template>
    
<script setup lang='ts'>
import { provide, ref } from 'vue'
import A from './A.vue'
let flag = ref<number>(1)
// 你如果传递普通的值 是不具有响应式的 需要通过ref reactive 添加响应式
provide('flag', flag)
/**
 * provide，inject源码实现过程：
 * 
 * provide：
 * 1、判断是否在steup形式下使用，否则报警告
 * 2、默认继承父类的provide对象,通过provides = object.create(parentProvides)来实现继承
 * 3、使用父类的provide对象作为原型来创建自己的provide对象
 * 
 * inject：
 * 1、先判断父级有没有provide值，如果没有就去找根组件，如果有的话就去父级查根据原型链
 * 
 * 非常巧妙
 */
</script>

    
<style>
.App {
    background: blue;
    color: #fff;
}
</style>