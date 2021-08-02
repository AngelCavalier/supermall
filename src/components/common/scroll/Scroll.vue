<!--  -->
<template>
  <div class="wrapper" ref="wrapper">
    <div class="content"><slot></slot></div>
  </div>
</template>

<script>
import BScroll from "@better-scroll/core";
import ObserveDOM from "@better-scroll/observe-dom";
import Pullup from "@better-scroll/pull-up";
BScroll.use(ObserveDOM);
BScroll.use(Pullup);

export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default: 0,
    },
    pullUpLoad: {
      type: Boolean,
      default: false,
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
      pullUpLoad: this.pullUpLoad,
      click: true,
      observeDOM: true, // 开启 observe-dom 插件
    });

    // 2. 监听滚动的位置
    this.scroll.on("scroll", (position) => {
      // console.log(position);
      this.$emit("scroll", position);
    });

    // 3.监听上拉事件
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
  },
  methods: {
    scrollTo(x, y, time = 1000) {
      this.scroll.scrollTo(x, y, time);
    },
    /**
     * 当下拉加载时，结束下拉动作并刷新动作
     */
    againPullUp() {
      /**
       * 每次触发 pullingUp 钩子后，应该主动调用 finishPullUp()
       * 告诉 BetterScroll 准备好下一次的 pullingUp 钩子。
       */
      this.scroll.finishPullUp();
      /**
       * 重新计算 BetterScroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常。
       * 避免因为图片加载速度慢，导致DOM高度未更新导致content<wraper所产生的不能下拉加载的BUG
       */
      this.scroll.refresh();
    },
    getScrollY() {
      return this.scroll ? this.scroll.y : 0;
    },
  },
};
</script>

<style  scoped>
</style>
