<template>
  <div class="detail">
    <DetailBar class="detail-bar" @itemClick="itemClick"></DetailBar>
    <Scroll class="content" ref="scroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamInfo :itemParams="itemParams" ref="params"></DetailParamInfo>
      <DetailCommentInfo
        :commentInfo="commentInfo"
        ref="comment"
      ></DetailCommentInfo>
      <DetailRecommendInfo
        :recommendList="recommendList"
        ref="recommend"
      ></DetailRecommendInfo>
    </Scroll>
  </div>
</template>

<script>
import DetailBar from "./childrenComp/DetailBar";
import DetailSwiper from "./childrenComp/DetailSwiper";
import DetailBaseInfo from "./childrenComp/DetailBaseInfo";
import DetailShopInfo from "./childrenComp/DetailShopInfo";
import DetailGoodsInfo from "./childrenComp/DetailGoodsInfo";
import DetailParamInfo from "./childrenComp/DetailParamInfo";
import DetailCommentInfo from "./childrenComp/DetailCommentInfo";
import DetailRecommendInfo from "./childrenComp/DetailRecommendInfo";

import Scroll from "components/common/scroll/Scroll";
import { itemListenerMixin } from "../../common/mixin";

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";
import { debounce } from "../../common/utils";

export default {
  name: "Detail",
  components: {
    DetailBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,

    Scroll,
  },
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      itemParams: {},
      commentInfo: {},
      recommendList: [],
      themeTopY: [],
      getThemeTopY: null,
    };
  },
  created() {
    // 注意 这里的 params.id 后面的 id 要跟 detail 配置的路由后面的 参数一样
    this.iid = this.$route.params.iid;

    // 根据 iid 发送网络请求
    getDetail(this.iid).then((res) => {
      // console.log(res);
      const data = res.data.result;
      // 拿出 轮播图的 数据 tomImages
      this.topImages = data.itemInfo.topImages;

      // 获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      // 创建店铺信息
      this.shop = new Shop(data.shopInfo);

      // 商品的详情数据  detailInfo
      this.detailInfo = data.detailInfo;

      // 商品的 尺寸数据 和穿着效果 itemParams
      this.itemParams = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );

      // 用户评论信息 commentInfo
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });

    // 请求 推荐数据
    getRecommend().then((res, error) => {
      if (error) return;
      console.log(res);
      this.recommendList = res.data.data.list;
    });

    // 给 getThemeTopY 进行赋值(对给 this.themeTopY 的赋值的操作进行 防抖) 返回一个函数
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      console.log(this.themeTopY);
    });
  },

  methods: {
    imageLoad() {
      // 监听图片的加载 进行可滚动距离的刷新
      this.$refs.scroll.refresh();

      // 使用 this.getThemeTopY 函数 获取每个组件的 offsetTop
      this.getThemeTopY();
    },

    // 点击导航切换到对应的参数界面
    itemClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopY[index], 200);
    },
  },
};
</script>

<style  scoped>
.detail { 
  /* height: 10000px; */
  position: relative;
  z-index: 199;
  height: 100vh;
  background-color: #fff;
}
.detail-bar {
  position: relative;
  z-index: 1000;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
  background-color: #fff;
}
</style>