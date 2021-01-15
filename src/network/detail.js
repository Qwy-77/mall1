import { request } from "./request";

export function getDetail(iid) {
  return request({
    url: "/detail",
    params: {
      iid
    }
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
