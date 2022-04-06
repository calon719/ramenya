<template>
  <div class="cart">
    <header class="page-banner">
      <h2 class="page-banner-title fs-1">購物清單</h2>
    </header>

    <main class="main-footer-bottom">
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
          <routerLink :to="{ path: '/products', query: { category: '拉麵' } }"
            class="btn btn-primary btn-lg mb-5">
            <i class="bi bi-arrow-right"></i>
            去逛逛
          </routerLink>
        </div>

        <div v-else>
          <div class="text-end mb-3 me-md-3 pe-1">
            <button type="button" class="btn btn-outline-danger me-md-3"
              @click="clearCart">清空購物車</button>
          </div>
          <div class="px-3 px-md-5">
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
              <li class="col-5 col-md-9">
                <ul class="row gy-3 list-unstyled">
                  <li
                    class="col-12 col-md-4 d-flex align-items-center
                    justify-content-center justify-content-md-start">
                    <h4 class="m-0 fs-5">
                      {{ item.product.title }}
                    </h4>
                  </li>
                  <li class="col-12 col-md-5">
                    <div v-if="isBtnLoading && itemId === item.product_id"
                      class="d-flex justify-content-center">
                      <div class="spinner-border"></div>
                    </div>
                    <div v-else class="input-group">
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
              <li class="col-2 col-sm-1 text-center">
                <div v-if="isBtnLoading && itemId === item.id"
                  class="spinner-border spinner-border-sm"></div>
                <button v-else
                  type="button" class="btn-close" @click="deleteProduct(item.id)"></button>
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
                  :disabled="!couponCode || (isBtnLoading && itemId === 'coupon')"
                  @click="matchCoupon">
                  <div class="spinner-border spinner-border-sm" role="status"
                    v-if="isBtnLoading && itemId === 'coupon'">
                  </div>
                  <span v-else>使用</span>
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
            <div class="col-5 col-md-3 col-lg-2 ms-md-4 me-auto">
              <routerLink :to="{ path: '/products', query: { category: '拉麵' } }"
                class="btn btn-outline-secondary w-100">
                <i class="bi bi-arrow-left"></i>
                還想逛逛
              </routerLink>
            </div>
            <div class="col-5 col-md-3 col-lg-2">
              <a href="#" class="btn btn-primary link-hover w-100"
                :class="cartData.total >= 300 ? '' : 'disabled'"
                @click.prevent="goToInfo">
                我要結帳
                <i class="bi bi-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import sweetAlert from 'sweetalert2';
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
      itemId: '',
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
      if (this.cartData.length === 0) {
        this.$emit('loadingStatus', true);
      }
      this.$http.get(`${this.apiBase}/cart`)
        .then((res) => {
          this.cartData = res.data.data;

          const { coupon } = this.cartData.carts[0];
          if (coupon) {
            this.couponRes.msg = `已套用優惠券:${coupon.code}`;
            this.couponRes.isErr = false;
            this.couponRes.className['text-danger'] = false;
            this.couponRes.className['text-success'] = true;
          }

          this.isBtnLoading = false;
          this.$emit('loadingStatus', false);
        }).catch((err) => {
          this.isBtnLoading = false;
          this.$emit('loadingStatus', false);
          const msg = err.response.data.message;
          sweetAlert.fire({
            icon: 'error',
            text: msg,
          });
        });
    },
    updateCart(cartId, productId, qty) {
      const check = qty.toString().match(/\d$/);
      if (qty > 0 && check) {
        this.itemId = productId;
        const data = {
          product_id: productId,
          qty,
        };
        this.isBtnLoading = true;
        this.$http.put(`${this.apiBase}/cart/${cartId}`, { data })
          .then((res) => {
            pushToastMessage('user', res.data.success, '更新購物車');
            emitter.emit('updateCart');
            this.getCart();
          }).catch((err) => {
            this.isBtnLoading = false;
            pushToastMessage('user', err.response.data.success, '更新購物車');
          });
      }
    },
    deleteProduct(id) {
      this.itemId = id;
      this.isBtnLoading = true;
      this.$http.delete(`${this.apiBase}/cart/${id}`)
        .then((res) => {
          pushToastMessage('user', res.data.success, '刪除商品');
          emitter.emit('updateCart');
          this.getCart();
        }).catch((err) => {
          this.isBtnLoading = false;
          pushToastMessage('user', err.response.data.success, '刪除商品');
        });
    },
    clearCart() {
      this.$emit('loadingStatus', true);
      this.$http.delete(`${this.apiBase}/carts`)
        .then((res) => {
          pushToastMessage('user', res.data.success, '清空購物車');
          this.getCart();
          emitter.emit('updateCart');
          this.$emit('loadingStatus', false);
        }).catch((err) => {
          pushToastMessage('user', err.response.data.success, '清空購物車');
          this.$emit('loadingStatus', false);
        });
    },
    matchCoupon() {
      const data = {
        code: this.couponCode,
      };
      this.itemId = 'coupon';
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
          localStorage.removeItem('coupon');
          this.getCart();
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
    goToInfo() {
      const data = JSON.stringify(this.cartData);
      localStorage.setItem('carts', data);
      this.$router.push({
        name: 'UserOrderInfo',
      });
    },
  },
  created() {
    this.getCart();

    const coupon = localStorage.getItem('coupon');
    if (coupon) {
      this.couponCode = coupon;
    }

    const localData = localStorage.getItem('carts');
    if (localData) {
      localStorage.removeItem('carts');
    }
  },
};
</script>
