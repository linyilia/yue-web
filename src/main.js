import { createApp } from 'vue'
import App from './App.vue'
import router from "./router/index";
import "./assets/icon/iconfont.css";
import ElementPlus from "element-plus";
import "element-plus/theme-chalk/index.css";
import locale from "element-plus/lib/locale/lang/zh-cn";
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

const app = createApp(App)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}
app.use(router).use(ElementPlus, { locale }).mount("#app");
