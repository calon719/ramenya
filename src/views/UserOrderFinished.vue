<template>
  <div class="userOrderFinished">
    <main class="main-footer-bottom py-5">
      <div class="container bg-white mb-5 py-4">
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
          <router-link class="btn btn-secondary" to="/">返回首頁</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import sweetAlert from 'sweetalert2';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      orderData: {
        user: {},
      },
    };
  },
  methods: {
    getOrder() {
      const { id } = this.$route.params;
      this.$emit('loadingStatus', true);
      this.$http.get(`${this.apiBase}/order/${id}`)
        .then((res) => {
          this.$emit('loadingStatus', false);
          const { order } = res.data;
          if (order) {
            this.orderData = order;
          } else {
            sweetAlert.fire({
              icon: 'error',
              text: '訂單編號好像出錯囉！',
            });
            this.$router.replace('/');
          }
        }).catch((err) => {
          this.$emit('loadingStatus', false);
          const msg = err.response.data.message;
          sweetAlert.fire({
            icon: 'error',
            text: msg,
          });
        });
    },
  },
  created() {
    this.getOrder();
  },
};
</script>
