export default {
  addCart(state, payload) {
    // state.cartList.push(payload);
    // 判断 添加的的商品 在cartList里面有没有
    let oldProduct = state.cartList.find(item => item.iid === payload.iid);

    // 有就在原来基础上数量加1 没有就添加商品
    if (oldProduct) {
      oldProduct.count += 1;
    } else {
      payload.count = 1;
      state.cartList.push(payload);
    }
  }
};
