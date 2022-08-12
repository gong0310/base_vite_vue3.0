<template>
    <div style="background-color: green;">
        我是B
        <button @click="change">change falg</button>
        <div>{{ flag }}</div>
    </div>
</template>
    
<script setup lang='ts'>
import { inject, Ref, ref } from 'vue'
 
 // 第二个参数为默认值
const flag = inject<Ref<number>>('flag', ref(1))
 
const change = () => {
    flag.value = flag.value+=1
}
</script>
    
<style>
</style>