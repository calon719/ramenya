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
                <RouterLink to="/" class="breadcrumb-link">首頁</RouterLink>
              </li>
              <li class="breadcrumb-item">美味菜單</li>
              <li class="breadcrumb-item">
                {{ searchKeyWord.length ? '搜尋結果' : $route.query.category }}
              </li>
            </ol>
          </nav>
        </div>

        <div class="search col-12 col-md-6 col-lg-4 position-relative"></div>
      </div>

      <ProductsSearch v-if="isMounted"
        @addCart="addCart" @goProduct="toProduct">
      </ProductsSearch>

      <div v-show="!searchKeyWord">
        <ul class="nav nav-tabs">
          <li class="nav-item">
            <RouterLink class="nav-link"
              :to="{ path: '/products', query: { category: '全部' } }"
              :active-class="$route.query.category === '全部' ? 'active' : ''"
            >全部</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link"
              :to="{ path: '/products', query: { category: '拉麵' } }"
              :active-class="$route.query.category === '拉麵' ? 'active' : ''"
            >拉麵</RouterLink>
          </li>
          <li class="nav-item">
            <routerLink class="nav-link"
              :to="{ path: '/products', query: { category: '配菜' } }"
              :active-class="$route.query.category === '配菜' ? 'active' : ''"
            >配菜</routerLink>
          </li>
          <li class="nav-item">
            <RouterLink class="nav-link"
              :to="{ path: '/products', query: { category: '飲品' } }"
              :active-class="$route.query.category === '飲品' ? 'active' : ''"
            >飲品</RouterLink>
          </li>
        </ul>

        <div class="py-5 px-3 px-lg-5">
          <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-3 gy-4 mb-5">
            <div class="col" v-for="product in currentProducts" :key="product.id">
              <div class="card card-custom position-relative">
                <a class="card-coverLink" href="#"
                  :class="{'cursor-default': checkBtnLoading(`products-addCart-${product.id}`)}"
                  @click.prevent="toProduct(product.id)"></a>
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
                      :disabled="checkBtnLoading(`products-addCart-${product.id}`)"
                      @click="addCart(product.id)">
                      <div class="spinner-border spinner-border-sm" role="status"
                        v-if="checkBtnLoading(`products-addCart-${product.id}`)"></div>
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
            :pages="paginationData" @page="changePage" />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue';
import ProductsSearch from '@/components/ProductsSearch.vue';

export default {
  data() {
    return {
      currentProducts: [],
      paginationData: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
      isMounted: false,
    };
  },
  inject: ['checkBtnLoading'],
  computed: {
    filteredProductsList() {
      const { category } = this.$route.query;
      const { productsList } = this.$store.state;
      let data = [];
      switch (category) {
        case '拉麵':
          data = productsList.filter((product) => product.category === '拉麵');
          break;
        case '配菜':
          data = productsList.filter((product) => product.category === '配菜');
          break;
        case '飲品':
          data = productsList.filter((product) => product.category === '飲品');
          break;
        default:
          data = this.$store.state.productsList;
          data.sort((a, b) => {
            // 取 category 開頭字排序
            const str1 = a.category.split('');
            const str2 = b.category.split('');
            return str1[0].localeCompare(str2[0]);
          });
          break;
      }
      return data;
    },
    searchKeyWord() {
      return this.$store.state.searchKeyWord;
    },
  },
  watch: {
    filteredProductsList() {
      this.setPagination();
    },
  },
  methods: {
    setPagination() {
      this.paginationData.total_pages = Math.ceil(this.filteredProductsList.length / 9);
      this.paginationData.has_pre = this.paginationData.current_page > 1;
      const hasNext = this.paginationData.current_page < this.paginationData.total_pages;
      this.paginationData.has_next = hasNext;
      this.changePage();
    },
    changePage(page = 1) {
      this.paginationData.current_page = page;
      const startIndex = (page - 1) * 9;
      const endIndex = page * 10 - 1;
      this.currentProducts = this.filteredProductsList.slice(startIndex, endIndex);
      this.paginationData.has_pre = this.paginationData.current_page > 1;
      const hasNext = this.paginationData.current_page < this.paginationData.total_pages;
      this.paginationData.has_next = hasNext;
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    },
    addCart(id) {
      const data = {
        data: {
          product_id: id,
          qty: 1,
        },
        prefix: 'products-addCart',
      };

      this.$store.commit('addBtnLoadingItem', `products-addCart-${id}`);
      this.$store.dispatch('addCart', data);
    },
    toProduct(id) {
      if (!this.$store.state.btnLoadingItems.length) {
        this.$router.push(`/product/${id}`);
      }
    },
  },
  components: {
    PaginationComponent,
    ProductsSearch,
  },
  created() {
    this.setPagination();
  },
  mounted() {
    this.isMounted = true;
  },
};
</script>
