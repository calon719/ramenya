<template>
  <div class="userOrderConfirm">
    <main class="main-footer-bottom">
      <div class="container bg-white mb-5 py-5 px-md-5">
        <div class="row justify-content-center mb-5">
          <div class="col-12 col-md-8 col-lg-7">
            <ul class="multi-steps">
              <li>確認品項</li>
              <li>填寫資料</li>
              <li class="active">確認資料</li>
              <li>完成訂單</li>
            </ul>
          </div>
        </div>

        <div class="px-sm-3 px-xl-5 mb-5">
          <h3 class="ps-3 pb-2 mb-4 border-bottom border-2">訂單確認</h3>
          <div class="row justify-content-center  gy-5 g-md-5">
            <div class="col-12 col-md-5 order-2 order-md-1">
              <table class="table">
                <tbody>
                  <tr>
                    <th scope="col" width="80">姓名</th>
                    <td>{{ userData.user.name }}</td>
                  </tr>
                  <tr>
                    <th scope="col">電話</th>
                    <td>{{ userData.user.tel }}</td>
                  </tr>
                  <tr>
                    <th scope="col">Email</th>
                    <td>{{ userData.user.email }}</td>
                  </tr>
                  <tr>
                    <th scope="col">地址</th>
                    <td>{{ userData.user.address }}</td>
                  </tr>
                  <tr>
                    <th scope="col">留言</th>
                    <td>{{ userData.message }}</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <div class="col-12 col-md-7 col-lg-5 order-1 order-md-2">
              <div class="card">
                <div class="card-body">
                  <h4 class="cart-title text-center border-bottom pb-2">訂單內容</h4>
                  <ul class="order-productList list-unstyled p-2 mb-0">
                    <li v-for="product in cartData.carts" :key="product.id">
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
                      <span>小計</span>
                      <span>NTD {{ cartData.total }}</span>
                    </li>
                    <li class="d-flex justify-content-between mb-2">
                      <span>運費</span>
                      <span>NTD {{ deliveryFee }}</span>
                    </li>
                    <li class="d-flex justify-content-between mb-2">
                      <span>折扣</span>
                      <span>NTD {{ discount }}</span>
                    </li>
                    <li class="d-flex justify-content-between mb-2">
                      <span class="fw-bold">應付金額</span>
                      <span>NTD {{ finalTotal }}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="row justify-content-between">
          <div class="col-5 col-md-4 col-lg-3 col-xl-2">
            <a href="#" class="btn btn-outline-secondary w-100"
              @click.prevent="goPrePage">
              <i class="bi bi-arrow-left"></i>
              返回上一頁
            </a>
          </div>
          <div class="col-5 col-md-4 col-lg-3 col-xl-2">
            <button type="button" class="btn btn-primary w-100" @click="sendOrder">
              確認
              <i class="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      userData: {
        user: {},
      },
      deliveryFee: 30,
    };
  },
  inject: ['showErrMsg'],
  computed: {
    cartData() {
      return this.$store.state.cartList;
    },
    finalTotal() {
      let total = Math.ceil(this.cartData.final_total);
      total += this.deliveryFee;
      return total.toLocaleString();
    },
    discount() {
      const { total } = this.cartData;
      const finalTotal = Math.ceil(this.cartData.final_total);
      const amount = total - finalTotal;
      return amount.toLocaleString();
    },
  },
  methods: {
    checkInfo() {
      const userData = sessionStorage.getItem('orderData');
      if (!userData) {
        this.showErrMsg('尚未填寫購買資訊！');
        this.$router.replace({
          name: 'UserOrderInfo',
        });
      } else {
        this.userData = JSON.parse(userData);
      }
    },
    sendOrder() {
      if (this.cartData?.carts?.length) {
        const api = `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`;
        const data = this.userData;
        this.$store.commit('toggleLoading', true);
        this.$http.post(`${api}/order`, { data })
          .then((res) => {
            const { orderId } = res.data;
            this.$router.replace(`/order/finished/${orderId}`);
            this.$store.commit('toggleLoading', false);
          }).catch(() => {
            this.$router.replace({
              name: 'UserOrderErr',
            });
            this.$store.commit('toggleLoading', false);
          });
      } else {
        this.showErrMsg('購物車沒有商品！');
        this.$router.replace({
          name: 'UserCart',
        });
      }
    },
    goPrePage() {
      this.$router.go(-1);
    },
  },
  mounted() {
    this.checkInfo();
  },
};
</script>
