<template>
  <div class="home">
    <CartDropdown ref="cartDropdown" />
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
          慶祝拉麵屋一週年，現在進入到活動頁面參加活動，就有機會得到優惠碼！
        </p>
        <routerLink class="btn btn-primary btn-lg" to="/anniversary">進入活動頁面</routerLink>
      </section>

      <section class="feature bg-light py-5">
        <div class="container py-md-5">
          <div class="row g-3 g-md-5 align-items-center mb-5">
            <div class="col-12 col-md-7">
              <div class="ratio ratio-16x9 overflow-hidden">
                <img class="img-cover" src="https://storage.googleapis.com/vue-course-api.appspot.com/calon/1649256094389.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=SxtEeMjz%2BaOsibhB9TRddCERB2VsIHmIzYpmEPO%2F6QieHnQ%2B9B4E0hSqpLzVd2Jq%2Bc%2Fu1Ifl8hy8MCbkwQUV7Zz4b7r8hpcVCNF7ahlHw%2FpMI%2FCsm1XBBvRY7Og9PnqnoxwMQNzClY2nr%2FAd51X1QQgttozYpyV6dS%2BNq4usWzxivDB53j%2FzJjWKbvKorEPzzP7t12RaKJ0CF43epQAcAcWhF2L4f667kvxLRvn2fO%2Ffe2Zg2Sn%2BP2qXS2NN9n8khAaPzQcDDjl7jg8nZder%2Bxd1ZCtdZykZR3o72SJ21O75GpP7c7A5viXA1v3Q9tr396MKREAxu51lNypzge2IwQ%3D%3D" alt="日本師父">
              </div>
            </div>
            <div class="col-12 col-md-5" data-aos="fade-top">
              <h3 class="fw-bold">日本師父，傳統技術</h3>
              <p class="mb-0 text-muted text-indent-2">
                拉麵屋的師父為了推廣日本拉麵的美味，帶著實戰十年的拉麵技術來到台灣開店，
                繼承了日本職人的精神，堅決只端給客人最好最道地的拉麵，在拉麵的味道上絕不容許一絲妥協。
              </p>
            </div>
          </div>

          <div class="row g-3 g-md-5 align-items-center">
            <div class="col-12 col-md-5 order-2 order-md-1" data-aos="fade-top">
              <h3 class="text-start text-md-end fw-bold">手工製麵，堅決品質</h3>
              <p class="mb-0 text-muted text-indent-2">
                為了拉麵的品質，拉麵屋的師父獨自研發適合自家拉麵風味的比例，
                並且每天純手工製作自行把關品質，雖然這作法導致每天拉麵的產量不多，
                但能保證客人吃的每碗品質都是最好的。</p>
            </div>
            <div class="col-12 col-md-7 order-1 order-md-2">
              <div class="ratio ratio-16x9 overflow-hidden">
                <img class="img-cover" src="https://storage.googleapis.com/vue-course-api.appspot.com/calon/1649256102531.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=WxrjM8qqtZS91EeHirK5euIthuZ44w9h4hmjnAShdRYyRXuPrQ427sWZXhzaRqsOgNclleKANcoJ4TLA5ct9bQphhtmSW8COapeQuLSqCLqo79Sno9qLKyYHZyX%2BxwCLAr1H81HyLky4W6J%2FFRPQ8v5KK2TwpB4av3Z3frMjq6%2F38%2FlIpVONShFIrGIpfx4QjtVjoq3o93twwtO25kh7CXxvWUCpoZZLjCkT%2FoH%2BauF4o000dXGW7PzqLF%2BT%2FsSNEQI2D8DBBMbiN1fGKQUHNtgz26HIOgeuRVzsxW53unHmvtnFQb4caZ0esmBlayTcZlEQfJ06wluTVRdp40dx5w%3D%3D" alt="手工麵條">
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
                  <span class="fs-6 text-muted fw-normal me-2">
                    <del>NTD {{ product.origin_price }}</del>
                  </span>
                  NTD {{ product.price }}
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
        <div class="subscription-content">
          <form @submit.prevent="subscription">
            <label class="form-label" for="email">
              <h3 class="text-white mb-2">訂閱我們以獲得更多優惠資訊</h3>
            </label>
            <div class="input-group">
              <input type="email" class="form-control" placeholder="輸入 Email 訂閱我們"
                v-model.trim="email" />
              <button class="btn btn-primary" type="submit"
                :disabled="isBtnLoading">
                <div class="spinner-border spinner-border-sm"
                  v-if="isBtnLoading"></div>
                <span v-else>訂閱</span>
              </button>
            </div>
          </form>
        </div>
        <div class="subscription-bg"></div>
      </section>
    </main>
  </div>
</template>

<script>
import pushToastMessage from '@/utils/pushToastMessage';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      newArrials: [],
      email: '',
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
          this.$swal({
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
      const regex = /^\w+((-\w+)|(\.\w+))*@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z]+$/;
      const check = regex.test(this.email);
      if (check) {
        const api = 'https://script.google.com/macros/s/AKfycbxiwYSXVg5WJV2-XI6sYS1J-8uy8orWc3gmkLReW1A9oZ9ebjBBDlKjQGEqy05tXlUn_Q/exec';
        const params = { email: this.email };

        this.isBtnLoading = true;
        this.$http.post(api, null, { params })
          .then((res) => {
            pushToastMessage('user', res.data.success, '訂閱');
            this.email = '';
            this.isBtnLoading = false;
          }).catch(() => {
            pushToastMessage('user', false, '訂閱');
            this.isBtnLoading = false;
          });
      } else {
        pushToastMessage('user', false, '格式不正確，訂閱');
      }
    },
  },
  mounted() {
    this.getProducts();

    // 底部 .subscription 視差滾動
    if (this.$route.name === 'Home') {
      window.addEventListener('scroll', () => {
        const subsEl = document.querySelector('.subscription');
        const bgSubsEl = document.querySelector('.subscription-bg');
        // 由 docuemnt 底部算起
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
};
</script>
