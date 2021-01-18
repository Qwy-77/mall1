import { debounce } from "./utils";

export const itemListenerMixin = {
  mounted() {
    // 防抖
    const refresh = debounce(this.$refs.scroll.refresh, 200);
    //图片加载完成事件监听
    // 接收 GoodsListItem 里面发送的 图片加载完毕 事件
    this.$bus.$on("itemIamageLoad", () => {
      this.$refs.scroll && refresh();
    });
  }
};

export const backTopMixin = {
  data() {
    return {
      isShowBackTop: false
    };
  },
  methods: {
    backClick() {
      // 当点击 BackTop 组件时 通过 scroll组件的 ref 属性拿到该组件 并使用该组件里面的 scroll.scrollTo() 方法实现返回顶部
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    lintenShowBackTop(position) {
      this.isShowBackTop = -position.y > 1000;
    }
  }
};
