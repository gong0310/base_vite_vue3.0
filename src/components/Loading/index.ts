import { App, createVNode, VNode, render } from "vue";
import Loading from "./index.vue";

export default {
  install(app: App) {
    // 转化为虚拟dom
    const vnode: VNode = createVNode(Loading);
    // 虚拟dom render成真实dom，渲染到body上
    render(vnode, document.body);
    console.log("app", vnode.component?.exposed, vnode);

    app.config.globalProperties.$loading = {
      show: vnode.component?.exposed?.show,
      hide: vnode.component?.exposed?.hide,
    };
    // app.config.globalProperties.$loading.show()
  },
};
