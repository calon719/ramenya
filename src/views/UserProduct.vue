<template>
  <div class="userProduct">
    <CartDropdown ref="cartDropdown" />
    <main class="py-5">
      <nav class="mt-md-5">
        <div class="container">
          <ol class="breadcrumb text-dark">
            <li class="breadcrumb-item">
              <RouterLink to="/" class="breadcrumb-link">首頁</RouterLink>
            </li>
            <li class="breadcrumb-item">
              <RouterLink :to="{ path: '/products', query: { category: '全部' } }"
                class="breadcrumb-link">美味菜單</RouterLink>
            </li>
            <li class="breadcrumb-item">
              <RouterLink class="breadcrumb-link"
                :to="{ path: '/products', query: { category: product?.category } }">
                {{ product?.category }}
              </RouterLink>
            </li>
            <li class="breadcrumb-item">{{ product?.title }}</li>
          </ol>
        </div>
      </nav>

      <section class="pb-5 container">
        <div class="row row-cols-1 row-cols-md-2 gy-4 gy-md-0 gx-md-4 gx-lg-5">
          <div class="col">
            <div class="ratio ratio-4x3">
              <img class="img-cover" :src="product?.imageUrl" :alt="product?.title">
            </div>
          </div>
          <div class="col">
            <h2 class="border-bottom border-3 pb-2 mb-3">{{ product?.title }}</h2>
            <p class="text-muted lh-lg">{{ product?.description }}</p>
            <hr>
            <p class="text-muted">產品原料：{{ product?.content }}</p>
            <p class="text-danger"
              :class="{'d-none': !product?.is_alcohol}">※ 未滿十八歲者，禁止飲酒</p>
            <div class="d-flex justify-content-end align-items-center">
              <span class="text-muted me-2"
                v-show="product?.origin_price">
                <del>NTD {{ product?.origin_price }}</del>
              </span>
              <h3 class="text-end">
                <span v-show="product?.origin_price">特價</span>
                NTD {{ product?.price }}
              </h3>
            </div>
            <small class="text-danger mb-1" v-if="qty < 1">
              <i class="bi bi-exclamation-circle me-1"></i>數量不可以小於 1
            </small>
            <div class="row gy-3 mb-3">
              <div class="col-12 col-sm-7">
                <div class="input-group">
                  <button class="btn btn-dark" type="button" :disabled="qty <= 1"
                    @click="qty -= 1">
                    <i class="bi bi-dash"></i>
                  </button>
                  <input class="form-control text-end" type="number" min="1"
                    v-model.number="qty" />
                  <button class="btn btn-dark" type="button"
                    @click="qty += 1">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>
              <div class="col-12 col-sm-5">
                <button class="w-100 btn btn-primary" type="button"
                  @click="addCart(product.id)"
                  :disabled="checkBtnLoading(`product-addCart-${product?.id}`) || qty < 1">
                  <div class="spinner-border spinner-border-sm text-light"
                    v-show="checkBtnLoading(`product-addCart-${product?.id}`)"></div>
                  <span v-show="!checkBtnLoading(`product-addCart-${product?.id}`)">
                    <i class="bi bi-cart-fill"></i>
                    加入購物車
                  </span>
                </button>
              </div>
            </div>
            <div class="row justify-content-end g-4"
              :class="{'invisible': !isAddedCart}">
              <div class="col-5 me-auto me-md-0">
                <RouterLink class="w-100 btn btn-outline-dark"
                  :to="{ path: '/products', query: { category: product?.category } }">
                  <i class="bi bi-arrow-left"></i>
                  繼續購物
                </RouterLink>
              </div>
              <div class="col-5">
                <RouterLink class="w-100 btn btn-danger" to="/cart">
                  結帳去
                  <i class="bi bi-arrow-right"></i>
                </RouterLink>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="bg-secondary bg-opacity-10 py-5">
        <div class="container">
          <div class="row row-cols-1 row-cols-md-2 g-4">
            <div class="col">
              <h4 class="fs-5 px-2 pb-1 mb-2 border-bottom border-1 border-secondary">外送須知</h4>
              <ul class="mb-0 mx-2">
                <li class="mb-1">
                  請在營業時間內訂購餐點，營業時間以外下訂的訂單本店<strong>一概不受理</strong>。
                  <br>
                  本店營業時間為<strong>每週一到週六</strong>，
                  <strong>11:00 ~ 14:00</strong> 與 <strong>17:00 ~ 20:30</strong>。
                </li>
                <li class="mb-1">因食物新鮮度考量，外送範圍僅限<strong>三民區</strong>內。</li>
                <li>外送金額需滿 <strong>300</strong>（含）元。</li>
              </ul>
            </div>
            <div class="col">
              <h4 class="fs-5 px-2 pb-1 mb-2 border-bottom border-1 border-secondary">付款方式</h4>
              <ul class="mb-0 mx-2">
                <li class="mb-1">貨到付款</li>
                <li>信用卡</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section class="container my-3 py-5">
        <h3 class="mb-3 mb-md-4">您可能也感興趣⋯⋯</h3>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-5">
          <div class="col" v-for="product in recommendProducts" :key="product.id">
            <div class="card card-custom position-relative h-100">
              <RouterLink :to="`/product/${product.id}`" class="card-coverLink" />
              <div v-show="product.tag" class="card-tag"
                :class="product.tag === 1 ? 'bg-danger' : 'bg-success'">
                {{ product.tag === 1 ? '人氣精選' : '新品上市' }}
              </div>
              <div class="ratio ratio-4x3 overflow-hidden">
                <div class="card-cover">
                  <p class="card-cover-text">查看詳細內容</p>
                </div>
                <img class="custom-card-img img-cover"
                  :src="product.imageUrl" :alt="product.title">
              </div>
              <div class="card-body">
                <h3 class="card-title fs-4">{{ product.title }}</h3>
                <div class="row">
                  <div class="col-9">
                    <p v-if="!product.origin_price" class="fs-5">
                      NTD {{ product.price }}
                    </p>
                    <div class="d-flex align-items-center flex-wrap" v-else>
                      <small class="me-2">
                        <del class="text-muted">NTD {{ product.origin_price }}</del>
                      </small>
                      <p class="fs-5 mb-0">
                        NTD {{ product.price }}
                      </p>
                    </div>
                  </div>
                </div>
                <button type="button" class="card-cartBtn btn btn-lg btn-primary rounded"
                  :disabled="checkBtnLoading(`product-addCart-${product.id}`)"
                  @click="addCart(product.id)">
                  <div class="spinner-border spinner-border-sm" role="status"
                    v-if="checkBtnLoading(`product-addCart-${product.id}`)"></div>
                  <span v-else>
                    <i class="bi bi-cart-fill"></i>
                  </span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  data() {
    return {
      product: {},
      recommendProducts: [],
      qty: 1,
      productId: '',
      isAddedCart: false,
    };
  },
  inject: ['checkBtnLoading'],
  computed: mapState({
    products: 'productsList',
    cart: (state) => state.cartList.carts,
    isBtnLoading: 'isBtnLoading',
  }),
  watch: {
    products() {
      this.getProduct();
    },
    $route() {
      const { name } = this.$route;
      if (name === 'UserProduct') {
        this.productId = this.$route.params.id;
        this.checkCart();
        this.getProduct();
      }
    },
    cart: {
      handler() {
        this.checkCart();
      },
      deep: true,
    },
  },
  methods: {
    getProduct() {
      this.product = this.products.find((product) => product.id === this.productId);
      this.getRecommendProducts();
    },
    getRecommendProducts() {
      const productsList = [...this.products];
      const index = productsList.findIndex((product) => product.id === this.productId);
      productsList.splice(index, 1);

      const len = productsList.length;
      const times = len >= 4 ? 4 : len;
      const randomNumArr = [];

      for (let i = 0; i < times; i += 1) {
        const ranNum = Math.floor(Math.random() * len);
        // 檢查數字有沒有重複
        const check = i === 0 || !randomNumArr.some((num) => num === ranNum);
        if (check) {
          randomNumArr.push(ranNum);
        } else {
          i -= 1;
        }
      }
      this.recommendProducts = productsList
        .filter((product, i) => randomNumArr.find((num) => num === i) >= 0);
    },
    checkCart() {
      const check = this.cart.some((product) => product.product_id === this.productId);
      if (check) {
        this.isAddedCart = true;
        this.qty = 1;
      } else {
        this.isAddedCart = false;
      }
    },
    addCart(id) {
      const cartProduct = this.cart.find((product) => product.product_id === id);
      const data = {
        data: {
          product_id: id,
          qty: 1,
        },
        prefix: 'product-addCart',
      };
      this.$store.commit('addBtnLoadingItem', `product-addCart-${id}`);
      if (cartProduct && this.productId === id) {
        data.data.qty = cartProduct.qty + this.qty;
        data.id = cartProduct.id;
        this.$store.dispatch('putCart', data);
      } else if (this.productId === id) {
        data.data.qty = this.qty;
        this.$store.dispatch('addCart', data);
      } else {
        this.$store.dispatch('addCart', data);
      }
    },
  },
  created() {
    this.productId = this.$route.params.id;
    this.getProduct();
  },
};
</script>
