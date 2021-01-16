<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BetterScroll from "better-scroll";
export default {
  name: "Scroll",
  data() {
    return {
      scroll: null,
    };
  },
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
  mounted() {
    this.scroll = new BetterScroll(this.$refs.wrapper, {
      observeDOM: true,
      click: true,
      probeType: this.probeType, // 默认scrollType 为0  需要监听滚动事件的时候 给scrollType 传入一个不为 0 1 的参数就行
      pullUpLoad: this.pullUpLoad,
    });
    // 把实时监听滚动事件和实时位置 发出去 会依赖 probeType 的值
    this.scroll.on("scroll", (position) => {
      this.$emit("scroll", position);
    });

    // 把上拉加载更多事件 传递出去
    this.scroll.on("pullingUp", () => {
      this.$emit("pullingUp");
    });
    // console.log(this.scroll);
  },
  methods: {
    //滚动到某个位置的 方法
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time);
    },
    // 上拉加载更多
    finishPullUps() {
      this.scroll.finishPullUp();
    },
    // 刷新页面可以滚动的距离
    refresh() {
      this.scroll && this.scroll.refresh();
    },
    // 获取当前手指在界面的 y 轴
    getScrollY() {
      return this.scroll ? this.scroll.y : null;
    },
  },
};
</script>

<style scoped>
</style>