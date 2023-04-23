<template>
  <div>
    <div class="header">    
      <!-- <img src="@/assets/image/bg.png" alt="" /> -->
      <swiper></swiper>
      <div class="nav">
        <span
          class="icon iconfont icon-yueliang"
          style="color: #fff; margin-right: 10px"
        ></span>
        <NavBar></NavBar>
        <yueVideo></yueVideo>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import yueVideo from "@/components/video.vue"
import swiper from "@/components/swiper.vue"
import { reactive } from '@vue/reactivity';
export default {
  components: {
    NavBar,
    yueVideo,
    swiper
  },
  setup() {
    let _arr=["c","d"]
    let list=reactive([]) 
    // list.push("a")
    // list.push("b")
    list=_arr
    list[0]="e"
    let a =reactive(1)
    a=2
    let obj=reactive({a:"a"})
    obj.a="a1"
    obj.b="b"
    console.log(list);
    return {list,a,obj};
  },
};
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  img {
    height: 155px;
    width: 100%;
  }
  .nav {
    top: 0px;
    position: absolute;
    display: flex;
    align-items: center;
    padding: 0 24px;
  }
}
</style>
