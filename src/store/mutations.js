import { ADD_COUNTER, ADD_TO_CART } from "./mutations-types";

export default {
  // mutations唯一的目的就是修改state中状态
  // mutations中的每个方法应尽可能完成单一的事件
  [ADD_COUNTER](state, payload) {
    payload.count++
  },
  [ADD_TO_CART](state, payload) {
    state.cartList.push(payload)
  }
}