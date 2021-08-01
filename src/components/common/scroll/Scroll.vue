<!--  -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
BScroll.use(ObserveDOM);

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      scroll: null,
    };
  },
  mounted() {
    // 1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      probeType: this.probeType,
      click: true,
      observeDOM: true, // 开启 observe-dom 插件
    });

    // 2. 监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });
  },
  methods: {
    scrollTo(x, y, time = 1000) {
      this.scroll.scrollTo(x, y, time);
    },
  },
};
</script>

<style  scoped>
</style>
