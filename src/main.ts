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
 *  2、轻量快速的热重载（HMR）
 *  在热更新的时候只需要重新编译被修改的文件即可，对于其他未修改的文件可以从缓存中拿到编译的结果
 *  对于Webpack来讲则需要再次经历一次打包,不会随项目变大而变慢
 *  3、Rollup打包  它使用 Rollup 打包你的代码，并且它是预配置的 并且支持大部分rollup插件
 * 
 * vite服务器启动速度比webpack快，由于vite启动的时候（原生JS module(ESM)，(<script type="module">)）不需要打包，
 * 只需处理一些源代码的路径问题和预构建，所以启动速度非常快。接着，现代浏览器通过解析 script module，
 * 对每一个 import 到的模块进行 HTTP 请求，服务器继续对这些 HTTP 请求进行处理并响应
 * 当浏览器请求需要的模块时，再对模块进行编译，这种按需动态编译的模式，极大缩短了编译时间，当项目越大，文件越多时，
 * vite的开发时优势越明显。vite热更新比webpack快，vite在HRM方面，当某个模块内容改变时，让浏览器去重新请求该模块即可，
 * 而不是像webpack重新将该模块的所有依赖重新编译。
 * 
 * Vite的使用简单，只需执行初始化命令，就可以得到一个预设好的开发环境，开箱即获得一堆功能，
 * 包括：CSS预处理、html预处理、异步加载、分包、压缩、HMR等。
 * 使用复杂度介于Parcel和Webpack的中间，只是暴露了极少数的配置项和plugin接口，
 * 既不会像Parcel一样配置不灵活，又不会像Webpack一样需要了解庞大的loader、plugin生态，灵活适中、复杂度适中。
 * 
 * 
 * 不足：
 *  生态不及webpack，加载器、插件不够丰富
    打包到生产环境时，vite使用传统的 rollup（也可以自己手动安装webpack来）进行打包
    项目的开发浏览器要支持 ES Module，而且不能识别 CommonJS 语法
 */
