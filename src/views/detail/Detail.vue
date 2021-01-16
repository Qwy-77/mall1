<template>
  <div class="detail">
    <DetailBar class="detail-bar"></DetailBar>
    <Scroll class="content" ref="scroll">
      <DetailSwiper :topImages="topImages"></DetailSwiper>
      <DetailBaseInfo :goods="goods"></DetailBaseInfo>
      <DetailShopInfo :shop="shop"></DetailShopInfo>
      <DetailGoodsInfo
        :detailInfo="detailInfo"
        @imageLoad="imageLoad"
      ></DetailGoodsInfo>
      <DetailParamInfo :itemParams="itemParams"></DetailParamInfo>
      <DetailCommentInfo :commentInfo="commentInfo"></DetailCommentInfo>
      <DetailRecommendInfo :recommendList="recommendList"></DetailRecommendInfo>
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

import {
  getDetail,
  getRecommend,
  Goods,
  Shop,
  GoodsParam,
} from "network/detail";

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
    };
  },
  created() {
    // 注意 这里的 params.id 后面的 id 要跟 detail 配置的路由后面的 参数一样
    this.iid = this.$route.params.iid;

    // 根据 iid 发送网络请求
    getDetail(this.iid).then((res) => {
      console.log(res);
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

    getRecommend().then((res, error) => {
      if (error) return;
      console.log(res);
      this.recommendList = res.data.data.list;
    });
  },

  methods: {
    imageLoad() {
      // 监听图片的加载 进行可滚动距离的刷新
      this.$refs.scroll.refresh();
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
  z-index: 9;
  background-color: #fff;
}
.content {
  height: calc(100% - 44px);
}
</style>