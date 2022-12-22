<template>
  <div class="nav-menu">
    <div @click="goRouter(item)" :class="curRoute==item.path?'item active':'item'" v-for="(item, index) in navList" :key="index">
      <span  class="icon iconfont icon-zhaoyang"></span>
      <span class="icon iconfont" :class="item.meta.icon"></span>
      <span>{{ item.meta.title }}</span>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import { useRouter } from "vue-router";
export default {
  setup() {
    const router = useRouter();
    let navList = ref([]);
    let curRoute=ref("")
    onMounted(() => {
      console.log("111", router);
      navList.value = router.options.routes[0].children;
      curRoute.value= navList.value[0].path
      console.log(navList);
    });
    let goRouter= (data) =>{
      curRoute.value=data.path;
      router.push(data.path)
    }
    return {
      navList,
      curRoute,
      goRouter
    };
  },
};
</script>

<style lang="scss" scoped>
.nav-menu {
  display: flex;
  align-items: center;
  flex-shrink: 0;
  margin-right: 10px;
  .item {
    position: relative;
    display: inline-block;
    height: 64px;
    line-height: 64px;
    font-size: 14px;
    cursor: pointer;
    margin:0px 15px;
    color: #fff;
    .iconfont{
      margin-right: 5px;
    }
    .icon-zhaoyang{
      // display: none;
      opacity: 0;
      -webkit-transition: top 3s,opacity 3s -webkit-transform 2s; /* For Safari 3.1 to 6.0 */
      transition:top 3s,opacity 3s, transform 2s;
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 5px;
      font-size: 25px;
      transition:0.2s linear
    }    
  }
  .item:hover{
    .icon-zhaoyang{
       top: -10px;
       opacity: 1;
     }
  }
  .active{
     .icon-zhaoyang{
       top: -10px;
       opacity: 1;
     }
  }
}
</style>
