import { request } from "./request";

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
  });
}

export function getRecommend() {
  return request({
    url: "/recommend"
  });
}

// 把需要用到的 复杂的数据 整合到一起之后再传递出去
export class Goods {
  constructor(itemInfo, columns, services) {
    this.title = itemInfo.title; // 图片标题
    this.desc = itemInfo.desc; // 图片描述
    this.newPrice = itemInfo.price; // 新价格
    this.oldPrice = itemInfo.oldPrice; // 老价格
    this.discount = itemInfo.discountDesc; // 优惠价
    this.columns = columns; // 销量 收藏
    this.services = services; // 退货补运费
    this.nowPrice = itemInfo.highNowPrice; // 现在的价格
    this.discountBgColor = itemInfo.discountBgColor; // 优惠价的动态颜色
  }
}

// 穿着效果的一些数据
export class Shop {
  constructor(shopInfo) {
    this.logo = shopInfo.shopLogo;
    this.name = shopInfo.name;
    this.fans = shopInfo.cFans;
    this.sells = shopInfo.cSells;
    this.score = shopInfo.score;
    this.goodsCount = shopInfo.cGoods;
  }
}

// 评论 尺寸的一些数据
export class GoodsParam {
  constructor(info, rule) {
    this.image = info.images ? info.images[0] : "";
    this.infos = info.set;
    this.sizes = rule.tables;
  }
}
