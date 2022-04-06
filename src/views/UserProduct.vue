<template>
  <div class="userProduct">
    <CartDropdown ref="cartDropdown"></CartDropdown>
    <main class="py-5">
      <nav class="mt-md-5">
        <div class="container">
          <ol class="breadcrumb text-dark">
            <li class="breadcrumb-item">
              <routerLink to="/" class="breadcrumb-link">首頁</routerLink>
            </li>
            <li class="breadcrumb-item">
              <routerLink :to="{ path: '/products', query: { category: '拉麵' } }"
                class="breadcrumb-link">美味菜單</routerLink>
            </li>
            <li class="breadcrumb-item">
              <routerLink class="breadcrumb-link"
                :to="{ path: '/products', query: { category: product.category } }">
                {{ product.category }}
              </routerLink>
            </li>
            <li class="breadcrumb-item">{{ product.title }}</li>
          </ol>
        </div>
      </nav>

      <section class="pb-5 container">
        <div class="row row-cols-1 row-cols-md-2 gy-4 gy-md-0 gx-md-4 gx-lg-5">
          <div class="col">
            <div class="ratio ratio-4x3">
              <img class="img-cover" :src="product.imageUrl" :alt="product.title">
            </div>
          </div>
          <div class="col">
            <h2 class="border-bottom border-3 pb-2 mb-3">{{ product.title }}</h2>
            <p class="text-muted lh-lg">{{ product.description }}</p>
            <hr>
            <p class="text-muted">產品原料：{{ product.content }}</p>
            <p class="text-danger"
              :class="{'d-none': !isAlcohol}">※ 未滿十八歲者，禁止飲酒</p>
            <div class="d-flex justify-content-end align-items-center">
              <h3 class="text-end">
                <span v-show="product.origin_price">特價</span>
                NTD {{ product.price }}
              </h3>
              <small class="text-muted"
                v-show="product.origin_price">
                <del>NTD {{ product.origin_price }}</del>
              </small>
            </div>
            <small class="text-danger mb-1" v-if="num < 1">
              <i class="bi bi-exclamation-circle me-1"></i>數量不可以小於 1
            </small>
            <div class="row gy-3 mb-3">
              <div class="col-12 col-sm-7">
                <div class="input-group">
                  <button class="btn btn-dark" type="button" :disabled="num <= 1"
                    @click="num -= 1">
                    <i class="bi bi-dash"></i>
                  </button>
                  <input class="form-control text-end" type="number" min="1"
                    v-model.number="num" />
                  <button class="btn btn-dark" type="button"
                    @click="num += 1">
                    <i class="bi bi-plus"></i>
                  </button>
                </div>
              </div>
              <div class="col-12 col-sm-5">
                <button class="w-100 btn btn-primary" type="button"
                  @click="addCart(product.id)"
                  :disabled="(itemId === product.id && isBtnLoading) || num < 1">
                  <div class="spinner-border spinner-border-sm text-light"
                    v-show="isBtnLoading && itemId === product.id"></div>
                  <span v-show="!isBtnLoading">
                    <i class="bi bi-cart-fill"></i>
                    加入購物車
                  </span>
                </button>
              </div>
            </div>
            <div class="row justify-content-end g-4"
              :class="{'invisible': !isAddedCart}">
              <div class="col-5 me-auto me-md-0">
                <routerLink class="w-100 btn btn-outline-dark"
                  :to="{ path: '/products', query: { category: product.category } }">
                  <i class="bi bi-arrow-left"></i>
                  繼續購物
                </routerLink>
              </div>
              <div class="col-5">
                <routerLink class="w-100 btn btn-danger" to="/cart">
                  結帳去
                  <i class="bi bi-arrow-right"></i>
                </routerLink>
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
          <div class="col" v-for="product in filteredProducts" :key="product.id">
            <div class="card card-custom position-relative">
              <a class="card-coverLink" href="#" @click.prevent="getProduct(product.id)"></a>
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
                <div class="d-flex">
                  <p v-show="!product.origin_price" class="fs-5">
                    NTD {{ product.price }}
                  </p>
                  <p v-show="product.origin_price" class="fs-5">
                    <small>
                      <del class="text-muted">NTD {{ product.origin_price }}</del>
                    </small>
                    NTD {{ product.price }}
                  </p>
                  <button type="button" class="card-cartBtn btn btn-lg btn-primary rounded"
                    :disabled="isBtnLoading && itemId === product.id"
                    @click="addCart(product.id)">
                    <div class="spinner-border spinner-border-sm" role="status"
                      v-if="isBtnLoading && itemId === product.id"></div>
                    <span v-else>
                      <i class="bi bi-cart-fill"></i>
                    </span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  </div>
</template>

<script>
import sweetAlert from 'sweetalert2';
import pushToastMessage from '@/utils/pushToastMessage';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      product: {},
      products: [],
      filteredProducts: [],
      cart: [],
      num: 1,
      isBtnLoading: false,
      itemId: '',
      isAddedCart: false,
      isAlcohol: false,
    };
  },
  methods: {
    getProduct(id = this.$route.params.id) {
      this.$emit('loadingStatus', true);
      this.$http.get(`${this.apiBase}/product/${id}`)
        .then((res) => {
          const { product } = res.data;
          this.product = product;

          if (JSON.stringify(this.product) !== '{}') {
            this.num = 1;
            this.isAddedCart = false;
            this.$router.push(`/product/${id}`);
          }

          this.getProducts();
          this.isAlcohol = product.is_alcohol;
        }).catch((err) => {
          const msg = err.response.data.message;
          sweetAlert.fire({
            icon: 'error',
            text: msg,
          });
          this.$emit('loadingStatus', false);
        });
    },
    getProducts() {
      this.$http.get(`${this.apiBase}/products/all`)
        .then((res) => {
          this.$emit('loadingStatus', false);
          this.products = res.data.products;
          this.filterProducts();
        }).catch((err) => {
          this.$emit('loadingStatus', false);
          const msg = err.response.data.message;
          sweetAlert.fire({
            icon: 'error',
            text: msg,
          });
        });
    },
    getCart() {
      this.$http.get(`${this.apiBase}/cart`)
        .then((res) => {
          this.cart = res.data.data.carts;
        }).catch((err) => {
          const msg = err.response.data.message;
          sweetAlert.fire({
            icon: 'error',
            text: msg,
          });
        });
    },
    filterProducts() {
      this.filteredProducts = JSON.parse(JSON.stringify(this.products));
      const { id } = this.$route.params;
      const index = this.filteredProducts.findIndex((product) => product.id === id);
      this.filteredProducts.splice(index, 1);

      const len = this.filteredProducts.length;
      const ranNumAry = [];

      const times = len >= 4 ? 4 : len;
      for (let i = 0; i < times; i += 1) {
        const ranNum = Math.floor(Math.random() * len);
        // 檢查數字有沒有重複
        const check = i === 0 || !ranNumAry.some((num) => num === ranNum);
        if (check) {
          ranNumAry.push(ranNum);
        } else {
          i -= 1;
        }
      }

      const result = [];
      ranNumAry.forEach((i) => {
        this.filteredProducts.forEach((item, j) => {
          if (i === j) {
            result.push(item);
          }
        });
      });
      this.filteredProducts = result;
    },
    addCart(productId) {
      const { id } = this.$route.params;
      this.itemId = productId;
      let api = `${this.apiBase}/cart`;
      let method = 'post';

      if (productId === id && this.num >= 1) {
        let qty = this.num;
        const product = this.cart.filter((item) => item.product_id === id);

        if (product.length) {
          method = 'put';
          api = `${api}/${product[0].id}`;
          qty = product[0].qty + this.num;
        }

        const data = {
          product_id: id,
          qty,
        };

        this.isBtnLoading = true;
        this.$http[method](api, { data })
          .then((res) => {
            this.getCart();
            this.isAddedCart = true;
            pushToastMessage('user', res.data.success, '加入購物車');
            this.num = 1;
            this.$refs.cartDropdown.getCart();
            this.isBtnLoading = false;
          }).catch((err) => {
            pushToastMessage('user', err.response.data.success, '加入購物車');
            this.isBtnLoading = false;
          });
      } else if (productId !== id) {
        const data = {
          product_id: productId,
          qty: 1,
        };

        this.isBtnLoading = true;
        this.$http[method](api, { data })
          .then((res) => {
            this.getCart();
            this.isAddedCart = true;
            pushToastMessage('user', res.data.success, '加入購物車');
            this.num = 1;
            this.$refs.cartDropdown.getCart();
            this.isBtnLoading = false;
          }).catch((err) => {
            pushToastMessage('user', err.response.data.success, '加入購物車');
            this.isBtnLoading = false;
          });
      }
    },
  },
  created() {
    this.getProduct();
    this.getProducts();
    this.getCart();
  },
};
</script>
