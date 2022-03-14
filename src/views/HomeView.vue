<template>
  <div class="home">
    <cartDropdown ref="cartDropdown"></cartDropdown>
    <header class="banner">
      <div class="banner-content my-auto">
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
          <div class="row row-cols-1 row-cols-md-2 g-4 g-md-5 align-items-center">
            <div class="col order-1">
              <div class="ratio ratio-16x9 overflow-hidden">
                <img class="img-cover" src="https://storage.googleapis.com/vue-course-api.appspot.com/calon/1647160618460.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=V5a1ViqgcZ6y6%2B18WPG2fPRfboC%2F0ufla2hDi9ppokoYHpeEZThgPbwZJcPeLXWBo4fGMXKt7j7xnG9tZPiILErOUDyPuVzL88X4fzuB5aqRVw703s%2Bzb3vuqFT3PK%2FhWDK48U9dggjXyoC80NKSWFPQmtYe8L8SIgQkUIFEM2xmgOUA1I1m9txmEQKmT1PE2xoyuNUtg3uifY0hGvLVwZZi5QlnqtOhL6k%2BrYkLMosAIQXsQM8HoZ2U3%2FKmVRq9FtyuJCEpYzvVx35DrqDAh3TyD9EGkRPGEF8%2F%2FImgoaabcPPCWSPI1eKEyHzePInQkwGvLFP88sPKPg5EKHdVog%3D%3D" alt="">
              </div>
            </div>
            <div class="col order-2" data-aos="fade-left">
              <h3 class="fw-bold">日本師父，傳統技術</h3>
              <p class="mb-0 text-muted text-indent-2">
                拉麵屋的師父為了推廣日本拉麵的美味，帶著實戰十年的拉麵技術來到台灣開店，
                繼承了日本職人的精神，堅決只端給客人最好最道地的拉麵，在拉麵的味道上絕不容許一絲妥協。
              </p>
            </div>
            <div class="col order-4 order-md-3" data-aos="fade-right">
              <h3 class="text-start text-md-end fw-bold">手工製麵，堅決品質</h3>
              <p class="mb-0 text-muted text-indent-2">
                為了拉麵的品質，拉麵屋的師父獨自研發適合自家拉麵風味的比例，
                並且每天純手工製作自行把關品質，雖然這作法導致每天拉麵的產量不多，
                但能保證客人吃的每碗品質都是最好的。</p>
            </div>
            <div class="col order-3 order-md-4">
              <div class="ratio ratio-16x9 overflow-hidden">
                <img class="img-cover" src="https://storage.googleapis.com/vue-course-api.appspot.com/calon/1647163062704.jpg?GoogleAccessId=firebase-adminsdk-zzty7%40vue-course-api.iam.gserviceaccount.com&Expires=1742169600&Signature=IxiO6m4gEL1CSvsj2Wi4M%2BLkcRaptTwIGbchx6tY6IbM%2BVHqF9sTYTjqVC62nWsocJdObiVzWU1UNr9o0JtwSO3UYQoPg7PCCWGhAb8kNiOwg1aHg8PCNGXMpFuG0sLs58I7zBuu1u2G3ZFja7n5Je1JLZVfK63k3sBCRQz8cnWHAqYlh82pUmaDLRRgH9FMfWSFV6QfPr4deSRiEU444iL3OAXigj1RV33iPh83OjPuyxQooYtrqXmwJSmSk4t2HQ06lc4bMYY2nYlDagCod2pCe3jxkPQZoC81dL8U7bzDJHj5tgQQyk3Ize%2FW8aF6q%2BGoqhah5XIOXYOW3vDy%2Fw%3D%3D" alt="">
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
                <h4 class="fs-3">{{ product.title }}</h4>
                <p class="ms-4 me-2 fs-3 fw-bold">
                  NTD {{ product.price }}
                  <span class="fs-6 text-muted">
                    <del>NTD {{ product.origin_price }}</del>
                  </span>
                </p>
                <ul class="list-unstyled d-flex flex-wrap justify-content-center mb-0">
                  <li>
                    <a class="product-link fs-5" href="#"
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
                    <a v-else class="product-link fs-5"
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
    <loadingText :isLoading="isLoading"></loadingText>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import cartDropdown from '@/components/CartDropdown.vue';
import pushToastMessage from '@/utils/pushToastMessage';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      newArrials: [],
      isLoading: false,
      addCartLoading: {
        id: '',
        isLoading: false,
      },
      isBtnLoading: false,
    };
  },
  methods: {
    getProducts() {
      this.isLoading = true;
      this.$http.get(`${this.apiBase}/products/all`)
        .then((res) => {
          const data = res.data.products;
          this.newArrials = data.filter((product) => product.tag === 2);
          this.isLoading = false;
        }).catch((err) => {
          this.isLoading = false;
          const msg = err.response.data.message;
          Swal.fire({
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
