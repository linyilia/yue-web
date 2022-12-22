import { createRouter, createWebHashHistory } from "vue-router";
import layout from "@/layout/index"
 
const routes = [
  {
    path: "",
    name: "home",
    redirect: "/home",
    component:layout,
    children: [
      {
        path: "/home",
        name: "home",
        component: () => import(/* webpackChunkName: "first" */ "@/views/home"),
        meta: { title: "首页", icon: "icon-shouye" },
      },
      {
        path: "/article",
        name: "article",
        component: () =>
          import(/* webpackChunkName: "first" */ "@/views/article"),
        meta: { title: "文章", icon: "icon-wodewenzhang" },
      },
      {
        path: "/video",
        name: "video",
        component: () =>
          import(/* webpackChunkName: "first" */ "../views/video"),
        meta: { title: "视频", icon: "icon-shipintuiguang" },
      },
    ],
  },
];
 
const router = createRouter({
  history: createWebHashHistory(),
  routes,
});
 
export default router;