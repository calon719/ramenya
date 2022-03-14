<template>
  <div class="userProducts">
    <cartDropdown ref="cartDropdown"></cartDropdown>
      <header class="page-banner">
        <h2 class="page-banner-title fs-1">美味菜單</h2>
      </header>

      <main class="container py-5">
        <nav class="rounded">
          <ol class="breadcrumb text-dark">
            <li class="breadcrumb-item">
              <router-link to="/" class="breadcrumb-link">首頁</router-link>
            </li>
            <li class="breadcrumb-item">美味菜單</li>
            <li class="breadcrumb-item">{{ selectedCategory }}</li>
          </ol>
        </nav>

        <ul class="nav nav-tabs">
          <li class="nav-item">
            <a class="nav-link"
              :class="{ 'active': selectedCategory === '拉麵' }"
              href="#" @click.prevent="getProducts(1, '拉麵')">拉麵</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
              :class="{ 'active': selectedCategory === '配菜' }"
              href="#"  @click.prevent="getProducts(1, '配菜')">配菜</a>
          </li>
          <li class="nav-item">
            <a class="nav-link"
              :class="{ 'active': selectedCategory === '飲品' }"
              href="#" @click.prevent="getProducts(1, '飲品')">飲品</a>
          </li>
        </ul>
        <div class="bg-white py-5 px-3 px-sm-5">
          <div
            class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-3 gy-4 mb-5">
            <div class="col" v-for="product in productsData" :key="product.id">
              <div class="card position-relative">
                <a class="card-coverLink" href="#"
                  :class="{'cursor-default': addCartLoading.isLoading}"
                  @click.prevent="goProduct(product.id)"></a>
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
                    <button type="button" class="card-cartBtn btn btn-lg btn-primary rounded"
                      :disabled="addCartLoading.isLoading && addCartLoading.id === product.id"
                      @click="addCart(product.id)">
                      <div class="spinner-border spinner-border-sm" role="status"
                      v-if="addCartLoading.isLoading && addCartLoading.id === product.id"></div>
                      <span v-else>
                        <i class="bi bi-cart-fill"></i>
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <pagination :pages="paginationData" @page="getProducts"></pagination>
      </div>
    </main>
    <VueLoading v-model:active="isLoading"
      :color="`#fff`"
      :background-color="`#000`"
      :opacity="0.75"
      :z-index="3000">
      <div class="loadingio-spinner-ellipsis-66suo52scoo"><div class="ldio-i8bc824azn">
          <div></div><div></div><div></div><div></div><div></div>
      </div></div>
    </VueLoading>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import pagination from '@/components/PaginationComponent.vue';
import pushToastMessage from '@/utils/pushToastMessage';
import cartDropdown from '@/components/CartDropdown.vue';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      productsData: [],
      cartData: [],
      paginationData: {},
      selectedCategory: '',
      isLoading: false,
      addCartLoading: {
        id: '',
        isLoading: false,
      },
    };
  },
  methods: {
    getProducts(page = 1, category = '拉麵') {
      this.selectedCategory = category;
      this.isLoading = true;
      const api = `${this.apiBase}/products?page=${page}&category=${this.selectedCategory}`;
      this.$http.get(api)
        .then((res) => {
          this.productsData = res.data.products;
          this.paginationData = res.data.pagination;
          this.isLoading = false;
        }).catch((err) => {
          const msg = err.response.data.message;
          Swal.fire({
            icon: 'error',
            text: msg,
          });
          this.isLoading = false;
        });
    },
    addCart(id) {
      const data = {
        product_id: id,
        qty: 1,
      };
      this.addCartLoading.id = id;
      this.addCartLoading.isLoading = true;
      this.$http.post(`${this.apiBase}/cart`, { data })
        .then((res) => {
          pushToastMessage('user', res.data.success, '加入購物車');
          this.addCartLoading.isLoading = false;
          this.$refs.cartDropdown.getCart();
        }).catch(() => {
          pushToastMessage('user', false, '加入購物車');
          this.addCartLoading.isLoading = false;
        });
    },
    goProduct(id) {
      if (!this.addCartLoading.isLoading) {
        this.$router.push(`/product/${id}`);
      }
    },
  },
  created() {
    this.getProducts();
  },
  components: {
    cartDropdown,
    pagination,
  },
};
</script>
