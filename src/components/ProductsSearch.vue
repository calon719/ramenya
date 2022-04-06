<template>
  <div class="productsSearch">
    <div class="productsSearch-result search-footer-bottom" v-show="status">
      <h3 class="pb-1 border-bottom">
        搜尋結果
        <span class="fs-6 text-muted">總共 {{ result.length }} 筆結果</span>
      </h3>

      <div class="py-5 px-3 px-lg-5" v-show="hasResult">
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 gx-3 gy-4 mb-5">
          <div class="col" v-for="product in filteredResult" :key="product.id">
            <div class="card card-custom position-relative">
              <a class="card-coverLink" href="#"
                :class="{'cursor-default': addCartLoading.isLoading}"
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
                    :disabled="addCartLoading.isLoading && addCartLoading.id === product.id"
                    @click="$emit('addCart', product.id)">
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
          :pages="paginationData" @page="changePage" />
      </div>

      <div class="productSearch-noResult mt-3" v-show="!hasResult">
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
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      products: [],
      result: [],
      filteredResult: [],
      paginationData: {
        total_pages: 1,
        current_page: 1,
        has_pre: false,
        has_next: false,
      },
      hasResult: false,
    };
  },
  props: ['addCartLoading', 'status', 'keyWord'],
  watch: {
    keyWord() {
      this.matchKeyWord();
    },
  },
  methods: {
    getProducts() {
      this.$http.get(`${this.apiBase}/products/all`)
        .then((res) => {
          this.products = res.data.products;
        }).catch((err) => {
          const msg = err.response.data.message;
          this.$swal({
            icon: 'error',
            text: msg,
          });
        });
    },
    matchKeyWord() {
      if (this.keyWord === '') {
        this.filteredResult.splice(0);
        this.$emit('isSearching', false);
      } else {
        this.$emit('isSearching', true);
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
        this.hasResult = this.result.length;
      }
    },
    changePage(page = 1) {
      const total = Math.ceil(this.result.length / 10) || 1;

      this.paginationData.current_page = page;
      this.paginationData.total_pages = total;
      this.paginationData.has_pre = page > 1;
      this.paginationData.has_next = page < total;

      this.filterProduct(page);
    },
    filterProduct(page) {
      const startIndex = (page - 1) * 10;
      const endIndex = page * 10 - 1;
      this.filteredResult = this.result.filter((item, i) => i >= startIndex && i <= endIndex);
    },
  },
  created() {
    this.getProducts();
  },
  components: {
    PaginationComponent,
  },
};
</script>
