<template>
  <div class="cart">
    <header class="page-banner">
      <h2 class="page-banner-title fs-1">購物清單</h2>
    </header>

    <main class="bg-light pb-5">
      <div class="container bg-white mb-5 py-5 px-md-4">
        <div class="row justify-content-center">
          <div class="col-12 col-md-8 col-lg-7">
            <ul class="multi-steps steps-one">
              <li class="active">確認品項</li>
              <li>填寫資料</li>
              <li>確認資料</li>
              <li>完成訂單</li>
            </ul>
          </div>
        </div>

        <div v-if="!cartData?.carts?.length" class="p-5 text-center">
          <p class="fs-4 opacity-50 mt-5">
            <i class="bi bi-cart-x fs-1"></i>
            <br>
            購物車目前沒任何商品喔！
          </p>
          <router-link to="/products" class="btn btn-primary btn-lg mb-5">
            <i class="bi bi-arrow-right"></i>
            去逛逛
          </router-link>
        </div>

        <div v-else>
          <div class="text-end mb-2">
            <button class="btn btn-outline-danger"
              @click="clearCart">清空購物車</button>
          </div>
          <div class="p-3 px-md-5">
            <ul class="row border-bottom border-top list-unstyled py-2">
              <li class="col-12 col-md-5">
                <h3 class="m-0 py-2 fs-6 fw-bold text-center">商品</h3>
              </li>
              <li class="col-3 d-none d-md-block">
                <h3 class="m-0 py-2 fs-6 fw-bold text-center">數量</h3>
              </li>
              <li class="col-3 d-none d-md-block">
                <h3 class="m-0 py-2 fs-6 fw-bold text-end">小計</h3>
              </li>
            </ul>

            <ul class="row gx-md-5 align-items-center list-unstyled border-bottom pb-3"
              v-for="item in cartData.carts" :key="item.id">
              <li class="col-5 col-md-2">
                <div class="ratio ratio-4x3 overflow-hidden">
                  <img class="img-cover"
                    :src="item.product.imageUrl" :alt="item.product.title">
                </div>
              </li>
              <li class="col-6 col-md-9">
                <ul class="row gy-3 list-unstyled">
                  <li
                    class="col-12 col-md-4 d-flex align-items-center
                    justify-content-center justify-content-md-start">
                    <h4 class="m-0 fs-5">
                      {{ item.product.title }}
                    </h4>
                  </li>
                  <li class="col-12 col-md-5">
                    <div class="input-group">
                      <button class="btn btn-custom" type="button" :disabled="item.qty <= 1"
                        @click="updateCart(item.id, item.product_id, (item.qty - 1))">
                        <span class="material-icons-outlined">
                          remove_circle
                        </span>
                      </button>
                      <input class="form-control text-end" type="number" min="1"
                        v-model.number="item.qty"
                        @change="updateCart(item.id, item.product_id, item.qty)"/>
                      <button class="btn  btn-custom" type="button"
                        @click="updateCart(item.id, item.product_id, (item.qty + 1))">
                        <span class="material-icons-outlined">
                          add_circle
                        </span>
                      </button>
                    </div>
                  </li>
                  <li class="col-12 col-md-3 d-flex align-items-center
                    justify-content-center justify-content-md-end">
                    NTD {{ item.total.toLocaleString() }}
                  </li>
                </ul>
              </li>
              <li class="col-1 text-center">
                <button type="button" class="btn-close" @click="deleteProduct(item.id)"></button>
              </li>
            </ul>
          </div>

          <ul class="cart-total row flex-column align-items-end list-unstyled mx-3 mx-md-4 mb-5">
            <li class="col-12 col-md-6 col-lg-4">
              <span
                :class="couponRes.className">
                {{ couponRes.msg }}
              </span>
              <div class="input-group mb-2">
                <input type="text" class="form-control" placeholder="請輸入優惠券號碼"
                  v-model="couponCode" />
                <button class="btn btn-outline-success" type="button"
                  :disabled="!couponCode || isBtnLoading" @click="matchCoupon">
                  <div class="spinner-border spinner-border-sm" role="status"
                    v-show="isBtnLoading">
                  </div>
                  <span v-show="!isBtnLoading">使用</span>
                </button>
              </div>
            </li>
            <li class="col-12 col-md-6 col-lg-4 d-flex justify-content-between">
              <p>小計</p>
              <p>NTD {{ cartData.total.toLocaleString() }}</p>
            </li>
            <li class="col-12 col-md-6 col-lg-4 d-flex justify-content-between">
              <p>運費</p>
              <p>NTD {{ deliveryFee }}</p>
            </li>
            <li class="col-12 col-md-6 col-lg-4 border-bottom d-flex justify-content-between mb-2">
              <p>折扣</p>
              <p>NTD {{ discountAmount }}</p>
            </li>
            <li class="col-12 col-md-6 col-lg-4 d-flex justify-content-between">
              <h4 class="fw-bold fs-6 mb-0">應付金額</h4>
              <p>NTD {{ finalTotal }}</p>
            </li>
          </ul>

          <div class="footer-btn-group row mb-5">
            <div class="col-12">
              <p v-show="cartData.total < 300"
                class="text-danger text-end mb-1">
                <i class="bi bi-exclamation-circle me-1">
                </i>總金額未滿 300 元不得外送
              </p>
            </div>
            <div class="col-5 col-md-3 col-lg-2 me-auto">
              <router-link to="/products" class="btn btn-outline-secondary w-100">
                <i class="bi bi-arrow-left"></i>
                還想逛逛
              </router-link>
            </div>
            <div class="col-5 col-md-3 col-lg-2">
              <router-link to="/order/info" class="btn btn-primary link-hover w-100"
                :class="cartData.total >= 300 ? '' : 'disabled'">
                我要結帳
                <i class="bi bi-arrow-right"></i>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </main>

    <loadingText :isLoading="isLoading"></loadingText>
  </div>
</template>

<script>
import Swal from 'sweetalert2';
import pushToastMessage from '@/utils/pushToastMessage';
import emitter from '@/utils/emitter';

export default {
  data() {
    return {
      apiBase: `${process.env.VUE_APP_API}/api/${process.env.VUE_APP_PATH}`,
      cartData: [],
      deliveryFee: 30,
      couponCode: '',
      amount: 0,
      isLoading: false,
      isBtnLoading: false,
      couponRes: {
        isErr: false,
        msg: '',
        className: {
          'text-danger': false,
          'text-success': false,
        },
      },
    };
  },
  computed: {
    finalTotal() {
      let total = this.amount || this.cartData.final_total;
      total += this.deliveryFee;
      return Math.ceil(total).toLocaleString();
    },
    discountAmount() {
      const { total } = this.cartData;
      let discount = this.amount || this.cartData.final_total;
      discount = Math.ceil(discount);
      discount = total - discount;

      return discount.toLocaleString();
    },
  },
  methods: {
    getCart() {
      this.isLoading = true;
      this.$http.get(`${this.apiBase}/cart`)
        .then((res) => {
          this.cartData = res.data.data;
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
    updateCart(cartId, productId, qty) {
      const check = qty.toString().match(/\d$/);
      if (qty > 0 && check) {
        const data = {
          product_id: productId,
          qty,
        };
        this.isLoading = true;
        this.$http.put(`${this.apiBase}/cart/${cartId}`, { data })
          .then((res) => {
            this.isLoading = false;
            pushToastMessage('user', res.data.success, '更新購物車');
            emitter.emit('updateCart');
            this.getCart();
          }).catch((err) => {
            this.isLoading = false;
            pushToastMessage('user', err.response.data.success, '更新購物車');
          });
      }
    },
    deleteProduct(id) {
      this.isLoading = true;
      this.$http.delete(`${this.apiBase}/cart/${id}`)
        .then((res) => {
          pushToastMessage('user', res.data.success, '刪除商品');
          emitter.emit('updateCart');
          this.getCart();
        }).catch((err) => {
          this.isLoading = false;
          pushToastMessage('user', err.response.data.success, '刪除商品');
        });
    },
    clearCart() {
      this.isLoading = true;
      this.$http.delete(`${this.apiBase}/carts`)
        .then((res) => {
          pushToastMessage('user', res.data.success, '清空購物車');
          this.getCart();
          emitter.emit('updateCart');
        }).catch((err) => {
          pushToastMessage('user', err.response.data.success, '清空購物車');
          this.isLoading = false;
        });
    },
    matchCoupon() {
      const data = {
        code: this.couponCode,
      };
      this.isBtnLoading = true;
      this.$http.post(`${this.apiBase}/coupon`, { data })
        .then((res) => {
          const { success, message } = res.data;
          this.couponRes.msg = message;
          this.couponRes.isErr = !success;
          this.couponRes.className['text-danger'] = !success;
          this.couponRes.className['text-success'] = success;
          this.amount = Math.ceil(res.data.data.final_total);
          this.isBtnLoading = false;
        }).catch((err) => {
          const { success } = err.response.data;
          this.isBtnLoading = false;
          this.couponRes.isErr = success;
          this.couponRes.className['text-danger'] = !success;
          this.couponRes.className['text-success'] = success;
          this.couponRes.msg = err.response.data.message;
        }).then(() => {
          this.couponCode = '';
        });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
