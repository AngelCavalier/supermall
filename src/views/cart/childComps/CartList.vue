<template>
  <scroll
    :probe-type="3"
    :pull-up-load="true"
    class="cart-list"
    :data="[cartList]"
  >
    <cart-list-item
      v-for="item in cartList"
      :key="item.iid"
      :item-info="item"
    />
  </scroll>
</template>

<script>
import Scroll from 'components/common/scroll/Scroll';
import CartListItem from './CartListItem';

export default {
  name: 'CartList',
  components: {
    Scroll,
    CartListItem
  },
  props: {
    cartList: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.cart-list {
  overflow: hidden;
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 93px;
}
</style>
