export default {
  addCart(context, payload) {
    return new Promise(resolve => {
      // state.cartList.push(payload);
      // 判断 添加的的商品 在cartList里面有没有
      let oldProduct = context.state.cartList.find(
        item => item.iid === payload.iid
      );

      // 有就在原来基础上数量加1 没有就添加商品
      if (oldProduct) {
        context.commit("addCounter", oldProduct);
        resolve("当前商品数量+1"); // 商品添加成功后 用 promise 回调 resolve 通知外面
      } else {
        context.commit("addToCart", payload);
        resolve("添加购物车成功!");
      }
    });
  }
};
