<template>
  <div>
    <!-- <audio ref="audioRef" controls @canplay="getDuration">
      <source src="想见你.mp3" type="audio/mpeg" />
    </audio> -->
    <audio 
      style="display:none"
      ref="audioRef"
      src="想见你.mp3"
      controls
      @canplay="getDuration"
      @timeupdate="durationchange"
    >
      您的浏览器暂不支持audio
    </audio>
    <div class="player-box">
      <img :class="!isPause?'cover-rotate player-cover':'player-cover'"  :src="musicImg" alt="" />
      <div class="player-ft">
        <span class="name">{{ musicTitle }}</span>
        <i class="el-icon-caret-left"></i>
        <div class="player-btn">
          <div class="pre">
            <el-icon><CaretLeft /></el-icon>
          </div>
          <div class="play">
            <el-icon @click="playVideo" v-if="isPause"><VideoPlay /></el-icon>
            <el-icon  @click="pauseVideo" v-else><VideoPause /></el-icon>
          </div>
          <div class="next">
            <el-icon><CaretRight /></el-icon>
          </div>
          <el-slider
            v-model="sliderVal"
            :min="sliderMin"
            :max="sliderMax"
            :format-tooltip="formatTooltip"
            @change="spliderSelect"
          />
          <div class="time"><i></i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { nextTick, ref, onMounted } from "vue";
export default {
  setup() {
    let value4 = ref("");
    let maxTime = ref(3600);
    let isPause = ref(true);
    const audioRef = ref(null);
    let currentTime = ref(0);
    let total = ref(0);
    let musicTitle = ref("");
    let musicImg = ref("");
    let sliderVal = ref(0);
    let sliderMin = ref(0);
    let sliderMax = ref(0);
    const getDuration = () => {
      console.log(audioRef.value.duration);
      updateTime();
    };
    const durationchange = () => {
      console.log(audioRef.value.duration);
      updateTime();
    };
    const formatTime = (time) => {
      // 格式化毫秒，返回String型分秒对象
      // 有可能没获取到，为NaN
      if (!time) return { min: "00", sec: "00" };
      return {
        min: Math.floor(time / 60)
          .toString()
          .padStart(2, "0"),
        sec: Math.floor(time % 60)
          .toString()
          .padStart(2, "0"),
      };
    };
    const updateTime = () => {
      // 更新时间
      const totalVal = formatTime(audioRef.value.duration);
      const currentVal = formatTime(audioRef.value.currentTime);
      total = `${totalVal.min}:${totalVal.sec}`;
      sliderVal.value = Math.floor(audioRef.value.currentTime);
      sliderMax.value = audioRef.value.duration;
      currentTime.value = `${currentVal.min}:${currentVal.sec}`;
      musicTitle.value = "想见你";
      musicImg.value = "/fm.png";
    };

    const formatTooltip = (val) => {
      // 格式化毫秒数，由于组件提示为纯数字，所以这里需要将数字转化为我们所需要的的格式，string类型的。'03:45',
      const time = formatTime(val);
      return `${time.min}:${time.sec}`;
    };
    const spliderSelect = () => {
      // 滑块松动后触发。更新当前时长，
      // 时长发生变动会init里的方法进行更新数据
      audioRef.value.currentTime = sliderVal.value;
    };
    const playVideo=()=>{      
      audioRef.value.play()
      isPause.value=!isPause.value
    }
    const pauseVideo=()=>{
      audioRef.value.pause()
      isPause.value=!isPause.value
    }
    onMounted(() => {});

    return {
      value4,
      maxTime,
      isPause,
      getDuration,
      audioRef,
      formatTime,
      updateTime,
      musicTitle,
      musicImg,
      total,
      currentTime,
      formatTooltip,
      spliderSelect,
      sliderVal,
      durationchange,
      sliderMin,
      sliderMax,
      playVideo,
      pauseVideo
    };
  },
};
</script>

<style lang="scss" scoped>
.player-box {
  display: flex;
  font-size: 14px;
  color: #ffffff;
  .player-cover {
    width: 50px;
    height: 50px;
    border-radius: 50%;    
  }
  .cover-rotate{
    animation:rotateCover 5s linear  infinite
  }
  .player-ft {
    margin-left: 15px;
    display: flex;
    flex-direction: column;

    .player-btn {
      display: flex;
    }
  }
}
::v-deep .player-btn {
  .el-slider {
    width: 90px;
    .el-slider__runway {
      height: 3px;
      .el-slider__bar {
        height: 3px;
      }
      .el-slider__button-wrapper {
        top: -16px;
        .el-slider__button {
          width: 12px;
          height: 12px;
        }
      }
    }
  }
}

.el-icon {
  width: 2em;
  height: 2em;
  svg {
    width: 2em;
    height: 2em;
  }
}
@keyframes rotateCover
{
	from {transform: rotate(0deg)}
	to {transform: rotate(360deg)}
}
</style>
