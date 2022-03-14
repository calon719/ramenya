<template>
  <div class="userProduct">
    <cartDropdown ref="cartDropdown"></cartDropdown>
    <main class="py-5">
      <nav class="rounded mt-5">
        <div class="container">
          <ol class="breadcrumb text-dark">
            <li class="breadcrumb-item">
              <router-link to="/" class="breadcrumb-link">首頁</router-link>
            </li>
            <li class="breadcrumb-item">
              <router-link to="/products" class="breadcrumb-link">美味菜單</router-link>
            </li>
            <li class="breadcrumb-item">{{ product.category }}</li>
            <li class="breadcrumb-item">{{ product.title }}</li>
          </ol>
        </div>
      </nav>

      <section class="pt-3 pb-5 container">
        <div class="row row-cols-1 row-cols-md-2 gy-4 gy-md-0 gx-md-4 gx-lg-5">
          <div class="col">
            <div class="ratio ratio-4x3">
              <img class="img-cover" :src="product.imageUrl" :alt="product.title">
            </div>
          </div>
          <div class="col">
            <div class="h-100 d-flex flex-column justify-content-center">
              <h2 class="border-bottom border-3 pb-2 px-2 mb-3">{{ product.title }}</h2>
              <p class="text-indent-2 text-muted lh-lg px-3">{{ product.description }}</p>
              <hr>
              <div class="px-3">
                <p class="text-muted">產品原料：{{ product.content }}</p>
                <p class="text-danger"
                  :class="{'invisible': !isAlcohol}">※ 未滿十八歲者，禁止飲酒</p>
              </div>
              <div class="d-flex justify-content-end align-items-center">
                <h3 class="text-end px-3">
                  <span v-show="product.origin_price">特價</span>
                  NTD {{ product.price }}
                </h3>
                <small class="text-muted"
                  v-show="product.origin_price">
                  <del>NTD {{ product.origin_price }}</del>
                </small>
              </div>
              <small class="text-danger mb-1" v-html="inputErrMsg"></small>
              <div class="row gy-3 mb-4">
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
                    @click="addCart" :disabled="isBtnLoading || num < 1">
                    <div class="spinner-border spinner-border-sm text-light"
                      v-show="isBtnLoading"></div>
                    <span v-show="!isBtnLoading">
                      <i class="bi bi-cart-fill"></i>
                      加入購物車
                    </span>
                  </button>
                </div>
              </div>
              <div class="row justify-content-end g-3"
                :class="{'invisible': !isAddedCart}">
                <div class="col-5 me-auto me-md-0">
                  <router-link class="w-100 btn btn-outline-dark" to="/products">
                    <i class="bi bi-arrow-left"></i>
                    繼續購物
                  </router-link>
                </div>
                <div class="col-5">
                  <router-link class="w-100 btn btn-danger" to="/cart">
                    結帳去
                    <i class="bi bi-arrow-right"></i>
                  </router-link>
                </div>
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
        <h3 class="mb-4 mb-md-5">您可能也感興趣⋯⋯</h3>
        <div class="row row-cols-1 row-cols-sm-2 row-cols-lg-4 gy-5">
          <div class="col" v-for="product in filteredProducts" :key="product.id">
            <div class="card position-relative">
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
                  :src="product.imageUrl" :alt="`${product.title}`">
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
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>

    <loadingText :isLoading="isLoading"></loadingText>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import pushToastMessage from '@/utils/pushToastMessage';
import cartDropdown from '@/components/CartDropdown.vue';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      product: {},
      products: [],
      filteredProducts: [],
      cart: [],
      num: 1,
      isLoading: false,
      isBtnLoading: false,
      isAddedCart: false,
      isAlcohol: false,
    };
  },
  computed: {
    inputErrMsg() {
      if (this.num < 1) {
        return '<i class="bi bi-exclamation-circle me-1"></i>數量不可以小於 1';
      }
      return '';
    },
  },
  methods: {
    getProduct(id = this.$route.params.id) {
      this.isLoading = true;
      this.$http.get(`${this.apiBase}/product/${id}`)
        .then((res) => {
          const { product } = res.data;
          this.product = product;

          // 判斷上一頁是否也是 product 頁面
          if (JSON.stringify(this.product) !== '{}') {
          // 在取得資料後再轉往所點選的商品頁面
          // 否則先進到畫面時資料還沒更新，畫面也不會更新
            this.num = 1;
            this.isAddedCart = false;
            this.$router.push(`/product/${id}`);
          }

          this.getProducts();
          this.isAlcohol = product.is_alcohol;
        }).catch((err) => {
          const msg = err.response.data.message;
          Swal.fire({
            icon: 'error',
            text: msg,
          });
          this.isLoading = false;
        });
    },
    getProducts() {
      this.$http.get(`${this.apiBase}/products/all`)
        .then((res) => {
          this.isLoading = false;
          this.products = res.data.products;
          this.filterProducts();
        }).catch((err) => {
          this.isLoading = false;
          const msg = err.response.data.message;
          Swal.fire({
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
          Swal.fire({
            icon: 'error',
            text: msg,
          });
        });
    },
    filterProducts() {
      this.filteredProducts = JSON.parse(JSON.stringify(this.products));
      const { id } = this.$route.params;
      const index = this.filteredProducts.findIndex((product) => product.id === id); // 找出當下頁面產品的索引值
      this.filteredProducts.splice(index, 1); // 刪除當下頁面的產品資料

      const len = this.filteredProducts.length;
      const ranNumAry = [];

      const times = len >= 4 ? 4 : len; // 防止當商品數量不到四個的時候產生無限迴圈
      for (let i = 0; i < times; i += 1) {
        const ranNum = Math.floor(Math.random() * len); // 取得 0 ~ (this.products.length - 1) 之間的亂數
        const check = i === 0 || !ranNumAry.some((num) => num === ranNum); // 檢查數字有沒有重複
        if (check) {
          ranNumAry.push(ranNum);
        } else {
          i -= 1; // 重複就重新在一次
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
    addCart() {
      if (this.num >= 1) {
        const { id } = this.$route.params;
        let method = 'post';
        let productId = this.product.id;
        let qty = this.num;
        let api = `${this.apiBase}/cart`;
        const product = this.cart.filter((item) => item.product_id === id);

        if (product.length) {
          method = 'put';
          api = `${api}/${product[0].id}`;
          productId = product[0].product_id;
          qty = product[0].qty + this.num;
        }

        const data = {
          product_id: productId,
          qty,
        };

        this.isBtnLoading = true;
        this.$http[method](api, { data })
          .then((res) => {
            this.getCart();
            this.isAddedCart = true;
            pushToastMessage('user', res.data.success, '加入購物車');
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
  components: {
    cartDropdown,
  },
};
</script>
