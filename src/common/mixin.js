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
