<template>
  <div>
    <div class="header">
      <img src="@/assets/image/bg.png" alt="" />
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
export default {
  components: {
    NavBar,
    yueVideo
  },
  setup() {
    return {};
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
