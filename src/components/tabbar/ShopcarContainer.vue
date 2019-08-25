<template>
  <div class="shopcar-container">
    <div class="goods-list">
      <!-- 商品列表区域 -->
      <div class="mui-card" v-for="item in goodslist" :key="item.id">
        <div class="mui-card-content">
          <div class="mui-card-content-inner">
            <mt-switch v-model="$store.getters.getGoodsSelected[item.id]" @change="selectedChanged(item.id,$store.getters.getGoodsSelected[item.id])"></mt-switch>
            <img :src="item.thumb_path" />
            <div class="info">
              <h1>{{item.title}}</h1>
              <p>
                <span class="price">￥{{item.sell_price}}</span>
                <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id"></numbox>
                <!-- 如何从购物车中获取商品的数量
                1.先创建一个空对象，然后循环购物车中商品的数据，把当前循环的这个商品的ID，
                作为对象的属性名，count值作为对象的属性值。这样把所有商品循环一遍，就会得到一个对象
                {88:2,89:3,90:4}-->
                <a href="#" @click.prevent="remove(item.id,i)">删除</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 商品结算区域 -->
    <div class="mui-card">
      <div class="mui-card-content">
        <div class="mui-card-content-inner jiesuan">
          <div class="left">
            <p>总计(不含运费)</p>
            <p>已勾选商品<span class="red">0</span>件，总价<span class="red">￥0</span></p>
          </div>
          <mt-button type="danger">去结算</mt-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import numbox from "../subcomponents/shopcar_numbox.vue";
export default {
  data() {
    return {
      goodslist: [] //购物车中所有商品数据
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getGoodsList() {
      // 1.获取到store上所有商品的ID，然后用逗号拼接成一个字符串
      var idArr = [];
      this.$store.state.car.forEach(element => idArr.push(element.id));
      // 如果购物车没有商品直接返回，不在请求接口，否则会报错
      if (idArr.length <= 0) {
        return;
      }
      // 获取购物车商品列表
      this.$http
        .get("api/goods/getshopcarlist/" + idArr.join(","))
        .then(result => {
          if (result.body.status === 0) {
            this.goodslist = result.body.message;
          }
        });
    },
    remove(id, index) {
      // 点击删除，把商品从store中根据ID删除。根据index把当前组件中goodslist中对应的删除
      this.goodslist.splice(index, 1);
      this.$store.commit("removeFormCar", id);
    },
    selectedChanged(id,val){
      // 没当点击开关把最新的开关同步到store中
      this.$store.commit("updateGoodsSelected",{id,selected:val})

    }
  },
  components: {
    numbox
  }
};
</script>
<style lang="less" scoped>
.shopcar-container {
  background-color: #eee;
  overflow: hidden;
  .goods-list {
    .mui-card-content-inner {
      display: flex;
      align-items: center;
    }
    img {
      width: 60px;
      height: 60px;
    }
    h1 {
      font-size: 13px;
    }
    .info {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      .price {
        color: red;
        font-weight: bold;
      }
    }
  }
  .jiesuan {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .red{
      color: red;
      font-weight: bold;
      font-size: 16px;
    }
  }
}
</style>