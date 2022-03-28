<template>
  <div class="home">
  <cartDropdown ref="cartDropdown"></cartDropdown>
    <header class="banner">
      <div class="banner-content">
        <span class="fs-3">不去日本也能享受</span>
        <h2 class="banner-title">道地的濃郁滋味</h2>
      </div>
      <div class="banner-chevrons">
        <div class="chevron"></div>
        <div class="chevron"></div>
        <div class="chevron"></div>
      </div>
    </header>

    <main>
      <section class="anniversary container py-5 my-sm-5
        d-flex flex-column justyfy-content-center align-items-center">
        <h3 class="anniversary-title fs-1 fw-bold text-center mb-4">
          一週年慶祝活動
        </h3>
        <p class="fs-5 text-center text-muted">
          慶祝拉麵屋一週年，
          <br>
          現在進入到活動頁面參加活動，就有機會得到優惠碼
        </p>
        <router-link class="btn btn-primary" to="/anniversary">進入活動頁面</router-link>
      </section>

      <section class="feature bg-light py-5">
        <div class="container py-md-5">
          <div class="row gy-4 g-md-5 align-items-center">
            <div class="col-12 col-md-7 order-1">
              <div class="ratio ratio-16x9 overflow-hidden">
                <img class="img-cover" src="https://storage.googleapis.com/vue-course-api.appspot.com/calon/1648019866210.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=aI3MbOktzETvUqUNnpKVZ%2B3YGlbnym1IXb4iRm49qsLUkKBYSsxQ2G8oxiDjseaaKpajl2IBGHPccM6gXu7ZaeIEwxeuRWNFbf5ct5fPo846AHwf59tMyUiC0VIiSTTzWRucD8ato%2FoAtHJsTzmoS90XhpVY79OQ4WcuaEJ0CV%2FC99ffbAEqtySMFHllZviz08AvXun2oHvLUz1OjP1xj6jEfHs96Hw3a88%2FaiiJuNL1sYxGV8%2BMAsRbyMjDzZ%2BPS3PgNAzvjJcKiNLSJQVNncdO8wVZddPphWrDURiJ3h50T5ZxbNR0nYFDt7X58wQO98PdZDGbZE0TBbFw4t6nNA%3D%3D" alt="">
              </div>
            </div>
            <div class="col-12 col-md-5 order-2" data-aos="fade-top">
              <h3 class="fw-bold">日本師父，傳統技術</h3>
              <p class="mb-0 text-muted text-indent-2">
                拉麵屋的師父為了推廣日本拉麵的美味，帶著實戰十年的拉麵技術來到台灣開店，
                繼承了日本職人的精神，堅決只端給客人最好最道地的拉麵，在拉麵的味道上絕不容許一絲妥協。
              </p>
            </div>
            <div class="col-12 col-md-5 order-4 order-md-3" data-aos="fade-top">
              <h3 class="text-start text-md-end fw-bold">手工製麵，堅決品質</h3>
              <p class="mb-0 text-muted text-indent-2">
                為了拉麵的品質，拉麵屋的師父獨自研發適合自家拉麵風味的比例，
                並且每天純手工製作自行把關品質，雖然這作法導致每天拉麵的產量不多，
                但能保證客人吃的每碗品質都是最好的。</p>
            </div>
            <div class="col-12 col-md-7 order-3 order-md-4">
              <div class="ratio ratio-16x9 overflow-hidden">
                <img class="img-cover" src="https://storage.googleapis.com/vue-course-api.appspot.com/calon/1648020007631.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=HtXei%2BPtsz7byb%2B5Z1wtqm79PHrQLCBu%2F8bcDYF2Wd7HNSu5N6rDolnjqgIsDYZzhUw84LUS158FP3uA0%2BRl67nVJ0yHRODzWedD0kot%2B%2FMDdnaNX3EHPaIhh4SpVgvC9B5GkVF6zovOljdW0WKR0Cw1sFoBa15M5XNtzNylL%2BKQkKLSqQWyS8ERarVwlzUqexNp3b2rJYGpKvPzT2RdjPvVrUvu5kF8ls6xjmlod5IWToCce%2F6U9RW6g5uq20QhxenlIviBH1d4c3gj1kvm8fCKleIhzHFZwvrYsbYTqAKV6uToVn3vYCMevItjE25UIOQItrMMNoGkJEQzQE2dwQ%3D%3D" alt="">
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="newArrial py-5">
        <div class="container p-md-5">
          <h3 class="newArrial-title fs-1 text-center">新品上市</h3>
          <div class="product row row-cols-1 row-cols-md-2"
            v-for="product in newArrials" :key="`new_${product.id}`">
            <div class="col position-relative product-img-back">
              <div class="img-front ratio ratio-4x3 overflow-hidden">
                <img class="img-cover" :src="product.imageUrl" :alt="product.title">
              </div>
            </div>
            <div class="col">
              <div class="product-content">
                <h4 class="fs-3 mb-4">{{ product.title }}</h4>
                <p class="d-none d-xl-block">{{ product.description }}</p>
                <p class="text-truncate d-xl-none w-100">{{ product.description }}</p>
                <p class="fs-3 fw-bold">
                  NTD {{ product.price }}
                  <span class="fs-6 text-muted fw-normal">
                    <del>NTD {{ product.origin_price }}</del>
                  </span>
                </p>
                <ul class="list-unstyled d-flex flex-wrap justify-content-center mb-0">
                  <li>
                    <a class="product-link" href="#"
                      @click.prevent="goProduct(product.id)">
                      <i class="bi bi-journal-text"></i>
                      查看詳細
                    </a>
                  </li>
                  <li>
                    <div v-if="addCartLoading.isLoading && addCartLoading.id === product.id"
                      class="py-1">
                      <div class="spinner-border spinner-border-sm" role="status"></div>
                    </div>
                    <a v-else class="product-link"
                      href="#" @click.prevent="addCart(product.id)">
                      <i class="bi bi-bag-plus"></i>
                      加入購物車
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section class="subscription d-flex justify-content-center align-items-center">
        <div class="subscription-content bg-dark bg-opacity-50">
          <h3 class="text-white mb-2">訂閱我們以獲得更多優惠資訊</h3>
          <div class="input-group">
            <input type="email" class="form-control" placeholder="輸入 Email 訂閱我們">
            <button class="btn btn-primary" type="button" @click="subscription">
              <div class="spinner-border spinner-border-sm"
                v-if="isBtnLoading"></div>
                <span v-else>訂閱</span>
              </button>
          </div>
        </div>
        <div class="subscription-bg"></div>
      </section>
    </main>
  </div>
</template>

<script>
import sweetAlert from 'sweetalert2';
import cartDropdown from '@/components/CartDropdown.vue';
import pushToastMessage from '@/utils/pushToastMessage';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      newArrials: [],
      addCartLoading: {
        id: '',
      },
      isBtnLoading: false,
    };
  },
  methods: {
    getProducts() {
      this.$emit('loadingStatus', true);
      this.$http.get(`${this.apiBase}/products/all`)
        .then((res) => {
          const data = res.data.products;
          this.newArrials = data.filter((product) => product.tag === 2);
          this.$emit('loadingStatus', false);
        }).catch((err) => {
          this.$emit('loadingStatus', false);
          const msg = err.response.data.message;
          sweetAlert.fire({
            icon: 'error',
            text: msg,
          });
        });
    },
    goProduct(id) {
      this.$router.push(`/product/${id}`);
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
    subscription() {
      this.isBtnLoading = true;
      setTimeout(() => {
        this.isBtnLoading = false;
        pushToastMessage('user', true, '訂閱');
      }, 1000);
    },
  },
  mounted() {
    this.getProducts();

    // 底部 .subscription 視差滾動
    if (this.$route.name === 'Home') {
      window.addEventListener('scroll', () => {
        const subsEl = document.querySelector('.subscription');
        const bgSubsEl = document.querySelector('.subscription-bg');
        // .subscription 位置在 document 底部，滑到底視窗底端也接觸不到，故當前位置由 docuemnt 底部算起
        const bodyHeight = document.body.clientHeight;
        // 視窗底部到 document 底部的距離
        const scrollPos = bodyHeight - window.scrollY - window.screen.height;
        const elTop = bodyHeight - subsEl?.offsetTop;
        if (scrollPos >= 0 && scrollPos <= elTop) {
          bgSubsEl.style.transform = `translateY(${scrollPos * 1.3}px)`;
        }
      });
    }
  },
  components: {
    cartDropdown,
  },
};
</script>
