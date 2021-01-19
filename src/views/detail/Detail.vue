<template>
  <div class="detail">
    <DetailBar
      class="detail-bar"
      @itemClick="itemClick"
      ref="navBar"
    ></DetailBar>
    <Scroll class="content" ref="scroll" @scroll="contentScroll" :probeType="3">
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
    <DetailBottomBar @addToCart="addToCart"></DetailBottomBar>
    <BackTop @click.native="backClick" v-show="isShowBackTop"></BackTop>
    <Toast :message="message" :isShow="isShow"></Toast>
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
import DetailBottomBar from "./childrenComp/DetailBottomBar";

import Scroll from "components/common/scroll/Scroll";
import BackTop from "components/content/backTop/BackTop";
import Toast from "components/common/toast/Toast";

import { itemListenerMixin, backTopMixin } from "../../common/mixin";

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
    DetailBottomBar,

    Scroll,
    BackTop,
    Toast,
  },
  mixins: [itemListenerMixin, backTopMixin],
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
      currentIndex: 0,
      message: "",
      isShow: false,
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

    // 请求 推荐数据
    getRecommend().then((res, error) => {
      if (error) return;
      // console.log(res);
      this.recommendList = res.data.data.list;
    });

    // 给 getThemeTopY 进行赋值(对给 this.themeTopY 的赋值的操作进行 防抖) 返回一个函数
    this.getThemeTopY = debounce(() => {
      this.themeTopY = [];
      this.themeTopY.push(0);
      this.themeTopY.push(this.$refs.params.$el.offsetTop);
      this.themeTopY.push(this.$refs.comment.$el.offsetTop);
      this.themeTopY.push(this.$refs.recommend.$el.offsetTop);
      this.themeTopY.push(Number.MAX_VALUE);
      // console.log(this.themeTopY);
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

    // 监听内容滚动 到某个位置
    contentScroll(position) {
      const positionY = -position.y;
      // 跟主题的相对位置的值作比较 [0, 6093, 7133, 7464,]
      const length = this.themeTopY.length;
      for (let i = 0; i < length - 1; i++) {
        if (
          this.currentIndex != i &&
          positionY >= this.themeTopY[i] &&
          positionY < this.themeTopY[i + 1]
        ) {
          this.currentIndex = i;
          this.$refs.navBar.currentItem = this.currentIndex;
        }
      }

      //是否回到顶部 这个不能抽离到 mixin 中 可以在 mixin 中顶一个方法 然后这里调用
      this.lintenShowBackTop(position);
    },

    // 添加到购物车
    addToCart() {
      // 1 将要添加到购物车的一些数据 整合
      const product = {};
      product.image = this.topImages[0];
      product.title = this.goods.title;
      product.desc = this.goods.desc;
      product.price = this.goods.nowPrice;
      product.iid = this.iid;

      // 2 将这些数据传递到 store 里面的 state里面管理 通过 mutations
      this.$store.dispatch("addCart", product).then((res) => {
        // 添加承购做出相应的提示
        this.isShow = true;
        this.message = res;
        setTimeout(() => {
          this.isShow = false;
        }, 2000);
      });
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
  height: calc(100% - 44px - 49px);
  background-color: #fff;
}
</style>