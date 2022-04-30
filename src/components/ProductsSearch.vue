<template>
  <div class="productsSearch">
    <Teleport to=".search">
      <input class="searchInput form-control border-secondary" type="search"
        placeholder="請輸入要查詢的關鍵字"
        v-model.trim="keyWord" />
    </Teleport>

    <div class="productsSearch-result search-footer-bottom" v-show="keyWord.length">
      <h3 class="pb-1 border-bottom">
        搜尋結果
        <span class="fs-6 text-muted">總共 {{ result.length }} 筆結果</span>
      </h3>

      <div class="py-5 px-3 px-lg-5" v-show="result.length">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-3 gy-4 mb-5">
          <div class="col" v-for="product in currentResult" :key="product.id">
            <div class="card card-custom position-relative">
              <a class="card-coverLink" href="#"
                :class="{'cursor-default': checkBtnLoading(`products-search-${product.id}`)}"
                @click.prevent="$emit('goProduct', product.id)"></a>
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
                    :disabled="checkBtnLoading(`products-search-${product.id}`)"
                    @click="$emit('addCart', product.id)">
                    <div class="spinner-border spinner-border-sm" role="status"
                      v-if="checkBtnLoading(`products-search-${product.id}`)"></div>
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

      <div class="productSearch-noResult mt-3" v-show="!result.length">
        <p>沒有符合的商品，請重新搜尋。</p>
      </div>
    </div>
  </div>
</template>

<script>
import PaginationComponent from '@/components/PaginationComponent.vue';

export default {
  data() {
    return {
      keyWord: '',
      result: [],
      currentResult: [],
      paginationData: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
    };
  },
  inject: ['checkBtnLoading'],
  computed: {
    products() {
      return this.$store.state.productsList;
    },
  },
  watch: {
    keyWord() {
      this.matchKeyWord();
      this.$store.commit('inputSearchKeyWord', this.keyWord);
    },
  },
  methods: {
    matchKeyWord() {
      if (this.keyWord === '') {
        this.result = [];
        this.currentResult = [];
      } else {
        const strArr = this.keyWord.split(' ');
        const productsArr = [];

        strArr.forEach((str) => {
          this.products.forEach((product) => {
            if (product.title.includes(str)) {
              productsArr.push(product);
            }
          });
        });
        this.result = [...new Set(productsArr)];
        this.changePage();
      }
    },
    changePage(page = 1) {
      const total = Math.ceil(this.result.length / 9) || 1;

      this.paginationData.current_page = page;
      this.paginationData.total_pages = total;
      this.paginationData.has_pre = page > 1;
      this.paginationData.has_next = page < total;

      this.filterProduct(page);
      window.scroll({
        top: 0,
        behavior: 'smooth',
      });
    },
    filterProduct(page) {
      const startIndex = (page - 1) * 9;
      const endIndex = page * 9;
      this.currentResult = this.result.slice(startIndex, endIndex);
    },
    addCart(id) {
      const data = {
        data: {
          product_id: id,
          qty: 1,
        },
        prefix: 'products-search',
      };

      this.$store.commit('addBtnLoadingItem', `products-search-${id}`);
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
  },
};
</script>
