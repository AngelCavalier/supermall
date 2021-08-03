<!--  -->
<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" />
    <scroll class="content" :probe-type="3" :pull-up-load="true" ref="scroll">
      <detail-swiper :top-images="topImages" />
      <detail-base-info :goods="goods" />
      <detail-shop-info :shop="shop" />
      <detail-goods-info :detail-info="detailInfo" @imageLoad="imageLoad" />
      <detail-param-info :param-info="paramInfo" />
    </scroll>
  </div>
</template>

<script>
import DetailNavBar from "./childCopms/DetailNavBar.vue";
import DetailSwiper from "./childCopms/DetailSwiper.vue";
import DetailBaseInfo from "./childCopms/DetailBaseInfo.vue";
import DetailShopInfo from "./childCopms/DetailShopInfo.vue";
import DetailGoodsInfo from "./childCopms/DetailGoodsInfo.vue";
import DetailParamInfo from "./childCopms/DetailParamInfo.vue";

import Scroll from "components/common/scroll/Scroll.vue";

import { getDetail, Goods, Shop, GoodsParam } from "network/detail";

export default {
  name: "Detail",
  components: {
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    Scroll,
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
    };
  },
  created() {
    // 1.保存传入的iid
    this.iid = this.$route.params.iid;
    // 2.根据iid请求数据
    getDetail(this.iid).then((res) => {
      console.log(res);
      // 1.获取顶部的图片轮播数据
      this.topImages = res.result.itemInfo.topImages;
      const data = res.result;
      // 2.获取商品信息
      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );
      // 3.获取店铺信息
      this.shop = new Shop(data.shopInfo);
      // 4.保存商品的详情数据
      this.detailInfo = data.detailInfo;
      // 5.获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh();
    },
  },
};
</script>

<style  scoped>
#detail {
  position: relative;
  z-index: 1;
  background-color: #fff;
  height: 100vh;
}
.detail-nav {
  position: relative;
  z-index: 1;
  background-color: #fff;
}
.content {
  /* -号两边必须有空格，否则不生效 */
  /* height: calc(100% - 44px); */

  position: absolute;
  left: 0;
  right: 0;
  top: 44px;
  bottom: 0px;
  overflow: hidden;
}
</style>
