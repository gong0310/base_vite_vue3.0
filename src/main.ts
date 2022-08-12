import { createApp } from "vue";
import "./style.css";
import "./assets/reset.css";
import App from "./App.vue";
import mitt from "mitt";
import Loading from "./components/Loading/index";

const Mit = mitt();

declare module "vue" {
  export interface ComponentCustomProperties {
    $Bus: typeof Mit;
  }
}

const app = createApp(App);

//Vue3挂载全局API
app.config.globalProperties.$Bus = Mit;

app.use(Loading);

app.mount("#app");
/**
 * vite 的优势
 *  1、冷服务   默认的构建目标浏览器是能 在 script 标签上支持原生JS module(ESM)，(<script type="module">)
 * JS module只会被浏览器解析并执行一次，普通js脚本每一次通过<script>引入，浏览器都会去解析和执行它。
 *
 *  2、HMR  速度快到惊人的 模块热更新（HMR）
 *  3、Rollup打包  它使用 Rollup 打包你的代码，并且它是预配置的 并且支持大部分rollup插件
 */
