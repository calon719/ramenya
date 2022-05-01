<template>
  <div class="userOrderFinished">
    <main class="main-footer-bottom py-5">
      <div class="container bg-white mb-5 py-4">
        <div class="row justify-content-center mb-5">
          <div class="col-12 col-md-8 col-lg-7">
            <ul class="multi-steps">
              <li>確認品項</li>
              <li>填寫資料</li>
              <li>確認資料</li>
              <li class="active">完成訂單</li>
            </ul>
          </div>
        </div>

        <h3 class="fs-1 text-center mb-5">
          <i class="bi bi-check-circle text-success"></i>
          交易成功
        </h3>

        <div class="px-sm-3 px-xl-5 mb-5">
          <div class="row justify-content-center gy-5 g-md-5">
            <div class="col-12 col-md-5 order-2 order-md-1">
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="col" width="80">姓名</th>
                    <td>{{ orderData.user.name }}</td>
                  </tr>
                  <tr>
                    <th scope="col">電話</th>
                    <td>{{ orderData.user.tel }}</td>
                  </tr>
                  <tr>
                    <th scope="col">Email</th>
                    <td>{{ orderData.user.email }}</td>
                  </tr>
                  <tr>
                    <th scope="col">地址</th>
                    <td>{{ orderData.user.address }}</td>
                  </tr>
                  <tr>
                    <th scope="col">交易狀態</th>
                    <td :class="orderData.is_paid ? 'text-success' : 'text-muted'">
                      {{  orderData.is_paid ? '已付款' : '未付款' }}
                    </td>
                  </tr>
                  <tr>
                    <th scope="col">留言</th>
                    <td>{{ orderData.message }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-12 col-md-7 col-lg-5 order-1 order-md-2">
              <div class="card">
                <div class="card-body">
                  <h4 class="cart-title text-center border-bottom pb-2">訂單內容</h4>
                  <ul class="order-productList list-unstyled p-2 mb-0">
                    <li v-for="product in orderData.products" :key="product.id">
                      <div class="row row-cols-2">
                        <div class="col">
                          {{ product.product.title }}
                        </div>
                        <div class="col">
                          <div class="d-flex justify-content-between">
                            <p class="mb-0">NTD {{ product.product.price.toLocaleString() }}</p>
                            <p class="mb-0">
                              <i class="bi bi-x"></i>
                              {{ product.qty }}
                            </p>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                  <ul class="list-unstyled px-4 mb-0">
                    <li class="d-flex justify-content-between mb-2">
                      <span class="fw-bold">總金額</span>
                      <span>NTD {{ Math.ceil(orderData.total).toLocaleString() }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="text-center">
          <RouterLink class="btn btn-secondary" to="/">返回首頁</RouterLink>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import showErrMsg from '@/utils/showErrMsg';

export default {
  data() {
    return {
      orderData: {
        user: {},
      },
    };
  },
  methods: {
    getOrder() {
      const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`;
      const { id } = this.$route.params;
      this.$store.commit('toggleLoading', true);
      this.$http.get(`${api}/order/${id}`)
        .then((res) => {
          this.$store.commit('toggleLoading', false);
          const { order } = res.data;
          if (order) {
            this.orderData = order;
          } else {
            showErrMsg('訂單編號好像出錯囉！');
            this.$router.replace('/');
          }
        }).catch((err) => {
          this.$store.commit('toggleLoading', false);
          const msg = err.response.data.message;
          showErrMsg(msg);
        });
    },
  },
  created() {
    this.getOrder();
  },
  mounted() {
    sessionStorage.removeItem('orderData');
  },
};
</script>
