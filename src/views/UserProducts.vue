<template>
  <div class="userProducts">
    <CartDropdown ref="cartDropdown" />
    <header class="page-banner">
      <h2 class="page-banner-title fs-1">美味菜單</h2>
    </header>

    <main class="container py-5">
      <div class="row justify-content-between align-items-center mb-4">
        <div class="col">
          <nav>
            <ol class="breadcrumb text-dark mb-md-0">
              <li class="breadcrumb-item">
                <routerLink to="/" class="breadcrumb-link">首頁</routerLink>
              </li>
              <li class="breadcrumb-item">美味菜單</li>
              <li class="breadcrumb-item">{{ isSearching ? '搜尋結果' : $route.query.category }}</li>
            </ol>
          </nav>
        </div>

        <div class="col-12 col-md-6 col-lg-4 position-relative">
          <input class="searchInput form-control border-secondary" type="search"
            placeholder="請輸入要查詢的關鍵字" v-model.trim="keyWord" />
        </div>
      </div>

      <ProductsSearch :addCartLoading="addCartLoading" :status="isSearching" :keyWord="keyWord"
        @addCart="addCart" @goProduct="goProduct" @isSearching="toggleProducts">
      </ProductsSearch>

      <div v-show="!isSearching">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <routerLink class="nav-link"
              :to="{ path: '/products', query: { category: '全部' } }"
              :active-class="$route.query.category === '全部' ? 'active' : ''"
            >全部</routerLink>
          </li>
          <li class="nav-item">
            <routerLink class="nav-link"
              :to="{ path: '/products', query: { category: '拉麵' } }"
              :active-class="$route.query.category === '拉麵' ? 'active' : ''"
            >拉麵</routerLink>
          </li>
          <li class="nav-item">
            <routerLink class="nav-link"
              :to="{ path: '/products', query: { category: '配菜' } }"
              :active-class="$route.query.category === '配菜' ? 'active' : ''"
            >配菜</routerLink>
          </li>
          <li class="nav-item">
            <routerLink class="nav-link"
              :to="{ path: '/products', query: { category: '飲品' } }"
              :active-class="$route.query.category === '飲品' ? 'active' : ''"
            >飲品</routerLink>
          </li>
        </ul>

        <div class="py-5 px-3 px-lg-5">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-3 gy-4 mb-5">
            <div class="col" v-for="product in productsData" :key="product.id">
              <div class="card card-custom position-relative">
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
                    :src="product.imageUrl" :alt="product.title">
                </div>
                <div class="card-body">
                  <h3 class="card-title fs-4">{{ product.title }}</h3>
                  <div class="d-flex">
                    <p v-show="!product.origin_price" class="fs-5">
                      NTD {{ product.price }}
                    </p>
                    <p v-show="product.origin_price" class="fs-5">
                      <small class="me-1">
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
          <PaginationComponent v-if="paginationData.total_pages !== 1"
            :pages="paginationData" @page="getProducts" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue';
import pushToastMessage from '@/utils/pushToastMessage';
import ProductsSearch from '@/components/ProductsSearch.vue';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      productsData: [],
      paginationData: {},
      keyWord: '',
      addCartLoading: {
        id: '',
        isLoading: false,
      },
      isSearching: false,
    };
  },
  watch: {
    $route() {
      this.getProducts();
    },
  },
  methods: {
    getProducts(page = 1) {
      const { category } = this.$route.query;
      let api = `${this.apiBase}/products?page=${page}`;

      if (category !== '全部') {
        api = `${this.apiBase}/products?page=${page}&category=${category}`;
      }

      this.$emit('loadingStatus', true);
      this.$http.get(api)
        .then((res) => {
          const { products, pagination } = res.data;
          const data = products.sort((a, b) => {
            const str1 = a.category.split('');
            const str2 = b.category.split('');
            return str1[0].localeCompare(str2[0]);
          });

          this.productsData = data;
          this.paginationData = pagination;
          this.$emit('loadingStatus', false);
        }).catch((err) => {
          const msg = err.response.data.message;
          this.$swal({
            icon: 'error',
            text: msg,
          });
          this.$emit('loadingStatus', false);
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
    toggleProducts(status) {
      this.isSearching = status;
    },
  },
  created() {
    this.getProducts();
  },
  components: {
    PaginationComponent,
    ProductsSearch,
  },
};
</script>
