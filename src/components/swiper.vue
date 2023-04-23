<template>
  <div class="wrapper" @mouseenter="clear" @mouseleave="run">
      <div id="slideBox" class="slide-box">
        <div class="slide"  v-for="(item,index) in tableData"  :key="index" >
            <img :src="item.url" alt="">
        </div>
      </div>      
      <div class="point-box">
          <div  class="point" :class="curIndex==index?'active':''" v-for="(item,index) in tableData" :key="index" @click="gotoIndex(index)"  ></div>
      </div>
      
  </div>
</template>

<script>
import { ref, onMounted,nextTick,once } from "vue";
import { reactive } from '@vue/reactivity';
import mockApi from "../api/mockApi"
export default {
  setup() {
    //页面数据请求
    let tableData = reactive([]);
    let curIndex = ref(0)
    let timer=ref(0)
    const getList = async () => {
       await mockApi
        .findAll()
        .then((res) => {
          console.log(res);
          if (res.code === "0") {
            tableData.push.apply(tableData, res.data);
            nextTick(()=>{
                let slides=document.querySelectorAll(".slide")
                if(slides.length){
                    slides.forEach(ele=>{
                       ele.style.width=ele.parentElement.parentElement.clientWidth
                    })
                }
            })
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    };
    getList(); //直接调用请求方法
    const gotoIndex=(index)=>{  
      
       if(index>curIndex){
          next("left",index)
       }else{
          next("right",index)
       }      
      
    }
    const next=(arrow,index)=>{ 
        console.log(curIndex.value)
        curIndex.value=index  
        let _slideDom=document.getElementById("slideBox")
        let _slideWidth=document.getElementsByClassName("slide")[0].clientWidth;         
        if(arrow=="left"&&(index<tableData.length-1)){
            _slideDom.style.transform="translate3d("+index*_slideWidth+"px, 0, 0)";
            //  curIndex.value++
        }else if(arrow=="right"){
            _slideDom.style.transform="translate3d(-"+index*_slideWidth+"px, 0, 0)";
        }     
        _slideDom.style.transition="all 1s"  
    }
    const run =(()=>{
        timer= setInterval(() => {
            if(curIndex.value<tableData.length-1) curIndex.value++  
            else curIndex.value=0;         
            next("right",curIndex.value)
        }, 2000)
    })
    const clear=(()=>{
        clearInterval(timer)
    })
    onMounted(()=>{
        run()
    })  
    return {
        tableData,
        curIndex,
        gotoIndex,
        clear,
        run
    };
  },
};
</script>

<style lang="scss" scoped>
.wrapper{
    width: 100%;    
    overflow: hidden;
 .slide-box{
    width: 5000px;
    // position: relative;
    height: 250px;
    .slide{
        float: left;
        // display: none;
        height: 250px;
        // position: absolute;
        // left: -100%;
        width: 0px;
      img{
          width: 100%;
          height: 100%;
      }
    }
    .active{
        display: block;
        animation:move 1s;
	    -webkit-animation:move 1s;
        -webkit-animation-iteration-count: 1;
        animation-fill-mode:forwards;
        -webkit-animation-fill-mode:forwards; /* Safari 和 Chrome */
    }
    .left{
        animation:left 1s;
	    -webkit-animation:left 1s;
        -webkit-animation-iteration-count: 1;
        animation-fill-mode:forwards;
        -webkit-animation-fill-mode:forwards; /* Safari 和 Chrome */
    }
    .next{
        animation:right 1s;
	    -webkit-animation:right 1s;
        -webkit-animation-iteration-count: 1;
        animation-fill-mode:forwards;
        -webkit-animation-fill-mode:forwards; /* Safari 和 Chrome */
    }
    // .prev.right{
    //     animation:left 1s;
	//     -webkit-animation:left 1s;
    //     -webkit-animation-iteration-count: 1;
    //     animation-fill-mode:forwards;
    //     -webkit-animation-fill-mode:forwards; /* Safari 和 Chrome */
    // }
 }
 .slide-box:after{content:".";display:block;height:0;clear:both;visibility:hidden}

 .point-box{
     .point{
         width: 10px;
        height: 10px;
        border-radius: 50%;
        background: #751520;
        display: inline-block;
        margin: 0 5px;
     }
     .active{
         background: #dcd8d8;
     }
 }
}
@keyframes move
{
	from {left:-100%;}
	to {left:0;}
}

@-webkit-keyframes move /* Safari and Chrome */
{
		from {left:-100%;}
	to {left:0;}
}
@keyframes left
{
	from {left:0;}
	to {left:-100%;}
}

@-webkit-keyframes left 
{
	from {left:0;}
	to {left:-100%;}
}
@keyframes right
{
	from {left:0;}
	to {left:0;}
}

@-webkit-keyframes right 
{
	from {left:0;}
	to {left:0;}
}
</style>
